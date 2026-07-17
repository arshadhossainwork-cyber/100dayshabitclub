import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import QuickAnswer from '../../components/QuickAnswer/QuickAnswer.jsx';
import KeyTakeaways from '../../components/KeyTakeaways/KeyTakeaways.jsx';
import ComparisonTable from '../../components/ComparisonTable/ComparisonTable.jsx';
import DefinitionBlock from '../../components/DefinitionBlock/DefinitionBlock.jsx';
import {
  getPillarBySlug,
  getArticleBySlug,
  getRelatedArticles,
} from '../../data/articles/index.js';
import { getHabitBySlug } from '../../data/habitLibrary.js';
import { getChallengeBySlug } from '../../data/challenges/index.js';
import { getToolBySlug } from '../../data/tools.js';
import {
  getRelatedChallengesForArticle,
  getRelatedToolsForArticle,
} from '../../data/internalLinks.js';
import { getAiContent } from '../../data/articles/aiContent/index.js';
import { buildArticleSchema } from '../../utils/schemaBuilder.js';
import styles from './ArticlePage.module.css';

export default function ArticlePage() {
  const { pillar: pillarSlug, slug } = useParams();
  const pillar = getPillarBySlug(pillarSlug);
  const article = getArticleBySlug(pillarSlug, slug);
  const related = useMemo(() => (article ? getRelatedArticles(article) : []), [article]);
  const relatedHabits = useMemo(() => {
    if (!article) return [];
    return (article.relatedHabits || [])
      .map((s) => getHabitBySlug(s))
      .filter(Boolean);
  }, [article]);

  const relatedChallenges = useMemo(() => {
    if (!article) return [];
    return getRelatedChallengesForArticle(article.slug)
      .map((s) => getChallengeBySlug(s))
      .filter(Boolean);
  }, [article]);
  const relatedTools = useMemo(() => {
    if (!article) return [];
    return getRelatedToolsForArticle(article.slug)
      .map((s) => getToolBySlug(s))
      .filter(Boolean);
  }, [article]);

  const aiContent = useMemo(() => (article ? getAiContent(article.slug) : null), [article]);

  const schema = useMemo(() => {
    if (!article || !pillar) return undefined;
    return buildArticleSchema({
      headline: article.title,
      description: article.metaDescription,
      url: `https://www.100dayshabitclub.xyz/blog/${pillar.slug}/${article.slug}`,
      datePublished: article.publishedDate,
      dateModified: article.dateModified,
      keywords: article.tags.join(', '),
      isPartOf: {
        '@type': 'CollectionPage',
        name: pillar.name,
        url: `https://www.100dayshabitclub.xyz/blog/${pillar.slug}`,
      },
    });
  }, [article, pillar]);

  useDocumentMeta({
    title: article ? article.title : 'Article Not Found',
    description: article ? article.metaDescription : 'This article could not be found.',
    path: `/blog/${pillarSlug}/${slug}`,
    schema,
    noindex: !article,
  });

  if (!article || !pillar) {
    return (
      <div className={styles.page}>
        <main className={styles.container}>
          <div className={styles.header}>
            <Link to={pillar ? `/blog/${pillarSlug}` : '/blog'} className={styles.backBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {pillar ? pillar.name : 'Blog'}
            </Link>
            <span className={styles.headerTitle}>
              <span className={styles.headerAccent}>100</span> Days
            </span>
          </div>
          <h1 className={styles.pageTitle}>Article Not Found</h1>
          <p className={styles.notFoundText}>
            We couldn't find this article. <Link to="/blog">Browse all articles</Link>.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const sectionIds = article.sections.map((s) =>
    s.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  );

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <div className={styles.header}>
          <Link to={`/blog/${pillar.slug}`} className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {pillar.name}
          </Link>
          <span className={styles.headerTitle}>
            <span className={styles.headerAccent}>100</span> Days
          </span>
        </div>

        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Blog', path: '/blog' },
            { label: pillar.name, path: `/blog/${pillar.slug}` },
            { label: article.title },
          ]}
        />

        <div className={styles.hero}>
          <Link
            to={`/blog/${pillar.slug}`}
            className={styles.pillarLabel}
            style={{ color: pillar.color }}
          >
            {pillar.emoji} {pillar.name}
          </Link>
          <h1 className={styles.pageTitle}>{article.title}</h1>
          <div className={styles.meta}>
            <span>{article.publishedDate}</span>
            <span>{article.readingTime}</span>
          </div>
        </div>

        <QuickAnswer answer={aiContent?.quickAnswer} />
        <KeyTakeaways items={aiContent?.keyTakeaways} />

        <nav className={styles.toc} aria-label="Table of contents">
          <div className={styles.tocLabel}>In this article</div>
          <ol className={styles.tocList}>
            {article.sections.map((sec, i) => (
              <li key={sectionIds[i]}>
                <a href={`#${sectionIds[i]}`} className={styles.tocLink}>
                  {sec.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {article.sections.map((sec, i) => (
          <section
            key={sectionIds[i]}
            id={sectionIds[i]}
            className={styles.articleSection}
          >
            <h2 className={styles.sectionTitle}>{sec.heading}</h2>
            <p className={styles.prose}>{sec.content}</p>
            {sec.subSections &&
              sec.subSections.map((sub, j) => (
                <div key={j} className={styles.subSection}>
                  <h3 className={styles.subSectionTitle}>{sub.heading}</h3>
                  <p className={styles.prose}>{sub.content}</p>
                </div>
              ))}
          </section>
        ))}

        <ComparisonTable data={aiContent?.comparisonTable} />
        <DefinitionBlock definitions={aiContent?.definitions} />

        {article.tags.length > 0 && (
          <div className={styles.tags}>
            {article.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {related.length > 0 && (
          <section className={styles.relatedSection} aria-labelledby="related-articles">
            <h2 id="related-articles" className={styles.relatedTitle}>Related articles</h2>
            <div className={styles.relatedGrid}>
              {related.map((r) => {
                const rPillar = getPillarBySlug(r.pillarSlug);
                return (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.pillarSlug}/${r.slug}`}
                    className={styles.relatedCard}
                  >
                    <div className={styles.relatedCardTitle}>{r.title}</div>
                    {rPillar && (
                      <div className={styles.relatedCardPillar}>
                        {rPillar.emoji} {rPillar.name}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {relatedChallenges.length > 0 && (
          <section className={styles.relatedSection} aria-labelledby="related-challenges">
            <h2 id="related-challenges" className={styles.relatedTitle}>Related challenges</h2>
            <div className={styles.challengeGrid}>
              {relatedChallenges.map((c) => (
                <Link
                  key={c.slug}
                  to={`/challenges/${c.slug}`}
                  className={styles.challengeCard}
                >
                  <span className={styles.challengeEmoji}>{c.emoji}</span>
                  <div>
                    <div className={styles.challengeName}>{c.name}</div>
                    <div className={styles.challengeBadge}>{c.difficulty}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedHabits.length > 0 && (
          <section className={styles.relatedSection} aria-labelledby="related-habits">
            <h2 id="related-habits" className={styles.relatedTitle}>Related habits</h2>
            <div className={styles.habitGrid}>
              {relatedHabits.map((h) => (
                <Link
                  key={h.slug}
                  to={`/habits/${h.slug}`}
                  className={styles.habitCard}
                >
                  <span className={styles.habitEmoji}>{h.emoji}</span>
                  <span className={styles.habitName}>{h.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedTools.length > 0 && (
          <section className={styles.relatedSection} aria-labelledby="suggested-tools">
            <h2 id="suggested-tools" className={styles.relatedTitle}>Suggested tools</h2>
            <div className={styles.toolGrid}>
              {relatedTools.map((t) => (
                <Link
                  key={t.slug}
                  to={`/tools/${t.slug}`}
                  className={styles.toolCard}
                >
                  <span className={styles.toolEmoji}>{t.emoji}</span>
                  <span className={styles.toolName}>{t.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Put this into practice</h2>
          <p className={styles.ctaBody}>
            Start tracking a habit for 100 days. No account required.
          </p>
          <div className={styles.ctaLinks}>
            <Link to="/" className={styles.ctaBtn}>Start Tracking</Link>
            <Link to={`/blog/${pillar.slug}`} className={styles.ctaBtnSecondary}>
              More from {pillar.name}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
