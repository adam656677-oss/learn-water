/* =================================================================
   lesson-common.js
   Shared behavior for Study Lesson chapter pages: Greg mini-chat and
   chapter-complete tracking. Each page defines LESSON_ID (e.g. "ch1")
   and optionally LESSON_PROMPTS (array of quick-ask strings) before
   loading this file.
================================================================= */

/* -----------------------------------------------------------------
   CHAPTER-COMPLETE TRACKING
   Shared with adult-learning-center.js via the same localStorage key.
   Shape: { ch1:true, ch2:false, ... } — flat, since a chapter is the
   same lesson no matter which class is currently studying it.
----------------------------------------------------------------- */
function lw_loadDone() {
  try { return JSON.parse(localStorage.getItem("lw_lessonDone") || "{}"); }
  catch (e) { return {}; }
}
function lw_saveDone(done) {
  try { localStorage.setItem("lw_lessonDone", JSON.stringify(done)); } catch (e) {}
}

function initCompleteButton() {
  const btn = document.getElementById("complete-btn");
  if (!btn || typeof LESSON_ID === "undefined") return;
  const render = () => {
    const done = lw_loadDone();
    if (done[LESSON_ID]) {
      btn.textContent = "✅ Completed — mark incomplete";
      btn.classList.add("done");
    } else {
      btn.textContent = "☐ Mark this chapter complete";
      btn.classList.remove("done");
    }
  };
  btn.addEventListener("click", () => {
    const done = lw_loadDone();
    done[LESSON_ID] = !done[LESSON_ID];
    lw_saveDone(done);
    render();
  });
  render();
}

