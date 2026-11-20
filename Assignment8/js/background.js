/* background.js — ambient "Blackspace" starfield.
   Reads the smoothed pointer from CSS custom properties written by main.js. */
(() => {
  'use strict';

  const canvas = document.querySelector('[data-backdrop-canvas]');
  if (!canvas) return;

  const backdrop = canvas.parentElement;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const PARALLAX = 18;   // max px of drift at depth 1

  let dots = [];
  let frame = null;
  let last = 0;
  let w = 0;
  let h = 0;

  function seed() {
    const count = Math.round((w * h) / 14000);
    dots = Array.from({ length: count }, () => {
      const depth = Math.random();
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        depth,
        r: 0.4 + depth * 1.6,
        vy: 0.02 + depth * 0.16,
        base: 0.12 + depth * 0.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0004 + Math.random() * 0.0012,
      };
    });
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
    if (frame === null) paint(performance.now());
  }

  function readPointer() {
    const cs = getComputedStyle(backdrop);
    const x = cs.getPropertyValue('--pointer-x').trim();
    const y = cs.getPropertyValue('--pointer-y').trim();
    return {
      x: x.endsWith('px') ? parseFloat(x) : w / 2,
      y: y.endsWith('px') ? parseFloat(y) : h * 0.4,
    };
  }

  function paint(now) {
    const dt = last ? Math.min((now - last) / 16.667, 3) : 1;
    last = now;

    ctx.clearRect(0, 0, w, h);

    const p = readPointer();
    const nx = (p.x / w) * 2 - 1;
    const ny = (p.y / h) * 2 - 1;

    for (const dot of dots) {
      dot.y -= dot.vy * dt;
      if (dot.y < -6) {
        dot.y = h + 6;
        dot.x = Math.random() * w;
      }

      const twinkle = 0.72 + 0.28 * Math.sin(now * dot.speed + dot.phase);
      const alpha = dot.base * twinkle;

      ctx.beginPath();
      ctx.arc(
        dot.x + nx * dot.depth * PARALLAX,
        dot.y + ny * dot.depth * PARALLAX,
        dot.r,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgb(255 255 255 / ${alpha.toFixed(3)})`;
      ctx.fill();
    }
  }

  function loop(now) {
    paint(now);
    frame = requestAnimationFrame(loop);
  }

  function start() {
    if (frame !== null) return;
    last = 0;
    frame = requestAnimationFrame(loop);
  }

  function stop() {
    if (frame === null) return;
    cancelAnimationFrame(frame);
    frame = null;
  }

  function syncMotion() {
    if (reduceMotion.matches || document.hidden) {
      stop();
      paint(performance.now());
    } else {
      start();
    }
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  }, { passive: true });

  document.addEventListener('visibilitychange', syncMotion);
  reduceMotion.addEventListener('change', syncMotion);

  resize();
  syncMotion();
})();
