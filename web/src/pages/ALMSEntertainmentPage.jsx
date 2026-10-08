import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Footer } from '../components/Footer.jsx';
import { ALMSEntertainmentTriangle } from '../components/ALMSEntertainmentTriangle.jsx';
import { api } from '../api/client.js';

const PACKAGES = [
  {
    name: 'One 45-minute set',
    detail: '45 minutes of music + 15 minutes of audience connection — solo, duo, or trio.',
  },
  {
    name: 'Two 45-minute sets',
    detail: 'Extended evening. One recent two-set booking at $200 grew to nearly $500 with tips & extras.',
  },
  {
    name: 'Custom events',
    detail: 'Cafes, holiday coffee service, private parties, senior centers & hospitals.',
  },
];

const VENUES = [
  {
    title: 'Daytime cafes',
    body: 'Live music during coffee service — accessible sets that warm the room without overwhelming conversation.',
  },
  {
    title: 'Holiday & seasonal',
    body: 'Festive performances for seasonal menus, gift markets, and community gatherings.',
  },
  {
    title: 'Service Our Seniors',
    body: 'Senior centers and care communities — intimate sets designed for connection and calm.',
  },
  {
    title: 'Private events',
    body: 'Parties, venues, and custom storyteller setlists for the room you are hosting.',
  },
];

