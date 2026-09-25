/* ==========================================================
   Word Lab (kids-words.html)
   Needs: site.js, kids-common.js, glossary-kids.js, kids-greg.js
   Stars are saved only on this device (localStorage lw_kids_words).
   The 🔊 buttons use a voice built into the device, and stay hidden
   when there isn't one.
   ========================================================== */
(function () {
  'use strict';

  var GROUPS = window.KIDS_WORD_GROUPS || [], S = LW.store, esc = LW.esc;
  function $(id) { return document.getElementById(id); }
  var groupBy = {};
  GROUPS.forEach(function (g) { groupBy[g.id] = g; });

  function fold(s) { return String(s).toLowerCase().replace(/₂/g, '2').replace(/[‘’]/g, "'"); }
  var list = (window.KIDS_WORDS || []).map(function (w) {
    var key = fold(w[0]);
    return { word: w[0], emoji: w[1], say: w[2], def: w[3], ex: w[4], group: w[5], key: key, fdef: fold(w[3]),
      slug: key.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') };
  }).sort(function (a, b) { return a.key < b.key ? -1 : a.key > b.key ? 1 : 0; });
  var bySlug = {};
  list.forEach(function (w) { bySlug[w.slug] = w; });

  /* How Greg gets asked: keep names like "H₂O" and "World Water Day" as they are */
  function askText(w) {
    var name = /[A-Z]/.test(w.word.slice(1)) ? w.word : w.word.charAt(0).toLowerCase() + w.word.slice(1);
    return 'What does ' + name + ' mean?';
  }

  /* ---------- Stars (words I know) ---------- */
  var KEY = 'lw_kids_words';
  var known = S.get(KEY, {});
  if (!known || typeof known !== 'object' || Array.isArray(known)) known = {};
  function isKnown(w) { return !!known[w.slug]; }
  function knownCount() { return list.filter(isKnown).length; }
  var MILESTONES = [1, 10, 25, 50, 100];
  function setKnown(w, on) {
    var before = knownCount();
    if (on) known[w.slug] = 1; else delete known[w.slug];
    S.set(KEY, known);
    var after = knownCount();
    if (after > before) {
      if (after === list.length) { kidsToast('🏆', 'You know EVERY word!', 'You are a true Word Champion!'); launchConfetti(); }
      else if (MILESTONES.indexOf(after) !== -1) kidsToast('⭐', after === 1 ? 'Your first word!' : 'You know ' + after + ' words!', after === 1 ? 'Your word collection has started.' : 'Keep collecting water words!');
    }
    syncStars(w);
    renderCollect();
    renderGroups();
  }
  /* Update every star for this word on the page without rebuilding anything */
  function syncStars(w) {
    var on = isKnown(w);
    document.querySelectorAll('[data-star="' + w.slug + '"]').forEach(function (b) { b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    var card = $('w-' + w.slug);
    if (card) card.classList.toggle('known', on);
  }

  /* ---------- Read aloud ---------- */
  var speech = (function () {
    var synth = window.speechSynthesis, voice = null;
    function pick() {
      var vs = synth.getVoices().filter(function (v) { return v.localService && /^en([-_]|$)/i.test(v.lang); });
      voice = vs.filter(function (v) { return /^en[-_]US/i.test(v.lang); })[0] || vs[0] || null;
      document.body.classList.toggle('can-speak', !!voice);
    }
    if (synth && window.SpeechSynthesisUtterance) {
      pick();
      if (synth.addEventListener) synth.addEventListener('voiceschanged', pick);
    }
    return function (text) {
      if (!voice) return;
      synth.cancel();
      var u = new SpeechSynthesisUtterance(String(text).replace(/H₂O/g, 'H 2 O'));
      u.voice = voice; u.lang = voice.lang; u.rate = 0.88;
      synth.speak(u);
    };
  })();
  function sayWord(w) { speech(w.word + '. ' + w.def); }

  /* ---------- Word of the Day ---------- */
  function dayNumber() { var d = new Date(); return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5); }
  var wotdWord = list.length ? list[(dayNumber() * 37) % list.length] : null, wotdToday = true;
  function renderWotd() {
    var w = wotdWord, g = groupBy[w.group] || {};
    $('wotd').innerHTML = '<div class="wotd-card g-' + w.group + '">' +
      '<div class="wotd-emoji" aria-hidden="true">' + w.emoji + '</div>' +
      '<div class="wotd-body"><span class="wotd-tag">' + (wotdToday ? "Today's word" : 'Surprise word') + ' · ' + g.icon + ' ' + esc(g.name) + '</span>' +
      '<h3 class="wotd-word">' + esc(w.word) + '</h3><span class="wotd-say">' + esc(w.say) + '</span>' +
      '<p class="wotd-def">' + esc(w.def) + '</p>' +
      '<p class="wotd-ex"><span class="hand">Example:</span> ' + esc(w.ex) + '</p>' +
      '<div class="wotd-actions">' +
      '<button class="lab-btn small speak-btn" type="button" data-say="' + w.slug + '">🔊 Hear it</button>' +
      '<button class="lab-btn small lime wotd-star" type="button" data-star="' + w.slug + '" aria-pressed="' + isKnown(w) + '">⭐ I know it!</button>' +
      '<button class="lab-btn small ghost" type="button" data-ask-greg="' + esc(askText(w)) + '">💬 Ask Greg</button>' +
      '<button class="lab-btn small ghost" type="button" id="wotdAnother">🎲 Surprise me</button>' +
      '</div></div></div>';
    $('wotdAnother').addEventListener('click', function () {
      var next;
      do { next = list[Math.floor(Math.random() * list.length)]; } while (list.length > 1 && next === wotdWord);
      wotdWord = next; wotdToday = false;
      renderWotd();
      $('wotdAnother').focus();
    });
  }

  /* ---------- Word Finder ---------- */
  var state = { q: '', group: 'all', letter: '' };
  function inGroup(w) { return state.group === 'all' || (state.group === 'mine' ? isKnown(w) : w.group === state.group); }
  function firstLetter(w) { return w.key.charAt(0).toUpperCase(); }
  function renderGroups() {
    function chip(id, label, n) {
      return '<button type="button" class="wg-chip' + (id === 'all' ? '' : ' g-' + id) + '" data-group="' + id + '" aria-pressed="' + (state.group === id) + '">' + label + ' <b>' + n + '</b></button>';
    }
    var html = chip('all', '🌈 All words', list.length);
    GROUPS.forEach(function (g) { html += chip(g.id, g.icon + ' ' + esc(g.name), list.filter(function (w) { return w.group === g.id; }).length); });
    html += chip('mine', '⭐ My words', knownCount());
    $('wordGroups').innerHTML = html;
  }
  function renderAZ() {
    var has = {};
    list.forEach(function (w) { if (inGroup(w)) has[firstLetter(w)] = 1; });
    if (state.letter && !has[state.letter]) state.letter = '';
    $('wordAZ').innerHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function (L) {
      return '<button type="button" data-letter="' + L + '" aria-pressed="' + (state.letter === L) + '"' + (has[L] ? '' : ' disabled') +
        ' aria-label="Words that start with ' + L + '">' + L + '</button>';
    }).join('');
  }
  function cardHTML(w) {
    var g = groupBy[w.group] || {};
    return '<article class="word-card g-' + w.group + (isKnown(w) ? ' known' : '') + '" id="w-' + w.slug + '">' +
      '<div class="wc-top"><span class="wc-emoji" aria-hidden="true">' + w.emoji + '</span>' +
      '<div class="wc-head"><h3 class="wc-word">' + esc(w.word) + '</h3><span class="wc-say">' + esc(w.say) + '</span></div>' +
      '<button class="wc-star" type="button" data-star="' + w.slug + '" aria-pressed="' + isKnown(w) + '" aria-label="I know the word ' + esc(w.word) + '" title="I know it!">⭐</button></div>' +
      '<p class="wc-def">' + esc(w.def) + '</p>' +
      '<p class="wc-ex"><span class="hand">Example:</span> ' + esc(w.ex) + '</p>' +
      '<div class="wc-actions"><span class="wc-group">' + g.icon + ' ' + esc(g.name) + '</span>' +
      '<button class="wc-btn speak-btn" type="button" data-say="' + w.slug + '" aria-label="Hear ' + esc(w.word) + '">🔊</button>' +
      '<button class="wc-btn" type="button" data-ask-greg="' + esc(askText(w)) + '">💬 Ask Greg</button></div>' +
      '</article>';
  }
  function render() {
    renderAZ();
    var q = fold(state.q.trim()), shown = list.filter(function (w) { return inGroup(w) && (!state.letter || firstLetter(w) === state.letter); });
    if (q) {
      var top = [], rest = [];
      shown.forEach(function (w) {
        if (w.key.indexOf(q) !== -1) top.push(w);
        else if (q.length >= 3 && w.fdef.indexOf(q) !== -1) rest.push(w);
      });
      top.sort(function (a, b) { return (a.key.indexOf(q) === 0 ? 0 : 1) - (b.key.indexOf(q) === 0 ? 0 : 1); });
      shown = top.concat(rest);
    }
    var where = state.group === 'all' ? '' : state.group === 'mine' ? ' in My words' : ' in ' + groupBy[state.group].name;
    var letter = state.letter ? ' that start with ' + state.letter : '';
    var count = $('wordCount');
    if (q) count.textContent = shown.length ? shown.length + (shown.length === 1 ? ' word matches' : ' words match') + ' “' + state.q.trim() + '”' + where + letter + '.' : '';
    else count.textContent = 'Showing ' + shown.length + (shown.length === 1 ? ' word' : ' words') + where + letter + '.';
    var grid = $('wordGrid');
    if (shown.length) { grid.innerHTML = shown.map(cardHTML).join(''); return; }
    if (state.group === 'mine' && !q && !state.letter) {
      grid.innerHTML = '<div class="word-empty"><span aria-hidden="true">⭐</span><p>You haven\'t starred any words yet. Tap the ⭐ on a word you know to add it here!</p></div>';
      return;
    }
    grid.innerHTML = '<div class="word-empty"><span aria-hidden="true">🤔</span><p>Hmm, no words found' + (q ? ' for “' + esc(state.q.trim()) + '”' : '') + '. Try a different word' +
      (q ? ', or ask Greg!' : '.') + '</p>' + (q ? '<button class="lab-btn small amber" type="button" data-ask-greg="' + esc('What is ' + state.q.trim() + '?') + '">💬 Ask Greg</button>' : '') + '</div>';
    count.textContent = 'No words found.';
  }

  /* ---------- My collection ---------- */
  function renderCollect() {
    var n = knownCount(), total = list.length;
    $('knownText').textContent = '⭐ You know ' + n + ' of ' + total + ' words';
    $('knownMeter').style.width = (total ? Math.round(n / total * 100) : 0) + '%';
    $('knownCheer').textContent = n === 0 ? 'Tap the ⭐ on a word you know to start your collection!'
      : n < 10 ? 'Great start! Keep collecting water words.'
      : n < 25 ? 'Word Explorer! You know ' + n + ' water words.'
      : n < 50 ? 'Word Detective! That is a LOT of water words.'
      : n < 100 ? 'Word Scientist! You really know your water words.'
      : n < total ? 'Word Champion! You are almost done!'
      : 'WOW! You know every word in the Word Lab! 🏆';
  }

  /* ---------- Word Match game ---------- */
  var match = null;
  var CHEERS = ['Yes! You got it!', 'Super scientist!', 'That\'s right!', 'Awesome!', 'Nailed it!'];
  function pickOne(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function choicesFor(w) {
    var used = [w.emoji], out = [w];
    [shuffle(list.filter(function (x) { return x.group === w.group; })), shuffle(list.filter(function (x) { return x.group !== w.group; }))].forEach(function (pool) {
      for (var i = 0; i < pool.length; i++) if (out.indexOf(pool[i]) === -1 && used.indexOf(pool[i].emoji) === -1) { out.push(pool[i]); used.push(pool[i].emoji); break; }
    });
    return shuffle(out);
  }
  function clueFor(w) {
    var re = new RegExp('\\b' + w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'ig');
    return w.def.replace(re, '_____');
  }
  function startMatch(mode) {
    var pool = mode === 'mine' ? list.filter(isKnown) : list;
    if (pool.length < 5) { $('matchMineNote').hidden = false; return; }
    match = { items: shuffle(pool).slice(0, 5).map(function (w) { return { w: w, choices: choicesFor(w), ok: null }; }), i: 0, score: 0, streak: 0 };
    $('matchStart').hidden = true; $('matchDone').hidden = true; $('matchPlay').hidden = false;
    renderClue();
  }
  function renderClue() {
    var it = match.items[match.i];
    $('matchRound').textContent = 'Clue ' + (match.i + 1) + ' of ' + match.items.length;
    $('matchScore').textContent = match.score + ' right';
    $('matchStreak').hidden = match.streak < 2;
    $('matchStreak').textContent = '🔥 ' + match.streak + ' in a row';
    var clue = $('matchClue');
    clue.textContent = clueFor(it.w);
    $('matchFeedback').textContent = ''; $('matchFeedback').className = 'game-feedback';
    $('matchNext').hidden = true;
    $('matchChoices').innerHTML = it.choices.map(function (c) {
      return '<button class="match-choice" type="button" data-pick="' + c.slug + '"><span class="mch-emoji" aria-hidden="true">' + c.emoji + '</span><span>' + esc(c.word) + '</span></button>';
    }).join('');
    clue.setAttribute('tabindex', '-1');
    clue.focus({ preventScroll: true });
  }
  function pick(slug) {
    var it = match.items[match.i];
    if (it.ok !== null) return;
    it.ok = slug === it.w.slug;
    document.querySelectorAll('#matchChoices .match-choice').forEach(function (b) {
      b.disabled = true;
      if (b.dataset.pick === it.w.slug) b.classList.add('correct');
      else if (b.dataset.pick === slug) b.classList.add('wrong');
    });
    var fb = $('matchFeedback');
    if (it.ok) {
      match.score++; match.streak++;
      KidsBadges.streak(match.streak);
      fb.className = 'game-feedback good';
      fb.textContent = '✅ ' + pickOne(CHEERS) + ' It\'s “' + it.w.word + '.”';
    } else {
      match.streak = 0;
      fb.className = 'game-feedback bad';
      fb.textContent = 'Not quite! The answer is “' + it.w.word + '.”';
    }
    $('matchScore').textContent = match.score + ' right';
    $('matchStreak').hidden = match.streak < 2;
    $('matchStreak').textContent = '🔥 ' + match.streak + ' in a row';
    var nx = $('matchNext');
    nx.textContent = match.i === match.items.length - 1 ? 'See my score 🏁' : 'Next clue ➜';
    nx.hidden = false;
    nx.focus({ preventScroll: true });
  }
  function nextClue() {
    match.i++;
    if (match.i < match.items.length) { renderClue(); return; }
    var n = match.items.length, s = match.score;
    var big = s === n ? '🏆' : s >= 4 ? '🌟' : s >= 2 ? '💪' : '📖';
    var msg = s === n ? 'PERFECT! You matched every word!' : s >= 4 ? 'Awesome matching!' : s >= 2 ? 'Nice try! Keep practicing.' : 'Good start! Read a few words and try again.';
    var badge = s >= 4 && KidsBadges.earn('words');
    var right = match.items.filter(function (x) { return x.ok && !isKnown(x.w); });
    $('matchPlay').hidden = true;
    var done = $('matchDone');
    done.hidden = false;
    done.innerHTML = '<div class="match-result"><span class="match-big" aria-hidden="true">' + big + '</span>' +
      '<h3 tabindex="-1">You matched ' + s + ' of ' + n + '!</h3><p>' + esc(msg) + (s >= 4 ? (badge ? ' You earned the <strong>Word Wizard</strong> badge! 📖' : ' Word Wizard power! 📖') : ' Get 4 right to earn the Word Wizard badge.') + '</p>' +
      '<ul class="match-review">' + match.items.map(function (x) {
        return '<li class="' + (x.ok ? 'ok' : 'miss') + '"><span aria-hidden="true">' + (x.ok ? '✅' : '❌') + '</span><div><b>' + x.w.emoji + ' ' + esc(x.w.word) + '</b> ' + esc(x.w.def) + '</div></li>';
      }).join('') + '</ul>' +
      '<div class="btn-row">' +
      (right.length ? '<button class="lab-btn small lime" type="button" id="matchStarRight">⭐ Add the ' + right.length + ' I got right to my words</button>' : '') +
      '<button class="lab-btn amber" type="button" data-match-start="all">🔁 Play again</button>' +
      '<button class="lab-btn ghost" type="button" data-match-start="mine">⭐ Play with my words</button></div></div>';
    if (right.length) $('matchStarRight').addEventListener('click', function () {
      right.forEach(function (x) { if (!isKnown(x.w)) setKnown(x.w, true); });
      this.disabled = true;
      this.textContent = '⭐ Added to my words!';
    });
    done.querySelector('h3').focus({ preventScroll: false });
    match = null;
  }

  /* ---------- Wire it up ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    if (!list.length) return;
    buildBackdrop();
    $('wordTotal').textContent = list.length;
    renderWotd();
    renderGroups();
    renderCollect();
    render();

    var timer = 0;
    $('wordQuery').addEventListener('input', function () {
      var v = this.value;
      clearTimeout(timer);
      timer = setTimeout(function () { state.q = v; render(); }, 120);
    });
    $('wordGroups').addEventListener('click', function (e) {
      var b = e.target.closest('[data-group]');
      if (!b) return;
      state.group = b.dataset.group;
      renderGroups(); render();
      var again = document.querySelector('#wordGroups [data-group="' + state.group + '"]');
      if (again) again.focus();
    });
    $('wordAZ').addEventListener('click', function (e) {
      var b = e.target.closest('[data-letter]');
      if (!b || b.disabled) return;
      state.letter = state.letter === b.dataset.letter ? '' : b.dataset.letter;
      render();
      var again = document.querySelector('#wordAZ [data-letter="' + b.dataset.letter + '"]');
      if (again) again.focus();
    });
    /* Stars and read-aloud buttons anywhere on the page */
    document.addEventListener('click', function (e) {
      var star = e.target.closest('[data-star]'), say = e.target.closest('[data-say]'), go = e.target.closest('[data-match-start]');
      if (star && bySlug[star.dataset.star]) { var w = bySlug[star.dataset.star]; setKnown(w, !isKnown(w)); }
      else if (say && bySlug[say.dataset.say]) sayWord(bySlug[say.dataset.say]);
      else if (go) startMatch(go.dataset.matchStart);
    });
    $('matchChoices').addEventListener('click', function (e) {
      var b = e.target.closest('[data-pick]');
      if (b && match) pick(b.dataset.pick);
    });
    $('matchNext').addEventListener('click', function () { if (match) nextClue(); });
    $('matchSay').addEventListener('click', function () { if (match) speech('Clue: ' + $('matchClue').textContent.replace(/_+/g, 'blank')); });
    $('printWords').addEventListener('click', function () {
      document.body.classList.add('print-words');
      window.print();
    });
    window.addEventListener('afterprint', function () { document.body.classList.remove('print-words'); });
  });
})();
