/* ==========================================================
   LearnWater — Kids Corner shared helpers
   Backdrop, flip cards, badges (shared by every kids page),
   toasts, confetti, small utilities. Needs js/site.js first.
   ========================================================== */

/* ---------- Utilities ---------- */
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
var prefersReducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

/* ---------- Animated backdrop (light: 10 bubbles, 5 drifters) ---------- */
function buildBackdrop() {
  var backdrop = document.getElementById('labBackdrop');
  if (!backdrop || prefersReducedMotion) return;
  var html = '';
  for (var i = 0; i < 10; i++) {
    var size = 10 + Math.random() * 26;
    html += '<div class="bub" style="left:' + (Math.random() * 100).toFixed(1) + '%;width:' + size.toFixed(0) +
      'px;height:' + size.toFixed(0) + 'px;animation-duration:' + (12 + Math.random() * 14).toFixed(1) +
      's;animation-delay:' + (Math.random() * 14).toFixed(1) + 's"></div>';
  }
  ['💧', '🔬', '🐟', '🧪', '🌊'].forEach(function (icon) {
    html += '<div class="drifter" style="top:' + (8 + Math.random() * 80).toFixed(1) + '%;animation-duration:' +
      (40 + Math.random() * 40).toFixed(0) + 's;animation-delay:' + (Math.random() * 30).toFixed(0) + 's">' + icon + '</div>';
  });
  backdrop.innerHTML = html;
}


/* ---------- Hero decorations: blueprint doodles + rising bubbles ---------- */
function buildHeroDecor() {
  var hero = document.querySelector('.lab-hero');
  if (!hero || prefersReducedMotion || hero.querySelector('.hero-decor')) return;
  var ICONS = {
    drop: '<svg viewBox="0 0 64 64"><path d="M32 6C32 6 12 30 12 42a20 20 0 0 0 40 0C52 30 32 6 32 6Z"/><path d="M23 42a9 9 0 0 0 9 9"/></svg>',
    beaker: '<svg viewBox="0 0 64 64"><path d="M20 6h24M26 6v16L10 50a6 6 0 0 0 5 9h34a6 6 0 0 0 5-9L38 22V6"/><path d="M17 42h30"/><circle cx="28" cy="50" r="2"/><circle cx="38" cy="47" r="1.5"/></svg>',
    cloud: '<svg viewBox="0 0 64 64"><path d="M19 42a10 10 0 0 1-1-20 14 14 0 0 1 27-4 9 9 0 0 1 4 24Z"/><path d="M22 50l-3 7M34 50l-3 7M46 50l-3 7"/></svg>',
    molecule: '<svg viewBox="0 0 64 64"><circle cx="32" cy="24" r="11"/><circle cx="13" cy="44" r="7"/><circle cx="51" cy="44" r="7"/><path d="M24 32l-6 6M40 32l6 6"/></svg>',
    flask: '<svg viewBox="0 0 64 64"><path d="M25 6h14M28 6v16L12 50a6 6 0 0 0 5 8h30a6 6 0 0 0 5-8L36 22V6"/><path d="M19 44h26"/></svg>',
    magnifier: '<svg viewBox="0 0 64 64"><circle cx="27" cy="27" r="17"/><path d="M39 39l18 18"/></svg>',
    bubbles: '<svg viewBox="0 0 64 64"><circle cx="20" cy="40" r="12"/><circle cx="44" cy="22" r="9"/><circle cx="46" cy="48" r="5"/></svg>',
    fish: '<svg viewBox="0 0 64 64"><path d="M8 32c10-14 30-14 42 0-12 14-32 14-42 0Z"/><path d="M50 32l8-8v16Z"/><circle cx="20" cy="30" r="2"/></svg>',
    ruler: '<svg viewBox="0 0 64 64"><rect x="6" y="24" width="52" height="16" rx="3"/><path d="M16 24v6M26 24v9M36 24v6M46 24v9"/></svg>',
    sun: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="11"/><path d="M32 8v7M32 49v7M8 32h7M49 32h7M15 15l5 5M44 44l5 5M49 15l-5 5M20 44l-5 5"/></svg>'
  };
  var spots = [
    { k: 'drop', x: 5, y: 16, s: 54, r: -12, t: 9 },
    { k: 'beaker', x: 13, y: 60, s: 64, r: 8, t: 11, wide: true },
    { k: 'cloud', x: 24, y: 6, s: 72, r: 0, t: 10, wide: true },
    { k: 'sun', x: 90, y: 10, s: 64, r: 0, t: 12 },
    { k: 'molecule', x: 80, y: 22, s: 56, r: 14, t: 9, wide: true },
    { k: 'flask', x: 92, y: 60, s: 58, r: -8, t: 10 },
    { k: 'magnifier', x: 72, y: 74, s: 48, r: 22, t: 11, wide: true },
    { k: 'bubbles', x: 36, y: 86, s: 44, r: 0, t: 8, wide: true },
    { k: 'fish', x: 56, y: 3, s: 54, r: -6, t: 13, wide: true },
    { k: 'ruler', x: 4, y: 84, s: 60, r: -18, t: 12, wide: true }
  ];
  var html = '';
  spots.forEach(function (d, i) {
    html += '<span class="doodle' + (d.wide ? ' wide' : '') + '" style="left:' + d.x + '%;top:' + d.y + '%;--s:' + d.s + 'px;--r:' + d.r + 'deg;--t:' + d.t + 's;--d:-' + (i * 1.3).toFixed(1) + 's">' + ICONS[d.k] + '</span>';
  });
  for (var b = 0; b < 8; b++) {
    var size = 8 + Math.random() * 16;
    html += '<span class="hbub" style="left:' + (4 + Math.random() * 92).toFixed(1) + '%;width:' + size.toFixed(0) + 'px;height:' + size.toFixed(0) +
      'px;--t:' + (9 + Math.random() * 8).toFixed(1) + 's;--d:-' + (Math.random() * 14).toFixed(1) + 's"></span>';
  }
  var layer = document.createElement('div');
  layer.className = 'hero-decor';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = html;
  hero.insertBefore(layer, hero.firstChild);
}

