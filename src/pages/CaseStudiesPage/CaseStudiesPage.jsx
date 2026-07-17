import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { buildArticleSchema } from '../../utils/schemaBuilder.js';
import styles from './CaseStudiesPage.module.css';

const SCHEMA = buildArticleSchema({
  headline: '100-Day Challenge Case Studies — 6 Real-World Success Stories',
  description:
    'How six people used 100-day challenges to build lasting habits in meditation, running, coding, morning routines, journaling, and deep work. Composite profiles based on common success patterns.',
  url: 'https://www.100dayshabitclub.xyz/case-studies',
  datePublished: '2025-06-01',
});

const CASE_STUDIES = [
  {
    id: 'sarah-meditation',
    name: 'Sarah',
    emoji: '\u{1F9D8}',
    challenge: '100-Day Meditation Challenge',
    challengeSlug: '100-day-meditation-challenge',
    duration: '100 days',
    background: 'Sarah, 34, worked as a project manager at a tech startup. She described herself as someone who "couldn\'t sit still for five minutes." Chronic stress and poor sleep had become her normal. She\'d tried meditation apps before but never lasted more than a week.',
    approach: 'She started with just 5 minutes each morning before checking her phone. For the first two weeks, she used guided meditations. By day 30, she switched to unguided sessions and gradually extended to 15 minutes. She tracked every session on her 10\u00D710 grid and placed her meditation cushion on her desk chair each night as a visual cue.',
    obstacles: 'Days 18-25 were the hardest. A major product launch at work made her feel like she "didn\'t have time." She missed day 22 entirely. Rather than quitting, she applied the "never miss twice" rule and did a 3-minute session on day 23. She also struggled with weekend consistency and solved it by anchoring meditation to her morning coffee routine.',
    results: [
      'Completed 96 out of 100 days (96% consistency)',
      'Sleep quality improved \u2014 fell asleep 20 minutes faster on average',
      'Reduced daily anxiety from "constant" to "occasional and manageable"',
      'Still meditating daily 6 months after completing the challenge',
    ],
    quote: 'The grid changed everything. On day 47, I almost skipped, but looking at those filled squares made it feel impossible to leave a gap. It\'s not about willpower \u2014 it\'s about not wanting to break something you\'ve built.',
    keyLesson: 'Starting with just 5 minutes removed the barrier to entry. The habit became self-reinforcing once she experienced better sleep and reduced anxiety \u2014 the results became the motivation.',
  },
  {
    id: 'james-running',
    name: 'James',
    emoji: '\u{1F3C3}',
    challenge: '100-Day Running Challenge',
    challengeSlug: '100-day-running-challenge',
    duration: '100 days',
    background: 'James, 28, was a software developer who spent 10+ hours a day sitting. He\'d gained 30 pounds since starting his career and his energy levels had plummeted. He\'d tried gym memberships three times \u2014 each lasting less than a month.',
    approach: 'He committed to running for at least 20 minutes every day, with no minimum distance or pace. He laid out his running clothes the night before and ran first thing in the morning. On days when motivation was low, he told himself he only had to run for 5 minutes \u2014 a technique he called "the minimum viable run."',
    obstacles: 'On day 35, he pulled a calf muscle and couldn\'t run for 4 days. Instead of counting this as failure, he walked for 20 minutes on those days to maintain the habit loop. Around day 50, the monotony hit hard. He started listening to audiobooks only while running, creating an incentive to look forward to runs.',
    results: [
      'Completed 100 out of 100 days (including walk substitutions during injury)',
      'Lost 12 pounds and dropped his resting heart rate by 8 BPM',
      'Ran his first 5K on day 72 without stopping',
      'Transitioned to running 5 days/week with cross-training after the challenge',
    ],
    quote: 'The "5-minute rule" saved my streak at least 20 times. I\'d put on my shoes telling myself I could stop after 5 minutes. I never once actually stopped at 5.',
    keyLesson: 'Lowering the bar on difficult days preserves the streak without sacrificing the habit loop. The consistency of showing up matters more than the intensity of any single session.',
  },
  {
    id: 'priya-coding',
    name: 'Priya',
    emoji: '\u{1F4BB}',
    challenge: '100-Day Coding Challenge',
    challengeSlug: '100-day-coding-challenge',
    duration: '100 days',
    background: 'Priya, 31, was a marketing analyst who wanted to transition into data science. She\'d completed several online tutorials but never built anything substantial. She described her learning as "tutorial purgatory" \u2014 always watching, never doing.',
    approach: 'She committed to writing at least one hour of code every day, focused on building real projects rather than following tutorials. She started with small Python scripts for her current job (automating reports), then progressed to building a data dashboard. She tracked her progress and pushed code to GitHub daily as a public accountability mechanism.',
    obstacles: 'Around day 40, she hit a wall with a complex data visualization project and felt overwhelmed. She broke the project into smaller tasks and allowed herself to count research and planning as valid "coding time." Social events on weekends were challenging \u2014 she started coding before breakfast to protect her streak.',
    results: [
      'Completed 94 out of 100 days (94% consistency)',
      'Built 3 complete projects for her portfolio',
      'Received a promotion to a hybrid analyst-developer role at her company',
      'Contributed to 2 open-source projects',
    ],
    quote: 'Day 1, I could barely write a for loop without looking it up. By day 80, I was debugging other people\'s code at work. The transformation was so gradual I almost didn\'t notice it happening.',
    keyLesson: 'Building real projects beats tutorials every time. The daily commitment forced her out of "learning mode" and into "doing mode," which is where actual skill development happens.',
  },
  {
    id: 'marcus-morning-routine',
    name: 'Marcus',
    emoji: '\u{1F305}',
    challenge: '100-Day Morning Routine Challenge',
    challengeSlug: '100-day-morning-routine-challenge',
    duration: '100 days',
    background: 'Marcus, 42, was a small business owner who described his mornings as "reactive chaos." He\'d wake up, immediately check email, and spend the first two hours of his day putting out fires. By noon, he felt drained without having done any strategic work on his business.',
    approach: 'His morning routine challenge had three components: wake at 6 AM, 20 minutes of exercise, and 30 minutes of focused business planning before opening email. He set two alarms, prepared his workout clothes the night before, and kept a planning notebook on his kitchen table. He went to bed by 10:30 PM to support the early wake-up.',
    obstacles: 'The first two weeks were brutal \u2014 his body resisted the 6 AM wake-up. Around day 15, he started sleeping through his alarms during a particularly stressful business period. He solved this by moving his phone charger across the room, forcing himself to physically get up. Business travel on days 55-60 disrupted his routine; he adapted by doing a shortened 10-minute version in hotel rooms.',
    results: [
      'Completed 88 out of 100 days (88% consistency)',
      'Consistently waking at 6 AM became automatic by day 45',
      'Revenue increased 15% \u2014 attributed to the daily strategic planning sessions',
      'Reported feeling "in control of my day" for the first time in years',
    ],
    quote: 'I used to think successful people had more hours in the day. They don\'t. They just use the first hour better. That morning planning session changed my business more than any consultant ever did.',
    keyLesson: 'Complex multi-part habits (wake up + exercise + planning) are harder to form but create cascading benefits. The key was treating the wake-up time as the anchor habit that enabled everything else.',
  },
  {
    id: 'elena-journaling',
    name: 'Elena',
    emoji: '\u{1F4D3}',
    challenge: '100-Day Journaling Challenge',
    challengeSlug: '100-day-journaling-challenge',
    duration: '100 days',
    background: 'Elena, 26, was a graduate student dealing with anxiety and decision paralysis. Her therapist had recommended journaling for years, but she\'d always felt she "didn\'t have anything important to write about." She\'d bought three journals in the past \u2014 all had fewer than five entries.',
    approach: 'She used a structured approach: each daily entry had just three sections \u2014 "3 things I\'m grateful for," "1 thing I\'m worried about," and "1 thing I\'ll do today." This gave her a framework so she never faced a blank page. She journaled right before bed as a wind-down ritual, keeping her journal and pen on her nightstand.',
    obstacles: 'Perfectionism was her biggest enemy. In the first week, she spent 30+ minutes crafting "good" entries. She forced herself to set a 10-minute timer and write whatever came to mind. Around day 60, she felt the entries were becoming repetitive and meaningless. She added a weekly "reflection page" where she reviewed her entries and noticed patterns.',
    results: [
      'Completed 98 out of 100 days (98% consistency)',
      'Anxiety episodes decreased by roughly half, as tracked by her therapist',
      'Identified three recurring worry patterns she was able to address proactively',
      'The journal became her primary tool for processing difficult decisions',
    ],
    quote: 'I started writing for the streak. By day 40, I was writing for myself. The journal became the only place where I could think without judgment. Missing a night now feels like going to bed without brushing my teeth.',
    keyLesson: 'Structure eliminates the blank-page problem. By reducing the cognitive load of "what to write," the practice became about processing thoughts rather than producing content.',
  },
  {
    id: 'david-deep-work',
    name: 'David',
    emoji: '\u{1F3AF}',
    challenge: '100-Day Deep Work Challenge',
    challengeSlug: '100-day-deep-work-challenge',
    duration: '100 days',
    background: 'David, 38, was a university researcher who hadn\'t published a paper in two years despite having multiple studies in progress. He spent his days in meetings, answering emails, and helping students \u2014 important work, but it left zero time for the focused writing and analysis his career depended on.',
    approach: 'He blocked 90 minutes every morning (8:00-9:30 AM) as non-negotiable deep work time. During this window, he turned off all notifications, closed his email, put his phone in a drawer, and worked on his research exclusively. He used a "shutdown ritual" at 9:30 to transition back to responsive work: he wrote his next day\'s deep work task on a sticky note.',
    obstacles: 'Colleagues initially resented his unavailability in the mornings. He had to explicitly explain the challenge to his department chair and set an auto-responder for the 8:00-9:30 window. On day 30, an urgent department crisis tempted him to skip \u2014 he did his 90 minutes at 6 PM that day instead. The hardest part was resisting the urge to "quickly check" email during deep work blocks.',
    results: [
      'Completed 91 out of 100 days (91% consistency)',
      'Submitted 2 research papers during the challenge period',
      'Deep work capacity expanded from 60 to 90+ minutes without fatigue',
      'Department adopted a "no-meeting mornings" policy inspired by his results',
    ],
    quote: 'In 100 days of deep work, I produced more than in the previous two years of "being busy." The most productive thing I did was learn to be unreachable for 90 minutes.',
    keyLesson: 'Protecting time is harder than filling time. The deep work habit required not just doing something, but actively not doing other things (email, meetings, notifications). The shutdown ritual made the transition manageable.',
  },
];

