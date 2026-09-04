/** Equilateral geometry — equal-area corners (same as JM / ALMS) */
const A = [200, 36];
const B = [40, 320];
const C = [360, 320];
const G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];

const M_AB = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
const M_BC = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];
const M_CA = [(C[0] + A[0]) / 2, (C[1] + A[1]) / 2];

const THIRDS = [
  {
    id: 'listen',
    label: 'Listen',
    path: `M ${A.join(' ')} L ${M_AB.join(' ')} L ${G.join(' ')} L ${M_CA.join(' ')} Z`,
    labelX: (A[0] + M_AB[0] + G[0] + M_CA[0]) / 4,
    labelY: (A[1] + M_AB[1] + G[1] + M_CA[1]) / 4,
  },
  {
    id: 'produce',
    label: 'Produce',
    path: `M ${B.join(' ')} L ${M_BC.join(' ')} L ${G.join(' ')} L ${M_AB.join(' ')} Z`,
    labelX: (B[0] + M_BC[0] + G[0] + M_AB[0]) / 4,
    labelY: (B[1] + M_BC[1] + G[1] + M_AB[1]) / 4 + 4,
  },
  {
    id: 'release',
    label: 'Release',
    path: `M ${C.join(' ')} L ${M_CA.join(' ')} L ${G.join(' ')} L ${M_BC.join(' ')} Z`,
    labelX: (C[0] + M_CA[0] + G[0] + M_BC[0]) / 4,
    labelY: (C[1] + M_CA[1] + G[1] + M_BC[1]) / 4 + 4,
  },
];

/** Headphones — primary center icon (studio / listening) */
function HeadphonesIcon({ x, y }) {
  return (
    <g className="monkey-triangle-headphones" transform={`translate(${x}, ${y})`} aria-hidden="true">
      <path
        d="M8 28 C8 12 20 4 36 4 C52 4 64 12 64 28"
        fill="none"
        stroke="#e8c96a"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <rect x="2" y="26" width="16" height="26" rx="6" fill="#c9a227" stroke="#8b6914" strokeWidth="1.5" />
      <rect x="54" y="26" width="16" height="26" rx="6" fill="#c9a227" stroke="#8b6914" strokeWidth="1.5" />
      <rect x="5" y="30" width="10" height="18" rx="3" fill="#1a1208" />
      <rect x="57" y="30" width="10" height="18" rx="3" fill="#1a1208" />
    </g>
  );
}

/**
 * Mic near apex — intentionally secondary / dimmed.
 * Flipped vs older Monkey art that put the mic in the center.
 */
function DimMicIcon() {
  return (
    <g className="monkey-triangle-mic-dim" transform="translate(186, 48)" opacity="0.32" aria-hidden="true">
      <rect x="10" y="4" width="12" height="22" rx="6" fill="#c9a227" />
      <rect x="13" y="26" width="6" height="10" fill="#e8c96a" />
      <rect x="6" y="34" width="20" height="4" rx="1" fill="#c9a227" />
    </g>
  );
}

export function MonkeyStudiosTriangle({ active, onSelect, className = '' }) {
  return (
    <div className={`jm-triangle monkey-triangle ${className}`.trim()}>
      <svg
        className="jm-triangle-svg"
        viewBox="0 0 400 360"
        role="img"
        aria-label="100th Monkey Studios triangle: Listen, Produce, Release — equal sections"
      >
        <defs>
          <linearGradient id="monkey-tri-fill" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#2d4a2a" />
            <stop offset="45%" stopColor="#1a2e18" />
            <stop offset="100%" stopColor="#0a1208" />
          </linearGradient>
          <linearGradient id="monkey-tri-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8c96a" />
            <stop offset="50%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
          <filter id="monkey-tri-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#6b7f5a" floodOpacity="0.4" />
          </filter>
          <radialGradient id="monkey-head-glow" cx="50%" cy="48%" r="42%">
            <stop offset="0%" stopColor="rgba(201, 162, 39, 0.4)" />
            <stop offset="100%" stopColor="rgba(201, 162, 39, 0)" />
          </radialGradient>
        </defs>

        <polygon
          points={`${A.join(',')} ${B.join(',')} ${C.join(',')}`}
          fill="url(#monkey-tri-fill)"
          stroke="url(#monkey-tri-stroke)"
          strokeWidth="10"
          strokeLinejoin="round"
          filter="url(#monkey-tri-glow)"
        />

        <circle cx={G[0]} cy={G[1]} r="72" fill="url(#monkey-head-glow)" />

        <DimMicIcon />

        {THIRDS.map((s) => {
          const isActive = active === s.id;
          return (
            <g key={s.id}>
              <path
                d={s.path}
                className={`jm-triangle-region ${isActive ? 'is-active' : ''}`}
                fill={isActive ? 'rgba(107, 127, 90, 0.4)' : 'rgba(255,255,255,0.04)'}
                stroke="rgba(201, 162, 39, 0.35)"
                strokeWidth="1.25"
                role="button"
                tabIndex={0}
                aria-label={`Open ${s.label}`}
                aria-pressed={isActive}
                onClick={() => onSelect?.(s.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect?.(s.id);
                  }
                }}
              />
              <text
                x={s.labelX}
                y={s.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`jm-triangle-label ${isActive ? 'is-active' : ''}`}
                style={{ pointerEvents: 'none' }}
              >
                {s.label}
              </text>
            </g>
          );
        })}

        <HeadphonesIcon x={G[0] - 36} y={G[1] - 30} />
      </svg>
    </div>
  );
}
