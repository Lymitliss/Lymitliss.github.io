(() => {
  const KP_URL = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json";
  const FLUX_URL = "https://services.swpc.noaa.gov/products/10cm-flux-30-day.json";
  const SCALES_URL = "https://services.swpc.noaa.gov/products/noaa-scales.json";

  const BAND_CONFIG = [
    { name: "10m", type: "high" },
    { name: "15m", type: "highMid" },
    { name: "20m", type: "mid" },
    { name: "40m", type: "low" },
    { name: "80m", type: "lowNight" }
  ];

  function byId(id) {
    return document.getElementById(id);
  }

  function safeNumber(value, fallback = 0) {
    const num = Number(value);
    return Number.isFinite(num) ? num : fallback;
  }

  function parseArrayJsonTable(raw) {
    if (!Array.isArray(raw) || raw.length < 2) return [];
    const headers = raw[0];
    return raw.slice(1).map((row) => {
      const item = {};
      headers.forEach((key, idx) => {
        item[key] = row[idx];
      });
      return item;
    });
  }

  function getLatest(arr, valueKey) {
    const filtered = arr.filter((item) => item && item[valueKey] != null);
    return filtered[filtered.length - 1] || null;
  }

  function getNoaaNow(scales) {
    if (!scales || typeof scales !== "object") return null;
    if (scales["0"]) return scales["0"];
    const keys = Object.keys(scales)
      .map((k) => Number(k))
      .filter((n) => Number.isFinite(n))
      .sort((a, b) => a - b);
    const latestCurrent = keys.find((k) => k === 0);
    return latestCurrent != null ? scales[String(latestCurrent)] : scales[String(keys[keys.length - 1])];
  }

  function isDaytime() {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;
  }

  function classifyScore(score) {
    if (score >= 72) return { label: "Good", className: "band-good" };
    if (score >= 48) return { label: "Fair", className: "band-fair" };
    return { label: "Poor", className: "band-poor" };
  }

  function describeSolarState(flux, kp, rScale) {
    const parts = [];
    parts.push(`SFI ${Math.round(flux)}`);
    parts.push(`Kp ${kp.toFixed(1)}`);
    parts.push(`R${rScale}`);
    return parts.join(" • ");
  }

  function buildOutlook(flux, kp, rScale) {
    let score = 50;

    if (flux >= 150) score += 22;
    else if (flux >= 130) score += 16;
    else if (flux >= 110) score += 10;
    else if (flux >= 95) score += 5;
    else score -= 5;

    if (kp <= 2) score += 12;
    else if (kp <= 3) score += 6;
    else if (kp <= 4) score += 0;
    else if (kp <= 5) score -= 10;
    else score -= 18;

    score -= rScale * 8;

    if (score >= 72) return "Strong overall";
    if (score >= 56) return "Usable to good";
    if (score >= 42) return "Mixed conditions";
    return "Rough / unsettled";
  }

  function scoreBand(band, flux, kp, rScale, daytime) {
    let score = 50;

    switch (band) {
      case "10m":
        score = 18;
        if (daytime) score += 25;
        if (flux >= 150) score += 35;
        else if (flux >= 130) score += 26;
        else if (flux >= 115) score += 18;
        else if (flux >= 100) score += 10;
        else score -= 10;
        score -= kp * 4.8;
        score -= rScale * 9;
        break;

      case "15m":
        score = 30;
        if (daytime) score += 18;
        if (flux >= 150) score += 28;
        else if (flux >= 130) score += 22;
        else if (flux >= 110) score += 15;
        else if (flux >= 95) score += 8;
        score -= kp * 3.8;
        score -= rScale * 7;
        break;

      case "20m":
        score = 52;
        if (daytime) score += 8;
        else score += 3;
        if (flux >= 130) score += 14;
        else if (flux >= 110) score += 10;
        else if (flux >= 95) score += 5;
        score -= kp * 2.8;
        score -= rScale * 5;
        break;

      case "40m":
        score = 46;
        if (!daytime) score += 18;
        else score -= 6;
        if (flux >= 110) score += 4;
        score -= kp * 2.4;
        score -= rScale * 3;
        break;

      case "80m":
        score = 34;
        if (!daytime) score += 28;
        else score -= 18;
        score -= kp * 2.8;
        score -= rScale * 2;
        break;

      default:
        break;
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  function buildBandNote(band, rating, flux, kp, rScale, daytime) {
    const timeHint = daytime ? "daytime" : "nighttime";

    if (band === "10m") {
      if (rating === "Good") return `Strong ${timeHint} DX potential. High solar flux is helping the upper HF bands.`;
      if (rating === "Fair") return `Watch for openings, especially in daylight. Conditions are present but not wide open.`;
      return `Upper-band conditions are weak right now. 10m likely spotty unless a brief opening develops.`;
    }

    if (band === "15m") {
      if (rating === "Good") return `Very workable daytime band with solid DX potential and good solar support.`;
      if (rating === "Fair") return `Usable and worth checking. Expect decent daylight performance with some variability.`;
      return `More limited than usual right now. Still worth checking during stronger daylight periods.`;
    }

    if (band === "20m") {
      if (rating === "Good") return `Best all-around choice right now. Reliable blend of regional and longer-haul potential.`;
      if (rating === "Fair") return `Still a dependable fallback band. Conditions should be usable even if not exceptional.`;
      return `More unsettled than normal, but 20m may still outperform the higher bands.`;
    }

    if (band === "40m") {
      if (rating === "Good") return daytime
        ? `Usable for regional work, though it should improve further after dark.`
        : `Strong nighttime/regional choice right now with dependable coverage potential.`;
      if (rating === "Fair") return daytime
        ? `Moderate daytime regional option. Better after sunset.`
        : `Reasonable nighttime regional band with some variability.`;
      return `Regional work may be noisy or inconsistent at the moment.`;
    }

    if (band === "80m") {
      if (rating === "Good") return daytime
        ? `Unusual but possible local coverage. Expect this band to come alive more after dark.`
        : `Strong local/nighttime band right now with good near-regional potential.`;
      if (rating === "Fair") return daytime
        ? `Mostly a later-evening play. Daylight performance is usually limited.`
        : `Usable nighttime local band, though not at peak quality right now.`;
      return daytime
        ? `Poor daytime band right now, which is normal. Check again after sunset.`
        : `Current conditions are limiting even the lower bands somewhat.`;
    }

    return `Flux ${Math.round(flux)}, Kp ${kp.toFixed(1)}, R${rScale}.`;
  }

  function applyBandState(band, score, isBest, note) {
    const card = document.querySelector(`.band-card[data-band="${band}"]`);
    const badge = byId(`badge-${band}`);
    const noteEl = byId(`note-${band}`);
    if (!card || !badge || !noteEl) return;

    card.classList.remove("band-good", "band-fair", "band-poor", "band-best");

    const { label, className } = classifyScore(score);
    card.classList.add(className);
    if (isBest) card.classList.add("band-best");

    badge.textContent = label;
    noteEl.textContent = note;
  }

  async function fetchJson(url) {
    const response = await fetch(`${url}?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Fetch failed: ${url}`);
    }
    return response.json();
  }

  function setFallback(message) {
    const best = byId("best-band");
    const outlook = byId("hf-outlook");
    const snapshot = byId("solar-snapshot");
    const updated = byId("prop-last-updated");

    if (best) best.textContent = "Unavailable";
    if (outlook) outlook.textContent = "Data fetch failed";
    if (snapshot) snapshot.textContent = message;
    if (updated) updated.textContent = "Live NOAA solar data could not be loaded right now.";

    ["10m", "15m", "20m", "40m", "80m"].forEach((band) => {
      const badge = byId(`badge-${band}`);
      const note = byId(`note-${band}`);
      if (badge) badge.textContent = "Offline";
      if (note) note.textContent = "Current solar data unavailable. The HamQSL panel above may still load normally.";
    });
  }

  async function initPropagation() {
    try {
      const [kpRaw, fluxRaw, scalesRaw] = await Promise.all([
        fetchJson(KP_URL),
        fetchJson(FLUX_URL),
        fetchJson(SCALES_URL)
      ]);

      const kpRows = parseArrayJsonTable(kpRaw);
      const fluxRows = parseArrayJsonTable(fluxRaw);

      const latestKpRow = getLatest(kpRows, "Kp");
      const latestFluxRow = getLatest(fluxRows, "flux");
      const noaaNow = getNoaaNow(scalesRaw);

      const kp = safeNumber(latestKpRow?.Kp, 3);
      const flux = safeNumber(latestFluxRow?.flux, 100);
      const rScale = safeNumber(noaaNow?.R?.Scale, 0);
      const rText = noaaNow?.R?.Text ? String(noaaNow.R.Text) : "none";
      const daytime = isDaytime();

      const bandScores = BAND_CONFIG.map(({ name }) => ({
        band: name,
        score: scoreBand(name, flux, kp, rScale, daytime)
      })).sort((a, b) => b.score - a.score);

      const bestBand = bandScores[0]?.band || "20m";
      const outlook = buildOutlook(flux, kp, rScale);

      byId("best-band").textContent = bestBand;
      byId("hf-outlook").textContent = outlook;
      byId("solar-snapshot").textContent = describeSolarState(flux, kp, rScale);

      const updatedText = [
        `NOAA data loaded`,
        `Flux ${Math.round(flux)}`,
        `Kp ${kp.toFixed(1)}`,
        `Radio blackout scale: R${rScale} (${rText})`
      ].join(" • ");

      byId("prop-last-updated").textContent = updatedText;

      BAND_CONFIG.forEach(({ name }) => {
        const found = bandScores.find((item) => item.band === name);
        const score = found ? found.score : 50;
        const rating = classifyScore(score).label;
        const note = buildBandNote(name, rating, flux, kp, rScale, daytime);
        applyBandState(name, score, name === bestBand, note);
      });
    } catch (error) {
      console.error("Propagation data load failed:", error);
      setFallback("Unable to retrieve NOAA solar data.");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPropagation);
  } else {
    initPropagation();
  }
})();
