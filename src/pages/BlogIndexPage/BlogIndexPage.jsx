import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { getAllPillars, getArticlesByPillar } from '../../data/articles/index.js';
import styles from './BlogIndexPage.module.css';

export default function BlogIndexPage() {
  const pillars = getAllPillars();

  const schema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog — 100 Days Habit Club',
    description:
      'In-depth articles on habit formation, tracking, productivity, consistency, discipline, and 100-day challenges. Build lasting habits with science-backed strategies.',
    url: 'https://www.100dayshabitclub.xyz/blog',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: pillars.length,
      itemListElement: pillars.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://www.100dayshabitclub.xyz/blog/${p.slug}`,
        name: p.name,
      })),
    },
  }), [pillars]);

  useDocumentMeta({
    title: 'Blog — Habit Building Articles & Guides',
    description:
      'In-depth articles on habit formation, tracking, productivity, consistency, discipline, and 100-day challenges. Build lasting habits with science-backed strategies.',
    path: '/blog',
    schema,
  });

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <div className={styles.header}>
          <Link to="/" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <span className={styles.headerTitle}>
            <span className={styles.headerAccent}>100</span> Days
          </span>
        </div>

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Blog' }]} />

        <div className={styles.hero}>
          <h1 className={styles.pageTitle}>Blog</h1>
          <p className={styles.pageSubtitle}>
            Science-backed articles on building habits, staying consistent, and transforming your daily routine. 60 articles across 6 topics.
          </p>
        </div>

        <div className={styles.grid}>
          {pillars.map((pillar) => {
            const articleCount = getArticlesByPillar(pillar.slug).length;
            return (
              <Link
                key={pillar.slug}
                to={`/blog/${pillar.slug}`}
                className={styles.pillarCard}
              >
                <div className={styles.pillarAccent} style={{ background: pillar.color }} />
                <span className={styles.pillarEmoji}>{pillar.emoji}</span>
                <h2 className={styles.pillarName}>{pillar.name}</h2>
                <p className={styles.pillarDesc}>{pillar.description}</p>
                <span className={styles.pillarCount}>
                  {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                </span>
              </Link>
            );
          })}
        </div>

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to start a habit?</h2>
          <p className={styles.ctaBody}>
            Read the science, then put it into practice. Track any habit for 100 days with our free tracker.
          </p>
          <Link to="/" className={styles.ctaBtn}>Start Tracking</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
