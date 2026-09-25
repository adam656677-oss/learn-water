/* ==========================================================
   Classic Game Lab games (improved)
   Droplet Catcher · Pipe Connect · Leak Detective ·
   Treatment Step Sort · Water Cycle Race
   ========================================================== */

/* ---------------- DROPLET CATCHER ---------------- */
(function () {
  var W = 400, H = 300, canvas, ctx, state = null, keys = { left: false, right: false }, raf = 0;

  function sizeCanvas() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function hud() {
    if (!state) return;
    $id('catchScore').textContent = 'Score: ' + state.score;
    $id('catchLevel').textContent = 'Level: ' + state.level;
    $id('catchLives').textContent = 'Lives: ' + '❤️'.repeat(state.lives) + '🤍'.repeat(3 - state.lives);
  }

  function drawDrop(x, y, s, color) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.beginPath(); ctx.moveTo(0, -12);
    ctx.bezierCurveTo(0, -12, -9, 0, -9, 5); ctx.arc(0, 5, 9, Math.PI, 0, true);
    ctx.bezierCurveTo(9, 0, 0, -12, 0, -12);
    ctx.fillStyle = color; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = '#0b2a4a'; ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.beginPath(); ctx.ellipse(-3.5, 2, 2, 3.5, -0.4, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,255,255,.85)';
    [[60, 22, 34], [200, 14, 42], [330, 24, 36]].forEach(function (c) {
      ctx.beginPath(); ctx.ellipse(c[0], c[1], c[2], 14, 0, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = '#5fbf4a'; ctx.fillRect(0, H - 10, W, 10);
    if (!state) return;
    state.drops.forEach(function (d) {
      if (d.kind === 'drop') drawDrop(d.x, d.y, 1, '#25bdea');
      else if (d.kind === 'gold') drawDrop(d.x, d.y, 1.15, '#ffbe2e');
      else { ctx.font = '22px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(d.icon, d.x, d.y); }
    });
    var bx = state.bx, bw = state.bw, by = H - 44;
    ctx.fillStyle = '#9fe3f7';
    var fill = Math.min(1, state.caught % 10 / 10);
    ctx.beginPath(); ctx.moveTo(bx + 4, by + 30 - 26 * fill); ctx.lineTo(bx + bw - 4, by + 30 - 26 * fill); ctx.lineTo(bx + bw - 8, by + 30); ctx.lineTo(bx + 8, by + 30); ctx.closePath(); ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#0b2a4a';
    ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + bw, by); ctx.lineTo(bx + bw - 8, by + 32); ctx.lineTo(bx + 8, by + 32); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.arc(bx + bw / 2, by, bw / 2 - 2, Math.PI, 0); ctx.stroke();
  }

  function loop(now) {
    if (!state || !state.running) return;
    var dt = Math.min((now - state.last) / 16.67, 3); state.last = now;
    var sp = 5.4 * dt;
    if (keys.left) state.bx -= sp;
    if (keys.right) state.bx += sp;
    state.bx = clamp(state.bx, 0, W - state.bw);
    state.spawn += dt;
    if (state.spawn >= state.every) {
      state.spawn = 0;
      var r = Math.random(), bad = Math.min(0.16 + state.level * 0.05, 0.42);
      var kind = r < bad ? 'bad' : r < bad + 0.05 ? 'gold' : 'drop';
      state.drops.push({ x: 20 + Math.random() * (W - 40), y: -16, vy: 1.5 + state.level * 0.3 + Math.random() * 0.8, kind: kind,
        icon: ['🗑️', '🛢️', '🥤'][Math.floor(Math.random() * 3)] });
    }
    var by = H - 44;
    for (var i = state.drops.length - 1; i >= 0; i--) {
      var d = state.drops[i];
      d.y += d.vy * dt;
      if (d.y + 10 >= by && d.y <= by + 30 && d.x > state.bx - 6 && d.x < state.bx + state.bw + 6) {
        if (d.kind === 'bad') {
          state.lives--; flash('#ff7a6b');
          if (state.lives <= 0) { state.drops.splice(i, 1); hud(); return end(); }
        } else {
          state.score += d.kind === 'gold' ? 30 : 10 + (state.level - 1) * 2;
          state.caught++;
          if (state.caught % 10 === 0) { state.level++; state.every = Math.max(20, state.every - 6); }
        }
        state.drops.splice(i, 1); hud(); continue;
      }
      if (d.y > H + 20) { if (d.kind !== 'bad') state.score = Math.max(0, state.score - 2); state.drops.splice(i, 1); hud(); }
    }
    draw();
    raf = requestAnimationFrame(loop);
  }

  function flash(c) {
    var s = $id('catchStage');
    s.style.boxShadow = 'inset 0 0 0 7px ' + c + ', 5px 5px 0 #0b2a4a';
    setTimeout(function () { s.style.boxShadow = ''; }, 180);
  }

  function start() {
    cancelAnimationFrame(raf);
    $id('catchOverlay').classList.add('hidden');
    state = { running: true, bx: 170, bw: 62, drops: [], score: 0, lives: 3, level: 1, caught: 0, spawn: 0, every: 60, last: performance.now() };
    hud();
    raf = requestAnimationFrame(loop);
    canvas.focus({ preventScroll: true });
  }

  function end() {
    state.running = false;
    cancelAnimationFrame(raf);
    var best = Games.getBest('catcher') || 0;
    var isBest = Games.best('catcher', state.score);
    $id('catchBest').textContent = 'Best: ' + Math.max(best, state.score);
    $id('catchOverlayTitle').textContent = '🌊 Game Over!';
    $id('catchOverlayText').textContent = 'You scored ' + state.score + ' points and reached level ' + state.level + '. ' +
      (isBest && state.score > 0 ? 'NEW BEST SCORE! 🎉' : 'Try again and beat your best!');
    $id('catchStart').textContent = '🔁 Play Again';
    $id('catchOverlay').classList.remove('hidden');
    Games.finished();
    draw();
  }

  function pause() {
    if (state && state.running) {
      state.running = false;
      cancelAnimationFrame(raf);
      $id('catchOverlayTitle').textContent = '⏸️ Paused';
      $id('catchOverlayText').textContent = 'Press play to keep catching drops!';
      $id('catchStart').textContent = '▶️ Resume';
      $id('catchOverlay').classList.remove('hidden');
      state.paused = true;
    }
  }
  function resumeOrStart() {
    if (state && state.paused && state.lives > 0) {
      state.paused = false; state.running = true; state.last = performance.now();
      $id('catchOverlay').classList.add('hidden');
      raf = requestAnimationFrame(loop);
    } else start();
  }

  function init() {
    canvas = $id('catchCanvas'); ctx = canvas.getContext('2d');
    sizeCanvas(); draw();
    $id('catchBest').textContent = 'Best: ' + (Games.getBest('catcher') || 0);
    $id('catchStart').addEventListener('click', resumeOrStart);
    document.addEventListener('keydown', function (e) {
      if (!state || !state.running) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { keys.left = true; e.preventDefault(); }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { keys.right = true; e.preventDefault(); }
    });
    document.addEventListener('keyup', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
    });
    function hold(btn, k) {
      btn.addEventListener('pointerdown', function (e) { e.preventDefault(); keys[k] = true; });
      ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) { btn.addEventListener(ev, function () { keys[k] = false; }); });
    }
    hold($id('catchLeft'), 'left'); hold($id('catchRight'), 'right');
    var stage = $id('catchStage');
    function dragTo(x) {
      if (!state || !state.running) return;
      var r = canvas.getBoundingClientRect();
      state.bx = clamp((x - r.left) / r.width * W - state.bw / 2, 0, W - state.bw);
    }
    stage.addEventListener('pointerdown', function (e) { dragTo(e.clientX); });
    stage.addEventListener('pointermove', function (e) { if (e.buttons > 0 || e.pointerType === 'touch') dragTo(e.clientX); });
  }

  Games.register('catcher', { init: init, hide: pause, formatBest: function (v) { return v + ' pts'; } });
})();

