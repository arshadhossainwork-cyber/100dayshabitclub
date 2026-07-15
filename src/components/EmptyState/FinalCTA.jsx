import useIntersectionReveal from '../../hooks/useIntersectionReveal';
import styles from './FinalCTA.module.css';

export default function FinalCTA({ onAddClick }) {
  const [ref, isVisible] = useIntersectionReveal({ threshold: 0.3 });

  return (
    <section className={`${styles.section} ${isVisible ? styles.visible : ''}`} ref={ref} aria-label="Get started">
      <div className={styles.glow1} aria-hidden="true" />
      <div className={styles.glow2} aria-hidden="true" />

      <div className={styles.content}>
        <h3 className={styles.heading}>
          <span className={styles.headingLine}>Day 1 starts</span>
          <span className={styles.headingAccent}>when you decide</span>
        </h3>

        <p className={styles.subtitle}>
          No sign-up. No subscription. No data leaves your device.
        </p>

        <button className={styles.cta} onClick={onAddClick}>
          Start My 100 Days
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
