document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================
     NAVBAR SCROLL EFFECT
     ========================================== */
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ==========================================
     SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
     ========================================== */
  const revealElements = document.querySelectorAll('.feature-card, .product-card, .reveal-element');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  /* ==========================================
     PRODUCT FILTERING
     ========================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle Active Class
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      // Filter cards
      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
          // Reset animation for re-trigger
          card.style.animation = 'none';
          card.offsetHeight; // trigger reflow
          card.style.animation = 'fadeUp 0.5s forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ==========================================
     FAVORITE BUTTON MICRO-INTERACTION
     ========================================== */
  const addButtons = document.querySelectorAll('.btn-add');
  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const icon = btn.querySelector('svg');
      
      // Heart animation
      btn.style.transform = 'scale(1.2)';
      btn.style.backgroundColor = 'var(--accent-gold)';
      btn.style.borderColor = 'var(--accent-gold)';
      btn.style.color = 'var(--primary-deep)';
      
      if(icon) {
        icon.style.fill = 'currentColor';
      }
      
      setTimeout(() => {
        btn.style.transform = '';
      }, 200);
    });
  });

  /* ==========================================
     HERO SLIDER LOGIC
     ========================================== */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  // Auto advance
  if (slides.length > 0) {
    slideInterval = setInterval(nextSlide, 5000);
    
    // Dot click navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(index);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  /* ==========================================
     GALLERY LIGHTBOX LOGIC
     ========================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxPrev = document.getElementById('lightbox-prev');
  let currentImageIndex = 0;

  if (lightbox) {
    // Open lightbox
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        currentImageIndex = index;
        lightboxImg.src = item.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    // Click outside image to close
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });

    // Next image
    lightboxNext.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
      lightboxImg.src = galleryItems[currentImageIndex].src;
    });

    // Prev image
    lightboxPrev.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
      lightboxImg.src = galleryItems[currentImageIndex].src;
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
      } else if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        lightboxImg.src = galleryItems[currentImageIndex].src;
      } else if (e.key === 'ArrowLeft') {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        lightboxImg.src = galleryItems[currentImageIndex].src;
      }
    });
  }
});
