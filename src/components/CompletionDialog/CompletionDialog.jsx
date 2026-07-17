import { useRef, useEffect } from 'react';
import { computeHabitStats, computeMilestones } from '../../utils/analytics.js';
import { getCompletionMessage } from '../../utils/motivation.js';
import { formatDate, daysSince } from '../../utils/dates.js';
import styles from './CompletionDialog.module.css';

export default function CompletionDialog({
  habit,
  open,
  onClose,
  onArchive,
  onContinue,
  onRepeat,
  onShare,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  if (!habit) return null;

  const stats = computeHabitStats(habit);
  const completion = getCompletionMessage(habit);
  const sorted = habit.completedDays ? [...habit.completedDays].sort() : [];
  const firstDay = sorted[0];
  const lastDay = sorted[sorted.length - 1];
  const totalCalendarDays = firstDay ? daysSince(firstDay) + 1 : 0;
  const missedDays = Math.max(0, totalCalendarDays - stats.totalDays);
  const milestones = computeMilestones(habit);
  const unlockedMilestones = milestones.filter((m) => m.unlocked);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onCancel={onClose}
    >
      <div className={styles.content}>
        <div className={styles.badge}>
          <svg viewBox="0 0 120 120" className={styles.ring}>
            <circle cx="60" cy="60" r="52" className={styles.ringTrack} />
            <circle cx="60" cy="60" r="52" className={styles.ringComplete} />
          </svg>
          <span className={styles.badgeIcon}>100</span>
        </div>

        <h2 className={styles.title}>
          {completion ? completion.headline : `${habit.name}: Complete!`}
        </h2>

        <p className={styles.body}>
          {completion
            ? completion.body
            : `You completed ${stats.totalDays} days. That's real commitment.`}
        </p>

        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <div className={styles.statValue}>{stats.totalDays}</div>
            <div className={styles.statLabel}>Completed</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{missedDays}</div>
            <div className={styles.statLabel}>Missed</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{stats.longestStreak}</div>
            <div className={styles.statLabel}>Best Streak</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{stats.completionPct}%</div>
            <div className={styles.statLabel}>Rate</div>
          </div>
        </div>

        {firstDay && lastDay && (
          <div className={styles.timeline}>
            <span>{formatDate(firstDay)}</span>
            <span className={styles.timelineArrow}>&rarr;</span>
            <span>{formatDate(lastDay)}</span>
          </div>
        )}

        {unlockedMilestones.length > 0 && (
          <div className={styles.milestonesRow}>
            {unlockedMilestones.slice(0, 4).map((m) => (
              <span key={m.id} className={styles.milestoneBadge}>{m.name}</span>
            ))}
            {unlockedMilestones.length > 4 && (
              <span className={styles.milestoneBadge}>+{unlockedMilestones.length - 4}</span>
            )}
          </div>
        )}

        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={onContinue}>
            Keep Going
          </button>
          <button className={styles.secondaryBtn} onClick={onArchive}>
            Archive Habit
          </button>
          {onRepeat && (
            <button className={styles.secondaryBtn} onClick={onRepeat}>
              Start Over
            </button>
          )}
          <button className={styles.shareBtn} onClick={() => onShare?.(habit)}>
            Share Achievement
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Dismiss
          </button>
        </div>
      </div>
    </dialog>
  );
}
