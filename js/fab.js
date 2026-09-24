/**
 * fab.js
 * Manages floating action buttons:
 * - Scroll-to-top button appearance & smooth scroll
 * - Dynamic WhatsApp links
 */
(function () {
  'use strict';

  function initFAB() {
    var scrollTopBtn = document.getElementById('fabScrollTop');
    var whatsappFab = document.getElementById('fabWhatsapp');

    if (whatsappFab && typeof EVENT_CONFIG !== 'undefined' && EVENT_CONFIG.contact) {
      whatsappFab.href = 'https://wa.me/' + (EVENT_CONFIG.contact.whatsapp || '');
    }

    if (scrollTopBtn) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 420) {
          scrollTopBtn.classList.add('is-visible');
        } else {
          scrollTopBtn.classList.remove('is-visible');
        }
      }, { passive: true });

      scrollTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAB);
  } else {
    initFAB();
  }
})();
