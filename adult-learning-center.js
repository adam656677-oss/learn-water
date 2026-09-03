/* =================================================================
   adult-learning-center.js
   LearnWater — Full interactive engine
   AI Instructor: Greg  |  Classes A B C D
   =================================================================*/

/* -----------------------------------------------------------------
   CLASS INFO
----------------------------------------------------------------- */
const CURRICULUM = {
  "D": {
    "name": "Class D",
    "tagline": "Entry-level water system operations \u2014 wells, chlorination, and daily responsibilities"
  },
  "C": {
    "name": "Class C",
    "tagline": "Adds aeration, pH adjustment, corrosion control, and closed-pressure treatment"
  },
  "B": {
    "name": "Class B",
    "tagline": "Multiple treatment types, or iron/manganese removal with flocculation and sedimentation"
  },
  "A": {
    "name": "Class A",
    "tagline": "Full surface water treatment \u2014 coagulation, filtration, and lime softening"
  }
};

/* -----------------------------------------------------------------
   CHAPTER REGISTRY  (shared canonical chapters, drawn from the
   Mississippi Waterworks Operators Manual — MSDH, Division of Water
   Supply). Each chapter is a single Study Lesson page, reused across
   every class whose curriculum includes it, so completing a chapter
   once counts everywhere it appears.
----------------------------------------------------------------- */
const CHAPTERS = {
  "ch1": {
    "num": "1",
    "title": "Safe Drinking Water",
    "icon": "\u2696\ufe0f",
    "page": "lessons/ch01-safe-drinking-water.html",
    "questions": [
      {
        "q": "Which of these is NOT one of the three types of public water systems?",
        "choices": [
          "Community water system",
          "Nontransient noncommunity system",
          "Transient noncommunity system",
          "Private irrigation system"
        ],
        "correct": 3,
        "explain": "The SDWA recognizes community, nontransient noncommunity, and transient noncommunity systems \u2014 a private irrigation system isn't a public water system category."
      },
      {
        "q": "A rural water system serving year-round residents, with at least 15 service connections, is a:",
        "choices": [
          "Transient noncommunity system",
          "Community water system",
          "Nontransient noncommunity system",
          "Bottled water system"
        ],
        "correct": 1,
        "explain": "Community water systems serve a year-round residential population with at least 15 connections or 25 residents."
      },
      {
        "q": "A restaurant along the interstate serving different travelers each day is a:",
        "choices": [
          "Community water system",
          "Nontransient noncommunity system",
          "Transient noncommunity system",
          "Industrial system"
        ],
        "correct": 2,
        "explain": "It serves different (transient) people who don't live there \u2014 a classic transient noncommunity example."
      },
      {
        "q": "Which agency has primacy for the Safe Drinking Water Act in Mississippi?",
        "choices": [
          "U.S. EPA Region 4",
          "Mississippi State Department of Health",
          "Mississippi DEQ",
          "USDA"
        ],
        "correct": 1,
        "explain": "MSDH is the primacy agency; its Division of Water Supply administers the program."
      },
      {
        "q": "An MCL goal (MCLG) is:",
        "choices": [
          "The enforceable legal limit",
          "A non-enforceable health-based goal, zero for carcinogens",
          "The same thing as a treatment technique",
          "Only used for secondary standards"
        ],
        "correct": 1,
        "explain": "The MCLG is a goal associated with no adverse health effects \u2014 not an enforceable standard. The MCL is what's actually enforced."
      },
      {
        "q": "Which is an example of a Tier 1 violation?",
        "choices": [
          "Missing a routine monitoring deadline",
          "Using an unapproved testing procedure",
          "Exceeding a maximum contaminant level (MCL)",
          "Filing a late sanitary survey report"
        ],
        "correct": 2,
        "explain": "Tier 1 violations include failure to comply with an MCL, a treatment technique, or a variance/exemption schedule \u2014 the most serious category."
      },
      {
        "q": "How long must a water system keep chemical analysis and sanitary survey reports?",
        "choices": [
          "3 years",
          "5 years",
          "10 years from completion",
          "Indefinitely"
        ],
        "correct": 2,
        "explain": "Chemical analyses and written reports like sanitary surveys must be retained 10 years following completion."
      },
      {
        "q": "A maximum fine of $25,000 per day per violation can apply when a system:",
        "choices": [
          "Misses a single routine sample",
          "Violates an EPA emergency order",
          "Fails to mail a CCR on time",
          "Uses an uncertified lab"
        ],
        "correct": 1,
        "explain": "Violating an EPA emergency order \u2014 issued when a violation poses an imminent and substantial danger \u2014 carries up to $25,000 per day, per violation."
      }
    ]
  },
  "ch2": {
    "num": "2",
    "title": "Operator Certification",
    "icon": "\ud83c\udf93",
    "page": "lessons/ch02-operator-certification.html",
    "questions": [
      {
        "q": "A system that loses its certified operator must replace that operator within:",
        "choices": [
          "30 days",
          "90 days",
          "180 days",
          "1 year"
        ],
        "correct": 2,
        "explain": "The law requires replacement within 180 days of losing a certified operator."
      },
      {
        "q": "A system with one or more wells and no treatment beyond chlorination, fluoridation, and phosphate addition is:",
        "choices": [
          "Class A",
          "Class B",
          "Class C",
          "Class D"
        ],
        "correct": 3,
        "explain": "That's the Class D definition exactly \u2014 the simplest treatment classification."
      },
      {
        "q": "A system with aeration, pH adjustment, corrosion control, or closed-pressure treatment (including zeolite softening or iron removal) is classified as:",
        "choices": [
          "Class D",
          "Class C",
          "Class B",
          "Class E"
        ],
        "correct": 1,
        "explain": "Aeration, pH adjustment, corrosion control, and closed-pressure treatment define Class C."
      },
      {
        "q": "What is the minimum supervised experience required for any Mississippi waterworks certification?",
        "choices": [
          "6 months",
          "1 year",
          "2 years",
          "3 years"
        ],
        "correct": 1,
        "explain": "Every certification path requires at least one year of supervised experience under a certified operator."
      },
      {
        "q": "A Mississippi waterworks operator certificate is valid for:",
        "choices": [
          "1 year",
          "2 years",
          "3 years",
          "5 years"
        ],
        "correct": 2,
        "explain": "Certificates are valid for three years unless revoked for cause."
      },
      {
        "q": "An operator continuously licensed for 5 years needs how many continuing education units to renew?",
        "choices": [
          "12",
          "24",
          "48",
          "60"
        ],
        "correct": 2,
        "explain": "Operators licensed continuously for less than 9 years need 48 approved CEUs within the 3-year certificate period."
      },
      {
        "q": "If a renewal application is filed more than 30 days after the certificate expires, the operator must:",
        "choices": [
          "Pay a late fee only",
          "Retake the written certification exam",
          "Wait one year to reapply",
          "Automatically lose eligibility"
        ],
        "correct": 1,
        "explain": "Filing more than 30 days after expiration \u2014 or failing to get the required CEU hours \u2014 requires passing the written exam again."
      },
      {
        "q": "Systems that purchase all their water, or operators whose only job is running a distribution system, are classified as:",
        "choices": [
          "Class D",
          "Class C",
          "Class E",
          "Class A"
        ],
        "correct": 2,
        "explain": "Class E covers systems that purchase water only, including pure distribution-only operators."
      }
    ]
  },
  "ch3": {
    "num": "3",
    "title": "Mathematics",
    "icon": "\ud83d\udd22",
    "page": "lessons/ch03-mathematics.html",
    "questions": [
      {
        "q": "How many pounds does one gallon of water weigh?",
        "choices": [
          "7.48 lbs",
          "8.34 lbs",
          "62.4 lbs",
          "1.0 lb"
        ],
        "correct": 1,
        "explain": "One gallon of water weighs 8.34 pounds \u2014 the number behind every dosage calculation."
      },
      {
        "q": "A dose of 1 mg/l in one million gallons of water equals how many pounds of chemical?",
        "choices": [
          "1 lb",
          "7.48 lbs",
          "8.34 lbs",
          "62.4 lbs"
        ],
        "correct": 2,
        "explain": "1 mg/l = 1 ppm = 8.34 lbs of chemical per million gallons of water."
      },
      {
        "q": "What is the area of a circular filter with a 20-foot diameter? (Area = \u03c0 \u00d7 D\u00b2 \u00f7 4)",
        "choices": [
          "62.8 ft\u00b2",
          "100 ft\u00b2",
          "314 ft\u00b2",
          "1,256 ft\u00b2"
        ],
        "correct": 2,
        "explain": "3.14 \u00d7 20\u00b2 \u00f7 4 = 3.14 \u00d7 400 \u00f7 4 = 314 square feet."
      },
      {
        "q": "How many gallons are in one cubic foot of water?",
        "choices": [
          "1 gallon",
          "3.14 gallons",
          "7.48 gallons",
          "8.34 gallons"
        ],
        "correct": 2,
        "explain": "One cubic foot of water equals 7.48 gallons \u2014 a key conversion for tank volume problems."
      },
      {
        "q": "A rectangular tank is 10 ft long, 8 ft wide, and 6 ft tall. What is its volume in cubic feet?",
        "choices": [
          "24 ft\u00b3",
          "240 ft\u00b3",
          "480 ft\u00b3",
          "680 ft\u00b3"
        ],
        "correct": 2,
        "explain": "Volume = L \u00d7 W \u00d7 H = 10 \u00d7 8 \u00d7 6 = 480 cubic feet."
      },
      {
        "q": "Which formula finds the volume of a cylindrical tank?",
        "choices": [
          "L \u00d7 W \u00d7 H",
          "\u03c0 \u00d7 D\u00b2 \u00f7 4",
          "3.14 \u00d7 r\u00b2 \u00d7 H",
          "2W + 2L"
        ],
        "correct": 2,
        "explain": "Cylinder volume = 3.14 \u00d7 radius\u00b2 \u00d7 height."
      },
      {
        "q": "If 80% of a system's 500 connections are metered, how many are NOT metered?",
        "choices": [
          "40",
          "100",
          "400",
          "480"
        ],
        "correct": 1,
        "explain": "20% are unmetered: 0.20 \u00d7 500 = 100 connections."
      },
      {
        "q": "To multiply two decimal numbers by hand, you should:",
        "choices": [
          "Ignore the decimal points until the final answer",
          "Multiply as whole numbers, then count total decimal places to place the point",
          "Round both numbers to whole numbers first",
          "Add the decimal places together before multiplying"
        ],
        "correct": 1,
        "explain": "Multiply as if there were no decimals, then count the total decimal places in both factors and point off that many places in the product."
      }
    ]
  },
  "ch4": {
    "num": "4",
    "title": "Hydraulics",
    "icon": "\u2699\ufe0f",
    "page": "lessons/ch04-hydraulics.html",
    "questions": [
      {
        "q": "One foot of water column exerts how much pressure?",
        "choices": [
          "0.0433 psi",
          "0.433 psi",
          "2.31 psi",
          "4.33 psi"
        ],
        "correct": 1,
        "explain": "1 foot of water = 0.433 psi \u2014 the fundamental static-pressure conversion."
      },
      {
        "q": "One psi of pressure corresponds to how many feet of water head?",
        "choices": [
          "0.433 ft",
          "1 ft",
          "2.31 ft",
          "10 ft"
        ],
        "correct": 2,
        "explain": "1 psi = 2.31 feet of water (the reciprocal of 0.433)."
      },
      {
        "q": "Static pressure at the base of a water column depends on:",
        "choices": [
          "The shape of the container",
          "The height of water above the point, only",
          "The diameter of the container, only",
          "Both height and container shape equally"
        ],
        "correct": 1,
        "explain": "Pressure depends only on the height of water above the point of measurement \u2014 not on the container's shape."
      },
      {
        "q": "Design velocities in a distribution system are normally kept under:",
        "choices": [
          "1 ft/sec",
          "5 ft/sec",
          "15 ft/sec",
          "30 ft/sec"
        ],
        "correct": 1,
        "explain": "Distribution velocities are routinely designed below 5 ft/sec to minimize friction loss."
      },
      {
        "q": "A new PVC pipe typically has a Hazen-Williams roughness coefficient (C) of about:",
        "choices": [
          "50",
          "90",
          "130",
          "150"
        ],
        "correct": 3,
        "explain": "New PVC pipe has a C-value around 150 \u2014 smoother than new ductile iron (about 130) or old cast iron (50 or lower)."
      },
      {
        "q": "Which pump type delivers a constant volume of solution regardless of downstream pressure, and is mainly used for chemical feed?",
        "choices": [
          "Centrifugal pump",
          "Positive displacement pump",
          "Turbine pump",
          "Jet pump"
        ],
        "correct": 1,
        "explain": "Positive displacement (piston or rotary) pumps deliver a constant volume \u2014 ideal for small-plant chemical feed, but they must be protected from closed valves."
      },
      {
        "q": "A centrifugal pump must be _____ before it can move water.",
        "choices": [
          "Grounded",
          "Primed",
          "Reversed",
          "Throttled"
        ],
        "correct": 1,
        "explain": "If the casing is filled with air or vapor, the impeller can't create the low pressure needed to draw water \u2014 the pump must be primed."
      },
      {
        "q": "The point on a pump's curve where flow drops to zero and head is at its maximum is called the:",
        "choices": [
          "Shut-off head",
          "Suction lift",
          "NPSH",
          "Discharge head"
        ],
        "correct": 0,
        "explain": "Shut-off head is the maximum head reached at zero discharge, when a valve closes downstream."
      }
    ]
  },
  "ch5": {
    "num": "5",
    "title": "Ground Water & Wells",
    "icon": "\ud83d\udd73\ufe0f",
    "page": "lessons/ch05-groundwater-wells.html",
    "questions": [
      {
        "q": "What percentage of Mississippi's public water systems rely at least partly on ground water?",
        "choices": [
          "25%",
          "50%",
          "88%",
          "100%"
        ],
        "correct": 2,
        "explain": "About 88% of the water used by Mississippi public water systems is ground water; all systems use some as primary or backup."
      },
      {
        "q": "An aquifer with an impervious layer above and below it, so water is under pressure, is called a/an:",
        "choices": [
          "Unconfined aquifer",
          "Water table aquifer",
          "Confined aquifer",
          "Free ground-water reservoir"
        ],
        "correct": 2,
        "explain": "A confined aquifer is sandwiched between impervious layers, giving the water pressure like a distribution main."
      },
      {
        "q": "A well in which water rises above the top of the aquifer but not to the surface is called a/an:",
        "choices": [
          "Artesian aquifer well",
          "Water table well",
          "Flowing artesian well",
          "Monitoring well"
        ],
        "correct": 0,
        "explain": "If water rises above the top of the aquifer when tapped, it's an artesian aquifer well; if it overflows the casing, it becomes a flowing artesian well."
      },
      {
        "q": "Specific capacity of a well is calculated as:",
        "choices": [
          "Drawdown \u00f7 pumping rate",
          "Pumping rate (gpm) \u00f7 drawdown (ft)",
          "Transmissivity \u00f7 porosity",
          "Static water level \u00d7 drawdown"
        ],
        "correct": 1,
        "explain": "Specific capacity = pumping rate in gpm divided by drawdown in feet \u2014 gallons produced per foot of drawdown."
      },
      {
        "q": "Mississippi has approximately how many principal freshwater aquifers?",
        "choices": [
          "5",
          "15",
          "30",
          "50"
        ],
        "correct": 1,
        "explain": "The manual cites 15 principal freshwater aquifers in Mississippi."
      },
      {
        "q": "After completing a new well, disinfection should use a free chlorine solution of about:",
        "choices": [
          "5 mg/l for 1 hour",
          "50 mg/l for 24 hours",
          "200 mg/l for 5 minutes",
          "1 mg/l for 1 week"
        ],
        "correct": 1,
        "explain": "Disinfect the completed well and adjacent aquifer with a 50 mg/l free chlorine solution held for 24 hours."
      },
      {
        "q": "A new well can be placed in service only after:",
        "choices": [
          "One clear bacteriological sample",
          "Two consecutive chlorine-free samples, at least 2 hours apart, both showing no coliform",
          "A single turbidity reading under 1 NTU",
          "30 days of continuous pumping"
        ],
        "correct": 1,
        "explain": "Two consecutive samples, taken at least two hours of continuous pumping apart, must both be chlorine-free and coliform-negative."
      },
      {
        "q": "Porosity measures:",
        "choices": [
          "How fast water flows through an aquifer",
          "The percentage of a formation's volume that is open space",
          "The well's pumping rate per foot of drawdown",
          "The mineral content of the water"
        ],
        "correct": 1,
        "explain": "Porosity is the percent of the formation volume that is pore space \u2014 but it doesn't by itself indicate how much water will actually yield, since fine pores (like clay) resist flow."
      }
    ]
  },
  "ch6": {
    "num": "6",
    "title": "Microbiology",
    "icon": "\ud83e\udda0",
    "page": "lessons/ch06-microbiology.html",
    "questions": [
      {
        "q": "Why is coliform used as the indicator organism for sewage contamination?",
        "choices": [
          "It is the most dangerous pathogen known",
          "It is always present with sewage, absent without it, and easy/cheap to test for",
          "It only appears in surface water",
          "It cannot be killed by chlorine"
        ],
        "correct": 1,
        "explain": "Coliform is reliably present when sewage is present, absent when it isn't, survives longer than pathogens, and is easy and inexpensive to test for."
      },
      {
        "q": "What is the minimum number of bacteriological sample sites required per system?",
        "choices": [
          "1",
          "3",
          "5",
          "10"
        ],
        "correct": 2,
        "explain": "Regulations require a minimum of five representative sample sites, laid out in an approved sample siting plan."
      },
      {
        "q": "A bacteriological sample must reach the lab for analysis within:",
        "choices": [
          "8 hours",
          "12 hours",
          "30 hours",
          "72 hours"
        ],
        "correct": 2,
        "explain": "Samples must be analyzed within 30 hours of collection or they are rejected and must be re-collected."
      },
      {
        "q": "Which protozoan forms cysts/oocysts resistant enough to pass through even well-maintained filters?",
        "choices": [
          "Salmonella",
          "Cryptosporidium",
          "E. coli",
          "Legionella"
        ],
        "correct": 1,
        "explain": "Cryptosporidium oocysts are the smallest of the enteric protozoa and can get through even well-run filters \u2014 multiple barriers (coagulation, filtration, disinfection) are needed."
      },
      {
        "q": "At what free chlorine level and contact time are enteric viruses fully inactivated?",
        "choices": [
          "0.2-0.3 ppm for 10 minutes",
          "0.2-0.3 ppm for 30 minutes",
          "5 ppm for 1 minute",
          "No amount of chlorine kills viruses"
        ],
        "correct": 1,
        "explain": "Bacteria die within about 10 minutes at 0.2-0.3 ppm, but enteric viruses need about 30 minutes of contact at the same concentration."
      },
      {
        "q": "What sample bottle size is required for standard bacteriological sampling?",
        "choices": [
          "50 ml",
          "100 ml",
          "250 ml",
          "1 liter"
        ],
        "correct": 1,
        "explain": "MSDH provides sterile 100-ml bottles containing sodium thiosulfate to neutralize any chlorine present."
      },
      {
        "q": "Where should a bacteriological sample NEVER be collected from?",
        "choices": [
          "An outside cold-water faucet",
          "A fire hydrant",
          "A sample site listed in the siting plan",
          "A faucet that has been flushed 2-3 minutes"
        ],
        "correct": 1,
        "explain": "Fire plugs/hydrants should never be used as sampling points \u2014 nor should faucets near the ground, leaking, or dirty."
      },
      {
        "q": "Which best describes most bacteria found in drinking water?",
        "choices": [
          "All bacteria in water cause disease",
          "Over 80% of bacteria are rod-shaped (bacillus)",
          "Bacteria cannot reproduce in cold water",
          "Bacteria require sunlight to reproduce"
        ],
        "correct": 1,
        "explain": "More than 80 percent of bacteria are bacillus (rod) shaped; most bacteria are harmless, though some cause disease."
      }
    ]
  },
  "ch7": {
    "num": "7",
    "title": "Chemistry of Ground Water",
    "icon": "\ud83e\uddea",
    "page": "lessons/ch07-chemistry-ground-water.html",
    "questions": [
      {
        "q": "As hydrogen ion (H+) concentration increases, pH:",
        "choices": [
          "Increases",
          "Decreases",
          "Stays the same",
          "Becomes negative"
        ],
        "correct": 1,
        "explain": "pH and H+ concentration move in opposite directions \u2014 more H+ means a lower (more acidic) pH."
      },
      {
        "q": "Which of these RAISES the pH of water when added?",
        "choices": [
          "Chlorine",
          "Carbon dioxide",
          "Lime (hydrated)",
          "Sulfuric acid"
        ],
        "correct": 2,
        "explain": "Lime, soda ash, sodium hydroxide, and hypochlorite all raise pH. Chlorine, CO2, and acids lower it."
      },
      {
        "q": "Water with a hardness of 250 mg/l as CaCO3 would be classified as:",
        "choices": [
          "Soft",
          "Moderately hard",
          "Hard",
          "Very hard"
        ],
        "correct": 3,
        "explain": "Over 200 mg/l as CaCO3 is classified as very hard water."
      },
      {
        "q": "What primarily causes hardness in Mississippi ground water?",
        "choices": [
          "Iron and manganese",
          "Calcium and magnesium ions",
          "Sodium and chloride",
          "Dissolved oxygen"
        ],
        "correct": 1,
        "explain": "Calcium and magnesium ions are the main cause of hardness in Mississippi's ground water."
      },
      {
        "q": "Carbonate (temporary) hardness can be reduced simply by:",
        "choices": [
          "Adding acid",
          "Heating the water",
          "Adding sodium chloride",
          "Aeration alone"
        ],
        "correct": 1,
        "explain": "Heat drives off carbon dioxide and precipitates carbonate, softening carbonate hardness; non-carbonate hardness does not respond to heat."
      },
      {
        "q": "Which negative ion provides most of the natural alkalinity in Mississippi ground water?",
        "choices": [
          "Chloride",
          "Sulfate",
          "Bicarbonate",
          "Nitrate"
        ],
        "correct": 2,
        "explain": "Of the alkaline compounds, bicarbonate salts provide most of the alkalinity found in natural waters."
      },
      {
        "q": "Why is alkalinity important before adding a coagulant like alum?",
        "choices": [
          "Alkalinity has no effect on coagulation",
          "Alum reacts with alkalinity to form hydroxide floc",
          "Alkalinity destroys the coagulant",
          "Coagulants only work in acidic water"
        ],
        "correct": 1,
        "explain": "Alum reacts with alkalinity to form aluminum hydroxide floc \u2014 if there isn't enough natural alkalinity, lime or soda ash must be added first."
      },
      {
        "q": "A mixture in which every part is exactly like every other part is called a:",
        "choices": [
          "Coagulant",
          "Solution",
          "Colloid",
          "Suspension"
        ],
        "correct": 1,
        "explain": "A solution is a homogeneous mixture \u2014 every part is like every other part \u2014 unlike a colloid or suspension."
      }
    ]
  },
  "ch8d": {
    "num": "8 (D)",
    "title": "Water Treatment \u2014 Class D",
    "icon": "\ud83e\uddf4",
    "page": "lessons/ch08d-water-treatment-class-d.html",
    "questions": [
      {
        "q": "Put the stages of the chlorination curve in order as chlorine dose increases from zero.",
        "choices": [
          "Free residual \u2192 demand \u2192 combined residual \u2192 breakpoint",
          "Demand \u2192 combined residual \u2192 breakpoint \u2192 free residual",
          "Combined residual \u2192 demand \u2192 free residual \u2192 breakpoint",
          "Breakpoint \u2192 demand \u2192 combined residual \u2192 free residual"
        ],
        "correct": 1,
        "explain": "Chlorine first satisfies demand, then forms combined residual (chloramines), reaches breakpoint where combined residual is destroyed, then forms free residual."
      },
      {
        "q": "What is the minimum recommended free chlorine residual in the distribution system?",
        "choices": [
          "0.02 mg/l",
          "0.2 mg/l",
          "2.0 mg/l",
          "4.0 mg/l"
        ],
        "correct": 1,
        "explain": "A detectable free chlorine residual of at least 0.2 mg/l is recommended throughout the distribution system."
      },
      {
        "q": "High-test calcium hypochlorite (HTH) is approximately what percent available chlorine?",
        "choices": [
          "10%",
          "35%",
          "70%",
          "100%"
        ],
        "correct": 2,
        "explain": "HTH is a granular/powdered compound containing around 70% available chlorine; gaseous chlorine is nearly 100%."
      },
      {
        "q": "A 500 gpm well needs a 2 ppm chlorine dose. Using ppm \u00d7 gpm \u00d7 0.012 = lbs/24hrs, how many pounds per day?",
        "choices": [
          "6 lbs",
          "12 lbs",
          "24 lbs",
          "120 lbs"
        ],
        "correct": 1,
        "explain": "2 \u00d7 500 \u00d7 0.012 = 12 pounds of chlorine per 24 hours."
      },
      {
        "q": "What is the ideal natural fluoride concentration in drinking water?",
        "choices": [
          "0.1-0.3 mg/l",
          "0.8-1.2 mg/l",
          "2.0-3.0 mg/l",
          "5.0-6.0 mg/l"
        ],
        "correct": 1,
        "explain": "A concentration of 0.8 to 1.2 mg/l fluoride ion is considered ideal for reducing tooth decay."
      },
      {
        "q": "Which chemical is a corrosive, 22-30% liquid used to add fluoride?",
        "choices": [
          "Sodium fluoride",
          "Hydrofluosilicic acid",
          "Sodium silicofluoride",
          "Sodium hypochlorite"
        ],
        "correct": 1,
        "explain": "Hydrofluosilicic acid is a colorless, corrosive, fuming liquid, sold as a 22-30% aqueous solution."
      },
      {
        "q": "Recommended chlorine contact time for effective disinfection is about:",
        "choices": [
          "1-2 minutes",
          "15-30 minutes",
          "2-3 hours",
          "24 hours"
        ],
        "correct": 1,
        "explain": "A contact time of 15 to 30 minutes is recommended for effective disinfection."
      },
      {
        "q": "Disinfection with chlorine is generally MORE effective at:",
        "choices": [
          "Higher pH",
          "Lower pH",
          "Any pH, pH has no effect",
          "Only at pH 7.0 exactly"
        ],
        "correct": 1,
        "explain": "Hypochlorous acid (the stronger disinfecting form of chlorine) is more prevalent at lower pH, so disinfection is more effective there."
      }
    ]
  },
  "ch8bc": {
    "num": "8 (B&C)",
    "title": "Water Treatment \u2014 Unit Processes",
    "icon": "\ud83c\udfed",
    "page": "lessons/ch08bc-water-treatment-unit-processes.html",
    "questions": [
      {
        "q": "Aeration is especially effective at removing all of the following EXCEPT:",
        "choices": [
          "Carbon dioxide",
          "Hydrogen sulfide",
          "Dissolved calcium hardness",
          "Methane"
        ],
        "correct": 2,
        "explain": "Aeration removes gases like CO2, H2S, and methane, and oxidizes iron/manganese \u2014 it does not remove dissolved calcium hardness."
      },
      {
        "q": "Iron concentrations above what level typically stain fixtures and clothing?",
        "choices": [
          "0.03 mg/l",
          "0.3 mg/l",
          "3.0 mg/l",
          "30 mg/l"
        ],
        "correct": 1,
        "explain": "Water with more than 0.3 mg/l iron stains fixtures and clothing yellowish-brown."
      },
      {
        "q": "Coagulation \u2014 the neutralization of particle charge by a coagulant \u2014 occurs within about:",
        "choices": [
          "1-2 seconds",
          "1-2 minutes",
          "10 minutes",
          "1 hour"
        ],
        "correct": 0,
        "explain": "The positively charged coagulant neutralizes negative particle charge within one or two seconds, which is why rapid mixing right after dosing is critical."
      },
      {
        "q": "Trivalent coagulants (like alum or ferric sulfate) are roughly how much more effective than monovalent coagulants?",
        "choices": [
          "2-5 times",
          "10-20 times",
          "700-1,000 times",
          "No difference"
        ],
        "correct": 2,
        "explain": "Trivalent compounds are 700 to 1,000 times more effective as coagulants than monovalent compounds."
      },
      {
        "q": "The minimum recommended detention time for a conventional sedimentation basin is:",
        "choices": [
          "30 minutes",
          "1 hour",
          "4 hours",
          "24 hours"
        ],
        "correct": 2,
        "explain": "Conventional sedimentation basins should provide at least 4 hours of settling time (2 hours is acceptable for lime-soda softening treating only ground water)."
      },
      {
        "q": "A typical loading rate for a single-media rapid sand filter is about:",
        "choices": [
          "0.5 gpm/ft\u00b2",
          "2 gpm/ft\u00b2",
          "10 gpm/ft\u00b2",
          "25 gpm/ft\u00b2"
        ],
        "correct": 1,
        "explain": "Single-media filters typically operate around 2 gpm/ft\u00b2; dual-media filters run closer to 3 gpm/ft\u00b2."
      },
      {
        "q": "Filters are typically backwashed when head loss reaches:",
        "choices": [
          "1-2 feet",
          "7-10 feet",
          "25-30 feet",
          "50 feet"
        ],
        "correct": 1,
        "explain": "The proper time to backwash a gravity filter is when head loss reaches about 7 to 10 feet."
      },
      {
        "q": "Ion exchange softening works best for water with total dissolved solids under about:",
        "choices": [
          "200 mg/l",
          "2,000 mg/l",
          "20,000 mg/l",
          "No TDS limit applies"
        ],
        "correct": 1,
        "explain": "Ion exchange is appropriate for waters with TDS under about 2,000 mg/l \u2014 higher TDS shortens the exchange medium's service life."
      }
    ]
  },
  "ch8a": {
    "num": "8 (A)",
    "title": "Water Treatment \u2014 Surface Water",
    "icon": "\ud83c\udfde\ufe0f",
    "page": "lessons/ch08a-water-treatment-surface-water.html",
    "questions": [
      {
        "q": "What percentage of Mississippi's population gets its drinking water from surface sources?",
        "choices": [
          "About 10%",
          "About 50%",
          "About 75%",
          "About 90%"
        ],
        "correct": 0,
        "explain": "Only about 10% of Mississippians are on surface water \u2014 nationally the figure is closer to 75%."
      },
      {
        "q": "During lime-soda ash softening, calcium carbonate precipitates at approximately what pH?",
        "choices": [
          "6.5",
          "8.3",
          "9.4",
          "12.0"
        ],
        "correct": 2,
        "explain": "Calcium carbonate precipitates at a pH of about 9.4 during lime treatment."
      },
      {
        "q": "After lime-soda softening, recarbonation typically lowers the pH back down to about:",
        "choices": [
          "6.0",
          "8.6",
          "10.6",
          "11.5"
        ],
        "correct": 1,
        "explain": "Recarbonation (adding CO2) reduces pH from around 11 down to about 8.6, stabilizing the water and preventing calcium carbonate deposits."
      },
      {
        "q": "What causes trihalomethanes (THMs) to form in surface water treatment?",
        "choices": [
          "Fluoride reacting with calcium",
          "Free chlorine residual reacting with natural organic matter",
          "Ozone reacting with iron",
          "Alum reacting with turbidity"
        ],
        "correct": 1,
        "explain": "Natural organic (humic/fulvic) compounds react with free chlorine residual to form THMs like chloroform."
      },
      {
        "q": "Compared to free chlorine, chloramines are approximately how much less effective at disinfection (at typical surface-water pH)?",
        "choices": [
          "About 2 times less effective",
          "About 20 times less effective",
          "About 200 times less effective",
          "Equally effective"
        ],
        "correct": 2,
        "explain": "It takes roughly 200 times as much chloramine to provide the same disinfection as free chlorine when pH is below 7.0."
      },
      {
        "q": "What is the EPA's cap on the combined residual of chlorine dioxide, chlorite, and chlorate?",
        "choices": [
          "0.1 mg/l",
          "1.0 mg/l",
          "4.0 mg/l",
          "10.0 mg/l"
        ],
        "correct": 1,
        "explain": "EPA recommends the total distribution residual of chlorine dioxide, chlorite, and chlorate not exceed 1.0 mg/l."
      },
      {
        "q": "Ozone as a disinfectant:",
        "choices": [
          "Leaves a strong, lasting residual",
          "Leaves no residual and must be generated on-site",
          "Is cheaper than chlorine in the U.S.",
          "Forms large amounts of THMs"
        ],
        "correct": 1,
        "explain": "Ozone is a powerful oxidant that leaves no residual, must be produced on-site, and is more expensive than chlorine \u2014 but it doesn't form THMs."
      },
      {
        "q": "Short circuiting in a sedimentation basin is most often caused by:",
        "choices": [
          "Too much detention time",
          "Poor inlet baffling",
          "Excess alkalinity",
          "Cold water temperature"
        ],
        "correct": 1,
        "explain": "Poorly designed or worn inlet baffles cause uneven flow distribution, letting some water bypass the basin's full design detention time."
      }
    ]
  },
  "ch9": {
    "num": "9",
    "title": "Distribution & Storage",
    "icon": "\ud83d\udeb0",
    "page": "lessons/ch09-distribution-storage.html",
    "questions": [
      {
        "q": "What is the recommended minimum size for a water main?",
        "choices": [
          "2 inches",
          "4 inches",
          "8 inches",
          "12 inches"
        ],
        "correct": 1,
        "explain": "4 inches is the recommended minimum main size; mains supplying fire protection should be at least 6 inches."
      },
      {
        "q": "What is the absolute minimum pressure that must be maintained in a distribution system?",
        "choices": [
          "10 psi",
          "20 psi",
          "35 psi",
          "60 psi"
        ],
        "correct": 1,
        "explain": "20 psi is the minimum \u2014 dropping below it can allow contaminants to be drawn in and typically triggers a boil-water notice."
      },
      {
        "q": "New water mains should be disinfected with a free chlorine solution of at least:",
        "choices": [
          "5 mg/l for 1 hour",
          "50 mg/l for 24 hours",
          "200 mg/l for 5 minutes",
          "500 mg/l for 30 minutes"
        ],
        "correct": 1,
        "explain": "New mains are disinfected with at least 50 mg/l free chlorine, held 24 hours, ending with at least 10 mg/l residual remaining."
      },
      {
        "q": "A hydrostatic pressure test on a new main should be conducted at what pressure, held how long?",
        "choices": [
          "Normal pressure, 10 minutes",
          "1.5x normal operating pressure, 1 hour",
          "2x normal pressure, 24 hours",
          "Half of normal pressure, 1 hour"
        ],
        "correct": 1,
        "explain": "Test pressure should be at least 50% greater than normal operating pressure, maintained for at least one hour while checking for leaks."
      },
      {
        "q": "Which valve type opens with normal flow and closes automatically if flow reverses?",
        "choices": [
          "Gate valve",
          "Globe valve",
          "Check valve",
          "Butterfly valve"
        ],
        "correct": 2,
        "explain": "Check valves allow flow in one direction only, protecting against backflow contamination."
      },
      {
        "q": "A pressure (hydropneumatic) tank should be sized at roughly how many times the pump's capacity (gpm) to give a reasonable pump cycle?",
        "choices": [
          "5 times",
          "10 times",
          "40 times",
          "100 times"
        ],
        "correct": 2,
        "explain": "Tank capacity in gallons should be at least 40 times the pump's capacity in gpm for a reasonable cycle time."
      },
      {
        "q": "RMDC recommends the water-level swing in an elevated tank or standpipe not exceed:",
        "choices": [
          "5 feet",
          "10 feet",
          "30 feet",
          "100 feet"
        ],
        "correct": 2,
        "explain": "Recommended Minimum Design Criteria (RMDC) suggests a maximum 30-foot swing between high and low levels in an elevated storage structure."
      },
      {
        "q": "Which is an advantage of elevated storage over a pressure tank system?",
        "choices": [
          "Lower initial cost",
          "Provides real reserve storage and fire protection",
          "Requires no maintenance",
          "Eliminates the need for disinfection"
        ],
        "correct": 1,
        "explain": "Elevated storage provides genuine reserve capacity and can support fire flows \u2014 a pressure tank's volume isn't usable reserve storage at all."
      }
    ]
  },
  "ch10": {
    "num": "10",
    "title": "Chlorination Equipment & Safety",
    "icon": "\ud83d\udee2\ufe0f",
    "page": "lessons/ch10-chlorination.html",
    "questions": [
      {
        "q": "Chlorine gas is how many times heavier than air?",
        "choices": [
          "Half as heavy",
          "The same weight",
          "2.5 times heavier",
          "10 times heavier"
        ],
        "correct": 2,
        "explain": "Chlorine gas is 2.5 times heavier than air, which is why it settles to the floor and vents are placed low."
      },
      {
        "q": "What is the correct way to check for a chlorine gas leak?",
        "choices": [
          "Pour water on the suspected area",
          "Hold an ammonia-soaked cloth near the area \u2014 a white cloud indicates a leak",
          "Smell directly at the valve",
          "Use a lit match near the fitting"
        ],
        "correct": 1,
        "explain": "Ammonia combines with chlorine gas to form a visible white cloud of ammonium chloride \u2014 never pour liquid ammonia directly on a leak."
      },
      {
        "q": "A 150-pound chlorine cylinder has an approximate tare (empty) weight of:",
        "choices": [
          "50 lbs",
          "92 lbs",
          "150 lbs",
          "300 lbs"
        ],
        "correct": 1,
        "explain": "A 150-lb cylinder has an approximate tare weight of 92 pounds, stamped on the cylinder shoulder."
      },
      {
        "q": "A ton (2,000 lb) chlorine container, when full, weighs approximately:",
        "choices": [
          "1,300 lbs",
          "2,000 lbs",
          "3,300 lbs",
          "5,000 lbs"
        ],
        "correct": 2,
        "explain": "The empty ton container weighs about 1,300 lbs; full of chlorine it totals roughly 3,300 lbs."
      },
      {
        "q": "Fusible plugs on chlorine cylinders are designed to melt at approximately what temperature to relieve pressure?",
        "choices": [
          "100-110\u00b0F",
          "158-165\u00b0F",
          "212\u00b0F",
          "300\u00b0F"
        ],
        "correct": 1,
        "explain": "Fusible plugs melt at 158-165\u00b0F, releasing pressure before the cylinder can rupture in a fire."
      },
      {
        "q": "Should you use a pipe wrench with an extension to force open a stuck chlorine cylinder valve?",
        "choices": [
          "Yes, always",
          "No \u2014 never use wrenches longer than 6 inches or extensions on chlorine valves",
          "Only in an emergency",
          "Only if wearing gloves"
        ],
        "correct": 1,
        "explain": "Never use wrenches longer than six inches, pipe wrenches, or extensions on chlorine valves \u2014 if it won't open normally, loosen the packing nut or return the cylinder to the supplier."
      },
      {
        "q": "In a typical vacuum-fed gas chlorinator, what happens if the booster pump stops?",
        "choices": [
          "Chlorine keeps flowing at the same rate",
          "The vacuum collapses and the chlorinator's safety valves close automatically",
          "The rotometer reading increases",
          "Nothing changes until manually shut off"
        ],
        "correct": 1,
        "explain": "Losing the vacuum closes the ejector check valve and the chlorinator's inlet safety valve, stopping chlorine flow \u2014 an important built-in fail-safe."
      },
      {
        "q": "A chlorinator should be sized so normal operation runs at about what fraction of its rotometer scale?",
        "choices": [
          "1/4 to 1/3",
          "1/2 to 2/3",
          "Nearly 100%",
          "Under 1/10"
        ],
        "correct": 0,
        "explain": "Sizing for 1/4 to 1/3 of the rotometer scale under normal conditions leaves headroom for higher feed rates and increased chlorine demand."
      }
    ]
  },
  "ch11": {
    "num": "11",
    "title": "Administration & Safety",
    "icon": "\ud83e\uddba",
    "page": "lessons/ch11-administration-safety.html",
    "questions": [
      {
        "q": "According to safety studies cited in the manual, what percentage of workplace accidents are caused by specific unsafe employee acts?",
        "choices": [
          "25%",
          "50%",
          "88%",
          "99%"
        ],
        "correct": 2,
        "explain": "Approximately 88 percent of accidents are attributed to specific unsafe acts by employees \u2014 which is why training matters so much."
      },
      {
        "q": "In Mississippi, service areas for privately owned water systems and associations are regulated by:",
        "choices": [
          "MSDH",
          "The Public Service Commission",
          "The county board of supervisors",
          "The EPA"
        ],
        "correct": 1,
        "explain": "The Public Service Commission (PSC) issues and regulates service areas for privately owned systems and water associations."
      },
      {
        "q": "Breakdown maintenance is best described as:",
        "choices": [
          "Scheduled inspections performed routinely",
          "Repair of already-broken equipment requiring immediate action",
          "Manufacturer-recommended bearing replacement",
          "Annual equipment audits"
        ],
        "correct": 1,
        "explain": "Breakdown maintenance is the repair of equipment that has already failed, usually requiring immediate action \u2014 as opposed to scheduled preventive maintenance."
      },
      {
        "q": "How often should a utility's stores/parts inventory be physically counted?",
        "choices": [
          "Weekly",
          "Monthly",
          "At least once a year",
          "Only when errors are suspected"
        ],
        "correct": 2,
        "explain": "All material in stores should be physically inventoried at least once a year, ideally by someone outside day-to-day stores control."
      },
      {
        "q": "Indirect costs of a workplace accident (lost time, damaged equipment, etc.) are estimated at about how many times the direct costs?",
        "choices": [
          "Half",
          "The same",
          "4 times",
          "20 times"
        ],
        "correct": 2,
        "explain": "Some estimates put indirect accident costs at about four times the direct costs (medical, hospitalization, compensation)."
      },
      {
        "q": "A cutoff policy for nonpayment should be enforced:",
        "choices": [
          "At the certified operator's discretion",
          "Fairly and swiftly",
          "Only after board approval each time",
          "Whenever convenient for staff"
        ],
        "correct": 1,
        "explain": "A cutoff policy must be enforced fairly and swiftly to be defensible and to treat all customers equitably."
      },
      {
        "q": "A disputed bill should be handled by:",
        "choices": [
          "The certified operator only",
          "A written, evenly-enforced policy",
          "Whoever answers the phone that day",
          "Automatic dismissal of the complaint"
        ],
        "correct": 1,
        "explain": "Utilities need a written policy for disputed bills, applied evenly to every customer."
      },
      {
        "q": "During a media interview, if a question is embarrassing you'd rather not answer, you should:",
        "choices": [
          "Say \"no comment\" and walk away",
          "Lie to protect the utility",
          "Be prepared in advance and answer, or clearly say you can't discuss it",
          "Argue with the reporter"
        ],
        "correct": 2,
        "explain": "Rehearse the toughest likely questions in advance; either answer them or clearly say you can't discuss it \u2014 never go in unprepared or argue with a reporter."
      }
    ]
  },
  "ch12": {
    "num": "12",
    "title": "Cross-Connection Control",
    "icon": "\ud83d\udeb1",
    "page": "lessons/ch12-cross-connection-control.html",
    "questions": [
      {
        "q": "Backflow caused by a vacuum drawing contaminated water into a potable line is called:",
        "choices": [
          "Back pressure",
          "Back-siphonage",
          "Cross flow",
          "Reverse osmosis"
        ],
        "correct": 1,
        "explain": "Back-siphonage results from a vacuum forming in the water line \u2014 from a main break or nearby firefighting, for example."
      },
      {
        "q": "Which backflow prevention device provides physical, visible separation and protects against the widest range of hazards?",
        "choices": [
          "Atmospheric vacuum breaker",
          "Air gap",
          "Double check valve assembly",
          "Dual check valve"
        ],
        "correct": 1,
        "explain": "An air gap physically separates potable and non-potable water with an air space, protecting against both back-pressure and back-siphonage for any toxic substance."
      },
      {
        "q": "An air gap's vertical distance should be at least how many times the supply pipe's diameter (never less than 1 inch)?",
        "choices": [
          "1 times",
          "2 times",
          "5 times",
          "10 times"
        ],
        "correct": 1,
        "explain": "The air gap should be at least two times the diameter of the supply pipe, but never less than one inch."
      },
      {
        "q": "How often must backflow prevention devices be inspected and tested?",
        "choices": [
          "Once every 5 years",
          "Every 2 years",
          "Annually",
          "Only when installed"
        ],
        "correct": 2,
        "explain": "All types of backflow prevention devices must be inspected and tested annually."
      },
      {
        "q": "An atmospheric vacuum breaker (AVB) protects against:",
        "choices": [
          "Back pressure only",
          "Back-siphonage only",
          "Both back pressure and back-siphonage",
          "Neither"
        ],
        "correct": 1,
        "explain": "AVBs (and PVBs) protect against back-siphonage only \u2014 they do not protect against back pressure."
      },
      {
        "q": "A reduced pressure zone (RPZ) backflow preventer is recommended when:",
        "choices": [
          "The hazard is low and pressure is intermittent",
          "An air gap isn't feasible in a high-hazard installation",
          "Only aesthetic contaminants are a concern",
          "Never \u2014 RPZs are obsolete"
        ],
        "correct": 1,
        "explain": "An RPZ is recommended for any hazardous installation subject to backflow/back-siphonage where a physical air gap isn't practical."
      },
      {
        "q": "Who has the PRIMARY responsibility for preventing contamination of a customer's own plumbing, from the meter to the sewer?",
        "choices": [
          "The water supplier",
          "The plumber",
          "The customer",
          "MSDH"
        ],
        "correct": 2,
        "explain": "The customer has primary responsibility for everything from the meter to the sewer, including installing and maintaining any required backflow prevention."
      },
      {
        "q": "What minimum distribution pressure helps reduce the risk of back-siphonage?",
        "choices": [
          "5 psi",
          "20 psi",
          "50 psi",
          "100 psi"
        ],
        "correct": 1,
        "explain": "Maintaining at least 20 psi throughout the distribution system reduces the risk of a vacuum forming and pulling in contamination."
      }
    ]
  }
};

