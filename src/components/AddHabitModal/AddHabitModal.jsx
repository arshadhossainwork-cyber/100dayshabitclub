import { useState, useRef, useEffect } from 'react';
import { HABIT_COLORS } from '../../utils/constants.js';
import styles from './AddHabitModal.module.css';

export default function AddHabitModal({ open, onClose, onAdd, existingNames = [] }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(HABIT_COLORS[0].value);
  const [touched, setTouched] = useState(false);
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  const trimmed = name.trim();
  const tooShort = touched && trimmed.length > 0 && trimmed.length < 2;
  const isDuplicate = existingNames.some(
    (n) => n.toLowerCase() === trimmed.toLowerCase()
  );
  const isValid = trimmed.length >= 2;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
      // Small delay to let the dialog render before focusing
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      dialog.close();
    }
  }, [open]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    onAdd(trimmed, color);
    setName('');
    setColor(HABIT_COLORS[0].value);
    setTouched(false);
    onClose();
  }

  function handleClose() {
    setName('');
    setColor(HABIT_COLORS[0].value);
    setTouched(false);
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onCancel={handleClose}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>New Habit</h2>
          <button
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="habit-name">
              Habit Name
            </label>
            <input
              ref={inputRef}
              id="habit-name"
              className={styles.input}
              type="text"
              placeholder="e.g. Read 30 minutes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched(true)}
              maxLength={100}
              required
              aria-describedby={tooShort || isDuplicate ? 'habit-name-hint' : undefined}
            />
            {tooShort && (
              <p id="habit-name-hint" className={styles.validationError}>
                Name must be at least 2 characters
              </p>
            )}
            {isDuplicate && (
              <p id="habit-name-hint" className={styles.validationWarning}>
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

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!isValid}
            >
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