/* ---------------- PIPE CONNECT ---------------- */
(function () {
  var cols = 4, rows = 4, entry = 1, exitRow = 1, cells = [], moves = 0, level = 1, solved = false;
  var SOLVED_KEY = 'lw_pipes_solved';

  function sizeFor(l) { return l <= 2 ? 4 : l <= 5 ? 5 : 6; }
  function conns(c) { return c.base.map(function (d) { return (d + c.rot) % 4; }); }
  function at(c, r) { return c < 0 || r < 0 || c >= cols || r >= rows ? null : cells[r * cols + c]; }

  function build() {
    cols = rows = sizeFor(level);
    entry = Math.floor(Math.random() * rows);
    exitRow = Math.floor(Math.random() * rows);
    moves = 0; solved = false;
    var path = {};
    function add(c, r, dirs) { var k = c + ',' + r; path[k] = path[k] || []; dirs.forEach(function (d) { if (path[k].indexOf(d) < 0) path[k].push(d); }); }
    var rowsAt = [];
    for (var c = 0; c < cols; c++) rowsAt[c] = c === cols - 1 ? exitRow : Math.floor(Math.random() * rows);
    var r0 = entry;
    for (var col = 0; col < cols; col++) {
      var ex = rowsAt[col];
      if (r0 === ex) add(col, r0, [3, 1]);
      else {
        var step = ex > r0 ? 1 : -1;
        add(col, r0, [3, step === 1 ? 2 : 0]);
        for (var r = r0 + step; r !== ex; r += step) add(col, r, [0, 2]);
        add(col, ex, [step === 1 ? 0 : 2, 1]);
      }
      r0 = ex;
    }
    cells = [];
    var fillers = [[0, 2], [1, 3], [0, 1], [1, 2], [2, 3], [0, 3]];
    for (var rr = 0; rr < rows; rr++) for (var cc = 0; cc < cols; cc++) {
      var k = cc + ',' + rr;
      cells.push({ c: cc, r: rr, base: path[k] ? path[k].slice().sort() : fillers[Math.floor(Math.random() * fillers.length)], rot: Math.floor(Math.random() * 4) });
    }
    if (flow().done) cells[0].rot = (cells[0].rot + 1) % 4;
    render();
  }

  function flow() {
    var start = at(0, entry), seen = {}, q = [], done = false;
    if (start && conns(start).indexOf(3) !== -1) { q.push(start); seen[start.c + ',' + start.r] = 1; }
    while (q.length) {
      var cell = q.shift(), cs = conns(cell);
      if (cell.c === cols - 1 && cell.r === exitRow && cs.indexOf(1) !== -1) done = true;
      cs.forEach(function (d) {
        var nb = at(cell.c + (d === 1 ? 1 : d === 3 ? -1 : 0), cell.r + (d === 2 ? 1 : d === 0 ? -1 : 0));
        if (!nb || seen[nb.c + ',' + nb.r] || conns(nb).indexOf((d + 2) % 4) === -1) return;
        seen[nb.c + ',' + nb.r] = 1; q.push(nb);
      });
    }
    return { seen: seen, done: done };
  }

  function render() {
    var grid = $id('pipeGrid'), f = flow();
    grid.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
    grid.innerHTML = '';
    cells.forEach(function (cell) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pipe-cell' + (f.seen[cell.c + ',' + cell.r] ? ' flowing' : '');
      var p = '';
      conns(cell).forEach(function (d) { p += '<path class="pipe-path" d="' + ['M50 50 L50 0', 'M50 50 L100 50', 'M50 50 L50 100', 'M50 50 L0 50'][d] + '"/>'; });
      b.innerHTML = '<svg viewBox="0 0 100 100" aria-hidden="true">' + p + '<circle class="pipe-hub" cx="50" cy="50" r="10"/></svg>';
      b.setAttribute('aria-label', 'Pipe row ' + (cell.r + 1) + ' column ' + (cell.c + 1) + '. Press to rotate.');
      b.addEventListener('click', function () { rotate(cell); });
      grid.appendChild(b);
    });
    [['pipeLeft', entry, '🗼', 'Water tower'], ['pipeRight', exitRow, '🏠', 'House']].forEach(function (s) {
      var side = $id(s[0]);
      side.style.gridTemplateRows = 'repeat(' + rows + ', 1fr)';
      side.innerHTML = '';
      for (var r = 0; r < rows; r++) {
        var d = document.createElement('div');
        d.className = 'pipe-end';
        if (r === s[1]) { d.textContent = s[2]; d.setAttribute('aria-label', s[3]); }
        side.appendChild(d);
      }
    });
    $id('pipeMoves').textContent = 'Turns: ' + moves;
    $id('pipeLevelLabel').textContent = 'Puzzle ' + level + ' · ' + cols + '×' + rows;
    $id('pipeStatus').textContent = solved ? '💧 Connected!' : 'Not connected yet';
  }

  function rotate(cell) {
    if (solved) return;
    cell.rot = (cell.rot + 1) % 4; moves++;
    var idx = cells.indexOf(cell);
    render();
    var btns = $id('pipeGrid').querySelectorAll('.pipe-cell');
    if (btns[idx]) btns[idx].focus({ preventScroll: true });
    if (flow().done) {
      solved = true;
      render();
      var total = (LW.store.get(SOLVED_KEY, 0) || 0) + 1;
      LW.store.set(SOLVED_KEY, total);
      setFeedback('pipeFeedback', '🎉 Water is flowing to the house! Solved in ' + moves + ' turns.', true);
      Games.best('pipes', level);
      Games.finished();
      if (total >= 3) KidsBadges.earn('pipes');
      $id('pipeNext').hidden = false;
      $id('pipeNext').focus({ preventScroll: true });
    }
  }

  function init() {
    $id('pipeNext').addEventListener('click', function () { level++; $id('pipeNext').hidden = true; setFeedback('pipeFeedback', ''); build(); });
    $id('pipeNew').addEventListener('click', function () { $id('pipeNext').hidden = true; setFeedback('pipeFeedback', ''); build(); });
    build();
  }

  Games.register('pipes', { init: init, formatBest: function (v) { return 'puzzle ' + v; } });
})();

