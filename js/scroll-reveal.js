/**
 * scroll-reveal.js
 * Uses IntersectionObserver to add .is-visible to .sr elements
 * when they enter the viewport, triggering CSS transitions.
 * Supports dynamically inserted elements.
 */
(function () {
  'use strict';

  var observer = null;

  function getObserver() {
    if (!('IntersectionObserver' in window)) return null;
    if (!observer) {
      observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -30px 0px',
        }
      );
    }
    return observer;
  }

  function initScrollReveal() {
    var elements = document.querySelectorAll(
      '.sr:not(.is-visible), .sr-fade:not(.is-visible), .sr-left:not(.is-visible), .sr-right:not(.is-visible), .sr-scale:not(.is-visible)'
    );

    if (!elements.length) return;

    var obs = getObserver();
    if (!obs) {
      elements.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    elements.forEach(function (el) {
      obs.observe(el);
    });
  }

  // Expose globally so dynamic renderers can trigger it
  window.initScrollReveal = initScrollReveal;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }
})();
