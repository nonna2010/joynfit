/**
 * JoynFit Healthy Desserts — Interactive JavaScript
 * Clean, lightweight vanilla interactions without embedded HTML or inline CSS.
 * Mobile-optimized with touch events and responsive drawer behavior.
 * 100% pure SVG icons, zero emojis.
 */

document.addEventListener('DOMContentLoaded', () => {
  // SVG Icon Templates for Dynamic Controls
  const ICONS = {
    play: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
    pause: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>',
    volumeHigh: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>',
    volumeMute: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>'
  };

  // 1. Mobile Menu Drawer Toggle & Outside Tap to Close
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

  if (mobileMenuBtn && mobileMenu) {
    const toggleMobileMenu = (forceState) => {
      const isOpen = typeof forceState === 'boolean' ? forceState : !mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open', isOpen);
      mobileMenuBtn.classList.toggle('is-active', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    };

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        toggleMobileMenu(false);
      }
    });
  }

  // 2. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Active Navigation Link Highlighting on Scroll
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // 4. Product Category Filtering (removed — all products shown)
  const productCards = document.querySelectorAll('.product-card');

  // 5. Product Quick View Modal (Reads from HTML, sets textContent on HTML modal)
  const productModal = document.getElementById('productModal');
  const closeProductModalBtn = document.getElementById('closeProductModalBtn');
  const modalImg = document.getElementById('modalProductImg');
  const modalCategory = document.getElementById('modalProductCategory');
  const modalTitle = document.getElementById('modalProductTitle');
  const modalDesc = document.getElementById('modalProductDesc');
  const modalCalories = document.getElementById('modalProductCalories');
  const modalProtein = document.getElementById('modalProductProtein');
  const modalFiber = document.getElementById('modalProductFiber');
  const modalIngredients = document.getElementById('modalProductIngredients');

  const openProductModal = (card) => {
    if (!card) return;

    // Extract details directly from card HTML
    const img = card.querySelector('.product-img')?.getAttribute('src') || '';
    const alt = card.querySelector('.product-img')?.getAttribute('alt') || '';
    const category = card.querySelector('.product-category')?.textContent || '';
    const title = card.querySelector('.product-name')?.textContent || '';
    const desc = card.querySelector('.product-desc')?.textContent || '';
    const calories = card.querySelector('.extra-calories')?.textContent || 'Wholesome';
    const protein = card.querySelector('.extra-protein')?.textContent || 'Natural';
    const fiber = card.querySelector('.extra-fiber')?.textContent || 'High';
    const ingredients = card.querySelector('.extra-ingredients')?.textContent || 'All natural ingredients.';

    // Populate pre-built HTML modal elements
    if (modalImg) {
      modalImg.src = img;
      modalImg.alt = alt;
    }
    if (modalCategory) modalCategory.textContent = category;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalCalories) modalCalories.textContent = calories;
    if (modalProtein) modalProtein.textContent = protein;
    if (modalFiber) modalFiber.textContent = fiber;
    if (modalIngredients) modalIngredients.textContent = ingredients;

    productModal.classList.add('is-open');
  };

  // Support clicking the entire product card or the Quick View button (touch friendly)
  productCards.forEach(card => {
    card.addEventListener('click', () => openProductModal(card));
  });

  if (closeProductModalBtn) {
    closeProductModalBtn.addEventListener('click', () => {
      productModal.classList.remove('is-open');
    });
  }

  // 6. WhatsApp Reviews Lightbox Modal (Reads from HTML elements)
  const reviewModal = document.getElementById('reviewLightboxModal');
  const closeReviewModalBtn = document.getElementById('closeReviewModalBtn');
  const lightboxImg = document.getElementById('lightboxReviewImg');
  const lightboxName = document.getElementById('lightboxReviewName');
  const lightboxQuote = document.getElementById('lightboxReviewQuote');
  const reviewCards = document.querySelectorAll('.review-card');

  reviewCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-review-img') || '';
      const userName = card.querySelector('.user-name')?.textContent || 'Customer Review';

      if (lightboxImg) lightboxImg.src = imgSrc;
      if (lightboxName) lightboxName.textContent = `${userName} — WhatsApp Verified Feedback`;
      if (lightboxQuote) lightboxQuote.textContent = '';

      reviewModal.classList.add('is-open');
    });
  });

  if (closeReviewModalBtn) {
    closeReviewModalBtn.addEventListener('click', () => {
      reviewModal.classList.remove('is-open');
    });
  }

  // Close modals on clicking backdrop
  [productModal, reviewModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('is-open');
        }
      });
    }
  });

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      productModal?.classList.remove('is-open');
      reviewModal?.classList.remove('is-open');
    }
  });

  // 7. Video Player Controls
  const video = document.getElementById('reviewVideo');
  const playBtn = document.getElementById('playVideoBtn');
  const miniPlayBtn = document.getElementById('miniPlayBtn');
  const videoOverlay = document.getElementById('videoOverlay');
  const progressFill = document.getElementById('videoProgressFill');
  const muteBtn = document.getElementById('muteBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  if (video && playBtn) {
    const togglePlay = () => {
      if (video.paused || video.ended) {
        video.play().then(() => {
          videoOverlay.classList.add('hidden');
          if (miniPlayBtn) miniPlayBtn.innerHTML = ICONS.pause;
        }).catch(() => {
          alert('Please place your customer review video in assets/video/joynfit video.mp4');
        });
      } else {
        video.pause();
        videoOverlay.classList.remove('hidden');
        if (miniPlayBtn) miniPlayBtn.innerHTML = ICONS.play;
      }
    };

    playBtn.addEventListener('click', togglePlay);
    if (miniPlayBtn) miniPlayBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    video.addEventListener('timeupdate', () => {
      if (video.duration && progressFill) {
        const percent = (video.currentTime / video.duration) * 100;
        progressFill.style.width = `${percent}%`;
      }
    });

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? ICONS.volumeMute : ICONS.volumeHigh;
      });
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        }
      });
    }
  }
});
