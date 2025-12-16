/* =====================================================
   SHAQRAN HUSSAIN - PORTFOLIO JAVASCRIPT
   Advanced Animations, Magnetic Effects & Interactions
   ===================================================== */

// =====================================================
// INITIALIZATION
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initScrollProgress();
    initCursorGlow();
    initCustomCursor();
    initTypingAnimation();
    initNavigation();
    initThemeToggle();
    initScrollReveal();
    initTextReveal();
    initMagneticButtons();
    initBackToTop();
    initContactForm();
    initCounterAnimation();
    initSmoothScroll();
    initTiltEffect();
    initParallax();
});

// =====================================================
// UTILITY: DEBOUNCE FUNCTION
// =====================================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// =====================================================
// SCROLL PROGRESS BAR
// =====================================================
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    const updateProgress = debounce(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, 10);

    window.addEventListener('scroll', updateProgress);
}

// =====================================================
// PRELOADER
// =====================================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const progressBar = preloader?.querySelector('.loader-progress');
    const percentageText = preloader?.querySelector('.loader-percentage');

    if (!preloader) return;

    // Hide scrollbar during loading
    document.body.style.overflow = 'hidden';

    let progress = 0;
    const duration = 1500; // 1.5 seconds
    const interval = 20; // Update every 20ms
    const increment = 100 / (duration / interval);

    const counter = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
            progress = 100;
            clearInterval(counter);
        }

        if (progressBar) progressBar.style.width = progress + '%';
        if (percentageText) percentageText.textContent = Math.floor(progress) + '%';
    }, interval);

    window.addEventListener('load', () => {
        // Ensure we reach 100%
        if (progressBar) progressBar.style.width = '100%';
        if (percentageText) percentageText.textContent = '100%';

        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.remove();
                document.body.classList.add('loaded');
                // Restore scrollbar after loading
                document.body.style.overflow = '';
            }, 500);
        }, 300);
    });

    // Fallback timeout
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
        }
    }, 4000);
}

// =====================================================
// CUSTOM CURSOR
// =====================================================
function initCustomCursor() {
    if (window.innerWidth <= 768) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(cursor);

    const dot = cursor.querySelector('.cursor-dot');
    const ring = cursor.querySelector('.cursor-ring');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, .social-link, .contact-card, .skill-card, .project-card, .bento-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.transform = 'translate(-50%, -50%) scale(1.5)';
            ring.style.borderColor = 'var(--accent-cyan)';
            dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.transform = 'translate(-50%, -50%) scale(1)';
            ring.style.borderColor = 'rgba(0, 217, 255, 0.5)';
            dot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor { pointer-events: none; z-index: 9999; }
        .cursor-dot {
            position: fixed;
            width: 8px;
            height: 8px;
            background: var(--accent-cyan);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.1s ease;
        }
        .cursor-ring {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(0, 217, 255, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.3s ease, border-color 0.3s ease;
        }
        body { cursor: none; }
        a, button { cursor: none; }
    `;
    document.head.appendChild(style);
}

// =====================================================
// CURSOR GLOW EFFECT
// =====================================================
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursor-glow');
    if (!cursorGlow) return;

    if (window.innerWidth <= 768) {
        cursorGlow.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.05;
        glowY += (mouseY - glowY) * 0.05;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// =====================================================
// MAGNETIC BUTTONS
// =====================================================
function initMagneticButtons() {
    if (window.innerWidth <= 768) return;

    const magneticElements = document.querySelectorAll('.btn, .social-link, .nav-link, .theme-toggle');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

// =====================================================
// TEXT REVEAL ANIMATION
// =====================================================
function initTextReveal() {
    // Only apply to section titles, NOT hero title (which has special gradient structure)
    const revealTexts = document.querySelectorAll('.section-title');

    revealTexts.forEach(text => {
        // Skip if contains gradient-text to preserve structure
        if (text.querySelector('.gradient-text')) return;

        const originalHTML = text.innerHTML;
        // Only wrap plain text words, preserve HTML tags
        const words = originalHTML.split(/(\s+)/);
        let wordIndex = 0;

        text.innerHTML = words.map(word => {
            if (word.trim() && !word.includes('<')) {
                wordIndex++;
                return `<span class="word" style="animation-delay: ${wordIndex * 0.08}s">${word}</span>`;
            }
            return word;
        }).join('');
    });

    const style = document.createElement('style');
    style.textContent = `
        .word {
            display: inline-block;
            opacity: 0;
            transform: translateY(20px);
            animation: wordReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes wordReveal {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// =====================================================
// TILT EFFECT INITIALIZATION
// =====================================================
function initTiltEffect() {
    if (window.innerWidth <= 768) return;

    const tiltElements = document.querySelectorAll('[data-tilt]');

    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(tiltElements, {
            max: 8,
            speed: 400,
            glare: true,
            'max-glare': 0.1,
            perspective: 1000
        });
    }
}

// =====================================================
// PARALLAX EFFECTS
// =====================================================
function initParallax() {
    const orbs = document.querySelectorAll('.hero-orb');
    const particles = document.querySelectorAll('.particle');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        orbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Mouse parallax for orbs
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            orbs.forEach((orb, index) => {
                const speed = 20 + (index * 10);
                orb.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
            });
        });
    }
}

