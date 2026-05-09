(() => {
  const CONFIG = {
    lat: 47.755,
    lon: -122.341,
    locationName: "Shoreline, WA",
    refreshMs: 300000
  };

  const NWS_BASE = "https://api.weather.gov";
  const SWPC_KP = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json";
  const SWPC_FLUX = "https://services.swpc.noaa.gov/products/10cm-flux-30-day.json";
  const SWPC_SCALES = "https://services.swpc.noaa.gov/products/noaa-scales.json";

  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    const el = byId(id);
    if (el) el.textContent = value;
  }

  function setHtml(id, value) {
    const el = byId(id);
    if (el) el.innerHTML = value;
  }

  function safeNumber(value, fallback = null) {
    const num = Number(value);
    return Number.isFinite(num) ? num : fallback;
  }

  function cToF(celsius) {
    if (celsius == null) return null;
    return (celsius * 9) / 5 + 32;
  }

  function mpsToMph(mps) {
    if (mps == null) return null;
    return mps * 2.23694;
  }

  function isoToLocal(iso) {
    if (!iso) return "Unavailable";
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  }

  function cardinal(deg) {
    if (deg == null) return "Variable";
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return dirs[Math.round(deg / 45) % 8];
  }

  function normalizeRows(raw) {
    if (!Array.isArray(raw) || raw.length === 0) return [];

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

  function getLatest(arr, key) {
    const filtered = arr.filter((item) => item && item[key] != null);
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

  function classifyBadge(kind) {
    const badge = byId(kind);
    if (!badge) return;
    badge.className = "weather-badge";
  }

  function applyBadge(id, label, tone) {
    const el = byId(id);
    if (!el) return;
    el.textContent = label;
    el.className = `weather-badge ${tone || ""}`.trim();
  }

  async function fetchJson(url) {
    const response = await fetch(`${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`, {
      cache: "no-store",
      headers: {
        Accept: "application/geo+json, application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Fetch failed: ${url}`);
    }

    return response.json();
  }

  async function loadWeather() {
    const pointUrl = `${NWS_BASE}/points/${CONFIG.lat},${CONFIG.lon}`;
    const pointData = await fetchJson(pointUrl);

    const forecastHourlyUrl = pointData?.properties?.forecastHourly;
    const stationsUrl = pointData?.properties?.observationStations;
    const alertsUrl = `${NWS_BASE}/alerts/active?point=${CONFIG.lat},${CONFIG.lon}`;

    const [hourlyData, stationsData, alertsData] = await Promise.all([
      fetchJson(forecastHourlyUrl),
      fetchJson(stationsUrl),
      fetchJson(alertsUrl)
    ]);

    const firstStation = stationsData?.features?.[0]?.id;
    const latestObs = firstStation ? await fetchJson(`${firstStation}/observations/latest`) : null;

    const obs = latestObs?.properties || {};
    const tempF = cToF(safeNumber(obs?.temperature?.value));
    const humidity = safeNumber(obs?.relativeHumidity?.value);
    const windMph = mpsToMph(safeNumber(obs?.windSpeed?.value));
    const windDir = safeNumber(obs?.windDirection?.value);
    const condition = obs?.textDescription || hourlyData?.properties?.periods?.[0]?.shortForecast || "Unavailable";
    const timestamp = obs?.timestamp;

    setText("wx-temp", tempF == null ? "Unavailable" : `${Math.round(tempF)}°F`);
    setText("wx-humidity", humidity == null ? "Unavailable" : `${Math.round(humidity)}%`);
    setText("wx-wind", windMph == null ? "Unavailable" : `${Math.round(windMph)} mph ${cardinal(windDir)}`);
    setText("wx-condition", condition);
    setText("wx-updated", `Nearest NOAA observation • ${isoToLocal(timestamp)}`);

    const weatherTone = /storm|thunder|rain|showers|snow|wind/i.test(condition)
      ? "fair"
      : /sun|clear|fair|partly cloudy|mostly sunny/i.test(condition)
        ? "good"
        : "fair";
    applyBadge("wx-status-badge", CONFIG.locationName, weatherTone);

    const hourlyPeriods = (hourlyData?.properties?.periods || []).slice(0, 6);
    if (!hourlyPeriods.length) {
      setHtml("hourly-list", "<li>Hourly forecast unavailable right now.</li>");
    } else {
      setHtml(
        "hourly-list",
        hourlyPeriods
          .map((period) => `
            <li>
              <strong>${period.startTime ? new Date(period.startTime).toLocaleString("en-US", {
                timeZone: "America/Los_Angeles",
                hour: "numeric",
                minute: "2-digit"
              }) : "Hour"}</strong><br>
              ${period.temperature}°${period.temperatureUnit} • ${period.shortForecast}<br>
              <span class="weather-small-note">Precip: ${period.probabilityOfPrecipitation?.value ?? 0}% • Wind: ${period.windSpeed || "N/A"}</span>
            </li>
          `)
          .join("")
      );
    }

    const alerts = alertsData?.features || [];
    if (!alerts.length) {
      setHtml("alerts-list", "<li>No active NOAA alerts for the Shoreline / Seattle point right now.</li>");
      applyBadge("alerts-badge", "No Active Alerts", "good");
    } else {
      setHtml(
        "alerts-list",
        alerts.slice(0, 5).map((feature) => {
          const props = feature.properties || {};
          return `
            <li>
              <span class="weather-alert-event">${props.event || "Alert"}</span>
              <span class="weather-alert-meta">${props.severity || "Severity unavailable"} • ${props.urgency || "Urgency unavailable"}</span>
              <span class="weather-small-note">${props.headline || props.description || ""}</span>
            </li>
          `;
        }).join("")
      );
      applyBadge("alerts-badge", `${alerts.length} Active`, alerts.length >= 2 ? "poor" : "fair");
    }

    return {
      condition,
      tempF,
      humidity,
      windMph,
      hourlyPeriods,
      alerts
    };
  }

  async function loadSolar() {
    const [kpRaw, fluxRaw, scalesRaw] = await Promise.all([
      fetchJson(SWPC_KP),
      fetchJson(SWPC_FLUX),
      fetchJson(SWPC_SCALES)
    ]);

    const kpRows = normalizeRows(kpRaw);
    const fluxRows = normalizeRows(fluxRaw);
    const latestKp = getLatest(kpRows, "Kp");
    const latestFlux = getLatest(fluxRows, "flux");
    const noaaNow = getNoaaNow(scalesRaw);

    const kp = safeNumber(latestKp?.Kp, 3);
    const flux = safeNumber(latestFlux?.flux, 100);
    const rScale = safeNumber(noaaNow?.R?.Scale, 0);

    let hfOutlook = "Mixed";
    let tone = "fair";

    if (flux >= 130 && kp <= 3 && rScale <= 1) {
      hfOutlook = "Strong";
      tone = "good";
    } else if (kp >= 5 || rScale >= 2) {
      hfOutlook = "Disturbed";
      tone = "poor";
    } else if (flux < 100) {
      hfOutlook = "Limited upper-band support";
      tone = "fair";
    }

    setText("solar-kp", kp == null ? "Unavailable" : kp.toFixed(1));
    setText("solar-flux", flux == null ? "Unavailable" : Math.round(flux).toString());
    setText("solar-scale", `R${rScale}`);
    setText("solar-hf", hfOutlook);
    setText("solar-updated", `NOAA SWPC snapshot • Kp ${kp?.toFixed(1) ?? "N/A"} • Flux ${flux ? Math.round(flux) : "N/A"} • R${rScale}`);
    applyBadge("solar-badge", `HF ${hfOutlook}`, tone);

    return { kp, flux, rScale, hfOutlook };
  }

  function buildNotes(weather, solar) {
    const alerts = weather.alerts || [];
    const windy = (weather.windMph || 0) >= 15;
    const wet = /rain|showers|storm|snow|thunder/i.test(weather.condition || "");
    const strongSolar = solar.flux >= 130 && solar.kp <= 3 && solar.rScale <= 1;
    const roughSolar = solar.kp >= 5 || solar.rScale >= 2;

    let radioNote = "Conditions are mixed.";
    if (strongSolar) {
      radioNote = "Solar conditions are supportive for upper-HF work, especially 15m, 17m, and 20m, while local weather looks manageable.";
    } else if (roughSolar) {
      radioNote = "Space weather is unsettled enough that HF reliability may swing, especially on upper bands. 20m, 30m, and 40m are the safer places to check first.";
    } else {
      radioNote = "Solar conditions look usable but not exceptional. 17m, 20m, and 30m are likely the most dependable starting points.";
    }

    let outdoorNote = "Outdoor station work looks generally reasonable right now.";
    if (alerts.length) {
      outdoorNote = "There are active NOAA alerts for your local point. Treat antenna work, portable setup, and rooftop tasks as conditional until the alert picture is clear.";
    } else if (wet && windy) {
      outdoorNote = "Local weather suggests caution for outdoor radio or antenna work due to wind and precipitation.";
    } else if (wet) {
      outdoorNote = "Conditions are damp enough that portable or outdoor work may be less pleasant even if not dangerous.";
    } else if (windy) {
      outdoorNote = "Wind is high enough that elevated or ladder-based antenna work deserves extra caution.";
    }

    let focusWeather = "Weather focus: Use current conditions, alerts, and the lightning map together before doing outdoor antenna or portable-radio work.";
    let focusHf = "HF focus: Start with 17m/20m if conditions are mixed; move upward if flux is strong and Kp stays low.";
    let focusVhf = "VHF/UHF focus: Local surface weather matters more than solar weather here, but storm activity can affect portable operation and safety.";
    let focusMesh = "Mesh focus: Lightning, wind, and active local alerts matter most for rooftop nodes, masts, and any outdoor troubleshooting.";

    if (roughSolar) {
      focusHf = "HF focus: With disturbed space weather, prioritize 20m, 30m, and 40m before spending much time on the upper bands.";
    }

    setText("radio-note", radioNote);
    setText("outdoor-note", outdoorNote);
    setText("focus-weather", focusWeather);
    setText("focus-hf", focusHf);
    setText("focus-vhf", focusVhf);
    setText("focus-mesh", focusMesh);
  }

  async function initDashboard() {
    try {
      const [weather, solar] = await Promise.all([
        loadWeather(),
        loadSolar()
      ]);

      buildNotes(weather, solar);
    } catch (error) {
      console.error("Weather dashboard load failed:", error);
      setText("radio-note", "Weather dashboard data could not be fully loaded right now.");
      setText("outdoor-note", "Check the official forecast and alerts links below while data reload is unavailable.");
      applyBadge("wx-status-badge", "Unavailable", "poor");
      applyBadge("alerts-badge", "Unavailable", "poor");
      applyBadge("solar-badge", "Unavailable", "poor");
      setHtml("hourly-list", "<li>Hourly forecast unavailable right now.</li>");
      setHtml("alerts-list", "<li>Active alert data unavailable right now.</li>");
      setText("focus-weather", "Weather focus: Use the official NOAA links below while dashboard data is unavailable.");
      setText("focus-hf", "HF focus: Check your dedicated HF propagation page for current band guidance.");
      setText("focus-vhf", "VHF/UHF focus: Local storm and wind awareness remain the biggest operational factors.");
      setText("focus-mesh", "Mesh focus: Verify local conditions before doing outdoor or rooftop node work.");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDashboard);
  } else {
    initDashboard();
  }

  setInterval(initDashboard, CONFIG.refreshMs);
})();
