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

    // 3. Trigger popup on 3rd section (About Us / our-story)
    var promoPopup = document.getElementById('promo-popup');
    var closePromoPopup = document.getElementById('close-promo-popup');
    var targetSection = document.querySelector('.our-story');
    var popupShown = false;

    if (promoPopup && targetSection) {
        var popupObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !popupShown) {
                    promoPopup.classList.add('show');
                    document.body.style.overflow = 'hidden';
                    popupShown = true; // Only show once
                }
            });
        }, { threshold: 0.3 });

        popupObserver.observe(targetSection);

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
