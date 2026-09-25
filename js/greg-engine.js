/* ==========================================================
   GregEngine — the offline "brain" behind both Gregs
   ----------------------------------------------------------
   Everything runs in the browser: questions never leave the
   device. A knowledge base (KB) is a list of entries:

     { id: 'evaporation',
       q:  'What is evaporation?',          // shown on suggestion chips
       k:  ['evapor*:3', 'water vapor', 'puddle'],
       a:  'Answer text (supports **bold** and new lines)',
       more: 'Optional deeper answer for "tell me more"',
       rel: ['condensation', 'water-cycle'] }  // follow-up chips

   Keyword syntax
     word        exact word (light stemming: floats → float)
     word*       prefix  (evapor* → evaporate, evaporation…)
     two words   phrase  (matched in order, stronger signal)
     …:3         weight  (default 1)

   Scoring weights each keyword by how rare it is across the KB,
   tolerates small typos (chlorene → chlorine), and prefers the
   entry that explains the most of the question. "Skills" are
   functions tried first (calculators, quizzes, safety replies).
   ========================================================== */
(function (global) {
  'use strict';

  var STOP = new Set((
    'a an the is are was were be been being am do does did doing to of in on at for from by with about as into ' +
    'through over under again then once here there when where why how all any both each few more most other some such ' +
    'nor only own same so than too very can will just should now i me my we our you your he him his she her it its ' +
    'they them their what which who whom this that these those would could please tell explain know want learn mean means ' +
    'meaning define definition greg hey hi hello yo okay ok um uh like really also get got give use used thing things ' +
    'let lets let\'s much many need does doesn\'t dont don\'t is\'t isnt whats what\'s hows how\'s thats that\'s im i\'m ' +
    'kind sort way ways something anything someone called call say said'
  ).split(/\s+/));

  function normalize(s) {
    return String(s || '').toLowerCase()
      .replace(/[‘’`]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/h₂o/g, 'h2o')
      .replace(/[^a-z0-9%\s'-]/g, ' ')
      .replace(/(^|\s)'+|'+(\s|$)/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function stem(w) {
    if (w.length <= 3) return w;
    if (w.slice(-2) === "'s") w = w.slice(0, -2);
    if (w.length > 4 && w.slice(-3) === 'ies') return w.slice(0, -3) + 'y';
    if (w.length > 5 && w.slice(-3) === 'ing') {
      w = w.slice(0, -3);
      if (/([^aeiouls])\1$/.test(w)) w = w.slice(0, -1);
      return w;
    }
    if (w.length > 4 && w.slice(-2) === 'ed' && w.slice(-3) !== 'eed') {
      w = w.slice(0, -2);
      if (/([^aeiouls])\1$/.test(w)) w = w.slice(0, -1);
      return w;
    }
    if (/(ches|shes|xes|sses|zes)$/.test(w)) return w.slice(0, -2);
    if (w.slice(-1) === 's' && !/(ss|us|is|os)$/.test(w)) return w.slice(0, -1);
    return w;
  }

  function words(s) { return normalize(s).split(' ').filter(Boolean); }

  /* Damerau-Levenshtein (adjacent swaps count as one edit) with an
     early exit once `max` is exceeded */
  function editDistance(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    var prev2 = null, prev = [], cur, i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur = [i];
      var rowMin = i;
      for (j = 1; j <= b.length; j++) {
        var cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        var v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
        if (prev2 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          v = Math.min(v, prev2[j - 2] + 1);
        }
        cur[j] = v;
        if (v < rowMin) rowMin = v;
      }
      if (rowMin > max) return max + 1;
      prev2 = prev;
      prev = cur;
    }
    return prev[b.length];
  }

  /* Minimal, safe formatting: escape, then **bold** and line breaks */
  function format(text) {
    var esc = String(text == null ? '' : text)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return esc
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  function parseKeyword(raw) {
    var weight = 1, str = String(raw);
    var m = str.match(/^(.*):(\d+(?:\.\d+)?)$/);
    if (m) { str = m[1]; weight = parseFloat(m[2]); }
    var prefix = false;
    if (str.slice(-1) === '*') { prefix = true; str = str.slice(0, -1); }
    var ws = words(str);
    if (ws.length > 1) {
      var stems = ws.map(stem);
      return {
        type: 'phrase', text: ' ' + stems.join(' ') + ' ', weight: weight, prefix: prefix,
        content: stems.filter(function (w) { return !STOP.has(w); })
      };
    }
    var w = ws[0] || '';
    return { type: prefix ? 'prefix' : 'word', text: prefix ? w : stem(w), weight: weight };
  }

  function create(opts) {
    var entries = (opts.entries || []).slice();
    var skills = opts.skills || [];
    var byId = {}, byQ = {};
    var df = {};

    entries.forEach(function (e) {
      e._k = (e.k || []).map(parseKeyword).filter(function (k) { return k.text.trim(); });
      byId[e.id] = e;
      if (e.q) byQ[normalize(e.q)] = e;
      var seen = {};
      e._k.forEach(function (k) {
        if (!seen[k.text]) { df[k.text] = (df[k.text] || 0) + 1; seen[k.text] = 1; }
      });
    });
    var N = entries.length || 1;
    function idf(t) { return 1 + Math.log(1 + N / (df[t] || 1)) / 2.5; }

    var state = { last: null, memo: {} };

    function scoreEntry(e, toks, stemsLine) {
      var score = 0, hits = 0, used = {};
      /* A question word already explained by one keyword counts only a
         little toward a second keyword of the same entry (no double dipping). */
      function take(i, strength) {
        var s = used[i] ? strength * 0.3 : strength;
        used[i] = 1;
        return s;
      }
      e._k.forEach(function (k) {
        var w = k.weight * idf(k.text), matched = 0;
        if (k.type === 'phrase') {
          var found = k.prefix ? stemsLine.indexOf(k.text.slice(0, -1)) !== -1 : stemsLine.indexOf(k.text) !== -1;
          if (found) {
            matched = 1.6;
            k.content.forEach(function (cw) {
              for (var p = 0; p < toks.length; p++) if (toks[p] === cw || (k.prefix && toks[p].indexOf(cw) === 0)) used[p] = 1;
            });
          }
        } else {
          for (var i = 0; i < toks.length; i++) {
            var t = toks[i];
            if ((k.type === 'word' && t === k.text) || (k.type === 'prefix' && t.indexOf(k.text) === 0)) {
              matched = take(i, 1);
              break;
            }
          }
          if (!matched && k.text.length >= (k.type === 'prefix' ? 6 : 5)) {
            var max = k.text.length >= 9 ? 2 : 1;
            for (var j = 0; j < toks.length; j++) {
              var tj = toks[j];
              if (tj.length < 4 || tj.length < k.text.length - 1) continue;
              var cmp = k.type === 'prefix' ? tj.slice(0, k.text.length) : tj;
              if (editDistance(cmp, k.text, max) <= max) { matched = take(j, 0.7); break; }
            }
          }
        }
        if (matched) { score += w * matched; hits++; }
      });
      if (!hits) return 0;
      var coverage = toks.length ? Object.keys(used).length / toks.length : 0;
      return score + coverage * 0.6 + Math.min(hits, 4) * 0.05;
    }

    function rank(text) {
      var all = words(text);
      var toks = all.map(stem).filter(function (w) { return !STOP.has(w) && w.length > 1; });
      var stemsLine = ' ' + all.map(stem).join(' ') + ' ';
      var results = [];
      entries.forEach(function (e) {
        var s = scoreEntry(e, toks, stemsLine);
        if (s > 0) results.push({ e: e, s: s });
      });
      results.sort(function (a, b) { return b.s - a.s; });
      return results;
    }

    function chipsFor(entry) {
      return (entry && entry.rel ? entry.rel : [])
        .map(function (id) { return byId[id]; })
        .filter(Boolean)
        .slice(0, 3)
        .map(function (e) { return e.q; });
    }

    function reply(entry, useMore) {
      state.last = entry;
      state.lastWasMore = !!(useMore && entry.more);
      return {
        text: useMore && entry.more ? entry.more : entry.a,
        chips: chipsFor(entry).concat(entry.more && !useMore ? [opts.moreLabel || 'Tell me more'] : []).slice(0, 4),
        links: entry.links || null,
        id: entry.id
      };
    }

    var MORE_RE = /^(tell me more|more|more please|go on|keep going|explain more|what else|and then|continue|details?|more info(rmation)?|example|give me an example|why)\??!?$/;

    function ask(input) {
      var raw = String(input || '').trim();
      if (!raw) return null;
      var norm = normalize(raw);

      // Exact chip / suggested question
      if (byQ[norm]) return reply(byQ[norm], false);

      // Follow-ups: "tell me more", "why?" — deeper answer first, then a related topic
      var wantsMore = MORE_RE.test(norm) || (opts.moreLabel && norm === normalize(opts.moreLabel));
      if (state.last && wantsMore) {
        if (state.last.more && !state.lastWasMore) return reply(state.last, true);
        var relId = (state.last.rel || [])[0];
        if (relId && byId[relId]) return reply(byId[relId], false);
      }

      // Skills (calculators, quiz mode, safety, small talk)
      for (var i = 0; i < skills.length; i++) {
        var out = skills[i](raw, norm, state, api);
        if (out) {
          if (typeof out === 'string') out = { text: out, chips: [] };
          return out;
        }
      }

      var ranked = rank(raw);
      var min = opts.minScore || 1.1;
      if (ranked.length && ranked[0].s >= min) {
        var best = ranked[0].e;
        var res = reply(best, false);
        // Offer close runner-ups as chips when the question was ambiguous
        if (ranked[1] && ranked[1].s > ranked[0].s * 0.8) {
          var alt = ranked[1].e.q;
          if (alt && res.chips.indexOf(alt) === -1) res.chips = [alt].concat(res.chips).slice(0, 4);
        }
        return res;
      }

      // Low confidence: suggest the closest topics
      var sugg = ranked.slice(0, 3).map(function (r) { return r.e.q; }).filter(Boolean);
      var fb = typeof opts.fallback === 'function' ? opts.fallback(raw, sugg) : opts.fallback;
      if (typeof fb === 'string') fb = { text: fb, chips: sugg };
      if (!fb.chips || !fb.chips.length) fb.chips = sugg.length ? sugg : (opts.starterChips || []);
      return fb;
    }

    var api = {
      ask: ask,
      rank: rank,
      byId: byId,
      entries: entries,
      state: state,
      reply: reply,
      reset: function () { state.last = null; state.memo = {}; }
    };
    return api;
  }

  /* ---------- Shared small-talk & safety skills ---------- */
  var skills = {
    /* Kids: point anything worrying to a trusted grown-up */
    kidSafety: function (raw, norm) {
      if (/\b(hurt(s|ing)? me|hit(s|ting)? me|abus|touch(ed|es|ing)? me|kill (my ?self|me)|suicid|want to die|hate myself|self harm|cut myself|bull(y|ied|ies|ying)|scared|afraid|unsafe|in danger|runaway|run away)\b/.test(norm)) {
        return { text: "I'm really glad you told me. I'm only a computer helper, so I can't help with this — but a grown-up you trust can. Please talk to a parent, teacher, or school counselor today. 💙 If you are in danger right now, call **911**.", chips: [] };
      }
      if (/\b(my (address|phone|password)|where i live|my last name)\b/.test(norm)) {
        return { text: "Quick safety tip from Greg: never share your address, phone number, or passwords online — not even with a friendly chat buddy like me! 🛡️ Now, want to ask me a water question?", chips: [] };
      }
      return null;
    },
    /* Adults: crisis resources */
    adultSafety: function (raw, norm) {
      if (/\b(kill (my ?self|me)|suicid|want to die|end my life|self harm)\b/.test(norm)) {
        return { text: "I'm a study assistant and can't help with this, but you don't have to handle it alone. In the U.S. you can call or text **988** (Suicide & Crisis Lifeline) any time, or call **911** in an emergency.", chips: [] };
      }
      return null;
    }
  };

  global.GregEngine = {
    create: create,
    normalize: normalize,
    stem: stem,
    words: words,
    editDistance: editDistance,
    format: format,
    skills: skills
  };
})(window);
