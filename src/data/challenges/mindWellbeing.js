/**
 * Mind & Wellbeing challenge data — 5 challenges for the mind category.
 */

export const mindWellbeingChallenges = [
  {
    slug: '100-day-meditation-challenge',
    name: '100 Day Meditation Challenge',
    emoji: '🧘',
    tagline: 'Train your attention and rewire your stress response',
    metaDescription:
      'Join the 100 Day Meditation Challenge. A progressive daily meditation plan with guided phases, milestones, and expert tips for every experience level.',
    difficulty: 'Easy',
    dailyTime: '10–20 minutes',
    color: '#4F46E5',
    category: 'mind',

    introduction:
      'Meditation is the only exercise where doing nothing is the entire point. Sit still, watch your breath, and let thoughts come and go without chasing them. It sounds simple, and it is — but simple doesn\'t mean easy.\n\nThe 100 Day Meditation Challenge gives you a progressive plan from complete beginner to experienced meditator. You\'ll start with 5-minute guided sessions and build to 20 minutes of unguided practice. Along the way, your stress reactivity will decrease, your focus will sharpen, and your emotional regulation will improve.\n\nThousands of peer-reviewed studies confirm meditation\'s effects on cortisol reduction, gray matter density, and default mode network activity. This isn\'t mysticism — it\'s neuroscience, applied daily.',

    bestFor: [
      'High-stress professionals who feel constantly reactive',
      'People with anxiety who want a drug-free management tool',
      'Anyone struggling with focus and attention in the age of distraction',
      'Students or knowledge workers who need sharper cognitive performance',
    ],

    requirements: [
      'A quiet place where you won\'t be interrupted',
      'A timer (phone on airplane mode works)',
      'A comfortable sitting position (chair, cushion, or floor)',
      'Optional: a meditation app like Insight Timer (free) or Headspace',
    ],

    phases: [
      {
        name: 'Getting Started',
        days: '1–14',
        dailyTarget: '5 minutes guided meditation',
        description:
          'Use a free guided meditation app. Simply follow the instructions: sit, breathe, notice when your mind wanders, gently return to the breath. That\'s it. No special technique needed.',
        tip: 'Meditate at the same time each day, ideally right after an existing habit like brushing your teeth.',
      },
      {
        name: 'Building Duration',
        days: '15–35',
        dailyTarget: '10 minutes guided or unguided',
        description:
          'Extend sessions to 10 minutes. Begin experimenting with unguided meditation: set a timer, close your eyes, and focus on your breath. When your mind wanders, notice it and return.',
        tip: 'Don\'t judge your sessions. A "bad" meditation where your mind wanders constantly is still training your attention.',
      },
      {
        name: 'Deepening Practice',
        days: '36–60',
        dailyTarget: '15 minutes with body scan or loving-kindness',
        description:
          'Explore different techniques: body scan meditation, loving-kindness (metta), or open awareness. Find what resonates with you beyond basic breath focus.',
        tip: 'Try body scan meditation before bed. It\'s deeply relaxing and improves sleep quality.',
      },
      {
        name: 'Silent Practice',
        days: '61–85',
        dailyTarget: '15–20 minutes unguided',
        description:
          'Move toward predominantly silent, unguided meditation. Set a timer and sit. You now have enough experience to practice without external guidance.',
        tip: 'When thoughts arise, label them — "thinking," "planning," "worrying" — then return to the breath. Labeling creates distance.',
      },
      {
        name: 'Integrated Meditation',
        days: '86–100',
        dailyTarget: '15–20 minutes, your preferred style',
        description:
          'Your meditation practice is personalized. Some days are guided, some silent. Some focus on breath, others on compassion. The practice is yours.',
        tip: 'Extend mindfulness beyond the cushion. Practice present-moment awareness during walking, eating, or waiting.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'Sitting still for 5 minutes is the challenge. You\'re building the neural pathway for focused attention.' },
      { day: 21, title: 'Settling In', description: 'You\'re noticing thoughts without being swept away by them. Stress reactivity is starting to shift.' },
      { day: 50, title: 'Halfway There', description: 'Friends and family may notice you\'re calmer. Your ability to pause before reacting is growing.' },
      { day: 75, title: 'Deep Practice', description: 'Meditation feels like a reset button, not a chore. You miss it when you skip.' },
      { day: 100, title: 'Challenge Complete', description: 'Over 25 hours of meditation. Your brain has physically changed — more gray matter, lower stress baseline.' },
    ],

    obstacles: [
      {
        problem: 'I can\'t stop my thoughts during meditation',
        solution: 'You\'re not supposed to. The goal is to notice thoughts and return to the breath. Each time you notice a wandering mind and return, you\'re strengthening attention — that IS the practice.',
      },
      {
        problem: 'I fall asleep during meditation',
        solution: 'Sit upright rather than lying down. Meditate in the morning when alertness is higher. Open your eyes slightly and gaze softly at the floor.',
      },
      {
        problem: 'I don\'t feel any different after sessions',
        solution: 'Meditation\'s benefits are cumulative and often noticed by others before you notice them yourself. Keep practicing. The research says it\'s working even when it doesn\'t feel like it.',
      },
      {
        problem: 'I get restless and want to stop early',
        solution: 'Start with shorter sessions (even 3 minutes) and build up. Restlessness is the mind resisting stillness — it passes. Commit to sitting until the timer sounds.',
      },
    ],

    tips: [
      'Start with guided meditation. Going unguided too early is like swimming without lessons.',
      'Meditate at the same time every day. Morning is ideal because the mind is least cluttered.',
      'Your posture matters: sit upright with a straight spine. Slouching invites drowsiness.',
      'Use the breath as an anchor, not a task. You\'re observing breathing, not controlling it.',
      'Don\'t track "progress" session by session. Meditation is not linear. Rough days are part of the process.',
      'Insight Timer is a free app with thousands of guided meditations and a built-in timer.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You\'ve never meditated or have tried only a few times.',
        recommendation: 'Start with 5-minute guided meditations daily. Don\'t try to go unguided yet. Build the habit of sitting first.',
        dailyTarget: '5 minutes guided',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You\'ve meditated before but lack a consistent daily practice.',
        recommendation: 'Start at 10 minutes, alternating between guided and unguided. The challenge is showing up every day, not session depth.',
        dailyTarget: '10 minutes guided or unguided',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You have a meditation practice but want to deepen and extend it.',
        recommendation: 'Start at 15–20 minutes unguided. Explore different techniques: vipassana, metta, zazen. The 100-day streak will deepen your practice significantly.',
        dailyTarget: '15–20 minutes unguided',
      },
    ],

    faq: [
      {
        question: 'Is meditation religious?',
        answer: 'Meditation exists in many religious traditions, but the practice itself is secular. Breath-focused meditation is a cognitive exercise, like going to the gym for your brain.',
      },
      {
        question: 'What\'s the best time of day to meditate?',
        answer: 'Morning is ideal — the mind is fresh and the world is quiet. But any consistent time works. The best time is the time you\'ll actually do it.',
      },
      {
        question: 'Can meditation help with anxiety?',
        answer: 'Yes. Multiple meta-analyses show meditation reduces anxiety symptoms comparable to SSRIs in some studies. It trains you to observe anxious thoughts without identifying with them.',
      },
      {
        question: 'How do I know if I\'m meditating correctly?',
        answer: 'If you\'re sitting, focusing on something (breath, mantra, body), noticing when your mind wanders, and gently returning — you\'re meditating correctly. There\'s no special state to achieve.',
      },
      {
        question: 'Do I need to sit cross-legged on the floor?',
        answer: 'No. Sit in a chair with your feet flat on the floor. The key is an upright, comfortable posture. Discomfort distracts from the practice.',
      },
    ],

    relatedHabits: ['meditate', 'gratitude-list', 'daily-journaling'],
    relatedChallenges: ['100-day-gratitude-challenge', '100-day-journaling-challenge', '100-day-yoga-challenge'],
    relatedArticles: [{ pillar: '100-day-challenges', slug: '100-day-meditation-challenge-guide' }],
  },

  {
    slug: '100-day-gratitude-challenge',
    name: '100 Day Gratitude Challenge',
    emoji: '🙏',
    tagline: 'Rewire your brain to notice what\'s going well',
    metaDescription:
      'Join the 100 Day Gratitude Challenge. Write three things you\'re grateful for daily and measurably shift your well-being, sleep, and relationships.',
    difficulty: 'Easy',
    dailyTime: '5–10 minutes',
    color: '#059669',
    category: 'mind',

    introduction:
      'The human brain has a negativity bias. It evolved to focus on threats, problems, and worst-case scenarios. This was useful when we lived in the savanna; it\'s less useful when it keeps you awake at 2 AM worrying about an email.\n\nGratitude practice counteracts this bias. Writing down three specific things you\'re grateful for each day trains your brain to scan for the positive — not because you ignore problems, but because you stop overlooking the good. Research from UC Davis and the University of Pennsylvania shows measurable improvements in well-being, sleep quality, and relationship satisfaction.\n\nThe 100 Day Gratitude Challenge is five minutes a day. Three things, written down. That\'s it. Simple, evidence-based, and transformative over time.',

    bestFor: [
      'People prone to negative thinking or chronic worry',
      'Anyone experiencing stress, burnout, or dissatisfaction',
      'People who want to improve their relationships and social connections',
      'Anyone looking for the simplest possible well-being practice',
    ],

    requirements: [
      'A notebook or journal dedicated to gratitude',
      'A pen',
      'Five minutes of uninterrupted time daily',
    ],

    phases: [
      {
        name: 'Starting the Scan',
        days: '1–14',
        dailyTarget: '3 things you\'re grateful for',
        description:
          'Write down three things you\'re grateful for each day. They can be simple: a good cup of coffee, a kind word, sunshine through the window. The act of scanning for them is the practice.',
        tip: 'Be specific. "I\'m grateful my colleague helped me debug the login flow" is better than "I\'m grateful for work."',
      },
      {
        name: 'Deepening Awareness',
        days: '15–35',
        dailyTarget: '3 things with 1 sentence of explanation each',
        description:
          'Add a sentence explaining why each item matters to you. This deepens the emotional processing and makes the gratitude more than a list.',
        tip: 'Include at least one person in your daily list. Relational gratitude is the most powerful kind.',
      },
      {
        name: 'Expanding Categories',
        days: '36–60',
        dailyTarget: '3 things from different life areas',
        description:
          'Deliberately scan different categories: relationships, health, work, small pleasures, growth, nature. This prevents the practice from becoming rote.',
        tip: 'Try "gratitude for challenges" — what difficult situation taught you something or made you stronger?',
      },
      {
        name: 'Expressing Gratitude',
        days: '61–85',
        dailyTarget: '3 things + express gratitude to someone weekly',
        description:
          'Once a week, express gratitude directly to someone: a text, a note, a conversation. Moving from internal to expressed gratitude deepens its effects.',
        tip: 'A handwritten thank-you note is unexpectedly powerful. People save them for years.',
      },
      {
        name: 'Grateful by Default',
        days: '86–100',
        dailyTarget: '3 things, your own format',
        description:
          'By now, scanning for gratitude is automatic. You notice good things throughout the day without trying. The journal captures what your brain is already doing.',
        tip: 'Re-read your first week\'s entries. You\'ll see how much your perspective has shifted.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'You\'re scanning for positives throughout the day. 21 things documented.' },
      { day: 21, title: 'Rewiring Begins', description: 'You\'re noticing good things more often and more naturally. Sleep may have improved.' },
      { day: 50, title: 'Perspective Shift', description: '150 things documented. Your default mood has shifted toward the positive.' },
      { day: 75, title: 'Deep Gratitude', description: 'You catch yourself feeling grateful spontaneously. Negativity bias is weaker.' },
      { day: 100, title: 'Challenge Complete', description: '300+ things to be grateful for, documented. A measurable shift in well-being and perspective.' },
    ],

    obstacles: [
      {
        problem: 'I can\'t think of three things to be grateful for',
        solution: 'Start with basics: you\'re alive, you have shelter, you ate today. On hard days, small things count. The practice is especially valuable when it feels difficult.',
      },
      {
        problem: 'The practice feels repetitive — I keep writing the same things',
        solution: 'Zoom in on specifics. Instead of "grateful for my family," write "grateful my daughter made me laugh at dinner with her dinosaur impression." Details keep it fresh.',
      },
      {
        problem: 'It feels forced or fake',
        solution: 'Authenticity matters. Don\'t write what you think you should be grateful for. Write what actually made you feel a moment of appreciation, however small.',
      },
    ],

    tips: [
      'Write by hand rather than typing. The slower pace deepens the reflection.',
      'Do it at the same time daily — morning to set your lens, or bedtime to end on a positive note.',
      'Vary your categories: people, experiences, opportunities, health, nature, small pleasures.',
      'On truly terrible days, write one thing. One is enough.',
      'Re-read old entries when you\'re feeling low. Your past self left you a library of good things.',
      'Share your gratitude with someone mentioned in your journal at least once a week.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You\'ve never done a gratitude practice before.',
        recommendation: 'Start with 3 bullet points per day. Keep it simple and specific. Don\'t overthink it — just write what comes to mind.',
        dailyTarget: '3 bullet-point entries, 5 minutes',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You\'ve done gratitude journaling but not consistently.',
        recommendation: 'Write 3 entries with a sentence of explanation each. Focus on making it daily and specific.',
        dailyTarget: '3 detailed entries, 5–10 minutes',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You have a regular practice but want to deepen it.',
        recommendation: 'Add weekly gratitude expression (telling someone directly) and reflective re-reading of past entries. The 100-day streak will solidify the habit.',
        dailyTarget: '3 entries + weekly expression',
      },
    ],

    faq: [
      {
        question: 'Does gratitude journaling actually work, or is it just positive thinking?',
        answer: 'It works. Randomized controlled trials show measurable improvements in well-being, sleep, and even physical health. It\'s not about ignoring problems — it\'s about training your brain to also notice what\'s going well.',
      },
      {
        question: 'Should I write in the morning or at night?',
        answer: 'Both work. Morning gratitude sets a positive lens for the day. Evening gratitude helps you process the day positively before sleep. Choose the time you\'ll be most consistent.',
      },
      {
        question: 'Can I use a phone app instead of a notebook?',
        answer: 'You can, but research suggests handwriting produces deeper cognitive processing. If an app is the only way you\'ll do it consistently, use the app.',
      },
      {
        question: 'What if I\'m going through a genuinely hard time?',
        answer: 'That\'s when gratitude practice is most valuable. It doesn\'t minimize your pain — it ensures you don\'t lose sight of everything else. Start with the smallest things: breath, safety, one person who cares.',
      },
    ],

    relatedHabits: ['gratitude-list', 'daily-journaling', 'meditate'],
    relatedChallenges: ['100-day-meditation-challenge', '100-day-journaling-challenge', '100-day-prayer-challenge'],
    relatedArticles: [{ pillar: '100-day-challenges', slug: '100-day-meditation-challenge-guide' }],
  },

  {
    slug: '100-day-prayer-challenge',
    name: '100 Day Prayer Challenge',
    emoji: '🙏',
    tagline: 'Deepen your faith with 100 days of consistent prayer',
    metaDescription:
      'Join the 100 Day Prayer Challenge. Build a daily prayer habit with structured phases, spiritual milestones, and practical tips for consistent devotion.',
    difficulty: 'Easy',
    dailyTime: '10–15 minutes',
    color: '#7C3AED',
    category: 'mind',

    introduction:
      'Prayer is conversation with the divine — and like any relationship, consistency matters more than perfection. A 10-minute daily prayer practice, maintained over 100 days, deepens spiritual life more than sporadic hour-long sessions.\n\nThis challenge works for any faith tradition: Christianity, Islam, Judaism, Hinduism, Buddhism, or personal spirituality. The structure adapts to your beliefs. What matters is showing up every day and directing your attention beyond yourself.\n\nBy day 100, prayer won\'t be something on your to-do list. It will be the foundation your day rests on — a source of peace, guidance, and perspective that you carry everywhere.',

    bestFor: [
      'People of any faith who want a more consistent prayer life',
      'Anyone who prays sporadically and wants to build a daily rhythm',
      'People going through difficult seasons who need spiritual grounding',
      'Anyone seeking a daily practice of surrender, gratitude, and reflection',
    ],

    requirements: [
      'A quiet place for prayer',
      'A sacred text or prayer book (optional)',
      'A journal for recording reflections (optional)',
      'A timer to protect the prayer time',
    ],

    phases: [
      {
        name: 'Establishing the Practice',
        days: '1–14',
        dailyTarget: '10 minutes of prayer',
        description:
          'Set aside 10 minutes at the same time each day. Use a simple structure: praise, confession, thanksgiving, requests. Don\'t worry about eloquence — speak honestly.',
        tip: 'Pray at the same time each day. Morning prayer sets the spiritual tone; evening prayer closes the day in peace.',
      },
      {
        name: 'Adding Scripture',
        days: '15–35',
        dailyTarget: '10 minutes prayer + brief scripture',
        description:
          'Begin your prayer time with a short scripture or sacred reading. Let the text guide your prayer. This combines meditation on divine word with personal conversation.',
        tip: 'Read a single verse or passage slowly, then pray about what it means for your life today.',
      },
      {
        name: 'Deepening Intimacy',
        days: '36–60',
        dailyTarget: '10–15 minutes with listening prayer',
        description:
          'Add silence to your prayer time. After speaking, sit quietly and listen. This is the hardest part of prayer — but the most transformative.',
        tip: 'Silence feels uncomfortable at first. Start with 2 minutes of quiet listening and build from there.',
      },
      {
        name: 'Intercessory Prayer',
        days: '61–85',
        dailyTarget: '15 minutes including prayers for others',
        description:
          'Expand your prayers to include specific people by name: family, friends, community, leaders, those who are suffering. Praying for others deepens compassion.',
        tip: 'Keep a prayer list. Reviewing answered prayers builds faith and gratitude over time.',
      },
      {
        name: 'Prayer as Foundation',
        days: '86–100',
        dailyTarget: '10–15 minutes, your personal rhythm',
        description:
          'Your prayer life has its own rhythm now. Some days are words; some days are silence. Some are grateful; some are desperate. All of them are real.',
        tip: 'Continue the prayer journal beyond 100 days. Looking back at prayers over months and years reveals patterns of growth and answered prayer.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'Prayer is part of your daily routine. The habit is forming.' },
      { day: 21, title: 'Spiritual Rhythm', description: 'Prayer feels less like a task and more like a conversation. You notice when you miss it.' },
      { day: 50, title: 'Halfway There', description: 'Your prayer life has depth. You\'re more aware of spiritual guidance in daily life.' },
      { day: 75, title: 'Deep Faith', description: 'Prayer is the anchor of your day. Your relationship with the divine is measurably stronger.' },
      { day: 100, title: 'Challenge Complete', description: '100 days of faithful prayer. A spiritual discipline that will last a lifetime.' },
    ],

    obstacles: [
      {
        problem: 'I don\'t know what to say',
        solution: 'Use the ACTS structure: Adoration (praise), Confession (honesty), Thanksgiving (gratitude), Supplication (requests). Or simply say what\'s on your heart.',
      },
      {
        problem: 'My mind wanders constantly during prayer',
        solution: 'This is universal. When you notice your mind wandering, gently return to prayer. Wandering and returning IS the practice of devotion.',
      },
      {
        problem: 'I don\'t feel anything during prayer',
        solution: 'Feelings are not the measure of prayer. Faithfulness is. Show up consistently and trust the process. Dry seasons are part of every spiritual journey.',
      },
    ],

    tips: [
      'Pray at the same time every day. Consistency builds depth more than duration.',
      'Write your prayers if verbal prayer feels scattered. Journaling and prayer overlap beautifully.',
      'Include specific names and situations rather than vague generalities.',
      'Use sacred texts as prayer prompts when you don\'t know what to say.',
      'Silence is not emptiness. Give God space to speak after you\'ve spoken.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You pray occasionally but have no consistent daily practice.',
        recommendation: 'Start with 5–10 minutes using a simple structure (praise, thanks, requests). Use written prayers or prayer books as guides.',
        dailyTarget: '5–10 minutes structured prayer',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You pray regularly but lack daily consistency.',
        recommendation: 'Start at 10 minutes combining spoken prayer with a brief scripture reading. Focus on showing up every single day.',
        dailyTarget: '10 minutes prayer + scripture',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You have an active prayer life and want to deepen it.',
        recommendation: 'Add contemplative prayer (silence, listening) and expand intercessory prayer. Use the 100-day framework to build depth you\'ve never reached.',
        dailyTarget: '15 minutes with contemplative elements',
      },
    ],

    faq: [
      {
        question: 'Is this challenge for a specific religion?',
        answer: 'No. This challenge works for any faith tradition. The structure (praise, gratitude, confession, requests) is universal. Adapt the language and practices to your beliefs.',
      },
      {
        question: 'What if I miss a day?',
        answer: 'Resume the next day. Don\'t restart the count. The goal is 100 completed days of prayer, not 100 consecutive days of perfection.',
      },
      {
        question: 'How do I know if prayer is "working"?',
        answer: 'Look for subtle shifts: more peace, better perspective during difficulty, increased compassion, moments of clarity. Prayer reshapes you gradually, not dramatically.',
      },
      {
        question: 'Should I pray silently or out loud?',
        answer: 'Either works. Praying aloud helps some people focus. Silent prayer is more practical in shared spaces. Try both and see what deepens your connection.',
      },
    ],

    relatedHabits: ['daily-prayer', 'read-scripture', 'gratitude-prayer'],
    relatedChallenges: ['100-day-meditation-challenge', '100-day-gratitude-challenge', '100-day-journaling-challenge'],
    relatedArticles: [{ pillar: '100-day-challenges', slug: '100-day-meditation-challenge-guide' }],
  },

  {
    slug: '100-day-journaling-challenge',
    name: '100 Day Journaling Challenge',
    emoji: '📓',
    tagline: 'Think on paper for 100 days and discover who you really are',
    metaDescription:
      'Join the 100 Day Journaling Challenge. Write daily to reduce anxiety, improve self-awareness, and build a record of growth with guided prompts and tips.',
    difficulty: 'Easy',
    dailyTime: '10–15 minutes',
    color: '#D97706',
    category: 'mind',

    introduction:
      'Journaling is thinking on paper. When thoughts stay in your head, they loop endlessly, growing larger and more tangled. When you write them down, they become manageable — smaller, clearer, and often less frightening than they seemed.\n\nThe 100 Day Journaling Challenge asks you to write for 10–15 minutes every day. No rules about topic, format, or quality. Stream-of-consciousness, bullet points, reflections, rants, gratitude lists, future plans — all of it counts. The act of writing is the practice.\n\nBy day 100, you\'ll have a record of your inner life that no one else has. You\'ll know yourself better. You\'ll have processed emotions you didn\'t know you were carrying. And you\'ll have evidence of growth that\'s impossible to see in real time but obvious on the page.',

    bestFor: [
      'People who feel overwhelmed by their own thoughts',
      'Anyone who wants to improve self-awareness and emotional intelligence',
      'Writers, students, or knowledge workers who want to think more clearly',
      'People processing major life transitions, grief, or change',
    ],

    requirements: [
      'A notebook or journal (physical recommended)',
      'A pen you enjoy writing with',
      'A quiet 10–15 minute window each day',
    ],

    phases: [
      {
        name: 'Just Write',
        days: '1–14',
        dailyTarget: '10 minutes of freewriting',
        description:
          'Write whatever comes to mind for 10 minutes. Don\'t edit, don\'t plan, don\'t judge. If you don\'t know what to write, write "I don\'t know what to write" until something comes.',
        tip: 'Write by hand. The slower pace engages different brain areas and produces deeper reflection.',
      },
      {
        name: 'Finding Your Style',
        days: '15–35',
        dailyTarget: '10–15 minutes, experimenting with formats',
        description:
          'Try different journaling styles: morning pages, evening reflections, gratitude lists, letter format, question-and-answer. Discover what resonates with your brain.',
        tip: 'Try starting with the prompt: "Right now I feel..." and let the writing follow.',
      },
      {
        name: 'Deeper Reflection',
        days: '36–60',
        dailyTarget: '15 minutes with reflective prompts',
        description:
          'Begin using prompts that push deeper: "What am I avoiding?" "What would I do if I weren\'t afraid?" "What pattern keeps repeating in my life?" Go beyond the surface.',
        tip: 'Re-read your week\'s entries each Sunday. Patterns and insights emerge that you miss in the daily flow.',
      },
      {
        name: 'Processing & Growth',
        days: '61–85',
        dailyTarget: '15 minutes, mixed format',
        description:
          'You know what journaling style works for you. Use the journal to process difficult emotions, plan your future, celebrate wins, and work through problems.',
        tip: 'Write about a problem you\'re stuck on. Often the act of articulating it on paper reveals the solution.',
      },
      {
        name: 'The Journal Habit',
        days: '86–100',
        dailyTarget: '10–15 minutes, your rhythm',
        description:
          'Journaling is part of who you are. The notebook is your thinking partner. Some days you\'ll write pages; some days, a single sentence. Both count.',
        tip: 'Start a new notebook after the challenge as a fresh chapter. Keep the old one — it\'s a time capsule.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'The blank page is less intimidating. You\'re finding your rhythm.' },
      { day: 21, title: 'Voice Emerging', description: 'Your writing is getting more honest and fluid. Self-censorship is fading.' },
      { day: 50, title: 'Halfway There', description: 'Re-reading early entries reveals how much your thinking has evolved. The journal is a mirror.' },
      { day: 75, title: 'Deep Self-Knowledge', description: 'You understand your patterns, triggers, and values more clearly than ever. Writing is thinking.' },
      { day: 100, title: 'Challenge Complete', description: '100 entries. A comprehensive record of your inner life and growth. Priceless.' },
    ],

    obstacles: [
      {
        problem: 'I stare at the blank page and nothing comes',
        solution: 'Use a prompt: "Today I feel...", "What\'s on my mind is...", or "I\'m avoiding...". Or write about the blankness itself. The pen moving is what matters.',
      },
      {
        problem: 'I\'m worried someone will read my journal',
        solution: 'Keep it in a private, secure place. If privacy is a serious concern, write on loose paper and shred it. The benefit is in the writing, not the keeping.',
      },
      {
        problem: 'I don\'t have anything interesting to write about',
        solution: 'Journaling isn\'t about interesting — it\'s about honest. Your ordinary day, observed carefully, is endlessly rich. Write what\'s true, not what\'s impressive.',
      },
    ],

    tips: [
      'Write first thing in the morning before your inner editor wakes up.',
      'Don\'t reread while writing. Just keep the pen moving forward.',
      'A single sentence on a hard day still counts as journaling.',
      'Use a physical notebook — the tactile experience creates a different relationship with your thoughts.',
      'Date every entry. Future you will thank you.',
      'Try the "3-3-3" format: 3 things I\'m grateful for, 3 things I want to accomplish, 3 things I\'m feeling.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You\'ve never journaled regularly or tried and stopped.',
        recommendation: 'Start with 10 minutes of freewriting daily. No format, no rules. Just write. Use prompts when stuck.',
        dailyTarget: '10 minutes freewriting',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You\'ve journaled before but can\'t maintain daily consistency.',
        recommendation: 'Start with 10–15 minutes using a format that worked for you before. Focus on the daily streak, not entry quality.',
        dailyTarget: '10–15 minutes, your preferred format',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You journal regularly and want to deepen the practice.',
        recommendation: 'Use deeper reflection prompts, weekly review sessions, and cross-referencing themes across entries. The 100-day streak will reveal patterns you\'ve never noticed.',
        dailyTarget: '15 minutes with reflective prompts',
      },
    ],

    faq: [
      {
        question: 'What should I write about?',
        answer: 'Anything. How you feel, what happened today, what you\'re worried about, what you\'re excited about, a problem you\'re solving. There are no wrong topics.',
      },
      {
        question: 'Should I journal in the morning or evening?',
        answer: 'Morning journaling clears mental clutter and sets intentions. Evening journaling processes the day and promotes better sleep. Try both and see which sticks.',
      },
      {
        question: 'Digital or paper journal?',
        answer: 'Research favors handwriting for deeper cognitive processing. But a digital journal you actually use beats a paper journal that stays blank. Choose what you\'ll do consistently.',
      },
      {
        question: 'How much should I write each day?',
        answer: 'There\'s no minimum. Some days will be three pages; some days will be two sentences. The practice is showing up, not hitting a word count.',
      },
    ],

    relatedHabits: ['daily-journaling', 'write-500-words', 'gratitude-list'],
    relatedChallenges: ['100-day-writing-challenge', '100-day-gratitude-challenge', '100-day-meditation-challenge'],
    relatedArticles: [{ pillar: '100-day-challenges', slug: '100-day-writing-challenge-guide' }],
  },

  {
    slug: '100-day-cold-shower-challenge',
    name: '100 Day Cold Shower Challenge',
    emoji: '🥶',
    tagline: 'Build mental toughness one cold shower at a time',
    metaDescription:
      'Join the 100 Day Cold Shower Challenge. Progressive cold exposure plan from warm-to-cold transitions to full cold showers with health benefits and tips.',
    difficulty: 'Hard',
    dailyTime: '5–10 minutes',
    color: '#0284C7',
    category: 'mind',

    introduction:
      'A cold shower is the fastest way to prove to yourself that you can do hard things. Every morning, you stand under water that your entire body is screaming to escape — and you stay. That daily act of voluntary discomfort builds a kind of mental resilience that transfers to every other challenge in your life.\n\nBeyond the mental benefits, cold exposure activates brown fat (boosting metabolism), reduces inflammation, improves circulation, and triggers a massive norepinephrine release that elevates mood and alertness for hours afterward.\n\nThe 100 Day Cold Shower Challenge starts gently — a 15-second cold burst at the end of your normal shower — and builds to full cold showers. By day 100, cold water will feel invigorating rather than torturous.',

    bestFor: [
      'People who want to build mental toughness and discipline',
      'Anyone struggling with morning sluggishness or low energy',
      'Athletes looking for natural recovery and inflammation reduction',
      'People curious about cold exposure and Wim Hof Method practices',
    ],

    requirements: [
      'A shower with temperature control',
      'A timer (phone or waterproof watch)',
      'The willingness to be uncomfortable for a few minutes daily',
    ],

    phases: [
      {
        name: 'The Cold Burst',
        days: '1–14',
        dailyTarget: '15–30 seconds cold at end of normal shower',
        description:
          'Take your normal warm shower, then turn the water to cold for the last 15–30 seconds. Focus on breathing slowly and steadily. Don\'t gasp — control your breath.',
        tip: 'Start with the water hitting your legs and back, not your head. Ease into it.',
      },
      {
        name: 'Extending Exposure',
        days: '15–35',
        dailyTarget: '30–60 seconds cold',
        description:
          'Extend the cold exposure to 30–60 seconds. Your body is adapting. The gasp reflex should be less intense. Focus on slow, controlled breathing throughout.',
        tip: 'Breathe in through your nose and out through your mouth. Control your breathing and you control your response.',
      },
      {
        name: 'Cold First',
        days: '36–60',
        dailyTarget: '1–2 minutes cold, start before warm',
        description:
          'Start your shower cold for 1–2 minutes before switching to warm. Starting cold is psychologically harder but builds more resilience.',
        tip: 'Count your breaths instead of watching the clock. 20 slow breaths is about 2 minutes.',
      },
      {
        name: 'Full Cold Shower',
        days: '61–85',
        dailyTarget: '2–3 minutes fully cold',
        description:
          'Take fully cold showers for 2–3 minutes. No warm water. Your body has adapted — the shock response is minimal. Focus on the energy and clarity that follows.',
        tip: 'If you can\'t handle full cold, alternate: 1 minute cold, 30 seconds warm, repeat. Contrast showers are also beneficial.',
      },
      {
        name: 'Cold Mastery',
        days: '86–100',
        dailyTarget: '3+ minutes cold, your preferred method',
        description:
          'Cold showers are part of your identity. You choose your preferred method: full cold, warm-to-cold, or contrast. The daily discomfort has become a source of strength.',
        tip: 'Try ending your cold shower with 30 seconds of the coldest setting. The last 30 seconds build the most resilience.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'The gasp reflex is already less intense. You\'re learning to control your breathing under stress.' },
      { day: 21, title: 'Adaptation Beginning', description: 'Cold water feels less shocking. You might notice improved alertness and mood after showers.' },
      { day: 50, title: 'Halfway There', description: 'Cold showers are becoming routine. The mental toughness transfers to other areas of your life.' },
      { day: 75, title: 'Cold Comfort', description: 'You look forward to the cold. The post-shower energy and clarity are addictive.' },
      { day: 100, title: 'Challenge Complete', description: '100 cold showers. You\'ve proven you can voluntarily do hard things every single day.' },
    ],

    obstacles: [
      {
        problem: 'The cold feels unbearable at first',
        solution: 'Start with just 15 seconds and breathe through it. Your body adapts remarkably fast. By week 2, what felt unbearable feels manageable.',
      },
      {
        problem: 'I dread the shower every morning',
        solution: 'That dread is the point. Acting despite dread is discipline. After the shower, notice how good you feel. The dread is temporary; the energy lasts hours.',
      },
      {
        problem: 'Cold showers in winter feel impossible',
        solution: 'Reduce duration in extreme cold weather. A 30-second cold burst still counts. Or use contrast showers (cold-warm-cold) to make it tolerable.',
      },
    ],

    tips: [
      'Breathe before you enter: three deep breaths, then step in on the exhale.',
      'Focus on your breathing, not the temperature. Controlled breathing is the key skill.',
      'The first 15 seconds are the hardest. If you can survive those, the rest is manageable.',
      'Notice the energy and mood boost after each cold shower. That\'s norepinephrine at work.',
      'Don\'t judge your performance. Some days are harder than others. Showing up is what matters.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You\'ve never taken a cold shower voluntarily.',
        recommendation: 'End your warm shower with 15 seconds of cold water for the first two weeks. Build from there. Don\'t start with full cold.',
        dailyTarget: '15–30 seconds cold at end of warm shower',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You\'ve tried cold showers but can\'t maintain the daily habit.',
        recommendation: 'Start with 1 minute of cold water. Focus on the daily streak — consistency matters more than duration.',
        dailyTarget: '1–2 minutes cold',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You\'re comfortable with cold exposure and want a 100-day streak.',
        recommendation: 'Take fully cold showers for 3+ minutes. Experiment with ice baths on weekends for deeper cold adaptation.',
        dailyTarget: '3+ minutes fully cold',
      },
    ],

    faq: [
      {
        question: 'Are cold showers actually healthy or just hype?',
        answer: 'Cold exposure has real physiological effects: increased norepinephrine (mood and alertness), reduced inflammation, improved circulation, and activated brown fat. It\'s not a miracle cure, but the benefits are well-documented.',
      },
      {
        question: 'Can cold showers help with depression or anxiety?',
        answer: 'Cold exposure triggers a significant norepinephrine release, which can improve mood and alertness. Some research suggests regular cold exposure reduces depressive symptoms. It\'s not a replacement for treatment, but a useful complement.',
      },
      {
        question: 'Is it safe to take cold showers every day?',
        answer: 'For most healthy people, yes. Avoid if you have a heart condition, Raynaud\'s disease, or are immunocompromised. Consult your doctor if you have concerns.',
      },
      {
        question: 'How cold does the water need to be?',
        answer: 'As cold as your tap goes. You don\'t need ice water — standard cold tap water (50–60°F / 10–15°C) is sufficient for the benefits.',
      },
    ],

    relatedHabits: ['wake-up-at-6-am', 'meditate', '30-minute-workout'],
    relatedChallenges: ['100-day-meditation-challenge', '100-day-morning-routine-challenge', '100-day-running-challenge'],
    relatedArticles: [{ pillar: '100-day-challenges', slug: 'how-to-not-quit-a-challenge' }],
  },
];
