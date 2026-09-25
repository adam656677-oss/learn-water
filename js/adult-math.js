/* ==========================================================
   LearnWater — operator math practice
   Every problem is generated with fresh numbers, solved here
   in code, and shown with a worked solution. Formulas follow
   the Mississippi Waterworks Operators Manual (Chapters 3–5,
   8, 9) and standard operator-exam practice.
   Levels: 1 = Class D, 2 = Class C/B, 3 = Class B, 4 = Class A
   ========================================================== */
(function (global) {
  'use strict';

  var TOPICS = {
    chem:     { name: 'Chlorine & chemical feed' },
    volume:   { name: 'Volume & detention time' },
    flow:     { name: 'Flow & pipes' },
    pressure: { name: 'Pressure, head & pumps' },
    wells:    { name: 'Wells' },
    treat:    { name: 'Treatment rates' }
  };

  /* ---------- helpers ---------- */
  function r(min, max, step) {
    var n = Math.round((min + Math.random() * (max - min)) / step) * step;
    return +n.toFixed(6);
  }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function roundTo(n, d) { var p = Math.pow(10, d); return Math.round(n * p) / p; }
  /* Plain number with thousands separators, trailing zeros trimmed */
  function f(n, d) {
    return Number(roundTo(n, d == null ? 2 : d)).toLocaleString('en-US', { maximumFractionDigits: d == null ? 2 : d });
  }

  /* Each generator returns { prompt, answer, unit, decimals, steps[] } */
  var GEN = [
    /* ================= Chlorine & chemical feed ================= */
    { id: 'feed-mgd', topic: 'chem', level: 1, make: function () {
      var mgd = r(0.15, 2.5, 0.05), dose = r(0.8, 4, 0.1);
      var ans = dose * mgd * 8.34;
      return { prompt: 'A plant treats ' + f(mgd) + ' MGD and needs a chlorine dose of ' + f(dose, 1) + ' mg/L. How many pounds of chlorine are needed per day?',
        answer: ans, unit: 'lbs/day', decimals: 1,
        steps: ['Pounds formula: lbs/day = dose (mg/L) × flow (MGD) × 8.34',
                f(dose, 1) + ' × ' + f(mgd) + ' × 8.34 = ' + f(ans, 1) + ' lbs/day'] };
    } },
    { id: 'feed-gpm', topic: 'chem', level: 1, make: function () {
      var gpm = r(150, 1200, 10), dose = r(0.5, 3, 0.1);
      var mgd = gpm * 1440 / 1e6, ans = dose * mgd * 8.34;
      return { prompt: 'A well pumps ' + f(gpm, 0) + ' gpm around the clock and needs ' + f(dose, 1) + ' mg/L of chlorine. How many pounds of chlorine per 24 hours?',
        answer: ans, unit: 'lbs/day', decimals: 1,
        steps: ['Convert gpm to MGD: ' + f(gpm, 0) + ' gpm × 1,440 min/day ÷ 1,000,000 = ' + f(mgd, 4) + ' MGD',
                'lbs/day = ' + f(dose, 1) + ' mg/L × ' + f(mgd, 4) + ' MGD × 8.34 = ' + f(ans, 1) + ' lbs/day',
                'Manual shortcut (Ch. 8D): ppm × gpm × 0.012 = ' + f(dose * gpm * 0.012, 1) + ' lbs/24 hr — the same answer, rounded'] };
    } },
    { id: 'hth', topic: 'chem', level: 1, make: function () {
      var mgd = r(0.05, 1, 0.01), dose = r(1, 3, 0.1), pct = pick([65, 70]);
      var pure = dose * mgd * 8.34, ans = pure / (pct / 100);
      return { prompt: 'A system treats ' + f(mgd) + ' MGD with a chlorine dose of ' + f(dose, 1) + ' mg/L, using ' + pct + '% HTH (calcium hypochlorite). How many pounds of HTH are needed per day?',
        answer: ans, unit: 'lbs/day', decimals: 2,
        steps: ['Pounds of pure chlorine: ' + f(dose, 1) + ' × ' + f(mgd) + ' × 8.34 = ' + f(pure, 3) + ' lbs/day',
                'Divide by the purity: ' + f(pure, 3) + ' ÷ ' + (pct / 100).toFixed(2) + ' = ' + f(ans, 2) + ' lbs of HTH per day'] };
    } },
    { id: 'demand', topic: 'chem', level: 1, make: function () {
      var dose = r(1.5, 5, 0.1), resid = r(0.2, Math.min(1.2, dose - 0.5), 0.1);
      if (Math.random() < 0.5) {
        var dem = dose - resid;
        return { prompt: 'The chlorine dose is ' + f(dose, 1) + ' mg/L and the free residual after contact time is ' + f(resid, 1) + ' mg/L. What is the chlorine demand?',
          answer: dem, unit: 'mg/L', decimals: 2,
          steps: ['Demand = dose − residual', f(dose, 1) + ' − ' + f(resid, 1) + ' = ' + f(dem, 2) + ' mg/L'] };
      }
      var demand = r(0.8, 3.5, 0.1), want = r(0.2, 1, 0.1), need = demand + want;
      return { prompt: 'The water has a chlorine demand of ' + f(demand, 1) + ' mg/L. What dose is needed to leave a free residual of ' + f(want, 1) + ' mg/L?',
        answer: need, unit: 'mg/L', decimals: 2,
        steps: ['Dose = demand + desired residual', f(demand, 1) + ' + ' + f(want, 1) + ' = ' + f(need, 2) + ' mg/L'] };
    } },
    { id: 'dose-from-feed', topic: 'chem', level: 2, make: function () {
      var mgd = r(0.2, 3, 0.05), lbs = r(5, 90, 0.5);
      var ans = lbs / (mgd * 8.34);
      return { prompt: 'A chlorinator feeds ' + f(lbs, 1) + ' lbs/day into a flow of ' + f(mgd) + ' MGD. What is the chlorine dose in mg/L?',
        answer: ans, unit: 'mg/L', decimals: 2,
        steps: ['Rearrange the pounds formula: dose = lbs/day ÷ (MGD × 8.34)',
                f(lbs, 1) + ' ÷ (' + f(mgd) + ' × 8.34) = ' + f(lbs, 1) + ' ÷ ' + f(mgd * 8.34, 3) + ' = ' + f(ans, 2) + ' mg/L'] };
    } },
    { id: 'bleach', topic: 'chem', level: 2, make: function () {
      var gal = r(20000, 400000, 5000), dose = pick([25, 50]), pct = pick([10, 12.5]);
      var mgL = pct * 10000, ans = dose * gal / mgL;
      return { prompt: 'You will disinfect a ' + f(gal, 0) + '-gallon storage tank to ' + dose + ' mg/L using ' + pct + '% liquid bleach (sodium hypochlorite). How many gallons of bleach are needed? (Treat the bleach as weighing the same as water.)',
        answer: ans, unit: 'gal', decimals: 1,
        steps: ['Convert the bleach strength to mg/L: ' + pct + '% × 10,000 = ' + f(mgL, 0) + ' mg/L',
                'Dilution formula: C₁ × V₁ = C₂ × V₂, so V₁ = C₂ × V₂ ÷ C₁',
                dose + ' mg/L × ' + f(gal, 0) + ' gal ÷ ' + f(mgL, 0) + ' mg/L = ' + f(ans, 1) + ' gallons of bleach'] };
    } },
    { id: 'chem-feed', topic: 'chem', level: 2, make: function () {
      var chem = pick([['alum', 10, 45], ['ferric sulfate', 8, 35], ['lime', 5, 40], ['polymer', 0.5, 3]]);
      var mgd = r(0.5, 6, 0.1), dose = r(chem[1], chem[2], chem[1] < 1 ? 0.1 : 1);
      var ans = dose * mgd * 8.34;
      return { prompt: 'A jar test shows the best ' + chem[0] + ' dose is ' + f(dose, 1) + ' mg/L. The plant flow is ' + f(mgd, 1) + ' MGD. How many pounds of ' + chem[0] + ' are needed per day?',
        answer: ans, unit: 'lbs/day', decimals: 1,
        steps: ['lbs/day = dose × MGD × 8.34', f(dose, 1) + ' × ' + f(mgd, 1) + ' × 8.34 = ' + f(ans, 1) + ' lbs/day'] };
    } },

    /* ================= Volume & detention ================= */
    { id: 'cyl', topic: 'volume', level: 1, make: function () {
      var d = r(10, 60, 2), h = r(10, 40, 1);
      var ft3 = 0.785 * d * d * h, ans = ft3 * 7.48;
      return { prompt: 'A cylindrical tank is ' + d + ' ft in diameter with ' + h + ' ft of water in it. How many gallons does it hold?',
        answer: ans, unit: 'gal', decimals: 0,
        steps: ['Volume (ft³) = 0.785 × D² × H = 0.785 × ' + d + '² × ' + h + ' = ' + f(ft3, 1) + ' ft³',
                'Gallons = ft³ × 7.48 = ' + f(ft3, 1) + ' × 7.48 = ' + f(ans, 0) + ' gal'] };
    } },
    { id: 'rect', topic: 'volume', level: 1, make: function () {
      var l = r(20, 120, 5), w = r(10, 60, 5), h = r(8, 20, 1);
      var ft3 = l * w * h, ans = ft3 * 7.48;
      return { prompt: 'A rectangular basin is ' + l + ' ft long, ' + w + ' ft wide, and holds water ' + h + ' ft deep. How many gallons is that?',
        answer: ans, unit: 'gal', decimals: 0,
        steps: ['Volume = L × W × H = ' + l + ' × ' + w + ' × ' + h + ' = ' + f(ft3, 0) + ' ft³',
                'Gallons = ' + f(ft3, 0) + ' × 7.48 = ' + f(ans, 0) + ' gal'] };
    } },
    { id: 'pipe-vol', topic: 'volume', level: 1, make: function () {
      var din = pick([4, 6, 8, 10, 12, 16]), len = r(200, 2500, 50);
      var dft = din / 12, ft3 = 0.785 * dft * dft * len, ans = ft3 * 7.48;
      return { prompt: 'How many gallons of water are in ' + f(len, 0) + ' ft of ' + din + '-inch main?',
        answer: ans, unit: 'gal', decimals: 0,
        steps: ['Convert the diameter to feet: ' + din + ' in ÷ 12 = ' + f(dft, 3) + ' ft',
                'Volume = 0.785 × D² × L = 0.785 × ' + f(dft, 3) + '² × ' + f(len, 0) + ' = ' + f(ft3, 1) + ' ft³',
                'Gallons = ' + f(ft3, 1) + ' × 7.48 = ' + f(ans, 0) + ' gal'] };
    } },
    { id: 'detention', topic: 'volume', level: 2, make: function () {
      var gal = r(50000, 600000, 10000), gpm = r(150, 1500, 10);
      var min = gal / gpm, ans = min / 60;
      return { prompt: 'A clearwell holds ' + f(gal, 0) + ' gallons and water flows through it at ' + f(gpm, 0) + ' gpm. What is the detention time in hours?',
        answer: ans, unit: 'hours', decimals: 2,
        steps: ['Detention time = volume ÷ flow = ' + f(gal, 0) + ' gal ÷ ' + f(gpm, 0) + ' gpm = ' + f(min, 1) + ' minutes',
                'Convert to hours: ' + f(min, 1) + ' ÷ 60 = ' + f(ans, 2) + ' hours'] };
    } },
    { id: 'basin-dt', topic: 'volume', level: 2, make: function () {
      var l = r(40, 120, 5), w = r(15, 40, 5), h = r(10, 16, 1), mgd = r(0.5, 4, 0.1);
      var gal = l * w * h * 7.48, gph = mgd * 1e6 / 24, ans = gal / gph;
      return { prompt: 'A sedimentation basin is ' + l + ' ft × ' + w + ' ft × ' + h + ' ft deep. The flow is ' + f(mgd, 1) + ' MGD. What is the detention time in hours?',
        answer: ans, unit: 'hours', decimals: 2,
        steps: ['Basin volume = ' + l + ' × ' + w + ' × ' + h + ' × 7.48 = ' + f(gal, 0) + ' gal',
                'Flow per hour = ' + f(mgd * 1e6, 0) + ' gal/day ÷ 24 = ' + f(gph, 0) + ' gal/hr',
                'Detention time = ' + f(gal, 0) + ' ÷ ' + f(gph, 0) + ' = ' + f(ans, 2) + ' hours'] };
    } },

    /* ================= Flow & pipes ================= */
    { id: 'mgd-gpm', topic: 'flow', level: 1, make: function () {
      var mgd = r(0.1, 5, 0.05), ans = mgd * 1e6 / 1440;
      return { prompt: 'Convert ' + f(mgd) + ' MGD to gallons per minute.',
        answer: ans, unit: 'gpm', decimals: 0,
        steps: [f(mgd) + ' MGD × 1,000,000 = ' + f(mgd * 1e6, 0) + ' gal/day',
                f(mgd * 1e6, 0) + ' ÷ 1,440 min/day = ' + f(ans, 0) + ' gpm'] };
    } },
    { id: 'gpm-mgd', topic: 'flow', level: 1, make: function () {
      var gpm = r(100, 3000, 25), ans = gpm * 1440 / 1e6;
      return { prompt: 'A pump runs continuously at ' + f(gpm, 0) + ' gpm. What is that flow in MGD?',
        answer: ans, unit: 'MGD', decimals: 3,
        steps: [f(gpm, 0) + ' gpm × 1,440 min/day = ' + f(gpm * 1440, 0) + ' gal/day',
                f(gpm * 1440, 0) + ' ÷ 1,000,000 = ' + f(ans, 3) + ' MGD'] };
    } },
    { id: 'pumped', topic: 'flow', level: 1, make: function () {
      var gpm = r(100, 1500, 25), hrs = r(2, 20, 0.5), ans = gpm * 60 * hrs;
      return { prompt: 'A well pump delivers ' + f(gpm, 0) + ' gpm and runs ' + f(hrs, 1) + ' hours. How many gallons does it pump?',
        answer: ans, unit: 'gal', decimals: 0,
        steps: ['Gallons = gpm × 60 min/hr × hours', f(gpm, 0) + ' × 60 × ' + f(hrs, 1) + ' = ' + f(ans, 0) + ' gal'] };
    } },
    { id: 'average', topic: 'flow', level: 1, make: function () {
      var days = [], base = r(0.3, 2.5, 0.01), sum = 0;
      for (var i = 0; i < 7; i++) { var v = roundTo(base * (0.85 + Math.random() * 0.3), 3); days.push(v); sum += v; }
      var ans = sum / 7;
      return { prompt: 'Daily flows for one week (MGD): ' + days.map(function (v) { return f(v, 3); }).join(', ') + '. What was the average daily flow?',
        answer: ans, unit: 'MGD', decimals: 3,
        steps: ['Add the seven days: ' + f(sum, 3) + ' MG', 'Divide by 7: ' + f(sum, 3) + ' ÷ 7 = ' + f(ans, 3) + ' MGD'] };
    } },
    { id: 'qav', topic: 'flow', level: 2, make: function () {
      var din = pick([6, 8, 10, 12, 16, 18, 24]), v = r(1.5, 5, 0.1);
      var dft = din / 12, area = 0.785 * dft * dft, cfs = area * v, ans = cfs * 448.8;
      return { prompt: 'Water moves through a ' + din + '-inch main at ' + f(v, 1) + ' ft/sec. What is the flow in gpm?',
        answer: ans, unit: 'gpm', decimals: 0,
        steps: ['Pipe area = 0.785 × D² = 0.785 × (' + din + ' ÷ 12 ft)² = ' + f(area, 4) + ' ft²',
                'Q = A × V = ' + f(area, 4) + ' × ' + f(v, 1) + ' = ' + f(cfs, 3) + ' ft³/sec',
                'Convert: 1 ft³/sec = 448.8 gpm (7.48 gal × 60 sec), so ' + f(cfs, 3) + ' × 448.8 = ' + f(ans, 0) + ' gpm'] };
    } },
    { id: 'velocity', topic: 'flow', level: 2, make: function () {
      var din = pick([6, 8, 10, 12, 16]), gpm = r(150, 1800, 10);
      var dft = din / 12, area = 0.785 * dft * dft, cfs = gpm / 448.8, ans = cfs / area;
      return { prompt: 'A ' + din + '-inch main carries ' + f(gpm, 0) + ' gpm. What is the velocity in ft/sec?',
        answer: ans, unit: 'ft/sec', decimals: 2,
        steps: ['Convert the flow: ' + f(gpm, 0) + ' gpm ÷ 448.8 = ' + f(cfs, 3) + ' ft³/sec',
                'Pipe area = 0.785 × (' + din + ' ÷ 12)² = ' + f(area, 4) + ' ft²',
                'V = Q ÷ A = ' + f(cfs, 3) + ' ÷ ' + f(area, 4) + ' = ' + f(ans, 2) + ' ft/sec'] };
    } },

    /* ================= Pressure, head & pumps ================= */
    { id: 'psi-ft', topic: 'pressure', level: 1, make: function () {
      var psi = r(20, 120, 1), ans = psi * 2.31;
      return { prompt: 'A pressure gauge reads ' + psi + ' psi. How many feet of head is that?',
        answer: ans, unit: 'ft', decimals: 1,
        steps: ['1 psi = 2.31 ft of water', psi + ' × 2.31 = ' + f(ans, 1) + ' ft'] };
    } },
    { id: 'ft-psi', topic: 'pressure', level: 1, make: function () {
      var ft = r(20, 200, 1), ans = ft * 0.433;
      return { prompt: 'The water level in a standpipe is ' + ft + ' ft above a pressure gauge. What does the gauge read in psi?',
        answer: ans, unit: 'psi', decimals: 1,
        steps: ['1 ft of water = 0.433 psi', ft + ' × 0.433 = ' + f(ans, 1) + ' psi'] };
    } },
    { id: 'tank-psi', topic: 'pressure', level: 1, make: function () {
      var top = r(350, 520, 1), low = r(top - 190, top - 60, 1), ans = (top - low) * 0.433;
      return { prompt: 'The water surface in an elevated tank is at elevation ' + top + ' ft. A hydrant sits at elevation ' + low + ' ft. With no water flowing, what is the static pressure at the hydrant?',
        answer: ans, unit: 'psi', decimals: 1,
        steps: ['Static head = ' + top + ' − ' + low + ' = ' + (top - low) + ' ft', (top - low) + ' ft × 0.433 = ' + f(ans, 1) + ' psi'] };
    } },
    { id: 'whp', topic: 'pressure', level: 3, make: function () {
      var gpm = r(100, 2000, 25), tdh = r(50, 300, 5), ans = gpm * tdh / 3960;
      return { prompt: 'A pump delivers ' + f(gpm, 0) + ' gpm against a total dynamic head of ' + tdh + ' ft. What is the water horsepower?',
        answer: ans, unit: 'WHP', decimals: 2,
        steps: ['WHP = gpm × TDH ÷ 3,960', f(gpm, 0) + ' × ' + tdh + ' ÷ 3,960 = ' + f(ans, 2) + ' WHP'] };
    } },
    { id: 'bhp', topic: 'pressure', level: 3, make: function () {
      var gpm = r(100, 2000, 25), tdh = r(50, 300, 5), eff = r(60, 85, 1);
      var whp = gpm * tdh / 3960, ans = whp / (eff / 100);
      return { prompt: 'A pump moves ' + f(gpm, 0) + ' gpm against ' + tdh + ' ft of total head. The pump is ' + eff + '% efficient. What brake horsepower does it need?',
        answer: ans, unit: 'BHP', decimals: 2,
        steps: ['WHP = ' + f(gpm, 0) + ' × ' + tdh + ' ÷ 3,960 = ' + f(whp, 3),
                'BHP = WHP ÷ pump efficiency = ' + f(whp, 3) + ' ÷ ' + (eff / 100).toFixed(2) + ' = ' + f(ans, 2) + ' BHP'] };
    } },
    { id: 'mhp', topic: 'pressure', level: 4, make: function () {
      var gpm = r(200, 2500, 25), tdh = r(60, 300, 5), pe = r(65, 85, 1), me = r(86, 95, 1);
      var whp = gpm * tdh / 3960, bhp = whp / (pe / 100), ans = bhp / (me / 100);
      return { prompt: 'A pump delivers ' + f(gpm, 0) + ' gpm at ' + tdh + ' ft TDH. Pump efficiency is ' + pe + '% and motor efficiency is ' + me + '%. What motor horsepower is required?',
        answer: ans, unit: 'MHP', decimals: 2,
        steps: ['WHP = ' + f(gpm, 0) + ' × ' + tdh + ' ÷ 3,960 = ' + f(whp, 3),
                'BHP = ' + f(whp, 3) + ' ÷ ' + (pe / 100).toFixed(2) + ' = ' + f(bhp, 3),
                'MHP = ' + f(bhp, 3) + ' ÷ ' + (me / 100).toFixed(2) + ' = ' + f(ans, 2) + ' MHP'] };
    } },

    /* ================= Wells ================= */
    { id: 'drawdown', topic: 'wells', level: 1, make: function () {
      var stat = r(40, 150, 1), pump = stat + r(15, 80, 1), ans = pump - stat;
      return { prompt: 'Before pumping, the water level in a well is ' + stat + ' ft below the surface. After pumping stabilizes it is ' + pump + ' ft below the surface. What is the drawdown?',
        answer: ans, unit: 'ft', decimals: 1,
        steps: ['Drawdown = pumping water level − static water level', pump + ' − ' + stat + ' = ' + ans + ' ft'] };
    } },
    { id: 'spec-cap', topic: 'wells', level: 1, make: function () {
      var gpm = r(100, 1500, 10), dd = r(10, 80, 1), ans = gpm / dd;
      return { prompt: 'A well produces ' + f(gpm, 0) + ' gpm with ' + dd + ' ft of drawdown. What is its specific capacity?',
        answer: ans, unit: 'gpm/ft', decimals: 2,
        steps: ['Specific capacity = pumping rate ÷ drawdown', f(gpm, 0) + ' ÷ ' + dd + ' = ' + f(ans, 2) + ' gpm per ft'] };
    } },
    { id: 'yield', topic: 'wells', level: 1, make: function () {
      var sc = r(5, 40, 0.5), dd = r(15, 60, 1), ans = sc * dd;
      return { prompt: 'A well has a specific capacity of ' + f(sc, 1) + ' gpm/ft. About how many gpm should it produce at ' + dd + ' ft of drawdown?',
        answer: ans, unit: 'gpm', decimals: 0,
        steps: ['Pumping rate = specific capacity × drawdown', f(sc, 1) + ' × ' + dd + ' = ' + f(ans, 0) + ' gpm'] };
    } },
    { id: 'well-disinfect', topic: 'wells', level: 2, make: function () {
      var din = pick([8, 10, 12, 16]), depth = r(100, 400, 5), pct = pick([65, 70]);
      var dft = din / 12, gal = 0.785 * dft * dft * depth * 7.48, mg = gal / 1e6, pure = 50 * mg * 8.34, ans = pure / (pct / 100);
      return { prompt: 'A new ' + din + '-inch well has ' + depth + ' ft of water standing in the casing. How many pounds of ' + pct + '% HTH will dose that water to 50 mg/L?',
        answer: ans, unit: 'lbs', decimals: 3,
        steps: ['Water volume = 0.785 × (' + din + ' ÷ 12)² × ' + depth + ' × 7.48 = ' + f(gal, 1) + ' gal = ' + f(mg, 6) + ' MG',
                'Pure chlorine = 50 mg/L × ' + f(mg, 6) + ' MG × 8.34 = ' + f(pure, 3) + ' lbs',
                'HTH = ' + f(pure, 3) + ' ÷ ' + (pct / 100).toFixed(2) + ' = ' + f(ans, 3) + ' lbs'] };
    } },

    /* ================= Treatment rates ================= */
    { id: 'overflow', topic: 'treat', level: 2, make: function () {
      var l = r(40, 120, 5), w = r(15, 40, 5), mgd = r(0.5, 4, 0.1);
      var area = l * w, gpd = mgd * 1e6, ans = gpd / area;
      return { prompt: 'A rectangular clarifier is ' + l + ' ft × ' + w + ' ft and treats ' + f(mgd, 1) + ' MGD. What is the surface overflow rate?',
        answer: ans, unit: 'gpd/ft²', decimals: 0,
        steps: ['Surface area = ' + l + ' × ' + w + ' = ' + f(area, 0) + ' ft²',
                'Overflow rate = ' + f(gpd, 0) + ' gpd ÷ ' + f(area, 0) + ' ft² = ' + f(ans, 0) + ' gpd/ft²'] };
    } },
    { id: 'filter-rate', topic: 'treat', level: 2, make: function () {
      var l = r(10, 30, 1), w = r(10, 25, 1), gpm = r(300, 2500, 10);
      var area = l * w, ans = gpm / area;
      return { prompt: 'A filter is ' + l + ' ft × ' + w + ' ft and receives ' + f(gpm, 0) + ' gpm. What is the filtration (loading) rate?',
        answer: ans, unit: 'gpm/ft²', decimals: 2,
        steps: ['Filter area = ' + l + ' × ' + w + ' = ' + area + ' ft²', 'Rate = ' + f(gpm, 0) + ' ÷ ' + area + ' = ' + f(ans, 2) + ' gpm/ft²'] };
    } },
    { id: 'backwash', topic: 'treat', level: 2, make: function () {
      var l = r(10, 25, 1), w = r(10, 20, 1), rate = r(10, 20, 0.5);
      var area = l * w, gpm = roundTo(area * rate, 0), ans = gpm / area;
      return { prompt: 'A ' + l + ' ft × ' + w + ' ft filter is backwashed at ' + f(gpm, 0) + ' gpm. What is the backwash rate?',
        answer: ans, unit: 'gpm/ft²', decimals: 1,
        steps: ['Filter area = ' + l + ' × ' + w + ' = ' + area + ' ft²', 'Backwash rate = ' + f(gpm, 0) + ' ÷ ' + area + ' = ' + f(ans, 1) + ' gpm/ft²'] };
    } },
    { id: 'removal', topic: 'treat', level: 2, make: function () {
      var raw = r(5, 60, 0.5), fin = r(0.05, 0.5, 0.01), ans = (raw - fin) / raw * 100;
      return { prompt: 'Raw water turbidity is ' + f(raw, 1) + ' NTU and filtered water is ' + f(fin, 2) + ' NTU. What is the percent removal?',
        answer: ans, unit: '%', decimals: 1,
        steps: ['% removal = (in − out) ÷ in × 100', '(' + f(raw, 1) + ' − ' + f(fin, 2) + ') ÷ ' + f(raw, 1) + ' × 100 = ' + f(ans, 1) + '%'] };
    } },
    { id: 'weir', topic: 'treat', level: 4, make: function () {
      var d = r(40, 100, 5), mgd = r(1, 8, 0.1);
      var len = 3.14 * d, gpd = mgd * 1e6, ans = gpd / len;
      return { prompt: 'A circular clarifier is ' + d + ' ft in diameter with a weir around its full edge. The flow is ' + f(mgd, 1) + ' MGD. What is the weir overflow rate?',
        answer: ans, unit: 'gpd/ft', decimals: 0,
        steps: ['Weir length = π × D = 3.14 × ' + d + ' = ' + f(len, 1) + ' ft',
                'Weir overflow rate = ' + f(gpd, 0) + ' gpd ÷ ' + f(len, 1) + ' ft = ' + f(ans, 0) + ' gpd/ft',
                'Design limit in the manual: 20,000 gpd/ft'] };
    } },
    { id: 'ct', topic: 'treat', level: 4, make: function () {
      if (Math.random() < 0.5) {
        var c = r(0.4, 2, 0.1), t = r(10, 60, 1), ans = c * t;
        return { prompt: 'The free chlorine residual leaving a contact basin is ' + f(c, 1) + ' mg/L and the effective contact time is ' + t + ' minutes. What is the CT value?',
          answer: ans, unit: 'mg·min/L', decimals: 1,
          steps: ['CT = residual concentration (mg/L) × contact time (min)', f(c, 1) + ' × ' + t + ' = ' + f(ans, 1) + ' mg·min/L'] };
      }
      var ct = r(20, 90, 1), cc = r(0.5, 2, 0.1), need = ct / cc;
      return { prompt: 'You need a CT of ' + ct + ' mg·min/L and your residual is ' + f(cc, 1) + ' mg/L. How many minutes of contact time are required?',
        answer: need, unit: 'min', decimals: 1,
        steps: ['T = CT ÷ C', ct + ' ÷ ' + f(cc, 1) + ' = ' + f(need, 1) + ' minutes'] };
    } }
  ];

  var FORMULAS = [
    ['Pounds formula', 'lbs/day = dose (mg/L) × flow (MGD) × 8.34'],
    ['Product at less than 100%', 'lbs of product = lbs of pure chemical ÷ purity (0.65 for 65% HTH)'],
    ['Chlorine demand', 'demand = dose − residual'],
    ['Dilution', 'C₁ × V₁ = C₂ × V₂   (1% = 10,000 mg/L)'],
    ['Circle area', '0.785 × D²'],
    ['Cylinder volume', '0.785 × D² × H  (ft³) × 7.48 = gallons'],
    ['Rectangle volume', 'L × W × H  (ft³) × 7.48 = gallons'],
    ['Detention time', 'volume ÷ flow (keep the time units matched)'],
    ['Flow', 'Q (ft³/sec) = A (ft²) × V (ft/sec);  1 ft³/sec = 448.8 gpm'],
    ['MGD ↔ gpm', 'gpm = MGD × 1,000,000 ÷ 1,440'],
    ['Pressure ↔ head', '1 ft = 0.433 psi;  1 psi = 2.31 ft'],
    ['Horsepower', 'WHP = gpm × TDH ÷ 3,960;  BHP = WHP ÷ pump eff.;  MHP = BHP ÷ motor eff.'],
    ['Wells', 'drawdown = pumping level − static level;  specific capacity = gpm ÷ drawdown'],
    ['Overflow & filter rates', 'overflow = gpd ÷ ft²;  filter rate = gpm ÷ ft²;  weir rate = gpd ÷ weir ft'],
    ['CT', 'CT = residual (mg/L) × contact time (min)'],
    ['Constants', '8.34 lbs/gal · 7.48 gal/ft³ · 62.4 lbs/ft³ · 1,440 min/day · π ≈ 3.14']
  ];

  function available(level, topic) {
    return GEN.filter(function (g) { return g.level <= level && (!topic || topic === 'all' || g.topic === topic); });
  }

  function shuffled(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  /* A round deals every problem type once before repeating any,
     and never shows the same type twice in a row */
  function round(level, topic, count) {
    var pool = available(level, topic), out = [], bag = [];
    if (!pool.length) return out;
    while (out.length < count) {
      if (!bag.length) {
        bag = shuffled(pool);
        var last = out.length ? out[out.length - 1].gen : null, end = bag.length - 1;
        if (end > 0 && bag[end].id === last) { var t = bag[0]; bag[0] = bag[end]; bag[end] = t; }
      }
      var g = bag.pop(), p = g.make();
      p.gen = g.id; p.topic = g.topic;
      out.push(p);
    }
    return out;
  }

  /* Accepts "35,231", "35231 gal", "$1,000"; within 1% (or half the last shown digit) */
  function parse(text) {
    var s = String(text || '').replace(/,/g, '').match(/-?\d*\.?\d+(e-?\d+)?/i);
    return s ? parseFloat(s[0]) : NaN;
  }
  function check(p, text) {
    var v = parse(text);
    if (isNaN(v)) return null;
    var tol = Math.max(Math.abs(p.answer) * 0.01, 0.5 * Math.pow(10, -p.decimals));
    return { value: v, ok: Math.abs(v - p.answer) <= tol };
  }
  function show(p) { return f(p.answer, p.decimals) + ' ' + p.unit; }

  global.LW_MATH = { topics: TOPICS, formulas: FORMULAS, round: round, check: check, show: show, available: available, fmt: f, generators: GEN };
})(window);
