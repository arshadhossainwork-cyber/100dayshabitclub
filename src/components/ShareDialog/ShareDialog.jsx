import { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { renderShareCard, DEFAULT_VISIBILITY } from '../../utils/shareCardRenderer.js';
import { shareOrDownload, downloadImage, copyTextToClipboard, generateCaption, sanitizeFilename, buildShareUrl } from '../../utils/shareActions.js';
import { computeHabitStats, computeMilestones } from '../../utils/analytics.js';
import { useShareLink } from '../../hooks/useShareLink.js';
import styles from './ShareDialog.module.css';

const FORMAT_OPTIONS = [
  { key: 'square', label: 'Square' },
  { key: 'portrait', label: 'Story' },
  { key: 'landscape', label: 'Landscape' },
];

const TOGGLE_ITEMS = [
  { key: 'showName', label: 'Habit name' },
  { key: 'showDay', label: 'Day count' },
  { key: 'showPct', label: 'Completion %' },
  { key: 'showStreak', label: 'Current streak' },
  { key: 'showBestStreak', label: 'Best streak' },
  { key: 'showGrid', label: 'Grid' },
  { key: 'showMilestones', label: 'Milestones' },
  { key: 'showDates', label: 'Date range' },
];

const EXPIRY_OPTIONS = [
  { value: '', label: 'Never' },
  { value: '24h', label: '24 hours' },
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
];

export default function ShareDialog({ open, onClose, habit, isComplete = false, showToast }) {
  const dialogRef = useRef(null);
  const debounceRef = useRef(null);
  const { isSignedIn, user } = useAuth();

  const displayName = user?.user_metadata?.display_name || null;

  const stats = habit ? computeHabitStats(habit) : null;
  const milestones = habit ? computeMilestones(habit) : [];

  const [format, setFormat] = useState('square');
  const [visibility, setVisibility] = useState({ ...DEFAULT_VISIBILITY });
  const [caption, setCaption] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [generating, setGenerating] = useState(false);

  const {
    publicLink,
    loading: linkLoading,
    createLink,
    revokeLink,
    updateExpiry,
  } = useShareLink(habit?.id, isSignedIn);

  // Reset state when dialog opens with a new habit
  useEffect(() => {
    if (open && habit && stats) {
      setFormat('square');
      setVisibility({ ...DEFAULT_VISIBILITY });
      setCaption(generateCaption(habit, stats, isComplete));
    }
  }, [open, habit?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Open/close dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  // Regenerate preview on option change (300ms debounce)
  const regeneratePreview = useCallback(() => {
    if (!habit || !stats) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setGenerating(true);
      try {
        const blob = await renderShareCard({
          format,
          habit,
          stats,
          milestones,
          visibility,
          displayName: visibility.showIdentity ? displayName : null,
          isComplete,
        });
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(URL.createObjectURL(blob));
      } catch {
        // Silently fail preview
      } finally {
        setGenerating(false);
      }
    }, 300);
  }, [format, habit, stats, milestones, visibility, displayName, isComplete]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open) regeneratePreview();
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [open, regeneratePreview]);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function toggleVisibility(key) {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function handleDownload() {
    if (!habit || !stats) return;
    setGenerating(true);
    try {
      const blob = await renderShareCard({
        format,
        habit,
        stats,
        milestones,
        visibility,
        displayName: visibility.showIdentity ? displayName : null,
        isComplete,
      });
      const filename = `${sanitizeFilename(habit.name)}-${format}.png`;
      downloadImage(blob, filename);
      showToast?.('Image downloaded', { type: 'success' });
    } catch {
      showToast?.('Failed to generate image', { type: 'error' });
    } finally {
      setGenerating(false);
    }
  }

  async function handleShare() {
    if (!habit || !stats) return;
    setGenerating(true);
    try {
      const blob = await renderShareCard({
        format,
        habit,
        stats,
        milestones,
        visibility,
        displayName: visibility.showIdentity ? displayName : null,
        isComplete,
      });
      await shareOrDownload(blob, habit.name, caption);
      showToast?.('Share card ready', { type: 'success' });
    } catch {
      showToast?.('Failed to share', { type: 'error' });
    } finally {
      setGenerating(false);
    }
  }

  async function handleCopyCaption() {
    const ok = await copyTextToClipboard(caption);
    showToast?.(ok ? 'Caption copied' : 'Failed to copy', { type: ok ? 'success' : 'error' });
  }

  async function handleCreateLink() {
    if (!habit || !stats) return;
    const unlockedNames = milestones.filter((m) => m.unlocked).map((m) => m.name);
    const sorted = habit.completedDays ? [...habit.completedDays].sort() : [];
    const cardData = {
      habitName: visibility.showName ? habit.name : null,
      color: habit.color || '#10B981',
      totalDays: stats.totalDays,
      completionPct: stats.completionPct,
      currentStreak: stats.currentStreak,
      longestStreak: stats.longestStreak,
      gridFilled: Math.min(habit.completedDays?.length || 0, 100),
      milestones: unlockedNames,
      dateRange: visibility.showDates && sorted.length > 0
        ? { first: sorted[0], last: sorted[sorted.length - 1] }
        : null,
      isComplete,
      displayName: visibility.showIdentity ? displayName : null,
      caption: caption || null,
    };
    try {
      await createLink(cardData, format);
      showToast?.('Public link created', { type: 'success' });
    } catch {
      showToast?.('Failed to create link', { type: 'error' });
    }
  }

  async function handleRevokeLink() {
    try {
      await revokeLink();
      showToast?.('Link revoked', { type: 'success' });
    } catch {
      showToast?.('Failed to revoke link', { type: 'error' });
    }
  }

  async function handleCopyLink() {
    if (!publicLink) return;
    const url = buildShareUrl(publicLink.slug);
    const ok = await copyTextToClipboard(url);
    showToast?.(ok ? 'Link copied' : 'Failed to copy', { type: ok ? 'success' : 'error' });
  }

  async function handleExpiryChange(value) {
    let expiresAt = null;
    if (value) {
      const now = new Date();
      if (value === '24h') now.setHours(now.getHours() + 24);
      else if (value === '7d') now.setDate(now.getDate() + 7);
      else if (value === '30d') now.setDate(now.getDate() + 30);
      expiresAt = now.toISOString();
    }
    try {
      await updateExpiry(expiresAt);
    } catch {
      showToast?.('Failed to update expiry', { type: 'error' });
    }
  }

  if (!habit) return null;

  return (
    <dialog ref={dialogRef} className={styles.dialog} onCancel={onClose}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Share Progress</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        {/* Preview */}
        <div className={styles.previewWrapper}>
          {previewUrl ? (
            <img src={previewUrl} alt="Share card preview" className={styles.previewImg} />
          ) : (
            <span className={styles.previewLoading}>Generating preview...</span>
          )}
        </div>

        {/* Format selector */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Format</span>
          <div className={styles.formatRow}>
            {FORMAT_OPTIONS.map((f) => (
              <button
                key={f.key}
                className={format === f.key ? styles.formatBtnActive : styles.formatBtn}
                onClick={() => setFormat(f.key)}
                aria-pressed={format === f.key}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visibility toggles */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Show on card</span>
          <div className={styles.toggleList}>
            {TOGGLE_ITEMS.map((t) => (
              <label key={t.key} className={styles.toggleItem}>
                <input
                  type="checkbox"
                  checked={visibility[t.key]}
                  onChange={() => toggleVisibility(t.key)}
                />
                {t.label}
              </label>
            ))}
            {isSignedIn && displayName && (
              <label className={styles.toggleItem}>
                <input
                  type="checkbox"
                  checked={visibility.showIdentity}
                  onChange={() => toggleVisibility('showIdentity')}
                />
                Your name
              </label>
            )}
          </div>
        </div>

        {/* Caption */}
        <div className={styles.section}>
          <label htmlFor="share-caption" className={styles.sectionLabel}>Caption</label>
          <div className={styles.captionWrapper}>
            <textarea
              id="share-caption"
              className={styles.captionInput}
              value={caption}
              onChange={(e) => setCaption(e.target.value.slice(0, 280))}
              maxLength={280}
              rows={2}
            />
            <span className={styles.charCount}>{caption.length}/280</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className={styles.actions}>
          <button className={styles.actionBtn} onClick={handleDownload} disabled={generating}>
            Download PNG
          </button>
          <button className={styles.primaryAction} onClick={handleShare} disabled={generating}>
            Share
          </button>
          <button className={styles.actionBtn} onClick={handleCopyCaption}>
            Copy Caption
          </button>
        </div>

        {/* Public link section (signed-in only) */}
        {isSignedIn && (
          <div className={styles.linkSection}>
            <div className={styles.linkTitle}>Public Link</div>
            <p className={styles.linkInfo}>
              Anyone with this link can see your progress.
              Your email and account details are never shared.
            </p>

            {publicLink ? (
              <>
                <div className={styles.linkRow}>
                  <span className={styles.linkUrl}>{buildShareUrl(publicLink.slug)}</span>
                  <button className={styles.linkBtn} onClick={handleCopyLink}>
                    Copy
                  </button>
                  <button className={styles.revokeBtn} onClick={handleRevokeLink} disabled={linkLoading}>
                    Revoke
                  </button>
                </div>
                <div className={styles.expiryRow}>
                  <label htmlFor="share-expiry">Expires:</label>
                  <select
                    id="share-expiry"
                    className={styles.expirySelect}
                    value={publicLink.expiresAt ? getExpiryValue(publicLink.expiresAt) : ''}
                    onChange={(e) => handleExpiryChange(e.target.value)}
                  >
                    {EXPIRY_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <button
                className={styles.linkBtn}
                onClick={handleCreateLink}
                disabled={linkLoading}
              >
                {linkLoading ? 'Creating...' : 'Create Public Link'}
              </button>
            )}
          </div>
        )}
      </div>
    </dialog>
  );
}

function getExpiryValue(expiresAt) {
  if (!expiresAt) return '';
  const diff = new Date(expiresAt) - new Date();
  const hours = diff / (1000 * 60 * 60);
  if (hours <= 25) return '24h';
  if (hours <= 168 + 1) return '7d';
  return '30d';
}