/* ---------- Tap-to-flip fact cards ---------- */
function buildFlipCards(containerId, facts) {
  var grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = '';
  shuffle(facts).forEach(function (fact) {
    var card = document.createElement('div');
    card.className = 'fact-flip';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'Flip card: ' + fact.front);
    card.innerHTML = '<div class="fact-flip-inner"><div class="fact-front"></div><div class="fact-back"></div></div>';
    card.querySelector('.fact-front').textContent = fact.front;
    card.querySelector('.fact-back').textContent = fact.back;
    function flip() { card.classList.toggle('open'); }
    card.addEventListener('click', flip);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
    });
    grid.appendChild(card);
  });
}

/* ---------- Confetti ---------- */
function launchConfetti() {
  if (prefersReducedMotion) return;
  var canvas = document.getElementById('confetti-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    document.body.appendChild(canvas);
  }
  canvas.style.display = 'block';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext('2d');
  var colors = ['#ffbe2e', '#25bdea', '#7ed957', '#ff7a6b', '#6c4fd8'];
  var pieces = [];
  for (var i = 0; i < 90; i++) {
    pieces.push({ x: Math.random() * canvas.width, y: Math.random() * -canvas.height * 0.4, r: 5 + Math.random() * 7,
      c: colors[i % colors.length], s: 2 + Math.random() * 3.5, rot: Math.random() * 360, spin: Math.random() * 8 - 4, drift: Math.random() * 2 - 1 });
  }
  var frame = 0;
  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(function (p) {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 3, p.r, p.r * 0.66); ctx.restore();
      p.y += p.s; p.x += p.drift; p.rot += p.spin;
    });
    if (++frame < 150) requestAnimationFrame(draw);
    else { ctx.clearRect(0, 0, canvas.width, canvas.height); canvas.style.display = 'none'; }
  })();
}

/* ---------- Toasts ---------- */
function kidsToast(icon, title, text) {
  var wrap = document.querySelector('.k-toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'k-toast-wrap';
    wrap.setAttribute('role', 'status');
    wrap.setAttribute('aria-live', 'polite');
    document.body.appendChild(wrap);
  }
  var t = document.createElement('div');
  t.className = 'k-toast';
  t.innerHTML = '<span class="t-icon" aria-hidden="true"></span><div><strong class="t-title"></strong><span class="t-text"></span></div>';
  t.querySelector('.t-icon').textContent = icon;
  t.querySelector('.t-title').textContent = title;
  t.querySelector('.t-text').textContent = text || '';
  wrap.appendChild(t);
  setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 320); }, 3800);
}

/* ==========================================================
   BADGES — one shelf shared by every kids page
   ========================================================== */
