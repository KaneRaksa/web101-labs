

document.addEventListener('DOMContentLoaded', function() {
    
    initializeScrollAnimations();
    initializeButtons();
    initializeFormValidation();
    initializeAccordions();
    initializeNavigation();
});


function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    
    document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

   
    const caseStudyImage = document.querySelector('.case-study-image');
    if (caseStudyImage) {
        caseStudyImage.classList.add('fade-in');
        observer.observe(caseStudyImage);
    }

    // Observe headings
    document.querySelectorAll('h2, h3').forEach(el => {
        el.classList.add('fade-in');
        const delayedObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, 100);
                    delayedObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        delayedObserver.observe(el);
    });
}


function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.7;
            }
        }

        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }

        .fade-in {
            opacity: 0;
        }

        .fade-in.animate-in {
            animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .feature-card.fade-in.animate-in {
            animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .testimonial-card.fade-in.animate-in {
            animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .pricing-card.fade-in.animate-in {
            animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .case-study-image.fade-in.animate-in {
            animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        h2.fade-in.animate-in,
        h3.fade-in.animate-in {
            animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}


function initializeButtons() {
    addAnimationStyles();

    const buttons = document.querySelectorAll('button[class*="btn"]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });

        // Add hover effect
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('btn-outline-primary') && !this.classList.contains('btn-outline-light')) {
                this.style.transform = 'translateY(-3px)';
            }
        });

        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn-outline-primary') && !this.classList.contains('btn-outline-light')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        button {
            position: relative;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}


function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            this.classList.add('was-validated');
        });
    });
}


function initializeAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        accordion.addEventListener('show.bs.collapse', function(e) {
            // Add active state styling
            const button = e.target.previousElementSibling.querySelector('.accordion-button');
            if (button) {
                button.style.color = '#004E89';
                button.style.fontWeight = '700';
            }
        });

        accordion.addEventListener('hide.bs.collapse', function(e) {
            const button = e.target.previousElementSibling.querySelector('.accordion-button');
            if (button) {
                button.style.color = 'inherit';
                button.style.fontWeight = '600';
            }
        });
    });
}


function initializeNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }

                // Smooth scroll to target
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function handlePricingSelection(plan) {
    console.log(`Selected plan: ${plan}`);
    showNotification(`You selected the ${plan} plan! Proceed to checkout.`);
}

// CTA button handlers
function handleGetStarted() {
    console.log('Get Started clicked');
    showNotification('🚀 Redirecting to sign up...');
    setTimeout(() => {
        // In a real app, this would navigate to sign up page
        const signUpSection = document.querySelector('#how-it-works');
        if (signUpSection) {
            signUpSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 500);
}

function handleTourClick() {
    console.log('Tour clicked');
    showNotification('📺 Tour feature coming soon! Stay tuned.');
}

function handleContactClick() {
    console.log('Contact clicked');
    showNotification('📧 Contact form would open here. Email: contact@fittrack.com');
}


function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FF6B35, #FF8C5A);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
        font-size: 0.95rem;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}


const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @media (max-width: 576px) {
        .notification {
            top: 10px !important;
            right: 10px !important;
            left: 10px !important;
            padding: 12px 16px !important;
            font-size: 0.9rem !important;
        }
    }
`;
document.head.appendChild(notificationStyle);


function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length === 0) return;

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Start animation when counter is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}


animateCounters();


window.FitTrack = {
    handleGetStarted,
    handleTourClick,
    handlePricingSelection,
    handleContactClick,
    animateCounters,
    showNotification
};


function initializeResponsive() {
    const hamburger = document.querySelector('.navbar-toggler');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }


    document.addEventListener('click', function(event) {
        const navbar = document.querySelector('.navbar-collapse');
        const toggler = document.querySelector('.navbar-toggler');
        
        if (navbar && navbar.classList.contains('show')) {
            if (!navbar.contains(event.target) && !toggler.contains(event.target)) {
                const bsCollapse = new bootstrap.Collapse(navbar, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        }
    });
}

initializeResponsive();


function initializeAccessibility() {
    // Add focus visible styles
    const style = document.createElement('style');
    style.textContent = `
        *:focus-visible {
            outline: 3px solid #FF6B35;
            outline-offset: 2px;
        }

        button:focus-visible,
        a:focus-visible,
        input:focus-visible,
        select:focus-visible,
        textarea:focus-visible {
            outline: 3px solid #FF6B35;
            outline-offset: 2px;
        }

        .skip-link:focus {
            outline: none;
        }
    `;
    document.head.appendChild(style);

  
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #004E89;
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        z-index: 100;
        font-weight: 600;
        border-radius: 0 0 8px 0;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.prepend(skipLink);
}

initializeAccessibility();


function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

initializeLazyLoading();


function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.id = 'scroll-to-top';
    scrollButton.innerHTML = '↑';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #FF6B35, #FF8C5A);
        color: white;
        border: none;
        border-radius: 50%;
        width: 55px;
        height: 55px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
        font-weight: bold;
    `;

    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'flex';
            scrollButton.style.alignItems = 'center';
            scrollButton.style.justifyContent = 'center';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollButton.addEventListener('mouseenter', () => {
        scrollButton.style.transform = 'scale(1.15) rotateZ(-45deg)';
    });

    scrollButton.addEventListener('mouseleave', () => {
        scrollButton.style.transform = 'scale(1) rotateZ(0deg)';
    });

    scrollButton.addEventListener('click', () => {
        scrollButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            scrollButton.style.transform = 'scale(1) rotateZ(0deg)';
        }, 200);
    });
}

createScrollToTopButton();

// Add smooth page transitions
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});


document.querySelectorAll('button').forEach(btn => {
    if (btn.type !== 'submit' && btn.type !== 'reset') {
        btn.type = 'button';
    }
});


document.addEventListener('keydown', (e) => {
    // Escape key closes navbar
    if (e.key === 'Escape') {
        const navbar = document.querySelector('.navbar-collapse');
        if (navbar && navbar.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbar, {
                toggle: false
            });
            bsCollapse.hide();
        }
    }
});


window.addEventListener('online', () => {
    showNotification('🟢 Connection restored!');
});

window.addEventListener('offline', () => {
    showNotification('🔴 No internet connection');
});

// Add performance monitoring
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    });
}


if (typeof console !== 'undefined') {
    console.log('%cFitTrack', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
    console.log('%cVersion 1.0.0', 'color: #004E89; font-size: 12px;');
    console.log('%cMade with ❤️ for fitness enthusiasts', 'color: #1BB64A; font-size: 12px;');
}
