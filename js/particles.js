/**
 * particles.js
 * Subtle, low-CPU floating golden / rose petals on hero canvas.
 */
(function () {
  'use strict';

  function initParticles() {
    var canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var count = window.innerWidth < 768 ? 16 : 28;
    var animId;

    function resize() {
      canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 4 + 3,
        dx: Math.random() * 0.8 - 0.4,
        dy: Math.random() * 0.6 + 0.4,
        rot: Math.random() * Math.PI * 2,
        dRot: Math.random() * 0.02 - 0.01,
        color: Math.random() > 0.4 ? 'rgba(201, 169, 110, 0.4)' : 'rgba(223, 191, 134, 0.35)',
        scaleX: Math.random() * 0.6 + 0.4
      };
    }

    for (var i = 0; i < count; i++) {
      var p = createParticle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var j = 0; j < particles.length; j++) {
        var pt = particles[j];
        pt.x += pt.dx;
        pt.y += pt.dy;
        pt.rot += pt.dRot;

        if (pt.y > canvas.height + 10) {
          particles[j] = createParticle();
          particles[j].y = -10;
        }

        ctx.save();
        ctx.translate(pt.x, pt.y);
        ctx.rotate(pt.rot);
        ctx.scale(pt.scaleX, 1);
        ctx.beginPath();
        ctx.arc(0, 0, pt.r, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    }

    // Pause when hero is scrolled out of view to save battery
    if ('IntersectionObserver' in window) {
      var hero = document.getElementById('hero');
      var observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          if (!animId) render();
        } else {
          cancelAnimationFrame(animId);
          animId = null;
        }
      }, { threshold: 0.1 });

      if (hero) observer.observe(hero);
    } else {
      render();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
  } else {
    initParticles();
  }
})();