export function ALMSEntertainmentPage() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(null);
  const [artists, setArtists] = useState([]);
  const detailRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const json = await api('/artists');
        if (!cancelled) setArtists(json.artists || []);
      } catch {
        if (!cancelled) setArtists([]);
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

  return (
    <div className="alms-page marketing-hero marketing-hero--alms">
      {/* 1) Opening: ALMS triangle + hover menus */}
      <section className="alms-triangle-hero min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1 className="jm-hero-brand text-center mb-2">ALMS Entertainment</h1>
        <p className="jm-hero-tagline text-center mb-2">Music performances for the New Age</p>
        <p className="small text-secondary text-center mb-4 px-3" style={{ maxWidth: 480 }}>
          Hover Share, Heal, or Inspire — each corner lights up with its own menu.
        </p>
        <div className="jm-triangle-stage">
          <ALMSEntertainmentTriangle active={active} onSelect={selectSection} />
          <div className="alms-mic-glow" aria-hidden="true" />
        </div>
      </section>

      {/* 2) Booking packages */}
      <section className="alms-hero-booking">
        <div className="container text-center">
          <p className="marketing-section-title mb-2">Book a set</p>
          <h2 className="alms-hero-title mb-3">Solo, duo &amp; trio engagements</h2>
          <p className="marketing-prose mx-auto mb-4 text-center" style={{ maxWidth: 640 }}>
            Cafes, private events, and senior communities — with clear packages and community-healing live music.
          </p>

          <div className="d-flex flex-wrap gap-2 justify-content-center mb-5">
            <Link to="/alms/book" className="btn btn-light rounded-pill px-5 py-2 fw-semibold alms-cta-primary">
              Request a Booking
            </Link>
            <Link to="/login" className="btn btn-outline-light rounded-pill px-4">
              Musician login
            </Link>
          </div>

          <div className="alms-model mx-auto mb-5 text-start">
            <h2 className="h6 text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Standard performance model
            </h2>
            <p className="small text-secondary mb-0">
              A typical set is <strong className="text-white">45 minutes of music</strong> plus{' '}
              <strong className="text-white">15 minutes of audience interaction</strong>. Packages stay accessible —
              and room for tips and extras: one recent <strong className="text-white">$200 two-set booking</strong>{' '}
              returned nearly <strong className="text-white">$500</strong> in total compensation.
            </p>
          </div>

          <h2 className="h5 text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Gig packages
          </h2>
          <div className="row g-3 justify-content-center text-start">
            {PACKAGES.map((p) => (
              <div key={p.name} className="col-md-4">
                <div className="jm-program-card h-100">
                  <h3>{p.name}</h3>
                  <p>{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3) Detail panels */}
      <section ref={detailRef} className="jm-detail container pb-5" id="alms-detail">
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
                  blurb: 'Service and livestream — music that reaches the room and beyond.',
                },
                {
                  id: 'heal',
                  title: 'Heal',
                  blurb: 'Host and perform — sets that settle a space.',
                },
                {
                  id: 'inspire',
                  title: 'Inspire',
                  blurb: 'Collaborate and masterclass — craft that lifts others.',
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
            className="jm-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="jm-panel-title">Share</h2>
            <p className="marketing-prose mb-4">
              Service and livestream — community sets, musician stories, and live moments that travel past the room.
            </p>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="jm-program-card h-100">
                  <h3>Service</h3>
                  <p>
                    Accessible gigs for cafes, holidays, and senior communities — music that serves connection first.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="jm-program-card h-100">
                  <h3>Livestream</h3>
                  <p>
                    Share sets beyond the venue — upload performance videos and grow the ALMS community showcase.
                  </p>
                </div>
              </div>
            </div>

            <div className="jm-program-card mb-4">
              <h3>Musician portal</h3>
              <p className="mb-3">
                Artists maintain profiles with audio and video demos, manage gig availability, and join the community
                pipeline. Venues request; musicians share what they bring to the stage.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Link to="/login" className="btn btn-light rounded-pill px-4 btn-sm">
                  Create musician login
                </Link>
                <Link to="/artist" className="btn btn-outline-light rounded-pill px-4 btn-sm">
                  Open artist portal
                </Link>
              </div>
            </div>

            <h3 className="h6 text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Community showcase
            </h3>
            <div className="row g-3">
              {(artists.length
                ? artists
                : [
                    { id: 'p1', stageName: 'Your performance' },
                    { id: 'p2', stageName: 'Upload a set' },
                    { id: 'p3', stageName: 'Change the room' },
                  ])
                .slice(0, 6)
                .map((a) => (
                  <div key={a.id} className="col-md-4">
                    <div className="jm-program-card h-100">
                      <div className="jm-video-placeholder alms-video-placeholder" aria-hidden="true">
                        ♪
                      </div>
                      <h3>{a.stageName || a.name || 'Artist'}</h3>
                      <p>
                        {a.city
                          ? `${a.genres || 'Live set'} · ${a.city}`
                          : 'Performance video & story — how music is changing the world.'}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {active === 'heal' && (
          <motion.div
            className="jm-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="jm-panel-title">Heal</h2>
            <p className="marketing-prose mb-4">
              Host and perform — why live sound can settle a room, and how venues bring that healing into the space.
            </p>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="jm-program-card h-100">
                  <h3>Host</h3>
                  <p>
                    Daytime cafes, holiday rooms, and private events — host a set that warms the room without
                    overwhelming conversation.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="jm-program-card h-100">
                  <h3>Perform</h3>
                  <p>
                    Tone and tempo that invite calm and presence. ALMS sets favor frequencies that land as healing —
                    not volume for its own sake.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="jm-program-card h-100">
                  <h3>~70% water</h3>
                  <p>
                    The body is roughly seventy percent water. Live acoustic music can land as healing because we are
                    built to carry vibration.
                  </p>
                </div>
              </div>
            </div>
            <blockquote className="jm-quote mt-4">
              <p>
                Healing here means accessible community engagement — cafes, holidays, and senior rooms — where music
                serves connection first.
              </p>
              <footer>ALMS Entertainment</footer>
            </blockquote>
          </motion.div>
        )}

        {active === 'inspire' && (
          <motion.div
            className="jm-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="jm-panel-title">Inspire</h2>
            <p className="marketing-prose mb-4">
              Collaborate and masterclass — venues, clients, and craft that lift the next room and the next musician.
            </p>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="jm-program-card h-100">
                  <h3>Collaborate</h3>
                  <p>
                    Partner with ALMS for community-healing engagements — from daytime cafes to{' '}
                    <strong>Service Our Seniors</strong>.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="jm-program-card h-100">
                  <h3>Masterclass</h3>
                  <p>
                    Storyteller setlists, audience connection, and performance craft for musicians ready to deepen
                    their live work.
                  </p>
                </div>
              </div>
            </div>
            <div className="row g-3">
              {VENUES.map((v) => (
                <div key={v.title} className="col-md-6">
                  <div className="jm-program-card h-100">
                    <h3>{v.title}</h3>
                    <p>{v.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <Link to="/alms/book" className="btn btn-light rounded-pill px-4">
                Book for your venue
              </Link>
            </div>
          </motion.div>
        )}

        <div className="d-flex flex-wrap gap-2 justify-content-center mt-5">
          <Link to="/alms/book" className="btn btn-light rounded-pill px-4">
            Book Now
          </Link>
          <Link to="/login" className="btn btn-outline-light rounded-pill px-4">
            Musician community
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
