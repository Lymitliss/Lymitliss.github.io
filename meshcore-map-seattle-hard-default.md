---
layout: default
title: MeshCore Map
permalink: /meshcore-map/
---

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
  crossorigin=""
/>
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css"
/>
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css"
/>

<section class="meshcore-map-page">
  <div class="meshcore-page-head">
    <div>
      <h1>MeshCore Live Map</h1>
      <p>
        Live MeshCore node map for clients, repeaters, room servers, and other reported nodes.
        This version adds shareable filters, favorites, recent-activity filtering, quick regional
        views, and a full node details drawer.
      </p>
    </div>
  </div>

  <div class="meshcore-map-toolbar">
    <div class="meshcore-map-status-group">
      <div class="meshcore-map-pill" id="meshcore-live-pill">Connecting…</div>
      <div class="meshcore-map-pill" id="meshcore-refresh-pill">Auto refresh: 60s</div>
      <div class="meshcore-map-pill" id="meshcore-source-pill">Source: pending</div>
    </div>

    <div class="meshcore-map-actions">
      <button id="meshcore-refresh-btn" type="button">Refresh now</button>
      <button id="meshcore-fit-btn" type="button">Fit filtered nodes</button>
      <button id="meshcore-share-btn" type="button">Copy share link</button>
      <button id="meshcore-basemap-btn" type="button">Dark map: on</button>
      <a href="https://map.meshcore.io/" target="_blank" rel="noopener noreferrer">Open official MeshCore map</a>
    </div>
  </div>

  <div class="meshcore-preset-row" aria-label="Regional quick views">
    <button class="meshcore-preset-btn" data-preset="loaded" type="button">Loaded nodes</button>
    <button class="meshcore-preset-btn" data-preset="seattle" type="button">Seattle Metro</button>
    <button class="meshcore-preset-btn" data-preset="puget" type="button">Puget Sound</button>
    <button class="meshcore-preset-btn" data-preset="washington" type="button">Washington</button>
    <button class="meshcore-preset-btn" data-preset="pacific-nw" type="button">Pacific Northwest</button>
    <button class="meshcore-preset-btn" data-preset="north-america" type="button">North America</button>
  </div>

  <div class="meshcore-stat-cards">
    <div class="meshcore-stat-card">
      <div class="label">Shown</div>
      <div class="value" id="meshcore-card-total">0</div>
      <div class="sub">Filtered nodes</div>
    </div>
    <div class="meshcore-stat-card">
      <div class="label">Repeaters</div>
      <div class="value" id="meshcore-card-repeaters">0</div>
      <div class="sub">Filtered repeaters</div>
    </div>
    <div class="meshcore-stat-card">
      <div class="label">Room Servers</div>
      <div class="value" id="meshcore-card-rooms">0</div>
      <div class="sub">Filtered room servers</div>
    </div>
    <div class="meshcore-stat-card">
      <div class="label">Countries</div>
      <div class="value" id="meshcore-card-countries">0</div>
      <div class="sub">Reported countries</div>
    </div>
    <div class="meshcore-stat-card">
      <div class="label">Newest advert</div>
      <div class="value meshcore-small" id="meshcore-card-newest">—</div>
      <div class="sub">Most recent seen time</div>
    </div>
    <div class="meshcore-stat-card">
      <div class="label">In current view</div>
      <div class="value" id="meshcore-card-visible">0</div>
      <div class="sub" id="meshcore-card-visible-sub">0 repeaters visible</div>
    </div>
  </div>

  <div class="meshcore-map-grid">
    <aside class="meshcore-map-panel">
      <div class="meshcore-panel-section">
        <h2>Filters</h2>

        <label class="meshcore-map-label" for="meshcore-search">Search node</label>
        <input id="meshcore-search" type="text" placeholder="Callsign, node name, role, key…" />

        <div class="meshcore-field-grid">
          <div>
            <label class="meshcore-map-label" for="meshcore-recent-filter">Recent activity</label>
            <select id="meshcore-recent-filter">
              <option value="any">Any time</option>
              <option value="1h">Last hour</option>
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
          </div>

          <div>
            <label class="meshcore-map-label" for="meshcore-sort">Sort results</label>
            <select id="meshcore-sort">
              <option value="newest">Newest activity</option>
              <option value="name">Name A–Z</option>
              <option value="role">Role</option>
            </select>
          </div>
        </div>

        <div class="meshcore-map-checklist">
          <label><input type="checkbox" value="client" checked /> Clients</label>
          <label><input type="checkbox" value="repeater" checked /> Repeaters</label>
          <label><input type="checkbox" value="room" checked /> Room Servers</label>
          <label><input type="checkbox" value="sensor" checked /> Sensors</label>
          <label><input type="checkbox" value="other" checked /> Other</label>
        </div>

        <div class="meshcore-toggle-grid">
          <label class="meshcore-switch">
            <input id="meshcore-named-only" type="checkbox" />
            <span>Only nodes with names</span>
          </label>
          <label class="meshcore-switch">
            <input id="meshcore-favorites-only" type="checkbox" />
            <span>Favorites only</span>
          </label>
        </div>

        <div class="meshcore-map-stats">
          <div><strong>Total shown:</strong> <span id="meshcore-total-count">0</span></div>
          <div><strong>Clients:</strong> <span id="meshcore-client-count">0</span></div>
          <div><strong>Repeaters:</strong> <span id="meshcore-repeater-count">0</span></div>
          <div><strong>Room Servers:</strong> <span id="meshcore-room-count">0</span></div>
          <div><strong>Sensors:</strong> <span id="meshcore-sensor-count">0</span></div>
          <div><strong>Other:</strong> <span id="meshcore-other-count">0</span></div>
        </div>

        <div class="meshcore-map-note" id="meshcore-last-updated">Last updated: —</div>
        <div class="meshcore-map-note" id="meshcore-visible-note">Visible in current bounds: 0 total • 0 repeaters</div>
        <div class="meshcore-map-note" id="meshcore-message">
          This page tries the public MeshCore API first. If your browser blocks it, it
          automatically falls back to <code>/meshcore-api/nodes</code>.
        </div>
      </div>

      <div class="meshcore-panel-section">
        <h3>Legend</h3>
        <div class="meshcore-legend-list">
          <div><span class="meshcore-dot role-client"></span> Client</div>
          <div><span class="meshcore-dot role-repeater"></span> Repeater</div>
          <div><span class="meshcore-dot role-room"></span> Room Server</div>
          <div><span class="meshcore-dot role-sensor"></span> Sensor</div>
          <div><span class="meshcore-dot role-other"></span> Other</div>
          <div><span class="meshcore-fav-dot">★</span> Favorite</div>
        </div>
      </div>

      <div class="meshcore-panel-section meshcore-results-section">
        <div class="meshcore-results-head">
          <h3>Results</h3>
          <div class="meshcore-results-meta" id="meshcore-results-meta">Showing top 0</div>
        </div>
        <div class="meshcore-results-list" id="meshcore-results"></div>
      </div>
    </aside>

    <div class="meshcore-map-wrap">
      <div id="meshcore-copy-toast" class="meshcore-copy-toast" aria-live="polite"></div>
      <div id="meshcore-map" class="dark-basemap"></div>

      <aside id="meshcore-drawer" class="meshcore-drawer" aria-hidden="true">
        <button id="meshcore-drawer-close" class="meshcore-drawer-close" type="button" aria-label="Close details">×</button>
        <div class="meshcore-drawer-body">
          <div class="meshcore-drawer-topline">
            <span class="meshcore-role-badge" id="meshcore-drawer-role">Node</span>
            <button id="meshcore-drawer-favorite" class="meshcore-favorite-btn" type="button">☆ Favorite</button>
          </div>

          <h3 id="meshcore-drawer-title">Select a node</h3>
          <p class="meshcore-drawer-sub" id="meshcore-drawer-sub">Click a node marker or result row to view details.</p>

          <dl class="meshcore-drawer-grid">
            <dt>Public key / ID</dt><dd id="meshcore-drawer-id">—</dd>
            <dt>Coordinates</dt><dd id="meshcore-drawer-coords">—</dd>
            <dt>Country</dt><dd id="meshcore-drawer-country">—</dd>
            <dt>Region</dt><dd id="meshcore-drawer-region">—</dd>
            <dt>Frequency</dt><dd id="meshcore-drawer-freq">—</dd>
            <dt>Bandwidth</dt><dd id="meshcore-drawer-bw">—</dd>
            <dt>Coding rate</dt><dd id="meshcore-drawer-cr">—</dd>
            <dt>Spreading factor</dt><dd id="meshcore-drawer-sf">—</dd>
            <dt>Last advert</dt><dd id="meshcore-drawer-updated">—</dd>
            <dt>MeshCore link</dt><dd id="meshcore-drawer-link">—</dd>
          </dl>

          <div class="meshcore-drawer-actions">
            <button id="meshcore-copy-key" type="button">Copy key</button>
            <button id="meshcore-copy-coords" type="button">Copy coords</button>
            <button id="meshcore-copy-link" type="button">Copy MeshCore link</button>
            <button id="meshcore-center-node" type="button">Center on node</button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</section>