/* ---------------- LEAK DETECTIVE ---------------- */
(function () {
  var ICONS = ['🚿', '🚰', '🛁', '🚽', '🧺', '🪣', '🧼', '🫗', '🪠', '🧽', '🌱', '🏡'];
  var S = null, run = 0, tick = null;

  function house() {
    var h = $id('leakHouse');
    h.innerHTML = '';
    ICONS.forEach(function (ic, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'leak-spot'; b.dataset.idx = i; b.textContent = ic;
      b.setAttribute('aria-label', 'Spot ' + (i + 1));
      b.addEventListener('click', function () { fix(b); });
      h.appendChild(b);
    });
  }
  function hud() {
    if (!S) return;
    $id('leakTime').textContent = 'Time: ' + Math.max(0, S.time) + 's';
    $id('leakSaved').textContent = 'Saved: ' + S.saved + ' gal';
    $id('leakWasted').textContent = 'Wasted: ' + S.wasted + ' gal';
  }
  function stop() {
    if (tick) { clearInterval(tick); tick = null; }
    if (S) { S.running = false; Object.keys(S.active).forEach(function (k) { clearTimeout(S.active[k]); }); }
    document.querySelectorAll('.leak-spot').forEach(function (s) { s.classList.remove('leaking'); });
  }
  function start() {
    stop(); run++; var me = run;
    house();
    S = { running: true, time: 45, saved: 0, wasted: 0, active: {}, every: 900 };
    $id('leakStartBtn').textContent = '🔁 Restart';
    setFeedback('leakFeedback', 'Go! Tap every leak you see!', true);
    hud();
    tick = setInterval(function () {
      if (!S || run !== me) return;
      S.time--;
      if (S.time === 30) S.every = 700;
      if (S.time === 15) S.every = 520;
      if (S.time <= 0) return end();
      hud();
    }, 1000);
    spawn(me);
  }
  function spawn(me) {
    if (!S || !S.running || run !== me) return;
    var free = Array.prototype.filter.call(document.querySelectorAll('.leak-spot'), function (s) { return !s.classList.contains('leaking'); });
    if (free.length) {
      var p = free[Math.floor(Math.random() * free.length)];
      p.classList.remove('fixed'); p.classList.add('leaking');
      p.setAttribute('aria-label', 'LEAK! Tap to fix');
      S.active[p.dataset.idx] = setTimeout(function () {
        if (!S || run !== me || !p.classList.contains('leaking')) return;
        p.classList.remove('leaking'); p.setAttribute('aria-label', 'Spot');
        S.wasted += 15; hud();
        setFeedback('leakFeedback', '💦 Missed one! 15 gallons wasted.', false);
      }, 1900);
    }
    setTimeout(function () { spawn(me); }, S.every);
  }
  function fix(el) {
    if (!S || !S.running || !el.classList.contains('leaking')) return;
    el.classList.remove('leaking'); el.classList.add('fixed'); el.setAttribute('aria-label', 'Fixed');
    clearTimeout(S.active[el.dataset.idx]);
    S.saved += 25; hud();
    setFeedback('leakFeedback', '🔧 Fixed! +25 gallons saved.', true);
  }
  function end() {
    stop();
    hud();
    Games.best('leaks', S.saved);
    $id('leakBest').textContent = 'Best: ' + (Games.getBest('leaks') || 0) + ' gal';
    var good = S.saved > S.wasted;
    setFeedback('leakFeedback', '⏰ Time! You saved ' + S.saved + ' gallons and wasted ' + S.wasted + '. ' + (good ? 'Great detective work!' : 'Keep practicing — those leaks are sneaky!'), good);
    $id('leakStartBtn').textContent = '▶️ Play Again';
    Games.finished();
    if (S.saved >= 300) KidsBadges.earn('leak');
  }
  function init() {
    house();
    $id('leakBest').textContent = 'Best: ' + (Games.getBest('leaks') || 0) + ' gal';
    $id('leakStartBtn').addEventListener('click', start);
  }
  function hide() {
    if (S && S.running) { stop(); setFeedback('leakFeedback', 'Round stopped — press Start to hunt again!', null); $id('leakStartBtn').textContent = '▶️ Start Hunting'; }
  }
  Games.register('leaks', { init: init, hide: hide, formatBest: function (v) { return v + ' gal saved'; } });
})();

