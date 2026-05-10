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
