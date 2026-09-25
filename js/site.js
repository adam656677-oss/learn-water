/* ==========================================================
   LearnWater — shared site helpers (every page)
   - Mobile nav toggle (accessible)
   - Safe localStorage wrapper
   - HTML escaping
   - Click-to-play YouTube cards
   ========================================================== */
(function (global) {
  'use strict';

  var LW = global.LW || {};

  /* ---------- Storage (never throws: private mode, blocked storage…) ---------- */
  LW.store = {
    get: function (key, fallback) {
      try {
        var raw = global.localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { global.localStorage.setItem(key, JSON.stringify(value)); return true; }
      catch (e) { return false; }
    },
    getRaw: function (key) {
      try { return global.localStorage.getItem(key); } catch (e) { return null; }
    },
    setRaw: function (key, value) {
      try { global.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
    }
  };

  /* ---------- Escaping ---------- */
  LW.esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  /* ---------- Tiny DOM helper ---------- */
  LW.el = function (tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.getElementById('navLinks');
    if (!toggle || !links) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'navLinks');
    function setOpen(open) {
      links.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    toggle.addEventListener('click', function () { setOpen(!links.classList.contains('open')); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
  }
  /* Older pages call toggleNav() inline — keep it working. */
  global.toggleNav = function () {
    var t = document.querySelector('.nav-toggle');
    if (t) t.click();
  };

  /* ---------- YouTube cards (thumbnail first, player on click) ----------
     Thumbnails come from i.ytimg.com; the player uses youtube-nocookie.com
     so nothing from YouTube loads until someone presses play. Every card
     also links straight to YouTube in case an owner disables embedding. */
  LW.videoCard = function (v, opts) {
    opts = opts || {};
    var card = LW.el('article', 'video-card');
    if (v.topic) card.dataset.topic = v.topic;

    var frame = LW.el('div', 'video-frame');
    var btn = LW.el('button', 'video-play');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Play video: ' + v.title);

    var img = new Image();
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    var fellBack = false;
    function fallback() {
      if (fellBack) return;
      fellBack = true;
      img.remove();
      var fb = LW.el('span', 'video-fallback');
      fb.innerHTML = '<span class="big" aria-hidden="true">▶</span><span></span>';
      fb.lastChild.textContent = v.title;
      btn.insertBefore(fb, btn.firstChild);
    }
    img.addEventListener('error', fallback);
    img.addEventListener('load', function () {
      /* YouTube serves a 120px grey placeholder for missing videos */
      if (img.naturalWidth && img.naturalWidth <= 120) fallback();
    });
    img.src = 'https://i.ytimg.com/vi/' + encodeURIComponent(v.id) + '/hqdefault.jpg';
    btn.appendChild(img);
    btn.appendChild(LW.el('span', 'play-icon'));
    if (v.length) {
      var d = LW.el('span', 'video-duration', v.length);
      btn.appendChild(d);
    }

    btn.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id) +
        '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      iframe.title = v.title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.setAttribute('allowfullscreen', '');
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.replaceChildren(iframe);
      if (typeof opts.onPlay === 'function') opts.onPlay(v);
    });
    frame.appendChild(btn);
    card.appendChild(frame);

    var body = LW.el('div', 'video-body');
    if (v.source) body.appendChild(LW.el('span', 'video-source', v.source));
    body.appendChild(LW.el('h4', null, v.title));
    if (v.desc) body.appendChild(LW.el('p', null, v.desc));
    var links = LW.el('div', 'video-links');
    var yt = LW.el('a', null, 'Watch on YouTube ↗');
    yt.href = 'https://www.youtube.com/watch?v=' + encodeURIComponent(v.id);
    yt.target = '_blank';
    yt.rel = 'noopener noreferrer';
    links.appendChild(yt);
    if (opts.extraLink) links.appendChild(opts.extraLink(v));
    body.appendChild(links);
    card.appendChild(body);
    return card;
  };

  LW.renderVideos = function (container, videos, opts) {
    if (typeof container === 'string') container = document.getElementById(container);
    if (!container) return;
    container.replaceChildren();
    videos.forEach(function (v) { container.appendChild(LW.videoCard(v, opts)); });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initNav);
  else initNav();

  global.LW = LW;
})(window);
