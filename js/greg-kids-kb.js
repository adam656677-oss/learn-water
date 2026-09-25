/* ==========================================================
   Greg (kids) — water science buddy knowledge base
   Friendly, accurate answers for ages 6–12. Runs entirely in
   the browser; nothing a kid types is sent anywhere.
   ========================================================== */
(function (global) {
  'use strict';

  var E = [
    /* ---------------- Water cycle ---------------- */
    { id: "water-cycle", q: "What is the water cycle?",
      k: ["water cycle:6", "cycle:4", "hydrologic*:5", "where does rain come from:5", "journey:3"],
      a: "The water cycle is water's never-ending road trip! 🌍\n☀️ **Evaporation** — the sun warms water and it rises as invisible vapor.\n☁️ **Condensation** — the vapor cools and turns into tiny droplets that make clouds.\n🌧️ **Precipitation** — heavy clouds drop rain, snow, sleet, or hail.\n🏞️ **Collection** — water gathers in oceans, rivers, lakes, and underground… then it all starts again!",
      more: "Plants are part of it too! 🌱 They drink water through their roots and breathe some out through their leaves — that's **transpiration**. And water can take side trips: frozen in a glacier for 1,000 years, or hidden deep underground in an aquifer.",
      rel: ["evaporation", "condensation", "precipitation"] },
    { id: "evaporation", q: "What is evaporation?",
      k: ["evapor*:6", "water vapor:5", "vapor:4", "puddle*:4", "dry up:4", "disappear*:3"],
      a: "Evaporation is when liquid water warms up and turns into an invisible gas called **water vapor** that floats into the air. ☀️ That's why puddles vanish after the sun comes out, and why wet clothes dry on a clothesline!",
      more: "Heat gives water molecules extra energy, so the fastest ones escape from the surface. Wind and dry air speed it up. About 90% of the water vapor in our air comes from oceans, seas, lakes, and rivers!",
      rel: ["condensation", "water-cycle", "states-of-matter"] },
    { id: "condensation", q: "What is condensation?",
      k: ["condens*:6", "cloud* form*:5", "foggy:3", "fog:3", "water on my glass:5", "cold glass:5", "sweat* glass:4", "dew:4"],
      a: "Condensation is when water vapor cools down and turns back into tiny liquid drops. 💧 High in the sky that makes **clouds**. Down here it makes the drops on the outside of a cold glass of lemonade, fog on a bathroom mirror, and dew on the grass in the morning!",
      rel: ["clouds", "evaporation", "precipitation"] },
    { id: "precipitation", q: "What is precipitation?",
      k: ["precipitat*:6", "why does it rain:5", "rain:4", "raining:4", "snow:3", "sleet:4", "hail:3", "drizzle:4"],
      a: "Precipitation is any water falling from the sky — **rain, snow, sleet, or hail**! 🌧️ Inside a cloud, tiny droplets bump together and grow. When they get too heavy for the air to hold up, gravity pulls them down. One raindrop can be made of about a million tiny cloud droplets!",
      rel: ["raindrops", "snow", "hail"] },
    { id: "collection", q: "Where does rain go after it falls?",
      k: ["collection:6", "where does rain go:6", "after it rains:5", "runoff:5", "soak* into:4", "puddle go:4"],
      a: "Rain takes two main paths! 🏞️ Some runs downhill over the ground into streams, rivers, lakes, and the ocean — that's called **runoff**. The rest **soaks into the ground** and becomes **groundwater**, filling underground layers called **aquifers**. Plants drink some along the way, too.",
      rel: ["groundwater", "rivers", "storm-drains"] },
    { id: "transpiration", q: "What is transpiration?",
      k: ["transpir*:6", "plants breathe:5", "leaves:3", "plant* water:4", "tree* water:4", "stomata:6"],
      a: "Transpiration is how plants 'sweat' water into the air! 🌱 Roots pull water up, and it escapes as vapor through tiny holes in the leaves called **stomata**. A big tree can send hundreds of gallons of water into the air on a hot summer day!",
      rel: ["water-cycle", "plants-need-water", "evaporation"] },
    { id: "clouds", q: "What are clouds made of?",
      k: ["cloud*:5", "cumulus:6", "stratus:6", "cirrus:6", "cumulonimbus:6", "cloud types:6", "fluffy:3"],
      a: "Clouds are made of **billions of tiny water droplets or ice crystals** floating in the air! ☁️ Puffy **cumulus** clouds look like cotton balls, flat gray **stratus** clouds cover the sky like a blanket, wispy **cirrus** clouds are made of ice way up high, and giant **cumulonimbus** clouds bring thunderstorms.",
      more: "Clouds are HEAVY! Scientists estimate that one ordinary puffy cumulus cloud holds about **1.1 million pounds** of water — as much as 100 elephants! 🐘 It floats because the water is spread out into tiny droplets over a huge space, riding on rising air.",
      rel: ["condensation", "precipitation", "rainbows"] },
    { id: "raindrops", q: "What shape is a raindrop?",
      k: ["raindrop*:6", "rain drop*:6", "drop shape:5", "shape of rain:5", "teardrop:4"],
      a: "Surprise — raindrops are **not** shaped like teardrops! 💧 Small ones are round like tiny marbles. Bigger ones get squished by the air as they fall, so they look more like the top of a **hamburger bun**. Really big drops wobble and split apart into smaller drops.",
      rel: ["precipitation", "clouds", "rainbows"] },
    { id: "snow", q: "How do snowflakes form?",
      k: ["snowflake*:6", "snow:5", "six sides:5", "ice crystal*:5", "winter:3", "blizzard:4"],
      a: "Snowflakes start as tiny ice crystals high in cold clouds. ❄️ As they fall, more water vapor freezes onto them, growing beautiful arms. Because of how water molecules fit together when they freeze, snowflakes almost always have **six sides**!",
      rel: ["precipitation", "ice", "hail"] },
    { id: "hail", q: "What is hail?",
      k: ["hail*:6", "hailstone*:6", "ice balls:5", "ice ball:5"],
      a: "Hail is balls of ice that fall from **thunderstorms**! 🧊 Strong winds inside the storm toss raindrops up high where it's freezing, again and again. Each trip adds another layer of ice — like an onion — until the hailstone is too heavy and falls. Some hailstones get as big as softballs!",
      rel: ["precipitation", "thunderstorms", "snow"] },
    { id: "rainbows", q: "How do rainbows form?",
      k: ["rainbow*:7", "colors in the sky:5", "roygbiv:6"],
      a: "Rainbows happen when **sunlight shines through raindrops**! 🌈 Each drop bends the light and splits it into colors: red, orange, yellow, green, blue, indigo, and violet. To see one, stand with the **sun behind you** and look toward the rain.",
      rel: ["clouds", "raindrops", "sky-blue"] },
    { id: "thunderstorms", q: "Why do thunderstorms happen?",
      k: ["thunder*:6", "lightning:6", "storm*:3", "thunderstorm*:6"],
      a: "Thunderstorms grow when warm, wet air rises fast and builds a tall **cumulonimbus** cloud. ⛈️ Ice and water bumping around inside the cloud build up electricity — that's **lightning**! Lightning heats the air so fast it explodes with a **BOOM**: thunder. Safety rule: **when thunder roars, go indoors!**",
      rel: ["hail", "clouds", "flood-safety"] },
    { id: "sky-blue", q: "Why is the ocean blue?",
      k: ["ocean blue:6", "why is water blue:6", "why is the sea blue:6", "blue ocean:5", "color of water:5", "sky blue:4"],
      a: "Water is actually a tiny bit blue! 💙 It soaks up red light and lets blue light bounce back, so a LOT of water — like the ocean or a deep lake — looks blue. A glass of water looks clear because there isn't enough water for the blue to show. The blue sky reflecting off the water helps too!",
      rel: ["oceans", "rainbows"] },

    /* ---------------- Properties & science ---------------- */
    { id: "states-of-matter", q: "What are the three states of water?",
      k: ["states of matter:7", "three states:6", "solid liquid gas:7", "solid:4", "liquid:4", "gas:3", "state*:3", "steam:4"],
      a: "Water is the only common thing on Earth you can find naturally as a **solid, a liquid, AND a gas**! 🧊💧☁️\n• **Solid** — ice and snow (32°F / 0°C and colder)\n• **Liquid** — the water you drink\n• **Gas** — water vapor and steam\nIt's the same H₂O the whole time; only the temperature changes!",
      rel: ["ice", "boiling", "evaporation"] },
    { id: "h2o", q: "What is water made of?",
      k: ["h2o:7", "molecule*:6", "atom*:6", "hydrogen:6", "oxygen:5", "made of:4", "formula:4", "chemistry:3"],
      a: "Water is made of tiny particles called **molecules**, and each one is **H₂O** — two **H**ydrogen atoms stuck to one **O**xygen atom. 🔬 It looks a little like a Mickey Mouse head: the oxygen is the face and the two hydrogens are the ears! One drop of water has more molecules than there are stars in our galaxy.",
      more: "Water molecules are 'sticky' — the oxygen end is a little negative and the hydrogen ends are a little positive, so they hold hands with their neighbors. That stickiness gives water its superpowers: surface tension, climbing up plants, and dissolving lots of things!",
      rel: ["surface-tension", "universal-solvent", "states-of-matter"] },
    { id: "ice", q: "Why does ice float?",
      k: ["ice float*:7", "float*:4", "ice:4", "ice cube*:5", "frozen:4", "freeze*:4", "freezing:4", "expand*:4", "density:4", "dense:4"],
      a: "Ice floats because water does something weird: it **gets bigger when it freezes**! 🧊 The molecules lock into a roomy pattern with lots of space, so ice is about **9% less dense** than liquid water — and less-dense things float. That's great news for fish: lakes freeze from the top down, so fish can swim safely in the water underneath all winter.",
      more: "Most things shrink when they freeze and would sink as solids. If ice sank, lakes would freeze from the bottom up and fill solid with ice! Water is actually densest at about 39°F (4°C), which is why the bottom of a frozen lake stays around that temperature.",
      rel: ["states-of-matter", "density", "lakes-freeze"] },
    { id: "density", q: "What is density?",
      k: ["density:6", "dense:5", "sink or float:6", "sink*:4", "why do things float:6", "heavy:3"],
      a: "Density is how much stuff is packed into a space. ⚖️ Things **denser than water sink** (like a rock) and things **less dense float** (like a cork or an ice cube). Try it: put an egg in fresh water — it sinks! Stir in lots of salt and the water gets denser until the egg floats!",
      rel: ["ice", "salt-water", "experiments"] },
    { id: "lakes-freeze", q: "How do fish survive when a lake freezes?",
      k: ["fish survive*:6", "frozen lake*:6", "lake freeze*:6", "fish in winter:6", "under the ice:6"],
      a: "Because ice floats, a lake freezes from the **top down**. 🐟 The ice on top acts like a blanket and keeps the water underneath from freezing. The bottom water stays around 39°F (4°C), and fish slow down and rest there all winter long!",
      rel: ["ice", "fish"] },
    { id: "boiling", q: "What temperature does water boil at?",
      k: ["boil*:6", "boiling point:7", "212:5", "100 degrees:5", "steam:4", "hot water:3", "freezing point:6", "32 degrees:5", "temperature:3"],
      a: "At sea level, water **boils at 212°F (100°C)** and **freezes at 32°F (0°C)**. 🌡️ High up on a mountain the air pressure is lower, so water boils at a lower temperature — that's why cooking pasta takes longer up there!",
      rel: ["states-of-matter", "ice", "boil-water-safety"] },
    { id: "surface-tension", q: "What is surface tension?",
      k: ["surface tension:7", "water strider*:6", "walk on water:6", "skin on water:5", "penny:4", "paperclip:5", "bugs on water:5"],
      a: "Surface tension is like an invisible **stretchy skin** on top of water! 🕷️ Water molecules hold hands tightly, especially at the surface. It's strong enough for water striders to walk on a pond, and you can even float a paperclip if you set it down super gently. Soap breaks the skin — try it and watch the paperclip sink!",
      rel: ["h2o", "penny-drops", "capillary"] },
    { id: "capillary", q: "How do plants drink water up their stems?",
      k: ["capillary:7", "climb*:4", "celery:6", "paper towel*:5", "stem*:4", "roots:4", "plants drink:6"],
      a: "Water can **climb up** through tiny tubes — it's called **capillary action**! 🌿 Water molecules stick to the sides of skinny tubes and pull each other along. Plants use tiny tubes in their stems to carry water from their roots to their leaves. Try putting celery in colored water and watch the color climb!",
      rel: ["transpiration", "color-flowers", "surface-tension"] },
    { id: "universal-solvent", q: "Why is water called the universal solvent?",
      k: ["universal solvent:7", "solvent:6", "dissolve*:6", "sugar in water:5", "salt in water:4", "mix*:3"],
      a: "Water can **dissolve more things than any other liquid** — sugar, salt, minerals, and even gases like oxygen! 🧂 That's why scientists call it the 'universal solvent.' It's great for carrying nutrients through your body and to plants, but it also means water can pick up pollution, so we have to keep it clean.",
      rel: ["h2o", "pollution", "salt-water"] },
    { id: "salt-water", q: "Why is the ocean salty?",
      k: ["ocean salty:7", "salty:6", "salt water:6", "saltwater:6", "why is the sea salty:7", "drink ocean water:5", "drink salt water:6"],
      a: "Rivers slowly wash tiny bits of salt and minerals out of rocks and carry them to the sea. 🌊 When ocean water evaporates, the salt stays behind — so over millions of years the ocean got salty! **Never drink ocean water**: all that salt makes your body lose even more water, so it makes you thirstier.",
      rel: ["oceans", "earth-water", "desalination"] },
    { id: "desalination", q: "Can we turn salt water into drinking water?",
      k: ["desalin*:7", "remove salt:6", "take the salt out:6", "salt out of water:6", "ocean into drinking water:6"],
      a: "Yes! It's called **desalination**. 🏭 Special plants push ocean water through super-fine filters (called reverse osmosis) or boil it and collect the steam, leaving the salt behind. It works, but it takes a LOT of energy and money — so saving the fresh water we already have is super important.",
      rel: ["salt-water", "earth-water", "save-water"] },

    /* ---------------- Earth's water ---------------- */
    { id: "earth-water", q: "How much of Earth is covered by water?",
      k: ["71:6", "how much water on earth:7", "covered by water:7", "blue planet:6", "earth water:5", "percent of earth:6", "how much of the earth:6"],
      a: "About **71% of Earth's surface is covered by water** — that's why it's called the Blue Planet! 🌍 But about **97%** of it is salty ocean water. Only about **3%** is fresh, and most of that is frozen in glaciers or hidden underground. Less than **1%** is easy for people to use!",
      more: "Imagine all of Earth's water in a gallon jug. The fresh water we can easily reach would fit in about a **tablespoon**! That's why every drop counts. 💧",
      rel: ["fresh-water", "oceans", "glaciers"] },
    { id: "fresh-water", q: "Where is Earth's fresh water?",
      k: ["fresh water:7", "freshwater:7", "how much fresh:6", "drinkable water:6", "fresh:4"],
      a: "Of all Earth's fresh water:\n🧊 about **69%** is frozen in glaciers and ice caps,\n🪨 about **30%** is **groundwater** hidden underground,\n🏞️ and only about **1%** is in lakes, rivers, soil, and the air.\nSo the water in rivers and lakes is just a tiny slice of the pie!",
      rel: ["glaciers", "groundwater", "earth-water"] },
    { id: "oceans", q: "Tell me about the oceans!",
      k: ["ocean*:5", "sea:4", "pacific:6", "atlantic:6", "deepest:5", "mariana*:6", "waves:4", "tide*:5"],
      a: "Earth has one giant connected ocean with five named parts: the **Pacific** (biggest and deepest), **Atlantic**, **Indian**, **Southern**, and **Arctic**. 🌊 The deepest spot, the **Mariana Trench**, goes down almost **7 miles** — Mount Everest could fit inside with room to spare! Oceans hold about 97% of Earth's water and make much of the oxygen we breathe.",
      more: "Tides happen because the **Moon's gravity** tugs on the oceans, making them bulge. Most beaches get two high tides and two low tides every day. 🌙",
      rel: ["salt-water", "ocean-animals", "sky-blue"] },
    { id: "glaciers", q: "What is a glacier?",
      k: ["glacier*:7", "ice cap*:6", "iceberg*:6", "antarctica:6", "greenland:6", "north pole:5", "south pole:5"],
      a: "A glacier is a giant, slow-moving river of ice made from snow piled up over many, many years. 🏔️ Glaciers and ice caps hold about **69% of Earth's fresh water**! Most of it is in **Antarctica** and **Greenland**. Icebergs are chunks that break off glaciers — and about **90%** of an iceberg hides underwater!",
      rel: ["fresh-water", "ice", "earth-water"] },
    { id: "groundwater", q: "What is groundwater?",
      k: ["groundwater:7", "ground water:7", "underground water:7", "under the ground:5", "water table:6", "soak*:3"],
      a: "Groundwater is water hiding **underground**, filling the tiny spaces between sand, gravel, and rocks — kind of like water in a sponge! 🧽 The top of that wet zone is called the **water table**. People drill **wells** to pump it up, and here in **Mississippi most of our drinking water comes from groundwater**!",
      rel: ["aquifer", "wells", "mississippi-water"] },
    { id: "aquifer", q: "What is an aquifer?",
      k: ["aquifer*:7", "underground layer:5", "sponge:4", "underground lake:5"],
      a: "An aquifer is a layer of rock, sand, or gravel underground that **holds lots of water**, like a giant sponge! 💦 It's usually not an underground lake — the water fills tiny cracks and spaces. Some aquifers are thousands of years old, and they refill very slowly, so we have to use them wisely.",
      rel: ["groundwater", "wells", "mississippi-water"] },
    { id: "wells", q: "How does a water well work?",
      k: ["well*:5", "water well*:7", "drill*:5", "pump*:3", "how do wells work:7"],
      a: "A well is a deep, skinny hole drilled down into an **aquifer**. ⛏️ A strong pipe called a **casing** keeps dirt and surface water out, and a **pump** lifts the clean groundwater up to the surface. Town wells can be hundreds of feet deep! Water operators test well water often to make sure it stays safe.",
      rel: ["aquifer", "groundwater", "water-operator"] },
    { id: "rivers", q: "Where do rivers come from?",
      k: ["river*:6", "stream*:5", "creek*:5", "source of a river:6", "where do rivers start:7"],
      a: "Rivers start high up — from **melting snow, springs** bubbling out of the ground, or **rain** running downhill. 🏞️ Little streams join together into bigger ones, and eventually they flow into a lake or the ocean. The place a river starts is its **source**, and where it ends is its **mouth**.",
      rel: ["mississippi-river", "watershed", "collection"] },
    { id: "mississippi-river", q: "Tell me about the Mississippi River!",
      k: ["mississippi river:8", "mississippi:4", "big river:4", "longest river:5", "lake itasca:7", "new orleans:5"],
      a: "The mighty **Mississippi River** is about **2,340 miles** long! 🌊 It starts as a tiny stream you can walk across at **Lake Itasca, Minnesota**, and flows all the way down to the Gulf south of New Orleans. It drains water from **31 states** and two Canadian provinces. A raindrop that starts at the top takes about **90 days** to travel the whole river!",
      rel: ["rivers", "watershed", "mississippi-water"] },
    { id: "watershed", q: "What is a watershed?",
      k: ["watershed*:7", "drainage basin:7", "drain* into:5"],
      a: "A watershed is all the land that **drains into the same river, lake, or ocean**. 🏔️➡️🏞️ Everybody lives in a watershed! When rain falls on your yard, it flows downhill toward a creek, then a river… maybe all the way to the Mississippi River. That's why what we put on the ground ends up in our water.",
      rel: ["mississippi-river", "storm-drains", "pollution"] },
    { id: "mississippi-water", q: "Where does Mississippi get its drinking water?",
      k: ["mississippi drinking water:7", "mississippi water:6", "our water come from:6", "where does my water come from:7", "tap water come from:7", "my water from:5"],
      a: "Most people in Mississippi drink **groundwater**! 🪣 About **88%** of the water used by our public water systems comes from wells that reach deep into **aquifers**. Only about 1 in 10 Mississippians gets water from rivers or lakes. Your local water system pumps it, cleans it, tests it, and sends it through pipes to your faucet.",
      rel: ["groundwater", "treatment-plant", "water-tower"] },

    /* ---------------- Clean water: treatment & delivery ---------------- */
    { id: "treatment-plant", q: "How does a water treatment plant clean water?",
      k: ["treatment plant*:7", "water treatment:7", "clean water:5", "how is water cleaned:7", "how do they clean water:7", "make water safe:6", "treat water:6"],
      a: "Here's how dirty water becomes clean drinking water! 🏭\n1. 🧹 **Screening** — big stuff like sticks and leaves gets caught.\n2. 🧲 **Coagulation** — a special powder makes tiny dirt bits stick together into clumps called **floc**.\n3. 🪣 **Settling** — the heavy floc sinks to the bottom.\n4. 🧽 **Filtration** — water trickles through sand and gravel to catch tiny bits.\n5. 🧪 **Disinfection** — a little chlorine or UV light zaps germs.\nThen it's stored and sent through pipes to your home!",
      more: "Water operators test the water around the clock — checking how clear it is (turbidity), how much chlorine is in it, and taking samples to look for germs. They're like water doctors! 👩‍🔬",
      rel: ["coagulation", "filtration", "chlorine"] },
    { id: "coagulation", q: "What is floc?",
      k: ["floc*:7", "coagul*:7", "clump*:5", "alum:6", "sticky powder:5"],
      a: "Floc is fluffy clumps of dirt! 🧲 Tiny bits of dirt in water are too small and light to sink. So operators add a chemical like **alum** that makes the bits **stick together** into bigger clumps called **floc**. Floc is heavy enough to sink to the bottom of a big tank, leaving clearer water on top.",
      rel: ["treatment-plant", "filtration", "turbidity"] },
    { id: "filtration", q: "How does a water filter work?",
      k: ["filter*:6", "filtration:7", "sand filter*:6", "gravel:4", "charcoal:5", "carbon:4", "strainer:4"],
      a: "A filter is like a super-fine strainer! 🧽 Water trickles down through layers of **gravel, sand, and sometimes charcoal**. Big bits get stuck at the top, and smaller bits get trapped deeper down. But remember: filters catch **dirt**, not all **germs** — that's why water still needs disinfection! Try building one in the **Build-a-Filter** game.",
      rel: ["chlorine", "build-filter", "treatment-plant"] },
    { id: "chlorine", q: "Why do they put chlorine in water?",
      k: ["chlorine:7", "disinfect*:6", "kill germs:6", "germs:4", "pool smell:5", "bleach:4", "uv light:5"],
      a: "Chlorine is a germ-fighter! 🧪 A tiny amount — just a few drops' worth in a whole bathtub of water — kills bacteria and viruses that could make people sick. Some even stays in the water as it travels through the pipes to keep protecting it all the way to your faucet. Some plants also use **UV light** to zap germs!",
      more: "Adding chlorine to drinking water is one of the biggest health wins in history. Diseases like cholera and typhoid used to spread through water. In 1908, Jersey City, New Jersey became the first U.S. city to chlorinate its drinking water all the time! 🎉",
      rel: ["germs", "treatment-plant", "water-history"] },
    { id: "germs", q: "Are there germs in water?",
      k: ["germ*:6", "bacteria:6", "virus*:5", "microbe*:6", "tiny living things:5", "make you sick:5", "sick:4", "e coli:5"],
      a: "Water in nature can have **tiny living things** called microbes — bacteria, viruses, and protozoa — that are way too small to see. 🔬 Most are harmless, but some can make people sick. That's why water from rivers, lakes, and wells gets **treated and tested** before we drink it. Water operators send samples to a lab to check for germs!",
      rel: ["chlorine", "safe-to-drink", "water-operator"] },
    { id: "safe-to-drink", q: "Can I drink water from a river or stream?",
      k: ["drink from a river:7", "drink from a stream:7", "drink from a lake:7", "safe to drink:6", "can i drink:5", "creek water:6", "pond water:6", "puddle water:6"],
      a: "Nope — **don't drink water from rivers, streams, lakes, or puddles**, even if it looks crystal clear! 🚫 It can have germs you can't see. Tap water from your home is treated and tested to be safe. If you're camping, grown-ups use special filters or boil water first.",
      rel: ["germs", "boil-water-safety", "treatment-plant"] },
    { id: "boil-water-safety", q: "What is a boil water notice?",
      k: ["boil water:7", "boil notice:7", "boil order:7", "boil the water:6"],
      a: "Sometimes a pipe breaks or the water pressure drops, and germs might sneak in. 🚰 The water company then tells everyone to **boil water** before drinking it, just to be safe. Grown-ups bring it to a rolling boil for **1 minute**, which kills germs. When the tests come back clean, the notice is lifted!",
      rel: ["germs", "water-pipes", "water-operator"] },
    { id: "turbidity", q: "What is turbidity?",
      k: ["turbidity:7", "cloudy water:6", "murky:6", "muddy water:6", "cloudy:4"],
      a: "Turbidity means **how cloudy water is**! 🌫️ Muddy river water has high turbidity; super-clear water has low turbidity. Operators measure it every day with a special light meter, because tiny particles can hide germs from the chlorine. Clear water = happy water!",
      rel: ["coagulation", "filtration", "water-operator"] },
    { id: "fluoride", q: "Why is fluoride in some water?",
      k: ["fluorid*:7", "teeth:5", "tooth:5", "cavit*:4", "dentist:4"],
      a: "Fluoride is a natural mineral that helps make your **teeth strong** and fight cavities. 🦷 Lots of water already has a little in it naturally, and some towns carefully add a tiny bit more. Water operators measure it closely to keep it at just the right amount!",
      rel: ["treatment-plant", "water-operator"] },
    { id: "water-tower", q: "Why are water towers so tall?",
      k: ["water tower*:7", "tower*:5", "tall tank:5", "water tank*:5", "elevated tank*:6", "water pressure:5", "pressure:3"],
      a: "Water towers use **gravity** to push water to your house! 🗼 Pumps fill the tank up high, and the weight of all that water pressing down creates **water pressure** in the pipes. The taller the tower, the stronger the push — every foot of height adds a little more. Towers also store water for busy mornings and for firefighters, and they keep water flowing even if the power goes out!",
      rel: ["water-pipes", "fire-hydrants", "water-pressure-experiment"] },
    { id: "water-pipes", q: "How does water get to my house?",
      k: ["get to my house:7", "to my house:6", "to my home:6", "pipes:5", "pipe*:4", "water main*:6", "underground pipes:6", "faucet:4", "tap:4"],
      a: "Clean water travels through a giant maze of **underground pipes**! 🚰 Big pipes called **water mains** run under the streets, then smaller pipes branch off to each house. A **water meter** counts how much water your home uses. Turn on the faucet and — whoosh — water that was treated at the plant or pumped from a well is ready to drink!",
      rel: ["water-tower", "water-meter", "treatment-plant"] },
    { id: "water-meter", q: "What does a water meter do?",
      k: ["water meter*:7", "meter*:5", "water bill*:6", "how much water we use:5"],
      a: "A water meter is like a **car's odometer for water**! 🔢 It sits near the street or your house and counts every gallon that flows into your home. The water company reads it to know how much water you used. If the meter's dial spins when every faucet is off, there might be a **leak**!",
      rel: ["leaks", "water-pipes", "save-water"] },
    { id: "fire-hydrants", q: "How do fire hydrants work?",
      k: ["fire hydrant*:7", "hydrant*:7", "firefighter*:6", "fire truck*:5"],
      a: "Fire hydrants are connected to the big water mains under the street! 🚒 Firefighters hook up a hose and open a valve with a special wrench, and water rushes out at high pressure to fight fires. The colored top shows how much water a hydrant can give. Hydrants are only for firefighters and water workers — never play with them.",
      rel: ["water-tower", "water-pipes", "water-operator"] },
    { id: "wastewater", q: "Where does water go when I flush the toilet?",
      k: ["flush*:6", "toilet:5", "sewer*:7", "wastewater:7", "waste water:7", "poop:5", "pee:4", "drain:4"],
      a: "When you flush or pull the drain plug, the used water goes through **sewer pipes** to a **wastewater treatment plant**. 🚽 There, screens, settling tanks, and helpful **bacteria that eat the yucky stuff** clean it up. Then the cleaned water goes back into a river to continue the water cycle. Only flush the 3 Ps: **pee, poop, and toilet paper!**",
      rel: ["storm-drains", "treatment-plant", "pollution"] },
    { id: "storm-drains", q: "Where does water in the street drain go?",
      k: ["storm drain*:7", "street drain*:7", "gutter*:5", "rain in the street:6", "drain in the street:7"],
      a: "Street storm drains usually go **straight to a creek, river, or lake — with NO cleaning**! 🐟 That means anything that washes in — litter, oil, soap, grass clippings, dog poop — ends up in the water animals live in. Remember: **only rain down the drain!**",
      rel: ["pollution", "watershed", "wastewater"] },

    /* ---------------- Saving water ---------------- */
    { id: "save-water", q: "How can I save water?",
      k: ["save water:7", "saving water:7", "conserv*:7", "waste water:4", "wasting water:6", "water hero:5", "use less water:7"],
      a: "You can be a **Water Hero**! 🦸\n• Turn off the tap while brushing your teeth (saves up to **8 gallons a day**!).\n• Take shorter showers — try a 5-minute song.\n• Tell a grown-up about drips and leaks.\n• Only run the dishwasher or washing machine when it's full.\n• Water plants in the early morning so less evaporates.\n• Use a bucket instead of a running hose to wash a bike.",
      rel: ["leaks", "brushing-teeth", "home-water-use"] },
    { id: "leaks", q: "How much water does a leak waste?",
      k: ["leak*:7", "drip*:6", "dripping:6", "running toilet:7", "faucet drip*:7", "fix a leak:7"],
      a: "Leaks are sneaky water-wasters! 💧 A faucet dripping **once a second** wastes over **3,000 gallons a year** — enough for more than 180 showers! A running toilet can waste up to **200 gallons in a single day**. Household leaks across the U.S. waste nearly **1 trillion gallons** a year, so tell a grown-up right away if you find one.",
      more: "Detective trick: put a few drops of food coloring in a toilet tank (the back part). Wait 10 minutes without flushing. If color shows up in the bowl, the toilet has a leak! 🕵️",
      rel: ["save-water", "water-meter", "home-water-use"] },
    { id: "brushing-teeth", q: "Should I turn off the water when I brush my teeth?",
      k: ["brush* teeth:7", "toothbrush:6", "turn off the tap:6", "tap running:6"],
      a: "Yes! A running faucet can pour out a couple of gallons every minute. 🪥 Turning off the tap while you brush can save up to **8 gallons a day** — that's over 200 gallons a month for just one kid! Wet your brush, turn it off, brush for 2 minutes, then turn it back on to rinse.",
      rel: ["save-water", "home-water-use"] },
    { id: "home-water-use", q: "How much water does a family use?",
      k: ["how much water do we use:7", "family use:6", "use at home:6", "gallons a day:5", "shower*:5", "bath*:4", "toilet use:5"],
      a: "The average American family uses **more than 300 gallons of water a day** at home! 🏠 **Toilets** use the most indoor water, then showers, faucets, and washing machines. A 10-minute shower uses about **20 gallons**, and a full bath can use even more. Outdoors, watering lawns can use a LOT, especially in summer.",
      rel: ["save-water", "leaks", "brushing-teeth"] },

    /* ---------------- Pollution & nature ---------------- */
    { id: "pollution", q: "What is water pollution?",
      k: ["pollut*:7", "dirty water:5", "trash in water:6", "litter:5", "oil spill*:6", "plastic*:5", "contaminat*:6"],
      a: "Water pollution is anything that makes water dirty or unsafe — **trash, oil, chemicals, too much fertilizer, and pet waste**. 🛢️ Rain washes it off streets, farms, and yards into storm drains and rivers. You can help: throw trash in the can, pick up after pets, recycle plastic, and never pour anything down a storm drain!",
      rel: ["storm-drains", "algae-bloom", "plastic"] },
    { id: "plastic", q: "Why is plastic bad for oceans?",
      k: ["plastic*:7", "straw*:5", "bottle*:4", "ocean trash:7", "garbage patch:7", "turtle*:4"],
      a: "Plastic can last **hundreds of years**, and lots of it ends up in rivers and oceans. 🐢 Sea turtles can mistake plastic bags for jellyfish, and birds and fish can get tangled or swallow it. Plastic also breaks into tiny pieces called **microplastics**. Use a refillable water bottle, recycle, and pick up litter to help!",
      rel: ["pollution", "ocean-animals", "save-water"] },
    { id: "algae-bloom", q: "What is an algae bloom?",
      k: ["algae:7", "algal:7", "green water:6", "pond scum:6", "slime:4", "fertilizer:5", "dead zone:7"],
      a: "Algae are tiny plant-like living things in water. 🟢 When too much **fertilizer** washes into a lake or river, algae eat it up and grow like crazy — that's an **algae bloom**, and it can turn water green and smelly. When the algae die, they use up the oxygen fish need. Some blooms even make toxins, so stay out of water that looks like green paint!",
      more: "Fertilizer carried by the Mississippi River helps create a **'dead zone'** in the Gulf every summer — an area with so little oxygen that fish have to swim away. Using less fertilizer on lawns and farms helps shrink it!",
      rel: ["pollution", "fish", "mississippi-river"] },
    { id: "wetlands", q: "Why are wetlands important?",
      k: ["wetland*:7", "swamp*:6", "marsh*:6", "bayou*:6", "bog*:5"],
      a: "Wetlands — like swamps, marshes, and bayous — are nature's **super sponges and filters**! 🐸 They soak up floodwater, clean water by trapping dirt and pollution, and are home to tons of animals: frogs, turtles, alligators, herons, and ducks. Mississippi has lots of beautiful wetlands, especially near the coast and along rivers.",
      rel: ["frogs", "pollution", "watershed"] },
    { id: "fish", q: "How do fish breathe underwater?",
      k: ["fish:6", "gill*:7", "breathe underwater:7", "oxygen in water:6"],
      a: "Fish breathe with **gills**! 🐟 Water has tiny bits of oxygen mixed in. As water flows over a fish's gills, they grab that oxygen — kind of like our lungs grab oxygen from air. That's why fish need **clean water with plenty of oxygen**; pollution and algae blooms can make it hard for them to breathe.",
      rel: ["algae-bloom", "ocean-animals", "lakes-freeze"] },
    { id: "frogs", q: "Do frogs drink water?",
      k: ["frog*:7", "toad*:6", "tadpole*:6", "amphibian*:6"],
      a: "Frogs don't drink with their mouths — they **soak up water through their skin**! 🐸 A frog's skin is thin and a little bit like a sponge. That also means pollution can pass right into their bodies, so scientists watch frogs to see how healthy a pond or wetland is.",
      rel: ["wetlands", "animals-water"] },
    { id: "ocean-animals", q: "What is the biggest animal in the ocean?",
      k: ["whale*:7", "blue whale:7", "shark*:6", "biggest animal:7", "sea animal*:6", "ocean animal*:7", "dolphin*:6", "octopus*:6", "coral*:6"],
      a: "The **blue whale** is the biggest animal that has ever lived — even bigger than any dinosaur! 🐋 It can be about 100 feet long, and its heart is as big as a small car. The ocean is also home to dolphins, sharks, octopuses, sea turtles, and **coral reefs**, which need clean, clear water to survive.",
      rel: ["oceans", "plastic", "fish"] },
    { id: "animals-water", q: "Which animals can live without drinking water?",
      k: ["camel*:7", "desert animal*:6", "kangaroo rat*:7", "without drinking:6", "never drink*:6", "animals need water:6"],
      a: "Some desert animals are water-saving champions! 🐪 **Camels** can go a week or more without drinking — their humps store **fat**, not water! The **kangaroo rat** hardly ever drinks at all; it gets water from the seeds it eats. But every living thing needs water somehow — it's in their food or their bodies.",
      rel: ["body-water", "frogs", "plants-need-water"] },
    { id: "plants-need-water", q: "Why do plants need water?",
      k: ["plants need water:7", "plants:4", "plant:4", "garden*:4", "photosynthesis:7", "grow:3", "wilt*:5"],
      a: "Plants need water to make their own food! 🌻 Using sunlight, water, and air, leaves make sugar in a process called **photosynthesis**. Water also keeps a plant's stems and leaves firm — when a plant doesn't get enough, it **wilts** and droops. Water your plants in the early morning so less water evaporates.",
      rel: ["transpiration", "capillary", "save-water"] },

    /* ---------------- Your body ---------------- */
    { id: "body-water", q: "How much of my body is water?",
      k: ["my body:6", "body:4", "human body:6", "60%:6", "60 percent:6", "percent water:6", "brain:4", "blood:4"],
      a: "You're mostly water! 💦 Your body is about **60% water**. Your **brain and heart** are about **73%** water, your **lungs** about 83%, and even your **bones** are about 31% water! Water carries food and oxygen around your body, keeps you cool with sweat, and cushions your joints.",
      rel: ["drink-water", "sweat", "without-water"] },
    { id: "drink-water", q: "How much water should kids drink?",
      k: ["how much water should i drink:7", "drink water:6", "drinking water:4", "thirsty:5", "thirst:5", "hydrat*:7", "cups of water:6", "dehydrat*:7"],
      a: "Most kids need about **5 to 8 cups of fluids a day** — younger kids a little less, older kids a little more, and **more when it's hot or you're playing hard**! 🥤 Water is the best choice. Feeling tired, cranky, or getting a headache can be signs you need a drink. Pale yellow pee means you're drinking enough!",
      rel: ["body-water", "sweat", "without-water"] },
    { id: "sweat", q: "Why do we sweat?",
      k: ["sweat*:7", "perspir*:7", "keep cool:5", "hot day:4"],
      a: "Sweating is your body's **air conditioner**! 😅 When you get hot, your skin releases sweat. As the sweat **evaporates**, it carries heat away and cools you down. That's why you need to drink extra water on hot days or when you exercise — to replace the water you sweat out.",
      rel: ["evaporation", "drink-water", "body-water"] },
    { id: "without-water", q: "How long can people live without water?",
      k: ["live without water:7", "survive without water:7", "without water:6", "no water:5"],
      a: "People can survive about **3 weeks without food**, but only about **3 days without water**! ⏳ That shows how important water is — every cell in your body needs it. That's why clean, safe drinking water is one of the most important things a community can have.",
      rel: ["drink-water", "body-water", "water-operator"] },

    /* ---------------- Weather safety ---------------- */
    { id: "flood-safety", q: "What should I do in a flood?",
      k: ["flood*:7", "flash flood*:7", "turn around dont drown:7", "hurricane*:6", "high water:6"],
      a: "Floods are dangerous, so remember: **Turn Around, Don't Drown!** 🚫🌊 Never walk, play, or ride a bike through floodwater — just 6 inches of moving water can knock you down, and it can hide sharp things or be full of germs. Listen to grown-ups, move to higher ground, and stay away from storm drains and creeks during heavy rain.",
      rel: ["thunderstorms", "swim-safety", "germs"] },
    { id: "swim-safety", q: "How do I stay safe around water?",
      k: ["swim*:6", "water safety:7", "pool:5", "drown*:6", "life jacket*:7", "beach:5", "lake safety:6"],
      a: "Water is fun AND powerful! 🏊 Be water-smart:\n• Only swim when a **grown-up is watching**.\n• Wear a **life jacket** on boats and in open water.\n• Never swim alone, and stay out of fast rivers and floodwater.\n• Learn to swim — lessons are the best superpower!\n• Stay off thin ice.",
      rel: ["flood-safety", "ice"] },

    /* ---------------- People & history ---------------- */
    { id: "water-operator", q: "What does a water operator do?",
      k: ["water operator*:7", "operator*:6", "water job*:7", "water career*:7", "work at a water plant:7", "who cleans the water:7", "water worker*:6", "when i grow up:5"],
      a: "Water operators are the **everyday heroes** who keep your water safe! 👷 They run treatment plants and wells, test water for germs and chlorine, fix pumps and pipes, and watch the system day and night — even on holidays. It's a real job you can do when you grow up. Grown-ups can study for it right here in our **Adult Learning Center**!",
      rel: ["treatment-plant", "germs", "water-scientists"] },
    { id: "water-scientists", q: "What kinds of scientists study water?",
      k: ["scientist*:6", "hydrologist*:7", "oceanographer*:7", "meteorologist*:7", "engineer*:6", "biologist*:5", "chemist*:5"],
      a: "Lots of scientists work with water! 🔬\n• **Hydrologists** study rivers, rain, and groundwater.\n• **Oceanographers** explore the oceans.\n• **Meteorologists** predict the weather.\n• **Chemists** test what's dissolved in water.\n• **Engineers** design water towers, pipes, and treatment plants.\n• **Biologists** study fish, frogs, and other water life.",
      rel: ["water-operator", "experiments"] },
    { id: "water-history", q: "How did people get water long ago?",
      k: ["history:6", "long ago:6", "ancient:6", "romans:7", "aqueduct*:7", "olden days:6", "john snow:7", "cholera:6", "first:3"],
      a: "Long ago, people carried water from rivers and wells in buckets and jars. 🏺 The ancient **Romans** built amazing **aqueducts** — stone bridges and channels that carried water for miles using just gravity! In 1854 a doctor named **John Snow** discovered that a sickness called **cholera** was spreading through a dirty water pump in London. That's how people learned how important clean water is!",
      rel: ["chlorine", "treatment-plant", "germs"] },
    { id: "space-water", q: "Is there water in space?",
      k: ["space:6", "mars:7", "moon*:5", "planet*:4", "europa:7", "enceladus:7", "comet*:6", "astronaut*:6", "other planets:6"],
      a: "Yes! 🚀 Scientists have found **ice on Mars** and at the poles of our **Moon**, and moons like **Europa** (around Jupiter) and **Enceladus** (around Saturn) have huge **oceans hidden under their icy shells**! Comets are like dirty snowballs. On the International Space Station, astronauts even recycle their sweat and pee back into clean drinking water!",
      rel: ["earth-water", "old-water"] },
    { id: "old-water", q: "How old is the water I drink?",
      k: ["how old:6", "old water:7", "dinosaur*:7", "same water:6", "billions of years:6", "new water:6"],
      a: "The water in your glass is **billions of years old**! 🦕 Earth doesn't really make new water — the same water keeps going around and around the water cycle. So some of the water you drink today might once have been rain that fell on a dinosaur, a snowflake on a mountain, or part of an ocean wave long, long ago!",
      rel: ["water-cycle", "space-water"] },

    /* ---------------- Experiments & the site ---------------- */
    { id: "experiments", q: "What experiments can I do at home?",
      k: ["experiment*:7", "science project*:7", "science fair:7", "try at home:6", "activity:4", "activities:4"],
      a: "The **Discovery Lab** has real experiments to try with a grown-up! 🧪\n• 🛍️ Water Cycle in a Bag\n• 🧫 Build a Water Filter\n• 🌸 Color-Changing Flowers\n• 🪙 How Many Drops on a Penny?\n• ☀️ Sun vs. Shade Race\n• 🕵️ Home Water Detective\nTap **We did it!** on one to earn your **Experimenter** badge. Safety first: never drink experiment water!",
      rel: ["penny-drops", "color-flowers", "build-filter"] },
    { id: "penny-drops", q: "How many drops of water fit on a penny?",
      k: ["penny:7", "drops on a penny:7", "coin:5"],
      a: "More than you'd guess — often **20 to 40 drops**! 🪙 Surface tension lets the water pile up into a big dome before it spills. Try it with an eyedropper, count carefully, and write down your guess first. Then try soapy water — soap weakens surface tension, so fewer drops fit!",
      rel: ["surface-tension", "experiments"] },
    { id: "color-flowers", q: "How do color-changing flowers work?",
      k: ["color changing:7", "colored flower*:7", "carnation*:7", "celery:5", "food coloring:6"],
      a: "Put a white carnation or a celery stalk in water with lots of food coloring. 🌸 Over a day or two, the plant pulls the colored water up its stem through tiny tubes (**capillary action**), and the colors show up in the petals or leaves! You're watching a plant drink.",
      rel: ["capillary", "transpiration", "experiments"] },
    { id: "build-filter", q: "How do I build a water filter?",
      k: ["build a filter:7", "make a filter:7", "diy filter:7", "homemade filter:7", "bottle filter:7", "filter game:6"],
      a: "With a grown-up: cut the bottom off a plastic bottle and flip it upside down. 🧫 From the neck up, layer **cotton or a coffee filter, charcoal, sand, then gravel** on top. Pour muddy water in slowly and watch clearer water drip out! **Don't drink it** — filters catch dirt, not all germs. Want to practice first? Play **Build-a-Filter** in the Game Lab!",
      rel: ["filtration", "experiments", "chlorine"] },
    { id: "water-pressure-experiment", q: "What's a fun water pressure experiment?",
      k: ["water pressure experiment:7", "bottle with holes:7", "holes in a bottle:7", "pressure experiment:7"],
      a: "Try the **leaky bottle** test (outside or over a sink)! 🍼 With a grown-up, poke three holes up the side of a plastic bottle — one near the bottom, one in the middle, one near the top. Fill it with water and watch: the **bottom hole squirts the farthest** because it has the most water pressing down on it. That's exactly why water towers are tall!",
      rel: ["water-tower", "experiments"] },
    { id: "games-help", q: "What games can I play?",
      k: ["game*:6", "play:5", "arcade:5", "fun:3", "bored:5"],
      a: "The **Game Lab** has lots of water games! 🎮\n• 🆕 **Build-a-Filter** — stack layers and clean muddy water\n• 🆕 **Water Plant Tycoon** — run your own treatment plant\n• 🆕 **Drop's Journey** — travel the whole water cycle\n• 💧 Droplet Catcher, 🔧 Pipe Connect, 🚿 Leak Detective\n• 🏭 Treatment Step Sort, 🌍 Water Cycle Race\n• 🔤 Word Scramble, ✅ True or False, 🧩 Memory Match",
      rel: ["badges-help", "quiz-help", "coloring-help"] },
    { id: "badges-help", q: "How do I earn badges?",
      k: ["badge*:7", "earn:4", "reward*:5", "trophy:5", "trophies:5", "junior scientist:7", "jr scientist:7"],
      a: "Badges show off your water skills! 🏅 Finish a game, color a picture, get 8+ right in a Quiz Lab round, and do an experiment — collect those four to become a **Junior Water Scientist** 🥼. There are also badges for answer streaks, perfect quizzes, and the new games. Check your badge shelf on the Explorer HQ page!",
      rel: ["games-help", "quiz-help"] },
    { id: "quiz-help", q: "How does the Quiz Lab work?",
      k: ["quiz lab:7", "quiz:5", "test:3", "questions:3", "levels:4"],
      a: "Pick a level in the **Quiz Lab**: 💧 Drip (ages 6–8), 🌊 Splash (ages 8–11), 🔬 Scientist (ages 11+), or 🎲 Mixed! Each round has 12 questions. Get answers right in a row to build a **streak** and earn bonus points. Score 8 or more to earn the **Quiz Ace** badge! Want a quick question right now? Say **quiz me**!",
      rel: ["badges-help", "games-help"] },
    { id: "coloring-help", q: "Can I color pictures?",
      k: ["color*:5", "coloring:7", "draw*:5", "paint*:5", "print*:5", "art:5"],
      a: "Yes! 🎨 Visit the **Coloring Lab**: pick a picture, choose a color, and tap any part to fill it in. You can print your masterpiece, print a blank page for crayons, or save it as a picture. Coloring earns you the **Artist** badge!",
      rel: ["games-help", "badges-help"] },
    { id: "bible-water", q: "What does the Bible say about water?",
      k: ["bible:7", "verse*:6", "god:5", "jesus:6", "scripture:6", "living water:7", "noah:6", "church:4"],
      a: "Water shows up all through the Bible as a gift and a picture of life! 📖 In **Genesis 1**, God gathers the waters so dry land appears. **Psalm 23:2** says, “He leads me beside still waters.” In **John 4:14**, Jesus talks about “living water” that fills you up forever. Visit the **Discovery Lab** to read more verses about water!",
      rel: ["experiments", "water-cycle"] },

    /* ---------------- Greg ---------------- */
    { id: "about-greg", q: "Who are you, Greg?",
      k: ["who are you:7", "your name:6", "about you:6", "are you real:7", "are you a robot:7", "are you a kid:7", "are you human:7", "how old are you:6", "where do you live:6"],
      a: "I'm **Greg**, the Water Explorer Lab's science buddy! 🧒🔬 I'm a computer character — not a real person — made to help you learn about water. I live right here in the lab, and I know hundreds of water facts. Nothing you type to me leaves this device. What do you want to explore?",
      rel: ["favorite-fact", "games-help", "water-cycle"] },
    { id: "favorite-fact", q: "What's your favorite water fact?",
      k: ["favorite:6", "favourite:6", "coolest fact:6", "best fact:6", "your favorite:7"],
      a: "My favorite fact: the water in your glass might have been **dinosaur drinking water**! 🦕 Water keeps cycling for billions of years, so every sip is super old. Pretty wild, right?",
      rel: ["old-water", "water-cycle", "earth-water"] },
    /* ---------------- Added with the Word Lab ---------------- */
    { id: "word-lab-help", q: "What is the Word Lab?",
      k: ["word lab:8", "word match:7", "word of the day:7", "dictionary:6", "glossary:6", "water words:6", "word wizard:7", "vocabulary:5"],
      a: "The **Word Lab** is a water dictionary for explorers! 📖 It has **150+ water words** with pictures, how to say each one, and an example. Tap ⭐ on the words you know to build your collection, check the **Word of the Day**, and play **Word Match** to earn the **Word Wizard** badge! You can ask me too, like: “What does evaporation mean?”",
      rel: ["games-help", "badges-help", "water-cycle"] },
    { id: "drought", q: "What is a drought?",
      k: ["drought*:8", "no rain:6", "dry spell:7", "not enough rain:7", "dried up:5", "lake dry:5"],
      a: "A **drought** is a long stretch of time with much less rain than normal. 🏜️ Lakes and rivers shrink, soil dries out and cracks, and crops can't grow well. Droughts can last for weeks, months, or even years! During a drought, towns may ask everyone to save water, like taking shorter showers and watering lawns less.",
      rel: ["save-water", "precipitation", "flood-safety"] },
    { id: "fog", q: "What is fog?",
      k: ["fog*:7", "misty:6", "mist:6", "cloud on the ground:8", "cloud touch* the ground:8"],
      a: "Fog is a **cloud that touches the ground**! 🌫️ It forms when the air near the ground cools off and its water vapor condenses into billions of tiny droplets. That's why fog shows up on cool mornings, especially near rivers and lakes, and then disappears when the sun warms things up.",
      rel: ["condensation", "clouds", "humidity"] },
    { id: "humidity", q: "Why does summer feel so sticky?",
      k: ["humid*:8", "sticky:7", "muggy:7", "water in the air:6", "moisture in the air:6"],
      a: "That's **humidity**, the amount of water vapor floating in the air! 💦 On humid days your sweat can't evaporate as fast, so it stays on your skin and you feel sticky and hot. Mississippi summers are famous for high humidity. Desert air is dry, with low humidity.",
      rel: ["sweat", "evaporation", "fog"] },
    { id: "hurricanes", q: "How do hurricanes form?",
      k: ["hurricane*:7", "how do hurricanes form:8", "eye of the storm:7", "tropical storm*:7", "cyclone*:6", "typhoon*:6"],
      a: "A **hurricane** is a giant spinning storm that forms over **warm ocean water**. 🌀 Warm, wet air rises, more air rushes in, and Earth's spin makes the whole storm twist. The calm center is called the **eye**. Hurricanes bring super-strong winds, big waves, and heavy rain that can flood towns. In the Atlantic, hurricane season runs from **June 1 to November 30**, so families make a plan and listen to weather alerts.",
      rel: ["flood-safety", "thunderstorms", "oceans"] },
    { id: "geysers", q: "How do geysers work?",
      k: ["geyser*:8", "old faithful:8", "yellowstone:7", "hot spring*:7", "water shoot* up:6"],
      a: "A **geyser** is a hot spring that shoots water and steam into the air! ♨️ Deep underground, hot rocks heat water trapped in narrow cracks. When it gets hot enough, some of the water flashes into steam, and WHOOSH, it blasts out of the ground. **Old Faithful** in Yellowstone National Park erupts about every hour and a half, and Yellowstone has about half of all the geysers on Earth!",
      rel: ["groundwater", "boiling", "states-of-matter"] },
    { id: "tides", q: "What causes tides?",
      k: ["tide*:7", "high tide:8", "low tide:8", "moon pull*:7", "what causes tides:8"],
      a: "**Tides** are the slow rise and fall of the ocean along the shore. 🌙 The **Moon's gravity** pulls on the ocean and makes it bulge, and as Earth spins, beaches move in and out of those bulges. Many beaches get two high tides and two low tides a day, but some places, including much of the Gulf Coast, get just one of each!",
      rel: ["oceans", "waves", "space-water"] },
    { id: "waves", q: "What makes ocean waves?",
      k: ["wave*:6", "what makes waves:8", "why are there waves:8", "surfing:5", "surfer*:5", "tsunami*:7", "breaking wave*:7"],
      a: "Most ocean **waves** are made by **wind** blowing across the water. 🌊 The wind pushes the surface, and the energy travels across the sea, while the water itself mostly bobs up and down in place! When a wave reaches shallow water near the beach, it slows down, gets taller, and **breaks**. Giant waves called **tsunamis** are different: underwater earthquakes cause them.",
      rel: ["tides", "oceans", "hurricanes"] },
    { id: "erosion", q: "What is erosion?",
      k: ["erosion:8", "erode*:7", "wear* away:6", "grand canyon:8", "canyon*:6"],
      a: "**Erosion** is when water, wind, or ice slowly wears away rock and soil and carries it somewhere else. 🏜️ Rivers are amazing at it: the **Colorado River** carved the **Grand Canyon** over millions of years! Plant roots help hold soil in place, which is why planting trees and grass helps stop erosion.",
      rel: ["rivers", "glaciers", "watershed"] },
    { id: "dams", q: "What does a dam do?",
      k: ["dam:7", "dams:7", "hydropower:8", "hydroelectric*:8", "beaver*:7", "reservoir*:6", "turbine*:5"],
      a: "A **dam** is a wall built across a river to hold back water. 🧱 The lake behind it is called a **reservoir**, which can store drinking water, help control floods, and water farms. Some dams make electricity: water rushing through spins giant **turbines**, and that's **hydropower**! Beavers build their own dams out of sticks and mud to make safe ponds for their homes. 🦫",
      rel: ["rivers", "lakes-freeze", "flood-safety"] },
    { id: "ph-kids", q: "What is pH?",
      k: ["ph:8", "acid*:6", "base:5", "neutral:6", "sour:5", "lemon juice:5", "vinegar:5"],
      a: "**pH** tells you if something is an **acid** or a **base**, on a scale from **0 to 14**. 🧪 Pure water is **7**, right in the middle (neutral). Lemon juice and vinegar are acids with low numbers, and they taste sour. Soap and baking soda are bases with high numbers. Water operators check pH every day, because water that's too acidic can eat away at pipes!",
      rel: ["water-operator", "universal-solvent", "experiments"] },
    { id: "molecules", q: "What are atoms and molecules?",
      k: ["atom*:7", "molecule*:7", "hydrogen:6", "oxygen:4", "tiny pieces:5"],
      a: "Everything is made of super tiny pieces called **atoms**. ⚛️ When atoms stick together, they make a **molecule**. A water molecule is **two hydrogen atoms + one oxygen atom**, which is why scientists write it **H₂O**! Water molecules are SO small that one drop holds more of them than there are stars in our galaxy.",
      rel: ["h2o", "states-of-matter", "surface-tension"] },
    { id: "salt-ice", q: "Why do we put salt on icy roads?",
      k: ["salt on ice:8", "salt on road*:8", "salt melt*:8", "road salt:8", "icy road*:7", "salt ice:7"],
      a: "Salt makes ice melt at a **lower temperature**! 🧂 Plain water freezes at **32°F**, but salty water has to get even colder before it freezes. So when trucks spread salt on icy roads, the ice turns back into slushy water, even when it's below freezing. It's also why the salty ocean doesn't freeze as easily as a lake.",
      rel: ["ice", "salt-water", "states-of-matter"] },
    { id: "boats-float", q: "How do big boats float?",
      k: ["boat* float*:8", "ship* float*:8", "how do boats float:8", "buoyan*:8", "why do ships float:8", "steel float:6"],
      a: "Boats float thanks to **buoyancy**! 🚢 When a boat sits in water, it pushes some water out of the way, and the water pushes back up with a force equal to the weight of the water that was moved. A boat's hollow shape moves a LOT of water, so that upward push can hold up even a giant steel ship. Squash the same steel into a ball and it would sink!",
      rel: ["density", "ice", "experiments"] },
    { id: "scientific-method", q: "How do scientists solve mysteries?",
      k: ["scientific method:8", "hypothes*:8", "how do scientists:7", "science steps:7", "observe:5", "observation*:5"],
      a: "Scientists solve mysteries step by step! 🔬\n1. **Ask a question**, like: does salt water freeze slower?\n2. Make a **hypothesis**, a smart guess.\n3. Do an **experiment** to test it.\n4. **Observe** and write down what happens.\n5. Decide what it means, and share it!\nEven when a guess is wrong, you learned something. That's science!",
      rel: ["experiments", "water-scientists", "salt-ice"] },
    { id: "rain-garden", q: "What are rain barrels and rain gardens?",
      k: ["rain barrel*:8", "rain garden*:8", "catch rain*:7", "collect rain*:7", "rainwater:4"],
      a: "Two cool ways to use rain! 🌧️\n🛢️ A **rain barrel** catches rain from your roof's gutters so you can water plants later. Free water!\n🌼 A **rain garden** is planted in a low spot where rain from roofs and driveways collects. The plants and soil soak it up, so less dirty runoff rushes into storm drains and creeks. Butterflies love them too!",
      rel: ["save-water", "storm-drains", "collection"] },
    { id: "water-footprint", q: "What is a water footprint?",
      k: ["water footprint:8", "footprint:6", "t-shirt:6", "tshirt:6", "hidden water:7", "virtual water:7", "water to make:6"],
      a: "Your **water footprint** is all the water it takes to make the things you use, eat, and wear. 👣 It takes about **700 gallons** of water to grow the cotton and make one T-shirt, and about **37 gallons** to grow the beans for one cup of a grown-up's coffee! Using things longer, wasting less food, and recycling all shrink your water footprint.",
      rel: ["save-water", "home-water-use", "plants-need-water"] },
    { id: "world-water-day", q: "What is World Water Day?",
      k: ["world water day:8", "march 22:8", "water day:6", "united nations:5"],
      a: "**World Water Day** is **March 22** every year! 🌍 The United Nations started it in 1993 to help people everywhere learn about fresh water, and to remember that billions of people still don't have safe water at home. Your class could celebrate by making posters, testing water-saving ideas, or finding out where your town's water comes from!",
      rel: ["save-water", "fresh-water", "earth-water"] },
    { id: "hard-water", q: "What is hard water?",
      k: ["hard water:8", "soft water:7", "white spots:7", "water softener*:7", "calcium:5", "magnesium:5", "soap scum:6"],
      a: "**Hard water** has lots of dissolved minerals, mostly **calcium and magnesium**, picked up as water travels through rocks. 🫧 It's safe to drink, but it can leave **white spots** on dishes, crusty scale in kettles, and make soap harder to lather. Soft water has fewer minerals. Some homes use a **water softener** to swap those minerals out.",
      rel: ["universal-solvent", "groundwater", "treatment-plant"] },
    { id: "cloudy-tap-water", q: "Why is my tap water cloudy?",
      k: ["cloudy water:8", "water cloudy:8", "water is cloudy:8", "milky water:8", "milky:6", "white water:6", "tap water cloudy:8", "bubbles in my water:7", "cloudy tap:8"],
      a: "If a glass of tap water looks milky or white, it's usually just **tiny air bubbles**! 🫧 Water in pipes is under pressure, which squeezes extra air into it. When it comes out of the faucet, the bubbles escape. Watch closely: the glass clears from the **bottom up** in a minute or two. If it stays cloudy or looks brown, tell a grown-up so they can call the water company.",
      rel: ["turbidity", "water-pipes", "safe-to-drink"] },
    { id: "tap-vs-bottled", q: "Is tap water or bottled water better?",
      k: ["bottled water:8", "is tap water safe:8", "tap water safe:8", "bottle* or tap:8", "tap or bottle*:8", "water bottle*:5", "plastic bottle*:5"],
      a: "Both can be safe! 💧 In the U.S., your water system tests **tap water** under EPA rules, and **bottled water** follows FDA rules. Tap water costs **less than a penny a gallon**, and it doesn't make plastic trash. A reusable bottle filled from the tap is a win for your wallet AND the planet! 🌎",
      rel: ["safe-to-drink", "plastic", "drink-water"] },
    { id: "wrinkly-fingers", q: "Why do my fingers get wrinkly in the bath?",
      k: ["wrinkl*:8", "prune*:6", "pruney:7", "fingers bath:6", "fingers in water:7"],
      a: "After a long bath your fingers get wrinkly, and your **body does it on purpose**! 🛁 Your nerves tell tiny blood vessels in your fingertips to shrink, which pulls the skin into wrinkles. Scientists think the wrinkles may work like **tire treads** to help you grip wet, slippery things. They go away soon after you dry off.",
      rel: ["body-water", "sweat", "swim-safety"] },
    { id: "biggest-lakes", q: "What is the biggest lake in the world?",
      k: ["biggest lake*:8", "largest lake*:8", "deepest lake*:8", "great lakes:7", "lake superior:8", "caspian:8", "baikal:8"],
      a: "The **Caspian Sea**, between Europe and Asia, is the biggest lake in the world, but it's salty! 🌊 The biggest **freshwater** lake by area is **Lake Superior**, one of America's Great Lakes. The deepest lake, **Lake Baikal** in Russia, is more than a mile deep and holds more fresh water than all five Great Lakes combined!",
      rel: ["lakes-freeze", "fresh-water", "longest-river"] },
    { id: "longest-river", q: "What is the longest river in the world?",
      k: ["longest river*:8", "nile:8", "amazon:8", "biggest river*:7", "largest river*:7"],
      a: "The **Nile** in Africa and the **Amazon** in South America are the two longest rivers on Earth, each about **4,000 miles** long! 🌍 Scientists still argue about which one wins, because it's tricky to say exactly where a river starts. The Amazon carries the MOST water by far. In the U.S., the Missouri and Mississippi rivers together make one of the longest river systems in the world.",
      rel: ["mississippi-river", "rivers", "biggest-lakes"] }
  ];

  /* ---------------- Fun facts, jokes, quiz ---------------- */
  var FACTS = [
    "A puffy cumulus cloud can weigh about **1.1 million pounds** — as much as 100 elephants! ☁️🐘",
    "Ice is about **9% less dense** than liquid water — that's why it floats! 🧊",
    "Your **brain is about 73% water**. Stay hydrated, big thinker! 🧠",
    "A dripping faucet can waste **3,000+ gallons a year**. 💧",
    "About **88%** of Mississippi's public water comes from **groundwater**! 🪣",
    "The **Mississippi River** is about **2,340 miles** long. 🌊",
    "Snowflakes almost always have **six sides**. ❄️",
    "Raindrops are shaped more like **hamburger buns** than teardrops! 🍔💧",
    "Astronauts on the Space Station **recycle their sweat** into drinking water! 🚀",
    "A big tree can release **hundreds of gallons** of water into the air on a hot day. 🌳",
    "The ocean's deepest spot, the **Mariana Trench**, is almost **7 miles** deep! 🌊",
    "Frogs **drink through their skin**! 🐸",
    "The **blue whale** has a heart about the size of a small car! 🐋",
    "Hot water can freeze faster than cold water in some conditions — scientists call it the **Mpemba effect**! 🧪",
    "Water is the only common substance found naturally as a **solid, liquid, and gas** on Earth. 🌍"
  ];
  var JOKES = [
    "What did one raindrop say to the other? **Two's company, three's a cloud!** ☁️😄",
    "Why did the water go to the doctor? **It had a drip!** 💧🤧",
    "What do you call a pile of lost water? **A puddle of confusion!** 🤔",
    "What did the ocean say to the beach? **Nothing — it just waved!** 👋🌊",
    "Why are fish so smart? **They live in schools!** 🐟📚",
    "What's a cloud's favorite game? **Rain-Rain-Go-Away tag!** 🌧️",
    "How does the ocean say hi? **It waves!** 🌊",
    "What kind of water can't freeze? **Hot water!** ♨️"
  ];
  var QUIZ = [
    { q: "What do we call it when the sun turns water into vapor?", o: ["Evaporation", "Condensation", "Precipitation"], a: 0, why: "Evaporation is liquid water turning into invisible vapor!" },
    { q: "What are clouds made of?", o: ["Cotton", "Tiny water droplets", "Smoke"], a: 1, why: "Clouds are billions of tiny water droplets or ice crystals." },
    { q: "About how much of Earth's surface is covered by water?", o: ["About 25%", "About 50%", "About 71%"], a: 2, why: "About 71% — that's why Earth is the Blue Planet!" },
    { q: "Why does ice float?", o: ["It's less dense than water", "It's full of air bubbles", "It's colder"], a: 0, why: "Water expands when it freezes, so ice is less dense." },
    { q: "What does chlorine do in drinking water?", o: ["Makes it blue", "Kills germs", "Makes it cold"], a: 1, why: "A tiny bit of chlorine kills germs that could make people sick." },
    { q: "Where does most of Mississippi's drinking water come from?", o: ["The ocean", "Groundwater", "Rainwater tanks"], a: 1, why: "About 88% comes from groundwater pumped up from wells!" },
    { q: "What is water made of?", o: ["H₂O", "CO₂", "O₂"], a: 0, why: "Two hydrogen atoms + one oxygen atom = H₂O." },
    { q: "Where does water from a street storm drain usually go?", o: ["A treatment plant", "Straight to a creek or river", "Back to your house"], a: 1, why: "Storm drains usually flow straight to creeks and rivers — only rain down the drain!" },
    { q: "Which saves the most water?", o: ["Leaving the tap on while brushing", "Fixing a leaky faucet", "Taking a 30-minute shower"], a: 1, why: "A drippy faucet can waste over 3,000 gallons a year!" },
    { q: "What do fish use to breathe?", o: ["Lungs", "Gills", "Fins"], a: 1, why: "Gills grab the oxygen that's mixed into water." },
    { q: "What pushes water from a water tower to your house?", o: ["Gravity", "Magnets", "Wind"], a: 0, why: "The weight of water up high creates pressure — gravity at work!" },
    { q: "What is it called when plants release water vapor from their leaves?", o: ["Transpiration", "Evaporation", "Filtration"], a: 0, why: "Transpiration — plants 'sweat' water through tiny holes in their leaves." },
    { q: "Is it safe to drink from a clear-looking stream?", o: ["Yes, if it's clear", "No — it can have germs", "Only in winter"], a: 1, why: "Clear water can still have germs too small to see!" },
    { q: "How much of your body is water?", o: ["About 10%", "About 60%", "About 95%"], a: 1, why: "You're about 60% water!" },
    { q: "What's the biggest animal ever?", o: ["T. rex", "Blue whale", "Elephant"], a: 1, why: "The blue whale is bigger than any dinosaur!" }
  ];

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function askQuiz(state) {
    var q = pick(QUIZ.filter(function (x) { return !state.memo.quiz || x !== state.memo.quiz.item; }));
    state.memo.quiz = { item: q };
    var letters = ['A', 'B', 'C'];
    return {
      text: "🧠 **Quiz time!** " + q.q,
      chips: q.o.map(function (o, i) { return letters[i] + ') ' + o; })
    };
  }

  function quizSkill(raw, norm, state) {
    var cur = state.memo.quiz;
    if (cur) {
      var item = cur.item, idx = -1;
      var m = norm.match(/^([abc])(\)|\b)/);
      if (m) idx = 'abc'.indexOf(m[1]);
      if (idx < 0) item.o.forEach(function (o, i) { if (norm.indexOf(global.GregEngine.normalize(o)) !== -1) idx = i; });
      if (idx >= 0) {
        state.memo.quiz = null;
        var right = idx === item.a;
        return {
          text: (right ? "✅ **Yes! Great job!** " : "❌ Not quite — the answer is **" + item.o[item.a] + "**. ") + item.why,
          chips: ["Quiz me again!", "Tell me a fun fact", "What is the water cycle?"]
        };
      }
      if (/^(skip|next|another|new one|pass)\b/.test(norm)) return askQuiz(state);
      if (/^(stop|quit|no more|end)\b/.test(norm)) { state.memo.quiz = null; return { text: "Okay, quiz over! You can say **quiz me** anytime. 😊", chips: [] }; }
      state.memo.quiz = null;
    }
    if (/\b(quiz me|test me|ask me a question|quiz me again|another quiz|give me a quiz|question for me)\b/.test(norm)) return askQuiz(state);
    return null;
  }

  function smallTalk(raw, norm) {
    var w = norm.split(' ').length;
    if (/^(hi|hello|hey|howdy|yo|hiya|sup|whats up|good morning|good afternoon)\b/.test(norm) && w <= 4) {
      return { text: pick(["Hey hey! 👋 I'm Greg! What water mystery should we solve today?", "Hi there, explorer! 💧 Ask me anything about water — or say **quiz me**!", "Hello! 🔬 Ready for some water science?"]),
        chips: ["What is the water cycle?", "Tell me a fun fact", "Quiz me!"] };
    }
    if (/^(how are you|how r u|hows it going|how are u)\b/.test(norm)) return { text: "I'm feeling **fantastic** — like a fresh glass of water on a hot day! 😄 How about you? Want to learn something cool?", chips: ["Tell me a fun fact", "Quiz me!"] };
    if (/\b(thank|thanks|thx|ty)\b/.test(norm) && w <= 5) return { text: "You're SO welcome! 😊 Keep asking questions — that's what real scientists do!", chips: ["Tell me a fun fact", "Quiz me!"] };
    if (/^(bye|goodbye|see you|see ya|later|gotta go)\b/.test(norm)) return { text: "Bye, explorer! 👋 Don't forget to drink some water today! 💧", chips: [] };
    if (/\b(joke|funny|make me laugh)\b/.test(norm)) return { text: pick(JOKES), chips: ["Tell me another joke", "Tell me a fun fact"] };
    if (/\b(fun fact|a fact|another fact|cool fact|random fact|tell me something|surprise me)\b/.test(norm)) return { text: "💡 " + pick(FACTS), chips: ["Tell me another fact", "Quiz me!", "Tell me a joke"] };
    if (/\b(i love you|you're cool|you are cool|you're awesome|you are awesome|best)\b/.test(norm) && w <= 5) return { text: "Aww, thanks! 🥰 You're an awesome explorer!", chips: ["Tell me a fun fact"] };
    if (/\b(stupid|dumb|hate you|shut up)\b/.test(norm)) return { text: "Oops, sounds like something's frustrating! 😅 Let's try something fun — want a joke or a quick quiz?", chips: ["Tell me a joke", "Quiz me!"] };
    return null;
  }


  /* ---------------- Word Lab words (js/glossary-kids.js) ----------------
     Greg explains any Word Lab word, unless one of his own answers is
     already about it, and checks the words again before giving up. */
  function kwNorm(s) { return global.GregEngine.normalize(String(s || '').replace(/₂/g, '2')).replace(/^(?:a|an|the)\s+/, ''); }
  function kwStem(n) { return n.split(' ').map(global.GregEngine.stem).join(' '); }
  var KW = null;
  function kwIndex() {
    if (KW) return KW;
    KW = { exact: {}, stem: {} };
    (global.KIDS_WORDS || []).forEach(function (w) {
      var n = kwNorm(w[0]), st = kwStem(n);
      if (!KW.exact[n]) KW.exact[n] = w;
      if (!KW.stem[st]) KW.stem[st] = w;
    });
    return KW;
  }
  function kwLookup(text) {
    var ix = kwIndex(), n = kwNorm(text);
    return n ? ix.exact[n] || ix.stem[kwStem(n)] || null : null;
  }
  /* A near-miss spelling, like “evaperation” */
  function kwFuzzy(text) {
    var ix = kwIndex(), n = kwNorm(text), best = null, bestD = 9;
    if (n.length < 5 || n.split(' ').length > 2) return null;
    var max = n.length >= 9 ? 2 : 1;
    Object.keys(ix.exact).forEach(function (k) {
      if (Math.abs(k.length - n.length) > max) return;
      var d = global.GregEngine.editDistance(n, k, max);
      if (d <= max && d < bestD) { best = ix.exact[k]; bestD = d; }
    });
    return best;
  }
  function wordReply(w, lead, related) {
    return {
      text: (lead || '') + w[1] + ' **' + w[0] + '**' + (w[2] ? ' (say it: “' + w[2] + '”)' : '') + '\n' + w[3] + '\n💡 **Example:** ' + w[4],
      chips: (related || []).concat(['Quiz me!', 'What is the Word Lab?', 'Tell me a fun fact']).slice(0, 3),
      id: 'word'
    };
  }
  function wordSkill(raw, norm, state, api) {
    if (!global.KIDS_WORDS) return null;
    var t = global.GregEngine.defTarget(raw), n = kwNorm(t.term);
    if (!n || n.split(' ').length > 5) return null;
    var w = kwLookup(t.term);
    if (!w || api.isAbout(t.term, [n, kwNorm(w[0])])) return null;
    state.last = null;
    /* Point to Greg's closest full answer, if he has one */
    var near = api.rank(w[0]).filter(function (r) { return r.s >= 12; }).slice(0, 1).map(function (r) { return r.e.q; });
    return wordReply(w, '', near);
  }

  global.GREG_KIDS = {
    entries: E,
    facts: FACTS,
    starterChips: ["What is the water cycle?", "Why does ice float?", "Tell me a fun fact", "Quiz me!"],
    fallback: function (raw, sugg) {
      if (global.KIDS_WORDS) {
        var t = global.GregEngine.defTarget(raw), w = kwLookup(t.term) || kwFuzzy(t.term);
        if (w) return wordReply(w, 'Did you mean this word? ', sugg.slice(0, 1));
      }
      return {
        text: "Hmm, that's a tricky one — I'm not sure yet! 🤔 I'm best at water questions: rain, oceans, ice, clean water, saving water, and water animals." + (sugg.length ? " Did you mean one of these?" : " Try one of these!"),
        chips: sugg.length ? sugg : ["What is the water cycle?", "Tell me a fun fact", "Quiz me!"]
      };
    },
    create: function () {
      var G = global.GregEngine;
      return G.create({
        entries: E,
        skills: [G.skills.kidSafety, quizSkill, smallTalk, wordSkill],
        fallback: global.GREG_KIDS.fallback,
        starterChips: global.GREG_KIDS.starterChips,
        moreLabel: 'Tell me more!',
        minScore: 1.2
      });
    }
  };
})(window);
