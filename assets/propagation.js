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
        score = 42;
        if (daytime) score += 10;
        else score += 4;
        if (flux >= 130) score += 18;
        else if (flux >= 110) score += 12;
        else if (flux >= 95) score += 6;
        score -= kp * 3.2;
        score -= rScale * 6;
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
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  function buildBandNote(band, rating, flux, kp, rScale, daytime) {
    if (band === "12m") {
      if (rating === "Good") return "Strong daytime DX potential. 12m is opening well.";
      if (rating === "Fair") return "Watch for daylight openings.";
      return "Limited openings right now.";
    }

    if (band === "17m") {
      if (rating === "Good") return "Very solid band with reliable DX.";
      if (rating === "Fair") return "Usable and often quieter than 20m.";
      return "Limited but still worth checking.";
    }

    return `Flux ${Math.round(flux)}, Kp ${kp.toFixed(1)}, R${rScale}`;
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
    if (!response.ok) throw new Error(`Fetch failed`);
    return response.json();
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

      const kp = Number(getLatest(kpRows, "Kp")?.Kp || 3);
      const flux = Number(getLatest(fluxRows, "flux")?.flux || 100);
      const rScale = Number(getNoaaNow(scalesRaw)?.R?.Scale || 0);

      const daytime = isDaytime();

      const scores = BAND_CONFIG.map(b => ({
        band: b.name,
        score: scoreBand(b.name, flux, kp, rScale, daytime)
      }));

      const best = scores.sort((a,b)=>b.score-a.score)[0].band;

      scores.forEach(({band, score})=>{
        const rating = classifyScore(score).label;
        const note = buildBandNote(band, rating, flux, kp, rScale, daytime);
        applyBandState(band, score, band===best, note);
      });

      byId("best-band").textContent = best;
      byId("hf-outlook").textContent = buildOutlook(flux, kp, rScale);
      byId("solar-snapshot").textContent = describeSolarState(flux, kp, rScale);

    } catch (e) {
      console.error(e);
    }
  }

  document.addEventListener("DOMContentLoaded", initPropagation);
})();
