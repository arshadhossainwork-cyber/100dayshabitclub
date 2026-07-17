import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useToast } from '../../hooks/useToast.jsx';
import { exportData } from '../../utils/storage.js';
import { getToday } from '../../utils/dates.js';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog.jsx';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user, signOut, updateProfile, deleteAccount } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const metadata = user?.user_metadata || {};
  const [displayName, setDisplayName] = useState(metadata.display_name || '');
  const [timezone, setTimezone] = useState(
    metadata.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [weekStart, setWeekStart] = useState(metadata.week_start || 'sunday');
  const [saving, setSaving] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  const avatarUrl = metadata.avatar_url;
  const email = user?.email || '';
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : '';

  const initial = (metadata.display_name || email || '?')[0].toUpperCase();

  async function handleSaveName() {
    setSaving(true);
    const { error } = await updateProfile({ display_name: displayName });
    setSaving(false);
    if (error) {
      showToast(error.message, { type: 'error' });
    } else {
      showToast('Profile updated', { type: 'success' });
    }
  }

  async function handleSavePreferences() {
    setSaving(true);
    const { error } = await updateProfile({ timezone, week_start: weekStart });
    setSaving(false);
    if (error) {
      showToast(error.message, { type: 'error' });
    } else {
      showToast('Preferences saved', { type: 'success' });
    }
  }

  async function handleSignOut() {
    const { error } = await signOut();
    if (error) {
      showToast(error.message, { type: 'error' });
    } else {
      showToast('Signed out', { type: 'success' });
      navigate('/');
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

  async function handleDeleteConfirm() {
    if (deleteInput !== 'DELETE') return;
    const { error } = await deleteAccount();
    setDeleteOpen(false);
    setDeleteInput('');
    if (error) {
      showToast(error.message, { type: 'error' });
    } else {
      showToast('Account deleted. Local data preserved.', { type: 'success' });
      navigate('/');
    }
  }

  let timezones = [];
  try {
    timezones = Intl.supportedValuesOf('timeZone');
  } catch {
    timezones = [Intl.DateTimeFormat().resolvedOptions().timeZone];
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link to="/" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <span className={styles.headerTitle}>
            <span className={styles.headerAccent}>100</span> Days
          </span>
        </div>

        <div className={styles.profile}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className={styles.avatar} />
          ) : (
            <div className={styles.avatarInitial}>{initial}</div>
          )}
          <div className={styles.email}>{email}</div>
          {memberSince && (
            <div className={styles.memberSince}>Member since {memberSince}</div>
          )}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Personal Info</div>
          <div className={styles.row}>
            <div className={styles.rowInfo}>
              <div className={styles.rowLabel}>Display Name</div>
            </div>
            <div className={styles.rowControl}>
              <input
                type="text"
                className={styles.input}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
              />
              <button
                className={styles.saveBtn}
                onClick={handleSaveName}
                disabled={saving}
              >
                Save
              </button>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowInfo}>
              <div className={styles.rowLabel}>Email</div>
              <div className={styles.rowDescription}>{email}</div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Preferences</div>
          <div className={styles.row}>
            <div className={styles.rowInfo}>
              <div className={styles.rowLabel}>Timezone</div>
            </div>
            <select
              className={styles.select}
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
          <div className={styles.row}>
            <div className={styles.rowInfo}>
              <div className={styles.rowLabel}>Week starts on</div>
            </div>
            <select
              className={styles.select}
              value={weekStart}
              onChange={(e) => setWeekStart(e.target.value)}
            >
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
            </select>
          </div>
          <div className={styles.row}>
            <div className={styles.rowInfo}>
              <div className={styles.rowLabel}>Theme</div>
            </div>
            <select className={styles.select} value="dark" disabled>
              <option value="dark">Dark</option>
            </select>
          </div>
          <button
            className={styles.saveBtn}
            onClick={handleSavePreferences}
            disabled={saving}
            style={{ marginTop: 'var(--space-sm)', alignSelf: 'flex-end' }}
          >
            Save Preferences
          </button>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Account</div>
          <button className={styles.signOutBtn} onClick={handleSignOut}>
            Sign Out
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => setDeleteOpen(true)}
          >
            Delete Account
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Account"
        confirmLabel="Delete Account"
        confirmDisabled={deleteInput !== 'DELETE'}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteOpen(false);
          setDeleteInput('');
        }}
      >
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 'var(--space-md)' }}>
          This will permanently delete your account. Your local data will be preserved on this device.
        </p>
        <button
          type="button"
          onClick={handleExport}
          style={{
            display: 'block',
            marginBottom: 'var(--space-md)',
            padding: 'var(--space-xs) var(--space-sm)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
            fontSize: '0.85rem',
            fontWeight: 600,
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          Export my data first
        </button>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: 'var(--space-sm)' }}>
          Type <strong>DELETE</strong> to confirm:
        </p>
        <input
          type="text"
          className={styles.deleteInput}
          value={deleteInput}
          onChange={(e) => setDeleteInput(e.target.value)}
          placeholder="Type DELETE to confirm"
          autoComplete="off"
        />
      </ConfirmDialog>
    </div>
  );
}
