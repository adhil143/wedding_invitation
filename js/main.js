/**
 * main.js
 * Bootstrap — initialises all Stage 1 modules.
 * Runs after DOM is ready and all other scripts are loaded.
 */
(function () {
  'use strict';

  function init() {
    // ── Remove loading class if present ──────────────────────────────
    document.body.classList.remove('is-loading');

    // ── Trigger hero loaded state if image already cached ────────────
    var hero = document.querySelector('.hero');
    if (hero && !hero.classList.contains('is-loaded')) {
      // Fallback: add class after 2s regardless
      setTimeout(function () {
        hero.classList.add('is-loaded');
      }, 2000);
    }

    // ── Log config in dev mode ────────────────────────────────────────
    if (typeof EVENT_CONFIG !== 'undefined') {
      console.log(
        '%c ' + (EVENT_CONFIG.names || 'Wedding Invitation') + ' — Save The Date',
        'color: #c5a059; font-size: 14px; font-weight: bold;'
      );
      console.log('%c Powered by EVENT_CONFIG', 'color: #888; font-size: 11px;');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
