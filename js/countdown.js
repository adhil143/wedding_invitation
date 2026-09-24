/**
 * countdown.js
 * Real-time countdown to EVENT_CONFIG.eventDateTime.
 * Updates Days, Hours, Minutes, Seconds every second.
 */
(function () {
  'use strict';

  function initCountdown() {
    if (typeof EVENT_CONFIG === 'undefined' || !EVENT_CONFIG.eventDateTime) return;

    var daysEl    = document.getElementById('cdDays');
    var hoursEl   = document.getElementById('cdHours');
    var minsEl    = document.getElementById('cdMins');
    var secsEl    = document.getElementById('cdSecs');
    var endedEl   = document.getElementById('cdEnded');
    var gridEl    = document.getElementById('cdGrid');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    var targetTime = new Date(EVENT_CONFIG.eventDateTime).getTime();

    function pad(n) {
      return n < 10 ? '0' + n : String(n);
    }

    function update() {
      var now = Date.now();
      var diff = targetTime - now;

      if (diff <= 0) {
        if (gridEl) gridEl.style.display = 'none';
        if (endedEl) endedEl.style.display = 'block';
        return;
      }

      var days  = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var secs  = Math.floor((diff % (1000 * 60)) / 1000);

      daysEl.textContent  = pad(days);
      hoursEl.textContent = pad(hours);
      minsEl.textContent  = pad(mins);
      secsEl.textContent  = pad(secs);
    }

    update();
    setInterval(update, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountdown);
  } else {
    initCountdown();
  }
})();
