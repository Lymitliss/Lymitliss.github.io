---
layout: default
title: ADS-B Aircraft Tracking
description: Live 1090 MHz ADS-B and 978 MHz UAT aircraft tracking from the WOØF receiving station in Shoreline, Washington.
permalink: /adsb/
---

# ADS-B Aircraft Tracking

Live aircraft tracking from the WOØF receiving station in Shoreline, Washington.

Our station monitors aircraft transmissions on both **1090 MHz ADS-B** and **978 MHz UAT**, covering the greater Seattle and Puget Sound region.

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:15px;margin:20px 0;">

  <div style="background:#161b22;border:1px solid #30363d;border-radius:10px;padding:18px;">
    <h3 style="margin:0 0 8px;color:#e6edf3;">1090 MHz ADS-B</h3>
    <p style="color:#8b949e;margin:0 0 12px;">
      Aircraft position and identification broadcasts, primarily from commercial and general aviation aircraft.
    </p>
    <a href="https://adsb.wo0f.com/data/aircraft.json" target="_blank" rel="noopener">
      View live data →
    </a>
  </div>

  <div style="background:#161b22;border:1px solid #30363d;border-radius:10px;padding:18px;">
    <h3 style="margin:0 0 8px;color:#e6edf3;">978 MHz UAT</h3>
    <p style="color:#8b949e;margin:0 0 12px;">
      Aircraft broadcasts using the Universal Access Transceiver system, primarily from equipped general aviation aircraft.
    </p>
    <a href="https://adsb.wo0f.com/woof-uat/aircraft.json" target="_blank" rel="noopener">
      View live data →
    </a>
  </div>

</div>

## Live Aircraft Map

The interactive map below displays aircraft received by the WOØF station. The dashboard includes independent 1090 MHz and 978 MHz aircraft counters, aircraft details, flight paths, and reception coverage.

<div style="margin:20px 0;border:1px solid #30363d;border-radius:10px;overflow:hidden;background:#0d1117;">
  <iframe
    src="https://adsb.wo0f.com/"
    title="WOØF Live ADS-B Aircraft Tracking"
    style="display:block;width:100%;height:760px;border:0;"
    loading="lazy"
    allowfullscreen>
  </iframe>
</div>

<div style="text-align:center;margin:20px 0 30px;">
  <a href="https://adsb.wo0f.com/"
     target="_blank"
     rel="noopener"
     style="display:inline-block;background:#238636;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">
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
