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
  <h1>MeshCore Live Map</h1>
  <p>
    Live node map for MeshCore repeaters, room servers, clients, and other nodes.
    This page auto-refreshes and can be shared directly from WOØF.
  </p>

  <div class="meshcore-map-toolbar">
    <div class="meshcore-map-status-group">
      <div class="meshcore-map-pill" id="meshcore-live-pill">Connecting…</div>
      <div class="meshcore-map-pill" id="meshcore-refresh-pill">Auto refresh: 60s</div>
      <div class="meshcore-map-pill" id="meshcore-source-pill">Source: pending</div>
    </div>

    <div class="meshcore-map-actions">
      <button id="meshcore-refresh-btn" type="button">Refresh now</button>
      <button id="meshcore-fit-btn" type="button">Fit nodes</button>
      <a href="https://map.meshcore.io/" target="_blank" rel="noopener noreferrer">Open official MeshCore map</a>
    </div>
  </div>

  <div class="meshcore-map-grid">
    <aside class="meshcore-map-panel">
      <h2>Filters</h2>

      <label class="meshcore-map-label" for="meshcore-search">Search node</label>
      <input id="meshcore-search" type="text" placeholder="Callsign, node name, role, key…" />

      <div class="meshcore-map-checklist">
        <label><input type="checkbox" value="client" checked /> Clients</label>
        <label><input type="checkbox" value="repeater" checked /> Repeaters</label>
        <label><input type="checkbox" value="room" checked /> Room Servers</label>
        <label><input type="checkbox" value="sensor" checked /> Sensors</label>
        <label><input type="checkbox" value="other" checked /> Other</label>
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
      <div class="meshcore-map-note" id="meshcore-message">
        This page will try the public MeshCore API first. If your browser blocks it,
        it will automatically try a same-domain proxy endpoint at
        <code>/meshcore-api/nodes</code>.
      </div>

      <div class="meshcore-map-legend">
        <h3>Legend</h3>
        <div><span class="meshcore-dot role-client"></span> Client</div>
        <div><span class="meshcore-dot role-repeater"></span> Repeater</div>
        <div><span class="meshcore-dot role-room"></span> Room Server</div>
        <div><span class="meshcore-dot role-sensor"></span> Sensor</div>
        <div><span class="meshcore-dot role-other"></span> Other</div>
      </div>
    </aside>

    <div class="meshcore-map-wrap">
      <div id="meshcore-map"></div>
    </div>
  </div>
</section>

