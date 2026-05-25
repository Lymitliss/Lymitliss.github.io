---
layout: default
title: Weather + Lightning
permalink: /weather/
---

## Weather + Lightning Dashboard

<style>
  .weather-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 15px;
    margin-top: 20px;
  }

  .weather-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
    gap: 15px;
    margin-top: 20px;
  }

  .weather-stat-label {
    display: block;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #8b949e;
    margin-bottom: 6px;
  }

  .weather-stat-value {
    display: block;
    font-size: 1.1rem;
    font-weight: 700;
    color: #e6edf3;
  }

  .weather-mini-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 12px;
  }

  .weather-mini-card {
    background: #111827;
    border: 1px solid #1f2933;
    border-radius: 6px;
    padding: 12px;
  }

  .weather-hourly-list,
  .weather-alert-list,
  .weather-links-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .weather-hourly-list li,
  .weather-alert-list li,
  .weather-links-list li {
    background: #111827;
    border: 1px solid #1f2933;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 10px;
  }

  .weather-alert-list li:last-child,
  .weather-hourly-list li:last-child,
  .weather-links-list li:last-child {
    margin-bottom: 0;
  }

  .weather-alert-event {
    display: block;
    font-weight: 700;
    color: #ffd447;
    margin-bottom: 4px;
  }

  .weather-alert-meta,
  .weather-small-note {
    display: block;
    font-size: 0.85rem;
    color: #9da7b3;
  }

  .weather-iframe-wrap {
    position: relative;
    width: 100%;
    min-height: 520px;
    border: 1px solid #1f2933;
    border-radius: 8px;
    overflow: hidden;
    background: #111827;
  }

  .weather-iframe-wrap iframe {
    width: 100%;
    height: 520px;
    border: 0;
    display: block;
  }

  .weather-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 999px;
    border: 1px solid #30363d;
    background: #111827;
    color: #c9d1d9;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .weather-badge.good {
    color: #d7ffe0;
    background: rgba(63, 185, 80, 0.15);
    border-color: rgba(63, 185, 80, 0.35);
  }

  .weather-badge.fair {
    color: #fff1c2;
    background: rgba(210, 153, 34, 0.15);
    border-color: rgba(210, 153, 34, 0.35);
  }

  .weather-badge.poor {
    color: #ffd9d7;
    background: rgba(248, 81, 73, 0.15);
    border-color: rgba(248, 81, 73, 0.35);
  }

  .weather-top-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .weather-location-select {
    width: 100%;
    max-width: 320px;
    margin-top: 8px;
    padding: 10px 12px;
    border-radius: 6px;
    border: 1px solid #1f2933;
    background: #111827;
    color: #e6edf3;
    font-size: 0.95rem;
  }

  .weather-location-select:focus {
    outline: none;
    border-color: #58a6ff;
    box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.18);
  }

  @media (max-width: 900px) {
    .weather-grid,
    .weather-grid-2,
    .weather-mini-grid {
      grid-template-columns: 1fr;
    }

    .weather-iframe-wrap,
    .weather-iframe-wrap iframe {
      min-height: 420px;
      height: 420px;
    }
  }
</style>

<div class="station-card">
  <h3>Overview</h3>
  <p>
    This page combines local weather, official NOAA alerts, lightning activity, solar weather,
    and radio-focused operating notes in one place.
  </p>
  <p>
    Weather and alerts are pulled through the WOØF droplet proxy, solar data comes from NOAA SWPC, and the page
    refreshes automatically while it remains open.
  </p>
</div>

<div class="station-card">
  <h3>Location</h3>
  <label for="weather-location-select" class="weather-small-note">Select dashboard location</label>
  <select id="weather-location-select" class="weather-location-select">
    <option value="shoreline" selected>Shoreline, WA</option>
    <option value="seattle">Seattle, WA</option>
    <option value="everett">Everett, WA</option>
    <option value="bellevue">Bellevue, WA</option>
    <option value="tacoma">Tacoma, WA</option>
    <option value="olympia">Olympia, WA</option>
    <option value="bremerton">Bremerton, WA</option>
  </select>
  <p class="weather-small-note" id="selected-location-note" style="margin-top: 10px;">
    Currently showing Shoreline, WA.
  </p>
</div>

