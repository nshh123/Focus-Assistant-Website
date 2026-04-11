document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-up elements
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // Interactive Mouse Tracking for Glow Mockup Effect (3D Tilt Parallax simulation)
    const mockupFrame = document.querySelector('.mockup-frame');
    if (mockupFrame) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            // Subtle parralax
            const tiltX = (y - 0.5) * 10;
            const tiltY = (x - 0.5) * -10;
            
            mockupFrame.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
        });
    }

    // Browser Detection for Install Button (Brave requires async API check)
    const installBtn = document.getElementById('install-btn');
    if (installBtn) {
        const detectBrowser = async () => {
            const userAgent = navigator.userAgent;

            // Brave hides itself from userAgent — must use its async API
            if (navigator.brave && await navigator.brave.isBrave()) {
                return "Brave";
            } else if (userAgent.match(/edg/i)) {
                return "Edge";
            } else if (userAgent.match(/firefox|fxios/i)) {
                return "Firefox";
            } else if (userAgent.match(/opr\//i)) {
                return "Opera";
            } else if (userAgent.match(/safari/i) && !userAgent.match(/chrome|chromium|crios/i)) {
                return "Safari";
            }
            return "Chrome"; // Default
        };

        detectBrowser().then(browserName => {
            installBtn.textContent = `Install for ${browserName}`;
        });
    }
});
