/* ==========================================================
   LearnWater — lesson page behavior (every lessons/*.html)
   Each page sets LESSON_ID (e.g. "ch1") and LESSON_PROMPTS,
   then loads site.js, greg-engine.js, greg-adult-kb.js,
   greg-adult-ui.js, video-library.js, adult-curriculum.js.
   Progress is shared with the Adult Learning Center through
   localStorage: lw_lessonDone and lw_chapter_stats.
   ========================================================== */
(function () {
  'use strict';

  var CUR = window.LW_CURRICULUM, S = LW.store, esc = LW.esc;
  var id = window.LESSON_ID, ch = CUR && CUR.chapters[id];
  if (!ch) return;
  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function $(x) { return document.getElementById(x); }
  function obj(v) { return v && typeof v === 'object' && !Array.isArray(v) ? v : {}; }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function page(c) { return c.page.split('/').pop(); }

  /* Which class's chapter order to follow: the one you're studying,
     or the first class that includes this chapter */
  var cls = (function () {
    var c = S.getRaw('lw_currentClass');
    if (CUR.classes[c] && CUR.classChapters[c].indexOf(id) !== -1) return c;
    var order = ['D', 'C', 'B', 'A'];
    for (var i = 0; i < order.length; i++) if (CUR.classChapters[order[i]].indexOf(id) !== -1) return order[i];
    return 'A';
  })();
  var list = CUR.classChapters[cls], pos = list.indexOf(id);

  /* ---------- Completion ---------- */
  function isDone() { return !!obj(S.get('lw_lessonDone', {}))[id]; }
  function setDone(v) {
    var d = obj(S.get('lw_lessonDone', {}));
    if (v) d[id] = true; else delete d[id];
    S.set('lw_lessonDone', d);
    paintDone();
  }
  function paintDone() {
    var done = isDone();
    document.querySelectorAll('[data-complete]').forEach(function (b) {
      b.setAttribute('aria-pressed', done ? 'true' : 'false');
      b.textContent = done ? '✓ Completed' : (b.classList.contains('toc-done') ? 'Mark complete' : 'Mark chapter complete');
    });
    var t = $('completeText'), sub = $('completeSub');
    if (t) t.textContent = done ? 'Chapter complete. Nice work.' : 'Finished this chapter?';
    if (sub) sub.textContent = done ? 'It counts toward your progress in the Learning Center. Tap again to undo.' : 'Mark it complete to update your progress.';
    var st = document.querySelector('#heroMeta .status');
    if (st) { st.textContent = done ? '✓ Completed' : 'Not completed'; st.classList.toggle('done', done); }
  }

  /* ---------- Hero meta, breadcrumb ---------- */
  function heroMeta() {
    var sections = document.querySelectorAll('.lesson-section');
    var words = 0;
    document.querySelectorAll('.lesson-section, .key-numbers, .rule-note').forEach(function (n) { words += n.textContent.split(/\s+/).length; });
    var mins = Math.max(3, Math.round(words / 170));  /* technical reading pace */
    $('heroMeta').innerHTML = '<span>' + sections.length + ' sections</span><span>About ' + mins + ' min read</span>' +
      '<span>' + ch.questions.length + ' practice questions</span><span class="status">Not completed</span>';
    var crumb = $('crumbClass');
    if (crumb) crumb.textContent = CUR.classes[cls].name + ' · chapter ' + (pos + 1) + ' of ' + list.length;
  }

  /* ---------- Table of contents + scroll spy + reading bar ---------- */
  function toc() {
    var ol = $('toc');
    if (!ol) return;
    var items = [];
    document.querySelectorAll('.lesson-section').forEach(function (s) {
      var h = s.querySelector('h2');
      var label = h.cloneNode(true);
      var n = label.querySelector('.num');
      if (n) n.remove();
      items.push([s.id, label.textContent.trim()]);
    });
    items.push(['numbers', 'Numbers to memorize', true], ['check', 'Check yourself'], ['cards', 'Flash cards'], ['ask', 'Ask Greg']);
    if (!$('videos').hidden) items.push(['videos', 'Videos']);
    ol.innerHTML = items.map(function (it) {
      return '<li' + (it[2] ? ' class="toc-sep"' : '') + '><a href="#' + it[0] + '">' + esc(it[1]) + '</a></li>';
    }).join('');
    var links = [].slice.call(ol.querySelectorAll('a'));
    if (!('IntersectionObserver' in window)) return;
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
      var r = main.getBoundingClientRect(), total = r.height - window.innerHeight * 0.6;
      var p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      bar.style.width = (p * 100).toFixed(1) + '%';
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Check yourself (5 questions) ---------- */
  var check = null;
  function record(ok) {
    var stats = obj(S.get('lw_chapter_stats', {})), s = obj(stats[id]);
    s.n = (+s.n || 0) + 1; s.c = (+s.c || 0) + (ok ? 1 : 0);
    stats[id] = s;
    S.set('lw_chapter_stats', stats);
  }
  function startCheck() {
    check = { qs: shuffle(ch.questions).slice(0, 5), i: 0, correct: 0 };
    renderCheck();
  }
  function renderCheck() {
    var box = $('checkQuiz'), q = check.qs[check.i];
    var order = [0, 1, 2, 3];
    if (!q.choices.some(function (c) { return /\babove\b/i.test(c); })) order = shuffle(order);
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
          var xi = order[k];
          if (xi === q.correct) x.classList.add('correct'); else if (x === b) x.classList.add('wrong'); else x.classList.add('dim');
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
    var msg = c === n ? 'Perfect score. You own this chapter.' : c >= 4 ? 'Strong. Review the one you missed and you’re set.' : c >= 3 ? 'Getting there. Re-read the numbers box above, then try again.' : 'Worth another read. Go back through the sections, then try again.';
    box.innerHTML = '<div class="check-done"><div class="cd-score"><b>' + c + '/' + n + '</b><span>correct</span></div><div><p>' + esc(msg) + '</p>' +
      '<div class="result-actions"><button class="btn btn-primary" type="button" id="checkAgain">Try 5 more</button>' +
      '<a class="btn btn-soft" href="../adult-learning-center.html#quiz:' + id + '">Full chapter quiz (' + ch.questions.length + ')</a></div></div></div>';
    $('checkAgain').addEventListener('click', startCheck);
  }

  /* ---------- Flash cards ---------- */
  function cards() {
    var grid = $('lessonCards');
    if (!grid) return;
    ch.cards.forEach(function (c) {
      var b = LW.el('button', 'lc-card');
      b.type = 'button';
      b.setAttribute('aria-label', c[0] + '. Press to reveal the answer.');
      b.innerHTML = '<span class="lc-inner"><span class="lc-face lc-front"></span><span class="lc-face lc-back"></span></span>';
      b.querySelector('.lc-front').textContent = c[0];
      b.querySelector('.lc-back').textContent = c[1];
      b.addEventListener('click', function () {
        var open = b.classList.toggle('flipped');
        b.setAttribute('aria-label', open ? c[0] + ': ' + c[1] : c[0] + '. Press to reveal the answer.');
      });
      grid.appendChild(b);
    });
  }

  /* ---------- Videos ---------- */
  function videos() {
    var vids = (window.LW_VIDEOS ? LW_VIDEOS.adult : []).filter(function (v) { return v.chapters.indexOf(id) !== -1; });
    if (!vids.length) return;
    $('videos').hidden = false;
    LW.renderVideos('lessonVideos', vids);
  }

  /* ---------- Previous / next chapter ---------- */
  function pager() {
    var nav = $('pager');
    if (!nav) return;
    function card(cid, dir) {
      if (!cid) return '<span></span>';
      var c = CUR.chapters[cid];
      return '<a class="pg-' + dir + '" href="' + page(c) + '" style="--c:' + c.theme.c + '"><span class="pg-dir">' + (dir === 'prev' ? '← Previous chapter' : 'Next chapter →') + '</span>' +
        '<span class="pg-title"><span aria-hidden="true">' + c.icon + '</span> Ch ' + esc(c.num) + ': ' + esc(c.title) + '</span></a>';
    }
    nav.innerHTML = card(list[pos - 1], 'prev') + card(list[pos + 1], 'next');
  }

  /* ---------- Greg ---------- */
  function greg() {
    GregAdultUI.fillAvatars();
    GregAdultUI.mount($('lessonChat'), {
      intro: 'Ask me anything about Chapter ' + ch.num + ': ' + ch.title + '. I can also work the math with your numbers, or search EPA, NRWA, and MsRWA. Just start with **search**.',
      chips: window.LESSON_PROMPTS || [],
      placeholder: 'Ask about Chapter ' + ch.num + '…'
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    videos();
    heroMeta();
    toc();
    readBar();
    cards();
    pager();
    greg();
    startCheck();
    paintDone();
    document.querySelectorAll('[data-complete]').forEach(function (b) {
      b.addEventListener('click', function () { setDone(!isDone()); });
    });
    if (reduceMotion) document.documentElement.style.scrollBehavior = 'auto';
  });
})();
