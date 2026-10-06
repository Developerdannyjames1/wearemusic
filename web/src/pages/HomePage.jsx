import { RainVideo } from '../components/RainVideo.jsx';
import { Footer } from '../components/Footer.jsx';
import { TriangleDBAPicker } from '../components/TriangleDBAPicker.jsx';
import { HeroBrandMark } from '../components/HeroBrandMark.jsx';
import { DivisionCircle } from '../components/DivisionCircle.jsx';

/**
 * Landing: hero + three DBA cards + division circle.
 * One shared background runs the full page.
 */
export function HomePage() {
  return (
    <div className="home-landing">
      <div className="home-landing-bg" aria-hidden="true">
        <RainVideo />
        <div className="home-landing-veil" />
      </div>

      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-mark-wrap">
            <HeroBrandMark className="home-hero-mark" />
          </div>

          <div className="home-hero-copy">
            <p className="home-hero-domain">wearemusic.world</p>
            <p className="home-hero-slogan">Music for the New Age</p>
            <p className="home-hero-pillars">
              <span>Inspire</span>
              <span className="home-hero-dot" aria-hidden="true">
                .
              </span>
              <span>Share</span>
              <span className="home-hero-dot" aria-hidden="true">
                .
              </span>
              <span>Heal</span>
              <span className="home-hero-dot" aria-hidden="true">
                .
              </span>
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