<style>
  .meshcore-map-page {
    --meshcore-bg: #0b0f16;
    --meshcore-panel: #121821;
    --meshcore-panel-2: #0f141d;
    --meshcore-border: #253040;
    --meshcore-text: #edf2fb;
    --meshcore-muted: #a6b0c0;
    --meshcore-accent: #f7c948;
    --meshcore-accent-2: #8ab4ff;
    --meshcore-client: #56c5ff;
    --meshcore-repeater: #7ce577;
    --meshcore-room: #ffb24b;
    --meshcore-sensor: #ff66d8;
    --meshcore-other: #ab91ff;
    --meshcore-danger: #ff7a7a;
    --meshcore-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
    color: var(--meshcore-text);
  }

  .meshcore-map-page h1,
  .meshcore-map-page h2,
  .meshcore-map-page h3 {
    margin-top: 0;
  }

  .meshcore-page-head p {
    max-width: 76ch;
    color: var(--meshcore-muted);
    margin-bottom: 0;
  }

  .meshcore-map-toolbar,
  .meshcore-map-panel,
  .meshcore-map-wrap,
  .meshcore-stat-card,
  .meshcore-preset-btn {
    background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)), var(--meshcore-panel);
    border: 1px solid var(--meshcore-border);
    border-radius: 16px;
    box-shadow: var(--meshcore-shadow);
  }

  .meshcore-map-toolbar {
    display: flex;
    gap: 14px;
    justify-content: space-between;
    align-items: center;
    padding: 14px;
    margin: 18px 0 14px;
    flex-wrap: wrap;
  }

  .meshcore-map-status-group,
  .meshcore-map-actions,
  .meshcore-preset-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
  }

  .meshcore-map-pill {
    border: 1px solid var(--meshcore-border);
    background: rgba(255, 255, 255, 0.03);
    color: var(--meshcore-text);
    border-radius: 999px;
    padding: 8px 12px;
    font-size: 0.92rem;
    line-height: 1.1;
  }

  .meshcore-map-pill.live {
    border-color: rgba(124, 229, 119, 0.55);
    color: #cff5c8;
  }

  .meshcore-map-pill.warn {
    border-color: rgba(255, 178, 75, 0.5);
    color: #ffdca1;
  }

  .meshcore-map-pill.error {
    border-color: rgba(255, 122, 122, 0.5);
    color: #ffd1d1;
  }

  .meshcore-map-actions button,
  .meshcore-map-actions a,
  .meshcore-preset-btn,
  .meshcore-drawer-actions button,
  .meshcore-favorite-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    padding: 0 14px;
    border-radius: 10px;
    border: 1px solid var(--meshcore-border);
    background: rgba(255, 255, 255, 0.04);
    color: var(--meshcore-text);
    text-decoration: none;
    cursor: pointer;
    font: inherit;
    transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease, transform 0.15s ease;
  }

  .meshcore-map-actions button:hover,
  .meshcore-map-actions a:hover,
  .meshcore-preset-btn:hover,
  .meshcore-drawer-actions button:hover,
  .meshcore-favorite-btn:hover {
    border-color: var(--meshcore-accent);
    color: var(--meshcore-accent);
    transform: translateY(-1px);
  }

  .meshcore-map-actions button.active,
  .meshcore-preset-btn.active,
  .meshcore-favorite-btn.active {
    border-color: var(--meshcore-accent);
    color: var(--meshcore-accent);
    background: rgba(247, 201, 72, 0.08);
  }

  .meshcore-preset-row {
    margin-bottom: 14px;
  }

  .meshcore-preset-btn {
    min-height: 38px;
    padding: 0 12px;
  }

  .meshcore-stat-cards {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 14px;
    margin-bottom: 18px;
  }

  .meshcore-stat-card {
    padding: 14px 16px;
  }

  .meshcore-stat-card .label {
    color: var(--meshcore-muted);
    font-size: 0.88rem;
    margin-bottom: 8px;
  }

  .meshcore-stat-card .value {
    font-size: 1.75rem;
    line-height: 1.1;
    font-weight: 800;
  }

  .meshcore-stat-card .value.meshcore-small {
    font-size: 1rem;
    line-height: 1.3;
    font-weight: 700;
  }

  .meshcore-stat-card .sub {
    color: var(--meshcore-muted);
    font-size: 0.87rem;
    margin-top: 8px;
  }

  .meshcore-map-grid {
    display: grid;
    grid-template-columns: 360px minmax(0, 1fr);
    gap: 18px;
    align-items: start;
  }

  .meshcore-map-panel {
    padding: 18px;
    position: sticky;
    top: 18px;
  }

  .meshcore-panel-section + .meshcore-panel-section {
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid var(--meshcore-border);
  }

  .meshcore-map-label {
    display: block;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .meshcore-field-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 14px;
  }

  .meshcore-map-panel input[type="text"],
  .meshcore-map-panel select {
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid var(--meshcore-border);
    background: #0b1018;
    color: var(--meshcore-text);
    padding: 11px 12px;
    margin-bottom: 0;
  }

  .meshcore-map-checklist {
    display: grid;
    gap: 8px;
    margin-bottom: 14px;
  }

  .meshcore-map-checklist label,
  .meshcore-switch {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .meshcore-toggle-grid {
    display: grid;
    gap: 10px;
    margin-bottom: 8px;
  }

  .meshcore-map-stats {
    display: grid;
    gap: 8px;
    border-top: 1px solid var(--meshcore-border);
    border-bottom: 1px solid var(--meshcore-border);
    padding: 14px 0;
    margin: 16px 0;
  }

  .meshcore-map-note {
    color: var(--meshcore-muted);
    font-size: 0.94rem;
    line-height: 1.45;
    margin-bottom: 10px;
  }

  .meshcore-map-note code {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    padding: 2px 6px;
  }

  .meshcore-legend-list {
    display: grid;
    gap: 10px;
  }

  .meshcore-legend-list div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .meshcore-dot,
  .meshcore-fav-dot {
    width: 14px;
    height: 14px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.72rem;
    line-height: 1;
  }

  .meshcore-fav-dot {
    border-radius: 0;
    color: var(--meshcore-accent);
    width: auto;
    height: auto;
  }

  .role-client { background: var(--meshcore-client); }
  .role-repeater { background: var(--meshcore-repeater); }
  .role-room { background: var(--meshcore-room); }
  .role-sensor { background: var(--meshcore-sensor); }
  .role-other { background: var(--meshcore-other); }

  .meshcore-results-head {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: baseline;
    margin-bottom: 10px;
  }

  .meshcore-results-meta {
    color: var(--meshcore-muted);
    font-size: 0.88rem;
  }

  .meshcore-results-list {
    display: grid;
    gap: 10px;
    max-height: 620px;
    overflow: auto;
    padding-right: 4px;
  }

  .meshcore-result-item {
    border: 1px solid var(--meshcore-border);
    background: var(--meshcore-panel-2);
    border-radius: 12px;
    padding: 12px;
    display: grid;
    gap: 8px;
    cursor: pointer;
  }

  .meshcore-result-item:hover,
  .meshcore-result-item.active {
    border-color: var(--meshcore-accent-2);
    background: rgba(138, 180, 255, 0.06);
  }

  .meshcore-result-top {
    display: flex;
    gap: 8px;
    justify-content: space-between;
    align-items: start;
  }

  .meshcore-result-title {
    font-weight: 700;
    line-height: 1.25;
  }

  .meshcore-result-meta,
  .meshcore-result-coords {
    color: var(--meshcore-muted);
    font-size: 0.88rem;
    line-height: 1.35;
  }

  .meshcore-result-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
  }

  .meshcore-role-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 26px;
    border-radius: 999px;
    padding: 0 10px;
    font-size: 0.84rem;
    font-weight: 700;
    border: 1px solid var(--meshcore-border);
    background: rgba(255, 255, 255, 0.04);
  }

  .meshcore-role-badge.client { color: var(--meshcore-client); }
  .meshcore-role-badge.repeater { color: var(--meshcore-repeater); }
  .meshcore-role-badge.room { color: var(--meshcore-room); }
  .meshcore-role-badge.sensor { color: var(--meshcore-sensor); }
  .meshcore-role-badge.other { color: var(--meshcore-other); }

  .meshcore-star-btn {
    border: 1px solid var(--meshcore-border);
    background: transparent;
    color: var(--meshcore-muted);
    border-radius: 10px;
    min-width: 38px;
    min-height: 38px;
    cursor: pointer;
    font: inherit;
  }

  .meshcore-star-btn:hover,
  .meshcore-star-btn.active {
    border-color: var(--meshcore-accent);
    color: var(--meshcore-accent);
    background: rgba(247, 201, 72, 0.08);
  }

  .meshcore-empty-state {
    border: 1px dashed var(--meshcore-border);
    border-radius: 12px;
    padding: 16px;
    color: var(--meshcore-muted);
    background: rgba(255, 255, 255, 0.02);
  }

  .meshcore-map-wrap {
    padding: 10px;
    position: relative;
    overflow: hidden;
  }

  #meshcore-map {
    width: 100%;
    min-height: 820px;
    border-radius: 12px;
    overflow: hidden;
    background: #071018;
  }

  #meshcore-map.dark-basemap .leaflet-tile {
    filter: brightness(0.68) saturate(0.8) contrast(1.04);
  }

  /* Protect Leaflet tiles/markers from site-wide image rules */
  #meshcore-map .leaflet-pane img,
  #meshcore-map .leaflet-tile,
  #meshcore-map .leaflet-marker-icon,
  #meshcore-map .leaflet-marker-shadow,
  #meshcore-map .leaflet-control img {
    max-width: none !important;
    max-height: none !important;
    width: auto;
    height: auto;
  }

  #meshcore-map .leaflet-tile {
    display: block;
  }

  .meshcore-node-marker {
    width: 18px;
    height: 18px;
    border-radius: 999px;
    border: 2px solid rgba(255, 255, 255, 0.96);
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.34);
    position: relative;
  }

  .meshcore-node-marker.favorite::after {
    content: "★";
    position: absolute;
    right: -7px;
    top: -8px;
    font-size: 0.74rem;
    color: var(--meshcore-accent);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.65);
  }

  .meshcore-copy-toast {
    position: absolute;
    z-index: 1200;
    top: 22px;
    right: 22px;
    background: rgba(11, 16, 24, 0.92);
    border: 1px solid var(--meshcore-border);
    color: var(--meshcore-text);
    border-radius: 10px;
    padding: 10px 12px;
    box-shadow: var(--meshcore-shadow);
    opacity: 0;
    transform: translateY(-6px);
    pointer-events: none;
    transition: opacity 0.18s ease, transform 0.18s ease;
  }

  .meshcore-copy-toast.show {
    opacity: 1;
    transform: translateY(0);
  }

  .meshcore-drawer {
    position: absolute;
    top: 18px;
    right: 18px;
    width: min(390px, calc(100% - 36px));
    max-height: calc(100% - 36px);
    border: 1px solid var(--meshcore-border);
    background: rgba(11, 16, 24, 0.95);
    backdrop-filter: blur(8px);
    border-radius: 16px;
    box-shadow: var(--meshcore-shadow);
    z-index: 1100;
    transform: translateX(calc(100% + 24px));
    transition: transform 0.2s ease;
    overflow: auto;
  }

  .meshcore-drawer.open {
    transform: translateX(0);
  }

  .meshcore-drawer-close {
    position: absolute;
    top: 10px;
    right: 10px;
    border: 1px solid var(--meshcore-border);
    background: transparent;
    color: var(--meshcore-text);
    border-radius: 10px;
    width: 36px;
    height: 36px;
    cursor: pointer;
    font-size: 1.25rem;
    line-height: 1;
  }

  .meshcore-drawer-body {
    padding: 18px;
  }

  .meshcore-drawer-topline {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    margin-bottom: 12px;
    padding-right: 44px;
  }

  .meshcore-drawer-sub {
    color: var(--meshcore-muted);
    margin-top: -6px;
  }

  .meshcore-drawer-grid {
    margin: 0;
    display: grid;
    grid-template-columns: minmax(0, 132px) 1fr;
    gap: 8px 12px;
    font-size: 0.94rem;
  }

  .meshcore-drawer-grid dt {
    color: var(--meshcore-muted);
  }

  .meshcore-drawer-grid dd {
    margin: 0;
    word-break: break-word;
  }

  .meshcore-drawer-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 16px;
  }

  .leaflet-popup-content-wrapper,
  .leaflet-popup-tip {
    background: #141820;
    color: var(--meshcore-text);
  }

  @media (max-width: 1320px) {
    .meshcore-stat-cards {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 1080px) {
    .meshcore-map-grid {
      grid-template-columns: 1fr;
    }

    .meshcore-map-panel {
      position: static;
    }

    #meshcore-map {
      min-height: 680px;
    }
  }

  @media (max-width: 820px) {
    .meshcore-stat-cards {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .meshcore-field-grid {
      grid-template-columns: 1fr;
    }

    .meshcore-results-list {
      max-height: 360px;
    }

    .meshcore-drawer {
      left: 12px;
      right: 12px;
      width: auto;
      top: auto;
      bottom: 12px;
      max-height: 70%;
      transform: translateY(calc(100% + 20px));
    }

    .meshcore-drawer.open {
      transform: translateY(0);
    }

    .meshcore-drawer-actions {
      grid-template-columns: 1fr;
    }

    #meshcore-map {
      min-height: 560px;
    }
  }

  @media (max-width: 560px) {
    .meshcore-stat-cards {
      grid-template-columns: 1fr;
    }

    .meshcore-map-toolbar,
    .meshcore-map-panel,
    .meshcore-map-wrap {
      border-radius: 14px;
    }

    .meshcore-map-actions,
    .meshcore-map-status-group,
    .meshcore-preset-row {
      width: 100%;
    }

    .meshcore-map-actions > *,
    .meshcore-preset-row > * {
      flex: 1 1 calc(50% - 10px);
    }

    .meshcore-drawer-grid {
      grid-template-columns: 1fr;
    }

    .meshcore-drawer-grid dt {
      margin-top: 4px;
    }
  }
