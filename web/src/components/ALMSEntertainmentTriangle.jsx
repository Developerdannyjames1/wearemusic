/** Equilateral outer triangle — same equal-area geometry as JM Method */
const A = [200, 36];
const B = [40, 320];
const C = [360, 320];
const G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];

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
      <ellipse cx="28" cy="10" rx="16" ry="10" fill="#1a0a12" stroke="#e8c96a" strokeWidth="2.5" />
      <rect x="20" y="10" width="16" height="28" rx="8" fill="#c9a227" stroke="#8b6914" strokeWidth="1.5" />
      <ellipse cx="28" cy="10" rx="10" ry="6" fill="#2a1018" opacity="0.85" />
      {[18, 22, 26, 30, 34].map((yy) => (
        <line key={yy} x1="22" y1={yy} x2="34" y2={yy} stroke="#5a3a10" strokeWidth="1" opacity="0.55" />
      ))}
      <rect x="25" y="38" width="6" height="14" rx="1" fill="#e8c96a" />
      <rect x="16" y="50" width="24" height="5" rx="2" fill="#c9a227" />
      <circle cx="28" cy="28" r="22" fill="rgba(222, 37, 116, 0.18)" />
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
        fill="#c9a227"
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
          <linearGradient id="alms-tri-fill" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#6a1848" />
            <stop offset="50%" stopColor="#3b024f" />
            <stop offset="100%" stopColor="#1a0130" />
          </linearGradient>
          <linearGradient id="alms-tri-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8c96a" />
            <stop offset="50%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#8b6914" />
          </linearGradient>
          <filter id="alms-tri-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#de2574" floodOpacity="0.28" />
          </filter>
          <radialGradient id="alms-mic-glow" cx="50%" cy="45%" r="45%">
            <stop offset="0%" stopColor="rgba(222, 37, 116, 0.45)" />
            <stop offset="100%" stopColor="rgba(222, 37, 116, 0)" />
          </radialGradient>
        </defs>

        <polygon
          points={`${A.join(',')} ${B.join(',')} ${C.join(',')}`}
          fill="url(#alms-tri-fill)"
          stroke="url(#alms-tri-stroke)"
          strokeWidth="10"
          strokeLinejoin="round"
          filter="url(#alms-tri-glow)"
        />

        <circle cx={G[0]} cy={G[1]} r="70" fill="url(#alms-mic-glow)" />

        <DimTrebleClef />

        {THIRDS.map((s) => {
          const isActive = active === s.id;
          return (
            <g key={s.id}>
              <path
                d={s.path}
                className={`jm-triangle-region ${isActive ? 'is-active' : ''}`}
                fill={isActive ? 'rgba(222, 37, 116, 0.28)' : 'rgba(255,255,255,0.03)'}
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

        <MicIcon x={G[0] - 28} y={G[1] - 28} />
      </svg>
    </div>
  );
}