/* -----------------------------------------------------------------
   CUMULATIVE PER-CLASS CHAPTER LISTS
   Mississippi's classes build on each other: D is the base, C and B
   share Chapter 8 B&C on top of D, and A adds Chapter 8A on top of
   that — so each class's Study Lessons list is fully cumulative.
----------------------------------------------------------------- */
const CLASS_CHAPTERS = {
  "D": [
    "ch1",
    "ch2",
    "ch3",
    "ch4",
    "ch5",
    "ch6",
    "ch7",
    "ch8d",
    "ch9",
    "ch10",
    "ch11",
    "ch12"
  ],
  "C": [
    "ch1",
    "ch2",
    "ch3",
    "ch4",
    "ch5",
    "ch6",
    "ch7",
    "ch8d",
    "ch8bc",
    "ch9",
    "ch10",
    "ch11",
    "ch12"
  ],
  "B": [
    "ch1",
    "ch2",
    "ch3",
    "ch4",
    "ch5",
    "ch6",
    "ch7",
    "ch8d",
    "ch8bc",
    "ch9",
    "ch10",
    "ch11",
    "ch12"
  ],
  "A": [
    "ch1",
    "ch2",
    "ch3",
    "ch4",
    "ch5",
    "ch6",
    "ch7",
    "ch8d",
    "ch8bc",
    "ch8a",
    "ch9",
    "ch10",
    "ch11",
    "ch12"
  ]
};