</style>

<script
  src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
  integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
  crossorigin=""
></script>
<script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>
<script>
  (() => {
    const REFRESH_MS = 60_000;
    const FETCH_TIMEOUT_MS = 12_000;
    const RESULTS_LIMIT = 250;
    const FAVORITES_KEY = "wo0fMeshcoreFavorites";
    const BASEMAP_KEY = "wo0fMeshcoreDarkBasemap";
    const API_CANDIDATES = [
      "https://map.meshcore.io/api/v1/nodes",
      "/meshcore-api/nodes"
    ];

    const ROLE_LABELS = {
      client: "Client",
      repeater: "Repeater",
      room: "Room Server",
      sensor: "Sensor",
      other: "Other"
    };

    const ROLE_ORDER = {
      repeater: 0,
      room: 1,
      client: 2,
      sensor: 3,
      other: 4
    };

    const RECENT_WINDOWS = {
      "1h": 60 * 60 * 1000,
      "24h": 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000
    };

    const REGION_PRESETS = {
      loaded: null,
      seattle: [[47.20, -122.55], [47.84, -121.95]],
      puget: [[46.82, -123.50], [48.55, -121.05]],
      washington: [[45.50, -124.95], [49.08, -116.82]],
      "pacific-nw": [[42.00, -125.80], [49.20, -116.40]],
      "north-america": [[7.00, -168.00], [72.00, -52.00]]
    };

    const countryNames = typeof Intl !== "undefined" && Intl.DisplayNames
      ? new Intl.DisplayNames(["en"], { type: "region" })
      : null;

    const els = {
      livePill: document.getElementById("meshcore-live-pill"),
      refreshPill: document.getElementById("meshcore-refresh-pill"),
      sourcePill: document.getElementById("meshcore-source-pill"),
      refreshBtn: document.getElementById("meshcore-refresh-btn"),
      fitBtn: document.getElementById("meshcore-fit-btn"),
      shareBtn: document.getElementById("meshcore-share-btn"),
      basemapBtn: document.getElementById("meshcore-basemap-btn"),
      search: document.getElementById("meshcore-search"),
      recent: document.getElementById("meshcore-recent-filter"),
      sort: document.getElementById("meshcore-sort"),
      namedOnly: document.getElementById("meshcore-named-only"),
      favoritesOnly: document.getElementById("meshcore-favorites-only"),
      typeBoxes: Array.from(document.querySelectorAll('.meshcore-map-checklist input[type="checkbox"]')),
      total: document.getElementById("meshcore-total-count"),
      client: document.getElementById("meshcore-client-count"),
      repeater: document.getElementById("meshcore-repeater-count"),
      room: document.getElementById("meshcore-room-count"),
      sensor: document.getElementById("meshcore-sensor-count"),
      other: document.getElementById("meshcore-other-count"),
      updated: document.getElementById("meshcore-last-updated"),
      visibleNote: document.getElementById("meshcore-visible-note"),
      message: document.getElementById("meshcore-message"),
      results: document.getElementById("meshcore-results"),
      resultsMeta: document.getElementById("meshcore-results-meta"),
      cardTotal: document.getElementById("meshcore-card-total"),
      cardRepeaters: document.getElementById("meshcore-card-repeaters"),
      cardRooms: document.getElementById("meshcore-card-rooms"),
      cardCountries: document.getElementById("meshcore-card-countries"),
      cardNewest: document.getElementById("meshcore-card-newest"),
      cardVisible: document.getElementById("meshcore-card-visible"),
      cardVisibleSub: document.getElementById("meshcore-card-visible-sub"),
      copyToast: document.getElementById("meshcore-copy-toast"),
      drawer: document.getElementById("meshcore-drawer"),
      drawerClose: document.getElementById("meshcore-drawer-close"),
      drawerRole: document.getElementById("meshcore-drawer-role"),
      drawerTitle: document.getElementById("meshcore-drawer-title"),
      drawerSub: document.getElementById("meshcore-drawer-sub"),
      drawerId: document.getElementById("meshcore-drawer-id"),
      drawerCoords: document.getElementById("meshcore-drawer-coords"),
      drawerCountry: document.getElementById("meshcore-drawer-country"),
      drawerRegion: document.getElementById("meshcore-drawer-region"),
      drawerFreq: document.getElementById("meshcore-drawer-freq"),
      drawerBw: document.getElementById("meshcore-drawer-bw"),
      drawerCr: document.getElementById("meshcore-drawer-cr"),
      drawerSf: document.getElementById("meshcore-drawer-sf"),
      drawerUpdated: document.getElementById("meshcore-drawer-updated"),
      drawerLink: document.getElementById("meshcore-drawer-link"),
      drawerFavorite: document.getElementById("meshcore-drawer-favorite"),
      copyKey: document.getElementById("meshcore-copy-key"),
      copyCoords: document.getElementById("meshcore-copy-coords"),
      copyLink: document.getElementById("meshcore-copy-link"),
      centerNode: document.getElementById("meshcore-center-node"),
      presetButtons: Array.from(document.querySelectorAll(".meshcore-preset-btn")),
      mapEl: document.getElementById("meshcore-map")
    };

    const urlState = readUrlState();
    const favorites = new Set(readStoredFavorites());
    let darkBasemap = readStoredBasemap();
    if (typeof urlState.darkBasemap === "boolean") {
      darkBasemap = urlState.darkBasemap;
    }

    const INITIAL_SEATTLE_CENTER = [47.6062, -122.3321];
    const INITIAL_SEATTLE_ZOOM = 7;

    const map = L.map("meshcore-map", {
      zoomControl: true,
      worldCopyJump: true,
      preferCanvas: true
    }).setView(INITIAL_SEATTLE_CENTER, INITIAL_SEATTLE_ZOOM);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const clusterGroup = L.markerClusterGroup({
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      maxClusterRadius: 52,
      chunkedLoading: true,
      chunkInterval: 100,
      chunkDelay: 25
    });

    map.addLayer(clusterGroup);

    let allNodes = [];
    let filteredNodes = [];
    let visibleMarkers = [];
    let markersById = new Map();
    let selectedNodeId = null;
    let firstFitDone = true;
    let refreshTimer = null;
    let countdownTimer = null;
    let nextRefreshAt = Date.now() + REFRESH_MS;
    let urlSyncPending = false;
    let toastTimer = null;

    initializeUiFromState();
    applyBasemapMode();

    function initializeUiFromState() {
      els.search.value = urlState.query || "";
      els.recent.value = urlState.recent || "any";
      els.sort.value = urlState.sort || "newest";
      els.namedOnly.checked = Boolean(urlState.namedOnly);
      els.favoritesOnly.checked = Boolean(urlState.favoritesOnly);

      const typeSet = new Set(urlState.types?.length ? urlState.types : ["client", "repeater", "room", "sensor", "other"]);
      els.typeBoxes.forEach((box) => {
        box.checked = typeSet.has(box.value);
      });

      els.basemapBtn.classList.toggle("active", darkBasemap);
      els.basemapBtn.textContent = `Dark map: ${darkBasemap ? "on" : "off"}`;
    }

    function setPillState(el, text, state) {
      el.textContent = text;
      el.classList.remove("live", "warn", "error");
      if (state) el.classList.add(state);
    }

    function roleKeyFromNode(node) {
      const rawValue = node.role ?? node.type ?? node.nodeType ?? node.kind ?? node.deviceType ?? "other";
      const raw = String(rawValue).toLowerCase().trim();
      if (raw === "1" || raw === "chat" || raw.includes("client") || raw.includes("companion") || raw.includes("node")) return "client";
      if (raw === "2" || raw.includes("repeat")) return "repeater";
      if (raw === "3" || raw.includes("room")) return "room";
      if (raw === "4" || raw.includes("sensor")) return "sensor";
      return "other";
    }

    function getColorForRole(role) {
      switch (role) {
        case "client": return "#56c5ff";
        case "repeater": return "#7ce577";
        case "room": return "#ffb24b";
        case "sensor": return "#ff66d8";
        default: return "#ab91ff";
      }
    }

    function extractCoord(node, keys) {
      for (const key of keys) {
        const value = key.split(".").reduce((acc, part) => acc && acc[part], node);
        const num = Number(value);
        if (Number.isFinite(num)) return num;
      }
      return null;
    }

    function parseTimestamp(value) {
      if (value === null || value === undefined || value === "") return null;
      const direct = new Date(value);
      if (!Number.isNaN(direct.getTime())) return direct.getTime();

      const asNum = Number(value);
      if (Number.isFinite(asNum)) {
        const date = new Date(asNum > 1e12 ? asNum : asNum * 1000);
        if (!Number.isNaN(date.getTime())) return date.getTime();
      }
      return null;
    }

    function formatTimestamp(value) {
      const ts = typeof value === "number" ? value : parseTimestamp(value);
      if (!ts) return "—";
      return new Date(ts).toLocaleString();
    }

    function relativeTime(ts) {
      if (!ts) return "unknown";
      const diff = Date.now() - ts;
      if (diff < 0) return "just now";
      const minute = 60 * 1000;
      const hour = 60 * minute;
      const day = 24 * hour;
      if (diff < minute) return "just now";
      if (diff < hour) return `${Math.floor(diff / minute)}m ago`;
      if (diff < day) return `${Math.floor(diff / hour)}h ago`;
      return `${Math.floor(diff / day)}d ago`;
    }

    function normalizeCountry(node) {
      const raw = (
        node.country ||
        node.country_name ||
        node.countryName ||
        node.country_code ||
        node.countryCode ||
        node.cc ||
        node.params?.country ||
        node.params?.country_code ||
        node.params?.countryCode ||
        node.params?.cc ||
        ""
      );

      const text = String(raw || "").trim();
      if (!text) return { code: "", name: "" };
      if (text.length === 2) {
        const code = text.toUpperCase();
        const name = countryNames ? (countryNames.of(code) || code) : code;
        return { code, name };
      }
      return { code: "", name: text };
    }

    function normalizeNode(node, index) {
      const lat = extractCoord(node, [
        "lat", "latitude", "adv_lat", "advLat", "position.lat", "location.lat", "coords.lat", "gps.lat"
      ]);
      const lon = extractCoord(node, [
        "lon", "lng", "longitude", "adv_lon", "advLon", "position.lon", "position.lng", "location.lon", "location.lng", "coords.lon", "coords.lng", "gps.lon", "gps.lng"
      ]);

      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
      if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;

      const explicitName =
        node.name ||
        node.nodeName ||
        node.adv_name ||
        node.callsign ||
        node.displayName ||
        "";

      const role = roleKeyFromNode(node);
      const publicKey = String(node.public_key || node.publicKey || node.id || node.key || node.hash || "");
      const id = publicKey || `${explicitName || "node"}-${lat}-${lon}`;
      const country = normalizeCountry(node);
      const updatedRaw = node.updatedAt || node.updated_at || node.updated_date || node.lastSeen || node.last_seen || node.last_advert || node.timestamp || node.ts || null;
      const updatedTs = parseTimestamp(updatedRaw);

      const normalized = {
        raw: node,
        id,
        publicKey,
        name: String(explicitName || publicKey || `Node ${index + 1}`),
        hasReportedName: Boolean(explicitName),
        lat,
        lon,
        role,
        region: node.region || country.name || node.band || node.source || "—",
        countryName: country.name || "—",
        countryCode: country.code || "",
        hops: node.hops ?? node.distanceHops ?? node.hop_count ?? "—",
        frequency: node.frequency || node.freq || node.channel || node.params?.freq || "—",
        bandwidth: node.bandwidth || node.bw || node.params?.bw || "—",
        codingRate: node.codingRate || node.cr || node.params?.cr || "—",
        spreadingFactor: node.spreadingFactor || node.sf || node.params?.sf || "—",
        meshcoreLink: node.link || node.params?.link || "",
        updatedRaw,
        updatedTs,
        updatedText: formatTimestamp(updatedTs || updatedRaw),
        searchText: [
          explicitName,
          publicKey,
          role,
          node.region,
          node.band,
          node.country,
          node.countryCode,
          node.country_code,
          node.public_key,
          node.publicKey,
          node.adv_name,
          node.callsign,
          country.name,
          country.code
        ].filter(Boolean).join(" ").toLowerCase()
      };

      return normalized;
    }

    function normalizeResponse(data) {
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.nodes)
          ? data.nodes
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.items)
              ? data.items
              : [];

      return list.map(normalizeNode).filter(Boolean);
    }

    function invalidateMapSize() {
      requestAnimationFrame(() => map.invalidateSize(false));
      setTimeout(() => map.invalidateSize(false), 120);
      setTimeout(() => map.invalidateSize(false), 500);
    }

    function markerIcon(node) {
      const color = getColorForRole(node.role);
      const favoriteClass = favorites.has(node.id) ? " favorite" : "";
      return L.divIcon({
        className: "",
        html: `<div class="meshcore-node-marker${favoriteClass}" style="background:${color}"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });
    }

    function buildMarkers(nodes) {
      clusterGroup.clearLayers();
      visibleMarkers = [];
      markersById = new Map();

      for (const node of nodes) {
        const marker = L.marker([node.lat, node.lon], { icon: markerIcon(node) });
        marker.nodeData = node;
        marker.on("click", () => openDrawer(node.id));
        visibleMarkers.push(marker);
        markersById.set(node.id, marker);
      }

      clusterGroup.addLayers(visibleMarkers);
      setTimeout(invalidateMapSize, 60);
    }

    function getEnabledTypes() {
      return new Set(els.typeBoxes.filter((box) => box.checked).map((box) => box.value));
    }

    function filterByRecent(node, value) {
      if (!value || value === "any") return true;
      const windowMs = RECENT_WINDOWS[value];
      if (!windowMs) return true;
      if (!node.updatedTs) return false;
      return (Date.now() - node.updatedTs) <= windowMs;
    }

    function compareNodes(a, b, sortValue) {
      const favA = favorites.has(a.id) ? 1 : 0;
      const favB = favorites.has(b.id) ? 1 : 0;
      if (favA !== favB) return favB - favA;

      if (sortValue === "name") {
        return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
      }

      if (sortValue === "role") {
        const roleDiff = (ROLE_ORDER[a.role] ?? 99) - (ROLE_ORDER[b.role] ?? 99);
        if (roleDiff) return roleDiff;
        return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
      }

      const tsA = a.updatedTs || 0;
      const tsB = b.updatedTs || 0;
      if (tsA !== tsB) return tsB - tsA;
      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
    }

    function applyFilters() {
      const query = els.search.value.trim().toLowerCase();
      const enabledTypes = getEnabledTypes();
      const recentValue = els.recent.value;
      const sortValue = els.sort.value;
      const namedOnly = els.namedOnly.checked;
      const favoritesOnly = els.favoritesOnly.checked;

      filteredNodes = allNodes.filter((node) => {
        if (!enabledTypes.has(node.role)) return false;
        if (query && !node.searchText.includes(query)) return false;
        if (!filterByRecent(node, recentValue)) return false;
        if (namedOnly && !node.hasReportedName) return false;
        if (favoritesOnly && !favorites.has(node.id)) return false;
        return true;
      }).sort((a, b) => compareNodes(a, b, sortValue));

      updateStats(filteredNodes);
      buildMarkers(filteredNodes);
      updateResults(filteredNodes);
      updateVisibleStats();
      syncUrlStateSoon();

      if (!firstFitDone && filteredNodes.length) {
        fitToMarkers();
        firstFitDone = true;
      }

      if (selectedNodeId && !filteredNodes.some((node) => node.id === selectedNodeId)) {
        closeDrawer();
      } else if (selectedNodeId) {
        renderDrawer(filteredNodes.find((node) => node.id === selectedNodeId));
      }
    }

    function updateStats(nodes) {
      const counts = { client: 0, repeater: 0, room: 0, sensor: 0, other: 0 };
      const countries = new Set();
      let newestTs = null;

      for (const node of nodes) {
        counts[node.role] = (counts[node.role] || 0) + 1;
        if (node.countryName && node.countryName !== "—") countries.add(node.countryName);
        if (node.updatedTs && (!newestTs || node.updatedTs > newestTs)) newestTs = node.updatedTs;
      }

      els.total.textContent = String(nodes.length);
      els.client.textContent = String(counts.client || 0);
      els.repeater.textContent = String(counts.repeater || 0);
      els.room.textContent = String(counts.room || 0);
      els.sensor.textContent = String(counts.sensor || 0);
      els.other.textContent = String(counts.other || 0);

      els.cardTotal.textContent = String(nodes.length);
      els.cardRepeaters.textContent = String(counts.repeater || 0);
      els.cardRooms.textContent = String(counts.room || 0);
      els.cardCountries.textContent = String(countries.size);
      els.cardNewest.textContent = newestTs ? `${relativeTime(newestTs)} • ${new Date(newestTs).toLocaleString()}` : "—";
    }

    function updateResults(nodes) {
      const shown = nodes.slice(0, RESULTS_LIMIT);
      els.resultsMeta.textContent = nodes.length > RESULTS_LIMIT
        ? `Showing top ${shown.length} of ${nodes.length}`
        : `Showing ${shown.length}`;

      if (!shown.length) {
        els.results.innerHTML = `<div class="meshcore-empty-state">No nodes match the current filters.</div>`;
        return;
      }

      const html = shown.map((node) => {
        const favorite = favorites.has(node.id);
        const active = node.id === selectedNodeId;
        return `
          <div class="meshcore-result-item${active ? " active" : ""}" data-node-id="${escapeHtml(node.id)}">
            <div class="meshcore-result-top">
              <div>
                <div class="meshcore-result-title">${escapeHtml(node.name)}</div>
                <div class="meshcore-result-meta">${escapeHtml(ROLE_LABELS[node.role] || "Other")} • ${escapeHtml(relativeTime(node.updatedTs))}</div>
              </div>
              <button class="meshcore-star-btn${favorite ? " active" : ""}" type="button" data-favorite-id="${escapeHtml(node.id)}" aria-label="${favorite ? "Remove favorite" : "Add favorite"}">
                ${favorite ? "★" : "☆"}
              </button>
            </div>
            <div class="meshcore-result-tags">
              <span class="meshcore-role-badge ${escapeHtml(node.role)}">${escapeHtml(ROLE_LABELS[node.role] || "Other")}</span>
              ${node.hasReportedName ? `<span class="meshcore-role-badge">Named</span>` : ``}
              ${favorite ? `<span class="meshcore-role-badge">Favorite</span>` : ``}
            </div>
            <div class="meshcore-result-coords">
              ${node.lat.toFixed(4)}, ${node.lon.toFixed(4)}${node.countryName && node.countryName !== "—" ? ` • ${escapeHtml(node.countryName)}` : ""}
            </div>
          </div>
        `;
      }).join("");

      els.results.innerHTML = html;

      els.results.querySelectorAll("[data-node-id]").forEach((item) => {
        item.addEventListener("click", (event) => {
          const favoriteBtn = event.target.closest("[data-favorite-id]");
          if (favoriteBtn) return;
          openDrawer(item.getAttribute("data-node-id"));
        });
      });

      els.results.querySelectorAll("[data-favorite-id]").forEach((btn) => {
        btn.addEventListener("click", (event) => {
          event.stopPropagation();
          toggleFavorite(btn.getAttribute("data-favorite-id"));
        });
      });
    }

    function updateVisibleStats() {
      const bounds = map.getBounds();
      if (!bounds.isValid()) return;

      let visibleTotal = 0;
      let visibleRepeaters = 0;
      let visibleRooms = 0;
      let visibleClients = 0;

      for (const node of filteredNodes) {
        if (!bounds.contains([node.lat, node.lon])) continue;
        visibleTotal += 1;
        if (node.role === "repeater") visibleRepeaters += 1;
        if (node.role === "room") visibleRooms += 1;
        if (node.role === "client") visibleClients += 1;
      }

      els.cardVisible.textContent = String(visibleTotal);
      els.cardVisibleSub.textContent = `${visibleRepeaters} repeaters visible`;
      els.visibleNote.textContent = `Visible in current bounds: ${visibleTotal} total • ${visibleRepeaters} repeaters • ${visibleRooms} room servers • ${visibleClients} clients`;
    }

    function fitToMarkers() {
      if (!visibleMarkers.length) return;
      const group = L.featureGroup(visibleMarkers);
      const bounds = group.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds.pad(0.12), { maxZoom: 10 });
        invalidateMapSize();
      }
    }

    function applyPreset(name) {
      els.presetButtons.forEach((button) => button.classList.toggle("active", button.dataset.preset === name));

      if (name === "loaded") {
        fitToMarkers();
        syncUrlStateSoon();
        return;
      }

      const bounds = REGION_PRESETS[name];
      if (bounds) {
        map.fitBounds(bounds, { animate: true });
        syncUrlStateSoon();
      }
    }

    async function fetchWithTimeout(url) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
      try {
        const response = await fetch(url, {
          method: "GET",
          mode: "cors",
          cache: "no-store",
          signal: controller.signal,
          headers: { "Accept": "application/json" }
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();
      } finally {
        clearTimeout(timeout);
      }
    }

    async function getNodeData() {
      const errors = [];
      for (const url of API_CANDIDATES) {
        try {
          const data = await fetchWithTimeout(url);
          const nodes = normalizeResponse(data);
          if (!nodes.length) {
            errors.push(`${url}: response parsed but no mappable nodes were found`);
            continue;
          }
          return { nodes, source: url, errors };
        } catch (error) {
          errors.push(`${url}: ${error && error.message ? error.message : error}`);
        }
      }
      throw new Error(errors.join(" | "));
    }

    async function refreshData() {
      setPillState(els.livePill, "Refreshing…", "warn");
      try {
        const { nodes, source, errors } = await getNodeData();
        allNodes = nodes;
        els.updated.textContent = `Last updated: ${new Date().toLocaleString()}`;
        els.message.textContent = errors.length
          ? `Loaded successfully from ${source}. Previous attempts: ${errors.join(" • ")}`
          : `Loaded successfully from ${source}.`;
        setPillState(els.livePill, `Live • ${nodes.length} nodes loaded`, "live");
        els.sourcePill.textContent = `Source: ${source}`;
        applyFilters();
        invalidateMapSize();
      } catch (error) {
        allNodes = [];
        filteredNodes = [];
        updateStats([]);
        updateResults([]);
        updateVisibleStats();
        closeDrawer();
        setPillState(els.livePill, "Offline / blocked", "error");
        els.sourcePill.textContent = "Source: unavailable";
        els.message.textContent = `Unable to load MeshCore node data. ${error.message}. If the direct API is blocked by CORS on your domain, keep the fallback path at /meshcore-api/nodes with the included Cloudflare Worker.`;
      } finally {
        nextRefreshAt = Date.now() + REFRESH_MS;
      }
    }

    function startRefreshLoop() {
      if (refreshTimer) clearInterval(refreshTimer);
      if (countdownTimer) clearInterval(countdownTimer);

      refreshTimer = setInterval(refreshData, REFRESH_MS);
      countdownTimer = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((nextRefreshAt - Date.now()) / 1000));
        els.refreshPill.textContent = `Auto refresh: ${remaining}s`;
      }, 1000);
    }

    function readStoredFavorites() {
      try {
        const parsed = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }

    function persistFavorites() {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    }

    function readStoredBasemap() {
      try {
        const raw = localStorage.getItem(BASEMAP_KEY);
        if (raw === null) return true;
        return raw === "true";
      } catch {
        return true;
      }
    }

    function persistBasemap() {
      localStorage.setItem(BASEMAP_KEY, String(darkBasemap));
    }

    function applyBasemapMode() {
      els.mapEl.classList.toggle("dark-basemap", darkBasemap);
      els.basemapBtn.classList.toggle("active", darkBasemap);
      els.basemapBtn.textContent = `Dark map: ${darkBasemap ? "on" : "off"}`;
      persistBasemap();
      syncUrlStateSoon();
    }

    function toggleFavorite(nodeId) {
      if (!nodeId) return;
      if (favorites.has(nodeId)) favorites.delete(nodeId);
      else favorites.add(nodeId);
      persistFavorites();
      applyFilters();
      if (selectedNodeId === nodeId) {
        renderDrawer(filteredNodes.find((node) => node.id === nodeId) || allNodes.find((node) => node.id === nodeId));
      }
    }

    function openDrawer(nodeId) {
      const node = filteredNodes.find((item) => item.id === nodeId) || allNodes.find((item) => item.id === nodeId);
      if (!node) return;
      selectedNodeId = node.id;
      renderDrawer(node);
      els.drawer.classList.add("open");
      els.drawer.setAttribute("aria-hidden", "false");
      updateResults(filteredNodes);
    }

    function closeDrawer() {
      selectedNodeId = null;
      els.drawer.classList.remove("open");
      els.drawer.setAttribute("aria-hidden", "true");
      updateResults(filteredNodes);
    }

    function renderDrawer(node) {
      if (!node) {
        closeDrawer();
        return;
      }

      const favorite = favorites.has(node.id);
      els.drawerRole.textContent = ROLE_LABELS[node.role] || "Other";
      els.drawerRole.className = `meshcore-role-badge ${node.role}`;
      els.drawerTitle.textContent = node.name;
      els.drawerSub.textContent = `${relativeTime(node.updatedTs)} • ${node.hasReportedName ? "Named node" : "Unnamed node"}`;
      els.drawerId.textContent = node.publicKey || node.id || "—";
      els.drawerCoords.textContent = `${node.lat.toFixed(5)}, ${node.lon.toFixed(5)}`;
      els.drawerCountry.textContent = node.countryName || "—";
      els.drawerRegion.textContent = node.region || "—";
      els.drawerFreq.textContent = String(node.frequency || "—");
      els.drawerBw.textContent = String(node.bandwidth || "—");
      els.drawerCr.textContent = String(node.codingRate || "—");
      els.drawerSf.textContent = String(node.spreadingFactor || "—");
      els.drawerUpdated.textContent = node.updatedText || "—";
      els.drawerLink.textContent = node.meshcoreLink || "—";

      els.drawerFavorite.textContent = favorite ? "★ Favorited" : "☆ Favorite";
      els.drawerFavorite.classList.toggle("active", favorite);
      els.copyLink.disabled = !node.meshcoreLink;
      updateResults(filteredNodes);
    }

    async function copyText(value, label) {
      if (!value || value === "—") {
        showToast(`No ${label.toLowerCase()} available`);
        return;
      }

      try {
        await navigator.clipboard.writeText(String(value));
        showToast(`${label} copied`);
      } catch {
        showToast(`Unable to copy ${label.toLowerCase()}`);
      }
    }

    function showToast(message) {
      if (toastTimer) clearTimeout(toastTimer);
      els.copyToast.textContent = message;
      els.copyToast.classList.add("show");
      toastTimer = setTimeout(() => {
        els.copyToast.classList.remove("show");
      }, 1800);
    }

    function readUrlState() {
      const params = new URLSearchParams(window.location.search);
      const types = (params.get("types") || "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);

      let view = null;
      const viewRaw = params.get("view");
      if (viewRaw) {
        const [latText, lonText, zoomText] = viewRaw.split(",");
        const lat = Number(latText);
        const lon = Number(lonText);
        const zoom = Number(zoomText);
        if (Number.isFinite(lat) && Number.isFinite(lon) && Number.isFinite(zoom)) {
          view = { center: [lat, lon], zoom };
        }
      }

      const darkParam = params.get("dark");
      const darkBasemap = darkParam === null ? undefined : darkParam === "1";

      return {
        query: params.get("q") || "",
        types,
        recent: params.get("recent") || "any",
        sort: params.get("sort") || "newest",
        namedOnly: params.get("named") === "1",
        favoritesOnly: params.get("favorites") === "1",
        darkBasemap,
        view
      };
    }

    function syncUrlStateSoon() {
      if (urlSyncPending) return;
      urlSyncPending = true;
      requestAnimationFrame(() => {
        urlSyncPending = false;
        syncUrlState();
      });
    }

    function syncUrlState() {
      const params = new URLSearchParams();
      const query = els.search.value.trim();
      const types = Array.from(getEnabledTypes());

      if (query) params.set("q", query);
      if (types.length && types.length < 5) params.set("types", types.join(","));
      if (els.recent.value !== "any") params.set("recent", els.recent.value);
      if (els.sort.value !== "newest") params.set("sort", els.sort.value);
      if (els.namedOnly.checked) params.set("named", "1");
      if (els.favoritesOnly.checked) params.set("favorites", "1");
      if (darkBasemap) params.set("dark", "1");

      const center = map.getCenter();
      params.set("view", `${center.lat.toFixed(5)},${center.lng.toFixed(5)},${map.getZoom()}`);

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      history.replaceState(null, "", newUrl);
    }

    function escapeHtml(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
    }

    function focusNode(nodeId) {
      const node = filteredNodes.find((item) => item.id === nodeId) || allNodes.find((item) => item.id === nodeId);
      if (!node) return;
      map.flyTo([node.lat, node.lon], Math.max(map.getZoom(), 10), { duration: 0.6 });
      const marker = markersById.get(node.id);
      if (marker) {
        clusterGroup.zoomToShowLayer(marker, () => {
          marker.openPopup?.();
        });
      }
      openDrawer(node.id);
    }

    window.addEventListener("load", invalidateMapSize);
    window.addEventListener("resize", invalidateMapSize);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) invalidateMapSize();
    });

    map.on("moveend zoomend", () => {
      updateVisibleStats();
      syncUrlStateSoon();
    });

    els.refreshBtn.addEventListener("click", refreshData);
    els.fitBtn.addEventListener("click", fitToMarkers);
    els.shareBtn.addEventListener("click", async () => {
      syncUrlState();
      await copyText(window.location.href, "Share link");
    });
    els.basemapBtn.addEventListener("click", () => {
      darkBasemap = !darkBasemap;
      applyBasemapMode();
    });

    els.search.addEventListener("input", applyFilters);
    els.recent.addEventListener("change", applyFilters);
    els.sort.addEventListener("change", applyFilters);
    els.namedOnly.addEventListener("change", applyFilters);
    els.favoritesOnly.addEventListener("change", applyFilters);
    els.typeBoxes.forEach((box) => box.addEventListener("change", applyFilters));

    els.presetButtons.forEach((button) => {
      button.addEventListener("click", () => applyPreset(button.dataset.preset));
    });

    els.drawerClose.addEventListener("click", closeDrawer);
    els.drawerFavorite.addEventListener("click", () => {
      if (selectedNodeId) toggleFavorite(selectedNodeId);
    });
    els.centerNode.addEventListener("click", () => {
      if (selectedNodeId) focusNode(selectedNodeId);
    });
    els.copyKey.addEventListener("click", () => {
      const node = selectedNodeId && (filteredNodes.find((item) => item.id === selectedNodeId) || allNodes.find((item) => item.id === selectedNodeId));
      copyText(node?.publicKey || node?.id, "Key");
    });
    els.copyCoords.addEventListener("click", () => {
      const node = selectedNodeId && (filteredNodes.find((item) => item.id === selectedNodeId) || allNodes.find((item) => item.id === selectedNodeId));
      copyText(node ? `${node.lat.toFixed(5)}, ${node.lon.toFixed(5)}` : "", "Coordinates");
    });
    els.copyLink.addEventListener("click", () => {
      const node = selectedNodeId && (filteredNodes.find((item) => item.id === selectedNodeId) || allNodes.find((item) => item.id === selectedNodeId));
      copyText(node?.meshcoreLink || "", "MeshCore link");
    });

    els.presetButtons.forEach((button) => button.classList.toggle("active", button.dataset.preset === "seattle"));

    if (window.location.search.includes("view=")) {
      syncUrlStateSoon();
    }

    refreshData();
    startRefreshLoop();
  })();
</script>
