import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const DBAS = [
  {
    to: '/jm-method',
    title: 'JM Method',
    image: '/triangles/triangle-piano.png',
  },
  {
    to: '/alms-entertainment',
    title: 'ALMS Entertainment',
    image: '/triangles/triangle-mic.png',
  },
  {
    to: '/100th-monkey-studios',
    title: '100th Monkey Studios',
    image: '/triangles/triangle-headphone.png',
  },
];

function wrapIndex(n) {
  return ((n % DBAS.length) + DBAS.length) % DBAS.length;
}

/** Shortest signed slot offset in -1 | 0 | 1 for 3 items */
function coverOffset(index, active) {
  let diff = index - active;
  if (diff > 1) diff -= DBAS.length;
  if (diff < -1) diff += DBAS.length;
  return diff;
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Three face-forward triangles: center is larger.
 * Rotates as you scroll through the section; also click / drag / arrows.
 */
export function TriangleDBAPicker() {
  const [active, setActive] = useState(0);
  const [scrollDriven] = useState(() => !prefersReducedMotion());
  const activeRef = useRef(0);
  const trackRef = useRef(null);
  const drag = useRef({ x: 0, pointerId: null, moved: false });
  const suppressClick = useRef(false);
  const manualUntil = useRef(0);

  const goTo = useCallback((next) => {
    const normalized = wrapIndex(next);
    activeRef.current = normalized;
    setActive(normalized);
  }, []);

  const step = useCallback(
    (dir) => {
      manualUntil.current = Date.now() + 900;
      goTo(activeRef.current + dir);
    },
    [goTo]
  );

  useEffect(() => {
    if (!scrollDriven) return undefined;

    const track = trackRef.current;
    if (!track) return undefined;

    let ticking = false;

    function syncFromScroll() {
      ticking = false;
      if (Date.now() < manualUntil.current) return;

      const rect = track.getBoundingClientRect();
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), travel);
      const progress = scrolled / travel;

      // One full rotation through all three as the section is scrolled
      const idx = Math.min(DBAS.length - 1, Math.floor(progress * DBAS.length));
      if (idx !== activeRef.current) goTo(idx);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(syncFromScroll);
      }
    }

    syncFromScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [goTo, scrollDriven]);

  function onPointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    drag.current = { x: event.clientX, pointerId: event.pointerId, moved: false };
  }

  function onPointerMove(event) {
    if (drag.current.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.current.x;
    if (!drag.current.moved && Math.abs(dx) > 10) {
      drag.current.moved = true;
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        /* ignore */
      }
    }
  }

  function onPointerUp(event) {
    if (drag.current.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.current.x;
    const moved = drag.current.moved;
    drag.current.pointerId = null;
    drag.current.moved = false;
    if (moved && Math.abs(dx) > 48) {
      suppressClick.current = true;
      step(dx < 0 ? 1 : -1);
    }
  }

  function onKeyDown(event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    }
  }

  const coverflow = (
    <div
      className="wam-coverflow"
      role="region"
      aria-roledescription="carousel"
      aria-label="Three ways we serve music"
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="wam-coverflow-stage">
        {DBAS.map((dba, index) => {
          const offset = coverOffset(index, active);
          const isCenter = offset === 0;
          const place = isCenter ? 'is-center' : offset < 0 ? 'is-left' : 'is-right';

          return (
            <Link
              key={dba.to}
              to={dba.to}
              className={`wam-coverflow-slide ${place}`}
              aria-current={isCenter ? 'true' : undefined}
              aria-label={dba.title}
              onClick={(event) => {
                if (suppressClick.current) {
                  event.preventDefault();
                  suppressClick.current = false;
                  return;
                }
                if (!isCenter) {
                  event.preventDefault();
                  manualUntil.current = Date.now() + 900;
                  goTo(index);
                }
              }}
            >
              <img src={dba.image} alt="" className="wam-coverflow-image" draggable="false" />
            </Link>
          );
        })}
      </div>

      <div className="wam-coverflow-labels" aria-hidden="true">
        {[-1, 0, 1].map((slot) => {
          const index = wrapIndex(active + slot);
          return (
            <span
              key={slot}
              className={`wam-triangle-image-title wam-coverflow-label${slot === 0 ? ' is-active' : ''}`}
            >
              {DBAS[index].title}
            </span>
          );
        })}
      </div>

      <div className="wam-coverflow-dots" role="tablist" aria-label="Choose a division">
        {DBAS.map((dba, index) => (
          <button
            key={dba.to}
            type="button"
            role="tab"
            aria-label={dba.title}
            aria-selected={index === active}
            className={index === active ? 'is-active' : undefined}
            onClick={() => {
              manualUntil.current = Date.now() + 900;
              goTo(index);
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div
      ref={trackRef}
      className={`wam-coverflow-track${scrollDriven ? ' is-scroll-driven' : ''}`}
    >
      <div className="wam-coverflow-sticky container">
        <p className="marketing-section-title text-center home-divisions-kicker">
          Three ways we serve music
        </p>
        {coverflow}
      </div>
    </div>
  );
}
