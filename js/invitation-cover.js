/**
 * invitation-cover.js
 * Orchestrates the Mysterious Islamic Wedding Invitation Opening Sequence.
 */
(function () {
  'use strict';

  function initCover() {
    var overlay = document.getElementById('invitationOverlay');
    var stage = document.getElementById('invitationStage');
    var btnOpen = document.getElementById('btnOpenInvitation');
    var btnSkip = document.getElementById('invitationSkipBtn');

    if (!overlay || !stage || !btnOpen) return;

    // Check prefers-reduced-motion
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Lock scrolling on initial load
    document.body.style.overflow = 'hidden';

    var isOpening = false;

    function openInvitation() {
      if (isOpening) return;
      isOpening = true;

      // 1. Start audio fade-in upon user gesture
      if (window.startBackgroundMusic) {
        window.startBackgroundMusic();
      }

      // 2. Trigger 3D unfolding & reveal stage
      stage.classList.add('is-opening');

      var totalDelay = prefersReducedMotion ? 1200 : 5200;

      // 3. Complete transition to main website
      setTimeout(function () {
        stage.classList.add('is-transitioning');
        setTimeout(function () {
          dismissOverlay();
        }, 800);
      }, totalDelay);
    }

    function dismissOverlay() {
      overlay.classList.add('is-dismissed');
      document.body.style.overflow = '';
      overlay.setAttribute('aria-hidden', 'true');

      // Record in session
      try {
        sessionStorage.setItem('invitation_opened', 'true');
      } catch (e) {}

      // Trigger scroll reveal refresh for hero
      if (window.initScrollReveal) {
        window.initScrollReveal();
      }
    }

    // Click / Touch on Open Button
    btnOpen.addEventListener('click', function (e) {
      e.preventDefault();
      openInvitation();
    });

    // Skip Button
    if (btnSkip) {
      btnSkip.addEventListener('click', function (e) {
        e.preventDefault();
        dismissOverlay();
      });
    }

    // Keyboard support for Open Button
    btnOpen.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openInvitation();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCover);
  } else {
    initCover();
  }
})();
