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

    // Browser Detection for Install Button + Mockup URL Bar (Brave requires async API check)
    const installBtn = document.getElementById('install-btn');
    const urlBar = document.getElementById('mockup-url-bar');

    const browserSchemes = {
        Chrome:  'chrome-extension',
        Brave:   'chrome-extension',   // Brave uses Chrome's scheme
        Opera:   'chrome-extension',   // Opera also uses Chrome's scheme
        Edge:    'extension',
        Firefox: 'moz-extension',
        Safari:  'safari-web-extension',
    };

    const detectBrowser = async () => {
        const ua = navigator.userAgent;
        // Brave hides itself from userAgent — must use its async API
        if (navigator.brave && await navigator.brave.isBrave()) return 'Brave';
        if (ua.match(/edg/i))                                   return 'Edge';
        if (ua.match(/firefox|fxios/i))                         return 'Firefox';
        if (ua.match(/opr\//i))                                 return 'Opera';
        if (ua.match(/safari/i) && !ua.match(/chrome|chromium|crios/i)) return 'Safari';
        return 'Chrome';
    };

    detectBrowser().then(browserName => {
        if (installBtn) installBtn.textContent = `Install for ${browserName}`;
        if (urlBar) {
            const scheme = browserSchemes[browserName] || 'chrome-extension';
            urlBar.textContent = `${scheme}://focus-assistant/blocked.html`;
        }
    });
});
