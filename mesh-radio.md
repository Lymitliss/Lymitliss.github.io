---
layout: default
title: Mesh Radio
permalink: /mesh-radio/
---

## Mesh Radio

<div class="station-card">
  <h3>Overview</h3>
  <p>
    Mesh radio is one of the most interesting parts of the station right now. Both
    <strong>Meshtastic</strong> and <strong>MeshCore</strong> use LoRa hardware to build off-grid,
    multi-hop text communication networks, but they differ in philosophy, defaults, and how
    people typically use them.
  </p>
  <p>
    In the Puget Sound area, both protocols are active and worth experimenting with. Meshtastic
    is the more broadly adopted ecosystem with a large hardware and software footprint, while
    MeshCore has been gaining attention for its routing behavior, secure messaging focus, and
    repeater-oriented deployments.
  </p>
</div>

<div class="station-card">
  <h3>Quick Comparison</h3>
  <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
      <thead>
        <tr>
          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #1f2933; color: #58a6ff;">Category</th>
          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #1f2933; color: #58a6ff;">Meshtastic</th>
          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #1f2933; color: #58a6ff;">MeshCore</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;"><strong>General focus</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Broad public mesh ecosystem, easy onboarding, mapping, telemetry, and flexible channels.</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Secure off-grid messaging, signed adverts, selective forwarding, and repeater-oriented experimentation.</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;"><strong>US primary frequency</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">906.875 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">910.525 MHz</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;"><strong>Ease of entry</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Usually easier for beginners because of strong app and hardware support.</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">A little more specialized, but very attractive if you want the MeshCore feature set and community.</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;"><strong>Hardware ecosystem</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Very broad: RAK, Heltec, LilyGO, and more.</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Growing support across several strong boards and dedicated node platforms.</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;"><strong>Typical use</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Public community mesh, sensors, travel nodes, portable use, and broad experimentation.</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Secure messaging, repeater builds, fixed installations, and routing-focused experimentation.</td>
        </tr>
        <tr>
          <td style="padding: 10px;"><strong>Best answer for many people</strong></td>
          <td style="padding: 10px;">Great starting point and still useful long-term.</td>
          <td style="padding: 10px;">Excellent second protocol to explore, and for some operators it may become the main one.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="station-card">
  <h3>Meshtastic vs MeshCore</h3>
  <ul class="station-list">
    <li>
      <span class="station-label">Meshtastic:</span>
      Larger ecosystem, broad device support, mature phone apps, telemetry support, maps, channels,
      and optional MQTT/internet bridging. It is often the easier entry point for new users.
    </li>
    <li>
      <span class="station-label">MeshCore:</span>
      Strong focus on secure off-grid messaging, signed adverts, selective forwarding/repeater logic,
      and a growing companion app ecosystem across mobile, desktop, and web.
    </li>
    <li>
      <span class="station-label">Best fit for Meshtastic:</span>
      General-purpose local mesh, quick onboarding, sensors, mapping, and large public community use.
    </li>
    <li>
      <span class="station-label">Best fit for MeshCore:</span>
      Focused off-grid communication, secure messaging, repeater-centric builds, and experimentation
      with a different routing model.
    </li>
    <li>
      <span class="station-label">Common ground:</span>
      Both run on 915 MHz-class LoRa hardware in the US, both benefit heavily from good antennas
      and placement, and both can be observed on a receiver as short bursts rather than normal voice audio.
    </li>
  </ul>
</div>

<div class="station-card">
  <h3>Default US Settings</h3>
  <ul class="station-list">
    <li>
      <span class="station-label">Meshtastic (US default public mesh):</span>
      Region <strong>US</strong>, modem preset typically <strong>LONG_FAST</strong>, default public mesh
      center frequency <strong>906.875 MHz</strong>.
    </li>
    <li>
      <span class="station-label">Meshtastic notes:</span>
      The default public mesh depends on matching regional LoRa settings and the default channel behavior.
      Many local groups intentionally stay on the default public mesh, while others move to a different preset
      or channel for local optimization.
    </li>
    <li>
      <span class="station-label">MeshCore (US common setting):</span>
      Common US primary frequency <strong>910.525 MHz</strong>.
    </li>
    <li>
      <span class="station-label">MeshCore (common US preset references):</span>
      Frequency <strong>910.525 MHz</strong>, bandwidth <strong>62.5 kHz</strong>, spreading factor <strong>7</strong>,
      coding rate <strong>5</strong>.
    </li>
    <li>
      <span class="station-label">Important:</span>
      Mesh settings can vary by local group. The values above are good starting points, but local coordination
      matters more than defaults if you want to join an active area mesh.
    </li>
  </ul>
</div>

