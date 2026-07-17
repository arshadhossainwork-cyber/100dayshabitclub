import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  isNotificationSupported,
  getPermissionStatus,
  requestPermission,
  isNative,
} from '../../utils/notifications.js';
import {
  exportData,
  importData,
  exportCSV,
  validateImport,
  mergeImport,
  resetAllData,
} from '../../utils/storage.js';
import { getToday } from '../../utils/dates.js';
import { detectTimezone, getTimezoneLabel } from '../../utils/timezoneUtils.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog.jsx';
import ImportPreview from '../ImportPreview/ImportPreview.jsx';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy.jsx';
import ArchivedHabits from '../ArchivedHabits/ArchivedHabits.jsx';
import styles from './SettingsPanel.module.css';

function getBrowserName() {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'firefox';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'safari';
  return 'chrome';
}

function getDeniedInstructions() {
  const browser = getBrowserName();
  if (isNative) {
    return 'Open your device Settings > Apps > 100 Days Habit Club > Notifications and enable them.';
  }
  if (browser === 'firefox') {
    return 'Click the lock icon in the address bar, then change Notifications to "Allow".';
  }
  if (browser === 'safari') {
    return 'Go to Safari > Settings > Websites > Notifications and allow this site.';
  }
  return 'Click the lock icon in the address bar, then Site settings > Notifications > Allow.';
}

