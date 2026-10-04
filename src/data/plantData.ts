import { FixCard, RescueDayStep, PricingTier, Testimonial } from '../types';

export const PLANT_TYPES = [
  { id: 'monstera', name: 'Monstera Deliciosa', baseDays: 7, idealLight: 'Bright indirect', tip: 'Water when top 3–5 cm of soil is dry. Sponge down leaves monthly.' },
  { id: 'pothos', name: 'Golden / Marble Pothos', baseDays: 8, idealLight: 'Low to medium', tip: 'Let soil dry halfway down before watering. Tolerates minor neglect.' },
  { id: 'snake', name: 'Snake Plant (Sansevieria)', baseDays: 21, idealLight: 'Any indirect light', tip: 'Water sparingly. Drought tolerant; soil must be bone dry between waterings.' },
  { id: 'cactus', name: 'Desert Cactus', baseDays: 24, idealLight: 'Direct sun', tip: 'Drench thoroughly, then let dry completely. Needs maximum solar energy.' },
  { id: 'fern', name: 'Boston Fern', baseDays: 3, idealLight: 'Medium indirect', tip: 'Keep soil consistently damp, never soggy. Thrives in high humidity.' },
  { id: 'ficus', name: 'Fiddle Leaf Fig / Rubber Tree', baseDays: 7, idealLight: 'Bright indirect', tip: 'Dislikes drafts. Water deeply when top 5 cm feels dry.' },
  { id: 'peace', name: 'Peace Lily', baseDays: 5, idealLight: 'Medium to low', tip: 'Droops dramatically when thirsty. Prefers room-temperature filtered water.' },
  { id: 'aloe', name: 'Aloe Vera', baseDays: 18, idealLight: 'Bright sunny spot', tip: 'Store excess moisture in fleshy leaves. Prone to stem rot if overwatered.' },
  { id: 'calathea', name: 'Calathea / Prayer Plant', baseDays: 5, idealLight: 'Medium indirect', tip: 'Sensitive to fluoride in tap water. Keep ambient humidity above 55%.' },
  { id: 'zz', name: 'ZZ Plant (Zamioculcas)', baseDays: 19, idealLight: 'Low to bright indirect', tip: 'Rhizomes store water for weeks. If in doubt, hold off on watering.' },
];

export const SYMPTOMS = [
  { id: 'yellow', label: 'Yellow leaves', description: 'Leaves turning pale or bright yellow, starting from bottom or overall.' },
  { id: 'wilting', label: 'Wilting / drooping stems', description: 'Stems lacking turgor pressure, sagging limp or shriveling.' },
  { id: 'brownTips', label: 'Brown crispy leaf tips', description: 'Crisp, brittle brown margins or edges on otherwise green foliage.' },
  { id: 'spots', label: 'Dark / black soft spots', description: 'Irregular brown or black rings with yellow halos on leaf blades.' },
  { id: 'pests', label: 'Visible insects or fine webs', description: 'Tiny crawling bugs, white cottony fluff, or fine silk under foliage.' },
  { id: 'noGrowth', label: 'Stunted or no new growth', description: 'Plant has stalled for months with small, pale, or absent shoots.' },
  { id: 'curling', label: 'Leaves curling inward', description: 'Foliage rolling inward into tight tubes or cups.' },
  { id: 'dropping', label: 'Sudden green leaf drop', description: 'Healthy-looking green leaves falling without changing color first.' },
];

export const LIGHT_LEVELS = [
  { id: 'low', label: 'Low light / no nearby window' },
  { id: 'medium', label: 'Medium indirect (3–6 ft from window)' },
  { id: 'bright', label: 'Bright indirect (near sheer curtain)' },
  { id: 'direct', label: 'Direct sunlight (south/west sill)' },
];

export const WATERING_FREQUENCIES = [
  { id: 'daily', label: 'Daily (Every 24 hours)' },
  { id: '2-3days', label: 'Every 2 to 3 days' },
  { id: 'weekly', label: 'Once a week' },
  { id: 'rarely', label: 'Every 2 to 3+ weeks' },
];

