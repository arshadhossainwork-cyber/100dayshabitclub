import { useRef, useMemo } from 'react';
import { Capacitor } from '@capacitor/core';
import useMousePosition from '../../hooks/useMousePosition';
import useReducedMotion from '../../hooks/useReducedMotion';
import styles from './HeroSection.module.css';

const isNative = Capacitor.isNativePlatform();

function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 3,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 8}s`,
      opacity: 0.15 + Math.random() * 0.25,
    }))
  , []);

  return (
    <div className={styles.particles} aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className={styles.particle}
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection({ onAddClick }) {
  const heroRef = useRef(null);
  const reduced = useReducedMotion();
  useMousePosition(isNative ? null : heroRef);

  return (
    <section className={styles.hero} ref={heroRef} aria-label="Hero">
      {!reduced && !isNative && <Particles />}

      {!isNative && <div className={styles.mouseLight} aria-hidden="true" />}

      <div className={styles.content}>
        <div className={styles.label}>
          <span className={styles.labelDot} aria-hidden="true" />
          Free. Private. No account required.
        </div>

        <h1 className={styles.heading}>
          <span className={styles.headingLine}>Build any habit</span>
          <span className={styles.headingAccent}>in 100 days</span>
        </h1>

        <p className={styles.subtitle}>
          Pick a habit. Show up daily. Watch your grid fill up.
          <br />
          Your data never leaves your device.
        </p>

        <div className={styles.ctaRow}>
          <button className={styles.ctaPrimary} onClick={onAddClick}>
            Start Tracking
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <a href="#popular-habits" className={styles.ctaGhost}>
            Browse Habits
          </a>
        </div>

        <div className={styles.socialBar}>
          <div className={styles.avatars} aria-hidden="true">
            {['#059669', '#4F46E5', '#7C3AED', '#E11D48'].map((c, i) => (
              <div
                key={i}
                className={styles.avatar}
                style={{ background: c, zIndex: 4 - i }}
              />
            ))}
          </div>
          <span className={styles.socialText}>
            Join <strong>2,400+</strong> people building better habits
          </span>
        </div>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollLine} />
      </div>

      <div className={styles.heroFade} aria-hidden="true" />
    </section>
  );
}
