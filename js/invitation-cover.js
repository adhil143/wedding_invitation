/**
 * invitation-cover.js
 * Single-Page Cinematic 3D Islamic Portal Entry & Continuous Camera Transition
 */
(function () {
  'use strict';

  function initOpeningExperience() {
    var overlay = document.getElementById('opening-experience');
    var btnOpen = document.getElementById('btnOpenInvitation');
    var btnSkip = document.getElementById('openingSkipBtn');

    if (!overlay || !btnOpen) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Lock body scrolling initially
    document.body.style.overflow = 'hidden';

    var isOpening = false;

    function openInvitation() {
      if (isOpening) return;
      isOpening = true;

      // 1. Start background music upon user gesture
      if (window.startBackgroundMusic) {
        window.startBackgroundMusic();
      }

      // 2. Trigger continuous 3D camera fly-through
      overlay.classList.add('is-opening');

      // 3. Coordinate timeline (4.5 seconds total sequence)
      var totalDuration = prefersReducedMotion ? 800 : 4500;

      setTimeout(function () {
        finishOpening();
      }, totalDuration);
    }

    function finishOpening() {
      overlay.classList.add('is-finished');
      document.body.style.overflow = '';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.style.pointerEvents = 'none';

      // Record in session
      try {
        sessionStorage.setItem('invitation_opened', 'true');
      } catch (e) {}

      // Refresh any scroll reveal calculations for the wedding site
      if (window.initScrollReveal) {
        window.initScrollReveal();
      }

      // Completely remove from render tree after fade completes
      setTimeout(function () {
        overlay.style.display = 'none';
      }, 800);
    }

    // Touch & Click listeners
    btnOpen.addEventListener('click', function (e) {
      e.preventDefault();
      openInvitation();
    });

    var centerpiece = document.getElementById('doorCenterpiece');
    if (centerpiece) {
      centerpiece.addEventListener('click', function (e) {
        if (!isOpening) {
          openInvitation();
        }
      });
    }

    if (btnSkip) {
      btnSkip.addEventListener('click', function (e) {
        e.preventDefault();
        if (window.startBackgroundMusic) {
          window.startBackgroundMusic();
        }
        finishOpening();
      });
    }

    // Keyboard accessibility (Enter / Space)
    btnOpen.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openInvitation();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOpeningExperience);
  } else {
    initOpeningExperience();
  }
})();
