import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './EditorialPolicyPage.module.css';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Editorial Policy — 100 Days Habit Club',
  description:
    'Learn about the editorial standards, review process, corrections policy, and independence behind all content published by 100 Days Habit Club.',
  url: 'https://www.100dayshabitclub.xyz/editorial-policy',
};

export default function EditorialPolicyPage() {
  useDocumentMeta({
    title: 'Editorial Policy',
    description:
      'Learn about the editorial standards, review process, corrections policy, and independence behind all content published by 100 Days Habit Club.',
    path: '/editorial-policy',
    schema: SCHEMA,
  });

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

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Editorial Policy' }]} />
        <h1 className={styles.pageTitle}>Editorial Policy</h1>
        <p className={styles.subtitle}>
          Every piece of content we publish is held to a clear standard. This page explains how we research, write, review, and correct our work.
        </p>

        <p className={styles.lastUpdated}>Last updated: July 2026</p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Content Standards</h2>
          <p className={styles.prose}>
            All content published by 100 Days Habit Club is <strong>research-backed</strong>. We draw on peer-reviewed studies, established behavioral science, and credible expert sources to inform every article, guide, and recommendation we make.
          </p>
          <p className={styles.prose}>
            Sources are cited wherever claims are made. We prioritize <strong>practical, actionable advice</strong> over trend-chasing or clickbait. If a technique hasn't been validated by evidence, we say so — or we leave it out entirely.
          </p>
          <p className={styles.prose}>
            Our commitment is to accuracy and evidence-based information. We believe that helping people build lasting habits requires honesty about what the research actually shows, not sensationalized promises or shortcuts.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Review Process</h2>
          <p className={styles.prose}>
            Every article goes through a structured process before publication. The author begins with <strong>primary research</strong> — reading relevant studies, consulting authoritative sources, and identifying key takeaways that are genuinely useful to readers.
          </p>
          <p className={styles.prose}>
            After the initial draft is written, it undergoes an <strong>internal review</strong> for factual accuracy, clarity, and alignment with our editorial standards. We check that claims are properly supported and that the advice is realistic and actionable.
          </p>
          <p className={styles.prose}>
            Published content is not static. When new research emerges that changes or refines our understanding of a topic, we <strong>update existing articles</strong> rather than letting outdated information stand. Updated articles are marked with their revision date.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Corrections Policy</h2>
          <p className={styles.prose}>
            We take errors seriously. If you spot a factual inaccuracy, a broken citation, or misleading information in any of our content, we want to hear about it.
          </p>
          <p className={styles.prose}>
            Please <Link to="/contact">email us</Link> with the article URL and a description of the issue. We review every report and, when a correction is warranted, update the article promptly with a note explaining what was changed and why.
          </p>
          <p className={styles.prose}>
            Transparency matters. Corrections are not hidden — they are documented clearly so readers can trust that our content reflects the best available information at all times.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Independence</h2>
          <p className={styles.prose}>
            100 Days Habit Club does not accept <strong>sponsored content</strong>. We do not run ads. We do not use affiliate links. No company or third party pays us to recommend their product, service, or methodology.
          </p>
          <p className={styles.prose}>
            Every content decision is <strong>editorial, not commercial</strong>. What we write about is determined solely by what we believe will help our readers build better habits — not by what generates revenue.
          </p>
          <p className={styles.prose}>
            This independence is fundamental to our mission. If we recommend a technique, it's because the evidence supports it. If we mention a tool, it's because we genuinely think it's useful. Our readers' trust is more important than any sponsorship deal.
          </p>
        </section>

        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Questions or corrections?</h2>
          <p className={styles.ctaBody}>
            If you have feedback on our content or want to report an error, we'd love to hear from you.
          </p>
          <div className={styles.ctaLinks}>
            <Link to="/contact" className={styles.ctaBtn}>Contact Us</Link>
            <Link to="/about" className={styles.ctaBtnSecondary}>Learn More About Us</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
