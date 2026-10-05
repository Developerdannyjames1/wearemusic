/** Equilateral outer triangle — same equal-area geometry as JM Method */
const A = [200, 36];
const B = [40, 320];
const C = [360, 320];
const G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
const TRI = `${A.join(',')} ${B.join(',')} ${C.join(',')}`;

const M_AB = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
const M_BC = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];
const M_CA = [(C[0] + A[0]) / 2, (C[1] + A[1]) / 2];

const THIRDS = [
  {
    id: 'inspire',
    label: 'Inspire',
    path: `M ${A.join(' ')} L ${M_AB.join(' ')} L ${G.join(' ')} L ${M_CA.join(' ')} Z`,
    labelX: (A[0] + M_AB[0] + G[0] + M_CA[0]) / 4,
    labelY: (A[1] + M_AB[1] + G[1] + M_CA[1]) / 4,
  },
  {
    id: 'share',
    label: 'Share',
    path: `M ${B.join(' ')} L ${M_BC.join(' ')} L ${G.join(' ')} L ${M_AB.join(' ')} Z`,
    labelX: (B[0] + M_BC[0] + G[0] + M_AB[0]) / 4,
    labelY: (B[1] + M_BC[1] + G[1] + M_AB[1]) / 4 + 4,
  },
  {
    id: 'heal',
    label: 'Heal',
    path: `M ${C.join(' ')} L ${M_CA.join(' ')} L ${G.join(' ')} L ${M_BC.join(' ')} Z`,
    labelX: (C[0] + M_CA[0] + G[0] + M_BC[0]) / 4,
    labelY: (C[1] + M_CA[1] + G[1] + M_BC[1]) / 4 + 4,
  },
];

/** Vintage mic at centroid — primary focus */
function MicIcon({ x, y }) {
  return (
    <g className="alms-triangle-mic" transform={`translate(${x}, ${y})`} aria-hidden="true">
      <ellipse cx="28" cy="10" rx="16" ry="10" fill="#1a0a06" stroke="#fbbf24" strokeWidth="2.5" />
      <rect x="20" y="10" width="16" height="28" rx="8" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
      <ellipse cx="28" cy="10" rx="10" ry="6" fill="#2a1208" opacity="0.85" />
      {[18, 22, 26, 30, 34].map((yy) => (
        <line key={yy} x1="22" y1={yy} x2="34" y2={yy} stroke="#7c2d12" strokeWidth="1" opacity="0.55" />
      ))}
      <rect x="25" y="38" width="6" height="14" rx="1" fill="#fde68a" />
      <rect x="16" y="50" width="24" height="5" rx="2" fill="#f59e0b" />
      <circle cx="28" cy="28" r="22" fill="rgba(249, 115, 22, 0.2)" />
    </g>
  );
}

/** Treble clef near apex — intentionally faded so mic stays primary */
function DimTrebleClef() {
  return (
    <g className="alms-triangle-clef" transform="translate(178, 52)" opacity="0.28" aria-hidden="true">
      <text
        x="22"
        y="48"
        textAnchor="middle"
        fill="#fbbf24"
        fontSize="52"
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        𝄞
      </text>
    </g>
  );
}

export function ALMSEntertainmentTriangle({ active, onSelect, className = '' }) {
  return (
    <div className={`jm-triangle alms-triangle ${className}`.trim()}>
      <svg
        className="jm-triangle-svg"
        viewBox="0 0 400 360"
        role="img"
        aria-label="ALMS Entertainment triangle: Inspire, Share, Heal — equal sections"
      >
        <defs>
          <linearGradient id="alms-tri-sky" x1="50%" y1="0%" x2="50%" y2="70%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="35%" stopColor="#4c6ef5" />
            <stop offset="62%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <linearGradient id="alms-tri-dunes" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="55%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="alms-tri-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="40%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <radialGradient id="alms-tri-burst" cx="50%" cy="42%" r="38%">
            <stop offset="0%" stopColor="rgba(255, 237, 213, 0.95)" />
            <stop offset="45%" stopColor="rgba(251, 146, 60, 0.55)" />
            <stop offset="100%" stopColor="rgba(79, 70, 229, 0)" />
          </radialGradient>
          <filter id="alms-tri-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#f59e0b" floodOpacity="0.45" />
          </filter>
          <clipPath id="alms-tri-clip">
            <polygon points={TRI} />
          </clipPath>
        </defs>

        <g filter="url(#alms-tri-glow)">
          <g clipPath="url(#alms-tri-clip)">
            <polygon points={TRI} fill="url(#alms-tri-sky)" />
            <circle cx="200" cy="150" r="110" fill="url(#alms-tri-burst)" />
            <path
              d="M20 300 C90 250 130 268 170 278 C210 288 240 250 280 262 C320 274 350 290 390 305 L390 360 L10 360 Z"
              fill="url(#alms-tri-dunes)"
              opacity="0.95"
            />
            <path
              d="M10 318 C95 290 140 300 190 308 C240 316 290 292 390 315 L390 360 L10 360 Z"
              fill="#fcd34d"
              opacity="0.55"
            />
          </g>
          <polygon
            points={TRI}
            fill="none"
            stroke="url(#alms-tri-stroke)"
            strokeWidth="12"
            strokeLinejoin="round"
          />
        </g>

        <DimTrebleClef />

        {THIRDS.map((s) => {
          const isActive = active === s.id;
          return (
            <g key={s.id}>
              <path
                d={s.path}
                className={`jm-triangle-region ${isActive ? 'is-active' : ''}`}
                fill={isActive ? 'rgba(251, 191, 36, 0.28)' : 'rgba(255,255,255,0.06)'}
                stroke="rgba(254, 243, 199, 0.45)"
                strokeWidth="1.5"
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

        <MicIcon x={G[0] - 28} y={G[1] - 28} />
      </svg>
    </div>
  );
}
