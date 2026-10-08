import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Footer } from '../components/Footer.jsx';
import { MonkeyStudiosTriangle } from '../components/MonkeyStudiosTriangle.jsx';
import { api } from '../api/client.js';

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

  function selectSection(id) {
    setActive(id);
    requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const catalog = media.slice(0, 9);

  return (
    <div className="monkey-page marketing-hero marketing-hero--monkey">
      {/* 1) Opening — triangle + hover menus */}
      <section className="monkey-triangle-hero min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1 className="jm-hero-brand text-center mb-2">100th Monkey Studios</h1>
        <p className="jm-hero-tagline text-center mb-2">Music productions for the New Age</p>
        <p className="small text-secondary text-center mb-4 px-3" style={{ maxWidth: 480 }}>
          Hover Share, Heal, or Inspire — each corner lights up with its own menu.
        </p>
        <div className="jm-triangle-stage">
          <MonkeyStudiosTriangle active={active} onSelect={selectSection} />
          <div className="monkey-head-glow" aria-hidden="true" />
        </div>
      </section>

      {/* 2) Catalog / listen CTA */}
      <section className="monkey-hero">
        <div className="container text-center">
          <p className="marketing-section-title mb-2">The catalog</p>
          <h2 className="monkey-hero-title mb-3">Stream, download &amp; learn</h2>
          <p className="marketing-prose mx-auto mb-4 text-center" style={{ maxWidth: 620 }}>
            Songs, albums, masterclasses, and modules from emerging local artists. Premium access stays tied to your
            account.
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
        </div>
      </section>

      {/* 3) Detail panels */}
      <section ref={detailRef} className="jm-detail container pb-5" id="monkey-detail">
        {!active && (
          <motion.div
            className="jm-empty-state"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-secondary text-center small mb-4">
              Choose Share, Heal, or Inspire on the triangle above.
            </p>
            <div className="jm-empty-paths">
              {[
                {
                  id: 'share',
                  title: 'Share',
                  blurb: 'Listen, share, and partner — catalog that travels.',
                },
                {
                  id: 'heal',
                  title: 'Heal',
                  blurb: 'Collaborate and record — sessions that restore.',
                },
                {
                  id: 'inspire',
                  title: 'Inspire',
                  blurb: 'Release and outreach — music that reaches further.',
                },
              ].map((path) => (
                <button
                  key={path.id}
                  type="button"
                  className="jm-empty-path"
                  onClick={() => selectSection(path.id)}
                >
                  <span className="jm-empty-path-title">{path.title}</span>
                  <span className="jm-empty-path-blurb">{path.blurb}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {active === 'share' && (
          <motion.div
            className="jm-panel monkey-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="jm-panel-title">Share</h2>
            <p className="marketing-prose mb-4">
              Listen and share — catalog previews, studio cuts, and partners who help the music travel.
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

        {active === 'heal' && (
          <motion.div
            className="jm-panel monkey-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="jm-panel-title">Heal</h2>
            <p className="marketing-prose mb-4">
              Collaborate and record — studio craft that restores intention to every take.
            </p>
            <div className="row g-3">
              {[
                {
                  title: 'Collaborate',
                  body: 'Local creators in the 100th Monkey pipeline — from demo sketch to catalog-ready master.',
                },
                {
                  title: 'Record',
                  body: 'Room takes and overdubs preserved with clarity — tracking that sounds intentional on any system.',
                },
                {
                  title: 'Mix & master classes',
                  body: 'Modules that walk the boards: balance, depth, and finishing without chasing trends.',
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

        {active === 'inspire' && (
          <motion.div
            className="jm-panel monkey-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="jm-panel-title">Inspire</h2>
            <p className="marketing-prose mb-4">
              Release and outreach — from the studio floor to listeners, partners, and the wider community.
            </p>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="jm-program-card h-100 monkey-card">
                  <h3>Release</h3>
                  <p>
                    Buy premium tracks once; they stay on your account. Stream when you are signed in — no disposable
                    links.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="jm-program-card h-100 monkey-card">
                  <h3>Outreach</h3>
                  <p>
                    Artists and coaches publish audio and video into the Monkey division — reach listeners and grow the
                    catalog together.
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
