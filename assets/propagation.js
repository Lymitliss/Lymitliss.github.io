(() => {
  const KP_URL = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json";
  const FLUX_URL = "https://services.swpc.noaa.gov/products/10cm-flux-30-day.json";
  const SCALES_URL = "https://services.swpc.noaa.gov/products/noaa-scales.json";

  const BAND_CONFIG = [
    { name: "10m" },
    { name: "12m" },
    { name: "15m" },
    { name: "17m" },
    { name: "20m" },
    { name: "30m" },
    { name: "40m" },
    { name: "80m" }
  ];

  function byId(id) {
    return document.getElementById(id);
  }

  function safeNumber(value, fallback = 0) {
    const num = Number(value);
    return Number.isFinite(num) ? num : fallback;
  }

  function normalizeRows(raw) {
    if (!Array.isArray(raw)) return [];
    if (raw.length === 0) return [];

    if (typeof raw[0] === "object" && raw[0] !== null && !Array.isArray(raw[0])) {
      return raw;
    }

    if (Array.isArray(raw[0])) {
      const headers = raw[0];
      return raw.slice(1).map((row) => {
        const item = {};
        headers.forEach((key, idx) => {
          item[key] = row[idx];
        });
        return item;
      });
    }

    return [];
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

    if (!keys.length) return null;
    return scales[String(keys[0])];
  }

  function isDaytime() {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;
  }

  function getGraylineState() {
    const hour = new Date().getHours();
    if ((hour >= 5 && hour < 8) || (hour >= 17 && hour < 20)) {
      return "grayline";
    }
    if (hour >= 6 && hour < 18) {
      return "day";
    }
    return "night";
  }

  function buildGraylineHint() {
    const state = getGraylineState();

    if (state === "grayline") {
      return "Grayline hint: Sunrise/sunset window. 20m, 30m, and 40m can be especially worth checking right now.";
    }

    if (state === "day") {
      return "Grayline hint: Full daylight right now. Upper bands usually benefit most outside the sunrise/sunset transition window.";
    }

    return "Grayline hint: Night conditions right now. Lower bands and 30m/40m often become more dependable after dark.";
  }

  function classifyScore(score) {
    if (score >= 72) return { label: "Good", className: "band-good" };
    if (score >= 48) return { label: "Fair", className: "band-fair" };
    return { label: "Poor", className: "band-poor" };
  }

  function describeSolarState(flux, kp, rScale) {
    return `SFI ${Math.round(flux)} • Kp ${kp.toFixed(1)} • R${rScale}`;
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

      case "12m":
        score = 24;
        if (daytime) score += 22;
        if (flux >= 150) score += 30;
        else if (flux >= 130) score += 24;
        else if (flux >= 110) score += 16;
        else if (flux >= 95) score += 8;
        else score -= 6;
        score -= kp * 4.2;
        score -= rScale * 8;
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

      case "17m":
        score = 48;
        if (daytime) score += 10;
        else score += 6;
        if (flux >= 130) score += 16;
        else if (flux >= 110) score += 12;
        else if (flux >= 95) score += 7;
        score -= kp * 2.8;
        score -= rScale * 5;
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

      case "30m":
        score = 56;
        if (!daytime) score += 10;
        else score += 4;
        if (flux >= 130) score += 8;
        else if (flux >= 110) score += 6;
        else if (flux >= 95) score += 3;
        score -= kp * 2.2;
        score -= rScale * 4;
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
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  function buildBandNote(band, rating, flux, kp, rScale, daytime) {
    const timeHint = daytime ? "daytime" : "nighttime";

    if (band === "10m") {
      if (rating === "Good") return `Strong ${timeHint} DX potential. High solar flux is helping the upper HF bands.`;
      if (rating === "Fair") return `Watch for openings, especially in daylight. Conditions are present but not wide open.`;
      return `Upper-band conditions are weak right now. 10m is likely spotty unless a brief opening develops.`;
    }

    if (band === "12m") {
      if (rating === "Good") return `Strong daytime DX potential. 12m is opening well with current solar conditions.`;
      if (rating === "Fair") return `Watch for openings during the day. Often follows 10m conditions but slightly more stable.`;
      return `Limited openings right now. Check during peak daylight hours.`;
    }

    if (band === "15m") {
      if (rating === "Good") return `Very workable daytime band with solid DX potential and good solar support.`;
      if (rating === "Fair") return `Usable and worth checking. Expect decent daylight performance with some variability.`;
      return `More limited than usual right now. Still worth checking during stronger daylight periods.`;
    }

    if (band === "17m") {
      if (rating === "Good") return `Very solid band right now with reliable DX and less congestion than 20m.`;
      if (rating === "Fair") return `Usable band with moderate performance. Often a stable fallback when 15m and 12m are uneven.`;
      return `More limited right now, but 17m can still outperform higher bands in marginal conditions.`;
    }

    if (band === "20m") {
      if (rating === "Good") return `Best all-around choice right now. Reliable blend of regional and longer-haul potential.`;
      if (rating === "Fair") return `Still a dependable fallback band. Conditions should be usable even if not exceptional.`;
      return `More unsettled than normal, but 20m may still outperform the higher bands.`;
    }

    if (band === "30m") {
      if (rating === "Good") return `Excellent digital-focused band right now. Strong candidate for FT8, WSPR, and quieter long-haul work.`;
      if (rating === "Fair") return `Usable digital band with good odds of steady performance, especially around grayline and after dark.`;
      return `Conditions are less impressive right now, but 30m can still be worth checking for digital activity.`;
    }

    if (band === "40m") {
      if (rating === "Good") {
        return daytime
          ? `Usable for regional work, though it should improve further after dark.`
          : `Strong nighttime/regional choice right now with dependable coverage potential.`;
      }
      if (rating === "Fair") {
        return daytime
          ? `Moderate daytime regional option. Better after sunset.`
          : `Reasonable nighttime regional band with some variability.`;
      }
      return `Regional work may be noisy or inconsistent at the moment.`;
    }

    if (band === "80m") {
      if (rating === "Good") {
        return daytime
          ? `Unusual but possible local coverage. Expect this band to come alive more after dark.`
          : `Strong local/nighttime band right now with good near-regional potential.`;
      }
      if (rating === "Fair") {
        return daytime
          ? `Mostly a later-evening play. Daylight performance is usually limited.`
          : `Usable nighttime local band, though not at peak quality right now.`;
      }
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

    if (isBest) {
      card.classList.add("band-best");
    }

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
    const graylineHint = byId("grayline-hint");

    if (best) best.textContent = "Unavailable";
    if (outlook) outlook.textContent = "Data fetch failed";
    if (snapshot) snapshot.textContent = message;
    if (updated) updated.textContent = "Live NOAA solar data could not be loaded right now.";
    if (graylineHint) graylineHint.textContent = buildGraylineHint();

    ["10m", "12m", "15m", "17m", "20m", "30m", "40m", "80m"].forEach((band) => {
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

      const kpRows = normalizeRows(kpRaw);
      const fluxRows = normalizeRows(fluxRaw);

      const latestKpRow = getLatest(kpRows, "Kp");
      const latestFluxRow = getLatest(fluxRows, "flux");
      const noaaNow = getNoaaNow(scalesRaw);

      if (!latestKpRow || !latestFluxRow || !noaaNow) {
        throw new Error("NOAA data structure was not usable.");
      }

      const kp = safeNumber(latestKpRow.Kp, 3);
      const flux = safeNumber(latestFluxRow.flux, 100);
      const rScale = safeNumber(noaaNow?.R?.Scale, 0);
      const rText = noaaNow?.R?.Text ? String(noaaNow.R.Text) : "none";
      const daytime = isDaytime();

      const bandScores = BAND_CONFIG.map(({ name }) => ({
        band: name,
        score: scoreBand(name, flux, kp, rScale, daytime)
      })).sort((a, b) => b.score - a.score);

      const bestBand = bandScores[0]?.band || "20m";
      const outlook = buildOutlook(flux, kp, rScale);

      if (byId("best-band")) {
        byId("best-band").textContent = bestBand;
      }
      if (byId("hf-outlook")) {
        byId("hf-outlook").textContent = outlook;
      }
      if (byId("solar-snapshot")) {
        byId("solar-snapshot").textContent = describeSolarState(flux, kp, rScale);
      }
      if (byId("prop-last-updated")) {
        byId("prop-last-updated").textContent =
          `NOAA data loaded • Flux ${Math.round(flux)} • Kp ${kp.toFixed(1)} • Radio blackout scale: R${rScale} (${rText})`;
      }
      if (byId("grayline-hint")) {
        byId("grayline-hint").textContent = buildGraylineHint();
      }

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

  setInterval(initPropagation, 300000);
})();
