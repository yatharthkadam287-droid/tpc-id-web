import { useEffect, useRef } from 'react';

/**
 * Attach the returned refs to your markup:
 *   stageRef  -> the wrapper div around strap + swing
 *   strapRef  -> the lanyard/strap element (its CSS needs: height: calc(<rest> + var(--ext, 0px)))
 *   swingRef  -> the div that swings and flips (needs transform-origin: 50% 0)
 *   flipRef   -> the inner flip container (needs transform-style: preserve-3d)
 *   descRef   -> the <p> (or similar) where the description types itself out
 *
 * Everything else — physics, drag, double-tap, typewriter — is handled here.
 */
export function useCardPhysics(description) {
  const stageRef = useRef(null);
  const strapRef = useRef(null);
  const swingRef = useRef(null);
  const flipRef  = useRef(null);
  const descRef  = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const swing = swingRef.current;
    const flip  = flipRef.current;
    const desc  = descRef.current;
    if (!stage || !swing || !flip || !desc) return;   // refs not mounted yet

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let typeTimer = null;

    /* ---------- flip + typewriter ---------- */
    function typeText(text, speed = 26) {
      clearTimeout(typeTimer);
      desc.textContent = '';
      if (reduce) { desc.textContent = text; return; }
      let i = 0;
      (function step() {
        if (i < text.length) { desc.textContent += text[i++]; typeTimer = setTimeout(step, speed); }
      })();
    }
    function toggleFlip() {
      const on = flip.classList.toggle('is-flipped');
      swing.setAttribute('aria-pressed', on);
      clearTimeout(typeTimer);
      if (on) typeTimer = setTimeout(() => typeText(description), reduce ? 0 : 450);
      else desc.textContent = '';
    }

    /* ---------- pendulum swing ---------- */
    const K = 14, C = 5, MAX = 0.6;
    let th = 0, om = 0, eq = 0;
    let dragging = false, target = 0, running = false, last = 0;
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

    /* ---------- pull-down stretch ---------- */
    const KV = 60, CV = 9, MAXEXT = 80;
    let ext = 0, ev = 0, extTarget = 0, baseD = 0;

    function render() {
      swing.style.transform = `rotate(${th}rad)`;
      stage.style.setProperty('--ext', ext + 'px');
    }
    function frame(t) {
      const dt = Math.min((t - last) / 1000 || 0.016, 0.032);
      last = t;
      if (dragging) {
        const prev = th, prevExt = ext;
        th += (target - th) * 0.4;
        om = (th - prev) / dt;
        ext += (extTarget - ext) * 0.4;
        ev = (ext - prevExt) / dt;
      } else {
        om += (-K * Math.sin(th - eq) - C * om) * dt;
        th += om * dt;
        ev += (-KV * ext - CV * ev) * dt;
        ext += ev * dt;
      }
      om = clamp(om, -2.5, 2.5);
      ev = clamp(ev, -900, 900);
      ext = clamp(ext, 0, MAXEXT);
      render();
      const settled = !dragging && Math.abs(th - eq) < 0.0008 && Math.abs(om) < 0.0008
                      && Math.abs(ext) < 0.05 && Math.abs(ev) < 0.5;
      if (settled) { th = eq; om = 0; ext = 0; ev = 0; render(); running = false; return; }
      requestAnimationFrame(frame);
    }
    function start() {
      if (running || reduce) { render(); return; }
      running = true; last = performance.now();
      requestAnimationFrame(frame);
    }

    /* ---------- pointer: drag to swing/stretch, double tap to flip ---------- */
    let sx = 0, sy = 0, moved = false, lastTap = 0;
    function stagePoint(e) {
      const r = stage.getBoundingClientRect();
      return { dx: e.clientX - (r.left + r.width / 2), dy: e.clientY - r.top };
    }
    function onDown(e) {
      sx = e.clientX; sy = e.clientY; moved = false;
      swing.setPointerCapture(e.pointerId);
    }
    function onMove(e) {
      if (!swing.hasPointerCapture(e.pointerId)) return;
      if (!moved && Math.hypot(e.clientX - sx, e.clientY - sy) > 6) {
        moved = true;
        if (!reduce) {
          const q = stagePoint(e);
          baseD = Math.hypot(q.dx, q.dy) - ext;
          dragging = true; swing.classList.add('dragging'); start();
        }
      }
      if (dragging) {
        const q = stagePoint(e);
        target = clamp(Math.atan2(-q.dx, Math.max(q.dy, 20)), -MAX, MAX);
        const pull = Math.max(0, Math.hypot(q.dx, q.dy) - baseD);
        extTarget = MAXEXT * (1 - Math.exp(-pull / MAXEXT));
      }
    }
    function release(e, cancelled) {
      if (swing.hasPointerCapture(e.pointerId)) swing.releasePointerCapture(e.pointerId);
      if (!moved && !cancelled) {
        const now = performance.now();
        if (now - lastTap < 320) { lastTap = 0; toggleFlip(); }
        else {
          lastTap = now;
          const r = swing.getBoundingClientRect();
          om += (e.clientX < r.left + r.width / 2 ? 1 : -1) * 0.5;
        }
      }
      dragging = false; swing.classList.remove('dragging'); start();
    }
    function onUp(e)     { release(e, false); }
    function onCancel(e) { release(e, true); }
    function onKey(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFlip(); }
      if (e.key === 'ArrowLeft')  { om -= 0.8; start(); }
      if (e.key === 'ArrowRight') { om += 0.8; start(); }
      if (e.key === 'ArrowDown')  { ev += 260; start(); }
    }

    swing.addEventListener('pointerdown', onDown);
    swing.addEventListener('pointermove', onMove);
    swing.addEventListener('pointerup', onUp);
    swing.addEventListener('pointercancel', onCancel);
    swing.addEventListener('keydown', onKey);

    render();

    /* cleanup: remove listeners when the component unmounts or the person changes */
    return () => {
      clearTimeout(typeTimer);
      swing.removeEventListener('pointerdown', onDown);
      swing.removeEventListener('pointermove', onMove);
      swing.removeEventListener('pointerup', onUp);
      swing.removeEventListener('pointercancel', onCancel);
      swing.removeEventListener('keydown', onKey);
    };
  }, [description]);   // re-runs if you navigate to a different person

  return { stageRef, strapRef, swingRef, flipRef, descRef };
}