import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './FAQPage.module.css';

const FAQ_ITEMS = [
  {
    question: 'What is 100 Days Habit Club?',
    answer: 'A free habit tracker that helps you build any habit over 100 days. Track your streaks, watch your progress grid fill up, and earn milestones along the way.',
  },
  {
    question: 'Is it free?',
    answer: 'Yes, 100 Days Habit Club is completely free. There are no premium plans, no ads, and no hidden costs.',
  },
  {
    question: 'Do I need an account?',
    answer: 'No. The app works fully without an account — your data is stored locally in your browser. Create a free account only if you want to sync across devices.',
  },
  {
    question: 'Where is my data stored?',
    answer: 'By default, all data stays in your browser\'s local storage. If you create an account, an encrypted copy syncs to our cloud database so you can access it on other devices.',
  },
  {
    question: 'Can I use it offline?',
    answer: 'Yes. Once you\'ve visited the site, it works offline as a Progressive Web App. Any changes sync automatically when you\'re back online.',
  },
  {
    question: 'How does the 100-day challenge work?',
    answer: 'Pick a habit, check in daily, and aim for 100 completed days. Your progress grid shows every day at a glance, and you\'ll unlock milestones at key intervals.',
  },
  {
    question: 'What happens after 100 days?',
    answer: 'You can archive the habit and start a new 100-day challenge, or keep going and extend your streak beyond 100 days.',
  },
  {
    question: 'Can I track multiple habits?',
    answer: 'Yes. You can track as many habits as you like at the same time, each with its own progress grid and streak.',
  },
  {
    question: 'Does it work on mobile?',
    answer: 'Yes. The app is fully responsive and can be installed on your home screen as a Progressive Web App on both Android and iOS.',
  },
  {
    question: 'How do I sync across devices?',
    answer: 'Create a free account and sign in on each device. Your habits, streaks, and settings sync automatically.',
  },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function FAQPage() {
  useDocumentMeta({
    title: 'FAQ',
    description: 'Frequently asked questions about 100 Days Habit Club — how it works, pricing, data privacy, and more.',
    path: '/faq',
    schema: FAQ_SCHEMA,
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

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'FAQ' }]} />
        <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>

        <div className={styles.faqList}>
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className={styles.faqItem}>
              <summary className={styles.question}>{item.question}</summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