/* ---------------- TREATMENT STEP SORT ---------------- */
(function () {
  var ITEMS = [
    { e: '🍃', t: 'Leaves and sticks floating into the intake', a: 'screen', why: 'Big debris gets caught by screens right at the start.' },
    { e: '🪵', t: 'A branch drifting toward the pump', a: 'screen', why: 'Screening removes large objects before they damage pumps.' },
    { e: '🥤', t: 'A plastic cup that washed into the river', a: 'screen', why: 'Trash is caught by the bar screens at the intake.' },
    { e: '🟤', t: 'Tiny dirt bits too small to sink by themselves', a: 'coag', why: 'Coagulant makes tiny particles stick together into floc.' },
    { e: '🌫️', t: 'Cloudy water that needs clumping powder', a: 'coag', why: 'Alum is mixed in fast so dirt clumps into floc.' },
    { e: '🪨', t: 'Heavy clumps of floc drifting in the tank', a: 'settle', why: 'Heavy floc sinks to the bottom in the settling basin.' },
    { e: '⚫', t: 'Mud that sank to the bottom of the tank', a: 'settle', why: 'That is exactly what settling basins collect.' },
    { e: '✨', t: 'Very fine cloudiness left after settling', a: 'filter', why: 'Sand and gravel filters polish out the tiny leftovers.' },
    { e: '🌾', t: 'Bits of algae that slipped past the settling tank', a: 'filter', why: 'Filters trap fine particles like algae.' },
    { e: '🦠', t: 'Bacteria that could make people sick', a: 'disinfect', why: 'Chlorine or UV light kills bacteria and viruses.' },
    { e: '🧫', t: 'Germs still in water that looks perfectly clear', a: 'disinfect', why: 'Clear water can still carry germs — disinfection is the final safety step.' },
    { e: '🚰', t: 'Clean water about to travel through miles of pipes', a: 'disinfect', why: 'A little leftover chlorine keeps protecting water in the pipes.' }
  ];
  var S = null;

  function show() {
    setFeedback('sortFeedback', '');
    S.locked = false;
    if (S.i >= S.order.length) {
      $id('sortEmoji').textContent = S.correct === S.order.length ? '🏆' : '✅';
      $id('sortLabel').textContent = 'Shift complete! ' + S.correct + ' out of ' + S.order.length + ' right.' + (S.correct === S.order.length ? ' A perfect shift!' : '');
      $id('sortRound').textContent = 'Finished!';
      Games.best('sorter', S.correct);
      Games.finished();
      return;
    }
    var it = S.order[S.i];
    $id('sortEmoji').textContent = it.e;
    $id('sortLabel').textContent = it.t;
    $id('sortRound').textContent = 'Task ' + (S.i + 1) + ' / ' + S.order.length;
    $id('sortScore').textContent = 'Correct: ' + S.correct;
    $id('sortStreak').textContent = 'Streak: ' + S.streak;
  }
  function answer(choice) {
    if (!S || S.locked || S.i >= S.order.length) return;
    S.locked = true;
    var it = S.order[S.i];
    if (choice === it.a) { S.correct++; S.streak++; KidsBadges.streak(S.streak); setFeedback('sortFeedback', '✅ Correct! ' + it.why, true); }
    else { S.streak = 0; setFeedback('sortFeedback', '❌ Not quite. ' + it.why, false); }
    $id('sortScore').textContent = 'Correct: ' + S.correct;
    $id('sortStreak').textContent = 'Streak: ' + S.streak;
    S.i++;
    setTimeout(show, 1700);
  }
  function start() { S = { order: shuffle(ITEMS).slice(0, 10), i: 0, correct: 0, streak: 0, locked: false }; show(); }
  function init() {
    document.querySelectorAll('#sortButtons [data-step]').forEach(function (b) { b.addEventListener('click', function () { answer(b.dataset.step); }); });
    $id('sortNew').addEventListener('click', start);
    start();
  }
  Games.register('sorter', { init: init, formatBest: function (v) { return v + '/10'; } });
})();