export default function SettingsPanel({
  open,
  settings,
  onUpdateSettings,
  onClose,
  onReloadData,
  showToast,
  archivedHabits,
  onUnarchive,
  onDeletePermanent,
  habits,
  syncState,
  lastSyncAt,
  onTriggerSync,
  onClearSyncError,
  canInstall,
  onInstall,
  isInstalled,
  isIOS,
}) {
  const { isSignedIn, user, signOut } = useAuth();
  const dialogRef = useRef(null);
  const fileInputRef = useRef(null);
  const [permission, setPermission] = useState('default');
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [importPreview, setImportPreview] = useState(null);
  const [resetOpen, setResetOpen] = useState(false);
  const [resetInput, setResetInput] = useState('');
  const [showTimezoneChange, setShowTimezoneChange] = useState(false);

  useEffect(() => {
    getPermissionStatus().then(setPermission);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
      getPermissionStatus().then(setPermission);
    } else {
      dialog.close();
    }
  }, [open]);

  async function handleRequestPermission() {
    const result = await requestPermission();
    setPermission(result);
    if (result === 'granted') {
      onUpdateSettings({ notificationPermissionAsked: true });
    }
  }

  function handleExport() {
    const json = exportData();
    const date = getToday();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `habitclub-backup-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported', { type: 'success' });
  }

  function handleExportCSV() {
    const allHabits = [...(habits || []), ...(archivedHabits || [])];
    const csv = exportCSV(allHabits);
    const date = getToday();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `habitclub-export-${date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('CSV exported', { type: 'success' });
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = validateImport(ev.target.result);
      if (!result.valid) {
        showToast(result.error || 'Invalid file', { type: 'error' });
      } else {
        setImportPreview({ ...result, json: ev.target.result });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function handleImportReplace() {
    if (!importPreview) return;
    try {
      importData(importPreview.json);
      setImportPreview(null);
      onReloadData();
      showToast('Data replaced successfully', { type: 'success' });
    } catch {
      showToast('Failed to import data', { type: 'error' });
    }
  }

  function handleImportMerge() {
    if (!importPreview) return;
    try {
      const { addedCount } = mergeImport(importPreview.json);
      setImportPreview(null);
      onReloadData();
      showToast(`Merged: ${addedCount} new habit${addedCount === 1 ? '' : 's'} added`, {
        type: 'success',
      });
    } catch {
      showToast('Failed to merge data', { type: 'error' });
    }
  }

  function handleResetConfirm() {
    if (resetInput !== 'RESET') return;
    resetAllData();
    setResetOpen(false);
    setResetInput('');
    onReloadData();
    onClose();
    showToast('All data has been reset', { type: 'success' });
  }

  async function handleDisconnect() {
    const { error } = await signOut();
    if (error) {
      showToast('Failed to disconnect', { type: 'error' });
    } else {
      onClose();
      showToast('Disconnected — your local data is preserved', { type: 'info' });
    }
  }

  function formatSyncTime(isoString) {
    if (!isoString) return 'Never';
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    return date.toLocaleDateString();
  }

  const notificationsSupported = isNotificationSupported();
  const detectedTz = detectTimezone();
  const currentTz = settings.timezone || detectedTz;

  return (
    <>
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

          {isSignedIn && (
            <div className={styles.section}>
              <div className={styles.row}>
                <div>
                  <div className={styles.rowLabel}>{user?.email}</div>
                  <div className={styles.rowDescription}>Signed in</div>
                </div>
                <Link to="/profile" className={styles.permissionBtn} onClick={onClose}>
                  Profile
                </Link>
              </div>
            </div>
          )}

          {isSignedIn && (
            <div className={styles.dataSection}>
              <div className={styles.dataSectionTitle}>Cloud Sync</div>
              <div className={styles.syncStatus}>
                {syncState === 'syncing' && 'Syncing...'}
                {syncState === 'synced' && lastSyncAt && (
                  <>Last synced: <span className={styles.syncTime}>{formatSyncTime(lastSyncAt)}</span></>
                )}
                {syncState === 'offline' && 'Offline — changes will sync when reconnected'}
                {syncState === 'error' && 'Sync error — your data is safe locally'}
                {syncState === 'idle' && !lastSyncAt && 'Not yet synced'}
                {syncState === 'idle' && lastSyncAt && (
                  <>Last synced: <span className={styles.syncTime}>{formatSyncTime(lastSyncAt)}</span></>
                )}
                {syncState === 'conflict' && 'Conflicts detected — tap Sync Now to re-sync'}
              </div>
              <div className={styles.dataActions}>
                <button
                  className={styles.dataBtn}
                  onClick={() => {
                    if (onClearSyncError) onClearSyncError();
                    onTriggerSync();
                  }}
                  disabled={syncState === 'syncing'}
                >
                  {syncState === 'syncing' ? 'Syncing...' : 'Sync Now'}
                </button>
              </div>
              <div className={styles.syncActions}>
                <button
                  className={styles.dataBtn}
                  onClick={handleExport}
                >
                  Export Cloud Data
                </button>
                <button
                  className={styles.disconnectBtn}
                  onClick={handleDisconnect}
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}

          {/* ── Notifications ── */}
          <div className={styles.dataSection}>
            <div className={styles.dataSectionTitle}>Notifications</div>

            {/* Daily Reminder */}
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

              {settings.reminderEnabled && (
                <div className={styles.subRow}>
                  <div className={styles.row}>
                    <div className={styles.rowLabel}>Time</div>
                    <input
                      type="time"
                      className={styles.timeInput}
                      value={settings.reminderTime}
                      onChange={(e) =>
                        onUpdateSettings({ reminderTime: e.target.value })
                      }
                    />
                  </div>
                  <div className={styles.row}>
                    <div>
                      <div className={styles.rowLabel}>Weekend reminders</div>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        className={styles.toggleInput}
                        checked={settings.weekendReminders}
                        onChange={(e) =>
                          onUpdateSettings({ weekendReminders: e.target.checked })
                        }
                      />
                      <span className={styles.toggleSlider} />
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Quiet Hours */}
            <div className={styles.section}>
              <div className={styles.row}>
                <div>
                  <div className={styles.rowLabel}>Quiet Hours</div>
                  <div className={styles.rowDescription}>
                    Pause notifications during set hours
                  </div>
                </div>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    className={styles.toggleInput}
                    checked={settings.quietHoursEnabled}
                    onChange={(e) =>
                      onUpdateSettings({ quietHoursEnabled: e.target.checked })
                    }
                  />
                  <span className={styles.toggleSlider} />
                </label>
              </div>

              {settings.quietHoursEnabled && (
                <div className={styles.subRow}>
                  <div className={styles.row}>
                    <div className={styles.rowLabel}>From</div>
                    <input
                      type="time"
                      className={styles.timeInput}
                      value={settings.quietHoursStart}
                      onChange={(e) =>
                        onUpdateSettings({ quietHoursStart: e.target.value })
                      }
                    />
                  </div>
                  <div className={styles.row}>
                    <div className={styles.rowLabel}>To</div>
                    <input
                      type="time"
                      className={styles.timeInput}
                      value={settings.quietHoursEnd}
                      onChange={(e) =>
                        onUpdateSettings({ quietHoursEnd: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Daily Summary */}
            <div className={styles.section}>
              <div className={styles.row}>
                <div>
                  <div className={styles.rowLabel}>Daily Summary</div>
                  <div className={styles.rowDescription}>
                    Evening recap of your progress
                  </div>
                </div>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    className={styles.toggleInput}
                    checked={settings.dailySummaryEnabled}
                    onChange={(e) =>
                      onUpdateSettings({ dailySummaryEnabled: e.target.checked })
                    }
                    disabled={!notificationsSupported}
                  />
                  <span className={styles.toggleSlider} />
                </label>
              </div>

              {settings.dailySummaryEnabled && (
                <div className={styles.subRow}>
                  <div className={styles.row}>
                    <div className={styles.rowLabel}>Time</div>
                    <input
                      type="time"
                      className={styles.timeInput}
                      value={settings.dailySummaryTime}
                      onChange={(e) =>
                        onUpdateSettings({ dailySummaryTime: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Missed Habit Reminder */}
            <div className={styles.section}>
              <div className={styles.row}>
                <div>
                  <div className={styles.rowLabel}>Missed Habit Reminder</div>
                  <div className={styles.rowDescription}>
                    Gentle nudge if habits incomplete near bedtime
                  </div>
                </div>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    className={styles.toggleInput}
                    checked={settings.missedHabitReminder}
                    onChange={(e) =>
                      onUpdateSettings({ missedHabitReminder: e.target.checked })
                    }
                  />
                  <span className={styles.toggleSlider} />
                </label>
              </div>
            </div>

            {/* Milestone Notifications */}
            <div className={styles.section}>
              <div className={styles.row}>
                <div>
                  <div className={styles.rowLabel}>Milestone Notifications</div>
                  <div className={styles.rowDescription}>
                    Celebrate 25, 50, 75, 100 day milestones
                  </div>
                </div>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    className={styles.toggleInput}
                    checked={settings.milestoneNotifications}
                    onChange={(e) =>
                      onUpdateSettings({ milestoneNotifications: e.target.checked })
                    }
                  />
                  <span className={styles.toggleSlider} />
                </label>
              </div>
            </div>

            {/* Timezone */}
            <div className={styles.section}>
              <div className={styles.row}>
                <div>
                  <div className={styles.rowLabel}>Timezone</div>
                  <div className={styles.rowDescription}>
                    {getTimezoneLabel(currentTz)}
                  </div>
                </div>
                {!showTimezoneChange ? (
                  <button
                    className={styles.linkBtn}
                    onClick={() => setShowTimezoneChange(true)}
                  >
                    Change
                  </button>
                ) : (
                  <div className={styles.tzActions}>
                    <button
                      className={styles.linkBtn}
                      onClick={() => {
                        onUpdateSettings({ timezone: detectedTz });
                        setShowTimezoneChange(false);
                        showToast('Timezone updated', { type: 'success' });
                      }}
                    >
                      Use detected ({getTimezoneLabel(detectedTz)})
                    </button>
                    <button
                      className={styles.linkBtn}
                      onClick={() => setShowTimezoneChange(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Notification Permission */}
            {notificationsSupported && (
              <div className={styles.section}>
                <div className={styles.row}>
                  <div>
                    <div className={styles.rowLabel}>
                      Notification Permission
                    </div>
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
                        ? getDeniedInstructions()
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

            {/* Browser limitation note */}
            {!isNative && (
              <div className={styles.browserNote}>
                Browser reminders only work when this site is open.
                For reliable reminders, install the Android app.
              </div>
            )}
          </div>

          {/* ── Install App ── */}
          <div className={styles.dataSection}>
            <div className={styles.dataSectionTitle}>Install App</div>
            <div className={styles.section}>
              {isInstalled ? (
                <div className={styles.installStatus}>
                  <span className={styles.installCheck}>&#x2713;</span>
                  App is installed
                </div>
              ) : isIOS ? (
                <div className={styles.installStatus}>
                  Tap the share button <span className={styles.shareIcon}>&#x2191;</span> in Safari, then &quot;Add to Home Screen&quot;
                </div>
              ) : canInstall ? (
                <button className={styles.installBtn} onClick={onInstall}>
                  Install App
                </button>
              ) : (
                <div className={styles.installStatus}>
                  Open in a supported browser (Chrome, Edge, or Safari) to install
                </div>
              )}
            </div>
          </div>

          <div className={styles.dataSection}>
            <div className={styles.dataSectionTitle}>Data</div>
            <div className={styles.dataActions}>
              <button className={styles.dataBtn} onClick={handleExport}>
                Export JSON
              </button>
              <button className={styles.dataBtn} onClick={handleExportCSV}>
                Export CSV
              </button>
              <button className={styles.dataBtn} onClick={handleImportClick}>
                Import Data
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileSelect}
                hidden
              />
            </div>
          </div>

          <ArchivedHabits
            habits={archivedHabits}
            onRestore={onUnarchive}
            onDelete={onDeletePermanent}
          />

          <div className={styles.dataSection}>
            <div className={styles.dataSectionTitle}>Danger Zone</div>
            <button
              className={styles.resetBtn}
              onClick={() => setResetOpen(true)}
            >
              Reset All Data
            </button>
          </div>

          <div className={styles.footer}>
            <button
              className={styles.privacyLink}
              onClick={() => setPrivacyOpen(true)}
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </dialog>

      <ImportPreview
        open={!!importPreview}
        preview={importPreview}
        existingHabits={[...(habits || []), ...(archivedHabits || [])]}
        onMerge={handleImportMerge}
        onReplace={handleImportReplace}
        onCancel={() => setImportPreview(null)}
      />

      <ConfirmDialog
        open={resetOpen}
        title="Reset All Data"
        confirmLabel="Reset"
        confirmDisabled={resetInput !== 'RESET'}
        onConfirm={handleResetConfirm}
        onCancel={() => {
          setResetOpen(false);
          setResetInput('');
        }}
      >
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 'var(--space-md)' }}>
          This will permanently delete all habits and progress. A backup will be
          saved automatically. Type <strong>RESET</strong> to confirm.
        </p>
        <input
          type="text"
          className={styles.resetInput}
          value={resetInput}
          onChange={(e) => setResetInput(e.target.value)}
          placeholder="Type RESET to confirm"
          autoComplete="off"
          aria-label="Type RESET to confirm data deletion"
        />
      </ConfirmDialog>

      <PrivacyPolicy open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
}
