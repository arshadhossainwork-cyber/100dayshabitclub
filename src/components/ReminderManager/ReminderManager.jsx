import { useReminder } from '../../hooks/useReminder.js';
import { getToday } from '../../utils/dates.js';
import styles from './ReminderManager.module.css';

export default function ReminderManager({ settings, habits }) {
  useReminder(settings, habits);

  // In-app banner fallback
  const today = getToday();
  const incomplete = habits.filter(
    (h) => !h.archived && !h.completedDays.includes(today)
  );

  if (!settings.reminderEnabled || incomplete.length === 0) {
    return null;
  }

  return (
    <div className={styles.banner}>
      <span className={styles.icon} aria-hidden="true">&#x1F514;</span>
      <span className={styles.text}>
        {incomplete.length} habit{incomplete.length === 1 ? '' : 's'} left today
      </span>
    </div>
  );
}
