/* ==========================================================
   NEW GAME — Build-a-Filter Lab
   Stack real filter layers in a bottle, pour muddy water,
   and see how clear it gets. Then learn why filtered water
   still needs disinfection.
   ========================================================== */
(function () {
  var M = {
    gravel:   { name: 'Gravel',       icon: '🪨', ideal: 0, value: 12, color: '#9aa3ad', tip: 'Catches the big stuff — leaves, twigs, and pebbles.' },
    sand:     { name: 'Sand',         icon: '🏖️', ideal: 1, value: 30, color: '#e8cf93', tip: 'Traps tiny bits of dirt — the hardest-working layer!' },
    charcoal: { name: 'Charcoal',     icon: '⬛', ideal: 2, value: 18, color: '#3b3f46', tip: 'Activated charcoal grabs smells, colors, and some chemicals.' },
    cotton:   { name: 'Cotton',       icon: '☁️', ideal: 3, value: 10, color: '#f4f7fb', tip: "Holds the sand and charcoal in so they don't wash out." },
    sugar:    { name: 'Sugar cubes',  icon: '🍬', decoy: true, value: -12, color: '#fbe3f0', tip: "Sugar dissolves in water! It can't catch dirt — it just makes sweet, muddy water." },
    soil:     { name: 'Potting soil', icon: '🟫', decoy: true, value: -28, color: '#6b4a2f', tip: 'Soil ADDS dirt to the water. Oops!' }
  };
  var ORDER = ['gravel', 'sand', 'charcoal', 'cotton', 'sugar', 'soil'];
  var SLOTS = 4, SLOT_Y0 = 92, SLOT_H = 50;
  var layers = [null, null, null, null], selected = null, poured = false, pouring = false, lastClarity = 0, disinfected = false;

  var MUD = [138, 106, 61], CLEAR = [150, 216, 245];
  function mix(t) {
    t = clamp(t, 0, 1);
    return 'rgb(' + MUD.map(function (m, i) { return Math.round(m + (CLEAR[i] - m) * t); }).join(',') + ')';
  }

  function clarityFor(ls) {
    var c = 10, real = [];
    ls.forEach(function (id) { if (!id) return; c += M[id].value; if (!M[id].decoy) real.push(M[id].ideal); });
    var pairs = 0, good = 0;
    for (var i = 0; i < real.length; i++) for (var j = i + 1; j < real.length; j++) { pairs++; if (real[i] < real[j]) good++; }
    if (pairs) c += Math.round(20 * good / pairs);
    else if (real.length === 1) c += 5;
    return clamp(c, 0, 100);
  }
  /* clarity after water has passed the first k layers (for the drip animation) */
  function clarityAfter(k) { return k <= 0 ? 0 : clarityFor(layers.slice(0, k)); }

  function patternDefs() {
    return '<defs>' +
      '<pattern id="pat-gravel" width="26" height="22" patternUnits="userSpaceOnUse"><rect width="26" height="22" fill="#b7bec6"/><circle cx="6" cy="6" r="5" fill="#8d96a0"/><circle cx="18" cy="8" r="6" fill="#9ea7b1"/><circle cx="11" cy="17" r="5" fill="#7d8691"/><circle cx="23" cy="19" r="3.5" fill="#a9b1ba"/></pattern>' +
      '<pattern id="pat-sand" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#ecd59c"/><circle cx="3" cy="4" r="1.2" fill="#c9a863"/><circle cx="10" cy="9" r="1.1" fill="#d4b574"/><circle cx="6" cy="12" r="1" fill="#b8954f"/></pattern>' +
      '<pattern id="pat-charcoal" width="18" height="16" patternUnits="userSpaceOnUse"><rect width="18" height="16" fill="#353941"/><rect x="2" y="3" width="6" height="4" fill="#23262c" transform="rotate(12 5 5)"/><rect x="10" y="9" width="6" height="4" fill="#4a4f58" transform="rotate(-15 13 11)"/></pattern>' +
      '<pattern id="pat-cotton" width="24" height="20" patternUnits="userSpaceOnUse"><rect width="24" height="20" fill="#f1f5f9"/><circle cx="7" cy="8" r="6" fill="#fff"/><circle cx="17" cy="12" r="6" fill="#fff"/><circle cx="12" cy="4" r="4" fill="#fff"/></pattern>' +
      '<pattern id="pat-sugar" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#fde7f2"/><rect x="2" y="2" width="6" height="6" fill="#fff" stroke="#f3b8d3"/><rect x="9" y="8" width="6" height="6" fill="#fff" stroke="#f3b8d3"/></pattern>' +
      '<pattern id="pat-soil" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#6b4a2f"/><circle cx="4" cy="5" r="2" fill="#4f3521"/><circle cx="11" cy="11" r="2.4" fill="#83603f"/></pattern>' +
      '<clipPath id="bottleClip"><path d="M44 22 H216 V300 C216 326 160 340 157 362 V398 H103 V362 C100 340 44 326 44 300 Z"/></clipPath>' +
      '</defs>';
  }

  function buildSVG() {
    var s = '<svg class="fl-bottle" viewBox="0 0 260 490" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Filter bottle with four layer spots">' + patternDefs();
    s += '<g clip-path="url(#bottleClip)"><rect id="flReservoir" x="40" y="90" width="180" height="0" fill="' + mix(0) + '"/></g>';
    for (var i = 0; i < SLOTS; i++) {
      var y = SLOT_Y0 + i * SLOT_H;
      s += '<g class="fl-slot" data-slot="' + i + '" tabindex="0" role="button">' +
        '<rect class="fl-slot-box" x="48" y="' + (y + 2) + '" width="164" height="' + (SLOT_H - 4) + '" rx="6" fill="rgba(255,255,255,.55)" stroke="#0b2a4a" stroke-width="2" stroke-dasharray="7 6"/>' +
        '<text x="130" y="' + (y + SLOT_H / 2 + 5) + '" text-anchor="middle" font-size="15" font-weight="700" fill="#2d4f6e" style="font-family:\'Atkinson Hyperlegible\',sans-serif">Layer ' + (i + 1) + (i === 0 ? ' (top)' : i === SLOTS - 1 ? ' (bottom)' : '') + '</text></g>';
    }
    /* bottle outline on top */
    s += '<path d="M44 22 V300 C44 326 100 340 103 362 V398 M216 22 V300 C216 326 160 340 157 362 V398" fill="none" stroke="#0b2a4a" stroke-width="5" stroke-linecap="round"/>';
    s += '<path d="M36 22 H52 M208 22 H224" stroke="#0b2a4a" stroke-width="5" stroke-linecap="round"/>';
    s += '<text x="130" y="60" text-anchor="middle" font-size="14" fill="#2d4f6e" style="font-family:\'Patrick Hand\',cursive">pour muddy water here ↓</text>';
    s += '<g id="flDrops"></g>';
    /* cup */
    s += '<g><clipPath id="cupClip"><path d="M88 414 H172 L164 482 H96 Z"/></clipPath>' +
      '<rect id="flCupWater" x="84" y="482" width="92" height="0" fill="' + mix(0) + '" clip-path="url(#cupClip)"/>' +
      '<path d="M88 414 H172 L164 482 H96 Z" fill="none" stroke="#0b2a4a" stroke-width="4" stroke-linejoin="round"/></g>';
    s += '</svg>';
    return s;
  }

  function renderSlots() {
    document.querySelectorAll('#flBottle .fl-slot').forEach(function (g) {
      var i = +g.dataset.slot, id = layers[i];
      var box = g.querySelector('.fl-slot-box'), label = g.querySelector('text');
      if (id) {
        box.setAttribute('fill', 'url(#pat-' + id + ')');
        box.setAttribute('stroke-dasharray', '0');
        label.textContent = M[id].name;
        label.setAttribute('fill', id === 'charcoal' || id === 'soil' ? '#ffffff' : '#0b2a4a');
        g.setAttribute('aria-label', 'Layer ' + (i + 1) + ': ' + M[id].name + '. Press to remove.');
      } else {
        box.setAttribute('fill', 'rgba(255,255,255,.55)');
        box.setAttribute('stroke-dasharray', '7 6');
        label.textContent = 'Layer ' + (i + 1) + (i === 0 ? ' (top)' : i === SLOTS - 1 ? ' (bottom)' : '');
        label.setAttribute('fill', '#2d4f6e');
        g.setAttribute('aria-label', 'Layer ' + (i + 1) + ': empty. ' + (selected ? 'Press to add ' + M[selected].name + '.' : 'Pick a material first.'));
      }
    });
    document.querySelectorAll('#flTray .fl-item').forEach(function (b) {
      var used = layers.indexOf(b.dataset.mat) !== -1;
      b.classList.toggle('used', used);
      b.classList.toggle('selected', selected === b.dataset.mat);
      b.setAttribute('aria-pressed', selected === b.dataset.mat ? 'true' : 'false');
    });
    $id('flPour').disabled = pouring || !layers.some(Boolean);
    $id('flHint').textContent = selected ? 'Now tap a layer spot in the bottle for the ' + M[selected].name.toLowerCase() + '!' :
      (layers.every(Boolean) ? 'Bottle full! Tap “Pour” to test it.' : 'Tap a material, then tap a spot in the bottle.');
  }

  function place(slot, mat) {
    if (pouring) return;
    if (poured) resetWater();
    var prev = layers.indexOf(mat);
    if (prev !== -1) layers[prev] = null;
    layers[slot] = mat;
    selected = null;
    renderSlots();
  }

  function onSlot(i) {
    if (pouring) return;
    if (selected) { place(i, selected); return; }
    if (layers[i]) { if (poured) resetWater(); layers[i] = null; renderSlots(); }
  }

  function resetWater() {
    poured = false; disinfected = false;
    $id('flReservoir').setAttribute('height', '0');
    $id('flCupWater').setAttribute('y', '482'); $id('flCupWater').setAttribute('height', '0');
    $id('flDrops').innerHTML = '';
    $id('flMeter').style.width = '0%';
    $id('flResultText').textContent = 'Build your filter, then pour!';
    $id('flDetails').innerHTML = '';
    $id('flDisinfect').hidden = true;
    setFeedback('flFeedback', '');
  }

  function explain(clarity) {
    var tips = [];
    var present = layers.filter(Boolean);
    layers.forEach(function (id, i) { if (id) tips.push({ good: !M[id].decoy, text: M[id].icon + ' ' + M[id].name + ': ' + M[id].tip }); });
    var pos = {}; layers.forEach(function (id, i) { if (id) pos[id] = i; });
    if (pos.sand != null && pos.gravel != null && pos.sand < pos.gravel) tips.push({ good: false, text: '↕️ Big gravel should sit ABOVE the sand, so it catches large chunks before they clog the sand.' });
    if (pos.charcoal != null && pos.sand != null && pos.charcoal < pos.sand) tips.push({ good: false, text: '↕️ Charcoal works best BELOW the sand, after most of the dirt is gone.' });
    if (pos.cotton != null && pos.cotton !== Math.max.apply(null, Object.keys(pos).map(function (k) { return pos[k]; }))) tips.push({ good: false, text: '↕️ Cotton belongs at the very bottom by the bottle neck, to hold everything in.' });
    ['gravel', 'sand', 'charcoal', 'cotton'].forEach(function (id) { if (pos[id] == null) tips.push({ good: false, text: '➕ Try adding ' + M[id].name.toLowerCase() + ' — ' + M[id].tip.charAt(0).toLowerCase() + M[id].tip.slice(1) }); });
    if (!present.length) tips.push({ good: false, text: 'Add some layers first!' });
    var ul = $id('flDetails');
    ul.innerHTML = '';
    tips.forEach(function (t) {
      var li = document.createElement('li');
      li.textContent = (t.good ? '✅ ' : '💡 ') + t.text;
      ul.appendChild(li);
    });
  }

  function finishPour(clarity) {
    pouring = false; poured = true; lastClarity = clarity;
    $id('flCupWater').setAttribute('fill', mix(clarity / 100));
    $id('flMeter').style.width = clarity + '%';
    var label = clarity >= 95 ? 'Sparkling clear! 🌟' : clarity >= 80 ? 'Pretty clear! 👍' : clarity >= 55 ? 'A little cloudy 🌫️' : 'Still muddy 😬';
    $id('flResultText').textContent = 'Clarity: ' + clarity + '% — ' + label;
    explain(clarity);
    $id('flDisinfect').hidden = false;
    setFeedback('flFeedback', 'It looks ' + (clarity >= 80 ? 'clear' : 'better') + '… but is it SAFE to drink? Pick the next step!', null);
    Games.best('filter', clarity);
    renderSlots();
  }

  function pour() {
    if (pouring || !layers.some(Boolean)) return;
    resetWater();
    pouring = true;
    renderSlots();
    var final = clarityFor(layers);
    var reservoir = $id('flReservoir'), cup = $id('flCupWater'), dropsG = $id('flDrops');
    if (prefersReducedMotion) { cup.setAttribute('y', 430); cup.setAttribute('height', 52); finishPour(final); return; }
    var t0 = performance.now(), DUR = 2600;
    var drops = [];
    for (var d = 0; d < 14; d++) drops.push({ x: 70 + Math.random() * 120, delay: 250 + d * 110 + Math.random() * 80, el: null });
    (function frame(now) {
      var t = now - t0;
      var fill = clamp(Math.min(1, t / 400) * (1 - Math.max(0, (t - 1500) / 1100)), 0, 1);
      reservoir.setAttribute('y', 90 - 60 * fill);
      reservoir.setAttribute('height', 60 * fill);
      drops.forEach(function (dp) {
        var dt = t - dp.delay;
        if (dt < 0) return;
        if (!dp.el) {
          dp.el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          dp.el.setAttribute('r', 5); dp.el.setAttribute('stroke', '#0b2a4a'); dp.el.setAttribute('stroke-width', '1.5');
          dropsG.appendChild(dp.el);
        }
        var y = 92 + dt * 0.3;
        var x = y > 300 ? 130 + (dp.x - 130) * Math.max(0, 1 - (y - 300) / 70) : dp.x;
        var k = clamp(Math.floor((y - SLOT_Y0) / SLOT_H) + 1, 0, SLOTS);
        dp.el.setAttribute('cx', x); dp.el.setAttribute('cy', Math.min(y, 420));
        dp.el.setAttribute('fill', mix(clarityAfter(k) / 100));
        if (y > 420) dp.el.setAttribute('opacity', 0);
      });
      var cupFill = clamp((t - 1100) / 1400, 0, 1);
      cup.setAttribute('height', 52 * cupFill); cup.setAttribute('y', 482 - 52 * cupFill);
      cup.setAttribute('fill', mix(final / 100));
      if (t < DUR) requestAnimationFrame(frame);
      else { dropsG.innerHTML = ''; finishPour(final); }
    })(t0);
  }

  function disinfect(choice) {
    if (!poured) return;
    if (choice === 'drink') {
      setFeedback('flFeedback', "🚫 Whoa — not yet! Filters catch dirt, but they don't remove all germs. Germs are too tiny to see. Disinfect first!", false);
      return;
    }
    disinfected = true;
    var how = choice === 'chlorine' ? 'A tiny bit of chlorine' : 'Boiling for 1 minute';
    setFeedback('flFeedback', '✅ ' + how + ' kills germs — filter THEN disinfect, just like a real treatment plant! (Game water only — never drink your at-home experiment water.)', true);
    $id('flDisinfect').hidden = true;
    Games.finished();
    if (lastClarity >= 95) KidsBadges.earn('filter');
    else kidsToast('🧫', 'Clarity ' + lastClarity + '%', 'Reach 95% clarity (and disinfect) for the Filter Engineer badge!');
  }

  function init() {
    var tray = $id('flTray');
    ORDER.forEach(function (id) {
      var m = M[id];
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'fl-item'; b.dataset.mat = id; b.draggable = true;
      b.innerHTML = '<span class="swatch-mini" aria-hidden="true"></span><span><span class="n"></span><small></small></span>';
      b.querySelector('.swatch-mini').style.background = m.color;
      b.querySelector('.n').textContent = m.icon + ' ' + m.name;
      b.querySelector('small').textContent = m.decoy ? 'Hmm… does it filter?' : 'Filter material';
      b.addEventListener('click', function () { selected = selected === id ? null : id; renderSlots(); });
      b.addEventListener('dragstart', function (e) { selected = id; e.dataTransfer.setData('text/plain', id); e.dataTransfer.effectAllowed = 'move'; });
      tray.appendChild(b);
    });

    $id('flBottle').innerHTML = buildSVG();
    var svg = $id('flBottle').querySelector('svg');
    svg.querySelectorAll('.fl-slot').forEach(function (g) {
      g.addEventListener('click', function () { onSlot(+g.dataset.slot); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSlot(+g.dataset.slot); } });
    });
    /* drag & drop (mouse) — pick the slot under the pointer */
    function slotAt(e) {
      var pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      var p = pt.matrixTransform(svg.getScreenCTM().inverse());
      var i = Math.floor((p.y - SLOT_Y0) / SLOT_H);
      return i >= 0 && i < SLOTS ? i : (p.y < SLOT_Y0 ? 0 : SLOTS - 1);
    }
    svg.addEventListener('dragover', function (e) {
      e.preventDefault();
      var i = slotAt(e);
      svg.querySelectorAll('.fl-slot').forEach(function (g) { g.classList.toggle('drop-hover', +g.dataset.slot === i); });
    });
    svg.addEventListener('dragleave', function () { svg.querySelectorAll('.fl-slot').forEach(function (g) { g.classList.remove('drop-hover'); }); });
    svg.addEventListener('drop', function (e) {
      e.preventDefault();
      svg.querySelectorAll('.fl-slot').forEach(function (g) { g.classList.remove('drop-hover'); });
      var id = e.dataTransfer.getData('text/plain');
      if (M[id]) place(slotAt(e), id);
    });

    $id('flPour').addEventListener('click', pour);
    $id('flEmpty').addEventListener('click', function () { if (pouring) return; layers = [null, null, null, null]; selected = null; resetWater(); renderSlots(); });
    document.querySelectorAll('#flDisinfect [data-choice]').forEach(function (b) {
      b.addEventListener('click', function () { disinfect(b.dataset.choice); });
    });
    resetWater();
    renderSlots();
  }

  Games.register('filter', { init: init, formatBest: function (v) { return v + '% clear'; } });
})();
