import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase.js';
import { fetchSharedCardBySlug } from '../../lib/shareRepository.js';
import { captureReferralSource } from '../../utils/referral.js';
import styles from './SharedCardPage.module.css';

export default function SharedCardPage() {
  const { slug } = useParams();
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    captureReferralSource();
  }, []);

  // Inject noindex meta tag
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    if (!supabase) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    let cancelled = false;

    fetchSharedCardBySlug(supabase, slug)
      .then((card) => {
        if (cancelled) return;
        if (!card) {
          setNotFound(true);
        } else {
          setCardData(card.card_data);
        }
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.page}>
        <span className={styles.loading}>Loading...</span>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className={styles.page}>
        <div className={styles.expired}>
          <h1 className={styles.expiredTitle}>Link Expired</h1>
          <p className={styles.expiredBody}>
            This link has expired or been revoked.
          </p>
          <div className={styles.cta}>
            <Link to="/?ref=share" className={styles.ctaLink}>
              Try 100 Days Habit Club
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const data = cardData;
  const accentColor = data.isComplete ? '#F59E0B' : (data.color || '#10B981');
  const gridFilled = data.gridFilled || 0;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.accentBar} style={{ background: accentColor }} />
        <div className={styles.cardBody}>
          {data.isComplete && (
            <div className={styles.achievementTitle}>100 DAYS COMPLETE</div>
          )}

          {data.habitName && (
            <h1 className={styles.habitName}>{data.habitName}</h1>
          )}

          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <div className={styles.statValue} style={{ color: accentColor }}>
                {data.currentStreak}
              </div>
              <div className={styles.statLabel}>Streak</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>{data.longestStreak}</div>
              <div className={styles.statLabel}>Best</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>{data.completionPct}%</div>
              <div className={styles.statLabel}>Done</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>{data.totalDays}</div>
              <div className={styles.statLabel}>Total</div>
            </div>
          </div>

          {/* 10x10 Grid */}
          <div className={styles.gridWrapper}>
            <div className={styles.grid}>
              {Array.from({ length: 100 }, (_, i) => (
                <div
                  key={i}
                  className={i < gridFilled ? styles.gridCell : styles.gridCellEmpty}
                  style={i < gridFilled ? { background: accentColor } : undefined}
                />
              ))}
            </div>
          </div>

          {/* Milestones */}
          {data.milestones && data.milestones.length > 0 && (
            <div className={styles.milestonesRow}>
              {data.milestones.slice(0, 4).map((name, i) => (
                <span key={i} className={styles.milestoneBadge}>{name}</span>
              ))}
              {data.milestones.length > 4 && (
                <span className={styles.milestoneBadge}>+{data.milestones.length - 4}</span>
              )}
            </div>
          )}

          {/* Date range */}
          {data.dateRange && (
            <div className={styles.dateRange}>
              <span>{formatDateShort(data.dateRange.first)}</span>
              <span className={styles.dateArrow}>&rarr;</span>
              <span>{formatDateShort(data.dateRange.last)}</span>
            </div>
          )}

          {/* Display name */}
          {data.displayName && (
            <div className={styles.displayName}>{data.displayName}</div>
          )}

          {/* Caption */}
          {data.caption && (
            <p className={styles.caption}>{data.caption}</p>
          )}

          <div className={styles.watermark}>100 Days Habit Club</div>
        </div>
      </div>

      <div className={styles.cta}>
        <Link to="/?ref=share" className={styles.ctaLink}>
          Build your own habits
        </Link>
      </div>
    </div>
  );
}

function formatDateShort(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
