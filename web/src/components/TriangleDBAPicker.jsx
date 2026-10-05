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

const INTERVAL_MS = 4200;

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

/**
 * Three face-forward triangles: center is larger.
 * Moves automatically and by click / drag / arrows.
 */
export function TriangleDBAPicker() {
  const [active, setActive] = useState(1);
  const activeRef = useRef(1);
  const paused = useRef(false);
  const hoverPaused = useRef(false);
  const focusPaused = useRef(false);
  const drag = useRef({ x: 0, pointerId: null, moved: false });
  const suppressClick = useRef(false);

  const syncPause = useCallback(() => {
    paused.current = hoverPaused.current || focusPaused.current;
  }, []);

  const goTo = useCallback((next) => {
    const normalized = wrapIndex(next);
    activeRef.current = normalized;
    setActive(normalized);
  }, []);

  const step = useCallback((dir) => {
    goTo(activeRef.current + dir);
  }, [goTo]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return undefined;
    const id = window.setInterval(() => {
      if (!paused.current) step(1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [step, active]);

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

  return (
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
      onMouseEnter={() => {
        hoverPaused.current = true;
        syncPause();
      }}
      onMouseLeave={() => {
        hoverPaused.current = false;
        syncPause();
      }}
      onFocus={() => {
        focusPaused.current = true;
        syncPause();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          focusPaused.current = false;
          syncPause();
        }
      }}
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
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