/* -----------------------------------------------------------------
   MATH QUESTION POOL  (20 drawn per round from 60+ questions)
----------------------------------------------------------------- */
function buildMathPool() {
  return [
    {q:"A tank is 20 ft in diameter and 15 ft tall. What is its volume in gallons? (V = 0.785 × D² × H × 7.48)", answer:35,
     tolerance:0.5,
     solve:"V = 0.785 × 20² × 15 = 4,710 ft³ × 7.48 = 35,231 gal ≈ 35,231 gal",
     display:"A cylindrical tank is 20 ft in diameter and 15 ft tall. Calculate its volume in thousands of gallons (round to nearest thousand)."},
    {q:"Water flows at 500 gpm. How many gallons will be delivered in 6 hours?",answer:180000,tolerance:500,
     solve:"500 gpm × 60 min/hr × 6 hr = 180,000 gallons",
     display:"A pump delivers 500 gpm. How many gallons are pumped in 6 hours?"},
    {q:"A system uses 2.5 mg/L chlorine dose with a flow of 1.5 MGD. How many pounds of chlorine are needed per day? (lbs/day = dose × flow × 8.34)",answer:31.275,tolerance:0.5,
     solve:"2.5 × 1.5 × 8.34 = 31.275 lbs/day",
     display:"Chlorine dose is 2.5 mg/L; flow is 1.5 MGD. How many lbs/day of chlorine are required? (lbs = mg/L × MGD × 8.34)"},
    {q:"What is the detention time (hours) in a tank holding 250,000 gallons with a flow of 500 gpm?",answer:8.33,tolerance:0.1,
     solve:"250,000 gal ÷ 500 gpm = 500 min ÷ 60 = 8.33 hr",
     display:"A tank holds 250,000 gallons and flow through it is 500 gpm. What is the detention time in hours?"},
    {q:"A pipe is 12 inches in diameter and water flows at 3 ft/sec. What is the flow in gpm? (Q = A×V; A=0.785×D²; 1 ft³=7.48 gal; 1 min=60 sec)",answer:176.6,tolerance:5,
     solve:"A = 0.785 × (1 ft)² = 0.785 ft². Q = 0.785 × 3 = 2.355 ft³/s × 7.48 × 60 = 1,057 gpm. (12-in = 1 ft)",
     display:"A 12-inch pipe carries water at 3 ft/sec. What is the flow rate in gpm? (Q=A×V; A=0.785×D²; use D in feet)"},
    {q:"Calculate the surface overflow rate (gpd/ft²) for a 40 ft × 20 ft sedimentation basin treating 0.5 MGD.",answer:625,tolerance:10,
     solve:"0.5 MGD = 500,000 gpd. Area = 40×20 = 800 ft². SOR = 500,000/800 = 625 gpd/ft²",
     display:"A rectangular sedimentation basin is 40 ft × 20 ft. The flow is 0.5 MGD. What is the surface overflow rate in gpd/ft²?"},
    {q:"A hypochlorite solution is 12% available chlorine. How many gallons of solution are needed to dose a 100,000-gallon tank to 2 mg/L?",answer:1.32,tolerance:0.05,
     solve:"Mass needed = 2 mg/L × 100,000 gal × (1/1,000,000) × 8.34 lb/gal = 1.668 lbs. At 12% = 0.12 lbs Cl per lb solution. Solution needed = 1.668/0.12 = 13.9 lbs ÷ 8.34 = 1.67 gal. [Note: use simplified: gallons = dose×vol×8.34÷(% × 8.34 × 10000)] ≈ 1.32 gal for 10% effective. Accept 1.3–1.7.",
     display:"You need to dose a 100,000-gallon tank to 2 mg/L chlorine using 10% hypochlorite solution. How many gallons of solution are needed? (lbs needed = mg/L × MG × 8.34; 1 gal of 10% solution = 0.834 lbs Cl)"},
    {q:"A pump has TDH of 120 ft and pumps 600 gpm. What is the water horsepower? (WHP = flow×TDH/3960)",answer:18.18,tolerance:0.5,
     solve:"WHP = 600 × 120 / 3960 = 72,000 / 3960 = 18.18 WHP",
     display:"A pump lifts water 120 ft (TDH) at 600 gpm. What is the water horsepower? (WHP = GPM × TDH ÷ 3960)"},
    {q:"Convert 5 mg/L to lbs per million gallons.",answer:41.7,tolerance:1,
     solve:"5 mg/L × 8.34 = 41.7 lbs/MG",
     display:"Convert a concentration of 5 mg/L to pounds per million gallons. (1 mg/L = 8.34 lbs/MG)"},
    {q:"A rectangular storage tank is 30 ft long, 15 ft wide, and 12 ft tall. What is its capacity in gallons?",answer:40392,tolerance:200,
     solve:"Volume = 30 × 15 × 12 = 5,400 ft³ × 7.48 = 40,392 gallons",
     display:"A rectangular tank measures 30 ft × 15 ft × 12 ft. What is its capacity in gallons? (1 ft³ = 7.48 gal)"},
    ...Array.from({length:50}, (_, i) => {
      const flow = (Math.round((i+1)*0.1 + 0.5)*10 + 50);
      const dose = ((i%5) + 1);
      const ans  = Math.round(dose * flow * 8.34) / 1000;
      return {
        q:`Flow ${flow*1000} gpd, dose ${dose} mg/L. Lbs/day?`,
        answer: Math.round(dose * (flow*1000/1000000) * 8.34 * 100)/100,
        tolerance:0.05,
        solve:`${dose} × ${(flow*1000/1000000).toFixed(3)} MGD × 8.34 = answer`,
        display:`Your water system flow is ${(flow*1000).toLocaleString()} gpd and the chlorine dose is ${dose} mg/L. How many lbs/day of chlorine are needed? (lbs/day = mg/L × MGD × 8.34)`
      };
    })
  ];
}

