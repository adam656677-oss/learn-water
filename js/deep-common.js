/* ==========================================================
   LearnWater — shared behavior for the deep-dive pages
   (regulations.html, ms-aquifers.html, hydraulic-modeling.html)
   Each page sets, before this file:
     DEEP_TAG     glossary tag for its key terms ('reg', 'aq', 'hm')
     DEEP_QUIZ    [{ q, choices: [4], correct, explain }]
     DEEP_PROMPTS starter questions for Greg
     DEEP_INTRO   Greg's first message
   Needs site.js, greg-engine.js, glossary-adult.js,
   greg-adult-kb.js, greg-adult-brain.js, greg-adult-ui.js.
   ========================================================== */
(function (global) {
  'use strict';

  var esc = LW.esc, S = LW.store;
  var reduceMotion = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function $(x) { return document.getElementById(x); }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  /* Numbers: sensible significant figures, thousands separators */
  function fmt(n, digits) {
    if (n == null || !isFinite(n)) return '—';
    var a = Math.abs(n), d = digits != null ? digits : a >= 1000 ? 0 : a >= 100 ? 1 : a >= 10 ? 1 : a >= 1 ? 2 : a >= 0.01 ? 3 : 4;
    return n.toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: 0 });
  }

  /* ---------- Table of contents + scroll spy + reading bar ---------- */
  function toc() {
    var ol = $('toc');
    if (!ol) return;
    var items = [];
    document.querySelectorAll('.lesson-main > [id]').forEach(function (s) {
      if (s.hidden) return;
      var label = s.getAttribute('data-toc');
      if (!label) {
        if (!s.classList.contains('lesson-section')) return;
        var h = s.querySelector('h2');
        if (!h) return;
        var c = h.cloneNode(true), n = c.querySelector('.num');
        if (n) n.remove();
        label = c.textContent.trim();
      }
      items.push([s.id, label, s.classList.contains('lesson-block') || s.classList.contains('key-numbers')]);
    });
    var sep = false;
    ol.innerHTML = items.map(function (it) {
      var cls = it[2] && !sep ? ' class="toc-sep"' : '';
      if (it[2]) sep = true;
      return '<li' + cls + '><a href="#' + it[0] + '">' + esc(it[1]) + '</a></li>';
    }).join('');
    var links = [].slice.call(ol.querySelectorAll('a'));
    if (!('IntersectionObserver' in global)) return;
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var first = null;
      for (var i = 0; i < items.length; i++) if (visible[items[i][0]]) { first = items[i][0]; break; }
      if (!first) return;
      links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + first); });
    }, { rootMargin: '-120px 0px -55% 0px' });
    items.forEach(function (it) { var n = $(it[0]); if (n) io.observe(n); });
  }
  function readBar() {
    var bar = $('readBar'), main = $('lesson');
    if (!bar || !main) return;
    var ticking = false;
    function update() {
      ticking = false;
      var r = main.getBoundingClientRect(), total = r.height - global.innerHeight * 0.6;
      var p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      bar.style.width = (p * 100).toFixed(1) + '%';
    }
    global.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Key terms from the glossary ---------- */
  function keyTerms() {
    var box = $('keyTerms'), block = $('terms'), tag = global.DEEP_TAG;
    if (!box || !block) return;
    var list = (global.LW_GLOSSARY || []).filter(function (g) { return String(g[2] || '').split(/\s+/).indexOf(tag) !== -1; })
      .sort(function (a, b) { return a[0].toLowerCase() < b[0].toLowerCase() ? -1 : 1; });
    if (!list.length) { block.hidden = true; return; }
    var dl = LW.el('dl', 'kt-list');
    list.forEach(function (g) {
      var item = LW.el('div', 'kt-item');
      item.appendChild(LW.el('dt', null, g[0]));
      item.appendChild(LW.el('dd', null, g[1]));
      dl.appendChild(item);
    });
    box.appendChild(dl);
    var SHOW = 10;
    if (list.length > SHOW) {
      box.classList.add('collapsed');
      dl.id = 'ktList';
      var more = LW.el('button', 'btn btn-soft btn-sm kt-more', 'Show all ' + list.length + ' terms');
      more.type = 'button';
      more.setAttribute('aria-expanded', 'false');
      more.setAttribute('aria-controls', 'ktList');
      more.addEventListener('click', function () {
        var open = box.classList.toggle('collapsed') === false;
        more.setAttribute('aria-expanded', open ? 'true' : 'false');
        more.textContent = open ? 'Show fewer terms' : 'Show all ' + list.length + ' terms';
        if (!open) block.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
      });
      box.appendChild(more);
    }
  }

  /* ---------- Check yourself ---------- */
  var check = null;
  function record(ok) {
    var all = S.get('lw_deep_stats', {});
    if (!all || typeof all !== 'object') all = {};
    var s = all[global.DEEP_TAG] || {};
    s.n = (+s.n || 0) + 1; s.c = (+s.c || 0) + (ok ? 1 : 0);
    all[global.DEEP_TAG] = s;
    S.set('lw_deep_stats', all);
  }
  function startCheck() {
    var bank = global.DEEP_QUIZ || [];
    if (!bank.length || !$('checkQuiz')) { if ($('check')) $('check').hidden = true; return; }
    check = { qs: shuffle(bank).slice(0, 5), i: 0, correct: 0 };
    renderCheck();
  }
  function renderCheck() {
    var box = $('checkQuiz'), q = check.qs[check.i];
    var order = [0, 1, 2, 3].slice(0, q.choices.length);
    if (!q.choices.some(function (c) { return /\b(above|both|none)\b/i.test(c); })) order = shuffle(order);
    box.innerHTML = '<div class="q-head"><span class="q-count">Question ' + (check.i + 1) + ' of ' + check.qs.length + '</span><span class="q-score">' + check.correct + ' correct</span></div>' +
      '<div class="meter thin" aria-hidden="true"><i style="width:' + (check.i / check.qs.length * 100) + '%"></i></div>' +
      '<h3 class="q-text" tabindex="-1"></h3><div class="q-choices" role="group" aria-label="Answer choices"></div>' +
      '<div class="feedback" aria-live="polite"></div><div class="q-actions"><button class="btn btn-primary" type="button" hidden>Next question</button></div>';
    box.querySelector('.q-text').textContent = q.q;
    var wrap = box.querySelector('.q-choices'), fb = box.querySelector('.feedback'), next = box.querySelector('.q-actions .btn');
    order.forEach(function (ci, n) {
      var b = LW.el('button', 'choice');
      b.type = 'button';
      b.innerHTML = '<span class="key" aria-hidden="true">' + 'ABCD'[n] + '</span><span class="txt"></span>';
      b.querySelector('.txt').textContent = q.choices[ci];
      b.addEventListener('click', function () {
        var ok = ci === q.correct;
        wrap.querySelectorAll('.choice').forEach(function (x, k) {
          x.disabled = true;
          if (order[k] === q.correct) x.classList.add('correct'); else if (x === b) x.classList.add('wrong'); else x.classList.add('dim');
        });
        if (ok) check.correct++;
        record(ok);
        fb.className = 'feedback show ' + (ok ? 'good' : 'bad');
        fb.innerHTML = '<strong>' + (ok ? 'Correct.' : 'Not quite. The answer is “' + esc(q.choices[q.correct]) + '.”') + '</strong><span></span>';
        fb.querySelector('span').textContent = q.explain;
        box.querySelector('.q-score').textContent = check.correct + ' correct';
        next.hidden = false;
        next.textContent = check.i === check.qs.length - 1 ? 'See my score' : 'Next question';
        next.focus({ preventScroll: true });
      });
      wrap.appendChild(b);
    });
    next.addEventListener('click', function () {
      check.i++;
      if (check.i >= check.qs.length) doneCheck(); else { renderCheck(); box.querySelector('.q-text').focus({ preventScroll: true }); }
    });
  }
  function doneCheck() {
    var n = check.qs.length, c = check.correct, box = $('checkQuiz');
    var msg = c === n ? 'Perfect score.' : c >= 4 ? 'Strong. Review the one you missed and you’re set.' : c >= 3 ? 'Getting there. Skim the sections again, then try another set.' : 'Worth another read. Go back through the sections, then try again.';
    box.innerHTML = '<div class="check-done"><div class="cd-score"><b>' + c + '/' + n + '</b><span>correct</span></div><div><p>' + esc(msg) + '</p>' +
      '<div class="result-actions"><button class="btn btn-primary" type="button" id="checkAgain">Try 5 more</button></div></div></div>';
    $('checkAgain').addEventListener('click', startCheck);
  }

  /* ---------- Greg ---------- */
  var chat = null;
  function greg() {
    if (!global.GregAdultUI) return;
    GregAdultUI.fillAvatars();
    chat = GregAdultUI.mount($('deepChat'), {
      intro: global.DEEP_INTRO || "Ask me anything on this page. I can also work formulas with your numbers, define glossary terms, or search EPA, NRWA, and MsRWA.",
      chips: global.DEEP_PROMPTS || [],
      placeholder: 'Ask Greg…'
    });
  }
  /* Any [data-ask="question"] button sends that question to Greg */
  function askGreg(q) {
    if (!chat || !q) return;
    var ask = $('ask');
    if (ask) ask.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
    chat.ask(q);
  }

  global.DEEP = { $: $, esc: esc, fmt: fmt, shuffle: shuffle, askGreg: askGreg, reduceMotion: reduceMotion };

  document.addEventListener('DOMContentLoaded', function () {
    keyTerms();
    toc();
    readBar();
    greg();
    startCheck();
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ask]');
      if (!b) return;
      e.preventDefault();
      askGreg(b.getAttribute('data-ask'));
    });
    if (reduceMotion) document.documentElement.style.scrollBehavior = 'auto';
  });
})(window);
