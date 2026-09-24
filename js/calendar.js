/**
 * calendar.js
 * Generates dynamic Google Calendar URLs from EVENT_CONFIG
 * for Sheharban & Muhammed Fasil's Wedding Ceremony.
 */
(function () {
  'use strict';

  function initCalendar() {
    if (typeof EVENT_CONFIG === 'undefined') return;

    var btns = document.querySelectorAll('.btn--calendar');
    if (!btns.length) return;

    var start = new Date(EVENT_CONFIG.eventDateTime);
    var end = EVENT_CONFIG.eventEndDateTime ? new Date(EVENT_CONFIG.eventEndDateTime) : new Date(start.getTime() + 4 * 3600 * 1000);

    function formatGCalTime(date) {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    }

    var eventTitle = encodeURIComponent("Sheharban & Muhammed Fasil's Wedding Ceremony");
    var eventDetails = encodeURIComponent(
      "In the name of Allah, the Most Gracious & the Most Merciful\n\n" +
      "Together with our families, we request the honor of your presence at the wedding ceremony of " +
      EVENT_CONFIG.names + ".\n\n" +
      "Date: " + (EVENT_CONFIG.date || '25 October 2026') + " (" + (EVENT_CONFIG.day || 'Sunday') + ")\n" +
      "Time: " + (EVENT_CONFIG.time || '11:30 AM') + "\n\n" +
      "Venue:\n" +
      (EVENT_CONFIG.venue || 'Delight Convention Center') + "\n" +
      (EVENT_CONFIG.address || 'Vazhikkadavu, Puvathipoyil') + "\n\n" +
      "InshaaAllah"
    );
    var eventLocation = encodeURIComponent((EVENT_CONFIG.venue || 'Delight Convention Center') + ', ' + (EVENT_CONFIG.address || 'Vazhikkadavu, Puvathipoyil'));
    var dates = formatGCalTime(start) + '/' + formatGCalTime(end);

    var gcalUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
      '&text=' + eventTitle +
      '&dates=' + dates +
      '&details=' + eventDetails +
      '&location=' + eventLocation;

    btns.forEach(function (btn) {
      btn.setAttribute('href', gcalUrl);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalendar);
  } else {
    initCalendar();
  }
})();
