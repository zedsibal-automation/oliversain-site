document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky nav shadow ---------- */
  const nav = document.getElementById('site-nav');
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu toggle ---------- */
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  toggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll-spy ---------- */
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = Array.from(navLinks)
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach(a => {
      a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(sec => spyObserver.observe(sec));

    /* ---------- Reveal on scroll ---------- */
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Contact form (client-side handling) ---------- */
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  if (form) {
    form.addEventListener('submit', (e) => {
      // If deployed on Netlify, data-netlify="true" handles submission natively.
      // If deployed on Cloudflare Pages, swap this handler for a fetch() call
      // to a Cloudflare Pages Function (see README) or a service like Formspree.
      if (form.hasAttribute('data-netlify')) return;

      e.preventDefault();
      note.textContent = 'Sending…';
      note.classList.remove('is-success');

      // Placeholder: replace with a real endpoint (Formspree, Pages Function, etc.)
      setTimeout(() => {
        note.textContent = "Thanks — I'll reply within one business day.";
        note.classList.add('is-success');
        form.reset();
      }, 700);
    });
  }
});
