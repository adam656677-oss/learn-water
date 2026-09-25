/* ==========================================================
   LearnWater — Adult Learning Center
   Needs: site.js, greg-engine.js, greg-adult-kb.js,
   greg-adult-ui.js, video-library.js, adult-curriculum.js,
   adult-math.js
   Everything is stored in this browser (localStorage):
     lw_currentClass   "D" | "C" | "B" | "A"
     lw_lessonDone     { ch1: true, … }        shared with lesson pages
     lw_chapter_stats  { ch1: { n, c }, … }    quiz answers per chapter
     lw_progress       { D: { quizzesTaken }, … }
     lw_math           { rounds, best, byTopic: { chem: { n, c } } }
     lw_flashcards     { D: [ { front, back } ], … }  your own cards
     lw_cards_known    { "ch1:0": true, … }
   ========================================================== */
(function () {
  'use strict';

  var CUR = window.LW_CURRICULUM, MATH = window.LW_MATH, S = LW.store, esc = LW.esc;
  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function $(id) { return document.getElementById(id); }
  function obj(v) { return v && typeof v === 'object' && !Array.isArray(v) ? v : {}; }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function pct(n, d) { return d ? Math.round(n / d * 100) : 0; }
  function tone(p) { return p >= 80 ? 'good' : p >= 60 ? 'warn' : 'low'; }
  function two(n) { return String(n).length === 1 ? '0' + n : String(n); }

  /* ---------------- state ---------------- */
  var st = { cls: 'D', done: {}, stats: {}, progress: {}, math: {}, mine: {}, known: {} };
  var KEYS = { done: 'lw_lessonDone', stats: 'lw_chapter_stats', progress: 'lw_progress', math: 'lw_math', mine: 'lw_flashcards', known: 'lw_cards_known' };
  function save(k) { S.set(KEYS[k], st[k]); }

  /* The old "Load Class Cards" button copied Greg's cards into your personal deck.
     A few of those had wrong facts, and corrected versions now live in Greg's deck,
     so the old copies are removed once (matched by exact front|back). */
  var OLD_DEFAULTS = ["r1cxxl","pvm1v4","ylcdcx","4n05yj","1712ayc","lh2kvr","1x6ccuh","axkucl","p7f139","1ptsrwp","1jqjpg6","15at080","18ll3r5","1u9xiw9","qvhr6a","in0kxs","ytc9wb","tkss3t","10gvy80","1uus87n","4rmlw3","16gy0vm","u7uz8m","10gfko","1bxawin","ei79ng","rgp2ty","yyce3c","1n7265f","esn275","mymp1g","e0d861","1wy5kxz","1nk7pym","1qhplsq","4gir96","34fhsj","xo26y2","3ltalx","1udr8x4","10un6yw","1dinb8y","im3xk2","l8tke0","p9oxjx"];
  function hash(s) { var x = 5381; for (var i = 0; i < s.length; i++) x = ((x << 5) + x + s.charCodeAt(i)) | 0; return (x >>> 0).toString(36); }

  function load() {
    var c = S.getRaw('lw_currentClass');
    st.cls = CUR.classes[c] ? c : 'D';
    ['done', 'stats', 'progress', 'math', 'mine', 'known'].forEach(function (k) { st[k] = obj(S.get(KEYS[k], {})); });
    if (S.getRaw('lw_center_v') !== '2') {
      /* v1 counted every quiz answer as correct, so its accuracy totals are meaningless */
      Object.keys(st.progress).forEach(function (k) { st.progress[k] = { quizzesTaken: +obj(st.progress[k]).quizzesTaken || 0 }; });
      Object.keys(st.mine).forEach(function (k) {
        st.mine[k] = (Array.isArray(st.mine[k]) ? st.mine[k] : []).filter(function (c) {
          return c && typeof c.front === 'string' && typeof c.back === 'string' && OLD_DEFAULTS.indexOf(hash(c.front + '|' + c.back)) === -1;
        });
      });
      save('progress'); save('mine');
      S.setRaw('lw_center_v', '2');
    }
  }

  function chapters() { return CUR.classChapters[st.cls].map(function (id) { var c = CUR.chapters[id]; c.id = id; return c; }); }
  function chName(c) { return 'Chapter ' + c.num + ': ' + c.title; }
  function chShort(c) { return 'Ch ' + c.num + ' · ' + c.title; }
  function chStat(id) { var s = obj(st.stats[id]); return { n: +s.n || 0, c: +s.c || 0 }; }
  function classTotals() {
    var n = 0, c = 0;
    CUR.classChapters[st.cls].forEach(function (id) { var s = chStat(id); n += s.n; c += s.c; });
    return { n: n, c: c };
  }
  function doneCount() { return CUR.classChapters[st.cls].filter(function (id) { return st.done[id]; }).length; }
  function weakest() {
    return chapters().map(function (c) { var s = chStat(c.id); return { ch: c, n: s.n, p: pct(s.c, s.n) }; })
      .filter(function (x) { return x.n >= 3 && x.p < 80; })
      .sort(function (a, b) { return a.p - b.p || b.n - a.n; });
  }
  function nextChapter() { var list = chapters(); for (var i = 0; i < list.length; i++) if (!st.done[list[i].id]) return list[i]; return null; }
  function pageFor(c) { return c.page; }

  /* ================= CLASS SWITCH, RAIL, GREG TIP ================= */
  var HERO_CHIPS = {
    D: ['What is the pounds formula?', 'Explain the breakpoint chlorination curve.', 'How do I calculate specific capacity?'],
    C: ['What does aeration remove from water?', 'When should I backwash a filter?', 'What is the Langelier index?'],
    B: ['How do I calculate water horsepower?', 'Coagulation vs. flocculation?', 'How does ion exchange softening work?'],
    A: ['Why do THMs form?', 'How does lime-soda ash softening work?', 'What is CT in disinfection?']
  };

  function renderClass() {
    document.querySelectorAll('#classSwitch [role="radio"]').forEach(function (b) {
      var on = b.dataset.class === st.cls;
      b.setAttribute('aria-checked', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
    });
    var cl = CUR.classes[st.cls];
    $('classTagline').textContent = cl.name + ': ' + cl.tagline + '.';
    var chips = $('heroChips');
    chips.innerHTML = '';
    HERO_CHIPS[st.cls].forEach(function (q) {
      var b = LW.el('button', 'hero-chip', q);
      b.type = 'button';
      b.addEventListener('click', function () { openGreg(q); });
      chips.appendChild(b);
    });
  }

  function renderRail() {
    var total = CUR.classChapters[st.cls].length, done = doneCount(), t = classTotals();
    $('railBadge').textContent = st.cls;
    $('railClass').textContent = CUR.classes[st.cls].name;
    $('railLessons').textContent = done + '/' + total;
    var m = $('railMeter'), p = pct(done, total);
    m.querySelector('i').style.width = p + '%';
    m.setAttribute('aria-valuenow', p);
    $('railAcc').textContent = t.n ? pct(t.c, t.n) + '%' : '—';
    $('railAnswered').textContent = t.n.toLocaleString('en-US');
    var mb = obj(st.math);
    $('railMath').textContent = mb.rounds ? (+mb.best || 0) + '%' : '—';
  }

  function renderTip() {
    var list = chapters(), done = doneCount(), weak = weakest(), next = nextChapter(), t = classTotals(), html;
    if (!done && !t.n) {
      html = "Welcome! Start with <b>" + esc(chName(list[0])) + "</b>. It shows up on every exam. When you finish a chapter, take a short quiz on just that chapter.";
    } else if (weak.length && weak[0].p < 70) {
      html = 'Your weakest chapter right now is <b>' + esc(chName(weak[0].ch)) + '</b> (' + weak[0].p + '%). Re-read its “numbers to memorize” box, then drill it in Practice Quiz.';
    } else if (next) {
      html = "You've finished " + done + ' of ' + list.length + ' chapters. Next up: <b>' + esc(chName(next)) + '</b>.';
      if (done >= 3 && !obj(st.math).rounds) html += ' Also try a 10-problem math drill. Math is where most exam points are lost.';
    } else {
      html = 'All ' + list.length + ' chapters are done. Now mix full practice quizzes with 20-problem math drills until you’re steady above 80%.';
    }
    $('gregTip').innerHTML = html;
  }

  function setClass(c) {
    if (!CUR.classes[c] || c === st.cls) return;
    st.cls = c;
    S.setRaw('lw_currentClass', c);
    quizReset(); mathReset();
    renderAll();
  }

  /* ================= TABS ================= */
  var TABS = ['lessons', 'quiz', 'math', 'cards', 'glossary', 'videos', 'progress'];
  var current = 'lessons';
  function showTab(name, opts) {
    if (TABS.indexOf(name) === -1) name = 'lessons';
    current = name;
    TABS.forEach(function (t) {
      var tab = $('tab-' + t), panel = $('panel-' + t), on = t === name;
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
      tab.tabIndex = on ? 0 : -1;
      panel.hidden = !on;
      panel.classList.toggle('active', on);
    });
    if (name === 'progress') renderProgress();
    if (name === 'cards') renderCards();
    if (name === 'glossary') { glChapterOptions(); renderGlossary(); }
    if (!(opts && opts.keepHash)) {
      try { history.replaceState(null, '', '#' + name); } catch (e) { /* file:// or sandboxed */ }
    }
    if (opts && opts.scroll) {
      var top = document.querySelector('.tool-tabs').getBoundingClientRect().top + window.pageYOffset - 140;
      window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    if (opts && opts.focus) $('tab-' + name).focus();
  }
  function initTabs() {
    var tabs = TABS.map(function (t) { return $('tab-' + t); });
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { showTab(tab.dataset.tab); });
      tab.addEventListener('keydown', function (e) {
        var k = e.key, j = null;
        if (k === 'ArrowRight') j = (i + 1) % tabs.length;
        else if (k === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
        else if (k === 'Home') j = 0;
        else if (k === 'End') j = tabs.length - 1;
        if (j !== null) { e.preventDefault(); showTab(TABS[j], { focus: true }); }
      });
    });
    document.addEventListener('click', function (e) {
      var go = e.target.closest('[data-go]');
      if (go) { e.preventDefault(); showTab(go.dataset.go, { scroll: true }); return; }
      var qz = e.target.closest('[data-quiz]');
      if (qz) { e.preventDefault(); quizChapter(qz.dataset.quiz); }
    });
  }
  /* Deep links: #quiz, #math, #cards, #quiz:ch3, #cards:ch5, #glossary:ch5, #glossary:turbidity */
  function fromHash() {
    var h = (location.hash || '').replace('#', ''), parts = h.split(':');
    if (TABS.indexOf(parts[0]) === -1) return false;
    if (parts[0] === 'quiz' && parts[1] && CUR.chapters[parts[1]]) { quizChapter(parts[1]); return true; }
    if (parts[0] === 'glossary' && parts[1] && window.LW_GLOSSARY) {
      if (CUR.chapters[parts[1]]) {
        /* #glossary:ch5 opens the glossary filtered to one chapter */
        gl.ch = parts[1]; gl.q = ''; $('glQuery').value = '';
        showTab('glossary', { keepHash: true, scroll: true });
      } else glShow(decodeURIComponent(parts[1]));
      return true;
    }
    if (parts[0] === 'cards' && parts[1] && CUR.chapters[parts[1]]) { fc.deck = parts[1]; }
    showTab(parts[0], { keepHash: true, scroll: true });
    return true;
  }

  /* ================= LESSONS ================= */
  function renderLessons() {
    var list = chapters(), cl = CUR.classes[st.cls];
    $('lessonsTitle').textContent = list.length + ' chapters for ' + cl.name;
    var next = nextChapter(), nu = $('nextUp');
    if (next) {
      nu.innerHTML = '<div class="next-up" style="--c:' + next.theme.c + ';--t:' + next.theme.t + '">' +
        '<span class="nu-icon" aria-hidden="true">' + next.icon + '</span>' +
        '<div class="nu-text"><span>' + (doneCount() ? 'Continue where you left off' : 'Start here') + '</span><strong>' + esc(chName(next)) + '</strong></div>' +
        '<a class="btn btn-primary btn-sm" href="' + esc(pageFor(next)) + '">Open lesson</a>' +
        '<button class="btn btn-soft btn-sm" type="button" data-quiz="' + next.id + '">Quiz this chapter</button></div>';
    } else {
      nu.innerHTML = '<div class="next-up"><span class="nu-icon" aria-hidden="true">🏆</span><div class="nu-text"><span>Every chapter complete</span><strong>Now practice with full-length quizzes and math drills</strong></div>' +
        '<button class="btn btn-primary btn-sm" type="button" data-go="quiz">Take a practice quiz</button></div>';
    }
    var grid = $('chapterGrid');
    grid.innerHTML = list.map(function (c) {
      var s = chStat(c.id), p = pct(s.c, s.n), done = !!st.done[c.id];
      var stat = s.n
        ? '<div class="ch-stat"><span>Quiz</span><div class="meter ' + tone(p) + '"><i style="width:' + p + '%"></i></div><b>' + p + '%</b></div>'
        : '<div class="ch-stat"><span>' + c.questions.length + ' practice questions · ' + c.cards.length + ' flash cards</span></div>';
      return '<article class="ch-card" style="--c:' + c.theme.c + ';--t:' + c.theme.t + '">' +
        '<div class="ch-top"><span class="ch-icon" aria-hidden="true">' + c.icon + '</span><span class="ch-num">CH ' + esc(two(c.num.split(' ')[0])) + (c.num.indexOf(' ') > 0 ? ' ' + esc(c.num.split(' ').slice(1).join(' ')) : '') + '</span>' +
        '<span class="ch-status' + (done ? ' done' : '') + '">' + (done ? 'Completed' : s.n ? 'In progress' : 'Not started') + '</span></div>' +
        '<h3><a href="' + esc(pageFor(c)) + '">' + esc(c.title) + '</a></h3>' +
        '<p>' + esc(c.dek) + '</p>' + stat +
        '<div class="ch-actions"><a class="btn btn-primary" href="' + esc(pageFor(c)) + '">Study</a>' +
        '<button class="btn btn-soft" type="button" data-quiz="' + c.id + '">Quiz</button>' +
        '<button class="ch-done-toggle" type="button" data-done="' + c.id + '" aria-pressed="' + done + '" aria-label="Mark ' + esc(chName(c)) + ' complete"><span class="box" aria-hidden="true"></span>Done</button></div>' +
        '</article>';
    }).join('');
  }
  function initLessons() {
    $('chapterGrid').addEventListener('click', function (e) {
      var b = e.target.closest('[data-done]');
      if (!b) return;
      var id = b.dataset.done;
      st.done[id] = !st.done[id];
      if (!st.done[id]) delete st.done[id];
      save('done');
      renderLessons(); renderRail(); renderTip();
      var again = document.querySelector('[data-done="' + id + '"]');
      if (again) again.focus();
    });
  }

  /* ================= PRACTICE QUIZ ================= */
  var quiz = null, quizN = 10, lastMissed = [];
  function renderQuizScope(keep) {
    var sel = $('quizScope'), list = chapters(), prev = keep ? sel.value : 'all';
    var total = list.reduce(function (n, c) { return n + c.questions.length; }, 0);
    sel.innerHTML = '<option value="all">All ' + esc(CUR.classes[st.cls].name) + ' chapters (' + total + ' questions)</option>' +
      '<option value="weak">My weakest chapters</option>' +
      list.map(function (c) { return '<option value="' + c.id + '">' + esc(chShort(c)) + ' (' + c.questions.length + ')</option>'; }).join('');
    sel.value = [].some.call(sel.options, function (o) { return o.value === prev; }) ? prev : 'all';
    $('quizIntro').textContent = 'Questions come from all ' + list.length + ' chapters in ' + CUR.classes[st.cls].name + ', with the answer choices shuffled each time. Pick one chapter to drill it.';
  }
  function makeItems(scope, n) {
    var ids;
    if (scope === 'all') ids = CUR.classChapters[st.cls];
    else if (scope === 'weak') {
      ids = weakest().slice(0, 3).map(function (w) { return w.ch.id; });
      if (!ids.length) ids = CUR.classChapters[st.cls];
    } else ids = [scope];
    /* Deal round-robin across chapters so a short quiz still covers many of them */
    var decks = ids.map(function (id) {
      return shuffle(CUR.chapters[id].questions.map(function (q, qi) { return { ch: id, q: q, qi: qi }; }));
    }), out = [];
    while (out.length < n) {
      var live = shuffle(decks.filter(function (d) { return d.length; }));
      if (!live.length) break;
      live.forEach(function (d) { if (out.length < n) out.push(d.pop()); });
    }
    return shuffle(out);
  }
  function startQuiz(items) {
    if (!items.length) return;
    quiz = { items: items, i: 0, correct: 0, answered: false, missed: [], byCh: {} };
    $('quizSetup').hidden = true;
    $('quizResult').hidden = true;
    $('quizCard').hidden = false;
    renderQ();
  }
  function quizChapter(id) {
    showTab('quiz', { scroll: true });
    renderQuizScope(true);
    var sel = $('quizScope');
    if (![].some.call(sel.options, function (o) { return o.value === id; })) {
      /* A chapter from a higher class (e.g. opened from its lesson page) */
      var o = document.createElement('option');
      o.value = id; o.textContent = chShort(CUR.chapters[id]) + ' (' + CUR.chapters[id].questions.length + ')';
      sel.appendChild(o);
    }
    sel.value = id;
    startQuiz(makeItems(id, Math.min(quizN, CUR.chapters[id].questions.length)));
  }
  function quizReset() {
    quiz = null;
    $('quizCard').hidden = true; $('quizResult').hidden = true; $('quizSetup').hidden = false;
  }
  function renderQ() {
    var it = quiz.items[quiz.i], ch = CUR.chapters[it.ch], q = it.q, card = $('quizCard');
    card.style.setProperty('--c', ch.theme.c); card.style.setProperty('--t', ch.theme.t);
    $('qTag').textContent = chShort(ch);
    $('qCount').textContent = 'Question ' + (quiz.i + 1) + ' of ' + quiz.items.length;
    $('qScore').textContent = quiz.correct + ' correct';
    $('qBar').style.width = pct(quiz.i, quiz.items.length) + '%';
    $('qText').textContent = q.q;
    var fb = $('qFeedback'); fb.className = 'feedback'; fb.innerHTML = '';
    $('qNext').hidden = true; $('qAsk').hidden = true;
    quiz.answered = false;
    var order = [0, 1, 2, 3];
    if (!q.choices.some(function (c) { return /\babove\b/i.test(c); })) order = shuffle(order);
    it.order = order;
    var box = $('qChoices');
    box.innerHTML = '';
    order.forEach(function (ci, n) {
      var b = LW.el('button', 'choice');
      b.type = 'button';
      b.dataset.ci = ci;
      b.innerHTML = '<span class="key" aria-hidden="true">' + 'ABCD'[n] + '</span><span class="txt"></span>';
      b.querySelector('.txt').textContent = q.choices[ci];
      b.addEventListener('click', function () { answerQ(ci); });
      box.appendChild(b);
    });
    if (quiz.i > 0) $('qText').focus({ preventScroll: true });
  }
  function answerQ(ci) {
    if (!quiz || quiz.answered) return;
    quiz.answered = true;
    var it = quiz.items[quiz.i], q = it.q, ok = ci === q.correct;
    document.querySelectorAll('#qChoices .choice').forEach(function (b) {
      var c = +b.dataset.ci;
      b.disabled = true;
      if (c === q.correct) b.classList.add('correct');
      else if (c === ci) b.classList.add('wrong');
      else b.classList.add('dim');
    });
    var s = chStat(it.ch); s.n++; if (ok) s.c++;
    st.stats[it.ch] = s; save('stats');
    var bc = quiz.byCh[it.ch] = quiz.byCh[it.ch] || { n: 0, c: 0 }; bc.n++;
    if (ok) { quiz.correct++; bc.c++; } else quiz.missed.push({ it: it, pick: ci });
    var fb = $('qFeedback');
    fb.className = 'feedback show ' + (ok ? 'good' : 'bad');
    fb.innerHTML = '<strong>' + (ok ? 'Correct.' : 'Not quite. The answer is “' + esc(q.choices[q.correct]) + '.”') + '</strong><span></span>';
    fb.querySelector('span').textContent = q.explain;
    $('qScore').textContent = quiz.correct + ' correct';
    var nx = $('qNext');
    nx.textContent = quiz.i === quiz.items.length - 1 ? 'See results' : 'Next question';
    nx.hidden = false;
    $('qAsk').hidden = false;
    nx.focus({ preventScroll: true });
    renderRail();
  }
  function nextQ() {
    if (!quiz || !quiz.answered) return;
    quiz.i++;
    if (quiz.i >= quiz.items.length) quizResult(); else renderQ();
  }
  function ring(p, label) {
    var r = 54, circ = 2 * Math.PI * r;
    return '<div class="ring"><svg viewBox="0 0 132 132" aria-hidden="true"><circle class="track" cx="66" cy="66" r="' + r + '"/>' +
      '<circle class="val" cx="66" cy="66" r="' + r + '" stroke-dasharray="' + circ.toFixed(1) + '" stroke-dashoffset="' + (circ * (1 - p / 100)).toFixed(1) + '"/></svg>' +
      '<div class="ring-num"><div><b>' + p + '%</b><small>' + esc(label) + '</small></div></div></div>';
  }
  function verdict(p) {
    if (p >= 90) return ['Exam-ready on this material', 'Excellent. Keep it fresh with a mixed quiz every few days.'];
    if (p >= 80) return ['Solid work', 'You’re above the passing zone. Review the misses below and you’ll lock it in.'];
    if (p >= 70) return ['Getting close', 'Re-read the “numbers to memorize” box for the chapters you missed, then try again.'];
    return ['Keep at it', 'Go back to the lesson pages for these chapters, then drill one chapter at a time.'];
  }
  function quizResult() {
    var n = quiz.items.length, p = pct(quiz.correct, n), v = verdict(p);
    var pr = obj(st.progress[st.cls]); pr.quizzesTaken = (+pr.quizzesTaken || 0) + 1; st.progress[st.cls] = pr; save('progress');
    lastMissed = quiz.missed.map(function (m) { return m.it; });
    var order = CUR.classChapters[st.cls];
    var rows = Object.keys(quiz.byCh).sort(function (a, b) { return order.indexOf(a) - order.indexOf(b); }).map(function (id) {
      var b = quiz.byCh[id], c = CUR.chapters[id], bp = pct(b.c, b.n);
      return '<div class="breakdown-row"><span class="name">' + esc(chShort(c)) + '</span><div class="meter ' + tone(bp) + '"><i style="width:' + bp + '%"></i></div><span class="num">' + b.c + '/' + b.n + '</span></div>';
    }).join('');
    var missed = quiz.missed.map(function (m) {
      var q = m.it.q;
      return '<div class="missed-item"><div class="mq">' + esc(q.q) + '</div><div class="ma"><span class="yours">Your answer: ' + esc(q.choices[m.pick]) + '</span><span class="right">Correct: ' + esc(q.choices[q.correct]) + '</span></div><div class="mx">' + esc(q.explain) + '</div></div>';
    }).join('');
    var res = $('quizResult');
    res.innerHTML = '<div class="result-top">' + ring(p, quiz.correct + ' of ' + n) +
      '<div class="result-text"><h3>' + esc(v[0]) + '</h3><p>' + esc(v[1]) + '</p><div class="result-actions">' +
      '<button class="btn btn-primary" type="button" id="qAgain">New quiz</button>' +
      (quiz.missed.length ? '<button class="btn btn-soft" type="button" id="qRetry">Retry the ' + quiz.missed.length + ' I missed</button>' : '') +
      '<button class="btn btn-soft" type="button" id="qSetup">Change chapters</button></div></div></div>' +
      (Object.keys(quiz.byCh).length > 1 ? '<div class="breakdown"><h4>By chapter</h4>' + rows + '</div>' : '') +
      (missed ? '<div class="missed"><h4>Review what you missed</h4>' + missed + '</div>' : '');
    $('quizCard').hidden = true;
    res.hidden = false;
    $('qAgain').addEventListener('click', function () { startQuiz(makeItems($('quizScope').value, quizN)); });
    if ($('qRetry')) $('qRetry').addEventListener('click', function () { startQuiz(shuffle(lastMissed)); });
    $('qSetup').addEventListener('click', quizReset);
    quiz = null;
    renderRail(); renderTip(); renderLessons();
    res.querySelector('h3').setAttribute('tabindex', '-1');
    res.querySelector('h3').focus({ preventScroll: true });
  }
  function initQuiz() {
    segInit('quizLen', function (b) { quizN = +b.dataset.n; });
    $('quizStart').addEventListener('click', function () { startQuiz(makeItems($('quizScope').value, quizN)); });
    $('qNext').addEventListener('click', nextQ);
    $('qAsk').addEventListener('click', function () { if (quiz) openGreg(quiz.items[quiz.i].q.q); });
    document.addEventListener('keydown', function (e) {
      if (current !== 'quiz' || !quiz || $('quizCard').hidden || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.target.closest('input, textarea, select, .greg-drawer')) return;
      var k = e.key.toUpperCase(), n = ['1', '2', '3', '4'].indexOf(k);
      if (n < 0) n = ['A', 'B', 'C', 'D'].indexOf(k);
      if (n >= 0 && !quiz.answered) {
        var b = document.querySelectorAll('#qChoices .choice')[n];
        if (b) { e.preventDefault(); b.click(); }
      } else if (e.key === 'Enter' && quiz.answered && e.target.tagName !== 'BUTTON') { e.preventDefault(); nextQ(); }
    });
  }

  /* Segmented radio groups */
  function segInit(id, onPick) {
    var group = $(id), btns = [].slice.call(group.querySelectorAll('[role="radio"]'));
    function pick(b, focus) {
      btns.forEach(function (x) { var on = x === b; x.setAttribute('aria-checked', on ? 'true' : 'false'); x.tabIndex = on ? 0 : -1; });
      if (focus) b.focus();
      onPick(b);
    }
    btns.forEach(function (b, i) {
      b.tabIndex = b.getAttribute('aria-checked') === 'true' ? 0 : -1;
      b.addEventListener('click', function () { pick(b); });
      b.addEventListener('keydown', function (e) {
        var j = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? (i + 1) % btns.length : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? (i - 1 + btns.length) % btns.length : -1;
        if (j >= 0) { e.preventDefault(); pick(btns[j], true); }
      });
    });
  }

  /* ================= MATH ================= */
  var drill = null, mathN = 10;
  function renderMathTopics() {
    var lvl = CUR.classes[st.cls].level, sel = $('mathTopic'), prev = sel.value || 'all';
    var opts = ['<option value="all">All topics for ' + esc(CUR.classes[st.cls].name) + ' (' + MATH.available(lvl, 'all').length + ' problem types)</option>'];
    Object.keys(MATH.topics).forEach(function (t) {
      var n = MATH.available(lvl, t).length;
      if (n) opts.push('<option value="' + t + '">' + esc(MATH.topics[t].name) + ' (' + n + ')</option>');
    });
    sel.innerHTML = opts.join('');
    sel.value = [].some.call(sel.options, function (o) { return o.value === prev; }) ? prev : 'all';
  }
  function mathReset() {
    drill = null;
    $('mathCard').hidden = true; $('mathResult').hidden = true; $('mathSetup').hidden = false;
  }
  function startMath() {
    var items = MATH.round(CUR.classes[st.cls].level, $('mathTopic').value, mathN);
    if (!items.length) return;
    drill = { items: items, i: 0, correct: 0, answered: false, byTopic: {} };
    $('mathSetup').hidden = true; $('mathResult').hidden = true; $('mathCard').hidden = false;
    renderM();
  }
  function renderM() {
    var p = drill.items[drill.i];
    $('mTag').textContent = MATH.topics[p.topic].name;
    $('mCount').textContent = 'Problem ' + (drill.i + 1) + ' of ' + drill.items.length;
    $('mScore').textContent = drill.correct + ' correct';
    $('mBar').style.width = pct(drill.i, drill.items.length) + '%';
    $('mText').textContent = p.prompt;
    $('mUnit').textContent = p.unit;
    var inp = $('mInput');
    inp.value = ''; inp.disabled = false; inp.removeAttribute('aria-invalid');
    $('mCheck').disabled = false;
    var fb = $('mFeedback'); fb.className = 'feedback'; fb.innerHTML = '';
    $('mNext').hidden = true; $('mSkip').hidden = false;
    drill.answered = false;
    inp.focus({ preventScroll: drill.i === 0 });
  }
  function gradeM(skipped) {
    if (!drill || drill.answered) return;
    var p = drill.items[drill.i], res = skipped ? { ok: false, value: null } : MATH.check(p, $('mInput').value);
    var fb = $('mFeedback');
    if (!res) {
      fb.className = 'feedback show bad';
      fb.innerHTML = '<strong>Enter a number to check.</strong>You can type commas or units, like “35,231 gal.” Stuck? Press “Show me how.”';
      $('mInput').setAttribute('aria-invalid', 'true');
      $('mInput').focus();
      return;
    }
    drill.answered = true;
    var t = drill.byTopic[p.topic] = drill.byTopic[p.topic] || { n: 0, c: 0 };
    t.n++;
    if (res.ok) { drill.correct++; t.c++; }
    $('mInput').disabled = true; $('mCheck').disabled = true; $('mSkip').hidden = true;
    var head = res.ok ? 'Correct: ' + MATH.show(p) + '.'
      : skipped ? 'Here’s how to solve it. Answer: ' + MATH.show(p) + '.'
      : 'Not quite. You entered ' + MATH.fmt(res.value, 4) + '; the answer is ' + MATH.show(p) + '.';
    fb.className = 'feedback show ' + (res.ok ? 'good' : 'bad');
    fb.innerHTML = '<strong></strong><ol></ol>';
    fb.querySelector('strong').textContent = head;
    p.steps.forEach(function (s) { fb.querySelector('ol').appendChild(LW.el('li', null, s)); });
    $('mScore').textContent = drill.correct + ' correct';
    var nx = $('mNext');
    nx.textContent = drill.i === drill.items.length - 1 ? 'See results' : 'Next problem';
    nx.hidden = false;
    nx.focus({ preventScroll: true });
  }
  function nextM() {
    if (!drill || !drill.answered) return;
    drill.i++;
    if (drill.i >= drill.items.length) mathResult(); else renderM();
  }
  function mathResult() {
    var n = drill.items.length, p = pct(drill.correct, n);
    var m = st.math; m.rounds = (+m.rounds || 0) + 1; m.best = Math.max(+m.best || 0, p); m.last = p;
    m.byTopic = obj(m.byTopic);
    Object.keys(drill.byTopic).forEach(function (t) {
      var a = obj(m.byTopic[t]), b = drill.byTopic[t];
      m.byTopic[t] = { n: (+a.n || 0) + b.n, c: (+a.c || 0) + b.c };
    });
    save('math');
    var rows = Object.keys(drill.byTopic).map(function (t) {
      var b = drill.byTopic[t], bp = pct(b.c, b.n);
      return '<div class="breakdown-row"><span class="name">' + esc(MATH.topics[t].name) + '</span><div class="meter ' + tone(bp) + '"><i style="width:' + bp + '%"></i></div><span class="num">' + b.c + '/' + b.n + '</span></div>';
    }).join('');
    var msg = p >= 90 ? ['Math is a strength', 'Great work. Try a 20-problem round, or pick a topic you use less.']
      : p >= 70 ? ['Good progress', 'Look back at the worked steps for the ones you missed, especially the unit conversions.']
      : ['Practice makes this easy', 'Open the formula sheet, work one topic at a time, and write the units next to every number.'];
    var res = $('mathResult');
    res.innerHTML = '<div class="result-top">' + ring(p, drill.correct + ' of ' + n) +
      '<div class="result-text"><h3>' + esc(msg[0]) + '</h3><p>' + esc(msg[1]) + '</p><div class="result-actions">' +
      '<button class="btn btn-primary" type="button" id="mAgain">New drill</button>' +
      '<button class="btn btn-soft" type="button" id="mSetup">Change topic</button></div></div></div>' +
      '<div class="breakdown"><h4>By topic</h4>' + rows + '</div>';
    $('mathCard').hidden = true;
    res.hidden = false;
    $('mAgain').addEventListener('click', startMath);
    $('mSetup').addEventListener('click', mathReset);
    drill = null;
    renderRail(); renderTip();
    res.querySelector('h3').setAttribute('tabindex', '-1');
    res.querySelector('h3').focus({ preventScroll: true });
  }
  function initMath() {
    segInit('mathLen', function (b) { mathN = +b.dataset.n; });
    $('mathStart').addEventListener('click', startMath);
    $('mForm').addEventListener('submit', function (e) { e.preventDefault(); if (drill && drill.answered) nextM(); else gradeM(false); });
    $('mSkip').addEventListener('click', function () { gradeM(true); });
    $('mNext').addEventListener('click', nextM);
    $('formulaGrid').innerHTML = MATH.formulas.map(function (f) { return '<div><b>' + esc(f[0]) + '</b><code>' + esc(f[1]) + '</code></div>'; }).join('');
  }

  /* ================= FLASH CARDS ================= */
  var fc = { deck: 'class', show: 'learning', list: [], i: 0, grid: false };
  function myCards() { return Array.isArray(st.mine[st.cls]) ? st.mine[st.cls] : (st.mine[st.cls] = []); }
  function deckCards(deck) {
    var out = [];
    if (deck === 'mine') {
      myCards().forEach(function (c) { out.push({ key: 'u:' + hash(c.front + '|' + c.back), f: c.front, b: c.back, src: 'My card' }); });
      return out;
    }
    var ids = deck === 'class' ? CUR.classChapters[st.cls] : [deck];
    ids.forEach(function (id) {
      var ch = CUR.chapters[id];
      ch.cards.forEach(function (c, i) { out.push({ key: id + ':' + i, f: c[0], b: c[1], src: 'Ch ' + ch.num + ' · ' + ch.title }); });
    });
    if (deck === 'class') myCards().forEach(function (c) { out.push({ key: 'u:' + hash(c.front + '|' + c.back), f: c.front, b: c.back, src: 'My card' }); });
    return out;
  }
  function renderDeckSelect() {
    var sel = $('fcDeck'), list = chapters();
    var all = deckCards('class').length;
    sel.innerHTML = '<option value="class">All ' + esc(CUR.classes[st.cls].name) + ' cards (' + all + ')</option>' +
      list.map(function (c) { return '<option value="' + c.id + '">' + esc(chShort(c)) + ' (' + c.cards.length + ')</option>'; }).join('') +
      '<option value="mine">My cards (' + myCards().length + ')</option>';
    if (fc.deck !== 'class' && fc.deck !== 'mine' && CUR.classChapters[st.cls].indexOf(fc.deck) === -1) fc.deck = 'class';
    sel.value = fc.deck;
  }
  function buildList(keepKey) {
    var cards = deckCards(fc.deck);
    fc.total = cards.length;
    fc.knownN = cards.filter(function (c) { return st.known[c.key]; }).length;
    fc.list = fc.show === 'learning' ? cards.filter(function (c) { return !st.known[c.key]; }) : cards;
    if (fc.shuffled) fc.list = shuffle(fc.list);
    var idx = keepKey ? fc.list.map(function (c) { return c.key; }).indexOf(keepKey) : -1;
    fc.i = idx >= 0 ? idx : Math.min(fc.i, Math.max(0, fc.list.length - 1));
  }
  function renderCards() {
    renderDeckSelect();
    buildList();
    paintCard();
    renderGrid();
    renderMine();
  }
  function paintCard(flipBack) {
    var card = $('fcCard'), meta = $('fcMeta'), c = fc.list[fc.i];
    card.classList.remove('flipped');
    $('fcStudy').hidden = fc.grid;
    $('fcGrid').hidden = !fc.grid;
    meta.innerHTML = '<span>Card <b>' + (fc.list.length ? fc.i + 1 : 0) + '</b> of <b>' + fc.list.length + '</b></span><span><b>' + fc.knownN + '</b> of ' + fc.total + ' known</span>';
    var controls = document.querySelectorAll('.fc-controls button');
    if (!c) {
      $('fcSrcF').textContent = '';
      $('fcTerm').textContent = fc.total ? 'You know every card in this deck 🎉' : 'No cards here yet';
      $('fcSrcB').textContent = ''; $('fcDef').textContent = '';
      card.disabled = true;
      controls.forEach(function (b) { b.disabled = true; });
      return;
    }
    card.disabled = false;
    controls.forEach(function (b) { b.disabled = false; });
    $('fcSrcF').textContent = c.src; $('fcSrcB').textContent = c.src;
    $('fcTerm').textContent = c.f; $('fcDef').textContent = c.b;
    card.setAttribute('aria-label', 'Flash card: ' + c.f + '. Press to flip.');
    $('fcKnow').textContent = st.known[c.key] ? 'Known ✓' : 'I know this ✓';
  }
  function flip() {
    var card = $('fcCard'), c = fc.list[fc.i];
    if (!c) return;
    card.classList.toggle('flipped');
    card.setAttribute('aria-label', card.classList.contains('flipped') ? 'Answer: ' + c.b + '. Press to flip back.' : 'Flash card: ' + c.f + '. Press to flip.');
  }
  function move(d) { if (!fc.list.length) return; fc.i = (fc.i + d + fc.list.length) % fc.list.length; paintCard(); }
  function mark(known) {
    var c = fc.list[fc.i];
    if (!c) return;
    if (known) st.known[c.key] = true; else delete st.known[c.key];
    save('known');
    var nextKey = fc.list[(fc.i + 1) % fc.list.length].key;
    if (fc.show === 'learning' && known) { buildList(nextKey === c.key ? null : nextKey); }
    else { fc.knownN = deckCards(fc.deck).filter(function (x) { return st.known[x.key]; }).length; fc.i = (fc.i + 1) % fc.list.length; }
    paintCard(); renderGrid();
  }
  function renderGrid() {
    var grid = $('fcGrid');
    grid.innerHTML = '';
    var cards = fc.printing ? deckCards(fc.deck) : fc.list;
    if (!cards.length) { grid.appendChild(LW.el('p', 'empty-note', 'No cards to show.')); return; }
    cards.forEach(function (c) {
      var t = LW.el('div', 'fc-tile' + (st.known[c.key] ? ' known' : ''));
      t.appendChild(LW.el('div', 't', c.f));
      t.appendChild(LW.el('div', 'd', c.b));
      t.appendChild(LW.el('div', 's', c.src));
      grid.appendChild(t);
    });
  }
  function renderMine() {
    var ul = $('fcMine'), mine = myCards();
    ul.innerHTML = '';
    mine.forEach(function (c, i) {
      var li = document.createElement('li'), d = document.createElement('div');
      d.appendChild(LW.el('b', null, c.front));
      d.appendChild(document.createTextNode(c.back));
      var del = LW.el('button', null, 'Delete');
      del.type = 'button';
      del.setAttribute('aria-label', 'Delete card: ' + c.front);
      del.addEventListener('click', function () {
        mine.splice(i, 1); save('mine'); renderCards();
      });
      li.appendChild(d); li.appendChild(del);
      ul.appendChild(li);
    });
  }
  function initCards() {
    $('fcDeck').addEventListener('change', function () { fc.deck = this.value; fc.i = 0; buildList(); paintCard(); renderGrid(); });
    segInit('fcShow', function (b) { fc.show = b.dataset.show; fc.i = 0; buildList(); paintCard(); renderGrid(); });
    $('fcCard').addEventListener('click', flip);
    $('fcPrev').addEventListener('click', function () { move(-1); });
    $('fcNext').addEventListener('click', function () { move(1); });
    $('fcKnow').addEventListener('click', function () { mark(true); });
    $('fcAgain').addEventListener('click', function () { mark(false); });
    $('fcShuffle').addEventListener('click', function () { fc.shuffled = true; fc.i = 0; buildList(); paintCard(); renderGrid(); });
    $('fcView').addEventListener('click', function () {
      fc.grid = !fc.grid;
      this.setAttribute('aria-pressed', fc.grid ? 'true' : 'false');
      this.textContent = fc.grid ? 'Card view' : 'List view';
      paintCard();
    });
    $('fcPrint').addEventListener('click', function () {
      fc.printing = true; renderGrid();
      document.body.classList.add('print-cards');
      window.print();
    });
    window.addEventListener('afterprint', function () {
      if (!fc.printing) return;
      fc.printing = false; document.body.classList.remove('print-cards'); renderGrid();
    });
    $('fcForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var f = $('fcFront').value.trim(), b = $('fcBackIn').value.trim();
      if (!f || !b) return;
      myCards().push({ front: f, back: b });
      save('mine');
      $('fcFront').value = ''; $('fcBackIn').value = '';
      renderCards();
      $('fcFront').focus();
    });
    document.addEventListener('keydown', function (e) {
      if (current !== 'cards' || fc.grid || e.target.closest('input, textarea, select, .greg-drawer')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); }
    });
  }

  /* ================= GLOSSARY ================= */
  var gl = { q: '', ch: 'all', items: null, bySlug: {}, timer: 0 };
  var FOLD = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9', '²': '2', '³': '3',
    '⁺': '+', '⁻': '-', 'µ': 'u', 'μ': 'u', '‘': "'", '’': "'", '“': '"', '”': '"', '–': '-', '—': '-', '×': 'x' };
  /* Lowercase and plain-ASCII the text one character at a time, so a match
     found in the folded copy sits at the same position in the original */
  function fold(s) {
    var out = '';
    for (var i = 0; i < s.length; i++) {
      var c = s.charAt(i), m = FOLD[c];
      if (m === undefined) { m = c.toLowerCase(); if (m.length !== 1) m = c; }
      out += m;
    }
    return out;
  }
  function glItems() {
    if (gl.items) return gl.items;
    gl.items = (window.LW_GLOSSARY || []).map(function (g, i) {
      var key = fold(g[0]).replace(/^[^a-z0-9]+/, '');
      return {
        i: i, term: g[0], def: g[1], key: key,
        chs: String(g[2] || '').split(/\s+/).filter(function (c) { return CUR.chapters[c]; }),
        fTerm: fold(g[0]), fDef: fold(g[1]), fAka: g[3] ? fold(g[3]).split('|') : [],
        letter: /^[a-z]/.test(key) ? key.charAt(0).toUpperCase() : '#'
      };
    }).sort(function (a, b) { return a.key < b.key ? -1 : a.key > b.key ? 1 : 0; });
    gl.items.forEach(function (it) {
      var s = it.fTerm.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''), n = 2, base = s;
      while (gl.bySlug[s]) s = base + '-' + n++;
      it.slug = s;
      gl.bySlug[s] = it;
    });
    return gl.items;
  }
  function glInChapter(it) {
    if (gl.ch === 'all') return true;
    var ids = gl.ch === 'class' ? CUR.classChapters[st.cls] : [gl.ch];
    return it.chs.some(function (c) { return ids.indexOf(c) !== -1; });
  }
  /* 3+ = the term itself matches, 1–2 = only its definition mentions it */
  function glScore(it, q, qw) {
    if (it.fTerm.indexOf(q) === 0 || it.fAka.indexOf(q) !== -1) return 5;
    if (q.length < 2) return 0;
    if (it.fTerm.indexOf(q) !== -1) return 4;
    if (it.fAka.some(function (a) { return a.indexOf(q) !== -1; })) return 3;
    if (q.length < 3) return 0;
    if (it.fDef.indexOf(q) !== -1) return 2;
    var all = it.fTerm + ' ' + it.fAka.join(' ') + ' ' + it.fDef;
    return qw.length > 1 && qw.every(function (w) { return all.indexOf(w) !== -1; }) ? 1 : 0;
  }
  function glMark(text, ftext, needles) {
    var on = [], out = '', run = '', cur = 0;
    needles.forEach(function (n) {
      for (var at = ftext.indexOf(n); n && at !== -1; at = ftext.indexOf(n, at + n.length)) for (var k = at; k < at + n.length; k++) on[k] = 1;
    });
    for (var i = 0; i <= text.length; i++) {
      var v = i < text.length ? (on[i] ? 1 : 0) : -1;
      if (v !== cur) { out += cur === 1 ? '<mark>' + esc(run) + '</mark>' : esc(run); run = ''; cur = v; }
      if (i < text.length) run += text.charAt(i);
    }
    return out;
  }
  function glInMine(it) { return myCards().some(function (c) { return c.front === it.term; }); }
  var GL_ASK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M9.3 8.3a2.7 2.7 0 1 1 3.4 2.6c-.5.2-.7.6-.7 1.1M12 14.2h.01" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>';
  var GL_CARD = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="13" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M7 4h11a2 2 0 0 1 2 2v11" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path class="gl-plus" d="M9.5 10.5v6M6.5 13.5h6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path class="gl-tick" d="M6.5 13.6l2.2 2.2 4-4.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function glItemHTML(it, needles) {
    var tags = it.chs.map(function (id) {
      var c = CUR.chapters[id];
      return '<a class="gl-ch" href="' + esc(c.page) + '" style="--c:' + c.theme.c + ';--t:' + c.theme.t + '" aria-label="' + esc(chName(c)) + ' lesson">Ch ' + esc(c.num) + '</a>';
    }).join('');
    return '<div class="gl-item" id="term-' + it.slug + '" tabindex="-1">' +
      '<dt><span class="gl-term">' + glMark(it.term, it.fTerm, needles) + '</span><span class="gl-tags">' + tags + '</span></dt>' +
      '<dd><p>' + glMark(it.def, it.fDef, needles) + '</p><span class="gl-acts">' +
      '<button class="gl-act" type="button" data-gl-ask="' + it.slug + '" title="Ask Greg" aria-label="Ask Greg about ' + esc(it.term) + '">' + GL_ASK + '</button>' +
      '<button class="gl-act gl-card" type="button" data-gl-card="' + it.slug + '" title="Keep in my flash cards" aria-pressed="' + glInMine(it) + '" aria-label="Keep ' + esc(it.term) + ' in my flash cards">' + GL_CARD + '</button>' +
      '</span></dd></div>';
  }
  function glChapterOptions() {
    var sel = $('glChapter'), items = glItems();
    function count(ids) { return items.filter(function (it) { return it.chs.some(function (c) { return ids.indexOf(c) !== -1; }); }).length; }
    var classIds = CUR.classChapters[st.cls], allIds = Object.keys(CUR.chapters);
    var html = '<option value="all">All ' + allIds.length + ' chapters (' + items.length + ' terms)</option>';
    if (classIds.length < allIds.length) html += '<option value="class">' + esc(CUR.classes[st.cls].name) + ' chapters (' + count(classIds) + ')</option>';
    html += allIds.map(function (id) { return '<option value="' + id + '">' + esc(chShort(CUR.chapters[id])) + ' (' + count([id]) + ')</option>'; }).join('');
    sel.innerHTML = html;
    if (![].some.call(sel.options, function (o) { return o.value === gl.ch; })) gl.ch = 'all';
    sel.value = gl.ch;
  }
  function renderGlossary() {
    var items = glItems().filter(glInChapter), q = fold(gl.q.trim()).replace(/\s+/g, ' ');
    var box = $('glResults'), az = $('glAZ'), count = $('glCount'), scope = gl.ch === 'all' ? '' : gl.ch === 'class' ? ' in ' + CUR.classes[st.cls].name + ' chapters' : ' in ' + chName(CUR.chapters[gl.ch]);
    if (!q) {
      var groups = {}, letters = [];
      items.forEach(function (it) { if (!groups[it.letter]) { groups[it.letter] = []; letters.push(it.letter); } groups[it.letter].push(it); });
      az.hidden = false;
      az.innerHTML = ['#'].concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')).map(function (L) {
        var n = groups[L] ? groups[L].length : 0;
        return '<button type="button" data-gl-letter="' + L + '"' + (n ? ' aria-label="' + (L === '#' ? 'Numbers' : L) + ', ' + n + ' terms"' : ' disabled aria-label="' + (L === '#' ? 'Numbers' : L) + ', no terms"') + '>' + L + '</button>';
      }).join('');
      count.textContent = 'Showing ' + (gl.ch === 'all' ? 'all ' : '') + items.length + ' terms' + scope + '.';
      box.innerHTML = letters.map(function (L) {
        var id = 'gl-' + (L === '#' ? '0' : L);
        return '<section class="gl-group" id="' + id + '" aria-labelledby="' + id + 'h"><h3 class="gl-letter" id="' + id + 'h" tabindex="-1"><span>' + (L === '#' ? '0–9' : L) + '</span><small>' + groups[L].length + (groups[L].length === 1 ? ' term' : ' terms') + '</small></h3>' +
          '<dl class="gl-list">' + groups[L].map(function (it) { return glItemHTML(it, []); }).join('') + '</dl></section>';
      }).join('');
      return;
    }
    az.hidden = true;
    var qw = q.split(' ').filter(function (w) { return w.length > 1; });
    var needles = [q].concat(qw.length > 1 ? qw : []);
    var terms = [], mentions = [];
    items.forEach(function (it) {
      var s = glScore(it, q, qw);
      if (s >= 3) terms.push({ it: it, s: s }); else if (s) mentions.push({ it: it, s: s });
    });
    terms.sort(function (a, b) { return b.s - a.s || (a.it.key < b.it.key ? -1 : 1); });
    var shown = '“' + gl.q.trim() + '”';
    count.textContent = terms.length || mentions.length
      ? terms.length + (terms.length === 1 ? ' term matches ' : ' terms match ') + shown + (mentions.length ? ', and ' + mentions.length + ' more ' + (mentions.length === 1 ? 'definition mentions' : 'definitions mention') + ' it' : '') + scope + '.'
      : 'No terms match ' + shown + scope + '.';
    function group(title, list) {
      return '<section class="gl-group"><h3 class="gl-sub">' + esc(title) + '</h3><dl class="gl-list">' +
        list.map(function (x) { return glItemHTML(x.it, needles); }).join('') + '</dl></section>';
    }
    box.innerHTML = (terms.length ? group('Terms', terms) : '') +
      (mentions.length ? group(terms.length ? 'Also mentioned in these definitions' : 'Mentioned in these definitions', mentions) : '') +
      (terms.length || mentions.length ? '' : '<div class="empty-note">Nothing in the glossary for ' + esc(shown) + '. <button class="btn btn-soft btn-sm" type="button" data-gl-askq>Ask Greg instead</button></div>');
  }
  function glShow(slug) {
    glItems();
    var it = gl.bySlug[slug];
    gl.q = ''; $('glQuery').value = '';
    if (it && !glInChapter(it)) { gl.ch = 'all'; $('glChapter').value = 'all'; }
    showTab('glossary', { keepHash: true });
    var el = it && $('term-' + it.slug);
    if (!el) return;
    el.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
    el.focus({ preventScroll: true });
  }
  function initGlossary() {
    if (!window.LW_GLOSSARY) { $('tab-glossary').hidden = true; return; }
    $('glQuery').placeholder = 'Search ' + glItems().length + ' terms, like “RPZ”, “drawdown”, or “CT value”';
    $('glQuery').addEventListener('input', function () {
      var v = this.value;
      clearTimeout(gl.timer);
      gl.timer = setTimeout(function () { gl.q = v; renderGlossary(); }, 110);
    });
    $('glQuery').addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && this.value) { e.preventDefault(); this.value = ''; gl.q = ''; renderGlossary(); }
    });
    $('glChapter').addEventListener('change', function () { gl.ch = this.value; renderGlossary(); });
    $('glAZ').addEventListener('click', function (e) {
      var b = e.target.closest('[data-gl-letter]');
      if (!b || b.disabled) return;
      var g = $('gl-' + (b.dataset.glLetter === '#' ? '0' : b.dataset.glLetter));
      if (!g) return;
      g.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
      g.querySelector('.gl-letter').focus({ preventScroll: true });
    });
    $('glResults').addEventListener('click', function (e) {
      var ask = e.target.closest('[data-gl-ask]'), add = e.target.closest('[data-gl-card]');
      if (ask) { openGreg('What does “' + gl.bySlug[ask.dataset.glAsk].term + '” mean?'); return; }
      if (e.target.closest('[data-gl-askq]')) { openGreg('What is ' + gl.q.trim() + '?'); return; }
      if (add) {
        var it = gl.bySlug[add.dataset.glCard], mine = myCards(), on = glInMine(it);
        if (on) st.mine[st.cls] = mine.filter(function (c) { return c.front !== it.term; });
        else mine.push({ front: it.term, back: it.def });
        save('mine');
        renderDeckSelect();
        add.setAttribute('aria-pressed', on ? 'false' : 'true');
      }
    });
    $('glPrint').addEventListener('click', function () {
      document.body.classList.add('print-glossary');
      window.print();
    });
    window.addEventListener('afterprint', function () { document.body.classList.remove('print-glossary'); });
  }

  /* ================= VIDEOS ================= */
  var vidTopic = 'all';
  function classVideos() {
    var ids = CUR.classChapters[st.cls];
    return (window.LW_VIDEOS ? LW_VIDEOS.adult : []).filter(function (v) { return v.chapters.some(function (c) { return ids.indexOf(c) !== -1; }); });
  }
  function renderVideos() {
    var vids = classVideos(), topics = [];
    Object.keys(LW_VIDEOS.topics).forEach(function (t) { if (vids.some(function (v) { return v.topic === t; })) topics.push(t); });
    if (vidTopic !== 'all' && topics.indexOf(vidTopic) === -1) vidTopic = 'all';
    var row = $('vidTopics');
    row.innerHTML = '';
    [['all', 'All (' + vids.length + ')']].concat(topics.map(function (t) { return [t, LW_VIDEOS.topics[t]]; })).forEach(function (t) {
      var b = LW.el('button', 'chip', t[1]);
      b.type = 'button';
      b.setAttribute('aria-pressed', t[0] === vidTopic ? 'true' : 'false');
      b.addEventListener('click', function () { vidTopic = t[0]; renderVideos(); });
      row.appendChild(b);
    });
    var shown = vidTopic === 'all' ? vids : vids.filter(function (v) { return v.topic === vidTopic; });
    LW.renderVideos('vidGrid', shown, {
      extraLink: function (v) {
        var ch = CUR.chapters[v.chapters[0]], a = LW.el('a', 'lesson-link', 'Chapter ' + ch.num + ' lesson →');
        a.href = ch.page;
        return a;
      }
    });
  }
  function initVideos() {
    $('vidSearch').addEventListener('submit', function (e) {
      e.preventDefault();
      var q = $('vidQuery').value.trim();
      if (!q) { $('vidQuery').focus(); return; }
      window.open('https://www.youtube.com/results?search_query=' + encodeURIComponent(q + ' water operator'), '_blank', 'noopener');
    });
  }

  /* ================= PROGRESS ================= */
  function renderProgress() {
    var list = chapters(), t = classTotals(), m = obj(st.math), pr = obj(st.progress[st.cls]), done = doneCount();
    $('progressTitle').textContent = CUR.classes[st.cls].name + ' progress';
    var tiles = [
      [done + '/' + list.length, 'Lessons complete'],
      [t.n ? pct(t.c, t.n) + '%' : '—', 'Quiz accuracy'],
      [t.n.toLocaleString('en-US'), 'Questions answered'],
      [String(+pr.quizzesTaken || 0), 'Quizzes finished'],
      [m.rounds ? (+m.best || 0) + '%' : '—', m.rounds ? 'Best math drill (' + m.rounds + ' done)' : 'Math drills done']
    ];
    $('statTiles').innerHTML = tiles.map(function (x) { return '<div class="stat-tile"><div class="v">' + esc(x[0]) + '</div><div class="l">' + esc(x[1]) + '</div></div>'; }).join('');
    var weak = weakest().slice(0, 4), rl = $('reviewList');
    rl.innerHTML = weak.length ? weak.map(function (w) {
      return '<div class="review-item"><span class="ri-name">' + esc(chName(w.ch)) + '</span><span class="ri-acc">' + w.p + '% of ' + w.n + '</span>' +
        '<a class="btn btn-sm btn-soft" href="' + esc(w.ch.page) + '">Re-read</a><button class="btn btn-sm btn-primary" type="button" data-quiz="' + w.ch.id + '">Drill it</button></div>';
    }).join('') : '<p class="empty-note">' + (t.n ? 'No weak chapters right now. Everything with 3+ answers is at 80% or better.' : 'Take a practice quiz and your weakest chapters will show up here.') + '</p>';
    var rows = list.map(function (c) {
      var s = chStat(c.id), p = pct(s.c, s.n);
      return '<tr><td class="name">' + esc(c.title) + '<small>CH ' + esc(c.num) + '</small></td>' +
        '<td><span class="pill' + (st.done[c.id] ? ' done' : '') + '">' + (st.done[c.id] ? 'Complete' : 'Not yet') + '</span></td>' +
        '<td>' + (s.n ? '<div class="acc-cell"><div class="meter ' + tone(p) + '"><i style="width:' + p + '%"></i></div><span>' + p + '% · ' + s.n + '</span></div>' : '<span class="fine">No answers yet</span>') + '</td>' +
        '<td class="hide-sm"><button class="btn btn-sm btn-soft" type="button" data-quiz="' + c.id + '">Quiz</button></td></tr>';
    }).join('');
    $('chTable').innerHTML = '<thead><tr><th scope="col">Chapter</th><th scope="col">Lesson</th><th scope="col">Quiz accuracy</th><th scope="col" class="hide-sm"><span class="sr-only">Actions</span></th></tr></thead><tbody>' + rows + '</tbody>';
    var mt = obj(m.byTopic), topics = Object.keys(MATH.topics).filter(function (k) { return +obj(mt[k]).n; });
    $('mathTopicsList').innerHTML = topics.length ? topics.map(function (k) {
      var a = obj(mt[k]), ap = pct(+a.c, +a.n);
      return '<div class="breakdown-row"><span class="name">' + esc(MATH.topics[k].name) + '</span><div class="meter ' + tone(ap) + '"><i style="width:' + ap + '%"></i></div><span class="num">' + (+a.c) + '/' + (+a.n) + '</span></div>';
    }).join('') : '<p class="empty-note">Finish a math drill and your results by topic will show up here.</p>';
  }
  function initProgress() {
    $('resetBtn').addEventListener('click', function () {
      if (!window.confirm('Reset all progress? This clears completed lessons (for every class), quiz and math history, and cards marked known. Your own flash cards are kept.')) return;
      st.done = {}; st.stats = {}; st.progress = {}; st.math = {}; st.known = {};
      ['done', 'stats', 'progress', 'math', 'known'].forEach(save);
      renderAll();
      renderProgress();
    });
  }

  /* ================= GREG DRAWER ================= */
  var chat = null, opener = null;
  function openGreg(question) {
    var dr = $('gregDrawer');
    opener = document.activeElement;
    dr.hidden = false;
    document.body.classList.add('drawer-open');
    if (!chat) {
      chat = GregAdultUI.mount($('gregChat'), {
        intro: "Hi, I'm Greg. I know all 14 chapters of the operators manual. Ask about a rule, a process, or a number, or give me values and I'll work the formula, like “lbs/day for 2.5 mg/L at 1.2 MGD.” I can define any of 400+ glossary terms, and I can search EPA, NRWA, and MsRWA for you. Just start with **define** or **search**.",
        chips: HERO_CHIPS[st.cls].concat(['Search MsRWA for certification classes'])
      });
    }
    if (question) chat.ask(question);
    setTimeout(function () { if (chat) chat.focus(); }, reduceMotion ? 0 : 60);
  }
  function closeGreg() {
    var dr = $('gregDrawer');
    if (dr.hidden) return;
    dr.hidden = true;
    document.body.classList.remove('drawer-open');
    if (opener && opener.focus) opener.focus();
  }
  function initGreg() {
    GregAdultUI.fillAvatars();
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-open-greg]')) { e.preventDefault(); openGreg(); }
      else if (e.target.closest('[data-close-greg]')) { e.preventDefault(); closeGreg(); }
    });
    document.addEventListener('keydown', function (e) {
      var dr = $('gregDrawer');
      if (dr.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); closeGreg(); return; }
      if (e.key === 'Tab') {
        var f = [].slice.call(dr.querySelectorAll('button, input, a[href]')).filter(function (x) { return !x.disabled && x.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ================= INIT ================= */
  function renderAll() {
    renderClass(); renderRail(); renderTip(); renderLessons();
    renderQuizScope(true); renderMathTopics(); renderVideos();
    if (current === 'cards') renderCards(); else renderDeckSelect();
    if (current === 'glossary') { glChapterOptions(); renderGlossary(); }
    if (current === 'progress') renderProgress();
  }
  document.addEventListener('DOMContentLoaded', function () {
    load();
    (function () {
      var btns = [].slice.call(document.querySelectorAll('#classSwitch [role="radio"]'));
      btns.forEach(function (b, i) {
        b.addEventListener('click', function () { setClass(b.dataset.class); });
        b.addEventListener('keydown', function (e) {
          var j = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? (i + 1) % btns.length : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? (i - 1 + btns.length) % btns.length : -1;
          if (j >= 0) { e.preventDefault(); setClass(btns[j].dataset.class); btns[j].focus(); }
        });
      });
    })();
    initTabs(); initLessons(); initQuiz(); initMath(); initCards(); initGlossary(); initVideos(); initProgress(); initGreg();
    renderAll();
    fromHash();
    window.addEventListener('hashchange', fromHash);
  });
})();
