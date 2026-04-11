---
layout: default
title: HF Radio
permalink: /hf-radio/
---

## HF Radio

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
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">80m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">3.985 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">LSB</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Common net and awards activity area.</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">40m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">7.175 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">LSB</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Common US 40m calling/voice area.</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">40m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">7.240 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">LSB</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Popular maritime and general net activity area.</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">20m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">14.200 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">USB</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Widely recognized 20m SSB calling frequency.</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">20m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">14.230 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">USB / SSTV</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Popular SSTV calling frequency.</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">20m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">14.300 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">USB</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Maritime Mobile Service Net / maritime emergency center-of-activity area.</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">20m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">14.325 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">USB</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Hurricane Watch Net when active.</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">17m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">18.130 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">USB</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Popular 17m SSB calling frequency.</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">15m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">21.300 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">USB</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Common 15m SSB calling frequency.</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">12m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">24.950 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">USB</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">Popular 12m SSB calling frequency.</td>
        </tr>
        <tr>
          <td style="padding: 10px;">10m</td>
          <td style="padding: 10px;">28.400 MHz</td>
          <td style="padding: 10px;">USB</td>
          <td style="padding: 10px;">Common 10m SSB calling frequency.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="station-card">
  <h3>Popular Nets</h3>
  <ul class="station-list">
    <li>
      <span class="station-label">Maritime Mobile Service Net:</span>
      Most associated with <strong>14.300 MHz USB</strong> and also uses other bands such as 21.360 MHz,
      18.160 MHz, 7.240 MHz, 7.060 MHz, 3.985 MHz, and 3.750 MHz depending on conditions and need.
    </li>
    <li>
      <span class="station-label">Hurricane Watch Net:</span>
      Uses <strong>14.325 MHz USB by day</strong> and <strong>7.268 MHz LSB by night</strong> when activated
      for tropical weather support.
    </li>
    <li>
      <span class="station-label">3905 Century Club:</span>
      A long-running awards and ragchew/net organization with activity across 20m, 40m, 75/80m, and 160m.
      Exact schedules vary, so the club’s published schedule is the best reference.
    </li>
    <li>
      <span class="station-label">General regional nets:</span>
      On 40m and 80m, many informal and regional nets gather in the lower and middle phone portions of the bands,
      especially in the evenings.
    </li>
  </ul>
</div>

<div class="station-card">
  <h3>Popular Digital Mode Frequencies</h3>
  <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
      <thead>
        <tr>
          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #1f2933; color: #58a6ff;">Band</th>
          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #1f2933; color: #58a6ff;">FT8</th>
          <th style="text-align: left; padding: 10px; border-bottom: 1px solid #1f2933; color: #58a6ff;">WSPR</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">80m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">3.573 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">3.5686 MHz</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">40m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">7.074 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">7.0386 MHz</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">30m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">10.136 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">10.1387 MHz</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">20m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">14.074 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">14.0956 MHz</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">17m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">18.100 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">18.1046 MHz</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">15m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">21.074 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">21.0946 MHz</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">12m</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">24.915 MHz</td>
          <td style="padding: 10px; border-bottom: 1px solid #1f2933;">24.9246 MHz</td>
        </tr>
        <tr>
          <td style="padding: 10px;">10m</td>
          <td style="padding: 10px;">28.074 MHz</td>
          <td style="padding: 10px;">28.1246 MHz</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="station-card">
  <h3>Operating Notes</h3>
  <ul class="station-list">
    <li><span class="station-label">20m:</span> Often the best all-around daytime voice and DX band.</li>
    <li><span class="station-label">40m:</span> Excellent for regional coverage and evening/night operation.</li>
    <li><span class="station-label">80m:</span> Strong local and regional nighttime band.</li>
    <li><span class="station-label">15m / 10m:</span> Highly dependent on solar conditions, but can be excellent when open.</li>
    <li><span class="station-label">Digital activity:</span> FT8 and WSPR are often the easiest way to confirm whether a band is truly open.</li>
    <li><span class="station-label">Best practice:</span> Treat these frequencies as starting points, then tune around them to find real activity.</li>
  </ul>
</div>
