/**
 * JoynFit CMS — shared content store for the public site and admin panel.
 * Persists overrides in localStorage; export/import JSON for backup or sharing.
 */
(function () {
  const STORAGE_KEY = 'joynfit-cms';
  const AUTH_KEY = 'joynfit-cms-auth';
  /** Initial / fallback admin password. Changeable under Site Settings. */
  const DEFAULT_PASSWORD = 'joynfitxxx';
  const LEGACY_PASSWORDS = new Set(['joynfit']);

  const DEFAULT_MEDIA = {
    logo: 'assets/images/brand/joynfit_logo.png',
    heroImage: 'assets/images/products/dessert1.jpeg',
    product1: 'assets/images/products/dessert1.jpeg',
    product2: 'assets/images/products/dessert2.jpeg',
    product3: 'assets/images/products/dessert3.jpeg',
    product4: 'assets/images/products/dessert4.jpeg',
    review1: 'assets/images/reviews/review1.jpeg',
    review2: 'assets/images/reviews/review4.jpeg',
    review3: 'assets/images/reviews/review7.jpeg',
    videoSrc: 'assets/video/joynfit-video.mp4',
    videoPoster: 'assets/images/products/dessert1.jpeg',
    insta1: 'assets/images/products/dessert1.jpeg',
    insta2: 'assets/images/products/dessert2.jpeg',
    insta3: 'assets/images/products/dessert3.jpeg',
    insta4: 'assets/images/products/dessert4.jpeg'
  };

  const DEFAULT_LINKS = {
    instagram: 'https://www.instagram.com/joynfit.eg?stkn=MWc2dnRtcTJsa2xocQ==',
    whatsapp: '201036595467'
  };

  const DEFAULT_SECTIONS = {
    hero: true,
    about: true,
    products: true,
    order: true,
    reviews: true,
    video: true,
    instagram: true,
    footer: true
  };

  const DEFAULT_FONTS = {
    heading: 'playfair',
    body: 'jakarta',
    arabic: 'cairo'
  };

  const DEFAULT_COLORS = {
    heading: '#45270b',
    body: '#574D47',
    muted: '#8E827A',
    accent: '#4A6F54'
  };

  /** Curated Google Font options for heading, body, and Arabic text. */
  const FONT_CATALOG = {
    playfair: {
      id: 'playfair',
      label: 'Playfair Display',
      role: 'heading',
      family: "'Playfair Display', Georgia, serif",
      google: 'Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600'
    },
    fraunces: {
      id: 'fraunces',
      label: 'Fraunces',
      role: 'heading',
      family: "'Fraunces', Georgia, serif",
      google: 'Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400'
    },
    cormorant: {
      id: 'cormorant',
      label: 'Cormorant Garamond',
      role: 'heading',
      family: "'Cormorant Garamond', Georgia, serif",
      google: 'Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600'
    },
    lora: {
      id: 'lora',
      label: 'Lora',
      role: 'heading',
      family: "'Lora', Georgia, serif",
      google: 'Lora:ital,wght@0,500;0,600;0,700;1,400;1,600'
    },
    libre: {
      id: 'libre',
      label: 'Libre Baskerville',
      role: 'heading',
      family: "'Libre Baskerville', Georgia, serif",
      google: 'Libre+Baskerville:ital,wght@0,400;0,700;1,400'
    },
    dmserif: {
      id: 'dmserif',
      label: 'DM Serif Display',
      role: 'heading',
      family: "'DM Serif Display', Georgia, serif",
      google: 'DM+Serif+Display:ital@0;1'
    },
    instrument: {
      id: 'instrument',
      label: 'Instrument Serif',
      role: 'heading',
      family: "'Instrument Serif', Georgia, serif",
      google: 'Instrument+Serif:ital@0;1'
    },
    jakarta: {
      id: 'jakarta',
      label: 'Plus Jakarta Sans',
      role: 'body',
      family: "'Plus Jakarta Sans', system-ui, sans-serif",
      google: 'Plus+Jakarta+Sans:wght@300;400;500;600;700'
    },
    outfit: {
      id: 'outfit',
      label: 'Outfit',
      role: 'body',
      family: "'Outfit', system-ui, sans-serif",
      google: 'Outfit:wght@300;400;500;600;700'
    },
    manrope: {
      id: 'manrope',
      label: 'Manrope',
      role: 'body',
      family: "'Manrope', system-ui, sans-serif",
      google: 'Manrope:wght@300;400;500;600;700'
    },
    dmsans: {
      id: 'dmsans',
      label: 'DM Sans',
      role: 'body',
      family: "'DM Sans', system-ui, sans-serif",
      google: 'DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400'
    },
    space: {
      id: 'space',
      label: 'Space Grotesk',
      role: 'body',
      family: "'Space Grotesk', system-ui, sans-serif",
      google: 'Space+Grotesk:wght@300;400;500;600;700'
    },
    nunito: {
      id: 'nunito',
      label: 'Nunito Sans',
      role: 'body',
      family: "'Nunito Sans', system-ui, sans-serif",
      google: 'Nunito+Sans:ital,opsz,wght@0,6..12,300;0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700;1,6..12,400'
    },
    sourcesans: {
      id: 'sourcesans',
      label: 'Source Sans 3',
      role: 'body',
      family: "'Source Sans 3', system-ui, sans-serif",
      google: 'Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400'
    },
    cairo: {
      id: 'cairo',
      label: 'Cairo',
      role: 'arabic',
      family: "'Cairo', sans-serif",
      google: 'Cairo:wght@400;500;600;700'
    },
    tajawal: {
      id: 'tajawal',
      label: 'Tajawal',
      role: 'arabic',
      family: "'Tajawal', sans-serif",
      google: 'Tajawal:wght@400;500;700'
    },
    almarai: {
      id: 'almarai',
      label: 'Almarai',
      role: 'arabic',
      family: "'Almarai', sans-serif",
      google: 'Almarai:wght@300;400;700'
    },
    ibmarabic: {
      id: 'ibmarabic',
      label: 'IBM Plex Sans Arabic',
      role: 'arabic',
      family: "'IBM Plex Sans Arabic', sans-serif",
      google: 'IBM+Plex+Sans+Arabic:wght@300;400;500;600;700'
    },
    notonaskh: {
      id: 'notonaskh',
      label: 'Noto Naskh Arabic',
      role: 'arabic',
      family: "'Noto Naskh Arabic', serif",
      google: 'Noto+Naskh+Arabic:wght@400;500;600;700'
    }
  };

  function getFontOptions(role) {
    return Object.values(FONT_CATALOG).filter((font) => font.role === role);
  }

  function resolveFont(id, fallbackId) {
    return FONT_CATALOG[id] || FONT_CATALOG[fallbackId];
  }

  const IMAGE_UPLOAD_MAX_EDGE = 1400;
  const IMAGE_UPLOAD_QUALITY = 0.8;
  const VIDEO_UPLOAD_MAX_BYTES = 4 * 1024 * 1024;

  function isImageFile(file) {
    return !!file && (/^image\//.test(file.type) || /\.(jpe?g|png|webp|gif|svg)$/i.test(file.name || ''));
  }

  function isVideoFile(file) {
    return !!file && (/^video\//.test(file.type) || /\.(mp4|webm|mov)$/i.test(file.name || ''));
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error('Could not read this file'));
      reader.readAsDataURL(file);
    });
  }

  function loadImageElement(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Could not process this image'));
      img.src = src;
    });
  }

  async function compressImageFile(file, maxEdge = IMAGE_UPLOAD_MAX_EDGE, quality = IMAGE_UPLOAD_QUALITY) {
    const original = await readFileAsDataUrl(file);
    if (/^image\/svg\+xml/i.test(file.type)) return original;

    const img = await loadImageElement(original);
    const scale = Math.min(1, maxEdge / Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height));
    const width = Math.max(1, Math.round((img.naturalWidth || img.width) * scale));
    const height = Math.max(1, Math.round((img.naturalHeight || img.height) * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return original;
    ctx.drawImage(img, 0, 0, width, height);

    const preferPng = /png$/i.test(file.type) && hasTransparency(ctx, width, height);
    return canvas.toDataURL(preferPng ? 'image/png' : 'image/jpeg', quality);
  }

  function hasTransparency(ctx, width, height) {
    try {
      const sample = ctx.getImageData(0, 0, Math.min(width, 32), Math.min(height, 32)).data;
      for (let i = 3; i < sample.length; i += 4) {
        if (sample[i] < 250) return true;
      }
    } catch (_) { /* ignore tainted canvas */ }
    return false;
  }

  async function fileToMediaValue(file, kind = 'image') {
    if (!file) throw new Error('No file selected');

    if (kind === 'video' || isVideoFile(file)) {
      if (file.size > VIDEO_UPLOAD_MAX_BYTES) {
        throw new Error('Video is too large (max 4MB). Host it online and paste the URL instead.');
      }
      return readFileAsDataUrl(file);
    }

    if (!isImageFile(file)) {
      throw new Error('Please choose an image file (JPG, PNG, WEBP, or GIF)');
    }
    if (file.size > 12 * 1024 * 1024) {
      throw new Error('Image is too large (max 12MB before compression)');
    }
    return compressImageFile(file);
  }

  function isDataMedia(value) {
    return typeof value === 'string' && value.startsWith('data:');
  }

  /** Field schema used by the admin panel (grouped by section). */
  const FIELD_SCHEMA = {
    settings: {
      label: 'Site Settings',
      description: 'Global links, branding media, and admin access.',
      fields: [
        { key: 'instagram', group: 'links', type: 'url', label: 'Instagram URL' },
        {
          key: 'whatsapp',
          group: 'links',
          type: 'text',
          label: 'WhatsApp order number',
          hint: 'Digits only or with + country code. Orders open chat to this number.'
        },
        { key: 'logo', group: 'media', type: 'text', label: 'Logo image', upload: 'image' },
        {
          key: 'password',
          group: 'meta',
          type: 'password',
          label: 'Change password',
          hint: 'Updates the admin login password for this browser. Leave blank to keep the current password.'
        }
      ]
    },
    fonts: {
      label: 'Fonts & Colors',
      description: 'Change fonts and text colors across the whole website.',
      fields: [
        {
          key: 'heading',
          group: 'fonts',
          type: 'select',
          label: 'Heading font',
          optionsKey: 'heading',
          hint: 'Used for titles and brand-style headlines.'
        },
        {
          key: 'body',
          group: 'fonts',
          type: 'select',
          label: 'Body font',
          optionsKey: 'body',
          hint: 'Used for paragraphs, buttons, and UI text.'
        },
        {
          key: 'arabic',
          group: 'fonts',
          type: 'select',
          label: 'Arabic font',
          optionsKey: 'arabic',
          hint: 'Used when the site language is Arabic (RTL).'
        },
        {
          key: 'heading',
          group: 'colors',
          type: 'color',
          label: 'Heading text color',
          hint: 'Titles, product names, and strong headings.'
        },
        {
          key: 'body',
          group: 'colors',
          type: 'color',
          label: 'Body text color',
          hint: 'Paragraphs and general readable text.'
        },
        {
          key: 'muted',
          group: 'colors',
          type: 'color',
          label: 'Muted text color',
          hint: 'Hints, captions, and secondary labels.'
        },
        {
          key: 'accent',
          group: 'colors',
          type: 'color',
          label: 'Accent / link color',
          hint: 'Links, active nav, and brand accent text.'
        }
      ]
    },
    visibility: {
      label: 'Section Visibility',
      description: 'Show or hide entire sections on the website.',
      toggles: [
        { key: 'hero', label: 'Hero' },
        { key: 'about', label: 'Our Story' },
        { key: 'products', label: 'Creations / Products' },
        { key: 'order', label: 'Order Now' },
        { key: 'reviews', label: 'Customer Reviews' },
        { key: 'video', label: 'Video Reviews' },
        { key: 'instagram', label: 'Instagram / Community' },
        { key: 'footer', label: 'Footer' }
      ]
    },
    hero: {
      label: 'Hero',
      description: 'Main headline area at the top of the page.',
      fields: [
        { key: 'hero.tag', type: 'text', label: 'Tagline', i18n: true },
        { key: 'hero.title', type: 'textarea', label: 'Title (HTML allowed)', i18n: true, html: true },
        { key: 'hero.desc', type: 'textarea', label: 'Description', i18n: true },
        { key: 'hero.cta_explore', type: 'text', label: 'Primary CTA', i18n: true },
        { key: 'hero.cta_love', type: 'text', label: 'Secondary CTA', i18n: true },
        { key: 'hero.pill1', type: 'text', label: 'Pill 1', i18n: true },
        { key: 'hero.pill2', type: 'text', label: 'Pill 2', i18n: true },
        { key: 'hero.pill3', type: 'text', label: 'Pill 3', i18n: true },
        { key: 'hero.badge1_title', type: 'text', label: 'Badge 1 title', i18n: true },
        { key: 'hero.badge1_sub', type: 'text', label: 'Badge 1 subtitle', i18n: true },
        { key: 'hero.badge2_title', type: 'text', label: 'Badge 2 title', i18n: true },
        { key: 'hero.badge2_sub', type: 'text', label: 'Badge 2 subtitle', i18n: true },
        { key: 'hero.scroll', type: 'text', label: 'Scroll hint', i18n: true },
        { key: 'heroImage', group: 'media', type: 'text', label: 'Hero image', upload: 'image' }
      ]
    },
    about: {
      label: 'Our Story',
      description: 'Philosophy and four pillars.',
      fields: [
        { key: 'about.eyebrow', type: 'text', label: 'Eyebrow', i18n: true },
        { key: 'about.title', type: 'text', label: 'Title', i18n: true },
        { key: 'about.intro', type: 'textarea', label: 'Intro', i18n: true },
        { key: 'about.p1_title', type: 'text', label: 'Pillar 1 title', i18n: true },
        { key: 'about.p1_desc', type: 'textarea', label: 'Pillar 1 description', i18n: true },
        { key: 'about.p2_title', type: 'text', label: 'Pillar 2 title', i18n: true },
        { key: 'about.p2_desc', type: 'textarea', label: 'Pillar 2 description', i18n: true },
        { key: 'about.p3_title', type: 'text', label: 'Pillar 3 title', i18n: true },
        { key: 'about.p3_desc', type: 'textarea', label: 'Pillar 3 description', i18n: true },
        { key: 'about.p4_title', type: 'text', label: 'Pillar 4 title', i18n: true },
        { key: 'about.p4_desc', type: 'textarea', label: 'Pillar 4 description', i18n: true }
      ]
    },
    products: {
      label: 'Creations',
      description: 'Product section header, callout, and four products.',
      fields: [
        { key: 'products.eyebrow', type: 'text', label: 'Eyebrow', i18n: true },
        { key: 'products.title', type: 'text', label: 'Title', i18n: true },
        { key: 'products.intro', type: 'textarea', label: 'Intro', i18n: true },
        { key: 'products.category', type: 'text', label: 'Product category label', i18n: true },
        { key: 'products.quick', type: 'text', label: 'Quick view button', i18n: true },
        { key: 'callout.title', type: 'text', label: 'Callout title', i18n: true },
        { key: 'callout.desc', type: 'textarea', label: 'Callout description', i18n: true },
        { key: 'callout.cta', type: 'text', label: 'Callout CTA', i18n: true },
        { key: 'p1.tag', type: 'text', label: 'Product 1 tag', i18n: true },
        { key: 'p1.badge', type: 'text', label: 'Product 1 badge', i18n: true },
        { key: 'p1.name', type: 'text', label: 'Product 1 name', i18n: true },
        { key: 'p1.desc', type: 'textarea', label: 'Product 1 description', i18n: true },
        { key: 'p1.h1', type: 'text', label: 'Product 1 chip 1', i18n: true },
        { key: 'p1.h2', type: 'text', label: 'Product 1 chip 2', i18n: true },
        { key: 'p1.h3', type: 'text', label: 'Product 1 chip 3', i18n: true },
        { key: 'p1.ing', type: 'textarea', label: 'Product 1 ingredients', i18n: true },
        { key: 'product1', group: 'media', type: 'text', label: 'Product 1 image', upload: 'image' },
        { key: 'p2.tag', type: 'text', label: 'Product 2 tag', i18n: true },
        { key: 'p2.badge', type: 'text', label: 'Product 2 badge', i18n: true },
        { key: 'p2.name', type: 'text', label: 'Product 2 name', i18n: true },
        { key: 'p2.desc', type: 'textarea', label: 'Product 2 description', i18n: true },
        { key: 'p2.h1', type: 'text', label: 'Product 2 chip 1', i18n: true },
        { key: 'p2.h2', type: 'text', label: 'Product 2 chip 2', i18n: true },
        { key: 'p2.h3', type: 'text', label: 'Product 2 chip 3', i18n: true },
        { key: 'p2.ing', type: 'textarea', label: 'Product 2 ingredients', i18n: true },
        { key: 'product2', group: 'media', type: 'text', label: 'Product 2 image', upload: 'image' },
        { key: 'p3.tag', type: 'text', label: 'Product 3 tag', i18n: true },
        { key: 'p3.badge', type: 'text', label: 'Product 3 badge', i18n: true },
        { key: 'p3.name', type: 'text', label: 'Product 3 name', i18n: true },
        { key: 'p3.desc', type: 'textarea', label: 'Product 3 description', i18n: true },
        { key: 'p3.h1', type: 'text', label: 'Product 3 chip 1', i18n: true },
        { key: 'p3.h2', type: 'text', label: 'Product 3 chip 2', i18n: true },
        { key: 'p3.h3', type: 'text', label: 'Product 3 chip 3', i18n: true },
        { key: 'p3.ing', type: 'textarea', label: 'Product 3 ingredients', i18n: true },
        { key: 'product3', group: 'media', type: 'text', label: 'Product 3 image', upload: 'image' },
        { key: 'p4.tag', type: 'text', label: 'Product 4 tag', i18n: true },
        { key: 'p4.badge', type: 'text', label: 'Product 4 badge', i18n: true },
        { key: 'p4.name', type: 'text', label: 'Product 4 name', i18n: true },
        { key: 'p4.desc', type: 'textarea', label: 'Product 4 description', i18n: true },
        { key: 'p4.h1', type: 'text', label: 'Product 4 chip 1', i18n: true },
        { key: 'p4.h2', type: 'text', label: 'Product 4 chip 2', i18n: true },
        { key: 'p4.h3', type: 'text', label: 'Product 4 chip 3', i18n: true },
        { key: 'p4.ing', type: 'textarea', label: 'Product 4 ingredients', i18n: true },
        { key: 'product4', group: 'media', type: 'text', label: 'Product 4 image', upload: 'image' }
      ]
    },
    order: {
      label: 'Order Now',
      description: 'Order form copy sent to WhatsApp.',
      fields: [
        { key: 'order.eyebrow', type: 'text', label: 'Eyebrow', i18n: true },
        { key: 'order.title', type: 'text', label: 'Title', i18n: true },
        { key: 'order.intro', type: 'textarea', label: 'Intro', i18n: true },
        { key: 'order.product', type: 'text', label: 'Product label', i18n: true },
        { key: 'order.product_placeholder', type: 'text', label: 'Product placeholder', i18n: true },
        { key: 'order.custom', type: 'text', label: 'Custom product option', i18n: true },
        { key: 'order.name', type: 'text', label: 'Name label', i18n: true },
        { key: 'order.mobile', type: 'text', label: 'Mobile label', i18n: true },
        { key: 'order.location', type: 'text', label: 'Location label', i18n: true },
        { key: 'order.notes', type: 'text', label: 'Notes label', i18n: true },
        { key: 'order.notes_placeholder', type: 'text', label: 'Notes placeholder', i18n: true },
        { key: 'order.submit', type: 'text', label: 'Submit button', i18n: true },
        { key: 'order.hint', type: 'text', label: 'Form hint', i18n: true },
        { key: 'order.error', type: 'text', label: 'Validation error', i18n: true }
      ]
    },
    reviews: {
      label: 'Customer Reviews',
      description: 'Review section copy and screenshot images.',
      fields: [
        { key: 'reviews.eyebrow', type: 'text', label: 'Eyebrow', i18n: true },
        { key: 'reviews.title', type: 'text', label: 'Title', i18n: true },
        { key: 'reviews.intro', type: 'textarea', label: 'Intro', i18n: true },
        { key: 'reviews.customer', type: 'text', label: 'Customer label', i18n: true },
        { key: 'reviews.verified', type: 'text', label: 'Verified label', i18n: true },
        { key: 'reviews.q1', type: 'textarea', label: 'Review 1 quote', i18n: true },
        { key: 'reviews.q2', type: 'textarea', label: 'Review 2 quote', i18n: true },
        { key: 'reviews.q3', type: 'textarea', label: 'Review 3 quote', i18n: true },
        { key: 'reviews.tap', type: 'text', label: 'Tap hint', i18n: true },
        { key: 'review1', group: 'media', type: 'text', label: 'Review 1 screenshot', upload: 'image' },
        { key: 'review2', group: 'media', type: 'text', label: 'Review 2 screenshot', upload: 'image' },
        { key: 'review3', group: 'media', type: 'text', label: 'Review 3 screenshot', upload: 'image' }
      ]
    },
    video: {
      label: 'Video Reviews',
      description: 'Featured video and side stats.',
      fields: [
        { key: 'video.eyebrow', type: 'text', label: 'Eyebrow', i18n: true },
        { key: 'video.title', type: 'text', label: 'Title', i18n: true },
        { key: 'video.intro', type: 'textarea', label: 'Intro', i18n: true },
        { key: 'video.badge', type: 'text', label: 'Play badge', i18n: true },
        { key: 'video.s1_label', type: 'text', label: 'Stat 1 label', i18n: true },
        { key: 'video.s1_desc', type: 'textarea', label: 'Stat 1 description', i18n: true },
        { key: 'video.s2_label', type: 'text', label: 'Stat 2 label', i18n: true },
        { key: 'video.s2_desc', type: 'textarea', label: 'Stat 2 description', i18n: true },
        { key: 'video.s3_label', type: 'text', label: 'Stat 3 label', i18n: true },
        { key: 'video.s3_desc', type: 'textarea', label: 'Stat 3 description', i18n: true },
        { key: 'videoSrc', group: 'media', type: 'text', label: 'Video file', upload: 'video' },
        { key: 'videoPoster', group: 'media', type: 'text', label: 'Video poster image', upload: 'image' }
      ]
    },
    instagram: {
      label: 'Instagram / Community',
      description: 'Community section copy and grid images.',
      fields: [
        { key: 'ig.eyebrow', type: 'text', label: 'Eyebrow', i18n: true },
        { key: 'ig.title', type: 'text', label: 'Title', i18n: true },
        { key: 'ig.intro', type: 'textarea', label: 'Intro (HTML allowed)', i18n: true, html: true },
        { key: 'insta1', group: 'media', type: 'text', label: 'Grid image 1', upload: 'image' },
        { key: 'insta2', group: 'media', type: 'text', label: 'Grid image 2', upload: 'image' },
        { key: 'insta3', group: 'media', type: 'text', label: 'Grid image 3', upload: 'image' },
        { key: 'insta4', group: 'media', type: 'text', label: 'Grid image 4', upload: 'image' }
      ]
    },
    nav: {
      label: 'Navigation',
      description: 'Header and mobile menu labels.',
      fields: [
        { key: 'nav.story', type: 'text', label: 'Our Story', i18n: true },
        { key: 'nav.creations', type: 'text', label: 'Creations', i18n: true },
        { key: 'nav.order', type: 'text', label: 'Order Now', i18n: true },
        { key: 'nav.love', type: 'text', label: 'Customer Love', i18n: true },
        { key: 'nav.watch', type: 'text', label: 'Watch Reviews', i18n: true },
        { key: 'nav.community', type: 'text', label: 'Community', i18n: true },
        { key: 'nav.instagram', type: 'text', label: 'Instagram button', i18n: true },
        { key: 'nav.explore_ig', type: 'text', label: 'Mobile CTA', i18n: true }
      ]
    },
    footer: {
      label: 'Footer',
      description: 'Footer copy and promise items.',
      fields: [
        { key: 'footer.bio', type: 'textarea', label: 'Brand bio', i18n: true },
        { key: 'footer.nav', type: 'text', label: 'Navigation heading', i18n: true },
        { key: 'footer.creations', type: 'text', label: 'Creations link', i18n: true },
        { key: 'footer.order', type: 'text', label: 'Order Now link', i18n: true },
        { key: 'footer.reviews', type: 'text', label: 'Reviews link', i18n: true },
        { key: 'footer.video', type: 'text', label: 'Video link', i18n: true },
        { key: 'footer.connect', type: 'text', label: 'Connect heading', i18n: true },
        { key: 'footer.ig', type: 'text', label: 'Instagram link label', i18n: true },
        { key: 'footer.wa', type: 'text', label: 'WhatsApp link label', i18n: true },
        { key: 'footer.batch', type: 'text', label: 'Batch inquiries label', i18n: true },
        { key: 'footer.promise', type: 'text', label: 'Promise heading', i18n: true },
        { key: 'footer.pr1', type: 'text', label: 'Promise 1', i18n: true },
        { key: 'footer.pr2', type: 'text', label: 'Promise 2', i18n: true },
        { key: 'footer.pr3', type: 'text', label: 'Promise 3', i18n: true },
        { key: 'footer.copy', type: 'text', label: 'Copyright', i18n: true },
        { key: 'page.title', type: 'text', label: 'Browser tab title', i18n: true },
        { key: 'page.description', type: 'textarea', label: 'Meta description', i18n: true }
      ]
    }
  };

  function createDefaultContent() {
    return {
      version: 1,
      updatedAt: null,
      password: DEFAULT_PASSWORD,
      sections: { ...DEFAULT_SECTIONS },
      media: { ...DEFAULT_MEDIA },
      links: { ...DEFAULT_LINKS },
      fonts: { ...DEFAULT_FONTS },
      colors: { ...DEFAULT_COLORS },
      texts: { en: {}, ar: {} }
    };
  }

  function deepMerge(base, patch) {
    if (!patch || typeof patch !== 'object') return base;
    const out = Array.isArray(base) ? [...base] : { ...base };
    Object.keys(patch).forEach((key) => {
      const val = patch[key];
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        out[key] = deepMerge(base?.[key] || {}, val);
      } else if (val !== undefined) {
        out[key] = val;
      }
    });
    return out;
  }

  function normalizePassword(value) {
    return typeof value === 'string' && value.trim() ? value.trim() : DEFAULT_PASSWORD;
  }

  /** One-time upgrade of the old shipped default (`joynfit`) to `joynfitxxx`. */
  function migrateLegacyPassword(content) {
    const next = { ...content };
    if (LEGACY_PASSWORDS.has(next.password)) {
      next.password = DEFAULT_PASSWORD;
      try {
        sessionStorage.removeItem(AUTH_KEY);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...next, updatedAt: new Date().toISOString() })
        );
      } catch (_) { /* ignore quota / private mode */ }
    } else {
      next.password = normalizePassword(next.password);
    }
    return next;
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createDefaultContent();
      const parsed = JSON.parse(raw);
      const content = deepMerge(createDefaultContent(), parsed);
      return migrateLegacyPassword(content);
    } catch (_) {
      return createDefaultContent();
    }
  }

  function save(content) {
    const next = {
      ...content,
      password: normalizePassword(content.password),
      updatedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (err) {
      const quota = err && (err.name === 'QuotaExceededError' || err.code === 22);
      if (quota) {
        throw new Error('Storage is full. Use smaller images, remove some uploads, or Export then Reset unused media.');
      }
      throw err;
    }
    return next;
  }

  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(AUTH_KEY);
    } catch (_) { /* ignore */ }
    return createDefaultContent();
  }

  function getTextOverrides(lang) {
    const content = load();
    return content.texts?.[lang] || {};
  }

  function getMergedDict(baseDict, lang) {
    return { ...(baseDict || {}), ...getTextOverrides(lang) };
  }

  function isAuthenticated() {
    try {
      return sessionStorage.getItem(AUTH_KEY) === '1';
    } catch (_) {
      return false;
    }
  }

  function login(password) {
    const expected = normalizePassword(load().password);
    if (password === expected) {
      sessionStorage.setItem(AUTH_KEY, '1');
      return true;
    }
    return false;
  }

  function logout() {
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch (_) { /* ignore */ }
  }

  function setMediaSrc(el, src) {
    if (!el || !src) return;
    if (el.tagName === 'VIDEO') {
      el.setAttribute('poster', el.getAttribute('poster') || '');
      const source = el.querySelector('source');
      if (source) {
        source.setAttribute('src', src);
        el.load();
      } else {
        el.setAttribute('src', src);
      }
      return;
    }
    if (el.tagName === 'SOURCE') {
      el.setAttribute('src', src);
      const video = el.closest('video');
      if (video) video.load();
      return;
    }
    el.setAttribute('src', src);
  }

  function applySections(content) {
    document.querySelectorAll('[data-cms-section]').forEach((el) => {
      const key = el.getAttribute('data-cms-section');
      const visible = content.sections?.[key] !== false;
      el.hidden = !visible;
      el.setAttribute('data-cms-hidden', visible ? 'false' : 'true');
      if (!visible) {
        el.classList.remove('is-inview');
      }
    });

    // Hide nav links that point to hidden sections
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const id = hash.slice(1);
      const section = document.getElementById(id);
      if (!section || !section.hasAttribute('data-cms-section')) return;
      const key = section.getAttribute('data-cms-section');
      const visible = content.sections?.[key] !== false;
      link.style.display = visible ? '' : 'none';
      const li = link.closest('li');
      if (li) li.style.display = visible ? '' : 'none';
    });
  }

  function applyMedia(content) {
    document.querySelectorAll('[data-cms-media]').forEach((el) => {
      const key = el.getAttribute('data-cms-media');
      const value = content.media?.[key];
      if (!value) return;

      if (el.hasAttribute('data-review-img') || el.getAttribute('data-cms-attr') === 'data-review-img') {
        el.setAttribute('data-review-img', value);
      }

      if (el.tagName === 'IMG' || el.tagName === 'SOURCE' || el.tagName === 'VIDEO') {
        if (key === 'videoPoster' && el.tagName === 'VIDEO') {
          el.setAttribute('poster', value);
          return;
        }
        if (key === 'videoSrc') {
          setMediaSrc(el, value);
          return;
        }
        setMediaSrc(el, value);
      }
    });

    // Video poster dedicated attribute
    const video = document.getElementById('reviewVideo');
    if (video && content.media?.videoPoster) {
      video.setAttribute('poster', content.media.videoPoster);
    }
    if (video && content.media?.videoSrc) {
      const source = video.querySelector('source');
      if (source) {
        source.setAttribute('src', content.media.videoSrc);
        video.load();
      }
    }
  }

  function applyLinks(content) {
    const ig = content.links?.instagram;
    if (ig) {
      document.querySelectorAll('[data-cms-link="instagram"]').forEach((el) => {
        el.setAttribute('href', ig);
      });
    }

    const wa = String(content.links?.whatsapp || '').replace(/\D/g, '');
    if (wa) {
      document.querySelectorAll('[data-cms-whatsapp]').forEach((el) => {
        el.setAttribute('data-whatsapp', wa);
      });
    }
  }

  function ensureGoogleFonts(fonts) {
    const families = [fonts.heading, fonts.body, fonts.arabic]
      .map((font) => font?.google)
      .filter(Boolean);

    if (!families.length) return;

    const href = `https://fonts.googleapis.com/css2?${families
      .map((family) => `family=${family}`)
      .join('&')}&display=swap`;

    let link = document.getElementById('joynfit-cms-fonts');
    if (!link) {
      link = document.createElement('link');
      link.id = 'joynfit-cms-fonts';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    if (link.getAttribute('href') !== href) {
      link.setAttribute('href', href);
    }
  }

  function applyFonts(content) {
    const selected = { ...DEFAULT_FONTS, ...(content?.fonts || {}) };
    const heading = resolveFont(selected.heading, DEFAULT_FONTS.heading);
    const body = resolveFont(selected.body, DEFAULT_FONTS.body);
    const arabic = resolveFont(selected.arabic, DEFAULT_FONTS.arabic);

    const root = document.documentElement;
    root.style.setProperty('--font-serif', heading.family);
    root.style.setProperty('--font-sans', body.family);
    root.style.setProperty('--font-arabic', arabic.family);

    ensureGoogleFonts({ heading, body, arabic });
  }

  function normalizeHex(value, fallback) {
    const raw = String(value || '').trim();
    if (/^#[0-9a-fA-F]{6}$/.test(raw)) return raw.toLowerCase();
    if (/^#[0-9a-fA-F]{3}$/.test(raw)) {
      const [, r, g, b] = raw;
      return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
    }
    return fallback;
  }

  function applyColors(content) {
    const selected = { ...DEFAULT_COLORS, ...(content?.colors || {}) };
    const heading = normalizeHex(selected.heading, DEFAULT_COLORS.heading);
    const body = normalizeHex(selected.body, DEFAULT_COLORS.body);
    const muted = normalizeHex(selected.muted, DEFAULT_COLORS.muted);
    const accent = normalizeHex(selected.accent, DEFAULT_COLORS.accent);

    const root = document.documentElement;
    root.style.setProperty('--text-dark', heading);
    root.style.setProperty('--text-body', body);
    root.style.setProperty('--text-muted', muted);
    root.style.setProperty('--accent-matcha', accent);
  }

  function applyToPage() {
    if (!document.body) return;
    const content = load();
    applySections(content);
    applyMedia(content);
    applyLinks(content);
    applyFonts(content);
    applyColors(content);
  }

  function exportJson(content) {
    return JSON.stringify(content || load(), null, 2);
  }

  function importJson(raw) {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid CMS file');
    }
    const merged = deepMerge(createDefaultContent(), parsed);
    return save(merged);
  }

  window.JoynFitCMS = {
    STORAGE_KEY,
    DEFAULT_PASSWORD,
    DEFAULT_FONTS,
    DEFAULT_COLORS,
    FONT_CATALOG,
    FIELD_SCHEMA,
    createDefaultContent,
    load,
    save,
    reset,
    getFontOptions,
    fileToMediaValue,
    isDataMedia,
    getTextOverrides,
    getMergedDict,
    isAuthenticated,
    login,
    logout,
    applyFonts,
    applyColors,
    applyToPage,
    exportJson,
    importJson
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyToPage);
  } else {
    applyToPage();
  }
})();
