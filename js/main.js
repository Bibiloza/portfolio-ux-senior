/* ================================================================
   MAIN JS — BIBI LOZA PORTFOLIO
   ================================================================ */

// ── Scroll-based nav style ───────────────────────────────────
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── Mobile nav toggle ────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    const open = navMobile.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });

  // Close on link click
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });
}

// ── Intersection Observer for fade-in animations ─────────────
const observerOpts = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOpts);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── TOC active state (case study page) ──────────────────────
const tocLinks = document.querySelectorAll('.cs-toc__link');
const csSections = document.querySelectorAll('.cs-section[id]');

if (tocLinks.length && csSections.length) {
  const tocObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.cs-toc__link[href="#${id}"]`);
      if (link) link.classList.toggle('active', entry.isIntersecting);
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  csSections.forEach(sec => tocObserver.observe(sec));
}

// ── Active nav link based on current page ───────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach(link => {
  const href = link.getAttribute('href');
  if (href && href.startsWith(currentPage)) {
    link.classList.add('active');
  }
});

// ── Smooth scroll for anchor links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Print resume ─────────────────────────────────────────────
const printBtn = document.getElementById('printResume');
if (printBtn) {
  printBtn.addEventListener('click', () => window.print());
}