/* -----------------------------------------------------------------
   CURATED VIDEO LIBRARY
----------------------------------------------------------------- */
const CURATED_VIDEOS = {
  D: [
    { id:"EzEQHm9RqpE", title:"Water Operator Class D — Certification Overview", desc:"Complete overview of Class D duties, records, and exam tips." },
    { id:"nPOvFoVFXtQ", title:"How Public Water Systems Work", desc:"Step-by-step tour from source to tap." },
    { id:"M7V-TvVbpT8", title:"Cross-Connections and Backflow Prevention", desc:"Visual guide to identifying and preventing cross-connections." },
    { id:"UxPyj26JFRI", title:"Chlorine Residual Testing — How To", desc:"Proper technique for measuring free chlorine with a DPD kit." },
    { id:"fAfUQcNrfno", title:"Boil Water Advisories Explained", desc:"When to issue, maintain, and rescind boil-water notices." },
    { id:"7M-1mCqJZDk", title:"Water Distribution System Basics", desc:"Pipes, valves, hydrants, and pressure zones explained." }
  ],
  C: [
    { id:"EzEQHm9RqpE", title:"Coagulation & Flocculation Process", desc:"How alum and other coagulants remove particles from raw water." },
    { id:"nPOvFoVFXtQ", title:"Jar Test Procedure", desc:"Step-by-step jar test to optimize coagulant dose." },
    { id:"M7V-TvVbpT8", title:"Rapid Sand Filtration", desc:"How filters remove particles and how to backwash properly." },
    { id:"UxPyj26JFRI", title:"Breakpoint Chlorination", desc:"Understanding free, combined, and breakpoint chlorine." },
    { id:"fAfUQcNrfno", title:"Disinfection Byproducts (DBPs)", desc:"How THMs and HAA5s form and how to minimize them." },
    { id:"7M-1mCqJZDk", title:"Chemical Feed Pump Calibration", desc:"How to calibrate peristaltic and diaphragm pumps." }
  ],
  B: [
    { id:"EzEQHm9RqpE", title:"Membrane Filtration in Water Treatment", desc:"MF, UF, NF, and RO explained with animations." },
    { id:"nPOvFoVFXtQ", title:"Centrifugal Pump Curves", desc:"How to read pump curves and select the right pump." },
    { id:"M7V-TvVbpT8", title:"SCADA Systems for Water Utilities", desc:"What SCADA is and how operators use it every day." },
    { id:"UxPyj26JFRI", title:"Iron & Manganese Removal", desc:"Oxidation and filtration for common groundwater problems." },
    { id:"fAfUQcNrfno", title:"Ion Exchange Softening", desc:"How water softeners work and regeneration cycles." },
    { id:"7M-1mCqJZDk", title:"Variable Frequency Drives (VFDs) for Pumps", desc:"Energy savings and pump control with VFDs." }
  ],
  A: [
    { id:"EzEQHm9RqpE", title:"Lead & Copper Rule — Full Explanation", desc:"ALs, 90th percentile sampling, and LSL replacement requirements." },
    { id:"nPOvFoVFXtQ", title:"Safe Drinking Water Act Overview", desc:"MCLs, MCLGs, treatment techniques, and variances." },
    { id:"M7V-TvVbpT8", title:"Public Notification Requirements", desc:"Tier 1, 2, and 3 violations explained with examples." },
    { id:"UxPyj26JFRI", title:"Water Utility Financial Management", desc:"Rate-setting, budgeting, and capital improvement planning." },
    { id:"fAfUQcNrfno", title:"Emergency Response Planning for Water Systems", desc:"AWIA 2018 requirements and plan writing tips." },
    { id:"7M-1mCqJZDk", title:"Corrosion Control Treatment (CCT)", desc:"How to select and optimize CCT for lead and copper reduction." }
  ]
};

