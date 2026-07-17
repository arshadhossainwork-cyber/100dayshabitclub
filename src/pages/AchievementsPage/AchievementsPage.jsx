import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { loadData } from '../../utils/storage.js';
import { computeAchievements, getAchievementCategories } from '../../utils/analytics.js';
import styles from './AchievementsPage.module.css';

const ICONS = {
  seed: '\u{1F331}',
  sprout: '\u{1F33F}',
  tree: '\u{1F333}',
  forest: '\u{1F332}',
  flame: '\u{1F525}',
  fire: '\u{1F525}',
  blaze: '\u{2B50}',
  inferno: '\u{1F4AB}',
  trophy: '\u{1F3C6}',
  crown: '\u{1F451}',
  star: '\u{2B50}',
  phoenix: '\u{1F426}',
  shield: '\u{1F6E1}',
  pair: '\u{1F91D}',
  constellation: '\u{2728}',
  sun: '\u{2600}',
  calendar: '\u{1F4C5}',
  hourglass: '\u{231B}',
  mountain: '\u{26F0}',
  mirror: '\u{1FA9E}',
  compass: '\u{1F9ED}',
};

export default function AchievementsPage() {
  useDocumentMeta({
    title: 'Achievements',
    description: 'View your habit tracking milestones and achievements.',
    path: '/achievements',
    noindex: true,
  });
  const data = useMemo(() => loadData(), []);
  const habits = data.habits || [];

  const achievements = useMemo(() => computeAchievements(habits), [habits]);
  const categories = useMemo(() => getAchievementCategories(achievements), [achievements]);

  const totalUnlocked = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className={styles.page} style={{ display: 'flex', flexDirection: 'column' }}>
      <main className={styles.container} style={{ flex: 1 }}>
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

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Achievements' }]} />
        <h1 className={styles.pageTitle}>Achievements</h1>
        <p className={styles.subtitle}>
          {totalUnlocked} of {totalCount} unlocked
        </p>

        {/* Overall progress ring */}
        <div className={styles.progressRing}>
          <svg viewBox="0 0 120 120" className={styles.ringSvg}>
            <circle
              cx="60"
              cy="60"
              r="52"
              className={styles.ringTrack}
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              className={styles.ringFill}
              style={{
                strokeDasharray: `${2 * Math.PI * 52}`,
                strokeDashoffset: `${2 * Math.PI * 52 * (1 - totalUnlocked / totalCount)}`,
              }}
            />
          </svg>
          <div className={styles.ringLabel}>
            <span className={styles.ringValue}>{Math.round((totalUnlocked / totalCount) * 100)}%</span>
          </div>
        </div>

        {categories.map((cat) => (
          <div key={cat.name} className={styles.category}>
            <div className={styles.categoryHeader}>
              <h3 className={styles.categoryName}>{cat.name}</h3>
              <span className={styles.categoryCount}>
                {cat.unlockedCount}/{cat.total}
              </span>
            </div>
            <div className={styles.achievementGrid}>
              {cat.achievements.map((a) => (
                <div
                  key={a.id}
                  className={`${styles.achievementCard} ${a.unlocked ? styles.unlocked : styles.locked}`}
                >
                  <div className={styles.achievementIcon}>
                    {ICONS[a.icon] || '\u{1F3AF}'}
                  </div>
                  <div className={styles.achievementInfo}>
                    <div className={styles.achievementName}>{a.name}</div>
                    <div className={styles.achievementDesc}>{a.description}</div>
                    {a.unlocked && a.relatedHabit && (
                      <div className={styles.relatedHabit}>{a.relatedHabit}</div>
                    )}
                    {!a.unlocked && a.progress > 0 && (
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${a.progress}%` }}
                        />
                      </div>
                    )}
                    {!a.unlocked && (
                      <div className={styles.progressText}>
                        {a.current}/{a.target}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className={styles.navLink}>
          <Link to="/progress" className={styles.navBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            View Progress
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