export const DIAGNOSIS_MATRIX: Record<string, Record<string, { cause: string; fix: string; prevent: string; severity: 'low' | 'moderate' | 'critical'; recoveryDays: number }>> = {
  yellow: {
    low: {
      cause: "Root asphyxiation from combined overwatering & low light",
      fix: "Stop watering immediately for 7–10 days. Aerate compacted soil with a clean wooden chopstick. Relocate plant to a brighter indirect light zone.",
      prevent: "Only hydrate when the top 4 cm of potting mix is fully dry to touch.",
      severity: 'critical',
      recoveryDays: 7
    },
    medium: {
      cause: "Early-stage overwatering & poor drainage",
      fix: "Drain excess water from the cachepot saucer. Allow root ball to dry out until the pot feels notably lightweight before giving another drop.",
      prevent: "Ensure pot has at least 1 functional drainage hole; never allow roots to soak in standing run-off.",
      severity: 'moderate',
      recoveryDays: 5
    },
    bright: {
      cause: "Nitrogen / micronutrient deficiency",
      fix: "Feed with a balanced liquid houseplant fertilizer diluted to 50% strength on your next planned watering.",
      prevent: "Establish a 4-week feeding cycle through active spring and summer months.",
      severity: 'low',
      recoveryDays: 10
    },
    direct: {
      cause: "Solar scorching / intense ultraviolet burn",
      fix: "Step the plant back 3 feet away from scorching glass or hang a sheer linen curtain to diffuse harsh rays.",
      prevent: "Gradually acclimate indoor foliage over 14 days before placing in direct south-facing exposure.",
      severity: 'moderate',
      recoveryDays: 6
    }
  },
  wilting: {
    low: {
      cause: "Root rot: fungal pathogens attacking suffocated roots",
      fix: "Carefully slide plant out of container. Snip away black, mushy, or foul-smelling roots with sterilized shears. Repot in fresh, chunky, porous soil.",
      prevent: "Incorporate 30% perlite or orchid bark for rapid water evacuation.",
      severity: 'critical',
      recoveryDays: 9
    },
    medium: {
      cause: "Underwatering & cellular dehydration",
      fix: "Submerge the nursery pot halfway in room-temperature water for 25 minutes (bottom watering) so peat can re-expand evenly.",
      prevent: "Check soil moisture depth every 4 days using your finger or a bamboo skewer.",
      severity: 'moderate',
      recoveryDays: 3
    },
    bright: {
      cause: "Thermal stress & accelerated transpiration",
      fix: "Drench thoroughly, mist surrounding air, and shield from nearby heater vents or air conditioning blasts.",
      prevent: "Keep ambient room temperature between 18°C and 26°C without abrupt draft swings.",
      severity: 'moderate',
      recoveryDays: 4
    },
    direct: {
      cause: "Severe desiccation from solar bake",
      fix: "Move immediately to shaded recovery corner. Give a lukewarm deep soak until moisture bubbles cease.",
      prevent: "Pair high light exposures with consistent, deeper watering cycles.",
      severity: 'critical',
      recoveryDays: 4
    }
  },
  brownTips: {
    low: {
      cause: "Low ambient humidity & stagnant airflow",
      fix: "Set the planter on a pebble tray filled with water (keeping pot bottom above waterline) or run an ultrasonic humidifier.",
      prevent: "Group companion plants together to generate a localized microclimate.",
      severity: 'low',
      recoveryDays: 7
    },
    medium: {
      cause: "Mineral toxicity from municipal tap water salts / chlorine",
      fix: "Flush pot with distilled or rainwater to wash out residual salts. Trim crisp brown edges leaving a 1mm margin of brown so live tissue isn't re-wounded.",
      prevent: "Let tap water rest uncovered for 24 hours or switch to filtered water for sensitive varieties.",
      severity: 'low',
      recoveryDays: 5
    },
    bright: {
      cause: "Erratic watering cycles (alternating between drought and flood)",
      fix: "Establish an even rhythm. Water before the soil shrinks away from container sidewalls.",
      prevent: "Use the built-in watering calculator to calibrate exact intervals.",
      severity: 'moderate',
      recoveryDays: 6
    },
    direct: {
      cause: "Extreme air dryness accelerated by solar heat",
      fix: "Filter the light with a curtain and increase moisture retention in the soil.",
      prevent: "Topdress soil with a light layer of sphagnum moss or coconut coir chips.",
      severity: 'low',
      recoveryDays: 6
    }
  },
  spots: {
    low: {
      cause: "Fungal leaf spot (Cercospora or Alternaria) favored by cool damp air",
      fix: "Prune heavily spotted foliage with isopropyl-cleaned shears. Treat remaining leaves with organic copper fungicide or sulfur spray.",
      prevent: "Water only the soil surface; never splash or mist leaves in uncirculated rooms.",
      severity: 'critical',
      recoveryDays: 8
    },
    medium: {
      cause: "Bacterial leaf spot or edema from inconsistent moisture pressure",
      fix: "Isolate plant from companions. Allow soil to dry noticeably and avoid overhead water.",
      prevent: "Provide steady low-speed fan air circulation in plant rooms.",
      severity: 'moderate',
      recoveryDays: 7
    },
    bright: {
      cause: "Water droplets magnifying light onto leaf surface (magnification burn)",
      fix: "Wipe dry foliage. Remove disfigured leaves if more than 50% ruined.",
      prevent: "Water exclusively in early morning at the soil level.",
      severity: 'low',
      recoveryDays: 5
    },
    direct: {
      cause: "Sun scald localized tissue necrosis",
      fix: "Shift 2 feet back. Scorched areas will not re-green but new foliage will emerge healthy.",
      prevent: "Rotate the container a quarter-turn each week for symmetrical light distribution.",
      severity: 'moderate',
      recoveryDays: 7
    }
  },
  pests: {
    low: {
      cause: "Fungus gnats breeding in perpetually wet surface soil",
      fix: "Let the top 5 cm of soil dry out completely. Insert yellow sticky cards and bottom-drench with biological Bacillus thuringiensis (Mosquito Bits) tea.",
      prevent: "Cover topsoil with a 1 cm layer of clean coarse horticultural sand.",
      severity: 'moderate',
      recoveryDays: 6
    },
    medium: {
      cause: "Spider mites thriving in warm, dry atmospheric conditions",
      fix: "Shower the entire plant in lukewarm water to dislodge webs. Spray undersides of leaves thoroughly with cold-pressed neem oil or insecticidal soap.",
      prevent: "Spray foliage with fine mist weekly to deter mite colonization.",
      severity: 'critical',
      recoveryDays: 7
    },
    bright: {
      cause: "Mealybugs or soft scale clusters hiding in leaf axils",
      fix: "Dip a cotton swab in 70% isopropyl alcohol and dab directly onto white cottony bugs. Follow with horticultural oil spray.",
      prevent: "Inspect leaf joints during routine weekly waterings.",
      severity: 'critical',
      recoveryDays: 8
    },
    direct: {
      cause: "Thrips infestation on tender growth tips",
      fix: "Isolate immediately. Treat foliage and soil drench with systemic insecticidal granules or spinosad spray.",
      prevent: "Quarantine any newly purchased nursery plant for 14 full days before mingling.",
      severity: 'critical',
      recoveryDays: 10
    }
  },
  noGrowth: {
    low: {
      cause: "Light starvation inducing forced winter dormancy",
      fix: "Move directly into an unobstructed east or south-facing window, or position an LED full-spectrum grow bulb 12 inches overhead for 10 hours daily.",
      prevent: "Ensure minimum 250 foot-candles of ambient light for tropical foliage.",
      severity: 'moderate',
      recoveryDays: 14
    },
    medium: {
      cause: "Root-bound root ball choking off nutrients and oxygen",
      fix: "Unpot and inspect. If roots form a dense spiral, gently tease apart lower roots and pot up into a container 5 cm wider with fresh nutrient-rich mix.",
      prevent: "Upsize containers every 18–24 months as plants mature.",
      severity: 'low',
      recoveryDays: 12
    },
    bright: {
      cause: "Depleted potting substrate minerals",
      fix: "Top-dress with worm castings and supply balanced 20-20-20 soluble fertilizer at half strength.",
      prevent: "Refresh top 5 cm of soil annually each spring.",
      severity: 'low',
      recoveryDays: 10
    },
    direct: {
      cause: "Excessive heat stalling photosynthetic enzymes",
      fix: "Provide afternoon shade when indoor temps climb above 28°C.",
      prevent: "Ventilate room or position plant out of hot window thermal pocket.",
      severity: 'moderate',
      recoveryDays: 7
    }
  },
  curling: {
    low: {
      cause: "Extreme air dryness or shock from cold draft",
      fix: "Move away from leaky window frames or exterior doors. Place near a humidifier.",
      prevent: "Never place plants directly in the path of cold air conditioners or drafty hallways.",
      severity: 'moderate',
      recoveryDays: 5
    },
    medium: {
      cause: "Hydrophobic peat moss repelling water",
      fix: "Soil has dried so much it shrinks into a brick. Bottom-soak container for 45 minutes until top soil becomes moist.",
      prevent: "Do not let potting mix desiccate completely unless caring for desert cacti.",
      severity: 'moderate',
      recoveryDays: 3
    },
    bright: {
      cause: "Heat transpiration defense (leaf surface reduction)",
      fix: "Foliage curls to reduce water loss under bright light. Increase watering volume slightly and mist room.",
      prevent: "Monitor root moisture depth consistently twice weekly.",
      severity: 'low',
      recoveryDays: 4
    },
    direct: {
      cause: "Severe sun overload & rapid dehydration",
      fix: "Shift to bright indirect light and soak substrate.",
      prevent: "Provide sheer protection during peak midday 11am–3pm hours.",
      severity: 'moderate',
      recoveryDays: 4
    }
  },
  dropping: {
    low: {
      cause: "Environmental shock & sudden light drop",
      fix: "Provide stable grow light supplemental spectrum. Do not relocate or repot while stabilizing.",
      prevent: "Transition plants gradually over 10 days when moving from outdoors to indoors.",
      severity: 'moderate',
      recoveryDays: 7
    },
    medium: {
      cause: "Sudden temperature plunge or cold shock",
      fix: "Check for drafts from opening doors or air conditioners. Stabilize room at 20°C.",
      prevent: "Keep tropical varieties above 15°C at all times.",
      severity: 'moderate',
      recoveryDays: 6
    },
    bright: {
      cause: "Repotting shock or severe root disturbance",
      fix: "Keep in warm humid room. Do not fertilize for 30 days while roots establish.",
      prevent: "Be gentle with delicate root hairs during soil replacement.",
      severity: 'moderate',
      recoveryDays: 10
    },
    direct: {
      cause: "Extreme heat wave shock",
      fix: "Move deeper into the room. Keep moisture level consistent.",
      prevent: "Monitor indoor temps during summer heat spikes.",
      severity: 'low',
      recoveryDays: 5
    }
  }
};

