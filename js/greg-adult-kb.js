/* ==========================================================
   Greg (adult) — water operator knowledge base
   Aligned to the Mississippi Waterworks Operators Manual
   (MSDH) chapters used in the lessons, plus current federal
   rules where the manual predates them. Where the two differ,
   Greg says so: exam answers come from the manual; day-to-day
   compliance comes from MSDH and current EPA rules.
   Loaded by adult-learning-center.html and every lesson page.
   ========================================================== */
(function (global) {
  'use strict';

  var E = [
    /* ---------------- Using the site / studying ---------------- */
    { id: "greg-intro", q: "What can you help me with?",
      k: ["help:2", "what can you do:4", "how do you work", "who are you:3", "what do you know", "topics"],
      a: "I'm Greg, your LearnWater instructor. I can explain anything in the 14 chapters of the Mississippi Waterworks Operators Manual — regulations, certification, math, hydraulics, wells, microbiology, chemistry, treatment, distribution, chlorination, safety, and cross-connection control.\n\nI also work problems. Try **“lbs/day for 2.5 mg/l at 1.5 mgd”**, **“50 psi in feet”**, **“specific capacity 300 gpm 20 ft drawdown”**, or **“volume of a tank 20 ft diameter 30 ft tall.”**\n\nI can also **search EPA, NRWA, and MsRWA** for you. Try **“search EPA for lead service lines”** or **“search MsRWA for certification classes.”**",
      rel: ["study-plan", "site-search", "pounds-formula"] },
    { id: "study-plan", q: "How should I study for my license exam?",
      k: ["study:3", "study plan:4", "prepare:3", "prep", "how to pass:4", "pass the exam:4", "where do i start:4", "start studying"],
      a: "A plan that works:\n• **Read one chapter a day** and learn its “Numbers Greg wants you to memorize” box.\n• **Quiz right after** — use Practice Quiz with that chapter selected.\n• **Do 20 math problems every other day**; math is where most points are lost.\n• **Flash cards** for the numbers you keep missing.\n• Check **My Progress** weekly — it shows your weakest chapters so you know where to go back.\nThe exam covers every class below yours, so Class A candidates still need all the Class D material.",
      rel: ["exam-tips", "math-tips", "system-classes"] },
    { id: "exam-tips", q: "Any tips for exam day?",
      k: ["exam day:4", "test day:4", "test tip*:4", "exam tip*:4", "test taking", "nervous", "anxiety"],
      a: "Exam-day habits that save points:\n• Read **every** answer choice before picking — distractors are usually “almost right.”\n• **Write the units** next to every number in math problems and convert first.\n• Estimate before you calculate so you can spot a misplaced decimal.\n• Skip and come back to anything that takes more than two minutes.\n• Know your calculator, and confirm with MSDH which calculators and references are allowed.",
      rel: ["math-tips", "conversions", "study-plan"] },
    { id: "site-quiz", q: "How does the practice quiz work?",
      k: ["practice quiz:4", "quiz work*:4", "how many questions:3", "question bank", "new questions", "retry missed:3"],
      a: "Pick **10, 15, or 25 questions**. A round spreads them across every chapter in your class, and the answer choices are shuffled every time. There are **182 questions** in all, about 13 per chapter, written from the manual. Choose one chapter in the **Chapters** menu to drill just that chapter, or pick **My weakest chapters**. At the end you'll see a chapter-by-chapter breakdown, every miss with its explanation, and a **Retry the ones I missed** button. Each lesson page also has a quick 5-question check.",
      rel: ["study-plan", "site-progress"] },
    { id: "site-progress", q: "How do I see my weak areas?",
      k: ["my progress:4", "weak area*:4", "weak chapter*:4", "accuracy:3", "track*:2", "score*:2", "how am i doing:4"],
      a: "Open **My Progress**. It shows lessons completed, overall quiz accuracy, and accuracy **per chapter** — the chapters with the lowest scores are listed first as your review list. Everything is stored in your own browser; nothing is uploaded.",
      rel: ["study-plan", "site-quiz"] },
    { id: "site-cards", q: "How do the flash cards work?",
      k: ["flash card*:4", "flashcard*:4", "cards:2", "memorize:2", "my own cards:4", "print cards:3"],
      a: "Open **Flash Cards**. Greg's deck for your class has about 110 to 130 cards covering every chapter's key numbers and terms. Tap a card to flip it, then press **I know this** to drop it from the rotation or **Study again** to keep it. Pick one chapter from the **Deck** menu to focus, use **List view** to scan them all, or **Print** a sheet. You can add your own cards too. They're saved in this browser.",
      rel: ["study-plan", "site-math"] },
    { id: "site-math", q: "How does Math Practice work?",
      k: ["math practice:4", "math drill*:4", "practice problem*:3", "worked solution*:3", "formula sheet:4"],
      a: "Open **Math Practice**, pick a topic (chlorine feed, volume and detention, flow and pipes, pressure and pumps, wells, or treatment rates), and choose 10 or 20 problems. Every problem gets **fresh numbers**, so you can't just memorize answers. Type your answer (commas and units are fine); anything within **1%** counts, so rounding won't cost you. Every problem shows the **worked solution**, and the **Formula sheet** lists everything you need. Class D sees Class D math; higher classes add more topics.",
      rel: ["math-tips", "pounds-formula", "conversions"] },
    { id: "site-videos", q: "Where are the videos?",
      k: ["video*:4", "youtube:4", "watch:2"],
      a: "Open **Videos** in the Learning Center. The videos are matched to your class's chapters and filtered by topic, and each lesson page shows the videos for its chapter. Nothing loads from YouTube until you press play. You can also search YouTube for any topic from the Videos tab.",
      rel: ["study-plan"] },
    { id: "site-search", q: "Can you search EPA, NRWA, or MsRWA?",
      k: ["search epa:5", "search nrwa:5", "search msrwa:5", "official source*:4", "official site*:4", "search the web:4", "can you search:4", "look it up:3"],
      a: "Yes. Type **search** and what you want, and name a site if you like:\n• **“search EPA for lead service line inventory”**\n• **“look up PFAS on NRWA”**\n• **“search MsRWA for certification classes”**\nNRWA and MsRWA results show up right here in the chat when their websites allow it, and every site gets a button that opens its full search in a new tab. Only your search words go to the site you search; everything else I answer stays in your browser.",
      rel: ["msrwa", "nrwa", "epa-rules"] },
    { id: "math-tips", q: "Tips for solving water math problems?",
      k: ["math tip*:4", "word problem*:4", "hard math", "bad at math:4", "math help:4", "solve math", "math problem*:3"],
      a: "Work every problem the same way:\n1. **What am I solving for?** Write the answer's unit first (lbs/day, gpm, ft).\n2. **List the givens with units.**\n3. **Convert** so the units line up (inches → feet, gpm → MGD).\n4. Pick the formula, plug in, and **cancel units** on paper.\n5. **Sanity-check**: a 1 MGD plant does not need 3,000 lbs/day of chlorine.",
      rel: ["pounds-formula", "conversions", "area-volume"] },

    /* ---------------- Chapter 1: Safe Drinking Water ---------------- */
    { id: "sdwa", q: "What is the Safe Drinking Water Act?",
      k: ["safe drinking water act:5", "sdwa:5", "1974:3", "1986", "1996", "federal law:3", "drinking water law:3"],
      a: "The **Safe Drinking Water Act (SDWA)** passed in 1974 and was amended in 1986 and 1996. EPA sets national standards; a state that adopts rules at least as strict can take **primacy** and run the program. Mississippi adopted the SDWA in 1975, and the **Mississippi State Department of Health (MSDH)** is the primacy agency. The system owner/operator — not MSDH — is responsible for meeting the requirements.",
      more: "The 1986 amendments sped up standard-setting and added filtration and disinfection requirements; the 1996 amendments added Consumer Confidence Reports, operator certification requirements, source water assessments, and the Drinking Water State Revolving Fund.",
      rel: ["primacy", "pws-types", "mcl"] },
    { id: "primacy", q: "What is primacy?",
      k: ["primacy:5", "primary enforcement:5", "who enforces:4"],
      a: "**Primacy** is primary enforcement authority for the SDWA. EPA grants it to a state whose rules are no less strict than the federal ones. Every state except Wyoming has it (EPA runs Wyoming's program). In Mississippi, primacy belongs to **MSDH**.",
      rel: ["msdh", "sdwa"] },
    { id: "msdh", q: "Who regulates drinking water in Mississippi?",
      k: ["msdh:5", "mississippi state department of health:5", "department of health:4", "bureau of public water supply:5", "division of water supply:5", "who regulat*:4", "state agency:3", "public health laboratory:4"],
      a: "**MSDH** regulates public water systems in Mississippi through its drinking water program (called the Division of Water Supply in the manual; today it's MSDH's **Bureau of Public Water Supply**). The **Mississippi Public Health Laboratory** analyzes compliance samples, and MSDH also runs operator certification and sanitary surveys.",
      rel: ["primacy", "sanitary-survey", "certification-requirements"] },
    { id: "pws-types", q: "What are the three types of public water systems?",
      k: ["public water system*:4", "community water system:5", "community system:4", "noncommunity:5", "non community:5", "nontransient:5", "non-transient", "transient:4", "system type*:4", "cws:4", "ntnc*:4", "tnc*:3", "three type*:3"],
      a: "A **public water system** serves at least 15 service connections or 25 people at least 60 days a year. Three types:\n• **Community (CWS)** — year-round residents: towns, subdivisions, mobile home parks, rural water associations.\n• **Nontransient noncommunity (NTNC)** — the same 25+ people at least 6 months a year: schools, factories, hospitals. Treated much like community systems.\n• **Transient noncommunity (TNC)** — different people passing through: rest stops, restaurants, motels, campgrounds, parks.",
      rel: ["who-needs-operator", "sdwa", "mcl"] },
    { id: "mcl", q: "What's the difference between an MCL and an MCLG?",
      k: ["mcl:5", "mclg:5", "maximum contaminant level:5", "goal:2", "enforceable:4", "health goal:4", "primary standard*:4"],
      a: "The **MCL** (Maximum Contaminant Level) is the **enforceable** limit your water must meet. The **MCLG** (MCL Goal) is a **non-enforceable** health goal — the level with no expected health effects, set at **zero** for carcinogens and microbes. EPA sets each MCL as close to the MCLG as is feasible with available treatment and cost.",
      more: "Disinfectants get the same pair under a different name: the **MRDL** (maximum residual disinfectant level — 4.0 mg/L for chlorine and chloramine, 0.8 mg/L for chlorine dioxide) and the non-enforceable **MRDLG**.",
      rel: ["treatment-technique", "secondary-standards", "free-residual"] },
    { id: "treatment-technique", q: "What is a treatment technique?",
      k: ["treatment technique*:5", "tt requirement*:4", "instead of an mcl:4"],
      a: "When a contaminant is too hard or costly to measure reliably, EPA requires a **treatment technique (TT)** — a process the system must perform — instead of an MCL. Examples: the **Surface Water Treatment Rules** (filtration/disinfection performance), the **Lead and Copper Rule** (corrosion control and action levels), and limits on acrylamide/epichlorohydrin in treatment chemicals.",
      rel: ["mcl", "swtr", "lead-copper"] },
    { id: "secondary-standards", q: "What are secondary standards?",
      k: ["secondary standard*:5", "secondary:3", "smcl*:5", "aesthetic:4", "nuisance:3", "cosmetic"],
      a: "**Secondary standards (SMCLs)** cover taste, odor, color, staining, and corrosivity. They aren't federally enforceable, but they drive most customer complaints. Key values: **iron 0.3 mg/L**, **manganese 0.05 mg/L**, **pH 6.5–8.5**, **TDS 500 mg/L**, **chloride 250**, **sulfate 250**, **fluoride 2.0**, color 15 color units, odor 3 threshold odor number.",
      rel: ["iron-manganese", "tds", "mcl"] },
    { id: "pn-tiers", q: "What are the public notification tiers?",
      k: ["tier*:4", "public notif*:5", "public notice*:5", "notify the public:4", "notification:3", "violation*:3", "how fast notify"],
      a: "**Heads-up: the manual and current federal rules differ here.** The manual describes an older two-tier system: **Tier 1** = MCL, treatment technique, or variance/exemption-schedule violations; **Tier 2** = monitoring and testing-procedure violations.\n\nThe current federal **Public Notification Rule** (2000) uses **three tiers**:\n• **Tier 1** — immediate health risk: notice within **24 hours** (e.g., E. coli MCL, nitrate MCL, waterborne outbreak).\n• **Tier 2** — other MCL/MRDL/TT violations: within **30 days**, repeated every 3 months while it continues.\n• **Tier 3** — monitoring/testing violations and other minor items: within **1 year** (can go in the CCR).\nFor exam questions, answer from the manual; for real notices, follow MSDH.",
      rel: ["tier1", "ccr", "records"] },
    { id: "tier1", q: "What is a Tier 1 violation?",
      k: ["tier 1:6", "tier one:6", "acute violation:5", "acute:3", "24 hours notice:4", "24 hour*:2"],
      a: "Under the **current** rule, **Tier 1** means an immediate health risk. Notice goes out within **24 hours**, you must consult MSDH within 24 hours, and delivery is by broadcast media, posting, or hand delivery. Triggers include an **E. coli MCL violation**, a **nitrate/nitrite MCL violation**, a chlorine dioxide MRDL violation in the distribution system, a waterborne disease outbreak, and other situations the state decides pose an acute risk. Since **October 16, 2024**, a **lead action level exceedance** also requires Tier 1 notice within 24 hours.\n\nIn the **manual's** older two-tier scheme, Tier 1 meant any MCL, treatment-technique, or variance/exemption-schedule violation. Answer exam questions from the manual.",
      rel: ["pn-tiers", "e-coli", "nitrate"] },
    { id: "tier2", q: "What is a Tier 2 violation?",
      k: ["tier 2:6", "tier two:6", "30 days notice:4"],
      a: "Under the current rule, **Tier 2** covers MCL, MRDL, and treatment-technique violations that aren't acute (for example, a TTHM or HAA5 violation). Notify **as soon as practical, within 30 days**, and repeat every **3 months** while the violation continues. (In the manual's older scheme, Tier 2 was monitoring and testing-procedure violations.)",
      rel: ["pn-tiers", "tier3", "dbps"] },
    { id: "tier3", q: "What is a Tier 3 violation?",
      k: ["tier 3:6", "tier three:6", "monitoring violation*:5", "missed sample*:4", "late sample*:4"],
      a: "**Tier 3** (current rule) covers monitoring and testing-procedure violations and similar lower-risk issues. Notice is due within **1 year** and can be included in the annual Consumer Confidence Report. A missed sample is still a violation, so treat your sampling calendar like a legal deadline.",
      rel: ["pn-tiers", "ccr", "sample-sites"] },
    { id: "ccr", q: "What is a Consumer Confidence Report?",
      k: ["ccr:5", "consumer confidence report*:5", "water quality report*:5", "annual report:4", "july 1:5", "confidence report"],
      a: "Every **community** water system must deliver a **Consumer Confidence Report (CCR)** to customers by **July 1** each year, covering the previous calendar year: source, detected contaminants, violations, and health information. You certify delivery to MSDH (by October 1) and keep copies **at least 3 years**. EPA's 2024 CCR revisions, taking effect in 2027, add a second report each year for systems serving 10,000+ people and plainer-language requirements.",
      rel: ["records", "pn-tiers", "tier3"] },
    { id: "records", q: "How long do I keep records?",
      k: ["record*:4", "record keeping:5", "recordkeeping:5", "retention:5", "retain:4", "how long keep:5", "keep records:5", "years keep"],
      a: "Federal minimums (40 CFR 141.33 and related rules):\n• **Microbiological and turbidity results: 5 years**\n• **Chemical analyses: 10 years**\n• **Sanitary survey reports: 10 years** after the survey\n• **Actions taken to fix violations: 3 years** after the last action\n• **Variance/exemption records: 5 years** after it expires\n• **Public notices and certifications: 3 years**\n• **CCRs: 3 years**\n• **Lead and copper records: 12 years**\nMSDH can require longer, and records are public — customers may ask to see them.",
      rel: ["ccr", "sanitary-survey", "lead-copper"] },
    { id: "variance", q: "What are variances and exemptions?",
      k: ["variance*:5", "exemption*:5"],
      a: "Both give a struggling system temporary relief. A **variance** applies when a system can't meet an MCL because of its source water even after installing the best available technology. An **exemption** buys time to comply for compelling reasons such as cost. Either one requires showing no unreasonable risk to health, and they're rare and hard to get.",
      rel: ["enforcement", "mcl"] },
    { id: "enforcement", q: "What happens if a system violates the SDWA?",
      k: ["enforcement:5", "fine*:4", "penalt*:5", "emergency order:5", "lawsuit*:4", "citizen suit*:5", "sue:3", "25,000", "25000", "imminent:4"],
      a: "MSDH enforces first, with notices, compliance schedules, and penalties. If a state doesn't act, EPA can. Where there's an **imminent and substantial danger**, EPA can issue emergency orders; the manual lists fines of up to **$25,000 per day per violation** for violating one (EPA adjusts these amounts for inflation). Citizens can sue after giving **60 days' notice**.",
      rel: ["variance", "pn-tiers"] },
    { id: "sanitary-survey", q: "What is a sanitary survey?",
      k: ["sanitary survey*:6", "inspection*:3", "inspector*:3", "survey:2", "eight elements"],
      a: "A **sanitary survey** is MSDH's onsite review of your whole system: source, treatment, distribution, finished-water storage, pumps and controls, monitoring and reporting, management, and operator compliance. Federal rules require one at least every **3 years** for community systems (up to 5 for outstanding performers) and every **5 years** for noncommunity systems. Keep survey reports **10 years**.",
      rel: ["records", "msdh", "wellhead-protection"] },
    { id: "pfas", q: "What are PFAS and are they regulated?",
      k: ["pfas:6", "pfoa:6", "pfos:6", "forever chemical*:6", "genx:5", "hfpo*:4", "pfna", "pfhxs"],
      a: "**PFAS** (“forever chemicals”) are man-made compounds from firefighting foam, coatings, and industry. In **April 2024** EPA set the first national limits: **4.0 parts per trillion for PFOA and PFOS**, 10 ppt for PFHxS, PFNA, and HFPO-DA (GenX), and a Hazard Index for certain mixtures. In **May 2025** EPA said it would keep the PFOA and PFOS limits. In **May 2026** it proposed letting systems request until **2031** to meet them, and proposed rescinding the limits for PFHxS, PFNA, HFPO-DA, and the Hazard Index. Check MSDH and EPA for the current status before making decisions.",
      rel: ["mcl", "activated-carbon", "membranes"] },

    /* ---------------- Chapter 2: Operator Certification ---------------- */
    { id: "who-needs-operator", q: "Which systems need a certified operator?",
      k: ["certified operator:5", "need* an operator:5", "operator required:5", "required to have:3", "180 days:5", "lose operator", "replace operator"],
      a: "Every **community** and **nontransient noncommunity** water system in Mississippi must have a certified waterworks operator — the person who directly supervises and is personally responsible for daily operation and maintenance. The operator's certificate must **equal or exceed the system's classification**. A system that loses its certified operator must replace that person within **180 days**.",
      rel: ["system-classes", "certification-requirements", "renewal"] },
    { id: "system-classes", q: "How are Mississippi water systems classified (A–E)?",
      k: ["classification*:5", "classified:5", "table 2-1:6", "system class*:5", "license class*:4", "which class:4", "classes:3", "class a b c d:4"],
      a: "Mississippi classifies systems by **type of treatment** (Table 2-1), not by population:\n• **Class D** — well(s) with no treatment beyond chlorination, fluoridation, and phosphate.\n• **Class C** — aeration, pH adjustment, corrosion control, or closed-pressure treatment (zeolite softening, pressure iron removal).\n• **Class B** — two or more treatment types, or iron/manganese removal that breaks pressure or uses flocculation/sedimentation.\n• **Class A** — surface water treatment, lime softening, or coagulation/filtration for things other than iron and manganese.\n• **Class E** — purchase-only systems and distribution-only operators.",
      rel: ["class-d", "class-c", "class-a"] },
    { id: "class-d", q: "What does the Class D exam cover?",
      k: ["class d:7", "entry level:3", "d license:5", "d certificate"],
      a: "**Class D** is the foundation: wells with chlorination, fluoridation, and phosphate. On this site that's **12 chapters** — rules, certification, math, hydraulics, wells, microbiology, chemistry, Class D treatment (8D), distribution and storage, chlorination, administration and safety, and cross-connection control. Know the chlorine curve, sampling procedure, pressure/head conversions, and the pounds formula cold.",
      rel: ["chlorine-curve", "sample-procedure", "pounds-formula"] },
    { id: "class-c", q: "What does the Class C exam cover?",
      k: ["class c:7", "c license:5", "c certificate"],
      a: "**Class C** systems add **aeration, pH adjustment, corrosion control, or closed-pressure treatment** (zeolite softening, pressure-filter iron removal). You study everything in Class D plus **Chapter 8 B&C** (aeration, coagulation, sedimentation, filtration, ion exchange, iron/manganese control, stabilization).",
      rel: ["aeration", "ion-exchange", "corrosion-control"] },
    { id: "class-b", q: "What does the Class B exam cover?",
      k: ["class b:7", "b license:5", "b certificate"],
      a: "**Class B** plants use **two or more treatment types**, or iron/manganese removal that breaks pressure or needs flocculation/sedimentation. The chapter list matches Class C (D material plus Chapter 8 B&C), but expect deeper process-control questions and more field experience requirements.",
      rel: ["coagulation", "sedimentation", "filtration"] },
    { id: "class-a", q: "What does the Class A exam cover?",
      k: ["class a:7", "a license:5", "a certificate", "top level", "highest class"],
      a: "**Class A** is the top tier: **surface water treatment, lime softening, or coagulation/filtration** for more than iron and manganese. You study all 14 chapters, including **Chapter 8A** (surface water challenges, coagulant aids, lime-soda softening, disinfection byproducts, and alternative disinfectants). Surface Water Treatment Rule turbidity and CT requirements come up constantly.",
      rel: ["swtr", "lime-softening", "dbps"] },
    { id: "class-e", q: "What is a Class E operator?",
      k: ["class e:7", "purchase water:4", "purchased water:4", "distribution only:4", "consecutive system"],
      a: "**Class E** covers systems that **purchase all their water** (consecutive systems) and operators whose only job is running a distribution system. Distribution, cross-connection control, sampling, and customer-service topics matter most.",
      rel: ["distribution-pressure", "cross-connection", "sample-procedure"] },
    { id: "certification-requirements", q: "What do I need to get certified?",
      k: ["get certified:5", "certification requirement*:5", "requirement*:3", "experience:3", "qualif*:4", "apply:3", "application:3", "high school:3", "ged:4", "degree:3", "short course:5", "become an operator:5", "become a water operator:5"],
      a: "Per the manual: a **high school diploma or GED**, at least **one year of supervised experience** under an operator certified at or above the level you're seeking (who endorses your application), and **recommendations from two other certified operators**. Class A also accepts an engineering/applied-science degree plus one year of Class A experience. The written exam is given **three times a year**, after a four-day waterworks operators short course. Confirm current requirements and fees with MSDH.",
      rel: ["renewal", "system-classes", "exam-tips"] },
    { id: "renewal", q: "How do I renew my certificate?",
      k: ["renew*:5", "ceu*:5", "continuing education:5", "expire*:4", "expiration:4", "48 hours:4", "24 hours ceu", "grace period:4", "30 day*:3"],
      a: "Certificates are valid **3 years**. To renew without retesting, file within **30 days after expiration** and show approved continuing education earned during the 3-year period: **48 CEU hours** if you've been licensed continuously for **less than 9 years**, **24** if longer. Miss the window or the hours and you retake the written exam. You're responsible for keeping your own training records.",
      rel: ["certification-requirements", "training-ms"] },
    { id: "training-ms", q: "Where can I get training or CEUs in Mississippi?",
      k: ["training:4", "where can i take:4", "ceu class*:5", "workshop*:4", "seminar*:4", "msrwa:2", "rural water:2", "mississippi rural water:2", "awwa:4"],
      a: "Good places to start: the **MSDH operators short course** that precedes each exam; the **Mississippi Rural Water Association (MsRWA)**, which runs CEU classes and on-site technical help across the state; and the **Mississippi Section of AWWA**. The **National Rural Water Association (NRWA)** also runs free monthly webinars with a certificate of completion. Before signing up, confirm that MSDH approves the course hours for renewal.",
      rel: ["renewal", "study-plan"] },

    /* ---------------- Chapter 3: Mathematics ---------------- */
    { id: "msrwa", q: "What is the Mississippi Rural Water Association (MsRWA)?",
      k: ["msrwa:7", "ms rwa:7", "mississippi rural water:7", "what is msrwa:7", "rural water association:4", "short course:3", "operator expo:4", "backflow certification:3", "certification class*:3", "certification course*:3"],
      a: "**MsRWA** is Mississippi's largest water and wastewater utility membership association and the state affiliate of the National Rural Water Association. It runs MSDH-approved **water operator certification courses**, wastewater and collection-system courses, **backflow certification and recertification**, hands-on operator training, board member training, and an annual **Operator Expo**, plus on-site technical help for member systems. Its **Training & Events calendar** lists upcoming classes.",
      rel: ["training-ms", "nrwa", "renewal"] },
    { id: "nrwa", q: "What is the National Rural Water Association (NRWA)?",
      k: ["nrwa:5", "national rural water:5", "waterpro:4", "water pro academy:4", "webinar*:3"],
      a: "**NRWA** is a nonprofit that trains and supports the people who run small water and wastewater systems. It works through **49 affiliated state rural water associations** (MsRWA is Mississippi's). It offers **free monthly webinars** with a certificate of completion, **WaterPro Academy** online courses, a utility management certification, and national conferences. Ask MSDH whether a course counts toward your renewal hours before you rely on it.",
      rel: ["msrwa", "training-ms", "renewal"] },
    { id: "epa-rules", q: "Where can I read the official drinking water rules?",
      k: ["official rule*:5", "federal rule*:4", "cfr:4", "40 cfr:5", "part 141:5", "read the regulation*:4", "epa rule*:4", "epa website:4", "where are the rules:4"],
      a: "Two official places:\n• **EPA's drinking water regulations pages** explain each rule in plain language, with compliance help for operators.\n• The **eCFR, 40 CFR Part 141**, has the exact legal text of the National Primary Drinking Water Regulations.\nMississippi adopts the federal rules, and **MSDH's Bureau of Public Water Supply** is who enforces them here. You can also ask me to **search EPA** for any topic.",
      rel: ["sdwa", "msdh", "site-search"] },
    { id: "pounds-formula", q: "What is the pounds formula?",
      k: ["pounds formula:6", "lbs day:5", "lb day:5", "lbs per day:5", "pounds per day:5", "dosage:4", "dose calculation:5", "feed rate:4", "8.34:5", "chemical feed:4", "how many pounds:5"],
      a: "**lbs/day = dose (mg/L) × flow (MGD) × 8.34**\nExample: 2.5 mg/L at 1.5 MGD → 2.5 × 1.5 × 8.34 = **31.3 lbs/day**.\nFor a product that isn't 100% pure, divide by its strength: 31.3 ÷ 0.65 (65% HTH) = **48.1 lbs/day of HTH**.\nThe same formula works for a one-time dose — use the **volume in million gallons** instead of MGD.",
      more: "Why 8.34? One gallon of water weighs 8.34 lbs, and 1 mg/L = 1 part per million. So one million gallons (8.34 million lbs of water) at 1 mg/L contains 8.34 lbs of chemical. The manual's shortcut **ppm × gpm × 0.012 = lbs per 24 hours** comes from the same math (1,440 min/day × 8.34 ÷ 1,000,000 ≈ 0.012).",
      rel: ["hypochlorite-math", "conversions", "chlorine-demand"] },
    { id: "conversions", q: "What conversion factors should I memorize?",
      k: ["conversion*:5", "convert:4", "conversion factor*:5", "7.48:5", "62.4:5", "694:4", "448:4", "1440:4", "constants:3", "unit*:2"],
      a: "The core set:\n• 1 gal water = **8.34 lbs** · 1 ft³ = **7.48 gal** = **62.4 lbs**\n• 1 ft of water = **0.433 psi** · 1 psi = **2.31 ft**\n• 1 MGD = **694.4 gpm** = **1.55 cfs** · 1 cfs = **448.8 gpm**\n• 1 day = **1,440 min** · 1 gal = **3.785 L**\n• 1 mg/L = 1 ppm = **8.34 lbs per million gallons**\n• Circle area = **0.785 × D²** · 1 hp = 0.746 kW",
      rel: ["pounds-formula", "psi-feet", "area-volume"] },
    { id: "area-volume", q: "What are the area and volume formulas?",
      k: ["area:4", "volume:4", "cylinder*:4", "rectangular:4", "circle:3", "tank volume:5", "tank capacity:5", "0.785:5", "radius:3", "diameter:3", "cubic feet:4", "how many gallons:4"],
      a: "• Rectangle area = **L × W**\n• Circle area = **0.785 × D²** (same as πr²)\n• Rectangular tank volume = **L × W × H**\n• Cylinder volume = **0.785 × D² × H**\nThen **ft³ × 7.48 = gallons**. Example: a tank 20 ft across and 30 ft tall = 0.785 × 400 × 30 = 9,420 ft³ × 7.48 = **70,462 gal**. Convert inches to feet first (8 in = 0.667 ft).",
      rel: ["detention-time", "conversions", "flow-qav"] },
    { id: "detention-time", q: "How do I calculate detention time?",
      k: ["detention time:6", "detention:5", "retention time:4", "how long water stay*:4", "theoretical detention:5"],
      a: "**Detention time = volume ÷ flow** — keep the units matched.\nExample: a 250,000-gal basin with 500 gpm flowing through it → 250,000 ÷ 500 = 500 min = **8.3 hours**.\nWith MGD, convert first: 1 MGD = 694.4 gpm. Real contact time is shorter than theoretical because of short-circuiting, which is why CT uses **T10** (baffling factor × theoretical time).",
      rel: ["ct-calc", "sedimentation", "area-volume"] },
    { id: "flow-qav", q: "How do I calculate flow in a pipe (Q = A × V)?",
      k: ["q av:6", "q=av:6", "q = av:6", "flow rate:4", "velocity:4", "cfs:4", "feet per second:4", "ft/sec", "ft sec", "pipe flow:5"],
      a: "**Q = A × V** → flow (ft³/sec) = area (ft²) × velocity (ft/sec).\nExample: a 12-inch (1 ft) pipe at 3 ft/sec → A = 0.785 × 1² = 0.785 ft² → Q = 0.785 × 3 = 2.36 cfs × 448.8 = **1,057 gpm**.\nFlip it to find velocity: V = Q ÷ A. Distribution design keeps velocity under about **5 ft/sec**.",
      rel: ["conversions", "dynamic-head", "area-volume"] },
    { id: "hypochlorite-math", q: "How much bleach or HTH do I need?",
      k: ["hypochlorite:5", "bleach:5", "hth:4", "calcium hypochlorite:5", "sodium hypochlorite:5", "percent solution:4", "how much chlorine:5", "gallons of bleach:5", "available chlorine:3"],
      a: "1. **Pounds of chlorine needed** = mg/L × MG × 8.34.\n2. **Pounds of product** = pounds needed ÷ strength (0.65–0.70 for HTH; 0.10–0.125 for sodium hypochlorite).\n3. For liquids, **gallons ≈ lbs of product ÷ 8.34** (exam simplification — real 12.5% bleach is about 1.2× heavier than water).\nExample: dose 100,000 gal to 2 mg/L with 10% solution → 2 × 0.1 × 8.34 = 1.67 lbs → ÷ 0.10 = 16.7 lbs → ÷ 8.34 = **2.0 gal**.",
      rel: ["pounds-formula", "chlorine-forms", "batch-chlorination"] },
    { id: "percent-math", q: "How do I work percent problems?",
      k: ["percent:4", "percentage*:4", "decimal*:3", "fraction*:3", "percent removal:5", "efficiency:3"],
      a: "Percent ÷ 100 = decimal (65% → 0.65). **Part = whole × decimal**; **percent = part ÷ whole × 100**.\n**Percent removal** = (in − out) ÷ in × 100. Example: turbidity 12 NTU in, 0.3 NTU out → 11.7 ÷ 12 × 100 = **97.5%**.\nEfficiency works the same way: output ÷ input × 100.",
      rel: ["math-tips", "horsepower"] },
    { id: "horsepower", q: "How do I calculate pump horsepower?",
      k: ["horsepower:5", "hp:4", "whp:5", "bhp:5", "mhp:5", "brake horsepower:5", "water horsepower:6", "3960:5", "3,960:5", "motor efficiency:4", "pump efficiency:4", "kilowatt*:3"],
      a: "• **Water HP = gpm × TDH (ft) ÷ 3,960**\n• **Brake HP = WHP ÷ pump efficiency**\n• **Motor HP = BHP ÷ motor efficiency**\n• kW = HP × 0.746\nExample: 600 gpm against 120 ft TDH → 600 × 120 ÷ 3,960 = **18.2 WHP**; at 75% pump efficiency → 24.2 BHP.",
      rel: ["dynamic-head", "pump-curve", "affinity-laws"] },
    { id: "ct-calc", q: "What is CT and how do I calculate it?",
      k: ["ct:6", "ct value*:6", "c x t:6", "c times t:6", "concentration time:5", "log inactivation:5", "inactivation:4", "t10:6", "baffling factor:6", "baffling:5"],
      a: "**CT = C × T** — disinfectant residual (mg/L) × contact time (minutes).\nUse **T10** — the time it takes 10% of the water to pass through — found from tracer studies or **theoretical detention × baffling factor** (0.1 unbaffled to 1.0 plug flow).\nExample: 1.2 mg/L free chlorine, 40 min T10 → **CT = 48 mg·min/L**. Required CT rises in **cold water** and at **higher pH**.",
      more: "The Surface Water Treatment Rules require at least **3-log (99.9%) Giardia** and **4-log (99.99%) virus** removal plus inactivation, with credit split between filtration and disinfection. The Ground Water Rule uses 4-log virus treatment where corrective action is required. EPA's CT tables give the required CT for each temperature, pH, and residual.",
      rel: ["detention-time", "swtr", "hocl"] },
    { id: "filter-rates", q: "How do I calculate filter loading and backwash rates?",
      k: ["filter loading:6", "loading rate:5", "filtration rate:5", "backwash rate:6", "gpm ft2", "gpm per square foot:5", "gpm/sq ft", "rise rate:5"],
      a: "**Filtration rate (gpm/ft²) = flow (gpm) ÷ filter surface area (ft²)**.\nExample: 1,400 gpm through a 20 × 35 ft filter (700 ft²) = **2.0 gpm/ft²**.\n**Backwash rate** uses the same math with backwash flow. To turn it into rise rate: gpm/ft² ÷ 7.48 × 12 = inches per minute (15 gpm/ft² ≈ 24 in/min).\nManual targets: ~2 gpm/ft² single media, ~3 dual media; backwash 15–20 (sand) or 10–15 (dual media).",
      rel: ["backwash", "filtration", "overflow-rates"] },
    { id: "overflow-rates", q: "What is surface overflow rate?",
      k: ["surface overflow:6", "overflow rate:5", "weir overflow:6", "weir loading:6", "weir:3", "sor:5", "gpd ft2", "gpd per square foot:5"],
      a: "• **Surface overflow rate = flow (gpd) ÷ basin surface area (ft²)**. Example: 0.5 MGD in a 40 × 20 ft basin → 500,000 ÷ 800 = **625 gpd/ft²** (alum floc typically settles well near 500).\n• **Weir overflow rate = flow (gpd) ÷ total weir length (ft)**. The manual's limit is **20,000 gpd per foot**.",
      rel: ["sedimentation", "filter-rates"] },
    { id: "fluoride-math", q: "How do I calculate fluoride feed?",
      k: ["fluoride feed:6", "fluoride dose:6", "fluoride calculation:6", "afi:6", "available fluoride ion:6", "fluoride math:6"],
      a: "**lbs/day = (target − natural F, mg/L) × MGD × 8.34 ÷ (AFI × purity)**\nAvailable fluoride ion (AFI): **sodium fluoride 0.452**, **sodium fluorosilicate 0.607**, **fluorosilicic acid 0.792** (of the pure acid; commercial acid is roughly 23–25% strength).\nExample: raise 0.2 → 0.7 mg/L at 1 MGD using 98% NaF: 0.5 × 1 × 8.34 ÷ (0.452 × 0.98) = **9.4 lbs/day**.",
      rel: ["fluoridation", "fluoride-chemicals", "pounds-formula"] },

    /* ---------------- Chapter 4: Hydraulics ---------------- */
    { id: "psi-feet", q: "How do I convert psi to feet of head?",
      k: ["psi:4", "feet of head:5", "head pressure:4", "pressure head:5", "0.433:6", "2.31:6", "ft of water:5", "feet of water:5", "convert pressure:5"],
      a: "**1 ft of water = 0.433 psi** and **1 psi = 2.31 ft**.\n• A tank with water 120 ft above a hydrant → 120 × 0.433 = **52 psi** (static).\n• A gauge reading 65 psi → 65 × 2.31 = **150 ft** of head.\nPressure depends only on the **height** of water above the point, never on the container's shape or size.",
      rel: ["static-head", "dynamic-head", "distribution-pressure"] },
    { id: "static-head", q: "What is static head?",
      k: ["static head:6", "static pressure:5", "elevation head:5", "static:3", "no flow pressure:4"],
      a: "**Static head** is the height of water above a reference point when nothing is flowing — stored potential energy. Water levels even out to match the highest tank in the pressure zone, so **static head at a point = highest water level − that point's elevation**. Multiply by 0.433 for psi.",
      rel: ["psi-feet", "dynamic-head", "storage"] },
    { id: "dynamic-head", q: "What is total dynamic head (TDH)?",
      k: ["total dynamic head:6", "tdh:6", "dynamic head:5", "friction loss*:5", "head loss:4", "bernoulli:5", "velocity head:5", "minor loss*:4"],
      a: "When water moves, **total head = elevation head + pressure head + velocity head** (Bernoulli). Friction against pipe walls, fittings, and valves steals head — **friction loss** — so a flowing system shows less pressure than a static one. For a pump, **TDH = static lift + friction losses + velocity head** (plus any required discharge pressure). Friction rises with flow, pipe length, roughness, and smaller diameter.",
      rel: ["hazen-williams", "horsepower", "pump-curve"] },
    { id: "hazen-williams", q: "What is the Hazen-Williams C factor?",
      k: ["hazen:6", "williams:3", "c factor:6", "c-factor:6", "c value:5", "roughness:5", "tuberculat*:5", "pipe roughness:5"],
      a: "The **C factor** rates how smooth a pipe is in the Hazen-Williams friction formula — **higher C = smoother = less friction loss**. Typical values: **new PVC ≈ 150**, **new ductile iron ≈ 130** (cement-lined ~140), and old tuberculated cast iron can drop to **50 or lower**. A falling C factor shows up as lower pressures and higher pumping costs, and it can justify cleaning or replacing mains.",
      rel: ["dynamic-head", "pipe-materials"] },
    { id: "water-hammer", q: "What is water hammer?",
      k: ["water hammer:6", "hammer:4", "surge*:4", "pressure surge*:5", "transient*:4", "slam*:4", "close valve* slowly:5", "closing a valve fast"],
      a: "**Water hammer** is the pressure spike that happens when moving water is stopped suddenly — a quick-closing valve or hydrant, a pump that trips, or a check valve that slams. The shock wave can reach several times normal pressure and **split mains, blow gaskets, and damage meters**. Prevention: **open and close valves and hydrants slowly**, use slow-closing or surge-anticipating valves, surge tanks, and soft starts or VFDs on pumps.",
      rel: ["hydrants", "valves", "affinity-laws"] },
    { id: "pump-types", q: "What's the difference between centrifugal and positive displacement pumps?",
      k: ["positive displacement:6", "centrifugal:5", "pump type*:5", "types of pump*:5", "piston pump:5", "diaphragm pump:5", "peristaltic:5", "turbine pump*:5", "submersible:4", "vertical turbine:5"],
      a: "**Centrifugal pumps** (including submersible and vertical turbine well pumps) spin an impeller to throw water outward. Flow drops as head rises, they must be **primed**, and they can run briefly against a closed valve.\n**Positive displacement pumps** (piston, diaphragm, peristaltic) push a **fixed volume per stroke** no matter the pressure — ideal for **chemical feed** — but never run one against a closed valve; pressure builds until something ruptures, so they need relief valves.",
      rel: ["priming", "pump-curve", "hypochlorinator"] },
    { id: "priming", q: "Why does a centrifugal pump need priming?",
      k: ["prime:5", "priming:6", "air lock*:5", "air bound:5", "lose prime:5", "lost prime:5", "lost its prime"],
      a: "A centrifugal pump can't move air — its impeller only builds pressure with **water in the casing**. **Priming** fills the casing and suction line with water. A pump that loses prime (air leak on the suction side, bad foot valve, low water level) will run dry, overheat, and wreck its seals or packing.",
      rel: ["pump-types", "cavitation", "packing-seals"] },
    { id: "cavitation", q: "What is cavitation?",
      k: ["cavitat*:6", "npsh:6", "net positive suction head:6", "suction head:4", "sounds like gravel:5", "gravel:3", "noise*:4", "noisy:4", "rattl*:4", "marbles:4", "impeller pitting:5"],
      a: "**Cavitation** happens when pressure at the pump's eye drops so low that water flashes into vapor bubbles, which then **collapse violently** — it sounds like gravel in the pump, pits the impeller, and cuts capacity. The cause: **NPSH available < NPSH required**. Typical fixes: raise the suction level, shorten or enlarge the suction line, clear clogged screens, or throttle the discharge back toward the design point.",
      rel: ["pump-curve", "priming", "dynamic-head"] },
    { id: "pump-curve", q: "How do I read a pump curve?",
      k: ["pump curve*:6", "characteristic curve:6", "best efficiency point:6", "bep:6", "shutoff head:6", "head capacity curve:6", "operating point:5", "system curve:5"],
      a: "A pump curve plots **head (ft) against flow (gpm)**, usually with efficiency and horsepower curves. **Shutoff head** is the head at zero flow. The pump runs where its curve crosses the **system curve**. Aim to operate near the **best efficiency point (BEP)** — the manual's “one point of peak efficiency.” Running far to either side wastes energy and wears bearings and seals.",
      rel: ["affinity-laws", "horsepower", "series-parallel"] },
    { id: "affinity-laws", q: "What are the pump affinity laws?",
      k: ["affinity:6", "affinity law*:6", "speed change*:5", "vfd:6", "variable frequency drive*:6", "variable speed:5", "impeller trim*:5"],
      a: "When pump speed (or impeller diameter) changes:\n• **Flow** changes in direct proportion (speed × 1.1 → flow × 1.1)\n• **Head** changes with the **square** (× 1.21)\n• **Power** changes with the **cube** (× 1.33)\nThat cube law is why **VFDs** save so much energy — running at 80% speed takes only about 51% of the power.",
      rel: ["pump-curve", "horsepower", "water-hammer"] },
    { id: "series-parallel", q: "What happens when pumps run in series or parallel?",
      k: ["series:5", "parallel:5", "two pumps:5", "pumps together:4", "booster pump*:4", "booster station*:4"],
      a: "Pumps in **series** (one discharging into the next) **add head** at the same flow — used for high lifts and boosters. Pumps in **parallel** (side by side into one header) **add flow** at the same head — used to meet higher demand. In practice two parallel pumps deliver less than twice the flow, because system friction rises with flow.",
      rel: ["pump-curve", "affinity-laws"] },
    { id: "packing-seals", q: "Should pump packing drip?",
      k: ["packing:6", "mechanical seal*:6", "gland:5", "stuffing box:6", "packing gland:6", "lantern ring:6", "drip* pump:4", "shaft seal*:5"],
      a: "Yes — **packing should leak slowly** (often cited as 20–60 drops a minute; check the manufacturer). The drip cools and lubricates the shaft. Overtightened packing runs dry, burns, and scores the sleeve. **Mechanical seals** are different: they shouldn't visibly leak, and a leaking seal needs replacing. Adjust packing a little at a time, evenly, with the pump running.",
      rel: ["priming", "maintenance-types"] },
    { id: "meters", q: "What types of flow meters are there?",
      k: ["meter*:3", "flow meter*:6", "venturi:6", "magnetic meter*:6", "mag meter*:6", "orifice:5", "weir plate:5", "displacement meter*:6", "turbine meter*:5", "compound meter*:5", "flow measur*:5"],
      a: "• **Positive displacement** — residential meters; accurate at low flow.\n• **Turbine / compound** — larger services; compound meters combine a turbine for high flow with a small meter for low flow.\n• **Venturi / orifice** — measure the pressure drop across a restriction (the chlorinator ejector uses the venturi principle).\n• **Magnetic** — measures the voltage induced as water moves through a magnetic field; no moving parts.\nAccurate metering is how you find **unaccounted-for water**.",
      rel: ["water-loss", "customer-meters"] },

    /* ---------------- Chapter 5: Ground Water & Wells ---------------- */
    { id: "ms-groundwater", q: "Where does Mississippi's drinking water come from?",
      k: ["mississippi ground water:6", "mississippi groundwater:6", "88%:5", "88 percent:5", "principal aquifer*:6", "mississippi aquifer*:6", "sparta:6", "wilcox:6", "citronelle:6", "cockfield:6", "alluvial aquifer:5", "source water:3", "groundwater:3", "ground water:4", "mississippi:2", "where does our water come from:5"],
      a: "About **88%** of the water used by Mississippi public systems is **ground water**, and every system uses at least some. The state has **15 principal freshwater aquifers** — the Sparta, Cockfield, Meridian–upper Wilcox, Citronelle, and Mississippi River Valley alluvial aquifers among them. Mineral content rises with depth and travel time; water over **1,000 mg/L dissolved solids** usually marks the downdip freshwater limit.",
      rel: ["aquifer-types", "aquifer-properties", "tds"] },
    { id: "aquifer-types", q: "What's the difference between confined and unconfined aquifers?",
      k: ["aquifer*:4", "confined:6", "unconfined:6", "water table aquifer:6", "water table:5", "artesian:6", "flowing artesian:6", "perched:5"],
      a: "• **Unconfined (water table) aquifer** — no impervious layer above it; the water table rises and falls, and it's more **vulnerable to surface contamination**.\n• **Confined aquifer** — sealed between impervious layers, so the water is **under pressure**.\nWhen a well taps a confined aquifer and the water rises above the aquifer's top, it's **artesian**; if it flows out of the casing on its own, it's a **flowing artesian** well.",
      rel: ["aquifer-properties", "drawdown", "wellhead-protection"] },
    { id: "aquifer-properties", q: "What are transmissivity, permeability, and porosity?",
      k: ["transmissivity:6", "permeability:6", "porosity:6", "hydraulic conductivity:6", "specific yield:5"],
      a: "• **Porosity** — the percent of rock or soil that's open space.\n• **Permeability** — how easily water moves through it (gpd/ft²).\n• **Transmissivity** — how much water flows through the aquifer's full thickness (ft²/day); Mississippi aquifers range from about 5 to over 84,000.\nHigh porosity doesn't guarantee a good well: **clay** is very porous but has pores too small to give up water.",
      rel: ["aquifer-types", "specific-capacity"] },
    { id: "drawdown", q: "What is drawdown and the cone of depression?",
      k: ["drawdown:6", "cone of depression:6", "pumping level:6", "pumping water level:6", "static water level:6", "static level:5", "radius of influence:6", "well interference:6"],
      a: "**Static water level** is the level in the well with the pump off; **pumping level** is the level while pumping. **Drawdown = pumping level − static level.** Pumping pulls the water table down in a funnel shape around the well — the **cone of depression**. When two wells' cones overlap, they interfere and both lose capacity.",
      rel: ["specific-capacity", "well-problems", "aquifer-types"] },
    { id: "specific-capacity", q: "What is specific capacity?",
      k: ["specific capacity:7", "gpm per foot:6", "gpm/ft:6", "gpm ft:5", "well yield:4"],
      a: "**Specific capacity = pumping rate (gpm) ÷ drawdown (ft)** — how many gpm the well gives for each foot of drawdown.\nExample: 300 gpm with 20 ft of drawdown = **15 gpm/ft**.\nTrack it over time: a steady **decline** is an early warning of screen encrustation, bacterial fouling, or pump wear — rehab the well before it fails.",
      rel: ["drawdown", "well-problems"] },
    { id: "well-construction", q: "How is a water well built?",
      k: ["well construction:6", "casing:5", "grout*:5", "well screen*:6", "screen*:3", "gravel pack:6", "annulus:5", "annular:5", "drill*:4", "cable tool:6", "rotary:5", "sanitary seal:5", "pitless:5"],
      a: "Most community wells are **drilled** — **cable-tool** (percussion; good in hard rock) or **rotary** (good in unconsolidated sands and clays). **Casing** keeps the hole from caving and blocks contamination. **Grout** (neat or high-early-strength cement) seals the annulus between casing and borehole. A **screen**, sized from a sieve analysis of the aquifer sand, lets water in and keeps sand out. The manual notes that **corrosion** — not collapse — is the more common cause of screen failure.",
      rel: ["well-development", "well-disinfection", "wellhead-protection"] },
    { id: "well-development", q: "What is well development?",
      k: ["well development:6", "develop* a well:6", "surging:6", "jetting:6", "overpump*:6", "over-pump*:6", "drilling mud"],
      a: "**Development** cleans out fine sand, silt, and drilling mud around the screen so water flows freely and the well reaches full capacity. Methods: **overpumping, surging** (moving water back and forth through the screen), and **jetting** (high-velocity water through the screen). Afterward, pump until the water runs clear and sand-free.",
      rel: ["well-construction", "well-disinfection"] },
    { id: "well-disinfection", q: "How do you disinfect a new well?",
      k: ["disinfect* well:6", "well disinfect*:6", "new well:5", "shock chlorinat*:6", "chlorinate a well:6", "50 mg l well:5", "c654:5"],
      a: "Per the manual: pump the well until it runs clear with no fine sand, then disinfect the well and surrounding aquifer with a **50 mg/L free chlorine** solution held **24 hours**. Pump until the water is chlorine-free, then collect **two consecutive samples**, taken at least **two hours of continuous pumping apart**, that both show **no coliform** before the well goes into service. (AWWA C654 is the industry standard for well disinfection.)",
      rel: ["main-disinfection", "sample-procedure", "well-construction"] },
    { id: "wellhead-protection", q: "What is wellhead protection?",
      k: ["wellhead:6", "wellhead protection:7", "source water protection:6", "source water assessment*:6", "recharge area:5", "setback*:5", "contamination source*:5"],
      a: "**Wellhead/source water protection** keeps contaminants out of the area that feeds your well. Map the protection area, inventory threats (septic systems, fuel tanks, abandoned wells, chemical storage), and manage them through local ordinances, education, and emergency plans. Keep a **sanitary seal**, a vented and screened well cap, and graded drainage away from the well — and don't store chemicals in the well house.",
      rel: ["abandoned-wells", "aquifer-types", "well-construction"] },
    { id: "well-problems", q: "Why would a well's yield drop?",
      k: ["yield drop*:6", "losing capacity:6", "lost capacity:5", "sand pumping:6", "pumping sand:6", "encrust*:6", "iron bacteria:6", "screen clog*:6", "rehabilitat*:6", "well rehab*:6"],
      a: "Common causes: **encrustation** (iron, manganese, or calcium carbonate plugging the screen), **iron bacteria** slime, **sand** from a failed screen or overpumping, a **worn pump**, or a **falling regional water level**. Watch specific capacity: if gpm per foot of drawdown drops, schedule rehab — chemical treatment, brushing, and surging — before the well fails.",
      rel: ["specific-capacity", "drawdown", "iron-manganese"] },
    { id: "abandoned-wells", q: "How do you abandon an old well?",
      k: ["abandon*:6", "plug* a well:6", "plugging:5", "seal* old well:6", "unused well*:6", "old well:4"],
      a: "An open, unused well is a **direct pipeline for contamination** into the aquifer (and a safety hazard). Abandon it properly: remove equipment, then **fill and seal it with grout** from the bottom up according to state rules. In Mississippi, water well drilling and plugging fall under **MDEQ**, so coordinate with MDEQ and MSDH before plugging a public supply well.",
      rel: ["wellhead-protection", "well-construction"] },

    /* ---------------- Chapter 6: Microbiology ---------------- */
    { id: "coliform", q: "Why is coliform used as an indicator?",
      k: ["coliform:5", "indicator:5", "total coliform:6", "indicator organism*:6", "why coliform:6"],
      a: "Testing for every pathogen is slow and impractical, so we test for **coliform bacteria**. They're present whenever sewage is, absent when it isn't, survive longer in water than most pathogens, and are cheap and easy to detect. A positive **total coliform** result doesn't prove the water is dangerous — it means contamination is **possible** and must be investigated. **E. coli** is the specific fecal indicator.",
      rel: ["e-coli", "rtcr", "repeat-samples"] },
    { id: "e-coli", q: "What does an E. coli positive mean?",
      k: ["e coli:7", "ecoli:7", "fecal:5", "escherichia:6", "e. coli positive", "ec+:5"],
      a: "**E. coli** points to recent **fecal contamination**, so it's taken very seriously. Under the Revised Total Coliform Rule you have an **E. coli MCL violation** if: an E. coli-positive repeat follows a total coliform-positive routine sample; a total coliform-positive repeat follows an E. coli-positive routine sample; you fail to take all repeats after an E. coli-positive routine sample; or you don't test a TC-positive repeat for E. coli. That's a **Tier 1** notice and triggers a **Level 2 assessment**.",
      rel: ["repeat-samples", "tier1", "rtcr"] },
    { id: "rtcr", q: "What is the Revised Total Coliform Rule?",
      k: ["revised total coliform rule:7", "rtcr:7", "total coliform rule:6", "tcr:5", "level 1:6", "level 2:6", "assessment*:5", "find and fix:6"],
      a: "The **RTCR** (effective 2016) replaced the old total coliform MCL with a **“find and fix”** approach. Total coliform positives **trigger assessments** instead of violations:\n• **Level 1** (done by the system) — e.g., more than 5% TC-positive in a month (40+ samples), 2+ positives (fewer than 40 samples), or missed repeats.\n• **Level 2** (done by the state or state-approved party) — e.g., an E. coli MCL violation, or a second Level 1 trigger within 12 months.\nAssessments are due within **30 days**. The only microbial MCL is now for **E. coli**.",
      rel: ["repeat-samples", "e-coli", "sample-sites"] },
    { id: "repeat-samples", q: "What happens after a positive coliform sample?",
      k: ["positive sample:6", "positive coliform:6", "repeat sample*:7", "check sample*:6", "resample*:6", "tc positive:6", "tc+:6", "positive result:5", "bad sample:5", "failed sample:5"],
      a: "Under the RTCR, collect **at least three repeat samples within 24 hours** of learning of a total coliform-positive routine sample: one at the **original tap**, one within **five service connections upstream**, and one within **five downstream** (your sample siting plan may name other locations). Every TC-positive sample is also tested for **E. coli**. Groundwater systems must also take a **triggered source sample** from each well within 24 hours (Ground Water Rule). The manual calls repeats “check samples.”",
      rel: ["e-coli", "rtcr", "sample-procedure"] },
    { id: "sample-procedure", q: "How do I collect a bacteriological sample?",
      k: ["collect* sample*:6", "sampling procedure:6", "bacteriological sample*:7", "bac t:6", "bact*:5", "sample bottle*:6", "sodium thiosulfate:6", "sampling technique:6", "take a sample:6", "how to sample:6", "30 hours:6", "holding time:6"],
      a: "Manual procedure:\n1. Use only the **sterile 100-mL bottle** from MSDH — it contains **sodium thiosulfate** to neutralize chlorine. Don't rinse it.\n2. Pick a clean faucet in good repair — **not** a leaking or dirty tap, one within about 12 in of the ground, or a hydrant. Remove any aerator or screen.\n3. Run the water **2–3 minutes**; record temperature and chlorine residual.\n4. Turn it off, **flame or alcohol-sterilize** the faucet, then turn it on to a moderate, steady stream.\n5. Fill just above the 100-mL line without touching the inside of the cap or bottle.\n6. Fill out the card completely. The sample must reach the lab within **30 hours**.",
      rel: ["sample-sites", "repeat-samples", "colilert"] },
    { id: "sample-sites", q: "How many bacteriological samples do I need?",
      k: ["how many samples:7", "sample site*:6", "sampling plan:6", "sample siting plan:7", "monthly sample*:6", "sampling schedule:5", "routine sample*:5"],
      a: "Routine sample counts are based on **population served** — the smallest community systems (25–1,000 people) take **1 per month**, and large systems take hundreds. Samples rotate among sites in your **MSDH-approved sample siting plan**, which should represent the whole system: different sources, storage tanks, pressure zones, and dead ends. The manual sets a minimum of **five sites** per system. MSDH assigns your schedule.",
      rel: ["sample-procedure", "rtcr", "tier3"] },
    { id: "pathogens", q: "What pathogens can be in drinking water?",
      k: ["pathogen*:6", "disease*:4", "giardia:6", "cryptosporidium:6", "crypto:6", "virus*:5", "protozoa:6", "legionella:6", "cholera:5", "typhoid:5", "norovirus:5", "hepatitis:5", "waterborne:5"],
      a: "• **Bacteria** — E. coli O157, Salmonella (typhoid), Shigella, Vibrio cholerae, Legionella. Killed fairly easily by chlorine: about **10 minutes at 0.2–0.3 mg/L** free residual, per the manual.\n• **Viruses** — norovirus, hepatitis A, enteroviruses. Much smaller and harder to kill (~**30 minutes** at the same residual).\n• **Protozoa** — **Giardia** and **Cryptosporidium** form tough cysts/oocysts. Crypto **shrugs off chlorine**, so it takes multiple barriers — coagulation, filtration, and UV or ozone.",
      rel: ["swtr", "uv", "ct-calc"] },
    { id: "hpc", q: "What is a heterotrophic plate count (HPC)?",
      k: ["hpc:6", "heterotrophic:6", "plate count:6", "standard plate count:6"],
      a: "**HPC** measures the general population of bacteria in water. It isn't a health standard itself, but it's a useful sign of **regrowth, stagnant water, or low residual** in the distribution system. Under the Surface Water Treatment Rule, an HPC of **500/mL or less** can stand in for a detectable residual at a distribution sample site.",
      rel: ["free-residual", "tank-maintenance", "coliform"] },
    { id: "colilert", q: "How does the Colilert test work?",
      k: ["colilert:7", "presence absence:6", "enzyme substrate:6", "mug:5", "onpg:5", "fluoresc*:5", "turns yellow:5"],
      a: "**Colilert** (used by the MSDH lab) is an enzyme-substrate test. Add the reagent to a 100-mL sample and incubate about **24 hours at 35°C**. **Yellow = total coliform present** (the ONPG reaction); **blue fluorescence under UV light = E. coli** (the MUG reaction). It's a presence/absence result, which is what compliance sampling needs.",
      rel: ["sample-procedure", "e-coli"] },

    /* ---------------- Chapter 7: Chemistry ---------------- */
    { id: "ph", q: "What is pH?",
      k: ["ph:6", "acid*:4", "acidic:5", "basic:3", "alkaline:4", "hydrogen ion*:6", "neutral:4", "ph scale:6"],
      a: "**pH** measures hydrogen ion (H⁺) activity on a 0–14 scale. **7 is neutral**, below 7 is **acidic**, above 7 is **basic (alkaline)**. It's logarithmic, so pH 6 is ten times more acidic than pH 7. **More H⁺ means lower pH.** Recommended drinking water range: **6.5–8.5**. Many Mississippi well waters run naturally low because of dissolved CO₂.",
      rel: ["raise-lower-ph", "alkalinity", "hocl"] },
    { id: "raise-lower-ph", q: "What chemicals raise or lower pH?",
      k: ["raise ph:6", "lower ph:6", "increase ph:6", "decrease ph:6", "ph adjust*:6", "adjust ph:6", "lime:4", "soda ash:5", "caustic:5", "sodium hydroxide:5", "sulfuric acid:4"],
      a: "**Lower pH:** chlorine gas, alum, ferric sulfate/chloride, sulfuric acid, fluorosilicic acid, carbon dioxide.\n**Raise pH:** lime, soda ash, caustic soda (sodium hydroxide), and hypochlorite solutions.\nAeration raises pH too, by stripping out CO₂. Feed lime **separately** from alum — they react with each other in the feed line.",
      rel: ["ph", "aeration", "corrosion-control"] },
    { id: "alkalinity", q: "What is alkalinity?",
      k: ["alkalinity:7", "bicarbonate*:6", "carbonate:4", "hydroxide:4", "buffer*:5", "buffering:5"],
      a: "**Alkalinity** is water's ability to **neutralize acid** — its buffer against pH swings. It comes from **bicarbonate** (most of it in natural water), carbonate, and hydroxide, and it's reported in mg/L as CaCO₃. It's essential for **coagulation**: alum and ferric coagulants consume alkalinity to form floc, so low-alkalinity water may need **lime or soda ash added first**. Don't confuse it with pH — water can be high-pH and low-alkalinity.",
      rel: ["coagulation", "ph", "hardness"] },
    { id: "hardness", q: "What causes hardness and how is it classified?",
      k: ["hardness:7", "hard water:7", "soft water:5", "calcium:4", "magnesium:4", "scale:4", "grains per gallon:6", "gpg:5", "17.1:5"],
      a: "Hardness comes mostly from **calcium and magnesium** ions (reported as mg/L CaCO₃). The manual's scale: **soft < 75**, **moderately hard 75–150**, **hard 150–200**, **very hard > 200**. Hard water leaves scale and wastes soap; very soft water tends to be corrosive. **1 grain per gallon = 17.1 mg/L.**",
      rel: ["carbonate-hardness", "ion-exchange", "lime-softening"] },
    { id: "carbonate-hardness", q: "What's the difference between carbonate and noncarbonate hardness?",
      k: ["carbonate hardness:7", "noncarbonate:7", "non-carbonate:7", "temporary hardness:7", "permanent hardness:7"],
      a: "**Carbonate (“temporary”) hardness** is paired with alkalinity and can be removed by heating. **Noncarbonate (“permanent”) hardness** can't.\nRule of thumb: if **alkalinity ≥ total hardness**, all hardness is carbonate. If **alkalinity < total hardness**, carbonate hardness = alkalinity, and the rest is noncarbonate.",
      rel: ["hardness", "lime-softening"] },
    { id: "iron-manganese", q: "Why are iron and manganese a problem?",
      k: ["iron:5", "manganese:6", "red water:6", "rusty water:6", "brown water:5", "black water:6", "black stain*:6", "stain*:4", "discolor*:4"],
      a: "Above **0.3 mg/L iron** you get reddish-brown stains; above **0.05 mg/L manganese**, black stains and specks. Both cause metallic tastes and feed iron bacteria. Treatment: **oxidize** them (aeration, chlorine, or potassium permanganate), give the reaction time (about **30 minutes** after aeration), then **filter** the precipitate. Greensand, ion exchange, or **polyphosphate sequestration** (for low levels only) are other options.",
      rel: ["aeration", "greensand", "phosphate"] },
    { id: "hydrogen-sulfide", q: "What causes rotten egg odor?",
      k: ["hydrogen sulfide:7", "h2s:7", "rotten egg*:7", "sulfur smell:6", "sulfur odor:6", "sulphur"],
      a: "Rotten-egg odor is **hydrogen sulfide (H₂S)**, common in some Mississippi ground water. Aeration strips it, and chlorine oxidizes it — the manual notes **1 mg/L of H₂S uses about 2.1 mg/L of chlorine** before any residual forms. H₂S is also **deadly in enclosed spaces**: at high concentrations it deadens your sense of smell, so never trust your nose — use a gas monitor.",
      rel: ["aeration", "confined-space", "chlorine-demand"] },
    { id: "nitrate", q: "Why is nitrate dangerous?",
      k: ["nitrate*:7", "nitrite*:7", "blue baby:7", "methemoglobin*:7", "fertilizer:4", "septic:3"],
      a: "Nitrate (MCL **10 mg/L as N**) and nitrite (MCL **1 mg/L as N**) cause **methemoglobinemia** (“blue baby syndrome”) in infants under about six months — their blood can't carry enough oxygen. Because it's **acute**, a nitrate MCL violation needs a **Tier 1** notice within 24 hours. Sources: fertilizer, septic systems, animal waste. **Boiling does not remove nitrate** — it concentrates it.",
      rel: ["tier1", "wellhead-protection", "membranes"] },
    { id: "arsenic", q: "What about arsenic?",
      k: ["arsenic:7"],
      a: "Arsenic occurs naturally in some aquifers and is a carcinogen. **MCL: 0.010 mg/L (10 ppb).** Treatment options: oxidation with coagulation/filtration or iron removal (arsenic rides along with iron), adsorptive media, ion exchange, and reverse osmosis.",
      rel: ["mcl", "iron-manganese", "membranes"] },
    { id: "lead-copper", q: "What is the Lead and Copper Rule?",
      k: ["lead:5", "copper:5", "lcr:7", "lcri:7", "lcrr:7", "lead and copper:7", "action level*:6", "90th percentile:7", "lead service line*:7", "lsl*:6", "first draw:5"],
      a: "Lead and copper come mostly from **customer plumbing and service lines**, not the source, so the rule uses **action levels** at the **90th percentile** of first-draw tap samples: **lead 15 ppb**, **copper 1.3 mg/L**. Exceeding one triggers corrosion control, public education, source monitoring, and possibly lead service line replacement.\n• Systems had to submit a **service line inventory by October 16, 2024**.\n• The **Lead and Copper Rule Improvements (LCRI)**, finalized October 2024, lower the lead action level to **10 ppb** and require most lead service lines to be replaced within 10 years, with most requirements starting **November 1, 2027**. Check MSDH for current status.",
      more: "Sampling basics: first-draw samples from high-risk homes (lead service lines first) after at least **6 hours of stagnation**. Keep lead and copper records **12 years**. Corrosion control usually means pH/alkalinity adjustment or an **orthophosphate** inhibitor.",
      rel: ["corrosion-control", "records", "phosphate"] },
    { id: "corrosion-control", q: "How does corrosion control work?",
      k: ["corrosion control:7", "corrosion:5", "corrosive:6", "orthophosphate:5", "inhibitor*:6", "lsi:6", "langelier:7", "saturation index:6", "stabiliz*:5", "aggressive water:6", "cct:5"],
      a: "Corrosive water eats pipes and leaches lead and copper; scale-forming water clogs them. **Stabilization** aims for water that lays down a thin protective layer. The **Langelier Saturation Index (LSI)** predicts which way it'll go: **slightly positive** = deposits protective calcium carbonate, **negative** = corrosive (valid about pH 6.5–9.5). Tools: pH and alkalinity adjustment (lime, soda ash, caustic), and **orthophosphate** or blended phosphate inhibitors.",
      rel: ["lead-copper", "phosphate", "raise-lower-ph"] },
    { id: "tds", q: "What is TDS?",
      k: ["tds:7", "total dissolved solids:7", "dissolved solids:6", "conductivity:6", "salty taste:5", "mineral content:5"],
      a: "**Total dissolved solids** are the dissolved minerals and salts in water. The secondary standard is **500 mg/L**; high TDS tastes salty or bitter and can be corrosive. **Conductivity** is a quick field stand-in, since dissolved ions carry current. In Mississippi aquifers, TDS rises with depth — above about **1,000 mg/L** is usually treated as the freshwater limit.",
      rel: ["ms-groundwater", "secondary-standards", "membranes"] },
    { id: "jar-test", q: "How do you run a jar test?",
      k: ["jar test*:7", "jar testing:7", "optimum dose:6", "coagulant dose:6", "best dose:5", "gang stirrer:6"],
      a: "A **jar test** finds the best coagulant, dose, and pH at bench scale:\n1. Fill 4–6 jars with raw water.\n2. Dose each with a different amount of coagulant (and aid, if used).\n3. **Rapid mix** about 1 minute, then **slow mix** 15–30 minutes to grow floc.\n4. Let it settle, then compare floc size, settling, and settled-water **turbidity and color**.\nThe clearest jar at the lowest dose wins. Rerun whenever raw water changes (rain, turnover, algae).",
      rel: ["coagulation", "flocculation", "turbidity"] },
    { id: "dbps", q: "What are disinfection byproducts (THMs and HAA5)?",
      k: ["disinfection byproduct*:7", "dbp*:7", "thm*:7", "trihalomethane*:7", "tthm:7", "haa5:7", "haloacetic:7", "bromate:5", "chlorite:5", "stage 2:6", "lraa:6", "chloroform:5"],
      a: "Chlorine reacts with **natural organic matter** to form byproducts. Limits (Stage 1/2 D/DBP Rules), as **locational running annual averages (LRAA)**: **TTHM 0.080 mg/L**, **HAA5 0.060 mg/L**; also bromate 0.010 (ozone) and chlorite 1.0 (chlorine dioxide).\nControl them by **removing precursors** before chlorinating (enhanced coagulation, activated carbon), **moving the chlorine feed point** downstream, switching to **chloramines**, and keeping **water age** down with flushing and tank mixing.",
      rel: ["toc", "alt-disinfectants", "tank-maintenance"] },
    { id: "toc", q: "What is TOC and enhanced coagulation?",
      k: ["toc:7", "total organic carbon:7", "enhanced coagulation:7", "natural organic matter:6", "nom:5", "precursor*:6"],
      a: "**Total organic carbon (TOC)** measures the organic material that becomes DBPs once chlorinated. Conventional surface water plants must practice **enhanced coagulation** — higher coagulant doses and/or lower pH — to remove a set percentage of TOC based on raw water TOC and alkalinity. Less TOC in means fewer THMs and HAAs out.",
      rel: ["dbps", "coagulation", "activated-carbon"] },

    /* ---------------- Chapter 8D: Class D treatment ---------------- */
    { id: "chlorine-curve", q: "Explain the breakpoint chlorination curve.",
      k: ["breakpoint:7", "breakpoint chlorination:7", "chlorination curve:7", "chlorine curve:7", "combined residual:6", "combined chlorine:6", "chloramine*:3"],
      a: "Add chlorine little by little and it goes through four stages:\n1. **Demand** — chlorine reacts with iron, manganese, H₂S, and organics. No residual yet.\n2. **Combined residual** — chlorine joins with ammonia to form **chloramines** (weak disinfectant, strong odor).\n3. **Breakpoint** — more chlorine destroys the chloramines, and the residual **dips to its lowest point**.\n4. **Free residual** — past breakpoint, added chlorine stays as **free chlorine**, the strongest and most reliable form.\nKeep a free residual throughout distribution.",
      rel: ["chlorine-demand", "free-residual", "hocl"] },
    { id: "chlorine-demand", q: "How do chlorine dose, demand, and residual relate?",
      k: ["chlorine demand:7", "demand:5", "dose demand residual:7", "dose minus residual:6", "chlorine dose:5"],
      a: "**Dose = demand + residual.** Demand is what reacts and gets used up; residual is what's left to protect the water.\nExample: dose 2.5 mg/L, residual 0.8 mg/L → demand = **1.7 mg/L**. If demand jumps (rain, iron, a main break) and you don't raise the dose, the residual drops. Watch that trend.",
      rel: ["chlorine-curve", "pounds-formula", "free-residual"] },
    { id: "free-residual", q: "What chlorine residual do I need to keep?",
      k: ["chlorine residual:7", "minimum residual:7", "residual:5", "free chlorine:5", "mrdl:6", "4.0:4", "end of line:5", "dead end residual:5", "how much chlorine in water:5"],
      a: "Manual targets: at least **0.2 mg/L free chlorine** throughout the distribution system, and about **0.5 mg/L** near the ends of the lines where possible. The federal **MRDL is 4.0 mg/L** (running annual average) — the cap on the high side. If a residual reads **zero**, find out why: flush, check the feeder, and follow MSDH direction on sampling.",
      rel: ["chlorine-curve", "hocl", "flushing"] },
    { id: "hocl", q: "What is hypochlorous acid vs. hypochlorite ion?",
      k: ["hypochlorous:7", "hocl:7", "hypochlorite ion:7", "ocl:6", "chlorine ph:6", "ph effect* chlorine:6", "chlorine and ph:6"],
      a: "Free chlorine in water splits between **hypochlorous acid (HOCl)** and **hypochlorite ion (OCl⁻)**. HOCl is the **far stronger disinfectant** — roughly 80–100 times more effective. **Lower pH favors HOCl**: about half-and-half near pH 7.5, mostly HOCl below 7, mostly OCl⁻ above 8. That's why disinfection works better at lower pH, and why high-pH water needs more CT.",
      rel: ["ct-calc", "ph", "chlorine-curve"] },
    { id: "chlorine-forms", q: "What forms of chlorine are used?",
      k: ["gas chlorine:5", "chlorine gas:4", "forms of chlorine:7", "types of chlorine:7", "hth:5", "calcium hypochlorite:5", "sodium hypochlorite:5", "tablet*:4", "liquid chlorine:5"],
      a: "• **Chlorine gas** — nearly **100%** available chlorine; cheapest per pound, most hazardous. Lowers pH.\n• **Calcium hypochlorite (HTH)** — granules or tablets, about **65–70%** available (the manual uses 70%). Store dry and away from organics — it can ignite.\n• **Sodium hypochlorite** — liquid, typically **10–15%** for utilities (household bleach is 5–8%). Loses strength with heat, light, and age — buy fresh and store cool. Raises pH slightly.",
      rel: ["hypochlorite-math", "chlorine-gas-safety", "hypochlorinator"] },
    { id: "chlorine-feed-shorthand", q: "What's the ppm × gpm × 0.012 shortcut?",
      k: ["0.012:7", "ppm x gpm:7", "ppm times gpm:7", "lbs per 24 hours:6", "shortcut:4"],
      a: "From the manual: **ppm × gpm × 0.012 = pounds of chlorine per 24 hours.** Example: a 500 gpm well needing 2 ppm → 2 × 500 × 0.012 = **12 lbs/24 hr**. It's the pounds formula with the units already combined: gpm × 1,440 min/day × 8.34 ÷ 1,000,000 ≈ 0.012.",
      rel: ["pounds-formula", "chlorinator"] },
    { id: "fluoridation", q: "What should I know about fluoridation?",
      k: ["fluorid*:5", "fluoride:5", "fluoride level*:6", "optimal fluoride:6", "tooth:4", "teeth:4", "dental:5", "cavit*:3"],
      a: "Fluoride at the right level reduces tooth decay. **Manual:** ideal range **0.8–1.2 mg/L**. **Current U.S. Public Health Service recommendation (2015): 0.7 mg/L.** Federal limits: **MCL 4.0 mg/L** (skeletal fluorosis) and **secondary 2.0 mg/L** (dental fluorosis). In **April 2025** EPA began an expedited review of new fluoride science, and its health assessment is under way in 2026; the MCL stays 4.0 mg/L unless EPA changes it. Fluoridation policy is decided by states and communities and has been changing, so follow MSDH's current guidance. For the exam, use the manual's numbers.",
      rel: ["fluoride-chemicals", "fluoride-math", "mcl"] },
    { id: "fluoride-chemicals", q: "Which chemicals are used for fluoridation?",
      k: ["sodium fluoride:7", "hydrofluosilicic:7", "fluorosilicic:7", "fluosilicic:7", "sodium silicofluoride:7", "sodium fluorosilicate:7", "saturator:7"],
      a: "• **Sodium fluoride (NaF)** — white salt, 90–98% pure; small systems often use a **saturator** (about 4% solution).\n• **Fluorosilicic (hydrofluosilicic) acid** — 22–30% liquid, very corrosive; fed straight or diluted heavily (light dilution causes precipitation).\n• **Sodium fluorosilicate (silicofluoride)** — powder, usually dry-fed at larger plants.\nAll are corrosive in solution. Use proper PPE, never breathe the dust, and add **overfeed protection** — the feeder should be interlocked so it can't run when the well pump is off.",
      rel: ["fluoridation", "fluoride-math", "ppe"] },
    { id: "phosphate", q: "Why do systems add phosphate?",
      k: ["phosphate:6", "polyphosphate:7", "orthophosphate:7", "blended phosphate:7", "sequest*:7"],
      a: "Two jobs:\n• **Polyphosphates sequester** iron and manganese, keeping small amounts dissolved so they don't stain. Best for low levels, and it doesn't remove anything.\n• **Orthophosphate** forms a protective film inside pipes — a key **corrosion control** tool for lead and copper.\nBlended phosphates do some of both. Too much can feed biofilm, so dose carefully and monitor residuals.",
      rel: ["corrosion-control", "iron-manganese", "lead-copper"] },
    { id: "uv", q: "How does UV disinfection work?",
      k: ["uv:7", "ultraviolet:7", "uv light:7", "uv lamp*:6"],
      a: "**Ultraviolet light** damages microbes' DNA so they can't reproduce. It's excellent against **Cryptosporidium and Giardia**, which chlorine struggles with, and it forms no DBPs. But it leaves **no residual**, so you still need chlorine for the distribution system. It also needs clear water (low turbidity and color) and clean lamp sleeves.",
      rel: ["pathogens", "alt-disinfectants", "ct-calc"] },
    { id: "contact-time", q: "How much contact time does chlorine need?",
      k: ["contact time:7", "15 minutes:5", "30 minutes:4", "contact tank:6", "clearwell:6", "chlorine contact:6"],
      a: "The manual recommends **15–30 minutes** of contact before the first customer. Disinfection works better at **lower pH** (more HOCl) and **higher temperature**. Surface water plants have to prove it with **CT** (residual × T10 contact time) against EPA's tables — cold, high-pH water needs the most.",
      rel: ["ct-calc", "hocl", "detention-time"] },

    /* ---------------- Chapter 8B&C: Unit processes ---------------- */
    { id: "aeration", q: "What does aeration do?",
      k: ["aerat*:7", "aerator*:6", "cascade:5", "tray aerator*:6", "forced draft:6", "degasif*:6", "carbon dioxide removal:6", "co2:4"],
      a: "Aeration mixes air and water to:\n• **Strip gases** — carbon dioxide (raises pH), hydrogen sulfide, methane.\n• **Oxidize iron and manganese** into solids that can be filtered (allow about **30 minutes** of detention first).\n• Reduce some tastes and odors and add oxygen.\nGravity aerators load at about **10–30 gpm/ft²**. Because H₂S can build up, ventilate enclosed aerators well.",
      rel: ["iron-manganese", "hydrogen-sulfide", "raise-lower-ph"] },
    { id: "coagulation", q: "What is coagulation?",
      k: ["coagula*:6", "coagulant*:6", "alum:6", "aluminum sulfate:6", "ferric:5", "zeta potential:7", "rapid mix*:6", "flash mix*:6", "charge neutraliz*:6"],
      a: "Most turbidity particles carry a **negative charge** and repel each other (**zeta potential**). **Coagulation** is rapid mixing of a **positively charged coagulant** — usually **alum** or a ferric salt — to neutralize that charge so particles can stick. The reaction takes **1–2 seconds**, which is why **rapid (flash) mixing** at the feed point is critical. **Trivalent** coagulants (Al³⁺, Fe³⁺) are **700–1,000×** more effective than monovalent ones.",
      rel: ["flocculation", "jar-test", "alkalinity"] },
    { id: "flocculation", q: "What is flocculation?",
      k: ["floccula*:7", "floc:6", "slow mix*:6", "paddle*:4", "gentle mixing:6", "pin floc:6"],
      a: "**Flocculation** follows coagulation: **gentle, slow mixing** (usually 20–40 minutes, often in tapered stages) lets destabilized particles collide and grow into large, heavy **floc**. Mix too hard and you shear the floc apart; too gently and it never grows. Tiny “**pin floc**” that won't settle usually means the coagulant dose or pH is off — run a jar test.",
      rel: ["coagulation", "sedimentation", "jar-test"] },
    { id: "sedimentation", q: "What happens in sedimentation?",
      k: ["sediment*:6", "settling:5", "clarifier*:7", "settling basin*:7", "sed basin*:6", "four zones:6", "sludge zone:6", "short circuit*:7"],
      a: "**Sedimentation** lets floc settle out before filtration. Every basin has **four zones: inlet, settling, outlet, and sludge**. Manual design criteria: at least **4 hours** of detention (2 hours for lime-soda softening of ground water only), settling velocity under **0.5 ft/min**, weir overflow no more than **20,000 gpd/ft**, and settled water under **10 NTU**. The main enemy is **short-circuiting** — water racing through faster than design, usually from poor inlet baffling.",
      rel: ["overflow-rates", "filtration", "flocculation"] },
    { id: "filtration", q: "How do rapid sand filters work?",
      k: ["filtration:5", "filter*:4", "rapid sand:7", "dual media:7", "anthracite:7", "mixed media:6", "filter run*:6", "breakthrough:6", "gravity filter*:5"],
      a: "**Rapid gravity filters** strain and trap particles as water flows down through media: **sand**, or **dual media** (anthracite over sand) that holds more solids. Typical rates: **~2 gpm/ft²** single media and **~3 gpm/ft²** dual media. As the filter loads, **head loss** climbs. End a run on head loss, a rising effluent turbidity (**breakthrough**), or time — whichever comes first.",
      rel: ["backwash", "filter-rates", "turbidity"] },
    { id: "backwash", q: "When and how do you backwash a filter?",
      k: ["backwash*:7", "head loss:5", "filter wash*:6", "surface wash*:6", "air scour:6", "mudball*:7", "bed expansion:6", "filter to waste:7", "filter-to-waste:7", "ripening:6"],
      a: "Backwash when **head loss reaches 7–10 ft**, effluent turbidity starts to rise, or on your time limit. Reverse the flow at **15–20 gpm/ft² for sand** or **10–15 gpm/ft² for dual media** (often after surface wash or air scour) for **3–20 minutes**, until the wash water runs clear. Afterward, **filter-to-waste** through the ripening period so the first cloudy water doesn't reach the clearwell. Not washing well enough leads to **mudballs** and cracked beds.",
      rel: ["filtration", "filter-rates", "sludge"] },
    { id: "ion-exchange", q: "How does ion exchange softening work?",
      k: ["ion exchange:7", "zeolite*:7", "softener*:6", "water softener*:6", "regenerat*:6", "brine:6", "resin:6"],
      a: "Water passes through **resin** (zeolite) that swaps **sodium for calcium and magnesium**, softening it to near zero hardness (plants usually blend some water back). When the resin is spent, **regenerate** it with strong **salt brine** — 20–35 minutes of contact — then rinse. It works best on low-TDS water (under about 2,000 mg/L) and **isn't suitable above ~0.3 mg/L iron plus manganese**, which foul the resin. It can also be set up to remove nitrate.",
      rel: ["hardness", "lime-softening", "iron-manganese"] },
    { id: "greensand", q: "What is greensand filtration?",
      k: ["greensand:7", "potassium permanganate:7", "permanganate:7", "kmno4:7", "manganese dioxide:6", "pink water:7", "manganese greensand:7"],
      a: "**Manganese greensand** (and newer greensand-type media) is coated with **manganese dioxide**, which oxidizes and traps iron and manganese as water passes through. Keep it active with **potassium permanganate** (continuously or by regeneration) or chlorine. Permanganate works faster than chlorine on manganese and over **pH 5–9**. Overfeeding it turns the water **pink** — dose carefully.",
      rel: ["iron-manganese", "filtration", "pressure-filters"] },
    { id: "pressure-filters", q: "What are pressure filters?",
      k: ["pressure filter*:7", "closed pressure:6", "pressure vessel*:5", "pressure tank filter*:5"],
      a: "**Pressure filters** are closed steel tanks of media that filter without breaking system pressure — common at Class C iron-removal and softening plants. You can't see the media, so watch the **pressure differential** across the filter to time backwashes, and **open and inspect** the bed periodically for mudballs, channeling, and media loss.",
      rel: ["filtration", "backwash", "greensand"] },
    { id: "polymers", q: "What are coagulant aids and polymers?",
      k: ["polymer*:7", "polyelectrolyte*:7", "coagulant aid*:7", "activated silica:7", "bentonite:6", "weighting agent*:6", "cationic:5", "anionic:5"],
      a: "**Coagulant aids** make tougher, faster-settling floc, help in cold water, and can reduce coagulant and sludge. Types: **polyelectrolytes** (cationic, anionic, or nonionic polymers), **activated silica**, and **weighting agents** like bentonite clay for very clear water. Polymers are powerful at tiny doses — overdosing can restabilize particles and blind filters — so jar test every change.",
      rel: ["coagulation", "jar-test", "flocculation"] },

    /* ---------------- Chapter 8A: Surface water ---------------- */
    { id: "surface-water", q: "How is surface water treatment different?",
      k: ["surface water:6", "river*:3", "lake*:3", "reservoir*:4", "raw water quality:6", "turnover:5", "intake*:4", "storm*:3"],
      a: "Only about **10%** of Mississippians drink surface water (about 75% nationally), but it's the hardest to treat. Quality swings with **rain, runoff, season, and algae**, and it carries Giardia and Cryptosporidium. Full treatment means **screening, coagulation, flocculation, sedimentation, filtration, and disinfection**, often with pre-sedimentation for rivers. Operators constantly monitor turbidity, pH, alkalinity, temperature, color, and residual, adjusting with jar tests and streaming current monitors.",
      rel: ["swtr", "turbidity", "algae"] },
    { id: "swtr", q: "What does the Surface Water Treatment Rule require?",
      k: ["surface water treatment rule*:7", "swtr:7", "ieswtr:7", "lt1*:7", "lt2*:7", "log removal:6", "3 log:6", "4 log:6", "0.3 ntu:7", "combined filter effluent:7", "individual filter*:6", "turbidity limit*:6"],
      a: "Surface water (and ground water under the direct influence of surface water) must be **filtered and disinfected** to achieve at least **3-log (99.9%) Giardia** and **4-log (99.99%) virus** removal/inactivation, plus **2-log Cryptosporidium** removal. For conventional and direct filtration, **combined filter effluent turbidity must be ≤ 0.3 NTU in 95% of monthly readings** (taken every 4 hours) and **never above 1 NTU**. Individual filters are monitored continuously. LT2 adds more Crypto treatment based on source monitoring.",
      rel: ["turbidity", "ct-calc", "pathogens"] },
    { id: "turbidity", q: "What is turbidity and why does it matter?",
      k: ["turbidity:7", "ntu:7", "cloudy water:6", "cloudiness:6", "nephelometric:6", "turbidimeter:7"],
      a: "**Turbidity** is cloudiness from suspended particles, measured in **NTU** with a nephelometric turbidimeter (it measures light scattered at 90°). It matters because particles **shield microbes from disinfectant** and interfere with coliform testing, and because turbidity tracks how well coagulation and filtration are working. Targets: settled water **< 10 NTU** (manual), filtered water **≤ 0.3 NTU** 95% of the time.",
      rel: ["swtr", "filtration", "jar-test"] },
    { id: "lime-softening", q: "How does lime-soda ash softening work?",
      k: ["lime softening:7", "lime soda:7", "lime-soda:7", "soda ash softening:7", "excess lime:7", "recarbonat*:7", "9.4:5", "10.6:5", "precipitative softening:7"],
      a: "**Lime** raises pH so hardness precipitates: **calcium carbonate at about pH 9.4**, and **magnesium hydroxide** once excess lime pushes pH to about **10.6**. **Soda ash** removes the noncarbonate hardness. Softened water leaves near pH 11, so it's **recarbonated** (CO₂ added), ideally down to about **pH 8.6**, to keep calcium carbonate from cementing filters and mains. Leave **50–80 mg/L residual hardness** — it helps protect against corrosion. It's the practical choice for surface water, where ion exchange isn't suited.",
      rel: ["hardness", "ion-exchange", "carbonate-hardness"] },
    { id: "alt-disinfectants", q: "What are alternatives to free chlorine?",
      k: ["chloramin*:6", "chlorine dioxide:7", "clo2:7", "ozone:7", "alternative disinfect*:7", "monochloramine:7", "ammonia feed:6", "chlorine to ammonia:6"],
      a: "• **Chloramines** — chlorine plus ammonia (about **4–5 parts chlorine to 1 part ammonia-nitrogen** by weight). Fewer THMs and a long-lasting residual, but a much weaker disinfectant (the manual says ~200× less effective at typical pH), and they can cause **nitrification**.\n• **Chlorine dioxide** — strong oxidant with no THMs, but it forms chlorite. Generated on site. Federal limits: **MRDL 0.8 mg/L**, **chlorite MCL 1.0 mg/L**. (The manual cites an older 1.0 mg/L combined limit.)\n• **Ozone** — very powerful, no residual, no THMs (watch bromate), expensive, generated on site.\n• **UV** — great for protozoa, no residual.",
      rel: ["dbps", "nitrification", "uv"] },
    { id: "activated-carbon", q: "What does activated carbon do?",
      k: ["activated carbon:7", "pac:7", "gac:7", "powdered activated carbon:7", "granular activated carbon:7", "carbon:4", "taste and odor:7", "earthy:6", "musty:6", "geosmin:7", "mib:7"],
      a: "**Activated carbon** adsorbs organics — **taste and odor** compounds (earthy/musty **geosmin** and **MIB** from algae), DBP precursors, many pesticides, and PFAS. **PAC** (powdered) is dosed into raw water as needed and settles out. **GAC** (granular) sits in filter beds or contactors and needs periodic replacement or reactivation. It doesn't kill microbes.",
      rel: ["algae", "dbps", "pfas"] },
    { id: "algae", q: "How do plants deal with algae?",
      k: ["algae:7", "algal bloom*:7", "cyanobacteria:7", "blue-green algae:7", "microcystin*:7", "cyanotoxin*:7", "copper sulfate:7", "harmful algal bloom*:7", "hab*:5"],
      a: "Algae clog filters, cause tastes and odors, and raise chlorine demand. **Cyanobacteria** (blue-green algae) can release **cyanotoxins** like microcystin. Tools: source-water management, careful **copper sulfate** treatment of reservoirs (check permits), **PAC** for tastes, odors, and toxins, and good coagulation/filtration. Go easy on **pre-oxidation during a bloom** — it can burst cells and release toxins. EPA's 2015 health advisories for microcystins: **0.3 µg/L** for bottle-fed infants and young children, **1.6 µg/L** for everyone else.",
      rel: ["activated-carbon", "surface-water", "dbps"] },
    { id: "sludge", q: "What happens to treatment sludge and backwash water?",
      k: ["sludge:7", "plant residuals:6", "residuals handling:6", "backwash water:6", "lagoon*:6", "dewater*:6", "recycle:5", "filter backwash recycl*:7"],
      a: "Sedimentation sludge and spent backwash water have to be handled. They're sent to **lagoons, thickeners, or dewatering equipment** (drying beds, belt or filter presses), and the solids are disposed of under MDEQ permits. If you return backwash water to the plant, the **Filter Backwash Recycling Rule** requires returning it **ahead of** coagulation, sedimentation, and filtration — never after.",
      rel: ["backwash", "sedimentation"] },
    { id: "membranes", q: "How do membrane filters work?",
      k: ["membrane*:7", "reverse osmosis:7", "ro:5", "nanofiltration:7", "ultrafiltration:7", "microfiltration:7", "mf uf:6"],
      a: "Membranes are graded by pore size:\n• **Microfiltration / ultrafiltration** — remove particles, bacteria, and protozoa (UF catches some viruses). Often replace conventional filters.\n• **Nanofiltration** — adds hardness and much of the organic removal.\n• **Reverse osmosis** — pushes water through a dense membrane to remove dissolved salts, nitrate, arsenic, and PFAS.\nNeeds: pretreatment, **integrity testing**, cleaning, and a plan for the concentrate (reject) stream.",
      rel: ["pfas", "nitrate", "tds"] },

    /* ---------------- Chapter 9: Distribution & storage ---------------- */
    { id: "distribution-pressure", q: "What pressures should a distribution system maintain?",
      k: ["minimum pressure:7", "pressure requirement*:7", "20 psi:7", "35 psi:6", "60 psi:5", "low pressure:6", "high pressure:5", "system pressure:6", "normal pressure:6"],
      a: "Manual criteria: at least **20 psi at all points, at all times** (including peak and fire flow), and normal service pressure of **35–60 psi**. Dropping below 20 psi opens the door to **back-siphonage**, so it usually means a **boil-water notice**. Very high pressure wastes water and breaks pipes; use pressure-reducing valves where it's needed.",
      rel: ["boil-water", "backflow", "psi-feet"] },
    { id: "main-size", q: "What size should water mains be?",
      k: ["main size:7", "pipe size:6", "4 inch:5", "6 inch:5", "minimum main:6", "dead end*:6", "loop*:5", "looped:6"],
      a: "Manual guidance: **4-inch** minimum mains, and at least **6-inch** for any main that feeds fire hydrants. **Loop** lines wherever possible and **minimize dead ends** — dead ends collect sediment, lose residual, and need regular flushing. Looped systems also keep more customers in service during repairs.",
      rel: ["flushing", "hydrants", "pipe-materials"] },
    { id: "pipe-materials", q: "What pipe materials are used?",
      k: ["pipe material*:7", "ductile iron:7", "pvc:6", "cast iron:6", "hdpe:7", "polyethylene:6", "asbestos cement:7", "ac pipe:6", "steel pipe:6", "concrete pipe:6"],
      a: "• **Ductile iron** — strong and durable; needs corrosion protection (cement lining, polyethylene wrap).\n• **PVC** — corrosion-proof, smooth (C ≈ 150), light; harder to locate underground (add tracer wire) and needs care when tapping.\n• **HDPE** — flexible, fused joints, great for directional drilling.\n• **Steel / prestressed concrete** — large transmission mains.\n• **Asbestos-cement (AC)** and **cast iron** — older pipe still in service. Cutting AC pipe needs special asbestos precautions.",
      rel: ["hazen-williams", "main-size", "main-breaks"] },
    { id: "valves", q: "What valves are in a distribution system?",
      k: ["valve*:4", "gate valve*:7", "butterfly valve*:7", "check valve*:6", "air relief:7", "air release:7", "prv*:6", "pressure reducing valve*:7", "pressure regulating valve*:7", "altitude valve*:7", "valve exercis*:7", "valve spacing:6"],
      a: "• **Gate valves** — isolation; spaced so a break shuts down no more than about **500 ft** (dense areas) to **800 ft** of main.\n• **Butterfly valves** — larger mains.\n• **Check valves** — let water flow one way only (pump discharges, backflow defense).\n• **Air-release/vacuum valves** — at high points.\n• **Pressure-reducing valves (PRVs)** — protect low areas from high pressure.\n• **Altitude valves** — stop tank overflow.\nExercise valves on a schedule (the manual says annually; PRVs monthly) so they work when you need them.",
      rel: ["water-hammer", "main-breaks", "storage"] },
    { id: "hydrants", q: "What should I know about fire hydrants?",
      k: ["hydrant*:7", "fire flow:6", "hydrant color*:7", "nfpa:6", "dry barrel:6", "wet barrel:6", "fire protection:5", "flow test*:5"],
      a: "Hydrants need at least a **6-inch** main. Inspect and flush them regularly (the manual says **twice a year**), and **open and close them slowly** to avoid water hammer. Make sure dry-barrel hydrants **drain** so they don't freeze. NFPA 291 bonnet colors show flow capacity: **light blue ≥ 1,500 gpm**, **green 1,000–1,499**, **orange 500–999**, **red < 500**. Never use a hydrant for bacteriological sampling.",
      rel: ["flushing", "water-hammer", "main-size"] },
    { id: "flushing", q: "Why and how do we flush mains?",
      k: ["flush*:7", "main flushing:7", "unidirectional:7", "dirty water:6", "discolored water:6", "sediment in pipe*:6", "water age:4"],
      a: "Flushing scours out **sediment, iron/manganese deposits, and stale water**, restores **chlorine residual**, and cuts odor complaints (like H₂S at dead ends). **Unidirectional flushing (UDF)** works best: close valves so water moves one direction at high velocity (aim for **2.5+ ft/sec**), working out from the source toward clean water. Notify customers first, keep pressure above 20 psi, and dechlorinate discharges where required.",
      rel: ["free-residual", "hydrants", "tank-maintenance"] },
    { id: "main-disinfection", q: "How do you disinfect a new water main?",
      k: ["new main*:7", "disinfect* main*:7", "main disinfect*:7", "c651:7", "pressure test*:6", "hydrostatic:7", "leakage test*:6", "50% above:5"],
      a: "Manual procedure: **pressure-test** at **at least 50% above** normal operating pressure for **at least 1 hour**, checking for leaks. **Flush**, then disinfect with at least **50 mg/L free chlorine held 24 hours**, making sure at least **10 mg/L remains** at the end. Flush out the heavily chlorinated water (dechlorinate if required) and get **satisfactory coliform results** before putting it in service. **AWWA C651** is the industry standard.",
      rel: ["main-breaks", "well-disinfection", "batch-chlorination"] },
    { id: "main-breaks", q: "What do I do after a main break?",
      k: ["main break*:7", "broken main:7", "repair* main:6", "leak repair:6", "water outage:5", "pipe burst:6", "burst pipe:6"],
      a: "1. **Isolate** the break by closing valves slowly; keep positive pressure in the rest of the system if you can.\n2. Keep trench water from entering the pipe (pump the hole down below the pipe).\n3. **Disinfect** repair parts and the pipe interior with a hypochlorite swab or spray.\n4. **Flush** the repaired section until the water is clear and the residual is back.\n5. **Sample** as MSDH directs. If pressure fell below 20 psi in the affected area, issue a **boil-water notice**.",
      rel: ["boil-water", "main-disinfection", "valves"] },
    { id: "boil-water", q: "When is a boil water notice needed?",
      k: ["boil water:7", "bwn:7", "boil notice:7", "boil order:7", "boil advisory:7", "precautionary boil:7", "lift* boil:7", "rescind*:6"],
      a: "Issue one (following MSDH guidance) when pressure drops **below 20 psi**, after a main break or outage that could let contamination in, after an **E. coli** positive, or whenever water safety is in doubt. Before lifting it: restore pressure, flush, confirm a normal **chlorine residual**, and get **satisfactory bacteriological results** collected as MSDH directs (often two consecutive rounds). Tell customers when it's lifted, too.",
      rel: ["distribution-pressure", "main-breaks", "tier1"] },
    { id: "storage", q: "Elevated storage vs. pressure tanks?",
      k: ["storage:5", "elevated tank*:7", "elevated storage:7", "water tower*:7", "standpipe*:7", "ground storage:6", "pressure tank*:7", "hydropneumatic:7", "air cushion:6", "waterlogged:7"],
      a: "**Elevated storage** is true storage: steady pressure, **fire flow**, and reserve during power outages. The manual recommends a water-level swing no greater than **30 ft**, and in a standpipe only the upper portion is usable storage.\n**Pressure (hydropneumatic) tanks** only smooth out pump cycling and add a little contact time. Size them at **at least 40× the pump rate in gpm**. Only the water between the pump's on/off pressures is usable, so keep the **air cushion** right — a **waterlogged** tank short-cycles the pump.",
      rel: ["tank-maintenance", "static-head", "psi-feet"] },
    { id: "tank-maintenance", q: "How do you maintain storage tanks?",
      k: ["tank inspect*:7", "tank maintenance:7", "coating*:5", "tank vent*:6", "overflow pipe:6", "cathodic protection:7", "tank turnover:7", "stagnant:5", "water age:6", "tank cleaning:6"],
      a: "Inspect regularly for **screened vents and overflows** (birds and insects are a classic source of contamination), locked hatches, coating condition, and sediment. Many utilities do a full inspection or cleaning every **3–5 years**, often by divers or after draining. **Turn water over** to limit water age, DBPs, and residual loss. After interior work, disinfect before returning to service (**AWWA C652**). Cathodic protection slows interior corrosion in steel tanks.",
      rel: ["storage", "dbps", "batch-chlorination"] },
    { id: "water-loss", q: "How do I track water loss?",
      k: ["water loss:7", "unaccounted for water:7", "unaccounted:6", "non-revenue:7", "nonrevenue:7", "water audit*:7", "m36:6", "leak detection:7", "leaks:4"],
      a: "Compare water **produced** with water **billed or authorized**. The gap is **unaccounted-for / non-revenue water**: leaks, breaks, meter under-registration, theft, and unbilled use. An **AWWA M36 water audit** sorts it into real losses and apparent losses. Then fix what pays back: leak detection surveys (acoustic listening), pressure management, repairing breaks quickly, and testing or replacing old meters.",
      rel: ["meters", "customer-meters", "main-breaks"] },
    { id: "customer-meters", q: "How are customer meters maintained?",
      k: ["customer meter*:7", "meter test*:7", "meter accuracy:7", "ami:6", "amr:6", "meter reading:6", "radio read:6", "old meter*:6"],
      a: "Residential meters **slow down with age** — they under-register, especially at low flows — so utilities test and replace them on a schedule (the manual lists meter calibration **annually**, and larger meters deserve the most attention). **AMR/AMI** radio-read systems speed up reading and can flag leaks on the customer's side from continuous flow.",
      rel: ["water-loss", "meters"] },
    { id: "nitrification", q: "What is nitrification in chloramine systems?",
      k: ["nitrification:7", "nitrify*:7", "ammonia oxidiz*:7", "nitrite increase:6"],
      a: "In chloraminated systems, excess **free ammonia** feeds bacteria that convert it to **nitrite and nitrate**. Signs: falling total chlorine residual, rising nitrite, higher HPC — usually in tanks and dead ends with high water age. Control it by keeping the chlorine-to-ammonia ratio right, limiting water age, flushing, and sometimes a temporary **free-chlorine burn**.",
      rel: ["alt-disinfectants", "tank-maintenance", "flushing"] },

    /* ---------------- Chapter 10: Chlorination equipment & safety ---------------- */
    { id: "chlorine-gas-safety", q: "Why is chlorine gas so dangerous?",
      k: ["chlorine safety:7", "chlorine gas:5", "gas leak*:4", "dangerous:3", "heavier than air:7", "2.5 times:6", "chlorine exposure:7", "scba:7", "self contained:6", "gas mask*:6", "idlh:6"],
      a: "Chlorine gas is **2.5 times heavier than air** — it hugs the floor and fills low spots, so vents and fans in chlorine rooms sit **low**. It attacks the eyes, throat, and lungs. OSHA's limit is a **1 ppm ceiling**, and **10 ppm is immediately dangerous to life and health**. Rules: have an emergency plan, **never handle a leak alone**, wear **SCBA** (not a dust mask), and keep Chlorine Institute emergency kits ready (Kit A for 150-lb cylinders, Kit B for ton containers).",
      rel: ["leak-detection", "cylinders", "ppe"] },
    { id: "leak-detection", q: "How do you find a chlorine leak?",
      k: ["ammonia:6", "chlorine leak*:7", "find:2", "locate:3", "leak*:3", "leak test*:7", "white cloud:7", "white smoke:7", "detect*:3", "ammonia test:7"],
      a: "Hold an **ammonia-soaked cloth or an open bottle of ammonia vapor** near the suspected spot — chlorine and ammonia form a **visible white cloud**. Never pour or spray ammonia on the leak. Don't spray water on a leaking cylinder either: water and chlorine make acid, which **makes the leak worse**. If liquid is leaking, rotate the cylinder so the leak is on top and gas escapes instead of liquid (gas releases far less material). Wear SCBA and have a partner standing by.",
      rel: ["chlorine-gas-safety", "cylinders", "chlorinator"] },
    { id: "cylinders", q: "What should I know about chlorine cylinders?",
      k: ["cylinder*:6", "ton container*:7", "one ton:6", "150 lb:7", "150-pound:7", "150 pound:7", "fusible plug*:7", "158:5", "165:5", "tare:6", "valve cap:5", "yoke:5"],
      a: "• **150-lb cylinders** (about **92 lb** empty) — for plants under ~0.5 MGD. Store and use them **upright**, chained, with the valve cap on during moves.\n• **Ton containers** (~1,300 lb empty, ~3,300 lb full) — used **on their side**, with the top valve for gas and the bottom valve for liquid.\n• **Fusible plugs** melt at **158–165°F** to vent the cylinder before it ruptures in a fire.\nUse only the **proper valve wrench** (no longer than 6 in, never a pipe wrench or cheater bar). Keep cylinders away from heat, sun, flammables, and ammonia, and never below ground level. Gas withdrawal is limited — roughly 40 lb/day from a 150-lb cylinder at room temperature — so manifold cylinders for bigger feeds.",
      rel: ["chlorine-gas-safety", "chlorinator", "leak-detection"] },
    { id: "chlorinator", q: "How does a vacuum gas chlorinator work?",
      k: ["chlorinator*:7", "ejector*:7", "injector*:7", "rotameter:7", "rotometer:7", "vacuum regulator:7", "vacuum:4", "gas feed*:6"],
      a: "A booster pump forces water through the **ejector (injector)**, a venturi that creates a **vacuum**. The vacuum opens the ejector check valve and the **vacuum regulator** on the cylinder, drawing gas through the **rotameter**, which shows the feed rate in lbs/24 hr. If the water supply or booster pump stops, the vacuum collapses and the regulator **closes automatically** — the key fail-safe. Size the chlorinator so normal feed runs at **¼ to ⅓ of the rotameter scale**.",
      rel: ["cylinders", "chlorine-feed-shorthand", "leak-detection"] },
    { id: "hypochlorinator", q: "How do hypochlorinators and chemical feed pumps work?",
      k: ["hypochlorinator*:7", "chemical feed pump*:7", "feed pump*:6", "metering pump*:7", "day tank:6", "calibration column:7", "drawdown test:6", "anti-siphon:6", "anti siphon:6"],
      a: "Most small systems feed sodium hypochlorite with a **positive-displacement metering pump** (diaphragm or peristaltic) wired to run only when the well pump runs. **Calibrate** it with a **calibration column** — time the drawdown to get the real feed rate — then set stroke and speed. Use an **anti-siphon/back-pressure valve** so it can't siphon chemical, inspect tubing and check valves, and keep only a few days of hypochlorite on hand, since it loses strength.",
      rel: ["pump-types", "chlorine-forms", "hypochlorite-math"] },
    { id: "batch-chlorination", q: "How do I batch chlorinate a tank or line?",
      k: ["batch chlorinat*:7", "shock chlorinat*:6", "disinfect* tank*:7", "tank disinfection:7", "c652:7", "superchlorinat*:6"],
      a: "1. Figure the volume in **million gallons**.\n2. **lbs of chlorine = target mg/L × MG × 8.34**, then divide by product strength (HTH ~0.65; 12.5% hypochlorite ~0.125) for pounds of product.\n3. Add it so it mixes throughout, hold the required contact time, and check residual.\n4. Drain or dilute the heavily chlorinated water safely (dechlorinate if discharging).\n5. Sample before returning to service. **AWWA C652** covers storage tanks and **C651** covers mains.",
      rel: ["hypochlorite-math", "main-disinfection", "tank-maintenance"] },

    /* ---------------- Chapter 11: Administration & safety ---------------- */
    { id: "confined-space", q: "What are the rules for confined space entry?",
      k: ["confined space*:7", "permit required:7", "permit-required:7", "entry permit:7", "atmosphere test*:7", "gas monitor*:6", "attendant:6", "manhole*:5", "vault*:4", "wet well*:5", "tank entry:6"],
      a: "Vaults, wet wells, tanks, and manholes can hold toxic gas or too little oxygen. Under OSHA **1910.146**:\n• **Test the air before and during entry**, in this order: **oxygen (19.5–23.5%)**, **flammables (< 10% LEL)**, then **toxics** (H₂S, CO).\n• **Ventilate**, and use an **entry permit** for permit-required spaces.\n• Station an **attendant** outside the whole time, with a rescue plan and retrieval equipment.\nMost confined-space deaths are would-be rescuers — **never go in after someone without proper air**.",
      rel: ["hydrogen-sulfide", "ppe", "lockout"] },
    { id: "lockout", q: "What is lockout/tagout?",
      k: ["lockout:7", "tagout:7", "loto:7", "lock out:7", "tag out:7", "energy control:6", "hazardous energy:7"],
      a: "**Lockout/tagout** (OSHA 1910.147) keeps equipment from starting while someone works on it. Shut it down, **isolate every energy source** (electric, hydraulic, pneumatic, water pressure, gravity), put **your own lock and tag** on each disconnect, bleed off stored energy, then **try to start it** to verify it's dead. Only the person who applied a lock removes it.",
      rel: ["confined-space", "ppe"] },
    { id: "trench", q: "What are trench safety rules?",
      k: ["trench*:7", "excavat*:7", "cave in*:7", "shoring:7", "trench box*:7", "sloping:6", "5 feet:5", "competent person:6", "811:6", "call before you dig:6"],
      a: "Under OSHA's excavation standard: trenches **5 ft or deeper** need a protective system — sloping, shoring, or a **trench box** — unless they're in stable rock. A **competent person** inspects daily. Trenches **4 ft or deeper** need a ladder or ramp within **25 ft** of every worker. Keep spoil piles at least **2 ft** from the edge. And always **call 811** before digging so buried utilities get marked.",
      rel: ["main-breaks", "ppe", "confined-space"] },
    { id: "ppe", q: "What PPE do operators need?",
      k: ["ppe:7", "personal protective:7", "goggles:5", "gloves:5", "face shield*:6", "hard hat*:6", "respirator*:6", "safety glasses:6", "hearing protection:6", "protective equipment:6"],
      a: "Match PPE to the task and the chemical's SDS:\n• **Chemical handling** — splash goggles plus face shield, chemical gloves, apron.\n• **Chlorine gas** — SCBA for leaks (not an air-purifying mask for unknown concentrations).\n• **Field work** — hard hat, safety-toe boots, high-visibility vest in traffic, hearing protection near pumps and generators.\nAlso keep **eyewash stations and safety showers** near chemical areas.",
      rel: ["sds", "chlorine-gas-safety", "first-aid"] },
    { id: "sds", q: "What is an SDS?",
      k: ["sds:7", "msds:7", "safety data sheet*:7", "hazcom:7", "hazard communication:7", "right to know:6", "ghs:6", "pictogram*:6"],
      a: "A **Safety Data Sheet** (formerly MSDS) comes with every hazardous chemical and uses a standard 16-section format: hazards, PPE, first aid, firefighting, spill cleanup, storage, and more. OSHA's **Hazard Communication** standard requires an SDS on hand for every chemical, labeled containers with **GHS pictograms**, and employee training. Read the SDS **before** using a new chemical.",
      rel: ["ppe", "first-aid"] },
    { id: "accident-stats", q: "What causes most workplace accidents?",
      k: ["accident*:5", "88%:5", "88 percent:5", "unsafe act*:7", "injur*:4", "accident report*:7", "indirect cost*:6", "safety program:6"],
      a: "Per the manual, about **88% of accidents come from specific unsafe acts by employees**, which is why **training and safe work habits** matter more than anything. A good program has leadership support, training, safe conditions, first-aid readiness, and prompt **accident reports** that look for root causes, not blame. **Indirect costs** (lost time, damaged equipment, supervisors' time) run about **4×** the direct medical costs.",
      rel: ["first-aid", "ppe", "confined-space"] },
    { id: "first-aid", q: "What first aid should a utility have?",
      k: ["first aid:7", "cpr:6", "first-aid kit*:6", "eye wash:7", "eyewash:7", "safety shower*:6", "chemical burn*:6", "chemical in eye*:6", "splash:4"],
      a: "MSDH recommends at least one person **professionally trained in first aid**, and stocked kits on **every truck** and at fixed locations. Chemical areas need an **eyewash and safety shower**; flush chemical eye or skin exposures for **at least 15 minutes** and get medical help. Post emergency numbers and the SDS file where everyone can find them.",
      rel: ["ppe", "sds", "chlorine-gas-safety"] },
    { id: "service-obligations", q: "What are a utility's service obligations?",
      k: ["service area*:7", "psc:7", "public service commission:7", "certificate of public convenience:7", "discontinu*:6", "cut off:6", "shut off:5", "disconnect*:5", "nonpayment:6", "billing:4", "rate*:4", "one mile:5"],
      a: "A utility must **serve everyone in its service area**, give equal and adequate service, and charge **the same rate for the same service**. In Mississippi the **Public Service Commission (PSC)** regulates service areas for private systems and water associations; cities can serve up to **one mile** outside their limits if no one else holds exclusive rights. Service can be discontinued for **nonpayment, unsafe customer plumbing, fraud, or noncompliance** — under a written policy applied fairly and consistently.",
      rel: ["public-relations", "customer-meters"] },
    { id: "public-relations", q: "How should I handle complaints and the media?",
      k: ["complaint*:7", "public relations:7", "media:6", "reporter*:6", "news:4", "interview*:6", "customer service:7", "angry customer*:7", "upset customer*:7"],
      a: "Every contact — the bill, the meter reader, a phone call — shapes trust. Handle complaints the same way every time: listen, stay patient, **don't bounce the customer around**, give complete and factual information, and follow up. With reporters: prepare first, stick to facts, **never go “off the record,”** and keep statements short, since only a few seconds usually air. Discolored water, taste, and odor complaints are **free monitoring data** — log them on a map.",
      rel: ["service-obligations", "boil-water", "secondary-standards"] },
    { id: "maintenance-types", q: "Preventive vs. breakdown maintenance?",
      k: ["preventive maintenance:7", "preventative:6", "breakdown maintenance:7", "corrective maintenance:7", "maintenance program:7", "work order*:6", "asset management:7", "cmms:6"],
      a: "**Breakdown maintenance** fixes what already failed, usually urgently and expensively. **Preventive maintenance** is scheduled work — lubrication, valve exercising, pump checks, tank inspections — that keeps failures rare. The manual's point: a utility **can't afford 100% standby equipment**, so preventive maintenance is what actually keeps water flowing. **Asset management** plans repair and replacement by risk and remaining life.",
      rel: ["packing-seals", "valves", "purchasing"] },
    { id: "purchasing", q: "How should purchasing and inventory work?",
      k: ["purchas*:7", "inventory:7", "stores:5", "invoice*:6", "receiving report*:6", "purchase order*:7"],
      a: "Centralize purchasing to avoid duplicate stock and get better prices. Before paying, **match the purchase order, the receiving report, and the vendor's invoice**. Do a **physical inventory at least once a year**, done by someone outside the daily stores staff. Keep critical spares (pump parts, repair clamps, chlorine equipment) on hand.",
      rel: ["maintenance-types", "emergency-plan"] },
    { id: "emergency-plan", q: "What goes in an emergency response plan?",
      k: ["emergency response plan*:7", "erp:6", "emergency plan*:7", "awia:7", "risk and resilience:7", "disaster*:5", "hurricane*:6", "power outage*:6", "generator*:6", "tornado*:5", "flood*:4", "mswarn:6", "warn:4"],
      a: "Plan before the storm: contact lists, **backup power** (generators, fuel contracts), critical spare parts, chemical supplies, alternate water sources, boil-water notice templates, and **mutual aid** (Mississippi has a WARN network, MsWARN). Under **AWIA 2018**, community systems serving **more than 3,300** people must complete a **Risk and Resilience Assessment** and **Emergency Response Plan**, certify them to EPA, and review them every **5 years**. Practice the plan — hurricanes, tornadoes, ice storms, and floods all hit Mississippi.",
      rel: ["cybersecurity", "boil-water", "purchasing"] },
    { id: "cybersecurity", q: "Do water systems need cybersecurity?",
      k: ["cyber*:7", "scada:7", "hack*:7", "hacker*:7", "password*:5", "remote access:6", "ransomware:7", "plc*:5"],
      a: "Yes. Water systems have been hacked through remote-access software and **default passwords** on SCADA and PLCs. Basics: **change default passwords**, use **multi-factor authentication** for remote access, keep control systems off the open internet, update software, keep **offline backups**, and **train operators to run the plant manually**. EPA and CISA publish free guides and assessments for small systems.",
      rel: ["emergency-plan", "maintenance-types"] },

    /* ---------------- Chapter 12: Cross-connection control ---------------- */
    { id: "cross-connection", q: "What is a cross-connection?",
      k: ["cross connection*:7", "cross-connection*:7", "crossconnection*:7", "potable:4", "non potable:6", "nonpotable:6", "non-potable:6"],
      a: "A **cross-connection** is any actual or potential link between the potable water system and a non-potable source: pipe-to-pipe (a boiler or irrigation system tied to drinking water) or a **submerged outlet** (a hose sitting in a bucket or pool). Most are unintentional. A plain gate or check valve **doesn't count as protection** — it can leak without anyone knowing.",
      rel: ["backflow", "device-selection", "ccc-program"] },
    { id: "backflow", q: "What causes backflow?",
      k: ["backflow:6", "back flow:6", "back pressure:7", "backpressure:7", "back-pressure:7", "back siphonage:7", "backsiphonage:7", "back-siphonage:7", "siphon*:5", "reverse flow:6"],
      a: "Backflow is water flowing the **wrong way** through a cross-connection. Two causes:\n• **Back-pressure** — downstream pressure exceeds supply pressure (boilers, pumps, water stored at a higher elevation).\n• **Back-siphonage** — a **vacuum** in the supply line, from a main break, heavy firefighting, or a pump failure, pulls contaminated water back in.\nKeeping at least **20 psi** everywhere reduces back-siphonage risk.",
      rel: ["device-selection", "ccc-program", "distribution-pressure"] },
    { id: "device-selection", q: "Which backflow device should I use?",
      k: ["which device:7", "backflow preventer*:7", "backflow device*:7", "device selection:7", "high hazard:7", "low hazard:7", "degree of hazard:7", "health hazard:6", "hazard:4"],
      a: "Match the device to the **hazard** (how toxic the contaminant is) and the **type of backflow**:\n• **Air gap** — best protection, any hazard, both types.\n• **RPZ** — **high hazard** where an air gap isn't practical; both types.\n• **Double check assembly** — **low hazard** (polluted, not health-threatening); both types.\n• **PVB / AVB** — **back-siphonage only**; never where back-pressure can occur.\nWhen in doubt, protect for the higher hazard.",
      rel: ["air-gap", "rpz", "vacuum-breakers"] },
    { id: "air-gap", q: "What is an air gap?",
      k: ["air gap:7", "airgap:7", "twice the diameter:6", "2 times diameter:6", "two pipe diameters:6"],
      a: "An **air gap** is a physical, open-air separation between the supply outlet and the flood-level rim of the receiving vessel — at least **2× the supply pipe diameter** and **never less than 1 inch**. With nothing to fail mechanically, it's the most reliable protection against **both** back-pressure and back-siphonage, for any hazard. Its weak spot: people defeat it by adding a hose.",
      rel: ["device-selection", "rpz"] },
    { id: "rpz", q: "How does an RPZ work?",
      k: ["rpz:7", "rp assembly:6", "reduced pressure:7", "reduced pressure zone:7", "reduced pressure principle:7", "relief valve:6", "rpba:6", "rpda:6"],
      a: "A **reduced pressure zone (RPZ) assembly** has **two spring-loaded check valves** with a **relief valve** between them. The zone between the checks is held at lower pressure than the supply. If either check leaks or backflow starts, the relief valve **dumps water to atmosphere** instead of letting it go backward — a visible warning. Install it **above grade** (never in a pit that could flood). Head loss is about **10–20 psi**, and a bypass around an RPZ needs its own RPZ.",
      rel: ["dcva", "device-selection", "backflow-testing"] },
    { id: "dcva", q: "What is a double check valve assembly?",
      k: ["double check*:7", "dcva:7", "dc assembly:7", "dcda:7", "double check valve:7"],
      a: "A **double check valve assembly (DC)** is two independent, spring-loaded check valves with shutoff valves and **test cocks**. It protects against back-pressure and back-siphonage for **low-hazard** (non-health) connections — for example, fire sprinkler systems without additives. It has no relief valve, so a fouled check can fail silently; that's why annual testing matters. Head loss is usually **under 10 psi**.",
      rel: ["rpz", "backflow-testing", "device-selection"] },
    { id: "vacuum-breakers", q: "What's the difference between an AVB and a PVB?",
      k: ["vacuum breaker*:7", "avb:7", "pvb:7", "atmospheric vacuum breaker*:7", "pressure vacuum breaker*:7", "svb:6", "hose bib*:6", "hose connection:6", "sprinkler*:4", "irrigation:4"],
      a: "Both protect against **back-siphonage only**.\n• **Atmospheric vacuum breaker (AVB)** — can't be under continuous pressure: **no shutoff valve downstream**, and no more than 12 hours of use in 24. Hose-bib vacuum breakers are a small version.\n• **Pressure vacuum breaker (PVB)** — spring-loaded, so it **can stay under continuous pressure** (irrigation systems), and it's testable.\nMount both at least **12 inches above** the highest downstream outlet (manual), and never use either where back-pressure is possible.",
      rel: ["device-selection", "backflow", "backflow-testing"] },
    { id: "backflow-testing", q: "How often are backflow devices tested?",
      k: ["test* annually:7", "annual test*:7", "backflow test*:7", "tester*:6", "certified tester*:7", "test cock*:6", "how often test*:6"],
      a: "Testable assemblies (RPZ, double check, PVB) must be tested **when installed and at least annually** — and after any repair or relocation — by a **certified backflow tester**. Keep the records, follow up on failed tests fast, and track due dates in your cross-connection program. Air gaps get inspected to make sure no one has defeated them.",
      rel: ["ccc-program", "rpz", "dcva"] },
    { id: "ccc-program", q: "What does a cross-connection control program include?",
      k: ["cross connection control program:7", "ccc program:7", "backflow program:7", "survey*:3", "containment:7", "isolation:5", "premise*:4", "ordinance:6", "whose responsibility:6", "who is responsible:6", "responsib*:4"],
      a: "Responsibilities per the manual:\n• **Water supplier** — source to the meter: survey for hazards, educate the public, require protection, keep pressure at 20 psi or more.\n• **Customer** — the meter onward: install, test, and maintain required devices at their own expense.\n• **Plumber** — the first line of defense, catching cross-connections during installation.\n• **MSDH** — enforces the rules.\nA solid program has a legal ordinance or policy, **containment** at the service connection (plus isolation inside high-hazard premises), device records, and annual testing.",
      rel: ["backflow-testing", "device-selection", "cross-connection"] }
  ];

  /* ==========================================================
     Calculators — Greg works common formulas when you give him
     numbers with units (“2 mg/l”, “1.5 mgd”, “300 gpm”, “20 ft”).
     ========================================================== */
  var UNIT_RE = /(\d*\.?\d+)\s*(mg\s*\/\s*l(?:iter)?|mg per l(?:iter)?|milligrams? per liter|ppm|parts per million|mgd|million gallons? (?:per|a) day|gpm|gallons? (?:per|a) minute|gpd|gallons? (?:per|a) day|psi|ft2|ft²|sq\.? ?ft|square f(?:ee|oo)t|ft|feet|foot|inch(?:es)?|in\b|%|percent|million gallons?|gal(?:lons?)?\b|min(?:utes?)?\b|hrs?\b|hours?\b)/g;

  function canon(u) {
    u = u.replace(/\s+/g, ' ');
    if (/^mg ?\/ ?l|^mg per l|milligram|^ppm|parts per/.test(u)) return 'mgl';
    if (/^mgd|million gallons? (per|a) day/.test(u)) return 'mgd';
    if (/^gpm|per minute|a minute/.test(u)) return 'gpm';
    if (/^gpd|per day|a day/.test(u)) return 'gpd';
    if (u === 'psi') return 'psi';
    if (/ft2|ft²|sq|square/.test(u)) return 'ft2';
    if (/^ft|^feet|^foot/.test(u)) return 'ft';
    if (/^in/.test(u)) return 'in';
    if (u === '%' || u === 'percent') return 'pct';
    if (/^million gallon/.test(u)) return 'MG';
    if (/^gal/.test(u)) return 'gal';
    if (/^min/.test(u)) return 'min';
    if (/^h/.test(u)) return 'hr';
    return u;
  }

  function quantities(raw) {
    var t = raw.toLowerCase().replace(/(\d),(?=\d{3}\b)/g, '$1');
    var out = [], m;
    UNIT_RE.lastIndex = 0;
    while ((m = UNIT_RE.exec(t))) out.push({ v: parseFloat(m[1]), u: canon(m[2]), i: m.index });
    return { t: t, list: out, get: function (u) { for (var i = 0; i < out.length; i++) if (out[i].u === u) return out[i]; return null; },
      all: function (u) { return out.filter(function (q) { return q.u === u; }); } };
  }

  function fmt(n) {
    if (!isFinite(n)) return '—';
    var a = Math.abs(n);
    var d = a >= 1000 ? 0 : a >= 100 ? 1 : a >= 10 ? 2 : a >= 1 ? 2 : 3;
    return n.toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: 0 });
  }

  function flowMGD(Q) {
    var m = Q.get('mgd'); if (m) return { v: m.v, note: fmt(m.v) + ' MGD' };
    var g = Q.get('gpm'); if (g) return { v: g.v * 1440 / 1e6, note: fmt(g.v) + ' gpm × 1,440 ÷ 1,000,000 = ' + fmt(g.v * 1440 / 1e6) + ' MGD' };
    var d = Q.get('gpd'); if (d) return { v: d.v / 1e6, note: fmt(d.v) + ' gpd = ' + fmt(d.v / 1e6) + ' MGD' };
    return null;
  }

  var calculators = [
    /* Chlorine demand = dose − residual */
    function (raw) {
      var Q = quantities(raw);
      if (!/demand/.test(Q.t) || !/dose|dosage|feed/.test(Q.t) || !/residual/.test(Q.t)) return null;
      var c = Q.all('mgl');
      if (c.length < 2) return null;
      var di = Q.t.search(/dose|dosage|feed/), ri = Q.t.indexOf('residual');
      function nearest(pos, skip) {
        var best = null;
        c.forEach(function (q) { if (q !== skip && (!best || Math.abs(q.i - pos) < Math.abs(best.i - pos))) best = q; });
        return best;
      }
      var dose = nearest(di, null), resid = nearest(ri, dose);
      if (!dose || !resid) return null;
      return "**Demand = dose − residual** = " + fmt(dose.v) + " − " + fmt(resid.v) + " = **" + fmt(dose.v - resid.v) + " mg/L**\nIf demand jumps and the dose stays the same, the residual falls — watch that trend after storms or main breaks.";
    },
    /* CT = C × T */
    function (raw) {
      var Q = quantities(raw);
      if (!/\bct\b|c ?x ?t\b|c times t/.test(Q.t)) return null;
      var c = Q.get('mgl'), tm = Q.get('min');
      if (!c || !tm) return null;
      return "**CT = C × T** = " + fmt(c.v) + " mg/L × " + fmt(tm.v) + " min = **" + fmt(c.v * tm.v) + " mg·min/L**\nCompare that with the required CT from EPA's tables for your temperature and pH, and remember T should be **T10** (baffling factor × theoretical detention time).";
    },
    /* Horsepower */
    function (raw) {
      var Q = quantities(raw);
      if (!/horse ?power|\bw?hp\b|\bbhp\b/.test(Q.t)) return null;
      var g = Q.get('gpm'), h = Q.get('ft');
      if (!g || !h) return null;
      var whp = g.v * h.v / 3960;
      var s = "**WHP = gpm × TDH ÷ 3,960** = " + fmt(g.v) + " × " + fmt(h.v) + " ÷ 3,960 = **" + fmt(whp) + " water horsepower**";
      var pcts = Q.all('pct');
      if (pcts.length) {
        var bhp = whp / (pcts[0].v / 100);
        s += "\nBHP = WHP ÷ pump efficiency = " + fmt(whp) + " ÷ " + fmt(pcts[0].v / 100) + " = **" + fmt(bhp) + " HP**";
        if (pcts[1]) s += "\nMotor HP = BHP ÷ motor efficiency = " + fmt(bhp) + " ÷ " + fmt(pcts[1].v / 100) + " = **" + fmt(bhp / (pcts[1].v / 100)) + " HP**";
      }
      return s;
    },
    /* Specific capacity */
    function (raw) {
      var Q = quantities(raw);
      if (!/specific capacity|drawdown|draw down/.test(Q.t)) return null;
      var g = Q.get('gpm'), d = Q.get('ft');
      if (!g || !d || !d.v) return null;
      return "**Specific capacity = gpm ÷ drawdown (ft)** = " + fmt(g.v) + " ÷ " + fmt(d.v) + " = **" + fmt(g.v / d.v) + " gpm per foot of drawdown**\nTrack it over time — a steady drop is an early sign the well needs rehab.";
    },
    /* Detention time */
    function (raw) {
      var Q = quantities(raw);
      if (!/detention|retention time|contact time/.test(Q.t)) return null;
      var vol = Q.get('gal'), volMG = Q.get('MG');
      var gallons = vol ? vol.v : volMG ? volMG.v * 1e6 : null;
      if (!gallons) return null;
      var g = Q.get('gpm'), m = Q.get('mgd'), d = Q.get('gpd');
      var gpm = g ? g.v : m ? m.v * 694.4 : d ? d.v / 1440 : null;
      if (!gpm) return null;
      var minutes = gallons / gpm;
      return "**Detention time = volume ÷ flow** = " + fmt(gallons) + " gal ÷ " + fmt(gpm) + " gpm = **" + fmt(minutes) + " minutes** (" + fmt(minutes / 60) + " hours)";
    },
    /* Cylinder / rectangular tank volume */
    function (raw) {
      var Q = quantities(raw);
      var t = Q.t;
      var rect = t.match(/(\d*\.?\d+)\s*(?:ft|feet|')?\s*(?:x|by|×)\s*(\d*\.?\d+)\s*(?:ft|feet|')?\s*(?:x|by|×)\s*(\d*\.?\d+)/);
      if (rect && /volume|gallon|capacity|hold|cubic/.test(t)) {
        var L = +rect[1], W = +rect[2], H = +rect[3], v = L * W * H;
        return "**Rectangular volume = L × W × H** = " + fmt(L) + " × " + fmt(W) + " × " + fmt(H) + " = " + fmt(v) + " ft³\n× 7.48 gal/ft³ = **" + fmt(v * 7.48) + " gallons**";
      }
      if (!/diameter/.test(t) || !/volume|gallon|capacity|hold|cubic/.test(t)) return null;
      var fts = Q.all('ft');
      if (fts.length < 2) return null;
      var di = t.indexOf('diameter');
      fts.sort(function (a, b) { return Math.abs(a.i - di) - Math.abs(b.i - di); });
      var D = fts[0].v, Hh = fts[1].v, vol = 0.785 * D * D * Hh;
      return "**Cylinder volume = 0.785 × D² × H** = 0.785 × " + fmt(D) + "² × " + fmt(Hh) + " = " + fmt(vol) + " ft³\n× 7.48 gal/ft³ = **" + fmt(vol * 7.48) + " gallons**\n(I took " + fmt(D) + " ft as the diameter — swap them if I guessed wrong.)";
    },
    /* Pounds formula (flow or batch volume) */
    function (raw) {
      var Q = quantities(raw);
      var c = Q.get('mgl');
      if (!c) return null;
      var f = flowMGD(Q);
      var batch = null;
      if (!f) {
        var mg = Q.get('MG'), gal = Q.get('gal');
        if (mg) batch = { v: mg.v, note: fmt(mg.v) + ' MG' };
        else if (gal) batch = { v: gal.v / 1e6, note: fmt(gal.v) + ' gal = ' + fmt(gal.v / 1e6) + ' MG' };
      }
      if (!f && !batch) return null;
      var base = f || batch;
      var lbs = c.v * base.v * 8.34;
      var unit = f ? 'lbs/day' : 'lbs';
      var s = (f ? "**lbs/day = mg/L × MGD × 8.34**" : "**lbs = mg/L × MG × 8.34**") +
        (/×/.test(base.note) || /=/.test(base.note) ? "\nFlow/volume: " + base.note : '') +
        "\n= " + fmt(c.v) + " × " + fmt(base.v) + " × 8.34 = **" + fmt(lbs) + " " + unit + "**";
      var pct = Q.get('pct');
      if (pct && pct.v > 0 && pct.v <= 100) {
        var prod = lbs / (pct.v / 100);
        s += "\nAt " + fmt(pct.v) + "% strength: " + fmt(lbs) + " ÷ " + fmt(pct.v / 100) + " = **" + fmt(prod) + " " + unit + " of product**";
        if (pct.v < 20) s += " (≈ " + fmt(prod / 8.34) + " gallons if the solution weighs about 8.34 lb/gal)";
      }
      return s;
    },
    /* psi <-> feet */
    function (raw) {
      var Q = quantities(raw);
      var p = Q.get('psi'), ft = Q.get('ft');
      if (p && !ft && /feet|\bft\b|head/.test(Q.t)) {
        return "**feet = psi × 2.31** = " + fmt(p.v) + " × 2.31 = **" + fmt(p.v * 2.31) + " ft** of head";
      }
      if (ft && !p && /psi|pressure/.test(Q.t)) {
        return "**psi = feet × 0.433** = " + fmt(ft.v) + " × 0.433 = **" + fmt(ft.v * 0.433) + " psi**";
      }
      return null;
    },
    /* gpm <-> MGD */
    function (raw) {
      var Q = quantities(raw);
      var g = Q.get('gpm'), m = Q.get('mgd');
      if (g && !m && /\bmgd\b|million gallons/.test(Q.t)) return "**MGD = gpm × 1,440 ÷ 1,000,000** = " + fmt(g.v) + " × 1,440 ÷ 1,000,000 = **" + fmt(g.v * 1440 / 1e6) + " MGD**";
      if (m && !g && /\bgpm\b|per minute/.test(Q.t)) return "**gpm = MGD × 694.4** = " + fmt(m.v) + " × 694.4 = **" + fmt(m.v * 694.4) + " gpm**";
      return null;
    }
  ];

  function calcSkill(raw) {
    for (var i = 0; i < calculators.length; i++) {
      var out = calculators[i](raw);
      if (out) return { text: out + "\n\nDouble-check the units on paper — that's where exam points get lost.", chips: ["What is the pounds formula?", "What conversion factors should I memorize?"] };
    }
    return null;
  }


  /* ---------- Official sources shown under Greg's answers ----------
     Every URL was checked against the site's public index (Sept 2026).
     Format: [site, page title, url] */
  var EPA = 'https://www.epa.gov/';
  var MSDH_CERT = ['MSDH', 'Water Supply Operator Training and Certification', 'https://msdh.ms.gov/page/30,0,76,138.html'];
  var SRC = {
    sdwaOverview: ['EPA', 'Overview of the Safe Drinking Water Act', EPA + 'sdwa/overview-safe-drinking-water-act'],
    regs:         ['EPA', 'Drinking Water Regulations', EPA + 'dwreginfo/drinking-water-regulations'],
    npdwr:        ['EPA', 'National Primary Drinking Water Regulations', EPA + 'ground-water-and-drinking-water/national-primary-drinking-water-regulations'],
    secondary:    ['EPA', 'Secondary Drinking Water Standards', EPA + 'sdwa/secondary-drinking-water-standards-guidance-nuisance-chemicals'],
    pn:           ['EPA', 'Public Notification Rule', EPA + 'dwreginfo/public-notification-rule'],
    ccr:          ['EPA', 'Consumer Confidence Reports', EPA + 'ccr'],
    records:      ['eCFR', '40 CFR 141.33 — Record maintenance', 'https://www.ecfr.gov/current/title-40/chapter-I/subchapter-D/part-141/subpart-D/section-141.33'],
    part141:      ['eCFR', '40 CFR Part 141 — full rule text', 'https://www.ecfr.gov/current/title-40/chapter-I/subchapter-D/part-141'],
    pfas:         ['EPA', 'PFAS in drinking water', EPA + 'sdwa/and-polyfluoroalkyl-substances-pfas'],
    opcert:       ['EPA', 'About Operator Certification', EPA + 'dwcapacity/about-operator-certification'],
    msdhCert:     MSDH_CERT,
    msdhBureau:   ['MSDH', 'Bureau of Public Water Supply', 'https://msdh.ms.gov/msdhsite/_static/30,0,76.html'],
    msdhClasses:  ['MSDH', 'Classification of Public Water Systems (PDF)', 'https://msdh.ms.gov/page/resources/20537.pdf'],
    msdhProviders:['MSDH', 'Approved training providers', 'https://msdh.ms.gov/msdhsite/index.cfm/30,23365,76,138,html'],
    rtcr:         ['EPA', 'Revised Total Coliform Rule', EPA + 'dwreginfo/revised-total-coliform-rule-and-total-coliform-rule'],
    lcri:         ['EPA', 'Lead and Copper Rule Improvements', EPA + 'ground-water-and-drinking-water/lead-and-copper-rule-improvements'],
    dbp:          ['EPA', 'Stage 1 and Stage 2 DBP Rules', EPA + 'dwreginfo/stage-1-and-stage-2-disinfectants-and-disinfection-byproducts-rules'],
    swtr:         ['EPA', 'Surface Water Treatment Rules', EPA + 'dwreginfo/surface-water-treatment-rules'],
    gwr:          ['EPA', 'Ground Water Rule', EPA + 'dwreginfo/ground-water-rule'],
    chem:         ['EPA', 'Chemical Contaminant Rules', EPA + 'dwreginfo/chemical-contaminant-rules'],
    fluoride:     ['EPA', 'Fluoride in Drinking Water', EPA + 'sdwa/fluoride-drinking-water'],
    ccc:          ['EPA', 'Cross-Connection Control Manual (PDF)', EPA + 'sites/default/files/2015-09/documents/epa816r03002_0.pdf'],
    awia:         ['EPA', 'Risk and Resilience Assessments and ERPs', EPA + 'waterresilience/awia-section-2013'],
    cyber:        ['EPA', 'Cybersecurity for the Water Sector', EPA + 'cyberwater/epa-cybersecurity-water-sector'],
    msrwaTraining:['MsRWA', 'Training & Events', 'https://msrwa.org/training/'],
    msrwaCourse:  ['MsRWA', 'Water Certification Course', 'https://msrwa.org/training/short-course/'],
    msrwaCerts:   ['MsRWA', 'Certifications', 'https://msrwa.org/training/certifications/'],
    msrwaCal:     ['MsRWA', 'Training & event calendar', 'https://msrwa.org/calendar/'],
    nrwaWebinars: ['NRWA', 'Training webinars', 'https://nrwa.org/training/'],
    nrwaAcademy:  ['NRWA', 'WaterPro Academy', 'https://nrwa.org/waterproacademy/'],
    nrwaEpaCal:   ['NRWA', 'EPA water training calendar', 'https://nrwa.org/epa-water-training-calendar/']
  };
  var LINKS = {
    'sdwa': ['sdwaOverview'], 'primacy': ['sdwaOverview'], 'enforcement': ['sdwaOverview'],
    'msdh': ['msdhBureau'], 'epa-rules': ['regs', 'part141', 'msdhBureau'],
    'mcl': ['npdwr'], 'treatment-technique': ['npdwr'], 'secondary-standards': ['secondary'],
    'pn-tiers': ['pn'], 'tier1': ['pn'], 'tier2': ['pn'], 'tier3': ['pn'],
    'ccr': ['ccr'], 'records': ['records'], 'pfas': ['pfas'],
    'who-needs-operator': ['opcert', 'msdhCert'], 'system-classes': ['msdhClasses', 'msdhCert'],
    'class-e': ['msdhClasses'], 'certification-requirements': ['msdhCert', 'msrwaCourse'],
    'renewal': ['msdhCert', 'msdhProviders'], 'study-plan': ['msdhCert', 'msrwaCourse'],
    'training-ms': ['msrwaTraining', 'msdhProviders', 'nrwaWebinars'],
    'msrwa': ['msrwaTraining', 'msrwaCerts', 'msrwaCal'], 'nrwa': ['nrwaWebinars', 'nrwaAcademy', 'nrwaEpaCal'],
    'rtcr': ['rtcr'], 'repeat-samples': ['rtcr'], 'e-coli': ['rtcr'], 'coliform': ['rtcr'], 'sample-sites': ['rtcr'],
    'lead-copper': ['lcri'], 'corrosion-control': ['lcri'],
    'dbps': ['dbp'], 'toc': ['dbp'], 'alt-disinfectants': ['dbp'],
    'swtr': ['swtr'], 'surface-water': ['swtr'], 'turbidity': ['swtr'],
    'sanitary-survey': ['gwr'], 'wellhead-protection': ['gwr'],
    'nitrate': ['chem'], 'arsenic': ['chem'], 'fluoridation': ['fluoride'],
    'cross-connection': ['ccc'], 'backflow': ['ccc'], 'device-selection': ['ccc'], 'ccc-program': ['ccc'], 'backflow-testing': ['ccc'],
    'emergency-plan': ['awia'], 'cybersecurity': ['cyber']
  };
  E.forEach(function (e) {
    if (LINKS[e.id]) e.links = LINKS[e.id].map(function (k) { return SRC[k]; });
  });

  /* ---------- Site search: EPA, NRWA, MsRWA ----------
     Greg's answers come from this file. Only when someone asks him to
     search does anything leave the browser: the search words go to the
     site being searched. NRWA and MsRWA run WordPress, whose public
     search API can return results straight into the chat; every site
     also gets a link to its own search page. */
  var SOURCES = {
    epa:   { name: 'EPA.gov', full: 'U.S. Environmental Protection Agency', home: 'https://www.epa.gov/', search: 'https://search.epa.gov/epasearch/?typeofsearch=epa&querytext=' },
    nrwa:  { name: 'NRWA', full: 'National Rural Water Association', home: 'https://nrwa.org/', search: 'https://nrwa.org/?s=', live: 'https://nrwa.org/wp-json/wp/v2/search' },
    msrwa: { name: 'MsRWA', full: 'Mississippi Rural Water Association', home: 'https://msrwa.org/', search: 'https://msrwa.org/?s=', live: 'https://msrwa.org/wp-json/wp/v2/search' }
  };
  var ORDER = ['epa', 'nrwa', 'msrwa'];
  var SITE_PAT = [
    [['msrwa'], 'ms ?rwa(?:[ .]org)?|mississippi rural water(?: association)?'],
    [['nrwa'], 'nrwa(?:[ .]org)?|national rural water(?: association)?'],
    [['epa'], '(?:u\\.? ?s\\.? )?epa(?:[ .]gov)?|environmental protection agency'],
    [['nrwa', 'msrwa'], 'rural water(?: associations?)?']
  ];
  var VERBS = 'search|look up|lookup|look for|google|find|check|browse';
  var QUERY_STOP = /\b(?:what|whats|is|are|was|were|the|a|an|of|to|for|in|on|at|how|do|does|did|i|you|we|my|our|can|could|should|would|will|about|with|and|or|from|by|be|it|its|this|that|there|when|where|why|which|who|me|please|tell|know|need|want)\b/g;

  function searchSkill(raw) {
    /* Work on what was typed (lightly cleaned, case kept) so "141.33" or "E. coli" survive */
    var s = String(raw || '').replace(/[‘’`]/g, "'").replace(/[^A-Za-z0-9%\s.'&-]/g, ' ').replace(/\s+/g, ' ').trim()
      .replace(/^(?:(?:please|hey|ok|okay|greg|can you|could you|would you|will you|i want to|i need to|help me|go)\s+)+/i, '');
    var strong = /^(?:search|look up|lookup|google)\b/i.test(s);
    var anyVerb = new RegExp('\\b(?:' + VERBS + ')\\b', 'i').test(s);
    var sites = [], rest = ' ' + s + ' ';
    SITE_PAT.forEach(function (sp) {
      if (!new RegExp('\\b(?:' + sp[1] + ')\\b', 'i').test(rest)) return;
      sp[0].forEach(function (id) { if (sites.indexOf(id) === -1) sites.push(id); });
      rest = rest.replace(new RegExp('\\s(?:(?:on|at|from|in|to|using|via|with|of|and|or)\\s+)*(?:the\\s+)?(?:' + sp[1] + ')(?:\\s+(?:website|web site|site|sites|page|pages|homepage))?(?=[\\s.]|$)', 'gi'), ' ');
    });
    if (!(strong || (sites.length && anyVerb))) return null;
    var q = rest.replace(new RegExp('\\b(?:' + VERBS + ')\\b', 'i'), ' ')
      .replace(/\s+/g, ' ').trim()
      .replace(/^(?:(?:the|for|about|on|up|me|and|or|information|info|site|sites|website|websites)\s+)+/i, '')
      .replace(/(?:\s+(?:for me|please|thanks|thank you|and|or))+$/i, '')
      .replace(/^[.\s]+|[.\s]+$/g, '')
      .slice(0, 120);
    sites = sites.length ? ORDER.filter(function (id) { return sites.indexOf(id) !== -1; }) : ORDER.slice();
    var names = sites.map(function (id) { return SOURCES[id].name; });
    var list = names.length > 2 ? names.slice(0, -1).join(', ') + ', and ' + names[names.length - 1]
      : names.join(' and ');
    if (!q) {
      return { text: "Sure. What should I search " + list + " for? Type it like **“search " + names[0] + " for lead service line inventory.”**", chips: ["Search EPA for lead service lines", "Search MsRWA for certification classes", "Search NRWA for PFAS"] };
    }
    return { text: "Searching **" + list + "** for **“" + q + "”**:", chips: [], search: { q: q, sites: sites, live: true } };
  }
  function fallbackQuery(raw) {
    var q = String(raw || '').toLowerCase().replace(/[^a-z0-9%\s.-]/g, ' ').replace(QUERY_STOP, ' ').replace(/\s+/g, ' ').trim();
    return (q || String(raw || '').trim()).slice(0, 120);
  }

  function smallTalk(raw, norm) {
    if (/^(hi|hello|hey|howdy|good (morning|afternoon|evening)|yo|greetings)\b/.test(norm) && norm.split(' ').length <= 4) {
      return { text: "Hi! What are you working on today? Ask me about any chapter, or give me numbers and I'll work the formula.", chips: ["How should I study for my license exam?", "What is the pounds formula?", "Explain the breakpoint chlorination curve."] };
    }
    if (/^(thanks|thank you|thx|ty|appreciate it)\b/.test(norm)) {
      return { text: "Anytime. Keep at it — steady daily practice is what gets people through the exam.", chips: [] };
    }
    if (/^(bye|goodbye|see you|later)\b/.test(norm)) {
      return { text: "Good luck studying! Come back anytime.", chips: [] };
    }
    if (/\b(are you (real|human|a person|ai|a bot|a robot))\b/.test(norm)) {
      return { text: "I'm a built-in study assistant — a knowledge base that runs in your browser. I'm not a live person, and your questions stay on your device. The one exception: when you ask me to **search EPA, NRWA, or MsRWA**, your search words go to that website. For official rulings, always check with MSDH.", chips: ["What can you help me with?", "Can you search EPA, NRWA, or MsRWA?"] };
    }
    return null;
  }

  global.GREG_ADULT = {
    entries: E,
    skills: [
      global.GregEngine ? global.GregEngine.skills.adultSafety : function () { return null; },
      smallTalk,
      searchSkill,
      calcSkill
    ],
    sources: SOURCES,
    starterChips: ["What is the pounds formula?", "Explain the breakpoint chlorination curve.", "What are the public notification tiers?", "Which backflow device should I use?"],
    fallback: function (raw, sugg) {
      /* Offer the official sites only when the question touched a water topic */
      return {
        text: "I don't have a solid answer for that one. Try rephrasing with a key term — like **breakpoint**, **specific capacity**, **RPZ**, or **turbidity**" +
          (sugg.length ? " — or check the official sites below. These topics might be close:" : "."),
        chips: sugg,
        search: sugg.length ? { q: fallbackQuery(raw), sites: ORDER.slice(), live: false } : null
      };
    },
    create: function () {
      return global.GregEngine.create({
        entries: E,
        skills: global.GREG_ADULT.skills,
        fallback: global.GREG_ADULT.fallback,
        starterChips: global.GREG_ADULT.starterChips,
        moreLabel: 'Tell me more'
      });
    }
  };
})(window);
