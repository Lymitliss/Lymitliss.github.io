---
layout: default
title: ADS-B Aircraft Tracking
description: Live 1090 MHz ADS-B and 978 MHz UAT aircraft tracking from the WOØF receiving station in Shoreline, Washington.
permalink: /adsb/
---

# ADS-B Aircraft Tracking

Live aircraft tracking on **1090 MHz ADS-B** and **978 MHz UAT** from the WOØF receiving station in Shoreline, Washington.

<style>
  .adsb-mini-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin: 14px 0 18px;
  }

  .adsb-mini-card {
    min-width: 0;
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 9px;
    padding: 13px 16px;
  }

  .adsb-mini-title {
    color: #e6edf3;
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 5px;
  }

  .adsb-mini-reading {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  .adsb-mini-count {
    color: #e6edf3;
    font-size: 2.1rem;
    font-weight: 700;
    line-height: 1.15;
    font-variant-numeric: tabular-nums;
  }

  .adsb-mini-label {
    color: #8b949e;
    font-size: 0.78rem;
  }

  .adsb-mini-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .adsb-mini-status {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #8b949e;
    font-size: 0.78rem;
  }

  .adsb-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #8b949e;
    flex-shrink: 0;
  }

  .adsb-dot.online {
    background: #3fb950;
  }

  .adsb-dot.warning {
    background: #d29922;
  }

  .adsb-dot.offline {
    background: #f85149;
  }

  .adsb-mini-time {
    color: #8b949e;
    font-size: 0.7rem;
    margin-top: 5px;
  }

  .adsb-detail-button {
    color: #58a6ff;
    background: transparent;
    border: 0;
    padding: 2px 0;
    cursor: pointer;
    font: inherit;
    font-size: 0.78rem;
  }

  .adsb-detail-button:hover {
    text-decoration: underline;
  }

  .adsb-map-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin: 12px 0;
  }

  .adsb-map-title {
    color: #58a6ff;
    font-size: 1.2rem;
    font-weight: 700;
  }

  .adsb-fullscreen {
    color: #58a6ff;
    font-size: 0.85rem;
    text-decoration: none;
  }

  .adsb-fullscreen:hover {
    text-decoration: underline;
  }

  .adsb-map-wrapper {
    border: 1px solid #30363d;
    border-radius: 9px;
    overflow: hidden;
    background: #0d1117;
  }

  .adsb-map-wrapper iframe {
    display: block;
    width: 100%;
    height: 750px;
    border: 0;
  }

  .adsb-details-panel {
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 9px;
    padding: 16px;
    margin-top: 16px;
    scroll-margin-top: 20px;
  }

  .adsb-details-panel[hidden],
  .adsb-table-wrap[hidden] {
    display: none !important;
  }

  .adsb-details-heading {
    color: #e6edf3;
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .adsb-details-note {
    color: #8b949e;
    font-size: 0.85rem;
    margin-bottom: 10px;
  }

  .adsb-table-wrap {
    overflow-x: auto;
    max-width: 100%;
  }

  .adsb-aircraft-table {
    width: 100%;
    border-collapse: collapse;
    color: #e6edf3;
    font-size: 0.85rem;
    white-space: nowrap;
  }

  .adsb-aircraft-table th,
  .adsb-aircraft-table td {
    padding: 9px 10px;
    border-bottom: 1px solid #30363d;
    text-align: left;
  }

  .adsb-aircraft-table th {
    color: #8b949e;
    font-weight: 600;
  }

  .adsb-aircraft-table tr:last-child td {
    border-bottom: 0;
  }

  .adsb-small-note {
    color: #8b949e;
    font-size: 0.8rem;
    line-height: 1.5;
    margin: 12px 0 24px;
  }

  @media (max-width: 620px) {
    .adsb-mini-grid {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .adsb-mini-card {
      padding: 10px 13px;
    }

    .adsb-mini-count {
      font-size: 1.8rem;
    }

    .adsb-map-wrapper iframe {
      height: 620px;
    }
  }
</style>

<div class="adsb-mini-grid">

  <section class="adsb-mini-card">
    <div class="adsb-mini-title">1090 MHz ADS-B</div>

    <div class="adsb-mini-reading">
      <strong class="adsb-mini-count" id="adsb-count-1090">—</strong>
      <span class="adsb-mini-label">Aircraft / 60 sec</span>
    </div>

    <div class="adsb-mini-footer">
      <span class="adsb-mini-status">
        <span class="adsb-dot" id="adsb-dot-1090"></span>
        <span id="adsb-status-1090">Connecting...</span>
      </span>

      <button type="button"
              class="adsb-detail-button"
              data-adsb-band="1090"
              aria-controls="adsb-details-1090"
              aria-expanded="false">
        Aircraft details ↓
      </button>
    </div>

    <div class="adsb-mini-time" id="adsb-time-1090">
      Waiting for data
    </div>
  </section>

  <section class="adsb-mini-card">
    <div class="adsb-mini-title">978 MHz UAT</div>

    <div class="adsb-mini-reading">
      <strong class="adsb-mini-count" id="adsb-count-978">—</strong>
      <span class="adsb-mini-label">Aircraft / 60 sec</span>
    </div>

    <div class="adsb-mini-footer">
      <span class="adsb-mini-status">
        <span class="adsb-dot" id="adsb-dot-978"></span>
        <span id="adsb-status-978">Connecting...</span>
      </span>

      <button type="button"
              class="adsb-detail-button"
              data-adsb-band="978"
              aria-controls="adsb-details-978"
              aria-expanded="false">
        Aircraft details ↓
      </button>
    </div>

    <div class="adsb-mini-time" id="adsb-time-978">
      Waiting for data
    </div>
  </section>

</div>

<div class="adsb-map-heading">
  <span class="adsb-map-title">Live Aircraft Map</span>
  <a class="adsb-fullscreen"
     href="https://adsb.wo0f.com/"
     target="_blank"
     rel="noopener">
    Open Full-Screen Map ↗
  </a>
</div>

<div class="adsb-map-wrapper">
  <iframe
    src="https://adsb.wo0f.com/"
    title="WOØF Live ADS-B Aircraft Map"
    loading="lazy"
    allowfullscreen>
  </iframe>
</div>

<div class="adsb-small-note">
  Live aircraft counts refresh every 5 seconds while the page is visible.
  Green indicates an available data feed; zero aircraft does not necessarily
  mean the receiver is offline. The embedded map shows aircraft positions,
  flight paths, and reception coverage.
</div>

<!-- AIRCRAFT DETAIL PANELS BELOW THE MAP -->

<section class="adsb-details-panel"
         id="adsb-details-1090"
         hidden>

  <div class="adsb-details-heading">
    1090 MHz — Live Aircraft Details
  </div>

  <div class="adsb-details-note" id="adsb-note-1090">
    Waiting for aircraft data...
  </div>

  <div class="adsb-table-wrap" id="adsb-table-wrap-1090" hidden>
    <table class="adsb-aircraft-table">
      <thead>
        <tr>
          <th>Flight</th>
          <th>Aircraft</th>
          <th>Altitude (ft)</th>
          <th>Speed (kt)</th>
          <th>Last Seen (s)</th>
        </tr>
      </thead>
      <tbody id="adsb-rows-1090"></tbody>
    </table>
  </div>
</section>

<section class="adsb-details-panel"
         id="adsb-details-978"
         hidden>

  <div class="adsb-details-heading">
    978 MHz UAT — Live Aircraft Details
  </div>

  <div class="adsb-details-note" id="adsb-note-978">
    Waiting for aircraft data...
  </div>

  <div class="adsb-table-wrap" id="adsb-table-wrap-978" hidden>
    <table class="adsb-aircraft-table">
      <thead>
        <tr>
          <th>Flight</th>
          <th>Aircraft</th>
          <th>Altitude (ft)</th>
          <th>Speed (kt)</th>
          <th>Last Seen (s)</th>
        </tr>
      </thead>
      <tbody id="adsb-rows-978"></tbody>
    </table>
  </div>
</section>

## About the Receiving Station

The WOØF ADS-B receiving station is located in **Shoreline, Washington**, monitoring aircraft across the greater Seattle and Puget Sound region.

- **1090 MHz:** ADS-B and Mode S
- **978 MHz:** Universal Access Transceiver (UAT)
- **Software:** readsb and tar1090
- **Server:** Ubuntu Linux
- **Public access:** Cloudflare Tunnel over HTTPS
- **External feeds:** FlightAware and ADS-B Exchange

Aircraft visibility depends on altitude, antenna coverage, terrain, and radio propagation.

*Aircraft tracking data is provided for informational and radio experimentation purposes.*

<script>
(function () {
  "use strict";

  const BASE = "https://adsb.wo0f.com";
  const REFRESH_MS = 5000;
  const MAX_SEEN = 60;
  const MAX_AGE = 120;

  let updating = false;

  const latest = {
    "1090": null,
    "978": null
  };

  const bands = ["1090", "978"];

  function el(id) {
    return document.getElementById(id);
  }

  function setCard(band, count, status, state, success) {
    el("adsb-count-" + band).textContent =
      count === null ? "—" : count;

    el("adsb-status-" + band).textContent = status;

    el("adsb-dot-" + band).className =
      "adsb-dot " + state;

    el("adsb-time-" + band).textContent = success
      ? "Updated " + new Date().toLocaleTimeString()
      : "Unable to update";
  }

  function formatNumber(value) {
    if (value === null ||
        value === undefined ||
        value === "") return "—";

    const n = Number(value);

    return Number.isFinite(n)
      ? Math.round(n).toLocaleString()
      : "—";
  }

  function formatAltitude(a) {
    const altitude = a.alt_baro ?? a.alt_geom;

    if (altitude === "ground") return "Ground";

    return formatNumber(altitude);
  }

  function setList(band, aircraft, message) {
    latest[band] = { aircraft, message };
    renderList(band);
  }

  function renderList(band) {
    const panel = el("adsb-details-" + band);

    if (panel.hidden) return;

    const note = el("adsb-note-" + band);
    const wrap = el("adsb-table-wrap-" + band);
    const body = el("adsb-rows-" + band);
    const data = latest[band];

    body.replaceChildren();

    if (!data) {
      note.textContent = "Waiting for aircraft data...";
      wrap.hidden = true;
      return;
    }

    if (!data.aircraft) {
      note.textContent =
        data.message || "Aircraft feed unavailable.";
      wrap.hidden = true;
      return;
    }

    if (data.aircraft.length === 0) {
      note.textContent =
        "No aircraft received in the last 60 seconds.";
      wrap.hidden = true;
      return;
    }

    note.textContent =
      data.aircraft.length +
      " aircraft received in the last 60 seconds.";

    wrap.hidden = false;

    const sorted = [...data.aircraft].sort((a, b) =>
      String(a.flight || a.hex || "").localeCompare(
        String(b.flight || b.hex || "")
      )
    );

    for (const a of sorted) {
      const row = document.createElement("tr");

      const values = [
        String(a.flight || "").trim() ||
          String(a.hex || "Unknown"),
        a.t || "—",
        formatAltitude(a),
        formatNumber(a.gs),
        formatNumber(a.seen)
      ];

      for (const value of values) {
        const td = document.createElement("td");
        td.textContent = value;
        row.appendChild(td);
      }

      body.appendChild(row);
    }
  }

  function setupDetailButtons() {
    document.querySelectorAll(
      "[data-adsb-band]"
    ).forEach(button => {

      button.addEventListener("click", () => {
        const band = button.dataset.adsbBand;
        const panel = el("adsb-details-" + band);
        const opening = panel.hidden;

        // Keep only one aircraft detail panel open.
        for (const otherBand of bands) {
          el("adsb-details-" + otherBand).hidden = true;
        }

        document.querySelectorAll(
          "[data-adsb-band]"
        ).forEach(b => {
          b.setAttribute("aria-expanded", "false");
          b.textContent = "Aircraft details ↓";
        });

        if (opening) {
          panel.hidden = false;
          button.setAttribute("aria-expanded", "true");
          button.textContent = "Hide aircraft details ↑";

          renderList(band);

          panel.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });
    });
  }

  async function getAircraft(path) {
    const controller = new AbortController();

    const timeout = setTimeout(
      () => controller.abort(), 7000
    );

    try {
      const response = await fetch(BASE + path, {
        cache: "no-store",
        mode: "cors",
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }

      const data = await response.json();

      if (!Array.isArray(data.aircraft)) {
        throw new Error("Invalid aircraft data");
      }

      const feedTime = Number(data.now);

      if (
        !Number.isFinite(feedTime) ||
        Math.abs(Date.now() / 1000 - feedTime) > MAX_AGE
      ) {
        throw new Error("Stale aircraft data");
      }

      return data.aircraft.filter(a =>
        a &&
        (a.seen === undefined ||
         Number(a.seen) <= MAX_SEEN)
      );

    } finally {
      clearTimeout(timeout);
    }
  }

  async function refreshCounts() {
    if (document.hidden || updating) return;

    updating = true;

    try {
      const [main, uat] = await Promise.allSettled([
        getAircraft("/data/aircraft.json"),
        getAircraft("/woof-uat/aircraft.json")
      ]);

      // 978 MHz independent aircraft count.
      if (uat.status === "fulfilled") {
        const count = uat.value.length;

        setCard(
          "978",
          count,
          count > 0 ? "Live aircraft" : "Feed online",
          "online",
          true
        );

        setList("978", uat.value, "");

      } else {
        setCard(
          "978", null,
          "Feed unavailable",
          "offline", false
        );

        setList(
          "978", null,
          "978 MHz data feed unavailable or stale."
        );
      }

      // Subtract merged UAT aircraft from readsb
      // to preserve independent 1090 MHz counts.
      if (
        main.status === "fulfilled" &&
        uat.status === "fulfilled"
      ) {
        const uatHex = new Set(
          uat.value
            .map(a => String(a.hex || "").toLowerCase())
            .filter(Boolean)
        );

        const aircraft1090 = main.value.filter(a =>
          !uatHex.has(String(a.hex || "").toLowerCase()) &&
          !String(a.type || "").toLowerCase().startsWith("uat")
        );

        const count = aircraft1090.length;

        setCard(
          "1090",
          count,
          count > 0 ? "Live aircraft" : "Feed online",
          "online",
          true
        );

        setList("1090", aircraft1090, "");

      } else if (main.status === "fulfilled") {
        setCard(
          "1090", null,
          "Waiting for UAT",
          "warning", false
        );

        setList(
          "1090", null,
          "Waiting for UAT data to prevent double-counting."
        );

      } else {
        setCard(
          "1090", null,
          "Feed unavailable",
          "offline", false
        );

        setList(
          "1090", null,
          "1090 MHz data feed unavailable or stale."
        );
      }

    } finally {
      updating = false;
    }
  }

  function start() {
    setupDetailButtons();

    refreshCounts();

    setInterval(refreshCounts, REFRESH_MS);

    document.addEventListener(
      "visibilitychange",
      refreshCounts
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      start,
      { once: true }
    );
  } else {
    start();
  }
})();
</script>
