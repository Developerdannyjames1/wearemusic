import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Crisp vector hero mark — sunrise/sunset triangle with three equal DBA regions.
 * Top → 100th Monkey · Left → JM Method · Right → ALMS
 */
const A = [200, 18];
const B = [18, 340];
const C = [382, 340];
const G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
const TRI_POINTS = `${A.join(',')} ${B.join(',')} ${C.join(',')}`;

const M_AB = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
const M_BC = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];
const M_CA = [(C[0] + A[0]) / 2, (C[1] + A[1]) / 2];

const THIRDS = [
  {
    id: 'monkey',
    label: '100th Monkey Studios',
    corner: 'top',
    to: '/100th-monkey-studios',
    path: `M ${A.join(' ')} L ${M_AB.join(' ')} L ${G.join(' ')} L ${M_CA.join(' ')} Z`,
    icon: {
      href: '/triangles/icons/headphones.png',
      x: 178,
      y: 92,
      width: 44,
      height: 46,
    },
    labelX: (A[0] + M_AB[0] + G[0] + M_CA[0]) / 4,
    labelY: (A[1] + M_AB[1] + G[1] + M_CA[1]) / 4 + 28,
    menu: [
      { label: 'Share', to: '/100th-monkey-studios' },
      { label: 'Stream', to: '/100th-monkey-studios' },
      { label: 'Partner With Us', to: '/partner-with-us' },
    ],
  },
  {
    id: 'jm',
    label: 'The JM Method',
    corner: 'left',
    to: '/jm-method',
    path: `M ${B.join(' ')} L ${M_BC.join(' ')} L ${G.join(' ')} L ${M_AB.join(' ')} Z`,
    icon: {
      href: '/triangles/icons/piano.png',
      x: 74,
      y: 258,
      width: 50,
      height: 40,
    },
    labelX: (B[0] + M_BC[0] + G[0] + M_AB[0]) / 4,
    labelY: (B[1] + M_BC[1] + G[1] + M_AB[1]) / 4 - 8,
    menu: [
      { label: 'Inspire', to: '/jm-method' },
      { label: 'Learn', to: '/jm-method' },
      { label: 'Partner With Us', to: '/partner-with-us' },
    ],
  },
  {
    id: 'alms',
    label: 'ALMS Entertainment',
    corner: 'right',
    to: '/alms-entertainment',
    path: `M ${C.join(' ')} L ${M_CA.join(' ')} L ${G.join(' ')} L ${M_BC.join(' ')} Z`,
    icon: {
      href: '/triangles/icons/mic.png',
      x: 292,
      y: 250,
      width: 34,
      height: 56,
    },
    labelX: (C[0] + M_CA[0] + G[0] + M_BC[0]) / 4,
    labelY: (C[1] + M_CA[1] + G[1] + M_BC[1]) / 4 - 8,
    menu: [
      { label: 'Heal', to: '/alms-entertainment' },
      { label: 'Listen', to: '/alms-entertainment' },
      { label: 'Partner With Us', to: '/partner-with-us' },
    ],
  },
];

