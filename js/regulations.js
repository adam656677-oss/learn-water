/* ==========================================================
   LearnWater — Regulations page (regulations.html)
   Rule finder, rule explorer, searchable limits table, UCMR 5
   and UCMR 6 lists, timeline, and the quiz bank.
   Status and dates checked September 2026.
   ========================================================== */
(function (global) {
  'use strict';

  var esc = LW.esc;
  function $(x) { return document.getElementById(x); }
  function fold(s) { return String(s || '').toLowerCase().replace(/[₀-₉]/g, function (d) { return String(d.charCodeAt(0) - 0x2080); }).replace(/[µμ]/g, 'u').replace(/[‐-―]/g, '-'); }

  var EPA = 'https://www.epa.gov/';
  var L = {
    rtcr: ['EPA: Revised Total Coliform Rule', EPA + 'dwreginfo/revised-total-coliform-rule-and-total-coliform-rule'],
    gwr: ['EPA: Ground Water Rule', EPA + 'dwreginfo/ground-water-rule'],
    swtr: ['EPA: Surface Water Treatment Rules', EPA + 'dwreginfo/surface-water-treatment-rules'],
    dbp: ['EPA: Stage 1 and Stage 2 DBP Rules', EPA + 'dwreginfo/stage-1-and-stage-2-disinfectants-and-disinfection-byproducts-rules'],
    mdbp: ['EPA: Potential MDBP rule revisions', EPA + 'dwsixyearreview/potential-revisions-microbial-and-disinfection-byproducts-rules'],
    chem: ['EPA: Chemical Contaminant Rules', EPA + 'dwreginfo/chemical-contaminant-rules'],
    npdwr: ['EPA: National Primary Drinking Water Regulations', EPA + 'ground-water-and-drinking-water/national-primary-drinking-water-regulations'],
    perc: ['EPA: Perchlorate in drinking water', EPA + 'sdwa/perchlorate-drinking-water'],
    fluoride: ['EPA: Fluoride in drinking water', EPA + 'sdwa/fluoride-drinking-water'],
    lcri: ['EPA: Lead and Copper Rule Improvements', EPA + 'ground-water-and-drinking-water/lead-and-copper-rule-improvements'],
    pfas: ['EPA: PFAS drinking water regulation', EPA + 'sdwa/and-polyfluoroalkyl-substances-pfas'],
    ucmr5: ['EPA: UCMR 5', EPA + 'dwucmr/fifth-unregulated-contaminant-monitoring-rule'],
    ucmr6: ['EPA: Proposed UCMR 6', EPA + 'dwucmr/proposed-sixth-unregulated-contaminant-monitoring-rule'],
    pn: ['EPA: Public Notification Rule', EPA + 'dwreginfo/public-notification-rule'],
    ccr: ['EPA: CCR Rule revisions', EPA + 'ccr/consumer-confidence-report-rule-revisions'],
    secondary: ['EPA: Secondary standards', EPA + 'sdwa/secondary-drinking-water-standards-guidance-nuisance-chemicals'],
    opcert: ['EPA: Operator certification', EPA + 'dwcapacity/about-operator-certification'],
    awia: ['EPA: AWIA Section 2013', EPA + 'waterresilience/awia-section-2013'],
    cwa: ['EPA: Summary of the Clean Water Act', EPA + 'laws-regulations/summary-clean-water-act'],
    npdes: ['EPA: NPDES', EPA + 'npdes'],
    wotus: ['EPA: Waters of the United States', EPA + 'wotus']
  };

  /* ================= RULE EXPLORER ================= */
  var CATS = [
    ['micro', 'Microbial', '#0e7490'], ['dbp', 'Disinfection & DBPs', '#7c3aed'], ['chem', 'Chemicals', '#b45309'],
    ['lead', 'Lead & copper', '#9a3412'], ['emerging', 'PFAS & emerging', '#be123c'], ['rad', 'Radionuclides', '#4d7c0f'],
    ['info', 'Public information', '#1d4ed8'], ['ops', 'Operations & security', '#334155'], ['cwa', 'Clean Water Act', '#047857'],
    ['other', 'Other laws', '#6b21a8']
  ];
  var CAT = {};
  CATS.forEach(function (c) { CAT[c[0]] = { name: c[1], color: c[2] }; });
  var STATUS = { final: ['final', 'Final'], proposed: ['proposed', 'Proposed'], dev: ['dev', 'In development'], court: ['court', 'In court'] };

  var RULES = [
    { c: 'micro', n: 'Revised Total Coliform Rule (RTCR)', y: 'Final 2013 · in effect April 1, 2016', st: 'final', who: 'All public water systems',
      k: ['E. coli MCL. A violation occurs when an E. coli-positive repeat follows a total coliform-positive routine sample, a total coliform-positive repeat follows an E. coli-positive routine sample, all repeats aren\'t taken after an E. coli-positive routine sample, or a total coliform-positive repeat isn\'t tested for E. coli.',
        'Total coliforms are a treatment technique trigger, not an MCL.',
        'At least 3 repeat samples within 24 hours of each total coliform-positive routine sample.',
        'Level 1 assessment triggers include more than 5% positive samples in a month (40 or more samples a month) or more than one positive sample (fewer than 40 a month). An E. coli MCL violation, or a second Level 1 trigger within 12 months, triggers a Level 2 assessment.'],
      d: ['Sample by a written sample siting plan.', 'Finish each assessment and send it to the state within 30 days of the trigger, then correct any sanitary defects found.', 'Seasonal systems follow a state-approved start-up procedure before opening.'], l: L.rtcr },
    { c: 'micro', n: 'Ground Water Rule (GWR)', y: 'Final 2006 · in effect December 1, 2009', st: 'final', who: 'Systems that use ground water',
      k: ['Triggered source water monitoring: after a total coliform-positive routine sample, collect a raw water sample from every well in use within 24 hours.',
        'If a source sample is positive for a fecal indicator such as E. coli, collect five more source samples within 24 hours, unless the state requires corrective action right away.',
        'Significant deficiencies must be fixed, or be on a state-approved plan, within 120 days of notice.',
        'Systems that provide 4-log virus treatment must monitor to prove it, for example with a minimum disinfectant residual.'],
      d: ['Keep wellheads sealed, screened, and protected.', 'Sanitary surveys every 3 years for community systems (5 for outstanding performers) and every 5 years for non-community systems.'], l: L.gwr },
    { c: 'micro', n: 'Surface Water Treatment Rule (SWTR)', y: 'Final 1989', st: 'final', who: 'Surface water and GWUDI systems',
      k: ['At least 3-log (99.9%) removal or inactivation of Giardia and 4-log (99.99%) of viruses.',
        'Filtration is required unless the source meets strict criteria to avoid it.',
        'Residual entering the distribution system: at least 0.2 mg/L, and never below that for more than 4 hours.',
        'A detectable residual (or HPC of 500/mL or less) in at least 95% of distribution samples each month.'],
      d: ['Calculate CT daily to prove inactivation.', 'Monitor turbidity and residuals on the required schedule.'], l: L.swtr },
    { c: 'micro', n: 'Interim Enhanced SWTR (IESWTR)', y: 'Final 1998', st: 'final', who: 'Surface water and GWUDI systems serving 10,000 or more',
      k: ['2-log (99%) Cryptosporidium removal.', 'Combined filter effluent turbidity: 0.3 NTU or less in 95% of monthly measurements and never above 1 NTU (conventional and direct filtration).', 'Continuous turbidity monitoring on every individual filter.', 'Disinfection profiling and benchmarking before major disinfection changes.'],
      d: ['Record individual filter turbidity at least every 15 minutes.', 'Cover any new finished water reservoir.'], l: L.swtr },
    { c: 'micro', n: 'Long Term 1 Enhanced SWTR (LT1ESWTR)', y: 'Final 2002', st: 'final', who: 'Surface water and GWUDI systems serving fewer than 10,000',
      k: ['Extends the IESWTR protections to small systems: 2-log Cryptosporidium removal and the 0.3 / 1 NTU combined filter effluent limits.', 'Individual filter turbidity monitoring, recorded at least every 15 minutes.', 'Disinfection profiling and benchmarking.'],
      d: ['Follow up on individual filter turbidity exceedances with filter self-assessments when required.'], l: L.swtr },
    { c: 'micro', n: 'Long Term 2 Enhanced SWTR (LT2ESWTR)', y: 'Final 2006', st: 'final', who: 'All surface water and GWUDI systems',
      k: ['Source water Cryptosporidium monitoring places filtered systems in bins 1 through 4.', 'Bin 1 needs no added treatment. Bins 2–4 need 1 to 2.5 more logs from a “microbial toolbox” of options such as UV, ozone, or membranes.', 'Unfiltered systems must provide 2 or 3 logs of Cryptosporidium inactivation.', 'Uncovered finished water storage must be covered or its outflow treated.'],
      d: ['Two rounds of source water monitoring, the second about six years after the first.'], l: L.swtr },
    { c: 'micro', n: 'Filter Backwash Recycling Rule (FBRR)', y: 'Final 2001', st: 'final', who: 'Conventional and direct filtration plants that recycle',
      k: ['Spent filter backwash, thickener supernatant, and liquids from dewatering must go back through all treatment processes, returned at or before the point of primary coagulant addition.', 'The state must be notified, and recycle flows recorded.'],
      d: ['Keep records of recycle flow, frequency, and treatment.'], l: L.swtr },
    { c: 'dbp', n: 'Stage 1 Disinfectants and DBP Rule', y: 'Final 1998', st: 'final', who: 'CWS and NTNCWS that add a disinfectant other than UV; TNCWS that use chlorine dioxide',
      k: ['MCLs: TTHM 0.080, HAA5 0.060, bromate 0.010 (ozone plants), chlorite 1.0 mg/L (chlorine dioxide plants).', 'MRDLs: chlorine 4.0 and chloramines 4.0 mg/L as Cl₂; chlorine dioxide 0.8 mg/L.', 'Conventional surface water plants must remove a set percentage of TOC (enhanced coagulation), based on source TOC and alkalinity.'],
      d: ['Monitor DBPs and residuals on schedule.', 'Track TOC removal ratios each month.'], l: L.dbp },
    { c: 'dbp', n: 'Stage 2 DBP Rule', y: 'Final 2006', st: 'final', who: 'The same systems, including consecutive systems that receive disinfected water',
      k: ['Compliance is a locational running annual average (LRAA) at each monitoring site: TTHM 0.080 and HAA5 0.060 mg/L.', 'The Initial Distribution System Evaluation (IDSE) found each system\'s high-DBP sites.', 'An operational evaluation level (the two previous quarters plus twice the current quarter, divided by 4) above the MCL means the system must evaluate its operations.'],
      d: ['Sample at the sites and schedule in the monitoring plan.', 'Watch water age, tank turnover, and flushing, which drive DBP levels.'], l: L.dbp },
    { c: 'dbp', n: 'Microbial and DBP rule revisions (MDBP)', y: 'In development', st: 'dev', who: 'Could affect every system that disinfects',
      k: ['EPA must propose revisions by July 30, 2027, and finalize them by October 2, 2028.', 'Ideas under discussion include stronger disinfectant residual requirements, more distribution system monitoring, and better control of DBP precursors.'],
      d: ['Good preparation now: know your residual trends, water age, and DBP precursors (TOC).'], l: L.mdbp },
    { c: 'chem', n: 'Chemical contaminant rules (Phases I, II, IIB, V)', y: 'Final 1987–1992', st: 'final', who: 'CWS and NTNCWS; nitrate and nitrite apply to every public water system',
      k: ['About 65 inorganic, volatile organic, and synthetic organic chemicals have MCLs. See the limits table.', 'Standard monitoring framework: 9-year cycles of three 3-year compliance periods. The current cycle runs 2020–2028.', 'States can grant monitoring waivers based on vulnerability.'],
      d: ['Follow your state monitoring schedule for IOCs, VOCs, and SOCs.', 'Nitrate is sampled at least yearly; results over 5 mg/L as N increase monitoring.'], l: L.chem },
    { c: 'chem', n: 'Arsenic Rule', y: 'Final 2001 · compliance January 23, 2006', st: 'final', who: 'CWS and NTNCWS',
      k: ['MCL lowered from 0.050 to 0.010 mg/L; the MCLG is zero.', 'Treatment options include oxidation plus iron-based adsorption or coagulation and filtration, ion exchange, and reverse osmosis.'],
      d: ['Oxidize arsenic(III) to arsenic(V) before removal; As(V) is removed far more easily.'], l: L.chem },
    { c: 'chem', n: 'Perchlorate (proposed)', y: 'Proposed January 6, 2026', st: 'proposed', who: 'Would apply to CWS and NTNCWS',
      k: ['Proposed MCLG: 0.02 mg/L (20 µg/L).', 'EPA took comment on an MCL of 20, 40, or 80 µg/L.', 'A court-ordered deadline requires a final rule by May 21, 2027.', 'Perchlorate can interfere with the thyroid\'s use of iodide. Sources include rocket propellant, fireworks, and old or overheated hypochlorite solution.'],
      d: ['Store hypochlorite cool, dark, and fresh, which limits perchlorate and chlorate formation.'], l: L.perc },
    { c: 'chem', n: 'Fluoride', y: 'MCL since 1986 · science review under way', st: 'dev', who: 'Community water systems',
      k: ['MCL 4.0 mg/L protects against crippling skeletal fluorosis. The secondary standard of 2.0 mg/L protects against dental fluorosis.', 'The U.S. Public Health Service recommends 0.7 mg/L where fluoride is added.', 'EPA began an expedited review of fluoride science in 2026. Utah and Florida banned adding fluoride in 2025.'],
      d: ['Where fluoride is added, keep it close to 0.7 mg/L and follow your state\'s fluoridation requirements.'], l: L.fluoride },
    { c: 'chem', n: 'Secondary (aesthetic) standards', y: '40 CFR 143', st: 'final', who: 'Guidelines for all systems; not federally enforceable',
      k: ['Examples: iron 0.3, manganese 0.05, chloride 250, sulfate 250, TDS 500, fluoride 2.0 mg/L; pH 6.5–8.5; color 15 units; odor 3 threshold odor number.', 'They address taste, odor, color, staining, and scaling. A state may make some enforceable.'],
      d: ['Iron, manganese, and naturally tea-colored water are common secondary problems in Mississippi ground water.'], l: L.secondary },
    { c: 'lead', n: 'Lead and Copper Rule (LCR)', y: 'Final 1991', st: 'final', who: 'CWS and NTNCWS',
      k: ['Action levels, measured at the 90th percentile of customer tap samples: lead 0.015 mg/L, copper 1.3 mg/L.', 'Exceeding an action level triggers corrosion control treatment, source water treatment, public education, and lead service line replacement.'],
      d: ['Collect first-draw tap samples from high-risk homes.', 'Keep water quality parameters (pH, alkalinity, orthophosphate) in range.'], l: L.lcri },
    { c: 'lead', n: 'Lead and Copper Rule Revisions (LCRR)', y: 'Final 2021', st: 'final', who: 'CWS and NTNCWS',
      k: ['Initial service line inventory due October 16, 2024.', 'A 0.010 mg/L “trigger level” (dropped again by the LCRI).', 'Find-and-fix follow-up at homes above the action level, and lead testing in schools and child care facilities.'],
      d: ['Keep the inventory current as unknown lines are identified.', 'Notify customers served by lead, galvanized requiring replacement, or unknown lines each year.'], l: L.lcri },
    { c: 'lead', n: 'Lead and Copper Rule Improvements (LCRI)', y: 'Final October 2024 · compliance November 1, 2027', st: 'final', who: 'CWS and NTNCWS',
      k: ['Lead action level drops to 0.010 mg/L; copper stays 1.3 mg/L.', 'Most systems must replace all lead and “galvanized requiring replacement” service lines within 10 years, at an average of 10% a year (rolling three-year average).', 'Homes with lead lines are sampled at the first and fifth liter, and the higher result counts.', 'Systems with repeated action level exceedances must make certified filters available.'],
      d: ['A baseline inventory and a replacement plan are due by November 1, 2027.', 'Plan the first-and-fifth-liter sampling and customer outreach now.'], l: L.lcri },
    { c: 'lead', n: '“Lead free” plumbing (SDWA §1417)', y: '1986 ban · 2011 amendment in effect January 4, 2014', st: 'final', who: 'All plumbing in contact with drinking water',
      k: ['Pipes, fittings, and fixtures may average no more than 0.25% lead on wetted surfaces.', 'Solder and flux may contain no more than 0.2% lead.'],
      d: ['Use only certified lead-free materials for repairs and new service lines.'], l: L.lcri },
    { c: 'rad', n: 'Radionuclides Rule', y: 'Final 2000 · compliance December 8, 2003', st: 'final', who: 'Community water systems',
      k: ['Combined radium-226 and -228: 5 pCi/L.', 'Gross alpha (excluding radon and uranium): 15 pCi/L.', 'Beta particle and photon radioactivity: 4 millirem/year.', 'Uranium: 30 µg/L.'],
      d: ['Monitoring frequency depends on earlier results: every 3, 6, or 9 years.'], l: L.npdwr },
    { c: 'emerging', n: 'PFAS National Primary Drinking Water Regulation', y: 'Final April 2024 · changes proposed May 2026', st: 'court', who: 'CWS and NTNCWS',
      k: ['PFOA and PFOS: MCL 4.0 ppt, MCLG zero.', 'PFHxS, PFNA, and HFPO-DA: 10 ppt each. Mixtures of PFHxS, PFNA, HFPO-DA, and PFBS: Hazard Index of 1.', 'Initial monitoring by 2027 and MCL compliance by 2029, as a running annual average.', 'May 2026 proposals: keep the PFOA and PFOS limits with a 2031 compliance date, and rescind the other four. A court challenge (AWWA v. EPA) was argued September 18, 2026.'],
      d: ['Know your UCMR 5 results and follow MSDH\'s sampling direction.', 'Options for removal: granular activated carbon, PFAS-selective ion exchange, reverse osmosis or nanofiltration.'], l: L.pfas },
    { c: 'emerging', n: 'UCMR 5', y: 'Final December 27, 2021 · sampling 2023–2025', st: 'final', who: 'CWS and NTNCWS serving 3,300+, plus a representative sample of smaller systems',
      k: ['29 PFAS and lithium.', 'Final data released August 27, 2026: just under 2 million results from more than 10,000 systems.', 'EPA estimates about 7.8% of systems would have a running annual average above the PFOA or PFOS MCL.'],
      d: ['Community systems report detected UCMR results in their Consumer Confidence Report.'], l: L.ucmr5 },
    { c: 'emerging', n: 'UCMR 6 (proposed)', y: 'Proposed July 1, 2026 · sampling 2028–2030', st: 'proposed', who: 'CWS and NTNCWS serving 3,300+, plus a representative sample of smaller systems',
      k: ['30 contaminants: 7 ultrashort organofluorine compounds (including TFA), 3 pesticide metabolites, 13 semivolatile organics, and 7 purgeable organics.', 'Comments closed August 31, 2026.', 'Microplastics were not included; EPA said no validated test method exists yet.'],
      d: ['Watch for the final rule and any lab and scheduling instructions from EPA.'], l: L.ucmr6 },
    { c: 'emerging', n: 'Contaminant Candidate List 5 (CCL 5)', y: 'Final November 2022', st: 'final', who: 'EPA\'s planning list; no requirements for systems',
      k: ['66 individual chemicals, three chemical groups (PFAS, cyanotoxins, disinfection byproducts), and 12 microbes.', 'Contaminants on the list are candidates for UCMR monitoring and future regulatory determinations.'],
      d: ['Nothing to do, but it signals what may be regulated later.'], l: ['EPA: Contaminant Candidate List', EPA + 'ccl'] },
    { c: 'info', n: 'Public Notification Rule', y: 'Final 2000', st: 'final', who: 'All public water systems',
      k: ['Tier 1, within 24 hours: violations with significant potential for serious short-term harm, such as an E. coli MCL violation, a nitrate or nitrite MCL violation, or a waterborne disease outbreak.', 'Tier 2, within 30 days: other MCL, MRDL, and treatment technique violations.', 'Tier 3, within 1 year: monitoring and reporting violations, operating under a variance, and availability of UCMR results.'],
      d: ['Keep notice templates ready and call MSDH right away for any Tier 1 situation.'], l: L.pn },
    { c: 'info', n: 'Consumer Confidence Report (CCR) Rule', y: 'Final 1998 · revisions take effect January 1, 2027', st: 'final', who: 'Community water systems',
      k: ['An annual water quality report to customers by July 1, with a certification to the state that it was delivered.', 'The 2024 revisions add a plain-language summary, better lead information, help with translations, and reports twice a year for systems serving 10,000 or more.'],
      d: ['Report detected contaminants, violations, and required health language.'], l: L.ccr },
    { c: 'ops', n: 'Operator certification guidelines', y: 'EPA guidelines 1999', st: 'final', who: 'CWS and NTNCWS',
      k: ['Every community and non-transient non-community system must be run by a certified operator in responsible charge.', 'States that don\'t meet EPA\'s guidelines lose 20% of their Drinking Water SRF grant.'],
      d: ['Keep your license current with continuing education; MSDH runs Mississippi\'s program.'], l: L.opcert },
    { c: 'ops', n: 'AWIA risk and resilience (Section 2013)', y: '2018 law · repeats every 5 years', st: 'final', who: 'Community systems serving more than 3,300',
      k: ['A risk and resilience assessment covering natural hazards, malevolent acts (including cyber), and critical assets.', 'An emergency response plan updated within 6 months of each assessment.', 'Both certified to EPA; the assessment is reviewed every 5 years.'],
      d: ['Coordinate the emergency plan with the county emergency manager.'], l: L.awia },
    { c: 'cwa', n: 'NPDES permits (CWA §402)', y: 'Clean Water Act 1972 · Mississippi authorized May 1, 1974', st: 'final', who: 'Any point source discharge to waters of the U.S.',
      k: ['Permits set effluent limits, monitoring, and reporting through discharge monitoring reports.', 'Water plants may need permits for backwash or other process water discharges.'],
      d: ['In Mississippi, MDEQ issues NPDES permits.'], l: L.npdes },
    { c: 'cwa', n: 'Secondary treatment standards (40 CFR 133)', y: 'Clean Water Act', st: 'final', who: 'Publicly owned sewage treatment plants',
      k: ['BOD₅ and TSS: 30 mg/L as a 30-day average and 45 mg/L as a 7-day average.', 'At least 85% removal of BOD₅ and TSS.', 'pH between 6.0 and 9.0.'],
      d: ['Some lagoon systems qualify for adjusted “equivalent to secondary” limits.'], l: L.npdes },
    { c: 'cwa', n: 'Water quality standards and TMDLs (CWA §303)', y: 'Clean Water Act', st: 'final', who: 'States, for every water body',
      k: ['Standards combine designated uses, criteria to protect those uses, and an antidegradation policy.', 'Impaired waters go on the 303(d) list, and a Total Maximum Daily Load sets the most pollutant the water can take, split among sources.'],
      d: ['Drinking water supply is a designated use, which ties the CWA to source water protection.'], l: L.cwa },
    { c: 'cwa', n: 'Dredge and fill (CWA §404) and WOTUS', y: 'Sackett v. EPA 2023 · new definition in progress', st: 'proposed', who: 'Projects that fill wetlands or streams',
      k: ['Permits come from the U.S. Army Corps of Engineers.', 'Sackett (May 25, 2023) limited jurisdiction to relatively permanent waters and wetlands with a continuous surface connection to them.', 'A narrower WOTUS definition was proposed in November 2025, with a supplemental notice in September 2026 (comments due October 9, 2026).'],
      d: ['Check with the Corps before any construction in or near streams and wetlands.'], l: L.wotus },
    { c: 'cwa', n: 'Industrial pretreatment (40 CFR 403)', y: 'Clean Water Act', st: 'final', who: 'Industries discharging to public sewers; larger sewer systems run the program',
      k: ['Prohibits discharges that pass through or interfere with the treatment plant.', 'Categorical standards apply to specific industries; local limits protect each plant.'],
      d: ['Sewer use ordinances give the city the authority to enforce local limits.'], l: L.npdes },
    { c: 'cwa', n: 'Biosolids (40 CFR 503)', y: 'Clean Water Act', st: 'final', who: 'Sewage sludge that is land-applied, landfilled, or incinerated',
      k: ['Pollutant limits for metals.', 'Class A (essentially pathogen-free) or Class B (reduced pathogens, with site restrictions) pathogen reduction.', 'Vector attraction reduction.'],
      d: ['Keep records of treatment and application sites.'], l: L.npdes },
    { c: 'cwa', n: 'Stormwater permits', y: 'Water Quality Act 1987', st: 'final', who: 'Construction sites of 1 acre or more, industrial sites, and municipal separate storm sewer systems (MS4s)',
      k: ['Construction sites need erosion and sediment controls under a stormwater permit.', 'MS4 permits require public education, illicit discharge detection, and post-construction controls.'],
      d: ['Main replacement and tank projects can disturb enough ground to need coverage.'], l: L.npdes },
    { c: 'other', n: 'EPCRA (community right-to-know)', y: '1986', st: 'final', who: 'Facilities storing hazardous chemicals',
      k: ['Chlorine\'s threshold planning quantity is 100 lb.', 'Tier II chemical inventory reports are due March 1 each year.'],
      d: ['Share facility plans with the local emergency planning committee and fire department.'], l: null },
    { c: 'other', n: 'Risk Management Program and Process Safety Management', y: 'EPA 40 CFR 68 · OSHA 29 CFR 1910.119', st: 'final', who: 'Processes above threshold quantities',
      k: ['EPA RMP: more than 2,500 lb of chlorine (sulfur dioxide 5,000 lb; anhydrous ammonia 10,000 lb).', 'OSHA PSM: 1,500 lb or more of chlorine.'],
      d: ['Two one-ton chlorine containers connected to one process already exceed the RMP threshold.', 'OSHA PSM covers private employers, and public employers only in states whose OSHA-approved plan covers them.'], l: null },
    { c: 'other', n: 'SPCC oil spill prevention (40 CFR 112)', y: 'Clean Water Act §311', st: 'final', who: 'Facilities with more than 1,320 gallons of aboveground oil storage (or 42,000 buried)',
      k: ['Counts containers of 55 gallons or more, including generator fuel tanks.', 'Requires secondary containment, inspections, and a written plan.'],
      d: ['Standby generators at plants and booster stations often trigger it.'], l: null },
    { c: 'other', n: 'CERCLA (Superfund)', y: 'PFOA and PFOS designated 2024 · upheld August 18, 2026', st: 'final', who: 'Anyone responsible for releases of hazardous substances',
      k: ['PFOA and PFOS are CERCLA hazardous substances.', 'The designation affects cleanup liability; it does not set drinking water limits.'],
      d: ['Keep records of PFAS-containing residuals such as spent carbon.'], l: L.pfas },
    { c: 'other', n: 'Underground Injection Control and sole source aquifers', y: 'SDWA Part C', st: 'final', who: 'Injection wells; projects over designated aquifers',
      k: ['UIC regulates six classes of injection wells to protect underground sources of drinking water.', 'EPA can designate a sole source aquifer where it supplies at least half of an area\'s drinking water; federally funded projects there get EPA review.'],
      d: ['Report suspected illegal injection or disposal wells to MDEQ.'], l: null }
  ];

  var rq = { q: '', cat: 'all', all: false };
  function ruleText(r) { return fold([r.n, r.y, r.who, CAT[r.c].name].concat(r.k, r.d).join(' ')); }
  function ruleCard(r) {
    var cat = CAT[r.c], st = STATUS[r.st];
    return '<details class="rule-card" style="--rc:' + cat.color + '"><summary><span class="rc-top"><span class="rc-cat">' + esc(cat.name) + '</span>' +
      '<span class="status-pill ' + st[0] + '">' + esc(st[1]) + '</span></span><h3>' + esc(r.n) + '</h3><span class="rc-year">' + esc(r.y) + '</span>' +
      '<span class="rc-more">Show details +</span></summary><div class="rc-body">' +
      '<p><span class="rc-label">Who it covers:</span> ' + esc(r.who) + '</p>' +
      '<p class="rc-label">Key requirements</p><ul>' + r.k.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<p class="rc-label">What operators do</p><ul>' + r.d.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<div class="rc-links">' + (r.l ? '<a href="' + esc(r.l[1]) + '" target="_blank" rel="noopener">' + esc(r.l[0]) + ' ↗</a>' : '') +
      '<button class="ask-chip" type="button" data-ask="' + esc('Tell me about the ' + r.n.replace(/\s*\(.*?\)\s*/g, ' ').trim()) + '">Ask Greg</button></div>' +
      '</div></details>';
  }
  function renderRules() {
    var q = fold(rq.q.trim()), words = q.split(/\s+/).filter(Boolean);
    var list = RULES.filter(function (r) {
      if (rq.cat !== 'all' && r.c !== rq.cat) return false;
      if (!words.length) return true;
      var t = ruleText(r);
      return words.every(function (w) { return t.indexOf(w) !== -1; });
    });
    var LIMIT = 12, cut = !rq.all && !words.length && rq.cat === 'all' && list.length > LIMIT;
    $('ruleGrid').innerHTML = list.length ? (cut ? list.slice(0, LIMIT) : list).map(ruleCard).join('') +
      (cut ? '<div style="grid-column:1/-1;text-align:center"><button class="btn btn-soft" type="button" id="ruleMore">Show all ' + list.length + ' rules</button></div>' : '')
      : '<div class="empty-note">No rules match. Try a broader word, or <button class="btn btn-soft btn-sm" type="button" data-ask="' + esc(rq.q) + '">ask Greg</button>.</div>';
    if (cut) $('ruleMore').addEventListener('click', function () { rq.all = true; renderRules(); });
    $('ruleCount').textContent = 'Showing ' + (cut ? LIMIT : list.length) + ' of ' + RULES.length + ' rules' + (rq.cat !== 'all' ? ' in ' + CAT[rq.cat].name : '') + (words.length ? ' matching “' + rq.q.trim() + '”' : '') + '.';
  }
  function initRules() {
    var cats = $('ruleCats');
    cats.innerHTML = '<button class="chip" type="button" data-cat="all" aria-pressed="true">All</button>' +
      CATS.map(function (c) { return '<button class="chip" type="button" data-cat="' + c[0] + '" aria-pressed="false">' + esc(c[1]) + '</button>'; }).join('');
    cats.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cat]');
      if (!b) return;
      rq.cat = b.dataset.cat;
      cats.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      renderRules();
    });
    var t = 0;
    $('ruleSearch').addEventListener('input', function () { var v = this.value; clearTimeout(t); t = setTimeout(function () { rq.q = v; renderRules(); }, 120); });
    renderRules();
  }

  /* ================= LIMITS TABLE ================= */
  /* [name, MCL/TT, MCLG, note, group] */
  var G = { micro: 'Microbial', dbp: 'Byproducts & disinfectants', ioc: 'Inorganic', voc: 'Volatile organic', soc: 'Synthetic organic', rad: 'Radionuclides', pfas: 'PFAS (2024 rule)', sec: 'Secondary (not enforceable)' };
  var MCL = [
    ['Cryptosporidium', 'TT: 99% removal (plus LT2 bin treatment)', 'Zero', 'Chlorine-resistant parasite from human and animal waste', 'micro'],
    ['Giardia lamblia', 'TT: 99.9% removal/inactivation', 'Zero', 'Parasite from human and animal waste', 'micro'],
    ['Viruses (enteric)', 'TT: 99.99% removal/inactivation', 'Zero', 'Human and animal fecal waste', 'micro'],
    ['Legionella', 'TT (controlled by Giardia and virus treatment)', 'Zero', 'Grows in warm water in plumbing; causes Legionnaires\' disease', 'micro'],
    ['Heterotrophic plate count (HPC)', 'TT: 500 colonies/mL or less (in place of a detectable residual)', 'n/a', 'Measures general bacteria; shows how well treatment works', 'micro'],
    ['Total coliforms', 'TT trigger for Level 1 / Level 2 assessments (RTCR)', 'n/a', 'Indicator that a pathway for contamination may exist', 'micro'],
    ['E. coli', 'MCL: see RTCR violation conditions', 'Zero', 'Confirms fecal contamination', 'micro'],
    ['Turbidity', 'TT: 0.3 NTU or less in 95% of monthly samples, never over 1 NTU (conventional/direct filtration)', 'n/a', 'Cloudiness; interferes with disinfection', 'micro'],
    ['Total trihalomethanes (TTHM)', '0.080', 'n/a (chloroform 0.07; bromodichloromethane 0; bromoform 0; dibromochloromethane 0.06)', 'Chlorination byproduct', 'dbp'],
    ['Haloacetic acids (HAA5)', '0.060', 'n/a (dichloroacetic acid 0; trichloroacetic acid 0.02)', 'Chlorination byproduct', 'dbp'],
    ['Bromate', '0.010', 'Zero', 'Ozonation byproduct when bromide is present', 'dbp'],
    ['Chlorite', '1.0', '0.8', 'Chlorine dioxide byproduct', 'dbp'],
    ['Chlorine (as Cl₂)', 'MRDL 4.0', 'MRDLG 4', 'Disinfectant; eye and nose irritation above the limit', 'dbp'],
    ['Chloramines (as Cl₂)', 'MRDL 4.0', 'MRDLG 4', 'Disinfectant; eye and nose irritation, anemia', 'dbp'],
    ['Chlorine dioxide (as ClO₂)', 'MRDL 0.8', 'MRDLG 0.8', 'Disinfectant; nervous system effects in infants', 'dbp'],
    ['Antimony', '0.006', '0.006', 'Petroleum refineries, fire retardants, ceramics, solder', 'ioc'],
    ['Arsenic', '0.010', 'Zero', 'Natural deposits; orchard and glass/electronics runoff', 'ioc'],
    ['Asbestos (fibers > 10 µm)', '7 million fibers/L', '7 MFL', 'Decay of asbestos-cement pipe; natural deposits', 'ioc'],
    ['Barium', '2', '2', 'Drilling wastes, metal refineries, natural deposits', 'ioc'],
    ['Beryllium', '0.004', '0.004', 'Metal refineries, coal-burning factories, electronics', 'ioc'],
    ['Cadmium', '0.005', '0.005', 'Corrosion of galvanized pipe, batteries, natural deposits', 'ioc'],
    ['Chromium (total)', '0.1', '0.1', 'Steel and pulp mills, natural deposits', 'ioc'],
    ['Copper', 'Action level 1.3 (90th percentile)', '1.3', 'Corrosion of household plumbing', 'ioc'],
    ['Cyanide (as free cyanide)', '0.2', '0.2', 'Steel, plastic, and fertilizer factories', 'ioc'],
    ['Fluoride', '4.0', '4.0', 'Natural deposits and water additive; the MCL guards against skeletal fluorosis', 'ioc'],
    ['Lead', 'Action level 0.015 (0.010 from Nov 1, 2027)', 'Zero', 'Lead service lines, solder, and brass in plumbing', 'ioc'],
    ['Mercury (inorganic)', '0.002', '0.002', 'Natural deposits, refineries, landfill and farm runoff', 'ioc'],
    ['Nitrate (as N)', '10', '10', 'Fertilizer, septic tanks, sewage; “blue baby” syndrome in infants under 6 months', 'ioc'],
    ['Nitrite (as N)', '1', '1', 'Fertilizer, septic tanks, sewage; nitrification in chloraminated systems', 'ioc'],
    ['Selenium', '0.05', '0.05', 'Petroleum refineries, natural deposits, mines', 'ioc'],
    ['Thallium', '0.002', '0.0005', 'Ore-processing sites, electronics, glass, drug factories', 'ioc'],
    ['Benzene', '0.005', 'Zero', 'Fuels, gas storage tanks, landfills', 'voc'],
    ['Carbon tetrachloride', '0.005', 'Zero', 'Chemical plants and industrial solvents', 'voc'],
    ['Chlorobenzene', '0.1', '0.1', 'Chemical and agricultural chemical factories', 'voc'],
    ['o-Dichlorobenzene', '0.6', '0.6', 'Industrial chemical factories', 'voc'],
    ['p-Dichlorobenzene', '0.075', '0.075', 'Industrial chemical factories; mothballs and deodorizers', 'voc'],
    ['1,2-Dichloroethane', '0.005', 'Zero', 'Industrial chemical factories', 'voc'],
    ['1,1-Dichloroethylene', '0.007', '0.007', 'Industrial chemical factories', 'voc'],
    ['cis-1,2-Dichloroethylene', '0.07', '0.07', 'Industrial chemical factories; breakdown of TCE and PCE', 'voc'],
    ['trans-1,2-Dichloroethylene', '0.1', '0.1', 'Industrial chemical factories', 'voc'],
    ['Dichloromethane', '0.005', 'Zero', 'Drug and chemical factories (solvent)', 'voc'],
    ['1,2-Dichloropropane', '0.005', 'Zero', 'Industrial chemical factories', 'voc'],
    ['Ethylbenzene', '0.7', '0.7', 'Petroleum refineries', 'voc'],
    ['Styrene', '0.1', '0.1', 'Rubber and plastic factories; landfills', 'voc'],
    ['Tetrachloroethylene (PCE)', '0.005', 'Zero', 'Dry cleaners and factories', 'voc'],
    ['Toluene', '1', '1', 'Petroleum factories', 'voc'],
    ['1,2,4-Trichlorobenzene', '0.07', '0.07', 'Textile finishing factories', 'voc'],
    ['1,1,1-Trichloroethane', '0.2', '0.2', 'Metal degreasing sites and factories', 'voc'],
    ['1,1,2-Trichloroethane', '0.005', '0.003', 'Industrial chemical factories', 'voc'],
    ['Trichloroethylene (TCE)', '0.005', 'Zero', 'Metal degreasing sites and factories', 'voc'],
    ['Vinyl chloride', '0.002', 'Zero', 'PVC pipe leaching; plastic factories; breakdown of TCE and PCE', 'voc'],
    ['Xylenes (total)', '10', '10', 'Petroleum and chemical factories', 'voc'],
    ['Acrylamide', 'TT (limits on polymer dose and monomer content)', 'Zero', 'Added during water and wastewater treatment in polyacrylamide polymers', 'soc'],
    ['Alachlor', '0.002', 'Zero', 'Herbicide runoff from row crops', 'soc'],
    ['Atrazine', '0.003', '0.003', 'Herbicide runoff from row crops', 'soc'],
    ['Benzo(a)pyrene (PAHs)', '0.0002', 'Zero', 'Leaching from coal-tar linings of tanks and mains', 'soc'],
    ['Carbofuran', '0.04', '0.04', 'Soil fumigant used on rice and alfalfa', 'soc'],
    ['Chlordane', '0.002', 'Zero', 'Residue of a banned termiticide', 'soc'],
    ['2,4-D', '0.07', '0.07', 'Herbicide runoff', 'soc'],
    ['Dalapon', '0.2', '0.2', 'Herbicide used on rights of way', 'soc'],
    ['1,2-Dibromo-3-chloropropane (DBCP)', '0.0002', 'Zero', 'Soil fumigant used on soybeans, cotton, and orchards', 'soc'],
    ['Di(2-ethylhexyl) adipate', '0.4', '0.4', 'Plasticizer from chemical factories', 'soc'],
    ['Di(2-ethylhexyl) phthalate', '0.006', 'Zero', 'Plasticizer from rubber and chemical factories', 'soc'],
    ['Dinoseb', '0.007', '0.007', 'Herbicide runoff from soybeans and vegetables', 'soc'],
    ['Dioxin (2,3,7,8-TCDD)', '0.00000003', 'Zero', 'Waste incineration and chemical factories', 'soc'],
    ['Diquat', '0.02', '0.02', 'Herbicide runoff', 'soc'],
    ['Endothall', '0.1', '0.1', 'Herbicide runoff', 'soc'],
    ['Endrin', '0.002', '0.002', 'Residue of a banned insecticide', 'soc'],
    ['Epichlorohydrin', 'TT (limits on polymer dose and monomer content)', 'Zero', 'Impurity in some water treatment chemicals', 'soc'],
    ['Ethylene dibromide (EDB)', '0.00005', 'Zero', 'Petroleum refineries; former soil fumigant', 'soc'],
    ['Glyphosate', '0.7', '0.7', 'Herbicide runoff', 'soc'],
    ['Heptachlor', '0.0004', 'Zero', 'Residue of a banned termiticide', 'soc'],
    ['Heptachlor epoxide', '0.0002', 'Zero', 'Breakdown of heptachlor', 'soc'],
    ['Hexachlorobenzene', '0.001', 'Zero', 'Metal refineries and agricultural chemical factories', 'soc'],
    ['Hexachlorocyclopentadiene', '0.05', '0.05', 'Chemical factories', 'soc'],
    ['Lindane', '0.0002', '0.0002', 'Insecticide used on cattle, lumber, and gardens', 'soc'],
    ['Methoxychlor', '0.04', '0.04', 'Insecticide used on fruits, vegetables, and livestock', 'soc'],
    ['Oxamyl (Vydate)', '0.2', '0.2', 'Insecticide used on apples, potatoes, and tomatoes', 'soc'],
    ['Polychlorinated biphenyls (PCBs)', '0.0005', 'Zero', 'Landfills and waste chemicals (old transformers)', 'soc'],
    ['Pentachlorophenol', '0.001', 'Zero', 'Wood-preserving factories', 'soc'],
    ['Picloram', '0.5', '0.5', 'Herbicide runoff', 'soc'],
    ['Simazine', '0.004', '0.004', 'Herbicide runoff', 'soc'],
    ['Toxaphene', '0.003', 'Zero', 'Residue of a banned insecticide once used on cotton and cattle', 'soc'],
    ['2,4,5-TP (Silvex)', '0.05', '0.05', 'Residue of a banned herbicide', 'soc'],
    ['Alpha particles (gross alpha)', '15 pCi/L', 'Zero', 'Erosion of natural deposits (excludes radon and uranium)', 'rad'],
    ['Beta particles and photon emitters', '4 millirem/year', 'Zero', 'Decay of natural and man-made deposits', 'rad'],
    ['Radium-226 and -228 (combined)', '5 pCi/L', 'Zero', 'Erosion of natural deposits', 'rad'],
    ['Uranium', '30 µg/L', 'Zero', 'Erosion of natural deposits', 'rad'],
    ['PFOA', '4.0 ppt (compliance 2029; 2031 proposed)', 'Zero', 'Industrial releases, firefighting foam, consumer products', 'pfas'],
    ['PFOS', '4.0 ppt (compliance 2029; 2031 proposed)', 'Zero', 'Industrial releases, firefighting foam, consumer products', 'pfas'],
    ['PFHxS', '10 ppt (rescission proposed May 2026)', '10 ppt', 'Firefighting foam, industrial releases', 'pfas'],
    ['PFNA', '10 ppt (rescission proposed May 2026)', '10 ppt', 'Industrial releases', 'pfas'],
    ['HFPO-DA (GenX chemicals)', '10 ppt (rescission proposed May 2026)', '10 ppt', 'Replacement for PFOA in manufacturing', 'pfas'],
    ['Mixture of PFHxS, PFNA, HFPO-DA, PFBS', 'Hazard Index 1 (rescission proposed May 2026)', 'Hazard Index 1', 'Sum of each compound\'s ratio to its health-based level', 'pfas'],
    ['Aluminum', '0.05–0.2', '—', 'Colored water', 'sec'],
    ['Chloride', '250', '—', 'Salty taste', 'sec'],
    ['Color', '15 color units', '—', 'Visible tint', 'sec'],
    ['Copper (secondary)', '1.0', '—', 'Metallic taste; blue-green stains', 'sec'],
    ['Corrosivity', 'Non-corrosive', '—', 'Metallic taste; corroded pipes and fixture staining', 'sec'],
    ['Fluoride (secondary)', '2.0', '—', 'Tooth discoloration (dental fluorosis)', 'sec'],
    ['Foaming agents', '0.5', '—', 'Frothy, cloudy water; bitter taste', 'sec'],
    ['Iron', '0.3', '—', 'Rusty color, red stains, metallic taste', 'sec'],
    ['Manganese', '0.05', '—', 'Black to brown color, black stains, bitter taste', 'sec'],
    ['Odor', '3 threshold odor number', '—', '“Rotten egg,” musty, or chemical smell', 'sec'],
    ['pH', '6.5–8.5', '—', 'Low: corrosion and metallic taste; high: slippery feel, soda taste, deposits', 'sec'],
    ['Silver', '0.1', '—', 'Skin discoloration (argyria)', 'sec'],
    ['Sulfate', '250', '—', 'Salty taste', 'sec'],
    ['Total dissolved solids', '500', '—', 'Hardness, deposits, colored water, stains, salty taste', 'sec'],
    ['Zinc', '5', '—', 'Metallic taste', 'sec']
  ];
  var mq = { q: '', g: 'all' };
  function mark(text, words) {
    var t = esc(text);
    words.forEach(function (w) {
      if (w.length < 2) return;
      var re = new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      t = t.replace(re, '<mark>$1</mark>');
    });
    return t;
  }
  function renderMCL() {
    var q = fold(mq.q.trim()), words = q.split(/\s+/).filter(Boolean);
    var rows = MCL.filter(function (r) {
      if (mq.g !== 'all' && r[4] !== mq.g) return false;
      if (!words.length) return true;
      var t = fold(r.slice(0, 4).join(' ') + ' ' + G[r[4]]);
      return words.every(function (w) { return t.indexOf(w) !== -1; });
    });
    var html = '', last = '';
    rows.forEach(function (r) {
      if (r[4] !== last) { html += '<tr class="grp"><td colspan="4">' + esc(G[r[4]]) + '</td></tr>'; last = r[4]; }
      html += '<tr><td data-l="Contaminant"><b>' + mark(r[0], words) + '</b></td><td class="num" data-l="MCL or TT">' + esc(r[1]) + '</td><td class="num" data-l="MCLG">' + esc(r[2]) + '</td><td data-l="Source / why it matters">' + mark(r[3], words) + '</td></tr>';
    });
    $('mclTable').querySelector('tbody').innerHTML = html || '<tr><td colspan="4">Nothing matches. Try another word, like the chemical\'s common name.</td></tr>';
    $('mclCount').textContent = rows.length + ' of ' + MCL.length + ' contaminants shown.';
  }
  function initMCL() {
    var box = $('mclCats');
    box.innerHTML = '<button class="chip" type="button" data-g="all" aria-pressed="true">All</button>' +
      Object.keys(G).map(function (k) { return '<button class="chip" type="button" data-g="' + k + '" aria-pressed="false">' + esc(G[k]) + '</button>'; }).join('');
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-g]');
      if (!b) return;
      mq.g = b.dataset.g;
      box.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      renderMCL();
    });
    var t = 0;
    $('mclSearch').addEventListener('input', function () { var v = this.value; clearTimeout(t); t = setTimeout(function () { mq.q = v; renderMCL(); }, 120); });
    renderMCL();
  }

  /* ================= UCMR 5 and UCMR 6 ================= */
  var U5 = [
    ['PFOA', 'Perfluorooctanoic acid', 'mcl'], ['PFOS', 'Perfluorooctanesulfonic acid', 'mcl'],
    ['PFHxS', 'Perfluorohexanesulfonic acid', 'hi'], ['PFNA', 'Perfluorononanoic acid', 'hi'],
    ['HFPO-DA', 'Hexafluoropropylene oxide dimer acid (GenX)', 'hi'], ['PFBS', 'Perfluorobutanesulfonic acid', 'hix'],
    ['PFBA', 'Perfluorobutanoic acid'], ['PFPeA', 'Perfluoropentanoic acid'], ['PFHxA', 'Perfluorohexanoic acid'],
    ['PFHpA', 'Perfluoroheptanoic acid'], ['PFDA', 'Perfluorodecanoic acid'], ['PFUnA', 'Perfluoroundecanoic acid'],
    ['PFDoA', 'Perfluorododecanoic acid'], ['PFTrDA', 'Perfluorotridecanoic acid'], ['PFTA', 'Perfluorotetradecanoic acid'],
    ['PFPeS', 'Perfluoropentanesulfonic acid'], ['PFHpS', 'Perfluoroheptanesulfonic acid'],
    ['4:2 FTS', '1H,1H,2H,2H-perfluorohexane sulfonic acid'], ['6:2 FTS', '1H,1H,2H,2H-perfluorooctane sulfonic acid'],
    ['8:2 FTS', '1H,1H,2H,2H-perfluorodecane sulfonic acid'], ['NEtFOSAA', 'N-ethyl perfluorooctanesulfonamidoacetic acid'],
    ['NMeFOSAA', 'N-methyl perfluorooctanesulfonamidoacetic acid'], ['ADONA', '4,8-Dioxa-3H-perfluorononanoic acid'],
    ['9Cl-PF3ONS', '9-Chlorohexadecafluoro-3-oxanonane-1-sulfonic acid'], ['11Cl-PF3OUdS', '11-Chloroeicosafluoro-3-oxaundecane-1-sulfonic acid'],
    ['NFDHA', 'Nonafluoro-3,6-dioxaheptanoic acid'], ['PFEESA', 'Perfluoro(2-ethoxyethane)sulfonic acid'],
    ['PFMPA', 'Perfluoro-3-methoxypropanoic acid'], ['PFMBA', 'Perfluoro-4-methoxybutanoic acid'],
    ['Lithium', 'A metal used in batteries and medicine; not a PFAS']
  ];
  var TAGS = { mcl: ['mcl', 'MCL 4.0 ppt'], hi: ['hi', '10 ppt MCL · rescission proposed'], hix: ['hi', 'Hazard Index · rescission proposed'] };
  function renderU5(q) {
    var f = fold(q || '').trim();
    var list = U5.filter(function (a) { return !f || fold(a[0] + ' ' + a[1]).indexOf(f) !== -1; });
    $('u5Grid').innerHTML = list.length ? list.map(function (a) {
      var t = a[2] ? TAGS[a[2]] : null;
      return '<div class="analyte"><b>' + esc(a[0]) + '</b>' + esc(a[1]) + (t ? '<br><span class="tag ' + t[0] + '">' + esc(t[1]) + '</span>' : '') + '</div>';
    }).join('') : '<p class="fine">No UCMR 5 contaminant matches that.</p>';
  }
  var U6 = [
    ['Ultrashort organofluorine compounds (7)', [
      ['TFA', 'Trifluoroacetic acid (2 carbons)'], ['TFMS', 'Trifluoromethanesulfonic acid (1 carbon)'], ['TFSI', 'Bis(trifluoromethanesulfonyl)imide (1-carbon groups)'],
      ['PFEtS', 'Perfluoroethanesulfonic acid (2 carbons)'], ['PFMOAA', 'Perfluoro-2-methoxyacetic acid (2 carbons)'],
      ['PFPrA', 'Perfluoropropanoic acid (3 carbons)'], ['PFPrS', 'Perfluoropropanesulfonic acid (3 carbons)']]],
    ['Pesticide metabolites (3)', [
      ['Chlorpyrifos oxon', 'Forms when chlorine oxidizes the insecticide chlorpyrifos'], ['Phorate sulfone', 'Breakdown product of the insecticide phorate'], ['Phorate sulfoxide', 'Breakdown product of the insecticide phorate']]],
    ['Semivolatile organic compounds (13) · EPA Method 525.3', [
      ['Phorate', 'Organophosphate insecticide'], ['Chlorothalonil', 'Fungicide'], ['Dichlorvos (DDVP)', 'Organophosphate insecticide'],
      ['Metribuzin', 'Herbicide'], ['DEET', 'Insect repellent (N,N-diethyl-m-toluamide)'], ['Trifluralin', 'Herbicide'],
      ['Tetrachlorvinphos', 'Insecticide used on livestock and pets'], ['Isophorone', 'Industrial solvent'],
      ['2,4-Dinitrotoluene', 'Explosives and plastics manufacturing'], ['2,6-Dinitrotoluene', 'Explosives and plastics manufacturing'],
      ['Anthracene', 'Polycyclic aromatic hydrocarbon (PAH)'], ['Fluorene', 'Polycyclic aromatic hydrocarbon (PAH)'], ['Pyrene', 'Polycyclic aromatic hydrocarbon (PAH)']]],
    ['Purgeable organic compounds (7) · EPA Method 524.3', [
      ['1,2,4-Trimethylbenzene', 'Gasoline component and solvent'], ['1,2,3-Trichloropropane', 'Industrial solvent and soil fumigant impurity'],
      ['1,1,2,2-Tetrachloroethane', 'Industrial solvent'], ['1,1,1,2-Tetrachloroethane', 'Industrial solvent'],
      ['Total 1,3-dichloropropene', 'Soil fumigant (cis and trans forms)'], ['Naphthalene', 'PAH found in fuels and mothballs'], ['Hexachlorobutadiene', 'Industrial byproduct']]]
  ];
  function renderU6() {
    $('u6List').innerHTML = U6.map(function (g) {
      return '<p class="analyte-group">' + esc(g[0]) + '</p><div class="analyte-grid">' + g[1].map(function (a) {
        return '<div class="analyte"><b>' + esc(a[0]) + '</b>' + esc(a[1]) + '</div>';
      }).join('') + '</div>';
    }).join('') + '<p class="fine">As proposed in the Federal Register on July 1, 2026. Descriptions are general uses and sources, not EPA\'s wording.</p>';
  }

  /* ================= WIZARD ================= */
  var POP = { 1: 'fewer than 3,300', 2: '3,300 to 9,999', 3: '10,000 to 49,999', 4: '50,000 to 99,999', 5: '100,000 or more' };
  function wizard() {
    var f = $('wizForm');
    function val(n) { var x = f.querySelector('input[name="' + n + '"]:checked'); return x ? x.value : ''; }
    var type = val('type'), src = val('src'), pop = +val('pop'), dis = val('dis'), rec = val('rec') === 'yes';
    $('wzRecycle').hidden = src !== 'sw';
    var out = [];
    function add(cat, title, why) { out.push({ c: CAT[cat].color, t: title, w: why }); }
    var cwsNt = type === 'cws' || type === 'ntnc';
    var disinfects = dis !== 'none' && dis !== 'uv';

    add('micro', 'Revised Total Coliform Rule', 'Every public water system samples for total coliform and E. coli by a sample siting plan.');
    add('info', 'Public Notification Rule', 'Every system must notify customers of violations: Tier 1 in 24 hours, Tier 2 in 30 days, Tier 3 in a year.');
    add('chem', 'Nitrate and nitrite monitoring', 'The nitrate (10 mg/L as N) and nitrite (1 mg/L as N) MCLs apply to every system, including transient ones.');
    add('ops', 'Sanitary surveys', type === 'cws' ? 'Community systems are surveyed every 3 years (5 for outstanding performers).' : 'Non-community systems are surveyed every 5 years.');
    if (src === 'gw') add('micro', 'Ground Water Rule', 'You use ground water: triggered source monitoring after a positive coliform sample, and corrective action for significant deficiencies.');
    if (src === 'sw') {
      add('micro', 'Surface Water Treatment Rule', 'Surface water or GWUDI: filtration and disinfection for 3-log Giardia and 4-log virus control, plus turbidity and residual limits.');
      add('micro', pop >= 3 ? 'Interim Enhanced SWTR' : 'Long Term 1 Enhanced SWTR', (pop >= 3 ? 'Serving 10,000 or more' : 'Serving fewer than 10,000') + ': 2-log Cryptosporidium removal, 0.3 NTU combined filter effluent in 95% of samples, and individual filter monitoring.');
      add('micro', 'Long Term 2 Enhanced SWTR', 'Source water Cryptosporidium monitoring decides your bin and any extra treatment; uncovered finished water storage must be covered or treated.');
      if (rec) add('micro', 'Filter Backwash Recycling Rule', 'You recycle backwash: return it through all treatment processes, at or before primary coagulant addition, and keep records.');
      if (cwsNt && disinfects) add('dbp', 'Enhanced coagulation (TOC removal)', 'Conventional surface water plants must remove a set percentage of TOC under the Stage 1 DBP Rule.');
    }
    if (src === 'buy') add('micro', 'Consecutive system duties', 'Your wholesaler handles treatment rules for the water it treats. You still sample your own distribution system, and under the Ground Water Rule you must tell a ground water wholesaler within 24 hours of a total coliform-positive sample.');
    if (cwsNt && disinfects) {
      add('dbp', 'Stage 1 and Stage 2 DBP Rules', 'You add (or receive) a chemical disinfectant: TTHM 0.080 and HAA5 0.060 mg/L as locational running annual averages, and MRDL limits.');
    }
    if (dis === 'clo2') add('dbp', 'Chlorine dioxide and chlorite limits', 'MRDL 0.8 mg/L for chlorine dioxide and a 1.0 mg/L chlorite MCL.' + (type === 'tnc' ? ' The chlorine dioxide provisions apply to transient systems too.' : ''));
    if (dis === 'o3' && cwsNt) add('dbp', 'Bromate MCL', 'Ozone plants must meet the 0.010 mg/L bromate MCL.');
    if (dis === 'nh2cl') add('dbp', 'Chloramine residual and nitrification', 'MRDL 4.0 mg/L as Cl₂. Watch for nitrification: falling total chlorine, rising nitrite, and more coliform or HPC growth.');
    if (dis === 'uv') add('micro', 'UV only', 'UV doesn\'t trigger the DBP rules, but it leaves no residual in the pipes. Your state decides whether that meets its requirements.');
    if (dis === 'none' && src !== 'buy') add('micro', 'No disinfection?', src === 'sw' ? 'Surface water systems must disinfect; the SWTR requires it.' : 'Ground water systems without 4-log virus treatment depend on source protection and triggered monitoring. Mississippi\'s own rules may require disinfection; check with MSDH.');
    if (cwsNt) {
      add('lead', 'Lead and Copper Rule (LCRR now, LCRI from November 1, 2027)', 'Tap sampling at high-risk homes, a service line inventory, and replacing lead service lines within 10 years under the LCRI.');
      add('chem', 'Chemical contaminant rules and the Arsenic Rule', 'Monitoring for about 65 regulated chemicals on the standard 9-year cycle; arsenic MCL 0.010 mg/L.');
      add('emerging', 'PFAS rule', 'Initial PFAS monitoring by 2027 under the 2024 rule; MCL compliance in 2029 (2031 proposed for PFOA and PFOS).');
      add('emerging', 'UCMR', pop >= 2 ? 'Serving 3,300 or more: you sample in every UCMR cycle, including the proposed UCMR 6 in 2028–2030.' : 'Serving fewer than 3,300: you sample only if EPA picks you for its representative sample, and EPA pays the lab costs.');
      add('ops', 'Certified operator', 'Community and non-transient non-community systems must have a certified operator in responsible charge. MSDH runs Mississippi\'s program.');
    }
    if (type === 'cws') {
      add('rad', 'Radionuclides Rule', 'Community systems monitor radium, gross alpha, beta/photon emitters, and uranium.');
      add('chem', 'Fluoride MCL', 'The 4.0 mg/L fluoride MCL applies to community systems.');
      add('info', 'Consumer Confidence Report', pop >= 3 ? 'Serving 10,000 or more: starting in 2027, send the report twice a year.' : 'Deliver the report every year by July 1.');
      if (pop >= 2) add('ops', 'AWIA risk and resilience assessment', 'Community systems serving more than 3,300 people: assessment every 5 years and an emergency response plan within 6 months of it.');
    }
    if (type === 'tnc') add('info', 'Fewer rules for transient systems', 'Transient systems don\'t do lead and copper sampling, CCRs, or most chemical monitoring; the focus is on microbes and nitrate.');

    var srcName = { gw: 'ground water', sw: 'surface water', buy: 'purchased water' }[src];
    var typeName = { cws: 'community', ntnc: 'non-transient non-community', tnc: 'transient non-community' }[type];
    $('wizResult').innerHTML = '<h3>' + out.length + ' requirements apply</h3><p>For a ' + esc(typeName) + ' system using ' + esc(srcName) + ' and serving ' + esc(POP[pop]) + ' people.</p>' +
      '<ul class="wz-list">' + out.map(function (o) { return '<li style="--rc:' + o.c + '"><b>' + esc(o.t) + '</b><span class="why">' + esc(o.w) + '</span></li>'; }).join('') + '</ul>' +
      '<p class="tool-note">This covers federal rules. Mississippi can add requirements, so confirm with your MSDH regional engineer.</p>';
  }

  /* ================= TIMELINE ================= */
  /* [ISO date or year, label, title, text, group] groups: dw, cwa, ms, court */
  var TL = [
    ['1972-10-18', 'Oct 18, 1972', 'Clean Water Act enacted', 'Congress overrides a veto to pass the Federal Water Pollution Control Act Amendments.', 'cwa'],
    ['1974-05-01', 'May 1, 1974', 'Mississippi takes over NPDES', 'EPA authorizes Mississippi to run its own Clean Water Act permit program.', 'ms'],
    ['1974-12-16', 'Dec 16, 1974', 'Safe Drinking Water Act signed', 'National drinking water standards for all public water systems.', 'dw'],
    ['1986-06-19', '1986', 'SDWA amendments', '83 contaminants to be regulated on a schedule; lead pipe, solder, and flux banned in new plumbing.', 'dw'],
    ['1987-02-04', '1987', 'Water Quality Act', 'Stormwater permits and the Clean Water State Revolving Fund.', 'cwa'],
    ['1989-06-29', '1989', 'Total Coliform Rule and Surface Water Treatment Rule', 'The foundation of today\'s microbial rules.', 'dw'],
    ['1991-06-07', '1991', 'Lead and Copper Rule', 'Action levels of 0.015 mg/L lead and 1.3 mg/L copper.', 'dw'],
    ['1996-08-06', 'Aug 6, 1996', 'SDWA amendments', 'Drinking Water SRF, Consumer Confidence Reports, UCMR, operator certification guidelines.', 'dw'],
    ['1997-07-01', '1997', 'Mississippi Safe Drinking Water Act', 'State law for public water supply, cross-connection control, and emergency plans (Miss. Code §41-26).', 'ms'],
    ['1998-12-16', '1998', 'Stage 1 DBP Rule and IESWTR', 'DBP limits and 2-log Cryptosporidium removal for larger surface water systems.', 'dw'],
    ['2000-12-07', '2000', 'Radionuclides Rule and Public Notification Rule', 'Uranium limit added; three-tier public notice.', 'dw'],
    ['2001-01-22', '2001', 'Arsenic Rule', 'Arsenic MCL lowered to 0.010 mg/L (compliance 2006).', 'dw'],
    ['2006-01-04', '2006', 'LT2ESWTR, Stage 2 DBP Rule, and Ground Water Rule', 'Cryptosporidium bins, locational running annual averages, triggered source monitoring.', 'dw'],
    ['2013-02-13', '2013', 'Revised Total Coliform Rule', 'E. coli MCL and assessments (in effect April 1, 2016).', 'dw'],
    ['2014-01-04', 'Jan 4, 2014', '“Lead free” tightened', 'Plumbing must average no more than 0.25% lead on wetted surfaces.', 'dw'],
    ['2018-10-23', 'Oct 23, 2018', 'America\'s Water Infrastructure Act', 'Risk and resilience assessments and emergency response plans.', 'dw'],
    ['2021-01-15', 'Jan 15, 2021', 'Lead and Copper Rule Revisions published', 'Service line inventories due October 16, 2024.', 'dw'],
    ['2021-11-15', 'Nov 15, 2021', 'Bipartisan Infrastructure Law', 'More than $50 billion for water, including $15 billion for lead service lines.', 'dw'],
    ['2021-11-22', 'Nov 22, 2021', 'Mississippi v. Tennessee', 'The Supreme Court rules the Middle Claiborne aquifer is an interstate resource subject to equitable apportionment.', 'court'],
    ['2021-12-27', 'Dec 27, 2021', 'UCMR 5 finalized', '29 PFAS and lithium, sampled 2023–2025.', 'dw'],
    ['2022-11-29', 'Nov 29, 2022', 'Federal manager for Jackson', 'A federal court appoints an interim third-party manager for Jackson\'s water system.', 'ms'],
    ['2023-05-25', 'May 25, 2023', 'Sackett v. EPA', 'The Supreme Court narrows Clean Water Act jurisdiction over wetlands.', 'court'],
    ['2024-04-10', 'Apr 10, 2024', 'PFAS drinking water standards', 'MCLs for PFOA, PFOS, PFHxS, PFNA, HFPO-DA, and a Hazard Index.', 'dw'],
    ['2024-04-19', 'Apr 2024', 'PFOA and PFOS named Superfund hazardous substances', 'CERCLA designation (upheld in 2026).', 'dw'],
    ['2024-10-08', 'Oct 8, 2024', 'Lead and Copper Rule Improvements', '10 µg/L action level; lead service lines out within 10 years.', 'dw'],
    ['2024-10-16', 'Oct 16, 2024', 'Service line inventories due', 'First inventories under the LCRR.', 'dw'],
    ['2025-05-14', '2025', 'EPA announces PFAS plan; two states ban fluoridation', 'EPA says it will keep the PFOA/PFOS limits and reconsider the rest. Utah and Florida ban adding fluoride.', 'dw'],
    ['2025-11-17', 'Nov 17, 2025', 'WOTUS proposal', 'A narrower definition of waters of the United States.', 'cwa'],
    ['2026-01-06', 'Jan 6, 2026', 'Perchlorate standard proposed', 'MCLG 20 µg/L; MCL options of 20, 40, or 80 µg/L.', 'dw'],
    ['2026-05-20', 'May 2026', 'PFAS changes proposed', 'PFOA/PFOS compliance moved to 2031; four other limits proposed for rescission.', 'dw'],
    ['2026-07-01', 'Jul 1, 2026', 'UCMR 6 proposed', '30 contaminants, sampling 2028–2030.', 'dw'],
    ['2026-08-18', 'Aug 18, 2026', 'CERCLA designation upheld', 'D.C. Circuit upholds PFOA and PFOS as hazardous substances.', 'court'],
    ['2026-08-27', 'Aug 27, 2026', 'Final UCMR 5 data', 'Just under 2 million results from more than 10,000 systems.', 'dw'],
    ['2026-09-04', 'Sep 4, 2026', 'WOTUS supplemental proposal', 'Comments due October 9, 2026.', 'cwa'],
    ['2026-09-18', 'Sep 18, 2026', 'PFAS rule argued', 'Oral argument in AWWA v. EPA at the D.C. Circuit.', 'court'],
    ['2027-01-01', 'Jan 1, 2027', 'Revised CCR rule takes effect', 'Twice-a-year reports for systems serving 10,000 or more.', 'dw'],
    ['2027-04-26', 'Apr 26, 2027', 'PFAS initial monitoring due', 'Under the 2024 PFAS rule.', 'dw'],
    ['2027-05-21', 'May 21, 2027', 'Perchlorate final rule deadline', 'Set by court order.', 'dw'],
    ['2027-07-30', 'Jul 30, 2027', 'MDBP proposal deadline', 'Revisions to the microbial and disinfection byproduct rules.', 'dw'],
    ['2027-11-01', 'Nov 1, 2027', 'LCRI compliance date', 'Baseline inventory and replacement plan due; 10 µg/L action level begins.', 'dw'],
    ['2028-01-01', '2028–2030', 'UCMR 6 sampling (proposed)', 'January 2028 through December 2030.', 'dw'],
    ['2028-10-02', 'Oct 2, 2028', 'MDBP final rule deadline', '', 'dw'],
    ['2029-04-26', 'Apr 26, 2029', 'PFAS MCL compliance (2024 rule)', 'EPA has proposed moving PFOA and PFOS to 2031.', 'dw'],
    ['2031-01-01', '2031', 'Proposed PFOA/PFOS compliance date', 'If the May 2026 proposal is finalized.', 'dw'],
    ['2037-11-01', 'Nov 2037', 'Lead service lines replaced', 'Ten years after the LCRI compliance date, for most systems.', 'dw']
  ];
  var TLG = { recent: 'Since 2021', upcoming: 'Coming up', all: 'Everything', dw: 'Drinking water', cwa: 'Clean Water Act', ms: 'Mississippi', court: 'Court decisions' };
  var TLC = { dw: '#1d4ed8', cwa: '#047857', ms: '#9a3412', court: '#6b21a8' };
  function renderTL(g) {
    var now = new Date().toISOString().slice(0, 10), html = '', marked = false;
    TL.forEach(function (e) {
      var future = e[0] > now;
      if (g === 'upcoming' && !future) return;
      if (g === 'recent' && e[0] < '2021') return;
      if (g !== 'all' && g !== 'upcoming' && g !== 'recent' && e[4] !== g) return;
      if (future && !marked && g !== 'upcoming') { html += '<li class="now-marker"><span class="tl-now">Today</span></li>'; marked = true; }
      html += '<li class="' + (future ? 'future' : '') + '" style="--rc:' + TLC[e[4]] + '"><span class="tl-date">' + esc(e[1]) + '</span><span class="tl-title">' + esc(e[2]) + '</span>' + (e[3] ? '<span class="tl-text">' + esc(e[3]) + '</span>' : '') + '</li>';
    });
    $('tlList').innerHTML = html;
  }
  function initTL() {
    var box = $('tlFilters');
    box.innerHTML = Object.keys(TLG).map(function (k, i) { return '<button class="chip" type="button" data-tl="' + k + '" aria-pressed="' + (i === 0) + '">' + esc(TLG[k]) + '</button>'; }).join('');
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-tl]');
      if (!b) return;
      box.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      renderTL(b.dataset.tl);
    });
    renderTL('recent');
  }

  /* ================= QUIZ ================= */
  global.DEEP_QUIZ = [
    { q: 'Which agency has primacy for drinking water in Mississippi?', choices: ['MSDH Bureau of Public Water Supply', 'MDEQ', 'EPA Region 4', 'The Yazoo Mississippi Delta Joint Water Management District'], correct: 0, explain: 'The Mississippi State Department of Health\'s Bureau of Public Water Supply runs the Safe Drinking Water Act program. MDEQ handles the Clean Water Act and water withdrawal permits.' },
    { q: 'When would UCMR 6 sampling take place if the rule is finalized as proposed?', choices: ['January 2028 through December 2030', '2023 through 2025', '2026 through 2027', '2031 through 2033'], correct: 0, explain: 'EPA proposed UCMR 6 on July 1, 2026, with sampling from January 2028 through December 2030. UCMR 5 sampled 2023–2025.' },
    { q: 'What did UCMR 5 test for?', choices: ['29 PFAS and lithium', 'Six PFAS and 1,4-dioxane', 'Ten cyanotoxins', 'Lead and copper at customer taps'], correct: 0, explain: 'UCMR 5 covered 29 PFAS plus lithium. Six PFAS were part of UCMR 3; cyanotoxins were in UCMR 4.' },
    { q: 'Which of these is NOT on the proposed UCMR 6 list?', choices: ['Microplastics', 'Trifluoroacetic acid (TFA)', 'Chlorpyrifos oxon', 'DEET'], correct: 0, explain: 'EPA declined to add microplastics because there is no validated test method yet. TFA, chlorpyrifos oxon, and DEET are all proposed.' },
    { q: 'Under the Lead and Copper Rule Improvements, what is the lead action level?', choices: ['0.010 mg/L', '0.015 mg/L', '0.005 mg/L', '1.3 mg/L'], correct: 0, explain: 'The LCRI lowers the lead action level from 0.015 to 0.010 mg/L starting November 1, 2027. 1.3 mg/L is the copper action level.' },
    { q: 'How fast must a Tier 1 public notice go out?', choices: ['Within 24 hours', 'Within 7 days', 'Within 30 days', 'Within 1 year'], correct: 0, explain: 'Tier 1 notices (such as an E. coli MCL violation) are due within 24 hours. Tier 2 is 30 days and Tier 3 is one year.' },
    { q: 'Which systems must sample in every UCMR cycle?', choices: ['CWS and NTNCWS serving 3,300 or more people', 'Every public water system', 'Only systems serving 100,000 or more', 'Only surface water systems'], correct: 0, explain: 'All community and non-transient non-community systems serving 3,300 or more sample. EPA picks a representative sample of smaller systems and pays their lab costs.' },
    { q: 'What is the MCL for PFOA in the April 2024 PFAS rule?', choices: ['4.0 ppt', '10 ppt', '70 ppt', 'A Hazard Index of 1'], correct: 0, explain: 'PFOA and PFOS each have an MCL of 4.0 parts per trillion and an MCLG of zero. 70 ppt was EPA\'s old 2016 health advisory.' },
    { q: 'What does Section 402 of the Clean Water Act create?', choices: ['NPDES discharge permits', 'Dredge and fill permits', 'The State Revolving Fund', 'The 303(d) impaired waters list'], correct: 0, explain: 'Section 402 is the National Pollutant Discharge Elimination System. Dredge and fill is Section 404; impaired waters are Section 303(d).' },
    { q: 'What is the 30-day average BOD₅ limit in the secondary treatment standard?', choices: ['30 mg/L', '10 mg/L', '45 mg/L', '85 mg/L'], correct: 0, explain: 'Secondary treatment means 30 mg/L BOD₅ and TSS as 30-day averages, 45 mg/L as 7-day averages, and 85% removal.' },
    { q: 'Which of these has an action level instead of an MCL?', choices: ['Lead', 'Arsenic', 'Nitrate', 'TTHM'], correct: 0, explain: 'Lead and copper have action levels based on the 90th percentile of tap samples. Exceeding one triggers required actions rather than an MCL violation.' },
    { q: 'In Mississippi, which wells need an MDEQ ground water withdrawal permit?', choices: ['Wells with a surface casing 6 inches or larger', 'Every well, including household wells', 'Only wells deeper than 1,000 feet', 'Only wells in the Delta'], correct: 0, explain: 'State law requires a permit for wells with surface casings 6 inches or more in diameter. A domestic well serving one household is exempt.' },
    { q: 'Above how much chlorine does EPA\'s Risk Management Program apply?', choices: ['2,500 lb', '100 lb', '1,500 lb', '10,000 lb'], correct: 0, explain: 'RMP applies to processes with more than 2,500 lb of chlorine. 100 lb is the EPCRA threshold planning quantity, and 1,500 lb is OSHA\'s PSM threshold.' },
    { q: 'Which compounds make up the PFAS Hazard Index in the 2024 rule?', choices: ['PFHxS, PFNA, HFPO-DA, and PFBS', 'PFOA and PFOS', 'All 29 UCMR 5 PFAS', 'TFA and PFPrA'], correct: 0, explain: 'The Hazard Index covers mixtures of PFHxS, PFNA, HFPO-DA (GenX), and PFBS. In May 2026 EPA proposed rescinding it.' },
    { q: 'Which kind of system must deliver a Consumer Confidence Report?', choices: ['Community water systems', 'Transient non-community systems', 'Non-transient non-community systems', 'Private wells'], correct: 0, explain: 'Only community water systems deliver CCRs. Under the 2024 revisions, those serving 10,000 or more send them twice a year starting in 2027.' },
    { q: 'What did the Supreme Court decide in Sackett v. EPA (2023)?', choices: ['Clean Water Act wetlands must have a continuous surface connection to relatively permanent waters', 'States may not run NPDES programs', 'PFAS must be regulated under the Clean Water Act', 'Ground water is a water of the United States'], correct: 0, explain: 'Sackett narrowed federal jurisdiction over wetlands. EPA and the Army Corps are still revising the WOTUS definition.' }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    initRules();
    initMCL();
    renderU5('');
    var t = 0;
    $('u5Search').addEventListener('input', function () { var v = this.value; clearTimeout(t); t = setTimeout(function () { renderU5(v); }, 100); });
    renderU6();
    $('wizForm').addEventListener('change', wizard);
    wizard();
    initTL();
  });
})(window);
