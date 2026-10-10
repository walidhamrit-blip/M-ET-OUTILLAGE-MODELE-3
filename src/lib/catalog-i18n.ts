/**
 * Traductions de départ des produits et catégories (clé = slug).
 * Utilisées quand les champs AR / EN de la base sont vides. Les valeurs
 * saisies dans l'admin remplacent ces traductions.
 */

export const catalogProducts: Record<
  string,
  { nameAr: string; nameEn: string; descAr: string; descEn: string }
> = {
  "perceuse-visseuse-18v": {
    nameAr: "مثقاب مفك لاسلكي 18 فولت ليثيوم أيون + بطاريتان",
    nameEn: "18V Li-Ion Cordless Drill Driver + 2 Batteries",
    descAr: "مثقاب مفك لاسلكي 18 فولت بمحرك عالي الأداء، مع بطاريتين ليثيوم أيون 2.0 أمبير، وشاحن سريع وحقيبة نقل. مثالي لجميع أعمال الحفر والبرغاة في ورش طرابلس.",
    descEn: "18V cordless drill driver with high-performance motor, two 2.0Ah Li-Ion batteries, fast charger and carry case. Ideal for all drilling and screwing jobs on site in Tripoli.",
  },
  "meuleuse-angle-230": {
    nameAr: "مجلخة زاوية 230 مم 2200 واط احترافية",
    nameEn: "Professional 230mm 2200W Angle Grinder",
    descAr: "مجلخة زاوية 230 مم بقوة 2200 واط مع مقبض مضاد للاهتزاز وواقٍ قابل للضبط وبدء تشغيل تدريجي. للقطع في المعادن والحجر والخرسانة.",
    descEn: "230mm 2200W angle grinder with anti-vibration handle, adjustable guard and soft start. For cutting metal, stone and concrete.",
  },
  "perceuse-percussion-850w": {
    nameAr: "مثقاب صدمي سلكي 850 واط ظرف 13 مم",
    nameEn: "850W Corded Hammer Drill, 13mm Chuck",
    descAr: "مثقاب صدمي 850 واط بظرف ذاتي الشد 13 مم ومتحكم في السرعة ومحدد عمق. يثقب الخرسانة والخشب والمعدن.",
    descEn: "850W hammer drill with 13mm self-tightening chuck, speed control and depth stop. Drills concrete, wood and metal.",
  },
  "coffret-forets-hss": {
    nameAr: "علبة مثاقب HSS ومجارير 46 قطعة",
    nameEn: "46-Piece HSS Drill Bit & Tap Set",
    descAr: "علبة كاملة من 46 مثقاباً HSS ومجارير لثقب وتسنين المعادن. فولاذ عالي السرعة مصقول بدقة احترافية.",
    descEn: "Complete set of 46 HSS drill bits and taps for drilling and threading metal. Precision-ground high-speed steel.",
  },
  "caisse-outils-108": {
    nameAr: "صندوق عدد ميكانيكي كامل 108 قطع",
    nameEn: "Complete 108-Piece Mechanic's Tool Kit",
    descAr: "صندوق عدد كامل من 108 قطع: مفاتيح وجلب ومفكات وكماشات وملحقات مطلية بالكروم والفاناديوم. يُسلَّم في حقيبة مقواة.",
    descEn: "Complete 108-piece tool kit: spanners, sockets, screwdrivers, pliers and accessories in chrome vanadium. Delivered in a reinforced case.",
  },
  "tronconneuse-metaux-355": {
    nameAr: "منشار معادن 355 مم 2300 واط",
    nameEn: "355mm 2300W Metal Cut-Off Saw",
    descAr: "منشار معادن 355 مم بقوة 2300 واط مع ملزمة سريعة الشد وزاوية قطع من 0 إلى 45 درجة. قطع نظيف للأنابيب والزوايا الفولاذية.",
    descEn: "355mm 2300W metal cut-off saw with quick-clamp vice and 0–45° angle stop. Clean cuts through steel sections, tubes and angle iron.",
  },
  "visseuse-filaire-650": {
    nameAr: "مفك سلكي احترافي 650 واط لأعمال الجبس",
    nameEn: "Pro 650W Corded Screwdriver for Drywall",
    descAr: "مفك سلكي 650 واط مخصص لتركيب ألواح الجبس، مع قابض قابل للضبط ومحدد عمق. سرعة عالية لتركيب سريع للألواح.",
    descEn: "650W corded screwdriver for drywall, with adjustable clutch and depth stop. High speed for fast board installation.",
  },
  "poste-travail-atelier": {
    nameAr: "طاولة عمل فولاذية للورشة مع رفوف",
    nameEn: "Steel Workshop Workbench with Shelves",
    descAr: "طاولة ورشة من الفولاذ المقوّى مع رفوف تخزين وسطح عمل متين. الحمولة القصوى 500 كغ.",
    descEn: "Reinforced steel workshop bench with storage shelves and a sturdy work top. Maximum load 500 kg.",
  },
  "ciment-portland-50kg": {
    nameAr: "إسمنت بورتلاند CEM II 42.5 — كيس 50 كغ",
    nameEn: "Portland Cement CEM II 42.5 — 50kg Bag",
    descAr: "إسمنت بورتلاند CEM II/A-L 42.5N في كيس 50 كغ. مطابق للمواصفات، مثالي للخرسانة والملاط وجميع أعمال البناء. متوفر بالجملة في طرابلس.",
    descEn: "Portland cement CEM II/A-L 42.5N in 50kg bags. Standard-compliant, ideal for concrete, mortar and all masonry work. Available in bulk in Tripoli.",
  },
  "mortier-colle-25kg": {
    nameAr: "لاصق بلاط C2 — كيس 25 كغ",
    nameEn: "C2 Tile Adhesive — 25kg Bag",
    descAr: "لاصق بلاط محسّن من نوع C2 للبلاط الداخلي والخارجي. كيس 25 كغ، التصاق عالٍ على جميع الأسطح.",
    descEn: "Improved C2 tile adhesive for indoor and outdoor tiling. 25kg bag, high adhesion on all surfaces.",
  },
  "ciment-rapide-palette": {
    nameAr: "إسمنت سريع التصلب — منصة 40 كيس",
    nameEn: "Fast-Setting Cement — 40-Bag Pallet",
    descAr: "منصة من 40 كيس إسمنت سريع التصلب للتثبيت والأعمال العاجلة الصغيرة. توصيل بشاحنة رافعة إلى أي مكان في طرابلس.",
    descEn: "Pallet of 40 fast-setting cement bags for fixings and small urgent jobs. Crane-truck delivery anywhere in Tripoli.",
  },
  "ciment-blanc-25kg": {
    nameAr: "إسمنت أبيض 42.5 — كيس 25 كغ",
    nameEn: "White Cement 42.5 — 25kg Bag",
    descAr: "إسمنت أبيض 42.5 للمحارة الزخرفية وفواصل البلاط وأعمال التشطيب. بياض استثنائي.",
    descEn: "White cement 42.5 for decorative renders, tile grouting and finishing work. Exceptional whiteness.",
  },
  "briques-rouges-palette": {
    nameAr: "طوب أحمر 12 ثقباً — منصة 250 وحدة",
    nameEn: "12-Hole Red Bricks — 250-Unit Pallet",
    descAr: "منصة من 250 طوبة حمراء ذات 12 ثقباً للجدران الحاملة والحواجز. إنتاج محلي بجودة ومقاومة معتمدة.",
    descEn: "Pallet of 250 12-hole red bricks for load-bearing and partition walls. Quality local production with certified strength.",
  },
  "peinture-blanche-20l": {
    nameAr: "دهان أكريليك أبيض مطفأ — دلو 20 لتر",
    nameEn: "Matt White Acrylic Paint — 20L Bucket",
    descAr: "دهان أكريليك أبيض مطفأ عالي التغطية للجدران والأسقف الداخلية. دلو 20 لتر، جفاف سريع وبدون رائحة.",
    descEn: "High-coverage matt white acrylic paint for interior walls and ceilings. 20-litre bucket, fast-drying and odourless.",
  },
  "platre-construction-lot": {
    nameAr: "جص بناء — مجموعة 10 أكياس 40 كغ",
    nameEn: "Construction Plaster — Set of 10 × 40kg Bags",
    descAr: "مجموعة من 10 أكياس جص بناء وزن كل منها 40 كغ للمحارة وأعمال الجص. تشطيب أملس ومتين.",
    descEn: "Set of 10 construction plaster bags, 40kg each, for renders and plastering. Smooth, durable finish.",
  },
  "kit-securite-chantier": {
    nameAr: "طقم سلامة الورشة: خوذة + سترة + قفازات",
    nameEn: "Site Safety Kit: Helmet + Vest + Gloves",
    descAr: "طقم سلامة كامل للورشة: خوذة معتمدة وسترة عالية الوضوح وقفازات مقواة ونظارات واقية.",
    descEn: "Complete site safety kit: certified helmet, high-visibility vest, reinforced gloves and safety goggles.",
  },
};

export const catalogCategories: Record<string, { nameAr: string; nameEn: string }> = {
  "gros-oeuvre": { nameAr: "مواد البناء", nameEn: "Construction & Cement" },
  "outillage-electro": { nameAr: "العدد الكهربائية", nameEn: "Power Tools" },
  "outillage-main": { nameAr: "العدد اليدوية", nameEn: "Hand Tools" },
  "peinture-finition": { nameAr: "الدهانات والتشطيب", nameEn: "Paint & Finishing" },
  plomberie: { nameAr: "السباكة والصحية", nameEn: "Plumbing & Sanitary" },
  electricite: { nameAr: "الكهرباء والإضاءة", nameEn: "Electrical & Lighting" },
  quincaillerie: { nameAr: "مسامير وتثبيت", nameEn: "Hardware & Fixings" },
  "securite-chantier": { nameAr: "معدات السلامة", nameEn: "Site Safety" },
};
