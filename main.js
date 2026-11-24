/* Alex Fu portfolio — page behaviour (plain JS, works from file:// and GitHub Pages) */

/* The one place the site address lives (used for the QR popup text). */
var SITE_URL = "https://alexfu29.github.io/";

(function () {
  'use strict';
  var IMG = 'assets/img/';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ================= Project data (from popup demo v3) =================
     image: [file, width, height, caption] */
  var P = {
    lymphsense: { name: 'LymphSense', short: 'LymphSense', date: 'Sep 2025 – present',
      summary: 'A <b>$150 handheld bioimpedance spectroscopy</b> device for stage-0 lymphedema screening at home.',
      awards: ['1st Place + Student Choice, BMES Design-a-thon', 'Best Junior Entry, BU Dean’s Imagineering'],
      problem: 'Clinical bioimpedance units cost about $4,000, which keeps stage-0 lymphedema screening out of the home.',
      did: ['Designed a $150 handheld device with a mushroom-profile palm-grip housing', 'Built a spring-loaded 2×2 tetrapolar electrode tip that holds 3–5 N', 'Mapped a Class II / 510(k) path with SOZO as the predicate', 'Interviewed the Co-Executive Director of the National Lymphedema Network'],
      stats: [['1860 → 576 Ω', 'Saline, as salt rose'], ['1005 ± 140 Ω', 'Repeatability, 10 readings'], ['1075 vs 784 Ω', 'Phantom, 20% more fluid'], ['735 Ω', 'Lymphedema at 50 kHz'], ['961–1055 Ω', 'Healthy at 50 kHz'], ['1393 Ω', 'High body fat at 50 kHz']],
      demo: true,
      imgs: [['lymphsense-render.png', 572, 347, 'Device render'], ['chart:saline', 0, 0, 'Saline test: impedance falls as salt is added (400 mL water)'], ['chart:human', 0, 0, 'Human testing, right leg at 50 kHz: 5 readings per subject, mean ± SD'], ['lymphsense-team.png', 777, 503, 'The team']] },
    tymewear: { name: 'Tymewear test rig', short: 'Tymewear', date: 'Jun – Aug 2026 · Engineering Intern · Somerville, MA',
      summary: 'A custom <b>strap test rig</b> that ran 100,000+ unattended stress cycles on the VitalPro wearable.',
      awards: [],
      problem: 'The VitalPro wearable needed highly accelerated life testing on its strap, running unattended.',
      did: ['Designed a custom KiCAD PCB (Raspberry Pi 5 + Teensy 4.1 + stepper) for the rig', 'Built a Flask dashboard with live position/load plots and a deviation alarm', 'Used microstep throttling to raise the speed cap', 'Ran FEA and CNC-milled an aluminum mount for the Mark-10 force gauge', 'Ran cardiopulmonary exercise tests (VO2 max, VT1/VT2) with plain-language reports'],
      stats: [['100,000+', 'Unattended stress cycles'], ['50 → 250 mm/s', 'Speed cap'], ['29×', 'Less displacement in the gauge mount'], ['50+', 'Athletes tested (CPET)']],
      imgs: [['tymewear-rig.png', 315, 500, 'Strap test rig'], ['tymewear-rig-motors.jpg', 461, 615, 'Rig motors'], ['tymewear-pcb-layout.png', 373, 415, 'KiCAD PCB layout'], ['tymewear-pcb-boards.jpg', 461, 615, 'Assembled boards'], ['tymewear-dashboard.png', 465, 627, 'Flask dashboard'], ['tymewear-dashboard-plot.png', 567, 441, 'Live position/load plot'], ['tymewear-load-curve.png', 306, 274, 'Load curve'], ['tymewear-alex.png', 461, 615, 'Alex at Tymewear']] },
    tissueguard: { name: 'TissueGuard', short: 'TissueGuard', date: 'Oct 2026 · MedTech Conference Boston · Moonshot × AdvaMed NextGen Robotics',
      summary: 'An <b>AI computer-vision monitor</b> that warns the surgeon when the tool gets too close to structures they designate.',
      awards: ['Pitched to execs from Stryker and Zimmer Biomet'],
      problem: 'In hip FAI surgery, the surgeon needs a warning when the tool nears the labrum or cartilage, without a distracting alert.',
      did: ['Built the monitor in a 6-hour designathon with a team of 3', 'Trained a YOLO26 model in Roboflow on 80 labeled images', 'Designed non-distracting alerts for structures the surgeon designates (labrum, cartilage)', 'Pitched the concept to execs from Stryker and Zimmer Biomet'],
      stats: [['100%', 'Test mAP, structures'], ['96%', 'Test mAP, tools (4 test images)'], ['80', 'Labeled training images'], ['6 hours', 'Team of 3']],
      imgs: [['tissueguard-ai-view.png', 845, 511, 'AI view with detected structures'], ['tissueguard-robot.png', 815, 689, 'Robot setup'], ['tissueguard-slide.png', 1275, 720, 'Pitch slide'], ['tissueguard-team.jpg', 2048, 1536, 'The team']] },
    betteryears: { name: 'BetterYears', short: 'BetterYears', date: 'Oct 2026 · SundAI Hack 143 at Harvard',
      summary: '<b>Apple Vision Pro minigames</b> that measure biomarkers of aging and return a “BetterYears Age”.',
      awards: [],
      problem: 'Biomarkers of aging such as reaction time and balance are hard to measure in a way that older, less steady players can actually do.',
      did: ['Built minigames measuring reaction time, field of vision, mobility and balance', 'Combined the results into a single “BetterYears Age”', 'Kept every walk spot within 0.8 m of the start position', 'Made sure color is never the only cue'],
      stats: [['4', 'Biomarkers measured'], ['0.8 m', 'Max walk distance from start'], ['1', '“BetterYears Age” score']],
      imgs: [['betteryears-title.jpg', 1920, 1080, 'Title screen'], ['betteryears-age-reveal.jpg', 940, 870, 'Age reveal'], ['betteryears-buddy.png', 1024, 853, 'Buddy character'], ['betteryears-leafdrop.jpg', 1920, 1080, 'Leaf Drop minigame'], ['betteryears-holeinwall.jpg', 1920, 1080, 'Hole in the Wall minigame'], ['betteryears-team.jpg', 1400, 1867, 'The team'], ['betteryears-sundai.jpg', 1100, 1467, 'SundAI Hack 143']] },
    seedswap: { name: 'SeedSwap', short: 'SeedSwap', date: 'Apr 2026 · MIT Ripple Design-a-thon',
      summary: 'A <b>climate-controlled seed exchange kiosk</b> designed for comfortable, glare-free use.',
      awards: ['1st Place, Physical Track', '2nd Place, Design for America track'],
      problem: 'A seed exchange kiosk has to keep seeds climate-controlled while staying comfortable for a wide range of users.',
      did: ['Tilted the screen 25° to cut glare and neck strain', 'Sized bin heights to fit 95% of users', 'Specified powder-coated 16-ga steel', 'Modeled the kiosk in SolidWorks'],
      stats: [['25°', 'Screen tilt'], ['95%', 'Of users fit bin heights'], ['16-ga', 'Powder-coated steel'], ['1st', 'Physical Track']],
      imgs: [['seedswap-render.png', 810, 648, 'Kiosk render'], ['seedswap-assembly.png', 269, 334, 'Assembly'], ['seedswap-wheel.png', 404, 313, 'Wheel'], ['seedswap-leg.png', 330, 284, 'Leg']] },
    h2x: { name: 'BU H2X Lab', short: 'H2X Lab', date: 'Nov 2025 – May 2026 · Research Assistant',
      summary: '<b>Multimodal IMU data collection</b> (Xsens, motion capture) for a neural net that denoises cheap IMUs.',
      awards: [],
      problem: '',
      did: ['Collected multimodal IMU data with Xsens and motion capture', 'Built a motion-capture suit demo for Lt. Governor Kim Driscoll at a MA STEM Council meeting'],
      stats: [],
      imgs: [] }
  };

  /* ================= Popups (shared) ================= */
  var openDlg = null, lastFocus = null;
  function focusables(root) {
    return $$('button,a[href],input,[tabindex]:not([tabindex="-1"])', root).filter(function (x) { return x.offsetParent !== null; });
  }
  function showOverlay(ov, focusEl, from) {
    lastFocus = from || document.activeElement;
    ov.classList.add('open');
    document.body.classList.add('lock');
    openDlg = ov;
    if (focusEl) focusEl.focus({ preventScroll: true });
  }
  function hideOverlay() {
    if (!openDlg) return;
    openDlg.classList.remove('open');
    document.body.classList.remove('lock');
    var ov = openDlg; openDlg = null;
    if (ov.id === 'pov') $('#pscroll').innerHTML = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  document.addEventListener('keydown', function (e) {
    if (!openDlg) return;
    if (e.key === 'Escape') { e.preventDefault(); hideOverlay(); return; }
    if (e.key === 'Tab') {
      var f = focusables(openDlg);
      if (!f.length) return;
      var a = f[0], z = f[f.length - 1];
      if (!openDlg.contains(document.activeElement)) { e.preventDefault(); a.focus(); }
      else if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });
  $$('.overlay').forEach(function (ov) {
    ov.addEventListener('mousedown', function (e) { if (e.target === ov) hideOverlay(); });
  });
  $('#pclose').addEventListener('click', hideOverlay);
  $('#qclose').addEventListener('click', hideOverlay);

  /* ----- LymphSense test charts (measured data from the results table) ----- */
  var SALINE = [[0.2, 1860.51], [0.4, 1273.06], [0.6, 1019.33], [0.8, 780.22], [1.0, 576.21]];
  var HUMAN = [
    ['Healthy', 'subject 1', [1269.22, 969.28, 1116.03, 1084.65, 838.35], 1055, 161.0],
    ['Healthy', 'subject 2', [945.17, 915.32, 1060.30, 972.84, 912.00], 961.13, 60.7],
    ['High', 'body fat', [1398.29, 1250.67, 1374.72, 1598.01, 1340.88], 1392.51, 130.1],
    ['Lymph-', 'edema', [782.56, 836.49, 755.30, 718.54, 580.50], 734.7, 96.3]
  ];
  function axes(W, H, L, R, T, B, ymin, ymax, step, ylab) {
    var s = '', y;
    function py(v) { return T + (H - T - B) * (1 - (v - ymin) / (ymax - ymin)); }
    for (y = ymin; y <= ymax; y += step) {
      s += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + py(y) + '" y2="' + py(y) + '" class="gl"/><text x="' + (L - 6) + '" y="' + (py(y) + 3.5) + '" text-anchor="end">' + y + '</text>';
    }
    s += '<line x1="' + L + '" x2="' + L + '" y1="' + T + '" y2="' + (H - B) + '" class="ax"/><line x1="' + L + '" x2="' + (W - R) + '" y1="' + (H - B) + '" y2="' + (H - B) + '" class="ax"/>';
    s += '<text x="11" y="' + ((T + H - B) / 2) + '" transform="rotate(-90 11 ' + ((T + H - B) / 2) + ')" text-anchor="middle" class="al">' + ylab + '</text>';
    return { s: s, py: py };
  }
  function chartSVG(kind) {
    var W = 340, H = 200, L = 46, R = 12, T = 12, B = 38, s, a;
    if (kind === 'saline') {
      a = axes(W, H, L, R, T, B, 400, 2000, 400, 'Impedance (Ω)'); s = a.s;
      var px = function (x) { return L + (W - L - R) * (x - 0.1) / 1.0; }, pts = '';
      SALINE.forEach(function (d) { pts += px(d[0]) + ',' + a.py(d[1]) + ' '; });
      s += '<polyline points="' + pts + '" class="ln"/>';
      SALINE.forEach(function (d, i) {
        s += '<circle cx="' + px(d[0]) + '" cy="' + a.py(d[1]) + '" r="4" class="pt"/>' +
          '<text x="' + (px(d[0]) + (i === 0 ? 8 : 0)) + '" y="' + (a.py(d[1]) - 9) + '" text-anchor="' + (i === 0 ? 'start' : 'middle') + '" class="vl">' + Math.round(d[1]) + '</text>' +
          '<text x="' + px(d[0]) + '" y="' + (H - B + 15) + '" text-anchor="middle">' + d[0].toFixed(1) + '</text>';
      });
      s += '<text x="' + ((L + W - R) / 2) + '" y="' + (H - 6) + '" text-anchor="middle" class="al">Salt addition</text>';
    } else {
      a = axes(W, H, L, R, T, B, 500, 1700, 300, 'Impedance (Ω)'); s = a.s;
      var cw = (W - L - R) / HUMAN.length;
      HUMAN.forEach(function (d, i) {
        var cx = L + cw * (i + .5), lym = i === 3, cls = lym ? ' hi' : '';
        d[2].forEach(function (v, k) { s += '<circle cx="' + (cx - 10 + k * 5) + '" cy="' + a.py(v) + '" r="2.6" class="rd' + cls + '"/>'; });
        var top = a.py(d[3] + d[4]), bot = a.py(d[3] - d[4]), m = a.py(d[3]);
        s += '<line x1="' + (cx + 18) + '" x2="' + (cx + 18) + '" y1="' + top + '" y2="' + bot + '" class="sd' + cls + '"/>' +
          '<line x1="' + (cx + 14) + '" x2="' + (cx + 22) + '" y1="' + top + '" y2="' + top + '" class="sd' + cls + '"/>' +
          '<line x1="' + (cx + 14) + '" x2="' + (cx + 22) + '" y1="' + bot + '" y2="' + bot + '" class="sd' + cls + '"/>' +
          '<line x1="' + (cx - 14) + '" x2="' + (cx + 24) + '" y1="' + m + '" y2="' + m + '" class="mn' + cls + '"/>' +
          '<text x="' + cx + '" y="' + (H - B + 14) + '" text-anchor="middle"' + (lym ? ' class="hl"' : '') + '>' + d[0] + '</text>' +
          '<text x="' + cx + '" y="' + (H - B + 26) + '" text-anchor="middle"' + (lym ? ' class="hl"' : '') + '>' + d[1] + '</text>';
      });
    }
    return '<svg class="pchart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + (kind === 'saline' ? 'Line chart: impedance fell from 1861 to 576 ohms as salt was added' : 'Dot chart: lymphedema patient mean 735 ohms, healthy subjects 1055 and 961, high body fat 1393') + '">' + s + '</svg>';
  }

  /* ----- LymphSense baseline demo (shown inside the LymphSense popup) ----- */
  var DEMO_HTML = '<h3>Try it: your baseline</h3><div class="sim">' +
    '<div class="sim-head"><b>Your <em>baseline</em>, day by day</b><span class="tag">Simplified model</span></div>' +
    '<svg id="chart" viewBox="0 0 640 290" role="img" aria-label="Thirty days of simulated daily impedance readings around a personal baseline, with a normal band. Today\'s reading moves with the slider."></svg>' +
    '<div class="status" id="status" role="status" aria-live="polite"><div class="v"><span id="ohm">0</span><small>Ω</small></div><div class="t"><b id="msg">Within your normal</b><span id="msub"></span></div></div>' +
    '<div class="ctl"><label for="fluid">Change today\'s fluid (simulation)</label><input id="fluid" type="range" min="-20" max="20" value="0" step="1">' +
    '<div class="scale"><span>Less fluid</span><span id="fluidv">0% change</span><span>More fluid</span></div></div></div>' +
    '<p class="cap">Simulated 30 days at 50 kHz: your baseline is the average of days 1–14 and your normal band is ±140 Ω (the measured repeatability). Lower impedance means more fluid. The slider scales today\'s reading using the phantom result (+20% fluid read 1075 → 784 Ω); the band is illustrative, not a clinical cutoff.</p>';

  /* ----- Project popup: one scroll container, text left / photos right ----- */
  function renderProject(p) {
    var t = '<div class="mtext"><h2 id="ptitle">' + p.name + '</h2><p class="summary">' + p.summary + '</p><p class="date">' + p.date + '</p>' +
      p.awards.map(function (a) { return '<span class="award">' + a + '</span>'; }).join('');
    if (p.problem) t += '<h3>The problem</h3><p>' + p.problem + '</p>';
    t += '<h3>What I did</h3><ul>' + p.did.map(function (d) { return '<li>' + d + '</li>'; }).join('') + '</ul>';
    if (p.stats.length) t += '<h3>Results</h3><div class="stats">' + p.stats.map(function (s) { return '<div class="stat"><b>' + s[0] + '</b><span>' + s[1] + '</span></div>'; }).join('') + '</div>';
    if (p.demo) t += DEMO_HTML;
    t += '</div>';
    if (!p.imgs.length) return '<div class="mgrid solo">' + t + '</div>';
    var pics = '<div class="mpics"><p class="picshead">Pictures &amp; data</p>' +
      p.imgs.map(function (i, k) {
        if (i[0].indexOf('chart:') === 0) return '<figure><div class="pi chart">' + chartSVG(i[0].slice(6)) + '</div><figcaption>' + i[3] + '</figcaption></figure>';
        return '<figure><div class="pi"><img src="' + IMG + i[0] + '" width="' + i[1] + '" height="' + i[2] + '" alt="' + p.name + ': ' + i[3] + '"' + (k > 1 ? ' loading="lazy"' : '') + '></div><figcaption>' + i[3] + '</figcaption></figure>';
      }).join('') + '</div>';
    return '<div class="mgrid">' + t + pics + '</div>';
  }
  /* hl (optional) = { skill: 'CNC mill', match: 'CNC-milled' }: highlights where that skill was used */
  function openProject(id, from, hl) {
    var p = P[id]; if (!p) return;
    if (openDlg) hideOverlay();
    var sc = $('#pscroll');
    sc.innerHTML = renderProject(p);
    $('#pmodal').classList.toggle('short', !p.imgs.length);
    if (p.demo) initTracker();
    showOverlay($('#pov'), $('#pclose'), from);
    sc.scrollTop = 0;
    if (hl && hl.match) {
      var hit = $$('.mtext li, .mtext .stat', sc).filter(function (el) { return el.textContent.indexOf(hl.match) !== -1; })[0];
      if (hit) {
        hit.classList.add('glow');
        var note = document.createElement('span'); note.className = 'skillnote'; note.textContent = 'Where I used ' + hl.skill;
        var h2 = $('#ptitle', sc); h2.parentNode.insertBefore(note, h2.nextSibling);
        var top = hit.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop;
        if (top > sc.clientHeight * .6) sc.scrollTop = top - sc.clientHeight * .35;
      }
    }
  }
  window.openProject = openProject;

  /* "Currently: building LymphSense" opens the LymphSense popup (click, Enter or Space) */
  $$('[data-open]').forEach(function (el) {
    function go() { openProject(el.getAttribute('data-open'), el); }
    el.addEventListener('click', go);
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });

  /* Project cards: whole card opens the popup */
  $$('.card[data-p]').forEach(function (c) {
    c.addEventListener('click', function () { openProject(c.getAttribute('data-p'), c); });
  });

  /* ----- QR popup: every QR on the page opens it ----- */
  $$('[data-site-url]').forEach(function (el) { el.textContent = SITE_URL; });
  $$('[data-qr]').forEach(function (b) { b.addEventListener('click', function () { showOverlay($('#qov'), $('#qclose'), b); }); });

  /* ----- "Show QR on page" toggle: adds the QR to the main screen and Contact (remembered in this browser) ----- */
  (function () {
    var t = $('#qrtoggle'), KEY = 'af-show-qr', on = false;
    try { on = localStorage.getItem(KEY) === '1'; } catch (e) {}
    /* Centre the hero QR between the end of "Fu" and the left edge of the photo (desktop);
       on narrow screens the photo sits above the name, so put it to the right of the name instead. */
    var wrap = $('#heroqr'), hero = $('.hero');
    function placeHeroQR() {
      if (!wrap || !on) return;
      var hr = hero.getBoundingClientRect(), fu = $('.hero h1 em').getBoundingClientRect(),
          ph = $('.hero-photo img').getBoundingClientRect(), w = wrap.offsetWidth, h = wrap.offsetHeight, x, y;
      if (ph.left > fu.right + w) { x = (fu.right + ph.left) / 2 - w / 2; y = (fu.top + fu.bottom) / 2 - h / 2; }
      else { x = (ph.right + hr.right - 12) / 2 - w / 2; y = (ph.top + ph.bottom) / 2 - h / 2; } /* phone: beside the photo */
      wrap.style.left = Math.round(x - hr.left) + 'px';
      wrap.style.top = Math.round(y - hr.top) + 'px';
    }
    window.addEventListener('resize', placeHeroQR);
    window.addEventListener('load', placeHeroQR);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeHeroQR);
    function apply() { document.documentElement.classList.toggle('qron', on); t.checked = on; placeHeroQR(); }
    t.addEventListener('change', function () { on = t.checked; try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) {} apply(); });
    apply();
  })();

  /* ================= Sidebar nav: hamburger + active section ================= */
  var side = $('#side'), burger = $('#burger');
  function setMenu(open) { side.classList.toggle('open', open); burger.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  burger.addEventListener('click', function () { setMenu(!side.classList.contains('open')); });
  $$('a', side).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !openDlg && side.classList.contains('open')) { setMenu(false); burger.focus(); } });

  var links = $$('#nav a'), secs = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  var spyQueued = false;
  function spy() {
    spyQueued = false;
    var cur = -1, y = window.scrollY + window.innerHeight * 0.3;
    secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top + window.scrollY <= y) cur = i; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = secs.length - 1;
    links.forEach(function (l, i) {
      l.classList.toggle('active', i === cur);
      if (i === cur) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
    });
  }
  function queueSpy() { if (!spyQueued) { spyQueued = true; requestAnimationFrame(spy); } }
  window.addEventListener('scroll', queueSpy, { passive: true });
  window.addEventListener('resize', queueSpy);
  spy();

  /* ================= Hero signal trace (behind the photo) ================= */
  (function () {
    var cv = $('#trace'), btn = $('#tracebtn');
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext('2d');
    var W = 0, H = 0, dpr = 1, running = false, wanted = !reduceMotion, visible = true, raf = 0, last = 0, T = 3.2, SPEED = 80;
    function g(x, c, w, a) { var d = (x - c) / w; return a * Math.exp(-d * d); }
    function ecg(t) { var p = ((t / 1.15) % 1 + 1) % 1;
      return g(p, .17, .03, .14) + g(p, .285, .008, -.12) + g(p, .30, .009, 1) + g(p, .315, .011, -.22) + g(p, .52, .045, .26); }
    function imp(t) { return .6 * Math.sin(t * 2 * Math.PI * .2) + .1 * Math.sin(t * 2 * Math.PI / 1.15 + 1) + .05 * Math.sin(t * 2 * Math.PI * 1.7); }
    function size() { dpr = Math.min(window.devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function trace(fn, base, amp, color, lw) {
      ctx.beginPath();
      for (var x = 0; x <= W; x += 2) { var t = T - (W - x) / SPEED, y = base - fn(t) * amp; if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
      ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.stroke(); }
    /* about 2x the demo opacity (.10/.09 -> .20/.18) around the photo; a bit softer behind the text so it stays readable */
    function grad(a) {
      var gr = ctx.createLinearGradient(0, 0, W, 0), wide = W > 900;
      gr.addColorStop(0, 'rgba(72,73,184,' + (a * (wide ? .6 : 1)) + ')');
      gr.addColorStop(wide ? .45 : .5, 'rgba(72,73,184,' + (a * (wide ? .6 : 1)) + ')');
      gr.addColorStop(wide ? .65 : 1, 'rgba(72,73,184,' + a + ')');
      gr.addColorStop(1, 'rgba(72,73,184,' + a + ')');
      return gr;
    }
    function draw() { ctx.clearRect(0, 0, W, H);
      trace(imp, H * .74, H * .10, grad(.20), 1.6);
      trace(ecg, H * .30, H * .16, grad(.18), 1.6);
    }
    function frame(now) { if (!running) return; T += Math.min((now - last) / 1000, .1); last = now; draw(); raf = requestAnimationFrame(frame); }
    function sync() {
      var go = wanted && visible;
      if (go && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
      else if (!go && running) { running = false; cancelAnimationFrame(raf); draw(); }
    }
    window.addEventListener('resize', function () { size(); draw(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; sync(); }).observe(cv);
    }
    size(); draw(); sync();
  })();

  /* ================= LymphSense baseline tracker (built each time the LymphSense popup opens) ================= */
  function initTracker() {
    var svg = $('#chart'); if (!svg) return;
    function rng(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    var r = rng(20251);
    function gauss() { var u = 1 - r(), v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    var N = 30, TRUE = 1000, SD = 55, BAND = 140, data = [], d, i;
    for (d = 1; d <= N; d++) { var drift = d >= 20 ? -(d - 19) * 10 : 0; data.push(Math.round(TRUE + drift + gauss() * SD)); }
    var sum = 0; for (i = 0; i < 14; i++) sum += data[i];
    var BASE = Math.round(sum / 14);
    var PHANTOM = 784 / 1075; /* measured: +20% fluid */
    /* Slider f in -20..+20 (% fluid change). 0 = today reads at your baseline.
       + = more fluid (lower impedance), - = less fluid (higher impedance), same linear phantom scale both ways. */
    function today(f) { return BASE * (1 - (1 - PHANTOM) * f / 20); }

    var X0 = 50, X1 = 612, Y0 = 14, Y1 = 240, YMIN = 600, YMAX = 1300;
    function px(dd) { return X0 + (X1 - X0) * (dd - 1) / (N - 1); }
    function py(o) { return Y1 - (Y1 - Y0) * (o - YMIN) / (YMAX - YMIN); }
    var p = '', o;
    for (o = 600; o <= 1300; o += 100) {
      p += '<line x1="' + X0 + '" x2="' + X1 + '" y1="' + py(o) + '" y2="' + py(o) + '" stroke="#eeeef5"/>' + (o % 200 === 0 ? '<text x="' + (X0 - 8) + '" y="' + (py(o) + 4) + '" text-anchor="end">' + o + '</text>' : '');
    }
    p += '<line x1="' + X0 + '" x2="' + X0 + '" y1="' + Y0 + '" y2="' + Y1 + '" stroke="#a5a5b8"/><line x1="' + X0 + '" x2="' + X1 + '" y1="' + Y1 + '" y2="' + Y1 + '" stroke="#a5a5b8"/>';
    [1, 5, 10, 15, 20, 25, 30].forEach(function (dd) { p += '<text x="' + px(dd) + '" y="' + (Y1 + 18) + '" text-anchor="middle">' + (dd === 30 ? 'Today' : dd) + '</text>'; });
    p += '<text x="' + ((X0 + X1) / 2) + '" y="' + (Y1 + 38) + '" text-anchor="middle">Day</text>' +
      '<text x="12" y="' + ((Y0 + Y1) / 2) + '" transform="rotate(-90 12 ' + ((Y0 + Y1) / 2) + ')" text-anchor="middle">Impedance (&#937;)</text>';
    p += '<rect x="' + X0 + '" y="' + py(BASE + BAND) + '" width="' + (X1 - X0) + '" height="' + (py(BASE - BAND) - py(BASE + BAND)) + '" fill="#4849b8" opacity=".10"/>' +
      '<line x1="' + X0 + '" x2="' + X1 + '" y1="' + py(BASE) + '" y2="' + py(BASE) + '" stroke="#4849b8" stroke-width="2" stroke-dasharray="6 4"/>' +
      '<text x="' + (X0 + 8) + '" y="' + (py(BASE + BAND) - 6) + '" style="fill:#33348a;font-weight:600">Your normal band (&#177;' + BAND + ' &#937;)</text>' +
      '<text x="' + (X0 + 8) + '" y="' + (py(BASE - BAND) + 16) + '" style="fill:#33348a;font-weight:600">Your baseline ' + BASE + ' &#937;</text>';
    var pts = ''; for (var k = 0; k < N - 1; k++) pts += px(k + 1).toFixed(1) + ',' + py(data[k]).toFixed(1) + ' ';
    p += '<polyline points="' + pts + '" fill="none" stroke="#8a8bc9" stroke-width="1.5"/>';
    for (var k2 = 0; k2 < N - 1; k2++) {
      var out = Math.abs(data[k2] - BASE) > BAND;
      p += '<circle cx="' + px(k2 + 1).toFixed(1) + '" cy="' + py(data[k2]).toFixed(1) + '" r="3.5" fill="' + (out ? '#c98a2e' : '#4849b8') + '"/>';
    }
    p += '<line id="tl" stroke="#8a8bc9" stroke-width="1.5"/><circle id="td" r="7" fill="#fff" stroke="#4849b8" stroke-width="3"/>';
    svg.innerHTML = p;
    var tl = $('#tl'), td = $('#td');
    var sl = $('#fluid'), ohm = $('#ohm'), msg = $('#msg'), sub = $('#msub'), st = $('#status'), sv = $('#fluidv');
    function update() {
      var f = +sl.value, z = today(f), zr = Math.round(z);
      sv.textContent = f === 0 ? '0% change' : (f > 0 ? '+' + f + '% fluid' : '−' + (-f) + '% fluid');
      ohm.textContent = zr;
      var x = px(N), y = py(Math.max(YMIN, Math.min(YMAX, z)));
      td.setAttribute('cx', x); td.setAttribute('cy', y);
      tl.setAttribute('x1', px(N - 1)); tl.setAttribute('y1', py(data[N - 2])); tl.setAttribute('x2', x); tl.setAttribute('y2', y);
      var pct = Math.abs((z - BASE) / BASE * 100), pr = pct.toFixed(0);
      if (z < BASE - BAND) {
        msg.textContent = 'Below your baseline by ' + pr + '% — consider checking with your clinician';
        sub.textContent = 'Lower impedance means more fluid than your usual.';
        st.className = 'status dev';
      } else if (z > BASE + BAND) {
        msg.textContent = 'Above your baseline by ' + pr + '%';
        sub.textContent = 'Higher impedance means less fluid than your usual. Try again in a day or two.';
        st.className = 'status dev';
      } else {
        msg.textContent = 'Within your normal';
        sub.textContent = pct < 1 ? 'Right on your baseline of ' + BASE + ' Ω.' : pr + '% ' + (z < BASE ? 'below' : 'above') + ' your baseline of ' + BASE + ' Ω, inside your band.';
        st.className = 'status';
      }
    }
    sl.addEventListener('input', update); update();
  }

  /* ================= Skills: click a skill -> small popover listing its projects -> project popup ================= */
  (function () {
    /* skill -> { project: text in that project's popup to highlight } ; popover lists projects in page order */
    var ORDER = ['lymphsense', 'tymewear', 'tissueguard', 'betteryears', 'seedswap', 'h2x'];
    var COLS = [
      ['Design & Analysis', [['SolidWorks (CAD, FEA)', { lymphsense: 'mushroom-profile', tymewear: 'Ran FEA', seedswap: 'SolidWorks' }], ['Fusion', {}], ['Onshape', {}], ['KiCAD', { tymewear: 'KiCAD PCB' }]]],
      ['Fabrication', [['CNC mill', { tymewear: 'CNC-milled' }], ['Manual lathe', {}], ['OMAX waterjet', {}], ['Laser cutter', {}], ['Welding', {}], ['Soldering', {}], ['3D printing', {}]]],
      ['Testing & Data', [['Data acquisition', { tymewear: 'Flask dashboard', h2x: 'IMU data' }], ['Test automation', { tymewear: 'Unattended stress cycles' }], ['Python', { tymewear: 'Flask dashboard' }], ['MATLAB', {}], ['C++', {}]]],
      ['Clinical', [['CPET (VO2 max)', { tymewear: 'cardiopulmonary' }], ['Bioimpedance', { lymphsense: 'tetrapolar' }], ['Human factors', { lymphsense: 'palm-grip', betteryears: '0.8 m', seedswap: 'Tilted the screen' }]]]
    ];
    var SK = {};
    COLS.forEach(function (c) { c[1].forEach(function (x) { x[2] = ORDER.filter(function (id) { return id in x[1]; }); SK[x[0]] = x[1]; }); });
    function esc(s) { return s.replace(/&/g, '&amp;'); }
    var cols = $('#skcols');
    cols.innerHTML = COLS.map(function (c) {
      return '<div class="skcol"><h3>' + esc(c[0]) + '</h3><ul>' + c[1].map(function (s) {
        if (!s[2].length) return '<li><span class="plain">' + esc(s[0]) + '</span></li>';
        return '<li><button class="sk" type="button" aria-expanded="false" aria-haspopup="true" data-skill="' + esc(s[0]) + '" data-ps="' + s[2].join(',') + '"><span>' + esc(s[0]) + '</span><span class="n">' + s[2].length + '</span></button></li>';
      }).join('') + '</ul></div>';
    }).join('');
    function thumb(id) {
      var im = P[id].imgs.filter(function (i) { return i[0].indexOf('chart:') !== 0; })[0];
      return im ? '<img src="' + IMG + im[0] + '" alt="">' : '<span class="ph"></span>';
    }
    function closePop() {
      $$('.pop', cols).forEach(function (x) { x.remove(); });
      $$('li.open', cols).forEach(function (l) { l.classList.remove('open'); l.querySelector('.sk').setAttribute('aria-expanded', 'false'); });
    }
    cols.addEventListener('click', function (e) {
      var pb = e.target.closest('.pop button');
      if (pb) {
        var id = pb.getAttribute('data-p'), sk0 = pb.closest('li').querySelector('.sk'), name = sk0.getAttribute('data-skill');
        closePop(); openProject(id, sk0, { skill: name.replace(/ \(.*\)$/, ''), match: SK[name][id] }); return;
      }
      var sk = e.target.closest('.sk'); if (!sk) return;
      var li = sk.parentNode, was = li.classList.contains('open');
      closePop(); if (was) return;
      li.classList.add('open'); sk.setAttribute('aria-expanded', 'true');
      var pop = document.createElement('div'); pop.className = 'pop';
      pop.innerHTML = '<p>Used in</p>' + sk.getAttribute('data-ps').split(',').map(function (id) {
        return '<button type="button" data-p="' + id + '">' + thumb(id) + '<span>' + P[id].name + '</span></button>';
      }).join('');
      li.appendChild(pop);
      if (li.getBoundingClientRect().left + 272 > window.innerWidth - 12) pop.classList.add('r');
    });
    document.addEventListener('mousedown', function (e) { if (!e.target.closest('.pop') && !e.target.closest('.sk')) closePop(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !openDlg) closePop(); });
  })();

  /* ================= Experience Gantt ================= */
  (function () {
    var SPAN = 16, NOW = 14.75; /* months from Sep 2025; ~late Nov 2026 */
    var MONTHS = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var E = [
      { id: 'bu', name: 'B.S. Mechanical Engineering', org: 'Boston University', lane: 'edu', s: 0, e: 16, ev: false, dates: 'Sep 2025 – May 2029 (expected)', clip: true, bar: 'Sep 2025 → May 2029',
        pts: ['Minor in Biomedical Engineering; concentration in Technology Innovation', 'GPA 3.87, Dean’s List'] },
      { id: 'lymph', pop: 'lymphsense', name: 'LymphSense', org: 'Student project', lane: 'proj', s: 0, e: NOW, ev: false, dates: 'Sep 2025 – present', bar: 'Sep 2025 → present' },
      { id: 'h2x', pop: 'h2x', name: 'Research Assistant', org: 'BU H2X Lab', lane: 'work', s: 2, e: 9, ev: false, dates: 'Nov 2025 – May 2026' },
      { id: 'seed', pop: 'seedswap', name: 'SeedSwap', org: 'MIT Ripple Design-a-thon', lane: 'proj', s: 7, e: 8, ev: true, dates: 'Apr 2026' },
      { id: 'tyme', pop: 'tymewear', name: 'Engineering Intern', org: 'Tymewear, Somerville MA', lane: 'work', s: 9, e: 12, ev: false, dates: 'Jun – Aug 2026' },
      { id: 'better', pop: 'betteryears', name: 'BetterYears', org: 'SundAI Hack 143 at Harvard', lane: 'proj', s: 13, e: 14, ev: true, dates: 'Oct 2026' },
      { id: 'tissue', pop: 'tissueguard', name: 'TissueGuard', org: 'MedTech Conference Boston', lane: 'proj', s: 13, e: 14, ev: true, dates: 'Oct 2026' }
    ];
    var byId = {}; E.forEach(function (x) { byId[x.id] = x; });
    function pct(t) { return (t / SPAN * 100) + '%'; }
    /* one continuous 'present' line over the whole chart (label column width comes from CSS --rlw) */
    var nowL = '<div class="now" style="left:calc(var(--rlw) + (100% - var(--rlw)) * ' + (NOW / SPAN).toFixed(4) + ')"></div>';
    var g = '<div class="grow ghd"><div class="rl">Sep 2025 → Dec 2026</div><div class="trk"><div class="yrs"><div style="width:25%">2025</div><div style="width:75%">2026</div></div><div class="mos">' +
      MONTHS.map(function (m) { return '<div>' + m + '</div>'; }).join('') + '</div></div></div>';
    E.forEach(function (x) {
      var m, lab = x.name + ', ' + x.dates + (x.pop ? ' (opens details)' : '');
      if (x.ev) {
        var c = x.s + 0.5;
        m = '<button class="dot" type="button" data-id="' + x.id + '" style="left:' + pct(c) + '" aria-label="' + lab + '"></button><span class="dlb" style="left:calc(' + pct(c) + ' + 18px)">' + x.dates + '</span>';
      } else {
        m = '<button class="fill ' + x.lane + (x.clip ? ' clip' : '') + '" type="button" data-id="' + x.id + '" style="left:' + pct(x.s) + ';width:' + pct(x.e - x.s) + '" aria-label="' + lab + '">' + (x.bar || x.dates) + '</button>';
      }
      g += '<div class="grow"><div class="rl" data-id="' + x.id + '" style="cursor:pointer">' + x.name + '<small>' + x.org + '</small></div><div class="trk">' + m + '</div></div>';
    });
    var gantt = $('#gantt'), det = $('#xdetail');
    gantt.innerHTML = g + nowL;
    function mark(id) { $$('[data-id]', gantt).forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-id') === id); }); }
    function showBU() {
      var x = byId.bu; mark('bu');
      det.innerHTML = '<h3>' + x.name + '</h3><p class="m">' + x.org + ' · ' + x.dates + '</p><ul>' + x.pts.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>';
    }
    gantt.addEventListener('click', function (e) {
      var b = e.target.closest('[data-id]'); if (!b) return;
      var x = byId[b.getAttribute('data-id')];
      if (x.pop) { mark(x.id); openProject(x.pop, b); } else showBU();
    });
    showBU();
  })();

  /* ================= Contact: click-to-copy email ================= */
  (function () {
    var btn = $('#copymail'), msgEl = $('#copymsg'), ADDR = 'afu29@bu.edu', orig = msgEl.textContent, tmr = 0;
    function done() { msgEl.textContent = 'Copied'; msgEl.classList.add('ok'); clearTimeout(tmr); tmr = setTimeout(function () { msgEl.textContent = orig; msgEl.classList.remove('ok'); }, 1600); }
    function fallback() {
      var t = document.createElement('textarea'); t.value = ADDR; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select(); var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(t);
      if (ok) done(); else { msgEl.textContent = 'Copy failed — the address is afu29@bu.edu'; }
    }
    btn.addEventListener('click', function () {
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(ADDR).then(done, fallback); else fallback();
    });
  })();

  /* ================= Scroll reveal (fade + small rise, staggered, heading lines) ================= */
  (function () {
    var items = $$('.rv'), heads = $$('.hd');
    function showAll() { items.concat(heads).forEach(function (e) { e.classList.add('in'); }); }
    if (reduceMotion || !('IntersectionObserver' in window)) { showAll(); return; }
    var io = new IntersectionObserver(function (es, obs) {
      var hits = es.filter(function (e) { return e.isIntersecting; });
      hits.sort(function (a, b) { return items.indexOf(a.target) - items.indexOf(b.target); });
      var n = 0;
      hits.forEach(function (en) {
        var el = en.target;
        if (el.classList.contains('rv')) { el.style.setProperty('--d', (n * 40) + 'ms'); n++; }
        el.classList.add('in'); obs.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    items.concat(heads).forEach(function (e) { io.observe(e); });
  })();
})();
