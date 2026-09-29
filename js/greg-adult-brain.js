/* ==========================================================
   Greg (adult) — the bigger brain
   ----------------------------------------------------------
   Graduate-level water knowledge layered on greg-adult-kb.js:
   regulations and UCMR, Mississippi's aquifers, hydraulics and
   hydraulic modeling, groundwater science, hydrology, treatment
   engineering, distribution, water chemistry, microbiology,
   wastewater, the science of water itself, and history. Plus
   calculators for pipe flow, hydrant tests, water hammer,
   Darcy's law, runoff, thrust, affinity laws, and more.

   Load order: greg-engine.js → glossary-adult.js →
   greg-adult-kb.js → this file → greg-adult-ui.js.
   Everything runs in the browser.
   Facts and rule status checked September 2026.
   ========================================================== */
(function (global) {
  'use strict';

  var GA = global.GREG_ADULT;
  if (!GA || !GA.entries) return;

  var EPA = 'https://www.epa.gov/';
  var S = {
    regsPage:  ['LearnWater', 'Water Regulations page', '/regulations.html'],
    aqPage:    ['LearnWater', "Mississippi's Aquifers page", '/ms-aquifers.html'],
    hmPage:    ['LearnWater', 'Hydraulic Modeling page', '/hydraulic-modeling.html'],
    ucmr5:     ['EPA', 'Fifth Unregulated Contaminant Monitoring Rule', EPA + 'dwucmr/fifth-unregulated-contaminant-monitoring-rule'],
    ucmr5data: ['EPA', 'UCMR 5 data finder', EPA + 'dwucmr/fifth-unregulated-contaminant-monitoring-rule-data-finder'],
    ucmr6:     ['EPA', 'Proposed Sixth Unregulated Contaminant Monitoring Rule', EPA + 'dwucmr/proposed-sixth-unregulated-contaminant-monitoring-rule'],
    pfas:      ['EPA', 'PFAS drinking water regulation', EPA + 'sdwa/and-polyfluoroalkyl-substances-pfas'],
    pfasResc:  ['EPA', 'Proposed PFAS rescission rule', EPA + 'sdwa/proposed-pfas-rescission-rule'],
    pfasExt:   ['EPA', 'Proposed PFOA and PFOS compliance extension', EPA + 'sdwa/proposed-pfoa-and-pfos-compliance-extension-rule'],
    perc:      ['EPA', 'Perchlorate in drinking water', EPA + 'sdwa/perchlorate-drinking-water'],
    fluoride:  ['EPA', 'Fluoride in drinking water', EPA + 'sdwa/fluoride-drinking-water'],
    lcri:      ['EPA', 'Lead and Copper Rule Improvements', EPA + 'ground-water-and-drinking-water/lead-and-copper-rule-improvements'],
    mdbp:      ['EPA', 'Potential MDBP rule revisions', EPA + 'dwsixyearreview/potential-revisions-microbial-and-disinfection-byproducts-rules'],
    ccl:       ['EPA', 'Contaminant Candidate List', EPA + 'ccl'],
    npdwr:     ['EPA', 'National Primary Drinking Water Regulations', EPA + 'ground-water-and-drinking-water/national-primary-drinking-water-regulations'],
    cwa:       ['EPA', 'Summary of the Clean Water Act', EPA + 'laws-regulations/summary-clean-water-act'],
    npdes:     ['EPA', 'NPDES permit program', EPA + 'npdes'],
    wotus:     ['EPA', 'Waters of the United States', EPA + 'wotus'],
    epanet:    ['EPA', 'EPANET', EPA + 'water-research/epanet'],
    msdh:      ['MSDH', 'Bureau of Public Water Supply', 'https://msdh.ms.gov/msdhsite/_static/30,0,76.html'],
    mdeqPermit:['MDEQ', 'Groundwater permit guidance', 'https://www.mdeq.ms.gov/permits/water-availability-and-use/forms/groundwater-permit-guidance/'],
    mdeqDelta: ['MDEQ', 'Delta Sustainable Water Resources Task Force', 'https://www.mdeq.ms.gov/water/water-availability-and-use/delta-sustainable-water-resources-task-force/'],
    mdeqGW:    ['MDEQ', 'Ground Water Quality Assessment (2025)', 'https://www.mdeq.ms.gov/wp-content/uploads/2025/04/305b_report_2025_final.pdf'],
    usgsMAP:   ['USGS', 'Mississippi Alluvial Plain project', 'https://www.usgs.gov/centers/lower-mississippi-gulf-water-science-center/science/mississippi-alluvial-plain-map-water-0'],
    usgsHA:    ['USGS', 'Ground Water Atlas: Mississippi embayment', 'https://pubs.usgs.gov/ha/ha730/ch_f/F-text4.html'],
    scotus:    ['SCOTUSblog', 'Mississippi v. Tennessee', 'https://www.scotusblog.com/cases/case-files/mississippi-v-tennessee'],
    ymd:       ['YMD', 'History', 'https://www.ymd.org/history']
  };

  var X = [];

  /* ================= NEW PAGES ================= */
  X.push(
    { id: 'site-regulations', q: 'Where can I learn about water regulations?',
      k: ['regulations page:6', 'regulations tab:6', 'regulation section:5', 'rule explorer:6', 'rule finder:6', 'which rules apply to my system:7', 'mcl table:5', 'searchable mcl:6'],
      a: "Open **Regulations** in the main menu. It covers:\n• The Safe Drinking Water Act and the Clean Water Act\n• A **rule finder** that lists the federal rules for your type of system\n• A **rule explorer** with every major rule, and a searchable table of every MCL\n• **UCMR 5** results and the proposed **UCMR 6**\n• The latest on PFAS, lead, perchlorate, fluoride, and WOTUS\n• Who enforces what in Mississippi",
      rel: ['ucmr6', 'rule-process', 'cwa'], src: ['regsPage'] },
    { id: 'site-aquifers', q: "Where can I learn about Mississippi's aquifers?",
      k: ['aquifers page:6', 'aquifer page:6', 'aquifer section:6', 'aquifer stack:6', 'virtual well:6', 'drill a well:4', 'aquifer map:6', 'cone of depression lab:6'],
      a: "The **Mississippi's Aquifers** page (from the Adult Learning Center) has:\n• An **aquifer stack** of all 16 major aquifers and the clays between them\n• A **virtual well** you can drill anywhere from the Gulf Coast to Tishomingo County\n• A **map**: tap a place to see which aquifers are under it\n• Profiles, water-level records, and **Mississippi v. Tennessee**\n• A **cone of depression lab** (Theis equation) and a groundwater travel-time calculator",
      rel: ['ms-aquifer-list', 'ms-why-deeper', 'theis'], src: ['aqPage'] },
    { id: 'site-modeling', q: 'Where is the hydraulic modeling section?',
      k: ['modeling page:6', 'modelling page:6', 'model lab:6', 'hydraulic modeling section:7', 'hydraulic modeling page:7', 'network solver:5', 'pump curve lab:5', 'tank simulator:5'],
      a: "The **Hydraulic Modeling** page (from the Adult Learning Center) explains how distribution models are built and solved, and has working tools:\n• A **model lab**: a small town's network you can change and re-solve instantly\n• A **pipe calculator** (Hazen-Williams and Darcy-Weisbach)\n• A **pump and system curve lab**\n• A **48-hour tank simulator** (extended period simulation)\n• **Hydrant flow test** and **water hammer** calculators",
      rel: ['hydraulic-model', 'eps', 'calibration'], src: ['hmPage'] }
  );

  /* ================= REGULATIONS ================= */
  X.push(
    { id: 'ucmr', q: 'What is the UCMR?',
      k: ['ucmr:7', 'unregulated contaminant monitoring:8', 'unregulated contaminant monitoring rule:9', 'unregulated contaminants:4', 'unregulated rule:5'],
      a: "The **Unregulated Contaminant Monitoring Rule (UCMR)** comes from the 1996 SDWA amendments. Every **five years**, EPA picks up to **30 contaminants** that don't have drinking water standards yet and has water systems test for them, so it learns how often they occur and at what levels.\n• **Who samples:** every community and non-transient non-community system serving **3,300 or more** people, plus a representative sample of smaller systems chosen by EPA, which pays their lab costs.\n• **Where:** mostly at entry points to the distribution system.\n• **Why:** the data feeds EPA's decisions about what to regulate next. Community systems also report detected UCMR results in their CCR.",
      more: "The cycles so far:\n• **UCMR 1** (2001–2005): the first national screen\n• **UCMR 2** (2008–2010): pesticides, flame retardants, explosives, nitrosamines\n• **UCMR 3** (2013–2015): six PFAS, 1,4-dioxane, hexavalent chromium, chlorate, strontium\n• **UCMR 4** (2018–2020): ten cyanotoxins, manganese, pesticides, brominated HAAs\n• **UCMR 5** (2023–2025): 29 PFAS and lithium\n• **UCMR 6** (proposed July 1, 2026): sampling planned for 2028–2030",
      rel: ['ucmr5', 'ucmr6', 'ccl'], src: ['ucmr5', 'ucmr6'] },
    { id: 'ucmr5', q: 'What was UCMR 5?',
      k: ['ucmr 5:9', 'ucmr5:9', 'ucmr five:8', 'fifth ucmr:8', 'fifth unregulated:8', '29 pfas:7', 'lithium:5'],
      a: "**UCMR 5** was finalized on **December 27, 2021**. It had systems test for **30 contaminants: 29 PFAS plus lithium**, from **January 2023 through December 2025**.\n• Every community and non-transient non-community system serving **3,300+** sampled (AWIA 2018 extended this down from 10,000), plus a representative sample of about 800 smaller systems.\n• PFAS were measured with EPA Methods **533** and **537.1**, with a reporting level of **4 ppt** for PFOA and PFOS.\n• Surface water systems sampled four quarters in a row; ground water systems sampled twice, 5–7 months apart.",
      more: "Lithium was included because it's increasingly used in batteries and has health effects at high doses; UCMR 5 was the first national look at how much is in drinking water. EPA released the **final UCMR 5 data on August 27, 2026**. Ask me **what UCMR 5 found**.",
      rel: ['ucmr5-results', 'ucmr6', 'pfas'], src: ['ucmr5', 'ucmr5data'] },
    { id: 'ucmr5-results', q: 'What did UCMR 5 find?',
      k: ['ucmr 5 result*:10', 'ucmr 5 data:10', 'ucmr 5 find*:10', 'ucmr 5 found:10', 'ucmr5 result*:10', 'ucmr5 data:10', 'pfas occurrence:6', 'how common is pfas:8', 'how much pfas:6', 'pfas results:7'],
      a: "EPA released the **final UCMR 5 data on August 27, 2026**: just under **2 million results** from **more than 10,000 public water systems**, for 29 PFAS and lithium.\n• EPA estimates about **7.8% of systems** would have a running annual average above the **4.0 ppt MCL for PFOA or PFOS**.\n• The overall occurrence patterns didn't change much from EPA's earlier interim releases.\n• You can look up any system's results in EPA's **UCMR 5 data finder**.",
      more: "What to do with it: if your system sampled, your results are already in EPA's database, and your CCR must report detections. If PFOA or PFOS showed up near or above 4 ppt, start planning now: confirm with more sampling, check which wells or sources are affected, and look at options like blending, GAC, ion exchange, or RO. MSDH can point you to funding, including the emerging-contaminant money in the Drinking Water SRF.",
      rel: ['pfas-treatment', 'pfas-court', 'ucmr6'], src: ['ucmr5data', 'pfas'] },
    { id: 'ucmr6', q: 'What is in the proposed UCMR 6?',
      k: ['ucmr 6:10', 'ucmr6:10', 'ucmr six:9', 'sixth ucmr:9', 'sixth unregulated:9', 'unregulated 6:9', 'next ucmr:8', 'new ucmr:7', 'ucmr update:7', 'ucmr 2028:8'],
      a: "EPA proposed **UCMR 6** on **July 1, 2026**. It would have systems test for **30 unregulated contaminants** from **January 2028 through December 2030**:\n• **7 ultrashort organofluorine compounds**, including **trifluoroacetic acid (TFA)**. Four are PFAS that have been studied far less than PFOA and PFOS.\n• **3 pesticide metabolites**: chlorpyrifos oxon, phorate sulfone, and phorate sulfoxide\n• **13 semivolatile organics** (EPA Method 525.3), such as DEET, chlorothalonil, and some PAHs\n• **7 purgeable organics** (EPA Method 524.3), such as 1,2,3-trichloropropane and naphthalene\nWho: every CWS and NTNCWS serving **3,300+**, plus a representative sample of smaller systems. Comments closed **August 31, 2026**.",
      more: "**Microplastics** were left off. Governors of seven states and environmental groups petitioned EPA to add them; EPA said there isn't yet a validated test method. The final rule can still add, drop, or change contaminants, so watch for it before 2028. The full proposed list is on the Regulations page.",
      rel: ['ultrashort-pfas', 'microplastics', 'ucmr'], src: ['ucmr6', 'regsPage'] },
    { id: 'ultrashort-pfas', q: 'What are ultrashort PFAS like TFA?',
      k: ['ultrashort:9', 'ultra short:8', 'ultra-short:8', 'tfa:8', 'trifluoroacetic:9', 'short chain pfas:7', 'short-chain pfas:7', 'pfpra:8', 'tfms:8', 'pfmoaa:8', 'pfets:8', 'pfprs:8', 'tfsi:8'],
      a: "**Ultrashort** organofluorine compounds are fluorinated acids only **one to three carbons** long. The proposed UCMR 6 includes seven: **TFA** (trifluoroacetic acid), **TFMS**, **TFSI**, **PFEtS**, **PFMOAA**, **PFPrA**, and **PFPrS**.\n• **TFA** is the most widespread. Sources include the breakdown of some refrigerants, pesticides, and pharmaceuticals, and it's found in rain.\n• They are extremely **persistent** and very **mobile** in water.\n• They're **hard to remove**: carbon and most ion exchange resins hold them poorly. Reverse osmosis and nanofiltration work best.",
      more: "Chain length matters for treatment. Long-chain PFAS like PFOS stick to carbon well; short chains break through sooner; ultrashort ones barely stick at all. That's one reason EPA wants national occurrence data before deciding anything about regulation.",
      rel: ['ucmr6', 'pfas-treatment', 'pfas'], src: ['ucmr6'] },
    { id: 'microplastics', q: 'Are microplastics regulated in drinking water?',
      k: ['microplastic*:9', 'micro plastic*:8', 'nanoplastic*:8', 'plastic particle*:6', 'plastic in water:6', 'plastics in drinking water:7'],
      a: "No, not federally. There's **no EPA drinking water standard** for microplastics. In 2026, when it proposed UCMR 6, EPA **declined** a petition from seven governors and environmental groups to add them, because there isn't a **validated test method** yet.\n• California has been out front: it adopted a legal definition of microplastics in drinking water in 2020 and began developing a statewide testing approach.\n• Particle size, shape, and type vary so much that measuring them consistently is the hard part.\n• Studies show conventional treatment and filtration remove much of the larger particle load; membranes remove more.",
      rel: ['ucmr6', 'membranes', 'ccl'], src: ['ucmr6'] },
    { id: 'ccl', q: 'What is the Contaminant Candidate List?',
      k: ['contaminant candidate list:10', 'ccl:8', 'ccl 5:10', 'ccl5:10', 'candidate list:8'],
      a: "The **Contaminant Candidate List (CCL)** is EPA's list of contaminants that aren't regulated yet but may need to be. The SDWA requires a new list every **five years**.\n• **CCL 5** (final November 2022) lists **66 chemicals**, **3 chemical groups** (PFAS, cyanotoxins, and disinfection byproducts), and **12 microbes**.\n• Being listed doesn't require anything of water systems. It's the pool EPA draws from for **UCMR monitoring** and **regulatory determinations**.",
      rel: ['reg-determination', 'ucmr', 'six-year-review'], src: ['ccl'] },
    { id: 'reg-determination', q: 'How does EPA decide whether to regulate a contaminant?',
      k: ['regulatory determination*:10', 'decide to regulate:9', 'decides to regulate:9', 'decide whether to regulate:9', 'how does epa decide:8', 'why isnt it regulated:7', 'new standard:5'],
      a: "EPA makes a **regulatory determination**. Under the SDWA it must find all three:\n1. The contaminant **may have an adverse effect** on health.\n2. It **occurs, or is substantially likely to occur**, in public water systems at a frequency and level of concern.\n3. Regulating it offers a **meaningful opportunity for health risk reduction**.\nIf the answer is yes, EPA has **24 months** to propose a regulation and **18 more months** to finalize it (with a possible 9-month extension). EPA must make determinations on at least **five** CCL contaminants each cycle.",
      more: "Real examples: in 2021 EPA decided to regulate PFOA and PFOS, which led to the 2024 PFAS rule. In 2020 EPA decided **not** to regulate perchlorate; a court case (NRDC v. EPA, D.C. Circuit, 2023) sent that back, and EPA proposed a perchlorate standard in January 2026.",
      rel: ['rule-process', 'ccl', 'perchlorate'], src: ['regsPage'] },
    { id: 'six-year-review', q: "What is EPA's six-year review?",
      k: ['six year review:10', 'six-year review:10', '6 year review:9', 'review existing standard*:8', 'revise existing rule*:7'],
      a: "The SDWA requires EPA to review every existing drinking water standard **at least every six years** and revise it if a change would maintain or improve public health protection. The reviews look at new health science, better analytical methods, occurrence data, and treatment technology.\nThe last review flagged the **microbial and disinfection byproduct (MDBP) rules** for possible revision. EPA must propose MDBP revisions by **July 30, 2027** and finalize them by **October 2, 2028**.",
      rel: ['mdbp', 'reg-determination', 'rule-process'], src: ['mdbp'] },
    { id: 'rule-process', q: 'How does a drinking water rule get made?',
      k: ['how is a rule made:9', 'rulemaking:8', 'rule making:8', 'proposed rule:7', 'final rule:6', 'comment period:7', 'federal register:8', 'how do regulations get made:9', 'how does a rule become:9'],
      a: "1. **Evidence**: health studies and occurrence data (often from UCMR).\n2. **Regulatory determination**: EPA decides to regulate.\n3. **Proposed rule** in the **Federal Register**, with a public comment period (often 60 days).\n4. **Final rule**: published with an effective date and a later compliance date (commonly 3 years for drinking water rules, with up to 2 more for capital work).\n5. **States with primacy** adopt rules at least as strict, generally within two years.\n6. **Court review**: challenges to national drinking water rules go to the **D.C. Circuit**, filed within 45 days.\nThe rule text ends up in the **Code of Federal Regulations** (40 CFR 141 for drinking water).",
      rel: ['cfr', 'reg-determination', 'primacy'], src: ['regsPage'] },
    { id: 'cfr', q: 'What are 40 CFR Parts 141, 142, and 143?',
      k: ['40 cfr 141:9', '40 cfr 142:9', '40 cfr 143:9', 'part 142:8', 'part 143:8', 'code of federal regulations:9', 'cfr part*:7'],
      a: "The **Code of Federal Regulations** collects final rules by subject. Title 40 is EPA's.\n• **Part 141**: National Primary Drinking Water Regulations. MCLs, treatment techniques, monitoring, public notice, and CCRs.\n• **Part 142**: how states get and keep **primacy**.\n• **Part 143**: **secondary** (aesthetic) standards, not federally enforceable.\nFor the Clean Water Act: **Part 122** (NPDES permits), **131** (water quality standards), **133** (secondary treatment), **403** (pretreatment), and **503** (biosolids).",
      rel: ['epa-rules', 'rule-process', 'cwa'], src: ['npdwr'] },
    { id: 'pfas-court', q: 'Is the PFAS drinking water rule being challenged in court?',
      k: ['pfas court:9', 'pfas lawsuit*:9', 'pfas litigation:9', 'awwa v epa:10', 'pfas challenge*:9', 'pfas rule court:9', 'pfas appeal*:8', 'pfas 2026:8', 'pfas rescission:9', 'pfas rescind*:9', 'pfas extension:8'],
      a: "Yes. Water utility groups (AWWA and AMWA) challenged the April 2024 PFAS rule in the **D.C. Circuit** (*AWWA v. EPA*).\n• In **January 2026**, the court **denied** EPA's request to vacate the four Hazard Index PFAS limits without full briefing, and later declined to split those issues off.\n• In **May 2026**, EPA proposed to keep the **4.0 ppt** PFOA and PFOS limits with compliance moved from **2029 to 2031**, and to **rescind** the limits for PFHxS, PFNA, HFPO-DA, and the Hazard Index. Comments closed **July 20, 2026**.\n• The court heard **oral argument on September 18, 2026**.\nUntil EPA finalizes changes or the court rules, the 2024 rule is the rule. Follow MSDH's direction on sampling.",
      rel: ['pfas', 'hazard-index', 'pfas-treatment'], src: ['pfas', 'pfasResc', 'pfasExt'] },
    { id: 'hazard-index', q: 'What is the PFAS Hazard Index?',
      k: ['hazard index:10', 'hi mixture:8', 'pfas mixture*:8', 'mixture* of pfas:8', 'pfbs:7', 'health based water concentration*:8'],
      a: "The **Hazard Index (HI)** in the 2024 PFAS rule limits **mixtures** of four PFAS that affect health in similar ways. Divide each one's concentration by its health-based water concentration and add them up:\n**HI = PFHxS/10 + PFNA/10 + HFPO-DA/10 + PFBS/2,000** (all in ppt)\nIf the sum is **over 1**, the mixture exceeds the standard, even when each compound is below its own limit.\nExample: PFHxS 6 ppt, PFNA 5 ppt, PFBS 400 ppt → 0.6 + 0.5 + 0.2 = **1.3**, over the limit.\nIn May 2026 EPA proposed **rescinding** the Hazard Index; until that's final, it remains in the rule.",
      rel: ['pfas-court', 'pfas', 'pfas-treatment'], src: ['pfas', 'pfasResc'] },
    { id: 'pfas-treatment', q: 'How do utilities remove PFAS?',
      k: ['remove pfas:10', 'pfas removal:10', 'pfas treatment:10', 'treat pfas:10', 'treating pfas:10', 'pfas filter*:8', 'pfas gac:9', 'pfas ion exchange:9'],
      a: "Conventional treatment (coagulation, settling, filtration, chlorine) removes very little PFAS. Three proven options:\n• **Granular activated carbon (GAC)**: adsorbs PFAS. Long chains like PFOS hold well; shorter chains break through sooner. Change-out frequency drives cost.\n• **Ion exchange (IX)**: PFAS-selective anion resins, usually single-use, with short contact times and a smaller footprint than GAC.\n• **Reverse osmosis or nanofiltration**: removes nearly all PFAS, including short chains, but produces a concentrate stream that has to go somewhere.\nPilot or bench testing (such as rapid small-scale column tests) helps pick the media and predict breakthrough.",
      more: "Plan for **residuals**: spent carbon is usually reactivated at high temperature, spent resin is often incinerated, and RO concentrate is the hardest to manage. For homes, point-of-use filters certified to **NSF/ANSI 53 or 58** for PFOA and PFOS reduction can help.",
      rel: ['pfas', 'activated-carbon', 'ultrashort-pfas'], src: ['pfas'] },
    { id: 'pfas-health', q: 'Why are PFAS a health concern?',
      k: ['pfas health:10', 'pfas health effect*:10', 'pfas cancer:10', 'pfas dangerous:9', 'is pfas dangerous:9', 'pfas harm*:8', 'forever chemicals health:9'],
      a: "EPA links exposure to certain PFAS with:\n• **Some cancers**, including kidney and testicular cancer. EPA considers PFOA and PFOS **likely human carcinogens**, which is why their MCLGs are **zero**.\n• **Developmental effects** in infants and children, such as low birth weight\n• **Reduced immune response**, including to vaccines\n• **Liver and cholesterol** effects, and interference with hormones\nPFAS build up in the body and leave slowly; PFOS and PFOA have half-lives in people of several years.",
      rel: ['pfas', 'pfas-treatment', 'hazard-index'], src: ['pfas'] },
    { id: 'pfas-cercla', q: 'Are PFOA and PFOS Superfund hazardous substances?',
      k: ['cercla:10', 'superfund:10', 'hazardous substance*:8', 'pfas liability:8', 'pfas cleanup:8'],
      a: "Yes. In **2024** EPA designated **PFOA and PFOS** (and their salts and isomers) as **hazardous substances** under **CERCLA**, the Superfund law. On **August 18, 2026**, the **D.C. Circuit upheld** the designation unanimously.\nIt doesn't set drinking water limits. It affects **cleanup liability**: releases must be reported, and responsible parties can be made to pay for cleanup. Water utilities that only treat and dispose of PFAS residuals have raised liability concerns; keep good records of spent media and disposal.",
      rel: ['pfas', 'pfas-court', 'pfas-treatment'], src: ['pfas'] },
    { id: 'perchlorate', q: 'Is perchlorate regulated in drinking water?',
      k: ['perchlorate:10', 'rocket fuel:7', 'thyroid:5'],
      a: "Not yet, but it's close. EPA **proposed** the first national perchlorate standard on **January 6, 2026**:\n• **MCLG: 0.02 mg/L (20 µg/L)**\n• EPA asked for comment on an **MCL of 20, 40, or 80 µg/L**\n• A court-ordered deadline requires a **final rule by May 21, 2027**\nPerchlorate can interfere with the **thyroid's uptake of iodide**. Sources include rocket propellant, fireworks, road flares, and old or overheated **sodium hypochlorite** solution, which is why storing bleach cool and using it fresh matters.",
      more: "History: EPA decided to regulate perchlorate in 2011, reversed itself in 2020, and the D.C. Circuit (NRDC v. EPA, 2023) ruled the reversal unlawful, which revived the obligation to set a standard.",
      rel: ['reg-determination', 'hypochlorite-math', 'rule-process'], src: ['perc'] },
    { id: 'fluoride-bans', q: 'Have any states banned water fluoridation?',
      k: ['fluoride ban*:10', 'fluoridation ban*:10', 'ban fluoride:10', 'banned fluoride:10', 'utah fluoride:10', 'florida fluoride:10', 'fluoride review:9', 'fluoride iq:10', 'fluoride controversy:8', 'fluoride lawsuit:9', 'stop fluoridat*:8'],
      a: "Yes. In **2025**, **Utah** and **Florida** became the first states to ban adding fluoride to public water. No other statewide bans were enacted in 2026.\nAt the federal level:\n• A **2024 federal court ruling** (under the Toxic Substances Control Act) found fluoride at current levels posed an unreasonable risk to children's IQ and directed EPA to act.\n• EPA began an **expedited review** of fluoride science in 2025 and released its toxicity-assessment protocol in **August 2026**.\n• The **MCL stays 4.0 mg/L** and the secondary standard **2.0 mg/L** unless EPA changes them. The U.S. Public Health Service recommendation for added fluoride is **0.7 mg/L**.\nFollow MSDH's current guidance for Mississippi.",
      rel: ['fluoridation', 'fluoride-chemicals', 'rule-process'], src: ['fluoride'] },
    { id: 'mdbp', q: 'Are the disinfection byproduct rules changing?',
      k: ['mdbp:10', 'microbial and disinfection byproduct*:10', 'dbp rule* chang*:9', 'dbp rule revision*:10', 'new dbp rule*:9', 'disinfection byproduct rule revision*:10', 'residual requirement* chang*:8'],
      a: "Probably. EPA's six-year review flagged the **microbial and disinfection byproduct (MDBP) rules** for revision. Under its current schedule EPA must **propose** changes by **July 30, 2027** and **finalize** them by **October 2, 2028**.\nIdeas under discussion (from EPA's advisory council process) include **stronger minimum disinfectant residual** requirements, **more distribution system monitoring**, and **better control of DBP precursors** and water age.\nGood preparation now: trend your residuals, know your water age hot spots, and track TOC.",
      rel: ['dbps', 'six-year-review', 'water-age-model'], src: ['mdbp'] },
    { id: 'lsl-inventory', q: 'What is a lead service line inventory?',
      k: ['service line inventory:10', 'lead inventory:9', 'lsl inventory:10', 'inventory of service lines:10', 'galvanized requiring replacement:10', 'grr:8', 'unknown service line*:9'],
      a: "Every community and non-transient non-community system must keep an **inventory of every service line's material**, on both the utility and customer sides.\n• The first inventory was due **October 16, 2024** (under the LCRR).\n• Categories: **lead**, **galvanized requiring replacement** (galvanized pipe that is or ever was downstream of lead), **non-lead**, and **lead status unknown**.\n• Under the LCRI, a **baseline inventory** and a **replacement plan** are due **November 1, 2027**, and unknowns must be identified over time.\n• Customers served by lead, GRR, or unknown lines must be notified, and the notices repeat yearly.\nTools: tap records, installation dates, potholing or visual checks at the meter and curb stop.",
      rel: ['lead-copper', 'lcri-sampling', 'lead-health'], src: ['lcri'] },
    { id: 'lcri-sampling', q: 'How does lead sampling change under the LCRI?',
      k: ['lcri sampling:10', 'lead sampling change*:9', 'first and fifth liter:10', 'fifth liter:10', '5th liter:10', 'first liter:7', 'lead tap sampling:8', 'lead filters:8'],
      a: "Under the **Lead and Copper Rule Improvements** (compliance **November 1, 2027**):\n• At homes with **lead service lines**, collect the **first liter and the fifth liter** after at least six hours of stagnation. The **higher** result counts. The fifth liter captures water that sat in the service line.\n• The **lead action level drops to 0.010 mg/L** (10 µg/L), and the old trigger level goes away.\n• Systems with **multiple action level exceedances** must make **certified filters** available to customers.\n• Most systems must replace all lead and GRR service lines within **10 years**.",
      rel: ['lead-copper', 'lsl-inventory', 'lead-health'], src: ['lcri'] },
    { id: 'lead-health', q: 'Why is lead in drinking water dangerous?',
      k: ['lead health:10', 'lead poison*:10', 'lead exposure:9', 'lead dangerous:9', 'lead children:9', 'safe level of lead:10', 'blood lead:9', 'flint:8'],
      a: "There's **no known safe level of lead** in children's blood; that's why lead's MCLG is **zero**. In children, lead can lower IQ, cause learning and behavior problems, slow growth, and cause anemia. In adults it raises blood pressure and harms the kidneys. Pregnant women can pass it to the fetus.\nLead gets into water from **service lines, solder, and brass fixtures**, especially when water is corrosive. The **Flint, Michigan** crisis (2014–2015) happened when a source change without corrosion control released lead from pipes. Corrosion control, lead line replacement, and flushing taps that sat unused are the defenses.",
      rel: ['lead-copper', 'lsl-inventory', 'corrosion-control'], src: ['lcri'] },
    { id: 'lead-free', q: 'What does "lead free" plumbing mean?',
      k: ['lead free:10', 'lead-free:10', 'reduction of lead in drinking water act:10', '0.25%:8', 'lead ban:8', 'lead solder:7'],
      a: "Under **SDWA Section 1417**, as tightened by the **Reduction of Lead in Drinking Water Act** (effective **January 4, 2014**):\n• Pipes, fittings, and fixtures may contain no more than a **0.25% weighted average** of lead on wetted surfaces.\n• Solder and flux may contain no more than **0.2%** lead.\nThe original **1986** amendments banned lead pipe, solder, and flux in new plumbing (the old limit for fixtures was 8%). Buy parts certified to **NSF/ANSI/CAN 61** and 372 for drinking water use.",
      rel: ['lead-copper', 'lead-health', 'lsl-inventory'], src: ['lcri'] }
  );

  X.push(
    { id: 'cwa', q: 'What is the Clean Water Act?',
      k: ['clean water act:10', 'cwa:8', 'federal water pollution control act:10', 'fwpca:9', 'fishable swimmable:9'],
      a: "The **Clean Water Act** (enacted **October 18, 1972**, over a presidential veto) protects rivers, lakes, streams, and wetlands. Its goal: “restore and maintain the chemical, physical, and biological integrity of the Nation's waters.” The SDWA protects tap water; the CWA protects the source waters and regulates what's discharged into them.\nKey parts:\n• **§402 NPDES** permits for point-source discharges\n• **§303** water quality standards and **TMDLs** for impaired waters\n• **§404** dredge-and-fill permits (Army Corps)\n• **§307** pretreatment, **§405** biosolids, **§311** oil spills\n• **Title VI** Clean Water State Revolving Fund (1987)\nIn Mississippi, **MDEQ** has run the NPDES program since **May 1, 1974**.",
      rel: ['npdes', 'tmdl', 'wotus'], src: ['cwa', 'regsPage'] },
    { id: 'npdes', q: 'What is an NPDES permit?',
      k: ['npdes:10', 'discharge permit*:9', 'national pollutant discharge:10', 'dmr:8', 'discharge monitoring report*:10', 'effluent limit*:8', 'point source:7'],
      a: "An **NPDES permit** (National Pollutant Discharge Elimination System, Clean Water Act §402) is required to discharge pollutants from a **point source**, like a pipe or ditch, into waters of the U.S. It sets:\n• **Effluent limits**, technology-based (like secondary treatment) or water-quality-based\n• **Monitoring** and **discharge monitoring reports (DMRs)**\n• Special conditions and a term of up to **5 years**\nIn Mississippi, **MDEQ** issues NPDES permits. Water plants may need one for backwash or other process water discharges; sewage plants always do.",
      rel: ['secondary-treatment', 'cwa', 'tmdl'], src: ['npdes'] },
    { id: 'secondary-treatment', q: 'What are the secondary treatment standards?',
      k: ['secondary treatment standard*:10', 'secondary treatment:8', '30/30:8', '30 mg/l bod:9', '85% removal:9', '85 percent removal:9', '40 cfr 133:10'],
      a: "Federal **secondary treatment** standards for publicly owned sewage plants (40 CFR 133):\n• **BOD₅: 30 mg/L** 30-day average, **45 mg/L** 7-day average\n• **TSS: 30 mg/L** 30-day average, **45 mg/L** 7-day average\n• At least **85% removal** of BOD₅ and TSS\n• **pH 6.0–9.0**\nSome lagoon and trickling filter plants qualify for adjusted “treatment equivalent to secondary” limits. Water-quality-based limits (ammonia, DO, nutrients) can be stricter.",
      rel: ['npdes', 'bod-cod', 'lagoons'], src: ['npdes'] },
    { id: 'tmdl', q: 'What is a TMDL?',
      k: ['tmdl:10', 'total maximum daily load:10', '303(d):10', '303 d:9', 'impaired water*:9', 'impaired stream*:9', 'water quality standard*:7', 'designated use*:8', 'antidegradation:9'],
      a: "Under Clean Water Act §303, each state sets **water quality standards**: **designated uses** (drinking water supply, fish and wildlife, recreation), **criteria** to protect them, and an **antidegradation** policy.\nWaters that don't meet standards go on the **303(d) list** of impaired waters. For each, the state writes a **TMDL** (Total Maximum Daily Load): the most of a pollutant the water can take and still meet standards, divided among point sources (wasteload allocations), nonpoint sources (load allocations), and a margin of safety.\nIn Mississippi, MDEQ writes TMDLs; sediment, nutrients, pathogens, and low dissolved oxygen are common causes of impairment.",
      rel: ['cwa', 'npdes', 'gulf-hypoxia'], src: ['cwa'] },
    { id: 'wotus', q: 'What are "waters of the United States"?',
      k: ['wotus:10', 'waters of the united states:10', 'sackett:10', 'section 404:9', '404 permit*:9', 'dredge and fill:9', 'wetland permit*:8', 'wetlands jurisdiction:9'],
      a: "The Clean Water Act only applies to **“waters of the United States”** (WOTUS), and the definition has been fought over for decades.\n• In ***Sackett v. EPA*** (**May 25, 2023**), the Supreme Court held that the CWA covers only relatively permanent waters and wetlands with a **continuous surface connection** to them.\n• EPA and the Army Corps issued a conforming rule in 2023, **proposed a narrower definition on November 17, 2025**, and issued a **supplemental proposal on September 4, 2026** (comments due October 9, 2026).\n• **Section 404** permits from the Army Corps are needed to fill jurisdictional wetlands and streams.\nCheck with the Corps before building in or near streams or wetlands.",
      rel: ['cwa', 'npdes', 'tmdl'], src: ['wotus'] },
    { id: 'pretreatment', q: 'What is an industrial pretreatment program?',
      k: ['pretreatment:10', 'industrial pretreatment:10', 'industrial user*:8', 'local limits:9', 'categorical standard*:9', 'pass through:7', 'interference:6', 'fog:6'],
      a: "Under Clean Water Act §307 and **40 CFR 403**, industries that discharge to a public sewer must **pretreat** wastes that could **pass through** the treatment plant untreated or **interfere** with it (upset the biology or contaminate the biosolids).\n• **Categorical standards** apply to specific industries (like metal finishing).\n• **Local limits** protect each plant.\n• **General prohibitions** ban things like fire hazards, corrosives (pH below 5.0), and flow or heat that upset the plant.\nLarger systems must run an approved program; smaller ones still need a sewer use ordinance. Fats, oils, and grease (**FOG**) programs for restaurants are a common local piece.",
      rel: ['npdes', 'activated-sludge', 'biosolids'], src: ['npdes'] },
    { id: 'biosolids', q: 'What are the rules for biosolids?',
      k: ['biosolid*:10', '40 cfr 503:10', 'part 503:10', 'class a biosolids:10', 'class b biosolids:10', 'land application:8', 'sewage sludge:8'],
      a: "**40 CFR 503** (Clean Water Act §405) governs sewage sludge that's land-applied, landfilled, or incinerated:\n• **Pollutant limits** for metals such as arsenic, cadmium, lead, and mercury\n• **Pathogen reduction**: **Class A** (essentially pathogen-free; for example composting or heat drying, with fecal coliform under 1,000 MPN per gram of dry solids) or **Class B** (reduced pathogens, with site and harvest restrictions)\n• **Vector attraction reduction** so the sludge doesn't draw flies and rodents\nKeep records of treatment and where the biosolids go.",
      rel: ['anaerobic-digestion', 'pretreatment', 'npdes'], src: ['npdes'] },
    { id: 'stormwater', q: 'What stormwater permits are required?',
      k: ['stormwater permit*:10', 'storm water permit*:10', 'ms4:10', 'construction general permit:10', 'erosion control:7', 'swppp:10', 'one acre:7', '1 acre:6'],
      a: "The **1987 Water Quality Act** brought stormwater into the NPDES program:\n• **Construction sites** disturbing **one acre or more** need coverage (usually a general permit) and a stormwater pollution prevention plan (**SWPPP**) with erosion and sediment controls.\n• **Industrial facilities** in listed categories need coverage.\n• **MS4s** (municipal separate storm sewer systems) in urbanized areas need permits with public education, illicit discharge detection, construction and post-construction controls, and good housekeeping.\nMain replacement and tank projects can easily disturb an acre. In Mississippi, MDEQ issues these permits.",
      rel: ['npdes', 'cwa', 'rational-method'], src: ['npdes'] },
    { id: 'spcc', q: 'Does a water plant need an SPCC plan?',
      k: ['spcc:10', 'spill prevention:9', 'oil spill plan*:9', '1,320 gallon*:10', '1320 gallon*:10', 'generator fuel:7', '40 cfr 112:10'],
      a: "Maybe. **SPCC** (Spill Prevention, Control, and Countermeasure, 40 CFR 112) applies when a facility could reasonably discharge oil to navigable waters and has:\n• More than **1,320 gallons** of aboveground oil storage capacity (counting only containers of **55 gallons or more**), or\n• More than **42,000 gallons** of completely buried storage.\n**Standby generator fuel tanks** at plants, wells, and booster stations are often what triggers it. The plan covers secondary containment, inspections, training, and spill response.",
      rel: ['epcra', 'rmp-psm', 'emergency-plan'], src: ['regsPage'] },
    { id: 'epcra', q: 'What does EPCRA require for chlorine?',
      k: ['epcra:10', 'tier ii:10', 'tier 2 report*:10', 'right to know:9', 'right-to-know:9', 'threshold planning quantity:10', 'tpq:9', 'lepc:9'],
      a: "The **Emergency Planning and Community Right-to-Know Act** (EPCRA, 1986) covers facilities that store hazardous chemicals:\n• **Chlorine** is an extremely hazardous substance with a **threshold planning quantity of 100 lb**. At or above that, notify the state emergency response commission and the local emergency planning committee (**LEPC**).\n• File a **Tier II** chemical inventory report by **March 1** every year for chemicals over the thresholds.\n• Report accidental releases above reportable quantities.\nShare your site plan with the fire department; it's exactly what responders need in a chlorine leak.",
      rel: ['rmp-psm', 'chlorine-gas-safety', 'spcc'], src: ['regsPage'] },
    { id: 'rmp-psm', q: 'When do RMP and PSM apply to a chlorine system?',
      k: ['risk management program:10', 'rmp:9', 'process safety management:10', 'psm:9', '2,500 lb*:10', '2500 lb*:10', '1,500 lb*:10', '1500 lb*:10', 'risk management plan:9'],
      a: "Two separate programs cover large chemical inventories:\n• **EPA Risk Management Program (40 CFR 68)**: processes with **more than 2,500 lb of chlorine** (sulfur dioxide 5,000 lb; anhydrous ammonia 10,000 lb). Requires a hazard assessment with worst-case release scenarios, a prevention program, an emergency response program, and a risk management plan filed with EPA and updated every 5 years.\n• **OSHA Process Safety Management (29 CFR 1910.119)**: processes with **1,500 lb or more** of chlorine. It covers private employers, and public employers only in states whose OSHA-approved plan includes them.\nTwo one-ton containers connected to one process already exceed the RMP threshold.",
      rel: ['epcra', 'chlorine-gas-safety', 'cylinders'], src: ['regsPage'] },
    { id: 'uic-ssa', q: 'What are underground injection control and sole source aquifers?',
      k: ['underground injection:10', 'uic:9', 'injection well*:9', 'class v well*:9', 'sole source aquifer*:10', 'ssa:6'],
      a: "Both come from the SDWA to protect ground water:\n• **Underground Injection Control (UIC)** regulates six classes of injection wells, from deep hazardous-waste wells (Class I) and oil and gas brine wells (Class II) to shallow disposal systems (Class V) and carbon sequestration (Class VI), so they don't contaminate underground sources of drinking water.\n• A **sole source aquifer** designation (SDWA §1424(e)) can be made where an aquifer supplies **at least 50%** of an area's drinking water with no reasonable alternative. Federally funded projects over it then get EPA review.",
      rel: ['wellhead-protection', 'ms-aquifer-list', 'abandoned-wells'], src: ['regsPage'] },
    { id: 'srf-funding', q: 'How do water systems pay for big projects?',
      k: ['srf:9', 'state revolving fund*:10', 'dwsrf:10', 'cwsrf:10', 'bipartisan infrastructure law:10', 'infrastructure law:8', 'bil funding:9', 'wifia:10', 'grant* for water:8', 'loan* for water:8', 'principal forgiveness:9'],
      a: "The main federal sources:\n• **Drinking Water SRF** (1996) and **Clean Water SRF** (1987): low-interest loans run by each state, often with **principal forgiveness** for disadvantaged communities. In Mississippi, MSDH runs the DWSRF and MDEQ runs the CWSRF.\n• The **Bipartisan Infrastructure Law** (November 15, 2021) added more than **$50 billion** for water, including **$15 billion** for lead service line replacement and **$10 billion** for emerging contaminants like PFAS.\n• **WIFIA** (2014): long-term federal loans for large projects.\n• USDA Rural Development loans and grants for rural systems.\nMsRWA and the state agencies can help small systems apply.",
      rel: ['asset-management', 'rate-setting', 'lead-copper'], src: ['regsPage'] },
    { id: 'jackson-crisis', q: "What happened with Jackson's water system?",
      k: ['jackson water:10', 'jackson crisis:10', 'jxn water:10', 'o.b. curtis:10', 'ob curtis:10', 'henifin:10', 'third party manager:9', 'third-party manager:9', 'jackson mississippi water:10'],
      a: "In **late August 2022**, problems at Jackson's **O.B. Curtis** treatment plant left much of the city without reliable water pressure, after years of boil-water notices and deferred maintenance. EPA had issued a Safe Drinking Water Act emergency order in 2020.\nThe U.S. Department of Justice brought a SDWA case, and on **November 29, 2022**, a federal court appointed **Ted Henifin** as interim third-party manager. His company, **JXN Water**, runs the system under court order, later expanded to the sewer system. As of 2026 the court still oversees it, and the transition back to long-term local control is before the judge.",
      more: "Lessons that apply everywhere: redundancy in treatment and power, staffing and training, asset management with real funding, and plans for extreme weather. Jackson draws surface water from the Ross Barnett Reservoir and the Pearl River, which makes it unusual in a mostly groundwater state.",
      rel: ['asset-management', 'enforcement', 'emergency-plan'], src: ['regsPage'] },
    { id: 'ms-water-law', q: 'Who owns the water in Mississippi?',
      k: ['who owns the water:10', 'water law:8', 'water rights:8', '51-3-1:10', 'groundwater permit*:9', 'withdrawal permit*:9', 'well permit*:8', '6 inch casing:9', 'six inch casing:9'],
      a: "State law says **all water**, “whether occurring on the surface of the ground or underneath the surface of the ground,” belongs to the **people of Mississippi** and is subject to regulation (**Miss. Code §51-3-1**).\n• **MDEQ** issues surface water and ground water withdrawal permits. A ground water permit is required for wells with a surface casing **6 inches or larger**.\n• A well serving a **single household** for domestic use is exempt.\n• Wells in a **public water system** must also meet **MSDH** rules, whatever their size.\n• In the Delta, **YMD** processes agricultural water-use permits.\nCourts treat aquifers that cross state lines as shared, as **Mississippi v. Tennessee** (2021) showed.",
      rel: ['ms-v-tn', 'ymd', 'ms-aquifer-list'], src: ['mdeqPermit'] }
  );

  /* ================= MISSISSIPPI AQUIFERS ================= */
  X.push(
    { id: 'ms-aquifer-list', q: 'What are the major aquifers in Mississippi?',
      k: ['major aquifers:9', 'list of aquifers:9', 'aquifers in mississippi:10', 'mississippi aquifers:9', '16 aquifers:10', 'sixteen aquifers:10', 'how many aquifers:10', 'all the aquifers:9'],
      a: "MDEQ describes **16 major aquifers** and many minor ones (the operators manual counts 15 principal freshwater aquifers). From youngest to oldest:\n• **Mississippi River Valley alluvial** (the Delta)\n• **Citronelle** and the **Miocene system** (south Mississippi and the coast)\n• **Oligocene / Forest Hill** (central)\n• **Cockfield**, **Sparta**, **Winona-Tallahatta**, **Meridian-upper Wilcox** (Eocene, central and north)\n• **Middle Wilcox**, **lower Wilcox** (Paleocene-Eocene)\n• **Ripley**, **Coffee Sand**, **Eutaw-McShan**, **Gordo**, **Coker/massive sand** (Cretaceous, northeast)\n• **Paleozoic** (Tishomingo County)\nAsk me about any one of them.",
      rel: ['ms-why-deeper', 'aq-mrva', 'aq-sparta'], src: ['aqPage', 'usgsHA'] },
    { id: 'ms-why-deeper', q: 'Why are wells deeper in south Mississippi?',
      k: ['why are wells deeper:10', 'wells deeper:8', 'deeper wells:6', 'mississippi embayment:10', 'embayment:9', 'layers dip:9', 'dip southwest:9', 'outcrop belt*:8', 'recharge area of an aquifer:8', 'layer cake:7'],
      a: "Mississippi sits on the **Mississippi Embayment**, a huge trough along the Mississippi River that opens toward the Gulf. Its sand, clay, and chalk layers **dip toward the southwest and south** and thicken in that direction.\n• The **oldest** layers reach the surface in the **northeast** (Paleozoic rock in Tishomingo County, then Cretaceous sands); the **youngest** are near the **coast** and in the **Delta**.\n• Where a layer reaches the surface (its **outcrop**), rain recharges it and it's unconfined.\n• Down-dip, the same sand is buried under younger layers and confined, so its water is under **artesian** pressure.\nSo to reach a given aquifer, you drill deeper the farther southwest you go, and eventually the water there is too mineralized to use.",
      more: "Fresh water has a floor. Dissolved solids above about **1,000 mg/L** generally mark its down-dip limit. Along the coast, fresh water reaches about **1,200 feet** deep east of Pascagoula and more than **3,000 feet** in western Hancock County. Ground water also warms about **1°F per 100 feet** of depth.",
      rel: ['confining-unit', 'aquifer-types', 'ms-aquifer-list'], src: ['aqPage'] },
    { id: 'confining-unit', q: 'What is a confining unit?',
      k: ['confining unit*:10', 'confining layer*:10', 'confining bed*:10', 'aquitard*:10', 'aquiclude*:10', 'leaky aquifer:8', 'yazoo clay:10', 'porters creek:10', 'cook mountain:10', 'zilpha:10', 'selma chalk:10'],
      a: "A **confining unit** (aquitard) is a layer of clay, shale, chalk, or other low-permeability material that slows water down so much that the aquifers above and below behave separately, each with its own pressure and chemistry. It doesn't stop water entirely; some **leakage** moves through.\nMississippi's big ones: the **Yazoo Clay** (Jackson Group), the **Cook Mountain Formation**, the **Zilpha Clay**, the **Porters Creek Clay** under the Flatwoods, and the **Selma chalk** of the Black Prairie.\nFun fact: the Yazoo Clay is an expansive clay that shrinks and swells so much it cracks foundations, streets, and water mains around Jackson.",
      rel: ['aquifer-types', 'ms-why-deeper', 'ms-aquifer-list'], src: ['aqPage'] },
    { id: 'aq-mrva', q: 'What is the Mississippi River Valley alluvial aquifer?',
      k: ['mississippi river valley alluvial:10', 'alluvial aquifer:9', 'mrva:10', 'delta aquifer:10', 'aquifer in the delta:10', 'delta groundwater:9', 'alluvial plain:8'],
      a: "The **Mississippi River Valley alluvial aquifer (MRVA)** is river-laid **sand and gravel** under the Mississippi Alluvial Plain. In Mississippi that's the **Delta**: about **7,000 square miles** in all or parts of **17 counties**.\n• Usually more than **75 feet** thick (about 25 to more than 150), coarsest at the bottom, capped by silt and clay.\n• The **most heavily pumped aquifer in Mississippi**: about **98%** goes to agriculture (irrigation and catfish ponds). Across the whole alluvial plain, more than **12 billion gallons a day** are withdrawn, ranking it **third** in the U.S. for total withdrawals.\n• Water is usually **hard to very hard** and high in **iron and manganese**, so many Delta towns drill deeper for drinking water.",
      more: "Water levels have fallen in the **central Delta** (Sunflower and Leflore counties), where the USGS spring 2024 map put the lowest water level at about **60 feet above sea level**. Ask me **why the Delta aquifer is declining** for what's being done about it.",
      rel: ['delta-decline', 'ymd', 'ms-aquifer-list'], src: ['aqPage', 'usgsMAP'] },
    { id: 'delta-decline', q: 'Why is the Delta aquifer declining?',
      k: ['delta decline:10', 'declining aquifer:9', 'aquifer declin*:9', 'water level* declin*:8', 'delta water level*:10', 'sunflower county:10', 'central delta:9', 'delta sustainable:10', 'on-farm storage:10', 'shellmound:10', 'managed aquifer recharge:9', 'airborne electromagnetic:10'],
      a: "In the central Delta, irrigation and aquaculture pumping has outpaced recharge for decades, so a broad **cone of depression** has formed, centered on **Sunflower and Leflore counties**. Wet years in the mid-to-late 2010s slowed the declines, and some areas rebounded, but the long-term trend has been down.\nWhat's being done:\n• **YMD** (formed 1989 after the 1988 drought) permits agricultural wells and measures water levels.\n• The **Delta Sustainable Water Resources Task Force** (MDEQ, 2011; executive order 2014) coordinates agencies and farm groups.\n• **Conservation**: soil moisture sensors, tailwater recovery ditches, **on-farm storage reservoirs** (first in the Delta in 2010), land forming, low-grade weirs.\n• **Managed aquifer recharge**: a pilot near **Shellmound** (Leflore County) pumps water from wells beside the Tallahatchie River and recharges the aquifer.\n• **Mapping**: USGS airborne electromagnetic surveys (2018 and 2021–2022, the largest ever flown in the U.S.) improve groundwater models.",
      rel: ['aq-mrva', 'ymd', 'mar-asr'], src: ['mdeqDelta', 'usgsMAP'] },
    { id: 'ymd', q: 'What is YMD?',
      k: ['ymd:10', 'yazoo mississippi delta joint water management:10', 'water management district:9', 'delta water permit*:9', 'agricultural water permit*:9'],
      a: "The **Yazoo Mississippi Delta Joint Water Management District (YMD)** was created in **1989**, a direct result of the **1988 drought**. It works on local, non-regulatory solutions to the Delta's water issues:\n• Processes **agricultural water-use permit** applications for ground water and surface water (more than **25,000** permits)\n• **Measures water levels** in the alluvial aquifer\n• Promotes **irrigation efficiency** and water conservation practices with farmers\nIt's based in Stoneville, near Leland.",
      rel: ['delta-decline', 'aq-mrva', 'ms-water-law'], src: ['ymd'] },
    { id: 'aq-citronelle', q: 'Tell me about the Citronelle aquifer',
      k: ['citronelle:10', 'citronelle aquifer*:10', 'pliocene:8', 'water table aquifer* south mississippi:8'],
      a: "The **Citronelle aquifers** are **Pliocene** sand and gravel (the Citronelle Formation, named for Citronelle, Alabama) that cap hills across **south Mississippi** in a patchy outcrop of about **6,000 square miles**.\n• **Unconfined** (water table) aquifers with an average saturated thickness of about **45 feet**\n• Used mostly for **domestic and farm** wells, and by several towns and industries\n• Shallow and open to the surface, so it's the most **vulnerable to contamination**: wellhead protection matters here",
      rel: ['aq-miocene', 'aquifer-types', 'wellhead-protection'], src: ['aqPage'] },
    { id: 'aq-miocene', q: 'Tell me about the Miocene aquifer system',
      k: ['miocene:10', 'miocene aquifer*:10', 'catahoula:10', 'hattiesburg formation:10', 'pascagoula formation:10', 'graham ferry:10', 'gulf coast aquifer*:9', 'coastal aquifer*:9', 'coast groundwater:9'],
      a: "The **Miocene aquifer system** (Catahoula Sandstone and the Hattiesburg, Pascagoula, and Graham Ferry formations) is the main water source for **south Mississippi and the Gulf Coast**.\n• A thick stack of sands and clays, about **1,000 to 4,000 feet** thick in all\n• Fresh water reaches about **1,200 feet** deep east of Pascagoula and more than **3,000 feet** in western Hancock County\n• Near Pascagoula, the **Graham Ferry** holds the most widely used aquifer\n• Heavy coastal pumping lowered water levels in some of its aquifers about **2 feet a year since 1940**, with declines of **more than 100 feet** across large areas\n• Recharge comes from rain on the outcrop inland; water moves south and southeast toward the coast\nThe Hattiesburg Formation is named for Hattiesburg.",
      rel: ['aq-citronelle', 'saltwater-intrusion', 'ms-why-deeper'], src: ['aqPage'] },
    { id: 'aq-oligocene', q: 'What is the Forest Hill aquifer?',
      k: ['forest hill:10', 'oligocene:10', 'vicksburg group:9', 'forest hill aquifer:10', 'oligocene aquifer*:10'],
      a: "The **Oligocene aquifer system** is made up of the **Forest Hill Sand** and the limestones and marls of the **Vicksburg Group**. It crops out in a band **5 to 10 miles wide** running southeast across the state, from the Warren–Yazoo county line to northeastern Wayne County.\nValley-fill sands in the Forest Hill Formation are the aquifers. They're most important for **domestic and farm wells** rather than large public supplies. It lies just above the Yazoo Clay.",
      rel: ['aq-cockfield', 'confining-unit', 'ms-aquifer-list'], src: ['aqPage'] },
    { id: 'aq-cockfield', q: 'Tell me about the Cockfield aquifer',
      k: ['cockfield:10', 'cockfield aquifer:10', 'upper claiborne:10'],
      a: "The **Cockfield aquifer** is the uppermost Claiborne aquifer (Eocene), called the **upper Claiborne aquifer** in regional USGS studies. It's a principal water source in **central and west-central Mississippi**.\n• Covered by the **Yazoo Clay** (Jackson Group) and separated from the Sparta below by the **Cook Mountain Formation**\n• Used by public supplies in the Jackson area, where USGS tracks Cockfield and Sparta water levels\n• Its sands can hold lignite, and some water is naturally tea-colored",
      rel: ['aq-sparta', 'aq-oligocene', 'confining-unit'], src: ['aqPage'] },
    { id: 'aq-sparta', q: 'Tell me about the Sparta aquifer',
      k: ['sparta:10', 'sparta aquifer:10', 'kosciusko:10', 'memphis sand:10', 'memphis aquifer:10', 'middle claiborne:10', 'sparta-memphis:10'],
      a: "The **Sparta aquifer** (the Sparta or **Kosciusko** Sand) is part of the **Middle Claiborne aquifer**, which runs under Tennessee (as the **Memphis Sand**), Arkansas, and Louisiana. USGS calls the Sparta-Memphis the **most widely used aquifer for industry and public supply in the Mississippi embayment**.\n• Heavily pumped in the **Jackson metro**, where USGS found cones of depression **more than 40 feet** deep in Rankin County\n• Long-record wells there declined about **2.5 feet a year**; some wells to the north, 3.5 to more than 4 feet a year\n• **Chloride** increases down-dip, toward the south\n• It's the aquifer at the center of **Mississippi v. Tennessee** (2021)",
      rel: ['ms-v-tn', 'aq-cockfield', 'aq-winona'], src: ['aqPage', 'scotus'] },
    { id: 'aq-winona', q: 'Tell me about the Winona-Tallahatta aquifer',
      k: ['winona:10', 'tallahatta:10', 'winona-tallahatta:10', 'winona tallahatta:10', 'neshoba sand:9', 'cane river:8'],
      a: "The **Winona-Tallahatta aquifer** (the Winona Sand and sands of the Tallahatta Formation) holds fresh water, under 1,000 mg/L dissolved solids, beneath about **a quarter of the state** in northwestern and central Mississippi.\n• Its sands continue into Tennessee as part of the **Memphis aquifer**; in Arkansas and Louisiana the unit is the **Cane River Formation**.\n• It supplies few large users but **hundreds of small domestic and stock wells**, most less than **200 feet** deep.\nThe Winona Sand is named for Winona, Mississippi.",
      rel: ['aq-sparta', 'aq-muw', 'ms-aquifer-list'], src: ['aqPage'] },
    { id: 'aq-muw', q: 'Tell me about the Meridian-upper Wilcox aquifer',
      k: ['meridian-upper wilcox:10', 'meridian upper wilcox:10', 'meridian sand:10', 'upper wilcox:10', 'meridian aquifer:9'],
      a: "The **Meridian-upper Wilcox aquifer** combines the **Meridian Sand** (at the base of the Tallahatta Formation) with connected sands in the **upper Wilcox Group**. It holds fresh water beneath about **15,000 square miles** of northwestern and central Mississippi.\n• Aggregate sand thickness ranges from under **50** to about **500 feet**; thick, permeable sands yield as much as **2,800 gpm** to a well\n• Fresh water extends **more than 2,000 feet** deep\n• A major source for **public and industrial supplies**, including in east-central Mississippi\n• Common problems: **too much iron** and **corrosive water**\nThe Meridian Sand is named for Meridian.",
      rel: ['aq-mwilcox', 'aq-lwilcox', 'iron-manganese'], src: ['aqPage'] },
    { id: 'aq-mwilcox', q: 'What is the middle Wilcox aquifer?',
      k: ['middle wilcox:10', 'middle wilcox aquifer:10', 'fort pillow:10'],
      a: "Between the lower Wilcox and the Meridian-upper Wilcox lie **numerous sand beds** that act together as one hydraulic unit. USGS calls them the **middle Wilcox aquifer system** and describes it as a potentially significant source of ground water in Mississippi.\nThe sands are thin and interbedded with silt and clay; regionally the unit is generally **less than 200 feet** thick. In Tennessee, the equivalent unit is the **Fort Pillow Sand**.",
      rel: ['aq-lwilcox', 'aq-muw', 'ms-aquifer-list'], src: ['aqPage'] },
    { id: 'aq-lwilcox', q: 'Tell me about the lower Wilcox aquifer',
      k: ['lower wilcox:10', 'lower wilcox aquifer:10', 'wilcox aquifer:8', 'tallahatchie:9', 'quitman county:9', 'panola county:9'],
      a: "The **lower Wilcox aquifer** (Paleocene) is a deep confined aquifer of **north Mississippi**.\n• It's recharged where it crops out in north-central Mississippi, and its water surface slopes **west**, down-dip, away from there.\n• Heavy pumping formed a large **cone of depression** under **Tallahatchie, Quitman, and Panola** counties.\n• Water levels fell about **1 to 2 feet a year** after 1979 in much of the confined part.\n• It sits just above the **Porters Creek Clay**, the confining unit under the Flatwoods.",
      rel: ['aq-mwilcox', 'drawdown', 'ms-aquifer-list'], src: ['aqPage'] },
    { id: 'aq-ripley', q: 'Tell me about the Ripley aquifer',
      k: ['ripley:10', 'ripley aquifer:10', 'pontotoc ridge:9'],
      a: "The **Ripley aquifer** is in the **Ripley Formation** (Late Cretaceous Selma Group), named for Ripley, Mississippi. With the Coffee Sand, it holds fresh water beneath about **4,400 square miles** of northern Mississippi.\n• Public and industrial wells commonly yield **50 to 300 gpm**\n• Common problems: **low yields** and **hard water**\n• Regional water-level declines have been small; USGS rated it as having moderate potential for more development",
      rel: ['aq-coffee', 'aq-eutaw', 'ms-aquifer-list'], src: ['aqPage'] },
    { id: 'aq-coffee', q: 'Tell me about the Coffee Sand aquifer',
      k: ['coffee sand:10', 'coffee sand aquifer:10'],
      a: "The **Coffee Sand** (Late Cretaceous Selma Group) is a northern sand that takes the place of part of the Selma chalk. With the Ripley, it underlies about **4,400 square miles** of northern Mississippi.\n• **South of Tupelo** it yields little water to wells\n• In **1975**, public systems and industries pumped about **4 million gallons a day** from the Coffee Sand and Ripley together\n• Pumping in Tippah and Union counties has only mildly affected its water levels",
      rel: ['aq-ripley', 'aq-eutaw', 'ms-aquifer-list'], src: ['aqPage'] },
    { id: 'aq-eutaw', q: 'Tell me about the Eutaw-McShan aquifer',
      k: ['eutaw:10', 'mcshan:10', 'eutaw-mcshan:10', 'eutaw mcshan:10', 'tupelo aquifer:10', 'tupelo water:9', 'west point aquifer:9'],
      a: "The **Eutaw-McShan aquifer** (Late Cretaceous Eutaw and McShan formations) is a major aquifer for **northeast Mississippi**, confined down-dip beneath the **Selma chalk** of the Black Prairie.\n• USGS reported long-term declines of **1 to 2 feet a year** in much of the confined part, **2 to 9 feet a year** in some Lee County wells, and about **5 feet a year** near **West Point** after 1972.\n• Levels at Tupelo and West Point fell about **200 feet** below early-1900s levels.\n• After **Tupelo began using Tombigbee River water**, the level beneath the city rose **nearly 100 feet in about five years**: the best-documented aquifer recovery in the state.",
      rel: ['aq-gordo', 'aq-coffee', 'drawdown'], src: ['aqPage'] },
    { id: 'aq-gordo', q: 'Tell me about the Gordo aquifer',
      k: ['gordo:10', 'gordo aquifer:10', 'tuscaloosa:9', 'tuscaloosa aquifer*:10'],
      a: "The **Gordo aquifer** (Gordo Formation, Tuscaloosa Group, Late Cretaceous) is the upper aquifer of the **Tuscaloosa system** in northeast Mississippi, just below the Eutaw-McShan.\n• It's pumped along with the Eutaw-McShan; a USGS model simulated average declines of about **44 feet** in its confined part (**53 feet** in the Eutaw-McShan).\n• USGS modeled the Eutaw-McShan, Gordo, Coker, massive sand, and Lower Cretaceous aquifers together over about **33,440 square miles**.",
      rel: ['aq-eutaw', 'aq-coker', 'groundwater-model'], src: ['aqPage'] },
    { id: 'aq-coker', q: 'Tell me about the Coker aquifer',
      k: ['coker:10', 'coker aquifer:10', 'massive sand:10'],
      a: "The **Coker Formation**, including the thick **massive sand**, holds the lower aquifers of the **Tuscaloosa system** in northeast Mississippi, below the Gordo. USGS modeled them together with the Eutaw-McShan and Gordo; **Lower Cretaceous** sands lie deeper still and were included in the same model.",
      rel: ['aq-gordo', 'aq-eutaw', 'aq-paleozoic'], src: ['aqPage'] },
    { id: 'aq-paleozoic', q: 'Tell me about the Paleozoic aquifer',
      k: ['paleozoic:10', 'paleozoic aquifer:10', 'fort payne:10', 'tuscumbia:10', 'tishomingo:9', 'corinth water:9', 'corinth aquifer:10'],
      a: "The **Paleozoic aquifer** is Mississippi's oldest, cropping out only in **Tishomingo County**.\n• Beds of sandstone, shale, and limestone dip about **30 feet per mile** to the southwest.\n• The **Fort Payne Chert** and **Tuscumbia Limestone** hold the main water-bearing zones; wells commonly yield **20 to 30 gpm**, and a few much more.\n• It supplies public, industrial, and domestic wells in two northeastern counties. Large withdrawals at **Corinth** lowered its water level there about **140 feet** after 1954 (USGS).\n• Water moves through fractures and dissolved openings in the limestone, so contamination can travel fast.",
      rel: ['karst', 'aq-coker', 'wellhead-protection'], src: ['aqPage'] },
    { id: 'ms-v-tn', q: 'What was Mississippi v. Tennessee about?',
      k: ['mississippi v tennessee:10', 'mississippi v. tennessee:10', 'mississippi vs tennessee:10', 'memphis pumping:10', 'mlgw:10', 'equitable apportionment:10', 'interstate aquifer:10', 'aquifer lawsuit:9', 'supreme court aquifer:10'],
      a: "Memphis Light, Gas and Water pumps about **120 million gallons a day** from the **Middle Claiborne aquifer** (Memphis Sand in Tennessee, Sparta Sand in Mississippi), from wells entirely inside Tennessee. Mississippi sued, arguing the pumping pulled Mississippi-owned water across the state line.\nOn **November 22, 2021**, the U.S. Supreme Court ruled **9–0** against Mississippi. Chief Justice Roberts wrote that the aquifer has a **multistate character**: its water flows naturally between the states. So it's subject to **equitable apportionment**, the same doctrine used for interstate rivers, and a state doesn't outright own the part under its borders. Mississippi's complaint was dismissed without leave to amend. It was the first time the Court applied equitable apportionment to ground water.",
      rel: ['aq-sparta', 'ms-water-law', 'water-rights'], src: ['scotus', 'aqPage'] },
    { id: 'ms-gw-quality', q: 'What is ground water quality like in Mississippi?',
      k: ['groundwater quality mississippi:10', 'ground water quality mississippi:10', 'mississippi water quality:9', 'tea colored water:10', 'tea-colored water:10', 'colored well water:9', 'brown well water:9', 'yellow water:8'],
      a: "MDEQ's ground water assessments describe Mississippi's ground water quality as **very good** overall. The most notable natural issue is **color**: tea-colored water from dissolved organic matter (humic material, tannins) in some aquifers, especially sands near lignite or buried plant material.\nOther common natural issues: **iron and manganese** (the alluvial aquifer, the Meridian-upper Wilcox, and others), **hardness** (the alluvial aquifer, Coffee Sand, Ripley), **corrosive** soft water, occasional **hydrogen sulfide**, and **salty water** down-dip beyond the fresh water limit.\nColor bodies also react with chlorine to form DBPs, so remove color before chlorinating where you can.",
      rel: ['iron-manganese', 'dbps', 'hardness'], src: ['mdeqGW', 'aqPage'] }
  );

  /* ================= GROUNDWATER SCIENCE ================= */
  X.push(
    { id: 'darcys-law', q: "What is Darcy's law?",
      k: ["darcy's law:10", 'darcys law:10', 'darcy law:10', 'darcy flux:10', 'seepage velocity:10', 'groundwater velocity:9', 'groundwater speed:9', 'how fast does groundwater move:10'],
      a: "**Darcy's law** (Henry Darcy, 1856, from sand-filter experiments in Dijon, France) says flow through porous material is proportional to the hydraulic gradient:\n**Q = K × i × A**   or   **q = K × i**\n• **K** = hydraulic conductivity (ft/day), **i** = gradient (head drop ÷ distance), **A** = cross-sectional area\n• **q** is the Darcy flux, a volume per area. Water only moves through the pores, so its actual speed is the **seepage velocity: v = K × i ÷ n**, where n is effective porosity.\nExample: K = 50 ft/day, i = 0.002, n = 0.25 → v = **0.4 ft/day**, about 146 feet a year. Give me K, gradient, and porosity and I'll work it.",
      more: "Darcy's law holds for slow, laminar flow, which covers nearly all ground water. It breaks down in very coarse gravel, karst conduits, or right next to high-rate wells, where flow can become turbulent.",
      rel: ['hydraulic-conductivity', 'hydraulic-head', 'contaminant-transport'], src: ['aqPage'] },
    { id: 'hydraulic-conductivity', q: 'What is hydraulic conductivity?',
      k: ['hydraulic conductivity:10', 'k value*:7', 'intrinsic permeability:10', 'conductivity of sand:9', 'conductivity of clay:9', 'gpd/ft2:8'],
      a: "**Hydraulic conductivity (K)** is how easily water moves through a material, in ft/day (or gpd/ft²; 1 ft/day ≈ 7.48 gpd/ft²). Rough ranges:\n• **Gravel**: roughly 100s to 10,000s of ft/day\n• **Clean sand**: about 1 to 1,000s\n• **Silt**: about 0.001 to 1\n• **Clay**: about 0.000001 to 0.001\nIt depends on the material (**intrinsic permeability**) and on the fluid: warm water, being less viscous, flows a bit more easily. **Transmissivity = K × saturated thickness**.",
      rel: ['darcys-law', 'aquifer-properties', 'storativity'], src: ['aqPage'] },
    { id: 'storativity', q: 'What are storativity and specific yield?',
      k: ['storativity:10', 'storage coefficient:10', 'specific yield:9', 'specific storage:10', 'how much water does an aquifer release:9'],
      a: "They measure how much water an aquifer gives up when its head drops.\n• **Specific yield (Sy)**, for **unconfined** aquifers: the water that drains from the pores as the water table falls. Typically **0.05–0.30** (sands around 0.2–0.3).\n• **Storativity (S)**, for **confined** aquifers: the water released by slight expansion of the water and compression of the aquifer as pressure drops. Tiny: about **0.00005 to 0.005**.\nThat's why pumping a confined aquifer spreads its cone of depression for miles, while a water-table aquifer's cone stays much tighter.",
      rel: ['theis', 'aquifer-properties', 'hydraulic-conductivity'], src: ['aqPage'] },
    { id: 'hydraulic-head', q: 'What is hydraulic head and hydraulic gradient?',
      k: ['hydraulic head:10', 'hydraulic gradient:10', 'potentiometric surface:10', 'piezometric surface:10', 'head in an aquifer:8', 'flow net*:10'],
      a: "**Hydraulic head** is the level water rises to in a well tapping a given point: elevation head plus pressure head. Ground water flows from **higher head to lower head**.\n• **Hydraulic gradient** = head difference ÷ distance (ft/ft).\n• For a confined aquifer, a map of the head across the region is its **potentiometric surface**; for a water-table aquifer it's the water table.\n• **Flow nets** (flow lines crossing equipotential lines at right angles) show flow direction and quantity.\nUSGS potentiometric maps of Mississippi aquifers show cones of depression around big pumping centers.",
      rel: ['darcys-law', 'drawdown', 'theis'], src: ['aqPage'] },
    { id: 'theis', q: 'What is the Theis equation?',
      k: ['theis:10', 'theis equation:10', 'well function:10', 'w(u):10', 'transient well:8', 'cone of depression over time:9', 'drawdown equation:9'],
      a: "The **Theis equation** (Charles V. Theis, 1935) gives drawdown around a well pumping a **confined** aquifer over time:\n**s = Q ÷ (4πT) × W(u)**,  with  **u = r²S ÷ (4Tt)**\n• s = drawdown at distance r after time t\n• Q = pumping rate, T = transmissivity, S = storativity\n• W(u) is the **well function** (the exponential integral), read from tables\nDrawdown grows with Q and time, and falls with transmissivity. Assumptions: uniform, infinite aquifer; full penetration; no recharge. The cone of depression lab on the Aquifers page runs it.",
      more: "For small u (long times or close in), the **Cooper-Jacob** approximation works: s ≈ (2.3Q ÷ 4πT) × log₁₀(2.25Tt ÷ r²S). Plot drawdown against log time and the straight line's slope per log cycle gives T = 2.3Q ÷ (4π × Δs).",
      rel: ['cooper-jacob', 'pumping-test', 'storativity'], src: ['aqPage'] },
    { id: 'cooper-jacob', q: 'What is the Cooper-Jacob method?',
      k: ['cooper-jacob:10', 'cooper jacob:10', 'jacob straight line:10', 'semilog drawdown:9', 'drawdown per log cycle:10'],
      a: "The **Cooper-Jacob** method (1946) simplifies the Theis equation when u is small (roughly under 0.01–0.05):\n**s ≈ (2.3Q ÷ 4πT) × log₁₀(2.25Tt ÷ r²S)**\nPlot drawdown against the log of time: the data fall on a straight line.\n• **T = 2.3Q ÷ (4π × Δs)**, where Δs is the drawdown change over one log cycle\n• **S = 2.25T × t₀ ÷ r²**, where t₀ is where the line crosses zero drawdown\nIt's the go-to method for analyzing pumping tests in the field.",
      rel: ['theis', 'pumping-test', 'specific-capacity'], src: ['aqPage'] },
    { id: 'thiem', q: 'What is the Thiem equation?',
      k: ['thiem:10', 'thiem equation:10', 'steady state drawdown:9', 'equilibrium well equation:10'],
      a: "The **Thiem equation** (1906) describes **steady-state** flow to a well in a confined aquifer, once the cone stops growing:\n**Q = 2πT (h₂ − h₁) ÷ ln(r₂ ÷ r₁)**\nwith heads h₁ and h₂ measured in observation wells at distances r₁ and r₂. Rearranged, it gives transmissivity from a steady pumping test. Real aquifers rarely reach a true steady state without a nearby recharge source, which is why transient methods like Theis are used more.",
      rel: ['theis', 'pumping-test', 'hydraulic-head'], src: ['aqPage'] },
    { id: 'pumping-test', q: 'How is an aquifer pumping test done?',
      k: ['pumping test:10', 'aquifer test:10', 'pump test:9', 'recovery test:10', 'observation well*:9', 'slug test:10', 'step drawdown test:10', 'step test:9'],
      a: "An **aquifer (pumping) test** pumps a well at a **constant rate**, usually 24 to 72 hours, while measuring water levels in it and in **observation wells**. Analyzing drawdown versus time (Theis, Cooper-Jacob) gives **transmissivity** and **storativity**, and reveals boundaries (recharge or barrier) and leakage.\n• **Recovery test**: measure the rebound after the pump stops.\n• **Step-drawdown test**: pump at several increasing rates to measure **well efficiency** and well losses.\n• **Slug test**: add or remove a slug of water for a quick, local estimate of K.\nBefore testing, record static levels and trends, and discharge the water far enough away that it doesn't recharge the aquifer you're testing.",
      rel: ['cooper-jacob', 'well-efficiency', 'theis'], src: ['aqPage'] },
    { id: 'well-efficiency', q: 'What is well efficiency?',
      k: ['well efficiency:10', 'well loss*:10', 'aquifer loss:10', 'bq + cq:10', 'bq+cq2:10', 'turbulent well loss:10'],
      a: "Drawdown in a pumping well has two parts (Jacob, 1947): **s = BQ + CQ²**\n• **BQ**, aquifer loss: laminar flow through the formation, proportional to Q\n• **CQ²**, well loss: turbulent flow through the gravel pack, screen, and into the pump, rising with the square of Q\n**Well efficiency** = aquifer loss ÷ total drawdown. A step-drawdown test separates the two. Clogged screens and incrustation raise well loss, which is why **specific capacity** falls as a well ages and why rehab can restore it.",
      rel: ['specific-capacity', 'pumping-test', 'well-problems'], src: ['aqPage'] },
    { id: 'well-interference', q: 'How do nearby wells interfere with each other?',
      k: ['superposition:10', 'well interference:9', 'interfering wells:10', 'image well*:10', 'barrier boundary:10', 'recharge boundary:10', 'well spacing:9'],
      a: "Drawdowns **add up** (the principle of **superposition**): the drawdown at any point is the sum of the drawdowns each pumping well causes there. So two wells too close together each pump from a deeper water level and lose capacity.\nBoundaries work the same way through **image wells**: a nearby impermeable **barrier** acts like a second pumping well (more drawdown), while a river or lake **recharge boundary** acts like an injection well (less drawdown). Space new wells using test data and the Theis equation; try the neighbor-well slider in the cone of depression lab.",
      rel: ['theis', 'drawdown', 'pumping-test'], src: ['aqPage'] },
    { id: 'safe-yield', q: 'What is the safe yield of an aquifer?',
      k: ['safe yield:10', 'sustainable yield:10', 'aquifer yield:9', 'overdraft:9', 'groundwater mining:10', 'water budget myth:10'],
      a: "**Safe yield** was traditionally defined as the amount that can be withdrawn without undesirable results, often equated with natural **recharge**. Hydrologists now warn against that shortcut (John Bredehoeft called it the “water budget myth”): pumping is ultimately balanced by **capturing** water that would otherwise discharge to streams, springs, wetlands, or evaporation, or by **removing storage**.\nSo “sustainable” depends on what you're willing to give up: streamflow, wetland water, land subsidence, water quality, or falling water levels. When withdrawals keep exceeding capture and water levels keep falling, the aquifer is being mined.",
      rel: ['delta-decline', 'gw-sw-interaction', 'subsidence'], src: ['aqPage'] },
    { id: 'gw-sw-interaction', q: 'How do ground water and streams interact?',
      k: ['gaining stream*:10', 'losing stream*:10', 'baseflow:10', 'base flow:10', 'groundwater and streams:10', 'stream depletion:10'],
      a: "Streams and aquifers trade water. A **gaining stream** receives ground water through its bed; that **baseflow** is what keeps it running in dry weather. A **losing stream** leaks water down into the aquifer, common where the water table has dropped below the streambed.\nHeavy pumping near a stream can reverse a gaining reach into a losing one (**stream depletion**). In the Delta, falling alluvial-aquifer levels have reduced baseflow in some streams, one reason the task force looks at ground water and surface water together.",
      rel: ['safe-yield', 'delta-decline', 'mar-asr'], src: ['usgsMAP'] },
    { id: 'saltwater-intrusion', q: 'What is saltwater intrusion?',
      k: ['saltwater intrusion:10', 'salt water intrusion:10', 'ghyben:10', 'herzberg:10', 'salty well*:9', 'chloride increase:8', 'freshwater saltwater interface:10'],
      a: "Near coasts, fresh ground water floats on denser seawater. The **Ghyben-Herzberg** relation says the fresh-salt interface sits about **40 feet below sea level for every 1 foot** the water table stands above sea level. Lower the fresh water head by pumping and the interface rises, and salt water can move into wells (**saltwater intrusion**), both laterally and by **upconing** beneath a well.\nDeep inland aquifers have their own down-dip limit where water becomes mineralized. In Mississippi, watch chloride trends in wells near the coast and in deep wells near the fresh water limit.",
      rel: ['aq-miocene', 'ms-why-deeper', 'tds'], src: ['aqPage'] },
    { id: 'subsidence', q: 'Can pumping ground water make land sink?',
      k: ['subsidence:10', 'land subsidence:10', 'land sink*:10', 'compaction:8', 'ground sinking:10'],
      a: "Yes. When heads drop in aquifers interbedded with **clay**, water squeezes out of the clay and it **compacts**, permanently. The land surface sinks and that storage is lost for good. Famous examples: California's San Joaquin Valley (nearly 30 feet in places) and the Houston-Galveston area, where subsidence worsened flooding and led to regulated pumping. Subsidence isn't a widely reported problem in Mississippi, but it's the reason hydrologists watch heads in clay-rich aquifer systems.",
      rel: ['safe-yield', 'confining-unit', 'delta-decline'], src: ['aqPage'] },
    { id: 'karst', q: 'What is a karst aquifer?',
      k: ['karst:10', 'sinkhole*:9', 'limestone aquifer:10', 'cave aquifer:9', 'conduit flow:10', 'springs:6'],
      a: "**Karst** forms where water dissolves limestone or dolomite, leaving fractures, conduits, caves, sinkholes, and springs. Karst aquifers can yield a lot of water, but it moves **fast** (sometimes miles per day) through conduits instead of slowly through pores, so contamination from a sinkhole can reach a well or spring in hours with little filtering. Darcy's law doesn't describe conduit flow well; dye tracing is the practical tool. In Mississippi, the Paleozoic limestones of the northeast have some of these traits.",
      rel: ['aq-paleozoic', 'wellhead-protection', 'darcys-law'], src: ['aqPage'] },
    { id: 'contaminant-transport', q: 'How do contaminants move in ground water?',
      k: ['contaminant transport:10', 'plume:9', 'advection:10', 'dispersion:10', 'retardation:10', 'sorption:9', 'contamination spread:8', 'chemical plume:10'],
      a: "Four processes move and shape a **plume**:\n• **Advection**: carried along at the ground water's seepage velocity\n• **Dispersion**: spreading as water takes faster and slower paths\n• **Sorption and retardation**: many chemicals stick to soil (especially organic carbon), so they move slower than the water; the **retardation factor** says how much slower\n• **Degradation**: biological or chemical breakdown\nSome chemicals move nearly as fast as the water (chloride, nitrate, MTBE, 1,4-dioxane, short-chain PFAS). Others lag far behind (PCBs, many pesticides, lead).",
      rel: ['napl', 'darcys-law', 'wellhead-protection'], src: ['aqPage'] },
    { id: 'napl', q: 'What are LNAPLs and DNAPLs?',
      k: ['napl:10', 'lnapl:10', 'dnapl:10', 'free product:10', 'nonaqueous phase:10', 'solvent plume:9', 'gasoline plume:9'],
      a: "**NAPLs** are liquids that don't mix with water.\n• **LNAPLs** (light) float on the water table: gasoline, diesel, fuel oil. They spread along the top, and the soluble parts (benzene, MTBE) dissolve into the ground water.\n• **DNAPLs** (dense) sink through the aquifer: chlorinated solvents like **TCE and PCE**, creosote, coal tar. They pool on clay layers and bleed dissolved contamination for decades.\nThat's why solvent sites are so hard to clean up, and why wellhead protection maps dry cleaners, gas stations, and industrial sites.",
      rel: ['contaminant-transport', 'wellhead-protection', 'aeration'], src: ['aqPage'] },
    { id: 'mar-asr', q: 'What is managed aquifer recharge?',
      k: ['managed aquifer recharge:10', 'aquifer recharge:9', 'asr:10', 'aquifer storage and recovery:10', 'artificial recharge:10', 'riverbank filtration:10', 'bank filtration:10', 'recharge well*:9'],
      a: "**Managed aquifer recharge (MAR)** puts water back into aquifers on purpose:\n• **Infiltration basins**: spread water on the surface to soak in\n• **Injection wells**: pump water down into the aquifer\n• **Aquifer storage and recovery (ASR)**: inject treated water in wet times and pump it back out in dry times from the same well\n• **Riverbank filtration**: wells beside a river pull river water through the bank, which filters it naturally\nIn Mississippi, a USGS-supported pilot near **Shellmound** in the Delta pulls water through the bank of the Tallahatchie River and uses it to recharge the alluvial aquifer. Water quality compatibility (such as iron, arsenic, and clogging) is the key design issue.",
      rel: ['delta-decline', 'gw-sw-interaction', 'uic-ssa'], src: ['usgsMAP'] },
    { id: 'groundwater-age', q: 'How old is ground water?',
      k: ['groundwater age:10', 'ground water age:10', 'how old is groundwater:10', 'how old is ground water:10', 'tritium:10', 'carbon 14:9', 'carbon-14:9', 'age dating:10', 'fossil water:10'],
      a: "It ranges from days to hundreds of thousands of years. Shallow water-table aquifers often hold water that recharged within years to decades, while water deep in confined aquifers far from their outcrop can be **thousands of years** old.\nHydrologists date it with tracers:\n• **Tritium** (from 1950s–60s bomb tests) and **CFCs/SF₆** mark water recharged in the last ~70 years\n• **Carbon-14** dates water thousands to tens of thousands of years old\nVery old water is sometimes called **fossil water**: pumping it is mining, because recharge is far too slow to replace it.",
      rel: ['safe-yield', 'ms-why-deeper', 'global-water'], src: ['aqPage'] },
    { id: 'groundwater-model', q: 'How do scientists model ground water?',
      k: ['groundwater model*:10', 'ground water model*:10', 'modflow:10', 'meras:10', 'mississippi embayment regional aquifer study:10', 'aquifer model*:9'],
      a: "Groundwater models solve the flow equation (Darcy's law plus conservation of mass) on a grid of cells. The standard code is USGS **MODFLOW**.\n• Inputs: aquifer geometry and properties (K, storage), recharge, rivers, and pumping\n• Calibration: match measured water levels and streamflows\n• Uses: forecast water levels under different pumping, test conservation, design recharge\nFor this region, USGS built the **Mississippi Embayment Regional Aquifer Study (MERAS)** model, and a newer model of the Mississippi Alluvial Plain uses the airborne electromagnetic surveys to map the subsurface in far more detail.",
      rel: ['delta-decline', 'hydraulic-model', 'calibration'], src: ['usgsMAP'] }
  );

  /* “Which aquifers are near X?” — place lookup, answered from the map data */
  var PLACES = [
    { k: /\b(desoto|de soto|southaven|olive branch|horn lake|hernando|walls)\b/, name: 'DeSoto County', ids: ['aq-sparta', 'aq-muw', 'aq-mrva'],
      t: "North Mississippi's DeSoto County sits over the **Middle Claiborne aquifer**, called the Sparta Sand in Mississippi and the Memphis Sand in Tennessee, the aquifer at the center of Mississippi v. Tennessee. The **Meridian-upper Wilcox** lies deeper, and the western edge of the county is in the Delta, over the **alluvial aquifer**." },
    { k: /\b(clarksdale|coahoma|tunica|north delta|marks|batesville|charleston)\b/, name: 'the north Delta', ids: ['aq-mrva', 'aq-lwilcox', 'aq-muw'],
      t: "Farms in the north Delta irrigate from the **alluvial aquifer**. To the east, heavy pumping of the **lower Wilcox** formed a large cone of depression under Tallahatchie, Quitman, and Panola counties." },
    { k: /\b(indianola|sunflower|greenwood|leflore|greenville|washington county|cleveland|bolivar|belzoni|ruleville|central delta|the delta|delta)\b/, name: 'the central Delta', ids: ['aq-mrva', 'aq-cockfield', 'aq-sparta', 'aq-muw'],
      t: "The central Delta is the heart of irrigation and catfish farming, and the center of the **alluvial aquifer's** long-term decline; the lowest water level on the USGS spring 2024 map was in Sunflower County. Many Delta towns drill past the iron-rich alluvial aquifer into deeper sands such as the **Cockfield**, **Sparta**, or **Meridian-upper Wilcox** for drinking water." },
    { k: /\b(oxford|lafayette|water valley|holly springs)\b/, name: 'Oxford', ids: ['aq-muw', 'aq-lwilcox', 'aq-ripley', 'aq-eutaw'],
      t: "Oxford is in the North Central Hills. MDEQ has studied four aquifers beneath Lafayette County, each deeper than the last: the **Meridian-upper Wilcox**, the **lower Wilcox**, the **Ripley**, and the **Eutaw-McShan**." },
    { k: /\b(tupelo|lee county|saltillo|pontotoc|new albany)\b/, name: 'Tupelo', ids: ['aq-eutaw', 'aq-gordo', 'aq-coffee'],
      t: "Tupelo is in Cretaceous country: the **Eutaw-McShan** and **Gordo**, with the **Coffee Sand** to the north. Pumping once pulled Eutaw-McShan levels about 200 feet below early-1900s levels. After Tupelo began using Tombigbee River water, the level under the city rose nearly 100 feet in about five years." },
    { k: /\b(corinth|alcorn|tishomingo|iuka|booneville|belmont)\b/, name: 'Corinth and the far northeast', ids: ['aq-paleozoic', 'aq-coker', 'aq-gordo', 'aq-coffee'],
      t: "The far northeast is near the oldest rocks in the state. Large withdrawals at Corinth from the **Paleozoic aquifer** lowered its water level about 140 feet after 1954, according to a USGS study. Cretaceous sands (**Coker**, **Gordo**, **Coffee Sand**) overlie the Paleozoic rocks." },
    { k: /\b(west point|columbus|starkville|golden triangle|clay county|lowndes|oktibbeha|macon)\b/, name: 'the Golden Triangle', ids: ['aq-eutaw', 'aq-gordo', 'aq-coker'],
      t: "The Golden Triangle sits on the Black Prairie, whose chalk confines the **Eutaw-McShan** beneath it. USGS records showed a cone of depression near West Point declining about 5 feet a year after 1972. The **Gordo** and deeper Tuscaloosa sands lie below." },
    { k: /\b(jackson metro|jackson area|madison|ridgeland|rankin|brandon|pearl|flowood|clinton|byram|canton|hinds|jackson)\b/, name: 'the Jackson metro area', ids: ['aq-sparta', 'aq-cockfield', 'aq-oligocene', 'aq-muw'],
      t: "The City of Jackson treats **surface water** from the Ross Barnett Reservoir and the Pearl River. Around it, suburbs pump the **Sparta** and **Cockfield**, and USGS has documented cones of depression more than 40 feet deep in Rankin County. **Forest Hill** sands serve domestic wells, and the Yazoo Clay at the surface is famous for shrink-swell damage." },
    { k: /\b(meridian|lauderdale|philadelphia|dekalb)\b/, name: 'Meridian', ids: ['aq-muw', 'aq-mwilcox', 'aq-lwilcox'],
      t: "East-central Mississippi relies heavily on the **Meridian-upper Wilcox aquifer**; the Meridian Sand is named for the city. Other **Wilcox** sands lie deeper." },
    { k: /\b(hattiesburg|laurel|petal|pine belt|piney woods|forrest county|lamar county|jones county)\b/, name: 'Hattiesburg and the Pine Belt', ids: ['aq-miocene', 'aq-citronelle'],
      t: "**Miocene** sands supply the Pine Belt; the Hattiesburg Formation is named for the city. **Citronelle** sand and gravel cap many hills and feed shallow domestic wells." },
    { k: /\b(pascagoula|moss point|ocean springs|gautier|jackson county)\b/, name: 'Pascagoula', ids: ['aq-miocene'],
      t: "Near Pascagoula, the **Graham Ferry Formation** (Miocene system) holds the most widely used aquifer. Fresh water reaches only about 1,200 feet deep east of Pascagoula, less than farther west." },
    { k: /\b(gulfport|biloxi|bay st\.? louis|waveland|long beach|pass christian|harrison county|hancock county|gulf coast|the coast|coastal mississippi)\b/, name: 'the Gulf Coast', ids: ['aq-miocene', 'aq-citronelle'],
      t: "The coast runs on the **Miocene aquifer system**. Fresh water reaches more than 3,000 feet deep in western Hancock County. Heavy pumping has lowered some coastal aquifers about 2 feet a year since 1940, with declines of more than 100 feet across large areas." }
  ];
  var NAMED_AQ = /\b(sparta|memphis sand|wilcox|citronelle|cockfield|eutaw|mcshan|gordo|coker|ripley|coffee sand|miocene|catahoula|forest hill|winona|tallahatta|alluvial|mrva|paleozoic|graham ferry|hattiesburg formation)\b/;
  function placeSkill(raw, norm, state, api) {
    if (!/\b(aquifers?|ground ?water|well water|wells?|water comes? from|gets? (?:its|their|our) water|water source|source of (?:its |their |our )?water|drinking water from)\b/.test(norm)) return null;
    /* Only “which aquifers are under X?” questions; “why is the Delta aquifer
       dropping?” and questions about one named aquifer go to the answers */
    var cue = /\b(under|beneath|below|near|around|in|at|for|supplies|supply|serves?|serving)\b/.test(norm) ||
      /\b(which|what) (aquifers?|ground ?water|wells?)\b/.test(norm) ||
      /\b(water comes? from|gets? (?:its|their|our) water|source of|water source|drinking water from|uses? (?:ground ?water|wells?|an aquifer|aquifers?))\b/.test(norm);
    if (!cue) return null;
    if (/\b(declin\w*|drop\w*|falling|fall|why|lower\w*|history|recharg\w*|conserv\w*|sustain\w*|permit\w*|contaminat\w*|quality)\b/.test(norm)) return null;
    if (NAMED_AQ.test(norm) && !/\b(which|what) aquifers?\b/.test(norm)) return null;
    for (var i = 0; i < PLACES.length; i++) {
      var p = PLACES[i];
      if (!p.k.test(norm)) continue;
      /* “Jackson County” is on the coast, not the Jackson metro */
      if (p.name === 'the Jackson metro area' && /jackson county/.test(norm)) continue;
      state.last = null;
      var chips = p.ids.map(function (id) { return api.byId[id] && api.byId[id].q; }).filter(Boolean).slice(0, 3);
      return { text: '**Aquifers near ' + p.name + '**\n' + p.t + '\n\nWhich aquifer a particular well uses depends on its exact location and depth. MDEQ and your water system have the specifics.', chips: chips, links: [S.aqPage], id: 'place' };
    }
    return null;
  }

  /* ================= HYDRAULICS & HYDRAULIC MODELING ================= */
  X.push(
    { id: 'hw-equation', q: 'What is the Hazen-Williams equation?',
      k: ['hazen williams equation:10', 'hazen williams formula:10', 'head loss formula:9', 'head loss equation:9', 'headloss formula:9', 'friction loss formula:9', 'friction loss equation:9', 'calculate head loss:9', 'calculate friction loss:9', '10.44:8', '1.852:7', '4.87:6'],
      a: "The **Hazen-Williams equation** (1905) is the standard way to figure friction loss in U.S. water pipes:\n**hf = 10.44 × L × Q^1.852 ÷ (C^1.852 × d^4.87)**\nwith hf and L in feet, Q in gpm, and d the inside diameter in inches. (NFPA 13's version, **4.52 × Q^1.85 ÷ (C^1.85 × d^4.87)**, gives psi per foot of pipe.)\nWhat it tells you:\n• Head loss rises with flow to the **1.85 power**: double the flow and you get about **3.6 times** the loss.\n• It falls with diameter to the **4.87 power**: going from a 6-inch to an 8-inch main cuts the loss by about **75%**.\n• A lower **C** (rougher, older pipe) means more loss.\nAsk me something like **“head loss 500 gpm 8 inch 1,000 ft C 120”** and I'll work it.",
      more: "Limits: Hazen-Williams is empirical. It's meant for **water at ordinary temperatures in turbulent flow**, and C shifts with diameter and velocity, so it drifts for very small or very large pipes and for high velocities. **Darcy-Weisbach** is the physically based alternative and works for any fluid.\nSI form: hf = 10.67 × L × Q^1.852 ÷ (C^1.852 × D^4.87), in meters and m³/s.\nVelocity in ft/s = **0.4085 × gpm ÷ d²** (d in inches).",
      rel: ['darcy-weisbach', 'hazen-williams', 'minor-losses'], src: ['hmPage'] },
    { id: 'darcy-weisbach', q: 'What is the Darcy-Weisbach equation?',
      k: ['darcy weisbach:10', 'friction factor:9', 'moody diagram:10', 'moody chart:10', 'colebrook:10', 'swamee jain:10', 'relative roughness:9', 'absolute roughness:8'],
      a: "**Darcy-Weisbach** is the physically based head loss equation:\n**hf = f × (L ÷ D) × V² ÷ 2g**\nThe friction factor **f** depends on the **Reynolds number** and the pipe's **relative roughness** (ε ÷ D):\n• **Laminar flow** (Re below about 2,000): f = 64 ÷ Re\n• **Turbulent flow:** the **Colebrook-White** equation, solved by iteration or read off the **Moody diagram**, or the explicit **Swamee-Jain** approximation: f = 0.25 ÷ [log₁₀(ε ÷ 3.7D + 5.74 ÷ Re^0.9)]²\nTypical roughness ε: PVC and other plastics about **0.0015 mm** (0.000005 ft), commercial steel **0.045 mm**, cast iron **0.26 mm**, concrete **0.3–3 mm**.",
      more: "Why engineers like it: it accounts for **viscosity**, so it handles cold water, warm water, and fluids other than water, and it stays accurate for large pipes and high velocities where Hazen-Williams drifts. EPANET lets you pick Hazen-Williams, Darcy-Weisbach, or Chezy-Manning for a model. Many U.S. utilities still calibrate with Hazen-Williams C values because that's what their records use.",
      rel: ['reynolds-number', 'hw-equation', 'minor-losses'], src: ['hmPage'] },
    { id: 'reynolds-number', q: 'What is the Reynolds number?',
      k: ['reynolds:10', 'reynolds number:10', 'laminar:9', 'turbulent flow:9', 'turbulence:6', 'kinematic viscosity:9', 'viscosity:6', 'transitional flow:8'],
      a: "The **Reynolds number** compares inertial forces to viscous forces: **Re = V × D ÷ ν** (velocity × diameter ÷ kinematic viscosity).\n• **Laminar** below about **2,000**: smooth, orderly layers\n• **Transitional** from about 2,000 to 4,000\n• **Turbulent** above about **4,000**\nWater at 60°F has ν ≈ **1.2 × 10⁻⁵ ft²/s** (about 1.1 × 10⁻⁶ m²/s). An 8-inch main flowing 2 ft/s has Re ≈ **110,000**, so flow in water mains is almost always turbulent. Laminar flow shows up at very low velocities, in small tubes, and in groundwater moving through sand.",
      more: "Temperature matters more than people expect: water at 40°F is about **1.6 times as viscous** as water at 70°F. That raises friction a little, slows particle settling in basins, and changes how much a filter bed expands during backwash, which is one reason clarifiers and filters are harder to run in winter.",
      rel: ['darcy-weisbach', 'hw-equation', 'sedimentation-theory'], src: ['hmPage'] },
    { id: 'minor-losses', q: 'How do I calculate minor losses?',
      k: ['minor loss*:9', 'fitting loss*:9', 'k value*:8', 'k factor*:7', 'loss coefficient*:9', 'equivalent length:9', 'valve loss*:8', 'elbow loss*:8', 'entrance loss:8', 'exit loss:8'],
      a: "**Minor losses** are head losses at fittings, valves, entrances, and exits: **hm = K × V² ÷ 2g**. Typical K values (they vary with size and manufacturer):\n• Gate valve, fully open: **about 0.1–0.2**\n• Butterfly valve, fully open: **about 0.3–0.9**\n• Globe valve, fully open: **about 10**\n• Swing check valve: **about 1–2**\n• 90° elbow: **about 0.3** flanged, **about 1.5** threaded\n• Tee, flow through the branch: **about 1**\n• Square-edged pipe entrance: **0.5**; exit into a tank: **1.0**\nAt 5 ft/s the velocity head is 0.39 ft, so one globe valve costs about 4 feet of head.",
      more: "Minor losses are usually small in long transmission mains but can dominate inside **pump stations, treatment plants, and meter vaults**, where there are many fittings in short runs. They can also be expressed as an **equivalent length** of straight pipe: Le = K × D ÷ f. EPANET gives each pipe a minor loss coefficient, and each valve its own setting.",
      rel: ['hgl-egl', 'darcy-weisbach', 'dynamic-head'], src: ['hmPage'] },
    { id: 'hgl-egl', q: 'What are the hydraulic grade line and energy grade line?',
      k: ['hydraulic grade line:10', 'hydraulic gradeline:10', 'hgl:10', 'energy grade line:10', 'egl:9', 'energy line:8', 'grade line:8', 'hydraulic grade:9'],
      a: "The **hydraulic grade line (HGL)** is the height water would rise in a tube tapped into the pipe: **elevation + pressure head** (z + p/γ). The **energy grade line (EGL)** adds the velocity head: HGL + V²/2g.\n• Along a pipe, the HGL slopes **down in the direction of flow**; its slope is the friction loss per foot.\n• Pumps make the HGL **jump up**; valves and fittings make small drops.\n• **Pressure at any point = (HGL − pipe elevation) × 0.433 psi per foot.**\nIf the HGL dips **below the pipe**, the pressure there is negative (a partial vacuum), which can pull in contamination through leaks, let dissolved air come out, or collapse thin-walled pipe.",
      more: "Modelers think in HGL because it makes pressure zones obvious: every tank in a zone floats on the same HGL (its water surface), and a PRV creates a new, lower HGL downstream. On a profile drawing, plot the HGL at average day, peak hour, and fire flow; anywhere it comes within **46 feet (20 psi)** of the ground is a problem area.",
      rel: ['pressure-zones', 'static-head', 'dynamic-head'], src: ['hmPage'] },
    { id: 'network-equations', q: 'How does a computer solve a water network?',
      k: ['solve a water network:10', 'solve a network:9', 'network analysis:9', 'pipe network analysis:10', 'loop equation*:9', 'node equation*:9', 'continuity equation:8', 'how do models solve:9', 'how does epanet solve:10', 'how does the model work:8'],
      a: "Every network solution enforces two laws:\n• **Continuity** at every junction: flow in = flow out + demand\n• **Energy** around every loop: the head losses add up to zero (pumps count as head gains), and between any two fixed water levels (tanks, reservoirs) they add up to the difference in level\nFriction depends on flow to the 1.85 or 2 power, so the equations are **nonlinear** and there's no one-step answer. Solvers guess, linearize, and repeat until the corrections are tiny.\n• **Hardy Cross (1936)** balanced one loop at a time, by hand.\n• **Newton-Raphson** and **linear theory** methods came with computers in the 1960s and 1970s.\n• The **Global Gradient Algorithm** (Todini and Pilati, 1987) solves all the heads and flows at once. It's what **EPANET** uses, and it usually converges in fewer than 10 iterations.",
      more: "The **model lab** on the Hydraulic Modeling page runs the same gradient method in your browser: change a pipe, a pump, or a fire flow and it re-solves the whole town network instantly, then shows the flows, heads, and pressures it found.",
      rel: ['hardy-cross', 'gga', 'hydraulic-model'], src: ['hmPage'] },
    { id: 'hardy-cross', q: 'What is the Hardy Cross method?',
      k: ['hardy cross:10', 'loop balancing:9', 'balance loops:8', 'loop correction:9', 'balancing loops:9'],
      a: "**Hardy Cross**, a University of Illinois professor, published his method in **1936**. It made looped networks solvable by hand:\n1. Assume flows in every pipe that satisfy continuity at every node.\n2. For each loop, compute a flow correction: **ΔQ = −Σ(r·Q·|Q|^(n−1)) ÷ (n·Σ r·|Q|^(n−1))**, with n = 1.852 for Hazen-Williams.\n3. Apply ΔQ around the loop (a pipe shared by two loops gets both corrections), and repeat until ΔQ is negligible.\nIt was the standard for about 30 years and is still taught because it shows the physics clearly, but it converges slowly on big networks and struggles with pumps and PRVs. Modern software uses the gradient method.",
      rel: ['network-equations', 'gga', 'hw-equation'], src: ['hmPage'] },
    { id: 'gga', q: 'What is the global gradient algorithm?',
      k: ['global gradient:10', 'gradient algorithm:10', 'gradient method:9', 'todini:10', 'pilati:10', 'newton raphson:9', 'jacobian:8'],
      a: "The **Global Gradient Algorithm (GGA)**, published by Ezio **Todini** and Sandro **Pilati** in 1987, solves for every unknown head and pipe flow at once with a Newton-Raphson iteration:\n1. Start with a guess for every flow.\n2. Linearize each pipe's head loss around its current flow.\n3. Solve one **sparse, symmetric** system of equations for the junction heads.\n4. Update every flow from the new heads, and repeat.\nIt converges quickly even on networks with tens of thousands of pipes, and it handles pumps, valves, and tanks naturally. EPANET uses it, and so does the model lab on the Hydraulic Modeling page.",
      rel: ['network-equations', 'epanet', 'hydraulic-model'], src: ['hmPage', 'epanet'] },
    { id: 'epanet', q: 'What is EPANET?',
      k: ['epanet:10', 'epa net:9', 'modeling software:9', 'modelling software:9', 'watercad:10', 'watergems:10', 'infowater:10', 'kypipe:10', 'wntr:10', 'hydraulic software:9', 'model software:8', 'software:7'],
      a: "**EPANET** is EPA's free, public-domain program for modeling water distribution systems, first released in **1993** and developed by Lewis Rossman. It runs steady-state and extended period hydraulics plus water quality: **water age, chlorine decay, and source tracing**.\n• **EPANET 2.2** (2020), built with the open-source community, added **pressure-driven analysis** and more robust convergence.\n• The **EPANET-MSX** extension models multiple interacting chemical and biological species.\n• **WNTR** (Water Network Tool for Resilience), from EPA and Sandia National Laboratories, is a Python package built on EPANET for disaster and resilience studies.\nCommercial packages such as Bentley WaterGEMS and WaterCAD, Autodesk InfoWater Pro, and KYPipe add GIS links, automated calibration, fire flow and criticality tools, and support.",
      more: "EPANET's input file (.inp) is plain text, with sections like [JUNCTIONS], [PIPES], [PUMPS], [TANKS], [PATTERNS], and [CONTROLS]. Most commercial packages can import and export it, which makes it the common language of water modeling.",
      rel: ['hydraulic-model', 'gga', 'pressure-driven'], src: ['epanet', 'hmPage'] },
    { id: 'hydraulic-model', q: 'What is a hydraulic model of a water system?',
      k: ['hydraulic model*:10', 'hydraulic modeling:10', 'hydraulic modelling:10', 'distribution model*:10', 'network model*:9', 'water system model*:9', 'model a water system:10', 'model my system:9', 'computer model*:7'],
      a: "A **hydraulic model** is a computer version of a distribution system that predicts **flows, pressures, tank levels, and water quality** everywhere at once. Its pieces:\n• **Junctions (nodes):** elevation and demand\n• **Pipes (links):** length, diameter, roughness, minor losses, open or closed\n• **Tanks** (levels rise and fall) and **reservoirs** (fixed water levels, like a plant clearwell or a well field)\n• **Pumps** (head-flow curves, speed) and **valves** (PRVs, flow control, check valves)\n• **Demand patterns** and **controls** (pump on at one tank level, off at another)\nUtilities use models for **master planning, fire flow, pipe sizing, pressure zones, tank siting, water age and chlorine, main-break and outage planning, flushing, and energy**.",
      more: "Building one, step by step:\n1. Decide what it's for; that sets the level of detail.\n2. Pull pipes and valves from GIS, and get **elevations** from LiDAR or survey (1 foot of elevation error = 0.43 psi of pressure error).\n3. Allocate **demands** from billing records.\n4. Add pump curves (from field tests, not just the catalog), tank data, and SCADA controls.\n5. Run steady state, then an **extended period simulation**.\n6. **Calibrate** against hydrant tests and SCADA, document it, and keep it updated as the system changes.\nAWWA Manual **M32**, Computer Modeling of Water Distribution Systems, is the standard reference.",
      rel: ['eps', 'calibration', 'demand-allocation'], src: ['hmPage', 'epanet'] },
    { id: 'eps', q: 'What is an extended period simulation?',
      k: ['extended period simulation:10', 'extended period:9', 'eps:9', 'time simulation:8', 'steady state:8', 'steady state simulation:10', '24 hour simulation:9', 'hydraulic time step:9', 'tank simulat*:8'],
      a: "A **steady-state** run is a snapshot: one set of demands, one answer. An **extended period simulation (EPS)** is a series of snapshots over time, usually **24–72 hours** in 1-hour (or shorter) steps.\nBetween steps the model:\n• Multiplies each demand by that hour's **pattern factor** (low at night, peaks in the morning and evening)\n• Updates **tank levels** by mass balance: new level = old level + (inflow − outflow) × Δt ÷ tank area\n• Turns **pumps and valves** on or off by their controls (tank levels, pressures, or clock times)\nAn EPS shows whether tanks refill overnight, how pumps cycle, and what energy costs are. It's required for **water quality** runs, which often go **a week or more** so water age settles out.",
      more: "The Hydraulic Modeling page has a **48-hour tank simulator** that does exactly this for one tank, one pump, and a demand pattern, so you can watch the tank drain during the day and refill at night.",
      rel: ['demand-allocation', 'water-age-model', 'storage-sizing'], src: ['hmPage'] },
    { id: 'demand-allocation', q: 'How are demands put into a model?',
      k: ['demand allocation:10', 'allocate demand*:10', 'diurnal:9', 'diurnal curve:10', 'demand pattern*:10', 'peaking factor*:10', 'peak hour:9', 'maximum day:9', 'max day:9', 'average day demand:9', 'peak hour demand:10', 'max day demand:10', 'maximum day demand:10'],
      a: "Demand is usually the least certain input in a model.\n• **Allocation:** geocode each customer meter's billed use to its nearest junction or pipe, or spread a route's use by parcel or land use. Big users get their own nodes.\n• **Water loss:** production minus billed use gets spread across the system, often by pipe length or number of customers.\n• **Scenarios:** **average day (ADD)**; **maximum day (MDD)**, often **1.5–2.5 × ADD**; and **peak hour (PHD)**, often **1.5–2 × MDD** in larger systems and more in small ones.\n• **Diurnal pattern:** hourly multipliers, lowest around 2–4 a.m., with a morning peak and an evening peak (in summer, lawn irrigation often drives it).",
      more: "Peaking factors are system specific, so get them from your own records: maximum day from several years of daily production, and peak hour from tank levels plus pump flows. Small systems see much sharper peaks, because a few customers doing laundry or irrigating at once is a big share of total use.",
      rel: ['eps', 'calibration', 'storage-sizing'], src: ['hmPage'] },
    { id: 'calibration', q: 'How is a hydraulic model calibrated?',
      k: ['model calibration:10', 'calibrate the model:10', 'calibrate a model:10', 'calibrating a model:10', 'calibrate my model:10', 'validate a model:9', 'model accuracy:9', 'how accurate is a model:9', 'calibrat*:4'],
      a: "**Calibration** means adjusting a model until it reproduces what you measure in the field.\n**Collect data:** fire hydrant flow tests (they stress the pipes so friction shows up), pressure loggers, SCADA tank levels and pump flows, and pump tests.\n**Adjust, in this order:** fix data errors first (wrong elevations, **closed valves nobody knew about**, wrong pipe sizes), then demands, then pipe roughness (C factors) by groups of similar age and material.\n**Check:** steady-state results against each test, then an EPS against 24–72 hours of SCADA data.\nThere's no single legal standard. AWWA's calibration guidance ties the accuracy you need to what the model is for: a model used for water quality or daily operations needs a tighter fit than one used for long-range planning.",
      more: "Why hydrant tests matter: at normal flows, friction losses are small, so almost any C factor fits. Flowing a hydrant creates enough head loss to expose rough pipe, closed valves, and undersized mains. A classic sign of a closed valve: the model says a hydrant test should drop the pressure 5 psi, and the field drops 30. After calibration, keep checking the model against SCADA as the system changes.",
      rel: ['hydrant-flow-test', 'hydraulic-model', 'demand-allocation'], src: ['hmPage'] },
    { id: 'hydrant-flow-test', q: 'How do you run a hydrant flow test?',
      k: ['hydrant flow test*:10', 'fire flow test*:10', 'flow test*:9', 'hydrant test*:9', 'pitot:10', 'pitot gauge*:10', 'pitot tube*:10', 'residual hydrant:10', 'flow hydrant:9', 'nfpa 291:10', 'q20:9', 'available fire flow:9', 'static and residual:9'],
      a: "A **hydrant flow test** (NFPA 291; AWWA Manual M17) measures how much water the system can deliver:\n1. Put a pressure gauge on the **residual (test) hydrant** and read the **static** pressure.\n2. Open one or more **flow hydrants** nearby, downstream of the test hydrant if you know the flow direction.\n3. At the same time, read the **pitot** (velocity) pressure in each stream and the **residual** pressure at the test hydrant.\n4. Flow from each outlet: **Q = 29.84 × c × d² × √p** (gpm; d = outlet diameter in inches; p = pitot psi; c ≈ **0.90** for a smooth, rounded outlet).\n5. Flow available at 20 psi: **Q20 = Q × [(static − 20) ÷ (static − residual)]^0.54**\nNFPA 291 calls for enough flow to drop the residual pressure by at least **25%**, and pitot readings between **10 and 30 psi** for accuracy.",
      more: "NFPA 291 bonnet and cap colors, by flow at 20 psi residual: **light blue (Class AA)** 1,500 gpm or more, **green (Class A)** 1,000–1,499, **orange (Class B)** 500–999, and **red (Class C)** under 500.\nBefore a test, notify the fire department and customers who may see discolored water, and make sure the discharge won't flood a road or ice over. Try the **hydrant calculator** on the Hydraulic Modeling page, or ask me **“pitot 2.5 inch 20 psi.”**",
      rel: ['fire-flow', 'calibration', 'hydrants'], src: ['hmPage'] },
    { id: 'fire-flow', q: 'How much fire flow does a system need?',
      k: ['fire flow:10', 'needed fire flow:10', 'required fire flow:10', 'fire flow requirement*:10', 'iso rating:9', 'rating bureau:10', 'fire rating:9', 'fire protection class:10', 'fire insurance rating:10', 'fire protection rating:10'],
      a: "**Fire flow** is the flow needed to fight a fire, delivered while keeping at least **20 psi** everywhere in the system.\n• **International Fire Code (Appendix B):** one- and two-family dwellings up to 3,600 sq ft need **1,000 gpm for 1 hour**; bigger buildings need more, by size and construction type (up to 8,000 gpm), and approved sprinklers earn reductions.\n• **ISO's guide** for one- and two-family dwellings up to two stories scales with spacing: **500 gpm** if buildings are more than 100 ft apart, **750** at 31–100 ft, **1,000** at 11–30 ft, and **1,500** at 10 ft or less.\n• Required durations run from **2 hours** for smaller flows up to **4 hours** for the largest.\nIn Mississippi, fire protection ratings (Class 1 to 10) come from the **Mississippi State Rating Bureau** rather than ISO, and the water supply is a major part of the grade.",
      more: "Fire flow usually sets pipe sizes in small towns. By Hazen-Williams (C = 120), a 6-inch main loses about **10 psi per 1,000 feet at 500 gpm** and about **25 psi per 1,000 feet at 800 gpm**, while everyday demand might be 50 gpm. That's why mains with hydrants need to be at least 6 inches, and why tanks carry a **fire reserve** (1,000 gpm for 2 hours = 120,000 gallons). A calibrated model is the standard way to check available fire flow at every hydrant.",
      rel: ['hydrant-flow-test', 'storage-sizing', 'network-design'], src: ['hmPage'] },
    { id: 'skeletonization', q: 'What is model skeletonization?',
      k: ['skeleton*:10', 'all pipes model:10', 'simplify the model:9', 'model detail:8', 'equivalent pipe*:9', 'pipes in series:8', 'pipes in parallel:8'],
      a: "**Skeletonization** means leaving out or combining minor pipes to make a model smaller.\n• **Branch trimming:** drop dead-end branches and move their demand to the node where they connect.\n• **Series merging:** replace pipes in a row with one **equivalent pipe** that has the same total head loss.\n• **Parallel merging:** replace side-by-side pipes with one equivalent pipe.\nToday GIS makes **all-pipes models** easy, and they're the norm for **water quality, flushing, hydrant-by-hydrant fire flow, and criticality** work. A heavily skeletonized model can still be fine for transmission mains and master planning, but it misses local problems and underestimates water age in dead ends.",
      more: "For Hazen-Williams: pipes in series carry the same flow, so their head losses add; pipes in parallel have the same head loss, so their flows add. The equivalent diameter comes from setting the head losses equal and solving the equation for D.",
      rel: ['hydraulic-model', 'water-age-model', 'hw-equation'], src: ['hmPage'] },
    { id: 'pressure-driven', q: 'What is pressure-driven analysis?',
      k: ['pressure driven:10', 'pressure dependent demand*:10', 'demand driven:10', 'pda:9', 'negative pressure*:7', 'model shows negative pressure:10', 'negative pressure in the model:10'],
      a: "Classic models are **demand-driven**: every node gets its full demand no matter what. That's fine in normal operation, but it can produce impossible results, like **negative pressures**, when a main is out of service or a big fire flow is drawn.\n**Pressure-driven analysis (PDA)** makes delivered demand depend on pressure: full demand above a required pressure, nothing below a minimum, and a curve in between (commonly delivered flow = required flow × [(P − Pmin) ÷ (Preq − Pmin)]^0.5).\nEPANET 2.2 and most commercial tools support it. Use PDA for **main breaks, outages, big fire flows, and emergency planning** to see how much water customers would really get.",
      more: "When a demand-driven model shows negative pressure, it's telling you that demand can't be delivered. In the real system, pressure would drop until the flow fell, and a zone of negative pressure can draw in contamination. That's why the model lab on the Hydraulic Modeling page flags it.",
      rel: ['hydraulic-model', 'fire-flow', 'epanet'], src: ['hmPage'] },
    { id: 'water-age-model', q: 'How do you model water age?',
      k: ['water age:10', 'age of water:9', 'model water age:10', 'water quality model*:10', 'residence time:9', 'source trac*:9', 'trace source:8', 'how old is the water:9', 'stale water:7'],
      a: "**Water age** is the time since the water left its source (the plant or well). EPANET computes it by carrying a clock through every pipe and tank in an extended period simulation, usually run **a week or longer** so the numbers settle.\nWhy it matters: as water ages, **chlorine residual decays**, **disinfection byproducts keep forming**, **nitrification** can start in chloraminated systems, and taste, odor, and temperature problems grow. It's also a risk factor for *Legionella* in building plumbing.\nCommon causes of old water: **oversized tanks that don't cycle**, dead ends, low-demand areas, and mains sized for fire flow where everyday use is small. **Source tracing** works the same way: it shows what percent of the water at each node came from each well or plant.",
      more: "Fixes a model can test: cycling tanks deeper and more often, separate tank inlets and outlets or mixers, closing or looping dead ends, targeted or automatic flushing, and new pump schedules. Many utilities aim to turn their tanks over every few days.",
      rel: ['chlorine-decay', 'tank-mixing', 'eps'], src: ['hmPage', 'epanet'] },
    { id: 'chlorine-decay', q: 'How does chlorine decay in pipes and tanks?',
      k: ['chlorine decay:10', 'residual decay:10', 'decay coefficient*:10', 'bulk decay:10', 'wall decay:10', 'first order decay:9', 'losing residual:8', 'residual loss:8', 'chlorine loss:8', 'residual drops:8'],
      a: "Chlorine gets used up two ways, and water quality models track both:\n• **Bulk decay** in the water itself, as chlorine reacts with organic matter, iron, and other reducing agents. It's usually modeled as **first order**: C = C₀ × e^(−kb·t). The rate kb comes from **bottle tests** of your water and rises with temperature and TOC.\n• **Wall decay** at the pipe surface, from biofilm, tubercles, and corrosion. It's far higher in **old unlined cast iron** than in PVC or cement-lined pipe.\nRules of thumb: chlorine disappears faster in **summer** and in **old iron pipe**, and **chloramine** decays much more slowly than free chlorine, which is one reason large systems switch to it. Calibrate decay against field residuals at several water ages.",
      more: "EPANET can also model **TTHM** growth toward a maximum, and EPANET-MSX handles chloramine chemistry, nitrification, and other multi-species reactions. Laying decay over the water-age map shows where booster chlorination or flushing will do the most good.",
      rel: ['water-age-model', 'booster-chlorination', 'tank-mixing'], src: ['hmPage', 'epanet'] },
    { id: 'booster-chlorination', q: 'When should a system use booster chlorination?',
      k: ['booster chlorinat*:10', 'rechlorinat*:10', 'chlorine booster*:10', 'boost chlorine:9', 'boost the residual:9', 'tank chlorinat*:8'],
      a: "**Booster chlorination** adds chlorine partway through the distribution system, usually at a **tank, pump station, or connection with another system**, so faraway customers keep a residual without overdosing the people near the plant.\nIt helps with long transmission lines, high water age at the edges of the system, and big tanks that lose residual.\nCautions: extra chlorine in water that's already old can raise **DBPs**. In **chloraminated** systems, chlorine added to water with free ammonia forms more chloramine, but overshooting the chlorine-to-ammonia ratio pushes toward breakpoint and taste problems. Model it first, then monitor residuals and DBPs downstream.",
      rel: ['chlorine-decay', 'water-age-model', 'nitrification'], src: ['hmPage'] },
    { id: 'tank-mixing', q: 'Why do water tanks stratify?',
      k: ['stratif*:10', 'tank mixing:10', 'mixing in tank*:10', 'tank mixer*:10', 'tank short circuit*:10', 'short circuiting in a tank:10', 'thermal stratification:10', 'tank turnover:10', 'turnover:7', 'fifo:8', 'lifo:8'],
      a: "Stored water can **stratify** when warmer or colder water comes in and floats or sinks as a separate layer, especially in **tall standpipes in summer**. It can also **short-circuit**: in a tank with one shared inlet and outlet, the newest water leaves first while old water sits at the top for weeks.\nThe results: lost residual, nitrification, DBP growth, ice in winter, and slugs of stale water when the level finally drops.\nFixes: **separate inlet and outlet**, inlet nozzles that aim a strong jet to mix the tank, **active mixers**, deeper **daily level swings**, and chlorine boosting. EPANET offers four tank models: **completely mixed, two-compartment, first-in-first-out (plug flow), and last-in-first-out**.",
      more: "A tank mixes well when the incoming jet has enough momentum to reach the whole volume during each fill. Short fill cycles with small level changes are the usual culprit. Tall standpipes are the hardest to mix; wide, shallow ground tanks mix more easily.",
      rel: ['water-age-model', 'storage-sizing', 'storage'], src: ['hmPage'] },
    { id: 'storage-sizing', q: 'How do engineers size water storage tanks?',
      k: ['storage sizing:10', 'size a tank:10', 'size the tank:10', 'tank size:9', 'how big a tank:10', 'how much storage:10', 'equalization storage:10', 'fire storage:10', 'emergency storage:10', 'dead storage:10', 'operational storage:10', 'big:4', 'tank:3'],
      a: "Distribution storage is sized as the sum of several parts:\n• **Equalization (operational):** covers the gap between peak demand and what the wells or plant can supply; often about **10–25% of a maximum day's demand** when supply matches maximum day\n• **Fire reserve:** the largest required fire flow × its duration (1,500 gpm for 2 hours = 180,000 gallons)\n• **Emergency:** power outages, main breaks, source failures\n• **Dead storage:** water below the level that still gives 20 psi to the highest customer; it doesn't count\nThe **Ten States Standards** call for storage at least equal to **average daily consumption** in systems without fire protection. For elevated tanks, only the water above the level that keeps adequate pressure counts, and the Mississippi manual recommends an operating swing of no more than about **30 feet**.",
      more: "Bigger isn't automatically better: oversized storage raises **water age**. Engineers balance fire and emergency needs against turnover, and use the model's extended period simulation to confirm the tank refills every night on a maximum day.",
      rel: ['storage', 'tank-mixing', 'fire-flow'], src: ['hmPage'] },
    { id: 'prv', q: 'How does a pressure reducing valve work?',
      k: ['pressure reducing valve*:10', 'prv:10', 'pressure regulating valve*:10', 'pressure sustaining valve*:10', 'psv:9', 'flow control valve*:9', 'control valve*:8', 'pilot valve*:8', 'pilot operated:9', 'pressure relief valve*:9'],
      a: "Most distribution control valves are **pilot-operated globe valves**, where a small pilot system moves a diaphragm to throttle the main valve:\n• **Pressure reducing valve (PRV):** holds a set **downstream** pressure, feeding a lower zone from a higher one. If downstream pressure rises above the setting, it closes.\n• **Pressure sustaining valve:** holds a minimum **upstream** pressure so a high area isn't drained.\n• **Flow control valve:** limits flow to a set rate.\n• **Altitude valve:** closes when a tank is full so it can't overflow.\n• **Pressure relief valve:** opens to dump water when pressure spikes.\nPRV stations often have a **small and a large PRV in parallel** (the small one handles low night flows smoothly; the large one opens for peaks and fires), plus a relief valve. In a model, a PRV creates a new, lower **hydraulic grade** downstream.",
      more: "Common PRV problems: debris on the seat or in the pilot system, a torn diaphragm, and hunting (oscillating) at low flow. Service and exercise them on a schedule, and check the downstream setting against the model whenever zones change.",
      rel: ['pressure-zones', 'valves', 'hgl-egl'], src: ['hmPage'] },
    { id: 'pressure-zones', q: 'How are pressure zones designed?',
      k: ['pressure zone*:10', 'pressure plane*:10', 'zone boundar*:9', 'hilly:7', 'elevation difference*:8', 'high elevation:7', 'booster zone:9', 'closed zone:8'],
      a: "A **pressure zone** is an area served from one hydraulic grade line, set by a tank's water level, a pump, or a PRV. Pressure changes **0.433 psi per foot of elevation**, so each zone can only cover a limited band of ground elevation:\n• Keeping everyone between about **40 and 80 psi** limits a zone to about **90 feet** of elevation; allowing 35 to 100 psi stretches it to about **150 feet**.\n• Higher ground gets a **booster pump** and its own tank (or a closed, pumped zone); lower ground gets a **PRV**.\n• Plumbing codes require a pressure reducing valve on the service line when static pressure is above **80 psi**.\nThe Mississippi manual calls for at least **20 psi at all times** and **35–60 psi** normal working pressure.",
      more: "Zone boundaries are made with closed valves. When one is opened by mistake, the zones mix: the high zone drains into the low one, low-zone pressures jump, and the high tank drops. A model makes a boundary-valve map easy to check.",
      rel: ['prv', 'hgl-egl', 'distribution-pressure'], src: ['hmPage'] },
    { id: 'npsh-calc', q: 'How do I calculate NPSH available?',
      k: ['npsh available:10', 'npsha:10', 'calculate npsh:10', 'npsh margin:10', 'npsh required:9', 'npshr:10', 'vapor pressure:8', 'suction lift:8'],
      a: "**NPSH available** is the absolute pressure head at the pump suction above the water's vapor pressure:\n**NPSHa = Ha + Hs − Hf − Hvp** (all in feet)\n• **Ha** = atmospheric pressure head: **33.9 ft** at sea level, less at altitude\n• **Hs** = water level above the pump centerline (negative for a suction lift)\n• **Hf** = friction and entrance losses in the suction piping\n• **Hvp** = vapor pressure head: about **0.6 ft at 60°F** and **1.2 ft at 80°F**\nKeep NPSHa comfortably above the pump's **NPSHr** from its curve. NPSHr is measured where head has already dropped 3%, so the pump is already cavitating there. Hydraulic Institute guidance recommends margins of about **1.1 to 2.5 times NPSHr**, depending on the service.",
      more: "Example: pump centerline 10 ft above the water surface, 3 ft of suction losses, 70°F water at sea level: 33.9 − 10 − 3 − 0.8 ≈ **20 ft available**. If the pump needs 12 ft, the margin ratio is about 1.7. High altitude, hot water, clogged suction screens, and running far to the right on the curve all eat into the margin.",
      rel: ['cavitation', 'pump-system-curve', 'specific-speed'], src: ['hmPage'] },
    { id: 'pump-system-curve', q: 'How do I build a system curve and find the operating point?',
      k: ['system head curve:10', 'system curve equation:10', 'build a system curve:10', 'system curve:7', 'operating point:7', 'duty point:10', 'pump selection:10', 'select a pump:10', 'pump sizing:9', 'size a pump:10'],
      a: "A **system curve** shows how much head your piping needs at each flow:\n**H = static head + K × Q^1.852** (or Q² with Darcy-Weisbach)\n• **Static head** is the lift from the source water level to the discharge water level, plus any pressure required at the discharge.\n• The **K × Q^1.85** part is friction and minor losses; find K from one calculated point.\nThe pump runs where its **head-flow curve crosses the system curve**. Draw system curves for the extremes (low wet well with a full tank; high wet well with a low tank), and pick a pump whose operating points stay near its **best efficiency point**, generally within about **70–120% of BEP flow**.",
      more: "Two identical pumps in parallel don't double the flow: the combined pump curve doubles the flow at each head, but the system curve's rising friction puts the new operating point at less than double. The pump lab on the Hydraulic Modeling page lets you add a second pump and change speed to see it.",
      rel: ['pump-curve', 'affinity-laws', 'pump-energy'], src: ['hmPage'] },
    { id: 'pump-energy', q: 'How much energy does it take to pump water?',
      k: ['pump energy:10', 'pumping energy:10', 'energy cost*:9', 'power cost*:9', 'electric bill:8', 'kwh:9', 'kilowatt*:8', 'wire to water:10', 'energy efficien*:8', 'energy audit:9', 'demand charge*:9'],
      a: "Power to lift water: **kW = gpm × TDH (ft) × 0.746 ÷ (3,960 × efficiency)**\nA handy benchmark: lifting **1 million gallons 100 feet** takes **314 kWh** at 100% efficiency, or about **450 kWh** at a typical **70% wire-to-water** efficiency (motor × pump).\nWays utilities cut pumping costs:\n• Run pumps near their **best efficiency point**, and re-test old pumps; worn impellers and wear rings drag efficiency down.\n• Use **VFDs** where flow varies; power falls roughly with the cube of speed.\n• Pump at night if power is cheaper, and let storage carry the day. Avoid starting several big pumps at once, which sets **demand charges**.\n• Cut friction: clean or replace rough mains, and find partly closed valves.\nEPA estimates drinking water and wastewater systems use about **2% of U.S. energy**.",
      more: "Ask me **“pump energy 1,000 gpm 200 ft 75%”** and I'll work out kW, kWh per day, and kWh per million gallons.",
      rel: ['affinity-laws', 'pump-system-curve', 'horsepower'], src: ['hmPage'] },
    { id: 'specific-speed', q: 'What is pump specific speed?',
      k: ['specific speed:10', 'suction specific speed:10', 'nss:9', 'impeller type*:9', 'radial flow:9', 'mixed flow:9', 'axial flow:9', 'propeller pump*:8'],
      a: "**Specific speed** classifies impeller shape by the conditions at best efficiency: **Ns = N × √Q ÷ H^0.75** (rpm, gpm, ft).\n• **Radial-flow** impellers (the typical centrifugal pump): roughly **500–4,000**; high head, lower flow\n• **Mixed-flow:** roughly **4,000–10,000**\n• **Axial-flow** (propeller): above about **10,000**; very high flow at low head, as in stormwater and flood pumping stations\n**Suction specific speed** (Nss) uses NPSHr in place of head. Pumps with very high Nss tend to run rough away from BEP, so many specifications cap it at about **8,500–11,000** (U.S. units).",
      rel: ['pump-system-curve', 'npsh-calc', 'pump-types'], src: ['hmPage'] },
    { id: 'manning', q: "What is Manning's equation?",
      k: ['manning:10', 'manning equation:10', 'manning n:10', 'open channel flow:9', 'gravity flow:8', 'gravity sewer*:8', 'partially full pipe*:9', 'partly full pipe*:9', 'sewer slope*:9', 'minimum slope:8', 'self cleansing:9'],
      a: "**Manning's equation** is the standard for **open channels and gravity pipes** (sewers, storm drains, ditches, partly full pipes):\n**V = (1.486 ÷ n) × R^(2/3) × S^(1/2)** in U.S. units (1.0 in place of 1.486 in SI)\n• V = velocity (ft/s); R = hydraulic radius, the flow area ÷ wetted perimeter (ft); S = slope (ft/ft)\n• A pipe flowing full: **Q = (0.463 ÷ n) × D^(8/3) × S^(1/2)** (cfs, D in ft)\nTypical **n**: **0.013** for sewer design (concrete, clay, and often plastic too, to be conservative), about 0.011 for smooth plastic, **0.024** for corrugated metal, **0.030–0.050 or more** for natural channels.\nSewers are designed for at least **2 ft/s** flowing full so solids don't settle; the Ten States Standards list a minimum slope of **0.40%** for an 8-inch sewer.",
      more: "Partly full pipes are tricky: a circular pipe carries its **maximum flow at about 94% depth** and its maximum velocity at about 81% depth, because the last bit of depth adds more wetted perimeter than area. Ask me **“manning 8 inch n 0.013 slope 0.4%”** to work one.",
      rel: ['open-channel', 'lift-station', 'hw-equation'], src: ['hmPage'] },
    { id: 'open-channel', q: 'How is flow measured in open channels?',
      k: ['parshall flume:10', 'flume*:9', 'v-notch:10', 'v notch:10', 'hydraulic jump:10', 'froude:10', 'critical depth:10', 'subcritical:9', 'supercritical:9', 'weir equation:10', 'weir formula:10', 'measure flow in a channel:10'],
      a: "Open-channel flow is measured by forcing it through a structure with a known head-flow relationship:\n• **Weirs:** a 90° **V-notch** weir passes Q ≈ **2.49 × H^2.48** (cfs, H in ft); a rectangular weir with end contractions passes Q = **3.33 × (L − 0.2H) × H^1.5** (Francis formula). Good for low flows, but they need a free fall and they trap solids.\n• **Parshall flume** (Ralph Parshall, 1920s): a throat that forces **critical depth**, so one upstream depth reading gives the flow. It's self-cleaning, so it's common at wastewater plants.\n• **Ultrasonic level sensors** read the head; **area-velocity meters** work in pipes and channels with no structure at all.\nThe **Froude number** (V ÷ √(g × depth)) tells the regime: below 1 is **subcritical** (slow and deep), above 1 is **supercritical** (fast and shallow). Going from supercritical to subcritical makes a **hydraulic jump**, which dissipates energy and can be used for rapid mixing.",
      rel: ['manning', 'meters', 'activated-sludge'], src: ['hmPage'] },
    { id: 'thrust-restraint', q: 'How do you calculate thrust on a pipe bend?',
      k: ['thrust:10', 'thrust block*:10', 'thrust restraint:10', 'restrained joint*:10', 'joint restraint:10', 'megalug*:9', 'pipe bend force:10', 'bearing area:9', 'deadman:8'],
      a: "Pressure pushes on every change in direction or size, and unrestrained joints can pull apart.\n• **Bend:** T = **2 × P × A × sin(θ ÷ 2)**, where θ is the bend angle\n• **Dead end, tee branch, or closed valve:** T = **P × A**\n• **Reducer:** T = P × (A₁ − A₂)\nDesign for the **test pressure** (often 150 psi or more), not normal pressure, and designers typically use the pipe's **outside** diameter. Example: 12-inch ductile iron (13.2-inch OD) at 150 psi, 90° bend: A = 136.8 in², so T = 2 × 150 × 136.8 × 0.707 ≈ **29,000 lb**.\nResist it with a **concrete thrust block** poured against undisturbed soil (bearing area = T ÷ the soil's bearing capacity, from about 1,000 lb/ft² in soft clay to several thousand in sand and gravel), or with **restrained joints** over a calculated length on each side of the fitting.",
      more: "Ask me **“thrust 12 inch 150 psi 90 degree bend.”** Restrained length depends on the soil, depth of cover, pipe size, and pressure; DIPRA and pipe manufacturers publish the method. Never pour a thrust block against disturbed or backfilled soil, and keep concrete off the joints so they can be taken apart later.",
      rel: ['main-breaks', 'pipe-materials', 'surge-analysis'], src: ['hmPage'] },
    { id: 'surge-analysis', q: 'How do engineers calculate water hammer?',
      k: ['joukowsky:10', 'joukowski:10', 'joukowsky equation:10', 'joukowski equation:10', 'wave speed:10', 'celerity:10', '2l/a:10', 'critical period:10', 'michaud:10', 'surge analysis:10', 'transient analysis:10', 'transient model*:10', 'column separation:10', 'calculate water hammer:10', 'water hammer calculation*:10', 'water hammer formula:10', 'water hammer equation:10'],
      a: "The **Joukowsky equation** gives the pressure rise when flow stops faster than a pressure wave can travel down the pipe and back:\n**ΔH = a × ΔV ÷ g** (feet), or about **ΔP = a × ΔV ÷ 74.5** in psi (a and ΔV in ft/s)\n• Wave speed **a**: about **3,500–4,200 ft/s** in ductile iron and steel, **1,200–1,500 ft/s** in PVC, and **700–1,100 ft/s** in HDPE\n• Rule of thumb: every **1 ft/s** stopped suddenly adds about **50 psi in metal pipe** and about **20 psi in PVC**\n• The **critical period** is **2L ÷ a**. Close a valve more slowly than that and the surge drops roughly in proportion (Michaud: ΔH ≈ 2LV ÷ (g × closing time)).\nThe worst case is often a **power failure** at a pump station: the pumps stop together, pressure first **drops**, sometimes to vapor pressure (**column separation**), and then slams back.",
      more: "A full surge study uses a transient model (the method of characteristics) of the pipeline and pumps. Protection options: slow-closing and surge-anticipating valves, **hydropneumatic surge tanks**, air/vacuum valves at high points, flywheels, VFD ramp-down (which doesn't help in a power failure), and pipe with a higher pressure class. Try the **water hammer calculator** on the Hydraulic Modeling page, or ask me **“water hammer 4 ft/s ductile iron 2,000 ft.”**",
      rel: ['water-hammer', 'surge-protection', 'thrust-restraint'], src: ['hmPage'] },
    { id: 'surge-protection', q: 'How do you protect a pipeline from surges?',
      k: ['surge protection:10', 'surge tank*:10', 'surge vessel*:10', 'surge anticipat*:10', 'surge relief:10', 'air vacuum valve*:10', 'air release valve*:10', 'combination air valve*:10', 'air valve*:9', 'check valve slam*:10', 'slamming check valve*:10'],
      a: "Protection depends on what causes the transient:\n• **Pump power failure:** hydropneumatic **surge vessels** (air-cushioned tanks that push water into the line as pressure drops), flywheels, and surge anticipator valves that open before the return wave arrives\n• **Valve closure:** slow, controlled closing, with the last 10–20% of travel slowest, because that's where most of the flow is actually cut off\n• **Check valve slam:** fast-closing (spring-assisted or nozzle) check valves that shut before the flow reverses, or controlled-closure checks\n• **Air:** **air release valves** (small orifice; bleed air while under pressure), **air/vacuum valves** (large orifice; let air out while filling and in while draining), and **combination valves**, placed at high points and grade changes. Trapped air pockets can make surges much worse.\nDon't add or remove surge protection without checking the transient analysis; a fix for one scenario can make another worse.",
      rel: ['surge-analysis', 'water-hammer', 'valves'], src: ['hmPage'] },
    { id: 'network-design', q: 'What are the design criteria for water mains?',
      k: ['design criteria:10', 'design standard*:9', 'pipe velocity:10', 'velocity in pipe*:9', 'maximum velocity:10', 'unit headloss:10', 'headloss gradient:10', 'ten states standards:10', '10 states standards:10', 'recommended standards for water works:10', 'glumrb:10'],
      a: "Common design criteria for distribution mains (always check state rules and your utility's standards):\n• **Pressure:** at least **20 psi** everywhere during fire flow; about **35 psi** or more at peak hour; usually **80–100 psi** maximum\n• **Velocity:** about **2–5 ft/s** at peak hour, with higher velocities tolerated briefly during fire flow\n• **Head loss:** often **1–3 ft per 1,000 ft** at peak hour for distribution mains, less for big transmission lines\n• **Size:** **6-inch** minimum for mains with hydrants and **4-inch** minimum otherwise (Mississippi manual); loop wherever possible\n• **Valves:** enough that a break takes only a few blocks out of service\nThe **Ten States Standards** (Recommended Standards for Water Works, from the Great Lakes–Upper Mississippi River Board) are the best-known model design standards; they call for at least 20 psi under all flow conditions and normal working pressure of about 60–80 psi, and not less than 35 psi.",
      more: "Also think about water age: mains upsized for fire flow in areas with little demand can hold very old water. Designers balance fire flow against water quality, sometimes by looping or by adding flushing points.",
      rel: ['fire-flow', 'pressure-zones', 'main-size'], src: ['hmPage'] },
    { id: 'unidirectional-flushing', q: 'What is unidirectional flushing?',
      k: ['unidirectional flushing:10', 'unidirectional:10', 'udf:10', 'flushing velocity:10', 'flushing sequence:10', 'flushing program:9', 'scour velocity:10', 'conventional flushing:9', 'ice pigging:10', 'pigging:9', 'air scour*:8'],
      a: "**Unidirectional flushing (UDF)** cleans mains systematically: crews close valves so water comes from an already-clean main and moves in **one direction**, at high velocity, through the pipe being flushed and out a hydrant.\n• Target velocity: at least **5 ft/s** in the main (about 440 gpm in a 6-inch main and 780 gpm in an 8-inch) to scour sediment and loose biofilm\n• Work outward from the source, main by main, in a **sequence** planned with the model\n• It uses less water than conventional flushing (just opening hydrants) and actually cleans the pipe\nOther tools: **air scouring**, **ice pigging** (pumping an ice slurry through the main), and **swabbing** with foam pigs.",
      more: "Keep records of each run (valves operated, hydrant flow, how long until the water ran clear, turbidity and residual), and watch pressures on high ground while you flush. Dechlorinate discharges that could reach a stream.",
      rel: ['flushing', 'water-age-model', 'network-design'], src: ['hmPage'] },
    { id: 'criticality', q: 'What is a criticality analysis?',
      k: ['criticality:10', 'critical main*:10', 'critical pipe*:10', 'critical asset*:9', 'segment analysis:10', 'valve isolation:9', 'isolation segment*:10', 'redundancy:9', 'single point of failure:10', 'resilience:8'],
      a: "A **criticality analysis** asks: if this pipe, valve, pump, or tank fails, what happens?\n• The model finds each **segment**, the smallest area you can isolate by closing valves, and simulates taking it out of service.\n• It reports customers out of water, hospitals and schools affected, pressures below 20 psi, and fire flow lost.\n• Combining that **consequence** with the **likelihood of failure** (age, material, break history, soil) ranks where to spend on replacement, redundancy, valves, and backup power.\nIt often shows that one missing or broken valve turns a small repair into a town-wide outage. America's Water Infrastructure Act of 2018 requires community systems serving more than 3,300 people to complete **risk and resilience assessments**, and criticality modeling feeds them well.",
      rel: ['hydraulic-model', 'pressure-driven', 'emergency-plan'], src: ['hmPage'] },
    { id: 'digital-twin', q: 'What is a digital twin for a water system?',
      k: ['digital twin*:10', 'real time model*:10', 'online model*:9', 'scada model*:9', 'operational model*:9', 'model and scada:9'],
      a: "A **digital twin** is a hydraulic model connected to live **SCADA** and meter data so it runs alongside the real system. Utilities use them to:\n• Forecast demand and tank levels for the next day or two, and plan pumping for the lowest energy cost\n• Spot anomalies: a pressure or flow that doesn't match the model can mean a break or a closed valve\n• Rehearse emergencies: what happens if this pump station trips or this main breaks?\nThey still depend on a well-calibrated model and good data, and connecting operational systems to software makes **cybersecurity** part of the design.",
      rel: ['hydraulic-model', 'calibration', 'cybersecurity'], src: ['hmPage'] },
    { id: 'leakage-pressure', q: 'How does pressure affect leakage?',
      k: ['pressure management:10', 'leakage exponent:10', 'favad:10', 'emitter coefficient:10', 'emitter*:9', 'leak model*:9', 'leakage model*:9', 'pressure and leakage:10', 'pressure affect leak*:10', 'lower pressure:7'],
      a: "Leak flow rises with pressure: **Q = C × P^N1**.\n• A fixed-size hole in rigid pipe follows the orifice law: **N1 = 0.5**.\n• Real systems usually show **N1 between about 0.5 and 1.5**, sometimes higher, because splits in plastic pipe and leaky joints open wider as pressure rises (the **FAVAD** idea: fixed and variable area discharges).\nWith N1 = 1, cutting pressure 10% cuts leakage about 10%; with N1 = 1.5, about 15%. **Pressure management** (PRVs, zone changes, lower pressure at night) is one of the cheapest ways to reduce real losses, and it reduces main breaks too.\nIn EPANET, a leak or a sprinkler is modeled as an **emitter** with a coefficient and an exponent (0.5 by default).",
      rel: ['water-loss', 'prv', 'water-audit'], src: ['hmPage'] }
  );

  /* ================= HYDROLOGY, RIVERS & FLOODS ================= */
  X.push(
    { id: 'earth-water', q: "How much of Earth's water is fresh?",
      k: ['earth s water:10', 'world s water:9', 'how much water on earth:10', 'water on earth:9', 'fresh water percent:10', 'freshwater percent:10', 'percent of water:8', 'how much fresh water:10', 'water is fresh:9', 'ocean water percent:9'],
      a: "According to USGS, about **96.5%** of Earth's water is in the oceans. Only about **2.5%** is fresh, and most of that isn't easy to reach:\n• about **69%** of fresh water is locked in ice caps and glaciers\n• about **30%** is groundwater\n• only about **1%** is in lakes, rivers, soil, the air, and living things\nThat's why groundwater matters so much: it's the largest store of liquid fresh water, and in Mississippi it supplies most drinking water.",
      more: "Water keeps cycling: the sun evaporates about **500,000 cubic kilometers** a year, mostly from the oceans, and about the same amount falls back as precipitation. A water molecule spends about **9 days** in the atmosphere on average, but can spend thousands of years in a deep aquifer or an ice sheet.",
      rel: ['water-budget', 'global-access', 'groundwater-age'] },
    { id: 'global-access', q: 'How many people lack safe drinking water?',
      k: ['lack safe drinking water:10', 'lack safe water:10', 'lack clean water:10', 'without clean water:10', 'without safe water:10', 'global water access:10', 'world water crisis:10', 'jmp:9', 'safely managed:10', 'sdg 6:10', 'people without water:9'],
      a: "The **WHO/UNICEF Joint Monitoring Programme** report released in August 2025 (data through 2024) found:\n• **2.1 billion people** still lack **safely managed** drinking water (water on premises, available when needed, and free of contamination), about **1 in 4** people on Earth\n• **106 million** still drink untreated **surface water**\n• **3.4 billion** lack safely managed **sanitation**, and **354 million** still practice open defecation\n• Between 2015 and 2024, **961 million** people gained safely managed drinking water, raising coverage from **68% to 74%**\nThe UN's Sustainable Development Goal 6 aims for universal access by 2030, and progress is well behind that pace.",
      rel: ['earth-water', 'pathogens', 'water-history'] },
    { id: 'water-budget', q: 'What is a water budget?',
      k: ['water budget:10', 'water balance:10', 'hydrologic budget:10', 'hydrologic cycle:9', 'hydrological cycle:9', 'where does rain go:10', 'rainfall in mississippi:10', 'mississippi rainfall:10', 'how much rain:8', 'annual rainfall:9', 'annual precipitation:9'],
      a: "A **water budget** accounts for every drop in a watershed or aquifer over a period:\n**Precipitation = evapotranspiration + runoff + recharge + change in storage**\nMississippi is wet: the statewide average is about **56 inches** of precipitation a year (1991–2020 normals), from about **50 inches** in the north to about **65 inches** on the coast. A large share returns to the air as **evapotranspiration**, especially in the growing season; the rest runs off to streams or soaks in to recharge aquifers.\nEven in a wet state, groundwater can be overdrawn: in the Delta, irrigation pumping takes more from the alluvial aquifer each year than rainfall and rivers put back.",
      rel: ['evapotranspiration', 'delta-decline', 'infiltration'] },
    { id: 'evapotranspiration', q: 'What is evapotranspiration?',
      k: ['evapotranspiration:10', 'transpiration:9', 'evaporation rate:9', 'potential evapotranspiration:10', 'pet:6', 'penman:10', 'penman monteith:10', 'thornthwaite:10', 'crop coefficient:10', 'pan evaporation:10', 'irrigation scheduling:9'],
      a: "**Evapotranspiration (ET)** is evaporation from soil and water surfaces plus **transpiration** through plant leaves. In humid, vegetated places like Mississippi it's the biggest outflow in the water budget.\n• **Potential ET** is what would evaporate if water were unlimited; **actual ET** is less when soils dry out.\n• The standard way to estimate it is the **Penman-Monteith** equation (the FAO-56 method), using temperature, humidity, wind, and solar radiation. A crop's water use = reference ET × a **crop coefficient** for its growth stage.\n• **Evaporation pans** (Class A pans) are an older, simpler measure.\nIn the Delta, matching irrigation to crop ET with **soil moisture sensors** and ET-based scheduling is one of the cheapest ways to cut pumping from the alluvial aquifer.",
      rel: ['water-budget', 'delta-decline', 'infiltration'] },
    { id: 'infiltration', q: 'How does rain soak into the ground?',
      k: ['infiltration:10', 'infiltration rate:10', 'horton:10', 'green ampt:10', 'percolation:9', 'soak into the ground:10', 'soaks in:9', 'hydrologic soil group*:10', 'soil group:8', 'permeable soil:8'],
      a: "**Infiltration** is water entering the soil surface; **percolation** is its movement deeper, toward the water table.\n• Infiltration starts fast and slows as the soil wets up. **Horton's equation** describes it: f = fc + (f₀ − fc) × e^(−kt), decaying from an initial rate f₀ to a steady rate fc. The **Green-Ampt** model is a more physical alternative.\n• NRCS puts soils in **hydrologic soil groups**: **A** (sand and gravel, high infiltration, low runoff) through **D** (clay, shallow soils, high runoff).\n• Pavement, compaction, crusting, and saturated soil all cut infiltration and raise runoff.\nMuch of the Delta has clay-rich soils that let little water through, which is one reason natural recharge to the alluvial aquifer is limited.",
      rel: ['curve-number', 'water-budget', 'aquifer-recharge'] },
    { id: 'rational-method', q: 'What is the rational method?',
      k: ['rational method:10', 'rational formula:10', 'q ciA:10', 'q = cia:10', 'cia:9', 'runoff coefficient:10', 'peak runoff:9', 'time of concentration:10', 'kirpich:10', 'storm drain sizing:9', 'culvert sizing:8'],
      a: "The **rational method** estimates peak runoff from a small watershed:\n**Q = C × i × A**\n• Q = peak flow in **cfs** (the units work out almost exactly: 1 acre-inch per hour ≈ 1.008 cfs)\n• C = **runoff coefficient**: about **0.70–0.95** for pavement and roofs, **0.05–0.35** for lawns (depending on soil and slope), lower for woods\n• i = rainfall **intensity** (in/hr) for a storm lasting the **time of concentration**, read from an IDF curve (NOAA Atlas 14 in Mississippi)\n• A = drainage area in **acres**\nIt assumes uniform rain over the whole area, so it's used for small areas (commonly up to about **200 acres**): storm drains, inlets, parking lots, small culverts.",
      more: "The **time of concentration** is the travel time from the hydraulically farthest point to the outlet. One common estimate is the **Kirpich** formula, tc (minutes) = 0.0078 × L^0.77 × S^−0.385 (L in feet, S in ft/ft). Ask me **“rational method C 0.6 i 4 in/hr 12 acres”** and I'll work it.",
      rel: ['curve-number', 'idf-curves', 'stormwater-design'] },
    { id: 'curve-number', q: 'What is the SCS curve number method?',
      k: ['curve number:10', 'scs:9', 'nrcs:8', 'tr-55:10', 'tr 55:10', 'tr55:10', 'runoff depth:10', 'runoff volume:9', 'cn value:10'],
      a: "The **NRCS (formerly SCS) curve number method** estimates runoff depth from a storm's rainfall depth:\n• **S = 1000 ÷ CN − 10** (inches of potential retention)\n• Initial abstraction **Ia = 0.2 × S** (rain absorbed before runoff starts)\n• Runoff **Q = (P − Ia)² ÷ (P − Ia + S)** when P > Ia; otherwise zero\n**CN** runs from about 30 (very absorbent) to **98** (pavement). Examples from TR-55: woods in good condition on B soils ≈ **55**; quarter-acre residential lots on B soils ≈ **75**; impervious surfaces = **98**.\nExample: CN 80 and 4 inches of rain → S = 2.5, Ia = 0.5, Q = 3.5² ÷ 6 ≈ **2.0 inches** of runoff. Ask me **“curve number 80 rainfall 4 in.”**",
      more: "NRCS's **TR-55** (small urban watersheds) and **TR-20** and HEC-HMS (larger ones) turn curve-number runoff into hydrographs. Recent research suggests Ia = 0.05S fits many watersheds better than 0.2S, but 0.2S is still the standard in most design manuals.",
      rel: ['rational-method', 'hydrograph', 'infiltration'] },
    { id: 'return-period', q: 'What does a 100-year flood really mean?',
      k: ['100 year flood:10', '100-year flood:10', 'hundred year flood:10', '100 year storm:10', 'return period:10', 'recurrence interval:10', 'annual exceedance probability:10', '1% annual chance:10', '1 percent annual chance:10', '500 year flood:10', 'floodplain:9', 'flood zone:9', 'fema flood:9'],
      a: "A **100-year flood** is a flood with a **1% chance of being equaled or exceeded in any given year**. It's not a flood that comes once a century, and two can happen in back-to-back years.\nOver longer periods the odds add up: the chance of at least one 100-year flood in **n** years is 1 − 0.99ⁿ:\n• 10 years: about **10%**\n• 30 years (a typical mortgage): about **26%**\n• 100 years: about **63%**\nFEMA's **Special Flood Hazard Area** is the 1%-annual-chance floodplain; federally backed mortgages there require flood insurance. The 500-year flood has a 0.2% annual chance.",
      more: "Return periods are estimated from records (for rivers, USGS annual peak flows fit to a distribution such as log-Pearson Type III per Bulletin 17C). Records are short and climate and land use change, so the numbers carry real uncertainty. Ask me **“chance of a 100-year flood in 30 years.”**",
      rel: ['idf-curves', 'ms-floods', 'rational-method'] },
    { id: 'idf-curves', q: 'What are IDF curves and NOAA Atlas 14?',
      k: ['idf curve*:10', 'intensity duration frequency:10', 'atlas 14:10', 'noaa atlas:10', 'atlas 15:10', 'design storm*:10', 'precipitation frequency:10', 'rainfall intensity:9', '25 year storm:9', '10 year storm:9'],
      a: "**Intensity-duration-frequency (IDF) curves** give rainfall intensity for a given storm duration and return period, for example the 10-year, 1-hour rainfall. Engineers use them to size storm drains, culverts, and detention ponds.\nIn Mississippi the official source is **NOAA Atlas 14, Volume 9** (Southeastern States, 2013), which covers Alabama, Arkansas, Florida, Georgia, Louisiana, and Mississippi, for durations from **5 minutes to 60 days** and return periods from **1 to 1,000 years**, through NOAA's Precipitation Frequency Data Server.\nNOAA is developing **Atlas 15**, which accounts for trends in the historical record and projected future climate; the plan is to publish it for the contiguous U.S. in 2026 after peer review.",
      rel: ['rational-method', 'return-period', 'stormwater-design'] },
    { id: 'hydrograph', q: 'What is a hydrograph?',
      k: ['hydrograph*:10', 'unit hydrograph:10', 'baseflow:9', 'base flow:9', 'peak flow:8', 'lag time:9', 'flood routing:10', 'reservoir routing:10', 'detention routing:10', 'hec-hms:10', 'hec hms:10', 'hec-ras:10', 'hec ras:10'],
      a: "A **hydrograph** plots streamflow over time at one point. After a storm it rises on the **rising limb**, peaks, and falls along the **recession limb** back toward **baseflow** (the groundwater-fed flow between storms).\n• The **unit hydrograph** (Sherman, 1932) is the runoff from one inch of excess rain over a set duration; scaling and adding unit hydrographs builds the response to any storm.\n• **Routing** tracks a flood wave through a reservoir, detention pond (storage-indication method), or river reach (Muskingum), where storage lowers and delays the peak.\n• The U.S. Army Corps of Engineers' free **HEC-HMS** (hydrology) and **HEC-RAS** (river hydraulics and floodplain mapping) are the standard tools.",
      rel: ['curve-number', 'stormwater-design', 'streamflow'] },
    { id: 'stormwater-design', q: 'How are stormwater systems designed?',
      k: ['stormwater design:10', 'detention pond*:10', 'retention pond*:10', 'detention basin*:10', 'green infrastructure:10', 'low impact development:10', 'lid:7', 'bioretention:10', 'rain garden*:10', 'permeable pavement:10', 'pervious pavement:10', 'first flush:10', 'bmp*:8', 'best management practice*:9'],
      a: "Modern stormwater design has three jobs: **convey** runoff safely, **control peak flows** so downstream flooding doesn't get worse, and **treat** runoff to protect streams.\n• **Detention ponds** hold water briefly and release it slowly through an outlet structure sized so post-development peaks don't exceed pre-development peaks (often checked for the 2-, 10-, 25-, and 100-year storms). **Retention (wet) ponds** keep a permanent pool that settles pollutants.\n• **Green infrastructure / low impact development:** bioretention and rain gardens, permeable pavement, bioswales, green roofs, and disconnecting roofs from pipes, to soak up the frequent small storms that carry most pollutants.\n• The **first flush** of a storm carries a disproportionate share of pollutants; many standards require treating a set depth of runoff, often around the first inch.\nStormwater permits (MS4, construction, industrial) come from the Clean Water Act's NPDES program, which MDEQ runs in Mississippi.",
      rel: ['stormwater', 'rational-method', 'hydrograph'] },
    { id: 'streamflow', q: 'How is streamflow measured?',
      k: ['streamflow:10', 'stream flow:9', 'stream gage*:10', 'stream gauge*:10', 'river gage*:10', 'rating curve:10', 'stage discharge:10', 'discharge measurement:10', 'adcp:10', 'usgs gage*:10', '7q10:10', 'low flow statistic*:10', 'cfs:6'],
      a: "USGS streamgages record **stage** (water level) continuously. Hydrographers periodically measure **discharge** directly, dividing the channel into sections and measuring depth and velocity in each (the velocity-area method) or using an **acoustic Doppler current profiler (ADCP)** from a boat. Those measurements build a **stage-discharge rating curve**, which turns every stage reading into a flow; ratings shift as channels scour and fill, so they're checked regularly.\nFlows are reported in **cubic feet per second (cfs)**; 1 cfs ≈ **449 gpm** ≈ **0.646 MGD**.\nThe **7Q10** (the lowest 7-day average flow expected once in 10 years) is the low-flow statistic used to set NPDES discharge limits that protect streams in dry weather.",
      rel: ['hydrograph', 'ms-rivers', 'npdes'] },
    { id: 'ms-rivers', q: "What are Mississippi's major rivers?",
      k: ['mississippi rivers:10', 'rivers in mississippi:10', 'major rivers:9', 'yazoo river:10', 'pearl river:10', 'big black:10', 'pascagoula river:10', 'tombigbee:10', 'tenn tom:10', 'tennessee tombigbee:10', 'mississippi river:8', 'river basins:9', 'watersheds in mississippi:10'],
      a: "Mississippi's major river basins:\n• **Mississippi River:** the western border. It drains about **41% of the lower 48 states**, from 31 states and two Canadian provinces.\n• **Yazoo:** drains the Delta and the hills east of it (Tallahatchie, Yalobusha, Coldwater, Sunflower); joins the Mississippi at Vicksburg.\n• **Big Black:** central Mississippi, to the Mississippi below Vicksburg.\n• **Pearl:** from east-central Mississippi past Jackson (Ross Barnett Reservoir) to the Gulf along the Louisiana line.\n• **Pascagoula** (Leaf and Chickasawhay): described as the **largest river by volume in the lower 48 with no dams** on its main stem.\n• **Tombigbee:** northeast Mississippi; the **Tennessee-Tombigbee Waterway** (opened 1985) links it to the **Tennessee River**, which touches the state's far northeast corner.\nMDEQ manages water quality basin by basin, including the coastal streams and the North and South Independent Streams.",
      rel: ['ms-floods', 'ms-reservoirs', 'streamflow'] },
    { id: 'ms-floods', q: "What were Mississippi's biggest floods?",
      k: ['mississippi flood*:10', 'flood of 1927:10', '1927 flood:10', 'great flood:9', 'mounds landing:10', '2011 flood:10', 'easter flood:10', '1979 flood:10', 'pearl river flood:10', '2020 flood:9', 'flood history:10', 'katrina:9', 'storm surge:9'],
      a: "Landmark Mississippi floods:\n• **1927:** the Great Mississippi Flood, the most destructive river flood in U.S. history. The levee at **Mounds Landing** near Greenville broke on **April 21, 1927**; about **27,000 square miles** flooded across the lower valley and more than **700,000 people** were left homeless. It led to the **Flood Control Act of 1928** and the Corps of Engineers' Mississippi River and Tributaries project.\n• **1979:** the **Easter Flood** on the Pearl River at Jackson crested at a record **43.28 ft** on April 17.\n• **2005:** **Hurricane Katrina's** storm surge reached about **28 feet** on the Mississippi coast.\n• **2011:** the Mississippi River at **Vicksburg** hit a record **57.1 ft** on May 19, above the 1927 crest (56.2 ft).\n• **2019:** months of **Yazoo backwater** flooding in the south Delta, and a record-long Bonnet Carré Spillway opening that hurt the Mississippi Sound.\n• **2020:** the Pearl at Jackson crested at **36.8 ft** on February 17, its third-highest crest.",
      rel: ['yazoo-pumps', 'bonnet-carre', 'return-period'] },
    { id: 'yazoo-pumps', q: 'What is the Yazoo Backwater pumps project?',
      k: ['yazoo pump*:10', 'yazoo backwater:10', 'backwater pump*:10', 'backwater area:9', 'steele bayou:10', 'south delta flooding:10'],
      a: "The **Yazoo Backwater Area** in the south Delta floods when the Mississippi River is high: the Steele Bayou gates close to keep the river out, and rain on the Delta has nowhere to drain. A pumping station to move that water over the levee was authorized in 1941 and has been fought over ever since.\n• **2008:** EPA **vetoed** the pumps under Clean Water Act section 404(c) over harm to about 67,000 acres of wetlands.\n• **2019:** backwater flooding covered large parts of the south Delta for months.\n• **January 2025:** the Corps signed a Record of Decision for a redesigned project, with **EPA's support** this time; pumping would begin at elevation **90 ft** during crop season (March 25–October 15) and **93 ft** the rest of the year. Congress directed funding for mitigation and design in FY2025.\n• Environmental groups **sued**, arguing the project still violates the 2008 veto. Check current news for the latest.",
      rel: ['ms-floods', 'wetlands', 'wotus'] },
    { id: 'bonnet-carre', q: 'How did the Bonnet Carré Spillway affect the Mississippi coast?',
      k: ['bonnet carre:10', 'bonnet carré:10', 'spillway:9', 'mississippi sound:10', 'beach closure*:10', 'oyster kill:10', 'oyster die off:10', 'freshwater diversion:9'],
      a: "The **Bonnet Carré Spillway**, above New Orleans, diverts Mississippi River floodwater into Lake Pontchartrain, and from there it flows into the **Mississippi Sound**. In **2019** it opened twice for a record of about **120 days** in total.\nThe fresh, nutrient-rich water:\n• Dropped salinity in the Sound, killing an estimated **more than 95%** of Mississippi's oysters and hurting shrimp, crabs, and dolphins\n• Fed the first documented **toxic blue-green algae bloom** in the Sound; MDEQ closed all **21 public beaches** to water contact for much of the summer\nIt showed how river management hundreds of miles away shapes Mississippi's coastal water quality.",
      rel: ['harmful-algal-blooms', 'gulf-hypoxia', 'ms-floods'] },
    { id: 'gulf-hypoxia', q: 'What is the Gulf dead zone?',
      k: ['dead zone:10', 'hypoxia:10', 'hypoxic zone:10', 'gulf hypoxia:10', 'hypoxia task force:10', 'nutrient pollution:9', 'nutrient loading:9', 'nitrogen runoff:9'],
      a: "Every summer a **hypoxic zone**, with bottom water below **2 mg/L dissolved oxygen**, forms off Louisiana and Texas. Nitrogen and phosphorus from the Mississippi-Atchafalaya basin (farm fertilizer, manure, wastewater) feed algae; when they die and sink, decomposition uses up the oxygen, and fresh water floating on salt water keeps oxygen from mixing down.\n• Largest measured: **8,776 square miles** in **2017**\n• The **Hypoxia Task Force** goal: a five-year average below **1,900 square miles** by **2035**, with an interim nutrient-reduction target of 20% by 2025\n• **2026:** about **1,332 square miles**, the second smallest in 40 years of measurement; Tropical Storm Bertha's mixing helped shrink it",
      rel: ['eutrophication', 'nitrogen-removal', 'bonnet-carre'] },
    { id: 'eutrophication', q: 'What is eutrophication?',
      k: ['eutrophic*:10', 'nutrient enrichment:10', 'trophic state:10', 'carlson:10', 'oligotrophic:10', 'mesotrophic:10', 'nitrogen and phosphorus:9', 'limiting nutrient:10'],
      a: "**Eutrophication** is overfeeding a water body with nutrients, mainly **phosphorus** and **nitrogen**. Algae and plants boom, then die and decompose, using up oxygen; the results are fish kills, murky water, harmful algal blooms, and taste-and-odor trouble for water plants.\n• Lakes are classed **oligotrophic** (low nutrients, clear), **mesotrophic**, **eutrophic**, and **hypereutrophic**; **Carlson's Trophic State Index** scores them from chlorophyll-a, total phosphorus, and Secchi depth.\n• Phosphorus usually limits algae in fresh water; nitrogen more often limits it in coastal water, so both matter.\nSources: fertilizer and manure runoff, wastewater discharges, septic systems, and urban stormwater.",
      rel: ['harmful-algal-blooms', 'gulf-hypoxia', 'phosphorus-removal'] },
    { id: 'lake-stratification', q: 'Why do lakes turn over?',
      k: ['lake turnover:10', 'fall turnover:10', 'turn over:7', 'lake stratification:10', 'reservoir stratification:10', 'thermocline:10', 'epilimnion:10', 'hypolimnion:10', 'metalimnion:10', 'destratif*:10', 'intake level*:9'],
      a: "In summer, reservoirs **stratify**: warm, light water (the **epilimnion**) floats on cold, dense water (the **hypolimnion**), separated by the **thermocline**. The bottom layer is cut off from the air, runs out of oxygen, and picks up **dissolved iron, manganese, ammonia, and hydrogen sulfide** from the sediments.\nIn fall the surface cools until the layers match in density, and the lake **turns over**, mixing that bottom water through the lake. Water plants often see sudden **manganese, color, and taste-and-odor** problems.\nTools: **multi-level intakes** to pick the best layer, **aeration or mixing systems** to prevent stratification, and oxidants (permanganate, chlorine dioxide) to handle manganese.",
      more: "Why it happens: water is densest at about **39°F (4°C)**, so in deep lakes the bottom stays near that temperature. Shallow reservoirs stratify more weakly and can mix during storms, but the same chemistry shows up in their deeper spots and coves.",
      rel: ['fe-mn-oxidation', 'taste-odor', 'ms-reservoirs'] },
    { id: 'ms-reservoirs', q: "What are Mississippi's major reservoirs?",
      k: ['ross barnett:10', 'barnett reservoir:10', 'reservoir*:7', 'sardis:10', 'enid lake:10', 'grenada lake:10', 'arkabutla:10', 'okatibbee:10', 'pickwick:10', 'lakes in mississippi:10', 'jackson water source:10', 'where does jackson get its water:10'],
      a: "Mississippi's big lakes are reservoirs; the state has few natural lakes beyond oxbows.\n• **Ross Barnett Reservoir:** about **33,000 acres** on the Pearl River between Madison and Rankin counties, built by the **Pearl River Valley Water Supply District** (created 1958) and filled by 1965. It's the main drinking water source for the **City of Jackson**, which also draws from the Pearl.\n• **Arkabutla, Sardis, Enid, and Grenada:** Corps of Engineers flood-control lakes in the hills above the Delta, built to hold back floods on the Yazoo tributaries.\n• **Okatibbee Lake** near Meridian, and **Pickwick Lake** on the Tennessee River in the northeast corner.\nBecause most Mississippians drink groundwater, only a handful of systems (Jackson being the largest) rely mainly on surface water.",
      rel: ['jackson-crisis', 'lake-stratification', 'ms-rivers'] },
    { id: 'wetlands', q: 'Why do wetlands matter for water?',
      k: ['wetland*:9', 'swamp*:8', 'marsh*:8', 'bottomland*:9', 'bottomland hardwood*:10', 'wetland function*:10', 'wetland mitigation:10', 'mitigation bank*:10', 'section 404:8'],
      a: "Wetlands are among the hardest-working parts of the water cycle:\n• **Flood storage:** they hold floodwater and release it slowly.\n• **Water quality:** plants and microbes trap sediment and remove nitrogen (by denitrification) and phosphorus.\n• **Habitat:** nurseries for fish and shellfish, and critical for migrating waterfowl on the Mississippi Flyway.\n• **Groundwater and baseflow:** some recharge aquifers or feed streams in dry weather.\nMississippi's wetlands include **bottomland hardwood forests** in the Delta and river floodplains, cypress-tupelo swamps, and coastal marshes. Filling them generally needs a Clean Water Act **Section 404** permit from the Corps, with **mitigation** (often through mitigation banks) for unavoidable losses; which wetlands are covered depends on the WOTUS definition.",
      rel: ['wotus', 'yazoo-pumps', 'eutrophication'] },
    { id: 'drought', q: 'How is drought measured?',
      k: ['drought*:9', 'drought monitor:10', 'drought index:10', 'palmer drought:10', 'd0:8', 'd4:8', 'drought contingency:10', 'drought plan*:10', 'low water:8', 'low river:9', 'saltwater wedge:10', 'record low:8'],
      a: "The **U.S. Drought Monitor** (a weekly map from NOAA, USDA, and the National Drought Mitigation Center) rates drought from **D0** (abnormally dry) through **D1** (moderate), **D2** (severe), **D3** (extreme), and **D4** (exceptional), blending indicators like the Palmer index, soil moisture, streamflow, and precipitation percentiles.\nMississippi saw it firsthand in the Mississippi River's low-water years: the Memphis gauge set a record low of **−10.81 ft** in October 2022 and broke it at **−12.04 ft** on October 17, 2023. Barges were stranded, and in both years the Corps built an underwater sill to slow a **saltwater wedge** moving upriver toward Louisiana water intakes.\nUtilities should keep a **drought contingency plan**: triggers (well levels, river stage, demand), staged conservation measures, and backup sources.",
      rel: ['water-budget', 'water-conservation', 'delta-decline'] }
  );

  /* ================= TREATMENT ENGINEERING ================= */
  X.push(
    { id: 'log-credits', q: 'How do log removal credits work?',
      k: ['log credit*:10', 'log removal credit*:10', 'removal credit*:10', 'filtration credit*:10', 'log inactivation credit*:10', 'how many logs:9', 'giardia 3 log:10', 'virus 4 log:10', 'what does 3 log mean:10', 'log reduction:8'],
      a: "A **log** is a factor of 10: **1-log = 90%** removed, **2-log = 99%**, **3-log = 99.9%**, **4-log = 99.99%**. Log removal = log₁₀(C_in ÷ C_out).\nFiltered surface water systems must achieve at least **3-log Giardia** and **4-log virus** removal plus inactivation, and at least **2-log Cryptosporidium** removal (more under LT2 bin assignments). Filtration earns credit, and disinfection (CT) makes up the rest. Typical credits from EPA's guidance manual:\n• **Conventional** filtration: 2.5-log Giardia, 2.0-log virus → disinfection must add **0.5-log Giardia and 2-log virus**\n• **Direct** filtration: 2.0-log Giardia, 1.0-log virus\n• **Slow sand**: 2.0-log Giardia, 2.0-log virus\n• **Diatomaceous earth**: 2.0-log Giardia, 1.0-log virus\nTurbidity performance is what earns the Crypto credit: combined filter effluent at or below **0.3 NTU** in 95% of monthly readings and never above 1 NTU.",
      more: "Ground water systems under the Ground Water Rule that disinfect for credit must reliably achieve **4-log virus** treatment. Ask me **“log removal 99.97%”** or **“4 log”** to convert between percent and logs.",
      rel: ['lt2-bins', 'ct-calc', 'swtr'], src: ['regsPage'] },
    { id: 'lt2-bins', q: 'How does LT2 bin classification work?',
      k: ['lt2 bin*:10', 'bin classification:10', 'crypto bin*:10', 'cryptosporidium bin*:10', 'bin 1:9', 'bin 2:9', 'bin 3:9', 'bin 4:9', 'microbial toolbox:10', 'toolbox:8', 'oocysts per liter:10'],
      a: "The **Long Term 2 Enhanced Surface Water Treatment Rule (LT2, 2006)** makes filtered surface water systems monitor their source for *Cryptosporidium* and sorts them into **bins** by the average concentration:\n• **Bin 1:** under 0.075 oocysts/L: no extra treatment\n• **Bin 2:** 0.075 to under 1.0: **1-log** more (conventional plants)\n• **Bin 3:** 1.0 to under 3.0: **2-log** more\n• **Bin 4:** 3.0 or more: **2.5-log** more\n(Direct filtration plants need 0.5-log more than conventional in Bins 2–4, because they get less filtration credit.) Unfiltered systems need 2- or 3-log Crypto inactivation.\nExtra credit comes from the **microbial toolbox**: watershed control, presedimentation, bank filtration, combined or individual filter turbidity performance, second-stage filtration, membranes, bag or cartridge filters, and **UV**, **ozone**, or **chlorine dioxide** inactivation. UV is the most common choice because Crypto is very sensitive to it.",
      rel: ['log-credits', 'uv-dose', 'cryptosporidium'] },
    { id: 'chick-watson', q: 'How does disinfection kinetics work?',
      k: ['chick watson:10', 'chick s law:10', 'chicks law:10', 'disinfection kinetics:10', 'inactivation kinetics:10', 'inactivation rate:9', 'hom model:10', 'why ct works:10', 'kill rate:8'],
      a: "Disinfection follows **Chick's law** (1908): microbes die at a rate proportional to how many are left, so survival falls exponentially with time. **Watson** added the disinfectant concentration:\n**ln(N ÷ N₀) = −k × Cⁿ × t**\nWith n ≈ 1, the log inactivation depends on the product **C × t**, which is the basis of EPA's **CT tables**.\nWhat changes k:\n• **Temperature:** colder water needs much more CT; the tables for near-freezing water are several times the 20°C values.\n• **pH:** free chlorine is far stronger at low pH, where more of it is HOCl.\n• **The organism:** viruses are easiest, Giardia is harder, and Cryptosporidium barely notices chlorine.\nReal curves often show a shoulder or a tail, which models like the **Hom** model capture; clumping and particles shield microbes, which is why turbidity matters.",
      rel: ['ct-calc', 'hocl', 'log-credits'] },
    { id: 'coagulation-mechanisms', q: 'How does coagulation actually work?',
      k: ['coagulation mechanism*:10', 'how does coagulation work:10', 'sweep floc:10', 'sweep coagulation:10', 'double layer:10', 'destabiliz*:9', 'interparticle bridging:10', 'bridging:8', 'alkalinity consumed:10', 'alum alkalinity:10', 'alum consumes alkalinity:10', 'ferric alkalinity:10', 'pacl:9', 'polyaluminum chloride:10', 'alum:5', 'alkalinity:4'],
      a: "Particles and natural organic matter in water carry a **negative charge**, so they repel each other and stay suspended. Coagulants destabilize them four ways:\n• **Double-layer compression:** ions squeeze the charged layer around each particle.\n• **Charge neutralization:** positively charged aluminum or iron species cancel the surface charge (watch the **zeta potential**).\n• **Sweep floc:** at higher doses, metal hydroxide precipitates enmesh particles as they form.\n• **Bridging:** long polymer chains link particles together.\nCoagulants consume alkalinity and lower pH: about **0.5 mg/L alkalinity (as CaCO₃) per mg/L of alum** (Al₂(SO₄)₃·14H₂O), and about **0.92 mg/L per mg/L of ferric chloride**. Low-alkalinity water may need lime, caustic, or soda ash to keep the pH where the coagulant works best. **Polyaluminum chloride (PACl)** is pre-neutralized, so it uses less alkalinity and works better in cold water.",
      rel: ['coagulation', 'enhanced-coagulation', 'velocity-gradient'] },
    { id: 'enhanced-coagulation', q: 'What are the enhanced coagulation TOC removal requirements?',
      k: ['enhanced coagulation:10', 'toc removal:10', 'toc removal requirement*:10', 'step 1 matrix:10', 'suva:10', 'specific uv absorbance:10', 'uv254:10', 'uv 254:10', 'alternative compliance criteria:10', 'toc matrix:10'],
      a: "Under the **Stage 1 Disinfectants/Disinfection Byproducts Rule**, conventional surface water plants must remove a set percent of **TOC** before disinfection, based on source TOC and alkalinity (mg/L as CaCO₃):\n• **TOC 2–4 mg/L:** 35% (alkalinity 0–60), 25% (60–120), 15% (over 120)\n• **TOC 4–8 mg/L:** 45%, 35%, 25%\n• **TOC over 8 mg/L:** 50%, 40%, 30%\nHigher alkalinity gets a lower target because it takes much more coagulant to reach the low pH where TOC removal works best.\n**SUVA** (UV₂₅₄ ÷ DOC × 100, in L/mg-m) shows how treatable the TOC is: **above 4** means mostly humic material that forms DBPs and coagulates well; **2 or below** means little will come out by coagulation and is one of the **alternative compliance criteria** that can excuse a plant from the removal targets.",
      rel: ['toc', 'dbp-control', 'coagulation-mechanisms'], src: ['regsPage'] },
    { id: 'velocity-gradient', q: 'What is the velocity gradient (G value) in mixing?',
      k: ['velocity gradient:10', 'g value:10', 'gt value:10', 'gt:7', 'camp stein:10', 'mixing intensity:10', 'rapid mix design:10', 'flocculator design:10', 'tapered flocculation:10', 'mixing energy:9'],
      a: "The **velocity gradient G** (Camp and Stein, 1943) measures mixing intensity: **G = √(P ÷ (μ × V))**, where P is power put into the water, μ is viscosity, and V is basin volume. Units are 1/seconds.\n• **Rapid mix:** high G, commonly in the hundreds to about 1,000 s⁻¹ or more, for seconds to about a minute, to spread the coagulant instantly\n• **Flocculation:** gentle G, roughly **10–60 s⁻¹**, often **tapered** from higher to lower through three or four stages so floc grows without being torn apart\n• **Gt** (G × detention time), commonly around **10⁴ to 10⁵** for flocculation, sums up the total opportunity for particles to collide\nCold water is more viscous, so the same mixer delivers a lower G in winter.",
      rel: ['flocculation', 'coagulation-mechanisms', 'sedimentation-theory'] },
    { id: 'sedimentation-theory', q: 'What is the science behind sedimentation?',
      k: ['stokes law:10', 'stokes:9', 'settling velocity:10', 'ideal settling:10', 'overflow rate theory:10', 'discrete settling:10', 'flocculent settling:10', 'hindered settling:10', 'tube settler*:10', 'plate settler*:10', 'lamella:10', 'dissolved air flotation:10', 'daf:10', 'ballasted floc*:10', 'actiflo:10'],
      a: "A single particle settles at its **Stokes' law** velocity: **v = g × (ρp − ρw) × d² ÷ (18 μ)**. Double the particle diameter and it settles four times faster; colder, more viscous water slows everything.\n**Hazen (1904)** and **Camp (1946)** showed that in an ideal basin, removal depends on the **overflow rate** (flow ÷ surface area), not the depth, which is why operators track surface loading.\nSettling types: **I** discrete particles, **II** flocculent (floc grows as it falls), **III** hindered or zone settling (dense sludge blankets), **IV** compression at the bottom.\nWays to do more in less space:\n• **Tube and plate settlers** add settling surface in a small footprint.\n• **Dissolved air flotation (DAF)** floats light floc and algae with microbubbles instead of settling them.\n• **Ballasted flocculation** weights floc with microsand so it settles very fast.",
      rel: ['sedimentation', 'velocity-gradient', 'filter-design'] },
    { id: 'filter-design', q: 'How are rapid sand filters designed?',
      k: ['filter design:10', 'effective size:10', 'uniformity coefficient:10', 'filter media design:10', 'media specification*:10', 'l/d ratio:10', 'biofiltration:10', 'biological filtration:10', 'biologically active filtration:10', 'filtration mechanism*:10', 'filtration rate standard:10', 'backwash rate:10', 'bed expansion percent:10'],
      a: "Rapid filters remove particles by **depth filtration**, not straining: particles are carried to grains by sedimentation, interception, and diffusion, and they stick if coagulation destabilized them. That's why filters fail when coagulation fails.\nKey design numbers:\n• **Media:** sand effective size about **0.45–0.55 mm** (uniformity coefficient 1.65 or less, per the Ten States Standards); dual-media plants put coarser, lighter **anthracite** (about 0.8–1.2 mm) on top so the bed filters coarse to fine\n• **Depth:** a common check is bed depth ÷ grain size (**L/d**) of at least about 1,000\n• **Rate:** the Ten States Standards set **2 gpm/ft²**, with higher rates (often 4–6) allowed after demonstration\n• **Backwash:** at least **15 gpm/ft²**, enough for about **50% bed expansion**, often with air scour or surface wash\nWatch the **turbidity spike** after backwash (filter ripening); filter-to-waste or a slow restart handles it. **Biologically active filters** (often after ozone) also remove biodegradable organic carbon, manganese, and taste-and-odor compounds.",
      rel: ['filtration', 'backwash', 'log-credits'] },
    { id: 'membrane-engineering', q: 'How do membrane filtration systems work?',
      k: ['membrane flux:10', 'flux:9', 'transmembrane pressure:10', 'tmp:8', 'membrane fouling:10', 'fouling:8', 'integrity test*:10', 'pressure decay test:10', 'membrane integrity:10', 'membrane recovery:9', 'clean in place:9', 'cip:7', 'pore size*:9', 'molecular weight cutoff:10'],
      a: "Membranes separate by size (and, for RO, by charge and diffusion):\n• **Microfiltration (MF):** about **0.1 µm**: particles, bacteria, Giardia, Crypto\n• **Ultrafiltration (UF):** about **0.01 µm**: adds most viruses\n• **Nanofiltration (NF):** about **0.001 µm** (roughly 200–1,000 daltons): hardness, color, DBP precursors\n• **Reverse osmosis (RO):** effectively non-porous: salts, nitrate, arsenic, PFAS\nOperators track **flux** (gallons per ft² per day), **transmembrane pressure (TMP)**, and **recovery** (MF/UF usually 90–98%). Fouling raises TMP; backpulses handle it day to day and chemical **clean-in-place** handles the rest.\nFor pathogen credit under LT2, membranes need a **direct integrity test** (such as a pressure decay test) sensitive enough to find a **3 µm** breach, run at least daily, plus continuous indirect monitoring such as filtrate turbidity.",
      rel: ['ro-design', 'membranes', 'log-credits'] },
    { id: 'ro-design', q: 'How does reverse osmosis desalination work?',
      k: ['osmotic pressure:10', 'desalination:10', 'desalinat*:10', 'desal:9', 'brackish:9', 'seawater:9', 'concentrate disposal:10', 'brine disposal:10', 'sdi:9', 'silt density index:10', 'antiscalant*:10', 'reverse osmosis design:10', 'ro recovery:10', 'remineraliz*:10'],
      a: "**Reverse osmosis** pushes water through a dense membrane against its natural **osmotic pressure**, leaving salts behind. A rule of thumb: osmotic pressure is about **1 psi per 100 mg/L** of TDS.\n• **Brackish water** (roughly 1,000–10,000 mg/L TDS): about 150–400 psi feed pressure, **75–85%** recovery, limited by scaling (calcium carbonate, calcium sulfate, barium sulfate, silica)\n• **Seawater** (about 35,000 mg/L): about **800–1,000 psi**, **40–50%** recovery; modern plants with energy recovery devices use roughly **3–4 kWh per cubic meter**\nPretreatment matters: a **silt density index** under about 3–5, **antiscalants**, and cartridge filters. RO water is corrosive and needs **remineralization** and pH/alkalinity adjustment.\nThe **concentrate** (brine) is the hard part: surface discharge under an NPDES permit, discharge to sewer, deep-well injection, evaporation ponds, or zero-liquid-discharge systems.",
      rel: ['membrane-engineering', 'water-reuse', 'tds'] },
    { id: 'gac-engineering', q: 'How are GAC contactors designed?',
      k: ['ebct:10', 'empty bed contact time:10', 'bed volumes:10', 'carbon breakthrough:10', 'gac design:10', 'gac contactor*:10', 'carbon change out:10', 'carbon changeout:10', 'carbon reactivation:10', 'reactivated carbon:10', 'rssct:10', 'isotherm*:10', 'freundlich:10', 'lead lag:10', 'lead-lag:10'],
      a: "**Granular activated carbon (GAC)** adsorbs organics onto a huge internal surface (roughly 500–1,500 m² per gram).\n• **Empty bed contact time (EBCT)** = bed volume ÷ flow; GAC contactors are commonly designed for about **10–20 minutes**.\n• Capacity is tracked in **bed volumes** treated before **breakthrough**. Compounds that adsorb weakly break through first, so **short-chain PFAS** (like PFBA) come through far sooner than PFOS or PFOA, and natural organic matter competes for sites.\n• **Isotherms** (the Freundlich equation, q = K × C^(1/n)) and **rapid small-scale column tests (RSSCT)** predict carbon life before building.\n• **Lead–lag** vessels in series let you run the first bed to exhaustion while the second one protects the finished water.\nSpent carbon is **thermally reactivated** in furnaces at high temperature, or replaced.",
      rel: ['pfas-treatment', 'activated-carbon', 'ion-exchange-engineering'] },
    { id: 'ion-exchange-engineering', q: 'How is ion exchange used to remove contaminants?',
      k: ['anion exchange:10', 'strong base anion:10', 'sba:9', 'strong acid cation:10', 'cation exchange:10', 'resin selectivity:10', 'selectivity:9', 'pfas resin:10', 'single use resin:10', 'nitrate selective:10', 'ix resin:9', 'ion exchange design:10', 'chromatographic peaking:10', 'nitrate dumping:10'],
      a: "Ion exchange swaps ions on a resin for ions in the water:\n• **Strong acid cation (SAC)** resin in the sodium form removes **hardness**, **radium**, and **barium**, regenerated with salt brine.\n• **Strong base anion (SBA)** resin removes **nitrate, arsenate, perchlorate, uranium, and PFAS**.\nResins prefer some ions over others. Standard SBA resin prefers **sulfate over nitrate**, so when it's exhausted, sulfate can push captured nitrate back off in a spike above the influent (**chromatographic peaking**, or nitrate dumping). **Nitrate-selective** resins avoid that.\nFor **PFAS**, **single-use PFAS-selective resins** run with short contact times (often a few minutes, versus 10–20 for GAC) and are replaced, not regenerated, then incinerated or landfilled. Regenerable systems create a **brine** waste stream to manage.",
      rel: ['gac-engineering', 'nitrate-treatment', 'ion-exchange'] },
    { id: 'advanced-oxidation', q: 'What is an advanced oxidation process?',
      k: ['advanced oxidation:10', 'aop:10', 'hydroxyl radical*:10', 'uv peroxide:10', 'uv hydrogen peroxide:10', 'peroxone:10', '1 4 dioxane treatment:10', 'dioxane:8', '1 4 dioxane remov*:10', 'remove 1 4 dioxane:10', 'treat 1 4 dioxane:10', 'uv chlorine:9', 'micropollutant*:9'],
      a: "**Advanced oxidation processes (AOPs)** generate the **hydroxyl radical** (·OH), one of the strongest oxidants known (about 2.8 V), which attacks almost any organic compound without much selectivity.\nCommon AOPs:\n• **UV + hydrogen peroxide**\n• **Ozone + hydrogen peroxide** (peroxone)\n• **UV + free chlorine**\nThey're used for contaminants other processes miss, such as **1,4-dioxane**, some pesticides and pharmaceuticals, and taste-and-odor compounds (geosmin, MIB), and as the last step of **potable reuse** trains (MF/UF, then RO, then UV-AOP). UV alone also breaks down **NDMA**.\nCautions: AOPs don't break down PFAS, radicals are scavenged by alkalinity and organic matter, and partial oxidation can create biodegradable byproducts, so biological filtration often follows.",
      rel: ['ozone-engineering', 'water-reuse', 'uv-dose'] },
    { id: 'ozone-engineering', q: 'How is ozone used in water treatment?',
      k: ['ozone:8', 'ozonation:10', 'ozone generat*:10', 'ozone contactor*:10', 'ozone dose:10', 'corona discharge:10', 'lox:8', 'ozone destruct*:10', 'off gas:8', 'ozone safety:10'],
      a: "**Ozone (O₃)** is a powerful oxidant and disinfectant (about 2.07 V, versus 1.49 V for HOCl).\n• It's **generated on site** by passing oxygen (often liquid oxygen, LOX) or dried air through a **corona discharge**, because it breaks down within minutes.\n• It's dissolved through fine-bubble diffusers or side-stream injectors into **contactors** designed for CT credit.\nStrengths: excellent against **viruses and Giardia**, effective against **Cryptosporidium** (though cold water needs high CT), and great for **taste, odor, color**, and iron and manganese oxidation.\nLimits:\n• No lasting residual, so chlorine or chloramine still carries the distribution system.\n• Bromide in the water forms **bromate** (MCL **0.010 mg/L**).\n• It makes organic matter more biodegradable, so plants usually follow it with **biologically active filters**.\n• Ozone gas is toxic (OSHA limit **0.1 ppm**), so contactor off-gas goes through a thermal or catalytic **ozone destruct** unit, with ambient monitors in the building.",
      rel: ['alt-disinfectants', 'advanced-oxidation', 'dbp-control'] },
    { id: 'uv-dose', q: 'How much UV dose does disinfection need?',
      k: ['uv dose:10', 'mj cm2:10', 'mj/cm2:10', 'millijoules:10', 'uvt:10', 'uv transmittance:10', 'uv validation:10', 'uvdgm:10', 'uv reactor*:10', 'uv sensor*:9', 'medium pressure uv:10', 'low pressure uv:10', 'adenovirus:10'],
      a: "UV damages DNA and RNA so microbes can't reproduce. Dose = intensity × time, in **mJ/cm²**. LT2's UV dose table:\n• **Cryptosporidium:** 2-log **5.8**, 3-log **12**, 4-log **22** mJ/cm²\n• **Giardia:** 2-log **5.2**, 3-log **11**, 4-log **22** mJ/cm²\n• **Viruses:** 2-log **100**, 4-log **186** mJ/cm², driven by **adenovirus**, which is unusually UV resistant\nSo UV is a bargain for protozoa, and it's why UV became the go-to LT2 tool, but virus credit still usually comes from chlorine.\nReactors must be **validated** (EPA's UV Disinfection Guidance Manual, 2006) and operated within their tested ranges of flow, **UV transmittance (UVT)**, and sensor intensity. UV leaves **no residual**.",
      rel: ['uv', 'lt2-bins', 'log-credits'] },
    { id: 'chloramine-chemistry', q: 'What chlorine-to-ammonia ratio should be used for chloramines?',
      k: ['chlorine to ammonia ratio:10', 'chlorine ammonia ratio:10', 'cl2 to nh3:10', 'cl2 nh3:10', '4 5 to 1:10', '5 to 1 ratio:10', 'monochloramine formation:10', 'dichloramine:10', 'trichloramine:10', 'free ammonia:9', 'chloramine chemistry:10', 'dialysis:9', 'aquarium*:9', 'fish tank:9'],
      a: "**Monochloramine** (NH₂Cl) forms when chlorine meets ammonia. Keep the **chlorine-to-ammonia-nitrogen weight ratio between about 3:1 and 5:1**, commonly about **4.5:1**:\n• Below that range, extra **free ammonia** is left to feed nitrifying bacteria.\n• Above about **5:1**, **dichloramine** starts to form (medicinal taste and odor), and near **7.6:1** you reach breakpoint and lose the chloramine.\n• pH matters: monochloramine dominates above about pH 7.5; dichloramine forms at lower pH, and trichloramine below about pH 4.5.\nChloramine is weaker than free chlorine but lasts much longer and forms far fewer THMs and HAAs. Two groups need warning when a system uses it: **kidney dialysis** centers (it must be removed, usually by carbon) and **aquarium and pond owners** (it's toxic to fish; ordinary dechlorinators may not handle the ammonia).",
      rel: ['nitrification', 'alt-disinfectants', 'chlorine-curve'] },
    { id: 'dbp-control', q: 'How can a system lower its disinfection byproducts?',
      k: ['dbp control:10', 'reduce dbp*:10', 'lower dbp*:10', 'lower tthm:10', 'reduce tthm:10', 'reduce thm*:10', 'thm formation:10', 'dbp formation:10', 'brominated:10', 'bromide:9', 'nitrosamine*:10', 'ndma:10', 'haa9:10', 'high tthm:10', 'tthm violation:10'],
      a: "DBPs form when disinfectant meets **natural organic matter**; they rise with dose, **contact time**, **temperature**, and TOC. THMs rise with **higher pH**; HAAs tend to fall. **Bromide** shifts formation toward brominated DBPs, which are generally considered more toxic (EPA monitored **HAA9**, which includes them, under UCMR 4).\nStrategies, roughly in order of impact:\n1. **Remove precursors** before chlorinating: enhanced coagulation, GAC, biofiltration, membranes.\n2. **Move the chlorine point** downstream of filtration, and cut pre-chlorination.\n3. **Change primary disinfection** (UV, ozone, or chlorine dioxide) and use **chloramine** for the residual.\n4. **Cut water age**: tank turnover, flushing, looping dead ends.\n5. **Aerate storage tanks**: THMs are volatile, so spray aeration in tanks can strip them.\nChloramination has its own byproduct, **NDMA**, a probable carcinogen on EPA's Contaminant Candidate List; California's notification level is **10 ng/L**.",
      rel: ['dbps', 'enhanced-coagulation', 'water-age-model'] },
    { id: 'fe-mn-treatment', q: 'What are the options for iron and manganese removal?',
      k: ['iron and manganese removal:10', 'iron removal:10', 'manganese removal:10', 'remove iron:10', 'remove manganese:10', 'biological iron:10', 'biological manganese:10', 'sequester iron:10', 'sequestering iron:10', 'sequestration of iron:10', 'manganese oxide coated:10', 'catalytic media:10', 'oxidation filtration:10'],
      a: "Iron and manganese come dissolved (Fe²⁺, Mn²⁺) in oxygen-poor groundwater and turn to rust-colored or black particles when oxidized.\n• **Oxidation + filtration:** aeration or chlorine for iron; **permanganate**, chlorine dioxide, or ozone for manganese, then filtration. Free chlorine oxidizes manganese slowly at neutral pH unless the filter media is coated with manganese oxide.\n• **Catalytic media** (greensand and manganese-oxide-coated media): the coating adsorbs and oxidizes Mn²⁺, and a continuous chlorine or permanganate feed keeps it regenerated. Overfeeding permanganate gives **pink water**.\n• **Biological filtration:** bacteria oxidize iron and manganese with no chemicals except aeration; it's common in Europe and growing in the U.S.\n• **Sequestration** with polyphosphate or silicate keeps small amounts dissolved and invisible, but it only works at low levels and doesn't remove anything.\nSecondary standards are **0.3 mg/L iron** and **0.05 mg/L manganese**; EPA's lifetime health advisory for manganese is **0.3 mg/L**.",
      rel: ['iron-manganese', 'oxidant-demand', 'greensand'] },
    { id: 'arsenic-treatment', q: 'How is arsenic removed from drinking water?',
      k: ['arsenic removal:10', 'remove arsenic:10', 'arsenic remov*:10', 'removing arsenic:10', 'arsenic treatment:10', 'arsenite:10', 'arsenate:10', 'arsenic iii:10', 'arsenic v:10', 'adsorptive media:10', 'iron based media:10', 'activated alumina:10'],
      a: "The arsenic MCL is **0.010 mg/L** (10 µg/L), in effect since **January 23, 2006**.\nStep one is chemistry: groundwater arsenic is often **As(III) (arsenite)**, which carries no charge at normal pH and is hard to remove. **Oxidize it to As(V) (arsenate)** first, with chlorine or permanganate (chloramine doesn't do it well).\nThen:\n• **Adsorptive media** (iron-based granular media or activated alumina) in pressure vessels: simple and popular for small wells; watch pH, silica, and phosphate, which compete\n• **Coagulation/filtration with iron:** EPA guidance suggests at least **20 parts iron per part arsenic** by weight; systems that already remove iron often get arsenic removal as a bonus\n• **Anion exchange** for As(V), where sulfate is low\n• **Reverse osmosis** for high levels or several contaminants at once\nSpent media and residuals must be tested and disposed of properly.",
      rel: ['arsenic', 'fe-mn-treatment', 'ion-exchange-engineering'] },
    { id: 'nitrate-treatment', q: 'How is nitrate removed from drinking water?',
      k: ['nitrate removal:10', 'remove nitrate:10', 'nitrate remov*:10', 'removing nitrate:10', 'nitrate treatment:10', 'nitrate over the mcl:10', 'high nitrate:9', 'denitrification treatment:9', 'blending well*:9', 'electrodialysis:10'],
      a: "The nitrate MCL is **10 mg/L as nitrogen** (nitrite **1 mg/L**), and an exceedance calls for **Tier 1** public notice because of the acute risk to infants (methemoglobinemia).\nOptions:\n• **Anion exchange** with **nitrate-selective** resin: the most common\n• **Reverse osmosis** or **electrodialysis reversal**\n• **Biological denitrification**, in which bacteria convert nitrate to nitrogen gas\n• **Blending** with a low-nitrate source, or drilling deeper into a protected aquifer\nThe lasting fix is **source protection**: nitrate comes from fertilizer, manure, and septic systems, so shallow wells in farm country are most at risk.",
      rel: ['nitrate', 'ion-exchange-engineering', 'wellhead-protection'] },
    { id: 'radionuclides', q: 'What are the radionuclide standards?',
      k: ['radionuclide*:10', 'radium:10', 'uranium:10', 'gross alpha:10', 'radon:10', 'pci l:10', 'picocurie*:10', 'beta photon:10', 'radioactive:9', 'radioactivity:9'],
      a: "EPA's Radionuclides Rule (2000) set these MCLs:\n• **Combined radium-226 and radium-228:** 5 pCi/L\n• **Gross alpha** (excluding radon and uranium): 15 pCi/L\n• **Uranium:** 30 µg/L\n• **Beta particle and photon emitters:** 4 millirem per year\n**Radon** has **no final federal MCL**: EPA proposed 300 pCi/L (with a 4,000 pCi/L alternative for states with indoor-air programs) in 1999 and never finalized it.\nRadium behaves like calcium and barium, so **cation exchange softening**, lime softening, reverse osmosis, and hydrous manganese oxide filtration remove it. Uranium is removed by anion exchange, coagulation, or RO. Residuals can concentrate radioactivity, so disposal needs care.",
      rel: ['mcl-list', 'ion-exchange-engineering', 'ro-design'] },
    { id: 'water-reuse', q: 'What is potable water reuse?',
      k: ['water reuse:10', 'reuse:8', 'recycled water:10', 'reclaimed water:10', 'potable reuse:10', 'direct potable reuse:10', 'dpr:10', 'indirect potable reuse:10', 'toilet to tap:10', 'purple pipe:10', 'groundwater replenishment:10', 'water recycling:10'],
      a: "**Water reuse** treats wastewater for another use:\n• **Non-potable reuse:** irrigation, cooling, and industry through separate **purple pipe** systems\n• **Indirect potable reuse (IPR):** purified water goes into an aquifer or reservoir before it's drawn for drinking. Orange County, California's **Groundwater Replenishment System** (since 2008) is the world's largest, at **130 MGD** since its 2023 expansion.\n• **Direct potable reuse (DPR):** purified water goes straight to a drinking water plant or distribution system. **Big Spring, Texas** (2013) was the first U.S. DPR system; **Colorado** adopted the first state DPR rules in January 2023, and **California's** took effect **October 1, 2024**.\nPotable reuse uses **multiple barriers**, typically MF/UF, then reverse osmosis, then UV advanced oxidation, with continuous monitoring and large pathogen log-removal requirements.",
      rel: ['advanced-oxidation', 'ro-design', 'multi-barrier'] },
    { id: 'multi-barrier', q: 'What is the multiple-barrier approach?',
      k: ['multiple barrier*:10', 'multi barrier:10', 'multibarrier:10', 'barrier approach:10', 'source to tap:10', 'layers of protection:9', 'defense in depth:9'],
      a: "The **multiple-barrier approach** means no single step is trusted to protect public health; each barrier covers for another's failure:\n1. **Source protection** (wellhead and watershed protection)\n2. **Treatment** matched to the source (coagulation, filtration, and so on)\n3. **Disinfection** with enough CT\n4. A **residual** and an intact **distribution system** (pressure, cross-connection control, tank security)\n5. **Monitoring** and quick response when something changes\n6. **Trained, honest operators**\nThe big outbreaks, from Milwaukee (1993) to Walkerton (2000), happened when several barriers failed at once.",
      rel: ['outbreaks', 'log-credits', 'wellhead-protection'] },
    { id: 'taste-odor', q: 'What causes earthy or musty tastes and odors?',
      k: ['taste and odor:10', 'geosmin:10', 'mib:10', '2 mib:10', 'methylisoborneol:10', 'earthy musty:10', 'earthy taste:10', 'earthy:8', 'musty:8', 'musty taste:10', 'odor threshold:10', 'fishy odor:10', 'fishy taste:10', 'medicinal taste:10', 'swimming pool smell:9'],
      a: "Common drinking water tastes and odors, and their usual causes:\n• **Earthy or musty:** **geosmin** and **2-MIB**, made by cyanobacteria and actinomycetes. People can smell them at around **5–10 ng/L** (parts per trillion). They're harmless, but conventional treatment and chlorine don't remove them; **powdered activated carbon**, GAC, ozone, or advanced oxidation do.\n• **Chlorinous or swimming-pool smell:** often **dichloramine** or high chlorine doses rather than free chlorine itself; check the chlorine-to-ammonia ratio.\n• **Medicinal:** chlorophenols (chlorine plus phenol) or dichloramine.\n• **Fishy or grassy:** certain algae blooms.\n• **Rotten egg:** hydrogen sulfide from wells or water heaters.\n• **Metallic or bitter:** iron, manganese, copper, or low-pH corrosion.\nTrack complaints by location and time; they're an early warning system.",
      rel: ['activated-carbon', 'harmful-algal-blooms', 'hydrogen-sulfide'] },
    { id: 'firm-capacity', q: 'What is firm capacity?',
      k: ['firm capacity:10', 'firm pumping capacity:10', 'largest pump out of service:10', 'largest well out of service:10', 'redundancy requirement*:10', 'design capacity:9', 'plant capacity:9', 'well capacity:8', 'source capacity:9'],
      a: "**Firm capacity** is what a system can deliver with its **largest unit out of service**. Design standards are built around it:\n• **Wells:** the Ten States Standards call for total source capacity that meets the **design maximum day demand with the largest well out of service**.\n• **Pump stations:** at least **two pumps**, sized so the station still meets its design demand with any one pump down.\n• **Treatment plants:** sized for maximum day demand, with enough duplicate units (filters, chemical feeders) to keep running during maintenance.\nWhy it matters: a town with two wells that each meet average demand looks fine on paper, until one fails on a hot July weekend. Backup power for critical wells and pumps is part of the same thinking.",
      rel: ['demand-allocation', 'storage-sizing', 'emergency-plan'] }
  );

  /* ================= DISTRIBUTION & ASSET MANAGEMENT ================= */
  X.push(
    { id: 'asset-management', q: 'What is asset management for a water system?',
      k: ['asset management:10', 'asset inventory:10', 'capital improvement plan*:10', 'cip plan:9', 'renewal plan*:9', 'replacement plan*:9', 'condition assessment:10', 'likelihood of failure:10', 'consequence of failure:10', 'business risk exposure:10', 'five core questions:10', 'useful life:9', 'service life:9'],
      a: "**Asset management** is running a utility so it keeps delivering the service customers want at the lowest life-cycle cost. EPA frames it as **five core questions**:\n1. What is the **current state** of my assets (what do I own, where, what condition, how old)?\n2. What **level of service** do customers and regulators require?\n3. Which assets are **critical** to sustained performance?\n4. What are my best **minimum life-cycle cost** strategies (maintain, rehab, or replace)?\n5. What is my best **long-term funding** strategy?\nRisk is usually scored as **likelihood of failure × consequence of failure**, and the highest-risk assets go first in the capital plan.\nA reality check: replacing **1% of your pipe a year** means a **100-year** replacement cycle, longer than many pipes last.",
      rel: ['main-break-stats', 'criticality', 'rate-setting'] },
    { id: 'main-break-stats', q: 'How often do water mains break?',
      k: ['main break rate*:10', 'break rate*:10', 'how often do mains break:10', 'water main break stat*:10', 'utah state:9', 'aging infrastructure:10', 'aging pipes:10', 'infrastructure report card:10', 'asce report card:10', 'asce:8', 'buried no longer:10', 'infrastructure grade:10'],
      a: "The largest recent study, **Utah State University's** survey of more than 800 utilities and about 400,000 miles of pipe (completed December 2023), estimated about **260,000 water main breaks a year** in the U.S. and Canada.\n• **PVC** had the **lowest** break rate and **cast iron** the **highest**.\n• Soil matters hugely: cast iron in highly corrosive soil broke **more than 20 times** as often as in low-corrosion soil.\n• The study put the funding gap for replacing critical mains at about **$452 billion**.\nOn **ASCE's 2025 Infrastructure Report Card**, drinking water got a **C−**, wastewater a **D+**, and stormwater a **D**, all unchanged from 2021.",
      more: "Break-rate benchmarks help a utility plan: track breaks per 100 miles per year by material, size, age, and soil, and watch for mains with repeated breaks, since each break raises the odds of the next. Winter cold snaps and sudden pressure changes set off clusters of breaks.",
      rel: ['asset-management', 'main-breaks', 'external-corrosion'] },
    { id: 'awwa-standards', q: 'What are the key AWWA standards?',
      k: ['awwa standard*:10', 'awwa c:9', 'c900:6', 'c151:10', 'c600:10', 'c605:10', 'c509:10', 'c515:10', 'c502:10', 'c105:10', 'c104:10', 'd100:10', 'awwa manual*:10', 'm series:8'],
      a: "AWWA publishes the consensus standards most specifications cite. The ones operators meet most:\n• **Pipe:** **C151** ductile iron (with **C104** cement-mortar lining and **C105** polyethylene encasement), **C900** PVC, **C906** HDPE, **C200** steel, **C300-series** concrete pressure pipe (C301 is PCCP)\n• **Installation:** **C600** ductile iron, **C605** PVC\n• **Disinfection:** **C651** water mains, **C652** storage tanks, **C653** treatment plants, **C654** wells\n• **Valves and hydrants:** **C509** and **C515** gate valves, **C504** butterfly valves, **C502** dry-barrel hydrants, **C510** and **C511** backflow assemblies\n• **Tanks:** **D100** welded steel, **D102** coating steel tanks, **D103** bolted steel, **D110** and **D115** prestressed concrete\n• **Manuals:** M22 (service lines and meters), M28 (main rehabilitation), M32 (modeling), M36 (water audits), M42 (steel tanks)\nNSF/ANSI/CAN **61** certifies that anything touching drinking water is safe, and **372** covers lead-free content.",
      rel: ['pipe-ratings', 'pipe-materials', 'main-disinfection'] },
    { id: 'pipe-ratings', q: 'What do pipe pressure classes and DR ratings mean?',
      k: ['pressure class:10', 'dimension ratio:10', 'dr 18:10', 'dr18:10', 'dr 14:10', 'dr14:10', 'dr 25:10', 'dr 11:10', 'sdr:10', 'pressure rating:10', 'pipe rating*:10', 'c900:10', 'pipe thickness:9', 'working pressure:8'],
      a: "**Dimension ratio (DR)** = outside diameter ÷ wall thickness, so a **lower DR means a thicker, stronger** pipe.\n• **AWWA C900 PVC** (since the 2016 edition): **DR25 = 165 psi**, **DR18 = 235 psi**, **DR14 = 305 psi** pressure class, at 73°F. PVC loses strength as it warms, so ratings are derated above that temperature.\n• **HDPE (PE4710)**: **DR11 = 200 psi**, DR9 = 250 psi; it's fused into a continuous, leak-free line and is flexible, but needs special fittings and handles surge differently.\n• **Ductile iron (C150/C151)**: pressure classes **150 to 350 psi**; thickness also covers external loads.\nPick the class for **working pressure plus surge**, and check depth of cover, traffic loads, and permeation (plastic pipe should not go through soil contaminated with gasoline or solvents).",
      rel: ['awwa-standards', 'pipe-materials', 'surge-analysis'] },
    { id: 'pccp', q: 'Why does PCCP fail?',
      k: ['pccp:10', 'prestressed concrete cylinder pipe:10', 'prestressed concrete:9', 'wire break*:10', 'prestressing wire*:10', 'acoustic fiber optic:10', 'pipe wall monitoring:10', 'large diameter main*:9', 'transmission main failure*:10'],
      a: "**Prestressed concrete cylinder pipe (PCCP)** is common in large transmission mains (usually 16 inches and larger). Its strength comes from high-strength **prestressing wire** wrapped around a concrete core with a steel cylinder, protected by a mortar coating.\nWhen the mortar cracks, corrosion (or hydrogen embrittlement in some older wire) breaks wires one by one. The pipe holds until enough wires fail, then it can **rupture suddenly and catastrophically**.\nUtilities manage it with **electromagnetic inspection** (counting broken-wire zones), **acoustic fiber-optic monitoring** (hearing wires snap in real time), transient control, and targeted repair or replacement of the worst sections, often by sliplining or carbon-fiber lining.",
      rel: ['main-break-stats', 'trenchless', 'surge-analysis'] },
    { id: 'external-corrosion', q: 'What causes external pipe corrosion?',
      k: ['external corrosion:10', 'soil corrosion:10', 'corrosive soil*:10', 'soil corrosivity:10', 'polyethylene encasement:10', 'poly wrap:10', 'polywrap:10', 'stray current*:10', 'galvanic corrosion:9', 'ten point soil:10', 'soil resistivity:10'],
      a: "Buried metal pipe corrodes where the soil acts as an electrolyte: **low resistivity** (wet, salty, clay soils), low pH, sulfides and sulfate-reducing bacteria, and poor drainage speed it up.\n• **AWWA C105's 10-point system** scores soil resistivity, pH, redox potential, sulfides, and moisture to decide when ductile iron needs **polyethylene encasement** (a loose plastic wrap that keeps corrosive soil and groundwater from circulating against the pipe).\n• **Galvanic corrosion** happens where different metals touch, like a brass fitting on iron or copper service lines on iron mains, or where new pipe connects to old.\n• **Stray currents** from rail transit, cathodic protection on other lines, or electrical grounding can eat pipe fast.\nFixes: encasement, coatings, insulating joints, **cathodic protection**, and choosing plastic pipe in the worst soils.",
      rel: ['cathodic-protection', 'main-break-stats', 'pipe-materials'] },
    { id: 'cathodic-protection', q: 'How does cathodic protection work?',
      k: ['cathodic protection:10', 'sacrificial anode*:10', 'galvanic anode*:10', 'impressed current:10', 'magnesium anode*:10', 'zinc anode*:10', 'anode*:8', '850 mv:10', 'copper sulfate electrode:10', 'rectifier:9'],
      a: "Corrosion is an electrical current leaving metal. **Cathodic protection (CP)** makes the protected metal the **cathode** by supplying current from elsewhere:\n• **Galvanic (sacrificial) anodes:** magnesium or zinc anodes wired to the pipe or tank corrode instead of it. Simple, no power; good for small or well-coated structures.\n• **Impressed current:** a **rectifier** pushes DC current through long-lasting anodes; used for big structures and bare steel.\nA common acceptance criterion is a pipe-to-soil potential of at least **−850 mV** measured against a **copper/copper-sulfate reference electrode** (with current applied).\nSteel water tanks use it inside the bowl (AWWA **D104** for impressed current, **D106** for sacrificial anodes) to protect the wet interior where coating fails. CP systems need annual checks: anodes get used up and rectifiers fail quietly.",
      rel: ['external-corrosion', 'tank-maintenance', 'tank-standards'] },
    { id: 'tank-standards', q: 'What standards cover water storage tanks?',
      k: ['tank standard*:10', 'tank inspection frequency:10', 'how often inspect tank*:10', 'awwa d100:10', 'awwa m42:10', 'welded steel tank*:10', 'bolted tank*:10', 'composite tank*:10', 'tank coating:9', 'tank painting:10', 'tank recoat*:10', 'dive inspection:10', 'robotic inspection:10', 'tank security:9', 'inspect*:5', 'tank:3'],
      a: "Storage tank types and their AWWA standards: **welded steel** (D100), **bolted steel** (D103), **wire- or strand-wound prestressed concrete** (D110), **tendon-prestressed concrete** (D115); steel tank coatings follow **D102**, and **AWWA Manual M42** covers steel tank care.\nInspection:\n• Many utilities do a full interior and exterior inspection about every **3–5 years**, by draining, divers, or remotely operated vehicles, plus frequent visual checks of hatches, vents, and overflows.\n• Look for coating failure and corrosion, sediment depth, screen and hatch condition, cathodic protection, ladders and fall protection, and signs of birds, insects, or vandalism.\n• Coatings wear out: steel tanks typically need **recoating** every 10–20 years or so, depending on the coating system and conditions.\nAfter any interior work, disinfect under **AWWA C652** and sample before returning it to service.",
      rel: ['tank-maintenance', 'cathodic-protection', 'tank-mixing'] },
    { id: 'valve-exercising', q: 'How should valves be exercised?',
      k: ['valve exercis*:10', 'exercise valve*:10', 'exercising valve*:10', 'valve turns:10', 'how many turns:10', 'number of turns:10', 'valve program:10', 'valve maintenance:10', 'stuck valve*:9', 'broken valve*:9', 'valve key:9'],
      a: "An unexercised valve is a valve that won't work during the emergency when you need it. A good program:\n• **Frequency:** critical valves (large mains, hospitals, tank and plant valves) every year; the rest on a rotating cycle, commonly every **2–5 years**\n• **Full cycles:** close fully and reopen, counting **turns** (a gate valve takes roughly **3 turns per inch of diameter**, plus a few); a short count means debris or a broken stem\n• **Torque:** don't force it; powered exercisers limit torque and log it\n• **Records:** location (GPS), size, turns, direction to open (most open counterclockwise, but not all), condition, and any repairs, tied into GIS so crews and models know which valves work\n• Operate slowly to avoid water hammer and stirring up sediment",
      rel: ['valves', 'criticality', 'water-hammer'] },
    { id: 'water-audit', q: 'How does an AWWA water audit work?',
      k: ['water audit:10', 'awwa m36:10', 'm36:10', 'water balance audit:10', 'real losses:10', 'apparent losses:10', 'infrastructure leakage index:10', 'ili:10', 'uarl:10', 'carl:10', 'non revenue water:10', 'validity score:10', 'data validity:9'],
      a: "The **AWWA M36** method (with AWWA's free audit software) balances every gallon a utility produces:\n**System input volume** = **authorized consumption** (billed and unbilled) + **water losses**\nWater losses split into:\n• **Apparent losses:** paper losses from customer **meter under-registration**, billing and data errors, and theft\n• **Real losses:** physical leakage from mains, service lines, and tank overflows\nKey indicators:\n• **Non-revenue water** = unbilled authorized use + all water losses\n• **Infrastructure Leakage Index (ILI)** = current annual real losses ÷ the **unavoidable** annual real losses, where UARL (gal/day) = (5.41 × miles of main + 0.15 × service connections + 7.5 × miles of private service line) × average pressure (psi)\nAn **ILI near 1** means leakage is about as low as practical; much higher means room to recover water. Each input gets a **validity score**, so improve the data before trusting the numbers.",
      rel: ['water-loss', 'leakage-pressure', 'ami'] },
    { id: 'ami', q: 'What is AMI and how does it help a water system?',
      k: ['advanced metering infrastructure:10', 'smart meter*:10', 'ami:9', 'amr vs ami:10', 'ami vs amr:10', 'leak alert*:10', 'continuous flow alert*:10', 'meter data analytics:10', 'hourly reads:10'],
      a: "**AMR** (automatic meter reading) collects reads by radio from a passing vehicle, usually once a month. **AMI** (advanced metering infrastructure) is a fixed two-way network that sends reads **hourly or more often**.\nWhat AMI makes possible:\n• **Customer leak alerts** (constant flow for 24 hours usually means a running toilet or a leak)\n• **Backflow flags** when a meter records reverse flow\n• Tamper and theft detection, remote shutoff on some meters\n• Better **demand data** for models, water audits, and rate design\n• District metered areas and minimum night flow analysis to spot new leaks\nCosts include the network, meter replacement, data systems, and **cybersecurity**; many utilities pay for it partly with recovered revenue from better meter accuracy.",
      rel: ['customer-meters', 'water-audit', 'meter-sizing'] },
    { id: 'meter-sizing', q: 'How are service lines and meters sized?',
      k: ['meter sizing:10', 'size a meter:10', 'size a water meter:10', 'sizing water meter*:10', 'service line sizing:10', 'size a service line:10', 'fixture unit*:10', 'm22:10', 'oversized meter*:10', 'compound meter sizing:10'],
      a: "**AWWA Manual M22** is the standard reference. The process:\n1. Add up the customer's **fixture units** (or measured demand for big users) and convert to a probable **peak flow**; not every fixture runs at once.\n2. Choose a **service line** size that delivers that peak flow with acceptable pressure loss (street pressure, elevation, meter, backflow preventer, and piping losses all count).\n3. Choose the **meter** for the real range of flows, not just the peak.\nThe common mistake is an **oversized meter**: big meters under-register low flows, so a 2-inch meter on a small business can miss much of its use. Compound meters (a large and a small register) fit customers with both very low and high flows. Fire lines are sized separately, often with detector-check assemblies.",
      rel: ['ami', 'customer-meters', 'network-design'] },
    { id: 'trenchless', q: 'What are trenchless pipe rehabilitation methods?',
      k: ['trenchless:10', 'pipe bursting:10', 'directional drilling:10', 'hdd:10', 'cured in place:10', 'cipp:10', 'sliplining:10', 'slip lining:10', 'pipe lining:10', 'main rehabilitation:10', 'rehab a main:10', 'lining a pipe:10', 'structural class*:9'],
      a: "Trenchless methods renew or install pipe with only small pits instead of a continuous trench:\n• **Pipe bursting:** a bursting head breaks the old pipe outward while pulling in new HDPE or restrained-joint PVC of the same or larger size.\n• **Horizontal directional drilling (HDD):** drills a steerable path under roads, rivers, and yards for new pipe.\n• **Cured-in-place pipe (CIPP):** a resin-soaked liner is inverted or pulled into the old main and cured with hot water, steam, or UV light.\n• **Sliplining:** a smaller pipe is pushed or pulled inside the old one.\n• **Spray-in-place linings** (cement mortar, epoxy, polyurea) stop internal corrosion and tuberculation.\n**AWWA Manual M28** classes linings from **Class I** (non-structural, corrosion protection only) to **Class IV** (fully structural, able to stand alone if the host pipe fails). Any lining touching drinking water must be **NSF/ANSI/CAN 61** certified, and service connections have to be reinstated.",
      rel: ['main-break-stats', 'pccp', 'asset-management'] },
    { id: 'intrusion', q: 'How can contaminants get into a pressurized main?',
      k: ['intrusion:10', 'pathogen intrusion:10', 'low pressure event*:10', 'negative pressure event*:10', 'loss of pressure:9', 'contamination through leaks:10', 'pressure transient contamination:10', 'can dirty water get in:10', 'pressurized main:10', 'get into the main:10', 'get into a main:10', 'pressurized pipe:9'],
      a: "A pressurized main normally leaks **out**, not in. But research has recorded **negative pressure transients** in real distribution systems after pump shutdowns, power failures, and fast valve or hydrant operation. During those moments, groundwater and soil water around leaky joints, cracks, and air valves can be **pulled in**, and that water often lies near sewer lines.\nWhat reduces the risk:\n• Keep positive pressure (**20 psi minimum**) and control **surges**\n• Maintain a **disinfectant residual**, which can inactivate small intrusions\n• Place **air valves** where they can't be flooded, and keep vaults drained\n• Repair leaks promptly and follow **AWWA C651** during breaks and repairs\nThat's why a significant loss of pressure usually triggers a **boil water notice**.",
      rel: ['surge-analysis', 'boil-water', 'distribution-pressure'] },
    { id: 'consecutive-systems', q: 'What is a consecutive water system?',
      k: ['consecutive system*:10', 'wholesale system*:10', 'purchased water:10', 'buy water from:10', 'buying water:9', 'interconnect*:9', 'emergency connection*:10', 'combined distribution system:10', 'water purchase contract:10'],
      a: "A **consecutive system** buys some or all of its finished water from another public water system (the **wholesaler**) and distributes it, sometimes after rechlorinating.\n• The consecutive system is still a public water system with its own obligations: coliform sampling, lead and copper, DBP monitoring (under Stage 2, wholesalers and buyers are grouped into a **combined distribution system** for scheduling), public notice, and a CCR that uses the wholesaler's data.\n• The **purchase contract** should cover the volume and rate, pressure and quality at the master meter, emergencies, and cost increases.\n• **Emergency interconnections** with neighboring systems are cheap insurance against a failed well or plant; check that the pressures, disinfectants (chlorine versus chloramine), and water chemistries are compatible before you need one.",
      rel: ['booster-chlorination', 'rules-overview', 'emergency-plan'] }
  );

  /* ================= WATER CHEMISTRY & SCIENCE ================= */
  X.push(
    { id: 'water-molecule', q: 'What makes the water molecule so unusual?',
      k: ['water molecule:10', 'h2o molecule:10', 'molecule of water:10', 'hydrogen bond*:10', 'polar molecule:10', 'polarity:9', 'polar:8', 'bond angle:10', '104 5:10', 'dipole:9', 'universal solvent:10', 'why is water special:10', 'why ice floats:10', 'ice floats:10'],
      a: "A water molecule is one oxygen bonded to two hydrogens at an angle of about **104.5°**. Oxygen pulls the shared electrons toward itself, so the molecule is **polar**: slightly negative at the oxygen, slightly positive at the hydrogens (a dipole moment of about 1.85 debye).\nThat polarity lets each molecule form up to **four hydrogen bonds** with its neighbors, which explains water's odd behavior:\n• **Ice floats:** hydrogen bonds lock ice into an open hexagonal lattice about **9% less dense** than liquid water.\n• **High boiling point and heat capacity** for such a small molecule, which moderates climate and body temperature.\n• **High surface tension**, capillary action, and cohesion (how water climbs through plants).\n• It's the **\"universal solvent\"**: it dissolves salts and polar molecules readily, which is also why pure water doesn't stay pure.",
      more: "About 1 hydrogen atom in 6,400 in natural water is **deuterium**. **Heavy water** (D₂O) is about 11% denser than ordinary water (about 1.11 g/cm³) and is used to moderate some nuclear reactors. Water's isotopes (²H, ¹⁸O, and radioactive ³H, tritium) are also how hydrologists trace where groundwater came from and how old it is.",
      rel: ['water-properties', 'ph-kw', 'groundwater-age'] },
    { id: 'water-properties', q: 'What are the physical properties of water?',
      k: ['properties of water:10', 'water properties:10', 'physical properties:9', 'density of water:10', 'water density:10', 'maximum density:10', 'specific heat:10', 'heat capacity:9', 'latent heat:10', 'heat of vaporization:10', 'surface tension:10', 'boiling point:10', 'freezing point:9', 'triple point:10', 'critical point:9', 'dielectric constant:10', 'densest:10', 'most dense:10', 'dense:6'],
      a: "Key numbers for pure water:\n• **Density:** maximum of about **1.000 g/cm³ at 3.98°C (39.2°F)**; 62.4 lb/ft³ and **8.34 lb/gal** at ordinary temperatures. Ice is about **0.917 g/cm³**.\n• **Specific heat:** **4.184 J/g·°C** (1 BTU per pound per °F), one of the highest of any common substance\n• **Heat of vaporization:** about **2,257 J/g** at 100°C; **heat of fusion:** about **334 J/g**\n• **Surface tension:** about **72.8 mN/m** at 20°C\n• **Dielectric constant:** about **80** at room temperature, which is why it dissolves salts so well\n• **Triple point:** 0.01°C at 611.657 Pa; **critical point:** 373.946°C and 22.064 MPa\n• **Boiling point** drops with altitude, to about **202°F** in Denver. That's why CDC advises boiling water **3 minutes** above 6,500 feet instead of 1.",
      rel: ['water-molecule', 'dissolved-oxygen', 'reynolds-number'] },
    { id: 'ph-kw', q: 'Why is neutral pH not always 7?',
      k: ['kw:9', 'ion product:10', 'autoionization:10', 'self ionization:10', 'neutral ph temperature:10', 'ph and temperature:10', 'ph of pure water:10', 'hydronium:10', 'pure water ph:10', 'rain ph:10', 'rainwater ph:10', 'ph of rain*:10', 'acid rain:10'],
      a: "Water splits slightly into hydrogen (hydronium) and hydroxide ions: **Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25°C**, so neutral pH is **7.0** only at 25°C.\n• Kw grows with temperature, so neutral pH is about **7.47 at 0°C** and about **6.1 at 100°C**. Hot water isn't acidic; it's just neutral at a lower pH.\n• pH is logarithmic: pH 6 has **10 times** the hydrogen ion activity of pH 7.\n• **Pure water exposed to air** absorbs carbon dioxide and settles near **pH 5.6**, which is why unpolluted rain is slightly acidic; **acid rain** means pH below about 5.6, from sulfur and nitrogen oxides.\n• Very pure water (RO, distilled) has almost no buffering, so its pH readings drift and it's aggressive to pipes.",
      rel: ['ph', 'carbonate-system', 'alkalinity'] },
    { id: 'carbonate-system', q: 'How does the carbonate system control pH?',
      k: ['carbonate system:10', 'carbonate equilibrium:10', 'carbonic acid:10', 'dissolved inorganic carbon:10', 'dic:9', 'pka:9', 'buffer capacity:10', 'bicarbonate equilibrium:10', 'co2 and ph:10', 'carbon dioxide and ph:10'],
      a: "Most natural water chemistry runs on the **carbonate system**:\nCO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ ⇌ 2H⁺ + CO₃²⁻\n• **pKa₁ ≈ 6.35** and **pKa₂ ≈ 10.33** at 25°C. Below pH 6.35, dissolved CO₂ dominates; between the two, **bicarbonate** dominates (most drinking water); above 10.33, **carbonate** dominates.\n• **Alkalinity** ≈ [HCO₃⁻] + 2[CO₃²⁻] + [OH⁻] − [H⁺], reported as mg/L as CaCO₃ (**50 mg/L as CaCO₃ = 1 meq/L**).\n• **Buffer capacity** is greatest near the pKa values, so bicarbonate water resists pH change around 6.3.\nPractical results: **aerating** well water strips CO₂ and **raises pH** without changing alkalinity; adding **CO₂** lowers pH (recarbonation after softening); and corrosion control is really about managing pH and **dissolved inorganic carbon (DIC)** together.",
      rel: ['alkalinity', 'lsi-indices', 'lead-corrosion-chem'] },
    { id: 'lsi-indices', q: 'How do you calculate the Langelier Saturation Index?',
      k: ['langelier:10', 'langelier saturation index:10', 'lsi:10', 'saturation index:10', 'ryznar:10', 'rsi:9', 'ccpp:10', 'calcium carbonate precipitation potential:10', 'phs:10', 'scale forming:10', 'scaling or corrosive:10', 'calculate lsi:10'],
      a: "The **Langelier Saturation Index** compares a water's pH with **pHs**, the pH at which it would be exactly saturated with calcium carbonate: **LSI = pH − pHs**.\n**pHs = (9.3 + A + B) − (C + D)**, where\n• A = (log₁₀ TDS − 1) ÷ 10 (TDS in mg/L)\n• B = −13.12 × log₁₀(°C + 273) + 34.55\n• C = log₁₀(calcium hardness as CaCO₃) − 0.4\n• D = log₁₀(alkalinity as CaCO₃)\n**LSI above 0** tends to deposit scale; **below 0** tends to dissolve calcium carbonate (aggressive). The **Ryznar Index** (RSI = 2pHs − pH) reads the other way: below about 6 scaling, above about 7 increasingly corrosive.\nLSI only predicts calcium carbonate behavior, not lead release; **CCPP** (calcium carbonate precipitation potential, in mg/L) gives a quantity and is better for design. Ask me **“lsi pH 7.8 temp 20 C calcium 120 alkalinity 100 tds 300.”**",
      rel: ['corrosion-control', 'carbonate-system', 'lead-corrosion-chem'] },
    { id: 'redox-sequence', q: 'Why does deep groundwater have iron, sulfide, and methane?',
      k: ['redox:10', 'oxidation reduction:10', 'orp:9', 'oxidation reduction potential:10', 'reducing conditions:10', 'anoxic groundwater:10', 'methane in water:10', 'methane in well*:10', 'methane:9', 'electron acceptor*:10', 'redox ladder:10', 'redox sequence:10'],
      a: "Microbes in an aquifer burn organic carbon using whatever **electron acceptor** gives the most energy, in a predictable order (the **redox ladder**):\n1. **Oxygen** is used up first\n2. then **nitrate** (denitrification)\n3. then **manganese oxides**: dissolved **Mn²⁺** appears\n4. then **iron oxides**: dissolved **Fe²⁺** appears\n5. then **sulfate**: **hydrogen sulfide** forms (rotten-egg odor)\n6. finally **CO₂** itself: **methane** forms\nSo as water travels deeper and longer through sediments rich in organic matter, it goes from oxygenated and nitrate-bearing to iron-, sulfide-, and sometimes methane-bearing. It explains why shallow wells get nitrate while deeper wells get iron and H₂S, and why Delta alluvial water is so high in iron. **ORP** (oxidation-reduction potential, in mV) is a quick field measure of where water sits on the ladder. Methane in well water is a real explosion hazard in enclosed well houses, so vent it.",
      rel: ['iron-manganese', 'hydrogen-sulfide', 'fe-mn-treatment'] },
    { id: 'dissolved-oxygen', q: 'How much oxygen can water hold?',
      k: ['dissolved oxygen:10', 'do saturation:10', 'oxygen saturation:10', 'oxygen solubility:10', 'henry s law:10', 'henrys law:10', 'gas solubility:10', 'how much oxygen:9', 'fish kill*:9', 'oxygen in water:10'],
      a: "Oxygen solubility falls as water warms. Saturation in fresh water at sea level is about:\n• **14.6 mg/L at 0°C** (32°F)\n• **11.3 mg/L at 10°C**\n• **9.1 mg/L at 20°C**\n• **8.3 mg/L at 25°C**\n• **7.6 mg/L at 30°C** (86°F)\nIt's also lower at altitude and in salty water. **Henry's law** says a gas dissolves in proportion to its partial pressure above the water; the same law governs stripping CO₂, H₂S, radon, and VOCs in aerators.\nMost fish need roughly **5 mg/L or more**; below about **2 mg/L** is hypoxic. Summer fish kills in Mississippi ponds usually happen on hot, still, cloudy nights, when algae stop making oxygen but keep using it.",
      rel: ['aeration', 'gulf-hypoxia', 'activated-sludge'] },
    { id: 'ec-tds', q: 'How do you estimate TDS from conductivity?',
      k: ['tds from conductivity:10', 'conductivity to tds:10', 'specific conductance:10', 'electrical conductivity:10', 'ec to tds:10', 'ionic strength:10', 'microsiemens:10', 'us cm:9', 'tds factor:10'],
      a: "Dissolved ions carry electric current, so **specific conductance** (EC, in µS/cm at 25°C) tracks dissolved solids:\n**TDS (mg/L) ≈ k × EC**, with **k usually 0.55–0.75** (0.64 is a common default). The factor depends on which ions are present, so calibrate it against lab TDS for each source.\n**Ionic strength** (I), needed for activity corrections in chemistry calculations like the LSI, is roughly **2.5 × 10⁻⁵ × TDS** (mg/L).\nConductivity is a cheap, continuous way to spot a change in source water: saltwater intrusion, a different well coming online, or a blend change.",
      rel: ['tds', 'ion-balance', 'lsi-indices'] },
    { id: 'ion-balance', q: 'How do you check a water analysis with an ion balance?',
      k: ['ion balance:10', 'cation anion balance:10', 'charge balance:10', 'anion cation:9', 'meq l:10', 'milliequivalent*:10', 'check a lab report:9', 'water analysis check:10', 'as caco3:9'],
      a: "Water is electrically neutral, so the **sum of cations must equal the sum of anions** in milliequivalents per liter (meq/L = mg/L ÷ equivalent weight).\n• Cations: calcium (mg/L ÷ 20.04), magnesium (÷ 12.15), sodium (÷ 22.99), potassium (÷ 39.10)\n• Anions: bicarbonate (÷ 61.02), sulfate (÷ 48.03), chloride (÷ 35.45), nitrate (÷ 62.00)\n**Percent difference = 100 × (Σcations − Σanions) ÷ (Σcations + Σanions)**. Standard Methods' acceptance limits are about **±0.2 meq/L** for anion sums up to 3 meq/L, **±2%** from 3 to 10 meq/L, and **±5%** above that.\nA big imbalance means a lab error, a missed major ion, or a sample problem. Hardness and alkalinity are reported **as CaCO₃**: divide by 50 to get meq/L.",
      rel: ['ec-tds', 'hardness', 'alkalinity'] },
    { id: 'chromium-6', q: 'What is hexavalent chromium and is it regulated?',
      k: ['hexavalent chromium:10', 'chromium 6:10', 'chromium-6:10', 'chromium vi:10', 'cr6:10', 'erin brockovich:10', 'chromium:8', 'total chromium:10'],
      a: "Chromium in water comes in two main forms: **trivalent** chromium (Cr III), a trace nutrient, and **hexavalent** chromium (**Cr VI**), a known carcinogen when inhaled and linked to cancer in animals when swallowed. It comes from industry (plating, pigments, cooling towers) and also occurs naturally in some aquifers.\n• **Federal:** EPA regulates **total chromium** at **0.1 mg/L** (100 µg/L); there's no separate federal Cr VI MCL.\n• **California** adopted a **10 µg/L** MCL for Cr VI in April 2024, effective **October 1, 2024**, with compliance phased in by system size starting in 2026.\nCr VI was the contaminant in the **Hinkley, California** case made famous by *Erin Brockovich*. Treatment: reduce it to Cr III and filter it out (reduction–coagulation–filtration), strong-base anion exchange, or reverse osmosis.",
      rel: ['emerging-contaminants', 'ion-exchange-engineering', 'mcl-list'] },
    { id: 'manganese-health', q: 'Is manganese in water a health risk?',
      k: ['manganese health:10', 'manganese health advisory:10', 'is manganese safe:10', 'manganese safe:9', 'manganese infants:10', 'manganese baby formula:10', 'manganese neurotoxic*:10', 'manganese limit:9'],
      a: "Manganese is an essential nutrient, but too much can affect the nervous system, and infants are the most sensitive.\n• EPA's **secondary standard** is **0.05 mg/L**, for black staining and taste, not health.\n• EPA's **lifetime health advisory** is **0.3 mg/L**, with a **1-day and 10-day** advisory of **1 mg/L**; EPA advises that infants under 6 months not drink water above 0.3 mg/L for more than 10 days, including in formula.\n• **Health Canada** set a **maximum acceptable concentration of 0.12 mg/L** (2019), plus an aesthetic objective of 0.02.\n• EPA monitored manganese nationally under **UCMR 4**.\nIn Mississippi, some groundwater has naturally high manganese, so systems treat for it (permanganate, catalytic media, or biological filters) or blend sources.",
      rel: ['fe-mn-treatment', 'iron-manganese', 'ucmr'] },
    { id: 'sodium-sulfate', q: 'Are sodium, sulfate, or chloride in water a problem?',
      k: ['sodium:9', 'sodium in water:10', 'low sodium diet:10', 'salt in water:9', 'sulfate:9', 'sulfate in water:10', 'laxative:10', 'chloride:8', 'salty water:9', 'softened water sodium:10'],
      a: "None of the three has a primary MCL, but each has guidance:\n• **Sodium:** EPA recommends no more than **20 mg/L** for people on a **500 mg/day** sodium-restricted diet (a physician-directed limit), and **30–60 mg/L** as a taste-based advisory. Water softened by ion exchange picks up sodium: roughly **8 mg/L** of sodium for every grain per gallon of hardness removed, so drinking taps are often left unsoftened.\n• **Sulfate:** secondary standard **250 mg/L** (taste); EPA's health advisory of **500 mg/L** addresses a **laxative effect**, most noticeable in infants and in visitors who aren't used to the water.\n• **Chloride:** secondary standard **250 mg/L** (salty taste); it also speeds corrosion of metals.\nHigh sodium and chloride together in a Mississippi coastal well can be an early sign of **saltwater intrusion**.",
      rel: ['secondary-standards', 'saltwater-intrusion', 'ion-exchange'] },
    { id: 'emerging-contaminants', q: 'What are emerging contaminants?',
      k: ['emerging contaminant*:10', 'contaminants of emerging concern:10', 'cec*:8', 'pharmaceutical*:10', 'drugs in water:10', 'drugs:9', 'personal care products:10', 'ppcp*:10', '1 4 dioxane:10', 'dioxane:9', '6ppd:10', 'tire chemical*:9', 'endocrine disruptor*:10', 'hormones in water:10'],
      a: "**Emerging contaminants** are substances found in water that aren't regulated yet, or whose risks are still being worked out:\n• **PFAS** (now partly regulated), **1,4-dioxane** (a solvent stabilizer; EPA's one-in-a-million cancer risk level is **0.35 µg/L**), and **perchlorate**\n• **Pharmaceuticals and personal care products**: found in some rivers and wastewater at nanograms per liter, far below medical doses; WHO has judged the risk from drinking water to be very low, but studies continue\n• **Endocrine disruptors** such as some hormones and industrial chemicals\n• **Cyanotoxins**, **microplastics**, and **6PPD-quinone** (from a tire rubber additive, highly toxic to coho salmon)\n• Microbes like **Legionella** and **Naegleria** in warm plumbing\nEPA's **Contaminant Candidate List** (CCL 5, finalized in 2022) and **UCMR** monitoring are how these move toward regulation.",
      rel: ['ccl', 'pfas-chemistry', 'ucmr'] },
    { id: 'pfas-chemistry', q: 'Why are PFAS called forever chemicals?',
      k: ['forever chemical*:10', 'why pfas last:10', 'why is pfas persistent:10', 'carbon fluorine bond:10', 'c f bond:10', 'pfas chemistry:10', 'pfas structure:10', 'short chain:9', 'long chain:9', 'genx:10', 'hfpo da:10', 'pfas precursor*:10', 'afff:10', 'firefighting foam:10', 'where does pfas come from:10', 'pfas sources:10'],
      a: "**PFAS** (per- and polyfluoroalkyl substances) are a family of thousands of human-made chemicals built on chains of carbon atoms fully or partly surrounded by **fluorine**. The **carbon–fluorine bond** (about 485 kJ/mol) is among the strongest in organic chemistry, so natural processes barely break PFAS down: hence \"**forever chemicals**.\"\n• **Long-chain** PFAS (PFOA with 8 carbons, PFOS) build up in people and wildlife and last years in the body; major U.S. manufacturers phased them out between 2002 and 2015.\n• Replacements like **GenX** (HFPO-DA) and **short-chain** PFAS are less bioaccumulative but more mobile in water and harder to remove.\n• **Precursors** can transform into PFOA and PFOS in the environment.\nMajor sources: **firefighting foam (AFFF)** at airports and military bases, manufacturing sites, landfills, biosolids, and wastewater.",
      rel: ['pfas', 'pfas-treatment', 'gac-engineering'] },
    { id: 'analytical-methods', q: 'How do labs measure contaminants at such low levels?',
      k: ['analytical method*:10', 'lab method*:9', 'epa method*:10', 'icp ms:10', 'icp-ms:10', 'lc ms ms:10', 'gc ms:10', 'mass spectrometry:10', 'method detection limit:10', 'mdl:9', 'reporting limit:10', 'mrl:9', 'holding time*:10', 'sample preservation:10', 'method 533:10', 'method 537:10', 'measure pfas:10', 'test for pfas:10', 'pfas testing:10', 'labs measure:10', 'how do labs:10'],
      a: "Drinking water labs use EPA-approved methods:\n• **Metals:** ICP-MS (EPA **200.8**) down to fractions of a µg/L\n• **Anions** (nitrate, fluoride, sulfate, chloride): ion chromatography (EPA **300.0/300.1**)\n• **Volatile organics:** purge-and-trap GC/MS (EPA **524.2**)\n• **PFAS:** LC-MS/MS by EPA **533** and **537.1**; EPA Method **1633** covers wastewater, surface water, soil, and biosolids\n• **Chlorine residual:** DPD colorimetric or amperometric titration\nTerms: the **method detection limit (MDL)** is the lowest concentration reliably distinguished from zero; the **minimum reporting level (MRL)** is the lowest a lab reports with confidence.\nSampling rules count as much as the instrument: **total coliform** samples must be analyzed within **30 hours**; metals are preserved with nitric acid to pH below 2 and hold up to **6 months** (mercury **28 days**). Use the right bottle, preservative, and cooler, and keep chain of custody.",
      rel: ['lab-tests', 'ucmr5', 'units-concentration'] },
    { id: 'units-concentration', q: 'What do ppm, ppb, and ppt really mean?',
      k: ['ppm:9', 'ppb:10', 'ppt:10', 'parts per million:9', 'parts per billion:10', 'parts per trillion:10', 'mg l vs ppm:10', 'ug l:9', 'ng l:9', 'micrograms per liter:10', 'nanograms per liter:10', 'how small is a ppt:10'],
      a: "In dilute water, concentration units line up neatly because a liter of water weighs about a kilogram:\n• **1 mg/L ≈ 1 part per million (ppm)**: about 1 ounce in 7,500 gallons\n• **1 µg/L ≈ 1 part per billion (ppb)**: one-thousandth of a ppm. Lead's action level (15 ppb) and arsenic's MCL (10 ppb) are here.\n• **1 ng/L ≈ 1 part per trillion (ppt)**: one-millionth of a ppm. PFOA and PFOS (4.0 ppt) are here; one drop in about **20 Olympic swimming pools** is roughly 1 ppt.\nConversions: **1 grain per gallon = 17.1 mg/L**; **1 meq/L = 50 mg/L as CaCO₃**. For the pounds formula, 1 mg/L in 1 million gallons weighs **8.34 lb**.",
      rel: ['conversions', 'analytical-methods', 'pounds-formula'] },
    { id: 'lead-corrosion-chem', q: 'What is the chemistry behind lead release?',
      k: ['lead corrosion chemistry:10', 'lead release:10', 'lead solubility:10', 'lead scale*:10', 'orthophosphate dose:10', 'phosphate inhibitor*:9', 'csmr:10', 'chloride to sulfate:10', 'galvanic lead:10', 'partial lead service line replacement:10', 'partial replacement:9', 'washington dc lead:10', 'washington dc:10', 'flint:9', 'flint water crisis:10'],
      a: "Lead gets into water from **lead service lines, lead solder, and brass fixtures**. Utilities control it by building and protecting **scales** on the pipe wall:\n• **pH and dissolved inorganic carbon:** higher, stable pH with enough DIC lowers lead carbonate solubility.\n• **Orthophosphate** (commonly around 1–3 mg/L as PO₄) forms very insoluble lead phosphate scales. It has to be fed continuously; stopping it lets scales dissolve.\n• **Oxidant changes** matter: high free chlorine can form lead(IV) oxide scale, and switching to chloramine can dissolve it. That happened in **Washington, D.C.** after its 2000 switch, with high lead from 2001 to 2004.\n• A high **chloride-to-sulfate mass ratio** is linked to more galvanic corrosion where lead solder or lead pipe meets copper.\n• **Partial lead service line replacement** can raise lead short term by disturbing scale and creating galvanic joints; full replacement is the goal under LCRI.\n**Flint** switched to Flint River water in April 2014 without corrosion control treatment; the corrosive water released lead, and the city went back to Detroit's water in October 2015.",
      rel: ['lead-copper', 'corrosion-control', 'lsl-inventory'] }
  );

  /* ================= MICROBIOLOGY ================= */
  X.push(
    { id: 'cryptosporidium', q: 'Why is Cryptosporidium so hard to control?',
      k: ['cryptosporidium:10', 'crypto:9', 'oocyst*:10', 'cryptosporidiosis:10', 'chlorine resistant:10', 'chlorine resistant parasite:10'],
      a: "*Cryptosporidium* is a protozoan parasite spread by fecal contamination from people, calves, and other animals. It's hard to control because:\n• Its **oocysts** have a tough shell that makes them **extremely resistant to chlorine**; normal chlorine doses barely touch them.\n• They're tiny, about **4–6 µm**, so filtration must be well run (low turbidity, good coagulation) to catch them.\n• The infectious dose is **low** (as few as about 10 oocysts), and oocysts survive for months in cool water.\nThe illness, **cryptosporidiosis**, is watery diarrhea for one to two weeks, and it can be life-threatening for people with weak immune systems. **Milwaukee's 1993 outbreak** sickened about **403,000 people** and killed at least 69.\nControls: source protection, **optimized filtration** (it earns Crypto removal credit), and **UV** or **ozone**, which do inactivate it. Crypto is also the leading cause of outbreaks tied to **swimming pools and water parks**, because it survives pool chlorine.",
      rel: ['lt2-bins', 'uv-dose', 'giardia'] },
    { id: 'giardia', q: 'What is Giardia?',
      k: ['giardia:10', 'giardiasis:10', 'beaver fever:10', 'giardia cyst*:10', 'giardia lamblia:10', 'intestinalis:10'],
      a: "*Giardia* (*G. duodenalis*, also called *G. lamblia* or *G. intestinalis*) is a protozoan parasite and one of the most common intestinal parasites in the U.S. It spreads through fecal contamination; beavers, muskrats, dogs, and people all carry it, hence the nickname **\"beaver fever.\"**\n• **Cysts** are about **8–12 µm** long, larger than Crypto, so good filtration removes them well.\n• They're more resistant to chlorine than bacteria and viruses but far less than Crypto, so **CT** can inactivate them.\n• Symptoms: diarrhea, cramps, bloating, and fatigue, starting 1–2 weeks after exposure, sometimes lasting weeks.\nThe **Surface Water Treatment Rule (1989)** requires **3-log (99.9%)** Giardia removal and inactivation, and the CT tables are built around it. Hikers should treat stream water: boil it, or use a filter rated for cysts.",
      rel: ['log-credits', 'ct-calc', 'cryptosporidium'] },
    { id: 'legionella', q: 'How does Legionella grow in water systems?',
      k: ['legionella:10', 'legionnaires:10', 'legionnaires disease:10', 'pontiac fever:10', 'water management program*:10', 'ashrae 188:10', 'premise plumbing:10', 'building water system*:10', 'cooling tower*:9', 'opportunistic pathogen*:10', 'hot water temperature:9'],
      a: "*Legionella* bacteria live in fresh water naturally, but they cause disease when they **multiply in building water systems** and people **breathe in** contaminated mist from showers, hot tubs, cooling towers, or decorative fountains. (Drinking it normally isn't the route, except for people who aspirate water.)\n• It grows best at about **77–113°F** (25–45°C), in **stagnant** water with **low disinfectant residual**, biofilm, and sediment: hot water heaters set too low, dead legs, little-used wings of buildings.\n• **Legionnaires' disease** is a serious pneumonia; about **1 in 10** people who get it die. Milder **Pontiac fever** is flu-like. The name comes from a **1976 outbreak** at an American Legion convention in Philadelphia.\n• In **Flint**, a 2014–2015 outbreak caused about **90 cases and 12 deaths**, linked to low chlorine after the water source change.\nPrevention: a **water management program** (ASHRAE Standard 188; CMS requires one in healthcare facilities), keeping hot water hot (commonly at least 140°F in heaters) and cold water cold, flushing low-use outlets, and keeping a residual. Utilities help by limiting water age.",
      rel: ['water-age-model', 'biofilm', 'naegleria'] },
    { id: 'naegleria', q: 'What is the brain-eating amoeba?',
      k: ['naegleria:10', 'naegleria fowleri:10', 'brain eating amoeba:10', 'brain-eating:10', 'amoeba:9', 'amoebic meningoencephalitis:10', 'pam:8', 'neti pot*:10', 'sinus rinse:10', 'nasal rinse:10'],
      a: "*Naegleria fowleri* is a heat-loving amoeba in warm fresh water: lakes, rivers, and hot springs in summer, and poorly chlorinated warm water systems. It infects people only when water goes **up the nose**; it travels to the brain and causes **primary amebic meningoencephalitis (PAM)**, which is **more than 97% fatal**. Swallowing it doesn't cause infection.\n• U.S. cases are rare, about **0 to 8 a year**, mostly in southern states after warm freshwater swimming.\n• Tap water cases have happened: **Louisiana** (2011 neti-pot deaths and a 2013 case in St. Bernard Parish) and **Lake Jackson, Texas** (2020).\n• After 2013, Louisiana required public water systems to keep a disinfectant residual of at least **0.5 mg/L** throughout the distribution system.\nPrevention: use **boiled (then cooled), distilled, or sterile water** for sinus rinses, hold your nose or use nose clips in warm fresh water, and utilities keep residuals up and water age down, especially in hot weather.",
      rel: ['legionella', 'chlorine-decay', 'water-age-model'] },
    { id: 'waterborne-viruses', q: 'Which viruses are spread through water?',
      k: ['waterborne virus*:10', 'enteric virus*:10', 'norovirus:10', 'hepatitis a:10', 'rotavirus:10', 'enterovirus*:10', 'virus removal:9', 'viruses in water:10', 'coliphage:9'],
      a: "Enteric viruses come from human feces and spread through sewage-contaminated water and food:\n• **Norovirus:** the leading cause of acute gastroenteritis in the U.S.; extremely contagious and very persistent\n• **Hepatitis A** (liver infection), **rotavirus**, **enteroviruses**, and **adenovirus** (some types cause gastroenteritis)\nThey're tiny (about 20–100 nanometers), so filtration alone doesn't reliably remove them, but most are **easily killed by free chlorine**, which is why rules require **4-log virus** treatment and why CT credit usually comes from chlorine. **Adenovirus** is unusually resistant to UV, which drives UV's high virus dose requirement.\nWells aren't immune: viruses can travel through fractured rock, karst, or short distances to leaking sewers or septic systems, which is why the **Ground Water Rule** exists. **Coliphages** (viruses that infect *E. coli*) are one of its fecal indicators.",
      rel: ['ground-water-rule', 'log-credits', 'fecal-indicators'] },
    { id: 'fecal-indicators', q: 'What are fecal indicator organisms besides E. coli?',
      k: ['fecal indicator*:10', 'enterococci:10', 'enterococcus:10', 'fecal coliform*:10', 'thermotolerant:10', 'recreational water quality criteria:10', 'beach water quality:10', 'beach advisory:10', 'swimming advisory:9', 'microbial source tracking:10', 'human marker*:10', 'hf183:10'],
      a: "Testing for every pathogen is impractical, so labs test for **indicators** that come from feces:\n• **E. coli:** the best fresh water indicator of recent fecal contamination; under the RTCR an E. coli-positive sample is an acute problem\n• **Enterococci:** hardier in salt water, so they're the standard for **coastal beaches**; also a Ground Water Rule option\n• **Coliphages:** viruses of *E. coli*, used as stand-ins for enteric viruses in groundwater\n• **Fecal coliforms:** an older, less specific group still used in some wastewater permits\nEPA's 2012 recreational water criteria are geometric means of **126 E. coli per 100 mL** (fresh water) or **35 enterococci per 100 mL**. Mississippi's coastal beach program samples for enterococci.\n**Microbial source tracking** uses DNA markers (such as human-specific *Bacteroides*, HF183) to tell human sewage from animal sources.",
      rel: ['e-coli', 'coliform', 'molecular-methods'] },
    { id: 'biofilm', q: 'What is biofilm in water pipes?',
      k: ['biofilm*:10', 'slime layer:10', 'regrowth:10', 'aoc:10', 'assimilable organic carbon:10', 'bdoc:10', 'biostable:10', 'biological stability:10', 'microbial regrowth:10', 'pipe slime:9'],
      a: "A **biofilm** is a community of microbes living in a slimy matrix they produce, stuck to pipe walls, tank surfaces, and meters. In a distribution system, most bacteria live in biofilm rather than floating in the water.\nWhy it matters:\n• Biofilm shields bacteria from disinfectant and consumes residual.\n• It harbors **coliforms** (causing positive samples without a real contamination event), *Legionella*, and mycobacteria, and feeds **nitrification**.\n• It speeds corrosion and causes taste and odor.\nWhat feeds it: **biodegradable organic carbon** (measured as AOC or BDOC), warm water, and long water age. A widely used guide is **AOC below about 100 µg/L** to limit coliform regrowth in chlorinated systems, and below about **10 µg/L** for biologically stable water without a residual (the Dutch approach).\nControl: keep a residual, remove organic carbon at the plant (biofiltration), cut water age, flush, and control corrosion.",
      rel: ['legionella', 'nitrification', 'chlorine-decay'] },
    { id: 'harmful-algal-blooms', q: 'How do harmful algal blooms affect drinking water?',
      k: ['harmful algal bloom*:10', 'habs:10', 'cyanotoxin*:10', 'microcystin*:10', 'cylindrospermopsin:10', 'anatoxin*:10', 'saxitoxin:10', 'toledo:10', 'do not drink:9', 'algae toxin*:10', 'blue green algae:9'],
      a: "**Cyanobacteria** (blue-green algae) bloom in warm, nutrient-rich, calm water, and some strains make **cyanotoxins**: **microcystins** (liver), **cylindrospermopsin** (liver and kidney), and **anatoxin-a** and **saxitoxins** (nerve).\n• EPA's 2015 **10-day health advisories** for drinking water: microcystins **0.3 µg/L** for bottle-fed infants and preschool children and **1.6 µg/L** for everyone else; cylindrospermopsin **0.7** and **3.0 µg/L**. EPA's 2019 **recreational** values are **8 µg/L** microcystins and **15 µg/L** cylindrospermopsin.\n• **Toledo, Ohio** issued a **do-not-drink** order for about half a million people in August 2014 after microcystin got through its plant.\n• In **2019**, the first documented toxic blue-green bloom in the **Mississippi Sound** closed the state's beaches.\nAt the plant: remove **intact cells** gently (coagulation, filtration, DAF) without breaking them; avoid heavy pre-oxidation that releases toxins; **PAC** or GAC adsorbs dissolved toxins, and chlorine or ozone can destroy microcystins with enough CT. EPA monitored 10 cyanotoxins nationally under UCMR 4.",
      rel: ['algae', 'eutrophication', 'bonnet-carre'] },
    { id: 'molecular-methods', q: 'How are DNA methods used in water testing?',
      k: ['qpcr:10', 'pcr:10', 'ddpcr:10', 'molecular method*:10', 'dna test*:9', 'genetic test*:9', 'metagenomic*:10', 'sequencing:9', 'wastewater surveillance:10', 'wastewater based epidemiology:10', 'wastewater monitoring for covid:10', 'covid in wastewater:10', 'nwss:10', 'sewage surveillance:10'],
      a: "Molecular methods detect microbes by their **genetic material** instead of growing them:\n• **qPCR** (quantitative polymerase chain reaction) measures specific DNA or RNA targets in hours instead of days; **digital PCR** gives more precise counts.\n• **Sequencing** (metagenomics) surveys whole microbial communities or finds genes like antibiotic resistance genes.\n• Limits: PCR detects DNA from **dead and live** cells alike (unless special viability steps are used), and regulatory compliance still relies mostly on culture methods like Colilert.\n**Wastewater surveillance** tests sewage for pathogens shed by a whole community. CDC launched its **National Wastewater Surveillance System** in **September 2020** for SARS-CoV-2 and now tracks others such as influenza, RSV, and mpox. It shows trends days before clinical cases rise and doesn't depend on who gets tested.",
      rel: ['fecal-indicators', 'colilert', 'wastewater-overview'] }
  );

  /* ================= WASTEWATER ================= */
  X.push(
    { id: 'wastewater-overview', q: 'How does a wastewater treatment plant work?',
      k: ['wastewater treatment:10', 'sewage treatment:10', 'wastewater plant:10', 'sewer plant:10', 'wwtp:10', 'potw:10', 'how is sewage treated:10', 'primary treatment:10', 'secondary treatment process*:9', 'tertiary treatment:10', 'preliminary treatment:10', 'bar screen*:10', 'grit removal:10', 'grit chamber*:10'],
      a: "A typical municipal plant works in stages:\n1. **Preliminary:** **bar screens** catch rags and debris; **grit chambers** settle sand and gravel that would wear out pumps.\n2. **Primary:** clarifiers settle out about **50–70% of suspended solids** and **25–40% of BOD**.\n3. **Secondary (biological):** microbes eat dissolved organic matter in **activated sludge**, **trickling filters**, or **lagoons**, then secondary clarifiers separate them. This meets the federal **secondary treatment standard** of 30 mg/L BOD₅ and TSS (30-day average) with 85% removal.\n4. **Advanced/tertiary** (where permits require): nitrogen and phosphorus removal, filtration.\n5. **Disinfection:** chlorine (then dechlorination), UV, or peracetic acid, before discharge under an **NPDES permit**.\n6. **Solids:** thickening, **digestion**, dewatering, and reuse or disposal as **biosolids**.\nTypical raw domestic wastewater carries roughly **110–350 mg/L BOD**, **120–400 mg/L TSS**, **20–70 mg/L nitrogen**, and **4–12 mg/L phosphorus**.",
      rel: ['activated-sludge', 'bod-cod', 'secondary-treatment'] },
    { id: 'bod-cod', q: 'What is the difference between BOD and COD?',
      k: ['bod:10', 'bod5:10', 'biochemical oxygen demand:10', 'cod:10', 'chemical oxygen demand:10', 'cbod:10', 'oxygen demand:9', 'bod test:10', 'bod bottle:10'],
      a: "Both measure how much oxygen organic matter would use up in a stream:\n• **BOD₅ (biochemical oxygen demand)** is the oxygen microbes consume breaking down the sample over **5 days at 20°C** in a sealed bottle. It measures the biodegradable part, but it takes five days and is sensitive to toxics and seed quality. **CBOD** suppresses nitrification so only carbon is counted.\n• **COD (chemical oxygen demand)** oxidizes nearly all organics with hot **potassium dichromate** and acid in about **2 hours**. It's always higher than BOD; the **BOD/COD ratio** for raw domestic sewage is often about **0.4–0.6**, and a low ratio hints at hard-to-degrade or industrial waste.\n**TOC** is a third, instrument-based measure of organic carbon.\nThe reason it matters: untreated BOD strips dissolved oxygen from rivers and kills fish, which is why the Clean Water Act set BOD limits.",
      rel: ['wastewater-overview', 'activated-sludge', 'secondary-treatment'] },
    { id: 'activated-sludge', q: 'How does the activated sludge process work?',
      k: ['activated sludge:10', 'aeration basin:10', 'mlss:10', 'mixed liquor:10', 'srt:10', 'sludge age:10', 'solids retention time:10', 'mcrt:10', 'f m ratio:10', 'food to microorganism:10', 'svi:10', 'sludge volume index:10', 'sludge bulking:10', 'bulking:9', 'filamentous:10', 'ras:9', 'was:6', 'return activated sludge:10', 'waste activated sludge:10'],
      a: "In **activated sludge**, a dense population of microbes (the **mixed liquor**) is aerated with the incoming wastewater, eats the organics, and forms settleable floc. Secondary clarifiers settle the floc; most is returned (**RAS**) to keep the population up, and the growth is wasted (**WAS**).\nKey controls:\n• **Solids retention time (SRT, sludge age):** days the microbes stay in the system; conventional plants run roughly **3–15 days**; nitrification needs longer SRT, especially in cold weather\n• **MLSS:** commonly about **1,500–4,000 mg/L** (membrane bioreactors run much higher)\n• **F/M ratio** (food to microorganisms): roughly **0.2–0.4** per day for conventional plants, lower for extended aeration\n• **Dissolved oxygen:** around **2 mg/L** in the aeration basin\n• **SVI** (sludge volume index): under about **150 mL/g** settles well; higher values signal **bulking**, often from **filamentous bacteria** caused by low DO, low F/M, nutrient deficiency, or septic influent",
      rel: ['nitrogen-removal', 'bod-cod', 'mbr'] },
    { id: 'nitrogen-removal', q: 'How do wastewater plants remove nitrogen?',
      k: ['nitrogen removal:10', 'ammonia removal:10', 'nitrification:8', 'denitrification:10', 'biological nitrogen removal:10', 'bnr:10', 'mle:10', 'modified ludzack ettinger:10', 'anoxic:10', 'anammox:10', 'internal recycle:9', 'ammonia limit*:10', 'total nitrogen limit*:10'],
      a: "Biological nitrogen removal is a two-step job:\n1. **Nitrification** (aerobic): *Nitrosomonas*-type bacteria turn ammonia into nitrite, and *Nitrobacter*/*Nitrospira* turn nitrite into nitrate. It uses about **4.57 g of oxygen** and consumes about **7.14 g of alkalinity (as CaCO₃)** per gram of ammonia-N. The slow-growing nitrifiers need long SRTs and struggle in cold water.\n2. **Denitrification** (anoxic, no oxygen): heterotrophic bacteria use nitrate instead of oxygen and release **nitrogen gas**, recovering about **3.57 g of alkalinity** per gram of nitrate-N. They need a carbon source: the incoming wastewater or added methanol or other carbon.\nThe **Modified Ludzack-Ettinger (MLE)** process puts an anoxic zone first and recycles nitrified mixed liquor back to it; **Bardenpho** and similar processes reach lower total nitrogen. **Anammox** bacteria convert ammonia and nitrite straight to nitrogen gas with far less energy, and they're used on high-strength sidestreams.",
      rel: ['phosphorus-removal', 'activated-sludge', 'gulf-hypoxia'] },
    { id: 'phosphorus-removal', q: 'How do wastewater plants remove phosphorus?',
      k: ['phosphorus removal:10', 'remove phosphorus:10', 'ebpr:10', 'enhanced biological phosphorus removal:10', 'bio p:10', 'bio-p:10', 'pao*:9', 'phosphorus accumulating:10', 'chemical phosphorus removal:10', 'a2o:10', 'bardenpho:10', 'phosphorus limit*:10', 'struvite:10'],
      a: "Two main approaches, often used together:\n• **Chemical precipitation:** alum or ferric salts form insoluble phosphate precipitates that settle with the sludge. Simple and reliable, but it adds chemical cost and sludge.\n• **Enhanced biological phosphorus removal (EBPR):** an **anaerobic** zone at the head of the process lets **phosphorus-accumulating organisms (PAOs)** take up volatile fatty acids and release phosphate; then, in the **aerobic** zone, they take up more phosphate than they released, and it leaves in the waste sludge. **A2O** and **five-stage Bardenpho** configurations combine it with nitrogen removal.\nWith tertiary filtration, plants can reach **0.1 mg/L** total phosphorus or lower.\nPhosphorus-rich digester sidestreams can form **struvite** (magnesium ammonium phosphate) scale that clogs pipes; some plants now harvest it as fertilizer.",
      rel: ['nitrogen-removal', 'eutrophication', 'anaerobic-digestion'] },
    { id: 'lagoons-ww', q: 'How do wastewater lagoons work?',
      k: ['wastewater lagoon*:10', 'sewage lagoon*:10', 'lagoon system*:10', 'facultative lagoon*:10', 'aerated lagoon*:10', 'oxidation pond*:10', 'stabilization pond*:10', 'lagoon ammonia:10', 'duckweed:9', 'sludge in lagoon:9'],
      a: "Lagoons are large earthen ponds that treat wastewater with time, sunlight, and microbes, and they serve many small towns across Mississippi because they're cheap and simple to run.\n• **Facultative lagoons:** the upper layer stays aerobic (algae make oxygen by day), and the bottom sludge layer is anaerobic; detention can run from weeks to months.\n• **Aerated lagoons:** mechanical aerators or diffusers speed things up and reduce odors.\n• Cells in series improve performance; final cells may polish or hold water.\nChallenges: **algae** raise effluent TSS; **ammonia limits** are hard to meet in winter, when nitrifying bacteria slow down, so many towns add attached-growth reactors or other upgrades; sludge builds up and must eventually be removed; and liners must prevent seepage to groundwater.",
      rel: ['wastewater-overview', 'nitrogen-removal', 'npdes'] },
    { id: 'trickling-filters', q: 'What are trickling filters and RBCs?',
      k: ['trickling filter*:10', 'rotating biological contactor*:10', 'rbc:9', 'fixed film:10', 'attached growth:10', 'biofilm reactor*:10', 'mbbr:10', 'moving bed:10', 'ifas:10', 'sloughing:10'],
      a: "**Attached-growth** (fixed-film) processes grow the microbes on surfaces instead of keeping them suspended:\n• **Trickling filters:** wastewater is sprayed over a bed of rock or plastic media by a rotating distributor; a biofilm on the media eats the organics, and chunks that **slough** off are settled in a clarifier. Low energy and robust, but less efficient in cold weather.\n• **Rotating biological contactors (RBCs):** banks of plastic discs turn slowly, half-submerged, carrying biofilm through the water and the air.\n• **Moving bed biofilm reactors (MBBR):** small plastic carriers tumble in an aerated tank; **IFAS** adds carriers to activated sludge basins to boost capacity and nitrification without new tanks.\nAttached growth handles shock loads well, and it's a common way to add nitrification to lagoon systems.",
      rel: ['activated-sludge', 'lagoons-ww', 'biofilm'] },
    { id: 'anaerobic-digestion', q: 'How does anaerobic digestion work?',
      k: ['anaerobic digest*:10', 'digester*:10', 'biogas:10', 'methane production:10', 'mesophilic:10', 'thermophilic:10', 'volatile solids reduction:10', 'sludge digestion:10', 'aerobic digest*:10', 'class a biosolids:10', 'class b biosolids:10'],
      a: "**Anaerobic digestion** stabilizes sludge in sealed tanks without oxygen. Microbes work in steps (hydrolysis, acid formation, then methane formation) and turn organic solids into **biogas**, typically about **60–65% methane** and the rest mostly CO₂.\n• **Mesophilic** digesters run near **95–98°F** (35–37°C) with 15–20+ days of detention; **thermophilic** digesters run near **131°F** (55°C), faster and with more pathogen kill.\n• A healthy digester keeps the **volatile acids-to-alkalinity** ratio low; a rising ratio warns of souring.\n• Biogas fuels boilers and engines, and some plants clean it to renewable natural gas.\nUnder EPA's **Part 503** rule, conventional mesophilic digestion typically produces **Class B** biosolids (land application with site restrictions); **Class A** (essentially pathogen-free) needs a further step, such as composting, heat drying, thermophilic treatment that meets time-and-temperature requirements, or alkaline stabilization with heat. **Aerobic digestion** is the simpler, smaller-plant alternative.",
      rel: ['biosolids', 'phosphorus-removal', 'wastewater-overview'] },
    { id: 'sso-cso', q: 'What are sanitary and combined sewer overflows?',
      k: ['sanitary sewer overflow*:10', 'sso*:9', 'combined sewer overflow*:10', 'cso*:9', 'combined sewer*:10', 'sewer overflow*:10', 'sewage spill*:10', 'sewer backup*:10', 'jackson sewer:10', 'sewer consent decree:10', 'consent decree:9'],
      a: "• **Sanitary sewer overflows (SSOs)** are releases of raw sewage from separate sanitary sewers, caused by blockages (grease, roots), pipe failures, pump station failures, or too much rain and groundwater getting into the pipes. They're prohibited discharges under the Clean Water Act.\n• **Combined sewer overflows (CSOs)** happen in older cities whose sewers carry both sewage and stormwater; in heavy rain the combined flow is designed to overflow to rivers. About **700** U.S. communities have combined systems, managed under EPA's **1994 CSO Control Policy**.\nIn Mississippi, the **City of Jackson** signed a federal **consent decree** in **2013** over more than 2,300 sewer overflows and treatment plant violations; after slow progress, a **2023** order put the sewer system under the same court-appointed manager overseeing Jackson's drinking water system.",
      rel: ['infiltration-inflow', 'jackson-crisis', 'lift-station'] },
    { id: 'infiltration-inflow', q: 'What is infiltration and inflow?',
      k: ['infiltration and inflow:10', 'i i:9', 'i&i:10', 'inflow and infiltration:10', 'infiltration into sewer*:10', 'inflow:9', 'wet weather flow:10', 'smoke testing:10', 'dye testing:10', 'sewer rehabilitation:10', 'excessive i i:10'],
      a: "**Infiltration** is groundwater seeping into sewers through cracked pipes, bad joints, and leaky manholes; **inflow** is stormwater that enters directly through roof drains, sump pumps, area drains, cleanouts, and manhole lids. Together, **I/I** can multiply wet-weather flows, overload plants and lift stations, and cause overflows, while the utility pays to pump and treat rainwater.\nEPA's grant-era benchmarks (40 CFR 35.2005) called infiltration **nonexcessive** below **120 gallons per capita per day** and inflow nonexcessive below **275 gpcd** during storms.\nFinding it: flow monitoring, **smoke testing** (smoke shows up at roof drains and broken lines), **dye testing**, and CCTV inspection. Fixing it: lining pipes and manholes, sealing joints, and disconnecting illegal roof and sump connections, including on private service laterals.",
      rel: ['sso-cso', 'lift-station', 'trenchless'] },
    { id: 'lift-station', q: 'How are sewage lift stations designed and run?',
      k: ['lift station*:10', 'pump station* sewer:10', 'sewage pump*:10', 'wet well*:10', 'dry well:9', 'force main*:10', 'grinder pump*:10', 'starts per hour:10', 'pump cycling:9', 'float switch*:9', 'wet well sizing:10'],
      a: "A **lift station** collects sewage in a **wet well** and pumps it through a **force main** to higher ground or the plant.\n• **Wet well sizing:** the working volume between pump-on and pump-off must keep the pump from starting too often. For one pump: **V = θ × q ÷ 4**, where θ is the minimum cycle time from the motor maker (often about 6–10 minutes, meaning roughly 6–10 starts per hour) and q is the pump rate.\n• **Redundancy:** at least two pumps, each able to handle peak flow; alternate them to even out wear; high-level alarms and **telemetry**; backup power or a bypass pump connection.\n• **Force mains:** keep velocity at least about **2 ft/s** to scour solids; put **air release valves** at high points (sewage air valves are built to handle solids); watch for H₂S and corrosion at the discharge.\n• **Operations:** keep floats and level sensors clean (grease rafts), log run times (a sudden rise can mean I/I or a failing pump), and use lockout/tagout, gas monitoring, and confined space entry procedures.",
      rel: ['sewer-corrosion', 'infiltration-inflow', 'manning'] },
    { id: 'septic-systems', q: 'How does a septic system work?',
      k: ['septic tank*:10', 'septic system*:10', 'drain field*:10', 'drainfield:10', 'leach field*:10', 'onsite wastewater:10', 'on site wastewater:10', 'individual wastewater:10', 'aerobic treatment unit*:10', 'pump the septic:10', 'septic pumping:10', 'perc test:10', 'percolation test:10'],
      a: "A conventional **septic system** has two parts:\n• The **septic tank** holds wastewater long enough for solids to settle (sludge) and grease to float (scum); bacteria partly digest the solids.\n• The **drain field** spreads the clarified effluent into gravel trenches or chambers, where the **soil** filters it and microbes finish the treatment before it reaches groundwater.\nIt only works with suitable soil and separation from the water table, so sites are evaluated first. Where soils are poor, as with many of Mississippi's clays, alternatives such as **aerobic treatment units** are widely used; **MSDH** regulates individual onsite wastewater systems.\nMaintenance: EPA recommends an inspection at least every **3 years** and pumping typically every **3–5 years**. Don't flush wipes, grease, or chemicals, and keep vehicles and trees off the drain field. Failing systems contaminate wells and streams with bacteria and nitrate.",
      rel: ['wellhead-protection', 'nitrate', 'wastewater-overview'] },
    { id: 'ww-disinfection', q: 'How is wastewater disinfected?',
      k: ['wastewater disinfection:10', 'effluent disinfection:10', 'dechlorinat*:10', 'sodium bisulfite:10', 'sulfur dioxide:9', 'peracetic acid:10', 'paa:9', 'uv for wastewater:10', 'effluent chlorine limit*:10', 'total residual chlorine:10', 'trc:9'],
      a: "Wastewater is disinfected to protect swimmers and shellfish beds downstream:\n• **Chlorination then dechlorination:** chlorine kills pathogens, but residual chlorine is toxic to aquatic life, so permits often limit **total residual chlorine** to very low levels. Plants remove it with **sodium bisulfite** or **sulfur dioxide**.\n• **UV:** no chemicals and no toxic residual; performance depends on clean lamps and good effluent clarity (low TSS).\n• **Peracetic acid (PAA):** a growing alternative that breaks down to acetic acid, water, and oxygen, often with no dechlorination needed.\nPermits usually set limits on **E. coli**, **enterococci** (for salt water), or **fecal coliform**, depending on the receiving water.",
      rel: ['uv-dose', 'wastewater-overview', 'npdes'] },
    { id: 'sewer-corrosion', q: 'Why do sewers smell and corrode?',
      k: ['sewer odor*:10', 'sewer smell:10', 'hydrogen sulfide in sewer*:10', 'h2s in sewer*:10', 'crown corrosion:10', 'concrete corrosion:10', 'manhole corrosion:10', 'sewer gas:10', 'septic sewage:10', 'odor control:10', 'sewer corrosion:10', 'sewers corrode:10', 'corrod*:6'],
      a: "When sewage sits without oxygen (long force mains, flat sewers, wet wells), bacteria reduce sulfate to **hydrogen sulfide (H₂S)**. Released into the air space, it causes the rotten-egg odor, and bacteria on the damp pipe crown oxidize it to **sulfuric acid**, which eats concrete and metal (**crown corrosion**), sometimes destroying pipes and manholes in a decade or two.\nH₂S is also deadly: exposure limits are in the tens of ppm, and at around **100 ppm** it deadens your sense of smell, so you can't rely on your nose. Always use a gas monitor and confined space procedures.\nControls: keep sewage fresh (shorter detention, air or oxygen injection), add **iron salts** (to precipitate sulfide), **nitrate** (to prevent sulfate reduction), or raise pH; ventilate with odor scrubbers; and use corrosion-resistant pipe, liners, and coatings.",
      rel: ['lift-station', 'hydrogen-sulfide', 'confined-space'] },
    { id: 'mbr', q: 'What is a membrane bioreactor?',
      k: ['membrane bioreactor*:10', 'mbr:10', 'membrane biological:10', 'membranes in wastewater:10'],
      a: "A **membrane bioreactor (MBR)** replaces the secondary clarifier of an activated sludge plant with **microfiltration or ultrafiltration membranes** immersed in (or next to) the aeration tank.\nAdvantages:\n• Effluent is nearly free of suspended solids and much lower in bacteria, good for **reuse** and sensitive streams\n• It can run at high **MLSS** (often around 8,000–12,000 mg/L), so the plant footprint is small\n• Settling problems like bulking no longer limit performance\nTrade-offs: higher energy (air scouring keeps the membranes clean), membrane replacement and cleaning costs, and fine screening needed upstream to protect the membranes.",
      rel: ['activated-sludge', 'membrane-engineering', 'water-reuse'] }
  );

  /* ================= HISTORY, USE, ECONOMICS & EVERYDAY WATER ================= */
  X.push(
    { id: 'water-history', q: 'What are the milestones in drinking water treatment history?',
      k: ['water treatment history:10', 'history of water treatment:10', 'history of drinking water:10', 'drinking water history:10', 'john snow:10', 'broad street pump:10', 'cholera:8', 'typhoid:8', 'jersey city:10', 'first chlorination:10', 'slow sand filter*:9', 'paisley:10', 'grand rapids:10', 'first fluoridat*:10', 'milestones:8'],
      a: "Key milestones:\n• **1804:** John Gibb builds a slow sand filter in **Paisley, Scotland**; in **1829** London's Chelsea Water Works filters a city supply.\n• **1854:** **John Snow** traces a London cholera outbreak to the **Broad Street pump**, founding modern epidemiology, decades before germ theory was accepted.\n• **1908:** **Jersey City, New Jersey** starts the first continuous chlorination of a U.S. public supply.\n• **1914:** the U.S. Public Health Service sets the first federal (bacteriological) drinking water standards, for water on interstate carriers.\n• **1945:** **Grand Rapids, Michigan** becomes the first city to fluoridate its water.\n• **1972** Clean Water Act and **1974** Safe Drinking Water Act.\n• **1993** Milwaukee (Cryptosporidium), **2000** Walkerton, **2014** Flint, and **2022** Jackson reshape the rules and the public's trust.\nTyphoid fever, once a leading killer in U.S. cities, fell sharply as cities filtered and chlorinated their water. The National Academy of Engineering ranked water supply and distribution among the **greatest engineering achievements of the 20th century**.",
      rel: ['outbreaks', 'sdwa', 'cwa'] },
    { id: 'us-water-use', q: 'How much water does the U.S. use, and for what?',
      k: ['us water use:10', 'u s water use:10', 'water use in the united states:10', 'national water use:10', 'how much water does the us use:10', 'water withdrawals:10', 'thermoelectric:10', 'irrigation water use:9', 'where does water go:8', 'biggest water user*:10', 'mississippi water use:10'],
      a: "USGS's national compilation for 2015 estimated **322 billion gallons per day** of withdrawals:\n• **Thermoelectric power** (cooling): about **41%**, most of it returned to rivers warmer\n• **Irrigation:** about **37%**, the largest **consumptive** use (water that evaporates or goes into crops)\n• **Public supply:** about **12%**\n• Self-supplied industry, domestic wells, livestock, aquaculture, and mining make up the rest\nPeople on public supply used about **82 gallons per person per day** at home.\nIn Mississippi, **irrigation** in the Delta and **aquaculture** (catfish) dominate groundwater use, drawing mostly on the Mississippi River Valley alluvial aquifer, which is why the aquifer's decline gets so much attention.",
      rel: ['home-water-use', 'delta-decline', 'water-budget'] },
    { id: 'home-water-use', q: 'How much water does a household use?',
      k: ['household water use:10', 'home water use:10', 'water use at home:10', 'how much water do i use:10', 'gallons per person:10', 'per capita water use:10', 'indoor water use:10', 'toilet water use:10', 'shower water use:10', 'household leaks:10', 'fix a leak:10', 'running toilet:10', 'toilet leak*:10', 'leaky toilet:10', 'check for a leak:9'],
      a: "The Water Research Foundation's **Residential End Uses of Water** study (2016) measured single-family homes across North America:\n• Average **indoor** use was about **59 gallons per person per day**, down about 15% from the 1999 study as efficient fixtures spread.\n• **Toilets** are the largest indoor use, followed by **faucets**, **showers**, and **clothes washers**; **leaks** averaged about **12%** of indoor use, with a small share of homes leaking far more than the rest.\n• Outdoor irrigation can equal or exceed indoor use in summer.\nEPA's WaterSense program estimates the average family can waste about **180 gallons a week** (nearly 10,000 gallons a year) through leaks. A running toilet can waste **200 gallons a day** or more; put a few drops of food coloring in the tank, and if color shows in the bowl within 15 minutes without flushing, the flapper leaks.",
      rel: ['water-conservation', 'ami', 'us-water-use'] },
    { id: 'water-conservation', q: 'What are the best ways to save water?',
      k: ['save water:10', 'water conservation:10', 'conserve water:10', 'watersense:10', 'water efficient:10', 'low flow:10', 'low-flow:10', 'high efficiency toilet*:10', '1 28 gpf:10', '1 6 gpf:10', 'xeriscap*:10', 'drought tolerant:9', 'irrigation efficiency:9'],
      a: "Biggest wins, roughly in order:\n• **Fix leaks** (toilets, faucets, irrigation lines), and check the meter with everything off to catch hidden ones.\n• **Efficient fixtures:** federal law since the 1990s caps toilets at **1.6 gallons per flush**, showerheads at **2.5 gpm**, and faucets at **2.2 gpm**; EPA **WaterSense** labels (since 2006) mark products at least about 20% better: toilets **1.28 gpf** or less, showerheads **2.0 gpm**, bathroom faucets **1.5 gpm**.\n• **Outdoor:** water early in the morning, adjust sprinklers off pavement, use smart (weather- or soil-moisture-based) controllers, and plant for the climate.\n• **Full loads** in efficient clothes washers and dishwashers.\nFor utilities: **water audits**, leak detection, pressure management, conservation-oriented rates, and AMI leak alerts.",
      rel: ['home-water-use', 'water-audit', 'drought'] },
    { id: 'water-footprint', q: 'How much water does it take to make food and products?',
      k: ['water footprint:10', 'virtual water:10', 'water to make:10', 'water to produce:10', 'gallons to make:10', 'water in food:9', 'beef water:10', 'hidden water:10', 'embedded water:10', 'beef:9'],
      a: "A **water footprint** counts all the water used to make something, most of it rain and irrigation for crops and animal feed. Global averages from the Water Footprint Network:\n• **Beef:** about **15,400 liters per kilogram** (roughly **1,800 gallons per pound**), mostly the rain that grows feed crops\n• Much less for most grains and vegetables per pound\nThese are global averages that mix rain-fed water with irrigation water from rivers and aquifers, so local impact depends on where and how things are grown. In the Mississippi Delta, the key question is how much **irrigation** comes from the alluvial aquifer.",
      rel: ['us-water-use', 'delta-decline', 'water-conservation'] },
    { id: 'rate-setting', q: 'How should a water system set its rates?',
      k: ['water rate*:10', 'rate setting:10', 'rate study:10', 'set rates:10', 'rate structure*:10', 'increasing block:10', 'inclining block:10', 'tiered rate*:10', 'base charge:9', 'volumetric charge:10', 'cost of service:10', 'awwa m1:10', 'raise rates:10', 'water bill*:8', 'affordab*:9'],
      a: "Good rates recover the **full cost of service**: operations, debt payments, reserves, and the capital needed to replace aging assets (not just this year's bills).\nThe usual steps (AWWA Manual **M1**):\n1. **Revenue requirements:** O&M plus debt service plus capital funded from rates.\n2. **Cost of service:** allocate costs to customer classes by how they use the system (peak demand, meters, fire protection).\n3. **Rate design:** a **fixed base charge** (stable revenue) plus a **volumetric charge**. **Uniform** rates charge the same per gallon; **increasing block** (tiered) rates encourage conservation; declining blocks mostly remain for large industrial users.\n**Affordability** matters: EPA long used about **2.5% of median household income** for drinking water and **2%** for wastewater as rough benchmarks, but those averages hide low-income households, so many utilities add customer assistance programs. Small, regular increases beat big increases after years of deferral.",
      rel: ['utility-finance', 'srf-funding', 'asset-management'] },
    { id: 'utility-finance', q: 'How do water utilities stay financially healthy?',
      k: ['utility finance:10', 'financial health:10', 'debt service coverage:10', 'coverage ratio:10', 'days cash on hand:10', 'reserve fund*:10', 'revenue bond*:10', 'bond rating*:10', 'enterprise fund:10', 'depreciation:8', 'usda rural development:10', 'rural development:9', 'financial capacity:10'],
      a: "A healthy utility runs as a self-supporting **enterprise fund**:\n• **Debt service coverage ratio** (net revenue ÷ annual debt payments): bond covenants commonly require at least **1.2–1.25×**; lenders and rating agencies like more.\n• **Days of cash on hand:** operating reserves for emergencies, commonly several months' worth.\n• **Capital reserves** funded from rates, instead of waiting for grants or a crisis.\n• **Non-revenue water** and **collection rates** watched as closely as expenses.\nFunding sources: **revenue bonds**, **State Revolving Fund** loans, **USDA Rural Development** Water and Waste Disposal loans and grants (a major source for rural Mississippi systems), WIFIA, and community development block grants.\nFinancial capacity is one of the three legs of **capacity development**, alongside technical and managerial capacity, that states assess under the SDWA.",
      rel: ['rate-setting', 'srf-funding', 'asset-management'] },
    { id: 'water-rights-doctrines', q: 'How do water rights work in the United States?',
      k: ['water rights doctrine*:10', 'riparian:10', 'riparian rights:10', 'prior appropriation:10', 'first in time:10', 'reasonable use:10', 'correlative rights:10', 'rule of capture:10', 'eastern water law:10', 'western water law:10'],
      a: "U.S. water law comes from the states, and it splits roughly east and west:\n• **Riparian rights** (most eastern states): landowners along a stream may make **reasonable use** of it, shared with other riparian owners.\n• **Prior appropriation** (\"first in time, first in right\"; most western states): rights come from putting water to beneficial use, and senior rights are served first in shortages.\n• **Groundwater** has its own doctrines: absolute ownership or the **rule of capture** (Texas, famously), **reasonable use**, **correlative rights**, and permit systems.\nMany eastern states have moved to **regulated riparian** permit systems. Mississippi declared all its water a public resource and requires **MDEQ permits** for most significant withdrawals, and **interstate** aquifers and rivers are divided by courts or compacts, as in *Mississippi v. Tennessee*.",
      rel: ['ms-water-law', 'ms-v-tn', 'ymd'] },
    { id: 'tap-water-safety', q: 'Is tap water safe to drink?',
      k: ['is tap water safe:10', 'tap water safe:10', 'safe to drink:9', 'should i drink tap water:10', 'tap vs bottled:10', 'bottled water:10', 'bottled vs tap:10', 'is bottled water safer:10', 'boiling remove lead:10', 'does boiling remove:10', 'boil water remove lead:10', 'boiling remove*:9', 'hot water for cooking:10', 'distilled water safe:10'],
      a: "For most Americans, yes: more than 90% of people get water from a **community water system** that must meet EPA and state standards, test regularly, and publish results in an annual **Consumer Confidence Report**. Check your CCR, and watch for public notices.\nGood habits and facts:\n• **Bottled water** is regulated by the **FDA** as a food, with standards generally matching EPA's; it isn't automatically safer, and it costs far more per gallon.\n• **Boiling kills germs but does not remove lead or chemicals**; boiling actually concentrates them.\n• Use **cold** water for drinking and cooking (hot water pulls more lead from plumbing), and run the tap a bit after water has sat for hours in homes with lead service lines.\n• Private **well owners** are responsible for their own testing: at least yearly for bacteria and nitrate, and more after flooding.\n• Distilled or RO water is safe but has no minerals and little buffering.",
      rel: ['home-treatment', 'ccr', 'lead-copper'] },
    { id: 'home-treatment', q: 'Which home water filter should I buy?',
      k: ['home water filter*:10', 'water filter*:9', 'pitcher filter*:10', 'filter pitcher*:10', 'under sink filter*:10', 'point of use:10', 'point-of-use:10', 'point of entry:10', 'whole house filter*:10', 'nsf 53:10', 'nsf 58:10', 'nsf 42:10', 'nsf certified:10', 'filter for lead:10', 'filter for pfas:10', 'home ro:10'],
      a: "Pick the filter for the **specific contaminant** you want out, and look for **independent certification** to NSF/ANSI (or equivalent) standards for that claim:\n• **NSF/ANSI 42:** aesthetic effects (chlorine taste and odor, particulates)\n• **NSF/ANSI 53:** health contaminants (**lead**, VOCs, cysts, and PFOA/PFOS claims)\n• **NSF/ANSI 58:** reverse osmosis systems (nitrate, arsenic, PFAS, TDS)\n• **NSF/ANSI 55:** UV systems; **NSF/ANSI 401:** selected emerging contaminants; **NSF/ANSI 44:** softeners\n**Change cartridges on schedule**; a spent carbon filter can release what it captured and grow bacteria. Softeners and whole-house filters don't make water safer to drink by themselves. For lead, a certified pitcher or faucet filter is a good interim step while lead lines are replaced.",
      rel: ['tap-water-safety', 'lead-copper', 'pfas-treatment'] },
    { id: 'drinking-water-intake', q: 'How much water should a person drink?',
      k: ['how much water should i drink:10', 'drink per day:10', 'daily water intake:10', '8 glasses:10', 'eight glasses:10', 'hydration:10', 'dehydrat*:10', 'water intake:10', 'overhydration:10', 'hyponatremia:10'],
      a: "The **National Academies** (2004) set adequate total water intake at about **3.7 liters (about 15.5 cups) a day for men** and **2.7 liters (about 11.5 cups) for women**, counting water from all drinks and food (food supplies roughly 20%). There's no single rule like \"8 glasses\"; needs rise with heat, exercise, pregnancy, and breastfeeding, and thirst is a good guide for most healthy people.\nOperators working outdoors in Mississippi summers should drink regularly before they feel thirsty, take shade breaks, and know the signs of heat illness. Drinking far too much too fast can dilute blood sodium (**hyponatremia**), which is rare but dangerous in endurance events.",
      rel: ['tap-water-safety', 'ppe', 'first-aid'] },
    { id: 'water-careers', q: 'What careers are there in water?',
      k: ['water career*:10', 'careers in water:10', 'water jobs:10', 'job in water:10', 'water operator job*:10', 'water engineer*:9', 'hydrologist*:10', 'hydrogeologist*:10', 'water industry jobs:10', 'workforce:8'],
      a: "Water work spans many paths:\n• **Operators:** drinking water and wastewater treatment and distribution/collection, licensed by the state (MSDH in Mississippi for drinking water) with certification levels that grow with experience\n• **Maintenance, instrumentation and SCADA, electrical**, meter and field crews, backflow testers, lab analysts\n• **Engineers:** civil and environmental (design, hydraulic modeling, treatment), plus hydrologists and **hydrogeologists**\n• **Managers**, regulators (MSDH, MDEQ, EPA), finance and rates, customer service, and GIS\nThe industry faces a wave of **retirements**, so certified operators are in demand, and many start with a high school diploma and on-the-job training. MsRWA and MSDH-approved providers offer the training.",
      rel: ['certification-requirements', 'training-ms', 'study-plan'] }
  );

  /* ==========================================================
     Engineering calculators: pipe flow, hydrants, water hammer,
     thrust, groundwater, runoff, pumps, chemistry, conversions.
     Each one needs a trigger word plus the numbers it uses, so
     plain questions still go to the answers above.
     ========================================================== */
  function fx(n) {
    if (!isFinite(n)) return '—';
    var a = Math.abs(n);
    var d = a >= 1000 ? 0 : a >= 100 ? 1 : a >= 1 ? 2 : a >= 0.01 ? 3 : 5;
    return n.toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: 0 });
  }
  var UNITS = [
    ['af', /^(?:acre[ -]?f(?:ee|oo)?t\b|ac[ -]?ft\b)/],
    ['gpm', /^(?:gpm\b|gallons? (?:per|a) min(?:ute)?\b)/],
    ['mgd', /^(?:mgd\b|million gallons? (?:per|a) day\b)/],
    ['cfs', /^(?:cfs\b|cubic f(?:ee|oo)t per second\b)/],
    ['fps', /^(?:ft\/s(?:ec)?\b|fps\b|f(?:ee|oo)t per second\b|ft per second\b)/],
    ['inhr', /^(?:in\/hr?\b|inch(?:es)? (?:per|an|a) hour\b|in per hour\b|iph\b)/],
    ['ftday', /^(?:ft\/d(?:ay)?\b|f(?:ee|oo)t per day\b|ft per day\b)/],
    ['mday', /^(?:m\/d(?:ay)?\b|met(?:er|re)s? per day\b)/],
    ['acre', /^(?:acres?\b|ac\b)/],
    ['psi', /^psi\b/],
    ['kpa', /^kpa\b/],
    ['bar', /^bars?\b/],
    ['m3', /^(?:m3\b|m³|cubic met(?:er|re)s?\b)/],
    ['cf', /^(?:ft3\b|ft³|cubic f(?:ee|oo)t\b|cu\.? ?ft\b)/],
    ['in', /^(?:inch(?:es)?\b|in\b|["”])/],
    ['ft', /^(?:ft\b|feet\b|foot\b|['’](?!s))/],
    ['mm', /^(?:mm\b|millimet(?:er|re)s?\b)/],
    ['m', /^(?:m\b|met(?:er|re)s?\b)/],
    ['degF', /^(?:°\s*f\b|degrees? f(?:ahrenheit)?\b|f\b|fahrenheit\b)/],
    ['degC', /^(?:°\s*c\b|degrees? c(?:elsius)?\b|c\b|celsius\b)/],
    ['deg', /^(?:°|degrees?\b|deg\b)/],
    ['pct', /^(?:%|percent\b)/],
    ['rpm', /^rpm\b/],
    ['hp', /^(?:hp\b|horsepower\b)/],
    ['sec', /^(?:seconds?\b|secs?\b|s\b)/],
    ['min', /^(?:minutes?\b|mins?\b)/],
    ['hr', /^(?:hours?\b|hrs?\b|h\b)/],
    ['day', /^days?\b/],
    ['yr', /^(?:years?\b|yrs?\b)/],
    ['gpg', /^(?:gpg\b|grains? per gallon\b)/],
    ['mgl', /^(?:mg\/l\b|mg per l(?:iter)?\b|ppm\b|milligrams? per liter\b)/],
    ['ugl', /^(?:ug\/l\b|µg\/l|μg\/l|ppb\b|micrograms? per liter\b)/],
    ['gal', /^(?:gallons?\b|gal\b)/],
    ['liter', /^(?:liters?\b|litres?\b|l\b)/],
    ['kg', /^(?:kg\b|kilograms?\b)/],
    ['lb', /^(?:lbs?\b|pounds?\b)/]
  ];
  function parse(raw) {
    var t = String(raw).toLowerCase().replace(/[‘’]/g, "'").replace(/(\d),(?=\d{3}\b)/g, '$1');
    var list = [], re = /(\d*\.?\d+)/g, m;
    while ((m = re.exec(t))) {
      /* skip digits inside words like h2s, c900, or ucmr5 */
      if (m.index > 0 && /[a-z]/.test(t[m.index - 1])) continue;
      var after = t.slice(m.index + m[0].length).replace(/^\s{0,2}/, ''), unit = '';
      for (var j = 0; j < UNITS.length; j++) if (UNITS[j][1].test(after)) { unit = UNITS[j][0]; break; }
      var neg = m.index > 0 && /[-−]/.test(t[m.index - 1]) && (m.index === 1 || /[\s(]/.test(t[m.index - 2]));
      list.push({ v: neg ? -parseFloat(m[1]) : parseFloat(m[1]), u: unit, i: m.index, end: m.index + m[0].length });
    }
    return {
      t: t, list: list,
      get: function (u) { for (var k = 0; k < list.length; k++) if (list[k].u === u) return list[k]; return null; },
      all: function (u) { return list.filter(function (q) { return q.u === u; }); },
      after: function (word) {
        var r = new RegExp('\\b' + word + '\\s*(?:=|:|of|is|was|at)?\\s*(-?\\d*\\.?\\d+)');
        var mm = t.match(r);
        return mm ? parseFloat(mm[1]) : null;
      }
    };
  }
  function minus(s) { return String(s).replace(/^-/, '−'); }
  function flowGpm(P) {
    var g = P.get('gpm'); if (g) return { v: g.v, note: '' };
    var d = P.get('mgd'); if (d) return { v: d.v * 694.44, note: fx(d.v) + ' MGD = ' + fx(d.v * 694.44) + ' gpm. ' };
    var c = P.get('cfs'); if (c) return { v: c.v * 448.83, note: fx(c.v) + ' cfs = ' + fx(c.v * 448.83) + ' gpm. ' };
    return null;
  }
  function qs(api, ids) { return ids.map(function (id) { return api.byId[id] && api.byId[id].q; }).filter(Boolean); }
  function done(state, api, title, lines, ids, note) {
    state.last = null;
    return { text: '**' + title + '**\n' + lines.join('\n') + (note ? '\n' + note : ''), chips: qs(api, ids).slice(0, 3), id: 'calc' };
  }
  /* Kinematic viscosity of water, ft²/s, by °F */
  var NU = [[32, 1.924e-5], [40, 1.664e-5], [50, 1.410e-5], [60, 1.217e-5], [70, 1.059e-5], [80, 0.930e-5], [90, 0.826e-5], [100, 0.739e-5], [120, 0.609e-5]];
  function nuAt(tF) {
    if (tF <= NU[0][0]) return NU[0][1];
    for (var i = 1; i < NU.length; i++) if (tF <= NU[i][0]) {
      var a = NU[i - 1], b = NU[i];
      return a[1] + (b[1] - a[1]) * (tF - a[0]) / (b[0] - a[0]);
    }
    return NU[NU.length - 1][1];
  }
  function tempF(P) {
    var f = P.get('degF'); if (f) return f.v;
    var c = P.get('degC'); if (c) return c.v * 9 / 5 + 32;
    return null;
  }
  /* Standard outside diameters (inches) for ductile iron and C900 PVC */
  var OD = { 4: 4.80, 6: 6.90, 8: 9.05, 10: 11.10, 12: 13.20, 14: 15.30, 16: 17.40, 18: 19.50, 20: 21.60, 24: 25.80, 30: 32.00, 36: 38.30 };

  var HCALC = [
    /* Langelier Saturation Index */
    function (P, state, api) {
      if (!/\blsi\b|langelier|saturation index/.test(P.t)) return null;
      var ph = P.after('ph'), ca = P.after('calcium(?: hardness)?') || P.after('ca'), alk = P.after('alk(?:alinity)?'), tds = P.after('tds');
      var tC = P.get('degC') ? P.get('degC').v : P.get('degF') ? (P.get('degF').v - 32) * 5 / 9 : P.after('temp(?:erature)?');
      if (ph == null || ca == null || alk == null || !ca || !alk) return null;
      var noteT = '', noteTds = '';
      if (tC == null) { tC = 20; noteT = ' (I assumed 20°C.)'; }
      if (!tds) { tds = 250; noteTds = ' (I assumed TDS = 250 mg/L; it has only a small effect.)'; }
      var A = (Math.log10(tds) - 1) / 10, B = -13.12 * Math.log10(tC + 273.15) + 34.55, C = Math.log10(ca) - 0.4, D = Math.log10(alk);
      var phs = (9.3 + A + B) - (C + D), lsi = ph - phs, rsi = 2 * phs - ph;
      var say = lsi > 0.3 ? 'tends to **deposit calcium carbonate scale**' : lsi < -0.3 ? 'tends to **dissolve calcium carbonate** (aggressive/corrosive)' : 'is **close to saturation** (roughly balanced)';
      return done(state, api, 'Langelier Saturation Index', [
        'A = (log TDS − 1) ÷ 10 = ' + A.toFixed(3) + '; B = −13.12 × log(°C + 273) + 34.55 = ' + B.toFixed(3),
        'C = log(Ca as CaCO₃) − 0.4 = ' + C.toFixed(3) + '; D = log(alkalinity) = ' + D.toFixed(3),
        '**pHs** = (9.3 + A + B) − (C + D) = **' + phs.toFixed(2) + '**',
        '**LSI** = pH − pHs = ' + ph + ' − ' + phs.toFixed(2) + ' = **' + minus(lsi.toFixed(2)) + '**, so this water ' + say + '.',
        'Ryznar index = 2pHs − pH = ' + rsi.toFixed(2) + (rsi < 6 ? ' (scale-forming by Ryznar\'s scale)' : rsi <= 7 ? ' (little scale or corrosion by Ryznar\'s scale)' : ' (on the corrosive side by Ryznar\'s scale)') + '.' + noteT + noteTds
      ], ['lsi-indices', 'corrosion-control', 'lead-corrosion-chem'], 'The two indices can disagree near balance, and neither one predicts lead release; CCPP and pipe-loop or scale studies are better for design.');
    },
    /* Hydrant flow test: flow available at 20 psi */
    function (P, state, api) {
      if (!/static/.test(P.t) || !/residual/.test(P.t)) return null;
      var S = P.after('static(?: pressure)?'), R = P.after('residual(?: pressure)?');
      var ms = P.t.match(/(\d*\.?\d+)\s*(?:psi)?\s*static/), mr = P.t.match(/(\d*\.?\d+)\s*(?:psi)?\s*residual/);
      if (S == null && ms) S = parseFloat(ms[1]);
      if (R == null && mr) R = parseFloat(mr[1]);
      var f = flowGpm(P);
      if (S == null || R == null || !f || S <= R) return null;
      var mt = P.t.match(/(?:at|to|for)\s*(\d*\.?\d+)\s*psi(?! static)(?! residual)/), T = mt ? parseFloat(mt[1]) : 20;
      if (T >= S) T = 20;
      var q = f.v * Math.pow((S - T) / (S - R), 0.54);
      var cls = T !== 20 ? '' : q >= 1500 ? ' That is **Class AA (light blue)**.' : q >= 1000 ? ' That is **Class A (green)**.' : q >= 500 ? ' That is **Class B (orange)**.' : ' That is **Class C (red)**.';
      return done(state, api, 'Hydrant flow test', [
        f.note + 'Static ' + fx(S) + ' psi, residual ' + fx(R) + ' psi, test flow ' + fx(f.v) + ' gpm.',
        '**Q' + T + ' = Q × [(static − ' + T + ') ÷ (static − residual)]^0.54** = ' + fx(f.v) + ' × (' + fx(S - T) + ' ÷ ' + fx(S - R) + ')^0.54 = **' + fx(q) + ' gpm** available at ' + T + ' psi residual.' + cls
      ], ['hydrant-flow-test', 'fire-flow', 'calibration'], 'NFPA 291 wants a pressure drop of at least 25% during the test for a reliable projection.');
    },
    /* Pitot reading → hydrant outlet flow */
    function (P, state, api) {
      if (!/pitot|hydrant|nozzle|outlet/.test(P.t)) return null;
      var d = P.get('in'), p = P.get('psi');
      if (!d || !p || d.v > 6 || /static|residual/.test(P.t)) return null;
      var cm = P.t.match(/\bc\s*(?:=|of|is)?\s*(0?\.\d+)/), c = cm ? parseFloat(cm[1]) : 0.9;
      var q = 29.84 * c * d.v * d.v * Math.sqrt(p.v);
      return done(state, api, 'Hydrant outlet flow', [
        '**Q = 29.84 × c × d² × √p** = 29.84 × ' + c + ' × ' + fx(d.v) + '² × √' + fx(p.v) + ' = **' + fx(q) + ' gpm**' + (cm ? '' : ' (c = 0.90 for a smooth, rounded outlet; use 0.80 for square-sharp and 0.70 for square-projecting outlets)'),
        'For a two-outlet or multi-hydrant test, add up the flows. Pitot readings between 10 and 30 psi are the most accurate.'
      ], ['hydrant-flow-test', 'fire-flow', 'hydrants']);
    },
    /* Thrust on bends, tees, and dead ends */
    function (P, state, api) {
      if (!/thrust/.test(P.t)) return null;
      var d = P.get('in'), p = P.get('psi');
      if (!d || !p) return null;
      var ang = P.get('deg'), dead = /dead ?end|plug|cap\b|tee|closed valve|end cap/.test(P.t);
      var am = P.t.match(/(\d*\.?\d+)\s*(?:°|degree)/);
      var theta = ang ? ang.v : am ? parseFloat(am[1]) : null;
      if (theta == null && !dead) return null;
      var od = OD[Math.round(d.v)] && Math.abs(d.v - Math.round(d.v)) < 0.01 ? OD[Math.round(d.v)] : d.v;
      var A = Math.PI * od * od / 4, T = dead && theta == null ? p.v * A : 2 * p.v * A * Math.sin(theta * Math.PI / 360);
      return done(state, api, 'Thrust force', [
        'Area (using ' + (od !== d.v ? 'the standard ' + fx(od) + '-inch outside diameter for ' + fx(d.v) + '-inch ductile iron or C900 PVC' : 'the ' + fx(od) + '-inch size you gave') + ') = π × ' + fx(od) + '² ÷ 4 = ' + fx(A) + ' in²',
        dead && theta == null ? '**T = P × A** = ' + fx(p.v) + ' × ' + fx(A) + ' = **' + fx(T) + ' lb**' :
          '**T = 2 × P × A × sin(θ ÷ 2)** = 2 × ' + fx(p.v) + ' × ' + fx(A) + ' × sin(' + fx(theta / 2) + '°) = **' + fx(T) + ' lb**',
        'At an assumed soil bearing capacity of 2,000 lb/ft², a thrust block needs about **' + fx(T / 2000) + ' ft²** of bearing face against undisturbed soil. Use your soil\'s actual value, and design for test pressure plus surge.'
      ], ['thrust-restraint', 'surge-analysis', 'pipe-ratings']);
    },
    /* Water hammer (Joukowsky, critical period, Michaud) */
    function (P, state, api) {
      if (!/water hammer|hammer|surge|joukowsk|transient/.test(P.t)) return null;
      var dv = P.get('fps');
      if (!dv) return null;
      var wm = P.t.match(/wave speed\s*(?:=|of|is)?\s*(\d+\.?\d*)|\ba\s*=\s*(\d+\.?\d*)/), a, mat;
      if (wm) { a = parseFloat(wm[1] || wm[2]); mat = 'the wave speed you gave'; }
      else if (/pvc|c900|c905/.test(P.t)) { a = 1400; mat = 'PVC (about 1,400 ft/s)'; }
      else if (/hdpe|polyethylene|\bpe\b/.test(P.t)) { a = 900; mat = 'HDPE (about 900 ft/s)'; }
      else if (/concrete|pccp/.test(P.t)) { a = 3500; mat = 'concrete pipe (about 3,500 ft/s)'; }
      else if (/ductile|iron|steel|metal/.test(P.t)) { a = 4000; mat = 'ductile iron or steel (about 4,000 ft/s)'; }
      else { a = 4000; mat = 'metal pipe (about 4,000 ft/s); say PVC or HDPE to change it'; }
      var dH = a * dv.v / 32.174, dP = dH * 0.4335;
      var lines = ['Wave speed a for ' + mat + '.', '**ΔH = a × ΔV ÷ g** = ' + fx(a) + ' × ' + fx(dv.v) + ' ÷ 32.2 = **' + fx(dH) + ' ft** ≈ **' + fx(dP) + ' psi** above the operating pressure (if flow stops within the critical period).'];
      var L = null, lens = P.all('ft');
      if (lens.length) L = lens.reduce(function (mx, q) { return q.v > mx ? q.v : mx; }, 0);
      if (L) {
        var tc = 2 * L / a;
        lines.push('Critical period **2L ÷ a** = 2 × ' + fx(L) + ' ÷ ' + fx(a) + ' = **' + fx(tc) + ' seconds**.');
        var ts = P.get('sec');
        if (ts && ts.v > tc) {
          var mh = 2 * L * dv.v / (32.174 * ts.v);
          lines.push('Closing over ' + fx(ts.v) + ' s (slower than 2L/a): Michaud gives ΔH ≈ 2LV ÷ (g × t) = **' + fx(mh) + ' ft ≈ ' + fx(mh * 0.4335) + ' psi**.');
        }
      }
      return done(state, api, 'Water hammer', lines, ['surge-analysis', 'surge-protection', 'water-hammer']);
    },
    /* Darcy's law: seepage velocity and travel time */
    function (P, state, api) {
      if (!/darcy'?s? law|seepage velocity|groundwater velocity|ground water velocity|travel time|darcy flux|linear velocity|pore velocity/.test(P.t) || /weisbach/.test(P.t)) return null;
      var K = P.get('ftday') || P.get('mday'), unit = K && K.u === 'mday' ? 'm' : 'ft';
      var Kv = K ? K.v : P.after('(?:\\bk|conductivity)');
      var i = P.after('gradient') != null ? P.after('gradient') : P.after('\\bi');
      var n = P.after('(?:effective )?porosity');
      if (Kv == null || i == null) return null;
      var pn = '';
      if (n == null) { n = 0.25; pn = ' (I assumed an effective porosity of 0.25, typical of sand.)'; }
      if (n > 1) n = n / 100;
      var q = Kv * i, v = q / n;
      var lines = ['Darcy flux **q = K × i** = ' + fx(Kv) + ' × ' + fx(i) + ' = ' + fx(q) + ' ' + unit + '/day', 'Seepage (average linear) velocity **v = K × i ÷ n** = ' + fx(q) + ' ÷ ' + fx(n) + ' = **' + fx(v) + ' ' + unit + '/day** (' + fx(v * 365) + ' ' + unit + '/year).' + pn];
      var dist = null, ds = P.all(unit === 'm' ? 'm' : 'ft');
      if (ds.length) dist = ds[ds.length - 1].v;
      if (dist && v > 0) {
        var days = dist / v;
        lines.push('Travel time over ' + fx(dist) + ' ' + unit + ' ≈ **' + (days > 730 ? fx(days / 365) + ' years' : fx(days) + ' days') + '** (advection only; dispersion brings the first traces sooner).');
      }
      return done(state, api, "Darcy's law", lines, ['darcys-law', 'contaminant-transport', 'hydraulic-conductivity']);
    },
    /* NRCS curve number runoff */
    function (P, state, api) {
      if (!/curve number|\bcn\b/.test(P.t)) return null;
      var cn = P.after('(?:curve number|cn)'), pr = P.get('in') ? P.get('in').v : P.after('(?:rainfall|rain|precipitation|p)');
      if (cn == null || pr == null || cn < 30 || cn > 100) return null;
      var S = 1000 / cn - 10, Ia = 0.2 * S, Q = pr > Ia ? Math.pow(pr - Ia, 2) / (pr - Ia + S) : 0;
      return done(state, api, 'Curve number runoff', [
        'S = 1000 ÷ CN − 10 = ' + fx(S) + ' in; Ia = 0.2 × S = ' + fx(Ia) + ' in',
        '**Q = (P − Ia)² ÷ (P − Ia + S)** = (' + fx(pr) + ' − ' + fx(Ia) + ')² ÷ (' + fx(pr) + ' − ' + fx(Ia) + ' + ' + fx(S) + ') = **' + fx(Q) + ' inches of runoff** (' + fx(pr ? Q / pr * 100 : 0) + '% of the rain).',
        'One inch of runoff over one acre is about 27,154 gallons.'
      ], ['curve-number', 'rational-method', 'stormwater-design']);
    },
    /* Rational method */
    function (P, state, api) {
      if (!/rational|runoff|\bcia\b|peak flow/.test(P.t)) return null;
      var cm = P.t.match(/\bc\s*(?:=|of|is)?\s*(0?\.\d+|1(?:\.0+)?)\b/), i = P.get('inhr'), A = P.get('acre');
      if (!cm || !i || !A) return null;
      var C = parseFloat(cm[1]), Q = C * i.v * A.v;
      return done(state, api, 'Rational method', [
        '**Q = C × i × A** = ' + fx(C) + ' × ' + fx(i.v) + ' in/hr × ' + fx(A.v) + ' acres = **' + fx(Q) + ' cfs** (' + fx(Q * 448.83) + ' gpm, ' + fx(Q * 0.6463) + ' MGD)',
        'Use the rainfall intensity for a storm lasting the time of concentration, from NOAA Atlas 14 for your location.'
      ], ['rational-method', 'idf-curves', 'stormwater-design']);
    },
    /* Chance of a T-year event in n years */
    function (P, state, api) {
      var mt = P.t.match(/(\d+)[ -]?(?:year|yr)s?[ -](?:flood|storm|event|rain(?:fall)?)/);
      if (!mt) return null;
      var mn = P.t.match(/(?:in|over|during|within|next)\s*(?:a|the)?\s*(\d+)[ -]?(?:years?|yrs?)(?![ -](?:flood|storm|event|rain))/) || P.t.match(/(\d+)[ -]?year (?:mortgage|loan|period|life)/);
      var T = parseFloat(mt[1]), n = mn ? parseFloat(mn[1]) : 1;
      if (!T || T < 1 || (!mn && !/chance|odds|probabilit|likely|percent/.test(P.t))) return null;
      var p = 1 - Math.pow(1 - 1 / T, n);
      return done(state, api, 'Flood odds', [
        'A ' + fx(T) + '-year event has a **' + fx(100 / T) + '%** chance of happening in any one year.',
        mn ? 'Chance of at least one in ' + fx(n) + ' years = 1 − (1 − 1/' + fx(T) + ')^' + fx(n) + ' = **' + fx(p * 100) + '%**' : 'Ask “chance of a ' + fx(T) + '-year flood in 30 years” to see how the odds add up.'
      ], ['return-period', 'ms-floods', 'idf-curves']);
    },
    /* Manning full-pipe flow */
    function (P, state, api) {
      if (!/manning/.test(P.t)) return null;
      var d = P.get('in'), dft = d ? d.v / 12 : null;
      if (!dft) { var f = P.get('ft'); dft = f ? f.v : null; }
      var nm = P.t.match(/\bn\s*(?:=|of|is)?\s*(0?\.\d+)/), n = nm ? parseFloat(nm[1]) : 0.013;
      var sm = P.t.match(/slope\s*(?:=|of|is)?\s*(\d*\.?\d+)\s*(%|percent|ft\/ft)?/), S = null;
      if (sm) S = parseFloat(sm[1]) / (sm[2] === '%' || sm[2] === 'percent' ? 100 : 1);
      else if (P.get('pct')) S = P.get('pct').v / 100;
      if (!dft || !S) return null;
      var Q = 0.463 / n * Math.pow(dft, 8 / 3) * Math.sqrt(S), A = Math.PI * dft * dft / 4, V = Q / A;
      return done(state, api, "Manning's equation (pipe flowing full)", [
        '**Q = (0.463 ÷ n) × D^(8/3) × S^(1/2)** = (0.463 ÷ ' + n + ') × ' + fx(dft) + '^(8/3) × √' + S + ' = **' + fx(Q) + ' cfs** (' + fx(Q * 448.83) + ' gpm, ' + fx(Q * 0.6463) + ' MGD)',
        'Velocity full = Q ÷ A = **' + fx(V) + ' ft/s**' + (V < 2 ? ', below the 2 ft/s usually wanted to keep solids moving.' : '.') + (nm ? '' : ' (n = 0.013 assumed.)')
      ], ['manning', 'lift-station', 'open-channel']);
    },
    /* 90-degree V-notch weir */
    function (P, state, api) {
      if (!/v[ -]?notch/.test(P.t)) return null;
      var h = P.get('ft'), hin = P.get('in'), H = h ? h.v : hin ? hin.v / 12 : null;
      if (!H) return null;
      var Q = 2.49 * Math.pow(H, 2.48);
      return done(state, api, '90° V-notch weir', ['**Q = 2.49 × H^2.48** = 2.49 × ' + fx(H) + '^2.48 = **' + fx(Q) + ' cfs** (' + fx(Q * 448.83) + ' gpm, ' + fx(Q * 0.6463) + ' MGD)', 'Measure H upstream of the notch, at least 4 × H back from the weir.'], ['open-channel', 'manning', 'meters']);
    },
    /* Pumping energy */
    function (P, state, api) {
      if (!/energy|kwh|kilowatt|\bkw\b|power cost|electric(?:ity)? (?:cost|bill)|cost to pump|power use/.test(P.t)) return null;
      var f = flowGpm(P), h = P.get('ft');
      if (!f || !h) return null;
      var e = P.get('pct'), eff = e ? e.v / 100 : 0.7;
      var kw = f.v * h.v * 0.746 / (3960 * eff), hm = P.t.match(/(\d+\.?\d*)\s*(?:hours?|hrs?)\s*(?:a|per|each)\s*day/), hrs = hm ? parseFloat(hm[1]) : 24;
      var kwhMG = kw * 1e6 / (f.v * 60), cm = P.t.match(/\$\s*(\d*\.?\d+)\s*(?:\/|per)\s*kwh|(\d*\.?\d+)\s*cents?/);
      var rate = cm ? (cm[1] ? parseFloat(cm[1]) : parseFloat(cm[2]) / 100) : null;
      var lines = [f.note + '**kW = gpm × TDH × 0.746 ÷ (3,960 × efficiency)** = ' + fx(f.v) + ' × ' + fx(h.v) + ' × 0.746 ÷ (3,960 × ' + eff + ') = **' + fx(kw) + ' kW**' + (e ? '' : ' (70% wire-to-water efficiency assumed)'),
        'Energy: **' + fx(kw * hrs) + ' kWh per day** at ' + fx(hrs) + ' hours a day, or **' + fx(kwhMG) + ' kWh per million gallons**.'];
      if (rate) lines.push('At $' + rate.toFixed(rate < 0.1 ? 3 : 2) + '/kWh: about **$' + fx(kw * hrs * rate) + ' a day** (' + '$' + fx(kw * hrs * rate * 365) + ' a year), not counting demand charges.');
      return done(state, api, 'Pumping energy', lines, ['pump-energy', 'affinity-laws', 'pump-system-curve']);
    },
    /* Affinity laws for a speed change */
    function (P, state, api) {
      var r = P.all('rpm'), ratio = null, how = '';
      if (r.length >= 2) { ratio = r[1].v / r[0].v; how = fx(r[0].v) + ' → ' + fx(r[1].v) + ' rpm'; }
      else if (/affinity|speed/.test(P.t) && P.get('pct') && /speed/.test(P.t)) { ratio = P.get('pct').v / 100; how = fx(P.get('pct').v) + '% speed'; }
      if (!ratio || !/affinity|speed|rpm|vfd/.test(P.t)) return null;
      var lines = ['Speed ratio = ' + fx(ratio) + ' (' + how + ')', 'Flow × ' + fx(ratio) + ', head × ' + fx(ratio * ratio) + ', power × ' + fx(Math.pow(ratio, 3)) + '.'];
      var f = flowGpm(P), h = P.get('ft'), hp = P.get('hp');
      if (f) lines.push('Flow: ' + fx(f.v) + ' → **' + fx(f.v * ratio) + ' gpm**');
      if (h) lines.push('Head: ' + fx(h.v) + ' → **' + fx(h.v * ratio * ratio) + ' ft**');
      if (hp) lines.push('Power: ' + fx(hp.v) + ' → **' + fx(hp.v * Math.pow(ratio, 3)) + ' hp**');
      return done(state, api, 'Pump affinity laws', lines, ['affinity-laws', 'pump-system-curve', 'pump-energy'], 'These scale the pump curve; the actual operating point also depends on the system curve (static head doesn\'t scale).');
    },
    /* Volume of water in a pipe */
    function (P, state, api) {
      if (!/pipe|main|line/.test(P.t) || !/volume|gallons|how much water|hold|holds|contain/.test(P.t)) return null;
      var d = P.get('in'), L = P.get('ft');
      if (!d || !L) return null;
      var gal = 0.0408 * d.v * d.v * L.v, f = flowGpm(P);
      var lines = ['**Gallons = 0.0408 × d² × L** = 0.0408 × ' + fx(d.v) + '² × ' + fx(L.v) + ' = **' + fx(gal) + ' gallons**'];
      if (f) lines.push('At ' + fx(f.v) + ' gpm, one pipe volume takes about **' + fx(gal / f.v) + ' minutes** to flush.');
      return done(state, api, 'Water in a pipe', lines, ['main-disinfection', 'unidirectional-flushing', 'flushing']);
    },
    /* Reynolds number */
    function (P, state, api) {
      if (!/reynolds/.test(P.t)) return null;
      var f = flowGpm(P), d = P.get('in');
      if (!f || !d) return null;
      var tF = tempF(P), note = '';
      if (tF == null) { tF = 60; note = ' (60°F water assumed.)'; }
      var V = 0.4085 * f.v / (d.v * d.v), nu = nuAt(tF), Re = V * (d.v / 12) / nu;
      return done(state, api, 'Reynolds number', [
        'Velocity = 0.4085 × ' + fx(f.v) + ' ÷ ' + fx(d.v) + '² = ' + fx(V) + ' ft/s; ν at ' + fx(tF) + '°F ≈ ' + nu.toExponential(2) + ' ft²/s',
        '**Re = V × D ÷ ν** = **' + fx(Re) + '**, which is ' + (Re < 2000 ? '**laminar**.' : Re < 4000 ? '**transitional**.' : '**turbulent**.') + note
      ], ['reynolds-number', 'darcy-weisbach', 'hw-equation']);
    },
    /* Hazen-Williams head loss */
    function (P, state, api) {
      if (!/head ?loss|friction ?loss|hazen|pressure (?:loss|drop)/.test(P.t)) return null;
      var f = flowGpm(P), d = P.get('in');
      if (!f || !d) return null;
      var lens = P.all('ft'), L = lens.length ? lens[0].v : 1000, noteL = lens.length ? '' : ' (per 1,000 ft of pipe)';
      var cm = P.t.match(/\bc(?:[ -]?(?:factor|value))?\s*(?:=|of|is|:)?\s*(\d{2,3})\b/), C = cm ? parseFloat(cm[1]) : 120;
      var hf = 10.44 * L * Math.pow(f.v, 1.852) / (Math.pow(C, 1.852) * Math.pow(d.v, 4.87));
      var V = 0.4085 * f.v / (d.v * d.v);
      return done(state, api, 'Hazen-Williams head loss', [
        f.note + '**hf = 10.44 × L × Q^1.852 ÷ (C^1.852 × d^4.87)** = 10.44 × ' + fx(L) + ' × ' + fx(f.v) + '^1.852 ÷ (' + fx(C) + '^1.852 × ' + fx(d.v) + '^4.87)',
        '= **' + fx(hf) + ' ft** of head loss (**' + fx(hf * 0.433) + ' psi**)' + noteL + (L !== 1000 ? '; that\'s ' + fx(hf / L * 1000) + ' ft per 1,000 ft.' : '.'),
        'Velocity = 0.4085 × ' + fx(f.v) + ' ÷ ' + fx(d.v) + '² = **' + fx(V) + ' ft/s**' + (V > 5 ? ' (on the high side for everyday flow).' : '.') + (cm ? '' : ' (C = 120 assumed; add “C 140” or another value to change it.)')
      ], ['hw-equation', 'hazen-williams', 'network-design']);
    },
    /* Pipe velocity */
    function (P, state, api) {
      if (!/velocity|how fast|\bfps\b|ft\/s|feet per second/.test(P.t)) return null;
      var f = flowGpm(P), d = P.get('in');
      if (!f || !d) return null;
      var V = 0.4085 * f.v / (d.v * d.v);
      return done(state, api, 'Pipe velocity', [f.note + '**V = 0.4085 × gpm ÷ d²** = 0.4085 × ' + fx(f.v) + ' ÷ ' + fx(d.v) + '² = **' + fx(V) + ' ft/s**', 'Velocity head V²/2g = ' + fx(V * V / 64.35) + ' ft.'], ['network-design', 'hw-equation', 'unidirectional-flushing']);
    },
    /* Log removal ↔ percent */
    function (P, state, api) {
      if (!/\blogs?\b/.test(P.t)) return null;
      var io = P.t.match(/(?:from|influent|in|raw)\s*(\d*\.?\d+)\s*(?:to|effluent|out|finished)\s*(\d*\.?\d+)/);
      if (io && parseFloat(io[2]) > 0) {
        var a = parseFloat(io[1]), b = parseFloat(io[2]), L = Math.log10(a / b);
        return done(state, api, 'Log removal', ['**Log removal = log₁₀(in ÷ out)** = log₁₀(' + fx(a) + ' ÷ ' + fx(b) + ') = **' + L.toFixed(2) + '-log** (' + (100 * (1 - b / a)).toFixed(4).replace(/0+$/, '').replace(/\.$/, '') + '% removed)'], ['log-credits', 'lt2-bins', 'ct-calc']);
      }
      var pc = P.get('pct');
      if (pc && pc.v > 0 && pc.v < 100) {
        var lg = -Math.log10(1 - pc.v / 100);
        return done(state, api, 'Percent to log', ['**Log = −log₁₀(1 − fraction removed)** = −log₁₀(1 − ' + (pc.v / 100) + ') = **' + lg.toFixed(2) + '-log**'], ['log-credits', 'lt2-bins', 'swtr']);
      }
      var lm = P.t.match(/(\d*\.?\d+)\s*[- ]?logs?\b/);
      if (!lm || /virus|giardia|crypto|requirement|rule|credit|treatment|ground water|groundwater|gwr|swtr|lt2/.test(P.t)) return null;
      if (!/percent|%|how much|convert|equal|mean|is that|what is|what's|whats/.test(P.t) && P.t.split(/\s+/).length > 4) return null;
      var Lg = parseFloat(lm[1]), pct = 100 * (1 - Math.pow(10, -Lg)), left = Math.pow(10, Lg);
      return done(state, api, 'Log to percent', ['**' + fx(Lg) + '-log = ' + pct.toFixed(Math.min(8, Math.ceil(Lg) + 1)).replace(/0+$/, '').replace(/\.$/, '') + '% removed or inactivated**', 'About 1 in ' + fx(left) + ' organisms is left.'], ['log-credits', 'lt2-bins', 'ct-calc']);
    },
    /* Unit conversions */
    function (P, state, api) {
      var tm = P.t.match(/\b(?:to|in|into|as)\s+(gpm|mgd|cfs|gallons?|gal|cubic feet|cu ft|ft3|liters?|litres?|cubic met(?:er|re)s?|m3|psi|kpa|bars?|celsius|fahrenheit|°c|°f|degrees? c|degrees? f|met(?:er|re)s?|feet|ft|grains? per gallon|gpg|mg\/l|ppm|ppb|ug\/l|µg\/l|kg|kilograms?|lbs?|pounds?|acre[ -]?f(?:ee|oo)t|acre[ -]?ft|c|f)\b/);
      if (!tm || P.list.length !== 1 || !P.list[0].u) return null;
      var q = P.list[0], v = q.v, to = tm[1].length > 3 ? tm[1].replace(/s$/, '') : tm[1], out = null, lbl = '';
      function T(re) { return re.test(to); }
      var u = q.u;
      if (u === 'cfs' && T(/gpm/)) { out = v * 448.83; lbl = 'gpm'; }
      else if (u === 'cfs' && T(/mgd/)) { out = v * 0.6463; lbl = 'MGD'; }
      else if (u === 'gpm' && T(/cfs/)) { out = v / 448.83; lbl = 'cfs'; }
      else if (u === 'mgd' && T(/cfs/)) { out = v / 0.6463; lbl = 'cfs'; }
      else if (u === 'mgd' && T(/m3|cubic met/)) { out = v * 3785.41; lbl = 'm³ per day'; }
      else if (u === 'af' && T(/gal/)) { out = v * 325851; lbl = 'gallons'; }
      else if (u === 'gal' && T(/acre/)) { out = v / 325851; lbl = 'acre-feet'; }
      else if (u === 'gal' && T(/cubic f|cu ft|ft3/)) { out = v / 7.4805; lbl = 'ft³'; }
      else if (u === 'cf' && T(/gal/)) { out = v * 7.4805; lbl = 'gallons'; }
      else if (u === 'gal' && T(/lit/)) { out = v * 3.78541; lbl = 'liters'; }
      else if (u === 'liter' && T(/gal/)) { out = v / 3.78541; lbl = 'gallons'; }
      else if (u === 'gal' && T(/m3|cubic met/)) { out = v * 0.00378541; lbl = 'm³'; }
      else if (u === 'm3' && T(/gal/)) { out = v * 264.172; lbl = 'gallons'; }
      else if (u === 'psi' && T(/kpa/)) { out = v * 6.89476; lbl = 'kPa'; }
      else if (u === 'psi' && T(/bar/)) { out = v * 0.0689476; lbl = 'bar'; }
      else if (u === 'kpa' && T(/psi/)) { out = v / 6.89476; lbl = 'psi'; }
      else if (u === 'bar' && T(/psi/)) { out = v / 0.0689476; lbl = 'psi'; }
      else if (u === 'degF' && T(/c(?:elsius)?$|°c|degrees? c/)) { out = (v - 32) * 5 / 9; lbl = '°C'; }
      else if (u === 'degC' && T(/f(?:ahrenheit)?$|°f|degrees? f/)) { out = v * 9 / 5 + 32; lbl = '°F'; }
      else if (u === 'ft' && T(/met/)) { out = v * 0.3048; lbl = 'meters'; }
      else if (u === 'm' && T(/^f/)) { out = v / 0.3048; lbl = 'feet'; }
      else if (u === 'gpg' && T(/mg\/l|ppm/)) { out = v * 17.1; lbl = 'mg/L'; }
      else if (u === 'mgl' && T(/grain|gpg/)) { out = v / 17.1; lbl = 'grains per gallon'; }
      else if (u === 'mgl' && T(/ppb|ug\/l|µg\/l/)) { out = v * 1000; lbl = 'µg/L (ppb)'; }
      else if (u === 'ugl' && T(/mg\/l|ppm/)) { out = v / 1000; lbl = 'mg/L (ppm)'; }
      else if (u === 'lb' && T(/kg|kilogram/)) { out = v * 0.453592; lbl = 'kg'; }
      else if (u === 'kg' && T(/lb|pound/)) { out = v / 0.453592; lbl = 'lb'; }
      if (out == null) return null;
      var NAME = { cfs: 'cfs', gpm: 'gpm', mgd: 'MGD', af: 'acre-feet', gal: 'gallons', cf: 'ft³', liter: 'liters', m3: 'm³', psi: 'psi', kpa: 'kPa', bar: 'bar', degF: '°F', degC: '°C', ft: 'ft', m: 'meters', gpg: 'grains per gallon', mgl: 'mg/L', ugl: 'µg/L', lb: 'lb', kg: 'kg' };
      return done(state, api, 'Conversion', ['**' + fx(v) + ' ' + (NAME[u] || u) + ' = ' + minus(fx(out)) + ' ' + lbl + '**'], ['conversions', 'units-concentration', 'math-tips']);
    }
  ];
  function hydroCalc(raw, norm, state, api) {
    if (!/\d/.test(raw)) return null;
    var P = parse(raw);
    for (var i = 0; i < HCALC.length; i++) {
      var out = HCALC[i](P, state, api);
      if (out) return out;
    }
    return null;
  }

  /* ---------- More official sources for the new answers ---------- */
  S.jmp = ['WHO/UNICEF JMP', 'Household drinking water, sanitation and hygiene 2000–2024', 'https://washdata.org/reports/jmp-2025-wash-households'];
  S.atlas15 = ['NOAA', 'NOAA Atlas 15', 'https://water.noaa.gov/about/atlas15'];
  S.hypoxia = ['NOAA', '2026 Gulf hypoxic zone measurement', 'https://www.noaa.gov/news-release/noaa-and-partners-find-smaller-than-anticipated-hypoxic-zone-in-gulf-of-america'];
  S.htf = ['EPA', 'Hypoxia Task Force goals', EPA + 'ms-htf/hypoxia-task-force-action-plans-and-goal-framework'];
  S.yazoo = ['EPA', 'Yazoo Backwater Area Pumps Project', EPA + 'cwa-404/yazoo-backwater-area-pumps-project'];
  S.jxnSewer = ['EPA', 'Jackson, MS sewer system', EPA + 'ms/jackson-ms-sewer-system'];
  S.asce = ['ASCE', '2025 Infrastructure Report Card', 'https://infrastructurereportcard.org/'];
  S.habRec = ['EPA', 'Cyanotoxins and recreation', EPA + 'habs/protecting-human-health-cyanotoxin-exposure-during-recreation'];
  S.cr6 = ['California Water Boards', 'Hexavalent chromium (Chromium-6)', 'https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/Chromium6.html'];
  S.dprCA = ['California Water Boards', 'Regulating direct potable reuse', 'https://waterboards.ca.gov/drinking_water/certlic/drinkingwater/direct_potable_reuse.html'];
  S.gwrs = ['OCWD', 'Groundwater Replenishment System', 'https://www.ocwd.com/gwrs/'];
  S.msrb = ['MSRB', 'Mississippi State Rating Bureau', 'https://msratingbureau.com/'];
  S.nfpaFlow = ['NFPA', 'Calculating the required fire flow', 'https://www.nfpa.org/news-blogs-and-articles/blogs/2022/03/22/calculating-the-required-fire-flow'];
  S.flood1927 = ['MDAH', 'The Flood of 1927 and its impact in Greenville', 'https://mshistorynow.mdah.ms.gov/issue/the-flood-of-1927-and-its-impact-in-greenville-mississippi'];
  S.easter1979 = ['NWS Jackson', 'The 1979 Easter flood', 'https://www.weather.gov/jan/1979_04_17_easter_flood'];
  S.msClimate = ['NCICS', 'Mississippi state climate summary', 'https://statesummaries.ncics.org/chapter/ms/'];
  S.pascagoula = ['MDEQ', 'Pascagoula River basin', 'https://www.mdeq.ms.gov/water/surface-water/watershed-management/basin-management-approach/basin-listing/pascagoula-river/'];
  S.rossBarnett = ['MDWFP', 'Ross Barnett Reservoir', 'https://www.mdwfp.com/fishing-boating/lakes/ross-barnett-reservoir'];
  S.bonnet = ['MDMR', 'Bonnet Carré Spillway monitoring', 'https://dmr.ms.gov/task-force-provides-bonnet-carre-spillway-monitoring-update/'];
  S.reu = ['AWE', 'Residential End Uses of Water study', 'https://allianceforwaterefficiency.org/resource/residential-end-uses-water-study-1999-and-2016/'];
  var MORE_SRC = {
    'global-access': ['jmp'], 'idf-curves': ['atlas15'], 'gulf-hypoxia': ['hypoxia', 'htf'], 'yazoo-pumps': ['yazoo'],
    'sso-cso': ['jxnSewer'], 'main-break-stats': ['asce'], 'harmful-algal-blooms': ['habRec'], 'chromium-6': ['cr6'],
    'water-reuse': ['gwrs', 'dprCA'], 'fire-flow': ['msrb', 'nfpaFlow'], 'ms-floods': ['flood1927', 'easter1979'],
    'water-budget': ['msClimate'], 'ms-rivers': ['pascagoula'], 'ms-reservoirs': ['rossBarnett'], 'bonnet-carre': ['bonnet'],
    'home-water-use': ['reu'], 'dbp-control': ['mdbp'], 'lead-corrosion-chem': ['lcri'], 'emerging-contaminants': ['ccl'],
    'pfas-chemistry': ['pfas'], 'wetlands': ['wotus'], 'water-rights-doctrines': ['mdeqPermit'], 'wastewater-overview': ['npdes'],
    'stormwater-design': ['npdes'], 'drought': ['mdeqDelta']
  };

  /* ---------- Register the new answers ---------- */
  var have = {};
  GA.entries.forEach(function (e) { have[e.id] = e; });
  X.forEach(function (e) {
    var keys = (e.src || []).concat(MORE_SRC[e.id] || []);
    if (keys.length) e.links = keys.map(function (k) { return S[k]; }).filter(Boolean);
    delete e.src;
    if (have[e.id]) return;
    have[e.id] = e;
    GA.entries.push(e);
  });

  /* ---------- Connect the original answers to the deeper ones ---------- */
  function addRel(id, extra) {
    var e = have[id];
    if (!e) return;
    var rel = (e.rel || []).filter(function (r) { return r !== extra; });
    e.rel = rel.slice(0, 2).concat([extra], rel.slice(2));
  }
  [['hazen-williams', 'hw-equation'], ['water-hammer', 'surge-analysis'], ['pump-curve', 'pump-system-curve'], ['cavitation', 'npsh-calc'],
   ['storage', 'storage-sizing'], ['flushing', 'unidirectional-flushing'], ['hydrants', 'hydrant-flow-test'], ['water-loss', 'water-audit'],
   ['aquifer-types', 'ms-aquifer-list'], ['drawdown', 'theis'], ['aquifer-properties', 'darcys-law'], ['pathogens', 'cryptosporidium'],
   ['algae', 'harmful-algal-blooms'], ['dbps', 'dbp-control'], ['corrosion-control', 'lsi-indices'], ['lead-copper', 'lead-corrosion-chem'],
   ['iron-manganese', 'fe-mn-treatment'], ['membranes', 'membrane-engineering'], ['activated-carbon', 'gac-engineering'], ['uv', 'uv-dose'],
   ['swtr', 'log-credits'], ['pfas', 'ucmr5-results'], ['ms-groundwater', 'ms-aquifer-list'], ['sdwa', 'rules-overview'],
   ['main-breaks', 'main-break-stats'], ['valves', 'prv'], ['tank-maintenance', 'tank-mixing'], ['nitrification', 'chloramine-chemistry'],
   ['coagulation', 'coagulation-mechanisms'], ['filtration', 'filter-design'], ['sedimentation', 'sedimentation-theory'], ['outbreaks', 'cryptosporidium'],
   ['ph', 'ph-kw'], ['alkalinity', 'carbonate-system'], ['tds', 'ec-tds'], ['coliform', 'fecal-indicators'], ['static-head', 'hgl-egl'],
   ['dynamic-head', 'minor-losses'], ['affinity-laws', 'pump-energy'], ['distribution-pressure', 'pressure-zones'], ['main-size', 'network-design'],
   ['nitrate', 'nitrate-treatment'], ['arsenic', 'arsenic-treatment'], ['wellhead-protection', 'contaminant-transport'], ['epa-rules', 'site-regulations']
  ].forEach(function (p) { addRel(p[0], p[1]); });

  /* The original overview answer named the big aquifers; let the
     aquifer-by-aquifer answers win those questions now */
  if (have['ms-groundwater']) {
    have['ms-groundwater'].k = have['ms-groundwater'].k.map(function (k) {
      return /^(?:sparta|wilcox|citronelle|cockfield|alluvial aquifer):/.test(k) ? k.replace(/:\d+$/, ':2') : k;
    });
  }
  function addKeys(id, ks) { if (have[id]) have[id].k = (have[id].k || []).concat(ks); }
  addKeys('cylinders', ['150 lb cylinder*:7', '150 pound cylinder*:7', 'ton cylinder*:7']);
  addKeys('hydrants', ['dry barrel hydrant*:7', 'wet barrel hydrant*:7']);
  if (have['greg-intro']) {
    have['greg-intro'].a = "I'm Greg, your LearnWater instructor. I can explain anything in the 14 chapters of the Mississippi Waterworks Operators Manual: regulations, certification, math, hydraulics, wells, microbiology, chemistry, treatment, distribution, chlorination, safety, and cross-connection control.\n\n" +
      "I go well past the exam too: **water regulations and UCMR**, **Mississippi's aquifers**, **hydraulic modeling**, groundwater science, hydrology and floods, treatment and wastewater engineering, water chemistry and microbiology, and water history.\n\n" +
      "I work problems. Try **“lbs/day for 2.5 mg/l at 1.5 mgd”**, **“head loss 500 gpm 8 inch 1,000 ft C 120”**, **“static 70 residual 50 flow 1,200 gpm”**, or **“water hammer 4 ft/s ductile iron 2,000 ft.”**\n\n" +
      "I know nearly **500 glossary terms**. Ask **“define turbidity”** or **“what does RPZ mean?”**\n\n" +
      "I can also **search EPA, NRWA, and MsRWA** for you. Try **“search EPA for lead service lines.”**";
    have['greg-intro'].rel = ['site-regulations', 'site-aquifers', 'site-modeling'];
  }

  /* ---------- Skills: place lookup and calculators run before the originals ---------- */
  var at = -1;
  GA.skills.forEach(function (f, i) { if (at < 0 && f && f.name === 'calcSkill') at = i; });
  if (at < 0) at = Math.max(0, GA.skills.length - 1);
  GA.skills.splice(at, 0, placeSkill, hydroCalc);
  GA.starterChips = ['What is the pounds formula?', 'Explain the breakpoint chlorination curve.', 'Which aquifers are under DeSoto County?', 'How is a hydraulic model calibrated?'];

  GA.brain = { entries: X.length, hydroCalc: hydroCalc, placeSkill: placeSkill };
})(window);