/* -----------------------------------------------------------------
   GREG MINI-CHAT
   Same lightweight keyword-matching engine as the main Adult Learning
   Center, so Greg answers consistently everywhere he appears.
----------------------------------------------------------------- */
const GREG_KB = {
  "public water system": "Three types: community (year-round residents, 15+ connections or 25+ people), nontransient noncommunity (same 25+ people, 6+ months/year — schools, factories), and transient noncommunity (different people — rest stops, restaurants, parks).",
  "mcl": "An MCL (Maximum Contaminant Level) is the enforceable limit — water samples must meet it. An MCLG (MCL Goal) is a non-enforceable health-based goal, set at zero for carcinogens. A treatment technique is required instead of an MCL when a contaminant is hard or costly to measure directly.",
  "variance": "A variance or exemption lets a system with real technical or financial trouble keep supplying water for a limited time, as long as it proves there's no threat to public health. They're rare and hard to get.",
  "tier 1": "Tier 1 violations are the serious kind — failing to meet an MCL, a treatment technique, or a variance/exemption schedule. They require the most urgent, most extensive public notification.",
  "aquifer": "A confined aquifer has an impervious layer above and below, so the water is under pressure. If water rises above the top of the aquifer when a well taps it, that's artesian; if it overflows the casing, that's a flowing artesian well. An unconfined (water table) aquifer has no impervious cap and is more exposed to surface contamination.",
  "specific capacity": "Specific capacity = pumping rate (gpm) ÷ drawdown (ft). It tells you how many gallons per minute a well produces for each foot the water level drops.",
  "class d": "Class D is entry-level! You'll focus on daily operations, record-keeping, distribution basics, and safety. The exam covers system types, pressure requirements, chlorine residuals, and proper documentation.",
  "class c": "Class C plants add aeration, pH adjustment, corrosion control, and closed-pressure treatment on top of everything Class D covers.",
  "class b": "Class B plants use two or more treatment types, or iron/manganese removal facilities that break pressure or need flocculation and sedimentation — the same Chapter 8 B&C material as Class C, plus more field experience.",
  "class a": "Class A is the top tier — surface water treatment, lime softening, coagulation and filtration for full treatment. Master everything from D, C, and B first.",
  "chlorine": "Free chlorine residual should be at least 0.2 mg/l through the distribution system — that's the point where you'd collect a coliform sample within 24 hours if you ever read zero. Chlorine demand must be satisfied, then combined residual (chloramines) forms, then breakpoint chlorination gives you a clean free residual.",
  "pressure": "Keep at least 20 psi everywhere in the distribution system, all the time. Drop below that and you're looking at a boil-water notice.",
  "turbidity": "Turbidity shields microorganisms from disinfection and interferes with coliform testing. Settling-basin effluent shouldn't exceed 10 NTU, and filtered water should stay at or below 0.3 NTU 95% of the time.",
  "coliform": "Total coliform is the indicator organism — always present when sewage is present, always absent when it isn't, and easy to test for. A positive sample gets checked for E. coli, which is a Tier 1 acute violation if confirmed.",
  "math": "Key formulas: lbs/day = mg/l x MGD x 8.34 | Area = L x W (rectangle) or 0.785 x D² (circle) | Volume = L x W x H, or 0.785 x D² x H for a cylinder | 1 mg/l = 1 ppm = 8.34 lbs per million gallons.",
  "records": "Chemical analyses and sanitary survey reports: keep for at least 10 years after they're superseded or the report is completed. Variance/exemption records: keep 5 years after expiration.",
  "well": "A confined aquifer has an impervious layer above and below it. If water rises above the top of the aquifer when tapped, that's an artesian aquifer — if it overflows the casing, that's a flowing artesian well.",
  "hardness": "Hardness under 75 mg/l as CaCO3 is soft, 75-150 is moderately hard, 150-200 is hard, and over 200 is very hard. Calcium and magnesium ions cause almost all of it in Mississippi ground water.",
  "alkalinity": "Alkalinity is the water's ability to neutralize acid — mostly from bicarbonate, carbonate, and hydroxide ions. It's essential for good coagulation; low-alkalinity water often needs lime added before the coagulant.",
  "aeration": "Aeration removes carbon dioxide, hydrogen sulfide, and methane, and oxidizes iron and manganese so they can be filtered out. Give it about 30 minutes of detention time for iron/manganese oxidation to finish.",
  "coagulation": "Alum reacts with alkalinity to form aluminum hydroxide floc in one to two seconds — that's why rapid mixing right after dosing is so critical. Trivalent coagulants like alum and ferric sulfate are 700-1000 times more effective than monovalent ones.",
  "filtration": "Rapid sand filters typically run 2 gpm/ft² (single media) to 3 gpm/ft² (dual media). Backwash when head loss hits 7-10 feet, at 15-20 gpm/ft² for sand or 10-15 gpm/ft² for dual media.",
  "fluoride": "The ideal natural fluoride range is 0.8 to 1.2 mg/l. Sodium fluoride, hydrofluosilicic acid, and sodium silicofluoride are the three chemicals used to adjust it.",
  "flashcard": "Head over to the Flash Cards tool on the main Adult Learning Center page — you can add your own or load a curated set for your class.",
  "quiz": "Take the Practice Quiz back on the main Adult Learning Center page for 10-15 randomized questions pulled from every chapter you've unlocked.",
  "boil water": "Issue a boil-water notice when pressure drops below 20 psi, after a main break, or if coliform shows up. Rescind only after two consecutive absent-coliform samples and restored pressure.",
  "cross connection": "A cross-connection links potable and non-potable water. Match the device to the hazard: air gap for the worst hazards, then RPZ, double-check assembly, or a vacuum breaker for lower-hazard, non-continuous-pressure uses.",
  "backflow": "Backflow happens two ways: back-pressure (non-potable pressure exceeds the potable line) or back-siphonage (a vacuum pulls contaminated water in). All prevention devices need annual testing.",
  "safety": "About 88% of workplace accidents come down to a specific unsafe act by an employee — that's why training and a clear safety policy matter more than almost anything else.",
  "default": "Good question! Ask me about chlorine, pressure, turbidity, math formulas, wells, hardness, coagulation, filtration, fluoride, safety, or cross-connections — or anything else from this chapter."
};

function gregResponse(msg) {
  const lower = msg.toLowerCase();
  for (const [key, resp] of Object.entries(GREG_KB)) {
    if (lower.includes(key)) return resp;
  }
  return GREG_KB.default;
}

function initGregMini() {
  const history = document.getElementById("greg-mini-history");
  const input = document.getElementById("greg-mini-input");
  const sendBtn = document.getElementById("greg-mini-send");
  const promptsRow = document.getElementById("greg-mini-prompts");
  if (!history || !input || !sendBtn) return;

  const append = (text, who) => {
    const div = document.createElement("div");
    div.className = "chat-msg " + who;
    div.textContent = (who === "greg" ? "🧑‍🏫 " : "") + text;
    history.appendChild(div);
    history.scrollTop = history.scrollHeight;
  };

  const ask = (msg) => {
    if (!msg.trim()) return;
    append(msg, "user");
    input.value = "";
    setTimeout(() => append(gregResponse(msg), "greg"), 400);
  };

  sendBtn.addEventListener("click", () => ask(input.value));
  input.addEventListener("keydown", e => { if (e.key === "Enter") ask(input.value); });

  if (promptsRow && typeof LESSON_PROMPTS !== "undefined") {
    LESSON_PROMPTS.forEach(p => {
      const b = document.createElement("button");
      b.textContent = p;
      b.addEventListener("click", () => ask(p));
      promptsRow.appendChild(b);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initCompleteButton();
  initGregMini();
});
