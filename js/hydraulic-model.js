/* ==========================================================
   LearnWater — Hydraulic Modeling page (hydraulic-modeling.html)
   - Model lab: a small looped network solved with the gradient
     method (Todini-Pilati), the same approach EPANET uses
   - Pipe calculator (Hazen-Williams and Darcy-Weisbach)
   - Pump / system curve lab, 48-hour tank simulator (EPS)
   - Hydrant flow test (NFPA 291) and water hammer calculators
   Units: US customary. Internally flows are cfs, heads are ft.
   ========================================================== */
(function (global) {
  'use strict';

  var esc = LW.esc;
  function $(x) { return document.getElementById(x); }
  function fmt(n, d) { return global.DEEP ? DEEP.fmt(n, d) : String(n); }
  function num(id) { var v = parseFloat($(id).value); return isFinite(v) ? v : NaN; }
  var GPM_PER_CFS = 448.831, PSI_PER_FT = 0.4331, G = 32.174;

  /* ---------- Hazen-Williams helpers ---------- */
  /* Resistance for h = r Q^1.852 with Q in cfs, L and D in ft (EPANET's form) */
  function hwR(Lft, Dft, C) { return 4.727 * Lft / (Math.pow(C, 1.852) * Math.pow(Dft, 4.871)); }
  /* Head loss in ft with Q in gpm, d in inches */
  function hwLoss(Qgpm, Lft, din, C) { return 10.44 * Lft * Math.pow(Qgpm, 1.852) / (Math.pow(C, 1.852) * Math.pow(din, 4.8655)); }
  function velFps(Qgpm, din) { return 0.4085 * Qgpm / (din * din); }

  /* ================= MODEL LAB ================= */
  var BASE = {
    tank: { id: 'T1', x: 52, y: 92 },
    nodes: [
      { id: 'J1', x: 175, y: 120, el: 225, dem: 60 }, { id: 'J2', x: 318, y: 120, el: 232, dem: 80 },
      { id: 'J3', x: 460, y: 120, el: 240, dem: 70 }, { id: 'J4', x: 595, y: 132, el: 255, dem: 50 },
      { id: 'J5', x: 175, y: 318, el: 220, dem: 90 }, { id: 'J6', x: 318, y: 328, el: 236, dem: 60 },
      { id: 'J7', x: 460, y: 328, el: 246, dem: 70 }, { id: 'J8', x: 595, y: 340, el: 262, dem: 40 }
    ],
    pipes: [
      { id: 'P1', a: 'T1', b: 'J1', L: 1500, d: 12, C: 130 }, { id: 'P2', a: 'J1', b: 'J2', L: 1300, d: 10, C: 120 },
      { id: 'P3', a: 'J2', b: 'J3', L: 1300, d: 10, C: 120 }, { id: 'P4', a: 'J3', b: 'J4', L: 1200, d: 8, C: 110 },
      { id: 'P5', a: 'J1', b: 'J5', L: 1000, d: 8, C: 110 }, { id: 'P6', a: 'J2', b: 'J6', L: 1000, d: 6, C: 100 },
      { id: 'P7', a: 'J3', b: 'J7', L: 1000, d: 8, C: 110 }, { id: 'P8', a: 'J4', b: 'J8', L: 1000, d: 6, C: 100 },
      { id: 'P9', a: 'J5', b: 'J6', L: 1300, d: 8, C: 110 }, { id: 'P10', a: 'J6', b: 'J7', L: 1300, d: 6, C: 100 },
      { id: 'P11', a: 'J7', b: 'J8', L: 1200, d: 4, C: 70 }
    ]
  };
  var lab = null;
  function labReset() {
    lab = {
      tankH: 390, mult: 1.8, fire: 750, fireNode: 'J8', sel: 'P11',
      nodes: BASE.nodes.map(function (n) { return Object.assign({}, n); }),
      pipes: BASE.pipes.map(function (p) { return Object.assign({ open: true }, p); })
    };
  }

  /* Solve the network. Returns { H: {node: head}, Q: {pipe: cfs}, iters, ok, isolated: {node:true} } */
  function solve(state, fireGpm) {
    var nodes = state.nodes, pipes = state.pipes.filter(function (p) { return p.open; });
    var idx = {}, n = nodes.length, i, k, it;
    nodes.forEach(function (nd, j) { idx[nd.id] = j; });
    /* Which junctions can reach the tank through open pipes? */
    var reach = { T1: true }, changed = true;
    while (changed) {
      changed = false;
      pipes.forEach(function (p) {
        if (reach[p.a] && !reach[p.b]) { reach[p.b] = true; changed = true; }
        if (reach[p.b] && !reach[p.a]) { reach[p.a] = true; changed = true; }
      });
    }
    var live = nodes.filter(function (nd) { return reach[nd.id]; });
    var li = {};
    live.forEach(function (nd, j) { li[nd.id] = j; });
    var m = live.length;
    if (!m) return { H: {}, Q: {}, iters: 0, ok: true, isolated: nodes.reduce(function (o, nd) { o[nd.id] = true; return o; }, {}), contErr: 0 };
    var D = live.map(function (nd) { return (nd.dem * state.mult + (nd.id === state.fireNode ? fireGpm : 0)) / GPM_PER_CFS; });
    var act = pipes.filter(function (p) { return reach[p.a] && reach[p.b]; });
    var r = act.map(function (p) { return hwR(p.L, p.d / 12, p.C); });
    var Q = act.map(function (p) { return Math.PI * Math.pow(p.d / 12, 2) / 4; }); /* start at 1 ft/s */
    var Hn = new Array(m).fill(state.tankH), N = 1.852, iters = 0, ok = false;
    for (it = 0; it < 200; it++) {
      iters = it + 1;
      var A = [], F = new Array(m).fill(0);
      for (i = 0; i < m; i++) { A.push(new Array(m).fill(0)); F[i] = -D[i]; }
      var P = [], Y = [];
      for (k = 0; k < act.length; k++) {
        var aq = Math.max(Math.abs(Q[k]), 1e-6);
        var p = 1 / (N * r[k] * Math.pow(aq, N - 1));
        var y = Q[k] / N;                       /* f(Q)/f'(Q) for a power law */
        P.push(p); Y.push(y);
        var a = act[k].a, b = act[k].b, ia = li[a], ib = li[b];
        var c = Q[k] - y;
        if (a !== 'T1') { A[ia][ia] += p; F[ia] -= c; }
        if (b !== 'T1') { A[ib][ib] += p; F[ib] += c; }
        if (a !== 'T1' && b !== 'T1') { A[ia][ib] -= p; A[ib][ia] -= p; }
        else if (a === 'T1') F[ib] += p * state.tankH;
        else F[ia] += p * state.tankH;
      }
      var H = gauss(A, F);
      if (!H) break;
      var dsum = 0, qsum = 0;
      for (k = 0; k < act.length; k++) {
        var ha = act[k].a === 'T1' ? state.tankH : H[li[act[k].a]];
        var hb = act[k].b === 'T1' ? state.tankH : H[li[act[k].b]];
        var qn = Q[k] - Y[k] + P[k] * (ha - hb);
        dsum += Math.abs(qn - Q[k]); qsum += Math.abs(qn);
        Q[k] = qn;
      }
      Hn = H;
      if (qsum > 0 && dsum / qsum < 1e-7) { ok = true; break; }
    }
    var out = { H: {}, Q: {}, iters: iters, ok: ok, isolated: {} };
    nodes.forEach(function (nd) { if (!reach[nd.id]) out.isolated[nd.id] = true; else out.H[nd.id] = Hn[li[nd.id]]; });
    act.forEach(function (p, j) { out.Q[p.id] = Q[j]; });
    /* continuity check */
    var err = 0;
    live.forEach(function (nd, j) {
      var s = -D[j];
      act.forEach(function (p, q) { if (p.b === nd.id) s += Q[q]; if (p.a === nd.id) s -= Q[q]; });
      err = Math.max(err, Math.abs(s));
    });
    out.contErr = err * GPM_PER_CFS;
    return out;
  }
  /* Gaussian elimination with partial pivoting */
  function gauss(A, b) {
    var n = b.length, i, j, k;
    var M = A.map(function (row, r) { return row.concat([b[r]]); });
    for (i = 0; i < n; i++) {
      var piv = i;
      for (k = i + 1; k < n; k++) if (Math.abs(M[k][i]) > Math.abs(M[piv][i])) piv = k;
      if (Math.abs(M[piv][i]) < 1e-14) return null;
      var t = M[i]; M[i] = M[piv]; M[piv] = t;
      for (k = i + 1; k < n; k++) {
        var f = M[k][i] / M[i][i];
        if (!f) continue;
        for (j = i; j <= n; j++) M[k][j] -= f * M[i][j];
      }
    }
    var x = new Array(n);
    for (i = n - 1; i >= 0; i--) {
      var s = M[i][n];
      for (j = i + 1; j < n; j++) s -= M[i][j] * x[j];
      x[i] = s / M[i][i];
    }
    return x;
  }
  function pressures(state, res) {
    var p = {};
    state.nodes.forEach(function (nd) { p[nd.id] = res.isolated[nd.id] ? null : (res.H[nd.id] - nd.el) * PSI_PER_FT; });
    return p;
  }
  function minPressure(state, res) {
    var ps = pressures(state, res), mn = Infinity;
    Object.keys(ps).forEach(function (k) { if (ps[k] != null && ps[k] < mn) mn = ps[k]; });
    return mn;
  }
  /* Largest fire flow at the fire node with every connected junction at 20 psi or more */
  function availableFire(state) {
    if (minPressure(state, solve(state, 0)) < 20) return 0;
    var lo = 0, hi = 12000;
    if (minPressure(state, solve(state, hi)) >= 20) return hi;
    for (var i = 0; i < 40; i++) {
      var mid = (lo + hi) / 2;
      if (minPressure(state, solve(state, mid)) >= 20) lo = mid; else hi = mid;
    }
    return lo;
  }
  function pColor(psi) { return psi == null ? '#9ca3af' : psi < 20 ? '#dc2626' : psi < 35 ? '#f59e0b' : '#16a34a'; }
  function vColor(v) { return v > 10 ? '#dc2626' : v > 5 ? '#f59e0b' : v > 2 ? '#0e7490' : '#60a5fa'; }
  function nodeById(id) { return id === 'T1' ? BASE.tank : lab.nodes.filter(function (n) { return n.id === id; })[0]; }

  function drawLab() {
    var res = solve(lab, lab.fire), ps = pressures(lab, res), svg = $('net');
    var html = '<rect x="0" y="0" width="640" height="400" fill="transparent"/>';
    /* pipes */
    lab.pipes.forEach(function (p) {
      var a = nodeById(p.a), b = nodeById(p.b), q = res.Q[p.id], v = q != null ? Math.abs(q) * GPM_PER_CFS : 0;
      var vel = q != null ? velFps(Math.abs(q) * GPM_PER_CFS, p.d) : 0;
      var w = 2 + p.d * 0.55, col = !p.open ? '#9ca3af' : q == null ? '#cbd5e1' : vColor(vel);
      var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      html += '<g class="net-pipe-g" tabindex="0" role="button" aria-pressed="' + (lab.sel === p.id) + '" aria-label="Pipe ' + p.id + ', ' + p.d + ' inch, ' + (p.open ? fmt(v, 0) + ' gpm' : 'closed') + '" data-pipe="' + p.id + '">' +
        '<line class="sel" x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '"/>' +
        '<line class="net-pipe' + (p.open ? '' : ' closed') + '" x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" stroke="' + col + '" stroke-width="' + w.toFixed(1) + '"/>' +
        '<line class="net-pipe-hit" x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '"/>';
      if (p.open && q != null && v > 0.5) {
        /* arrow showing flow direction */
        var dir = q >= 0 ? 1 : -1, dx = (b.x - a.x) * dir, dy = (b.y - a.y) * dir, len = Math.sqrt(dx * dx + dy * dy), ux = dx / len, uy = dy / len;
        var tx = mx + ux * 9, ty = my + uy * 9;
        html += '<path d="M' + (tx).toFixed(1) + ' ' + (ty).toFixed(1) + ' L' + (tx - ux * 12 - uy * 6).toFixed(1) + ' ' + (ty - uy * 12 + ux * 6).toFixed(1) + ' L' + (tx - ux * 12 + uy * 6).toFixed(1) + ' ' + (ty - uy * 12 - ux * 6).toFixed(1) + ' Z" fill="#0b2238" pointer-events="none"/>';
      }
      /* horizontal pipes: label on the side away from the junction labels */
      var off = Math.abs(b.x - a.x) > Math.abs(b.y - a.y) ? (my < 220 ? [0, 22] : [0, -12]) : [16, 5];
      html += '<text class="net-lbl pipe" x="' + (mx + off[0]) + '" y="' + (my + off[1]) + '" text-anchor="' + (off[0] ? 'start' : 'middle') + '" fill="#3b0764">' + p.id + ' · ' + p.d + '″' + (p.open ? '' : ' ✕') + '</text></g>';
    });
    /* tank */
    var T = BASE.tank;
    html += '<g aria-hidden="true"><rect x="' + (T.x - 22) + '" y="' + (T.y - 34) + '" width="44" height="30" rx="8" fill="#e0f2fe" stroke="#0b2238" stroke-width="2.5"/>' +
      '<rect x="' + (T.x - 20) + '" y="' + (T.y - 34 + 30 - Math.max(4, Math.min(28, (lab.tankH - 330) / 70 * 28))) + '" width="40" height="' + Math.max(4, Math.min(28, (lab.tankH - 330) / 70 * 28)) + '" rx="6" fill="#38bdf8"/>' +
      '<line x1="' + (T.x - 12) + '" y1="' + (T.y - 4) + '" x2="' + (T.x - 16) + '" y2="' + (T.y + 22) + '" stroke="#0b2238" stroke-width="2.5"/><line x1="' + (T.x + 12) + '" y1="' + (T.y - 4) + '" x2="' + (T.x + 16) + '" y2="' + (T.y + 22) + '" stroke="#0b2238" stroke-width="2.5"/>' +
      '<text class="net-lbl" x="' + (T.x - 30) + '" y="' + (T.y + 44) + '" text-anchor="start" fill="#0b2238">Tank</text><text class="net-lbl pipe" x="' + (T.x - 30) + '" y="' + (T.y + 60) + '" text-anchor="start" fill="#0b2238">HGL ' + lab.tankH + ' ft</text></g>';
    /* nodes */
    lab.nodes.forEach(function (nd) {
      var psi = ps[nd.id], isFire = nd.id === lab.fireNode && lab.fire > 0;
      html += '<g class="net-node" tabindex="0" role="button" aria-pressed="' + (nd.id === lab.fireNode) + '" aria-label="Junction ' + nd.id + ', ' + (psi == null ? 'no water' : fmt(psi, 0) + ' psi') + '. Put the fire hydrant here." data-node="' + nd.id + '">' +
        '<circle class="ring" cx="' + nd.x + '" cy="' + nd.y + '" r="20"/>' +
        '<circle cx="' + nd.x + '" cy="' + nd.y + '" r="13" fill="' + pColor(psi) + '" stroke="#0b2238" stroke-width="2.5"/>' +
        (isFire ? '<text x="' + nd.x + '" y="' + (nd.y + 4.5) + '" text-anchor="middle" font-size="12" stroke="none">🔥</text>' : '') +
        '<text x="' + nd.x + '" y="' + (nd.y + (nd.y > 200 ? 36 : -22)) + '" text-anchor="middle" fill="#0b2238">' + nd.id + ' ' + (psi == null ? '—' : psi < 0 ? 'below 0' : fmt(psi, 0) + ' psi') + '</text></g>';
    });
    svg.innerHTML = html;
    labPanels(res, ps);
  }
  function labPanels(res, ps) {
    /* tables */
    $('labNodes').innerHTML = lab.nodes.map(function (nd) {
      var psi = ps[nd.id], dem = nd.dem * lab.mult + (nd.id === lab.fireNode ? lab.fire : 0);
      return '<tr><td>' + nd.id + '</td><td class="num">' + nd.el + '</td><td class="num">' + fmt(dem, 0) + '</td><td class="num">' + (psi == null ? '—' : fmt(res.H[nd.id], 1)) + '</td><td class="num ' + (psi != null && psi < 20 ? 'low' : '') + '">' + (psi == null ? 'no water' : fmt(psi, 1)) + '</td></tr>';
    }).join('');
    var worst = null;
    $('labPipes').innerHTML = lab.pipes.map(function (p) {
      var q = res.Q[p.id];
      if (!p.open || q == null) return '<tr><td>' + p.id + '</td><td class="num">' + p.d + '</td><td class="num">' + p.C + '</td><td colspan="3">closed or cut off</td></tr>';
      var g = Math.abs(q) * GPM_PER_CFS, v = velFps(g, p.d), hl = hwLoss(g, 1000, p.d, p.C);
      if (!worst || hl > worst.hl) worst = { p: p, hl: hl, v: v };
      return '<tr><td>' + p.id + '</td><td class="num">' + p.d + '</td><td class="num">' + p.C + '</td><td class="num">' + fmt(g, 0) + '</td><td class="num ' + (v > 5 ? 'hi' : '') + '">' + fmt(v, 2) + '</td><td class="num">' + fmt(hl, 1) + '</td></tr>';
    }).join('');
    /* diagnosis */
    var issues = [], low = [], amber = [], dry = [];
    lab.nodes.forEach(function (nd) { var psi = ps[nd.id]; if (psi == null) dry.push(nd.id); else if (psi < 20) low.push(nd.id + ' (' + fmt(psi, 0) + ' psi)'); else if (psi < 35) amber.push(nd.id + ' (' + fmt(psi, 0) + ' psi)'); });
    if (dry.length) issues.push(['bad', 'No water at ' + dry.join(', ') + ': closed pipes have cut them off from the tank. In a real break, valve isolations like this leave customers out of water until the main is repaired.']);
    if (low.length) issues.push(['bad', 'Below the 20 psi minimum: ' + low.join(', ') + '. That risks backflow and fails the fire flow standard.']);
    if (lab.nodes.some(function (nd) { return ps[nd.id] != null && ps[nd.id] < 0; })) issues.push(['bad', 'A negative pressure means the pipes can\'t carry this much water. The model still “delivers” every gallon (a demand-driven model does that), but in the real system flow would drop and customers would lose water. Pressure-driven analysis models that.']);
    if (amber.length) issues.push(['warn', 'Between 20 and 35 psi: ' + amber.join(', ') + '. Acceptable during a fire, but below the normal minimum of 35 psi.']);
    if (worst && worst.hl > 10) issues.push([worst.hl > 25 ? 'bad' : 'warn', 'Bottleneck: ' + worst.p.id + ' (' + worst.p.d + '-inch, C ' + worst.p.C + ') is losing ' + fmt(worst.hl, 0) + ' ft of head per 1,000 ft at ' + fmt(worst.v, 1) + ' ft/s. ' + (worst.p.d < 8 ? 'Try upsizing it and see what happens to the pressures.' : 'Its roughness or flow is the problem here.')]);
    var fast = lab.pipes.filter(function (p) { var q = res.Q[p.id]; return p.open && q != null && velFps(Math.abs(q) * GPM_PER_CFS, p.d) > 5; }).map(function (p) { return p.id; });
    if (fast.length) issues.push(['warn', 'Velocity above 5 ft/s in ' + fast.join(', ') + ': high head loss and a bigger water hammer risk if a valve closes fast.']);
    if (!issues.length) issues.push(['', 'All junctions have 35 psi or more and no pipe is overloaded. Try a bigger fire flow, peak hour, or a lower tank level.']);
    $('labIssues').innerHTML = issues.map(function (x) { return '<li class="' + x[0] + '">' + esc(x[1]) + '</li>'; }).join('');
    var avail = availableFire(lab);
    $('labAvail').textContent = 'Available at ' + lab.fireNode + ' with every junction at 20 psi or more (at this demand): about ' + fmt(Math.round(avail / 50) * 50, 0) + ' gpm.';
    $('labSolve').textContent = !Object.keys(res.H).length ? 'No junction is connected to the tank, so there is nothing to solve.' : res.ok ? 'Solved with the gradient method in ' + res.iters + ' iterations; largest flow imbalance at any junction: ' + (res.contErr < 0.01 ? 'under 0.01' : fmt(res.contErr, 2)) + ' gpm. Hazen-Williams head loss; minor losses ignored.' : 'The solver did not fully converge; results may be off.';
  }
  function labSelectPipe(id) {
    lab.sel = id;
    var p = lab.pipes.filter(function (x) { return x.id === id; })[0];
    $('labPipeName').textContent = p.id + ' (' + p.L.toLocaleString('en-US') + ' ft, ' + p.a + ' to ' + p.b + ')';
    $('labDia').value = String(p.d); $('labC').value = p.C; $('labCO').textContent = p.C; $('labStatus').value = p.open ? 'open' : 'closed';
  }
  function labControls() {
    $('labFireO').textContent = fmt(lab.fire, 0) + ' gpm';
    $('labTankO').textContent = lab.tankH + ' ft';
    $('labFireNode').textContent = lab.fireNode;
    $('labFire').value = lab.fire; $('labTank').value = lab.tankH;
    $('labDemand').querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-checked', +b.dataset.m === lab.mult ? 'true' : 'false'); });
    labSelectPipe(lab.sel);
  }
  function initLab() {
    labReset();
    labControls();
    drawLab();
    var svg = $('net');
    function pick(e) {
      var n = e.target.closest('[data-node]'), p = e.target.closest('[data-pipe]');
      if (n) { lab.fireNode = n.getAttribute('data-node'); labControls(); drawLab(); }
      else if (p) { labSelectPipe(p.getAttribute('data-pipe')); drawLab(); $('labPipeCard').scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
    }
    svg.addEventListener('click', pick);
    svg.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(e); } });
    $('labDemand').addEventListener('click', function (e) { var b = e.target.closest('[data-m]'); if (!b) return; lab.mult = +b.dataset.m; labControls(); drawLab(); });
    $('labFire').addEventListener('input', function () { lab.fire = +this.value; $('labFireO').textContent = fmt(lab.fire, 0) + ' gpm'; drawLab(); });
    $('labTank').addEventListener('input', function () { lab.tankH = +this.value; $('labTankO').textContent = lab.tankH + ' ft'; drawLab(); });
    function editPipe() {
      var p = lab.pipes.filter(function (x) { return x.id === lab.sel; })[0];
      p.d = +$('labDia').value; p.C = +$('labC').value; p.open = $('labStatus').value === 'open';
      $('labCO').textContent = p.C;
      drawLab();
    }
    $('labDia').addEventListener('change', editPipe);
    $('labStatus').addEventListener('change', editPipe);
    $('labC').addEventListener('input', editPipe);
    $('labReset').addEventListener('click', function () { labReset(); labControls(); drawLab(); });
  }

  /* ================= PIPE CALCULATOR ================= */
  var MATS = [['PVC or HDPE', 150, 0.000005], ['Ductile iron, cement-lined', 140, 0.0004], ['New cast iron', 130, 0.00085], ['Steel', 120, 0.00015], ['Old tuberculated cast iron', 80, 0.005]];
  function nu(tF) {
    var T = [[40, 1.664e-5], [50, 1.410e-5], [60, 1.217e-5], [70, 1.059e-5], [80, 0.930e-5], [90, 0.826e-5], [100, 0.739e-5]];
    if (tF <= 40) return T[0][1];
    for (var i = 1; i < T.length; i++) if (tF <= T[i][0]) { var f = (tF - T[i - 1][0]) / 10; return T[i - 1][1] + f * (T[i][1] - T[i - 1][1]); }
    return T[T.length - 1][1];
  }
  function pipeCalc() {
    var Q = num('pQ'), d = num('pD'), L = num('pL'), C = num('pC'), e = num('pE'), t = num('pT'), K = num('pK') || 0, hm = num('pH');
    if (!(Q >= 0 && d > 0 && L > 0 && C > 0 && e >= 0 && t > 0)) { $('pipeOut').innerHTML = '<div class="out warn"><span>Check inputs</span><b>—</b></div>'; $('pipeWork').textContent = ''; return; }
    var V = velFps(Q, d), Dft = d / 12, v = nu(t), Re = V * Dft / v, hv = V * V / (2 * G);
    var hHW = hwLoss(Q, L, d, C);
    var f = Re < 2000 ? (Re > 0 ? 64 / Re : 0) : 0.25 / Math.pow(Math.log10(e / (3.7 * Dft) + 5.74 / Math.pow(Re, 0.9)), 2);
    var hDW = f * (L / Dft) * hv, hMinor = K * hv;
    var regime = Re < 2000 ? 'laminar' : Re < 4000 ? 'transitional' : 'turbulent';
    var out = [
      ['Velocity', fmt(V, 2) + ' ft/s', V > 5 ? 'Above about 5 ft/s' : 'Velocity head ' + fmt(hv, 3) + ' ft', V > 5 ? 'warn' : ''],
      ['Hazen-Williams loss', fmt(hHW, 2) + ' ft', fmt(hHW * 1000 / L, 2) + ' ft per 1,000 ft · ' + fmt(hHW * PSI_PER_FT, 2) + ' psi', ''],
      ['Darcy-Weisbach loss', fmt(hDW, 2) + ' ft', 'f = ' + fmt(f, 4) + ' (Swamee-Jain)', ''],
      ['Reynolds number', Re >= 1e4 ? Math.round(Re).toLocaleString('en-US') : fmt(Re, 0), regime + ' flow', '']
    ];
    if (K > 0) out.push(['Minor losses', fmt(hMinor, 2) + ' ft', 'K × V²/2g', '']);
    var solveC = '';
    if (hm > 0 && Q > 0) {
      var Cc = Math.pow(10.44 * L * Math.pow(Q, 1.852) / (hm * Math.pow(d, 4.8655)), 1 / 1.852);
      out.push(['C from your measured loss', fmt(Cc, 0), Cc < 80 ? 'Very rough, or a partly closed valve' : Cc > 150 ? 'Above new-pipe values: check the readings' : 'Plausible C factor', Cc < 80 || Cc > 150 ? 'warn' : 'good']);
      solveC = '\n<b>Solve for C:</b> C = [10.44 × L × Q^1.852 ÷ (h × d^4.8655)]^(1/1.852) = ' + fmt(Cc, 1);
    }
    $('pipeOut').innerHTML = out.map(function (o) { return '<div class="out ' + o[3] + '"><span>' + esc(o[0]) + '</span><b>' + esc(o[1]) + '</b><small>' + esc(o[2]) + '</small></div>'; }).join('');
    $('pipeWork').innerHTML = '<b>Velocity:</b> V = 0.4085 × ' + fmt(Q, 1) + ' ÷ ' + fmt(d, 2) + '² = ' + fmt(V, 3) + ' ft/s\n' +
      '<b>Hazen-Williams:</b> h = 10.44 × ' + fmt(L, 0) + ' × ' + fmt(Q, 1) + '^1.852 ÷ (' + fmt(C, 0) + '^1.852 × ' + fmt(d, 2) + '^4.8655) = ' + fmt(hHW, 3) + ' ft\n' +
      '<b>Reynolds:</b> Re = V × D ÷ ν = ' + fmt(V, 3) + ' × ' + fmt(Dft, 4) + ' ÷ ' + v.toExponential(3) + ' = ' + fmt(Re, 0) + '\n' +
      '<b>Darcy-Weisbach:</b> h = f × (L ÷ D) × V² ÷ 2g = ' + fmt(f, 4) + ' × ' + fmt(L / Dft, 0) + ' × ' + fmt(hv, 4) + ' = ' + fmt(hDW, 3) + ' ft' + solveC;
  }
  function initPipe() {
    $('pipeMat').innerHTML = MATS.map(function (m, i) { return '<button class="chip" type="button" data-m="' + i + '" aria-pressed="' + (i === 2) + '">' + esc(m[0]) + '</button>'; }).join('');
    $('pipeMat').addEventListener('click', function (e) {
      var b = e.target.closest('[data-m]');
      if (!b) return;
      var m = MATS[+b.dataset.m];
      $('pC').value = m[1]; $('pE').value = m[2];
      $('pipeMat').querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      pipeCalc();
    });
    ['pQ', 'pD', 'pL', 'pC', 'pE', 'pT', 'pK', 'pH'].forEach(function (id) { $(id).addEventListener('input', pipeCalc); });
    pipeCalc();
  }

  /* ================= PUMP LAB ================= */
  var pumpN = 1;
  function pumpCalc() {
    var Hs = num('uHs'), L = num('uL'), d = num('uD'), C = num('uC'), H0 = num('uH0'), Qd = num('uQd'), Hd = num('uHd'), eff = num('uEff') / 100, cost = num('uCost'), s = num('uS') / 100;
    $('uSo').textContent = Math.round(s * 100) + '%';
    if (!(L > 0 && d > 0 && C > 0 && H0 > 0 && Qd > 0 && Hd > 0 && Hd < H0 && eff > 0)) {
      $('pumpOut').innerHTML = '<div class="out warn"><span>Check inputs</span><b>—</b><small>The rated head must be below the shutoff head.</small></div>'; $('pumpChart').innerHTML = ''; $('pumpWork').textContent = ''; return;
    }
    var k = (H0 - Hd) / (Qd * Qd), rs = 10.44 * L / (Math.pow(C, 1.852) * Math.pow(d, 4.8655));
    function pumpH(Q) { var q = Q / pumpN; return s * s * H0 - k * q * q; }
    function sysH(Q) { return Hs + rs * Math.pow(Q, 1.852); }
    var Qmax = pumpN * Math.sqrt(s * s * H0 / k);
    var op = null;
    if (pumpH(0) > sysH(0)) {
      var lo = 0, hi = Qmax;
      for (var i = 0; i < 80; i++) { var mid = (lo + hi) / 2; if (pumpH(mid) > sysH(mid)) lo = mid; else hi = mid; }
      op = { Q: lo, H: pumpH(lo) };
    }
    function effAt(Qp) { var x = Qp / (s * Qd); return Math.max(0, eff * (2 * x - x * x)); }
    var outs = [];
    if (!op) {
      outs.push(['Operating point', 'No flow', 'Shutoff head at this speed (' + fmt(s * s * H0, 0) + ' ft) is below the static lift', 'bad']);
    } else {
      var Qp = op.Q / pumpN, e = effAt(Qp) || 0.01, whp = op.Q * op.H / 3960, bhp = whp / e, kw = bhp * 0.746;
      var mgd = op.Q * 1440 / 1e6, kwhPerMG = kw * 24 / mgd;
      outs.push(['Operating point', fmt(op.Q, 0) + ' gpm', 'at ' + fmt(op.H, 0) + ' ft of head (' + fmt(op.H * PSI_PER_FT, 0) + ' psi)', '']);
      outs.push(['Efficiency (illustrative)', fmt(e * 100, 0) + '%', pumpN > 1 ? 'Each pump runs at ' + fmt(Qp, 0) + ' gpm' : (Qp / (s * Qd) > 1.15 ? 'Running right of the best efficiency point' : Qp / (s * Qd) < 0.7 ? 'Running left of the best efficiency point' : 'Near the best efficiency point'), e < eff * 0.85 ? 'warn' : 'good']);
      outs.push(['Power', fmt(bhp, 1) + ' bhp', fmt(kw, 1) + ' kW (' + fmt(whp, 1) + ' water hp)', '']);
      outs.push(['Energy', fmt(kwhPerMG, 0) + ' kWh per MG', '$' + fmt(kw * 24 * cost, 2) + ' a day at $' + fmt(cost, 3) + '/kWh', '']);
    }
    $('pumpOut').innerHTML = outs.map(function (o) { return '<div class="out ' + o[3] + '"><span>' + esc(o[0]) + '</span><b>' + esc(o[1]) + '</b><small>' + esc(o[2]) + '</small></div>'; }).join('');
    /* chart */
    var W = 700, H = 300, Lm = 52, R = 48, T = 16, B = 36, xmax = Math.max(Qmax * 1.05, (op ? op.Q : 0) * 1.3, 100);
    var ymax = Math.max(H0 * 1.08, sysH(xmax * 0.9) > H0 * 1.5 ? H0 * 1.5 : sysH(xmax * 0.9)) || H0;
    function X(q) { return Lm + q / xmax * (W - Lm - R); }
    function Y(h) { return T + (1 - Math.max(0, Math.min(h, ymax)) / ymax) * (H - T - B); }
    function YE(e) { return T + (1 - e) * (H - T - B); }
    var pts = [], sp = [], ep = [], n = 120, j;
    for (j = 0; j <= n; j++) {
      var q = xmax * j / n;
      if (pumpH(q) >= 0) pts.push([X(q), Y(pumpH(q))]);
      sp.push([X(q), Y(sysH(q))]);
      var ee = effAt(q / pumpN);
      if (ee > 0) ep.push([X(q), YE(ee)]);
    }
    function poly(a) { return a.map(function (p, i2) { return (i2 ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' '); }
    var g = '<g class="grid">';
    for (j = 0; j <= 5; j++) g += '<line x1="' + Lm + '" x2="' + (W - R) + '" y1="' + Y(ymax * j / 5) + '" y2="' + Y(ymax * j / 5) + '"/>';
    g += '</g><g class="axis">';
    for (j = 0; j <= 5; j++) g += '<text x="' + (Lm - 6) + '" y="' + (Y(ymax * j / 5) + 4) + '" text-anchor="end">' + fmt(ymax * j / 5, 0) + '</text>';
    for (j = 0; j <= 5; j++) g += '<text x="' + X(xmax * j / 5) + '" y="' + (H - 14) + '" text-anchor="middle">' + fmt(xmax * j / 5, 0) + '</text>';
    for (j = 0; j <= 4; j++) g += '<text x="' + (W - R + 6) + '" y="' + (YE(j / 4) + 4) + '">' + (j * 25) + '%</text>';
    g += '<text x="' + Lm + '" y="10" class="lbl">head, ft</text><text x="' + (W - R) + '" y="' + (H - 1) + '" text-anchor="end" class="lbl">flow, gpm</text></g>';
    g += '<path d="' + poly(ep) + '" fill="none" stroke="#d97706" stroke-width="2" stroke-dasharray="6 4"/>';
    g += '<path d="' + poly(sp) + '" fill="none" stroke="#0e7490" stroke-width="3"/>';
    g += '<path d="' + poly(pts) + '" fill="none" stroke="#6d28d9" stroke-width="3"/>';
    g += '<line x1="' + Lm + '" x2="' + (W - R) + '" y1="' + Y(Hs) + '" y2="' + Y(Hs) + '" stroke="#0e7490" stroke-dasharray="3 5" stroke-width="1.5"/><text x="' + (Lm + 6) + '" y="' + (Y(Hs) - 5) + '" class="lbl">static lift</text>';
    if (op) g += '<circle cx="' + X(op.Q) + '" cy="' + Y(op.H) + '" r="7" fill="#fff" stroke="#0b2238" stroke-width="3"/>';
    $('pumpChart').innerHTML = g;
    $('pumpWork').innerHTML = '<b>Pump curve</b> (fit through shutoff and rated point): H = ' + fmt(s * s, 3) + ' × ' + fmt(H0, 0) + ' − ' + k.toExponential(3) + ' × (Q ÷ ' + pumpN + ')²\n' +
      '<b>System curve:</b> H = ' + fmt(Hs, 0) + ' + 10.44 × ' + fmt(L, 0) + ' × Q^1.852 ÷ (' + fmt(C, 0) + '^1.852 × ' + fmt(d, 1) + '^4.8655)\n' +
      '<b>Affinity laws at ' + Math.round(s * 100) + '% speed:</b> rated point moves to ' + fmt(Qd * s, 0) + ' gpm at ' + fmt(Hd * s * s, 0) + ' ft; power scales by ' + fmt(s * s * s, 3) + '.' +
      (op ? '\n<b>Power:</b> WHP = gpm × ft ÷ 3,960 = ' + fmt(op.Q, 0) + ' × ' + fmt(op.H, 1) + ' ÷ 3,960 = ' + fmt(op.Q * op.H / 3960, 2) + ' hp' : '');
  }
  function initPump() {
    ['uHs', 'uL', 'uD', 'uC', 'uH0', 'uQd', 'uHd', 'uEff', 'uCost', 'uS'].forEach(function (id) { $(id).addEventListener('input', pumpCalc); });
    $('uN').addEventListener('click', function (e) {
      var b = e.target.closest('[data-n]');
      if (!b) return;
      pumpN = +b.dataset.n;
      $('uN').querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); });
      pumpCalc();
    });
    pumpCalc();
  }

  /* ================= 48-HOUR TANK SIMULATOR ================= */
  var PATTERN = [0.60, 0.55, 0.52, 0.50, 0.52, 0.65, 0.95, 1.35, 1.50, 1.40, 1.25, 1.15, 1.10, 1.05, 1.00, 1.00, 1.05, 1.20, 1.40, 1.50, 1.35, 1.10, 0.85, 0.70];
  (function normalize() { var s = PATTERN.reduce(function (a, b) { return a + b; }, 0) / 24; PATTERN = PATTERN.map(function (v) { return v / s; }); })();
  function epsRun() {
    var Qa = num('eQ'), Qp = num('eP'), D = num('eD'), Hmax = num('eMax'), on = num('eOn'), off = num('eOff');
    if (!(Qa > 0 && Qp > 0 && D > 0 && Hmax > 0 && on >= 0 && off > on && off <= Hmax)) {
      $('epsOut').innerHTML = '<div class="out warn"><span>Check inputs</span><b>—</b><small>Pump OFF level must be above the ON level and at or below overflow.</small></div>'; $('epsChart').innerHTML = ''; return;
    }
    var galPerFt = Math.PI * D * D / 4 * 7.48, level = (on + off) / 2, pump = false, dt = 1; /* minutes */
    var series = [], starts = 0, runMin = 0, minL = Infinity, maxL = -Infinity, empty = 0, spill = 0, outVol = 0;
    for (var t = 0; t < 48 * 60; t += dt) {
      var hr = Math.floor(t / 60) % 24, dem = Qa * PATTERN[hr];
      if (!pump && level <= on) { pump = true; starts++; }
      if (pump && level >= off) pump = false;
      var qin = pump ? Qp : 0;
      if (pump) runMin += dt;
      var nl = level + (qin - dem) * dt / galPerFt;
      if (nl > Hmax) { spill += (nl - Hmax) * galPerFt; nl = Hmax; }
      if (nl < 0) { empty += dt; nl = 0; }
      if (qin < dem) outVol += (dem - qin) * dt;
      level = nl;
      minL = Math.min(minL, level); maxL = Math.max(maxL, level);
      if (t % 10 === 0) series.push([t / 60, level, pump]);
    }
    var vol = galPerFt * Hmax, turnover = outVol / 2 / (galPerFt * Hmax) * 100;
    var outs = [
      ['Tank volume', fmt(vol / 1e3, 0) + 'k gal', fmt(galPerFt, 0) + ' gallons per foot of level', ''],
      ['Level range', fmt(minL, 1) + '–' + fmt(maxL, 1) + ' ft', empty ? 'Tank ran EMPTY for ' + fmt(empty / 60, 1) + ' hours' : 'Never empty', empty ? 'bad' : 'good'],
      ['Pump starts', fmt(starts / 2, 1) + ' per day', fmt(runMin / 2 / 60, 1) + ' hours of running a day', starts / 2 > 12 ? 'warn' : ''],
      ['Daily turnover', fmt(turnover, 0) + '%', 'Share of the tank volume drawn out and refilled each day', turnover < 20 ? 'warn' : '']
    ];
    if (spill > 0) outs.push(['Overflow', fmt(spill / 2, 0) + ' gal/day', 'The pump overfilled the tank', 'bad']);
    if (Qp < Qa * Math.max.apply(null, PATTERN) && !empty) outs.push(['Peak coverage', 'Storage', 'The pump is smaller than peak-hour demand; the tank covers the difference', '']);
    $('epsOut').innerHTML = outs.map(function (o) { return '<div class="out ' + o[3] + '"><span>' + esc(o[0]) + '</span><b>' + esc(o[1]) + '</b><small>' + esc(o[2]) + '</small></div>'; }).join('');
    /* chart */
    var W = 700, H = 280, Lm = 44, R = 12, T = 12, B = 36;
    function X(h) { return Lm + h / 48 * (W - Lm - R); }
    function Y(l) { return T + (1 - l / Hmax) * (H - T - B); }
    var g = '<g class="grid">', j;
    for (j = 0; j <= 4; j++) g += '<line x1="' + Lm + '" x2="' + (W - R) + '" y1="' + Y(Hmax * j / 4) + '" y2="' + Y(Hmax * j / 4) + '"/>';
    g += '</g>';
    /* pump running bands */
    var startH = null;
    series.forEach(function (p, i) {
      if (p[2] && startH === null) startH = p[0];
      if ((!p[2] || i === series.length - 1) && startH !== null) { g += '<rect x="' + X(startH) + '" y="' + T + '" width="' + Math.max(1, X(p[0]) - X(startH)) + '" height="' + (H - T - B) + '" fill="#c4b5fd" opacity=".45"/>'; startH = null; }
    });
    g += '<line x1="' + Lm + '" x2="' + (W - R) + '" y1="' + Y(on) + '" y2="' + Y(on) + '" stroke="#16a34a" stroke-dasharray="5 4"/><text x="' + (W - R - 4) + '" y="' + (Y(on) - 4) + '" text-anchor="end" class="lbl">pump ON</text>';
    g += '<line x1="' + Lm + '" x2="' + (W - R) + '" y1="' + Y(off) + '" y2="' + Y(off) + '" stroke="#dc2626" stroke-dasharray="5 4"/><text x="' + (W - R - 4) + '" y="' + (Y(off) - 4) + '" text-anchor="end" class="lbl">pump OFF</text>';
    g += '<path d="' + series.map(function (p, i) { return (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1); }).join(' ') + '" fill="none" stroke="#0e7490" stroke-width="3"/>';
    g += '<g class="axis">';
    for (j = 0; j <= 4; j++) g += '<text x="' + (Lm - 6) + '" y="' + (Y(Hmax * j / 4) + 4) + '" text-anchor="end">' + fmt(Hmax * j / 4, 0) + '</text>';
    for (j = 0; j <= 48; j += 6) g += '<text x="' + X(j) + '" y="' + (H - 14) + '" text-anchor="middle">' + (j % 24 === 0 ? (j ? 'midnight' : '0 h') : (j % 24 === 12 ? 'noon' : j + ' h')) + '</text>';
    g += '<text x="' + Lm + '" y="9" class="lbl">tank level, ft</text></g>';
    $('epsChart').innerHTML = g;
  }
  function initEps() {
    $('ePattern').innerHTML = PATTERN.map(function (v) { return '<i style="height:' + Math.round(v / 1.6 * 100) + '%" title="' + fmt(v, 2) + '"></i>'; }).join('');
    ['eQ', 'eP', 'eD', 'eMax', 'eOn', 'eOff'].forEach(function (id) { $(id).addEventListener('input', epsRun); });
    epsRun();
  }

  /* ================= HYDRANT FLOW TEST ================= */
  function hydCalc() {
    var S = num('hS'), Rr = num('hR'), P = num('hP'), d = num('hD'), c = num('hC'), Qm = num('hQ'), Tg = num('hT');
    if (!(S > 0 && Rr >= 0 && Rr < S && Tg >= 0 && Tg < S)) { $('hydOut').innerHTML = '<div class="out warn"><span>Check inputs</span><b>—</b><small>Residual and target must be below the static pressure.</small></div>'; $('hydWork').textContent = ''; return; }
    var usePitot = !(Qm > 0), Q = usePitot ? 29.84 * c * d * d * Math.sqrt(Math.max(P, 0)) : Qm;
    if (!(Q > 0)) { $('hydOut').innerHTML = '<div class="out warn"><span>Check inputs</span><b>—</b><small>Enter a pitot pressure or a measured flow.</small></div>'; return; }
    var QR = Q * Math.pow((S - Tg) / (S - Rr), 0.54), Q20 = Q * Math.pow((S - 20) / (S - Rr), 0.54);
    var cls = Q20 >= 1500 ? ['AA', 'light blue', 'good'] : Q20 >= 1000 ? ['A', 'green', 'good'] : Q20 >= 500 ? ['B', 'orange', 'warn'] : ['C', 'red', 'bad'];
    var drop = (S - Rr) / S * 100;
    $('hydOut').innerHTML =
      '<div class="out"><span>Test flow</span><b>' + fmt(Q, 0) + ' gpm</b><small>' + (usePitot ? 'From the pitot reading' : 'Measured') + '</small></div>' +
      '<div class="out good"><span>Available at ' + fmt(Tg, 0) + ' psi</span><b>' + fmt(QR, 0) + ' gpm</b><small>Projected with the 0.54 exponent</small></div>' +
      '<div class="out ' + cls[2] + '"><span>NFPA 291 class (at 20 psi)</span><b>Class ' + cls[0] + '</b><small>Bonnet color: ' + cls[1] + '</small></div>' +
      '<div class="out ' + (drop < 10 ? 'warn' : '') + '"><span>Pressure drop during test</span><b>' + fmt(S - Rr, 0) + ' psi</b><small>' + fmt(drop, 0) + '% of static' + (drop < 10 ? ': small, so the projection is less certain' : '') + '</small></div>';
    $('hydWork').innerHTML = (usePitot ? '<b>Pitot flow:</b> Q = 29.84 × c × d² × √p = 29.84 × ' + fmt(c, 2) + ' × ' + fmt(d, 3) + '² × √' + fmt(P, 1) + ' = ' + fmt(Q, 0) + ' gpm\n' : '') +
      '<b>Projection:</b> Q_R = Q × [(S − R_target) ÷ (S − R)]^0.54 = ' + fmt(Q, 0) + ' × [(' + fmt(S, 1) + ' − ' + fmt(Tg, 1) + ') ÷ (' + fmt(S, 1) + ' − ' + fmt(Rr, 1) + ')]^0.54 = ' + fmt(QR, 0) + ' gpm\n' +
      'Classes: AA ≥ 1,500 gpm (light blue) · A 1,000–1,499 (green) · B 500–999 (orange) · C under 500 (red).';
  }
  function initHyd() { ['hS', 'hR', 'hP', 'hD', 'hC', 'hQ', 'hT'].forEach(function (id) { $(id).addEventListener('input', hydCalc); }); hydCalc(); }

  /* ================= WATER HAMMER ================= */
  var WAVES = [['Ductile iron', 4000], ['Steel', 3500], ['Asbestos-cement', 3200], ['PVC (C900, DR18)', 1350], ['HDPE (DR11)', 1000]];
  function surgeCalc() {
    var a = num('sA'), dV = num('sV'), L = num('sL'), tc = num('sT'), P = num('sP'), R = num('sR');
    if (!(a > 0 && dV >= 0 && L > 0 && tc >= 0 && P >= 0)) { $('surgeOut').innerHTML = '<div class="out warn"><span>Check inputs</span><b>—</b></div>'; $('surgeWork').textContent = ''; return; }
    var dHj = a * dV / G, tcrit = 2 * L / a, slow = tc > tcrit;
    var dH = slow ? 2 * L * dV / (G * tc) : dHj, dP = dH * PSI_PER_FT, total = P + dP;
    $('surgeOut').innerHTML =
      '<div class="out"><span>Sudden-stop surge</span><b>' + fmt(dHj * PSI_PER_FT, 0) + ' psi</b><small>Joukowsky: ' + fmt(dHj, 0) + ' ft of head</small></div>' +
      '<div class="out"><span>Critical time 2L/a</span><b>' + fmt(tcrit, 2) + ' s</b><small>' + (slow ? 'Your closure is slower, so the surge is reduced' : 'Your closure is faster: full surge') + '</small></div>' +
      '<div class="out ' + (R > 0 && total > R ? 'bad' : total > P * 1.5 ? 'warn' : 'good') + '"><span>Peak pressure</span><b>' + fmt(total, 0) + ' psi</b><small>' + fmt(P, 0) + ' psi normal + ' + fmt(dP, 0) + ' psi surge' + (R > 0 ? (total > R ? ': above the pipe rating' : ' · rating ' + fmt(R, 0) + ' psi') : '') + '</small></div>' +
      (function () {
        var allowFt = (R > P ? R - P : 50) / PSI_PER_FT, label = R > P ? 'the pipe rating' : '50 psi of surge';
        if (dHj <= allowFt) return '<div class="out good"><span>Safe closure time</span><b>Any</b><small>Even a sudden stop stays under ' + label + '</small></div>';
        return '<div class="out"><span>Close no faster than</span><b>' + fmt(2 * L * dV / (G * allowFt), 1) + ' s</b><small>to stay under ' + label + ' (Michaud estimate)</small></div>';
      })();
    $('surgeWork').innerHTML = '<b>Joukowsky:</b> ΔH = a × ΔV ÷ g = ' + fmt(a, 0) + ' × ' + fmt(dV, 2) + ' ÷ 32.2 = ' + fmt(dHj, 1) + ' ft = ' + fmt(dHj * PSI_PER_FT, 1) + ' psi\n' +
      '<b>Critical time:</b> 2L ÷ a = 2 × ' + fmt(L, 0) + ' ÷ ' + fmt(a, 0) + ' = ' + fmt(tcrit, 3) + ' s\n' +
      (slow ? '<b>Slow closure (Michaud):</b> ΔH ≈ 2 × L × ΔV ÷ (g × t) = 2 × ' + fmt(L, 0) + ' × ' + fmt(dV, 2) + ' ÷ (32.2 × ' + fmt(tc, 2) + ') = ' + fmt(dH, 1) + ' ft = ' + fmt(dP, 1) + ' psi' : 'Closure time ≤ 2L/a, so the full Joukowsky surge applies.');
  }
  function initSurge() {
    $('surgeMat').innerHTML = WAVES.map(function (w, i) { return '<button class="chip" type="button" data-w="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(w[0]) + '</button>'; }).join('');
    $('surgeMat').addEventListener('click', function (e) {
      var b = e.target.closest('[data-w]');
      if (!b) return;
      $('sA').value = WAVES[+b.dataset.w][1];
      $('surgeMat').querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      surgeCalc();
    });
    ['sA', 'sV', 'sL', 'sT', 'sP', 'sR'].forEach(function (id) { $(id).addEventListener('input', surgeCalc); });
    surgeCalc();
  }

  /* ================= QUIZ ================= */
  global.DEEP_QUIZ = [
    { q: 'Who develops EPANET?', choices: ['The U.S. Environmental Protection Agency', 'The American Water Works Association', 'The U.S. Geological Survey', 'The National Fire Protection Association'], correct: 0, explain: 'EPANET is free, public-domain software from the U.S. EPA, first released in 1993; version 2.3 came out in 2025.' },
    { q: 'In a hydraulic model, which component holds a fixed hydraulic grade no matter how much water is drawn?', choices: ['A reservoir', 'A tank', 'A junction', 'A pipe'], correct: 0, explain: 'A reservoir is an infinite fixed-head source. A tank\'s level rises and falls over time in an extended period simulation.' },
    { q: 'What does an extended period simulation (EPS) add to a steady-state run?', choices: ['Changes over time: tank levels, demand patterns, and controls', 'Water hammer', 'Three-dimensional pipe flow', 'Groundwater flow'], correct: 0, explain: 'An EPS runs a series of time steps, updating tank levels and switching pumps and valves by their controls.' },
    { q: 'Fire flow analysis is usually run on top of which demand?', choices: ['Maximum day demand', 'Minimum night demand', 'Average day demand', 'Peak hour demand'], correct: 0, explain: 'Standard practice combines the required fire flow with maximum day demand.' },
    { q: 'What minimum pressure do the Ten States Standards require everywhere in the distribution system, including during fire flow?', choices: ['20 psi', '35 psi', '60 psi', '10 psi'], correct: 0, explain: '20 psi at ground level under all conditions of flow. The normal working pressure should be about 60–80 psi and not less than 35 psi.' },
    { q: 'At the same flow, replacing a 6-inch main with a 12-inch main cuts Hazen-Williams head loss by about…', choices: ['29 times', '2 times', '4 times', '100 times'], correct: 0, explain: 'Head loss varies with 1 ÷ d^4.87, and 2^4.87 ≈ 29.' },
    { q: 'What exponent is used to project a hydrant flow test to 20 psi residual?', choices: ['0.54', '1.85', '0.5', '2.0'], correct: 0, explain: 'Q20 = Q × [(S − 20) ÷ (S − R)]^0.54. The 0.54 is 1 ÷ 1.85, the Hazen-Williams flow exponent.' },
    { q: 'A model shows much higher pressures than field readings in one neighborhood. What\'s a classic cause?', choices: ['A closed or partly closed valve the model doesn\'t know about', 'The water is too cold', 'Too many customers have water softeners', 'The pipes are too smooth in the field'], correct: 0, explain: 'Unknown closed valves are one of the most common calibration problems. Check valve status and elevations before adjusting roughness.' },
    { q: 'What is skeletonization?', choices: ['Leaving out or combining small pipes to simplify a model', 'Removing corrosion from old mains', 'Mapping pipes with ground-penetrating radar', 'Draining a pipe for repair'], correct: 0, explain: 'Skeletonized models are fine for transmission planning; fire flow and water quality work usually needs all mains.' },
    { q: 'In metal pipe, about how much pressure does each 1 ft/s of sudden velocity change add?', choices: ['50–60 psi', '1–2 psi', '5 psi', '500 psi'], correct: 0, explain: 'Joukowsky: ΔH = a × ΔV ÷ g. With a ≈ 4,000 ft/s, that\'s about 124 ft, or roughly 54 psi, per ft/s.' },
    { q: 'By the affinity laws, how does pump power change with speed?', choices: ['With speed cubed', 'Directly with speed', 'With speed squared', 'It doesn\'t change'], correct: 0, explain: 'Flow ∝ speed, head ∝ speed², power ∝ speed³. That\'s why variable speed drives save so much energy.' },
    { q: 'Which is most likely to increase water age?', choices: ['An oversized storage tank that turns over too little', 'A looped grid of mains', 'Frequent unidirectional flushing', 'A booster pump'], correct: 0, explain: 'Poor tank turnover and dead ends raise water age, which lowers disinfectant residual and raises DBPs.' },
    { q: 'What does the gradient method in EPANET solve for at each iteration?', choices: ['All junction heads at once, then updates every pipe flow', 'One loop at a time', 'Only the pump flows', 'Only the tank levels'], correct: 0, explain: 'The Todini-Pilati gradient method linearizes head loss, solves one linear system for all heads, then updates the flows until they stop changing.' },
    { q: 'Where does a pump operate?', choices: ['Where its pump curve crosses the system curve', 'At its shutoff head', 'At the motor\'s nameplate horsepower', 'Always at its best efficiency point'], correct: 0, explain: 'The operating point is the intersection of the head the pump supplies and the head the system needs at each flow.' }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    initLab();
    initPipe();
    initPump();
    initEps();
    initHyd();
    initSurge();
  });

  /* exposed for tests */
  global.LW_HYD = { solve: solve, hwLoss: hwLoss, state: function () { return lab; } };
})(window);
