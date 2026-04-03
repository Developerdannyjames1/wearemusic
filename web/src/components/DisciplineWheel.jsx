const DISCIPLINES = ['Piano', 'Voice', 'Guitar', 'Bass', 'Ukulele', 'Percussion', 'Studio'];

export function DisciplineWheel() {
  const r = 38;
  return (
    <div className="wam-wheel-wrap">
      <div className="wam-wheel" aria-label="Seven disciplines">
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
                width: 'auto',
                height: 'auto',
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
    </div>
  );
}
