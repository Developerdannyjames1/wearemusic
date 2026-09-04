import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useReducedMotion } from 'framer-motion';
import { Footer } from '../components/Footer.jsx';
import { DisciplineWheel, DISCIPLINES } from '../components/DisciplineWheel.jsx';
import { JMMethodTriangle } from '../components/JMMethodTriangle.jsx';
import { api } from '../api/client.js';

gsap.registerPlugin(ScrollTrigger);

const DISCIPLINE_QUOTES = [
  'Discipline is practicing when inspiration is quiet — then the music answers back.',
  'One careful repetition today becomes freedom on stage tomorrow.',
  'The dial turns slowly. Mastery is the patience to stay with it.',
  'Discipline is not rigidity — it is the vessel that holds creativity.',
];

function quoteOfTheDay() {
  const day = Math.floor(Date.now() / 86_400_000);
  return DISCIPLINE_QUOTES[day % DISCIPLINE_QUOTES.length];
}

export function JMMethodPage() {
  const reduceMotion = useReducedMotion();
  const [courses, setCourses] = useState([]);
  const [err, setErr] = useState(null);
  const [active, setActive] = useState(null);
  const [wheelPaused, setWheelPaused] = useState(false);

  const revealRef = useRef(null);
  const triangleRef = useRef(null);
  const keyboardHintRef = useRef(null);
  const detailRef = useRef(null);

  const quote = useMemo(() => quoteOfTheDay(), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const json = await api('/courses?division=JM_METHOD');
        if (!cancelled) setCourses(json.courses || []);
      } catch (e) {
        if (!cancelled) setErr(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Scroll: large stationary triangle reveals; keyboard stays centered in foreground
  useEffect(() => {
    if (reduceMotion) return undefined;
    const ctx = gsap.context(() => {
      if (!revealRef.current || !triangleRef.current) return;

      gsap.set(triangleRef.current, { scale: 0.72, opacity: 0.35, y: 80 });
      if (keyboardHintRef.current) {
        gsap.set(keyboardHintRef.current, { scale: 1.15, opacity: 1 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: revealRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
        },
      });

      tl.to(
        triangleRef.current,
        { scale: 1, opacity: 1, y: 0, ease: 'none', duration: 1 },
        0
      );

      if (keyboardHintRef.current) {
        tl.to(
          keyboardHintRef.current,
          { scale: 1, opacity: 0.85, ease: 'none', duration: 1 },
          0
        );
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

  return (
    <div className="jm-page marketing-hero marketing-hero--jm">
      {/* 1) Opening: instrument wheel first */}
      <section className="jm-hero-wheel min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="container text-center">
          <p className="marketing-section-title mb-2">JM Method</p>
          <h1 className="jm-hero-title mb-2">Music lessons for the New Age</h1>
          <p className="marketing-prose mx-auto mb-4 text-center" style={{ maxWidth: 560 }}>
            Begin with the dial — seven disciplines in one circle. Pause anytime for a stationary view.
          </p>
          <DisciplineWheel
            paused={wheelPaused}
            onPausedChange={setWheelPaused}
            autoRotateOnce={!reduceMotion}
            showControls
          />
          <p className="small text-secondary mt-2 mb-0">Scroll to meet Discipline · Creativity · Harmony</p>
        </div>
      </section>

      {/* 2) Scroll reveal: stationary equal triangle + keyboard foreground */}
      <div ref={revealRef} className="jm-triangle-reveal">
        <div className="jm-triangle-sticky min-vh-100 d-flex flex-column align-items-center justify-content-center">
          <p className="marketing-section-title text-center mb-1">The JM Method triangle</p>
          <p className="small text-secondary text-center mb-4 px-3" style={{ maxWidth: 480 }}>
            Three equal paths — none larger than another. Tap a corner to go deeper.
          </p>
          <div ref={triangleRef} className="jm-triangle-stage">
            <JMMethodTriangle active={active} onSelect={selectSection} />
            <div ref={keyboardHintRef} className="jm-keyboard-glow" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* 3) Detail panels from triangle clicks */}
      <section ref={detailRef} className="jm-detail container pb-5" id="jm-detail">
        {!active && (
          <motion.div
            className="jm-empty-state"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/triangles/triangle-piano.png"
              alt="JM Method — Discipline, Creativity, Harmony"
              className="jm-empty-hero-img"
            />
            <p className="jm-empty-lead">
              Choose <strong>Discipline</strong>, <strong>Creativity</strong>, or <strong>Harmony</strong> on the
              triangle above — or tap a path below.
            </p>
            <div className="jm-empty-paths">
              {[
                {
                  id: 'discipline',
                  title: 'Discipline',
                  blurb: 'Seven instruments. Daily practice. Quote of the day.',
                },
                {
                  id: 'creativity',
                  title: 'Creativity',
                  blurb: 'Virtuoso & Rising Star — curriculum for every learner.',
                },
                {
                  id: 'harmony',
                  title: 'Harmony',
                  blurb: 'Recitals, showcases, and competition moments.',
                },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="jm-empty-path"
                  onClick={() => selectSection(p.id)}
                >
                  <span className="jm-empty-path-title">{p.title}</span>
                  <span className="jm-empty-path-blurb">{p.blurb}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {active === 'discipline' && (
          <motion.div
            className="jm-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="jm-panel-title">Discipline</h2>
            <p className="marketing-prose mb-4">
              Skill training across seven instruments and studio craft. The dial is your map —
              pick a focus and stay with it.
            </p>
            <DisciplineWheel showControls={false} autoRotateOnce={false} size="sm" />
            <ul className="jm-chip-row list-unstyled">
              {DISCIPLINES.map((d) => (
                <li key={d} className="jm-chip">
                  {d}
                </li>
              ))}
            </ul>
            <blockquote className="jm-quote">
              <p>{quote}</p>
              <footer>Quote of the day — Discipline</footer>
            </blockquote>
          </motion.div>
        )}

        {active === 'creativity' && (
          <motion.div
            className="jm-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="jm-panel-title">Creativity</h2>
            <p className="marketing-prose mb-4">
              Curriculum and song lists tailored to how you learn — including pathways for our{' '}
              <strong>neurodiverse</strong> and <strong>special and magical</strong> community, where
              heightened sensitivity through music often becomes extraordinary expression.
            </p>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="jm-program-card h-100">
                  <h3>Virtuoso</h3>
                  <p>One instrument. Deep focus. Master repertoire and technique with intensity.</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="jm-program-card h-100">
                  <h3>Rising Star</h3>
                  <p>Multiple instruments. Cross-pollinate skills and build a wider musical voice.</p>
                </div>
              </div>
            </div>
            <h3 className="h6 text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Song list &amp; curriculum
            </h3>
            {err && <p className="text-danger small">{err}</p>}
            <div className="row g-3">
              {(courses || []).slice(0, 6).map((c) => (
                <div key={c.id} className="col-md-6 col-lg-4">
                  <div className="wam-panel p-3 h-100 wam-panel-interactive">
                    <h4 className="h6 text-white mb-1">{c.title}</h4>
                    <p className="small text-secondary mb-0">{c.description || 'Open enrollment.'}</p>
                    <p className="small text-muted mt-2 mb-0">
                      {c._count?.lessons ?? 0} lessons · {c.currency} {c.price}
                    </p>
                  </div>
                </div>
              ))}
              {courses.length === 0 && !err && (
                <p className="text-secondary small">Courses appear here as coaches publish curriculum.</p>
              )}
            </div>
          </motion.div>
        )}

        {active === 'harmony' && (
          <motion.div
            className="jm-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="jm-panel-title">Harmony</h2>
            <p className="marketing-prose mb-4">
              Showcase performances, student recital moments, and competition highlights — where
              lessons become shared music.
            </p>
            <div className="row g-3">
              {[
                {
                  title: 'Student recitals',
                  body: 'End-of-term showcases — solos, duets, and ensemble sets from every discipline.',
                },
                {
                  title: 'Competition highlights',
                  body: 'Clips and stories from festivals, juries, and community contests.',
                },
                {
                  title: 'Studio performances',
                  body: 'Live-room sessions and “learn any song fast” harmony workshops on camera.',
                },
              ].map((card) => (
                <div key={card.title} className="col-md-4">
                  <div className="jm-program-card h-100">
                    <div className="jm-video-placeholder" aria-hidden="true">
                      ▶
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="d-flex flex-wrap gap-2 justify-content-center mt-5">
          <Link to="/login" className="btn btn-light rounded-pill px-4">
            Find a coach
          </Link>
          <Link to="/login" className="btn btn-outline-light rounded-pill px-4">
            Client portal
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
