/**
 * music.js
 * Persistent background audio player with volume fade-in
 * and inline SVG controls (Play, Pause, Mute, Resume).
 */
(function () {
  'use strict';

  var audio = null;
  var isPlaying = false;
  var isMuted = false;
  var targetVolume = 0.5;
  var fadeInterval = null;

  var playIconSvg = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>';
  var pauseIconSvg = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
  var muteIconSvg = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';

  function getAudio() {
    if (!audio) {
      audio = new Audio();
      var src = (typeof EVENT_CONFIG !== 'undefined' && EVENT_CONFIG.music) ? EVENT_CONFIG.music : 'assets/music/background.mp3';
      audio.src = src;
      audio.loop = true;
      audio.preload = 'none';
      audio.volume = 0;
    }
    return audio;
  }

  function fadeVolumeIn(a, destVol, duration) {
    if (fadeInterval) clearInterval(fadeInterval);
    var steps = 20;
    var stepTime = duration / steps;
    var stepVol = destVol / steps;
    a.volume = 0;

    fadeInterval = setInterval(function () {
      if (a.volume + stepVol >= destVol) {
        a.volume = destVol;
        clearInterval(fadeInterval);
        fadeInterval = null;
      } else {
        a.volume += stepVol;
      }
    }, stepTime);
  }

  function startBackgroundMusic() {
    var a = getAudio();
    if (!a.src || isPlaying) return;

    var playPromise = a.play();
    if (playPromise !== undefined) {
      playPromise
        .then(function () {
          isPlaying = true;
          fadeVolumeIn(a, targetVolume, 2500);
          updateButtonUI();
        })
        .catch(function (err) {
          // File missing or blocked — safe silent fallback
          console.log('[Music] Audio play unavailable or file not present:', err.message);
          updateButtonUI();
        });
    }
  }

  function updateButtonUI() {
    var btn = document.getElementById('fabMusic');
    if (!btn) return;

    if (isMuted) {
      btn.innerHTML = muteIconSvg;
      btn.setAttribute('aria-label', 'Unmute audio');
      btn.setAttribute('title', 'Unmute');
      btn.classList.remove('is-playing');
    } else if (isPlaying) {
      btn.innerHTML = pauseIconSvg;
      btn.setAttribute('aria-label', 'Pause audio');
      btn.setAttribute('title', 'Pause Music');
      btn.classList.add('is-playing');
    } else {
      btn.innerHTML = playIconSvg;
      btn.setAttribute('aria-label', 'Play audio');
      btn.setAttribute('title', 'Play Music');
      btn.classList.remove('is-playing');
    }
  }

  function toggleMusic() {
    var a = getAudio();
    if (!a.src) return;

    if (isPlaying) {
      a.pause();
      isPlaying = false;
      updateButtonUI();
    } else {
      a.play().then(function () {
        isPlaying = true;
        a.volume = targetVolume;
        updateButtonUI();
      }).catch(function () {
        isPlaying = false;
        updateButtonUI();
      });
    }
  }

  function initMusic() {
    var btn = document.getElementById('fabMusic');
    if (btn) {
      updateButtonUI();
      btn.addEventListener('click', toggleMusic);
    }
  }

  // Expose global starter
  window.startBackgroundMusic = startBackgroundMusic;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMusic);
  } else {
    initMusic();
  }
})();
