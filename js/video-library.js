/* ==========================================================
   LearnWater — curated YouTube library
   Every ID below was checked against YouTube's public index
   (title + channel) in September 2026. The old list reused six
   IDs that don't exist on YouTube for all four license classes.

   To add a video: copy its 11-character ID from the URL
   (youtube.com/watch?v=THIS_PART), then add an entry below.
   `chapters` ties it to lesson pages (chapter ids like "ch5"
   are defined in js/adult-curriculum.js); `topic` drives the
   filter chips.
   ========================================================== */
window.LW_VIDEOS = {
  topics: {
    rules:        'Regulations & the job',
    math:         'Operator math',
    hydraulics:   'Hydraulics & pumps',
    wells:        'Ground water & wells',
    micro:        'Microbiology & sampling',
    lab:          'Lab tests',
    treatment:    'Treatment processes',
    distribution: 'Distribution & storage',
    chlorine:     'Chlorine & safety',
    crossconn:    'Cross-connection control'
  },

  adult: [
    { id: 'iLgpmjoNL10', topic: 'rules', chapters: ['ch1'], source: 'U.S. EPA',
      title: 'Safe Drinking Water Act Turns 50: The Story of a Crucial Law to Protect Public Health',
      desc: 'EPA marks 50 years of the SDWA — why the law was passed and how it protects the water you deliver.' },
    { id: '0Q1MrW1M2cE', topic: 'rules', chapters: ['ch1'], source: 'Explainer series',
      title: 'Safe Drinking Water Act, Explained',
      desc: 'A plain-language overview of what the SDWA regulates and how states and EPA share enforcement.' },
    { id: 'pABK8Di1Y5Q', topic: 'rules', chapters: ['ch2'], source: 'Career overview',
      title: 'Water and Wastewater Treatment Plant and System Operators Career Video',
      desc: 'What operators do day to day, the skills the job takes, and where the career can lead.' },
    { id: 'OKMWS7SnnNw', topic: 'rules', chapters: ['ch2', 'ch11'], source: 'Operator life',
      title: 'Day in the Life of a Water Treatment Plant Operator',
      desc: 'Ride along on a shift with the people who keep treated water flowing day and night.' },

    { id: 'WgplaEIVrPY', topic: 'math', chapters: ['ch3'], source: 'Operator math series · Part 1',
      title: 'Practical math for water treatment plant operators — Part 1',
      desc: 'Exam-style math worked through real daily scenarios at a surface water plant.' },
    { id: 'gH2WydrmDaw', topic: 'math', chapters: ['ch3'], source: 'Operator math series · Part 2',
      title: 'Practical math for water treatment plant operators — Part 2',
      desc: 'More worked plant problems. The series continues through Part 9 on YouTube.' },

    { id: 'XpcCUtYzwy0', topic: 'hydraulics', chapters: ['ch4'], source: 'The Engineering Mindset',
      title: 'Centrifugal Pump Basics',
      desc: 'How the impeller and volute move water, with every major pump part named.' },
    { id: 'aspPJ2Wcaig', topic: 'hydraulics', chapters: ['ch4', 'ch9'], source: 'Practical Engineering',
      title: 'How to Collapse a Pipe by Closing a Valve',
      desc: 'A hands-on water hammer demo — and why valves and hydrants must be closed slowly.' },

    { id: 'bG19b06NG_w', topic: 'wells', chapters: ['ch5'], source: 'Practical Engineering',
      title: 'How Wells & Aquifers Actually Work',
      desc: 'Confined and unconfined aquifers, how wells are built, and how pumping affects groundwater.' },

    { id: 'ASa6QnT6wdc', topic: 'micro', chapters: ['ch6'], source: 'Michigan EGLE',
      title: 'Water Sampling 101 — Total Coliform Sampling',
      desc: 'Collecting a compliance bacteriological sample the right way under the Revised Total Coliform Rule.' },

    { id: 'NHUHfiwqNoQ', topic: 'lab', chapters: ['ch8d', 'ch10'], source: 'Walkerton Clean Water Centre',
      title: 'How-to analyze free chlorine residual',
      desc: 'An operator how-to for measuring free chlorine residual accurately.' },
    { id: '1QWLGyyotiE', topic: 'lab', chapters: ['ch7', 'ch8bc'], source: 'Walkerton Clean Water Centre',
      title: 'How-to analyze turbidity of a drinking water sample',
      desc: 'Proper technique for measuring turbidity (NTU) on a drinking water sample.' },
    { id: 'QFHupsW18-I', topic: 'lab', chapters: ['ch7'], source: 'Walkerton Clean Water Centre',
      title: 'How-to analyze alkalinity in a drinking water sample',
      desc: 'Running an alkalinity test — the buffer that makes coagulation work.' },

    { id: '72uFoBjSqaI', topic: 'treatment', chapters: ['ch8bc', 'ch8a'], source: 'American Water College',
      title: 'Water Treatment | Coagulation Process Operation and Jar Testing',
      desc: 'Coagulation control at the plant: streaming current, enhanced coagulation, pH, and jar testing.' },
    { id: '6cI0E0JIVTk', topic: 'treatment', chapters: ['ch7', 'ch8bc'], source: 'Jar testing',
      title: 'Jar Test Procedure for Water Treatment',
      desc: 'The basics of running a jar test to find the best coagulant dose.' },
    { id: 'vteFTaz-lY4', topic: 'treatment', chapters: ['ch8bc'], source: 'Filter time-lapse',
      title: 'Rapid sand filter backwash — 20-second time-lapse (4K)',
      desc: 'Watch a complete rapid sand filter backwash from start to clear water.' },
    { id: 'q_8ucVkYqf4', topic: 'treatment', chapters: ['ch8a'], source: 'Operator math series',
      title: 'Lime softening Part 1 — practical math for water treatment plant operators',
      desc: 'Lime softening calculations worked step by step — Class A territory.' },

    { id: 'yZwfcMSDBHs', topic: 'distribution', chapters: ['ch9', 'ch4'], source: 'Practical Engineering',
      title: 'How Water Towers Work',
      desc: 'Why elevated storage provides steady pressure, fire flow, and backup when pumps are down.' },

    { id: 'Lg5hM4caqdM', topic: 'chlorine', chapters: ['ch10', 'ch11'], source: 'Operator safety',
      title: 'Chlorine Safety for Water and Wastewater Operators',
      desc: 'Chlorine hazards and safe handling practices every operator should know.' },
    { id: 'ZkkPVe0619Y', topic: 'chlorine', chapters: ['ch10'], source: 'Operator training',
      title: 'Water Treatment Grade 2: Transporting Chlorine Cylinders',
      desc: 'Moving and securing chlorine cylinders safely.' },

    { id: 'wOqx5KP_xfQ', topic: 'crossconn', chapters: ['ch12'], source: 'Distribution exam prep',
      title: 'Backflow, Backpressure and Backsiphonage',
      desc: 'The two ways backflow happens, from a cross-connection control lecture.' },
    { id: 'W3wg11mMfb8', topic: 'crossconn', chapters: ['ch12'], source: 'Backflow devices',
      title: 'RPZ — How it works',
      desc: 'Inside a reduced pressure zone assembly: two check valves with a relief valve between them.' }
  ],

  kids: [
    { id: 'oaDkph9yQBs', source: 'NASA',
      title: "Earth's Water Cycle",
      desc: 'An official NASA animation showing how water moves all around our planet.' },
    { id: 'vD-ZwMjRDPU', source: 'SciShow Kids',
      title: "Water's Amazing Journey",
      desc: 'Squeaks and friends put on a play to act out the whole water cycle.' },
    { id: '5Ssty1ejoek', source: 'SciShow Kids',
      title: 'Where Can We Find Water?',
      desc: 'Where water comes from — and the journey it takes to get to your faucet.' },
    { id: 'Npv47F3GK2w', source: 'SciShow Kids',
      title: 'Keeping Our Water Clean!',
      desc: 'Where rainwater on the street goes, and how we can keep it clean.' },
    { id: '6yCAPAqXodc', source: 'SciShow Kids',
      title: 'How Can I Save Water?',
      desc: 'A leaky faucet mystery with easy ways to save water every day.' },
    { id: 'N_hgiGdMrvM', source: 'Virtual field trip',
      title: 'Drinking Water Treatment Plant Tour for Kids',
      desc: 'Take a tour of a real treatment plant and see how river water becomes tap water.' }
  ]
};