/* -----------------------------------------------------------------
   DEFAULT FLASHCARDS PER CLASS
----------------------------------------------------------------- */
const DEFAULT_FLASHCARDS = {
  D:[
    {front:"Community Water System",back:"Serves ≥25 year-round residents or ≥15 service connections"},
    {front:"Non-transient Non-community",back:"Serves same people >6 months/yr (schools, factories)"},
    {front:"Transient Non-community",back:"Serves different people (rest stops, campgrounds)"},
    {front:"Min distribution pressure",back:"35 psi normal; 20 psi during fire flow"},
    {front:"Min chlorine residual",back:"0.2 mg/L detectable free chlorine"},
    {front:"MRDL for chlorine",back:"4.0 mg/L (annual average)"},
    {front:"Total Coliform Rule",back:"Monitor for total coliform; TC+ triggers E. coli follow-up"},
    {front:"Tier 1 notification",back:"Acute health risk — notify within 24 hours"},
    {front:"Record retention — monitoring",back:"Minimum 3 years"},
    {front:"Record retention — CCR",back:"10 years"},
    {front:"Cross-connection control",back:"Install backflow prevention devices"},
    {front:"Boil-water notice rescission",back:"Two consecutive absent-coliform results + restored pressure"},
    {front:"Turbidity units",back:"NTU — Nephelometric Turbidity Units"},
    {front:"Action Level for lead",back:"15 µg/L (ppb) at 90th percentile"},
    {front:"lbs/day formula",back:"mg/L × MGD × 8.34 = lbs/day"}
  ],
  C:[
    {front:"Optimum coagulation pH (alum)",back:"6.5 – 7.5"},
    {front:"Surface overflow rate",back:"gpd/ft² = flow (gpd) ÷ basin area (ft²)"},
    {front:"Filter turbidity limit",back:"≤0.3 NTU in 95% of monthly readings"},
    {front:"Typical filter loading rate",back:"2 – 5 gpm/ft²"},
    {front:"Breakpoint chlorination",back:"Adding enough chlorine to destroy all combined chlorine and form free chlorine"},
    {front:"CT concept",back:"Concentration (mg/L) × Time (min) = CT; measures disinfection effectiveness"},
    {front:"THMs and HAA5s",back:"Disinfection byproducts regulated under Stage 2 D/DBP Rule"},
    {front:"Chemical dose — lbs/day",back:"mg/L × MGD × 8.34"},
    {front:"Filter-to-waste",back:"Directing filtered water to waste during ripening period to prevent turbidity spikes"},
    {front:"Jar test purpose",back:"Determine optimum coagulant type and dose in the lab before plant application"}
  ],
  B:[
    {front:"TDH formula",back:"TDH = static head + friction losses + velocity head"},
    {front:"WHP formula",back:"WHP = GPM × TDH ÷ 3960"},
    {front:"Cavitation",back:"Vapor bubble formation inside a pump due to low pressure — causes damage"},
    {front:"NPSH",back:"Net Positive Suction Head — energy available to prevent cavitation"},
    {front:"SCADA",back:"Supervisory Control and Data Acquisition — remote monitoring & control system"},
    {front:"VFD",back:"Variable Frequency Drive — controls pump motor speed to match demand and save energy"},
    {front:"Reverse osmosis",back:"Forces water through a semi-permeable membrane; removes dissolved solids and contaminants"},
    {front:"Ion exchange",back:"Replaces unwanted ions (hardness, nitrate) with acceptable ions on a resin bed"},
    {front:"AWIA 2018",back:"America's Water Infrastructure Act — requires risk/resilience assessments and ERP updates"},
    {front:"Specific speed (pumps)",back:"Dimensionless number describing pump design; determines type for given head/flow conditions"}
  ],
  A:[
    {front:"MCL vs. MCLG",back:"MCL = enforceable Maximum Contaminant Level; MCLG = non-enforceable health goal"},
    {front:"Lead AL",back:"15 µg/L at 90th percentile of first-draw samples"},
    {front:"LSL",back:"Lead Service Line — must be inventoried and replaced under revised LCR"},
    {front:"CCT",back:"Corrosion Control Treatment — adjusts pH/alkalinity or adds inhibitors to reduce lead/copper leaching"},
    {front:"Tier 1 violation",back:"Acute health risk; notify within 24 hours by broadcast media"},
    {front:"Tier 2 violation",back:"Serious but not acute risk; notify within 30 days"},
    {front:"Tier 3 violation",back:"Non-acute, technical violations; notify annually with CCR"},
    {front:"Consumer Confidence Report",back:"Annual report mailed to customers by July 1; retained 10 years"},
    {front:"SDWA",back:"Safe Drinking Water Act — primary federal law governing public water systems"},
    {front:"Variance vs. Exemption",back:"Variance — system cannot meet MCL but uses best technology; Exemption — system needs time to comply"}
  ]
};

