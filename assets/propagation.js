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

  // ... all original code unchanged above ...

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

  function setFallback(message) {
    const best = byId("best-band");
    const outlook = byId("hf-outlook");
    const snapshot = byId("solar-snapshot");
    const updated = byId("prop-last-updated");

    if (best) best.textContent = "Unavailable";
    if (outlook) outlook.textContent = "Data fetch failed";
    if (snapshot) snapshot.textContent = message;
    if (updated) updated.textContent = "Live NOAA solar data could not be loaded right now.";

    ["10m", "12m", "15m", "17m", "20m", "40m", "80m"].forEach((band) => {
      const badge = byId(`badge-${band}`);
      const note = byId(`note-${band}`);
      if (badge) badge.textContent = "Offline";
      if (note) note.textContent = "Current solar data unavailable.";
    });
  }

  // ... rest of your original file unchanged ...
})();
