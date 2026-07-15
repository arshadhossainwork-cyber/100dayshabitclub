import { useState, useEffect, useRef } from 'react';
import useIntersectionReveal from '../../hooks/useIntersectionReveal';
import useCountUp from '../../hooks/useCountUp';
import useReducedMotion from '../../hooks/useReducedMotion';
import styles from './ProductDemo.module.css';

const TOTAL_CELLS = 100;
const FILLED_COUNT = 67;
const FILL_INTERVAL = 60;

function DemoGrid({ isVisible, reduced }) {
  const [cells, setCells] = useState(() => Array(TOTAL_CELLS).fill(false));
  const [hoveredCell, setHoveredCell] = useState(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || startedRef.current) return;
    startedRef.current = true;

    if (reduced) {
      setCells((prev) => {
        const next = [...prev];
        for (let i = 0; i < FILLED_COUNT; i++) next[i] = true;
        return next;
      });
      return;
    }

    let count = 0;
    const order = Array.from({ length: TOTAL_CELLS }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, FILLED_COUNT);

    const interval = setInterval(() => {
      if (count >= order.length) {
        clearInterval(interval);
        return;
      }
      const idx = order[count];
      setCells((prev) => {
        const next = [...prev];
        next[idx] = true;
        return next;
      });
      count++;
    }, FILL_INTERVAL);

    return () => clearInterval(interval);
  }, [isVisible, reduced]);

  const filledCount = cells.filter(Boolean).length;

  return (
    <div
      className={styles.grid}
      role="img"
      aria-label={`Demo habit tracking grid showing ${filledCount} of 100 days completed`}
    >
      {cells.map((filled, i) => (
        <div
          key={i}
          className={`${styles.cell} ${filled ? styles.cellFilled : ''}`}
          onMouseEnter={() => setHoveredCell(i)}
          onMouseLeave={() => setHoveredCell(null)}
        >
          {hoveredCell === i && (
            <span className={styles.tooltip}>Day {i + 1}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ProductDemo() {
  const [ref, isVisible] = useIntersectionReveal({ threshold: 0.2 });
  const reduced = useReducedMotion();

  const completion = useCountUp(67, isVisible);
  const currentStreak = useCountUp(12, isVisible);
  const bestStreak = useCountUp(23, isVisible);

  return (
    <section className={styles.section} id="product-demo" ref={ref} aria-label="Product demo">
      <div className={styles.inner}>
        <div className={styles.labelPill}>
          <span className={styles.pillDot} aria-hidden="true" />
          See it in action
        </div>
        <h3 className={styles.heading}>
          Your habit, <span className={styles.accent}>visualized</span>
        </h3>

        <div className={`${styles.browser} ${isVisible ? styles.browserVisible : ''}`}>
          <div className={styles.browserGlow} aria-hidden="true" />

          <div className={styles.chrome} aria-hidden="true">
            <div className={styles.dots}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <div className={styles.urlBar}>100dayshabitclub.app</div>
          </div>

          <div className={styles.app}>
            <div className={styles.habitHeader}>
              <span className={styles.habitEmoji}>🧘</span>
              <div className={styles.habitMeta}>
                <span className={styles.habitName}>Morning Meditation</span>
                <span className={styles.habitDay}>Day 67 of 100</span>
              </div>
              <div className={styles.streakBadge}>
                🔥 12 day streak
              </div>
            </div>

            <div
              className={styles.progressBar}
              role="progressbar"
              aria-valuenow={isVisible ? 67 : 0}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Habit completion progress"
            >
              <div
                className={styles.progressFill}
                style={{ width: isVisible ? '67%' : '0%' }}
              />
            </div>

            <DemoGrid isVisible={isVisible} reduced={reduced} />

            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{completion}%</span>
                <span className={styles.statLabel}>Completion</span>
              </div>
              <div className={styles.statDivider} aria-hidden="true" />
              <div className={styles.stat}>
                <span className={styles.statValue}>{currentStreak}</span>
                <span className={styles.statLabel}>Current Streak</span>
              </div>
              <div className={styles.statDivider} aria-hidden="true" />
              <div className={styles.stat}>
                <span className={styles.statValue}>{bestStreak}</span>
                <span className={styles.statLabel}>Best Streak</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
