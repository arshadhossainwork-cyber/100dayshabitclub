import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import {
  getChallengeBySlug,
  getCategoryForChallenge,
  getRelatedChallenges,
} from '../../data/challenges/index.js';
import { getHabitBySlug } from '../../data/habitLibrary.js';
import { getArticleBySlug, getPillarBySlug } from '../../data/articles/index.js';
import { buildHowToSchema } from '../../utils/schemaBuilder.js';
import styles from './ChallengeDetailPage.module.css';

export default function ChallengeDetailPage() {
  const { slug } = useParams();
  const challenge = getChallengeBySlug(slug);
  const category = challenge ? getCategoryForChallenge(challenge) : null;
  const related = useMemo(() => (challenge ? getRelatedChallenges(challenge) : []), [challenge]);
  const relatedHabits = useMemo(
    () =>
      challenge
        ? (challenge.relatedHabits || []).map((s) => getHabitBySlug(s)).filter(Boolean)
        : [],
    [challenge],
  );
  const relatedArticles = useMemo(() => {
    if (!challenge) return [];
    return (challenge.relatedArticles || [])
      .map((ref) => {
        const a = getArticleBySlug(ref.pillar, ref.slug);
        return a ? { ...a, pillar: getPillarBySlug(ref.pillar) } : null;
      })
      .filter(Boolean);
  }, [challenge]);

  const [selectedLevel, setSelectedLevel] = useState(null);

  const howToSchema = useMemo(() => {
    if (!challenge) return undefined;
    return buildHowToSchema({
      name: challenge.name,
      description: challenge.tagline,
      url: `https://www.100dayshabitclub.xyz/challenges/${challenge.slug}`,
      steps: challenge.phases.map((phase, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: `${phase.name} (Days ${phase.days})`,
        text: phase.description,
      })),
    });
  }, [challenge]);

  const faqSchema = useMemo(() => {
    if (!challenge) return undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: challenge.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
  }, [challenge]);

  useDocumentMeta({
    title: challenge
      ? `${challenge.name} — Complete Guide & Plan`
      : 'Challenge Not Found',
    description: challenge
      ? challenge.metaDescription
      : 'This challenge could not be found.',
    path: `/challenges/${slug}`,
    schema: howToSchema,
    noindex: !challenge,
  });

  if (!challenge) {
    return (
      <div className={styles.page}>
        <main className={styles.container}>
          <div className={styles.header}>
            <Link to="/challenges" className={styles.backBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Challenges
            </Link>
            <span className={styles.headerTitle}>
              <span className={styles.headerAccent}>100</span> Days
            </span>
          </div>
          <h1 className={styles.pageTitle}>Challenge Not Found</h1>
          <p className={styles.notFoundText}>
            We couldn't find this challenge. <Link to="/challenges">Browse all challenges</Link>.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const currentLevel = selectedLevel
    ? challenge.levels.find((l) => l.id === selectedLevel)
    : null;

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <div className={styles.header}>
          <Link to="/challenges" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Challenges
          </Link>
          <span className={styles.headerTitle}>
            <span className={styles.headerAccent}>100</span> Days
          </span>
        </div>

        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Challenges', path: '/challenges' },
            { label: challenge.name },
          ]}
        />

        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroEmoji}>{challenge.emoji}</div>
          <div>
            {category && (
              <Link
                to="/challenges"
                className={styles.badge}
                style={{ color: category.color, borderColor: category.color, textDecoration: 'none', display: 'inline-block', marginBottom: 'var(--space-xs)' }}
              >
                {category.emoji} {category.name}
              </Link>
            )}
            <h1 className={styles.pageTitle}>{challenge.name}</h1>
            <p className={styles.tagline}>{challenge.tagline}</p>
            <div className={styles.badges}>
              <span className={styles.badge}>{challenge.difficulty}</span>
              <span className={styles.badge}>{challenge.dailyTime}</span>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <section className={styles.section} aria-labelledby="intro">
          <h2 id="intro" className={styles.sectionTitle}>About This Challenge</h2>
          <p className={styles.prose}>{challenge.introduction}</p>
        </section>

        {/* Best For */}
        <section className={styles.section} aria-labelledby="best-for">
          <h2 id="best-for" className={styles.sectionTitle}>Who Is This Challenge For?</h2>
          <ul className={styles.checklist}>
            {challenge.bestFor.map((item, i) => (
              <li key={i} className={styles.checkItem}>
                <span className={styles.checkBullet} style={{ background: challenge.color }} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Requirements */}
        <section className={styles.section} aria-labelledby="requirements">
          <h2 id="requirements" className={styles.sectionTitle}>What You'll Need</h2>
          <ul className={styles.checklist}>
            {challenge.requirements.map((item, i) => (
              <li key={i} className={styles.checkItem}>
                <span className={styles.checkBullet} style={{ background: challenge.color }} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Phases Accordion */}
        <section className={styles.section} aria-labelledby="plan">
          <h2 id="plan" className={styles.sectionTitle}>Your 100-Day Plan</h2>
          <div className={styles.phaseList}>
            {challenge.phases.map((phase, i) => (
              <details key={i} className={styles.phaseItem} open={i === 0}>
                <summary className={styles.phaseSummary}>
                  {phase.name} — Days {phase.days}
                </summary>
                <div className={styles.phaseBody}>
                  <div className={styles.phaseDays}>Days {phase.days}</div>
                  <div className={styles.phaseTarget} style={{ color: challenge.color }}>
                    Daily target: {phase.dailyTarget}
                  </div>
                  <p className={styles.phaseDesc}>{phase.description}</p>
                  <div className={styles.phaseTip}>
                    <span className={styles.phaseTipLabel}>Tip: </span>
                    {phase.tip}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Milestones Timeline */}
        <section className={styles.section} aria-labelledby="milestones">
          <h2 id="milestones" className={styles.sectionTitle}>Milestones</h2>
          <div className={styles.timeline}>
            {challenge.milestones.map((m, i) => (
              <div key={i} className={styles.timelineItem}>
                <div
                  className={styles.timelineDot}
                  style={{ borderColor: challenge.color }}
                />
                <div className={styles.timelineDay} style={{ color: challenge.color }}>
                  Day {m.day}
                </div>
                <div className={styles.timelineTitle}>{m.title}</div>
                <div className={styles.timelineDesc}>{m.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Obstacles */}
        <section className={styles.section} aria-labelledby="obstacles">
          <h2 id="obstacles" className={styles.sectionTitle}>Common Obstacles</h2>
          <div className={styles.obstacleList}>
            {challenge.obstacles.map((o, i) => (
              <div key={i} className={styles.obstacleCard}>
                <div className={styles.obstacleProblem}>{o.problem}</div>
                <div className={styles.obstacleSolution}>{o.solution}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pro Tips */}
        <section className={styles.section} aria-labelledby="tips">
          <h2 id="tips" className={styles.sectionTitle}>Pro Tips</h2>
          <ul className={styles.tipsList}>
            {challenge.tips.map((tip, i) => (
              <li key={i} className={styles.tipItem}>
                <span className={styles.tipBullet} style={{ background: challenge.color }} />
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* Self-Assessment */}
        <section className={styles.section} aria-labelledby="level">
          <h2 id="level" className={styles.sectionTitle}>What's Your Level?</h2>
          <div className={styles.levelButtons}>
            {challenge.levels.map((level) => (
              <button
                key={level.id}
                className={`${styles.levelBtn} ${selectedLevel === level.id ? styles.levelBtnActive : ''}`}
                onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
              >
                {level.label}
              </button>
            ))}
          </div>
          {currentLevel && (
            <div className={styles.levelPanel}>
              <div className={styles.levelPanelTitle}>{currentLevel.label}</div>
              <p className={styles.levelDesc}>{currentLevel.description}</p>
              <p className={styles.levelRec}>
                <span className={styles.levelRecLabel}>Recommendation: </span>
                {currentLevel.recommendation}
              </p>
              <div className={styles.levelTarget}>
                <span className={styles.levelTargetLabel}>Daily target: </span>
                {currentLevel.dailyTarget}
              </div>
            </div>
          )}
        </section>

        {/* FAQ Accordion */}
        <section className={styles.section} aria-labelledby="faq">
          <h2 id="faq" className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {challenge.faq.map((item, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{item.question}</summary>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Start the {challenge.name}</h2>
          <p className={styles.ctaBody}>
            Begin today with our free habit tracker. No account required.
          </p>
          <Link to="/" className={styles.ctaBtn}>Start This Challenge</Link>
        </div>

        {/* Related Challenges */}
        {related.length > 0 && (
          <section className={styles.section} aria-labelledby="related-challenges">
            <h2 id="related-challenges" className={styles.sectionTitle}>Related Challenges</h2>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <Link key={r.slug} to={`/challenges/${r.slug}`} className={styles.relatedCard}>
                  <span className={styles.relatedEmoji}>{r.emoji}</span>
                  <div>
                    <div className={styles.relatedName}>{r.name}</div>
                    <div className={styles.relatedMeta}>{r.difficulty} · {r.dailyTime}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Habits */}
        {relatedHabits.length > 0 && (
          <section className={styles.section} aria-labelledby="related-habits">
            <h2 id="related-habits" className={styles.sectionTitle}>Related Habits</h2>
            <div className={styles.relatedGrid}>
              {relatedHabits.map((h) => (
                <Link key={h.slug} to={`/habits/${h.slug}`} className={styles.relatedCard}>
                  <span className={styles.relatedEmoji}>{h.emoji}</span>
                  <div>
                    <div className={styles.relatedName}>{h.name}</div>
                    <div className={styles.relatedMeta}>{h.duration}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Articles */}
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
      </main>

      {/* Inline FAQ schema (since useDocumentMeta only supports one schema) */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Footer />
    </div>
  );
}
