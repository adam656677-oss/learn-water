/* ==========================================================
   Game Lab — arcade menu + shared game helpers
   Each game file calls Games.register(id, { init, show, hide }).
   Only the chosen game is visible; hidden games pause.
   ========================================================== */
var Games = (function () {
  var list = {}, order = [], current = null, started = {};
  var BEST_KEY = 'lw_game_bests';
  var bests = LW.store.get(BEST_KEY, {});

  function register(id, game) { list[id] = game; order.push(id); }

  /* Save a best score. `lower` = smaller is better (times, moves). */
  function best(id, value, lower) {
    var prev = bests[id];
    var better = prev == null || (lower ? value < prev : value > prev);
    if (better) { bests[id] = value; LW.store.set(BEST_KEY, bests); }
    renderBest(id);
    return better;
  }
  function getBest(id) { return bests[id]; }
  function renderBest(id) {
    var card = document.querySelector('.arcade-card[data-game="' + id + '"] .a-best');
    var g = list[id];
    if (!card || !g) return;
    var v = bests[id];
    card.textContent = v == null ? '' : '⭐ Best: ' + (g.formatBest ? g.formatBest(v) : v);
  }

  /* A game reached an ending → Game Player badge */
  function finished() { KidsBadges.earn('game'); }

  function show(id, scroll) {
    if (!list[id]) id = order[0];
    if (current && current !== id && list[current].hide) list[current].hide();
    document.querySelectorAll('.game-section').forEach(function (s) { s.classList.toggle('active', s.dataset.game === id); });
    document.querySelectorAll('.arcade-card').forEach(function (c) { c.setAttribute('aria-pressed', c.dataset.game === id ? 'true' : 'false'); });
    current = id;
    if (!started[id]) { started[id] = true; if (list[id].init) list[id].init(); }
    if (list[id].show) list[id].show();
    if (scroll) {
      var sec = document.querySelector('.game-section[data-game="' + id + '"]');
      if (sec) sec.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }

  function initMenu() {
    document.querySelectorAll('.arcade-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var id = card.dataset.game;
        if (history.replaceState) history.replaceState(null, '', '#' + id);
        show(id, true);
      });
    });
    document.querySelectorAll('[data-back-to-menu]').forEach(function (b) {
      b.addEventListener('click', function () {
        document.getElementById('arcade').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    });
    order.forEach(renderBest);
    var fromHash = (location.hash || '').replace('#', '').replace(/^g-/, '');
    show(list[fromHash] ? fromHash : order[0], !!list[fromHash]);
    window.addEventListener('hashchange', function () {
      var h = location.hash.replace('#', '');
      if (list[h]) show(h, true);
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden && current && list[current].hide) list[current].hide();
    });
  }

  return { register: register, show: show, initMenu: initMenu, best: best, getBest: getBest, finished: finished };
})();

/* Small DOM helpers shared by the games */
function $id(id) { return document.getElementById(id); }
function setFeedback(el, text, good) {
  if (typeof el === 'string') el = $id(el);
  if (!el) return;
  el.textContent = text;
  el.className = 'game-feedback' + (good === true ? ' good' : good === false ? ' bad' : '');
}