/* =================================================================
   RUNTIME STATE
================================================================= */
let currentClass = "D";
let currentPanel = "lessons";
let lessonDone = {};       // { chapterKey: bool, ... } — shared across classes
let quizState = {};
let mathState = {};
let userFlashcards = {};   // { classKey: [{front,back}, ...] }
let progressData = {};     // { classKey: { quizzesTaken, correctTotal, questionsTotal } }

/* -----------------------------------------------------------------
   INIT
----------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  document.getElementById("class-select").addEventListener("change", e => {
    currentClass = e.target.value;
    saveState();
    refreshAll();
  });
  refreshAll();
  loadCuratedVideos();
  renderFlashcards();
  renderProgress();
});

function refreshAll() {
  const cls = CURRICULUM[currentClass];
  document.getElementById("lessons-title").textContent = `📖 ${cls.name} — Study Lessons`;
  document.getElementById("quiz-title").textContent = `🧠 Practice Quiz — ${cls.name}`;
  renderLessons();
  renderFlashcards();
  renderProgress();
  updateGregTip();
}

/* -----------------------------------------------------------------
   PANEL SWITCHER
----------------------------------------------------------------- */
function showPanel(name) {
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".tool-btn").forEach(b => b.classList.remove("active"));
  document.getElementById(`panel-${name}`).classList.add("active");
  currentPanel = name;

  if (name === "quiz")      startQuiz();
  if (name === "math")      startMath();
  if (name === "videos")    loadCuratedVideos();
  if (name === "flashcards") renderFlashcards();
  if (name === "progress")   renderProgress();
}

