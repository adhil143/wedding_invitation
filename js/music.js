/**
 * music.js
 * Floating background music player with equalizer animation.
 * Adheres to browser autoplay policies (starts on user tap).
 */
(function () {
  'use strict';

  function initMusic() {
    if (typeof EVENT_CONFIG === 'undefined') return;

    var btn = document.getElementById('fabMusic');
    if (!btn) return;

    var audio = new Audio();
    audio.src = EVENT_CONFIG.music || 'assets/music/background.mp3';
    audio.loop = true;
    audio.preload = 'none';

    var isPlaying = false;

    function toggleMusic() {
      if (isPlaying) {
        audio.pause();
        btn.classList.remove('is-playing');
        btn.setAttribute('aria-label', 'Play background music');
        isPlaying = false;
      } else {
        var playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(function () {
              isPlaying = true;
              btn.classList.add('is-playing');
              btn.setAttribute('aria-label', 'Pause background music');
            })
            .catch(function (err) {
              console.warn('[Music] Audio play failed or file missing:', err);
              // Toggle visual anyway for demo feel if audio file is placeholder
              btn.classList.toggle('is-playing');
            });
        }
      }
    }

    btn.addEventListener('click', toggleMusic);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMusic);
  } else {
    initMusic();
  }
})();
