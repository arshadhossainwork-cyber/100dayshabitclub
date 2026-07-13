import { useState, useRef, useEffect } from 'react';
import { HABIT_COLORS } from '../../utils/constants.js';
import styles from './EditHabitModal.module.css';

export default function EditHabitModal({ habit, open, onClose, onSave }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setColor(habit.color);
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

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || !habit) return;
    onSave(habit.id, { name: trimmed, color });
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
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!name.trim()}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
