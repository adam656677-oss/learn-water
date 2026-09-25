/* ==========================================================
   NEW GAME — Water Plant Tycoon
   Ten days running a treatment plant. Each day the river
   changes; choose coagulant, backwash, carbon, and chlorine.
   Lessons: floc settles dirt, dirty filters need backwashing,
   cloudy water hides germs, and chlorine has a sweet spot.
   ========================================================== */
(function () {
  var DAYS = 10;
  var COST = { scoop: 4, backwash: 12, carbon: 8, drop: 3 };
  var INCOME = 28;
  var WEATHER = {
    sunny: { icon: '☀️', name: 'Sunny day',       T: 1, text: 'The river is calm and only a little cloudy.' },
    rainy: { icon: '🌧️', name: 'Rainy day',       T: 2, text: 'Rain washed dirt into the river. It looks cloudy.' },
    storm: { icon: '⛈️', name: 'Big storm!',      T: 3, text: 'A storm churned up the river. The water is MUDDY!' }
  };
  var CLOUD = ['Clear', 'A bit cloudy', 'Cloudy', 'Muddy'];
  var GERM = ['None', 'Low', 'Medium', 'High'];
  var S, today, plan, ran;

  var MUD = [132, 98, 52], CLEAR = [143, 216, 245];
  function waterColor(c) { var t = 1 - clamp(c, 0, 3) / 3; return 'rgb(' + MUD.map(function (m, i) { return Math.round(m + (CLEAR[i] - m) * t); }).join(',') + ')'; }

  function newGame() {
    S = { day: 1, coins: 100, happy: 70, dirt: 20, safe: 0, log: [] };
    newDay();
  }
  function newDay() {
    var r = Math.random(), w;
    if (S.day === 1) w = 'sunny';
    else w = r < 0.45 ? 'sunny' : r < 0.8 ? 'rainy' : 'storm';
    var G = w === 'storm' ? 3 : w === 'rainy' ? (Math.random() < 0.5 ? 2 : 3) : (Math.random() < 0.6 ? 1 : 2);
    today = { w: w, T: WEATHER[w].T, G: G, algae: w === 'sunny' && S.day > 1 && Math.random() < 0.45 };
    plan = { scoops: 1, backwash: false, carbon: false, drops: 2 };
    ran = false;
    render();
    paintPipes(null);
  }

  function cost() { return plan.scoops * COST.scoop + (plan.backwash ? COST.backwash : 0) + (plan.carbon ? COST.carbon : 0) + plan.drops * COST.drop; }

  function run() {
    if (ran) return;
    var c = cost();
    if (c > S.coins) { setFeedback('tyFeedback', "🪙 Not enough coins for that plan! Try fewer drops or skip something today.", false); return; }
    ran = true;
    S.coins -= c;
    var dirtBefore = plan.backwash ? 0 : S.dirt;
    var filterOK = dirtBefore < 80;
    var settled = Math.max(0, today.T - plan.scoops);
    var final = filterOK ? Math.max(0, settled - 1) : settled;
    var need = today.G + final;
    var residual = plan.drops - need;
    var safe = residual >= 0 && final <= 1;
    var algaeTaste = today.algae && !plan.carbon;
    var poolTaste = residual >= 3;
    var wasted = plan.scoops > today.T;
    S.dirt = clamp(dirtBefore + 12 + settled * 14, 0, 100);

    var d = safe ? 6 : -22;
    if (final === 1) d -= 4;
    if (final >= 2) d -= 10;
    if (algaeTaste) d -= 6;
    if (poolTaste) d -= 6;
    var perfect = safe && final === 0 && !algaeTaste && !poolTaste && !wasted;
    if (perfect) d += 4;
    S.happy = clamp(S.happy + d, 0, 100);
    S.coins += INCOME + (perfect ? 10 : 0);
    if (safe) S.safe++;
    S.log.push(safe);

    paintPipes({ raw: today.T, settled: settled, final: final, safe: safe });

    var items = [];
    items.push([safe, safe ? 'Germs: all killed — the water is SAFE.' : (residual < 0 ? 'Germs survived! Not enough chlorine.' : 'Too cloudy to be safe to drink.')]);
    items.push([final === 0, final === 0 ? 'Clarity: crystal clear!' : 'Clarity: ' + CLOUD[final].toLowerCase() + ' water reached town.']);
    items.push([filterOK, filterOK ? 'Filter: working great' + (plan.backwash ? ' (freshly backwashed!)' : '') + '.' : 'Filter: CLOGGED — dirt slipped through!']);
    if (today.algae) items.push([!algaeTaste, algaeTaste ? 'Taste: earthy, like pond water (algae!).' : 'Taste: carbon soaked up the algae smell.']);
    if (poolTaste) items.push([false, 'Taste: way too much chlorine — tastes like a pool!']);
    if (wasted) items.push([false, 'Budget: extra coagulant scoops were wasted.']);

    var tip;
    if (!safe && residual < 0) tip = 'Chlorine demand today was ' + need + ' drop' + (need === 1 ? '' : 's') + ' (germ level ' + today.G + (final ? ' + ' + final + ' for cloudiness' : '') + '). Cloudy water hides germs from chlorine — clear the water first, then add enough drops!';
    else if (final >= 2) tip = 'Muddy water needs more coagulant. Each scoop helps dirt clump into heavy floc that sinks in the settling tank.';
    else if (!filterOK) tip = 'Your filter was clogged! When the dirt gauge gets high, backwash it — that means running water backward to flush the dirt out.';
    else if (algaeTaste) tip = 'Algae make water taste earthy. Activated carbon soaks up those smells — use it on algae days.';
    else if (poolTaste) tip = 'Chlorine has a sweet spot: enough to kill germs, but not so much it tastes like a pool. Aim for just 0–2 drops extra.';
    else if (wasted) tip = "Extra coagulant doesn't make water cleaner — it just costs coins. Match the scoops to how cloudy the river is.";
    else tip = perfect ? 'PERFECT day! Clear, safe, tasty water — and you stayed on budget. The town is cheering! 🎉' : 'Nice work! The water was safe today.';

    var rep = $id('tyReport');
    rep.hidden = false;
    rep.querySelector('h4').textContent = 'Day ' + S.day + ' report ' + (safe ? '✅' : '⚠️');
    var ul = rep.querySelector('ul');
    ul.innerHTML = '';
    items.forEach(function (it) { var li = document.createElement('li'); li.textContent = (it[0] ? '✅ ' : '❌ ') + it[1]; ul.appendChild(li); });
    rep.querySelector('.tip').textContent = tip;
    var nextBtn = $id('tyNext');
    nextBtn.hidden = false;
    nextBtn.textContent = S.day >= DAYS ? '🏁 See final results' : '➡️ Start day ' + (S.day + 1);
    $id('tyRun').disabled = true;
    setFeedback('tyFeedback', safe ? '💧 Safe water delivered! +' + (INCOME + (perfect ? 10 : 0)) + ' coins from the town.' : '🚨 Boil-water notice! The town had to boil their water today.', safe);
    render();
    nextBtn.focus({ preventScroll: true });
  }

  function next() {
    if (S.day >= DAYS) return endGame();
    S.day++;
    $id('tyReport').hidden = true;
    $id('tyNext').hidden = true;
    $id('tyRun').disabled = false;
    setFeedback('tyFeedback', '');
    newDay();
  }

  function endGame() {
    var score = S.safe * 100 + S.happy * 3 + S.coins;
    var title = S.safe === DAYS ? 'Water Superhero 🦸' : S.safe >= 8 ? 'Chief Operator 🏅' : S.safe >= 5 ? 'Plant Operator 👷' : 'Operator in Training 🔰';
    var rep = $id('tyReport');
    rep.hidden = false;
    rep.querySelector('h4').textContent = '🏁 Final results: ' + title;
    var ul = rep.querySelector('ul');
    ul.innerHTML = '';
    [['💧', S.safe + ' of ' + DAYS + ' days with safe water'], ['😊', 'Town happiness: ' + S.happy + '%'], ['🪙', S.coins + ' coins left'], ['⭐', 'Score: ' + score]].forEach(function (x) {
      var li = document.createElement('li'); li.textContent = x[0] + ' ' + x[1]; ul.appendChild(li);
    });
    rep.querySelector('.tip').textContent = S.safe >= 8 ?
      'Amazing! Real water operators do this every single day — testing, adjusting, and keeping everyone safe.' :
      'Tip: match coagulant to the cloudiness, backwash before the filter clogs, and give chlorine enough drops for the germs AND any leftover cloudiness.';
    $id('tyNext').hidden = true;
    $id('tyRun').hidden = true;
    $id('tyAgain').hidden = false;
    Games.best('tycoon', score);
    Games.finished();
    if (S.safe >= 8) KidsBadges.earn('operator');
  }

  function segButtons(containerId, max, key, unit) {
    var box = $id(containerId);
    box.innerHTML = '';
    for (var i = 0; i <= max; i++) {
      (function (v) {
        var b = document.createElement('button');
        b.type = 'button'; b.textContent = v;
        b.setAttribute('aria-label', v + ' ' + unit + (v === 1 ? '' : 's'));
        b.addEventListener('click', function () { if (ran) return; plan[key] = v; render(); });
        box.appendChild(b);
      })(i);
    }
  }

  function render() {
    var W = WEATHER[today.w];
    $id('tyDay').textContent = 'Day ' + S.day + ' / ' + DAYS;
    $id('tyCoins').textContent = S.coins;
    $id('tyHappy').textContent = S.happy + '%';
    $id('tyHappyBar').style.width = S.happy + '%';
    $id('tyHappyBar').style.background = S.happy >= 60 ? '#7ed957' : S.happy >= 35 ? '#ffbe2e' : '#ff7a6b';
    var dirtShown = ran ? S.dirt : (plan.backwash ? 0 : S.dirt);
    $id('tyDirt').textContent = dirtShown + '%' + (dirtShown >= 80 ? ' 🚨' : dirtShown >= 60 ? ' ⚠️' : '');
    $id('tyDirtBar').style.width = dirtShown + '%';
    $id('tyDirtBar').style.background = dirtShown >= 80 ? '#ff7a6b' : dirtShown >= 60 ? '#ffbe2e' : '#7ed957';
    $id('tyRawIcon').textContent = W.icon;
    $id('tyRawName').textContent = W.name;
    $id('tyRawText').textContent = W.text;
    var tags = $id('tyRawTags');
    tags.innerHTML = '';
    [['Cloudiness', CLOUD[today.T]], ['Germs', GERM[today.G]], ['Algae', today.algae ? 'Yes 🟢' : 'No']].forEach(function (t) {
      var s = document.createElement('span'); s.className = 'ty-tag'; s.textContent = t[0] + ': ' + t[1]; tags.appendChild(s);
    });
    ['tyScoops', 'tyDrops'].forEach(function (id) {
      var key = id === 'tyScoops' ? 'scoops' : 'drops';
      $id(id).querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', +b.textContent === plan[key] ? 'true' : 'false');
        b.disabled = ran;
      });
    });
    $id('tyBackwash').checked = plan.backwash; $id('tyBackwash').disabled = ran;
    $id('tyCarbon').checked = plan.carbon; $id('tyCarbon').disabled = ran;
    $id('tyCost').textContent = 'Today’s plan costs 🪙 ' + cost();
    var days = $id('tyDays');
    days.innerHTML = '';
    for (var i = 1; i <= DAYS; i++) {
      var d = document.createElement('span');
      var st = S.log[i - 1];
      d.className = 'ty-day' + (st === true ? ' safe' : st === false ? ' unsafe' : '') + (i === S.day && !ran ? ' today' : '');
      d.textContent = st === true ? '💧' : st === false ? '⚠️' : i;
      d.title = 'Day ' + i;
      days.appendChild(d);
    }
  }

  function paintPipes(r) {
    var raw = r ? r.raw : today.T;
    var set = function (id, c) { var el = $id(id); if (el) el.setAttribute('stroke', c); };
    set('tyP1', waterColor(raw));
    set('tyP2', waterColor(raw));
    set('tyP3', r ? waterColor(r.settled) : '#c9d6e0');
    set('tyP4', r ? waterColor(r.final) : '#c9d6e0');
    set('tyP5', r ? waterColor(r.final) : '#c9d6e0');
    var town = $id('tyTown');
    if (town) town.textContent = r ? (r.safe ? '😀' : '😟') : '🏘️';
    var svg = $id('tyPipeline');
    if (svg) svg.classList.toggle('flowing', !!r);
  }

  function pipelineSVG() {
    var st = [
      { x: 20, icon: '🏞️', name: 'River' }, { x: 150, icon: '🧲', name: 'Mix' }, { x: 280, icon: '🪣', name: 'Settle' },
      { x: 410, icon: '🧽', name: 'Filter' }, { x: 540, icon: '🧪', name: 'Chlorine' }, { x: 670, icon: '🏘️', name: 'Town', id: 'tyTown' }
    ];
    var s = '<svg id="tyPipeline" class="ty-pipeline" viewBox="0 0 760 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Treatment plant pipeline: river, mix, settle, filter, chlorine, town">';
    s += '<style>#tyPipeline .pipe{stroke-width:16;stroke-linecap:round;transition:stroke .8s}#tyPipeline.flowing .flow{animation:tyFlow 1s linear infinite}@keyframes tyFlow{to{stroke-dashoffset:-24}}@media (prefers-reduced-motion:reduce){#tyPipeline.flowing .flow{animation:none}}</style>';
    for (var i = 0; i < st.length - 1; i++) {
      var x1 = st[i].x + 80, x2 = st[i + 1].x;
      s += '<line class="pipe" id="tyP' + (i + 1) + '" x1="' + x1 + '" y1="60" x2="' + x2 + '" y2="60" stroke="#c9d6e0"/>';
      s += '<line class="flow" x1="' + x1 + '" y1="60" x2="' + x2 + '" y2="60" stroke="rgba(255,255,255,.7)" stroke-width="4" stroke-dasharray="6 18"/>';
    }
    st.forEach(function (n) {
      s += '<rect x="' + n.x + '" y="22" width="80" height="76" rx="16" fill="#fff" stroke="#0b2a4a" stroke-width="3"/>';
      s += '<text' + (n.id ? ' id="' + n.id + '"' : '') + ' x="' + (n.x + 40) + '" y="62" text-anchor="middle" font-size="30">' + n.icon + '</text>';
      s += '<text x="' + (n.x + 40) + '" y="90" text-anchor="middle" font-size="14" font-weight="800" fill="#0b2a4a" style="font-family:\'Baloo 2\',sans-serif">' + n.name + '</text>';
    });
    s += '</svg>';
    return s;
  }

  function init() {
    $id('tyPipeWrap').innerHTML = pipelineSVG();
    segButtons('tyScoops', 3, 'scoops', 'scoop');
    segButtons('tyDrops', 4, 'drops', 'drop');
    $id('tyBackwash').addEventListener('change', function (e) { if (!ran) { plan.backwash = e.target.checked; render(); } });
    $id('tyCarbon').addEventListener('change', function (e) { if (!ran) { plan.carbon = e.target.checked; render(); } });
    $id('tyRun').addEventListener('click', run);
    $id('tyNext').addEventListener('click', next);
    $id('tyAgain').addEventListener('click', function () {
      $id('tyAgain').hidden = true; $id('tyRun').hidden = false; $id('tyRun').disabled = false;
      $id('tyReport').hidden = true; setFeedback('tyFeedback', '');
      newGame();
    });
    newGame();
  }

  Games.register('tycoon', { init: init, formatBest: function (v) { return v + ' pts'; } });
})();