// =====================================================
// TYPING ANIMATION
// =====================================================
function initTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;

    const roles = [
        'Python Developer',
        'QA Prompt Engineer',
        'Data Analyst',
        'Desktop App Developer',
        'Data Science Enthusiast'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1500);
}

// =====================================================
// NAVIGATION
// =====================================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Navbar always stays visible (sticky behavior)
        lastScroll = currentScroll;
    });

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close button inside mobile menu
    const navClose = document.getElementById('nav-close');
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active')) {
            // Check if click is outside menu and not on toggle button
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

// =====================================================
// SMOOTH SCROLL
// =====================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =====================================================
// THEME TOGGLE
// =====================================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');

    // Helper functions with error handling for localStorage
    function getStoredTheme() {
        try {
            return localStorage.getItem('theme');
        } catch (e) {
            console.warn('localStorage not available:', e);
            return null;
        }
    }

    function setStoredTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            console.warn('Could not save theme preference:', e);
        }
    }

    // Detect system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = getStoredTheme() || (prefersDark ? 'dark' : 'light');
    setTheme(savedTheme);

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!getStoredTheme()) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Toggle based on current state
            const isLight = document.documentElement.hasAttribute('data-theme');
            const newTheme = isLight ? 'dark' : 'light';

            setTheme(newTheme);
            setStoredTheme(newTheme);
        });
    }

    function setTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.style.background = '#fafafa';
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.body.style.background = '#000000';
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    }
}

// =====================================================
// SCROLL REVEAL ANIMATION (Enhanced)
// =====================================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-header, .bento-card, .skill-card, .timeline-item, ' +
        '.education-card, .project-card, .contact-card, .contact-form, .contact-text'
    );

    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        element.classList.add('reveal-element');
        revealObserver.observe(element);
    });

    // Add reveal styles
    const style = document.createElement('style');
    style.textContent = `
        .reveal-element {
            opacity: 0;
            transform: translateY(60px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-element.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Animate skill progress bars when visible
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.dataset.progress;
                entry.target.style.width = progress + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// =====================================================
// BACK TO TOP BUTTON
// =====================================================
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');

    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =====================================================
// CONTACT FORM - EmailJS Integration
// =====================================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    // Initialize EmailJS with your public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init('w61EMX9wY2n39YzOV');
    }

    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : '';

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        }

        // Get form data
        const templateParams = {
            from_name: document.getElementById('from_name').value,
            from_email: document.getElementById('from_email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                'service_ujnwj2u',  // Your Service ID
                'template_nrr4i9r', // Your Template ID
                templateParams
            );

            if (response.status === 200) {
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                }
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();

                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnContent;
                        submitBtn.style.background = '';
                    }
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-times"></i> <span>Failed to send</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            }
            showNotification('Failed to send message. Please try again or email directly.', 'error');

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                    submitBtn.style.background = '';
                }
            }, 3000);
        }
    });

    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

// =====================================================
// NOTIFICATION
// =====================================================
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';

    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle';
    const bgColor = type === 'success'
        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
        : type === 'error'
            ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
            : 'linear-gradient(135deg, #00d9ff 0%, #0066ff 100%)';
    // Use textContent for message to prevent XSS
    const iconElement = document.createElement('i');
    iconElement.className = `fas ${icon}`;

    const messageSpan = document.createElement('span');
    messageSpan.textContent = message; // Safe: uses textContent, not innerHTML

    notification.appendChild(iconElement);
    notification.appendChild(messageSpan);

    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        padding: 18px 28px;
        background: ${bgColor};
        color: white;
        border-radius: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 0.95rem;
        font-weight: 500;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// Add notification animations
const notifyStyle = document.createElement('style');
notifyStyle.textContent = `
@keyframes slideIn {
        from { opacity: 0; transform: translateX(50px) scale(0.9); }
        to { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes slideOut {
        from { opacity: 1; transform: translateX(0) scale(1); }
        to { opacity: 0; transform: translateX(50px) scale(0.9); }
}
`;
document.head.appendChild(notifyStyle);

// =====================================================
// COUNTER ANIMATION
// =====================================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.number[data-count], .stat-number[data-count]');

    const counterOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, counterOptions);

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    let step = 0;
    const timer = setInterval(() => {
        step++;
        const progress = easeOutQuart(step / steps);
        current = Math.round(progress * target);

        if (step >= steps) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = current;
        }
    }, stepTime);
}

// =====================================================
// CONSOLE GREETING
// =====================================================
console.log('%c✨ Shaqran Hussain Portfolio', 'color: #00d9ff; font-size: 1.5rem; font-weight: bold;');
console.log('%c🚀 Python Developer | Data Analyst | Problem Solver', 'color: #0066ff; font-size: 1rem;');
console.log('%c📧 Contact: shaqran124@gmail.com', 'color: #7c3aed;');
console.log('%c💼 Open to opportunities!', 'color: #10b981;');
