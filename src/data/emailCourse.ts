/**
 * 7-Day Plant Rescue Email Course Data
 * Fully bilingual (English & Arabic)
 */

export interface EmailLesson {
  day: number;
  subjectEn: string;
  subjectAr: string;
  preheaderEn: string;
  preheaderAr: string;
  bodyEn: string;
  bodyAr: string;
  actionTaskEn: string;
  actionTaskAr: string;
  ctaTextEn: string;
  ctaTextAr: string;
}

export const EMAIL_COURSE_LESSONS: EmailLesson[] = [
  {
    day: 1,
    subjectEn: "Day 1: Drop the watering can! Emergency Triage & Isolation",
    subjectAr: "اليوم الأول: اترك مرشاة الماء فوراً! فرز الطوارئ والعزل الفوري",
    preheaderEn: "The single biggest mistake plant owners make when leaves turn yellow.",
    preheaderAr: "الخطأ الأكبر الذي يرتكبه الجميع بمجرد اصفرار أوراق النبتة.",
    bodyEn: `Hello Plant Parent,

Welcome to Day 1 of your 7-Day Plant Rescue Journey.

When an indoor plant shows distress—yellow leaves, leaf drop, or drooping—our natural instinct is to shower it with love and water. Resist this impulse with everything you have. Over 85% of dying houseplants are not dying of thirst; they are drowning from root suffocation.

Today's critical mission:
1. Lift the pot to feel its weight (The Gravitational Check).
2. Drain any standing water pooled in the saucer or cachepot.
3. Move the plant 6 feet away from all other houseplants into a well-ventilated recovery zone.`,
    bodyAr: `أهلاً بك في اليوم الأول من رحلة إنقاذ نبتتك خلال 7 أيام.

عندما تبدأ النبتة في الذبول أو تتساقط أوراقها، فإن رد الفعل التلقائي لمعظمنا هو التسرع بريها بالماء. قاوم هذه الرغبة بكل قوة! أكثر من 85% من النباتات المنزلية المحتضرة لا تموت من العطش، بل تموت اختناقاً بسبب ركود الماء في جذورها.

مهمتك العاجلة لليوم الأول:
1. ارفع الحوض بيديك لتقدير وزنه (فحص الجاذبية).
2. تخلص فوراً من أي مياه راكدة متجمعة في الصحن السفلي للحوض.
3. انقل النبتة إلى مكان جيد التهوية على بعد مترين من باقي النباتات لمنع انتقال أي عدوى.`,
    actionTaskEn: "Action for today: Empty the drainage saucer and create 4 vertical ventilation holes in the soil using a clean wooden skewer.",
    actionTaskAr: "مهمة اليوم: أفرغ صحن التصريف تماماً واصنع 4 ثقوب تهوية رأسية في التربة باستخدام عود خشبي نظيف.",
    ctaTextEn: "Open Day 1 Diagnosis Checklist",
    ctaTextAr: "افتح قائمة فحص اليوم الأول"
  },
  {
    day: 2,
    subjectEn: "Day 2: What's happening underground? Root inspection & Peroxide",
    subjectAr: "اليوم الثاني: ماذا يحدث تحت الأرض؟ فحص الجذور وحمام الأكسجين",
    preheaderEn: "Healthy roots are white and firm. Here is how to resuscitate them.",
    preheaderAr: "الجذور السليمة بيضاء ومتماسكة. إليك طريقة إنقاذ الجذور المصابة.",
    bodyEn: `Hello again,

Today we look below the surface. Foliage problems are almost always a mirror of root distress.

Slide your plant out of its nursery pot or gently probe with a wooden chopstick down to the lower third. 
- White, firm, earthy-smelling roots = HEALTHY.
- Brown, limp, mushy, or sour-smelling roots = PYTHIUM ROOT ROT.

If you detect mushy roots: amputate them cleanly with scissors wiped in rubbing alcohol. Don't worry—plants can regenerate up to 60% of their root mass with proper aeration!`,
    bodyAr: `مرحباً مجدداً،

اليوم سنفحص ما يجري تحت سطح التربة، فأمراض الأوراق ما هي إلا انعكاس مباشر لحالة الجذور.

أخرج النبتة برفق من حوضها البلاستيكي أو استخدم عوداً خشبياً للوصول للثلث السفلي من التربة:
- جذور بيضاء، متماسكة، ورائحتها كتربة الغابة = جذور سليمة وممتازة.
- جذور بنية، رخوة، تنفصل باليد، أو لها رائحة تعفن = إصابة فطرية بتعفن الجذور.

إذا وجدت جذوراً متعفنة: قصها فوراً بمقص معقم بالكحول. لا تقلق، فالنبات يستطيع إعادة بناء حتى 60% من كتلة جذوره إذا توفرت له التهوية الصحيحة!`,
    actionTaskEn: "Action for today: Mix 1 part 3% hydrogen peroxide with 4 parts water and spray the root ball to oxygenate and kill anaerobic fungi.",
    actionTaskAr: "مهمة اليوم: امزج مقداراً من ماء الأكسجين 3% مع 4 مقادير ماء ورش الجذور لتطهيرها وتنشيطها بالأكسجين.",
    ctaTextEn: "View Root Surgery Protocol",
    ctaTextAr: "مشاهدة بروتوكول جراحة الجذور"
  },
  {
    day: 3,
    subjectEn: "Day 3: The Foot-Candle Rule: Calibrating your light exposure",
    subjectAr: "اليوم الثالث: قاعدة الشمعة-قدم: معايرة زاوية الضوء المثالية",
    preheaderEn: "Why indoor rooms are 100 times darker to plants than human eyes perceive.",
    preheaderAr: "لماذا تبدو الغرف أعتم 100 مرة لعين النبتة مقارنة بعين الإنسان.",
    bodyEn: `Hello,

Did you know human eyes are deceptive? Our pupils dilate so effectively in dim rooms that we think a dark corner is 'plenty bright'. For a tropical plant trying to photosynthesize sugar, that same corner is a pitch-black cave.

Today we calibrate your plant's light:
- Perform the Shadow Test: Hold your hand 12 inches above a piece of white paper near the plant. If the shadow has fuzzy, soft edges, that is Medium Indirect Light (ideal for Calatheas and Pothos). If it's razor-sharp, that is Bright Direct Light (ideal for Cacti and Succulents).`,
    bodyAr: `أهلاً بك،

هل تعلم أن عين الإنسان خادعة بامتياز؟ حدقة العين تتسع في الأماكن الخافتة فتوهمك أن زاوية الغرفة 'مضيئة بما فيه الكفاية'، بينما بالنسبة لنبتة استوائية تحتاج للفوتونات لصنع غذائها، فإن تلك الزاوية أشبه بكهف مظلم.

اليوم سنضبط إضاءة نبتتك:
- قم باختبار الظل: ضع يدك على بعد 30 سم فوق ورقة بيضاء بجوار النبتة. إذا رأيت ظلاً ناعماً واضح الحواف، فهذا ضوء غير مباشر مثالي لمعظم النباتات. وإذا كان الظل حاداً جداً فهذا ضوء شمس مباشر يناسب الصباريات.`,
    actionTaskEn: "Action for today: Relocate the recovering plant within 3 to 5 feet of an unobstructed east or south-facing window with a sheer curtain.",
    actionTaskAr: "مهمة اليوم: انقل النبتة لمسافة متر إلى متر ونصف من نافذة مشرقة مع ستارة خفيفة لحمايتها من الاحتراق.",
    ctaTextEn: "Calculate Plant Light Levels",
    ctaTextAr: "حساب مستوى إضاءة نبتتك"
  },
  {
    day: 4,
    subjectEn: "Day 4: Strategic Pruning & Stopping Secondary Fungi",
    subjectAr: "اليوم الرابع: التقليم الجراحي وإيقاف العدوى الفطرية",
    preheaderEn: "Yellow leaves drain valuable vascular energy. Here is how to trim them.",
    preheaderAr: "الأوراق الصفراء تستهلك طاقة ثمينة. إليك الطريقة الصحيحة لقصها.",
    bodyEn: `Hello,

One of the hardest psychological barriers for plant parents is cutting away leaves. But understand this: a leaf that has turned more than 50% yellow cannot photosynthesize. Instead, it becomes an energy sink and a damp breeding ground for fungal spores.

Today we free up your plant's vascular highway:
- Snip fully yellow leaves at the base of the stem (petiole) with clean shears.
- For leaves with crispy brown tips: trim only the dead brown margin, leaving a hairline 1mm strip of brown so you don't cut into living tissue.`,
    bodyAr: `مرحباً،

أحد أصعب الحواجز النفسية هو التخلص من الأوراق وقصها. لكن الحقيقة العلمية هي: أي ورقة اصفرت بأكثر من 50% لن تعود خضراء أبداً، بل تتحول إلى عبء يستنزف طاقة النبتة وبيئة خصبة لنمو الفطريات.

اليوم سنحرر النبتة ونوجه طاقتها للنموات الجديدة:
- قص الأوراق الصفراء بالكامل من قاعدة الساق بمقص نظيف.
- للأوراق ذات الأطراف المحترقة: قص الجزء الجاف فقط مع ترك هامش رفيع 1 ملم من الجزء البني لتفادي جرح النسيج الأخضر الحي.`,
    actionTaskEn: "Action for today: Prune dead leaves and dust healthy foliage with a damp cloth so leaf stomata can breathe.",
    actionTaskAr: "مهمة اليوم: قلم الأوراق التالفة وامسح الأوراق السليمة بقطعة قماش مبللة لتنظيف مسام التنفس.",
    ctaTextEn: "Read Pruning Guide",
    ctaTextAr: "قراءة دليل التقليم الصحيح"
  },
  {
    day: 5,
    subjectEn: "Day 5: The Bottom-Watering Revolution",
    subjectAr: "اليوم الخامس: ثورة الري من الأسفل وترطيب التربة الجافة",
    preheaderEn: "Why top watering creates dry channels and how bottom soaking fixes it.",
    preheaderAr: "لماذا يفشل الري التقليدي من الأعلى وكيف يعالج الري من الأسفل جذور النبتة.",
    bodyEn: `Hello,

Have you ever poured water into a potted plant and watched it immediately flood out into the saucer while the soil stays dry? That is hydrophobic peat moss. When commercial potting soil dries out, it shrinks and forms impermeable water channels.

The solution is Bottom Watering (Sub-Irrigation):
Fill a bowl with 2 to 3 inches of room-temperature filtered water. Place your plant's nursery pot inside. Capillary action will draw the water upwards like a sponge, saturating the root ball without suffocating the topsoil.`,
    bodyAr: `أهلاً بك،

هل سبق وسكبت الماء في حوض النبتة ولاحظت أنه ينزل فوراً إلى الصحن في ثوانٍ بينما تظل التربة جافة كالحجر؟ هذه هي التربة الكارهة للماء (Hydrophobic). عندما يجف البيت موس تماماً ينكمش ويصنع مسارات هروب جانبية للماء.

الحل هو تقنية الري من الأسفل:
ضع الحوض داخل وعاء به 5 سم من الماء المفلتر بحرارة الغرفة لمدة 20 دقيقة. ستقوم الجذور بامتصاص الماء بالخاصية الشعرية كالإسفنجة بالكمية التي تحتاجها فقط دون إغراق السطح.`,
    actionTaskEn: "Action for today: Bottom soak your thirsty plant for 25 minutes, then let it drain freely for 15 minutes before returning to its decorative saucer.",
    actionTaskAr: "مهمة اليوم: انقع حوض النبتة العطشانة في وعاء ماء سفلي لمدة 20 دقيقة ثم اتركه يصفي الفائض تماماً.",
    ctaTextEn: "Open Watering Calculator",
    ctaTextAr: "افتح حاسبة الري الذكية"
  },
  {
    day: 6,
    subjectEn: "Day 6: Pest Shield: Organic Neem & Biological Defense",
    subjectAr: "اليوم السادس: درع الحماية: زيت النيم والمكافحة البيولوجية",
    preheaderEn: "Fungus gnats and spider mites strike weakened plants. Build their armor.",
    preheaderAr: "الآفات تهاجم النباتات الضعيفة أولاً. ابنِ درع الحماية لنبتتك اليوم.",
    bodyEn: `Hello,

A stressed plant emits chemical signals (volatile terpenes) that act like a dinner bell for insects like fungus gnats, spider mites, and thrips.

Today we install an organic defense perimeter:
- For Fungus Gnats: sprinkle 1 cm of sharp coarse sand over the soil. Adult flies cannot penetrate the coarse grit to lay eggs.
- For Spider Mites & Thrips: mix 1 tsp pure cold-pressed neem oil + 1/2 tsp mild liquid dish soap in 1L warm water. Spray every leaf and stem at dusk.`,
    bodyAr: `مرحباً،

عندما تضعف النبتة تُفرز إشارات كيميائية تجذب الحشرات كذباب التربة وعناكب الغبار والبق الدقيقي.

اليوم سنبني جدار حماية عضوي متكامل:
- لذباب التربة: ضع طبقة بسمك 1 سم من الرمل الخشن على سطح التربة، فلن تستطيع الحشرات اختراقها لوضع البيض.
- للآفات الدقيقة: امزج ملعقة صغيرة من زيت النيم النقي مع نصف ملعقة صابون طبيعي في لتر ماء دافئ ورش الأوراق بالكامل عند المساء.`,
    actionTaskEn: "Action for today: Inspect under 5 leaves with your phone flashlight and apply your organic pest spray barrier.",
    actionTaskAr: "مهمة اليوم: افحص أسفل 5 أوراق بكشاف هاتفك ورش محلول الحماية العضوي.",
    ctaTextEn: "Explore 20 Fix Cards for Pests",
    ctaTextAr: "تصفح بطاقات علاج الآفات"
  },
  {
    day: 7,
    subjectEn: "Day 7: The Sunday 12-Minute Habit & Permanent Success",
    subjectAr: "اليوم السابع: عادة الـ 12 دقيقة كل أحد ونجاحك الدائم",
    preheaderEn: "Your plant is out of danger. Here is your lifetime care cadence.",
    preheaderAr: "نبتتك خرجت من مرحلة الخطر. إليك روتين العناية المستدام مدى الحياة.",
    bodyEn: `Congratulations!

You made it through the 7-Day Rescue Trajectory. Your plant has survived the critical danger zone. You now know more about plant biology, hydration cycles, and root aeration than 95% of houseplant owners.

Your ongoing lifetime routine: The 12-Minute Sunday Inspection
1. Touch the soil: dry top 2 inches? Water. Damp? Walk away.
2. Rotate the pot 90 degrees for symmetrical growth.
3. Quick wipe of dusty leaves.
4. Log any new leaf unfurls in your Plant Tracker.

Happy growing, and welcome to a green, thriving home!`,
    bodyAr: `مبارك لك!

لقد أتممت بنجاح دورة الإنقاذ في 7 أيام! نبتتك تخطت مرحلة الخطر وبدأت في التعافي وبناء خلايا جديدة. أصبحت الآن تفهم بيولوجيا الجذور واحتياجات الري والإضاءة أكثر من 95% من مقتني النباتات.

روتينك الدائم: طقس الـ 12 دقيقة صباح كل أحد
1. فحص التربة بالإصبع: جافة بعمق 4 سم؟ اسقِها. رطبة؟ اتركها لأسبوع قادم.
2. تدوير الحوض ربع دورة لضمان نمو متناسق نحو الضوء.
3. مسح سريع للأوراق بقطعة قماش رطبة.
4. تسجيل أي أوراق جديدة في جدول المتابعة.

نتمنى لنباتاتك دوام الخضرة والازدهار دائماً!`,
    actionTaskEn: "Action for today: Bookmark your Plant Tracker and schedule your next weekly check-in.",
    actionTaskAr: "مهمة اليوم: احفظ رابط جدول المتابعة وسجل موعد الفحص القادم لهاتفك.",
    ctaTextEn: "Go to Plant Tracker Dashboard",
    ctaTextAr: "الانتقال لجدول متابعة النباتات"
  }
];