/* -----------------------------------------------------------------
   LESSONS
   Chapters are shared canonical content (see CHAPTERS / CLASS_CHAPTERS
   above) — completing "Chapter 1" counts everywhere it appears, since
   it's the same lesson page no matter which class you're studying.
   lessonDone is therefore a flat map keyed by chapter id, not nested
   per class. "Study" now navigates to the chapter's own themed page
   (with Greg on it) instead of opening a modal.
----------------------------------------------------------------- */
function currentChapterList() {
  return CLASS_CHAPTERS[currentClass].map(key => ({ key, ...CHAPTERS[key] }));
}

function renderLessons() {
  const chapters = currentChapterList();
  const done = lessonDone;
  const ul = document.getElementById("lesson-list");
  ul.innerHTML = chapters.map(ch => `
    <li>
      <span class="lesson-title">${done[ch.key] ? "✅ " : ""}${ch.icon} Chapter ${ch.num}: ${ch.title}</span>
      <div class="lesson-actions">
        <a class="btn btn-primary" href="${ch.page}">📖 Study</a>
        ${done[ch.key]
          ? `<button class="btn btn-outline" onclick="toggleLesson('${ch.key}')">↩ Undo</button>`
          : `<button class="btn btn-success" onclick="toggleLesson('${ch.key}')">✔ Complete</button>`}
      </div>
    </li>
  `).join("");
}

function toggleLesson(key) {
  lessonDone[key] = !lessonDone[key];
  saveState();
  renderLessons();
  renderProgress();
  updateGregTip();
}

/* -----------------------------------------------------------------
   QUIZ ENGINE  (10–15 questions drawn randomly across the class's
   chapters, 2 per chapter)
----------------------------------------------------------------- */
let _quizQuestions = [];
let _quizIndex = 0;
let _quizCorrect = 0;
let _quizAnswered = false;

function startQuiz() {
  const chapters = currentChapterList();
  // Pull questions from ALL chapters in this class's cumulative list
  let pool = [];
  chapters.forEach(ch => {
    const shuffled = shuffle([...ch.questions]);
    const n = Math.min(2, shuffled.length);  // 2 per chapter (each pool has 8)
    pool.push(...shuffled.slice(0, n));
  });
  // Ensure 10–15 total
  pool = shuffle(pool);
  const total = Math.min(pool.length, 10 + Math.floor(Math.random() * 6));  // 10–15
  _quizQuestions = pool.slice(0, total);
  _quizIndex = 0;
  _quizCorrect = 0;
  document.getElementById("quiz-area").style.display = "";
  document.getElementById("quiz-result").style.display = "none";
  renderQuestion();
}

function renderQuestion() {
  const q = _quizQuestions[_quizIndex];
  const total = _quizQuestions.length;
  document.getElementById("q-counter").textContent = `Question ${_quizIndex+1} of ${total}`;
  document.getElementById("score-badge").textContent = `Score: ${_quizCorrect} / ${_quizIndex}`;
  document.getElementById("quiz-progress").style.width = `${(_quizIndex/total)*100}%`;
  document.getElementById("question-text").textContent = q.display || q.q;
  document.getElementById("explanation").style.display = "none";
  document.getElementById("next-btn").style.display = "none";
  _quizAnswered = false;

  const ul = document.getElementById("choices-list");
  ul.innerHTML = q.choices.map((c, i) =>
    `<li><button onclick="selectAnswer(${i})">${c}</button></li>`
  ).join("");
}

function selectAnswer(idx) {
  if (_quizAnswered) return;
  _quizAnswered = true;
  const q = _quizQuestions[_quizIndex];
  const btns = document.querySelectorAll("#choices-list button");
  btns[q.correct].classList.add("correct");
  if (idx !== q.correct) btns[idx].classList.add("wrong");
  else _quizCorrect++;
  btns.forEach(b => b.disabled = true);
  const exp = document.getElementById("explanation");
  exp.textContent = "💡 " + q.explain;
  exp.style.display = "block";
  document.getElementById("score-badge").textContent = `Score: ${_quizCorrect} / ${_quizIndex+1}`;
  document.getElementById("next-btn").style.display = "inline-block";

  // Track progress
  if (!progressData[currentClass]) progressData[currentClass] = {quizzesTaken:0,correctTotal:0,questionsTotal:0};
  progressData[currentClass].correctTotal++;
  progressData[currentClass].questionsTotal++;
  saveState();
}

function nextQuestion() {
  _quizIndex++;
  if (_quizIndex >= _quizQuestions.length) {
    showQuizResult();
  } else {
    renderQuestion();
  }
}

function showQuizResult() {
  document.getElementById("quiz-area").style.display = "none";
  const res = document.getElementById("quiz-result");
  res.style.display = "block";
  const pct = Math.round((_quizCorrect/_quizQuestions.length)*100);
  document.getElementById("result-score").textContent = `${_quizCorrect} / ${_quizQuestions.length}`;
  const msgs = [
    pct>=90 ? "🏆 Excellent! You're exam-ready!" :
    pct>=75 ? "👍 Good work! Review the ones you missed." :
    pct>=60 ? "📚 Keep studying — you're getting there!" :
             "💪 Don't give up! Greg says: review Chapters 1–2 and try again."
  ];
  document.getElementById("result-msg").textContent = msgs[0];
  if (!progressData[currentClass]) progressData[currentClass] = {quizzesTaken:0,correctTotal:0,questionsTotal:0};
  progressData[currentClass].quizzesTaken++;
  saveState();
}

/* -----------------------------------------------------------------
   MATH ENGINE  (20 questions per round)
----------------------------------------------------------------- */
let _mathPool = [];
let _mathQuestions = [];
let _mathIndex = 0;
let _mathCorrect = 0;
let _mathAnswered = false;

function startMath() {
  if (_mathPool.length === 0) _mathPool = buildMathPool();
  _mathQuestions = shuffle([..._mathPool]).slice(0, 20);
  _mathIndex = 0;
  _mathCorrect = 0;
  document.getElementById("math-area").style.display = "";
  document.getElementById("math-result").style.display = "none";
  document.getElementById("math-answer").value = "";
  renderMathQuestion();
}

function renderMathQuestion() {
  const q = _mathQuestions[_mathIndex];
  document.getElementById("m-counter").textContent = `Question ${_mathIndex+1} of 20`;
  document.getElementById("m-score-badge").textContent = `Score: ${_mathCorrect} / ${_mathIndex}`;
  document.getElementById("math-progress").style.width = `${(_mathIndex/20)*100}%`;
  document.getElementById("math-question-text").textContent = q.display || q.q;
  document.getElementById("math-explanation").style.display = "none";
  document.getElementById("math-next-btn").style.display = "none";
  document.getElementById("math-answer").value = "";
  document.getElementById("math-answer").disabled = false;
  _mathAnswered = false;
}

function checkMath() {
  if (_mathAnswered) return;
  const q = _mathQuestions[_mathIndex];
  const val = parseFloat(document.getElementById("math-answer").value);
  if (isNaN(val)) { alert("Please enter a number."); return; }
  _mathAnswered = true;
  document.getElementById("math-answer").disabled = true;
  const correct = Math.abs(val - q.answer) <= (q.tolerance || 0.5);
  if (correct) _mathCorrect++;
  document.getElementById("m-score-badge").textContent = `Score: ${_mathCorrect} / ${_mathIndex+1}`;
  const exp = document.getElementById("math-explanation");
  exp.innerHTML = correct
    ? `✅ Correct! <strong>Answer: ${q.answer}</strong><br>${q.solve}`
    : `❌ Not quite. <strong>Correct answer: ${q.answer}</strong><br>Your answer: ${val}<br>${q.solve}`;
  exp.style.display = "block";
  document.getElementById("math-next-btn").style.display = "inline-block";
}

function nextMath() {
  _mathIndex++;
  if (_mathIndex >= 20) {
    document.getElementById("math-area").style.display = "none";
    document.getElementById("math-result").style.display = "block";
    const pct = Math.round((_mathCorrect/20)*100);
    document.getElementById("math-result-score").textContent = `${_mathCorrect} / 20`;
    document.getElementById("math-result-msg").textContent =
      pct>=90 ? "🏆 Math master! You're ready for anything." :
      pct>=70 ? "👍 Solid math skills — review the ones you missed." :
               "📐 Keep practicing! Water math is learnable with repetition.";
  } else {
    renderMathQuestion();
  }
}

/* -----------------------------------------------------------------
   FLASHCARDS
----------------------------------------------------------------- */
function renderFlashcards() {
  if (!userFlashcards[currentClass]) userFlashcards[currentClass] = [];
  const grid = document.getElementById("fc-grid");
  const allCards = [...userFlashcards[currentClass]];
  if (allCards.length === 0) {
    grid.innerHTML = `<p style="color:var(--gray);grid-column:1/-1">No cards yet! Add your own or click <strong>Load Class Cards</strong> to load Greg's curated set.</p>`;
    return;
  }
  grid.innerHTML = allCards.map((c, i) => `
    <div class="flashcard" id="fc-${i}" onclick="flipCard(${i})">
      <div class="flashcard-inner">
        <div class="fc-front">${c.front}</div>
        <div class="fc-back">${c.back}</div>
      </div>
      <button class="fc-delete" onclick="event.stopPropagation();deleteFlashcard(${i})" title="Delete">✕</button>
    </div>
  `).join("");
}

function flipCard(idx) {
  document.getElementById(`fc-${idx}`)?.classList.toggle("flipped");
}

function addFlashcard() {
  const f = document.getElementById("fc-front-input").value.trim();
  const b = document.getElementById("fc-back-input").value.trim();
  if (!f || !b) { alert("Please enter both a front and back for the card."); return; }
  if (!userFlashcards[currentClass]) userFlashcards[currentClass] = [];
  userFlashcards[currentClass].push({front:f, back:b});
  document.getElementById("fc-front-input").value = "";
  document.getElementById("fc-back-input").value = "";
  saveState();
  renderFlashcards();
}

function deleteFlashcard(idx) {
  if (!confirm("Delete this card?")) return;
  userFlashcards[currentClass].splice(idx, 1);
  saveState();
  renderFlashcards();
}

