import { useState, useRef, useEffect } from 'react';
import {
  isNotificationSupported,
  getPermissionStatus,
  requestPermission,
} from '../../utils/notifications.js';
import styles from './SettingsPanel.module.css';

export default function SettingsPanel({ open, settings, onUpdateSettings, onClose }) {
  const dialogRef = useRef(null);
  const [permission, setPermission] = useState(() => getPermissionStatus());

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
      setPermission(getPermissionStatus());
    } else {
      dialog.close();
    }
  }, [open]);

  async function handleRequestPermission() {
    const result = await requestPermission();
    setPermission(result);
  }

  const notificationsSupported = isNotificationSupported();

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onCancel={onClose}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>Settings</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close settings"
          >
            &times;
          </button>
        </div>

        <div className={styles.section}>
          <div className={styles.row}>
            <div>
              <div className={styles.rowLabel}>Daily Reminder</div>
              <div className={styles.rowDescription}>
                Get notified to complete your habits
              </div>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                className={styles.toggleInput}
                checked={settings.reminderEnabled}
                onChange={(e) =>
                  onUpdateSettings({ reminderEnabled: e.target.checked })
                }
                disabled={!notificationsSupported}
              />
              <span className={styles.toggleSlider} />
            </label>
          </div>
        </div>

        {settings.reminderEnabled && (
          <div className={styles.section}>
            <div className={styles.row}>
              <div>
                <div className={styles.rowLabel}>Reminder Time</div>
              </div>
              <input
                type="time"
                className={styles.timeInput}
                value={settings.reminderTime}
                onChange={(e) =>
                  onUpdateSettings({ reminderTime: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {notificationsSupported && (
          <div className={styles.section}>
            <div className={styles.row}>
              <div>
                <div className={styles.rowLabel}>Notification Permission</div>
                <div
                  className={`${styles.permissionStatus} ${
                    permission === 'granted'
                      ? styles.granted
                      : permission === 'denied'
                      ? styles.denied
                      : ''
                  }`}
                >
                  {permission === 'granted'
                    ? 'Notifications enabled'
                    : permission === 'denied'
                    ? 'Notifications blocked. Enable in browser settings'
                    : 'Not yet requested'}
                </div>
              </div>
              {permission === 'default' && (
                <button
                  className={styles.permissionBtn}
                  onClick={handleRequestPermission}
                >
                  Enable
                </button>
              )}
            </div>
          </div>
        )}

        {!notificationsSupported && (
          <div className={styles.section}>
            <p className={styles.permissionStatus}>
              Notifications are not supported in this browser.
            </p>
          </div>
        )}
      </div>
    </dialog>
  );
}
