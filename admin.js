/**
 * JoynFit Admin Panel — edit any website section (texts, media, visibility).
 */
(function () {
  const CMS = window.JoynFitCMS;
  if (!CMS) {
    console.error('JoynFitCMS missing');
    return;
  }

  const NAV_ORDER = [
    'visibility',
    'settings',
    'fonts',
    'hero',
    'about',
    'products',
    'reviews',
    'video',
    'instagram',
    'nav',
    'footer'
  ];

  let content = CMS.load();
  let activeSection = 'visibility';
  let editLang = 'en';
  let dirty = false;

  const els = {
    loginScreen: document.getElementById('loginScreen'),
    adminApp: document.getElementById('adminApp'),
    loginForm: document.getElementById('loginForm'),
    loginPassword: document.getElementById('loginPassword'),
    loginError: document.getElementById('loginError'),
    sidebarNav: document.getElementById('sidebarNav'),
    editorTitle: document.getElementById('editorTitle'),
    editorDesc: document.getElementById('editorDesc'),
    editorBody: document.getElementById('editorBody'),
    langTabs: document.getElementById('langTabs'),
    saveBtn: document.getElementById('saveBtn'),
    resetBtn: document.getElementById('resetBtn'),
    exportBtn: document.getElementById('exportBtn'),
    importBtn: document.getElementById('importBtn'),
    importFile: document.getElementById('importFile'),
    logoutBtn: document.getElementById('logoutBtn'),
    toast: document.getElementById('toast'),
    dirtyDot: document.getElementById('dirtyDot'),
    updatedAt: document.getElementById('updatedAt')
  };

  function showToast(message, type = 'ok') {
    els.toast.textContent = message;
    els.toast.className = `toast is-visible toast-${type}`;
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => {
      els.toast.classList.remove('is-visible');
    }, 2600);
  }

  function setDirty(value) {
    dirty = value;
    els.dirtyDot.hidden = !dirty;
    els.saveBtn.classList.toggle('has-changes', dirty);
  }

  function updateMeta() {
    els.updatedAt.textContent = content.updatedAt
      ? `Last saved ${new Date(content.updatedAt).toLocaleString()}`
      : 'Not saved yet — using defaults';
  }

  function getBaseText(lang, key) {
    const dict = window.JoynFitI18n?.translations?.[lang] || {};
    return dict[key] ?? '';
  }

  function getTextValue(lang, key) {
    const override = content.texts?.[lang]?.[key];
    if (override != null && override !== '') return override;
    return getBaseText(lang, key);
  }

  function setFieldValue(field, value) {
    if (field.group === 'media') {
      content.media[field.key] = value;
    } else if (field.group === 'links') {
      content.links[field.key] = value;
    } else if (field.group === 'fonts') {
      if (!content.fonts) content.fonts = { ...CMS.DEFAULT_FONTS };
      content.fonts[field.key] = value;
      CMS.applyFonts(content);
      updateFontPreview();
    } else if (field.group === 'colors') {
      if (!content.colors) content.colors = { ...CMS.DEFAULT_COLORS };
      content.colors[field.key] = value;
      CMS.applyColors(content);
      updateFontPreview();
    } else if (field.i18n) {
      if (!content.texts[editLang]) content.texts[editLang] = {};
      const base = getBaseText(editLang, field.key);
      if (value === base || value === '') {
        delete content.texts[editLang][field.key];
      } else {
        content.texts[editLang][field.key] = value;
      }
    }
    setDirty(true);
  }

  function renderNav() {
    els.sidebarNav.innerHTML = '';
    NAV_ORDER.forEach((id) => {
      const schema = CMS.FIELD_SCHEMA[id];
      if (!schema) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `nav-item${activeSection === id ? ' is-active' : ''}`;
      btn.textContent = schema.label;
      btn.addEventListener('click', () => {
        activeSection = id;
        renderNav();
        renderEditor();
      });
      els.sidebarNav.appendChild(btn);
    });
  }

  function createFieldEl(field) {
    const wrap = document.createElement('div');
    wrap.className = 'field';

    const label = document.createElement('label');
    label.className = 'field-label';
    label.textContent = field.label;
    if (field.i18n) {
      const badge = document.createElement('span');
      badge.className = 'lang-badge';
      badge.textContent = editLang.toUpperCase();
      label.appendChild(badge);
    }
    wrap.appendChild(label);

    if (field.hint) {
      const hint = document.createElement('p');
      hint.className = 'field-hint';
      hint.textContent = field.hint;
      wrap.appendChild(hint);
    }

    if (field.type === 'color') {
      const row = document.createElement('div');
      row.className = 'color-field-row';

      const swatch = document.createElement('input');
      swatch.type = 'color';
      swatch.className = 'color-swatch';
      swatch.value = content.colors?.[field.key] || CMS.DEFAULT_COLORS[field.key];

      const hex = document.createElement('input');
      hex.type = 'text';
      hex.className = 'field-input color-hex';
      hex.maxLength = 7;
      hex.spellcheck = false;
      hex.value = (content.colors?.[field.key] || CMS.DEFAULT_COLORS[field.key]).toLowerCase();
      hex.placeholder = '#000000';

      const sync = (value, source) => {
        const cleaned = value.startsWith('#') ? value : `#${value}`;
        const valid = /^#[0-9a-fA-F]{6}$/.test(cleaned);
        if (!valid) return;
        const next = cleaned.toLowerCase();
        if (source !== 'swatch') swatch.value = next;
        if (source !== 'hex') hex.value = next;
        setFieldValue(field, next);
      };

      swatch.addEventListener('input', () => sync(swatch.value, 'swatch'));
      hex.addEventListener('input', () => sync(hex.value, 'hex'));
      hex.addEventListener('change', () => sync(hex.value, 'hex'));

      row.appendChild(swatch);
      row.appendChild(hex);
      wrap.appendChild(row);
      return wrap;
    }

    if (field.group === 'media') {
      return createMediaFieldEl(field, wrap);
    }

    let input;
    if (field.type === 'textarea') {
      input = document.createElement('textarea');
      input.rows = field.html ? 4 : 3;
    } else if (field.type === 'select') {
      input = document.createElement('select');
      const options = CMS.getFontOptions(field.optionsKey || field.key);
      options.forEach((opt) => {
        const option = document.createElement('option');
        option.value = opt.id;
        option.textContent = opt.label;
        option.style.fontFamily = opt.family;
        input.appendChild(option);
      });
    } else {
      input = document.createElement('input');
      input.type = field.type === 'password' ? 'text' : (field.type || 'text');
      if (field.type === 'url') input.inputMode = 'url';
      if (field.type === 'password') input.autocomplete = 'new-password';
    }
    input.className = 'field-input';

    if (field.group === 'links') {
      input.value = content.links?.[field.key] || '';
    } else if (field.group === 'fonts') {
      input.value = content.fonts?.[field.key] || CMS.DEFAULT_FONTS[field.key];
      const selected = CMS.FONT_CATALOG[input.value];
      if (selected) input.style.fontFamily = selected.family;
    } else if (field.i18n) {
      input.value = getTextValue(editLang, field.key);
      const hint = document.createElement('p');
      hint.className = 'field-hint override-hint';
      hint.textContent = content.texts?.[editLang]?.[field.key] != null
        ? 'Custom override active'
        : 'Using default translation';
      wrap.appendChild(hint);
    }

    const onChange = () => {
      setFieldValue(field, input.value);
      if (field.group === 'fonts') {
        const selected = CMS.FONT_CATALOG[input.value];
        if (selected) input.style.fontFamily = selected.family;
      }
      const hint = wrap.querySelector('.override-hint');
      if (hint && field.i18n) {
        hint.textContent = content.texts?.[editLang]?.[field.key] != null
          ? 'Custom override active'
          : 'Using default translation';
      }
    };

    input.addEventListener('input', onChange);
    input.addEventListener('change', onChange);

    wrap.appendChild(input);
    return wrap;
  }

  function createMediaFieldEl(field, wrap) {
    const uploadKind = field.upload || (field.key === 'videoSrc' ? 'video' : 'image');
    const currentValue = content.media?.[field.key] || '';
    const defaultValue = CMS.createDefaultContent().media[field.key] || '';

    const status = document.createElement('p');
    status.className = 'field-hint media-status';
    status.textContent = CMS.isDataMedia(currentValue)
      ? 'Using uploaded file from your device'
      : 'Using path / URL (or upload from your device)';

    const actions = document.createElement('div');
    actions.className = 'media-actions';

    const uploadBtn = document.createElement('button');
    uploadBtn.type = 'button';
    uploadBtn.className = 'btn btn-primary media-upload-btn';
    uploadBtn.textContent = uploadKind === 'video' ? 'Upload video' : 'Upload from device';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.hidden = true;
    fileInput.accept = uploadKind === 'video'
      ? 'video/mp4,video/webm,video/*'
      : 'image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.jpg,.jpeg,.png,.webp,.gif,.svg';

    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'btn btn-ghost';
    clearBtn.textContent = 'Use default';
    clearBtn.disabled = !currentValue || currentValue === defaultValue;

    const pathInput = document.createElement('input');
    pathInput.type = 'text';
    pathInput.className = 'field-input';
    pathInput.placeholder = uploadKind === 'video'
      ? 'Or paste a video URL / path'
      : 'Or paste an image URL / path';
    pathInput.value = CMS.isDataMedia(currentValue) ? '' : currentValue;

    const preview = document.createElement(uploadKind === 'video' ? 'video' : 'img');
    preview.className = 'media-preview';
    if (uploadKind === 'video') {
      preview.controls = true;
      preview.muted = true;
      preview.playsInline = true;
    } else {
      preview.alt = '';
    }

    const updatePreview = (value) => {
      const src = value || defaultValue;
      const showPreview = !!src && (CMS.isDataMedia(src) || !/\.mp4(\?|$)/i.test(src) || uploadKind === 'video');
      if (!showPreview) {
        preview.hidden = true;
        return;
      }
      preview.hidden = false;
      if (uploadKind === 'video') {
        preview.src = src;
      } else if (/\.mp4(\?|$)/i.test(src) && !CMS.isDataMedia(src)) {
        preview.hidden = true;
      } else {
        preview.src = src;
        preview.onerror = () => { preview.hidden = true; };
      }
    };

    updatePreview(currentValue);

    const applyMediaValue = (value) => {
      setFieldValue(field, value);
      pathInput.value = CMS.isDataMedia(value) ? '' : value;
      clearBtn.disabled = !value || value === defaultValue;
      status.textContent = CMS.isDataMedia(value)
        ? 'Using uploaded file from your device'
        : 'Using path / URL (or upload from your device)';
      updatePreview(value);
    };

    uploadBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', async () => {
      const file = fileInput.files?.[0];
      fileInput.value = '';
      if (!file) return;
      uploadBtn.disabled = true;
      uploadBtn.textContent = 'Uploading…';
      try {
        const dataUrl = await CMS.fileToMediaValue(file, uploadKind);
        applyMediaValue(dataUrl);
        showToast(uploadKind === 'video' ? 'Video uploaded' : 'Image uploaded');
      } catch (err) {
        showToast(err.message || 'Upload failed', 'err');
      } finally {
        uploadBtn.disabled = false;
        uploadBtn.textContent = uploadKind === 'video' ? 'Upload video' : 'Upload from device';
      }
    });

    clearBtn.addEventListener('click', () => {
      applyMediaValue(defaultValue);
      showToast('Restored default media');
    });

    pathInput.addEventListener('input', () => {
      applyMediaValue(pathInput.value.trim());
    });

    actions.appendChild(uploadBtn);
    actions.appendChild(clearBtn);
    wrap.appendChild(status);
    wrap.appendChild(actions);
    wrap.appendChild(fileInput);
    wrap.appendChild(pathInput);
    wrap.appendChild(preview);
    return wrap;
  }

  function updateFontPreview() {
    const preview = document.getElementById('fontPreviewCard');
    if (!preview) return;
    const heading = CMS.FONT_CATALOG[content.fonts?.heading] || CMS.FONT_CATALOG[CMS.DEFAULT_FONTS.heading];
    const body = CMS.FONT_CATALOG[content.fonts?.body] || CMS.FONT_CATALOG[CMS.DEFAULT_FONTS.body];
    const arabic = CMS.FONT_CATALOG[content.fonts?.arabic] || CMS.FONT_CATALOG[CMS.DEFAULT_FONTS.arabic];
    const colors = { ...CMS.DEFAULT_COLORS, ...(content.colors || {}) };

    const headingEl = preview.querySelector('.font-preview-heading');
    const bodyEl = preview.querySelector('.font-preview-body');
    const arabicEl = preview.querySelector('.font-preview-arabic');
    const mutedEl = preview.querySelector('.font-preview-muted');
    const accentEl = preview.querySelector('.font-preview-accent');

    if (headingEl) {
      headingEl.style.fontFamily = heading.family;
      headingEl.style.color = colors.heading;
    }
    if (bodyEl) {
      bodyEl.style.fontFamily = body.family;
      bodyEl.style.color = colors.body;
    }
    if (arabicEl) {
      arabicEl.style.fontFamily = arabic.family;
      arabicEl.style.color = colors.heading;
    }
    if (mutedEl) mutedEl.style.color = colors.muted;
    if (accentEl) accentEl.style.color = colors.accent;
  }

  function renderFontPreview() {
    const card = document.createElement('div');
    card.className = 'font-preview-card';
    card.id = 'fontPreviewCard';
    card.innerHTML = `
      <p class="font-preview-label">Live preview</p>
      <h3 class="font-preview-heading">Wholesome sweetness, pure delight.</h3>
      <p class="font-preview-body">JoynFit crafts nutrient-dense, naturally sweetened desserts for real enjoyment.</p>
      <p class="font-preview-muted">Secondary caption and muted helper text.</p>
      <p class="font-preview-accent">Accent link / brand color sample</p>
      <p class="font-preview-arabic" dir="rtl">حلاوة صحية، متعة خالصة في كل قضمة.</p>
    `;
    els.editorBody.appendChild(card);
    updateFontPreview();
  }

  function renderEditor() {
    const schema = CMS.FIELD_SCHEMA[activeSection];
    if (!schema) return;

    els.editorTitle.textContent = schema.label;
    els.editorDesc.textContent = schema.description || '';
    els.editorBody.innerHTML = '';

    const hasI18n = (schema.fields || []).some((f) => f.i18n);
    els.langTabs.hidden = !hasI18n;
    if (hasI18n) {
      els.langTabs.querySelectorAll('.lang-tab').forEach((tab) => {
        tab.classList.toggle('is-active', tab.dataset.lang === editLang);
      });
    }

    if (schema.toggles) {
      const grid = document.createElement('div');
      grid.className = 'toggle-grid';
      schema.toggles.forEach((toggle) => {
        const row = document.createElement('label');
        row.className = 'toggle-row';
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.checked = content.sections?.[toggle.key] !== false;
        check.addEventListener('change', () => {
          content.sections[toggle.key] = check.checked;
          setDirty(true);
        });
        const text = document.createElement('span');
        text.textContent = toggle.label;
        row.appendChild(check);
        row.appendChild(text);
        grid.appendChild(row);
      });
      els.editorBody.appendChild(grid);
      return;
    }

    (schema.fields || []).forEach((field) => {
      els.editorBody.appendChild(createFieldEl(field));
    });

    if (activeSection === 'fonts') {
      renderFontPreview();
      CMS.applyFonts(content);
      CMS.applyColors(content);
    }
  }

  function showApp() {
    els.loginScreen.hidden = true;
    els.adminApp.hidden = false;
    content = CMS.load();
    setDirty(false);
    updateMeta();
    renderNav();
    renderEditor();
  }

  function showLogin() {
    els.loginScreen.hidden = false;
    els.adminApp.hidden = true;
    els.loginPassword.value = '';
    els.loginError.hidden = true;
  }

  function saveContent() {
    try {
      content = CMS.save(content);
      setDirty(false);
      updateMeta();
      showToast('Changes saved. Refresh the website to see them.');
    } catch (err) {
      showToast(err.message || 'Save failed', 'err');
    }
  }

  // Events
  els.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = CMS.login(els.loginPassword.value);
    if (!ok) {
      els.loginError.hidden = false;
      els.loginError.textContent = 'Incorrect password';
      return;
    }
    showApp();
  });

  els.langTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.lang-tab');
    if (!tab) return;
    editLang = tab.dataset.lang;
    renderEditor();
  });

  els.saveBtn.addEventListener('click', saveContent);

  els.resetBtn.addEventListener('click', () => {
    if (!window.confirm('Reset all CMS overrides to website defaults? This cannot be undone.')) return;
    content = CMS.reset();
    content = CMS.save(content);
    setDirty(false);
    updateMeta();
    renderEditor();
    showToast('Reset to defaults', 'warn');
  });

  els.exportBtn.addEventListener('click', () => {
    const blob = new Blob([CMS.exportJson(content)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `joynfit-cms-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported CMS JSON');
  });

  els.importBtn.addEventListener('click', () => els.importFile.click());
  els.importFile.addEventListener('change', async () => {
    const file = els.importFile.files?.[0];
    els.importFile.value = '';
    if (!file) return;
    try {
      const text = await file.text();
      content = CMS.importJson(text);
      setDirty(false);
      updateMeta();
      renderEditor();
      showToast('Imported successfully');
    } catch (err) {
      showToast(err.message || 'Import failed', 'err');
    }
  });

  els.logoutBtn.addEventListener('click', () => {
    if (dirty && !window.confirm('You have unsaved changes. Log out anyway?')) return;
    CMS.logout();
    showLogin();
  });

  window.addEventListener('beforeunload', (e) => {
    if (!dirty) return;
    e.preventDefault();
    e.returnValue = '';
  });

  // Boot
  if (CMS.isAuthenticated()) {
    showApp();
  } else {
    showLogin();
  }
})();