export function HeroBrandMark({ className = '', highlightId = null }) {
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
    leaveTimer.current = window.setTimeout(() => setHoverId(null), 220);
  }

  return (
    <div
      className={`jm-triangle hero-brand-triangle ${className}`.trim()}
      onMouseLeave={scheduleClose}
    >
      <svg
        className="hero-brand-mark home-hero-mark"
        viewBox="0 0 400 360"
        role="img"
        aria-label="We Are Music — 100th Monkey Studios, The JM Method, ALMS Entertainment"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        <defs>
          <linearGradient id="hero-sky" x1="50%" y1="0%" x2="50%" y2="70%">
            <stop offset="0%" stopColor="var(--wam-indigo-deep)" />
            <stop offset="28%" stopColor="var(--wam-indigo)" />
            <stop offset="58%" stopColor="var(--wam-orange)" />
            <stop offset="100%" stopColor="var(--wam-gold)" />
          </linearGradient>
          <linearGradient id="hero-dunes" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--wam-cream)" />
            <stop offset="45%" stopColor="var(--wam-gold)" />
            <stop offset="100%" stopColor="var(--wam-rust)" />
          </linearGradient>
          <linearGradient id="hero-border" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--wam-cream)" />
            <stop offset="45%" stopColor="var(--wam-gold)" />
            <stop offset="100%" stopColor="var(--wam-rust)" />
          </linearGradient>
          <radialGradient id="hero-burst" cx="50%" cy="42%" r="38%">
            <stop offset="0%" stopColor="rgba(255, 248, 240, 0.95)" />
            <stop offset="40%" stopColor="rgba(249, 115, 22, 0.55)" />
            <stop offset="100%" stopColor="rgba(30, 27, 75, 0)" />
          </radialGradient>
          <filter id="hero-soft" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#f0b429" floodOpacity="0.42" />
          </filter>
          <filter id="hero-icon-look" x="-55%" y="-55%" width="210%" height="210%" colorInterpolationFilters="sRGB">
            <feMorphology in="SourceGraphic" operator="dilate" radius="1.5" result="halo" />
            <feColorMatrix
              in="halo"
              type="matrix"
              values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.9 0"
              result="blackRim"
            />
            <feGaussianBlur in="blackRim" stdDeviation="0.9" result="softBlack" />
            <feDropShadow
              in="SourceGraphic"
              dx="0"
              dy="1.5"
              stdDeviation="1.4"
              floodColor="#000000"
              floodOpacity="0.65"
              result="depth"
            />
            <feMerge>
              <feMergeNode in="softBlack" />
              <feMergeNode in="depth" />
            </feMerge>
          </filter>
          <clipPath id="hero-fill-clip">
            <polygon points={TRI_POINTS} />
          </clipPath>
        </defs>

        <polygon
          points={TRI_POINTS}
          fill="none"
          stroke="var(--wam-gold)"
          strokeWidth="22"
          strokeLinejoin="round"
          opacity="0.28"
          filter="url(#hero-soft)"
        />

        <g clipPath="url(#hero-fill-clip)">
          <polygon points={TRI_POINTS} fill="url(#hero-sky)" />
          <circle cx="200" cy="150" r="110" fill="url(#hero-burst)" />
          <path
            d="M20 300 C90 250 130 268 170 278 C210 288 240 250 280 262 C320 274 350 290 390 305 L390 360 L10 360 Z"
            fill="url(#hero-dunes)"
            opacity="0.95"
          />
          <path
            d="M10 318 C95 290 140 300 190 308 C240 316 290 292 390 315 L390 360 L10 360 Z"
            fill="var(--wam-gold)"
            opacity="0.45"
          />
        </g>

        <polygon
          points={TRI_POINTS}
          fill="none"
          stroke="url(#hero-border)"
          strokeWidth="16"
          strokeLinejoin="round"
          paintOrder="stroke"
        />

        {THIRDS.map((s) => {
          const lit = hoverId === s.id || highlightId === s.id;
          const menuOpen = hoverId === s.id;
          return (
            <g key={s.id} className={`hero-brand-region${lit ? ' is-lit' : ''}`}>
              <path
                d={s.path}
                className={`jm-triangle-region${lit ? ' is-lit' : ''}`}
                fill={lit ? 'rgba(240, 180, 41, 0.32)' : 'rgba(255,255,255,0.04)'}
                stroke="rgba(254, 243, 199, 0.35)"
                strokeWidth="1.25"
                role="button"
                tabIndex={0}
                aria-label={`${s.label} menu`}
                aria-expanded={menuOpen}
                onMouseEnter={() => openMenu(s.id)}
                onFocus={() => openMenu(s.id)}
                onClick={(e) => {
                  /* Keep menu open on click; navigate only via menu links */
                  e.preventDefault();
                  openMenu(s.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openMenu(s.id);
                  }
                }}
              />
              <image
                href={s.icon.href}
                x={s.icon.x}
                y={s.icon.y}
                width={s.icon.width}
                height={s.icon.height}
                preserveAspectRatio="xMidYMid meet"
                filter="url(#hero-icon-look)"
                style={{ pointerEvents: 'none' }}
              />
              <text
                className={`hero-brand-icon-label${lit && !menuOpen ? ' is-visible' : ''}`}
                x={s.labelX}
                y={s.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ pointerEvents: 'none' }}
              >
                {s.label}
              </text>
            </g>
          );
        })}
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
                <Link to={item.to} className="jm-tri-flyout-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
