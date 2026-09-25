/* ==========================================================
   Greg (adult) — chat UI shared by the Adult Learning Center
   and every lesson page. Needs js/site.js, js/greg-engine.js,
   js/greg-adult-kb.js. Everything runs in the browser; nothing
   typed here is sent anywhere.
   ========================================================== */
(function (global) {
  'use strict';

  var uid = 0;
  var reduce = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* Greg: a water operator in a hard hat. Unique ids per copy so
     gradients still render when another copy is hidden. */
  function avatar(label) {
    var id = 'gga' + (++uid);
    return '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + LW.esc(label || 'Greg, your study coach') + '">' +
      '<defs><linearGradient id="' + id + 'b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a5a99"/><stop offset="1" stop-color="#27c1d4"/></linearGradient>' +
      '<clipPath id="' + id + 'c"><circle cx="60" cy="60" r="60"/></clipPath></defs>' +
      '<circle cx="60" cy="60" r="60" fill="url(#' + id + 'b)"/>' +
      '<g clip-path="url(#' + id + 'c)">' +
      '<path d="M16 120 C18 97 35 87 60 87 C85 87 102 97 104 120 Z" fill="#062f52"/>' +
      '<path d="M47 88 L60 101 L73 88 L67 87 L60 94 L53 87 Z" fill="#e8f6fa"/>' +
      '<path d="M78 99 l6 0 l0 9 l-6 0 Z" fill="#27c1d4" opacity=".9"/>' +
      '<rect x="52" y="72" width="16" height="17" rx="5" fill="#c98b62"/>' +
      '<circle cx="38" cy="59" r="6" fill="#d99a6c"/><circle cx="82" cy="59" r="6" fill="#d99a6c"/>' +
      '<ellipse cx="60" cy="57" rx="22" ry="24" fill="#e2a77e"/>' +
      '<path d="M38.5 54 C38 47 40 43 44 41 L45 53 Z M81.5 54 C82 47 80 43 76 41 L75 53 Z" fill="#3b2a20"/>' +
      '<path d="M35 45 C35 27 46 18 60 18 C74 18 85 27 85 45 Z" fill="#f8fafc"/>' +
      '<path d="M60 18 C66 18 71 21 74 26 L70 44 L50 44 L46 26 C49 21 54 18 60 18 Z" fill="#ffffff"/>' +
      '<rect x="30" y="42" width="60" height="7.5" rx="3.75" fill="#e2e8f0"/>' +
      '<path d="M60 25 C60 25 54.5 32.5 54.5 36 a5.5 5.5 0 0 0 11 0 C65.5 32.5 60 25 60 25 Z" fill="#0e7fc0"/>' +
      '<path d="M48 56 Q52 53.5 56 56 M64 56 Q68 53.5 72 56" stroke="#3b2a20" stroke-width="2.3" fill="none" stroke-linecap="round"/>' +
      '<circle cx="52" cy="61" r="2.7" fill="#0d2133"/><circle cx="68" cy="61" r="2.7" fill="#0d2133"/>' +
      '<path d="M51.5 69 Q60 76.5 68.5 69" stroke="#0d2133" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      '</g></svg>';
  }

  function fillAvatars(scope) {
    (scope || document).querySelectorAll('[data-greg-avatar]').forEach(function (n) {
      if (!n.firstChild) n.innerHTML = avatar(n.getAttribute('data-label'));
    });
  }


  /* ---------- Official sources + site search (EPA, NRWA, MsRWA) ---------- */
  function outLink(text, href, cls) {
    var a = LW.el('a', cls || null, text);
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    return a;
  }
  function decodeEntities(s) {
    try { return new DOMParser().parseFromString('<!doctype html><body>' + s, 'text/html').body.textContent || ''; }
    catch (e) { return String(s).replace(/<[^>]*>/g, ''); }
  }
  /* Only link to pages on the site that was searched */
  function sameSite(url, home) {
    try {
      var u = new URL(url), h = new URL(home);
      return (u.protocol === 'https:' || u.protocol === 'http:') &&
        u.hostname.replace(/^www\./, '') === h.hostname.replace(/^www\./, '');
    } catch (e) { return false; }
  }
  function sourcesRow(links) {
    var box = LW.el('div', 'gchat-sources');
    box.appendChild(LW.el('span', 'gs-label', 'Official sources'));
    var ul = document.createElement('ul');
    links.forEach(function (l) {
      var li = document.createElement('li'), a = outLink('', l[2]);
      a.appendChild(LW.el('b', null, l[0]));
      a.appendChild(document.createTextNode(l[1] + ' ↗'));
      li.appendChild(a);
      ul.appendChild(li);
    });
    box.appendChild(ul);
    return box;
  }
  function note(ul, text) { ul.appendChild(LW.el('li', 'gs-note', text)); }

  /* NRWA and MsRWA run WordPress; its public search API can list matching
     pages right in the chat. If the site blocks that, the button above the
     list still opens the site's own search. */
  function liveResults(src, q, ul, update) {
    if (!global.fetch) { note(ul, 'Use the button above to see the results on ' + src.name + '.'); return; }
    var ctrl = global.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 8000);
    global.fetch(src.live + '?search=' + encodeURIComponent(q) + '&per_page=5&_fields=title,url', { credentials: 'omit', signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (list) {
        clearTimeout(timer);
        var items = (Array.isArray(list) ? list : []).filter(function (it) {
          return it && typeof it.url === 'string' && sameSite(it.url, src.home);
        }).slice(0, 5);
        update(function () {
          ul.innerHTML = '';
          if (!items.length) note(ul, 'No matching pages on ' + src.name + '. Try other words, or open the full search.');
          items.forEach(function (it) {
            var title = typeof it.title === 'string' ? it.title : (it.title && it.title.rendered) || '';
            var li = document.createElement('li');
            li.appendChild(outLink(decodeEntities(title).trim() || it.url, it.url));
            ul.appendChild(li);
          });
        });
      })
      .catch(function () {
        clearTimeout(timer);
        update(function () {
          ul.innerHTML = '';
          note(ul, "Couldn't show " + src.name + ' results here. Use the button above to see them on their site.');
        });
      });
  }
  function searchCard(search, update) {
    var sources = (global.GREG_ADULT && global.GREG_ADULT.sources) || {};
    var card = LW.el('div', 'gsearch');
    card.setAttribute('role', 'group');
    card.setAttribute('aria-label', 'Official site search for ' + search.q);
    search.sites.forEach(function (id) {
      var src = sources[id];
      if (!src) return;
      var site = LW.el('div', 'gs-site'), top = LW.el('div', 'gs-top'), name = LW.el('div', 'gs-name');
      name.appendChild(LW.el('b', null, src.name));
      name.appendChild(LW.el('span', null, src.full));
      top.appendChild(name);
      var showLive = search.live && src.live;
      top.appendChild(outLink((showLive ? 'All results on ' : 'Search ') + src.name + ' ↗', src.search + encodeURIComponent(search.q), 'gs-open'));
      site.appendChild(top);
      if (showLive) {
        var ul = LW.el('ul', 'gs-results');
        note(ul, 'Looking for matching pages…');
        site.appendChild(ul);
        liveResults(src, search.q, ul, update);
      }
      card.appendChild(site);
    });
    return card;
  }

  /* Mount a chat into `root`. opts: { intro, chips, placeholder, onReply } */
  function mount(root, opts) {
    opts = opts || {};
    if (!root || !global.GREG_ADULT || !global.GregEngine) return null;
    var brain = global.GREG_ADULT.create();
    root.classList.add('gchat');
    root.innerHTML =
      '<div class="gchat-log" role="log" aria-live="polite" aria-label="Conversation with Greg"></div>' +
      '<div class="gchat-chips" aria-label="Suggested questions"></div>' +
      '<form class="gchat-form" autocomplete="off">' +
      '<label class="sr-only">Your question for Greg</label>' +
      '<input class="gchat-input" type="text" maxlength="300" enterkeyhint="send">' +
      '<button class="gchat-send" type="submit" aria-label="Send"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l16-8-6 16-2.5-6.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg></button>' +
      '</form>';
    var log = root.querySelector('.gchat-log');
    var chips = root.querySelector('.gchat-chips');
    var form = root.querySelector('.gchat-form');
    var input = root.querySelector('.gchat-input');
    var inputId = 'gchatIn' + (++uid);
    input.id = inputId;
    root.querySelector('label').setAttribute('for', inputId);
    input.placeholder = opts.placeholder || 'Ask Greg about any chapter, rule, or formula…';
    var busy = false;

    /* Keep the newest message in view, unless the reader scrolled up */
    function update(fn) {
      var stick = log.scrollHeight - log.scrollTop - log.clientHeight < 80;
      fn();
      if (stick) log.scrollTop = log.scrollHeight;
    }
    function add(who, text, extra) {
      var row = LW.el('div', 'gchat-msg ' + who);
      if (who === 'greg') {
        var face = LW.el('span', 'gchat-face');
        face.innerHTML = avatar('Greg');
        face.firstChild.setAttribute('aria-hidden', 'true');
        row.appendChild(face);
        var b = LW.el('div', 'gchat-bubble');
        b.innerHTML = global.GregEngine.format(text);
        if (extra && extra.links && extra.links.length) b.appendChild(sourcesRow(extra.links));
        if (extra && extra.search) b.appendChild(searchCard(extra.search, update));
        row.appendChild(b);
      } else {
        row.appendChild(LW.el('div', 'gchat-bubble', text));
      }
      log.appendChild(row);
      log.scrollTop = log.scrollHeight;
      return row;
    }
    function setChips(list) {
      chips.innerHTML = '';
      (list || []).slice(0, 4).forEach(function (c) {
        var b = LW.el('button', 'gchat-chip', c);
        b.type = 'button';
        b.addEventListener('click', function () { send(c); });
        chips.appendChild(b);
      });
    }
    function send(text) {
      text = String(text || '').trim();
      if (!text || busy) return;
      add('you', text);
      input.value = '';
      setChips([]);
      busy = true;
      var r = brain.ask(text) || { text: "Sorry, I didn't catch that.", chips: [] };
      var typing = LW.el('div', 'gchat-typing');
      typing.innerHTML = '<i></i><i></i><i></i>';
      typing.setAttribute('aria-label', 'Greg is typing');
      log.appendChild(typing);
      log.scrollTop = log.scrollHeight;
      setTimeout(function () {
        typing.remove();
        add('greg', r.text, r);
        /* Leave room for search results; otherwise offer follow-up questions */
        setChips(r.search && r.search.live ? [] : r.chips && r.chips.length ? r.chips : opts.chips);
        busy = false;
        if (typeof opts.onReply === 'function') opts.onReply(text, r);
      }, reduce ? 0 : Math.min(900, 260 + r.text.length * 1.2));
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); send(input.value); });

    add('greg', opts.intro || "Hi, I'm Greg. Ask me about any chapter of the operators manual, or give me numbers and I'll work the formula with you.");
    setChips(opts.chips || global.GREG_ADULT.starterChips);

    return {
      ask: send,
      focus: function () { input.focus({ preventScroll: true }); },
      reset: function () { brain.reset(); }
    };
  }

  global.GregAdultUI = { avatar: avatar, fillAvatars: fillAvatars, mount: mount };
})(window);
