---
layout: default
title: ADS-B Aircraft Tracking
description: Live 1090 MHz ADS-B and 978 MHz UAT aircraft tracking from the WOØF receiving station in Shoreline, Washington.
permalink: /adsb/
---

# ADS-B Aircraft Tracking

Live aircraft tracking from the WOØF receiving station in Shoreline, Washington.

Our station monitors aircraft transmissions on both **1090 MHz ADS-B** and **978 MHz UAT**, covering the greater Seattle and Puget Sound region.

<style>
  .adsb-feed-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 15px;
    margin: 20px 0;
  }

  .adsb-feed-card {
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 10px;
    padding: 20px;
  }

  .adsb-feed-card h3 {
    color: #e6edf3;
    margin: 0 0 12px;
  }

  .adsb-count {
    color: #e6edf3;
    font-size: 2.6rem;
    font-weight: 700;
    line-height: 1.2;
    font-variant-numeric: tabular-nums;
  }

  .adsb-count-label {
    color: #8b949e;
    font-size: 0.85rem;
    margin-top: 4px;
  }

  .adsb-feed-description {
    color: #8b949e;
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 14px 0;
  }

  .adsb-feed-status {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #8b949e;
    font-size: 0.85rem;
    margin-top: 14px;
  }

  .adsb-status-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #8b949e;
    flex-shrink: 0;
  }

  .adsb-status-dot.online {
    background: #3fb950;
  }

  .adsb-status-dot.warning {
    background: #d29922;
  }

  .adsb-status-dot.offline {
    background: #f85149;
  }

  .adsb-last-updated {
    color: #8b949e;
    font-size: 0.75rem;
    margin-top: 8px;
  }

  .adsb-feed-link {
    display: inline-block;
    margin-top: 15px;
  }

  .adsb-map-wrapper {
    margin: 20px 0;
    border: 1px solid #30363d;
    border-radius: 10px;
    overflow: hidden;
    background: #0d1117;
  }

  .adsb-map-wrapper iframe {
    display: block;
    width: 100%;
    height: 760px;
    border: 0;
  }

  .adsb-map-button {
    display: inline-block;
    background: #238636;
    color: #ffffff !important;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
  }

  .adsb-map-button:hover {
    background: #2ea043;
  }

  @media (max-width: 600px) {
    .adsb-map-wrapper iframe {
      height: 600px;
    }
  }
</style>

<div class="adsb-feed-grid">

  <!-- 1090 MHz ADS-B -->
  <div class="adsb-feed-card">
    <h3>1090 MHz ADS-B</h3>

    <div class="adsb-count" id="adsb-count-1090">—</div>
    <div class="adsb-count-label">
      Aircraft received in the last 60 seconds
    </div>

    <div class="adsb-feed-status">
      <span class="adsb-status-dot" id="adsb-dot-1090"></span>
      <span id="adsb-status-1090">Connecting...</span>
    </div>

    <div class="adsb-last-updated" id="adsb-updated-1090">
      Waiting for data
    </div>

    <p class="adsb-feed-description">
      Aircraft position and identification broadcasts,
      primarily from commercial and general aviation aircraft.
    </p>

    <a class="adsb-feed-link"
       href="https://adsb.wo0f.com/data/aircraft.json"
       target="_blank" rel="noopener">
      View live data →
    </a>
  </div>

  <!-- 978 MHz UAT -->
  <div class="adsb-feed-card">
    <h3>978 MHz UAT</h3>

    <div class="adsb-count" id="adsb-count-978">—</div>
    <div class="adsb-count-label">
      Aircraft received in the last 60 seconds
    </div>

    <div class="adsb-feed-status">
      <span class="adsb-status-dot" id="adsb-dot-978"></span>
      <span id="adsb-status-978">Connecting...</span>
    </div>

    <div class="adsb-last-updated" id="adsb-updated-978">
      Waiting for data
    </div>

    <p class="adsb-feed-description">
      Aircraft broadcasts using the Universal Access
      Transceiver system, primarily from equipped
      general aviation aircraft.
    </p>

    <a class="adsb-feed-link"
       href="https://adsb.wo0f.com/woof-uat/aircraft.json"
       target="_blank" rel="noopener">
      View live data →
    </a>
  </div>

</div>

