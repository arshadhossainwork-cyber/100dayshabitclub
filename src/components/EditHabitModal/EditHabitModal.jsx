import { useState, useRef, useEffect } from 'react';
import { HABIT_COLORS } from '../../utils/constants.js';
import HabitReminderSettings from '../HabitReminderSettings/HabitReminderSettings.jsx';
import styles from './EditHabitModal.module.css';

export default function EditHabitModal({ habit, open, onClose, onSave, existingNames = [], globalReminderTime = '09:00' }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [touched, setTouched] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState(null);
  const [reminderDays, setReminderDays] = useState(null);
  const [reminderMessage, setReminderMessage] = useState(null);
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  const trimmed = name.trim();
  const tooShort = touched && trimmed.length > 0 && trimmed.length < 2;
  const isDuplicate = existingNames.some(
    (n) => n.toLowerCase() === trimmed.toLowerCase() && n.toLowerCase() !== (habit?.name || '').toLowerCase()
  );
  const isValid = trimmed.length >= 2 && !isDuplicate;

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setColor(habit.color);
      setTouched(false);
      setReminderEnabled(habit.reminderEnabled || false);
      setReminderTime(habit.reminderTime || null);
      setReminderDays(habit.reminderDays || null);
      setReminderMessage(habit.reminderMessage || null);
    }
  }, [habit]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      dialog.close();
    }
  }, [open]);

  function handleReminderChange(updates) {
    if ('reminderEnabled' in updates) setReminderEnabled(updates.reminderEnabled);
    if ('reminderTime' in updates) setReminderTime(updates.reminderTime);
    if ('reminderDays' in updates) setReminderDays(updates.reminderDays);
    if ('reminderMessage' in updates) setReminderMessage(updates.reminderMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || !habit) return;
    onSave(habit.id, {
      name: trimmed,
      color,
      reminderEnabled,
      reminderTime,
      reminderDays,
      reminderMessage,
    });
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onCancel={onClose}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>Edit Habit</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="edit-habit-name">
              Habit Name
            </label>
            <input
              ref={inputRef}
              id="edit-habit-name"
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched(true)}
              maxLength={100}
              required
              aria-describedby={tooShort || isDuplicate ? 'edit-habit-name-hint' : undefined}
            />
            {tooShort && (
              <p id="edit-habit-name-hint" className={styles.validationError}>
                Name must be at least 2 characters
              </p>
            )}
            {isDuplicate && (
              <p id="edit-habit-name-hint" className={styles.validationWarning}>
                You already have a habit with this name
              </p>
            )}
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Color</span>
            <div className={styles.swatches} role="radiogroup" aria-label="Habit color">
              {HABIT_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className={
                    color === c.value ? styles.swatchSelected : styles.swatch
                  }
                  style={{ backgroundColor: c.value }}
                  onClick={() => setColor(c.value)}
                  aria-label={c.name}
                  role="radio"
                  aria-checked={color === c.value}
                />
              ))}
            </div>
          </div>

          <div className={styles.reminderSection}>
            <HabitReminderSettings
              reminderEnabled={reminderEnabled}
              reminderTime={reminderTime}
              reminderDays={reminderDays}
              reminderMessage={reminderMessage}
              globalReminderTime={globalReminderTime}
              onChange={handleReminderChange}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!isValid}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
