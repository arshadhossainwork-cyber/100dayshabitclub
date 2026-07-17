import { useRef, useEffect } from 'react';
import styles from './ConfirmDialog.module.css';

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  confirmDisabled = false,
  onConfirm,
  onCancel,
  children,
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

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onCancel={onCancel}
      role="alertdialog"
      aria-labelledby="confirm-dialog-title"
    >
      <div className={styles.content}>
        <div className={styles.icon} aria-hidden="true">
          &#x26A0;&#xFE0F;
        </div>
        <h2 className={styles.title} id="confirm-dialog-title">{title}</h2>
        {message && <p className={styles.message}>{message}</p>}
        {children}
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button
            className={styles.confirmBtn}
            onClick={onConfirm}
            disabled={confirmDisabled}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
