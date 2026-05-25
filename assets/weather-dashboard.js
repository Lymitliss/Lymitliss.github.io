(() => {
  const LOCATIONS = {
    shoreline: { name: "Shoreline, WA", lat: 47.755, lon: -122.341, mapZoom: "6.7" },
    seattle: { name: "Seattle, WA", lat: 47.6062, lon: -122.3321, mapZoom: "6.7" },
    everett: { name: "Everett, WA", lat: 47.9790, lon: -122.2021, mapZoom: "6.7" },
    bellevue: { name: "Bellevue, WA", lat: 47.6101, lon: -122.2015, mapZoom: "6.7" },
    tacoma: { name: "Tacoma, WA", lat: 47.2529, lon: -122.4443, mapZoom: "6.7" },
    olympia: { name: "Olympia, WA", lat: 47.0379, lon: -122.9007, mapZoom: "6.7" },
    bremerton: { name: "Bremerton, WA", lat: 47.5673, lon: -122.6326, mapZoom: "6.7" }
  };

  const CONFIG = {
    defaultLocationKey: "shoreline",
    currentLocationKey: "shoreline",
    refreshMs: 300000,
    nwsProxyBase: "https://analyzer.wo0f.com/weather-api",
    nwsOrigin: "https://api.weather.gov"
  };

  const SWPC_KP = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json";
  const SWPC_FLUX = "https://services.swpc.noaa.gov/products/10cm-flux-30-day.json";
  const SWPC_SCALES = "https://services.swpc.noaa.gov/products/noaa-scales.json";

  function byId(id) {
    return document.getElementById(id);
  }

  function getCurrentLocation() {
    return LOCATIONS[CONFIG.currentLocationKey] || LOCATIONS[CONFIG.defaultLocationKey];
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

  function applyBadge(id, label, tone) {
    const el = byId(id);
    if (!el) return;
    el.textContent = label;
    el.className = `weather-badge ${tone || ""}`.trim();
  }

  function proxifyNwsUrl(url) {
    if (!url) return null;
    if (url.startsWith(CONFIG.nwsProxyBase)) return url;
    if (url.startsWith(CONFIG.nwsOrigin)) {
      return CONFIG.nwsProxyBase + url.substring(CONFIG.nwsOrigin.length);
    }
    if (url.startsWith("/")) {
      return CONFIG.nwsProxyBase + url;
    }
    return url;
  }

  function shouldAddCacheBuster(url) {
    return !url.includes(CONFIG.nwsProxyBase);
  }

  function withOptionalCacheBuster(url) {
    if (!shouldAddCacheBuster(url)) return url;
    return `${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`;
  }

  async function fetchJson(url, extraHeaders = {}) {
    const finalUrl = withOptionalCacheBuster(url);

    const response = await fetch(finalUrl, {
      cache: "no-store",
      headers: {
        Accept: "application/geo+json, application/json",
        ...extraHeaders
      }
    });

    if (!response.ok) {
      throw new Error(`Fetch failed: ${url} (${response.status})`);
    }

    return response.json();
  }

  function setLoadingState() {
    applyBadge("wx-status-badge", "Loading", "");
    applyBadge("alerts-badge", "Loading", "");
    setText("wx-temp", "Loading...");
    setText("wx-humidity", "Loading...");
    setText("wx-wind", "Loading...");
    setText("wx-condition", "Loading...");
    setText("wx-updated", "Loading latest observation...");
    setHtml("hourly-list", "<li>Loading hourly forecast...</li>");
    setHtml("alerts-list", "<li>Loading active alerts...</li>");
    setText("radio-note", "Building current local weather and solar interpretation...");
    setText("outdoor-note", "Loading outdoor/station note...");
    setText("focus-weather", "Loading weather-related operating guidance...");
    setText("focus-hf", "Loading HF-related operating guidance...");
    setText("focus-vhf", "Loading VHF/UHF-related operating guidance...");
    setText("focus-mesh", "Loading mesh/outdoor guidance...");
  }

  function updateLocationUi() {
    const location = getCurrentLocation();

    setText("selected-location-note", `Currently showing ${location.name}.`);

    const lightningMap = byId("lightning-map");
    if (lightningMap) {
      lightningMap.src = `https://map.blitzortung.org/#${location.mapZoom}/${location.lat}/${location.lon}`;
      lightningMap.title = `Live lightning map centered near ${location.name}`;
    }

    const nwsPointLink = byId("nws-point-link");
    if (nwsPointLink) {
      nwsPointLink.href = `https://forecast.weather.gov/MapClick.php?lat=${location.lat}&lon=${location.lon}`;
      nwsPointLink.textContent = `Official NWS point forecast for ${location.name}`;
    }
  }

  function renderHourly(periods) {
    const hourlyPeriods = (periods || []).slice(0, 6);

    if (!hourlyPeriods.length) {
      setHtml("hourly-list", "<li>Hourly forecast unavailable right now.</li>");
      return;
    }

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

  function renderAlerts(alerts) {
    if (!alerts.length) {
      setHtml("alerts-list", "<li>No active NOAA alerts for the selected location right now.</li>");
      applyBadge("alerts-badge", "No Active Alerts", "good");
      return;
    }

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

  async function loadWeather() {
    const location = getCurrentLocation();

    const pointUrl = proxifyNwsUrl(`${CONFIG.nwsOrigin}/points/${location.lat},${location.lon}`);
    const pointData = await fetchJson(pointUrl);

    const forecastHourlyUrl = proxifyNwsUrl(pointData?.properties?.forecastHourly);
    const stationsUrl = proxifyNwsUrl(pointData?.properties?.observationStations);
    const alertsUrl = proxifyNwsUrl(`${CONFIG.nwsOrigin}/alerts/active?point=${location.lat},${location.lon}`);

    const [hourlyData, stationsData, alertsData] = await Promise.all([
      fetchJson(forecastHourlyUrl),
      fetchJson(stationsUrl),
      fetchJson(alertsUrl)
    ]);

    const hourlyPeriods = hourlyData?.properties?.periods || [];
    renderHourly(hourlyPeriods);

    const alerts = alertsData?.features || [];
    renderAlerts(alerts);

    let condition = hourlyPeriods[0]?.shortForecast || "Unavailable";
    let tempF = hourlyPeriods[0]?.temperature ?? null;
    let humidity = null;
    let windMph = null;
    let windDir = null;
    let updatedLabel = "Using hourly forecast fallback";

    const firstStation = stationsData?.observationStations?.[0] || stationsData?.features?.[0]?.id;

    if (firstStation) {
      try {
        const latestObsUrl = proxifyNwsUrl(`${firstStation}/observations/latest`);
        const latestObs = await fetchJson(latestObsUrl);
        const obs = latestObs?.properties || {};

        const obsTempF = cToF(safeNumber(obs?.temperature?.value));
        const obsHumidity = safeNumber(obs?.relativeHumidity?.value);
        const obsWindMph = mpsToMph(safeNumber(obs?.windSpeed?.value));
        const obsWindDir = safeNumber(obs?.windDirection?.value);
        const obsCondition = obs?.textDescription;
        const obsTimestamp = obs?.timestamp;

        if (obsTempF != null) tempF = obsTempF;
        if (obsHumidity != null) humidity = obsHumidity;
        if (obsWindMph != null) windMph = obsWindMph;
        if (obsWindDir != null) windDir = obsWindDir;
        if (obsCondition) condition = obsCondition;
        if (obsTimestamp) updatedLabel = `Nearest NOAA observation • ${isoToLocal(obsTimestamp)}`;
      } catch (obsError) {
        console.warn("Latest observation fetch failed, using forecast fallback:", obsError);
      }
    }

    setText("wx-temp", tempF == null ? "Unavailable" : `${Math.round(tempF)}°F`);
    setText("wx-humidity", humidity == null ? "Unavailable" : `${Math.round(humidity)}%`);
    setText("wx-wind", windMph == null ? "Unavailable" : `${Math.round(windMph)} mph ${cardinal(windDir)}`);
    setText("wx-condition", condition);
    setText("wx-updated", updatedLabel);

    const weatherTone = /storm|thunder|rain|showers|snow|wind/i.test(condition)
      ? "fair"
      : /sun|clear|fair|partly cloudy|mostly sunny/i.test(condition)
        ? "good"
        : "fair";

    applyBadge("wx-status-badge", location.name, weatherTone);

    return {
      condition,
      tempF,
      humidity,
      windMph,
      hourlyPeriods,
      alerts,
      locationName: location.name
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
    const location = getCurrentLocation();
    const alerts = weather?.alerts || [];
    const windy = (weather?.windMph || 0) >= 15;
    const wet = /rain|showers|storm|snow|thunder/i.test(weather?.condition || "");
    const strongSolar = solar && solar.flux >= 130 && solar.kp <= 3 && solar.rScale <= 1;
    const roughSolar = solar && (solar.kp >= 5 || solar.rScale >= 2);

    let radioNote = "Conditions are mixed.";
    if (strongSolar) {
      radioNote = `Solar conditions are supportive for upper-HF work, especially 15m, 17m, and 20m. Local weather is currently based on ${location.name}.`;
    } else if (roughSolar) {
      radioNote = `Space weather is unsettled enough that HF reliability may swing, especially on upper bands. Local weather is currently based on ${location.name}.`;
    } else if (solar) {
      radioNote = `Solar conditions look usable but not exceptional. 17m, 20m, and 30m are likely the most dependable starting points. Local weather is currently based on ${location.name}.`;
    } else {
      radioNote = `Weather data is available for ${location.name}, but solar data could not be loaded. Check your HF propagation page for a second opinion.`;
    }

    let outdoorNote = "Outdoor station work looks generally reasonable right now.";
    if (alerts.length) {
      outdoorNote = `There are active NOAA alerts for ${location.name}. Treat antenna work, portable setup, and rooftop tasks as conditional until the alert picture is clear.`;
    } else if (wet && windy) {
      outdoorNote = `Local weather around ${location.name} suggests caution for outdoor radio or antenna work due to wind and precipitation.`;
    } else if (wet) {
      outdoorNote = `Conditions around ${location.name} are damp enough that portable or outdoor work may be less pleasant even if not dangerous.`;
    } else if (windy) {
      outdoorNote = `Wind around ${location.name} is high enough that elevated or ladder-based antenna work deserves extra caution.`;
    } else {
      outdoorNote = `Outdoor station work around ${location.name} looks generally reasonable right now.`;
    }

    let focusWeather = `Weather focus: Use current conditions, alerts, and the lightning map for ${location.name} before doing outdoor antenna or portable-radio work.`;
    let focusHf = "HF focus: Start with 17m/20m if conditions are mixed; move upward if flux is strong and Kp stays low.";
    let focusVhf = "VHF/UHF focus: Local surface weather matters more than solar weather here, but storm activity can affect portable operation and safety.";
    let focusMesh = `Mesh focus: Lightning, wind, and active local alerts near ${location.name} matter most for rooftop nodes, masts, and any outdoor troubleshooting.`;

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

  function setWeatherFailure() {
    applyBadge("wx-status-badge", "Unavailable", "poor");
    applyBadge("alerts-badge", "Unavailable", "poor");
    setText("wx-temp", "Unavailable");
    setText("wx-humidity", "Unavailable");
    setText("wx-wind", "Unavailable");
    setText("wx-condition", "Unavailable");
    setText("wx-updated", "Weather data unavailable right now.");
    setHtml("hourly-list", "<li>Hourly forecast unavailable right now.</li>");
    setHtml("alerts-list", "<li>Active alert data unavailable right now.</li>");
  }

  function setSolarFailure() {
    applyBadge("solar-badge", "Unavailable", "poor");
    setText("solar-kp", "Unavailable");
    setText("solar-flux", "Unavailable");
    setText("solar-scale", "Unavailable");
    setText("solar-hf", "Unavailable");
    setText("solar-updated", "NOAA SWPC data unavailable right now.");
  }

  async function initDashboard() {
    let weatherResult = null;
    let solarResult = null;

    updateLocationUi();

    try {
      weatherResult = await loadWeather();
    } catch (error) {
      console.error("Weather load failed:", error);
      setWeatherFailure();
    }

    try {
      solarResult = await loadSolar();
    } catch (error) {
      console.error("Solar load failed:", error);
      setSolarFailure();
    }

    buildNotes(weatherResult, solarResult);
  }

  function setupLocationSelector() {
    const select = byId("weather-location-select");
    if (!select) return;

    select.value = CONFIG.currentLocationKey;

    select.addEventListener("change", () => {
      CONFIG.currentLocationKey = select.value;
      setLoadingState();
      initDashboard();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setupLocationSelector();
      initDashboard();
    });
  } else {
    setupLocationSelector();
    initDashboard();
  }

  setInterval(initDashboard, CONFIG.refreshMs);
})();