/* ---------------- WATER CYCLE RACE ---------------- */
(function () {
  var STEPS = [
    { e: '☀️', n: 'Evaporation', d: 'Sun warms the ocean' },
    { e: '☁️', n: 'Condensation', d: 'Vapor cools into a cloud' },
    { e: '🌧️', n: 'Precipitation', d: 'Rain falls on a hill' },
    { e: '🏞️', n: 'Runoff', d: 'Water flows into a river' },
    { e: '🌊', n: 'Collection', d: 'The river reaches the ocean' }
  ];
  var S = null;

  function start() {
    if (S && S.timer) clearInterval(S.timer);
    S = { placed: 0, t0: null, timer: null, done: false };
    $id('cyclePool').innerHTML = ''; $id('cycleSlots').innerHTML = '';
    setFeedback('cycleFeedback', '');
    $id('cycleProgress').textContent = 'Placed: 0 / ' + STEPS.length;
    $id('cycleTimer').textContent = 'Time: 0.0s';
    shuffle(STEPS).forEach(function (st) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'seq-tile';
      b.innerHTML = '<span aria-hidden="true"></span><span></span>';
      b.firstChild.textContent = st.e;
      b.lastChild.textContent = st.d;
      b.addEventListener('click', function () { place(b, st); });
      $id('cyclePool').appendChild(b);
    });
  }
  function place(tile, st) {
    if (!S || S.done || tile.parentElement.id === 'cycleSlots') return;
    if (S.t0 === null) {
      S.t0 = performance.now();
      S.timer = setInterval(function () { $id('cycleTimer').textContent = 'Time: ' + ((performance.now() - S.t0) / 1000).toFixed(1) + 's'; }, 100);
    }
    var want = STEPS[S.placed];
    if (st.n === want.n) {
      tile.classList.add('correct');
      tile.lastChild.textContent = st.n + ': ' + st.d.toLowerCase();
      $id('cycleSlots').appendChild(tile);
      S.placed++;
      $id('cycleProgress').textContent = 'Placed: ' + S.placed + ' / ' + STEPS.length;
      setFeedback('cycleFeedback', '✅ ' + st.n + '!', true);
      if (S.placed === STEPS.length) {
        S.done = true; clearInterval(S.timer);
        var secs = (performance.now() - S.t0) / 1000;
        var better = Games.best('cycle', +secs.toFixed(1), true);
        $id('cycleBest').textContent = 'Best: ' + Games.getBest('cycle') + 's';
        setFeedback('cycleFeedback', '🏆 Drip made it back to the ocean in ' + secs.toFixed(1) + ' seconds!' + (better ? ' New best time!' : '') + ' Then the sun warms it again… the cycle never ends!', true);
        Games.finished();
      }
    } else {
      tile.classList.add('wrong');
      setFeedback('cycleFeedback', '❌ Not yet — what happens to the water next? Step ' + (S.placed + 1) + ' of ' + STEPS.length + '.', false);
      setTimeout(function () { tile.classList.remove('wrong'); }, 450);
    }
  }
  function init() {
    var b = Games.getBest('cycle');
    $id('cycleBest').textContent = 'Best: ' + (b == null ? '—' : b + 's');
    $id('cycleNew').addEventListener('click', start);
    start();
  }
  Games.register('cycle', { init: init, formatBest: function (v) { return v + 's'; } });
})();
