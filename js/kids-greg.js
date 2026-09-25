/* ==========================================================
   Kid Greg — chat widget for every Kids Corner page
   Needs: js/site.js, js/greg-engine.js, js/greg-kids-kb.js
   Everything runs in the browser; nothing typed is sent anywhere.
   ========================================================== */
(function () {
  'use strict';

  /* Greg: a kid scientist with goggles and a lab coat */
  var GREG_SVG =
    '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Greg the kid scientist">' +
    '<path d="M36 200 C38 172 52 154 74 148 L126 148 C148 154 162 172 164 200 Z" fill="#ffffff" stroke="#0b2a4a" stroke-width="5" stroke-linejoin="round"/>' +
    '<path d="M82 148 L100 178 L118 148 Z" fill="#25bdea" stroke="#0b2a4a" stroke-width="4" stroke-linejoin="round"/>' +
    '<path d="M74 148 L92 186 M126 148 L108 186" stroke="#0b2a4a" stroke-width="4" stroke-linecap="round" fill="none"/>' +
    '<path d="M138 164 C138 164 131 173 131 177 a7 7 0 0 0 14 0 C145 173 138 164 138 164 Z" fill="#25bdea" stroke="#0b2a4a" stroke-width="3"/>' +
    '<rect x="88" y="128" width="24" height="24" rx="6" fill="#e9b48a" stroke="#0b2a4a" stroke-width="4"/>' +
    '<circle cx="53" cy="98" r="11" fill="#e9b48a" stroke="#0b2a4a" stroke-width="4.5"/>' +
    '<circle cx="147" cy="98" r="11" fill="#e9b48a" stroke="#0b2a4a" stroke-width="4.5"/>' +
    '<circle cx="100" cy="94" r="47" fill="#e9b48a" stroke="#0b2a4a" stroke-width="5"/>' +
    '<path d="M54 86 C50 52 78 36 102 38 C128 36 152 54 146 86 C138 72 126 64 111 66 C112 58 106 54 100 58 C92 52 81 59 79 67 C68 67 60 74 54 86 Z" fill="#4a2f22" stroke="#0b2a4a" stroke-width="4" stroke-linejoin="round"/>' +
    '<path d="M97 41 C94 26 108 18 118 27 C109 28 105 34 105 41 Z" fill="#4a2f22" stroke="#0b2a4a" stroke-width="4" stroke-linejoin="round"/>' +
    '<path d="M53 80 Q100 64 147 80" stroke="#0f3b66" stroke-width="8" fill="none" stroke-linecap="round"/>' +
    '<circle cx="80" cy="73" r="14" fill="#c8f1ff" stroke="#0b2a4a" stroke-width="4.5"/>' +
    '<circle cx="120" cy="73" r="14" fill="#c8f1ff" stroke="#0b2a4a" stroke-width="4.5"/>' +
    '<path d="M94 73 L106 73" stroke="#0b2a4a" stroke-width="4.5"/>' +
    '<ellipse cx="75" cy="68" rx="4" ry="2.6" fill="#fff" transform="rotate(-30 75 68)"/>' +
    '<ellipse cx="115" cy="68" rx="4" ry="2.6" fill="#fff" transform="rotate(-30 115 68)"/>' +
    '<path d="M72 92 Q80 87 88 92 M112 92 Q120 87 128 92" stroke="#0b2a4a" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
    '<circle cx="81" cy="102" r="6.5" fill="#0b2a4a"/><circle cx="119" cy="102" r="6.5" fill="#0b2a4a"/>' +
    '<circle cx="83.5" cy="99.5" r="2.3" fill="#fff"/><circle cx="121.5" cy="99.5" r="2.3" fill="#fff"/>' +
    '<ellipse cx="68" cy="116" rx="8" ry="5" fill="#ff8f80" opacity=".55"/><ellipse cx="132" cy="116" rx="8" ry="5" fill="#ff8f80" opacity=".55"/>' +
    '<path d="M97 108 Q100 112 103 108" stroke="#0b2a4a" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<path d="M84 118 Q100 134 116 118" stroke="#0b2a4a" stroke-width="4.5" fill="#fff" stroke-linejoin="round"/>' +
    '</svg>';

  var brain = null, els = {}, opened = false, busy = false;

  function avatar() { return GREG_SVG; }

  function fillFigures() {
    document.querySelectorAll('[data-greg-figure]').forEach(function (n) { n.innerHTML = GREG_SVG; });
  }

  function addMsg(who, text) {
    var d = document.createElement('div');
    d.className = 'g-msg ' + (who === 'greg' ? 'greg' : 'kid');
    if (who === 'greg') d.innerHTML = GregEngine.format(text);
    else d.textContent = text;
    els.log.appendChild(d);
    els.log.scrollTop = els.log.scrollHeight;
  }

  function setChips(chips) {
    els.chips.innerHTML = '';
    (chips || []).slice(0, 4).forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = c;
      b.addEventListener('click', function () { send(c); });
      els.chips.appendChild(b);
    });
  }

  function send(text) {
    text = String(text || '').trim();
    if (!text || busy) return;
    addMsg('kid', text);
    els.input.value = '';
    setChips([]);
    busy = true;
    var typing = document.createElement('div');
    typing.className = 'g-typing';
    typing.innerHTML = '<i></i><i></i><i></i>';
    typing.setAttribute('aria-label', 'Greg is typing');
    els.log.appendChild(typing);
    els.log.scrollTop = els.log.scrollHeight;
    var r = brain.ask(text) || { text: "Hmm, I didn't catch that!", chips: [] };
    var delay = Math.min(1100, 380 + r.text.length * 2);
    setTimeout(function () {
      typing.remove();
      addMsg('greg', r.text);
      setChips(r.chips);
      busy = false;
    }, delay);
  }

  function open(question) {
    if (!els.panel) return;
    els.panel.classList.add('open');
    els.fab.setAttribute('aria-expanded', 'true');
    hideTip();
    if (!opened) {
      opened = true;
      var hello = document.body.dataset.gregHello ||
        "Hey! I'm **Greg**, your water science buddy! 👋 Ask me anything about water — or say **quiz me** for a quick challenge!";
      addMsg('greg', hello);
      setChips(GREG_KIDS.starterChips);
    }
    if (question) send(question);
    setTimeout(function () { els.input.focus(); }, 60);
  }
  function close() {
    els.panel.classList.remove('open');
    els.fab.setAttribute('aria-expanded', 'false');
    els.fab.focus();
  }
  function hideTip() { if (els.tip) { els.tip.remove(); els.tip = null; } }

  function build() {
    if (!window.GregEngine || !window.GREG_KIDS) return;
    brain = GREG_KIDS.create();

    var fab = document.createElement('button');
    fab.className = 'greg-fab';
    fab.type = 'button';
    fab.setAttribute('aria-label', 'Chat with Greg, your water science buddy');
    fab.setAttribute('aria-expanded', 'false');
    fab.setAttribute('aria-controls', 'gregPanel');
    fab.innerHTML = GREG_SVG;

    var panel = document.createElement('section');
    panel.className = 'greg-panel';
    panel.id = 'gregPanel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Chat with Greg');
    panel.innerHTML =
      '<div class="greg-head"><span class="g-av">' + GREG_SVG + '</span>' +
      '<div><strong>Greg</strong><small>Your water science buddy</small></div>' +
      '<button type="button" class="greg-close" aria-label="Close chat">✕</button></div>' +
      '<div class="greg-log" aria-live="polite"></div>' +
      '<div class="greg-chips"></div>' +
      '<form class="greg-input" autocomplete="off"><input type="text" maxlength="200" placeholder="Ask Greg anything…" aria-label="Ask Greg a question"><button type="submit">Send</button></form>';

    document.body.appendChild(panel);
    document.body.appendChild(fab);
    els = {
      fab: fab, panel: panel,
      log: panel.querySelector('.greg-log'),
      chips: panel.querySelector('.greg-chips'),
      input: panel.querySelector('input')
    };

    fab.addEventListener('click', function () { panel.classList.contains('open') ? close() : open(); });
    panel.querySelector('.greg-close').addEventListener('click', close);
    panel.querySelector('form').addEventListener('submit', function (e) { e.preventDefault(); send(els.input.value); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('open')) close(); });

    /* A friendly nudge once per visit */
    if (!sessionStorageGet('lw_greg_tip')) {
      setTimeout(function () {
        if (opened) return;
        var tip = document.createElement('div');
        tip.className = 'greg-fab-tip';
        tip.textContent = 'Ask me anything! 💬';
        tip.addEventListener('click', function () { open(); });
        document.body.appendChild(tip);
        els.tip = tip;
        sessionStorageSet('lw_greg_tip', '1');
        setTimeout(hideTip, 9000);
      }, 2500);
    }

    /* Any element with data-ask-greg="question" opens Greg with that question */
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-ask-greg]');
      if (t) { e.preventDefault(); open(t.getAttribute('data-ask-greg')); }
    });
  }

  function sessionStorageGet(k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } }
  function sessionStorageSet(k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  window.KidsGreg = { svg: avatar, open: open, close: close, ask: function (q) { open(q); } };

  function init() { fillFigures(); build(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