<div class="weather-grid">
  <div class="station-card">
    <div class="weather-top-line">
      <h3>Current Conditions</h3>
      <span class="weather-badge" id="wx-status-badge">Loading</span>
    </div>
    <div class="weather-mini-grid">
      <div class="weather-mini-card">
        <span class="weather-stat-label">Temperature</span>
        <span class="weather-stat-value" id="wx-temp">Loading...</span>
      </div>
      <div class="weather-mini-card">
        <span class="weather-stat-label">Humidity</span>
        <span class="weather-stat-value" id="wx-humidity">Loading...</span>
      </div>
      <div class="weather-mini-card">
        <span class="weather-stat-label">Wind</span>
        <span class="weather-stat-value" id="wx-wind">Loading...</span>
      </div>
      <div class="weather-mini-card">
        <span class="weather-stat-label">Condition</span>
        <span class="weather-stat-value" id="wx-condition">Loading...</span>
      </div>
    </div>
    <p class="weather-small-note" id="wx-updated" style="margin-top: 12px;">Loading latest observation...</p>
  </div>

  <div class="station-card">
    <div class="weather-top-line">
      <h3>NOAA Alerts</h3>
      <span class="weather-badge" id="alerts-badge">Loading</span>
    </div>
    <ul class="weather-alert-list" id="alerts-list">
      <li>Loading active alerts...</li>
    </ul>
  </div>

  <div class="station-card">
    <div class="weather-top-line">
      <h3>Solar Snapshot</h3>
      <span class="weather-badge" id="solar-badge">Loading</span>
    </div>
    <div class="weather-mini-grid">
      <div class="weather-mini-card">
        <span class="weather-stat-label">Kp Index</span>
        <span class="weather-stat-value" id="solar-kp">Loading...</span>
      </div>
      <div class="weather-mini-card">
        <span class="weather-stat-label">10.7 cm Flux</span>
        <span class="weather-stat-value" id="solar-flux">Loading...</span>
      </div>
      <div class="weather-mini-card">
        <span class="weather-stat-label">NOAA Scale</span>
        <span class="weather-stat-value" id="solar-scale">Loading...</span>
      </div>
      <div class="weather-mini-card">
        <span class="weather-stat-label">HF Outlook</span>
        <span class="weather-stat-value" id="solar-hf">Loading...</span>
      </div>
    </div>
    <p class="weather-small-note" id="solar-updated" style="margin-top: 12px;">Loading NOAA SWPC data...</p>
  </div>
</div>

<div class="weather-grid-2">
  <div class="station-card">
    <h3>Next 12 Hours</h3>
    <ul class="weather-hourly-list" id="hourly-list">
      <li>Loading hourly forecast...</li>
    </ul>
  </div>

  <div class="station-card">
    <h3>Radio Operating Note</h3>
    <p id="radio-note">
      Building current local weather and solar interpretation...
    </p>
    <p id="outdoor-note" class="weather-small-note" style="margin-top: 12px;">
      Loading outdoor/station note...
    </p>
  </div>
</div>

<div class="station-card">
  <h3>Lightning / Storm Activity</h3>
  <div class="weather-iframe-wrap">
    <iframe
      id="lightning-map"
      src="https://map.blitzortung.org/#6.7/47.755/-122.341"
      title="Live lightning map"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"></iframe>
  </div>
  <p class="weather-small-note" style="margin-top: 12px;">
    Lightning map source: Blitzortung real-time map. Do not use it as the sole source for life-safety decisions.
  </p>
</div>

<div class="weather-grid-2">
  <div class="station-card">
    <h3>Forecast / Radar Links</h3>
    <ul class="weather-links-list">
      <li>
        <a id="nws-point-link" href="https://forecast.weather.gov/MapClick.php?lat=47.755&lon=-122.341" target="_blank" rel="noopener" class="accent-link">
          Official NWS point forecast
        </a>
      </li>
      <li>
        <a href="https://radar.weather.gov/" target="_blank" rel="noopener" class="accent-link">
          NOAA / NWS radar
        </a>
      </li>
      <li>
        <a href="https://www.weather.gov/sew/" target="_blank" rel="noopener" class="accent-link">
          NWS Seattle / Tacoma forecast office
        </a>
      </li>
      <li>
        <a href="https://www.swpc.noaa.gov/" target="_blank" rel="noopener" class="accent-link">
          NOAA Space Weather Prediction Center
        </a>
      </li>
    </ul>
  </div>

  <div class="station-card">
    <h3>Operating Focus</h3>
    <ul class="weather-links-list">
      <li id="focus-weather">Loading weather-related operating guidance...</li>
      <li id="focus-hf">Loading HF-related operating guidance...</li>
      <li id="focus-vhf">Loading VHF/UHF-related operating guidance...</li>
      <li id="focus-mesh">Loading mesh/outdoor guidance...</li>
    </ul>
  </div>
</div>

<script src="{{ '/assets/weather-dashboard.js?v=4' | relative_url }}"></script>
