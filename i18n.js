/**
 * JoynFit bilingual support (English / Arabic)
 */
(function () {
  const STORAGE_KEY = 'joynfit-lang';

  const translations = {
    en: {
      'page.title': 'JoynFit — Healthy Desserts Crafted for Pure Joy',
      'page.description': 'Discover JoynFit: artisan healthy desserts made with wholesome ingredients, zero refined sugars, and exquisite taste. Fresh, clean, and guilt-free indulgence.',
      'nav.story': 'Our Story',
      'nav.creations': 'Creations',
      'nav.love': 'Customer Love',
      'nav.watch': 'Watch Reviews',
      'nav.community': 'Community',
      'nav.instagram': 'Instagram',
      'nav.explore_ig': 'Explore on Instagram',
      'hero.tag': 'Artisan Healthy Sweets & Desserts',
      'hero.title': 'Wholesome sweetness, <br>\n                        <em>pure delight</em> in every bite.',
      'hero.desc': 'JoynFit crafts nutrient-dense, naturally sweetened desserts designed for real enjoyment. Experience the silky balance of pure flavors made with wholesome, uncompromised ingredients.',
      'hero.cta_explore': 'Explore Creations',
      'hero.cta_love': 'Customer Love',
      'hero.pill1': '100% Wholesome',
      'hero.pill2': 'No Refined Sugar',
      'hero.pill3': 'Handcrafted Daily',
      'hero.badge1_title': 'Clean Sweetness',
      'hero.badge1_sub': 'Zero Artificial Additives',
      'hero.badge2_title': 'Berry Chia Parfait',
      'hero.badge2_sub': 'Fresh Organic Berries',
      'hero.scroll': 'Scroll to discover',
      'about.eyebrow': 'The JoynFit Philosophy',
      'about.title': 'Dessert without compromise.',
      'about.intro': 'We believe you should never have to choose between taking care of your body and savoring something extraordinary. Every JoynFit creation is crafted with intention, calmness, and wholesome ingredients.',
      'about.p1_title': 'Natural Whole Foods',
      'about.p1_desc': 'From organic berries and cold-pressed coconut milk to raw nuts and chia seeds — only honest, unrefined pantry essentials.',
      'about.p2_title': 'Mindful Sweetness',
      'about.p2_desc': 'Sweetened delicately using natural fruit reductions, pure maple, and monk fruit for a balanced, gentle sweetness that honors your body.',
      'about.p3_title': 'Nutrient Balanced',
      'about.p3_desc': 'Packed with natural dietary fiber, healthy fats, and plant protein to keep energy steady without sugar crashes.',
      'about.p4_title': 'Artisan Small Batches',
      'about.p4_desc': 'Each jar and bite is carefully prepared by hand in small artisan batches to preserve freshness and unmatched texture.',
      'products.eyebrow': 'Our Handcrafted Creations',
      'products.title': 'Wholesome treats, crafted for you.',
      'products.intro': 'Explore our signature healthy desserts. Click any creation for tasting notes and wholesome details.',
      'products.quick': 'Quick View',
      'products.category': 'Protein Bar',
      'p1.tag': 'Bestseller',
      'p1.badge': '100% Wholesome',
      'p1.name': 'Peanut Chocolate Protein Bar',
      'p1.desc': 'Rich roasted peanut butter blended with raw cacao and natural sweeteners, wrapped in a crunchy chocolate coating. Clean fuel for your day.',
      'p1.h1': 'High Protein',
      'p1.h2': 'No Refined Sugar',
      'p1.h3': 'Natural Energy',
      'p1.ing': 'Roasted peanut butter, organic raw cacao, Medjool dates, oats, natural chocolate coating, pink Himalayan salt.',
      'p2.tag': 'Seasonal',
      'p2.badge': 'Antioxidant Boost',
      'p2.name': 'Pumpkin Seeds Protein Bar',
      'p2.desc': 'Crunchy pumpkin seeds and sunflower seeds bound with raw honey and a hint of vanilla. Packed with minerals and healthy fats.',
      'p2.h1': 'Seed-Packed',
      'p2.h2': 'Mineral Rich',
      'p2.h3': 'Healthy Fats',
      'p2.ing': 'Pumpkin seeds, sunflower seeds, raw honey, oats, vanilla extract, cold-pressed coconut oil.',
      'p3.tag': 'Protein Favorite',
      'p3.badge': 'Energy Boost',
      'p3.name': 'Peanut Classic Protein Bar',
      'p3.desc': 'A simple, powerful bar loaded with roasted peanuts and natural oats. Clean ingredients, bold peanut flavor, and sustained energy.',
      'p3.h1': 'Plant Protein',
      'p3.h2': 'Peanut Loaded',
      'p3.h3': 'Clean Energy',
      'p3.ing': 'Roasted peanuts, organic oats, Medjool dates, natural peanut butter, a touch of sea salt.',
      'p4.tag': 'New',
      'p4.badge': 'Refreshing',
      'p4.name': 'Coconut Classic Protein Bar',
      'p4.desc': 'Toasted coconut flakes and creamy coconut butter blended with oats and natural sweetness. A tropical bite that satisfies every time.',
      'p4.h1': 'Coconut Rich',
      'p4.h2': 'Dairy-Free',
      'p4.h3': 'Tropical Taste',
      'p4.ing': 'Toasted coconut flakes, coconut butter, organic oats, Medjool dates, vanilla extract, a pinch of sea salt.',
      'callout.title': 'Every batch is freshly made to order',
      'callout.desc': 'We believe in absolute freshness. Connect with us on Instagram to see current batch availability and discover seasonal flavors.',
      'callout.cta': 'Check Availability',
      'reviews.eyebrow': 'Real Community Love',
      'reviews.title': 'Words from our happy eaters.',
      'reviews.intro': 'Authentic customer messages straight from our WhatsApp community. Click on any review to view the full message screenshot.',
      'reviews.customer': 'JoynFit Customer',
      'reviews.verified': 'Verified Purchase',
      'reviews.q1': '"Amazing healthy desserts! The taste is incredible and I feel great after eating them."',
      'reviews.q2': '"Absolutely love these treats! Perfect balance of taste and health."',
      'reviews.q3': '"My go-to healthy snack! Always fresh and beautifully packaged."',
      'reviews.tap': 'Tap to view screenshot',
      'video.eyebrow': 'Featured Video',
      'video.title': 'Hear what our community says.',
      'video.intro': 'Watch real feedback, unboxing, and tasting reactions from dessert lovers who made the switch to JoynFit.',
      'video.badge': 'Watch Customer Experience (1:20)',
      'video.s1_label': 'Real Feedback',
      'video.s1_desc': 'Authentic reviews from regular clients enjoying our healthy creations every week.',
      'video.s2_label': 'Refined Sugars',
      'video.s2_desc': 'Loved by health enthusiasts, athletes, and anyone wanting sweet pleasure without guilt.',
      'video.s3_label': 'Average Satisfaction',
      'video.s3_desc': 'Consistently praised for luxurious textures and authentic gourmet flavors.',
      'ig.eyebrow': 'Follow The Journey',
      'ig.title': 'Connect with JoynFit on Instagram.',
      'ig.intro': 'Join our growing community. Follow <strong>@joynfit</strong> for daily batch drops, behind-the-scenes ingredient sourcing, healthy dessert inspirations, and direct ordering.',
      'footer.bio': 'Artisanal healthy dessert brand created with care. Enjoy uncompromised sweet indulgence crafted from natural, clean, and nutritious ingredients.',
      'footer.nav': 'Navigation',
      'footer.creations': 'Dessert Creations',
      'footer.reviews': 'Customer Reviews',
      'footer.video': 'Video Testimonials',
      'footer.connect': 'Connect',
      'footer.ig': 'Instagram (@joynfit)',
      'footer.wa': 'WhatsApp Feedback',
      'footer.batch': 'Batch Inquiries',
      'footer.promise': 'The JoynFit Promise',
      'footer.pr1': '100% Wholesome Ingredients',
      'footer.pr2': 'Free from Refined Sugars',
      'footer.pr3': 'Clean, Natural Indulgence',
      'footer.copy': '© 2026 JoynFit Healthy Desserts. All rights reserved. Made with calm & intention.',
      'modal.review_title': 'Customer Review',
      'modal.review_quote': 'WhatsApp verified feedback from our community.',
      'modal.energy': 'Energy',
      'modal.protein': 'Clean Protein',
      'modal.fiber': 'Dietary Fiber',
      'modal.ingredients': 'Wholesome Ingredients',
      'modal.cta': 'Inquire / Request Batch on Instagram'
    },
    ar: {
      'page.title': 'جوين فت — حلويات صحية مصنوعة بفرحة خالصة',
      'page.description': 'اكتشف جوين فت: حلويات حرفية صحية بمكونات طبيعية، خالية من السكر المكرر، بطعم رائع. انتعاش ونظافة واستمتاع بلا شعور بالذنب.',
      'nav.story': 'قصتنا',
      'nav.creations': 'إبداعاتنا',
      'nav.love': 'حب العملاء',
      'nav.watch': 'شاهد التقييمات',
      'nav.community': 'المجتمع',
      'nav.instagram': 'إنستغرام',
      'nav.explore_ig': 'اكتشفنا على إنستغرام',
      'hero.tag': 'حلويات وصحيات حرفية',
      'hero.title': 'حلاوة صحية، <br>\n                        <em>متعة خالصة</em> في كل قضمة.',
      'hero.desc': 'جوين فت تصنع حلويات غنية بالعناصر ومُحلّاة طبيعيًا للاستمتاع الحقيقي. تذوق توازن النكهات النقية بمكونات صحية بلا تنازلات.',
      'hero.cta_explore': 'استكشف الإبداعات',
      'hero.cta_love': 'حب العملاء',
      'hero.pill1': '١٠٠٪ صحي',
      'hero.pill2': 'بدون سكر مكرر',
      'hero.pill3': 'صنع يدوي يوميًا',
      'hero.badge1_title': 'حلاوة نظيفة',
      'hero.badge1_sub': 'بدون إضافات صناعية',
      'hero.badge2_title': 'بارفيه الشيا والتوت',
      'hero.badge2_sub': 'توت عضوي طازج',
      'hero.scroll': 'مرّر للاكتشاف',
      'about.eyebrow': 'فلسفة جوين فت',
      'about.title': 'حلى بلا تنازلات.',
      'about.intro': 'نؤمن أنه لا ينبغي أن تختار بين العناية بجسمك والاستمتاع بشيء استثنائي. كل منتج من جوين فت يُصنع بنية وهدوء ومكونات صحية.',
      'about.p1_title': 'أطعمة كاملة طبيعية',
      'about.p1_desc': 'من التوت العضوي وحليب جوز الهند المعصور على البارد إلى المكسرات النيئة وبذور الشيا — أساسيات مطبخ صادقة وغير مكررة فقط.',
      'about.p2_title': 'حلاوة واعية',
      'about.p2_desc': 'تحلية رقيقة بمختزلات الفاكهة والقيقب النقي وفاكهة الراهب لحلاوة متوازنة لطيفة تحترم جسدك.',
      'about.p3_title': 'توازن غذائي',
      'about.p3_desc': 'غنية بالألياف الطبيعية والدهون الصحية والبروتين النباتي لطاقة ثابتة بدون هبوط السكر.',
      'about.p4_title': 'دفعات حرفية صغيرة',
      'about.p4_desc': 'كل برطمان ولقمة تُحضَّر يدويًا بدفعات صغيرة للحفاظ على الطزاجة والقوام الفريد.',
      'products.eyebrow': 'إبداعاتنا اليدوية',
      'products.title': 'حلويات صحية، صُنعت لك.',
      'products.intro': 'اكتشف حلوياتنا الصحية المميزة. انقر على أي منتج لملاحظات التذوق والتفاصيل الصحية.',
      'products.quick': 'عرض سريع',
      'products.category': 'بار بروتين',
      'p1.tag': 'الأكثر مبيعًا',
      'p1.badge': '١٠٠٪ صحي',
      'p1.name': 'بار بروتين الفول السوداني والشوكولاتة',
      'p1.desc': 'زبدة فول سوداني محمصة غنية ممزوجة بالكاكاو الخام ومحليات طبيعية، مغلفة بطبقة شوكولاتة مقرمشة. طاقة نظيفة ليومك.',
      'p1.h1': 'بروتين عالٍ',
      'p1.h2': 'بدون سكر مكرر',
      'p1.h3': 'طاقة طبيعية',
      'p1.ing': 'زبدة فول سوداني محمصة، كاكاو خام عضوي، تمر مجهول، شوفان، غلاف شوكولاتة طبيعي، ملح هيمالايا وردي.',
      'p2.tag': 'موسمي',
      'p2.badge': 'تعزيز مضادات الأكسدة',
      'p2.name': 'بار بروتين بذور القرع',
      'p2.desc': 'بذور قرع وعباد شمس مقرمشة مع عسل خام ولمسة فانيليا. غني بالمعادن والدهون الصحية.',
      'p2.h1': 'غني بالبذور',
      'p2.h2': 'غني بالمعادن',
      'p2.h3': 'دهون صحية',
      'p2.ing': 'بذور قرع، بذور عباد شمس، عسل خام، شوفان، مستخلص فانيليا، زيت جوز هند معصور على البارد.',
      'p3.tag': 'مفضل البروتين',
      'p3.badge': 'تعزيز الطاقة',
      'p3.name': 'بار بروتين الفول السوداني الكلاسيكي',
      'p3.desc': 'بار بسيط وقوي محشو بالفول السوداني المحمص والشوفان الطبيعي. مكونات نظيفة ونكهة جريئة وطاقة مستدامة.',
      'p3.h1': 'بروتين نباتي',
      'p3.h2': 'غني بالفول السوداني',
      'p3.h3': 'طاقة نظيفة',
      'p3.ing': 'فول سوداني محمص، شوفان عضوي، تمر مجهول، زبدة فول سوداني طبيعية، لمسة ملح بحر.',
      'p4.tag': 'جديد',
      'p4.badge': 'منعش',
      'p4.name': 'بار بروتين جوز الهند الكلاسيكي',
      'p4.desc': 'رقائق جوز هند محمصة وزبدة جوز هند كريمية مع الشوفان والحلاوة الطبيعية. قضمة استوائية تُرضي في كل مرة.',
      'p4.h1': 'غني بجوز الهند',
      'p4.h2': 'خالي من الألبان',
      'p4.h3': 'طعم استوائي',
      'p4.ing': 'رقائق جوز هند محمصة، زبدة جوز هند، شوفان عضوي، تمر مجهول، مستخلص فانيليا، رشة ملح بحر.',
      'callout.title': 'كل دفعة تُصنع طازجة حسب الطلب',
      'callout.desc': 'نؤمن بالطزاجة المطلقة. تواصل معنا على إنستغرام لمعرفة توفر الدفعات الحالية واكتشاف النكهات الموسمية.',
      'callout.cta': 'تحقق من التوفر',
      'reviews.eyebrow': 'حب حقيقي من المجتمع',
      'reviews.title': 'كلمات من محبي حلوياتنا.',
      'reviews.intro': 'رسائل عملاء حقيقية من مجتمع واتساب. انقر على أي تقييم لعرض لقطة الشاشة الكاملة.',
      'reviews.customer': 'عميل جوين فت',
      'reviews.verified': 'شراء موثّق',
      'reviews.q1': '"حلويات صحية مذهلة! الطعم رائع وأشعر بروعة بعد تناولها."',
      'reviews.q2': '"أعشق هذه الحلويات تمامًا! توازن مثالي بين الطعم والصحة."',
      'reviews.q3': '"وجباتي الخفيفة الصحية المفضلة! دائمًا طازجة وتغليفها جميل."',
      'reviews.tap': 'اضغط لعرض اللقطة',
      'video.eyebrow': 'فيديو مميز',
      'video.title': 'اسمع ما يقوله مجتمعنا.',
      'video.intro': 'شاهد تعليقات حقيقية وتجارب فتح وتذوق من عشاق الحلويات الذين اختاروا جوين فت.',
      'video.badge': 'شاهد تجربة العملاء (١:٢٠)',
      'video.s1_label': 'تقييمات حقيقية',
      'video.s1_desc': 'آراء أصيلة من عملاء منتظمين يستمتعون بإبداعاتنا الصحية كل أسبوع.',
      'video.s2_label': 'سكر مكرر',
      'video.s2_desc': 'محبوبة لدى المهتمين بالصحة والرياضيين وكل من يريد متعة حلوة بلا شعور بالذنب.',
      'video.s3_label': 'متوسط الرضا',
      'video.s3_desc': 'يُشاد بها باستمرار على قوامها الفاخر ونكهاتها الأصيلة.',
      'ig.eyebrow': 'تابع الرحلة',
      'ig.title': 'تواصل مع جوين فت على إنستغرام.',
      'ig.intro': 'انضم إلى مجتمعنا المتنامي. تابع <strong>@joynfit</strong> لإسقاطات الدفعات اليومية، وكواليس المكونات، وإلهام الحلويات الصحية، والطلب المباشر.',
      'footer.bio': 'علامة حلويات صحية حرفية صُنعت بعناية. استمتع بحلاوة بلا تنازلات من مكونات طبيعية نظيفة ومغذية.',
      'footer.nav': 'التنقل',
      'footer.creations': 'إبداعات الحلويات',
      'footer.reviews': 'آراء العملاء',
      'footer.video': 'شهادات الفيديو',
      'footer.connect': 'تواصل',
      'footer.ig': 'إنستغرام (@joynfit)',
      'footer.wa': 'ملاحظات واتساب',
      'footer.batch': 'استفسارات الدفعات',
      'footer.promise': 'وعد جوين فت',
      'footer.pr1': 'مكونات صحية ١٠٠٪',
      'footer.pr2': 'خالية من السكر المكرر',
      'footer.pr3': 'استمتاع نظيف وطبيعي',
      'footer.copy': '© ٢٠٢٦ جوين فت للحلويات الصحية. جميع الحقوق محفوظة. صُنعت بهدوء ونية.',
      'modal.review_title': 'تقييم عميل',
      'modal.review_quote': 'ملاحظات موثّقة عبر واتساب من مجتمعنا.',
      'modal.energy': 'الطاقة',
      'modal.protein': 'بروتين نظيف',
      'modal.fiber': 'ألياف غذائية',
      'modal.ingredients': 'مكونات صحية',
      'modal.cta': 'استفسر / اطلب دفعة على إنستغرام'
    }
  };

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;
    const isRtl = lang === 'ar';

    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.body.classList.toggle('is-ar', isRtl);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] != null) el.innerHTML = dict[key];
    });

    document.querySelectorAll('[data-i18n-content]').forEach((el) => {
      const key = el.getAttribute('data-i18n-content');
      if (dict[key] != null) el.setAttribute('content', dict[key]);
    });

    if (dict['page.title']) document.title = dict['page.title'];

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      const active = btn.getAttribute('data-set-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) { /* ignore */ }
  }

  function init() {
    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyLanguage(btn.getAttribute('data-set-lang'));
      });
    });

    let initial = 'en';
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ar' || saved === 'en') initial = saved;
    } catch (_) { /* ignore */ }

    applyLanguage(initial);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.JoynFitI18n = { applyLanguage, translations };
})();
