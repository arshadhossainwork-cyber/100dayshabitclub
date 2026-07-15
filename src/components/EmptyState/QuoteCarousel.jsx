import { useState, useEffect, useCallback } from 'react';
import { quotes } from './emptyStateData';
import styles from './QuoteCarousel.module.css';

const ROTATION_INTERVAL = 8000;

export default function QuoteCarousel() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % quotes.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(advance, ROTATION_INTERVAL);
    return () => clearInterval(interval);
  }, [advance]);

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((prev) => Math.min(prev + 100 / (ROTATION_INTERVAL / 50), 100));
    }, 50);
    return () => clearInterval(tick);
  }, [active]);

  const { text, author } = quotes[active];

  return (
    <section className={styles.section} aria-label="Inspirational quotes">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.quoteIcon} aria-hidden="true">
          &ldquo;
        </div>

        <div aria-live="polite" className={styles.quoteArea}>
          <blockquote key={active} className={styles.quote}>
            <p className={styles.text}>{text}</p>
            <footer className={styles.author}>
              <span className={styles.authorDash} aria-hidden="true" />
              {author}
            </footer>
          </blockquote>
        </div>

        <div className={styles.segments} role="tablist" aria-label="Quote navigation">
          {quotes.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Quote ${i + 1}`}
              className={`${styles.segment} ${i === active ? styles.segmentActive : ''}`}
              onClick={() => {
                setActive(i);
                setProgress(0);
              }}
            >
              <div
                className={styles.segmentFill}
                style={{
                  width: i === active ? `${progress}%` : i < active ? '100%' : '0%',
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
