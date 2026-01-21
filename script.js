// ============================================
// NAVIGATION
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// TERMINAL CURSOR
// ============================================
const terminalCursor = document.querySelector('.terminal-cursor');

document.addEventListener('mousemove', (e) => {
    if (terminalCursor) {
        terminalCursor.style.left = e.clientX + 'px';
        terminalCursor.style.top = e.clientY + 'px';
    }
});

// ============================================
// TYPING ANIMATIONS
// ============================================
function initTypingAnimations() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach((element, index) => {
        const text = element.getAttribute('data-text');
        if (text) {
            element.textContent = '';
            const delay = index * 500;
            
            setTimeout(() => {
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 50);
            }, delay);
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Observe stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    observer.observe(card);
});

// Observe skill categories
document.querySelectorAll('.skill-category').forEach(category => {
    observer.observe(category);
});

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    } else if (num % 1 !== 0) {
        return num.toFixed(1);
    }
    return num.toString();
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseFloat(statNumber.getAttribute('data-target'));
            animateCounter(statNumber, target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// ============================================
// SKILL BARS ANIMATION
// ============================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            const width = skillProgress.getAttribute('data-width');
            skillProgress.style.width = width + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// ============================================
// PROJECT CARD INTERACTIONS
// ============================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// FORM HANDLING
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!name || !email || !message) {
            submitBtn.innerHTML = '<span class="terminal-prompt">$</span><span>error: all fields required</span>';
            submitBtn.style.background = '#ff4444';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'var(--accent-primary)';
            }, 2000);
            return;
        }
        
        submitBtn.innerHTML = '<span class="terminal-prompt">$</span><span>preparing...</span>';
        submitBtn.disabled = true;
        
        // Construct mailto URL
        const subject = encodeURIComponent(`Message from ${name} - Portfolio Contact Form`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:achmaddaniar@gmail.com?subject=${subject}&body=${body}`;
        
        // Open mailto link in new tab/window
        setTimeout(() => {
            window.open(mailtoLink, '_blank');
            
            submitBtn.innerHTML = '<span class="terminal-prompt">$</span><span>opening_email_client()</span> <i class="fas fa-envelope"></i>';
            submitBtn.style.background = 'var(--accent-secondary)';
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'var(--accent-primary)';
            }, 2000);
        }, 500);
    });
}

// ============================================
// PARALLAX EFFECTS
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
    }
});

// ============================================
// GLITCH EFFECT ENHANCEMENT
// ============================================
function enhanceGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'glitch 0.3s infinite';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.animation = 'glitch 2s infinite';
        });
    });
}

// ============================================
// CODE BLOCK ANIMATIONS
// ============================================
function animateCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block pre code');
    
    codeBlocks.forEach(block => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lines = block.innerHTML.split('\n');
                    block.innerHTML = '';
                    
                    lines.forEach((line, index) => {
                        setTimeout(() => {
                            block.innerHTML += line + '\n';
                        }, index * 50);
                    });
                    
                    observer.unobserve(block);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(block);
    });
}

// ============================================
// PARTICLE EFFECTS (Optional Enhancement)
// ============================================
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--accent-primary);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// Add floating animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// INITIALIZE ON LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTypingAnimations();
    enhanceGlitchEffect();
    animateCodeBlocks();
    createParticles();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Arrow keys for navigation (when not in input)
    if (!['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        }
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Throttle scroll events
let ticking = false;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================
// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.setAttribute('aria-label', 'Skip to main content');
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--accent-primary);
    color: var(--bg-primary);
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c👋 Hello! Welcome to my portfolio.', 'color: #00ff41; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with passion for impactful engineering.', 'color: #00d4ff; font-size: 12px;');
console.log('%cFeel free to explore the code!', 'color: #ff00ff; font-size: 12px;');