export const TWENTY_FIX_CARDS: FixCard[] = [
  {
    id: 'card-1',
    title: 'The Yellow Leaf Triage',
    category: 'watering',
    symptom: 'Lower leaves turning pale butter yellow with soft watery stems',
    primaryCause: 'Overwatering resulting in root cellular hypoxia (oxygen starvation)',
    emergencyStep: 'Cease watering. Tip out drainage saucer. Probe soil with wooden skewer; if damp, don\'t water for 7 days.',
    dayByDayGuide: [
      'Day 1: Discard pooling drainage water and lift pot onto drying rack.',
      'Day 2: Insert chopstick 5 times around pot rim to create aeration channels.',
      'Day 3: Move 2 feet closer to gentle indirect light to spur transpiration.',
      'Day 5: Check skewer depth; trim fully yellowed leaves at base of stem.',
      'Day 7: First light bottom sip only if root ball is 75% dry.'
    ],
    preventionRule: 'Follow the 2-inch rule: never water until the top 5 cm is dry.',
    affectedPlants: ['Monstera', 'Pothos', 'Ficus', 'Peace Lily']
  },
  {
    id: 'card-2',
    title: 'Root Rot Resuscitation',
    category: 'watering',
    symptom: 'Wilted foliage despite wet soil, foul sulfur odor from container base',
    primaryCause: 'Pythium or Phytophthora fungal rot consuming decaying roots',
    emergencyStep: 'Unpot plant immediately. Wash away wet soil and amputate black mushy roots with alcohol-sterilized scissors.',
    dayByDayGuide: [
      'Day 1: Emergency surgery: remove 100% of rotted roots. Soak root ball in 3% hydrogen peroxide solution (1:4 with water).',
      'Day 2: Let pruned roots air dry for 4 hours on paper towels.',
      'Day 3: Repot in sterile mix containing 40% pumice/perlite in a clean pot with holes.',
      'Day 5: Keep in warm, high-humidity shade. Do not water heavily.',
      'Day 7: Light perimeter watering only when new root buds begin emerging.'
    ],
    preventionRule: 'Always use pots with drainage and porous, well-aerated chunky substrates.',
    affectedPlants: ['Snake Plant', 'ZZ Plant', 'Monstera', 'Aloe Vera']
  },
  {
    id: 'card-3',
    title: 'Fungus Gnat Eradication',
    category: 'pests',
    symptom: 'Clouds of tiny black flies hovering around soil surface and windows',
    primaryCause: 'Larvae feeding on wet organic matter and delicate root hairs',
    emergencyStep: 'Let the top 5 cm of soil dry to bone-dry crispness. Install bright yellow sticky traps at soil rim.',
    dayByDayGuide: [
      'Day 1: Position 3 sticky cards at pot rim to trap reproductive adults.',
      'Day 2: Dissolve Bacillus thuringiensis israelensis (BTI / Mosquito Bits) in warm water for 30 minutes.',
      'Day 3: Water plant with the BTI tea to biological target larvae in the topsoil.',
      'Day 5: Spread 1 cm layer of sharp horticultural sand or perlite across entire soil surface.',
      'Day 7: Re-inspect traps. Adult population typically drops by 90%.'
    ],
    preventionRule: 'Bottom water or keep top 3 cm dry; fungus gnats cannot lay eggs in dry substrate.',
    affectedPlants: ['Fern', 'Calathea', 'Pothos', 'Peace Lily']
  },
  {
    id: 'card-4',
    title: 'Spider Mite Wipeout',
    category: 'pests',
    symptom: 'Dusty appearance under leaves, stippled yellow dots, fine gossamer webbing',
    primaryCause: 'Tetranychus urticae proliferating in dry indoor winter air',
    emergencyStep: 'Isolate plant. Take to shower or sink and spray down tops and undersides of leaves with lukewarm water.',
    dayByDayGuide: [
      'Day 1: Physical removal via high-pressure water blast to snap webs.',
      'Day 2: Spray every leaf surface with cold-pressed neem oil or potassium soap spray.',
      'Day 4: Wipe leaves with microfiber cloth dipped in dilute soapy water.',
      'Day 6: Repeat horticultural oil spray to eliminate newly hatched eggs.',
      'Day 7: Introduce humidity tray or room humidifier to maintain >55% RH.'
    ],
    preventionRule: 'Spider mites hate humidity. Regularly mist foliage and wipe dust off leaf blades.',
    affectedPlants: ['Ficus', 'Calathea', 'Palm', 'Ivy']
  },
  {
    id: 'card-5',
    title: 'Crispy Brown Tip Fix',
    category: 'watering',
    symptom: 'Hard dry brown tips and margins on mature leaves',
    primaryCause: 'Low relative humidity (<40%) combined with tap water salt accumulation',
    emergencyStep: 'Trim only the dead brown tissue with sterilized scissors, leaving a microscopic brown rim so live tissue isn\'t cut.',
    dayByDayGuide: [
      'Day 1: Precision trim brown tips. Flush potting soil with 1 liter of distilled water to leach salts.',
      'Day 2: Set plant on a broad pebble tray filled with water.',
      'Day 3: Group with 3 companion plants to pool natural transpiration moisture.',
      'Day 5: Switch permanent watering supply to filtered or captured rainwater.',
      'Day 7: Measure new leaves; tips will remain supple and emerald green.'
    ],
    preventionRule: 'Never let tap water chemicals accumulate; flush pots quarterly.',
    affectedPlants: ['Peace Lily', 'Spider Plant', 'Dracaena', 'Calathea']
  },
  {
    id: 'card-6',
    title: 'Mealybug Annihilation',
    category: 'pests',
    symptom: 'Small white fluffy cotton-like cushions nestled in leaf nodes and undersides',
    primaryCause: 'Pseudococcidae sap-sucking insects depleting plant fluids and secreting honeydew',
    emergencyStep: 'Dip cotton swabs into 70% isopropyl alcohol and touch directly to all visible white bugs.',
    dayByDayGuide: [
      'Day 1: Target every visible insect with alcohol swab; watch them instantly dissolve.',
      'Day 2: Mix 1 tsp mild Castile soap + 1 tsp neem oil in 1L warm water; spray entire plant.',
      'Day 4: Check deep into leaf sheaths with a flashlight for hidden nymphs.',
      'Day 6: Secondary alcohol touch-up and foliar rinse.',
      'Day 7: Soil drench with systemic granules if dealing with heavy recurrence.'
    ],
    preventionRule: 'Inspect new plants thoroughly for 2 weeks in quarantine before adding to collection.',
    affectedPlants: ['Succulents', 'Pothos', 'Hoya', 'Monstera']
  },
  {
    id: 'card-7',
    title: 'Severe Dehydration Recovery',
    category: 'watering',
    symptom: 'Drooping limp stems, puckered wrinkled foliage, soil pulling away from pot walls',
    primaryCause: 'Hydrophobic root ball where peat moss shrinks and repels surface water',
    emergencyStep: 'Bottom soak: place pot into a bucket filled with 10 cm of water for 45 minutes.',
    dayByDayGuide: [
      'Day 1: Submerge base until soil surface feels moist via capillary action.',
      'Day 2: Allow excess water to drain freely for 1 hour; do not leave sitting in water.',
      'Day 3: Keep in medium indirect light while leaf cells regain internal pressure.',
      'Day 5: Stems will regain rigidity and stand upright.',
      'Day 7: Establish consistent check on pot weight before next watering.'
    ],
    preventionRule: 'Lift pot weekly. When it feels light as a feather, it is time for a thorough soak.',
    affectedPlants: ['Peace Lily', 'Pothos', 'Fittonia', 'Fern']
  },
  {
    id: 'card-8',
    title: 'Leggy Stretched Stems',
    category: 'light',
    symptom: 'Long, weak, pale stems with excessive spacing between leaves reaching toward light',
    primaryCause: 'Etiolation: plant expending energy stretching for sufficient photons',
    emergencyStep: 'Prune back top leggy growth to activate lower dormant nodes; move to brighter spot.',
    dayByDayGuide: [
      'Day 1: Clean shears and prune 30% of stretched stems back to a healthy leaf node.',
      'Day 2: Relocate plant within 3 feet of an unobstructed east or south window.',
      'Day 3: Propagate healthy cuttings in clean water to bush out the pot later.',
      'Day 5: Observe dormant nodes swelling with new compact shoots.',
      'Day 7: Rotate pot 90 degrees weekly to encourage bushy, symmetrical growth.'
    ],
    preventionRule: 'Rotate plants 90° each time you water so all sides receive balanced light.',
    affectedPlants: ['Pothos', 'Philodendron', 'Succulents', 'Pilea']
  },
  {
    id: 'card-9',
    title: 'Sunburn & Bleaching Reversal',
    category: 'light',
    symptom: 'Silvery, bleached white patches or papery brown scorch holes on top leaves',
    primaryCause: 'Phototoxic solar burn from unacclimated exposure to direct midday rays',
    emergencyStep: 'Move plant immediately behind a sheer curtain or 4 feet away from the window.',
    dayByDayGuide: [
      'Day 1: Retreat to bright indirect lighting. Do not prune leaves unless >70% damaged.',
      'Day 2: Hydrate plant to replenish evaporated moisture.',
      'Day 4: Mist ambient air to cool leaf surfaces.',
      'Day 6: Monitor undamaged leaves for resumed photosynthesis.',
      'Day 7: Gradually harden off plants by adding 30 minutes of gentle morning sun every 3 days.'
    ],
    preventionRule: 'Acclimate indoor plants to brighter spots slowly over 10–14 days.',
    affectedPlants: ['Monstera', 'Calathea', 'Sansevieria', 'Ficus']
  },
  {
    id: 'card-10',
    title: 'Edema (Water Blisters)',
    category: 'watering',
    symptom: 'Small corky bumps, pimples, or blisters under leaves that turn tan and woody',
    primaryCause: 'Roots absorbing moisture faster than leaves can transpire in cool, humid air',
    emergencyStep: 'Reduce watering frequency and increase room temperature and ventilation.',
    dayByDayGuide: [
      'Day 1: Let soil dry significantly. Do not pop or peel corky blisters.',
      'Day 2: Turn on oscillating fan on lowest setting across the room.',
      'Day 4: Water only when top 50% of container substrate is dry.',
      'Day 6: Ensure room temperature does not drop below 18°C at night.',
      'Day 7: New foliage will emerge smooth and free of blisters.'
    ],
    preventionRule: 'Avoid heavy watering on cold, overcast, or rainy days when transpiration slows.',
    affectedPlants: ['Ficus Lyrata', 'Peperomia', 'Jade Plant', 'Schefflera']
  },
  {
    id: 'card-11',
    title: 'Scale Insect Shield Buster',
    category: 'pests',
    symptom: 'Small hard brown waxy domes along stems and leaf ribs, sticky residue on floor',
    primaryCause: 'Armored or soft scale insects protected by waxy shell feeding on phloem sap',
    emergencyStep: 'Manually scrape off waxy shells with an old soft toothbrush dipped in isopropyl alcohol.',
    dayByDayGuide: [
      'Day 1: Systematic physical scraping of every stem and petiole.',
      'Day 2: Spray entire plant with horticultural mineral oil to suffocate invisible crawlers.',
      'Day 4: Clean sticky honeydew from leaves with warm soapy cloth.',
      'Day 6: Repeat targeted alcohol scraping for any missed scales.',
      'Day 7: Apply systemic insecticide granules to the soil for 8-week continuous defense.'
    ],
    preventionRule: 'Wipe plant stems monthly with a damp cloth to catch solitary scales before colonies form.',
    affectedPlants: ['Ficus', 'Citrus', 'Fern', 'Monstera']
  },
  {
    id: 'card-12',
    title: 'Root-Bound Recovery & Pot-Up',
    category: 'nutrition',
    symptom: 'Roots pushing out drainage holes or surfacing on top, soil dries in under 48 hours',
    primaryCause: 'Roots have consumed all substrate volume, leaving no room for water retention',
    emergencyStep: 'Prepare a container 3–5 cm larger with drainage. Never jump to an oversized pot.',
    dayByDayGuide: [
      'Day 1: Water plant 24 hours prior to transplanting to ease extraction.',
      'Day 2: Gently loosen root ball and make 4 vertical score cuts to break circular root growth.',
      'Day 3: Repot into container with fresh premium potting mix + 25% perlite.',
      'Day 4: Water deeply until water flows through drainage; place in bright indirect light.',
      'Day 7: Watch for energetic surge of new leaf growth within 10–14 days.'
    ],
    preventionRule: 'Only upsize pots by 1 to 2 inches in diameter to avoid waterlogged dead zones.',
    affectedPlants: ['Snake Plant', 'ZZ Plant', 'Monstera', 'Pothos']
  },
  {
    id: 'card-13',
    title: 'Cold Shock & Draft Trauma',
    category: 'light',
    symptom: 'Sudden collapse of green foliage, blackening leaf tips after a cold night',
    primaryCause: 'Cell membrane rupture caused by temperatures below 10°C or frosty window contact',
    emergencyStep: 'Move plant immediately away from exterior doors, drafty sills, or AC vents to 21°C room.',
    dayByDayGuide: [
      'Day 1: Relocate to a warm interior space. Do not prune dead blackened leaves immediately.',
      'Day 2: Water with lukewarm room-temperature water if dry (never cold tap water).',
      'Day 4: Wait until clear margin appears between dead tissue and surviving green stems.',
      'Day 6: Prune mushy dead sections with clean shears.',
      'Day 7: Keep warm and sheltered; provide gentle grow light support.'
    ],
    preventionRule: 'Keep indoor tropicals at least 3 feet away from single-pane winter window panes.',
    affectedPlants: ['Peace Lily', 'Calathea', 'Ficus', 'Dieffenbachia']
  },
  {
    id: 'card-14',
    title: 'Fertilizer Burn & Salt Toxicity',
    category: 'nutrition',
    symptom: 'Brown scorched leaf margins, white crusty salt buildup on soil surface or pot rim',
    primaryCause: 'Excess mineral salts drawing moisture out of root cells through reverse osmosis',
    emergencyStep: 'Leach the pot: place under lukewarm running tap for 5–10 minutes to dissolve mineral salts.',
    dayByDayGuide: [
      'Day 1: Heavy flush with 4x pot volume in water; discard all runoff immediately.',
      'Day 2: Scrape off and discard the top 2 cm of crusty white soil.',
      'Day 3: Replace with fresh organic potting mix.',
      'Day 5: Zero fertilizer for 6 weeks; allow root tips to heal.',
      'Day 7: When resuming feed, dilute fertilizer to 25% recommended strength.'
    ],
    preventionRule: 'Always fertilize damp soil, never bone-dry roots, and feed weakly, weekly.',
    affectedPlants: ['Spider Plant', 'Fern', 'Monstera', 'Peace Lily']
  },
  {
    id: 'card-15',
    title: 'Bacterial Soft Rot Shield',
    category: 'pests',
    symptom: 'Mushy, water-soaked brown lesions with foul odor spreading rapidly across stems',
    primaryCause: 'Erwinia bacteria entering through wounds in humid, warm conditions',
    emergencyStep: 'Severely affected leaves must be amputated with sterilized shears. Keep cuts dry.',
    dayByDayGuide: [
      'Day 1: Remove all soft tissue with sterile knife; dust cut margins with ground cinnamon (natural bactericide).',
      'Day 2: Stop all foliar misting completely.',
      'Day 3: Isolate plant and space out from other houseplants.',
      'Day 5: Reduce ambient humidity slightly and ensure constant gentle airflow.',
      'Day 7: New stems emerge clean once bacterial vectors are controlled.'
    ],
    preventionRule: 'Never spray or mist plants that have bacterial spots; moisture spreads pathogens.',
    affectedPlants: ['Sansevieria', 'Aglaonema', 'Philodendron', 'Orchids']
  },
  {
    id: 'card-16',
    title: 'Aphid Colony Cleanse',
    category: 'pests',
    symptom: 'Clusters of soft green or black pear-shaped insects on tender new shoots',
    primaryCause: 'Aphidoidea rapidly multiplying on sugary new growth',
    emergencyStep: 'Blast colonies off with kitchen sink sprayer or wipe with soapy sponge.',
    dayByDayGuide: [
      'Day 1: Physical removal under gentle water flow.',
      'Day 2: Spray with 2% insecticidal soap solution focusing on leaf nodes and buds.',
      'Day 4: Check unfolding shoots for lingering survivors.',
      'Day 6: Second soap application to eliminate newly hatched nymphs.',
      'Day 7: New shoot growth unfurls without curling or deformities.'
    ],
    preventionRule: 'Inspect tender spring growth weekly; aphids can be wiped away with your thumb early on.',
    affectedPlants: ['Pothos', 'Hibiscus', 'Ficus', 'Ivy']
  },
  {
    id: 'card-17',
    title: 'Powdery Mildew Purge',
    category: 'pests',
    symptom: 'White flour-like powdery coating over upper surface of leaves',
    primaryCause: 'Fungal spores germinating in stagnant, humid air with poor light',
    emergencyStep: 'Wipe leaves with a solution of 1 tbsp baking soda + 1/2 tsp liquid soap in 1L water.',
    dayByDayGuide: [
      'Day 1: Wipe all mildew residue with the baking soda solution.',
      'Day 2: Relocate to an area with improved air circulation and brighter indirect light.',
      'Day 4: Prune severely coated older leaves.',
      'Day 6: Spray with mild potassium bicarbonate fungicide spray.',
      'Day 7: Leaves remain clean and free of chalky white coating.'
    ],
    preventionRule: 'Ensure adequate spacing between plants so foliage never touches or traps moisture.',
    affectedPlants: ['Begonia', 'African Violet', 'Jade', 'Kalanchoe']
  },
  {
    id: 'card-18',
    title: 'Iron Chlorosis (Interveinal Yellowing)',
    category: 'nutrition',
    symptom: 'New leaves turn vibrant yellow while veins stay dark green like a skeleton',
    primaryCause: 'High soil pH locking out iron absorption or iron-depleted substrate',
    emergencyStep: 'Apply chelated iron liquid supplement directly to soil and foliage.',
    dayByDayGuide: [
      'Day 1: Drench soil with chelated iron (Fe-EDTA) diluted according to label.',
      'Day 3: Check water pH if using hard well water (aim for 6.0–6.5).',
      'Day 5: Apply light foliar spray of micronutrients in early morning.',
      'Day 7: Notice yellow areas on young foliage deepening into rich emerald green.'
    ],
    preventionRule: 'Use rainwater or add a drop of vinegar per gallon of hard alkaline tap water.',
    affectedPlants: ['Gardenia', 'Citrus', 'Fern', 'Ficus']
  },
  {
    id: 'card-19',
    title: 'Sudden Green Leaf Drop',
    category: 'light',
    symptom: 'Firm green healthy-looking leaves raining down onto table without turning yellow first',
    primaryCause: 'Shock from sudden relocation, cold draft from opening door, or drastic light change',
    emergencyStep: 'Find one stable, permanent location with bright indirect light and leave plant undisturbed.',
    dayByDayGuide: [
      'Day 1: Choose permanent spot free of drafts, heaters, or foot traffic.',
      'Day 2: Do not overwater in panic; the plant has fewer leaves so needs LESS water.',
      'Day 4: Check soil with finger; water only when dry halfway down.',
      'Day 6: Give it time to adjust hormonal balance.',
      'Day 7: Dropping halts and dormant buds swell along bare branches.'
    ],
    preventionRule: 'Ficus and sensitive tropicals despise moving; pick a spot and keep them there.',
    affectedPlants: ['Ficus Benjamina', 'Rubber Tree', 'Umbrella Tree', 'Bonsai']
  },
  {
    id: 'card-20',
    title: 'Over-Compacted Peat Cement',
    category: 'watering',
    symptom: 'Water pours right down the sides and out the bottom without wetting the center root ball',
    primaryCause: 'Aged peat substrate that has collapsed, dried, and become completely hydrophobic',
    emergencyStep: 'Aeration and deep rehydration: poke 10 holes in soil with a skewer and bottom-soak.',
    dayByDayGuide: [
      'Day 1: Gently pierce soil from top to bottom with a blunt skewer.',
      'Day 2: Submerge pot in warm water tub for 40 minutes with a drop of unscented soap as wetting agent.',
      'Day 3: Drain thoroughly; feel heavy, evenly moist weight of the container.',
      'Day 5: Top-dress with coarse perlite and worm castings to restore sponge matrix.',
      'Day 7: Future waterings will distribute evenly through root zone without escaping.'
    ],
    preventionRule: 'Aerated soils need fresh organic matter every 2 years before peat disintegrates.',
    affectedPlants: ['Monstera', 'Philodendron', 'Fern', 'Dracaena']
  }
];

