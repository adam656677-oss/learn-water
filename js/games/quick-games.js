/* ==========================================================
   Quick games: Word Scramble · True or False · Memory Match
   (moved here from the Kids HQ page and improved)
   ========================================================== */

/* ---------------- WORD SCRAMBLE ---------------- */
(function () {
  var WORDS = [
    { w: 'EVAPORATION', h: 'Water turning into vapor from heat' },
    { w: 'CONDENSATION', h: 'Water vapor becoming cloud droplets' },
    { w: 'PRECIPITATION', h: 'Rain, snow, sleet, or hail falling' },
    { w: 'AQUIFER', h: 'Underground layer that holds water' },
    { w: 'TURBIDITY', h: 'How cloudy the water looks' },
    { w: 'CHLORINE', h: 'Chemical that kills germs in water' },
    { w: 'FILTRATION', h: 'Straining out particles through sand' },
    { w: 'WATERSHED', h: 'Land that drains into the same river' },
    { w: 'GROUNDWATER', h: 'Water stored underground' },
    { w: 'RESERVOIR', h: 'A big lake that stores a water supply' },
    { w: 'GLACIER', h: 'A giant, slow river of ice' },
    { w: 'HYDRANT', h: 'Firefighters hook their hoses to it' },
    { w: 'FLOC', h: 'Clumps of dirt made by coagulant' },
    { w: 'WELL', h: 'A deep hole drilled to reach groundwater' },
    { w: 'RUNOFF', h: 'Rain flowing over land into rivers' },
    { w: 'MOLECULE', h: 'The tiny particle H₂O is made of' }
  ];
  var cur = null, revealed = 0, solved = 0, streak = 0, bag = [];

  function scramble(word) {
    var s = word;
    for (var i = 0; i < 10 && s === word; i++) s = shuffle(word.split('')).join('');
    return s;
  }
  function next() {
    if (!bag.length) bag = shuffle(WORDS);
    cur = bag.pop(); revealed = 0;
    $id('scWord').textContent = scramble(cur.w);
    $id('scHint').textContent = 'Hint: ' + cur.h + ' (' + cur.w.length + ' letters)';
    $id('scInput').value = '';
    setFeedback('scFeedback', '');
  }
  function check() {
    var a = $id('scInput').value.trim().toUpperCase().replace(/[^A-Z]/g, '');
    if (!a) return;
    if (a === cur.w) {
      solved++; streak++;
      KidsBadges.streak(streak);
      setFeedback('scFeedback', '🎉 Correct — ' + cur.w + '!' + (solved === 5 ? ' Five words solved — word wizard!' : ''), true);
      $id('scSolved').textContent = 'Solved: ' + solved;
      if (solved === 5) Games.finished();
      Games.best('scramble', solved);
      setTimeout(next, 1400);
    } else {
      streak = 0;
      setFeedback('scFeedback', 'Not quite — keep trying! Tip: tap Hint to reveal a letter.', false);
    }
  }
  function hint() {
    if (!cur) return;
    revealed = Math.min(cur.w.length, revealed + 1);
    streak = 0;
    $id('scInput').value = cur.w.slice(0, revealed);
    $id('scInput').focus();
  }
  function init() {
    $id('scCheck').addEventListener('click', check);
    $id('scHintBtn').addEventListener('click', hint);
    $id('scSkip').addEventListener('click', function () { streak = 0; next(); });
    $id('scInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
    next();
  }
  Games.register('scramble', { init: init, formatBest: function (v) { return v + ' words'; } });
})();

/* ---------------- TRUE OR FALSE ---------------- */
(function () {
  var Q = [
    ["Water covers about 71% of Earth's surface.", true],
    ['Ice sinks in water because it is heavier.', false],
    ['The water cycle has no beginning and no end.', true],
    ['People can survive longer without food than without water.', true],
    ['Chlorine is added to drinking water to make it taste better.', false],
    ['Aquifers are underground layers that hold water.', true],
    ["About 97% of Earth's water is fresh water.", false],
    ['Transpiration is when plants release water vapor from their leaves.', true],
    ['At sea level, water boils at 212°F (100°C).', true],
    ['Surface tension lets some insects walk on water.', true],
    ["Most of the world's fresh water is frozen in glaciers and ice caps.", true],
    ['A water molecule has two oxygen atoms and one hydrogen atom.', false],
    ['Groundwater never moves.', false],
    ['Drinking salt water will quench your thirst.', false],
    ['Storm drains in the street usually lead straight to creeks and rivers.', true],
    ['If water looks clear, it is always safe to drink.', false],
    ['A dripping faucet can waste thousands of gallons of water in a year.', true],
    ['Clouds are made of tiny drops of water or bits of ice.', true],
    ['Water towers use gravity to push water through the pipes.', true],
    ['Frogs can soak up water through their skin.', true],
    ['Camels store water in their humps.', false],
    ["Most of Mississippi's drinking water comes from groundwater.", true],
    ['Raindrops are shaped like teardrops.', false],
    ['Water gets bigger (expands) when it freezes.', true]
  ];
  var S = null;
  function start() {
    S = { list: shuffle(Q).slice(0, 10), i: 0, score: 0, streak: 0, locked: false };
    $id('tfTrue').disabled = false; $id('tfFalse').disabled = false;
    $id('tfStart').textContent = '🔁 New round';
    show();
  }
  function show() {
    S.locked = false;
    $id('tfQ').textContent = S.list[S.i][0];
    $id('tfCount').textContent = 'Question ' + (S.i + 1) + ' / ' + S.list.length;
    $id('tfStreak').textContent = '🔥 Streak: ' + S.streak;
    setFeedback('tfFeedback', '');
  }
  function answer(v) {
    if (!S || S.locked) return;
    S.locked = true;
    var q = S.list[S.i];
    if (v === q[1]) { S.score++; S.streak++; KidsBadges.streak(S.streak); setFeedback('tfFeedback', '✅ Correct!', true); }
    else { S.streak = 0; setFeedback('tfFeedback', '❌ Nope — it’s ' + (q[1] ? 'TRUE' : 'FALSE') + '!', false); }
    $id('tfStreak').textContent = '🔥 Streak: ' + S.streak;
    S.i++;
    if (S.i >= S.list.length) {
      setTimeout(function () {
        $id('tfQ').textContent = 'Round done! You got ' + S.score + ' / ' + S.list.length + (S.score === S.list.length ? ' — PERFECT! 🏆' : ' 🎉');
        $id('tfCount').textContent = 'Finished';
        $id('tfTrue').disabled = true; $id('tfFalse').disabled = true;
        Games.best('truefalse', S.score);
        Games.finished();
      }, 900);
    } else setTimeout(show, 1000);
  }
  function init() {
    $id('tfStart').addEventListener('click', start);
    $id('tfTrue').addEventListener('click', function () { answer(true); });
    $id('tfFalse').addEventListener('click', function () { answer(false); });
  }
  Games.register('truefalse', { init: init, formatBest: function (v) { return v + '/10'; } });
})();

/* ---------------- MEMORY MATCH ---------------- */
(function () {
  var PAIRS = [
    ['💧 Water', 'H₂O'], ['☀️ Evaporation', 'Liquid → vapor'], ['☁️ Cloud', 'Condensation'], ['🌧️ Rain', 'Precipitation'],
    ['🏞️ Lake', 'Collection'], ['🌫️ Turbidity', 'Cloudiness'], ['🧪 Chlorine', 'Kills germs'], ['🌿 Leaves', 'Transpiration']
  ];
  var open = [], matched = 0, flips = 0, locked = false;
  function start() {
    open = []; matched = 0; flips = 0; locked = false;
    var board = $id('memBoard');
    board.innerHTML = '';
    var cards = [];
    PAIRS.forEach(function (p, i) { cards.push({ t: p[0], id: i }, { t: p[1], id: i }); });
    shuffle(cards).forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'memory-card'; b.dataset.pair = c.id;
      b.setAttribute('aria-label', 'Hidden card');
      b.innerHTML = '<span class="memory-card-inner"><span class="memory-card-front" aria-hidden="true">💦</span><span class="memory-card-back"></span></span>';
      b.querySelector('.memory-card-back').textContent = c.t;
      b.addEventListener('click', function () { flip(b, c.t); });
      board.appendChild(b);
    });
    status();
  }
  function status(msg) { $id('memStatus').textContent = msg || ('Matches: ' + matched + ' / ' + PAIRS.length + ' · Flips: ' + flips); }
  function flip(b, text) {
    if (locked || b.classList.contains('flipped') || b.classList.contains('matched')) return;
    b.classList.add('flipped'); b.setAttribute('aria-label', text);
    open.push(b); flips++;
    if (open.length === 2) {
      locked = true;
      if (open[0].dataset.pair === open[1].dataset.pair) {
        open.forEach(function (c) { c.classList.add('matched'); });
        open = []; matched++; locked = false;
        if (matched === PAIRS.length) {
          var better = Games.best('memory', flips, true);
          status('🏆 All matched in ' + flips + ' flips!' + (better ? ' New best!' : ''));
          Games.finished();
          launchConfetti();
          return;
        }
      } else {
        setTimeout(function () {
          open.forEach(function (c) { c.classList.remove('flipped'); c.setAttribute('aria-label', 'Hidden card'); });
          open = []; locked = false; status();
        }, 900);
      }
    }
    status();
  }
  function init() { $id('memStart').addEventListener('click', start); start(); }
  Games.register('memory', { init: init, formatBest: function (v) { return v + ' flips'; } });
})();
