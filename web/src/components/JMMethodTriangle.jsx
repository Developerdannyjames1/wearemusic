/** Equilateral outer triangle */
const A = [200, 36]; // top
const B = [40, 320]; // bottom-left
const C = [360, 320]; // bottom-right
const G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3]; // centroid

const M_AB = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
const M_BC = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];
const M_CA = [(C[0] + A[0]) / 2, (C[1] + A[1]) / 2];

/**
 * Three equal-area corner regions (vertex → adjacent midpoints → centroid).
 * Keeps Discipline / Creativity / Harmony visually equal — no larger “lead” side.
 */
const THIRDS = [
  {
    id: 'discipline',
    label: 'Discipline',
    path: `M ${A.join(' ')} L ${M_AB.join(' ')} L ${G.join(' ')} L ${M_CA.join(' ')} Z`,
    labelX: (A[0] + M_AB[0] + G[0] + M_CA[0]) / 4,
    labelY: (A[1] + M_AB[1] + G[1] + M_CA[1]) / 4,
  },
  {
    id: 'creativity',
    label: 'Creativity',
    path: `M ${B.join(' ')} L ${M_BC.join(' ')} L ${G.join(' ')} L ${M_AB.join(' ')} Z`,
    labelX: (B[0] + M_BC[0] + G[0] + M_AB[0]) / 4,
    labelY: (B[1] + M_BC[1] + G[1] + M_AB[1]) / 4 + 4,
  },
  {
    id: 'harmony',
    label: 'Harmony',
    path: `M ${C.join(' ')} L ${M_CA.join(' ')} L ${G.join(' ')} L ${M_BC.join(' ')} Z`,
    labelX: (C[0] + M_CA[0] + G[0] + M_BC[0]) / 4,
    labelY: (C[1] + M_CA[1] + G[1] + M_BC[1]) / 4 + 4,
  },
];

export function JMMethodTriangle({ active, onSelect, className = '' }) {
  return (
    <div className={`jm-triangle ${className}`.trim()}>
      <svg
        className="jm-triangle-svg"
        viewBox="0 0 400 360"
        role="img"
        aria-label="JM Method triangle: Discipline, Creativity, Harmony — equal sections"
      >
        <defs>
          <linearGradient id="jm-tri-fill" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#5a1878" />
            <stop offset="55%" stopColor="#2a0a48" />
            <stop offset="100%" stopColor="#1a0530" />
          </linearGradient>
          <linearGradient id="jm-tri-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8c96a" />
            <stop offset="50%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
          <filter id="jm-tri-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#c9a227" floodOpacity="0.35" />
          </filter>
        </defs>

        <polygon
          points={`${A.join(',')} ${B.join(',')} ${C.join(',')}`}
          fill="url(#jm-tri-fill)"
          stroke="url(#jm-tri-stroke)"
          strokeWidth="10"
          strokeLinejoin="round"
          filter="url(#jm-tri-glow)"
        />

        {THIRDS.map((s) => {
          const isActive = active === s.id;
          return (
            <g key={s.id}>
              <path
                d={s.path}
                className={`jm-triangle-region ${isActive ? 'is-active' : ''}`}
                fill={isActive ? 'rgba(201, 162, 39, 0.28)' : 'rgba(255,255,255,0.03)'}
                stroke="rgba(201, 162, 39, 0.32)"
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

        {/* Keyboard icon sits at centroid — foreground anchor, not a fourth section */}
        <g
          className="jm-triangle-keyboard"
          transform={`translate(${G[0] - 34}, ${G[1] - 20})`}
          aria-hidden="true"
        >
          <rect x="0" y="0" width="68" height="40" rx="4" fill="#12080a" stroke="#c9a227" strokeWidth="2" />
          {[5, 14, 23, 32, 41, 50].map((x) => (
            <rect key={x} x={x} y="7" width="7" height="26" rx="1" fill="#e8d5a3" />
          ))}
          {[10, 19, 37, 46].map((x) => (
            <rect key={`b-${x}`} x={x} y="7" width="5" height="15" rx="0.5" fill="#0a0604" />
          ))}
        </g>
      </svg>
    </div>
  );
}
