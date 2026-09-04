import { useEffect, useId, useState } from 'react';

export const DISCIPLINES = ['Piano', 'Voice', 'Guitar', 'Bass', 'Ukulele', 'Percussion', 'Studio'];

/**
 * Seven-discipline dial. Rotates once on mount (unless paused), then stays
 * stationary so the page can be screenshotted for review.
 */
export function DisciplineWheel({
  paused: pausedProp,
  onPausedChange,
  size = 'lg',
  className = '',
  showControls = true,
  autoRotateOnce = true,
}) {
  const uid = useId();
  const [internalPaused, setInternalPaused] = useState(!autoRotateOnce);
  const [spinDone, setSpinDone] = useState(!autoRotateOnce);
  const [spinKey, setSpinKey] = useState(0);
  const paused = pausedProp ?? internalPaused;

  function setPaused(next) {
    if (onPausedChange) onPausedChange(next);
    else setInternalPaused(next);
  }

  useEffect(() => {
    if (!autoRotateOnce || paused || spinDone) return undefined;
    const t = window.setTimeout(() => {
      setSpinDone(true);
      if (onPausedChange) onPausedChange(true);
      else setInternalPaused(true);
    }, 4200);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRotateOnce, paused, spinDone, spinKey]);

  const r = 38;
  const spinning = autoRotateOnce && !paused && !spinDone;

  function handleControlClick() {
    if (paused || spinDone) {
      setSpinDone(false);
      setPaused(false);
      setSpinKey((k) => k + 1);
      return;
    }
    setPaused(true);
    setSpinDone(true);
  }

  return (
    <div className={`wam-wheel-wrap ${className}`.trim()}>
      <div
        key={spinKey}
        className={[
          'wam-wheel',
          size === 'sm' ? 'wam-wheel--sm' : '',
          spinning ? 'wam-wheel--spin-once' : '',
          paused || spinDone ? 'wam-wheel--stationary' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        role="img"
        aria-label="Seven disciplines: Piano, Voice, Guitar, Bass, Ukulele, Percussion, Studio"
      >
        {DISCIPLINES.map((label, idx) => {
          const angle = (idx / DISCIPLINES.length) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + r * Math.cos(angle);
          const y = 50 + r * Math.sin(angle);
          return (
            <div
              key={label}
              className="wam-wheel-item"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {label}
            </div>
          );
        })}
        <div className="wam-wheel-center">
          <span>
            JM
            <br />
            Method
          </span>
        </div>
      </div>

      {showControls && (
        <div className="wam-wheel-controls">
          <button
            type="button"
            className="wam-wheel-pause"
            aria-pressed={paused || spinDone}
            aria-controls={uid}
            onClick={handleControlClick}
          >
            {paused || spinDone ? 'Replay spin' : 'Pause dial'}
          </button>
          <span className="wam-wheel-hint" id={uid}>
            {paused || spinDone ? 'Stationary for screenshots' : 'Spinning once…'}
          </span>
        </div>
      )}
    </div>
  );
}
