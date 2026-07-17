import { useState } from 'react';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog.jsx';
import styles from './ArchivedHabits.module.css';

export default function ArchivedHabits({ habits, onRestore, onDelete }) {
  const [deleteTarget, setDeleteTarget] = useState(null);

  function handleConfirmDelete() {
    if (deleteTarget) {
      onDelete(deleteTarget.id);
      setDeleteTarget(null);
    }
  }

  return (
    <>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Archived Habits</div>
        {habits.length === 0 ? (
          <p className={styles.empty}>No archived habits</p>
        ) : (
          <ul className={styles.list}>
            {habits.map((habit) => (
              <li key={habit.id} className={styles.item}>
                <div className={styles.habitInfo}>
                  <span
                    className={styles.dot}
                    style={{ background: habit.color }}
                  />
                  <span className={styles.name}>{habit.name}</span>
                  <span className={styles.count}>
                    {habit.completedDays.length} day{habit.completedDays.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className={styles.actions}>
                  <button
                    className={styles.restoreBtn}
                    onClick={() => onRestore(habit.id)}
                    aria-label={`Restore ${habit.name}`}
                  >
                    Restore
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => setDeleteTarget(habit)}
                    aria-label={`Delete ${habit.name}`}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Permanently"
        message={
          deleteTarget
            ? `Are you sure you want to permanently delete "${deleteTarget.name}"? This cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
