import { useRef, useEffect } from 'react';
import styles from './ImportPreview.module.css';

export default function ImportPreview({
  open,
  preview,
  existingHabits,
  onMerge,
  onReplace,
  onCancel,
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

  if (!preview) return null;

  const existingNames = new Set(
    (existingHabits || []).map((h) => h.name.toLowerCase())
  );

  const duplicateCount = preview.habits.filter((h) =>
    existingNames.has(h.name.toLowerCase())
  ).length;

  const newCount = preview.habits.length - duplicateCount;

  return (
    <dialog ref={dialogRef} className={styles.dialog} onCancel={onCancel}>
      <div className={styles.content}>
        <h2 className={styles.title}>Import Preview</h2>
        <p className={styles.summary}>
          {preview.activeCount} active, {preview.archivedCount} archived habit
          {preview.habitCount === 1 ? '' : 's'} in this backup
        </p>

        <div className={styles.habitList}>
          {preview.habits.map((h) => {
            const isDuplicate = existingNames.has(h.name.toLowerCase());
            return (
              <div key={h.id} className={styles.habitRow}>
                <span
                  className={styles.colorDot}
                  style={{ background: h.color }}
                />
                <span className={styles.habitName}>{h.name}</span>
                <span className={styles.dayCount}>
                  {h.completedDays.length}d
                </span>
                {isDuplicate && (
                  <span className={styles.existsBadge}>Exists</span>
                )}
              </div>
            );
          })}
        </div>

        {duplicateCount > 0 && (
          <p className={styles.warning}>
            {duplicateCount} habit{duplicateCount === 1 ? '' : 's'} already
            exist. Merge will skip duplicates and only add new habits.
          </p>
        )}

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          {newCount > 0 && (
            <button className={styles.mergeBtn} onClick={onMerge}>
              Merge ({newCount} new)
            </button>
          )}
          <button className={styles.replaceBtn} onClick={onReplace}>
            Replace All
          </button>
        </div>
      </div>
    </dialog>
  );
}