export const RESCUE_TIMELINE_STEPS: RescueDayStep[] = [
  {
    day: 1,
    title: 'Triage & Quarantine',
    objective: 'Stop immediate damage, isolate from other plants, and stabilize moisture.',
    actionItems: [
      'Quarantine the plant 6 feet away from other houseplants to prevent pest migration.',
      'Lift container to judge root weight: bone dry vs. waterlogged stone.',
      'Wipe down dusty leaves with a damp microfiber cloth to restore pore breathability.'
    ],
    proTip: 'Never fertilize a sick plant on Day 1 — salt stress will scorch wounded roots.'
  },
  {
    day: 2,
    title: 'Root & Substrate Inspection',
    objective: 'Check below the soil line for root rot, compaction, or hydrophobic pockets.',
    actionItems: [
      'Insert a wooden skewer to the bottom of the pot for 10 minutes to verify moisture depth.',
      'Snip off fully dead, mushy, or blackened roots with sterilized scissors.',
      'Aerate tight soil by creating 4–6 narrow vertical holes near the container perimeter.'
    ],
    proTip: 'Healthy roots are firm and creamy-white; diseased roots are slimy, brown, and slide off.'
  },
  {
    day: 3,
    title: 'Light Calibration',
    objective: 'Move plant into its biological light sweet spot to jumpstart photosynthesis.',
    actionItems: [
      'Relocate into bright, indirect light (where your hand casts a soft, blurry shadow).',
      'Shield from direct midday rays with a sheer linen curtain if foliage has scorch marks.',
      'Rotate the container 90 degrees so the weaker side begins receiving photon energy.'
    ],
    proTip: 'Low light drastically lowers water consumption; compensate by lengthening water intervals.'
  },
  {
    day: 4,
    title: 'Pruning & Airflow Optimization',
    objective: 'Direct energy toward surviving healthy shoots and eliminate fungal incubators.',
    actionItems: [
      'Prune dead or >50% yellowed leaves at the base of the petiole with clean shears.',
      'Trim brown crispy tips leaving a 1mm border of brown so green tissue isn\'t re-injured.',
      'Turn on gentle indirect fan circulation in the room to prevent fungal spores from settling.'
    ],
    proTip: 'Pruning yellow leaves frees up the plant\'s vascular system to build new foliage.'
  },
  {
    day: 5,
    title: 'Precision Hydration Protocol',
    objective: 'Rehydrate evenly or allow damp soil to reach the golden moisture equilibrium.',
    actionItems: [
      'If dry: bottom-water for 25 minutes so roots absorb water by capillary action without compacting soil.',
      'If wet: keep saucer completely dry and elevate pot on cork risers for bottom airflow.',
      'Always use lukewarm, room-temperature water to avoid shocking tender root hairs.'
    ],
    proTip: 'Tap water that sits out for 24 hours lets chlorine evaporate and reaches ambient room temp.'
  },
  {
    day: 6,
    title: 'Pest Barrier & Foliar Cleansing',
    objective: 'Eliminate hidden insect vectors and fortify cellular foliage defense.',
    actionItems: [
      'Inspect undersides of leaves and leaf nodes with phone flashlight for mites or scale.',
      'Wipe stems with dilute neem oil or gentle Castile soap solution.',
      'Place a yellow sticky trap at the soil line to catch any emerging gnats.'
    ],
    proTip: 'Pests attack weakened plants first. An oil cleanse creates an inhospitable barrier for eggs.'
  },
  {
    day: 7,
    title: 'Sustainable Long-Term Routine',
    objective: 'Lock in your customized watering schedule and Notion tracking routine.',
    actionItems: [
      'Record your plant\'s baseline pot weight and calculate exact next watering date.',
      'Add plant to your Notion tracker with a Day 7 progress photo.',
      'Celebrate: your plant has exited the critical danger zone and entered active recovery.'
    ],
    proTip: 'Consistency beats perfection. Check soil weekly on the same weekday morning.'
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter Rescue Kit',
    price: 12,
    description: 'The fundamental guide and diagnosis kit for plant parents needing fast answers.',
    ctaText: 'Get Starter Kit',
    features: [
      '60-page illustrated Plant Rescue PDF guide',
      'All 20 printable Fix Cards (PDF & mobile-ready)',
      'Visual Diagnosis Flowchart & symptom index',
      'Direct email support with horticulturist team',
      'Lifetime digital updates & new editions'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Rescue System',
    price: 19,
    popular: true,
    badge: 'Most Popular',
    description: 'The complete toolkit with interactive calculators and custom Notion workspace.',
    ctaText: 'Get Pro System',
    features: [
      'Everything in Starter Kit',
      'Interactive Watering Schedule Calculator',
      'Notion Plant Rescue & Care Tracker Dashboard',
      'Full 7-Day Day-by-Day Plant Rescue Roadmap',
      'Soil & Repotting Matrix for 30+ houseplant species',
      'Priority 24h plant triage email support'
    ]
  },
  {
    id: 'ultimate',
    name: 'Ultimate Plant Masterclass',
    price: 39,
    description: 'Full video walkthroughs, email coaching, and private community membership.',
    ctaText: 'Get Ultimate Masterclass',
    features: [
      'Everything in Pro System',
      '10 short video lessons (under 3 min each)',
      '7-day guided email coaching series',
      'Private plant community with photo review channel',
      'Monthly live botanical Q&A workshops',
      'Personal 1-on-1 plant photo diagnosis check'
    ]
  }
];

export const FAQS = [
  {
    question: "Is this suitable for someone who has killed every plant they've ever owned?",
    answer: "Yes, 100%. The guide was specifically engineered for self-proclaimed 'black thumbs'. It skips confusing botanical jargon and gives you binary, high-leverage rules: exactly when to touch the watering can, where to place the pot, and the 3 symptoms that mean you need to stop watering immediately."
  },
  {
    question: "Which houseplant species are covered in the diagnosis and fix cards?",
    answer: "We cover all top indoor plants including Monstera (Deliciosa, Adansonii), Pothos, Snake Plants (Sansevieria), Fiddle Leaf Figs & Rubber Trees, ZZ Plants, Peace Lilies, Ferns (Boston, Maidenhair), Cacti & Succulents, Calatheas, Philodendrons, and Orchids."
  },
  {
    question: "Is this a physical book or instant digital download?",
    answer: "It is an instant digital product. The moment you complete checkout, you receive instant access to download the 60-page PDF, the 20 individual mobile-ready Fix Cards, and the one-click duplicate link for the Notion Plant Care dashboard."
  },
  {
    question: "How does the Notion Plant Tracker template work?",
    answer: "It requires only a free Notion account. Click 'Duplicate' to copy our pre-configured dashboard into your workspace. It includes plant profiles, watering countdown reminders, growth photo logs, and fertilizing logs that sync seamlessly between your phone and laptop."
  },
  {
    question: "What is your refund guarantee?",
    answer: "We offer a 30-day no-questions-asked money-back guarantee. If you apply the 7-day protocol and your plant does not show visible signs of recovery, just send us an email and we'll refund 100% of your purchase immediately."
  },
  {
    question: "Do I need special expensive chemicals or grow lights to fix my plant?",
    answer: "No. Over 85% of plant problems are resolved with simple adjustments to watering rhythm, light positioning, physical pruning, and common household items like hydrogen peroxide, cinnamon, or gentle dish soap."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "My 4-year-old Monstera had 6 yellow leaves and I was in tears thinking it was a goner. The Fix Card told me exactly what was happening: root suffocation from a saucer that held standing water. Followed the 7-day steps and 3 weeks later I have two giant new fenestrated leaves!",
    author: "Elena Rostova",
    plantSaved: "Monstera Deliciosa",
    recoveryDays: 7,
    location: "Seattle, WA"
  },
  {
    quote: "The Notion template and the watering calculator alone saved over $300 worth of rare plants in my apartment. I used to water on Sundays like clockwork without realizing my snake plants were drowning.",
    author: "Marcus Vance",
    plantSaved: "Snake Plant & Calathea",
    recoveryDays: 5,
    location: "Austin, TX"
  },
  {
    quote: "Clear, zero fluff, and extraordinarily practical. In 4 days my drooping Peace Lily went from lying flat on the table to standing rigid and glossy. Best $19 I ever spent on my home.",
    author: "Sophie Laurent",
    plantSaved: "Peace Lily (Spathiphyllum)",
    recoveryDays: 4,
    location: "Montreal, Canada"
  }
];
