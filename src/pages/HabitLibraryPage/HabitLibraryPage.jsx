import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { habits, HABIT_CATEGORIES, getHabitsByCategory } from '../../data/habitLibrary.js';
import styles from './HabitLibraryPage.module.css';

const PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Habit Library — 100 Days Habit Club',
  description:
    'Browse 24 proven habits across health, wellness, productivity, and faith. Each includes a 100-day plan with tips, milestones, and benefits.',
  url: 'https://www.100dayshabitclub.xyz/habits',
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: habits.length,
    itemListElement: habits.map((h, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.100dayshabitclub.xyz/habits/${h.slug}`,
      name: h.name,
    })),
  },
};

export default function HabitLibraryPage() {
  useDocumentMeta({
    title: 'Habit Library — 24 Habits You Can Build in 100 Days',
    description:
      'Browse 24 proven habits across health, wellness, productivity, and faith. Each includes a 100-day plan with tips, milestones, and benefits.',
    path: '/habits',
    schema: PAGE_SCHEMA,
  });

  const grouped = useMemo(() => {
    return HABIT_CATEGORIES.map((cat) => ({
      ...cat,
      habits: getHabitsByCategory(cat.id),
    }));
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.container}>
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

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Habit Library' }]} />

        <div className={styles.hero}>
          <h1 className={styles.pageTitle}>Habit Library</h1>
          <p className={styles.pageSubtitle}>
            24 habits you can build in 100 days. Pick one, start today, and let the grid do the rest.
          </p>
        </div>

        {grouped.map((cat) => (
          <section key={cat.id} className={styles.category} aria-labelledby={`cat-${cat.id}`}>
            <h2 id={`cat-${cat.id}`} className={styles.categoryTitle}>
              <span className={styles.categoryEmoji}>{cat.emoji}</span>
              {cat.name}
            </h2>
            <div className={styles.grid}>
              {cat.habits.map((habit) => (
                <Link
                  key={habit.slug}
                  to={`/habits/${habit.slug}`}
                  className={styles.card}
                >
                  <div className={styles.cardAccent} style={{ background: habit.color }} />
                  <span className={styles.cardEmoji}>{habit.emoji}</span>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardName}>{habit.name}</h3>
                    <p className={styles.cardTagline}>{habit.tagline}</p>
                    <span className={styles.cardDuration}>{habit.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to start?</h2>
          <p className={styles.ctaBody}>
            Pick any habit above, then track it for 100 days with our free habit tracker. No account required.
          </p>
          <Link to="/" className={styles.ctaBtn}>Start Tracking</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
