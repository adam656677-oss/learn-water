/* ==========================================================
   LearnWater — Mississippi's Aquifers (ms-aquifers.html)
   Aquifer stack, virtual-well cross-section, map, profiles,
   water-level records, Theis cone-of-depression lab, Darcy
   travel-time calculator, and the quiz bank.
   Facts come from USGS and MDEQ reports cited on the page.
   ========================================================== */
(function (global) {
  'use strict';

  var esc = LW.esc;
  function $(x) { return document.getElementById(x); }
  var SVGNS = 'http://www.w3.org/2000/svg';
  function fmt(n, d) { return global.DEEP ? DEEP.fmt(n, d) : String(n); }

  /* ================= PROFILES (aquifers) ================= */
  var REGIONS = { delta: 'Delta', north: 'North', northeast: 'Northeast', central: 'Central', south: 'South & Coast' };
  var AQ = {
    mrva: { name: 'Mississippi River Valley alluvial aquifer', short: 'Alluvial aquifer (MRVA)', age: 'Quaternary', color: '#f5d77a', regions: ['delta'],
      units: 'River-laid sand and gravel of the Mississippi Alluvial Plain',
      sum: 'The Delta\'s aquifer, and the most heavily pumped aquifer in Mississippi.',
      facts: ['Underlies about 7,000 square miles of northwest Mississippi (all or parts of 17 counties) and continues into six other states.',
        'Usually more than 75 feet thick (roughly 25 to more than 150 feet), coarsest near the bottom, and capped by a silt-and-clay top layer.',
        'About 98% of the water pumped from it goes to agriculture: irrigation and catfish ponds. Across the whole alluvial plain, the aquifer ranks third in the nation for total withdrawals.',
        'Water is usually hard to very hard and often high in iron and manganese, which limits drinking-water use.',
        'Long-term declines center on the central Delta. In the USGS spring 2024 map, the lowest water level (about 60 feet above sea level) was in Sunflower County.'],
      ask: 'What is the Mississippi River Valley alluvial aquifer?' },
    citronelle: { name: 'Citronelle aquifers', short: 'Citronelle', age: 'Pliocene', color: '#f2c46b', regions: ['south'],
      units: 'Sand and gravel of the Citronelle Formation (named for Citronelle, Alabama)',
      sum: 'Shallow water-table aquifers capping the hills of south Mississippi.',
      facts: ['A patchy outcrop of about 6,000 square miles across southern Mississippi.', 'Unconfined, with an average saturated thickness of about 45 feet.', 'Used mostly for domestic and farm wells, and also by several towns and industries.', 'Shallow and unconfined, so it\'s the most exposed to contamination from the surface. Wellhead protection matters.'],
      ask: 'Tell me about the Citronelle aquifer' },
    miocene: { name: 'Miocene aquifer system', short: 'Miocene system', age: 'Miocene', color: '#f7e19b', regions: ['south'],
      units: 'Catahoula Sandstone and the Hattiesburg, Pascagoula, and Graham Ferry formations',
      sum: 'The main water source for south Mississippi and the Gulf Coast.',
      facts: ['A thick stack of sands and clays, about 1,000 to 4,000 feet thick in all.', 'Fresh water reaches about 1,200 feet deep east of Pascagoula and more than 3,000 feet deep in western Hancock County.', 'Near Pascagoula, the Graham Ferry Formation holds the most widely used aquifer.', 'Heavy coastal pumping has lowered water levels in some of its aquifers about 2 feet a year since 1940, with declines of more than 100 feet across large areas.', 'Rain recharges it where it crops out inland; the water moves south and southeast toward the coast.', 'The Hattiesburg Formation is named for Hattiesburg.'],
      ask: 'Tell me about the Miocene aquifer system' },
    oligocene: { name: 'Oligocene aquifer system (Forest Hill)', short: 'Forest Hill / Oligocene', age: 'Oligocene', color: '#e8d9a8', regions: ['central'],
      units: 'Forest Hill Sand, and limestone and marl of the Vicksburg Group',
      sum: 'Valley-fill sands used mostly by domestic and farm wells across central Mississippi.',
      facts: ['Crops out in a band 5 to 10 miles wide that runs southeast across the state, from the Warren–Yazoo county line to northeastern Wayne County.', 'Valley-fill sands in the Forest Hill Formation make the aquifers.', 'Most important for domestic and farm wells rather than large public supplies.'],
      ask: 'What is the Forest Hill aquifer?' },
    cockfield: { name: 'Cockfield aquifer', short: 'Cockfield', age: 'Eocene', color: '#f0cf7e', regions: ['central', 'delta'],
      units: 'Cockfield Formation (upper Claiborne Group)',
      sum: 'The uppermost Claiborne aquifer: a principal water source in central and west-central Mississippi.',
      facts: ['Called the upper Claiborne aquifer in regional USGS studies.', 'Covered by the Yazoo Clay of the Jackson Group, and separated from the Sparta below by the Cook Mountain Formation.', 'USGS tracks Cockfield and Sparta water levels under the Jackson area.'],
      ask: 'Tell me about the Cockfield aquifer' },
    sparta: { name: 'Sparta aquifer (Middle Claiborne)', short: 'Sparta', age: 'Eocene', color: '#f4c85d', regions: ['central', 'north', 'delta'],
      units: 'Sparta Sand, also called the Kosciusko Sand in Mississippi; the Memphis Sand in Tennessee',
      sum: 'Part of the most widely used aquifer for industry and public supply in the Mississippi embayment.',
      facts: ['The same Middle Claiborne aquifer runs under Tennessee (as the Memphis Sand), Arkansas, and Louisiana.', 'Heavily pumped in the Jackson metro area, where USGS found cones of depression more than 40 feet deep in Rankin County.', 'Long-record wells in the Jackson area declined about 2.5 feet a year; some wells to the north, 3.5 to more than 4 feet a year.', 'Chloride increases down-dip, toward the south and the embayment axis.', 'The aquifer at the center of Mississippi v. Tennessee (2021).'],
      ask: 'Tell me about the Sparta aquifer' },
    winona: { name: 'Winona-Tallahatta aquifer', short: 'Winona-Tallahatta', age: 'Eocene', color: '#efd58f', regions: ['north', 'central'],
      units: 'Winona Sand and sands of the Tallahatta Formation (lower Claiborne Group)',
      sum: 'A widespread aquifer of small domestic and stock wells.',
      facts: ['Holds fresh water (under 1,000 mg/L dissolved solids) beneath about a quarter of the state, in northwestern and central Mississippi.', 'Its sands continue into Tennessee as part of the Memphis aquifer; in Arkansas and Louisiana the unit is the Cane River Formation.', 'Supplies few large users, but hundreds of small domestic and stock wells, most less than 200 feet deep.', 'The Winona Sand is named for Winona, Mississippi.'],
      ask: 'Tell me about the Winona-Tallahatta aquifer' },
    muw: { name: 'Meridian-upper Wilcox aquifer', short: 'Meridian-upper Wilcox', age: 'Eocene', color: '#f1c46e', regions: ['north', 'central', 'delta'],
      units: 'Meridian Sand Member of the Tallahatta Formation plus connected sands in the upper Wilcox Group',
      sum: 'A major source for public and industrial supplies in northwestern and central Mississippi.',
      facts: ['Holds fresh water beneath about 15,000 square miles of northwestern and central Mississippi.', 'Sand thickness adds up to anywhere from less than 50 to about 500 feet; thick, permeable sands yield as much as 2,800 gpm to a well.', 'Fresh water extends more than 2,000 feet deep.', 'The most common problems are too much iron and corrosive water. It\'s used even where dissolved solids top 500 mg/L.', 'The Meridian Sand is named for Meridian.'],
      ask: 'Tell me about the Meridian-upper Wilcox aquifer' },
    mwilcox: { name: 'Middle Wilcox aquifer', short: 'Middle Wilcox', age: 'Paleocene–Eocene', color: '#eed28e', regions: ['north', 'central'],
      units: 'Sand beds between the lower Wilcox and the Meridian-upper Wilcox',
      sum: 'Many thin sands that act together as one aquifer system.',
      facts: ['USGS calls these connected sands the middle Wilcox aquifer system and describes it as a potentially significant source of ground water in Mississippi.', 'The sands are thin and interbedded with silt and clay; regionally the unit is generally less than 200 feet thick.', 'In Tennessee, the equivalent unit is the Fort Pillow Sand.'],
      ask: 'What is the middle Wilcox aquifer?' },
    lwilcox: { name: 'Lower Wilcox aquifer', short: 'Lower Wilcox', age: 'Paleocene', color: '#e9bf62', regions: ['north', 'delta'],
      units: 'Sands of the lower Wilcox Group',
      sum: 'A deep confined aquifer of north Mississippi with a well-known cone of depression.',
      facts: ['Recharged where it crops out in north-central Mississippi; its water surface slopes west, down-dip, away from there.', 'Heavy pumping formed a large cone of depression under Tallahatchie, Quitman, and Panola counties.', 'Water levels fell about 1 to 2 feet a year after 1979 in much of the confined part.', 'Lies just above the Porters Creek Clay, the confining unit under the Flatwoods.'],
      ask: 'Tell me about the lower Wilcox aquifer' },
    ripley: { name: 'Ripley aquifer', short: 'Ripley', age: 'Late Cretaceous', color: '#e7d4a0', regions: ['northeast', 'north'],
      units: 'Ripley Formation of the Selma Group (named for Ripley, Mississippi)',
      sum: 'A moderate-yield aquifer of northern Mississippi.',
      facts: ['With the Coffee Sand, holds fresh water beneath about 4,400 square miles of northern Mississippi.', 'Public and industrial wells commonly yield 50 to 300 gpm.', 'Low well yields and hard water are the common problems.', 'Regional water-level declines have been small; USGS rated these aquifers as having moderate potential for more development.'],
      ask: 'Tell me about the Ripley aquifer' },
    coffee: { name: 'Coffee Sand aquifer', short: 'Coffee Sand', age: 'Late Cretaceous', color: '#e5cf96', regions: ['northeast'],
      units: 'Coffee Sand of the Selma Group',
      sum: 'A northern sand that gives way to chalk south of Tupelo.',
      facts: ['Part of the Coffee Sand and Ripley aquifer area of about 4,400 square miles in northern Mississippi.', 'South of Tupelo it yields little water to wells.', 'In 1975, public systems and industries pumped about 4 million gallons a day from the Coffee Sand and Ripley together.', 'Pumping in Tippah and Union counties has only mildly affected its water levels.'],
      ask: 'Tell me about the Coffee Sand aquifer' },
    eutaw: { name: 'Eutaw-McShan aquifer', short: 'Eutaw-McShan', age: 'Late Cretaceous', color: '#e9c878', regions: ['northeast', 'north'],
      units: 'Eutaw Formation (named for Eutaw, Alabama) and McShan Formation',
      sum: 'A major aquifer for northeast Mississippi, and the best-documented recovery in the state.',
      facts: ['Confined down-dip beneath the Selma chalk of the Black Prairie.', 'USGS reported long-term declines of 1 to 2 feet a year in much of the confined part, 2 to 9 feet a year in some Lee County wells, and about 5 feet a year near West Point after 1972.', 'USGS reports put water levels at Tupelo and West Point about 200 feet below early-1900s levels.', 'After Tupelo began using Tombigbee River water, the level beneath the city rose nearly 100 feet in about five years.'],
      ask: 'Tell me about the Eutaw-McShan aquifer' },
    gordo: { name: 'Gordo aquifer', short: 'Gordo', age: 'Late Cretaceous', color: '#e3bd6c', regions: ['northeast'],
      units: 'Gordo Formation of the Tuscaloosa Group',
      sum: 'The upper aquifer of the Tuscaloosa system, pumped with the Eutaw-McShan.',
      facts: ['Lies below the Eutaw-McShan in northeast Mississippi.', 'A USGS model simulated average declines of about 44 feet in its confined part (53 feet in the Eutaw-McShan).', 'USGS modeled the Eutaw-McShan, Gordo, Coker, massive sand, and Lower Cretaceous aquifers together over about 33,440 square miles.'],
      ask: 'Tell me about the Gordo aquifer' },
    coker: { name: 'Coker and massive sand aquifers', short: 'Coker / massive sand', age: 'Late Cretaceous', color: '#dfb563', regions: ['northeast'],
      units: 'Coker Formation and the thick “massive sand” of the lower Tuscaloosa Group',
      sum: 'The lower aquifers of the Tuscaloosa system, below the Gordo.',
      facts: ['Part of the Tuscaloosa aquifer system that USGS modeled with the Eutaw-McShan and Gordo.', 'Lower Cretaceous sands lie deeper still and were included in the same USGS model.'],
      ask: 'Tell me about the Coker aquifer' },
    paleozoic: { name: 'Paleozoic aquifer', short: 'Paleozoic', age: 'Paleozoic (Mississippian)', color: '#b8a9c9', regions: ['northeast'],
      units: 'Fort Payne Chert and Tuscumbia Limestone',
      sum: 'Mississippi\'s oldest aquifer, at the surface only in the far northeast.',
      facts: ['The oldest rocks exposed in Mississippi, cropping out in Tishomingo County.', 'Beds of sandstone, shale, and limestone dip about 30 feet per mile to the southwest.', 'The Fort Payne Chert and Tuscumbia Limestone hold the main water-bearing zones; wells commonly yield 20 to 30 gpm, and a few much more.', 'Supplies public, industrial, and domestic wells in two northeastern counties. Large withdrawals at Corinth lowered its water level there about 140 feet after 1954 (USGS).', 'Water moves through fractures and dissolved openings in the limestone, which can carry contamination quickly.'],
      ask: 'Tell me about the Paleozoic aquifer' }
  };
  var ORDER = ['mrva', 'citronelle', 'miocene', 'oligocene', 'cockfield', 'sparta', 'winona', 'muw', 'mwilcox', 'lwilcox', 'ripley', 'coffee', 'eutaw', 'gordo', 'coker', 'paleozoic'];

  /* Confining units for the stack */
  var CONF = {
    jackson: { name: 'Jackson Group (Yazoo Clay)', age: 'Eocene', color: '#b9c2b0', text: 'A thick clay that confines the Cockfield in central Mississippi. At the surface around Jackson, the Yazoo Clay shrinks and swells so much that it cracks foundations, streets, and water mains.' },
    cookmtn: { name: 'Cook Mountain Formation', age: 'Eocene', color: '#aab5a3', text: 'Clay and marl that separate the Cockfield above from the Sparta below. Regional studies call it the middle Claiborne confining unit.' },
    zilpha: { name: 'Zilpha Clay', age: 'Eocene', color: '#b2bba9', text: 'The clay between the Sparta above and the Winona-Tallahatta below.' },
    tallconf: { name: 'Tallahatta clay beds', age: 'Eocene', color: '#a9b3a1', text: 'Clay and shale beds in the Tallahatta Formation that separate the Winona-Tallahatta above from the Meridian-upper Wilcox below.' },
    midway: { name: 'Midway Group (Porters Creek Clay)', age: 'Paleocene', color: '#9fa996', text: 'The Porters Creek Clay underlies the Flatwoods of northeast Mississippi. It separates the Wilcox aquifers above from the Cretaceous aquifers below and is one of the most important confining units in the state.' },
    selma: { name: 'Selma Group chalk', age: 'Late Cretaceous', color: '#d9dde3', text: 'The chalk and marl of the Black Prairie. It confines the Eutaw-McShan below it. In northern Mississippi, sand (the Coffee Sand) takes the place of part of the chalk.' }
  };
  var STACK = [['Quaternary–Pliocene', ['mrva', 'citronelle']], ['Miocene–Oligocene', ['miocene', 'oligocene']],
    ['Eocene', ['jackson', 'cockfield', 'cookmtn', 'sparta', 'zilpha', 'winona', 'tallconf', 'muw']],
    ['Paleocene', ['mwilcox', 'lwilcox', 'midway']], ['Cretaceous', ['ripley', 'selma', 'coffee', 'eutaw', 'gordo', 'coker']], ['Paleozoic', ['paleozoic']]];

  function isAq(id) { return !!AQ[id]; }
  function unit(id) { return AQ[id] || CONF[id]; }

  /* ================= STACK ================= */
  var selStack = null;
  function renderStack() {
    var ul = $('aqStack'), html = '';
    STACK.forEach(function (g) {
      html += '<li class="aq-age" aria-hidden="true">' + esc(g[0]) + '</li>';
      g[1].forEach(function (id) {
        var u = unit(id), aq = isAq(id);
        html += '<li><button type="button" class="' + (aq ? '' : 'clay') + '" data-unit="' + id + '" aria-pressed="false" style="--lc:' + u.color + '">' +
          esc(aq ? u.short : u.name) + '<small>' + (aq ? 'aquifer' : 'confining') + '</small></button></li>';
      });
    });
    ul.innerHTML = html;
    ul.addEventListener('click', function (e) {
      var b = e.target.closest('[data-unit]');
      if (!b) return;
      showUnit(b.dataset.unit);
      /* On narrow screens the details sit below the whole stack: bring them into view */
      if (global.matchMedia && global.matchMedia('(max-width: 900px)').matches) {
        var d = $('aqDetail'), r = d.getBoundingClientRect();
        if (r.top > global.innerHeight - 80 || r.bottom < 0) d.scrollIntoView({ block: 'start', behavior: global.DEEP && DEEP.reduceMotion ? 'auto' : 'smooth' });
      }
    });
    showUnit('sparta');
  }
  function showUnit(id) {
    selStack = id;
    $('aqStack').querySelectorAll('[data-unit]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.unit === id ? 'true' : 'false'); });
    var u = unit(id), d = $('aqDetail');
    if (isAq(id)) {
      d.innerHTML = '<h3><span class="aq-swatch" style="--lc:' + u.color + '"></span>' + esc(u.name) + '</h3><span class="aq-sub">' + esc(u.age) + ' · ' + esc(u.units) + '</span>' +
        '<p>' + esc(u.sum) + '</p><ul>' + u.facts.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
        '<div class="ask-row"><a class="ask-chip" href="#aq-' + id + '" data-jump="' + id + '">Full profile</a><button class="ask-chip" type="button" data-ask="' + esc(u.ask) + '">Ask Greg</button></div>';
    } else {
      d.innerHTML = '<h3><span class="aq-swatch" style="--lc:' + u.color + '"></span>' + esc(u.name) + '</h3><span class="aq-sub">' + esc(u.age) + ' · confining unit</span>' +
        '<p>' + esc(u.text) + '</p><p class="fine">Confining units don\'t stop water completely; they slow it enough that the aquifers above and below behave as separate aquifers, each with its own pressure and chemistry.</p>' +
        '<div class="ask-row"><button class="ask-chip" type="button" data-ask="What is a confining unit?">What is a confining unit?</button></div>';
    }
  }

  /* ================= CROSS-SECTION ================= */
  /* Layers from oldest (bottom) to youngest. X = where the layer's top
     reaches the ground (0 = Gulf Coast, 1000 = NE corner); s = dip, so
     older layers dip more steeply and every layer thickens toward the Gulf. */
  var XS = [
    ['paleozoic', 955], ['coker', 915], ['gordo', 880], ['eutaw', 840], ['selma', 775], ['ripley', 745], ['midway', 705],
    ['lwilcox', 665], ['mwilcox', 635], ['muw', 600], ['tallconf', 580], ['winona', 555], ['zilpha', 540], ['sparta', 505],
    ['cookmtn', 490], ['cockfield', 450], ['jackson', 415], ['oligocene', 380], ['miocene', 260]
  ];
  var BELTS = [[0, 200, 'the Gulf Coast'], [200, 380, 'the Pine Belt (Piney Woods)'], [380, 450, 'the Jackson Prairie'], [450, 705, 'the North Central Hills'],
    [705, 745, 'the Flatwoods'], [745, 775, 'the Pontotoc Ridge'], [775, 840, 'the Black Prairie'], [840, 955, 'the northeast hills'], [955, 1001, 'Tishomingo County']];
  var DEPTH = 385;
  function ground(x) { return 82 - 26 * (x / 1000) + 2.5 * Math.sin(x / 41); }
  /* Dip in drawing units: the Miocene wedge is gentle; older tops plunge
     steeply, so down-dip they drop below the drawing (thousands of feet). */
  function slope(k) { return k === 18 ? 0.15 : 1.20 + 0.02 * (17 - k); }
  /* depth below ground of the TOP of layer k (0 at and beyond its outcrop) */
  function topDepth(k, x) {
    if (k >= XS.length) return 0;
    return Math.min(DEPTH, Math.max(0, (XS[k][1] - x) * slope(k)));
  }
  function citDepth(x) { return x >= 260 ? 0 : Math.min(24, 3 + (260 - x) * 0.1); } /* Citronelle / coastal cap */
  /* Layers at x, top to bottom: [{id, top, bot}] in depth units */
  function column(x) {
    var out = [], c = citDepth(x);
    if (c > 0.5) out.push({ id: 'citronelle', top: 0, bot: c });
    for (var k = XS.length - 1; k >= 0; k--) {
      var top = Math.max(topDepth(k, x), c), bot = k === 0 ? DEPTH : Math.max(topDepth(k - 1, x), c);
      if (bot - top > 0.6) out.push({ id: XS[k][0], top: top, bot: bot });
    }
    return out;
  }
  function el(tag, attrs) { var n = document.createElementNS(SVGNS, tag); for (var a in attrs) n.setAttribute(a, attrs[a]); return n; }
  var xsSvg, wellG, wellX = 470;
  function drawSection() {
    xsSvg = $('xsec');
    var W = 1000, step = 5, i, x, pts;
    xsSvg.appendChild(el('rect', { x: 0, y: 0, width: W, height: 470, fill: '#dff1fa' }));
    /* Gulf water */
    xsSvg.appendChild(el('path', { d: 'M0 ' + (ground(0) - 2) + ' L22 ' + (ground(22) - 1) + ' L22 470 L0 470 Z', fill: '#7cc6e6' }));
    function poly(k) {
      var top = [], bot = [];
      for (x = 0; x <= W; x += step) {
        var g = ground(x), c = citDepth(x);
        var t = Math.max(k >= XS.length ? 0 : topDepth(k, x), c), b = k === 0 ? DEPTH : Math.max(topDepth(k - 1, x), c);
        top.push([x, g + t]); bot.push([x, g + Math.max(b, t)]);
      }
      return 'M' + top.map(function (p) { return p[0] + ' ' + p[1].toFixed(1); }).join(' L') + ' L' + bot.reverse().map(function (p) { return p[0] + ' ' + p[1].toFixed(1); }).join(' L') + ' Z';
    }
    var defs = el('defs', {});
    var pat = el('pattern', { id: 'clayHatch', width: 8, height: 8, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(-45)' });
    pat.appendChild(el('line', { x1: 0, y1: 0, x2: 0, y2: 8, stroke: 'rgba(0,0,0,.09)', 'stroke-width': 3 }));
    defs.appendChild(pat);
    xsSvg.appendChild(defs);
    for (i = 0; i < XS.length; i++) {
      var id = XS[i][0], u = unit(id);
      var p = el('path', { d: poly(i), fill: u.color, stroke: 'rgba(13,33,51,.25)', 'stroke-width': 0.8, 'data-layer': id });
      xsSvg.appendChild(p);
      if (!isAq(id)) xsSvg.appendChild(el('path', { d: poly(i), fill: 'url(#clayHatch)', 'pointer-events': 'none' }));
    }
    /* Citronelle cap */
    pts = [];
    for (x = 0; x <= 260; x += step) pts.push(x + ' ' + ground(x).toFixed(1));
    var capBot = [];
    for (x = 260; x >= 0; x -= step) capBot.push(x + ' ' + (ground(x) + citDepth(x)).toFixed(1));
    xsSvg.appendChild(el('path', { d: 'M' + pts.join(' L') + ' L' + capBot.join(' L') + ' Z', fill: AQ.citronelle.color, stroke: 'rgba(13,33,51,.25)', 'stroke-width': 0.8 }));
    /* Ground line + sky labels */
    pts = [];
    for (x = 0; x <= W; x += step) pts.push(x + ' ' + ground(x).toFixed(1));
    xsSvg.appendChild(el('path', { d: 'M' + pts.join(' L'), fill: 'none', stroke: '#3f6212', 'stroke-width': 3 }));
    function label(x, y, t, anchor, size) { var n = el('text', { x: x, y: y, 'text-anchor': anchor || 'middle', 'font-size': size || 15, 'font-family': 'Overpass Mono, monospace', fill: '#134e4a', 'font-weight': 700 }); n.textContent = t; xsSvg.appendChild(n); return n; }
    label(8, 24, 'Gulf of Mexico ◂ SW', 'start', 16);
    label(992, 24, 'NE ▸ Tishomingo Co.', 'end', 16);
    [[110, 'COAST'], [320, 'PINE BELT'], [432, 'JACKSON PRAIRIE'], [575, 'NORTH CENTRAL HILLS'], [725, 'FLATWOODS'], [808, 'BLACK PRAIRIE'], [900, 'NE HILLS']].forEach(function (b, n) {
      label(b[0], n % 2 ? 58 : 44, b[1], 'middle', 12).setAttribute('class', 'xsec-belt');
    });
    /* Label each aquifer where it is thickest in view, skipping crowded spots */
    var placed = [];
    ['miocene', 'oligocene', 'cockfield', 'sparta', 'winona', 'muw', 'lwilcox', 'ripley', 'eutaw', 'gordo', 'coker', 'paleozoic'].forEach(function (id) {
      var k = -1;
      XS.forEach(function (l, n) { if (l[0] === id) k = n; });
      var best = null;
      for (var xx = 40; xx <= 975; xx += 5) {
        var c = citDepth(xx), top = Math.max(topDepth(k, xx), c), bot = k === 0 ? DEPTH : Math.max(topDepth(k - 1, xx), c);
        var th = bot - top;
        if (th > 15 && (!best || th > best.th)) best = { x: xx, y: ground(xx) + (top + bot) / 2 + 5, th: th };
      }
      if (!best) return;
      var w = AQ[id].short.length * 8.4;
      best.x = Math.max(w / 2 + 8, Math.min(1000 - w / 2 - 8, best.x));
      var clash = placed.some(function (p) { return Math.abs(p.x - best.x) < (p.w + w) / 2 + 8 && Math.abs(p.y - best.y) < 18; });
      if (clash) return;
      placed.push({ x: best.x, y: best.y, w: w });
      var t = label(best.x, best.y, AQ[id].short, 'middle', 14);
      t.setAttribute('fill', '#3b2f0b'); t.setAttribute('opacity', '.85'); t.setAttribute('pointer-events', 'none');
    });
    wellG = el('g', { 'pointer-events': 'none' });
    xsSvg.appendChild(wellG);
    function fromEvent(e) {
      var r = xsSvg.getBoundingClientRect(), cx = (e.touches ? e.touches[0].clientX : e.clientX);
      return Math.max(20, Math.min(990, (cx - r.left) / r.width * 1000));
    }
    var dragging = false;
    xsSvg.addEventListener('pointerdown', function (e) { dragging = true; setWell(fromEvent(e)); });
    xsSvg.addEventListener('pointermove', function (e) { if (dragging) setWell(fromEvent(e)); });
    global.addEventListener('pointerup', function () { dragging = false; });
    $('wellX').addEventListener('input', function () { setWell(+this.value); });
    setWell(470);
  }
  function setWell(x) {
    wellX = Math.round(x);
    $('wellX').value = wellX;
    var g = ground(wellX), col = column(wellX);
    wellG.innerHTML = '';
    wellG.appendChild(el('line', { x1: wellX, y1: g - 22, x2: wellX, y2: g + DEPTH, stroke: '#0b2238', 'stroke-width': 4 }));
    wellG.appendChild(el('path', { d: 'M' + (wellX - 12) + ' ' + (g - 2) + ' L' + wellX + ' ' + (g - 30) + ' L' + (wellX + 12) + ' ' + (g - 2) + ' Z', fill: 'none', stroke: '#0b2238', 'stroke-width': 3 }));
    var firstAq = null;
    col.forEach(function (c) { if (!firstAq && isAq(c.id)) firstAq = c; });
    if (firstAq) wellG.appendChild(el('circle', { cx: wellX, cy: g + (firstAq.top + firstAq.bot) / 2, r: 6, fill: '#0e7fc0', stroke: '#fff', 'stroke-width': 2 }));
    var belt = BELTS.filter(function (b) { return wellX >= b[0] && wellX < b[1]; })[0];
    var confinedBelow = false, aquifers = 0;
    var log = col.map(function (c, n) {
      var u = unit(c.id), aq = isAq(c.id), tag;
      if (aq) {
        aquifers++;
        tag = n === 0 || c.top < 1 ? 'Aquifer · at the surface (recharge area)' : confinedBelow ? 'Aquifer · confined (artesian)' : 'Aquifer';
      } else { tag = 'Confining unit'; confinedBelow = true; }
      return '<li class="' + (aq ? 'aquifer' : '') + '"><span class="aq-swatch" style="--lc:' + u.color + '"></span>' + esc(aq ? u.name : u.name) + '<span class="wl-tag">' + tag + '</span></li>';
    });
    $('wellLog').innerHTML = log.join('');
    var surf = unit(col[0].id);
    var below = XS.filter(function (l, n) { return !col.some(function (c) { return c.id === l[0]; }) && topDepth(n, wellX) >= DEPTH; }).length;
    $('wellWhere').textContent = 'Drilling in ' + (belt ? belt[2] : 'Mississippi') + ', where the ' + surf.name + ' is at the surface. Within the depth shown, this hole passes through ' + col.length + ' layers, including ' + aquifers + ' aquifers' +
      (below ? '; ' + below + ' older layers lie deeper still, below the drawing, where the water is often too mineralized to use.' : '.') +
      ' The farther southwest you drill, the more younger layers sit on top, so reaching the same aquifer takes a deeper well.';
  }

  /* ================= MAP ================= */
  var OUTLINE = [[-88.20, 34.995], [-88.47, 31.89], [-88.40, 30.23], [-88.56, 30.35], [-88.61, 30.39], [-88.83, 30.41], [-88.89, 30.40], [-89.09, 30.37], [-89.25, 30.31], [-89.32, 30.31], [-89.34, 30.37], [-89.38, 30.30], [-89.52, 30.19], [-89.60, 30.25], [-89.65, 30.45], [-89.70, 30.66], [-89.73, 31.00],
    [-91.64, 31.00], [-91.55, 31.25], [-91.43, 31.56], [-91.30, 31.85], [-91.12, 32.05], [-90.93, 32.30], [-91.05, 32.60], [-91.15, 32.90], [-91.16, 33.20], [-91.08, 33.42], [-91.20, 33.70], [-91.05, 33.95], [-90.85, 34.15], [-90.60, 34.35], [-90.55, 34.60], [-90.35, 34.85], [-90.25, 34.995]];
  var DELTA = [[-90.25, 34.995], [-90.35, 34.85], [-90.55, 34.60], [-90.60, 34.35], [-90.85, 34.15], [-91.05, 33.95], [-91.20, 33.70], [-91.08, 33.42], [-91.16, 33.20], [-91.15, 32.90], [-91.05, 32.60], [-90.93, 32.30],
    [-90.80, 32.49], [-90.41, 32.86], [-90.22, 33.18], [-90.18, 33.52], [-90.12, 33.80], [-90.06, 34.00], [-90.10, 34.25], [-90.20, 34.50], [-90.08, 34.75], [-90.05, 34.99]];
  var PINS = [
    { id: 'desoto', name: 'DeSoto County', label: 'DeSoto', side: 'r', lat: 34.93, lon: -89.99, text: 'North Mississippi\'s fast-growing suburbs sit over the Middle Claiborne aquifer, called the Sparta Sand in Mississippi and the Memphis Sand across the line in Tennessee. It\'s the aquifer at the center of Mississippi v. Tennessee. The Meridian-upper Wilcox lies deeper, and the western edge of the county is in the Delta.', aq: ['sparta', 'muw', 'mrva'] },
    { id: 'ndelta', name: 'North Delta (Clarksdale)', label: 'North Delta', side: 'r', lat: 34.20, lon: -90.57, text: 'Farms here irrigate from the alluvial aquifer. To the east, heavy pumping of the lower Wilcox formed a large cone of depression under Tallahatchie, Quitman, and Panola counties.', aq: ['mrva', 'lwilcox', 'muw'] },
    { id: 'cdelta', name: 'Central Delta (Indianola)', label: 'Central Delta', side: 'r', lat: 33.45, lon: -90.65, text: 'The heart of Delta irrigation and catfish farming, and the center of the alluvial aquifer\'s long-term decline: the lowest water level on the USGS spring 2024 map was in Sunflower County. Many Delta towns drill past the iron-rich alluvial aquifer into deeper sands for drinking water.', aq: ['mrva', 'cockfield', 'sparta', 'muw'] },
    { id: 'oxford', name: 'Oxford', label: 'Oxford', side: 't', lat: 34.37, lon: -89.52, text: 'In the North Central Hills. MDEQ has studied four aquifers beneath Lafayette County, each deeper than the last: the Meridian-upper Wilcox, the lower Wilcox, the Ripley, and the Eutaw-McShan.', aq: ['muw', 'lwilcox', 'ripley', 'eutaw'] },
    { id: 'tupelo', name: 'Tupelo', label: 'Tupelo', side: 'l', lat: 34.26, lon: -88.70, text: 'Cretaceous country: the Eutaw-McShan and Gordo, with the Coffee Sand to the north. Pumping once pulled Eutaw-McShan levels here about 200 feet below early-1900s levels. After Tupelo began using Tombigbee River water, the level under the city rose nearly 100 feet in about five years.', aq: ['eutaw', 'gordo', 'coffee'] },
    { id: 'corinth', name: 'Corinth', label: 'Corinth', side: 'b', lat: 34.93, lon: -88.52, text: 'Near the oldest rocks in the state. Large withdrawals at Corinth from the Paleozoic aquifer lowered its water level about 140 feet after 1954, according to a USGS study. Cretaceous sands overlie the Paleozoic rocks here.', aq: ['paleozoic', 'coker', 'gordo', 'coffee'] },
    { id: 'golden', name: 'Golden Triangle (West Point, Columbus, Starkville)', label: 'Golden Triangle', side: 'b', lat: 33.52, lon: -88.62, text: 'On the Black Prairie, whose chalk confines the Eutaw-McShan beneath it. USGS records showed a cone of depression near West Point declining about 5 feet a year after 1972. The Gordo and deeper Tuscaloosa sands lie below.', aq: ['eutaw', 'gordo', 'coker'] },
    { id: 'jackson', name: 'Jackson metro', label: 'Jackson', side: 'r', lat: 32.30, lon: -90.18, text: 'The City of Jackson treats surface water from the Ross Barnett Reservoir and the Pearl River. Around it, suburbs pump the Sparta and Cockfield, and USGS has documented cones of depression more than 40 feet deep in Rankin County. Forest Hill sands serve domestic wells, and the Yazoo Clay at the surface is famous for shrink-swell damage.', aq: ['sparta', 'cockfield', 'oligocene', 'muw'] },
    { id: 'meridian', name: 'Meridian', label: 'Meridian', side: 'l', lat: 32.36, lon: -88.70, text: 'East-central Mississippi relies heavily on the Meridian-upper Wilcox aquifer; the Meridian Sand is named for the city. Other Wilcox sands lie deeper.', aq: ['muw', 'mwilcox', 'lwilcox'] },
    { id: 'hburg', name: 'Hattiesburg and the Pine Belt', label: 'Hattiesburg', side: 'l', lat: 31.33, lon: -89.29, text: 'Miocene sands supply the Pine Belt, and the Hattiesburg Formation is named for the city. Citronelle sand and gravel cap many hills and feed shallow domestic wells.', aq: ['miocene', 'citronelle'] },
    { id: 'coast', name: 'Gulf Coast (Gulfport and Biloxi)', label: 'Gulfport', side: 'l', lat: 30.40, lon: -89.03, text: 'The coast runs on the Miocene aquifer system. Fresh water reaches more than 3,000 feet deep in western Hancock County. Heavy pumping has lowered some coastal aquifers about 2 feet a year since 1940, with declines of more than 100 feet across large areas.', aq: ['miocene', 'citronelle'] },
    { id: 'pasc', name: 'Pascagoula', label: 'Pascagoula', side: 't', lat: 30.37, lon: -88.56, text: 'Near Pascagoula, the Graham Ferry Formation holds the most widely used aquifer. Fresh water reaches only about 1,200 feet deep east of Pascagoula, less than farther west.', aq: ['miocene'] }
  ];
  function proj(lon, lat) { return [(lon + 91.75) * 84.1 + 12, (35.08 - lat) * 100 + 8]; }
  function path(list) { return 'M' + list.map(function (p) { var q = proj(p[0], p[1]); return q[0].toFixed(1) + ' ' + q[1].toFixed(1); }).join(' L') + ' Z'; }
  function drawMap() {
    var svg = $('msMap');
    svg.appendChild(el('path', { d: path(OUTLINE), fill: '#fbf7ea', stroke: '#134e4a', 'stroke-width': 2 }));
    svg.appendChild(el('path', { d: path(DELTA), fill: '#f5d77a', 'fill-opacity': .55, stroke: '#b08d1a', 'stroke-width': 1, 'stroke-dasharray': '4 3' }));
    var dl = el('text', { x: proj(-90.72, 33.9)[0], y: proj(-90.72, 33.9)[1], 'text-anchor': 'middle', 'font-size': 13, 'font-weight': 800, fill: '#7a5d00', 'font-family': 'Overpass, sans-serif' });
    dl.textContent = 'DELTA';
    svg.appendChild(dl);
    var gulf = el('text', { x: proj(-89.1, 30.12)[0], y: proj(-89.1, 30.12)[1], 'text-anchor': 'middle', 'font-size': 12, fill: '#0a5a99', 'font-style': 'italic' });
    gulf.textContent = 'Gulf of Mexico';
    svg.appendChild(gulf);
    PINS.forEach(function (p) {
      var q = proj(p.lon, p.lat), g = el('g', { class: 'map-pin', tabindex: 0, role: 'button', 'aria-pressed': 'false', 'aria-label': p.name, 'data-pin': p.id });
      g.appendChild(el('circle', { class: 'halo', cx: q[0], cy: q[1], r: 15 }));
      g.appendChild(el('circle', { class: 'dot', cx: q[0], cy: q[1], r: 7 }));
      var side = p.side || 'r';
      var lx = side === 'r' ? q[0] + 11 : side === 'l' ? q[0] - 11 : q[0], ly = side === 't' ? q[1] - 12 : side === 'b' ? q[1] + 22 : q[1] + 4;
      var t = el('text', { x: lx, y: ly, 'text-anchor': side === 'r' ? 'start' : side === 'l' ? 'end' : 'middle' });
      t.textContent = p.label;
      g.appendChild(t);
      svg.appendChild(g);
    });
    function choose(id) {
      var p = PINS.filter(function (x) { return x.id === id; })[0];
      svg.querySelectorAll('.map-pin').forEach(function (n) { n.setAttribute('aria-pressed', n.getAttribute('data-pin') === id ? 'true' : 'false'); });
      $('mapPanel').innerHTML = '<h3>' + esc(p.name) + '</h3><p>' + esc(p.text) + '</p><p class="fine" style="margin:0">Aquifers here:</p><div class="map-aqs">' +
        p.aq.map(function (a) { return '<button type="button" data-jump="' + a + '" style="--lc:' + AQ[a].color + '">' + esc(AQ[a].short) + '</button>'; }).join('') + '</div>' +
        '<div class="ask-row"><button class="ask-chip" type="button" data-ask="' + esc('Which aquifers are near ' + p.name.replace(/\s*\(.*\)$/, '') + '?') + '">Ask Greg about this area</button></div>';
    }
    svg.addEventListener('click', function (e) { var g = e.target.closest('.map-pin'); if (g) choose(g.getAttribute('data-pin')); });
    svg.addEventListener('keydown', function (e) {
      var g = e.target.closest('.map-pin');
      if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); choose(g.getAttribute('data-pin')); }
    });
    choose('jackson');
  }

  /* ================= PROFILE CARDS ================= */
  var pf = { q: '', r: 'all' };
  function renderCards() {
    var q = pf.q.trim().toLowerCase(), words = q.split(/\s+/).filter(Boolean);
    var list = ORDER.filter(function (id) {
      var a = AQ[id];
      if (pf.r !== 'all' && a.regions.indexOf(pf.r) === -1) return false;
      var t = (a.name + ' ' + a.short + ' ' + a.age + ' ' + a.units + ' ' + a.sum + ' ' + a.facts.join(' ') + ' ' + a.regions.map(function (r) { return REGIONS[r]; }).join(' ')).toLowerCase();
      return words.every(function (w) { return t.indexOf(w) !== -1; });
    });
    $('aqCards').innerHTML = list.map(function (id) {
      var a = AQ[id];
      return '<article class="aq-card" id="aq-' + id + '" tabindex="-1"><div class="aq-card-top" style="--lc:' + a.color + '"><h3>' + esc(a.name) + '</h3><span>' + esc(a.age) + '</span></div>' +
        '<div class="aq-card-body"><div class="aq-meta">' + a.regions.map(function (r) { return '<span>' + esc(REGIONS[r]) + '</span>'; }).join('') + '</div>' +
        '<p><strong>' + esc(a.units) + '.</strong> ' + esc(a.sum) + '</p><ul>' + a.facts.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
        '<button class="ask-chip" type="button" data-ask="' + esc(a.ask) + '">Ask Greg</button></div></article>';
    }).join('') || '<div class="empty-note">No aquifer matches that. Try a place name or a broader word.</div>';
    $('aqCount').textContent = 'Showing ' + list.length + ' of ' + ORDER.length + ' aquifers' + (pf.r !== 'all' ? ' in the ' + REGIONS[pf.r] + ' region' : '') + '.';
  }
  function initCards() {
    var box = $('aqRegions');
    box.innerHTML = '<button class="chip" type="button" data-r="all" aria-pressed="true">All regions</button>' +
      Object.keys(REGIONS).map(function (r) { return '<button class="chip" type="button" data-r="' + r + '" aria-pressed="false">' + esc(REGIONS[r]) + '</button>'; }).join('');
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-r]');
      if (!b) return;
      pf.r = b.dataset.r;
      box.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      renderCards();
    });
    var t = 0;
    $('aqSearch').addEventListener('input', function () { var v = this.value; clearTimeout(t); t = setTimeout(function () { pf.q = v; renderCards(); }, 110); });
    renderCards();
  }
  /* “Full profile” and map buttons jump to a card, clearing filters if needed */
  function jump(id) {
    if (!$('aq-' + id)) { pf.q = ''; pf.r = 'all'; $('aqSearch').value = ''; $('aqRegions').querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x.dataset.r === 'all' ? 'true' : 'false'); }); renderCards(); }
    var c = $('aq-' + id);
    if (!c) return;
    c.scrollIntoView({ block: 'start', behavior: global.DEEP && DEEP.reduceMotion ? 'auto' : 'smooth' });
    c.classList.remove('flash'); void c.offsetWidth; c.classList.add('flash');
    c.focus({ preventScroll: true });
  }

  /* ================= WATER-LEVEL RECORDS ================= */
  var TRENDS = [
    ['Sparta · Jackson area', 'Long-record observation wells; cones of depression more than 40 ft deep in Rankin County', 'About 2.5 ft/yr; some northern wells 3.5 to 4+ ft/yr', 2.5],
    ['Miocene system · Gulf Coast', 'Some aquifers since 1940; more than 100 ft of decline across large areas', 'About 2 ft/yr', 2],
    ['Eutaw-McShan · northeast', 'Much of the confined part; some Lee County wells; near West Point after 1972', '1–2 ft/yr; Lee County 2–9; West Point about 5', 1.5],
    ['Lower Wilcox · Tallahatchie, Quitman, Panola', 'Much of the confined part after 1979; large cone of depression', '1–2 ft/yr', 1.5],
    ['Paleozoic · Corinth', 'Water level at Corinth, from 1954 to the time of the USGS study', 'About 140 ft total', null],
    ['Alluvial aquifer · central Delta', 'USGS spring 2024 map; lowest level about 60 ft above sea level, in Sunflower County', 'Long-term decline, slowed in wet years', null]
  ];
  function renderTrends() {
    $('trendBody').innerHTML = TRENDS.map(function (t) {
      var bar = t[3] ? '<div class="bar-cell"><i style="width:' + Math.round(t[3] / 4 * 110) + 'px"></i><span>' + esc(t[2]) + '</span></div>' : esc(t[2]);
      return '<tr><td><b>' + esc(t[0]) + '</b></td><td>' + esc(t[1]) + '</td><td>' + bar + '</td></tr>';
    }).join('');
  }

  /* ================= THEIS CONE OF DEPRESSION ================= */
  /* Well function W(u) = E1(u): series below 1, continued fraction above */
  function W(u) {
    if (u <= 0) return Infinity;
    if (u < 1) {
      var s = -0.5772156649 - Math.log(u), term = 1;
      for (var k = 1; k < 60; k++) { term *= u / k; var add = term / k; s += (k % 2 ? add : -add); if (add < 1e-14) break; }
      return s;
    }
    if (u > 700) return 0;
    var b = u + 1, c = 1e30, d = 1 / b, h = d;
    for (var i = 1; i < 200; i++) { var an = -i * i; b += 2; d = 1 / (an * d + b); c = b + an / c; var del = c * d; h *= del; if (Math.abs(del - 1) < 1e-12) break; }
    return h * Math.exp(-u);
  }
  function logMap(v, lo, hi) { return lo * Math.pow(hi / lo, v / 100); }
  var cone = {};
  function coneRead() {
    cone.Q = +$('cQ').value;
    cone.T = logMap(+$('cT').value, 100, 50000);
    cone.S = logMap(+$('cS').value, 1e-5, 0.3);
    cone.t = logMap(+$('cDays').value, 1 / 24, 365);
    cone.r = logMap(+$('cR').value, 10, 20000);
    var n = +$('cN').value;
    cone.d = n ? logMap(n, 50, 10000) : 0;
  }
  function drawdown(r) { var Qf = cone.Q * 192.5, u = r * r * cone.S / (4 * cone.T * cone.t); return Qf / (4 * Math.PI * cone.T) * W(u); }
  function timeText(days) { return days < 1 ? fmt(days * 24, 1) + ' hours' : days < 60 ? fmt(days, 1) + ' days' : fmt(days / 30.4, 1) + ' months'; }
  function coneUpdate() {
    coneRead();
    $('cQo').textContent = fmt(cone.Q, 0) + ' gpm';
    $('cTo').textContent = fmt(cone.T, 0);
    $('cSo').textContent = cone.S < 0.001 ? cone.S.toExponential(1) : fmt(cone.S, 3);
    $('cDayso').textContent = timeText(cone.t);
    $('cRo').textContent = fmt(cone.r, 0) + ' ft';
    $('cNo').textContent = cone.d ? fmt(cone.d, 0) + ' ft' : 'none';
    var sr = drawdown(cone.r), sw = drawdown(0.5);
    /* distance where drawdown falls to 1 ft */
    var lo = 0.5, hi = 1e6, r1 = null;
    if (drawdown(lo) > 1) { for (var i = 0; i < 80; i++) { var mid = Math.sqrt(lo * hi); if (drawdown(mid) > 1) lo = mid; else hi = mid; } r1 = lo; }
    var nb = cone.d ? drawdown(cone.d) : 0;
    var out = [
      ['Drawdown at ' + fmt(cone.r, 0) + ' ft', fmt(sr, 1) + ' ft', 'After ' + timeText(cone.t) + ' of pumping', ''],
      ['Aquifer drawdown at the well', fmt(sw, 1) + ' ft', 'At a 6-inch radius, before well losses', ''],
      ['Reach of 1 ft of drawdown', r1 ? fmt(r1, 0) + ' ft' : 'under 1 ft', r1 ? 'About ' + fmt(r1 / 5280, 2) + ' miles' : 'Drawdown is small everywhere', '']
    ];
    if (cone.d) out.push(['Extra drawdown from the neighbor', fmt(nb, 1) + ' ft', 'Added at your well by a neighbor ' + fmt(cone.d, 0) + ' ft away', nb > 5 ? 'warn' : '']);
    $('coneOut').innerHTML = out.map(function (o) { return '<div class="out ' + o[3] + '"><span>' + esc(o[0]) + '</span><b>' + esc(o[1]) + '</b><small>' + esc(o[2]) + '</small></div>'; }).join('');
    var u = cone.r * cone.r * cone.S / (4 * cone.T * cone.t);
    $('coneWork').innerHTML = '<b>Theis:</b> s = Q ÷ (4πT) × W(u),  u = r²S ÷ (4Tt)\n' +
      'Q = ' + fmt(cone.Q, 0) + ' gpm × 192.5 = ' + fmt(cone.Q * 192.5, 0) + ' ft³/day\n' +
      'u = ' + fmt(cone.r, 0) + '² × ' + (cone.S < 0.001 ? cone.S.toExponential(2) : fmt(cone.S, 4)) + ' ÷ (4 × ' + fmt(cone.T, 0) + ' × ' + fmt(cone.t, 3) + ' days) = ' + (u < 0.001 ? u.toExponential(3) : fmt(u, 4)) + '\n' +
      'W(u) = ' + fmt(W(u), 3) + '   →   s = ' + fmt(cone.Q * 192.5, 0) + ' ÷ (4π × ' + fmt(cone.T, 0) + ') × ' + fmt(W(u), 3) + ' = <b>' + fmt(sr, 2) + ' ft</b>' +
      (u < 0.01 ? '\nWith u this small, the Cooper-Jacob shortcut works too: s ≈ (2.3Q ÷ 4πT) × log₁₀(2.25Tt ÷ r²S).' : '');
    drawCone(r1);
  }
  function drawCone(r1) {
    var svg = $('coneChart'), Wd = 700, H = 280, L = 52, R = 14, Tp = 20, B = 36;
    var span = Math.max(cone.d ? cone.d * 1.6 : 0, (r1 || cone.r) * 1.3, cone.r * 1.3, 200);
    var xmin = -span, xmax = span + (cone.d || 0) * 0.3;
    function sAt(x) { var a = Math.max(Math.abs(x), 1); return drawdown(a); }
    function sBoth(x) { return sAt(x) + (cone.d ? drawdown(Math.max(Math.abs(x - cone.d), 1)) : 0); }
    var N = 240, pts1 = [], pts2 = [], smax = 0, i, x;
    for (i = 0; i <= N; i++) { x = xmin + (xmax - xmin) * i / N; var a = sAt(x), b2 = sBoth(x); pts1.push([x, a]); pts2.push([x, b2]); }
    var cap = Math.max(drawdown(Math.max(cone.r, 1)) * 2.2, drawdown(30), 2);
    pts1.concat(pts2).forEach(function (p) { if (p[1] > smax) smax = p[1]; });
    var ymax = Math.min(smax, cap) * 1.08;
    function X(v) { return L + (v - xmin) / (xmax - xmin) * (Wd - L - R); }
    function Y(v) { return Tp + Math.min(v, ymax) / ymax * (H - Tp - B); }
    function line(pts) { return pts.map(function (p, k) { return (k ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1); }).join(' '); }
    var html = '<g class="grid">';
    for (i = 0; i <= 4; i++) { var yv = ymax * i / 4; html += '<line x1="' + L + '" x2="' + (Wd - R) + '" y1="' + Y(yv) + '" y2="' + Y(yv) + '"/>'; }
    html += '</g><g class="axis">';
    for (i = 0; i <= 4; i++) { var yv2 = ymax * i / 4; html += '<text x="' + (L - 6) + '" y="' + (Y(yv2) + 4) + '" text-anchor="end">' + fmt(yv2, yv2 < 10 ? 1 : 0) + '</text>'; }
    var raw = (xmax - xmin) / 6, mag = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), stepX = [1, 2, 5, 10].map(function (m) { return m * mag; }).filter(function (v) { return v >= raw; })[0];
    for (var tv = Math.ceil(xmin / stepX) * stepX; tv <= xmax; tv += stepX) html += '<text x="' + X(tv) + '" y="' + (H - 12) + '" text-anchor="middle">' + fmt(tv, 0) + '</text>';
    html += '<text x="' + (L - 40) + '" y="12" class="lbl">drawdown, ft</text><text x="' + (Wd - R) + '" y="' + (H - 1) + '" text-anchor="end" class="lbl">distance from your well, ft</text></g>';
    html += '<line x1="' + L + '" x2="' + (Wd - R) + '" y1="' + Y(0) + '" y2="' + Y(0) + '" stroke="#27c1d4" stroke-width="2" stroke-dasharray="6 5"/>';
    html += '<text x="' + (Wd - R - 4) + '" y="' + (Y(0) - 5) + '" text-anchor="end" class="lbl">static level</text>';
    if (cone.d) html += '<path d="' + line(pts2) + '" fill="none" stroke="#c2410c" stroke-width="2.5"/>';
    html += '<path d="' + line(pts1) + '" fill="none" stroke="#0f766e" stroke-width="3"/>';
    html += '<line x1="' + X(0) + '" x2="' + X(0) + '" y1="' + Tp + '" y2="' + (H - B) + '" stroke="#0b2238" stroke-width="3"/>';
    if (cone.d) html += '<line x1="' + X(cone.d) + '" x2="' + X(cone.d) + '" y1="' + Tp + '" y2="' + (H - B) + '" stroke="#c2410c" stroke-width="3" stroke-dasharray="4 3"/>';
    html += '<circle cx="' + X(cone.r) + '" cy="' + Y(drawdown(cone.r)) + '" r="5" fill="#0f766e" stroke="#fff" stroke-width="2"/>';
    svg.innerHTML = html;
  }
  function initCone() {
    var P = [['Confined sand (typical)', 5000, 0.0002], ['Thick, productive confined sand', 20000, 0.0005], ['Thin, tight confined sand', 500, 0.0001], ['Water-table sand and gravel', 20000, 0.2]];
    function inv(val, lo, hi) { return Math.round(Math.log(val / lo) / Math.log(hi / lo) * 100); }
    $('conePresets').innerHTML = P.map(function (p, i) { return '<button class="chip" type="button" data-p="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(p[0]) + '</button>'; }).join('');
    $('conePresets').addEventListener('click', function (e) {
      var b = e.target.closest('[data-p]');
      if (!b) return;
      var p = P[+b.dataset.p];
      $('cT').value = inv(p[1], 100, 50000); $('cS').value = inv(p[2], 1e-5, 0.3);
      $('conePresets').querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      coneUpdate();
    });
    $('cT').value = inv(5000, 100, 50000); $('cS').value = inv(0.0002, 1e-5, 0.3);
    ['cQ', 'cT', 'cS', 'cDays', 'cR', 'cN'].forEach(function (id) {
      $(id).addEventListener('input', function () {
        if (id === 'cT' || id === 'cS') $('conePresets').querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        coneUpdate();
      });
    });
    coneUpdate();
  }

  /* ================= DARCY TRAVEL TIME ================= */
  function initVelocity() {
    var P = [['Gravel', 1000, 0.25], ['Clean sand', 50, 0.25], ['Silty sand', 1, 0.2], ['Clay', 0.001, 0.05]];
    $('velPresets').innerHTML = P.map(function (p, i) { return '<button class="chip" type="button" data-v="' + i + '" aria-pressed="' + (i === 1) + '">' + esc(p[0]) + '</button>'; }).join('');
    $('velPresets').addEventListener('click', function (e) {
      var b = e.target.closest('[data-v]');
      if (!b) return;
      var p = P[+b.dataset.v];
      $('vK').value = p[1]; $('vN').value = p[2];
      $('velPresets').querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      velUpdate();
    });
    ['vK', 'vI', 'vN', 'vD'].forEach(function (id) { $(id).addEventListener('input', velUpdate); });
    velUpdate();
  }
  function velUpdate() {
    var K = +$('vK').value, i = +$('vI').value, n = +$('vN').value, D = +$('vD').value;
    if (!(K > 0 && i > 0 && n > 0 && D > 0)) { $('velOut').innerHTML = '<div class="out warn"><span>Check inputs</span><b>—</b><small>All four values must be greater than zero.</small></div>'; $('velWork').textContent = ''; return; }
    var q = K * i, v = q / n, days = D / v, yrs = days / 365.25;
    var tt = yrs >= 1 ? fmt(yrs, yrs < 10 ? 1 : 0) + ' years' : fmt(days, days < 10 ? 1 : 0) + ' days';
    $('velOut').innerHTML =
      '<div class="out"><span>Darcy flux (q = K × i)</span><b>' + fmt(q, 4) + ' ft/day</b><small>Flow per unit area of aquifer</small></div>' +
      '<div class="out"><span>Water velocity (v = q ÷ n)</span><b>' + fmt(v, 4) + ' ft/day</b><small>' + fmt(v * 365.25, 1) + ' ft per year</small></div>' +
      '<div class="out ' + (yrs < 2 ? 'bad' : yrs < 10 ? 'warn' : 'good') + '"><span>Travel time to the well</span><b>' + tt + '</b><small>Over ' + fmt(D, 0) + ' ft, ignoring dispersion and pumping</small></div>';
    $('velWork').innerHTML = '<b>Darcy:</b> q = K × i = ' + fmt(K, 4) + ' × ' + fmt(i, 5) + ' = ' + fmt(q, 5) + ' ft/day\n' +
      '<b>Seepage velocity:</b> v = q ÷ n = ' + fmt(q, 5) + ' ÷ ' + fmt(n, 2) + ' = ' + fmt(v, 5) + ' ft/day\n' +
      '<b>Travel time:</b> ' + fmt(D, 0) + ' ft ÷ ' + fmt(v, 5) + ' ft/day = ' + fmt(days, 0) + ' days (' + fmt(yrs, 2) + ' years)\n' +
      'Wellhead protection areas are often drawn from time-of-travel distances like these. Pumping steepens the gradient near a well, so real travel times close to a pumping well are shorter.';
  }

  /* ================= QUIZ ================= */
  global.DEEP_QUIZ = [
    { q: 'Which is the most heavily pumped aquifer in Mississippi?', choices: ['The Mississippi River Valley alluvial aquifer', 'The Sparta aquifer', 'The Miocene aquifer system', 'The Paleozoic aquifer'], correct: 0, explain: 'The Delta\'s alluvial aquifer is the most heavily pumped, and about 98% of that pumping goes to agriculture.' },
    { q: 'Where do Mississippi\'s oldest rocks reach the surface?', choices: ['Tishomingo County, in the far northeast', 'The Gulf Coast', 'The central Delta', 'The Jackson Prairie'], correct: 0, explain: 'Paleozoic chert and limestone crop out in Tishomingo County. The layers get younger toward the southwest and the coast.' },
    { q: 'Which way do most of Mississippi\'s aquifer layers dip?', choices: ['Toward the embayment axis in the west and toward the Gulf in the south', 'Toward the northeast', 'They are flat', 'Straight down under the Delta only'], correct: 0, explain: 'The layers dip toward the axis of the Mississippi Embayment and toward the Gulf, so the same aquifer is deeper to the southwest.' },
    { q: 'What did the Supreme Court decide in Mississippi v. Tennessee (2021)?', choices: ['The shared aquifer is subject to equitable apportionment', 'Mississippi owns all ground water under its borders', 'Memphis must stop pumping', 'Ground water isn\'t covered by any interstate law'], correct: 0, explain: 'The Court ruled unanimously that the Middle Claiborne aquifer is an interstate resource subject to equitable apportionment and dismissed Mississippi\'s complaint.' },
    { q: 'What generally marks the down-dip limit of fresh ground water?', choices: ['About 1,000 mg/L dissolved solids', 'About 10 mg/L nitrate', 'A pH of 6.5', '250 mg/L hardness'], correct: 0, explain: 'Where dissolved solids pass about 1,000 mg/L, the water is generally no longer considered fresh.' },
    { q: 'Where does a confined aquifer get its recharge?', choices: ['Where it crops out at the surface', 'Only from the Gulf', 'Straight down through the clay above it everywhere', 'It never gets recharged'], correct: 0, explain: 'Rain soaks into the aquifer where it reaches the surface. Down-dip, under a clay layer, the same sand is confined and under pressure.' },
    { q: 'Which aquifer system supplies the Mississippi Gulf Coast?', choices: ['The Miocene aquifer system', 'The Eutaw-McShan', 'The alluvial aquifer', 'The Paleozoic'], correct: 0, explain: 'Coastal systems pump the Miocene aquifers, including the Graham Ferry and Pascagoula. Fresh water reaches more than 3,000 feet deep in western Hancock County.' },
    { q: 'What happened after Tupelo began using Tombigbee River water?', choices: ['The Eutaw-McShan level under the city rose nearly 100 feet in about five years', 'The aquifer went dry', 'Nothing changed', 'The river dried up'], correct: 0, explain: 'Cutting pumping let the confined aquifer\'s pressure recover, and water levels beneath Tupelo rose nearly 100 feet.' },
    { q: 'What most limits drinking-water use of the Delta\'s alluvial aquifer?', choices: ['Hardness and high iron and manganese', 'Radioactivity', 'Salt water', 'PFAS'], correct: 0, explain: 'Its water is typically hard to very hard with a lot of iron and manganese, so many Delta towns drill deeper for drinking water.' },
    { q: 'In the Theis equation, if transmissivity doubles and everything else stays the same, drawdown generally…', choices: ['Gets smaller', 'Doubles', 'Stays the same', 'Becomes zero'], correct: 0, explain: 'Drawdown is proportional to Q ÷ (4πT) × W(u). A more transmissive aquifer spreads the cone wider but shallower.' },
    { q: 'How do you get the actual speed of ground water from Darcy\'s law?', choices: ['Divide K × gradient by the effective porosity', 'Multiply K by the porosity', 'Divide the pumping rate by the drawdown', 'Multiply the gradient by 2.31'], correct: 0, explain: 'Darcy flux is K × i. Water moves only through the pore spaces, so its actual speed is K × i ÷ effective porosity.' },
    { q: 'What are the most common problems with Meridian-upper Wilcox water supplies?', choices: ['Excess iron and corrosive water', 'High nitrate', 'Salt water intrusion from the Gulf', 'Hydrogen sulfide from oil fields'], correct: 0, explain: 'USGS reported excessive iron and corrosiveness as the most common problems in this aquifer\'s water supplies.' },
    { q: 'What is the Middle Claiborne aquifer called in Tennessee?', choices: ['The Memphis Sand', 'The Fort Pillow Sand', 'The Catahoula', 'The Coker'], correct: 0, explain: 'Mississippi\'s Sparta Sand and Tennessee\'s Memphis Sand are the same Middle Claiborne aquifer.' },
    { q: 'Which clay underlies the Flatwoods and separates the Wilcox aquifers from the Cretaceous aquifers?', choices: ['The Porters Creek Clay', 'The Yazoo Clay', 'The Zilpha Clay', 'The Cook Mountain'], correct: 0, explain: 'The Porters Creek Clay of the Midway Group is one of the most important confining units in the state.' }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    renderStack();
    drawSection();
    drawMap();
    initCards();
    renderTrends();
    initCone();
    initVelocity();
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-jump]');
      if (!b) return;
      e.preventDefault();
      jump(b.getAttribute('data-jump'));
    });
  });
})(window);
