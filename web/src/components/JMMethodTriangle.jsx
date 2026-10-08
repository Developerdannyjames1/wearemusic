import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/** Equilateral outer triangle */
const A = [200, 36]; // top
const B = [40, 320]; // bottom-left
const C = [360, 320]; // bottom-right
const G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];

const M_AB = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
const M_BC = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];
const M_CA = [(C[0] + A[0]) / 2, (C[1] + A[1]) / 2];

/**
 * Three equal-area corners:
 * top = Harmony · left = Discipline · right = Creativity
 */
const THIRDS = [
  {
    id: 'harmony',
    label: 'Harmony',
    corner: 'top',
    path: `M ${A.join(' ')} L ${M_AB.join(' ')} L ${G.join(' ')} L ${M_CA.join(' ')} Z`,
    labelX: (A[0] + M_AB[0] + G[0] + M_CA[0]) / 4,
    labelY: (A[1] + M_AB[1] + G[1] + M_CA[1]) / 4,
    menu: [
      { label: 'Listen', action: 'section' },
      { label: 'Book', action: 'section' },
      { label: 'Partner With Us', to: '/partner-with-us' },
    ],
  },
  {
    id: 'discipline',
    label: 'Discipline',
    corner: 'left',
    path: `M ${B.join(' ')} L ${M_BC.join(' ')} L ${G.join(' ')} L ${M_AB.join(' ')} Z`,
    labelX: (B[0] + M_BC[0] + G[0] + M_AB[0]) / 4,
    labelY: (B[1] + M_BC[1] + G[1] + M_AB[1]) / 4 + 4,
    menu: [
      { label: 'Instruments', action: 'section' },
      { label: 'Programs', action: 'section' },
      { label: 'Partner With Us', to: '/partner-with-us' },
    ],
  },
  {
    id: 'creativity',
    label: 'Creativity',
    corner: 'right',
    path: `M ${C.join(' ')} L ${M_CA.join(' ')} L ${G.join(' ')} L ${M_BC.join(' ')} Z`,
    labelX: (C[0] + M_CA[0] + G[0] + M_BC[0]) / 4,
    labelY: (C[1] + M_CA[1] + G[1] + M_BC[1]) / 4 + 4,
    menu: [
      { label: 'Songs', action: 'section' },
      { label: 'Learn', action: 'section' },
      { label: 'Partner With Us', to: '/partner-with-us' },
    ],
  },
];

export function JMMethodTriangle({ active, onSelect, className = '' }) {
  const [hoverId, setHoverId] = useState(null);
  const leaveTimer = useRef(null);

  function openMenu(id) {
    if (leaveTimer.current) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setHoverId(id);
  }

  function scheduleClose() {
    if (leaveTimer.current) window.clearTimeout(leaveTimer.current);
    leaveTimer.current = window.setTimeout(() => setHoverId(null), 140);
  }

  return (
    <div
      className={`jm-triangle ${className}`.trim()}
      onMouseLeave={scheduleClose}
    >
      <svg
        className="jm-triangle-svg"
        viewBox="0 0 400 360"
        role="img"
        aria-label="JM Method triangle: Harmony, Discipline, Creativity — equal sections"
      >
        <defs>
          <linearGradient id="jm-tri-fill" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#7a2a9e" />
            <stop offset="45%" stopColor="#3d1058" />
            <stop offset="100%" stopColor="#220838" />
          </linearGradient>
          <linearGradient id="jm-tri-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0d78a" />
            <stop offset="50%" stopColor="#d4ae35" />
            <stop offset="100%" stopColor="#a07a1c" />
          </linearGradient>
          <filter id="jm-tri-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#c9a227" floodOpacity="0.55" />
          </filter>
        </defs>

        <polygon
          points={`${A.join(',')} ${B.join(',')} ${C.join(',')}`}
          fill="url(#jm-tri-fill)"
          stroke="url(#jm-tri-stroke)"
          strokeWidth="12"
          strokeLinejoin="round"
          filter="url(#jm-tri-glow)"
        />

        {THIRDS.map((s) => {
          const lit = hoverId === s.id || active === s.id;
          return (
            <g key={s.id}>
              <path
                d={s.path}
                className={`jm-triangle-region${lit ? ' is-lit' : ''}${active === s.id ? ' is-active' : ''}`}
                fill={lit ? 'rgba(201, 162, 39, 0.38)' : 'rgba(255,255,255,0.07)'}
                stroke="rgba(232, 213, 163, 0.45)"
                strokeWidth="1.5"
                role="button"
                tabIndex={0}
                aria-label={`${s.label} menu`}
                aria-expanded={hoverId === s.id}
                onMouseEnter={() => openMenu(s.id)}
                onFocus={() => openMenu(s.id)}
                onClick={() => onSelect?.(s.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openMenu(s.id);
                    onSelect?.(s.id);
                  }
                }}
              />
              <text
                x={s.labelX}
                y={s.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`jm-triangle-label${lit ? ' is-active' : ''}`}
                style={{ pointerEvents: 'none' }}
              >
                {s.label}
              </text>
            </g>
          );
        })}

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

      {THIRDS.map((s) => (
        <div
          key={`${s.id}-menu`}
          className={`jm-tri-flyout jm-tri-flyout--${s.corner}${hoverId === s.id ? ' is-open' : ''}`}
          onMouseEnter={() => openMenu(s.id)}
          onMouseLeave={scheduleClose}
        >
          <p className="jm-tri-flyout-title">{s.label}</p>
          <ul className="jm-tri-flyout-list">
            {s.menu.map((item) => (
              <li key={item.label}>
                {item.to ? (
                  <Link to={item.to} className="jm-tri-flyout-link">
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="jm-tri-flyout-link"
                    onClick={() => onSelect?.(s.id)}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
