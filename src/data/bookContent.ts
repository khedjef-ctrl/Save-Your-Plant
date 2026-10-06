/**
 * Structured content for the 60-page "Save Your Plant" handbook
 * Available in both English and Arabic.
 */

export interface BookChapter {
  id: number;
  slug: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  estimatedPages: number;
  sections: {
    headingEn: string;
    headingAr: string;
    contentEn: string;
    contentAr: string;
    actionRuleEn: string;
    actionRuleAr: string;
  }[];
}

export const BOOK_METADATA = {
  titleEn: "Save Your Plant: The 7-Day Houseplant Emergency Rescue Handbook",
  titleAr: "أنقذ نبتتك: الدليل العملي لإنقاذ النباتات المنزلية في 7 أيام",
  authorEn: "Botanical Research & Horticulture Triage Group",
  authorAr: "فريق أبحاث النبات والإنقاذ البستاني",
  edition: "2026 Complete Illustrated Edition",
  totalPages: 60,
  isbn: "978-0-98234-71-4",
};

export const BOOK_CHAPTERS: BookChapter[] = [
  {
    id: 1,
    slug: "immediate-triage",
    titleEn: "Chapter 1: The 60-Second Emergency Triage",
    titleAr: "الفصل الأول: فرز الطوارئ خلال 60 ثانية",
    subtitleEn: "Stop panic, isolate vectors, and identify whether your plant is drowning or parched.",
    subtitleAr: "أوقف الهلع، اعزل مصادر العدوى، وحدد هل نبتتك تغرق أم تعاني من العطش الشديد.",
    estimatedPages: 8,
    sections: [
      {
        headingEn: "The Pot-Lift Gravitational Test",
        headingAr: "اختبار الرفع الوزني للحوض",
        contentEn: "Before touching water or pruning shears, lift the container. A waterlogged root ball feels like a lead brick; a dehydrated hydrophobic root ball feels weightless like styrofoam. This 2-second physical check eliminates 80% of diagnostic confusion.",
        contentAr: "قبل لمس مرشاة الماء أو مقص التقليم، ارفع الحوض بيديك. الكتلة الجذرية المشبعة بالماء تبدو ثقيلة كقطعة حديد، بينما الكتلة الجافة تشبه الفلين. هذا الفحص الحركي البسيط يمنع 80% من أخطاء التشخيص.",
        actionRuleEn: "Rule: Never water a pot that still feels heavy when lifted.",
        actionRuleAr: "القاعدة الذهبية: لا تسقِ أبداً حوضاً لا يزال ثقيلاً في يدك."
      },
      {
        headingEn: "Quarantine & Biosecurity Protocol",
        headingAr: "بروتوكول العزل الحيوي ومكافحة العدوى",
        contentEn: "Isolate any struggling plant at least 6 feet away from other houseplants. Fungal spores and micro-pests like spider mites travel effortlessly on gentle room air drafts.",
        contentAr: "اعزل أي نبتة مريضة على بعد مترين على الأقل من باقي النباتات. الجراثيم الفطرية والآفات الدقيقة كالعناكب الحمراء تنتقل بسهولة عبر التيارات الهوائية المنزلية.",
        actionRuleEn: "Action: Separate the patient immediately before inspection.",
        actionRuleAr: "الإجراء الفوري: افصل النبتة فوراً في غرفة منفصلة قبل الفحص."
      }
    ]
  },
  {
    id: 2,
    slug: "overwatering-root-rot",
    titleEn: "Chapter 2: The Truth About Overwatering & Root Rot",
    titleAr: "الفصل الثاني: الحقيقة العلمية للإفراط في الري وتعفن الجذور",
    subtitleEn: "Why roots don't drown in water—they suffocate from lack of dissolved oxygen.",
    subtitleAr: "لماذا لا تغرق الجذور في الماء، بل تختنق لنقص الأكسجين الذائب.",
    estimatedPages: 10,
    sections: [
      {
        headingEn: "The Hypoxia Cascade in Potting Mix",
        headingAr: "سلسلة الاختناق الهوائي في التربة",
        contentEn: "When soil pores remain saturated with stagnant water, oxygen cannot diffuse to root cellular membranes. Within 48 hours, anaerobic bacteria multiply, turning firm cream roots into brown, foul-smelling mush.",
        contentAr: "عندما تظل مسام التربة ممتلئة بالماء الراكد، يعجز الأكسجين عن الوصول لخلايا الجذور. خلال 48 ساعة فقط تتكاثر البكتيريا اللاهوائية وتحول الجذور البيضاء إلى كتل بنية كريهة الرائحة.",
        actionRuleEn: "Rule: Potting soil must breathe between hydration intervals.",
        actionRuleAr: "القاعدة: يجب أن تتنفس التربة وتجف جزئياً بين مواعيد السقاية."
      },
      {
        headingEn: "Hydrogen Peroxide Root Resuscitation Bath",
        headingAr: "حمام إنعاش الجذور بماء الأكسجين (بيروكسيد الهيدروجين)",
        contentEn: "Dilute 1 part 3% household hydrogen peroxide with 4 parts distilled water. Soak pruned roots for 10 minutes. The active effervescence oxidizes pathogens and instantly re-oxygenates damaged vascular tissue.",
        contentAr: "امزج مقداراً من بيروكسيد الهيدروجين تركيز 3% مع 4 مقادير ماء مقطر. انقع الجذور المقلمة لمدة 10 دقائق لتطهير الجروح وإمداد الأنسجة الفاسدة بالأكسجين النشط.",
        actionRuleEn: "Action: Soak trimmed roots in 3% peroxide solution before repotting.",
        actionRuleAr: "الإجراء: طهّر الجذور بمحلول البيروكسيد قبل غرسها في تربة جديدة."
      }
    ]
  },
  {
    id: 3,
    slug: "leaf-language",
    titleEn: "Chapter 3: Decoding Leaf Language",
    titleAr: "الفصل الثالث: فك شفرات ولغة أوراق النبات",
    subtitleEn: "Translate yellow margins, crispy tips, brown spots, and limp petioles into exact physiological needs.",
    subtitleAr: "ترجمة اصفرار الأطراف، احتراق الحواف، البقع البنية، وارتخاء السيقان إلى حلول علاجية محددة.",
    estimatedPages: 8,
    sections: [
      {
        headingEn: "Lower Yellowing vs. Upper Yellowing",
        headingAr: "اصفرار الأوراق السفلية مقابل الأوراق العلوية الحديثة",
        contentEn: "Yellow lower leaves usually signify mobile nutrient reallocation (or overwatering). Yellow top leaves with green veins (chlorosis) signal iron or micronutrient lockout caused by high tap water pH.",
        contentAr: "اصفرار الأوراق السفلية القديمة يشير عادة إلى انتقال العناصر أو الإفراط بالري. أما اصفرار الأوراق العلوية الحديثة مع بقاء العروق خضراء فيعني نقص امتصاص الحديد بسبب قلوية ماء الصنبور.",
        actionRuleEn: "Diagnosis: Check age of affected foliage first.",
        actionRuleAr: "التشخيص: حدد أولاً هل الورقة المصابة قديمة سفلية أم نمو جديد علوي."
      },
      {
        headingEn: "Crisp Brown Tips and Salt Crust",
        headingAr: "احتراق حواف الأوراق وتراكم الأملاح الكيميائية",
        contentEn: "Tap water contains chlorine, fluoride, and dissolved mineral salts. As the leaf transpires, these salts concentrate at the leaf tips, causing localized tissue necrosis.",
        contentAr: "مياه الصنبور تحتوي على الكلور والفلورايد والأملاح. مع تبخر الماء من الثغور التنفسية تتركز هذه الأملاح عند أطراف الأوراق مسببة احتراقها وجفافها.",
        actionRuleEn: "Remedy: Flush soil with distilled water and leave 1mm brown tissue when trimming.",
        actionRuleAr: "العلاج: اغسل التربة بماء مقطر واترك هامش 1 ملم من الجزء الجاف عند القص كي لا تجرح الأنسجة الحية."
      }
    ]
  },
  {
    id: 4,
    slug: "light-calibration",
    titleEn: "Chapter 4: Light Calibration & The Foot-Candle Rule",
    titleAr: "الفصل الرابع: معايرة الإضاءة وقاعدة الشمعة-قدم",
    subtitleEn: "Why indoor rooms are 100x darker to plants than human eyes perceive.",
    subtitleAr: "لماذا تبدو الغرف المظلمة أعتم 100 مرة للنبات مقارنة بما تراه عين الإنسان.",
    estimatedPages: 8,
    sections: [
      {
        headingEn: "The Inverse Square Law of Window Photons",
        headingAr: "قانون التربيع العكسي لفوتونات الضوء الطبيعي",
        contentEn: "Moving a plant just 5 feet away from a window reduces usable photosynthetic light by over 75%. Human pupils dilate to compensate, tricking you into believing the corner is 'bright'.",
        contentAr: "إبعاد النبتة مسافة متر ونصف فقط عن النافذة يقلل كمية الضوء القابل للتمثيل الضوئي بنسبة تفوق 75%، بينما تتسع حدقة عينك لتخدعك بأن الزاوية 'مضيئة كفاية'.",
        actionRuleEn: "Benchmark: Ensure tropical foliage casts a soft defined shadow on the wall.",
        actionRuleAr: "المعيار: تأكد أن يدك تصنع ظلاً ناعماً واضحاً خلف النبتة نهاراً."
      }
    ]
  },
  {
    id: 5,
    slug: "pest-defense",
    titleEn: "Chapter 5: Organic Pest Warfare",
    titleAr: "الفصل الخامس: الحرب العضوية ضد حشرات وآفات النبات",
    subtitleEn: "Eliminating fungus gnats, spider mites, mealybugs, and thrips without harsh chemical fumes.",
    subtitleAr: "القضاء على ذباب التربة، حلم الغبار، البق الدقيقي، والتربس دون مبيدات سامة.",
    estimatedPages: 10,
    sections: [
      {
        headingEn: "Fungus Gnat Subsurface Warfare (BTI Tea)",
        headingAr: "مكافحة ذباب التربة الدقيق بيرقات بكتيريا BTI",
        contentEn: "Fungus gnat flies only live a week, but their larvae devour tender root hairs in wet soil. Dissolve biological Bacillus thuringiensis israelensis in watering cans to eradicate the underground cycle.",
        contentAr: "يعيش ذباب التربة أسبوعاً واحداً لكن يرقاته تتغذى على الشعيرات الجذرية الدقيقة. استخدام بكتيريا BTI الطبيعية في ماء السقاية يقضي على اليرقات بالكامل دون إيذاء النبتة.",
        actionRuleEn: "Tactic: Keep the top 3 cm of soil dry and water with BTI tea.",
        actionRuleAr: "الخطة: جفف أول 3 سم من سطح التربة واسقِ بمحلول البكتيريا النافعة."
      },
      {
        headingEn: "Cold-Pressed Neem & Castile Emulsion",
        headingAr: "مستحلب زيت النيم الخام وصابون القشتالي",
        contentEn: "Neem contains azadirachtin, which disrupts insect hormonal molting. Mix 1 teaspoon of cold-pressed neem with 1/2 teaspoon organic liquid Castile soap in 1 liter of warm water. Spray top and bottom of every leaf.",
        contentAr: "يحتوي زيت النيم على مادة الآزاديراشتين التي تعطل تكاثر وهرمونات الحشرات. امزج ملعقة صغيرة من النيم مع نصف ملعقة صابون طبيعي في لتر ماء دافئ ورش الأوراق من الوجهين.",
        actionRuleEn: "Tactic: Apply at dusk so oil droplets do not magnify sunlight and burn leaves.",
        actionRuleAr: "الخطة: رش المحلول وقت الغروب حتى لا تسبب قطرات الزيت احتراق الأوراق تحت الشمس."
      }
    ]
  },
  {
    id: 6,
    slug: "soil-aeration",
    titleEn: "Chapter 6: Substrates & The Chunky Soil Matrix",
    titleAr: "الفصل السادس: التربة ومصفوفة التهوية الاحترافية",
    subtitleEn: "Throw away dense store-bought potting bags and create living, free-draining blends.",
    subtitleAr: "تخلص من أكياس التربة الجاهزة الكثيفة واصنع مزيجاً متجدداً سريع التصريف.",
    estimatedPages: 8,
    sections: [
      {
        headingEn: "The Golden 40-30-20-10 Tropical Substrate Blend",
        headingAr: "الخلطة الذهبية 40-30-20-10 للنباتات الاستوائية",
        contentEn: "40% coco coir / peat base, 30% pine bark nuggets (for air cavities), 20% coarse perlite or volcanic pumice, and 10% worm castings for gentle biological nutrition. Water rushes straight through, never ponding.",
        contentAr: "40% ألياف جوز الهند أو البيت موس، 30% لحاء الصنوبر الخشن (لصنع فجوات هواء)، 20% بيرلايت أو حجر خفاف، و10% كمبوست دودي لتغذية هادئة مستمرة. يمر الماء بسلاسة دون ركود.",
        actionRuleEn: "Formula: If water takes more than 10 seconds to drain out, your mix is too dense.",
        actionRuleAr: "المقياس: إذا استغرق تصريف الماء من الأسفل أكثر من 10 ثوانٍ، فالتربة مكتومة وتحتاج تهوية فورية."
      }
    ]
  },
  {
    id: 7,
    slug: "sustainable-routine",
    titleEn: "Chapter 7: The Lifetime Weekly Plant Care Routine",
    titleAr: "الفصل السابع: الروتين الأسبوعي الدائم لصيانة نباتاتك مدى الحياة",
    subtitleEn: "Spend only 12 minutes every Sunday maintaining 25+ thriving houseplants.",
    subtitleAr: "خصص 12 دقيقة فقط صباح كل أحد للاعتناء بأكثر من 25 نبتة مورقة ومزدهرة.",
    estimatedPages: 8,
    sections: [
      {
        headingEn: "The 12-Minute Sunday Inspection Ritual",
        headingAr: "طقس الفحص الأسبوعي السريع في 12 دقيقة",
        contentEn: "1. Finger check topsoil. 2. Quarter-turn each pot towards window light. 3. Quick wipe of dusty leaves with damp sponge. 4. Record any new shoots in your tracker. Consistent micro-habits prevent catastrophic plant losses.",
        contentAr: "1. فحص جفاف أول سنتيمترات من التربة بإصبعك. 2. تدوير الحوض ربع دورة لتساوي الضوء. 3. مسح الأوراق من الغبار بإسفنجة رطبة. 4. تسجيل أي أوراق جديدة في جدول المتابعة. العادات الصغيرة المستمرة تحمي نبتتك دائماً.",
        actionRuleEn: "Habit: Check before you hydrate—curiosity before watering cans.",
        actionRuleAr: "العادة: تفقد رطوبة التربة أولاً قبل التفكير في ملء مرشاة الماء."
      }
    ]
  }
];
