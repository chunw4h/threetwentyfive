/* main.js — shared behaviour for every page. */
(() => {
  'use strict';

  /* --- Footer year ------------------------------------------------------ */
  const year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = year;
  });

  /* --- Pointer tracking -------------------------------------------------
     Smooths the cursor, then publishes it as CSS custom properties on the
     backdrop. background.js reads the same values, so both layers agree. */
  const backdrop = document.querySelector('.backdrop');
  if (!backdrop) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const EASE = 0.14;    // 0..1 — higher = snappier
  const SETTLE = 0.15;  // px — stop the loop once this close

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight * 0.4;
  let curX = targetX;
  let curY = targetY;
  let rafId = null;
  let last = 0;

  function write(x, y) {
    backdrop.style.setProperty('--pointer-x', `${x.toFixed(2)}px`);
    backdrop.style.setProperty('--pointer-y', `${y.toFixed(2)}px`);
  }

  function tick(now) {
    const dt = last ? Math.min((now - last) / 16.667, 3) : 1;
    last = now;

    const k = 1 - Math.pow(1 - EASE, dt);
    curX += (targetX - curX) * k;
    curY += (targetY - curY) * k;
    write(curX, curY);

    if (Math.abs(targetX - curX) > SETTLE || Math.abs(targetY - curY) > SETTLE) {
      rafId = requestAnimationFrame(tick);
    } else {
      curX = targetX;
      curY = targetY;
      write(curX, curY);
      rafId = null;
    }
  }

  function onPointerMove(event) {
    targetX = event.clientX;
    targetY = event.clientY;
    if (rafId === null) {
      last = 0;
      rafId = requestAnimationFrame(tick);
    }
  }

  function syncPointerTracking() {
    const enabled = finePointer.matches && !reduceMotion.matches;

    if (enabled) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    } else {
      window.removeEventListener('pointermove', onPointerMove);
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      targetX = curX = window.innerWidth / 2;
      targetY = curY = window.innerHeight * 0.4;
    }

    write(curX, curY);
  }

  finePointer.addEventListener('change', syncPointerTracking);
  reduceMotion.addEventListener('change', syncPointerTracking);
  syncPointerTracking();
})();