<style>
  .meshcore-map-page {
    --meshcore-bg: #101216;
    --meshcore-panel: #171a20;
    --meshcore-border: #2a2f3a;
    --meshcore-text: #e7eaef;
    --meshcore-muted: #a8b0be;
    --meshcore-accent: #f7c948;
    --meshcore-client: #55c2ff;
    --meshcore-repeater: #4ade80;
    --meshcore-room: #f97316;
    --meshcore-sensor: #d946ef;
    --meshcore-other: #a78bfa;
    color: var(--meshcore-text);
  }

  .meshcore-map-page h1,
  .meshcore-map-page h2,
  .meshcore-map-page h3 {
    margin-top: 0;
  }

  .meshcore-map-toolbar,
  .meshcore-map-panel,
  .meshcore-map-wrap {
    background: var(--meshcore-panel);
    border: 1px solid var(--meshcore-border);
    border-radius: 14px;
  }

  .meshcore-map-toolbar {
    display: flex;
    gap: 14px;
    justify-content: space-between;
    align-items: center;
    padding: 14px;
    margin: 18px 0;
    flex-wrap: wrap;
  }

  .meshcore-map-status-group,
  .meshcore-map-actions {
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
    border-color: rgba(74, 222, 128, 0.45);
    color: #bef3d0;
  }

  .meshcore-map-pill.warn {
    border-color: rgba(249, 115, 22, 0.45);
    color: #fed7aa;
  }

  .meshcore-map-pill.error {
    border-color: rgba(239, 68, 68, 0.45);
    color: #fecaca;
  }

  .meshcore-map-actions button,
  .meshcore-map-actions a {
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
  }

  .meshcore-map-actions button:hover,
  .meshcore-map-actions a:hover {
    border-color: var(--meshcore-accent);
    color: var(--meshcore-accent);
  }

  .meshcore-map-grid {
    display: grid;
    grid-template-columns: 320px minmax(0, 1fr);
    gap: 18px;
  }

  .meshcore-map-panel {
    padding: 18px;
  }

  .meshcore-map-label {
    display: block;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .meshcore-map-panel input[type="text"] {
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid var(--meshcore-border);
    background: #0e1116;
    color: var(--meshcore-text);
    padding: 11px 12px;
    margin-bottom: 14px;
  }

  .meshcore-map-checklist {
    display: grid;
    gap: 8px;
    margin-bottom: 18px;
  }

  .meshcore-map-checklist label {
    display: flex;
    align-items: center;
    gap: 8px;
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
    margin-bottom: 12px;
  }

  .meshcore-map-note code {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    padding: 2px 6px;
  }

  .meshcore-map-legend {
    margin-top: 18px;
    padding-top: 16px;
    border-top: 1px solid var(--meshcore-border);
  }

  .meshcore-map-legend div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 9px;
  }

  .meshcore-dot {
    width: 12px;
    height: 12px;
    border-radius: 999px;
    display: inline-block;
  }

  .role-client { background: var(--meshcore-client); }
  .role-repeater { background: var(--meshcore-repeater); }
  .role-room { background: var(--meshcore-room); }
  .role-sensor { background: var(--meshcore-sensor); }
  .role-other { background: var(--meshcore-other); }

  .meshcore-map-wrap {
    padding: 10px;
  }

  #meshcore-map {
    width: 100%;
    min-height: 720px;
    border-radius: 12px;
    overflow: hidden;
    background: #0d1117;
  }


  /* Prevent site-wide image rules from breaking Leaflet tiles/markers */
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
    border: 2px solid rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.35);
  }

  .leaflet-popup-content-wrapper,
  .leaflet-popup-tip {
    background: #141820;
    color: var(--meshcore-text);
  }

  .meshcore-popup {
    min-width: 220px;
  }

  .meshcore-popup h3 {
    margin: 0 0 8px;
    font-size: 1rem;
  }

  .meshcore-popup .meta {
    color: var(--meshcore-muted);
    font-size: 0.9rem;
    margin-bottom: 10px;
  }

  .meshcore-popup dl {
    margin: 0;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 6px 10px;
    font-size: 0.92rem;
  }

  .meshcore-popup dt {
    color: var(--meshcore-muted);
  }

  .meshcore-popup dd {
    margin: 0;
    word-break: break-word;
  }

  @media (max-width: 980px) {
    .meshcore-map-grid {
      grid-template-columns: 1fr;
    }

    #meshcore-map {
      min-height: 560px;
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
    const API_CANDIDATES = [
      "https://map.meshcore.io/api/v1/nodes",
      "/meshcore-api/nodes"
    ];

    const els = {
      livePill: document.getElementById("meshcore-live-pill"),
      refreshPill: document.getElementById("meshcore-refresh-pill"),
      sourcePill: document.getElementById("meshcore-source-pill"),
      refreshBtn: document.getElementById("meshcore-refresh-btn"),
      fitBtn: document.getElementById("meshcore-fit-btn"),
      search: document.getElementById("meshcore-search"),
      typeBoxes: Array.from(document.querySelectorAll('.meshcore-map-checklist input[type="checkbox"]')),
      total: document.getElementById("meshcore-total-count"),
      client: document.getElementById("meshcore-client-count"),
      repeater: document.getElementById("meshcore-repeater-count"),
      room: document.getElementById("meshcore-room-count"),
      sensor: document.getElementById("meshcore-sensor-count"),
      other: document.getElementById("meshcore-other-count"),
      updated: document.getElementById("meshcore-last-updated"),
      message: document.getElementById("meshcore-message")
    };

    const map = L.map("meshcore-map", {
      zoomControl: true,
      worldCopyJump: true,
      preferCanvas: true
    }).setView([47.6062, -122.3321], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const clusterGroup = L.markerClusterGroup({
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      maxClusterRadius: 52
    });

    map.addLayer(clusterGroup);

    let allNodes = [];
    let visibleMarkers = [];
    let firstFitDone = false;
    let refreshTimer = null;
    let countdownTimer = null;
    let nextRefreshAt = Date.now() + REFRESH_MS;

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
        case "client": return "#55c2ff";
        case "repeater": return "#4ade80";
        case "room": return "#f97316";
        case "sensor": return "#d946ef";
        default: return "#a78bfa";
      }
    }

    function extractCoord(node, keys) {
      for (const key of keys) {
        const value = key.split('.').reduce((acc, part) => acc && acc[part], node);
        const num = Number(value);
        if (Number.isFinite(num)) return num;
      }
      return null;
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

      const role = roleKeyFromNode(node);
      const name = String(
        node.name ||
        node.nodeName ||
        node.adv_name ||
        node.callsign ||
        node.displayName ||
        node.id ||
        node.public_key ||
        node.publicKey ||
        `Node ${index + 1}`
      );
      const id = String(node.id || node.public_key || node.publicKey || node.key || node.hash || `${name}-${lat}-${lon}`);
      const updatedRaw = node.updatedAt || node.updated_at || node.updated_date || node.lastSeen || node.last_seen || node.last_advert || node.timestamp || node.ts || null;

      return {
        raw: node,
        id,
        name,
        lat,
        lon,
        role,
        region: node.region || node.band || node.preset || node.country || node.source || "—",
        hops: node.hops ?? node.distanceHops ?? node.hop_count ?? "—",
        frequency: node.frequency || node.freq || node.channel || node.params?.freq || "—",
        spreadingFactor: node.spreadingFactor || node.sf || node.params?.sf || "—",
        updatedRaw,
        updatedText: formatTimestamp(updatedRaw),
        searchText: [
          name,
          id,
          role,
          node.region,
          node.band,
          node.country,
          node.public_key,
          node.publicKey,
          node.adv_name,
          node.callsign
        ].filter(Boolean).join(" ").toLowerCase()
      };
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

      return list
        .map(normalizeNode)
        .filter(Boolean);
    }

    function formatTimestamp(value) {
      if (!value) return "—";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        const asNum = Number(value);
        if (Number.isFinite(asNum)) {
          const secondDate = new Date(asNum > 1e12 ? asNum : asNum * 1000);
          if (!Number.isNaN(secondDate.getTime())) {
            return secondDate.toLocaleString();
          }
        }
        return String(value);
      }
      return date.toLocaleString();
    }


    function invalidateMapSize() {
      requestAnimationFrame(() => map.invalidateSize(false));
      setTimeout(() => map.invalidateSize(false), 150);
      setTimeout(() => map.invalidateSize(false), 600);
    }

    function markerIcon(role) {
      const color = getColorForRole(role);
      return L.divIcon({
        className: "",
        html: `<div class="meshcore-node-marker" style="background:${color}"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
        popupAnchor: [0, -10]
      });
    }

    function popupHtml(node) {
      const roleLabel = {
        client: "Client",
        repeater: "Repeater",
        room: "Room Server",
        sensor: "Sensor",
        other: "Other"
      }[node.role] || "Other";

      return `
        <div class="meshcore-popup">
          <h3>${escapeHtml(node.name)}</h3>
          <div class="meta">${escapeHtml(roleLabel)}</div>
          <dl>
            <dt>ID</dt><dd>${escapeHtml(node.id)}</dd>
            <dt>Latitude</dt><dd>${node.lat.toFixed(5)}</dd>
            <dt>Longitude</dt><dd>${node.lon.toFixed(5)}</dd>
            <dt>Region</dt><dd>${escapeHtml(String(node.region))}</dd>
            <dt>Hops</dt><dd>${escapeHtml(String(node.hops))}</dd>
            <dt>Frequency</dt><dd>${escapeHtml(String(node.frequency))}</dd>
            <dt>SF</dt><dd>${escapeHtml(String(node.spreadingFactor))}</dd>
            <dt>Updated</dt><dd>${escapeHtml(String(node.updatedText))}</dd>
          </dl>
        </div>
      `;
    }

    function escapeHtml(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
    }

    function buildMarkers(nodes) {
      clusterGroup.clearLayers();
      visibleMarkers = [];

      for (const node of nodes) {
        const marker = L.marker([node.lat, node.lon], { icon: markerIcon(node.role) });
        marker.bindPopup(popupHtml(node));
        marker.nodeData = node;
        visibleMarkers.push(marker);
      }

      clusterGroup.addLayers(visibleMarkers);
    }

    function applyFilters() {
      const query = els.search.value.trim().toLowerCase();
      const enabledTypes = new Set(
        els.typeBoxes.filter((box) => box.checked).map((box) => box.value)
      );

      const filtered = allNodes.filter((node) => {
        const typeOk = enabledTypes.has(node.role);
        const queryOk = !query || node.searchText.includes(query);
        return typeOk && queryOk;
      });

      updateStats(filtered);
      buildMarkers(filtered);

      if (!firstFitDone && filtered.length) {
        fitToMarkers();
        firstFitDone = true;
      }
    }

    function updateStats(nodes) {
      const counts = { client: 0, repeater: 0, room: 0, sensor: 0, other: 0 };
      for (const node of nodes) {
        counts[node.role] = (counts[node.role] || 0) + 1;
      }
      els.total.textContent = String(nodes.length);
      els.client.textContent = String(counts.client || 0);
      els.repeater.textContent = String(counts.repeater || 0);
      els.room.textContent = String(counts.room || 0);
      els.sensor.textContent = String(counts.sensor || 0);
      els.other.textContent = String(counts.other || 0);
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
        applyFilters();
        setPillState(els.livePill, "Offline / blocked", "error");
        els.sourcePill.textContent = "Source: unavailable";
        els.message.textContent = `Unable to load MeshCore node data. ${error.message}. If the direct API is blocked by CORS on your domain, deploy the included Cloudflare Worker and keep the fallback path at /meshcore-api/nodes.`;
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


    window.addEventListener("load", invalidateMapSize);
    window.addEventListener("resize", invalidateMapSize);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) invalidateMapSize();
    });

    els.refreshBtn.addEventListener("click", refreshData);
    els.fitBtn.addEventListener("click", fitToMarkers);
    els.search.addEventListener("input", applyFilters);
    els.typeBoxes.forEach((box) => box.addEventListener("change", applyFilters));

    refreshData();
    startRefreshLoop();
  })();
</script>
