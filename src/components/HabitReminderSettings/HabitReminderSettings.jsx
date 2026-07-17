import { useState } from 'react';
import styles from './HabitReminderSettings.module.css';

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function HabitReminderSettings({
  reminderEnabled,
  reminderTime,
  reminderDays,
  reminderMessage,
  globalReminderTime,
  onChange,
}) {
  const [expanded, setExpanded] = useState(reminderEnabled);

  function handleToggle(e) {
    const enabled = e.target.checked;
    setExpanded(enabled);
    onChange({ reminderEnabled: enabled });
  }

  function handleTimeChange(e) {
    onChange({ reminderTime: e.target.value });
  }

  function handleDayToggle(day) {
    const current = reminderDays || [];
    const updated = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day].sort();
    onChange({ reminderDays: updated.length === 0 || updated.length === 7 ? null : updated });
  }

  function handleMessageChange(e) {
    const value = e.target.value;
    onChange({ reminderMessage: value || null });
  }

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className={styles.headerLabel}>Custom Reminder</span>
        <span className={styles.chevron}>{expanded ? '\u25B2' : '\u25BC'}</span>
      </button>

      {expanded && (
        <div className={styles.body}>
          <label className={styles.toggleRow}>
            <span className={styles.toggleLabel}>Enable custom reminder</span>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                className={styles.toggleInput}
                checked={reminderEnabled}
                onChange={handleToggle}
              />
              <span className={styles.toggleSlider} />
            </label>
          </label>

          {reminderEnabled && (
            <>
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="habit-reminder-time">
                  Time
                </label>
                <input
                  id="habit-reminder-time"
                  type="time"
                  className={styles.timeInput}
                  value={reminderTime || ''}
                  onChange={handleTimeChange}
                  placeholder={globalReminderTime}
                />
                {!reminderTime && (
                  <span className={styles.hint}>
                    Using global default: {globalReminderTime}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <span className={styles.fieldLabel}>Days</span>
                <div className={styles.daySelector}>
                  {DAY_LABELS.map((label, i) => (
                    <button
                      key={i}
                      type="button"
                      className={
                        (reminderDays || []).includes(i)
                          ? styles.dayActive
                          : styles.day
                      }
                      onClick={() => handleDayToggle(i)}
                      aria-label={DAY_NAMES[i]}
                      aria-pressed={(reminderDays || []).includes(i)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {!reminderDays && (
                  <span className={styles.hint}>Every day</span>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="habit-reminder-msg">
                  Custom message
                </label>
                <input
                  id="habit-reminder-msg"
                  type="text"
                  className={styles.textInput}
                  value={reminderMessage || ''}
                  onChange={handleMessageChange}
                  maxLength={100}
                  placeholder="Auto-generated if empty"
                />
                <span className={styles.charCount}>
                  {(reminderMessage || '').length}/100
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
