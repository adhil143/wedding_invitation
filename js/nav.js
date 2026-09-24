/**
 * nav.js
 * Handles:
 * - Nav transparent -> scrolled state
 * - Hamburger toggle (mobile)
 * - Active section highlight via IntersectionObserver
 * - Smooth scroll for nav links (enhanced)
 * - Body scroll lock when mobile menu is open
 */
(function () {
  'use strict';

  function initNav() {
    var nav         = document.getElementById('nav');
    var hamburger   = document.getElementById('navHamburger');
    var mobileMenu  = document.getElementById('navMobile');
    var closeLinks  = document.querySelectorAll('[data-close-nav]');
    var navLinks    = document.querySelectorAll('.nav__link');
    var sections    = document.querySelectorAll('section[id]');

    var isMenuOpen  = false;
    var lastScroll  = 0;

    if (!nav) return;

    // -- Scroll state --------------------------------------------------
    function updateNavOnScroll() {
      var y = window.scrollY;

      if (y > 60) {
        nav.classList.add('nav--scrolled');
        nav.classList.remove('nav--transparent');
      } else {
        nav.classList.remove('nav--scrolled');
        nav.classList.add('nav--transparent');
      }

      lastScroll = y;
    }

    // Throttle scroll handler
    var scrollTicking = false;
    window.addEventListener('scroll', function () {
      if (!scrollTicking) {
        window.requestAnimationFrame(function () {
          updateNavOnScroll();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });

    // Initial state
    updateNavOnScroll();
    nav.classList.add('nav--transparent');

    // -- Mobile menu toggle --------------------------------------------
    function openMenu() {
      isMenuOpen = true;
      if (mobileMenu) {
        mobileMenu.classList.add('is-open');
        mobileMenu.removeAttribute('aria-hidden');
      }
      if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'true');
      }
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      isMenuOpen = false;
      if (mobileMenu) {
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
      if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
      }
      document.body.style.overflow = '';
    }

    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (isMenuOpen) closeMenu(); else openMenu();
      });

      // Close on backdrop click
      mobileMenu.addEventListener('click', function (e) {
        if (e.target === mobileMenu) closeMenu();
      });

      // Close via data-close-nav links
      closeLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          closeMenu();
        });
      });

      // Close on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isMenuOpen) closeMenu();
      });
    }

    // -- Active section highlight --------------------------------------
    if ('IntersectionObserver' in window && navLinks.length && sections.length) {
      var sectionObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var id = entry.target.getAttribute('id');
              navLinks.forEach(function (link) {
                var href = link.getAttribute('href');
                if (href === '#' + id) {
                  link.classList.add('is-active');
                } else {
                  link.classList.remove('is-active');
                }
              });
            }
          });
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      sections.forEach(function (s) { sectionObserver.observe(s); });
    }

    // -- Smooth scroll for all anchor links ---------------------------
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        var navHeight = nav ? nav.offsetHeight : 0;
        var targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
