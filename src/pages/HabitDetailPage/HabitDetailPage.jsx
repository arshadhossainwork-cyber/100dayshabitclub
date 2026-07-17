import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import {
  getHabitBySlug,
  getCategoryForHabit,
  getRelatedHabits,
} from '../../data/habitLibrary.js';
import {
  getArticleBySlug,
  getPillarBySlug,
} from '../../data/articles/index.js';
import { getRelatedArticlesForHabit } from '../../data/internalLinks.js';
import { buildArticleSchema } from '../../utils/schemaBuilder.js';
import styles from './HabitDetailPage.module.css';

export default function HabitDetailPage() {
  const { slug } = useParams();
  const habit = getHabitBySlug(slug);
  const category = habit ? getCategoryForHabit(habit) : null;
  const related = useMemo(() => (habit ? getRelatedHabits(habit) : []), [habit]);
  const relatedArticles = useMemo(() => {
    if (!habit) return [];
    return getRelatedArticlesForHabit(habit.slug)
      .map((ref) => {
        const a = getArticleBySlug(ref.pillarSlug, ref.slug);
        return a ? { ...a, pillar: getPillarBySlug(ref.pillarSlug) } : null;
      })
      .filter(Boolean);
  }, [habit]);

  const schema = useMemo(() => {
    if (!habit) return undefined;
    return buildArticleSchema({
      headline: `${habit.name} — Build This Habit in 100 Days`,
      description: habit.tagline,
      url: `https://www.100dayshabitclub.xyz/habits/${habit.slug}`,
      datePublished: habit.publishedDate || '2025-05-01',
    });
  }, [habit]);

  useDocumentMeta({
    title: habit ? `${habit.name} — Build This Habit in 100 Days` : 'Habit Not Found',
    description: habit
      ? `${habit.tagline} Learn the benefits, get daily tips, and track ${habit.name.toLowerCase()} for 100 days.`
      : 'This habit could not be found in our library.',
    path: `/habits/${slug}`,
    schema,
    noindex: !habit,
  });

  if (!habit) {
    return (
      <div className={styles.page}>
        <main className={styles.container}>
          <div className={styles.header}>
            <Link to="/habits" className={styles.backBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Habit Library
            </Link>
            <span className={styles.headerTitle}>
              <span className={styles.headerAccent}>100</span> Days
            </span>
          </div>
          <h1 className={styles.pageTitle}>Habit Not Found</h1>
          <p className={styles.notFoundText}>
            We couldn't find this habit. <Link to="/habits">Browse all habits</Link>.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <div className={styles.header}>
          <Link to="/habits" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Habit Library
          </Link>
          <span className={styles.headerTitle}>
            <span className={styles.headerAccent}>100</span> Days
          </span>
        </div>

        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Habit Library', path: '/habits' },
            { label: habit.name },
          ]}
        />

        <div className={styles.hero}>
          <div className={styles.heroEmoji}>{habit.emoji}</div>
          <div>
            {category && (
              <Link to="/habits" className={styles.categoryLabel} style={{ color: category.color }}>
                {category.emoji} {category.name}
              </Link>
            )}
            <h1 className={styles.pageTitle}>{habit.name}</h1>
            <p className={styles.tagline}>{habit.tagline}</p>
            <div className={styles.meta}>
              <span className={styles.metaItem} style={{ borderColor: habit.color }}>
                {habit.duration}
              </span>
            </div>
          </div>
        </div>

        <section className={styles.section} aria-labelledby="about">
          <h2 id="about" className={styles.sectionTitle}>About This Habit</h2>
          <p className={styles.prose}>{habit.description}</p>
        </section>

        <section className={styles.section} aria-labelledby="benefits">
          <h2 id="benefits" className={styles.sectionTitle}>Benefits</h2>
          <ul className={styles.list}>
            {habit.benefits.map((b, i) => (
              <li key={i} className={styles.listItem}>
                <span className={styles.listBullet} style={{ background: habit.color }} />
                {b}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="tips">
          <h2 id="tips" className={styles.sectionTitle}>Tips for Success</h2>
          <ul className={styles.list}>
            {habit.tips.map((t, i) => (
              <li key={i} className={styles.listItem}>
                <span className={styles.listBullet} style={{ background: habit.color }} />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="milestones">
          <h2 id="milestones" className={styles.sectionTitle}>100-Day Milestones</h2>
          <div className={styles.milestones}>
            {habit.milestones.map((m, i) => (
              <div key={i} className={styles.milestone}>
                <div className={styles.milestoneDay} style={{ color: habit.color }}>
                  Day {m.day}
                </div>
                <div className={styles.milestoneLabel}>{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className={styles.section} aria-labelledby="related">
            <h2 id="related" className={styles.sectionTitle}>Related Habits</h2>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <Link key={r.slug} to={`/habits/${r.slug}`} className={styles.relatedCard}>
                  <span className={styles.relatedEmoji}>{r.emoji}</span>
                  <div>
                    <div className={styles.relatedName}>{r.name}</div>
                    <div className={styles.relatedDuration}>{r.duration}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedArticles.length > 0 && (
          <section className={styles.section} aria-labelledby="related-articles">
            <h2 id="related-articles" className={styles.sectionTitle}>Related Articles</h2>
            <div className={styles.articleGrid}>
              {relatedArticles.map((a) => (
                <Link
                  key={a.slug}
                  to={`/blog/${a.pillarSlug}/${a.slug}`}
                  className={styles.articleCard}
                >
                  <div className={styles.articleCardTitle}>{a.title}</div>
                  {a.pillar && (
                    <div className={styles.articleCardPillar}>
                      {a.pillar.emoji} {a.pillar.name}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Track "{habit.name}" for 100 days</h2>
          <p className={styles.ctaBody}>
            Start today with our free habit tracker. No account required.
          </p>
          <Link to="/" className={styles.ctaBtn}>Start This Habit</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