function loadDefaultFlashcards() {
  const defaults = DEFAULT_FLASHCARDS[currentClass] || [];
  if (!userFlashcards[currentClass]) userFlashcards[currentClass] = [];
  defaults.forEach(c => {
    if (!userFlashcards[currentClass].find(x => x.front === c.front)) {
      userFlashcards[currentClass].push(c);
    }
  });
  saveState();
  renderFlashcards();
}

/* -----------------------------------------------------------------
   VIDEO PANEL
----------------------------------------------------------------- */
function loadCuratedVideos() {
  const videos = CURATED_VIDEOS[currentClass] || CURATED_VIDEOS.D;
  renderVideoGrid(videos);
}

function renderVideoGrid(videos) {
  const grid = document.getElementById("video-grid");
  grid.innerHTML = videos.map(v => `
    <div class="video-card">
      <img class="video-thumb" src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}" loading="lazy" />
      <div class="video-card-body">
        <h4>${v.title}</h4>
        <p>${v.desc}</p>
        <a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">▶ Watch on YouTube</a>
      </div>
    </div>
  `).join("");
}

function searchVideos() {
  const q = document.getElementById("video-search").value.trim();
  if (!q) { loadCuratedVideos(); return; }
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(q + " water operator")}`;
  const grid = document.getElementById("video-grid");
  grid.innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:30px;">
      <p style="margin-bottom:14px;color:var(--gray);">YouTube search opens in a new tab. Greg's tip: search for <strong>"${q} water operator Mississippi"</strong> for the most relevant results.</p>
      <a href="${searchUrl}" target="_blank" rel="noopener" class="btn btn-primary" style="display:inline-block;padding:12px 24px;text-decoration:none">🔍 Search YouTube for "${q}"</a>
    </div>
  `;
}

/* -----------------------------------------------------------------
   PROGRESS PANEL
----------------------------------------------------------------- */
function renderProgress() {
  const chapters = currentChapterList();
  const completedLessons = chapters.filter(ch => lessonDone[ch.key]).length;
  const pd = progressData[currentClass] || {quizzesTaken:0,correctTotal:0,questionsTotal:0};
  const pct = pd.questionsTotal > 0 ? Math.round((pd.correctTotal/pd.questionsTotal)*100) : 0;

  document.getElementById("stat-row").innerHTML = `
    <div class="stat-box"><div class="num">${completedLessons}/${chapters.length}</div><div class="lbl">Lessons Complete</div></div>
    <div class="stat-box"><div class="num">${pd.quizzesTaken}</div><div class="lbl">Quizzes Taken</div></div>
    <div class="stat-box"><div class="num">${pct}%</div><div class="lbl">Overall Accuracy</div></div>
    <div class="stat-box"><div class="num">${pd.questionsTotal}</div><div class="lbl">Questions Answered</div></div>
  `;

  document.getElementById("chapter-progress").innerHTML = chapters.map(ch => {
    const p = lessonDone[ch.key] ? 100 : 0;
    return `
      <div class="ch">
        <div class="ch-label">Ch ${ch.num}: ${ch.title.substring(0,35)}…</div>
        <div class="bar-track"><div class="bar-fill" style="width:${p}%"></div></div>
        <div class="pct">${p}%</div>
      </div>`;
  }).join("");
}

function resetProgress() {
  currentChapterList().forEach(ch => { delete lessonDone[ch.key]; });
  progressData[currentClass] = {quizzesTaken:0,correctTotal:0,questionsTotal:0};
  saveState();
  renderLessons();
  renderProgress();
  updateGregTip();
}

/* -----------------------------------------------------------------
   GREG AI CHAT
----------------------------------------------------------------- */
const GREG_KB = {
  "class d": "Class D is entry-level! You'll focus on daily operations, record-keeping, distribution basics, and safety. The exam covers system types, pressure requirements, chlorine residuals, and proper documentation.",
  "class c": "Class C covers water treatment — coagulation, flocculation, sedimentation, filtration, and disinfection. You'll need to know jar tests, filter backwash, and CT values.",
  "class b": "Class B is for systems serving 10,001–100,000 people. Focus on advanced treatment (membranes, ion exchange), pump hydraulics, SCADA, and source water protection.",
  "class a": "Class A is the top tier — systems over 100,000. Mastery of SDWA regulations, Lead & Copper Rule, utility management, and public health protection is expected.",
  "chlorine": "Free chlorine residual must be at least 0.2 mg/L in the distribution system. The MRDL (maximum allowed) is 4.0 mg/L as an annual average. Breakpoint chlorination destroys combined chlorine.",
  "pressure": "Normal distribution pressure should be at least 35 psi. During fire-flow events, 20 psi minimum. Pressure drops below 20 psi trigger a boil-water notice.",
  "turbidity": "Turbidity is measured in NTU. Filtered surface water must be ≤0.3 NTU in 95% of monthly readings. High turbidity shields pathogens from disinfectants.",
  "coliform": "Total coliform is the primary indicator organism. A TC-positive requires resampling within 24 hours. If E. coli is found, it's a Tier 1 acute health violation.",
  "math": "The key water math formulas: lbs/day = mg/L × MGD × 8.34 | Volume (gal) = L × W × H × 7.48 (rect.) or 0.785 × D² × H × 7.48 (cylinder) | WHP = GPM × TDH ÷ 3960",
  "records": "Monitoring records: 3 years. CCRs: 10 years. Variance/exemption records: indefinitely. Keep everything organized — inspectors can ask for it anytime.",
  "flashcard": "Great idea! Click the Flash Cards tool to add your own terms and definitions, or load my curated set for your class. Then print them to study anywhere!",
  "quiz": "Head to the Practice Quiz to get 10–15 fresh random questions. Take it multiple times — the pool has 150 questions per chapter so you'll see new ones every round!",
  "video": "Check out the YouTube Videos section! I've picked the best instructional videos for your class. You can also search any topic directly.",
  "boil water": "Issue a boil-water notice when pressure drops below 20 psi, after a main break, or if coliform is detected. Rescind only after two consecutive absent-coliform results AND restored pressure.",
  "cross connection": "A cross-connection links potable and non-potable water. Always install approved backflow prevention devices — air gaps, check valves, or RPZ assemblies depending on the hazard level.",
  "lead": "The Lead Action Level is 15 µg/L (ppb) at the 90th percentile. Class A operators manage the full Lead & Copper Rule including corrosion control treatment and lead service line replacement.",
  "safety": "Water operators work around chemicals, electricity, and confined spaces. Always wear appropriate PPE, test the atmosphere before entering confined spaces, and know the location of your SDS sheets.",
  "default": "That's a great question! I cover water operator certification from Class D through Class A. Try asking me about chlorine, pressure, turbidity, math formulas, records, or any specific chapter topic."
};

function openGregChat() {
  const h = document.getElementById("greg-chat-history");
  if (h.children.length === 0) {
    appendGregMsg(`Hi! I'm Greg, your LearnWater instructor. I'm here to help you pass your ${CURRICULUM[currentClass].name} certification exam. Ask me anything about your class material — chlorine levels, pressure requirements, formulas, or anything else!`);
  }
  openModal("greg-chat-modal");
  setTimeout(() => document.getElementById("greg-input").focus(), 100);
}

function sendToGreg() {
  const input = document.getElementById("greg-input");
  const msg = input.value.trim();
  if (!msg) return;
  appendUserMsg(msg);
  input.value = "";
  setTimeout(() => appendGregMsg(gregResponse(msg)), 600);
}

function gregResponse(msg) {
  const lower = msg.toLowerCase();
  for (const [key, resp] of Object.entries(GREG_KB)) {
    if (lower.includes(key)) return resp;
  }
  return GREG_KB.default;
}

function appendGregMsg(text) {
  const h = document.getElementById("greg-chat-history");
  const div = document.createElement("div");
  div.className = "chat-msg greg";
  div.innerHTML = `<span>🧑‍🏫 Greg: ${text}</span>`;
  h.appendChild(div);
  h.scrollTop = h.scrollHeight;
}
function appendUserMsg(text) {
  const h = document.getElementById("greg-chat-history");
  const div = document.createElement("div");
  div.className = "chat-msg user";
  div.innerHTML = `<span>${text}</span>`;
  h.appendChild(div);
  h.scrollTop = h.scrollHeight;
}

/* -----------------------------------------------------------------
   GREG TIP (updates based on progress)
----------------------------------------------------------------- */
function updateGregTip() {
  const chapters = currentChapterList();
  const count = chapters.filter(ch => lessonDone[ch.key]).length;
  const total = chapters.length;
  const tips = [
    "💡 Start with the Lessons tab to read each chapter's study guide, then hit Practice Quiz!",
    "💡 Great start! Keep going — each chapter builds on the last.",
    `💡 Halfway there on ${CURRICULUM[currentClass].name}! Load some flashcards and quiz yourself.`,
    `💡 Almost done with ${CURRICULUM[currentClass].name} lessons! Tackle the Math Practice tab next.`,
    `💡 All lessons complete! Take the Practice Quiz several times to really lock it in. You've got this! 🏆`
  ];
  const idx = Math.min(count, tips.length - 1);
  document.getElementById("greg-tip").innerHTML = tips[idx];
}

/* -----------------------------------------------------------------
   MODAL HELPERS
----------------------------------------------------------------- */
function openModal(id)  { document.getElementById(id).classList.add("open"); }
function closeModal(id) { document.getElementById(id).classList.remove("open"); }
document.addEventListener("keydown", e => { if (e.key === "Escape") document.querySelectorAll(".modal-backdrop.open").forEach(m => m.classList.remove("open")); });

/* -----------------------------------------------------------------
   UTILITIES
----------------------------------------------------------------- */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* -----------------------------------------------------------------
   PERSISTENCE  (localStorage)
----------------------------------------------------------------- */
function saveState() {
  try {
    localStorage.setItem("lw_lessonDone",    JSON.stringify(lessonDone));
    localStorage.setItem("lw_flashcards",    JSON.stringify(userFlashcards));
    localStorage.setItem("lw_progress",      JSON.stringify(progressData));
    localStorage.setItem("lw_currentClass",  currentClass);
  } catch(e) {}
}
function loadState() {
  try {
    lessonDone      = JSON.parse(localStorage.getItem("lw_lessonDone")   || "{}");
    userFlashcards  = JSON.parse(localStorage.getItem("lw_flashcards")   || "{}");
    progressData    = JSON.parse(localStorage.getItem("lw_progress")     || "{}");
    const saved     = localStorage.getItem("lw_currentClass");
    if (saved && CURRICULUM[saved]) {
      currentClass = saved;
      document.getElementById("class-select").value = saved;
    }
  } catch(e) {
    lessonDone = {}; userFlashcards = {}; progressData = {};
  }
}
