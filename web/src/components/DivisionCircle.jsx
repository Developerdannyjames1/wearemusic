import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NORMAL_SRC = '/normal.svg';
const HOVER_SRC = '/icon3.svg';

/**
 * Assembled circle (normal) → exploded segments (icon3) on hover.
 * Base image stays visible so the graphic never blanks while the hover asset paints.
 */
export function DivisionCircle() {
  useEffect(() => {
    const a = new Image();
    const b = new Image();
    a.src = NORMAL_SRC;
    b.src = HOVER_SRC;
  }, []);

  return (
    <section className="home-circle-section">
      <div className="home-circle-holder" tabIndex={0} aria-label="We Are Music divisions">
        <img
          className="home-circle-img home-circle-img--base"
          src={NORMAL_SRC}
          alt="JM Method, ALMS Entertainment, and 100th Monkey Studios"
          draggable={false}
        />
        <img
          className="home-circle-img home-circle-img--hover"
          src={HOVER_SRC}
          alt=""
          aria-hidden="true"
          draggable={false}
        />
      </div>

      <div className="home-circle-links">
        <Link to="/jm-method" className="home-circle-link">
          JM Method
        </Link>
        <Link to="/alms-entertainment" className="home-circle-link">
          ALMS Entertainment
        </Link>
        <Link to="/100th-monkey-studios" className="home-circle-link">
          100th Monkey Studios
        </Link>
      </div>
    </section>
  );
}
