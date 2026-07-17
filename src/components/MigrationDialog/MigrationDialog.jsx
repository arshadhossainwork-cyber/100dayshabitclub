import { useRef, useEffect } from 'react';
import styles from './MigrationDialog.module.css';

export default function MigrationDialog({
  open,
  migrationData,
  migrationState,
  migrationError,
  onMerge,
  onKeepCloud,
  onDismiss,
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

  if (!migrationData) return null;

  const isMigrating = migrationState === 'migrating';

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onCancel={onDismiss}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>We found habits on this device</h2>
        <p className={styles.subtitle}>
          Choose how to combine your local data with your account.
        </p>

        <div className={styles.comparison}>
          <div className={styles.side}>
            <div className={styles.sideHeader}>This device</div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{migrationData.localCount}</span>
              <span className={styles.statLabel}>habits</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{migrationData.localEntries}</span>
              <span className={styles.statLabel}>entries</span>
            </div>
            <div className={styles.statDate}>
              Started {migrationData.oldestLocal}
            </div>
            <div className={styles.statDate}>
              Last active {migrationData.latestLocal}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.side}>
            <div className={styles.sideHeader}>Your account</div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{migrationData.cloudCount}</span>
              <span className={styles.statLabel}>habits</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{migrationData.cloudEntries}</span>
              <span className={styles.statLabel}>entries</span>
            </div>
            <div className={styles.statDate}>
              Started {migrationData.oldestCloud}
            </div>
            <div className={styles.statDate}>
              Last active {migrationData.latestCloud}
            </div>
          </div>
        </div>

        {migrationError && (
          <div className={styles.error}>
            {migrationError}
          </div>
        )}

        <div className={styles.actions}>
          <button
            className={styles.primaryBtn}
            onClick={onMerge}
            disabled={isMigrating}
          >
            {isMigrating ? 'Merging...' : 'Add local habits to account'}
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={onKeepCloud}
            disabled={isMigrating}
          >
            Keep cloud account data only
          </button>
          <button
            className={styles.cancelBtn}
            onClick={onDismiss}
            disabled={isMigrating}
          >
            Cancel — stay in guest mode
          </button>
        </div>

        <p className={styles.notice}>
          A backup will be saved before any changes are made.
        </p>
      </div>
    </dialog>
  );
}
