/**
 * Formation AI FULLSTACK BUILDER - KEVY
 * Logic & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Scroll Animations
    initScrollReveal();
    
    // Add micro-interactions to cards
    initCardInteractions();
    
    // Initialize Scroll to Top button
    initScrollToTop();

    // Initialize Hero Title Animation
    initHeroTitleAnimation();
});

/**
 * Uses Intersection Observer API to reveal sections as they enter the viewport
 */
function initScrollReveal() {
    const sections = document.querySelectorAll('.section-reveal');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once shown, we can stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Adds subtle mouse tracking effect to glass cards for premium feel
 */
function initCardInteractions() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Subtle rotation effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            card.style.transform = `perspective(1000px) translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) translateY(0) rotateX(0) rotateY(0)';
        });
    });
}

function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');
    if (!scrollBtn) return;
    
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    };
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
}

/**
 * Toast System
 */
window.showToast = function(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'info';
    if (type === 'success') icon = 'check_circle';
    if (type === 'error') icon = 'error';
    
    toast.innerHTML = `
        <span class="material-icons toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('visible'), 10);
    
    // Remove after 4s
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
};

/**
 * Hero Title Sequential Animation
 * Words L->R, then highlight R->L, then stabilize.
 * Repeats every 10 minutes.
 */
function initHeroTitleAnimation() {
    const words = document.querySelectorAll('.hero-title .word');
    if (words.length === 0) return;

    function runSequence() {
        // Step 1: Reset to hidden
        words.forEach(word => {
            word.style.opacity = '0';
            word.style.transform = 'translateY(20px)';
            word.style.textShadow = 'none';
            word.style.color = '';
        });

        // Step 2: Left to Right appearance
        words.forEach((word, i) => {
            setTimeout(() => {
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
            }, i * 400);
        });

        // Step 3: Right to Left pulse highlight
        const totalAppearTime = words.length * 400;
        setTimeout(() => {
            const reversedWords = Array.from(words).reverse();
            reversedWords.forEach((word, i) => {
                setTimeout(() => {
                    word.style.color = '#fff';
                    word.style.textShadow = '0 0 25px rgba(239, 68, 68, 0.8)';
                    
                    // Brief highlight then return to normal
                    setTimeout(() => {
                        word.style.color = '';
                        word.style.textShadow = '';
                    }, 500);
                }, i * 300);
            });
        }, totalAppearTime + 600);

        // Step 4: Stabilize and set long-term timer (10 minutes)
        // The final state (opacity 1, transform 0) remains visible.
        setTimeout(runSequence, 600000); 
    }

    // Start immediately
    runSequence();
}
