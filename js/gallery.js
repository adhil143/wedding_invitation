/**
 * gallery.js
 * Renders gallery from EVENT_CONFIG.gallery and provides
 * a full-screen lightbox with next/prev, escape, and touch swipe.
 */
(function () {
  'use strict';

  function initGallery() {
    if (typeof EVENT_CONFIG === 'undefined' || !EVENT_CONFIG.gallery) return;

    var grid = document.getElementById('galleryGrid');
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxCaption = document.getElementById('lightboxCaption');
    var closeBtn = document.getElementById('lightboxClose');
    var prevBtn = document.getElementById('lightboxPrev');
    var nextBtn = document.getElementById('lightboxNext');

    if (!grid) return;

    var items = EVENT_CONFIG.gallery;
    var currentIndex = 0;

    // Render grid items
    var html = '';
    items.forEach(function (item, idx) {
      html += '<div class="gallery-item sr sr-scale" data-index="' + idx + '" role="button" tabindex="0" aria-label="View photo ' + (idx + 1) + '">';
      html += '  <img src="' + item.src + '" alt="' + (item.caption || 'Wedding Moment') + '" loading="lazy" />';
      html += '  <div class="gallery-item__overlay">';
      html += '    <p class="gallery-item__caption">' + (item.caption || '') + '</p>';
      html += '  </div>';
      html += '</div>';
    });

    grid.innerHTML = html;
    if (window.initScrollReveal) window.initScrollReveal();

    function openLightbox(idx) {
      currentIndex = idx;
      updateLightboxContent();
      if (lightbox) {
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
      }
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      if (lightbox) {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
      }
      document.body.style.overflow = '';
    }

    function updateLightboxContent() {
      var item = items[currentIndex];
      if (!item) return;
      if (lightboxImg) {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.caption || 'Gallery Image';
      }
      if (lightboxCaption) {
        lightboxCaption.textContent = item.caption || '';
      }
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateLightboxContent();
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % items.length;
      updateLightboxContent();
    }

    // Grid item click
    grid.addEventListener('click', function (e) {
      var itemEl = e.target.closest('.gallery-item');
      if (itemEl) {
        var idx = parseInt(itemEl.getAttribute('data-index'), 10);
        openLightbox(idx);
      }
    });

    // Keyboard enter on grid items
    grid.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        var itemEl = e.target.closest('.gallery-item');
        if (itemEl) {
          e.preventDefault();
          var idx = parseInt(itemEl.getAttribute('data-index'), 10);
          openLightbox(idx);
        }
      }
    });

    // Lightbox Controls
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    if (lightbox) {
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
      });
    }

    // Keyboard nav
    document.addEventListener('keydown', function (e) {
      if (!lightbox || !lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });

    // Touch swipe support
    var touchStartX = 0;
    var touchEndX = 0;

    if (lightbox) {
      lightbox.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      lightbox.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        var diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 45) {
          if (diff > 0) showPrev();
          else showNext();
        }
      }, { passive: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }
})();