<p style="color:#8b949e;font-size:0.8rem;">
  Aircraft counts refresh every 5 seconds while this page is visible.
  A count of zero means no recently received aircraft, not necessarily
  that the receiver is offline. Status reflects data-feed availability.
</p>

## Live Aircraft Map

The interactive map below displays aircraft received by the WOØF station.

The dashboard includes independent 1090 MHz and 978 MHz aircraft counters, aircraft details, flight paths, and reception coverage.

<div class="adsb-map-wrapper">
  <iframe
    src="https://adsb.wo0f.com/"
    title="WOØF Live ADS-B Aircraft Tracking"
    loading="lazy"
    allowfullscreen>
  </iframe>
</div>

<div style="text-align:center;margin:20px 0 30px;">
  <a class="adsb-map-button"
     href="https://adsb.wo0f.com/"
     target="_blank"
     rel="noopener">
    Open Full-Screen Aircraft Map ↗
  </a>
</div>

## About the Receiving Station

The WOØF ADS-B station uses dedicated software-defined radio receivers to monitor aircraft transponder transmissions.

- **Location:** Shoreline, Washington
- **1090 MHz:** ADS-B / Mode S reception
- **978 MHz:** Universal Access Transceiver (UAT)
- **Tracking software:** readsb and tar1090
- **Hosting:** Local Ubuntu Linux server
- **Data access:** Cloudflare Tunnel over HTTPS

Aircraft visibility depends on altitude, terrain, antenna coverage, and radio propagation.

The station also contributes aircraft data to FlightAware and ADS-B Exchange.

*Aircraft tracking data is provided for informational and amateur radio experimentation purposes.*

<script>
(function () {
  "use strict";

  const BASE = "https://adsb.wo0f.com";
  const REFRESH_MS = 5000;
  const MAX_SEEN_SECONDS = 60;
  const MAX_FEED_AGE_SECONDS = 120;

  let updating = false;

  function setCard(band, count, status, state, success) {
    const countEl = document.getElementById("adsb-count-" + band);
    const statusEl = document.getElementById("adsb-status-" + band);
    const dotEl = document.getElementById("adsb-dot-" + band);
    const updatedEl = document.getElementById("adsb-updated-" + band);

    if (!countEl || !statusEl || !dotEl || !updatedEl) return;

    countEl.textContent = count === null ? "—" : count;
    statusEl.textContent = status;
    dotEl.className = "adsb-status-dot " + state;

    if (success) {
      updatedEl.textContent =
        "Last checked: " + new Date().toLocaleTimeString();
    } else {
      updatedEl.textContent = "Unable to update";
    }
  }

  async function getAircraft(path) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

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
        Math.abs(Date.now() / 1000 - feedTime) >
          MAX_FEED_AGE_SECONDS
      ) {
        throw new Error("Stale aircraft data");
      }

      return data.aircraft.filter(a =>
        a.seen === undefined ||
        Number(a.seen) <= MAX_SEEN_SECONDS
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

      // 978 MHz independent count
      if (uat.status === "fulfilled") {
        const count = uat.value.length;

        setCard(
          "978",
          count,
          count > 0 ? "Live aircraft detected" : "Online - No aircraft",
          "online",
          true
        );
      } else {
        setCard(
          "978",
          null,
          "Feed unavailable or stale",
          "offline",
          false
        );
      }

      // 1090 MHz independent count
      // Exclude UAT aircraft already merged into readsb.
      if (
        main.status === "fulfilled" &&
        uat.status === "fulfilled"
      ) {
        const uatHex = new Set(
          uat.value.map(a => a.hex)
        );

        const count = main.value.filter(a =>
          !uatHex.has(a.hex) &&
          !String(a.type || "").startsWith("uat")
        ).length;

        setCard(
          "1090",
          count,
          count > 0 ? "Live aircraft detected" : "Online - No aircraft",
          "online",
          true
        );
      } else if (main.status === "fulfilled") {
        setCard(
          "1090",
          null,
          "Waiting for UAT feed",
          "warning",
          false
        );
      } else {
        setCard(
          "1090",
          null,
          "Feed unavailable or stale",
          "offline",
          false
        );
      }
    } finally {
      updating = false;
    }
  }

  function start() {
    refreshCounts();

    setInterval(refreshCounts, REFRESH_MS);

    document.addEventListener(
      "visibilitychange",
      refreshCounts
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, {
      once: true
    });
  } else {
    start();
  }
})();
</script>