<div class="station-card">
  <h3>Popular Meshtastic Nodes</h3>
  <ul class="station-list">
    <li>
      <span class="station-label">RAK WisBlock / WisMesh:</span>
      Popular for low-power and solar-friendly builds, especially fixed or outdoor nodes.
    </li>
    <li>
      <span class="station-label">LILYGO T-Beam:</span>
      One of the classic Meshtastic choices, often used for GPS/mobile builds.
    </li>
    <li>
      <span class="station-label">LILYGO T-Echo:</span>
      Popular handheld-style node with integrated user interface appeal.
    </li>
    <li>
      <span class="station-label">Heltec WiFi LoRa 32 V3:</span>
      Common starter board with display, Wi-Fi, BLE, and broad community use.
    </li>
    <li>
      <span class="station-label">Heltec T114 / Mesh Node T114:</span>
      Attractive for low-power builds and compact node deployments.
    </li>
  </ul>
</div>

<div class="station-card">
  <h3>Popular MeshCore Nodes</h3>
  <ul class="station-list">
    <li>
      <span class="station-label">Station G2:</span>
      A well-known MeshCore platform and a common choice for fixed and repeater-style deployments.
    </li>
    <li>
      <span class="station-label">RAK4631-based devices:</span>
      Supported in MeshCore and popular for compact, efficient LoRa builds.
    </li>
    <li>
      <span class="station-label">Heltec V3:</span>
      Supported and widely available, making it a common crossover board for experimentation.
    </li>
    <li>
      <span class="station-label">Heltec T114:</span>
      Supported and attractive where lower power draw matters.
    </li>
    <li>
      <span class="station-label">Seeed T1000-E / T1000 class devices:</span>
      Also represented in current MeshCore hardware references.
    </li>
  </ul>
</div>

<div class="station-card">
  <h3>Popular Antennas</h3>
  <ul class="station-list">
    <li>
      <span class="station-label">Small stock / internal antennas:</span>
      Fine for handheld or bench testing, but usually the first weak point in range.
    </li>
    <li>
      <span class="station-label">RAK 2 dBi Sub-G antenna:</span>
      A common compact antenna option for WisBlock-style builds.
    </li>
    <li>
      <span class="station-label">RAK PIFA / PCB antennas:</span>
      Useful for compact enclosures and integrated node builds where space matters.
    </li>
    <li>
      <span class="station-label">Rokland 5.8 dBi 915 MHz outdoor omni:</span>
      Very common for fixed nodes and rooftop/outdoor deployments.
    </li>
    <li>
      <span class="station-label">RAK fiberglass outdoor LoRa antennas:</span>
      Another popular option for base stations and elevated installs.
    </li>
    <li>
      <span class="station-label">Directional 915 MHz Yagi-style antennas:</span>
      Better for specific point-to-point or ridge-to-ridge paths than for general neighborhood coverage.
    </li>
  </ul>
</div>

<div class="station-card">
  <h3>Popular Filters</h3>
  <ul class="station-list">
    <li>
      <span class="station-label">Broken Circuit Ranch 915 MHz filters:</span>
      Very popular in the mesh and 915 MHz LoRa community for helping reject out-of-band energy
      and cleaning up difficult RF environments.
    </li>
    <li>
      <span class="station-label">When filters help most:</span>
      High-noise locations, co-located RF gear, rooftop installs, nearby cellular/ISM clutter,
      or sensitive fixed nodes and repeaters.
    </li>
    <li>
      <span class="station-label">Real-world advice:</span>
      Antenna placement usually matters most, antenna quality comes next, and filters become especially
      valuable once you start pushing range or dealing with a noisy site.
    </li>
  </ul>
</div>

<div class="station-card">
  <h3>Favorite MeshCore Hashtag Channels</h3>
  <ul class="station-list">
    <li><span class="station-label">#bot:</span> Handy for bot and automation experiments.</li>
    <li><span class="station-label">#gmrs:</span> A natural crossover topic for local radio operators.</li>
    <li><span class="station-label">#hamradio:</span> Good for broader amateur-radio mesh conversation.</li>
    <li><span class="station-label">#northend:</span> Useful for north-end local context and regional coordination.</li>
    <li><span class="station-label">#seattle:</span> Useful for city and metro-area discussion.</li>
  </ul>
</div>

<div class="station-card">
  <h3>Choosing Between Them</h3>
  <ul class="station-list">
    <li>
      <span class="station-label">Choose Meshtastic if:</span>
      You want the widest device/app ecosystem, easier onboarding, telemetry, maps, and broad community support.
    </li>
    <li>
      <span class="station-label">Choose MeshCore if:</span>
      You want to explore its secure messaging model, signed adverts, selective repeater behavior,
      and the growing ecosystem around MeshOS and related tools.
    </li>
    <li>
      <span class="station-label">Best answer for many hobbyists:</span>
      Run both. They serve different purposes and are both worth understanding.
    </li>
  </ul>
</div>

<div class="station-card">
  <h3>Thank You</h3>
  <p>
    A sincere thank you to the great group of people at
    <a href="https://pugetmesh.org/" target="_blank" rel="noopener" class="accent-link">PugetMesh</a>.
    Groups like that are a huge part of what makes local mesh radio fun, practical, and worth building out.
  </p>
  <p>
    Good people, good experimentation, and a great local resource for anyone interested in Meshtastic,
    MeshCore, and related mesh radio projects in the Puget Sound area.
  </p>
</div>
