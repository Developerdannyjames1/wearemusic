import { useState } from 'react';
import { RainVideo } from '../components/RainVideo.jsx';
import { Footer } from '../components/Footer.jsx';
import { TriangleDBAPicker } from '../components/TriangleDBAPicker.jsx';
import { HeroBrandMark } from '../components/HeroBrandMark.jsx';
import { DivisionCircle } from '../components/DivisionCircle.jsx';

const PILLARS = [
  { id: 'inspire', label: 'Inspire', triangleId: 'jm' },
  { id: 'share', label: 'Share', triangleId: 'monkey' },
  { id: 'heal', label: 'Heal', triangleId: 'alms' },
];

/**
 * Landing: hero + three DBA cards + division circle.
 * One shared background runs the full page.
 */
export function HomePage() {
  const [pillarHighlight, setPillarHighlight] = useState(null);

  return (
    <div className="home-landing">
      <div className="home-landing-bg" aria-hidden="true">
        <RainVideo />
        <div className="home-landing-veil" />
      </div>

      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-mark-wrap">
            <HeroBrandMark className="home-hero-mark" highlightId={pillarHighlight} />
          </div>

          <div className="home-hero-copy">
            <p className="home-hero-domain">WEAREMUSIC.WORLD</p>
            <p className="home-hero-slogan">Music for the New Age</p>
            <p className="home-hero-pillars">
              {PILLARS.map((pillar, index) => (
                <span key={pillar.id} className="home-hero-pillar-wrap">
                  {index > 0 && (
                    <span className="home-hero-dot" aria-hidden="true">
                      .
                    </span>
                  )}
                  <button
                    type="button"
                    className={`home-hero-pillar${pillarHighlight === pillar.triangleId ? ' is-active' : ''}`}
                    onMouseEnter={() => setPillarHighlight(pillar.triangleId)}
                    onMouseLeave={() => setPillarHighlight(null)}
                    onFocus={() => setPillarHighlight(pillar.triangleId)}
                    onBlur={() => setPillarHighlight(null)}
                  >
                    {pillar.label}
                  </button>
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="home-divisions">
        <div className="home-divisions-inner">
          <TriangleDBAPicker />
        </div>
      </section>

      <section className="home-circle-wrap">
        <div className="home-circle-inner">
          <DivisionCircle />
        </div>
      </section>

      <Footer />
    </div>
  );
}