var KidsBadges = (function () {
  var KEY = 'lw_kids_badges';
  var LIST = [
    { id: 'game',      icon: '🎮', name: 'Game Player',         how: 'Finish any game in the Game Lab' },
    { id: 'color',     icon: '🎨', name: 'Artist',              how: 'Color a picture in the Coloring Lab' },
    { id: 'quiz',      icon: '🧠', name: 'Quiz Ace',            how: 'Get 8+ right in a Quiz Lab round' },
    { id: 'learn',     icon: '🔬', name: 'Experimenter',        how: 'Do a real experiment from the Discovery Lab' },
    { id: 'streak3',   icon: '🔥', name: 'Hot Streak',          how: 'Get 3 answers right in a row' },
    { id: 'streak5',   icon: '⚡', name: 'Lightning Streak',    how: 'Get 5 answers right in a row' },
    { id: 'perfect',   icon: '🏆', name: 'Perfect!',            how: 'Get a perfect Quiz Lab round' },
    { id: 'filter',    icon: '🧫', name: 'Filter Engineer',     how: 'Build a super-clear filter and disinfect' },
    { id: 'operator',  icon: '🏭', name: 'Plant Operator',      how: 'Keep water safe 8 of 10 days in Plant Tycoon' },
    { id: 'traveler',  icon: '🌍', name: 'Water Cycle Traveler', how: "Collect all 8 stamps in Drop's Journey" },
    { id: 'leak',      icon: '🔧', name: 'Leak Stopper',        how: 'Save 300+ gallons in Leak Detective' },
    { id: 'pipes',     icon: '🚰', name: 'Pipe Pro',            how: 'Solve 3 Pipe Connect puzzles' },
    { id: 'words',     icon: '📖', name: 'Word Wizard',         how: 'Get 4 of 5 right in Word Match' },
    { id: 'scientist', icon: '🥼', name: 'Jr. Water Scientist', how: 'Earn Game Player, Artist, Quiz Ace, and Experimenter' }
  ];
  var CORE = ['game', 'color', 'quiz', 'learn'];
  var listeners = [];

  function load() {
    var s = LW.store.get(KEY, null);
    if (s && typeof s === 'object') return s;
    /* Carry over badges earned with the old Kids HQ page */
    s = {};
    var old = LW.store.get('kidsEarned', []);
    if (Array.isArray(old)) old.forEach(function (id) { if (byId(id)) s[id] = Date.now(); });
    LW.store.set(KEY, s);
    return s;
  }
  function byId(id) { for (var i = 0; i < LIST.length; i++) if (LIST[i].id === id) return LIST[i]; return null; }
  var earned = load();

  function has(id) { return !!earned[id]; }
  function earn(id, opts) {
    var b = byId(id);
    if (!b || earned[id]) return false;
    earned[id] = Date.now();
    LW.store.set(KEY, earned);
    if (!(opts && opts.quiet)) {
      kidsToast(b.icon, 'Badge earned: ' + b.name + '!', b.how);
      launchConfetti();
    }
    listeners.forEach(function (fn) { fn(id); });
    if (id !== 'scientist' && CORE.every(has)) setTimeout(function () { earn('scientist'); }, 900);
    return true;
  }
  function count() { return LIST.filter(function (b) { return has(b.id); }).length; }
  function onChange(fn) { listeners.push(fn); }

  /* Render a badge shelf into a container */
  function renderShelf(container, meterEl, countEl) {
    if (!container) return;
    container.innerHTML = '';
    LIST.forEach(function (b) {
      var tile = document.createElement('div');
      tile.className = 'badge-tile' + (has(b.id) ? ' earned' : '');
      tile.innerHTML = '<span class="b-icon" aria-hidden="true"></span><span class="b-name"></span><span class="b-how"></span>';
      tile.querySelector('.b-icon').textContent = b.icon;
      tile.querySelector('.b-name').textContent = b.name;
      tile.querySelector('.b-how').textContent = has(b.id) ? 'Earned! 🎉' : b.how;
      tile.setAttribute('aria-label', b.name + (has(b.id) ? ' — earned' : ' — not earned yet: ' + b.how));
      container.appendChild(tile);
    });
    if (meterEl) meterEl.style.width = Math.round(count() / LIST.length * 100) + '%';
    if (countEl) countEl.textContent = count() + ' of ' + LIST.length + ' badges';
  }

  /* Streak helper used by quizzes and quick games */
  function streak(n) {
    if (n >= 3) earn('streak3');
    if (n >= 5) earn('streak5');
  }

  return { list: LIST, core: CORE, has: has, earn: earn, count: count, onChange: onChange, renderShelf: renderShelf, streak: streak };
})();

/* Keep the current Kids Corner tab visible in the scrolling tab bar on phones */
document.addEventListener('DOMContentLoaded', function () {
  buildHeroDecor();
  var cur = document.querySelector('.lab-nav [aria-current="page"]');
  if (!cur) return;
  var bar = cur.parentElement;
  if (bar.scrollWidth > bar.clientWidth) bar.scrollLeft = cur.offsetLeft - (bar.clientWidth - cur.offsetWidth) / 2;
});

/* Back-compat for older inline handlers */
function awardBadge(id) { KidsBadges.earn(id); }
