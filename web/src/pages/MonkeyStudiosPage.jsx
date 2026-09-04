import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useReducedMotion } from 'framer-motion';
import { Footer } from '../components/Footer.jsx';
import { MonkeyStudiosTriangle } from '../components/MonkeyStudiosTriangle.jsx';
import { api } from '../api/client.js';

gsap.registerPlugin(ScrollTrigger);

const OFFERINGS = [
  {
    title: 'Songs & albums',
    body: 'Stream and download releases from emerging local artists — polished masters, ready for your library.',
  },
  {
    title: 'Masterclasses',
    body: 'Studio-craft modules: tracking, arranging, and finishing tracks with intention.',
  },
  {
    title: 'Premium catalog',
    body: 'Gated tracks and curriculum tied to your account — purchase once, listen whenever you sign in.',
  },
];

export function MonkeyStudiosPage() {
  const reduceMotion = useReducedMotion();
  const [media, setMedia] = useState([]);
  const [err, setErr] = useState(null);
  const [active, setActive] = useState(null);

  const revealRef = useRef(null);
  const triangleRef = useRef(null);
  const glowRef = useRef(null);
  const detailRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const json = await api('/media');
        const raw = json.media || [];
        const monkey = raw.filter((m) => m.division === 'MONKEY_STUDIOS');
        if (!cancelled) setMedia(monkey.length ? monkey : raw);
      } catch (e) {
        if (!cancelled) setErr(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const ctx = gsap.context(() => {
      if (!revealRef.current || !triangleRef.current) return;

      gsap.set(triangleRef.current, { scale: 0.72, opacity: 0.4, y: 80 });
      if (glowRef.current) gsap.set(glowRef.current, { scale: 1.15, opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: revealRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
        },
      });

      tl.to(triangleRef.current, { scale: 1, opacity: 1, y: 0, ease: 'none', duration: 1 }, 0);
      if (glowRef.current) {
        tl.to(glowRef.current, { scale: 1, opacity: 0.9, ease: 'none', duration: 1 }, 0);
      }
    }, revealRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  function selectSection(id) {
    setActive(id);
    requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const catalog = media.slice(0, 9);

  return (
    <div className="monkey-page marketing-hero marketing-hero--monkey">
      {/* 1) Opening — catalog / listen CTA */}
      <section className="monkey-hero min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="container text-center">
          <p className="marketing-section-title mb-2">100th Monkey Studios</p>
          <h1 className="monkey-hero-title mb-3">Music productions for the New Age</h1>
          <p className="marketing-prose mx-auto mb-4 text-center" style={{ maxWidth: 620 }}>
            A New Age music studio — stream and download songs, albums, masterclasses, and modules from emerging
            local artists. Premium access stays tied to your account.
          </p>

          <div className="d-flex flex-wrap gap-2 justify-content-center mb-5">
            <Link to="/login" className="btn btn-light rounded-pill px-5 py-2 fw-semibold monkey-cta-primary">
              Sign in to listen
            </Link>
            <Link to="/login" className="btn btn-outline-light rounded-pill px-4">
              Library &amp; purchases
            </Link>
          </div>

          <div className="row g-3 justify-content-center text-start mb-4">
            {OFFERINGS.map((o) => (
              <div key={o.title} className="col-md-4">
                <div className="jm-program-card h-100 monkey-card">
                  <h3>{o.title}</h3>
                  <p>{o.body}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="small text-secondary mt-4 mb-0">Scroll to explore Listen · Produce · Release</p>
        </div>
      </section>

      {/* 2) Stationary triangle — headphones center, mic dimmed (flipped) */}
      <div ref={revealRef} className="jm-triangle-reveal">
        <div className="jm-triangle-sticky monkey-triangle-sticky min-vh-100 d-flex flex-column align-items-center justify-content-center">
          <p className="marketing-section-title text-center mb-1">The Monkey Studios triangle</p>
          <p className="small text-secondary text-center mb-4 px-3" style={{ maxWidth: 480 }}>
            Three equal paths — Listen, Produce, Release. Headphones lead; the mic stays secondary.
          </p>
          <div ref={triangleRef} className="jm-triangle-stage">
            <MonkeyStudiosTriangle active={active} onSelect={selectSection} />
            <div ref={glowRef} className="monkey-head-glow" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* 3) Detail panels */}
      <section ref={detailRef} className="jm-detail container pb-5" id="monkey-detail">
        {!active && (
          <p className="text-secondary text-center small py-4">
            Choose Listen, Produce, or Release on the triangle above.
          </p>
        )}

        {active === 'listen' && (
          <motion.div
            className="jm-panel monkey-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="jm-panel-title">Listen</h2>
            <p className="marketing-prose mb-4">
              Catalog preview — songs, albums, and studio cuts ready to stream. Premium titles unlock after purchase.
            </p>
            {err && <p className="text-danger small">{err}</p>}
            <div className="row g-3">
              {catalog.map((m) => (
                <div key={m.id} className="col-md-6 col-lg-4">
                  <div className="monkey-media-card h-100">
                    <div className="monkey-media-art" aria-hidden="true">
                      {m.mediaType === 'video' ? '▶' : '♪'}
                    </div>
                    <div className="monkey-media-body">
                      <h3>{m.title}</h3>
                      <p className="mb-2">{m.mediaType}</p>
                      {m.isPremium && <span className="monkey-badge">Premium</span>}
                    </div>
                  </div>
                </div>
              ))}
              {catalog.length === 0 && !err && (
                <p className="text-secondary small">Media will list here as artists and admins publish.</p>
              )}
            </div>
            <div className="text-center mt-4">
              <Link to="/login" className="btn btn-light rounded-pill px-4">
                Sign in to listen
              </Link>
            </div>
          </motion.div>
        )}

        {active === 'produce' && (
          <motion.div
            className="jm-panel monkey-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="jm-panel-title">Produce</h2>
            <p className="marketing-prose mb-4">
              Studio craft for the New Age — tracking, arranging, and finishing work that sounds intentional on any
              system.
            </p>
            <div className="row g-3">
              {[
                {
                  title: 'Session capture',
                  body: 'Room takes and overdubs from emerging artists — preserved with clarity for release or study.',
                },
                {
                  title: 'Mix & master classes',
                  body: 'Modules that walk the boards: balance, depth, and finishing without chasing trends.',
                },
                {
                  title: 'Artist collaboration',
                  body: 'Local creators in the 100th Monkey pipeline — from demo sketch to catalog-ready master.',
                },
              ].map((card) => (
                <div key={card.title} className="col-md-4">
                  <div className="jm-program-card h-100 monkey-card">
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {active === 'release' && (
          <motion.div
            className="jm-panel monkey-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="jm-panel-title">Release</h2>
            <p className="marketing-prose mb-4">
              From the studio floor to your library — purchases and subscriptions unlock masters, teasers, and
              curriculum for the long haul.
            </p>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="jm-program-card h-100 monkey-card">
                  <h3>Own the take</h3>
                  <p>
                    Buy premium tracks once; they stay on your account. Stream when you are signed in — no disposable
                    links.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="jm-program-card h-100 monkey-card">
                  <h3>Publish with us</h3>
                  <p>
                    Artists and coaches can publish audio and video into the Monkey division. Sign in to manage your
                    catalog and reach listeners.
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex flex-wrap gap-2 justify-content-center mt-4">
              <Link to="/login" className="btn btn-light rounded-pill px-4">
                Library &amp; purchases
              </Link>
              <Link to="/artist" className="btn btn-outline-light rounded-pill px-4">
                Artist portal
              </Link>
            </div>
          </motion.div>
        )}

        <div className="d-flex flex-wrap gap-2 justify-content-center mt-5">
          <Link to="/login" className="btn btn-light rounded-pill px-4">
            Sign in to listen
          </Link>
          <Link to="/login" className="btn btn-outline-light rounded-pill px-4">
            Open library
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
