import { useStats } from '../../hooks/useStats.js';
import styles from './Stats.module.css';

export default function Stats({ habit }) {
  const { totalDays, currentStreak, longestStreak, completionPct } =
    useStats(habit);

  return (
    <div className={styles.stats}>
      <div className={styles.primaryStat}>
        <div className={styles.primaryValue} style={{ color: habit.color }}>
          <span className={styles.fireIcon} aria-hidden="true">&#x1F525;</span>
          {currentStreak}
        </div>
        <div className={styles.primaryLabel}>Day Streak</div>
      </div>
      <div className={styles.secondaryStats}>
        <div className={styles.stat}>
          <div className={styles.value}>{longestStreak}</div>
          <div className={styles.label}>Best</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.value}>{completionPct}%</div>
          <div className={styles.label}>Complete</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.value}>{totalDays}</div>
          <div className={styles.label}>Total</div>
        </div>
      </div>
    </div>
  );
}
