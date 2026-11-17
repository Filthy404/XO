(function () {
  "use strict";

  var SITE = window.SITE;
  var lines = SITE.lines;
  var photos = SITE.photos;

  function burst(n) {
    for (var i = 0; i < n; i++) {
      var h = document.createElement("div");
      h.className = "heart";
      h.textContent = "\u2665";
      h.style.left = Math.random() * 90 + 5 + "vw";
      h.style.bottom = "-20px";
      h.style.fontSize = 18 + Math.random() * 22 + "px";
      document.body.appendChild(h);
      setTimeout(function (el) { el.remove(); }, 3100, h);
    }
  }
  setInterval(function () { burst(1); }, 1800);

  // ===== Shared helpers =====
  var SVGNS = "http://www.w3.org/2000/svg";
  function $(id) { return document.getElementById(id); }
  function retrigger(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

  // Radial sparks flying out from the centre of an element
  function sparkAt(el, n) {
    var r = el.getBoundingClientRect();
    var glyphs = ["\u2665", "\u2726", "\u273F"];
    for (var i = 0; i < n; i++) {
      var p = document.createElement("div");
      var a = (i / n) * Math.PI * 2 + Math.random() * 0.6;
      var d = 50 + Math.random() * 50;
      p.className = "spark";
      p.textContent = glyphs[i % 3];
      p.style.left = (r.left + r.width / 2) + "px";
      p.style.top = (r.top + r.height / 2) + "px";
      p.style.setProperty("--dx", Math.cos(a) * d + "px");
      p.style.setProperty("--dy", Math.sin(a) * d + "px");
      document.body.appendChild(p);
      setTimeout(function (e) { e.remove(); }, 1000, p);
    }
  }
  function floatWord(el, text) {
    var r = el.getBoundingClientRect();
    var w = document.createElement("div");
    w.className = "fword";
    w.textContent = text;
    w.style.left = (r.left + r.width / 2) + "px";
    w.style.top = (r.top - 4) + "px";
    document.body.appendChild(w);
    setTimeout(function () { w.remove(); }, 1150);
  }

  // Small decorative doodles placed inside a card: {s: symbol id, t/b/l/r: offsets, c: extra class}
  function deco(card, items) {
    items.forEach(function (it) {
      var s = document.createElementNS(SVGNS, "svg");
      s.setAttribute("class", "dc " + (it.c || ""));
      ["t", "b", "l", "r"].forEach(function (k) {
        if (it[k]) s.style[{ t: "top", b: "bottom", l: "left", r: "right" }[k]] = it[k];
      });
      s.innerHTML = '<use href="#' + it.s + '"/>';
      card.appendChild(s);
    });
  }
  // A kitten peeking over the top edge of a card, with an optional accessory (SVG string)
  function peek(card, color, side, extra) {
    var s = document.createElementNS(SVGNS, "svg");
    s.setAttribute("class", "peek " + side);
    s.setAttribute("viewBox", "0 -22 100 92");
    s.innerHTML = '<use href="#kitten" width="100" height="100" style="color:' + color + '"/>' + (extra || "");
    card.appendChild(s);
  }
  var GLASSES = '<g fill="none" stroke="#2b2230" stroke-width="3"><circle cx="35" cy="54" r="12"/><circle cx="65" cy="54" r="12"/><path d="M47 54H53"/></g>';
  var WIZARD = '<path d="M28 34 L50 -18 L72 34Z" fill="#6b4bd8"/><rect x="24" y="31" width="52" height="6" rx="3" fill="#4b2fb0"/><circle cx="50" cy="6" r="3" fill="#ffd23f"/>';
  var MAIL = '<rect x="56" y="50" width="32" height="22" rx="2" fill="#fff" stroke="#8c5a73" stroke-width="2"/><path d="M56 50 L72 63 L88 50" fill="none" stroke="#8c5a73" stroke-width="2"/>';
  var HOLDHEART = '<path transform="translate(80 58) scale(.9)" d="M0 8 C-12 -1 -6 -10 0 -4 C6 -10 12 -1 0 8Z" fill="#ff5c8a"/>';

  deco($("reflect"), [{ s: "sp", t: "12px", l: "14px", c: "tw" }, { s: "st", t: "16px", r: "16px", c: "tw d2" }, { s: "pw", b: "14px", l: "16px", c: "fl" }, { s: "ht", b: "16px", r: "18px", c: "f fl d2" }]);
  peek($("reflect"), "#b8b8c8", "r", GLASSES);
  deco($("gallerySec"), [{ s: "pw", t: "14px", l: "14px", c: "fl" }, { s: "pw", t: "14px", r: "14px", c: "fl d2" }, { s: "sp", b: "12px", l: "20px", c: "tw" }, { s: "sp", b: "12px", r: "20px", c: "tw d2" }]);
  deco($("fateSec"), [{ s: "mn", t: "14px", r: "18px", c: "f tw" }, { s: "st", t: "18px", l: "16px", c: "f tw d2" }, { s: "sp", b: "14px", l: "18px", c: "tw" }, { s: "st", b: "14px", r: "20px", c: "tw d2" }]);
  peek($("fateSec"), "#f6e3c4", "l", WIZARD);
  deco($("letterSec"), [{ s: "ht", t: "14px", l: "16px", c: "f fl" }, { s: "ht", t: "18px", r: "16px", c: "f fl d2" }, { s: "pw", b: "14px", l: "16px", c: "fl" }, { s: "sq", b: "16px", r: "14px" }]);
  peek($("letterSec"), "#f4a259", "r", MAIL);
  deco($("askSec"), [{ s: "ht", t: "14px", l: "14px", c: "f fl" }, { s: "ht", t: "14px", r: "14px", c: "f fl d2" }, { s: "sp", b: "14px", l: "18px", c: "tw" }, { s: "sp", b: "14px", r: "18px", c: "tw d2" }]);
  peek($("askSec"), "#f4a259", "l", HOLDHEART);
  peek($("askSec"), "#b8b8c8", "r", HOLDHEART);

  // ===== Hero kittens: each tap plays a different animation =====
  var sayings = SITE.sayings;
  var heroActs = ["a-hop", "a-spin", "a-squish"];
  var meows = ["Meong!", "Nyaw~", "Purr purr"];
  document.querySelectorAll(".hero svg").forEach(function (el, i) {
    var taps = 0;
    el.addEventListener("click", function () {
      heroActs.forEach(function (c) { el.classList.remove(c); });
      void el.getBoundingClientRect();
      el.classList.add(heroActs[(i + taps) % 3]);
      $("bubble").textContent = sayings[i];
      retrigger($("bubble"), "bin");
      sparkAt(el, 8);
      floatWord(el, meows[(i + taps) % 3]);
      taps++;
    });
    el.addEventListener("animationend", function (e) {
      if (/^(hop|spin|squish)$/.test(e.animationName)) heroActs.forEach(function (c) { el.classList.remove(c); });
    });
  });

  // ===== Reflections: word-by-word entrance, hand-drawn doodle, author tag =====
  var doodles = [
    '<path d="M30 44 q-14 0 -14 -12 q0 -12 14 -12 q4 -10 20 -6 q12 -6 22 4 q14 0 14 12 q0 14 -14 14 z"/><circle cx="26" cy="56" r="3"/><circle cx="18" cy="64" r="2"/><path d="M40 32 q6 -8 12 0 t12 0"/>',
    '<path d="M8 36 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0"/><path d="M8 48 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0"/><path d="M8 60 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0"/><path d="M48 18 h24 l-5 10 h-14 z"/><path d="M60 18 V6 l10 8 h-10"/>',
    '<path d="M8 62 L90 22"/><path d="M90 22 V8 l14 5 l-14 5"/><circle cx="58" cy="30" r="10"/>',
    '<path d="M58 60 C16 32 28 6 58 26"/><path d="M62 60 C104 32 92 6 62 26"/><path d="M60 14 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z"/>',
    '<path d="M60 66 V42"/><path d="M60 42 L30 14"/><path d="M60 42 L90 14"/><path d="M30 14 l1 9 M30 14 l9 1"/><path d="M90 14 l-1 9 M90 14 l-9 1"/>',
    '<path d="M28 16 L60 4 L92 16 Z"/><path d="M36 22 V58"/><path d="M50 22 V58"/><path d="M70 22 V58"/><path d="M84 22 V58"/><path d="M30 62 H90"/>'
  ];
  var lineEl = $("line");
  var idx = -1;
  $("next").addEventListener("click", function () {
    idx = (idx + 1) % lines.length;
    var wrap = document.createElement("div");
    wrap.className = "lt";
    lines[idx].split(" ").forEach(function (word, i) {
      var s = document.createElement("span");
      s.className = "w";
      s.textContent = word;
      s.style.animationDelay = (i * 0.05) + "s";
      wrap.appendChild(s);
      wrap.appendChild(document.createTextNode(" "));
    });
    lineEl.textContent = "";
    lineEl.appendChild(wrap);
    $("lineTag").textContent = SITE.authors[idx];
    retrigger($("lineTag"), "pop");
    var dEl = $("lineDoodle");
    dEl.innerHTML = doodles[idx];
    dEl.querySelectorAll("*").forEach(function (n, i) {
      n.setAttribute("pathLength", "1");
      n.style.animationDelay = (i * 0.15) + "s";
    });
    retrigger($("reflect"), "flash");
    burst(3);
  });

  // ===== Gallery: tap a card to reveal the photo =====
  var gallery = $("gallery");
  var opened = 0;
  photos.forEach(function (p) {
    var d = document.createElement("div");
    d.className = "cat";
    d.tabIndex = 0;
    d.innerHTML = '<div class="frame"><img alt="" loading="lazy"><div class="cover"><svg class="pawbig"><use href="#pw"/></svg><span>Ketuk aku</span></div></div><p class="cap"></p>';
    d.querySelector("img").src = p.src;
    d.querySelector("img").alt = p.text;
    d.querySelector(".cap").textContent = p.text;
    function show() {
      if (d.classList.contains("on")) return;
      d.classList.add("on");
      sparkAt(d, 8);
      opened++;
      $("galleryHint").textContent = opened < photos.length
        ? "Terbuka " + opened + " dari " + photos.length
        : "Semua anabul sudah terbuka. Sekarang kamu tahu isi kepalaku.";
      if (opened === photos.length) burst(12);
    }
    d.addEventListener("click", show);
    d.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(); }
    });
    gallery.appendChild(d);
  });

  // ===== Fate cards =====
  var fateIcons = ["mn", "st", "ht"];
  SITE.fates.forEach(function (text, i) {
    var card = document.createElement("div");
    card.className = "pick";
    card.innerHTML = '<div><svg class="pk"><use href="#' + fateIcons[i % 3] + '"/></svg><span></span></div>';
    var label = card.querySelector("span");
    label.textContent = "Kartu " + (i + 1);
    card.addEventListener("click", function () {
      if (card.classList.contains("open")) return;
      card.classList.add("open");
      label.textContent = text;
      sparkAt(card, 8);
    });
    $("picks").appendChild(card);
  });

  // ===== Letter: envelope opens, paper slides out, text is typed =====
  var env = $("open");
  var typing = false;
  env.addEventListener("click", function () {
    if (typing) return;
    typing = true;
    env.classList.add("opened");
    setTimeout(function () {
      env.style.display = "none";
      $("letter").style.display = "block";
      retrigger($("letter"), "slide");
      var text = SITE.letter;
      var pos = 0;
      var timer = setInterval(function () {
        pos++;
        $("letterBody").textContent = text.slice(0, pos);
        if (pos >= text.length) {
          clearInterval(timer);
          $("letter").classList.add("done");
          sparkAt($("letterSticker"), 8);
        }
      }, 35);
    }, 700);
  });

  // ===== Final question: both hearts say yes =====
  var arena = $("arena");
  function answer() {
    if (arena.classList.contains("done")) return;
    arena.classList.add("done");
    $("reveal").style.display = "block";
    retrigger($("reveal"), "pop");
    sparkAt(arena, 18);
    burst(30);
  }
  $("yes").addEventListener("click", answer);
  $("no").addEventListener("click", answer);

  var panelEl = document.getElementById("panel");
  var stemEl = document.getElementById("stem");
  var wheelEl = document.getElementById("wheel");
  var jetEl = document.getElementById("jet");
  var jetClipEl = document.getElementById("jetClipPoly");
  var flowEl = document.getElementById("flow");
  var splashEl = document.getElementById("splash");
  var upEl = document.getElementById("up");
  var downEl = document.getElementById("down");
  var range = document.getElementById("gateRange");
  var damInfo = document.getElementById("damInfo");
  var damMsg = document.getElementById("damMsg");
  var wasFull = false;
  var boatEl = document.getElementById("boat");
  var fishEl = document.getElementById("fish");
  var catSay = document.getElementById("catSay");
  var loveEl = document.getElementById("love");

  function updateDam() {
    var open = range.value / 100;
    // Scale: 30 drawing units = 1 m, so the 90-unit upstream depth is 3 m when the gate is closed
    var lift = open * 56;
    var opening = lift / 30;
    var headM = (90 - open * 10) / 30;
    // Free-flow sluice gate discharge: Q = Cd * b * a * sqrt(2 * g * H), with H the upstream depth
    var discharge = 0.6 * 2 * opening * Math.sqrt(2 * 9.81 * headM);
    // Gate geometry: the panel lifts up to 56 units, the opening below it is the water jet
    var yTop = 130 - lift;
    var downH = open * 60;
    panelEl.setAttribute("transform", "translate(0," + (-lift).toFixed(1) + ")");
    stemEl.setAttribute("y1", (36 - lift).toFixed(1));
    wheelEl.setAttribute("transform", "rotate(" + (open * 720).toFixed(0) + " 140 -50)");
    var jetPts = "130," + yTop.toFixed(1) + " 150," + yTop.toFixed(1) + " 192," + (130 - downH).toFixed(1) + " 192,130 130,130";
    jetEl.setAttribute("points", jetPts);
    jetClipEl.setAttribute("points", jetPts);
    jetEl.setAttribute("opacity", open > 0 ? "0.95" : "0");
    flowEl.setAttribute("d", [1, 2, 3].map(function (k) {
      return "M130 " + (130 - lift * k / 4).toFixed(1) + " H184";
    }).join(" "));
    splashEl.setAttribute("opacity", open > 0 ? "1" : "0");
    splashEl.setAttribute("transform", "translate(168," + (130 - downH - 3).toFixed(1) + ")");
    upEl.setAttribute("y", 40 + open * 10);
    upEl.setAttribute("height", 90 - open * 10);
    downEl.setAttribute("y", 130 - open * 60);
    downEl.setAttribute("height", open * 60);
    damInfo.textContent = "Bukaan a = " + opening.toFixed(2).replace(".", ",") + " m  |  H = " + headM.toFixed(2).replace(".", ",") + " m  |  Debit Q = " + discharge.toFixed(1).replace(".", ",") + " m³/s";
    var msg;
    if (open === 0) msg = "Pintu tertutup rapat. Andry masih menahan semuanya.";
    else if (open < 0.35) msg = "Mulai merembes. Perasaan Andry bocor sedikit demi sedikit.";
    else if (open < 0.75) msg = "Aliran makin deras. Debitnya sudah susah dikendalikan.";
    else if (open < 1) msg = "Hampir terbuka penuh. Tinggal sedikit lagi.";
    else msg = "Terbuka penuh. Seluruh debit perasaan Andry mengalir ke arahmu, Dzahwa.";
    damMsg.textContent = msg;
    boatEl.setAttribute("transform", "translate(0," + (open * 10).toFixed(1) + ")");
    var waterH = open * 60;
    if (waterH >= 14) {
      fishEl.setAttribute("opacity", "1");
      fishEl.setAttribute("transform", "translate(228," + (130 - waterH / 2).toFixed(1) + ")");
    } else {
      fishEl.setAttribute("opacity", "0");
    }
    catSay.textContent = open === 0 ? "Tahan!" : open < 0.35 ? "Aman!" : open < 0.75 ? "Waduh!" : open < 1 ? "Siaga!" : "Jebol!";
    loveEl.classList.toggle("on", open === 1);
    if (open === 1 && !wasFull) burst(14);
    wasFull = open === 1;
  }
  range.addEventListener("input", updateDam);
  updateDam();

  // ----- Machine learning compatibility analysis -----
  var NS = "http://www.w3.org/2000/svg";
  var seed = 7;
  function rand() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  function gauss() {
    var u = rand() || 0.0001;
    var v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function fmt(n) { return n.toFixed(3).replace(".", ","); }

  // Synthetic learning curves: both losses decay and stay close (no overfitting)
  var EPOCHS = 50;
  var trainVals = [];
  var valVals = [];
  var trainPts = [];
  var valPts = [];
  for (var ep = 0; ep <= EPOCHS; ep++) {
    var px = 36 + (ep / EPOCHS) * 268;
    var tl = Math.max(0.03, 0.04 + 0.96 * Math.exp(-ep / 9) + (ep > 0 ? gauss() * 0.012 : 0));
    var vl = Math.max(0.05, 0.06 + 1.0 * Math.exp(-ep / 9.5) + (ep > 0 ? gauss() * 0.02 : 0));
    trainVals.push(tl);
    valVals.push(vl);
    trainPts.push(px.toFixed(1) + "," + (146 - tl / 1.05 * 128).toFixed(1));
    valPts.push(px.toFixed(1) + "," + (146 - vl / 1.05 * 128).toFixed(1));
  }

  // Synthetic 2D embedding: Andry and Dzahwa overlap, other samples sit far away
  var ptsEl = document.getElementById("pts");
  var pointEls = [];
  function addGroup(count, cx, cy, sd, color) {
    for (var i = 0; i < count; i++) {
      var c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", clamp(cx + gauss() * sd, 38, 302).toFixed(1));
      c.setAttribute("cy", clamp(cy + gauss() * sd, 16, 144).toFixed(1));
      c.setAttribute("r", "3.6");
      c.setAttribute("fill", color);
      c.setAttribute("class", "pt");
      ptsEl.appendChild(c);
      pointEls.push(c);
    }
  }
  addGroup(12, 70, 108, 13, "#9a8f99");
  addGroup(12, 258, 122, 13, "#9a8f99");
  addGroup(18, 165, 78, 10, "#ff5c8a");
  addGroup(18, 177, 84, 10, "#4aa8ff");

  var features = SITE.features;
  features.sort(function (a, b) { return b[1] - a[1]; });
  var featEl = document.getElementById("feat");
  var featRows = features.map(function (f, i) {
    var row = document.createElement("div");
    row.className = "fi" + (i === 0 ? " top" : "");
    var name = document.createElement("span");
    name.textContent = (i + 1) + ". " + f[0];
    var bar = document.createElement("div");
    bar.className = "fbar";
    var fillI = document.createElement("i");
    bar.appendChild(fillI);
    var val = document.createElement("b");
    val.textContent = "0,00";
    row.appendChild(name);
    row.appendChild(bar);
    row.appendChild(val);
    featEl.appendChild(row);
    return { row: row, fill: fillI, val: val, target: f[1] };
  });

  // Animates a number from 0 to target (ease-out), formatted with a decimal comma
  function countUp(el, target, duration) {
    var start = null;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(2).replace(".", ",");
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var chipsEl = document.getElementById("chips");
  var chipEls = ["Accuracy 99,7%", "Precision 0,99", "Recall 1,00", "F1-score 0,98", "AUC 0,99"].map(function (t) {
    var c = document.createElement("span");
    c.className = "chip";
    c.textContent = t;
    chipsEl.appendChild(c);
    return c;
  });

  var epochLabel = document.getElementById("epochLabel");
  var trainLine = document.getElementById("trainLine");
  var valLine = document.getElementById("valLine");
  var calcBtn = document.getElementById("calc");

  function revealClusters(done) {
    epochLabel.textContent = "Memproyeksikan embedding ke 2D (PCA)...";
    var i = 0;
    var t = setInterval(function () {
      if (i < pointEls.length) { pointEls[i].classList.add("on"); i++; return; }
      clearInterval(t);
      document.getElementById("pairMark").classList.add("on");
      setTimeout(done, 900);
    }, 45);
  }
  function revealFeatures(done) {
    epochLabel.textContent = "Menghitung feature importance (SHAP)...";
    document.getElementById("featHint").style.opacity = "0";
    featRows.forEach(function (r, i) {
      setTimeout(function () {
        r.row.classList.add("on");
        r.fill.style.width = (r.target * 100) + "%";
        countUp(r.val, r.target, 900);
      }, i * 220);
    });
    setTimeout(done, featRows.length * 220 + 1100);
  }
  function revealVerdict() {
    epochLabel.textContent = "Evaluasi pada test set selesai.";
    document.getElementById("verdict").classList.add("on");
    document.getElementById("probFill").style.width = "99.9%";
    chipEls.forEach(function (c, i) {
      setTimeout(function () { c.classList.add("on"); }, 400 + i * 250);
    });
    setTimeout(function () {
      document.getElementById("doneDoodle").classList.add("on");
      burst(16);
    }, 400 + chipEls.length * 250);
    calcBtn.textContent = "Pelatihan selesai";
  }

  calcBtn.addEventListener("click", function () {
    calcBtn.disabled = true;
    calcBtn.textContent = "Melatih model...";
    var epoch = 0;
    var timer = setInterval(function () {
      epoch++;
      trainLine.setAttribute("points", trainPts.slice(0, epoch + 1).join(" "));
      valLine.setAttribute("points", valPts.slice(0, epoch + 1).join(" "));
      epochLabel.textContent = "Epoch " + epoch + " / " + EPOCHS + " | train loss " + fmt(trainVals[epoch]) + " | val loss " + fmt(valVals[epoch]);
      if (epoch >= EPOCHS) {
        clearInterval(timer);
        document.getElementById("noOverfit").classList.add("on");
        setTimeout(function () {
          revealClusters(function () { revealFeatures(revealVerdict); });
        }, 700);
      }
    }, 70);
  });

  var audioCtx = null;
  var musicTimer = null;
  var scale = [523.25, 587.33, 659.25, 783.99, 880, 783.99, 659.25, 587.33];
  var step = 0;
  function playNote() {
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    var t = audioCtx.currentTime;
    osc.type = "sine";
    osc.frequency.value = scale[step++ % scale.length];
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.08, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + 1);
  }
  var bgm = document.getElementById("bgm");
  var musicBtn = document.getElementById("music");
  var playing = false;
  var useFile = true;

  function startSynth() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtx.resume();
      if (!musicTimer) musicTimer = setInterval(playNote, 600);
    } catch (err) {
      console.error("Audio unavailable:", err);
    }
  }
  function startMusic() {
    playing = true;
    musicBtn.textContent = "Hentikan musik";
    if (useFile) {
      var p = bgm.play();
      if (p && p.catch) p.catch(function () { useFile = false; if (playing) startSynth(); });
    } else {
      startSynth();
    }
  }
  function stopMusic() {
    playing = false;
    bgm.pause();
    if (musicTimer) { clearInterval(musicTimer); musicTimer = null; }
    musicBtn.textContent = "Putar musik";
  }
  bgm.addEventListener("error", function () {
    useFile = false;
    if (playing) startSynth();
  });
  musicBtn.addEventListener("click", function () {
    if (playing) stopMusic(); else startMusic();
  });
  var revealTargets = document.querySelectorAll("main > h1, main > p.sub, main > .hero, main > .card, main > footer");
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  function startReveal() {
    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.filter(function (e) { return e.isIntersecting; }).forEach(function (entry, i) {
        entry.target.style.transitionDelay = (i * 0.3) + "s";
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  }

  document.getElementById("enter").addEventListener("click", function () {
    document.getElementById("gate").style.display = "none";
    startMusic();
    startReveal();
  });

  document.getElementById("theme").addEventListener("click", function () {
    var root = document.documentElement;
    var dark = root.getAttribute("data-theme") === "dark" ||
      (!root.hasAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    root.setAttribute("data-theme", dark ? "light" : "dark");
  });

})();
