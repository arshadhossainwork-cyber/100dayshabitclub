import { useState, useEffect, useRef } from 'react';
import { useReminder } from '../../hooks/useReminder.js';
import { getToday } from '../../utils/dates.js';
import {
  snoozeHabit,
  clearSnooze,
  isSnoozed,
  getSnoozeExpiry,
  cleanExpiredSnoozes,
} from '../../utils/snoozeStorage.js';
import SnoozeMenu from '../SnoozeMenu/SnoozeMenu.jsx';
import styles from './ReminderManager.module.css';

export default function ReminderManager({
  settings,
  habits,
  onToggle,
  showToast,
  onUpdateHabit,
}) {
  useReminder(settings, habits, { showToast });

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return sessionStorage.getItem('habitClub_reminderCollapsed') === 'true';
    } catch {
      return false;
    }
  });
  const [snoozeMenuFor, setSnoozeMenuFor] = useState(null);
  const [, setTick] = useState(0);

  // Refresh snoozed state periodically
  useEffect(() => {
    const interval = setInterval(() => {
      cleanExpiredSnoozes();
      setTick((t) => t + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem('habitClub_reminderCollapsed', String(collapsed));
    } catch {
      // ignore
    }
  }, [collapsed]);

  const today = getToday();
  const now = new Date();
  const isUrgent = now.getHours() >= 20;

  const incomplete = habits.filter(
    (h) => !h.archived && !h.completedDays.includes(today)
  );
  const activeIncomplete = incomplete.filter((h) => !isSnoozed(h.id));
  const snoozedHabits = incomplete.filter((h) => isSnoozed(h.id));

  const anyReminderEnabled =
    settings.reminderEnabled || habits.some((h) => h.reminderEnabled);

  const [showAllDone, setShowAllDone] = useState(false);
  const prevIncompleteRef = useRef(incomplete.length);

  // Show "all done" when incomplete transitions from >0 to 0
  useEffect(() => {
    if (prevIncompleteRef.current > 0 && incomplete.length === 0 && anyReminderEnabled) {
      setShowAllDone(true);
      const timer = setTimeout(() => setShowAllDone(false), 3000);
      return () => clearTimeout(timer);
    }
    prevIncompleteRef.current = incomplete.length;
  }, [incomplete.length, anyReminderEnabled]);

  if (!anyReminderEnabled) return null;

  if (incomplete.length === 0 && !showAllDone) return null;

  if (incomplete.length === 0 && showAllDone) {
    return (
      <div className={styles.banner} style={{ background: 'var(--color-success-light, rgba(16, 185, 129, 0.1))', color: 'var(--color-success, #059669)' }}>
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <span className={styles.text}>All habits done for today!</span>
          </div>
        </div>
      </div>
    );
  }

  function handleSnooze(habitId, option) {
    const duration = option.getDuration();
    const until = Date.now() + duration;

    if (option.key === 'SKIP_TODAY' && onUpdateHabit) {
      onUpdateHabit(habitId, { snoozedUntil: new Date(until).toISOString() });
    }

    snoozeHabit(habitId, until);
    setTick((t) => t + 1);

    if (showToast) {
      showToast(`Snoozed ${option.label}`, { type: 'info', duration: 2000 });
    }
  }

  function handleUnsnooze(habitId) {
    clearSnooze(habitId);
    if (onUpdateHabit) {
      onUpdateHabit(habitId, { snoozedUntil: null });
    }
    setTick((t) => t + 1);
  }

  function handleDone(habitId) {
    if (onToggle) {
      onToggle(habitId, today);
    }
    // Clear snooze when marking done
    clearSnooze(habitId);
    setTick((t) => t + 1);
  }

  function formatSnoozeExpiry(habitId) {
    const expiry = getSnoozeExpiry(habitId);
    if (!expiry) return '';
    return new Date(expiry).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  const bannerClass = [
    styles.banner,
    isUrgent ? styles.urgent : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={bannerClass}>
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <span className={styles.icon} aria-hidden="true">
            &#x1F514;
          </span>
          <span className={styles.text}>
            {activeIncomplete.length} habit
            {activeIncomplete.length === 1 ? '' : 's'} left today
          </span>
        </div>
        <button
          className={styles.collapseBtn}
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand reminders' : 'Collapse reminders'}
        >
          {collapsed ? '\u25BC' : '\u25B2'}
        </button>
      </div>

      {!collapsed && (
        <div className={styles.habitList}>
          {activeIncomplete.map((habit) => (
            <div key={habit.id} className={styles.habitRow}>
              <span
                className={styles.habitDot}
                style={{ backgroundColor: habit.color }}
              />
              <span className={styles.habitName}>{habit.name}</span>
              <div className={styles.habitActions}>
                <button
                  className={styles.doneBtn}
                  onClick={() => handleDone(habit.id)}
                >
                  Done
                </button>
                <div className={styles.snoozeWrapper}>
                  <button
                    className={styles.snoozeBtn}
                    onClick={() =>
                      setSnoozeMenuFor(
                        snoozeMenuFor === habit.id ? null : habit.id
                      )
                    }
                  >
                    Snooze &#x25BE;
                  </button>
                  {snoozeMenuFor === habit.id && (
                    <SnoozeMenu
                      habitId={habit.id}
                      onSnooze={handleSnooze}
                      onClose={() => setSnoozeMenuFor(null)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}

          {snoozedHabits.length > 0 && (
            <div className={styles.snoozedSection}>
              <div className={styles.snoozedHeader}>
                Snoozed ({snoozedHabits.length})
              </div>
              {snoozedHabits.map((habit) => (
                <div key={habit.id} className={styles.habitRow}>
                  <span
                    className={styles.habitDot}
                    style={{ backgroundColor: habit.color, opacity: 0.5 }}
                  />
                  <span className={styles.habitNameMuted}>
                    {habit.name}
                    <span className={styles.snoozeUntil}>
                      {' '}
                      (until {formatSnoozeExpiry(habit.id)})
                    </span>
                  </span>
                  <button
                    className={styles.unsnoozeBtn}
                    onClick={() => handleUnsnooze(habit.id)}
                  >
                    Unsnooze
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
