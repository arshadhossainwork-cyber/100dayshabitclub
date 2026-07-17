import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import {
  getPillarBySlug,
  getArticlesByPillar,
  getAllPillars,
} from '../../data/articles/index.js';
import styles from './PillarPage.module.css';

export default function PillarPage() {
  const { pillar: pillarSlug } = useParams();
  const pillar = getPillarBySlug(pillarSlug);
  const articles = useMemo(
    () => (pillar ? getArticlesByPillar(pillar.slug) : []),
    [pillar],
  );
  const otherPillars = useMemo(
    () => getAllPillars().filter((p) => p.slug !== pillarSlug),
    [pillarSlug],
  );

  const schema = useMemo(() => {
    if (!pillar) return undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${pillar.name} — 100 Days Habit Club Blog`,
      description: pillar.description,
      url: `https://www.100dayshabitclub.xyz/blog/${pillar.slug}`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: articles.length,
        itemListElement: articles.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `https://www.100dayshabitclub.xyz/blog/${pillar.slug}/${a.slug}`,
          name: a.title,
        })),
      },
    };
  }, [pillar, articles]);

  useDocumentMeta({
    title: pillar ? `${pillar.name} — Blog` : 'Topic Not Found',
    description: pillar
      ? pillar.description
      : 'This blog topic could not be found.',
    path: `/blog/${pillarSlug}`,
    schema,
    noindex: !pillar,
  });

  if (!pillar) {
    return (
      <div className={styles.page}>
        <main className={styles.container}>
          <div className={styles.header}>
            <Link to="/blog" className={styles.backBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Blog
            </Link>
            <span className={styles.headerTitle}>
              <span className={styles.headerAccent}>100</span> Days
            </span>
          </div>
          <h1 className={styles.pageTitle}>Topic Not Found</h1>
          <p className={styles.notFoundText}>
            We couldn't find this topic. <Link to="/blog">Browse all topics</Link>.
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
          <Link to="/blog" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Blog
          </Link>
          <span className={styles.headerTitle}>
            <span className={styles.headerAccent}>100</span> Days
          </span>
        </div>

        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Blog', path: '/blog' },
            { label: pillar.name },
          ]}
        />

        <div className={styles.hero}>
          <span className={styles.pillarEmoji}>{pillar.emoji}</span>
          <h1 className={styles.pageTitle}>{pillar.name}</h1>
          <p className={styles.pageSubtitle}>{pillar.description}</p>
          <p className={styles.articleCount}>
            {articles.length} {articles.length === 1 ? 'article' : 'articles'}
          </p>
        </div>

        <div className={styles.articleList}>
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${pillar.slug}/${article.slug}`}
              className={styles.articleCard}
            >
              <h2 className={styles.articleTitle}>{article.title}</h2>
              <p className={styles.articleExcerpt}>{article.excerpt}</p>
              <span className={styles.articleMeta}>{article.readingTime}</span>
            </Link>
          ))}
        </div>

        {otherPillars.length > 0 && (
          <section className={styles.exploreSection} aria-labelledby="explore-topics">
            <h2 id="explore-topics" className={styles.exploreTitle}>Explore other topics</h2>
            <div className={styles.exploreGrid}>
              {otherPillars.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className={styles.exploreCard}>
                  <span className={styles.exploreEmoji}>{p.emoji}</span>
                  <span className={styles.exploreName}>{p.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Put this knowledge into practice</h2>
          <p className={styles.ctaBody}>
            Start tracking a habit today. No account required.
          </p>
          <Link to="/" className={styles.ctaBtn}>Start Tracking</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
