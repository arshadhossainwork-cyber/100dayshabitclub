import { useState, useRef, useEffect } from 'react';
import { HABIT_COLORS } from '../../utils/constants.js';
import styles from './AddHabitModal.module.css';

export default function AddHabitModal({ open, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(HABIT_COLORS[0].value);
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

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
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed, color);
    setName('');
    setColor(HABIT_COLORS[0].value);
    onClose();
  }

  function handleClose() {
    setName('');
    setColor(HABIT_COLORS[0].value);
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
              maxLength={100}
              required
            />
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
              disabled={!name.trim()}
            >
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
