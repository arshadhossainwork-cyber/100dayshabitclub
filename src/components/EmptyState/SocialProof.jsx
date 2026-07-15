import { testimonials, socialStats } from './emptyStateData';
import useIntersectionReveal from '../../hooks/useIntersectionReveal';
import useCountUp from '../../hooks/useCountUp';
import styles from './SocialProof.module.css';

function StatCounter({ value, suffix, label }) {
  const [ref, isVisible] = useIntersectionReveal({ threshold: 0.5 });
  const count = useCountUp(value, isVisible);

  return (
    <div className={styles.stat} ref={ref}>
      <span className={styles.statValue}>
        {count.toLocaleString()}{suffix}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function SocialProof() {
  const [ref, isVisible] = useIntersectionReveal({ threshold: 0.1 });

  return (
    <section className={`${styles.section} ${isVisible ? styles.visible : ''}`} ref={ref} aria-label="Social proof">
      <div className={styles.inner}>
        {/* Stats strip */}
        <div className={styles.statsStrip}>
          {socialStats.map((s, i) => (
            <div key={s.label} className={styles.statWrapper}>
              {i > 0 && <div className={styles.statDivider} aria-hidden="true" />}
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className={styles.testimonialSection}>
          <h3 className={styles.heading}>
            Real people, <span className={styles.accent}>real streaks</span>
          </h3>

          <div className={styles.testimonialGrid}>
            {testimonials.map((t) => (
              <div key={t.name} className={styles.card}>
                <div className={styles.cardTop}>
                  <div
                    className={styles.avatar}
                    style={{ background: t.color }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div className={styles.cardMeta}>
                    <strong>{t.name}</strong>
                    <span className={styles.cardHabit}>{t.habit}</span>
                  </div>
                  <span className={styles.streakBadge}>{t.streak} days</span>
                </div>
                <p className={styles.quote}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div
                  className={styles.progressBar}
                  role="progressbar"
                  aria-valuenow={t.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${t.name} progress`}
                >
                  <div
                    className={styles.progressFill}
                    style={{
                      width: isVisible ? `${t.progress}%` : '0%',
                      background: t.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Live activity indicator */}
          <div className={styles.liveIndicator}>
            <span className={styles.liveDot} aria-hidden="true" />
            <span className={styles.liveText}>
              12 people started a habit in the last hour
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
