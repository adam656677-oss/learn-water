/* ==========================================================
   LearnWater — Kids Corner shared helpers
   Animated backdrop, flip cards, small utilities
   ========================================================== */

/* Build the animated background: bubbles, drifting lab icons, light rays */
function buildBackdrop() {
  var backdrop = document.getElementById('labBackdrop');
  if (!backdrop) return;

  var html = '';

  /* Light rays */
  var rayPositions = [12, 38, 64, 86];
  rayPositions.forEach(function (left, i) {
    html += '<div class="ray" style="left:' + left + '%;animation-duration:' + (9 + i * 2) + 's;animation-delay:' + (i * 0.8) + 's;"></div>';
  });

  /* Rising bubbles */
  for (var i = 0; i < 26; i++) {
    var size = 8 + Math.random() * 30;
    var left = Math.random() * 100;
    var dur = 9 + Math.random() * 14;
    var delay = Math.random() * 14;
    html += '<div class="bub" style="left:' + left.toFixed(1) + '%;width:' + size.toFixed(0) + 'px;height:' + size.toFixed(0) +
            'px;animation-duration:' + dur.toFixed(1) + 's;animation-delay:' + delay.toFixed(1) + 's;"></div>';
  }

  /* Drifting lab / water icons */
  var icons = ['🔬', '🧪', '💧', '🐟', '🥽', '🌊', '🧫', '🐠', '📐', '🔭', '💦', '🦑'];
  icons.forEach(function (icon, i) {
    var top = 6 + Math.random() * 82;
    var dur = 32 + Math.random() * 40;
    var delay = Math.random() * 30;
    var size = 1.6 + Math.random() * 1.8;
    html += '<div class="drifter" style="top:' + top.toFixed(1) + '%;font-size:' + size.toFixed(1) +
            'rem;animation-duration:' + dur.toFixed(0) + 's;animation-delay:' + delay.toFixed(0) + 's;">' + icon + '</div>';
  });

  backdrop.innerHTML = html;
}

/* Build tap-to-reveal flip fact cards into a container */
function buildFlipCards(containerId, facts) {
  var grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = '';
  shuffle(facts).forEach(function (fact) {
    var card = document.createElement('div');
    card.className = 'fact-flip';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.innerHTML =
      '<div class="fact-flip-inner">' +
      '<div class="fact-front">' + fact.front + '</div>' +
      '<div class="fact-back">' + fact.back + '</div>' +
      '</div>';
    function flip() { card.classList.toggle('open'); }
    card.addEventListener('click', flip);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
    });
    grid.appendChild(card);
  });
}

/* Fisher-Yates shuffle returning a new array */
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

/* Clamp helper */
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

/* Mobile nav toggle (shared) */
function toggleNav() {
  var links = document.getElementById('navLinks');
  if (links) links.classList.toggle('open');
}
