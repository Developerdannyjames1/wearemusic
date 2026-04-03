import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useReducedMotion } from 'framer-motion';
import { RainVideo } from '../components/RainVideo.jsx';
import { Footer } from '../components/Footer.jsx';
import { BannerCarousel } from '../components/BannerCarousel.jsx';
import { TriangleDBAPicker } from '../components/TriangleDBAPicker.jsx';
import heroTriangle from '@home/hero-triangle.png?url';

gsap.registerPlugin(ScrollTrigger);

const HERO_IMG = heroTriangle;
const MID_IMG = '/assets/Property_1_Default__7_-43829437-759b-46c0-b4bd-6bc8841c2771.png';
const REMOTE_1 =
  'https://wearemusic.testlinkhub.com/wp-content/uploads/2025/07/image-42.png';
const REMOTE_3 =
  'https://wearemusic.testlinkhub.com/wp-content/uploads/2025/07/image-40.png';

export function HomePage() {
  const reduceMotion = useReducedMotion();
  const mainRef = useRef(null);
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);

  useEffect(() => {
    gsap.from('.top-hero-triangle', {
      duration: 1.4,
      scale: 0.7,
      rotation: -12,
      opacity: 0,
      ease: 'power3.out',
    });
    gsap.to('.top-hero-triangle', {
      y: -20,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    const ctx = gsap.context(() => {
      if (!mainRef.current || !box1.current || !box2.current || !box3.current) return;
      ScrollTrigger.killAll();
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          scroller: 'body',
          start: 'top -5%',
          end: 'top -330%',
          scrub: 1.2,
        },
      });

      gsap.set(box1.current, {
        left: '50%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        scale: 0.6,
        opacity: 0.7,
        zIndex: 1,
      });
      gsap.set(box2.current, {
        x: '-50%',
        y: '-50%',
        left: '0%',
        top: '50%',
        scale: 1,
        opacity: 1,
        zIndex: 1,
      });
      gsap.set(box3.current, {
        left: '100%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        scale: 1,
        opacity: 1,
        zIndex: 1,
      });

      tl.to(
        box1.current,
        {
          ease: 'power2.inOut',
          left: '0%',
          top: '50%',
          opacity: 0.7,
          x: '-50%',
          y: '-50%',
          scale: 0.6,
          zIndex: 3,
          duration: 0.8,
        },
        'a'
      )
        .to(
          box2.current,
          {
            ease: 'power2.inOut',
            left: '50%',
            top: '50%',
            opacity: 1,
            x: '-50%',
            y: '-50%',
            scale: 1,
            zIndex: 3,
            duration: 0.8,
          },
          'a'
        )
        .to(
          box3.current,
          {
            ease: 'power2.inOut',
            left: '100%',
            top: '50%',
            opacity: 0.7,
            x: '-50%',
            y: '-50%',
            scale: 0.6,
            zIndex: 1,
            duration: 0.8,
          },
          'a'
        );

      tl.to(
        box1.current,
        {
          ease: 'power2.inOut',
          left: '50%',
          top: '50%',
          opacity: 1,
          x: '-50%',
          y: '-50%',
          scale: 1,
          zIndex: 3,
          duration: 0.8,
        },
        'b'
      )
        .to(
          box2.current,
          {
            ease: 'power2.inOut',
            left: '100%',
            top: '50%',
            opacity: 0.8,
            x: '-50%',
            y: '-50%',
            scale: 0.6,
            zIndex: 1,
            duration: 0.8,
          },
          'b'
        )
        .to(
          box3.current,
          {
            ease: 'power2.inOut',
            left: '0%',
            top: '50%',
            opacity: 0.7,
            x: '-50%',
            y: '-50%',
            scale: 0.6,
            zIndex: 1,
            duration: 0.8,
          },
          'b'
        );

      tl.to(
        box1.current,
        {
          ease: 'power2.inOut',
          left: '100%',
          top: '50%',
          x: '-50%',
          y: '-50%',
          scale: 0.6,
          opacity: 0.7,
          zIndex: 1,
          duration: 0.8,
        },
        'c'
      )
        .to(
          box2.current,
          {
            ease: 'power2.inOut',
            left: '0%',
            top: '50%',
            x: '-50%',
            y: '-50%',
            scale: 0.6,
            zIndex: 1,
            opacity: 0.7,
            duration: 0.8,
          },
          'c'
        )
        .to(
          box3.current,
          {
            ease: 'power2.inOut',
            left: '50%',
            top: '50%',
            opacity: 1,
            x: '-50%',
            y: '-50%',
            scale: 1,
            zIndex: 3,
            duration: 0.8,
          },
          'c'
        );

      tl.to(
        box1.current,
        {
          ease: 'power2.inOut',
          left: '0%',
          top: '50%',
          x: '-50%',
          y: '-50%',
          scale: 0.6,
          opacity: 0.7,
          zIndex: 1,
          duration: 0.8,
        },
        'd'
      )
        .to(
          box2.current,
          {
            ease: 'power2.inOut',
            left: '50%',
            top: '50%',
            x: '-50%',
            y: '-50%',
            scale: 1,
            zIndex: 3,
            opacity: 1,
            duration: 0.8,
          },
          'd'
        )
        .to(
          box3.current,
          {
            ease: 'power2.inOut',
            left: '100%',
            top: '50%',
            opacity: 0.7,
            x: '-50%',
            y: '-50%',
            scale: 0.6,
            zIndex: 1,
            duration: 0.8,
          },
          'd'
        );

      gsap.set([box1.current, box2.current, box3.current], {
        force3D: true,
        transformOrigin: 'center center',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        className="position-relative overflow-hidden bg-black d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh' }}
      >
        <RainVideo />
        <motion.div
          className="position-relative d-flex flex-column align-items-center justify-content-center gap-3 px-3"
          style={{ zIndex: 1, paddingTop: '4.5rem' }}
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.img
            src={HERO_IMG}
            alt="We Are Music"
            className="img-fluid top-hero-triangle"
            style={{ maxWidth: 520, width: '70vw' }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.86, rotate: -8 }}
            animate={reduceMotion ? {} : { opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.12 }}
            whileHover={reduceMotion ? {} : { scale: 1.03 }}
          />
          <motion.h1
            className="display-1 text-center fw-bold wam-stroke-title mb-0"
            style={{ fontSize: 'clamp(3rem, 12vw, 9rem)' }}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            We Are Music
          </motion.h1>
        </motion.div>
      </section>

      <motion.section
        className="py-5 position-relative"
        style={{
          background: 'linear-gradient(180deg, #0a0604 0%, #000 100%)',
          borderTop: '1px solid rgba(201, 162, 39, 0.12)',
        }}
        initial={reduceMotion ? false : { opacity: 0, y: 40 }}
        whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7 }}
      >
        <div className="container py-4">
          <p className="marketing-section-title text-center">Three ways we serve music</p>
          <TriangleDBAPicker />
        </div>
      </motion.section>

      <motion.section
        className="py-5 bg-black"
        initial={reduceMotion ? false : { opacity: 0, y: 40 }}
        whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7 }}
      >
        <div className="container">
          <BannerCarousel />
        </div>
      </motion.section>

      <div
        id="mainWrapperPage"
        ref={mainRef}
        className="position-relative container-fluid"
        style={{ height: '260vh', padding: 0, backgroundColor: '#000' }}
      >
        <div
          className="mainPage1 vh-100 container-fluid position-sticky top-0 start-0 d-flex flex-column align-items-center justify-content-start bg-black"
          style={{ top: 0 }}
        >
          <RainVideo />
          <div
            className="position-relative z-1 rounded-3 d-flex flex-column align-items-center"
            style={{ width: '38%', minWidth: 280, height: '75vh', marginTop: '-2rem' }}
          >
            <div
              ref={box1}
              className="position-absolute"
              style={{ width: 'min(440px, 90vw)', top: '0%', left: '50%' }}
            >
              <img
                src={REMOTE_1}
                alt=""
                className="img-fluid rounded"
                style={{ filter: 'brightness(1.3) contrast(1.4)' }}
              />
            </div>
            <div
              ref={box2}
              className="position-absolute"
              style={{ width: 'min(440px, 90vw)', top: '50%', left: '0%' }}
            >
              <img
                src={MID_IMG}
                alt=""
                className="img-fluid rounded"
                style={{ filter: 'brightness(1.3) contrast(1.4)' }}
              />
            </div>
            <div
              ref={box3}
              className="position-absolute"
              style={{ width: 'min(440px, 90vw)', top: '50%', left: '100%' }}
            >
              <img
                src={REMOTE_3}
                alt=""
                className="img-fluid rounded"
                style={{ filter: 'brightness(1.3) contrast(1.4)' }}
              />
            </div>
          </div>
        </div>
      </div>

      <section
        className="w-100 d-flex justify-content-center align-items-center bg-black"
        style={{ minHeight: '100vh' }}
      >
        <div className="holder position-relative" style={{ width: 'min(650px, 95vw)', height: 600 }}>
          <img className="belowImage position-absolute top-0 start-0" src="/normal.svg" alt="" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          <img className="upperImage position-absolute top-0 start-0" src="/icon3.svg" alt="" style={{ objectFit: 'cover', width: '100%', height: '100%', opacity: 0 }} />
        </div>
      </section>

      <style>{`
        .holder:hover .belowImage { opacity: 0; }
        .holder:hover .upperImage { opacity: 1; }
        .belowImage, .upperImage { transition: opacity 0.3s ease; }
      `}</style>

      <Footer />
    </>
  );
}
