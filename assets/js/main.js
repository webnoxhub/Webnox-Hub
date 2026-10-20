const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
/* ═══════════ LOADER ═══════════ */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) setTimeout(() => loader.classList.add('hide'), 900);
});

/* ═══════════ NAVBAR SCROLL + MOBILE MENU ═══════════ */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
});

if (hamburger && navLinks) {
    const mobile = window.matchMedia('(max-width: 900px)');
    const setMenu = (open, restoreFocus = false) => {
        hamburger.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', String(open));
        navLinks.classList.toggle('open', open);
        document.body.classList.toggle('menu-open', open);
        if (restoreFocus) hamburger.focus();
    };
    hamburger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => {
        if (!mobile.matches || !navLinks.classList.contains('open')) return;
        if (event.key === 'Escape') { event.preventDefault(); setMenu(false, true); }
        if (event.key === 'Tab') {
            const links = [...navLinks.querySelectorAll('a')];
            const first = links[0], last = hamburger;
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
    });
    mobile.addEventListener('change', () => setMenu(false));
}

/* ═══════════ ANIMATED NETWORK CANVAS (all hero sections) ═══════════ */
document.querySelectorAll('canvas.network-canvas, #networkCanvas').forEach(canvas => {
    if (reducedMotion.matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const hero = canvas.parentElement;      // mouse is tracked on the whole hero, not just the canvas
    let particles = [];
    let mouse = { x: null, y: null };

    // ── Settings (change these to tune the look) ──
    const PARTICLE_DENSITY = 0.00011;   // particles per px² (bigger = more nodes)
    const MAX_DIST     = 190;           // distance up to which nodes connect
    const DOT_MIN      = 2;             // smallest node radius
    const DOT_MAX      = 4.5;           // biggest node radius
    const LINE_WIDTH   = 1.4;
    const ATTRACT_DIST = 230;           // cursor pull range
    const ATTRACT_PULL = 0.06;          // cursor pull strength

    function resize() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.offsetWidth;
            this.y = Math.random() * canvas.offsetHeight;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.r = Math.random() * (DOT_MAX - DOT_MIN) + DOT_MIN;
        }
        update() {
            // attraction towards the cursor
            if (mouse.x !== null) {
                const dx = mouse.x - this.x, dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < ATTRACT_DIST && dist > 25) {
                    const force = (1 - dist / ATTRACT_DIST) * ATTRACT_PULL;
                    this.vx += (dx / dist) * force;
                    this.vy += (dy / dist) * force;
                }
            }
            // friction + speed limit so nodes settle and drift again when the cursor leaves
            this.vx *= 0.985; this.vy *= 0.985;
            const speed = Math.hypot(this.vx, this.vy);
            if (speed > 2.2) { this.vx = this.vx / speed * 2.2; this.vy = this.vy / speed * 2.2; }
            if (speed < 0.15) { this.vx += (Math.random() - 0.5) * 0.03; this.vy += (Math.random() - 0.5) * 0.03; }

            this.x += this.vx; this.y += this.vy;
            if (this.x < 0 || this.x > canvas.offsetWidth)  { this.vx *= -1; this.x = Math.max(0, Math.min(canvas.offsetWidth, this.x)); }
            if (this.y < 0 || this.y > canvas.offsetHeight) { this.vy *= -1; this.y = Math.max(0, Math.min(canvas.offsetHeight, this.y)); }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 229, 255, 0.9)';
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.max(35, Math.min(140, Math.round(canvas.offsetWidth * canvas.offsetHeight * PARTICLE_DENSITY)));
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_DIST) {
                    const alpha = (1 - dist / MAX_DIST) * 0.4;
                    ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
                    ctx.lineWidth = LINE_WIDTH;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
            if (mouse.x !== null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < ATTRACT_DIST) {
                    const alpha = (1 - dist / ATTRACT_DIST) * 0.65;
                    ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
                    ctx.lineWidth = LINE_WIDTH + 0.2;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        if (reducedMotion.matches) return;
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }

    resize(); initParticles(); animate();
    window.addEventListener('resize', () => { resize(); initParticles(); });

    hero.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
});

/* ═══════════ SCROLL REVEAL ═══════════ */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('in'), i * 70);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));

/* ═══════════ COUNTER ═══════════ */
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.dataset.target;
            const duration = 2000;
            const start = performance.now();
            function tick(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(target * eased);
                if (progress < 1) requestAnimationFrame(tick);
                else el.textContent = target;
            }
            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ═══════════ PORTFOLIO FILTER ═══════════ */
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        const filter = btn.dataset.filter;
        workCards.forEach(card => {
            const match = filter === 'all' || card.dataset.cat === filter;
            card.classList.toggle('hide', !match);
        });
    });
});

/* Netlify Forms: keep entered fields on failure; success requires an accepted POST.
   Browser checks and the pending flag do not provide server validation or durable deduplication. */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    let pending = false;
    const button = contactForm.querySelector('button[type="submit"]');
    const note = document.getElementById('formNote');
    contactForm.addEventListener('submit', async event => {
        event.preventDefault();
        if (pending || !contactForm.reportValidity()) return;
        if (location.protocol === 'file:' || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)) {
            note.textContent = 'Local preview only. No inquiry has been sent. Use email or WhatsApp to contact us.';
            return;
        }
        const data = new FormData(contactForm);
        if (!String(data.get('name')).trim() || String(data.get('message')).trim().length < 10) {
            note.textContent = 'Please enter your name and at least 10 characters of project details.';
            return;
        }
        pending = true;
        button.disabled = true;
        button.textContent = 'Submitting…';
        contactForm.setAttribute('aria-busy', 'true');
        note.textContent = 'Sending your inquiry…';
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000);
        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(data).toString(),
                signal: controller.signal
            });
            if (!response.ok) throw new Error('Submission not accepted');
            window.location.assign(contactForm.action);
        } catch {
            note.textContent = 'We could not confirm your submission. Your details are still here. The request may have reached us; check with us by email or WhatsApp before retrying to avoid a duplicate inquiry.';
        } finally {
            clearTimeout(timeout);
            pending = false;
            button.disabled = false;
            button.textContent = 'Send Message';
            contactForm.removeAttribute('aria-busy');
        }
    });
}

/* ═══════════ SMOOTH SCROLL ═══════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
        }
    });
});