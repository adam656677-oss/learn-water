/* ==========================================================
   NEW GAME — Drop's Journey
   Guide Drip the water drop around the real water cycle.
   Every move asks about the process that moves water along
   that path. Collect all 8 process stamps to win.
   ========================================================== */
(function () {
  var NODES = {
    ocean:    { x: 118, y: 438, icon: '🌊', name: 'Ocean',         fact: 'The ocean holds about 97% of all the water on Earth — and it is salty!' },
    vapor:    { x: 172, y: 205, icon: '💨', name: 'Water vapor',   fact: "Water vapor is an invisible gas. You can't see it, but it's in the air all around you!" },
    cloud:    { x: 400, y: 92,  icon: '☁️', name: 'Cloud',         fact: 'One puffy cloud can weigh over a million pounds — the tiny droplets are just spread way out!' },
    mountain: { x: 662, y: 150, icon: '🏔️', name: 'Mountain snow', fact: 'Snow piles up on mountains all winter, then melts in spring to fill rivers.' },
    river:    { x: 602, y: 322, icon: '🏞️', name: 'River',         fact: 'The Mississippi River is about 2,340 miles long — a drop can ride it for 90 days!' },
    lake:     { x: 430, y: 384, icon: '🛶', name: 'Lake',          fact: 'Lakes are fed by rivers, rain, and underground springs.' },
    plant:    { x: 296, y: 222, icon: '🌳', name: 'Tree',          fact: 'A big tree can release hundreds of gallons of water into the air on a hot day!' },
    soil:     { x: 318, y: 420, icon: '🟫', name: 'Soil',          fact: 'Soil is like a sponge — some rain soaks in, and some runs off.' },
    aquifer:  { x: 560, y: 486, icon: '🪨', name: 'Aquifer',       fact: 'Water can stay in an aquifer for thousands of years. Most of Mississippi’s drinking water comes from aquifers!' }
  };
  var STAMPS = [
    { id: 'Evaporation',   icon: '☀️' }, { id: 'Condensation', icon: '☁️' }, { id: 'Precipitation', icon: '🌧️' }, { id: 'Melting', icon: '🫗' },
    { id: 'Runoff',        icon: '🏞️' }, { id: 'Infiltration', icon: '⬇️' }, { id: 'Transpiration', icon: '🍃' }, { id: 'Collection', icon: '🌊' }
  ];
  var EDGES = [
    { f: 'ocean', t: 'vapor', s: 'Evaporation', q: 'The sun heats the ocean. What happens to Drip?',
      o: ['Drip evaporates into invisible water vapor', 'Drip sinks to the bottom', 'Drip turns into salt'] },
    { f: 'lake', t: 'vapor', s: 'Evaporation', q: "It's a hot, sunny day at the lake. Where does Drip go?",
      o: ['Up into the air as vapor — evaporation!', 'Down into the mud', 'Drip freezes solid'] },
    { f: 'vapor', t: 'cloud', s: 'Condensation', q: 'Drip floats up high where the air is cold. What happens?',
      o: ['Drip condenses into a tiny cloud droplet', 'Drip gets hotter and hotter', 'Drip turns into a rock'] },
    { f: 'plant', t: 'vapor', s: 'Transpiration', q: 'Drip is inside a leaf on a warm day. How does Drip get out?',
      o: ['Through tiny holes in the leaf, as vapor', 'The tree sneezes Drip out', 'Drip stays in the leaf forever'] },
    { f: 'cloud', t: 'mountain', s: 'Precipitation', q: 'The cloud drifts over a freezing mountain top. How does Drip come down?',
      o: ['As a snowflake — precipitation!', 'As steam', 'Drip never comes down'] },
    { f: 'cloud', t: 'soil', s: 'Precipitation', q: 'Cloud droplets bump together and get too heavy. What happens?',
      o: ['Drip falls to the ground as rain', 'The cloud floats up to space', 'Drip turns into a bird'] },
    { f: 'cloud', t: 'lake', s: 'Precipitation', q: 'The heavy cloud is right over the lake…',
      o: ['Drip rains down into the lake', 'Drip evaporates again', 'Clouds never drop water'] },
    { f: 'cloud', t: 'ocean', s: 'Precipitation', q: 'A rain shower starts over the sea!',
      o: ['Drip splashes into the ocean as rain', 'Drip bounces back up to the cloud', 'Drip turns into a fish'] },
    { f: 'mountain', t: 'river', s: 'Melting', q: 'Spring sunshine warms the mountain snow. What happens to Drip?',
      o: ['Drip melts and trickles down into a river', 'Drip turns into a cloud right away', 'Nothing — snow never melts'] },
    { f: 'soil', t: 'river', s: 'Runoff', q: 'It is pouring rain and the ground is soaked. Where does extra water go?',
      o: ['It flows over the land into a river — runoff!', 'It climbs up a tree', 'It flies back to the sun'] },
    { f: 'soil', t: 'aquifer', s: 'Infiltration', q: 'Drip lands on sandy soil. What can happen next?',
      o: ['Drip soaks down deep into an aquifer', 'Drip bounces like a ball', 'Drip turns into sand'] },
    { f: 'soil', t: 'plant', s: null, q: "A tree's roots are right next to Drip. What happens?",
      o: ['The roots soak Drip up — plants drink water!', 'The tree pushes Drip away', 'Drip turns into a root'] },
    { f: 'river', t: 'lake', s: 'Collection', q: 'The river flows down into a low valley. What happens?',
      o: ['The water collects and makes a lake', 'The river flows uphill', 'The water disappears'] },
    { f: 'lake', t: 'ocean', s: 'Collection', q: 'Water always flows downhill. Where do rivers and lakes finally end up?',
      o: ['In the ocean', 'On top of a mountain', 'In outer space'] },
    { f: 'aquifer', t: 'river', s: null, q: 'Deep underground, Drip slowly moves through the aquifer. Where can Drip come out?',
      o: ['At a spring that feeds a river', 'Out of a volcano', "Nowhere — it's stuck forever"] }
  ];

  var at = 'ocean', stamps = {}, moves = 0, pending = null, animating = false, done = false;

  function edgesFrom(n) { return EDGES.filter(function (e) { return e.f === n; }); }

  function sceneSVG() {
    var s = '<svg class="dj-board" viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Water cycle map">';
    s += '<defs><linearGradient id="djSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fdcfa"/><stop offset="1" stop-color="#e6f7ff"/></linearGradient></defs>';
    s += '<rect width="800" height="320" fill="url(#djSky)"/>';
    /* sun */
    s += '<g stroke="#f5a300" stroke-width="5" stroke-linecap="round"><line x1="70" y1="12" x2="70" y2="26"/><line x1="112" y1="30" x2="102" y2="40"/><line x1="128" y1="72" x2="114" y2="72"/><line x1="28" y1="30" x2="38" y2="40"/><line x1="12" y1="72" x2="26" y2="72"/></g>';
    s += '<circle cx="70" cy="72" r="34" fill="#ffd23f" stroke="#0b2a4a" stroke-width="3"/>';
    /* mountains */
    s += '<path d="M500 312 L662 108 L800 312 Z" fill="#8e9dab" stroke="#0b2a4a" stroke-width="3" stroke-linejoin="round"/>';
    s += '<path d="M662 108 L628 152 L646 146 L660 160 L676 144 L694 152 Z" fill="#fff" stroke="#0b2a4a" stroke-width="3" stroke-linejoin="round"/>';
    /* land */
    s += '<path d="M232 318 C330 296 430 312 520 302 C620 292 720 306 800 300 L800 452 L232 452 Z" fill="#8ed36d" stroke="#0b2a4a" stroke-width="3"/>';
    /* underground + aquifer */
    s += '<rect x="232" y="452" width="568" height="68" fill="#c08b54" stroke="#0b2a4a" stroke-width="3"/>';
    s += '<rect x="360" y="468" width="400" height="36" rx="16" fill="#79c9ea" stroke="#0b2a4a" stroke-width="2.5"/>';
    s += '<g fill="#4c9fc2"><circle cx="400" cy="478" r="4"/><circle cx="440" cy="492" r="3.5"/><circle cx="500" cy="480" r="4"/><circle cx="620" cy="494" r="3.5"/><circle cx="690" cy="480" r="4"/><circle cx="730" cy="492" r="3"/></g>';
    /* ocean */
    s += '<path d="M0 336 Q60 320 120 336 T240 336 L266 520 L0 520 Z" fill="#3aa7de" stroke="#0b2a4a" stroke-width="3"/>';
    s += '<path d="M24 380 q14 -9 28 0 t28 0 M120 410 q14 -9 28 0 t28 0 M40 470 q14 -9 28 0 t28 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>';
    /* river + lake */
    s += '<path d="M640 300 C610 330 560 316 540 344 C520 372 480 372 460 380 M400 392 C340 412 300 404 250 420" fill="none" stroke="#0b2a4a" stroke-width="20" stroke-linecap="round"/>';
    s += '<path d="M640 300 C610 330 560 316 540 344 C520 372 480 372 460 380 M400 392 C340 412 300 404 250 420" fill="none" stroke="#49b5e6" stroke-width="14" stroke-linecap="round"/>';
    s += '<ellipse cx="430" cy="386" rx="74" ry="24" fill="#49b5e6" stroke="#0b2a4a" stroke-width="3"/>';
    /* tree */
    s += '<rect x="288" y="238" width="16" height="72" fill="#8b5e3c" stroke="#0b2a4a" stroke-width="3"/>';
    s += '<circle cx="296" cy="214" r="38" fill="#5fbf4a" stroke="#0b2a4a" stroke-width="3"/><circle cx="270" cy="236" r="22" fill="#5fbf4a" stroke="#0b2a4a" stroke-width="3"/><circle cx="324" cy="236" r="22" fill="#5fbf4a" stroke="#0b2a4a" stroke-width="3"/>';
    /* cloud */
    s += '<g fill="#fff" stroke="#0b2a4a" stroke-width="3"><ellipse cx="370" cy="98" rx="42" ry="26"/><ellipse cx="430" cy="94" rx="46" ry="32"/><ellipse cx="400" cy="76" rx="36" ry="28"/></g>';
    s += '<g fill="#fff"><ellipse cx="372" cy="102" rx="38" ry="20"/><ellipse cx="430" cy="98" rx="42" ry="26"/></g>';
    /* vapor squiggles */
    s += '<path d="M150 300 q-10 -20 0 -40 t0 -40 M180 300 q-10 -20 0 -40 t0 -40 M210 300 q-10 -20 0 -40 t0 -40" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="6 8" opacity=".9"/>';
    s += '<g id="djLinks"></g>';
    Object.keys(NODES).forEach(function (id) {
      var n = NODES[id];
      s += '<g class="dj-node" data-node="' + id + '" transform="translate(' + n.x + ' ' + n.y + ')">' +
        '<circle class="dj-ring" r="33" fill="none" stroke="none"/>' +
        '<circle r="25" fill="#fff" stroke="#0b2a4a" stroke-width="3"/>' +
        '<text y="9" text-anchor="middle" font-size="24">' + n.icon + '</text>' +
        '<text class="dj-label" y="' + (id === 'aquifer' ? -34 : 46) + '" text-anchor="middle">' + n.name + '</text></g>';
    });
    /* Drip */
    s += '<g id="djDrip" transform="translate(' + NODES.ocean.x + ' ' + (NODES.ocean.y - 42) + ')"><g transform="scale(1.1)">' +
      '<path d="M0 -22 C0 -22 -15 -2 -15 8 a15 15 0 0 0 30 0 C15 -2 0 -22 0 -22 Z" fill="#25bdea" stroke="#0b2a4a" stroke-width="3"/>' +
      '<circle cx="-5" cy="6" r="2.6" fill="#0b2a4a"/><circle cx="5" cy="6" r="2.6" fill="#0b2a4a"/>' +
      '<path d="M-5 13 Q0 17 5 13" stroke="#0b2a4a" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="-7" cy="-2" rx="2.5" ry="4" fill="#fff" opacity=".8"/></g></g>';
    s += '</svg>';
    return s;
  }

  function renderStamps() {
    var box = $id('djStamps');
    box.innerHTML = '';
    STAMPS.forEach(function (st) {
      var d = document.createElement('div');
      d.className = 'dj-stamp' + (stamps[st.id] ? ' got' : '');
      d.innerHTML = '<span class="s-ico" aria-hidden="true"></span><span></span>';
      d.querySelector('.s-ico').textContent = st.icon;
      d.lastChild.textContent = st.id;
      d.setAttribute('aria-label', st.id + (stamps[st.id] ? ' stamp collected' : ' stamp not collected yet'));
      box.appendChild(d);
    });
    $id('djCount').textContent = Object.keys(stamps).length + ' / ' + STAMPS.length + ' stamps';
    $id('djMoves').textContent = 'Moves: ' + moves;
  }

  function renderPanel() {
    var n = NODES[at];
    $id('djWhere').textContent = 'Drip is at the ' + n.name.toLowerCase() + ' ' + n.icon;
    $id('djFact').textContent = '💡 ' + n.fact;
    var ask = $id('djAsk'), opts = $id('djOpts');
    opts.innerHTML = '';
    if (done) { ask.textContent = 'You collected every stamp! 🎉'; return; }
    if (!pending) {
      ask.textContent = 'Where should Drip go next? Tap a glowing spot on the map or pick one:';
      edgesFrom(at).forEach(function (e) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = NODES[e.t].icon + ' Go to the ' + NODES[e.t].name.toLowerCase() + (e.s && !stamps[e.s] ? '  ✨' : '');
        b.addEventListener('click', function () { choose(e.t); });
        opts.appendChild(b);
      });
    } else {
      ask.textContent = pending.q;
      shuffle(pending.o.map(function (text, i) { return { text: text, right: i === 0 }; })).forEach(function (o) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = o.text;
        b.addEventListener('click', function () { answer(b, o.right); });
        opts.appendChild(b);
      });
      var back = document.createElement('button');
      back.type = 'button'; back.className = 'lab-btn small ghost'; back.textContent = '← Pick a different place';
      back.style.justifySelf = 'start';
      back.addEventListener('click', function () { pending = null; renderAll(); });
      opts.appendChild(back);
    }
  }

  function renderMap() {
    var targets = pending || done ? [] : edgesFrom(at).map(function (e) { return e.t; });
    document.querySelectorAll('#djMap .dj-node').forEach(function (g) {
      var id = g.dataset.node, can = targets.indexOf(id) !== -1;
      g.classList.toggle('can-go', can);
      if (can) { g.setAttribute('tabindex', '0'); g.setAttribute('role', 'button'); g.setAttribute('aria-label', 'Move Drip to the ' + NODES[id].name); }
      else { g.removeAttribute('tabindex'); g.removeAttribute('role'); g.removeAttribute('aria-label'); }
    });
  }

  function renderAll() { renderMap(); renderPanel(); renderStamps(); }

  function choose(to) {
    if (animating || done) return;
    var e = edgesFrom(at).filter(function (x) { return x.t === to; })[0];
    if (!e) return;
    pending = e;
    setFeedback('djFeedback', '');
    renderAll();
  }

  function answer(btn, right) {
    if (animating) return;
    moves++;
    if (!right) {
      btn.classList.add('wrong');
      btn.disabled = true;
      setFeedback('djFeedback', 'Not quite — think about what the sun, cold air, or gravity would do. Try again!', false);
      renderStamps();
      return;
    }
    btn.classList.add('right');
    var e = pending;
    pending = null;
    fly(at, e.t, function () {
      at = e.t;
      var msg = '✅ Nice! Drip made it to the ' + NODES[e.t].name.toLowerCase() + '.';
      if (e.s && !stamps[e.s]) { stamps[e.s] = true; msg = '🏅 ' + e.s + ' stamp collected! ' + msg; }
      else if (e.s) msg = '(' + e.s + ') ' + msg;
      setFeedback('djFeedback', msg, true);
      if (Object.keys(stamps).length === STAMPS.length) win();
      renderAll();
    });
  }

  function fly(from, to, cb) {
    var a = NODES[from], b = NODES[to], drip = $id('djDrip');
    var ax = a.x, ay = a.y - 42, bx = b.x, by = b.y - 42;
    var cx = (ax + bx) / 2, cy = Math.min(ay, by) - 70;
    if (prefersReducedMotion) { drip.setAttribute('transform', 'translate(' + bx + ' ' + by + ')'); cb(); return; }
    animating = true;
    var t0 = performance.now(), D = 950;
    (function step(now) {
      var t = Math.min(1, (now - t0) / D), u = 1 - t;
      var x = u * u * ax + 2 * u * t * cx + t * t * bx;
      var y = u * u * ay + 2 * u * t * cy + t * t * by;
      drip.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')');
      if (t < 1) requestAnimationFrame(step);
      else { animating = false; cb(); }
    })(t0);
  }

  function win() {
    done = true;
    Games.best('journey', moves, true);
    Games.finished();
    KidsBadges.earn('traveler');
    setFeedback('djFeedback', '🎉 AMAZING! Drip traveled the whole water cycle in ' + moves + ' moves. You collected all 8 stamps!', true);
    $id('djRestart').textContent = '🔁 New journey';
  }

  function restart() {
    at = 'ocean'; stamps = {}; moves = 0; pending = null; done = false;
    var drip = $id('djDrip');
    drip.setAttribute('transform', 'translate(' + NODES.ocean.x + ' ' + (NODES.ocean.y - 42) + ')');
    setFeedback('djFeedback', '');
    $id('djRestart').textContent = '🔄 Start over';
    renderAll();
  }

  function init() {
    $id('djMap').innerHTML = sceneSVG();
    document.querySelectorAll('#djMap .dj-node').forEach(function (g) {
      g.addEventListener('click', function () { if (g.classList.contains('can-go')) choose(g.dataset.node); });
      g.addEventListener('keydown', function (e) {
        if ((e.key === 'Enter' || e.key === ' ') && g.classList.contains('can-go')) { e.preventDefault(); choose(g.dataset.node); }
      });
    });
    $id('djRestart').addEventListener('click', restart);
    restart();
  }

  Games.register('journey', { init: init, formatBest: function (v) { return v + ' moves'; } });
})();