export default function CaseStudiesPage() {
  useDocumentMeta({
    title: '100-Day Challenge Case Studies \u2014 6 Success Stories',
    description:
      'How six people used 100-day challenges to build lasting habits in meditation, running, coding, morning routines, journaling, and deep work. Composite profiles based on common success patterns.',
    path: '/case-studies',
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

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Case Studies' }]} />

        <h1 className={styles.pageTitle}>100-Day Challenge Case Studies</h1>
        <p className={styles.subtitle}>
          How six people used 100-day challenges to transform their daily routines into lasting habits. Each profile illustrates the strategies, setbacks, and breakthroughs that define a successful 100-day journey.
        </p>
        <p className={styles.disclaimer}>
          These are composite profiles based on common patterns observed across many 100-day challenge participants. They do not represent specific real individuals. Names, ages, and details have been created to illustrate typical experiences, strategies, and outcomes.
        </p>

        {CASE_STUDIES.map((study) => (
          <section key={study.id} id={study.id} className={styles.caseStudy}>
            <div className={styles.caseHeader}>
              <span className={styles.caseEmoji}>{study.emoji}</span>
              <h2 className={styles.caseName}>{study.name}: {study.challenge}</h2>
            </div>
            <p className={styles.challengeLink}>
              <Link to={`/challenges/${study.challengeSlug}`}>{study.challenge} &rarr;</Link>
            </p>
            <p className={styles.prose}>{study.background}</p>
            <h3 className={styles.subheading}>Approach</h3>
            <p className={styles.prose}>{study.approach}</p>
            <h3 className={styles.subheading}>Obstacles &amp; Recovery</h3>
            <p className={styles.prose}>{study.obstacles}</p>
            <h3 className={styles.subheading}>Results</h3>
            <ul className={styles.resultsList}>
              {study.results.map((result, i) => (
                <li key={i}>{result}</li>
              ))}
            </ul>
            <blockquote className={styles.quote}>
              &ldquo;{study.quote}&rdquo;
            </blockquote>
            <p className={styles.keyLesson}>
              <strong>Key Lesson:</strong> {study.keyLesson}
            </p>
          </section>
        ))}

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Start Your Own Story</h2>
          <p className={styles.ctaBody}>Choose a challenge and begin building your own 100-day success story.</p>
          <div className={styles.ctaLinks}>
            <Link to="/challenges" className={styles.ctaBtn}>Browse Challenges</Link>
            <Link to="/habits" className={styles.ctaBtnSecondary}>Explore Habits</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
