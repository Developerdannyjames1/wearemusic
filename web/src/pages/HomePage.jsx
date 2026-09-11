import { RainVideo } from '../components/RainVideo.jsx';
import { Footer } from '../components/Footer.jsx';
import { TriangleDBAPicker } from '../components/TriangleDBAPicker.jsx';
import { HeroBrandMark } from '../components/HeroBrandMark.jsx';
import { DivisionCircle } from '../components/DivisionCircle.jsx';

/**
 * Landing: hero + three DBA cards + division circle.
 * Circle hover keeps the base image visible so it never blanks.
 */
export function HomePage() {
  return (
    <div className="home-landing">
      <section className="home-hero">
        <RainVideo />
        <div className="home-hero-sunrise" aria-hidden="true" />
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
        <RainVideo />
        <div className="home-divisions-veil" aria-hidden="true" />
        <div className="container home-divisions-inner">
          <p className="marketing-section-title text-center home-divisions-kicker">
            Three ways we serve music
          </p>
          <TriangleDBAPicker />
        </div>
      </section>

      <section className="home-circle-wrap">
        <RainVideo />
        <div className="home-divisions-veil" aria-hidden="true" />
        <div className="home-circle-inner">
          <DivisionCircle />
        </div>
      </section>

      <Footer />
    </div>
  );
}
