document.addEventListener('DOMContentLoaded', function() {
    // 1. Mobile Menu Toggle
    var mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    var header = document.querySelector('.header');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            header.classList.toggle('active');
        });
    }

    // Close menu when a navigation link is clicked
    var newMenuLinks = document.querySelectorAll('.nav a');
    newMenuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            header.classList.remove('active');
        });
    });

    // 2. Add intersection observer for fade-in animations on scroll
    var observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    var sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        section.classList.add('pre-animation-state');
        observer.observe(section);
    });

    // 3. Trigger popup on specific sections and on load
    var promoPopup = document.getElementById('promo-popup');
    var closePromoPopup = document.getElementById('close-promo-popup');
    
    if (promoPopup) {
        var triggered = {
            'load': false,
            'collection': false,
            'gallery': false,
            'reviews': false
        };

        function showPopup(source) {
            if (!triggered[source]) {
                promoPopup.classList.add('show');
                document.body.style.overflow = 'hidden';
                triggered[source] = true;
            }
        }

        // 1. When user open
        setTimeout(function() { showPopup('load'); }, 3000); // 3 second delay on load

        // Observe sections
        var sections = [
            { id: '#featured-idols', key: 'collection' },
            { id: '#gallery', key: 'gallery' },
            { id: '#reviews', key: 'reviews' }
        ];

        var popupObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var key = entry.target.getAttribute('data-popup-key');
                    if (key) showPopup(key);
                }
            });
        }, { threshold: 0.2 });

        sections.forEach(function(sec) {
            var el = document.querySelector(sec.id);
            if (el) {
                el.setAttribute('data-popup-key', sec.key);
                popupObserver.observe(el);
            }
        });

        closePromoPopup.addEventListener('click', function() {
            promoPopup.classList.remove('show');
            document.body.style.overflow = 'auto';
        });

        // Close on outside click
        promoPopup.addEventListener('click', function(e) {
            if (e.target === promoPopup) {
                promoPopup.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Lightbox functionality
function openLightbox(imageSrc) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imageSrc;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox(event) {
    // Close if clicked on the background or the close button
    if (event.target.classList.contains('lightbox') || event.target.classList.contains('close-lightbox')) {
        document.getElementById('lightbox').classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Product Carousel Logic
function moveCarousel(carouselId, direction) {
    var carousel = document.getElementById('carousel-' + carouselId);
    if (!carousel) return;
    
    var mediaItems = carousel.querySelectorAll('.carousel-images img, .carousel-images video');
    var dots = carousel.querySelectorAll('.carousel-dots .dot');
    var currentIdx = parseInt(carousel.getAttribute('data-current') || '0');
    
    var newIdx = currentIdx + direction;
    if (newIdx < 0) newIdx = mediaItems.length - 1;
    if (newIdx >= mediaItems.length) newIdx = 0;
    
    setCarousel(carouselId, newIdx);
}

function setCarousel(carouselId, index) {
    var carousel = document.getElementById('carousel-' + carouselId);
    if (!carousel) return;
    
    var mediaItems = carousel.querySelectorAll('.carousel-images img, .carousel-images video');
    var dots = carousel.querySelectorAll('.carousel-dots .dot');
    
    // Update active classes
    mediaItems.forEach(function(media, i) {
        if (i === index) {
            media.classList.add('active');
            if (media.tagName.toLowerCase() === 'video') {
                media.play().catch(function(e){});
            }
        } else {
            media.classList.remove('active');
            if (media.tagName.toLowerCase() === 'video') {
                media.pause();
            }
        }
    });
    
    dots.forEach(function(dot, i) {
        if (i === index) dot.classList.add('active');
        else dot.classList.remove('active');
    });
    
    // Save current index
    carousel.setAttribute('data-current', index);
}

// Countdown Timer Logic for Product Cards
document.addEventListener('DOMContentLoaded', function() {
    var timerElements = document.querySelectorAll('.timer-countdown');
    if (timerElements.length === 0) return;
    
    // Initial time (e.g., 3 hours, 22 mins, 25 secs)
    var timeInSeconds = 3 * 3600 + 22 * 60 + 25;
    
    setInterval(function() {
        if (timeInSeconds <= 0) timeInSeconds = 24 * 3600; // Reset to 24h if it hits 0
        timeInSeconds--;
        
        var h = Math.floor(timeInSeconds / 3600);
        var m = Math.floor((timeInSeconds % 3600) / 60);
        var s = timeInSeconds % 60;
        
        var formatted = 
            (h < 10 ? '0' + h : h) + 'H:' + 
            (m < 10 ? '0' + m : m) + 'M:' + 
            (s < 10 ? '0' + s : s) + 'S';
            
        timerElements.forEach(function(el) {
            el.textContent = formatted;
        });
    }, 1000);
});
