/**
 * config-loader.js
 * Binds EVENT_CONFIG into DOM elements for
 * Sheharban & Muhammed Fasil's Save the Date Invitation.
 */
(function () {
  'use strict';

  function initLoader() {
    if (typeof EVENT_CONFIG === 'undefined') {
      console.error('[config-loader] EVENT_CONFIG not found. Make sure config.js is loaded first.');
      return;
    }

    var cfg = EVENT_CONFIG;

    function setText(selector, value) {
      var els = document.querySelectorAll(selector);
      els.forEach(function (el) { if (value !== undefined && value !== null) el.textContent = value; });
    }

    function setAttr(selector, attr, value) {
      var els = document.querySelectorAll(selector);
      els.forEach(function (el) { if (value !== undefined && value !== null) el.setAttribute(attr, value); });
    }

    // Document Meta
    if (cfg.title) document.title = cfg.title;

    var descMeta = document.querySelector('meta[name="description"]');
    if (descMeta && cfg.description) descMeta.setAttribute('content', cfg.description);

    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && cfg.title) ogTitle.setAttribute('content', cfg.title);

    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && cfg.description) ogDesc.setAttribute('content', cfg.description);

    // Hero Section
    var heroBg = document.getElementById('heroBg');
    if (heroBg && cfg.heroBg) {
      heroBg.style.backgroundImage = "url('" + cfg.heroBg + "')";
    }

    setText('#heroBismillah',     cfg.bismillah);
    setText('#heroBismillahSub',  cfg.bismillahTranslation);
    setText('#heroTagline',       cfg.invitationLead);
    setText('#heroNames',         cfg.names);
    setText('#heroDate',          cfg.date);
    setText('#heroDayTime',       cfg.day + ' \u00B7 ' + cfg.time);
    setText('#heroVenue',         cfg.venue + ' \u00B7 ' + cfg.address);

    var heroDateEl = document.getElementById('heroDate');
    if (heroDateEl && cfg.eventDateTime) {
      heroDateEl.setAttribute('datetime', cfg.eventDateTime.substring(0, 10));
    }

    // Save the Date Section
    setText('#stdBismillah',    cfg.bismillah);
    setText('#stdBismillahSub', cfg.bismillahTranslation);
    setText('#stdDay',          cfg.day);
    setText('#stdTime',         cfg.time);
    setText('#stdInshaallah',   cfg.closingBlessing);

    // Wedding Details Section
    setText('#detailDate',     cfg.date);
    setText('#detailDay',      cfg.day);
    setText('#detailTime',     cfg.time);
    setText('#detailVenue',    cfg.venue);
    setText('#detailLocation', cfg.address);

    // Welcome / Sacred Invitation Message
    setText('#welcomeBismillah',    cfg.bismillah);
    setText('#welcomeBismillahSub', cfg.bismillahTranslation);
    setText('#welcomeLead',         cfg.invitationLead);
    setText('#welcomeRequest',      cfg.invitationRequest);
    setText('#welcomeNames',        cfg.names);
    setText('#welcomeInshaallah',   cfg.closingBlessing);

    // Story Section
    if (cfg.story) {
      setText('#storyEyebrow',     cfg.story.eyebrow);
      setText('#storyTitle',       cfg.story.title);
      setText('#storyQuote',       cfg.story.quote);
      setText('#storyQuoteSource', cfg.story.quoteSource);
      setText('#storyBody',        cfg.story.body);
      if (cfg.story.photo) {
        setAttr('#storyPhoto', 'src', cfg.story.photo);
        setAttr('#storyPhoto', 'alt', cfg.names);
      }
    }

    // Venue Section
    setText('#venueName',          cfg.venue);
    setText('#venueAddress',       cfg.address);
    setAttr('#venueMapBtn',        'href', cfg.mapUrl || '#');
    setAttr('#venueDirectionsBtn', 'href', cfg.mapUrl || '#');
    if (cfg.mapEmbedUrl) {
      setAttr('#venueMapIframe', 'src', cfg.mapEmbedUrl);
    }

    // Contact Links
    if (cfg.contact) {
      setAttr('#whatsappLink', 'href', 'https://wa.me/' + (cfg.contact.whatsapp || ''));
      setAttr('#phoneLink',    'href', 'tel:' + (cfg.contact.phone ? cfg.contact.phone.replace(/\s+/g, '') : ''));
      setText('#phoneText',    cfg.contact.phone);
    }

    // Footer
    setText('#footerNames',   cfg.names);
    setText('#footerDate',    cfg.date + ' \u00B7 ' + cfg.day);
    setText('#footerCredit',  cfg.creator);

    // Navigation branding
    setText('.nav__mobile-names', cfg.names);
    setText('.nav__mobile-date',  cfg.date);

    // Hero loaded transition
    var heroSection = document.querySelector('.hero');
    if (heroSection && cfg.heroBg) {
      var img = new Image();
      img.onload = function () { heroSection.classList.add('is-loaded'); };
      img.src = cfg.heroBg;
    } else if (heroSection) {
      heroSection.classList.add('is-loaded');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoader);
  } else {
    initLoader();
  }
})();
