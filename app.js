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

    // Browser Detection for Install Button
    const installBtn = document.getElementById('install-btn');
    if (installBtn) {
        const userAgent = navigator.userAgent;
        let browserName = "Chrome"; // Default
        
        if (userAgent.match(/edg/i)) {
            browserName = "Edge";
        } else if (userAgent.match(/firefox|fxios/i)) {
            browserName = "Firefox";
        } else if (userAgent.match(/opr\//i)) {
            browserName = "Opera";
        } else if (userAgent.match(/safari/i) && !userAgent.match(/chrome|chromium|crios/i)) {
            browserName = "Safari";
        } else if (userAgent.match(/brave/i)) {
            browserName = "Brave";
        }
        
        installBtn.textContent = `Install for ${browserName}`;
    }
});
