import { getToday } from '../../utils/dates.js';
import styles from './TodayAction.module.css';

export default function TodayAction({ habit, onToggle }) {
  const today = getToday();
  const isDone = habit.completedDays.includes(today);
  const isMaxed = habit.completedDays.length >= 100;

  if (isMaxed && !isDone) {
    return null; // Already completed 100 days
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={isDone ? styles.complete : styles.incomplete}
        style={!isDone ? { backgroundColor: habit.color } : undefined}
        onClick={() => onToggle(habit.id)}
        aria-label={isDone ? 'Mark today as incomplete' : 'Complete today'}
      >
        {isDone ? (
          <>
            <span className={`${styles.check} ${styles.done}`}>&#x2713;</span>
            Done for Today
          </>
        ) : (
          <>
            <span className={styles.check}>&#x25CB;</span>
            Complete Today
          </>
        )}
      </button>
    </div>
  );
}
