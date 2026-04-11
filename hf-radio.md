---
layout: default
title: HF Radio
permalink: /hf-radio/
---

## HF Radio

<div class="station-card">
  <h3>Overview</h3>
  <p>
    HF radio is where long-distance communication, band conditions, and daily operating habits all come together.
    This page is a practical starting point for some of the most popular HF voice, digital, and net frequencies that
    operators commonly monitor in the US.
  </p>
  <p>
    Exact activity changes with band conditions, time of day, season, and solar conditions, but the frequencies below
    are a very solid working reference for general listening and operating.
  </p>
</div>

<section class="propagation">
  <div class="propagation-header">
    <h2>HF Propagation</h2>
    <div class="live-badge">LIVE CONDITIONS</div>
  </div>

  <div class="prop-summary" id="prop-summary">
    <div class="prop-summary-card">
      <span class="prop-summary-label">Best Band Right Now</span>
      <span class="prop-summary-value" id="best-band">Loading...</span>
    </div>
    <div class="prop-summary-card">
      <span class="prop-summary-label">Overall HF Outlook</span>
      <span class="prop-summary-value" id="hf-outlook">Loading...</span>
    </div>
    <div class="prop-summary-card">
      <span class="prop-summary-label">Solar Snapshot</span>
      <span class="prop-summary-value" id="solar-snapshot">Loading...</span>
    </div>
  </div>

  <div class="propagation-widget">
    <img src="https://www.hamqsl.com/solar101vhf.php?t={{ site.time | date: '%s' }}" alt="HF Propagation Conditions">
    <p class="prop-last-updated" id="prop-last-updated">
      Loading current solar data...
    </p>
  </div>

  <div class="prop-grid smart-bands" id="smart-bands">

    <div class="prop-card band-card" data-band="10m">
      <div class="band-card-header">
        <h3>10m</h3>
        <span class="band-badge" id="badge-10m">Loading</span>
      </div>
      <p class="prop-note" id="note-10m">Evaluating current conditions...</p>
    </div>

    <div class="prop-card band-card" data-band="15m">
      <div class="band-card-header">
        <h3>15m</h3>
        <span class="band-badge" id="badge-15m">Loading</span>
      </div>
      <p class="prop-note" id="note-15m">Evaluating current conditions...</p>
    </div>

    <div class="prop-card band-card" data-band="20m">
      <div class="band-card-header">
        <h3>20m</h3>
        <span class="band-badge" id="badge-20m">Loading</span>
      </div>
      <p class="prop-note" id="note-20m">Evaluating current conditions...</p>
    </div>

    <div class="prop-card band-card" data-band="40m">
      <div class="band-card-header">
        <h3>40m</h3>
        <span class="band-badge" id="badge-40m">Loading</span>
      </div>
      <p class="prop-note" id="note-40m">Evaluating current conditions...</p>
    </div>

    <div class="prop-card band-card" data-band="80m">
      <div class="band-card-header">
        <h3>80m</h3>
        <span class="band-badge" id="badge-80m">Loading</span>
      </div>
      <p class="prop-note" id="note-80m">Evaluating current conditions...</p>
    </div>

  </div>
</section>

<script src="{{ '/assets/propagation.js' | relative_url }}"></script>

<div class="station-card">
  <h3>Popular HF Frequencies</h3>
  <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
      <thead>
        <tr>
          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #1f2933; color: #58a6ff;">Band</th>
          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #1f2933; color: #58a6ff;">Frequency</th>
          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #1f2933; color: #58a6ff;">Mode</th>
          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #1f2933; color: #58a6ff;">Use</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">80m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">3.885 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">AM</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Popular 80m AM activity window.</td>
        </tr>
        <!-- rest unchanged -->
