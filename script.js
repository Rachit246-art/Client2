document.addEventListener('DOMContentLoaded', function() {
    // 1. Close mobile slideout menu when a link is clicked
    var menuLinks = document.querySelectorAll('.slideout-menu .nav_menu a');
    
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Try to click the close button inside the menu to trigger the original JS close action
            var closeBtn = document.querySelector('.slideout-menu h3 a.slideout-menu-toggle');
            if (closeBtn) {
                closeBtn.click();
            } else {
                // Fallback: manually remove the active class if original JS fails
                document.body.classList.remove('menu-active');
            }
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
});
