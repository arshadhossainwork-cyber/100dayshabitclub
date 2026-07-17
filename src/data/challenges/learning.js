/**
 * Learning & Growth challenge data — 5 challenges for the learning category.
 */

export const learningChallenges = [
  {
    slug: '100-day-reading-challenge',
    name: '100 Day Reading Challenge',
    emoji: '📚',
    tagline: 'Read every day for 100 days and transform your mind',
    metaDescription:
      'Join the 100 Day Reading Challenge. Read 30 minutes daily with a progressive plan, book selection tips, milestones, and strategies for every reading level.',
    difficulty: 'Easy',
    dailyTime: '30 minutes',
    color: '#4F46E5',
    category: 'learning',

    introduction:
      'Reading 30 minutes a day adds up to roughly 50 hours over 100 days — enough to finish 6–8 books at average reading speed. That\'s more books than most adults read in a year, and you\'ll do it in just over three months.\n\nBut the 100 Day Reading Challenge isn\'t about hitting a number. It\'s about replacing passive screen time with active, focused reading. It\'s about building the concentration to read deeply in an age of distraction. It\'s about exposing yourself to ideas, stories, and perspectives that expand who you are.\n\nWhether you read fiction, non-fiction, academic texts, or graphic novels — it all counts. The only rule is 30 minutes of focused reading every day for 100 days.',

    bestFor: [
      'People who want to read more but keep choosing screens instead',
      'Students or lifelong learners who want structured reading time',
      'Anyone looking to reduce screen time with a productive alternative',
      'Professionals who need to stay current in their field',
    ],

    requirements: [
      'Books (physical, e-reader, or audiobook)',
      'A quiet reading environment',
      'A timer or clock',
      'A reading list (start with 2–3 books that genuinely interest you)',
    ],

    phases: [
      {
        name: 'Building the Habit',
        days: '1–14',
        dailyTarget: '15–20 pages or 30 minutes',
        description:
          'Read for 30 minutes at the same time each day. Don\'t worry about speed or comprehension — just read. The goal is to make daily reading automatic.',
        tip: 'Read before bed as a screen replacement. Keep a book on your nightstand to make it the default.',
      },
      {
        name: 'Finding Your Rhythm',
        days: '15–35',
        dailyTarget: '20–25 pages or 30 minutes',
        description:
          'Your reading speed is increasing naturally. You\'re likely finishing your first book. Choose your next book before you finish the current one to avoid gaps.',
        tip: 'Alternate between fiction and non-fiction to prevent fatigue. Variety sustains the habit.',
      },
      {
        name: 'Deep Reading',
        days: '36–60',
        dailyTarget: '25–30 pages or 30 minutes',
        description:
          'Your concentration has improved. You can read for 30 minutes without checking your phone. Dive into more challenging material — your brain is ready for it.',
        tip: 'Take brief notes on non-fiction books. Writing one sentence per chapter dramatically improves retention.',
      },
      {
        name: 'Reading Identity',
        days: '61–85',
        dailyTarget: '30+ pages or 30 minutes',
        description:
          'You identify as a reader now. Reading is not an activity you do; it\'s part of who you are. Explore genres, authors, and topics outside your comfort zone.',
        tip: 'Ask friends, colleagues, or online communities for recommendations. The best books often come from unexpected sources.',
      },
      {
        name: 'Reader for Life',
        days: '86–100',
        dailyTarget: '30+ pages or 30 minutes',
        description:
          'You\'ve read 5–8 books. Your vocabulary, thinking, and conversations reflect it. The challenge ends, but the habit doesn\'t — reading is permanent.',
        tip: 'Create a reading list for the next 100 days. Momentum is a powerful force.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'You\'ve read for 3.5 hours. The reading habit is forming.' },
      { day: 21, title: 'First Book Finished', description: 'Most readers finish their first book around now. The accomplishment fuels momentum.' },
      { day: 50, title: 'Halfway — 3-4 Books', description: '25 hours of reading complete. Your vocabulary and focus have measurably improved.' },
      { day: 75, title: 'Deep Reader', description: 'You can concentrate for 30 minutes without distraction. 5+ books completed.' },
      { day: 100, title: 'Challenge Complete', description: '50 hours of reading. 6–8 books. A transformed mind and a permanent habit.' },
    ],

    obstacles: [
      {
        problem: 'I keep reaching for my phone instead of a book',
        solution: 'Put your phone in another room during reading time. Place the book where the phone usually is — on the nightstand, on the couch arm, by the coffee maker.',
      },
      {
        problem: 'I fall asleep while reading',
        solution: 'Read earlier in the evening, or switch to morning reading. If reading before bed, sit upright rather than lying down. Choose more engaging material for sleepy times.',
      },
      {
        problem: 'I chose a boring book and now I\'m stuck',
        solution: 'Stop reading it. Life is too short for books you don\'t enjoy. Move to the next book on your list immediately. There\'s no shame in quitting a book.',
      },
      {
        problem: 'I can\'t focus for 30 minutes straight',
        solution: 'Start with 15 minutes and build up. Or break it into two 15-minute sessions. Your attention span will improve naturally over the first two weeks.',
      },
    ],

    tips: [
      'Read whatever genuinely interests you. Obligation kills the habit.',
      'Keep a book in your bag, by your bed, and in your living room. Accessibility is everything.',
      'Replace one daily scroll session with reading. Same downtime, infinitely more valuable.',
      'Don\'t force yourself to finish books you hate. Move on and find something that pulls you in.',
      'Track what you read in a simple list. Watching it grow is motivating.',
      'Try audiobooks for commuting or exercising if you struggle to find sit-down reading time.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You read fewer than 3 books last year.',
        recommendation: 'Start with short, engaging books (200–250 pages). Fiction is often easier to sustain than non-fiction. Build the habit first, challenge yourself later.',
        dailyTarget: '15–20 pages or 30 minutes',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You read occasionally but not daily.',
        recommendation: 'Choose a mix of page-turners and more challenging reads. Focus on the daily 30-minute commitment rather than page count.',
        dailyTarget: '25–30 pages or 30 minutes',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You read regularly and want an unbroken 100-day streak.',
        recommendation: 'Push into challenging material: longer books, harder genres, primary sources. The 100-day streak adds structure to an existing habit.',
        dailyTarget: '30+ pages or 30 minutes',
      },
    ],

    faq: [
      {
        question: 'Do audiobooks count?',
        answer: 'Yes. Audiobooks are reading. They engage different cognitive pathways but deliver the same knowledge and storytelling. Use them for commuting, walking, or exercising.',
      },
      {
        question: 'What if I\'m a slow reader?',
        answer: 'Speed doesn\'t matter. 30 minutes of slow, focused reading is more valuable than 30 minutes of rushed skimming. Your speed will naturally improve with daily practice.',
      },
      {
        question: 'Fiction or non-fiction — which is better?',
        answer: 'Both have benefits. Fiction builds empathy and vocabulary. Non-fiction builds knowledge and analytical thinking. Alternate between them for the best results.',
      },
      {
        question: 'How do I choose what to read?',
        answer: 'Start with topics that genuinely interest you. Ask friends for recommendations. Browse "best of" lists in genres you enjoy. The best book is the one you\'ll actually read.',
      },
      {
        question: 'Can I read articles or blog posts instead of books?',
        answer: 'Books are preferable because they build deep reading skills and sustained focus. But long-form articles (3,000+ words) are acceptable if that\'s what keeps you reading daily.',
      },
    ],

    relatedHabits: ['read-30-minutes', 'no-phone-before-bed', 'write-500-words'],
    relatedChallenges: ['100-day-writing-challenge', '100-day-deep-work-challenge', '100-day-coding-challenge'],
    relatedArticles: [{ pillar: '100-day-challenges', slug: '100-day-reading-challenge-guide' }],
  },

  {
    slug: '100-day-coding-challenge',
    name: '100 Day Coding Challenge',
    emoji: '💻',
    tagline: 'Code every day for 100 days and build real skills',
    metaDescription:
      'Join the 100 Day Coding Challenge. Code for 1 hour daily with a progressive plan, project ideas, milestones, and tips for beginners to experienced developers.',
    difficulty: 'Moderate',
    dailyTime: '60 minutes',
    color: '#059669',
    category: 'learning',

    introduction:
      'The #100DaysOfCode movement has helped thousands of developers build skills, launch projects, and change careers. The premise is simple: code for at least one hour every day for 100 days. That\'s 100 hours of deliberate practice — enough to go from complete beginner to competent, or from competent to genuinely skilled.\n\nThis challenge isn\'t about watching tutorials. It\'s about writing code. Building things. Breaking things. Debugging things. The keyboard is your classroom, and every error message is a lesson.\n\nBy day 100, you\'ll have a portfolio of projects, a GitHub contribution history that speaks for itself, and the quiet confidence that comes from 100 hours of practice.',

    bestFor: [
      'Complete beginners learning their first programming language',
      'Self-taught developers who want structured daily practice',
      'Career changers building a portfolio for tech jobs',
      'Experienced developers learning a new language or framework',
    ],

    requirements: [
      'A computer with internet access',
      'A code editor (VS Code is free and excellent)',
      'A GitHub account for version control and portfolio',
      'A learning resource (freeCodeCamp, The Odin Project, or similar)',
    ],

    phases: [
      {
        name: 'Foundation',
        days: '1–14',
        dailyTarget: '1 hour of tutorials + exercises',
        description:
          'Learn the basics of your chosen language: variables, data types, loops, functions, conditionals. Follow a structured course and complete every exercise.',
        tip: 'Type every example by hand instead of copy-pasting. Muscle memory matters in programming.',
      },
      {
        name: 'Building Projects',
        days: '15–35',
        dailyTarget: '1 hour building small projects',
        description:
          'Start building: a calculator, a to-do app, a weather widget. Small projects solidify what you\'ve learned and build your portfolio. Tutorials teach; projects embed.',
        tip: 'Start each session by reviewing yesterday\'s code. The 5-minute warm-up saves time on context switching.',
      },
      {
        name: 'Problem Solving',
        days: '36–60',
        dailyTarget: '1 hour mixing projects and challenges',
        description:
          'Alternate between project work and coding challenges (LeetCode, Codewars, Exercism). Problem-solving builds algorithmic thinking that transfers across all programming.',
        tip: 'When you\'re stuck, rubber-duck debug: explain the problem out loud, step by step. The solution often reveals itself.',
      },
      {
        name: 'Intermediate Projects',
        days: '61–85',
        dailyTarget: '1 hour on a larger project',
        description:
          'Take on a project that challenges you: a full-stack web app, a CLI tool, an API integration. Working on larger codebases teaches architecture, debugging, and code organization.',
        tip: 'Push to GitHub daily. The green contribution graph is motivating and demonstrates consistency to potential employers.',
      },
      {
        name: 'Portfolio & Mastery',
        days: '86–100',
        dailyTarget: '1 hour polishing and shipping',
        description:
          'Polish your best projects: clean code, add READMEs, deploy to production. Ship something real. A deployed project is worth more than ten unfinished ones.',
        tip: 'Write a blog post about what you learned during the 100 days. Teaching others is the deepest form of learning.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: '7 hours of coding. Syntax is becoming familiar. Your first small programs work.' },
      { day: 21, title: 'First Project Complete', description: 'You\'ve built something from scratch. It\'s small but it\'s yours. The confidence boost is real.' },
      { day: 50, title: 'Halfway — 50 Hours', description: 'You can debug independently, read documentation, and build functional projects. Real skill is emerging.' },
      { day: 75, title: 'Developer Mindset', description: 'You think in code. Problems are puzzles, not walls. You have a portfolio taking shape.' },
      { day: 100, title: 'Challenge Complete', description: '100 hours of coding. Multiple projects. A GitHub history that demonstrates commitment and skill.' },
    ],

    obstacles: [
      {
        problem: 'Tutorial hell — watching tutorials without building anything',
        solution: 'Limit tutorials to 30 minutes per session, then spend 30 minutes coding without guidance. The struggle is where learning happens.',
      },
      {
        problem: 'Getting stuck on a bug for hours',
        solution: 'Set a 30-minute timer on any single bug. If you can\'t solve it, ask Stack Overflow, a community, or an AI assistant. Then come back and understand the solution.',
      },
      {
        problem: 'Impostor syndrome — feeling like I\'m not a "real" programmer',
        solution: 'If you write code, you\'re a programmer. Period. Everyone started where you are. Compare yourself to day 1, not to experienced developers.',
      },
      {
        problem: 'Missing a day and losing momentum',
        solution: 'Don\'t restart the count. Just resume tomorrow. The goal is 100 completed days, not 100 consecutive days. Momentum returns quickly.',
      },
    ],

    tips: [
      'Build projects you actually care about. Interest drives persistence.',
      'Push code to GitHub every day. The contribution graph is public accountability.',
      'Join the #100DaysOfCode community on Twitter/X for support and accountability.',
      'Read other people\'s code on GitHub. You\'ll learn patterns and approaches you\'d never discover alone.',
      'When stuck, take a 10-minute walk. Solutions often arrive when you stop staring at the screen.',
      'Learn to read error messages carefully. They usually tell you exactly what\'s wrong.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You\'ve never written code or have minimal experience.',
        recommendation: 'Follow a structured course (freeCodeCamp, The Odin Project). Focus on one language (JavaScript or Python). Build small projects from week 3 onward.',
        dailyTarget: '1 hour: 30 min learning, 30 min coding',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You know a language but haven\'t built significant projects.',
        recommendation: 'Spend most of your hour building projects rather than tutorials. Push to GitHub daily. Focus on completing and shipping.',
        dailyTarget: '1 hour: 15 min review, 45 min building',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You\'re a working developer learning new skills.',
        recommendation: 'Learn a new language, framework, or paradigm. Build a non-trivial project that stretches your abilities. The 100-day streak ensures consistent learning.',
        dailyTarget: '1 hour of deliberate practice in new territory',
      },
    ],

    faq: [
      {
        question: 'What programming language should I start with?',
        answer: 'JavaScript or Python. Both are beginner-friendly, versatile, and in high demand. JavaScript is best if you want to build web apps. Python is best for data science, automation, or general-purpose programming.',
      },
      {
        question: 'Does reading about code count, or only writing code?',
        answer: 'Writing code should be the majority of your hour. Reading documentation or tutorials is fine as preparation, but the goal is fingers-on-keyboard coding time.',
      },
      {
        question: 'Can I get a job after 100 days of coding?',
        answer: 'It\'s possible but depends on your starting level, what you build, and the job market. 100 hours is enough to build a portfolio and demonstrate commitment, which matters to employers.',
      },
      {
        question: 'What should I build?',
        answer: 'Start small (calculator, to-do app, quiz game) and progress to larger projects (weather app with API, blog platform, e-commerce site). Build things you\'d actually use.',
      },
    ],

    relatedHabits: ['code-for-1-hour', 'deep-work-block', 'plan-tomorrow-tonight'],
    relatedChallenges: ['100-day-reading-challenge', '100-day-deep-work-challenge', '100-day-writing-challenge'],
    relatedArticles: [{ pillar: '100-day-challenges', slug: '100-day-coding-challenge-guide' }],
  },

  {
    slug: '100-day-writing-challenge',
    name: '100 Day Writing Challenge',
    emoji: '✍️',
    tagline: 'Write 500 words daily and produce a body of work',
    metaDescription:
      'Join the 100 Day Writing Challenge. Write 500 words daily with progressive phases, prompts, and tips to produce 50,000 words in 100 days.',
    difficulty: 'Moderate',
    dailyTime: '30 minutes',
    color: '#D97706',
    category: 'learning',

    introduction:
      'Writing 500 words a day is about two pages — roughly 20 minutes of focused writing and 10 minutes of light editing. It sounds modest. But 500 words a day for 100 days produces 50,000 words. That\'s the length of The Great Gatsby, a substantial blog archive, or a professional knowledge base.\n\nMore importantly, daily writing sharpens your thinking. As you struggle to articulate ideas clearly, you understand them more deeply. Writing is not recording thought — it IS thought, made visible.\n\nThe 100 Day Writing Challenge doesn\'t care what you write. Blog posts, fiction, essays, technical documentation, journal entries, letters — all of it counts. The only rule is 500 words, every day, for 100 days.',

    bestFor: [
      'Aspiring writers who want to build a daily writing habit',
      'Content creators building a blog or newsletter archive',
      'Professionals who want to communicate more clearly',
      'Anyone who believes they have a book in them',
    ],

    requirements: [
      'A writing tool (notebook, word processor, plain text editor)',
      'A distraction-free writing environment',
      'A word counter (most apps have one built in)',
      'A list of ideas or prompts to prevent blank-page paralysis',
    ],

    phases: [
      {
        name: 'Just Ship Words',
        days: '1–14',
        dailyTarget: '500 words, any quality',
        description:
          'Write 500 words every day without worrying about quality. The inner editor is the enemy of daily output. Write fast, write rough, write ugly. Just write.',
        tip: 'Start with the sentence "The thing I want to say is..." and let the rest follow.',
      },
      {
        name: 'Finding Your Voice',
        days: '15–35',
        dailyTarget: '500 words, experimenting with styles',
        description:
          'Try different formats: personal essay, how-to guide, fiction scene, opinion piece, letter. Discover what kind of writing energizes you.',
        tip: 'Keep a running list of ideas. When you sit down to write, scan the list instead of starting from nothing.',
      },
      {
        name: 'Craft Development',
        days: '36–60',
        dailyTarget: '500 words with deliberate technique',
        description:
          'Start paying attention to craft: sentence structure, word choice, pacing, transitions. Write first, then spend 5 minutes improving one aspect of your draft.',
        tip: 'Read your writing aloud. Your ear catches awkwardness that your eyes miss.',
      },
      {
        name: 'Publishing & Sharing',
        days: '61–85',
        dailyTarget: '500 words, some published',
        description:
          'Start sharing select pieces: blog posts, social media, or a newsletter. Writing for an audience adds accountability and forces you to polish your work.',
        tip: 'Not everything needs to be published. Write freely in the morning; choose what to share in the evening.',
      },
      {
        name: 'Writer Identity',
        days: '86–100',
        dailyTarget: '500+ words, your style',
        description:
          'You\'re a writer. 50,000 words prove it. Your voice is distinctive, your process is established, and the daily habit is permanent.',
        tip: 'Count your total words on day 100. The number represents a body of work most people never produce.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: '3,500 words written. The blank page is less intimidating.' },
      { day: 21, title: '10,000 Words', description: 'More words than most college essays. Your voice is developing.' },
      { day: 50, title: 'Halfway — 25,000 Words', description: 'A novella\'s worth of writing. Your craft has measurably improved.' },
      { day: 75, title: 'Writer Identity', description: 'Writing is how you think. 37,500 words and counting.' },
      { day: 100, title: 'Challenge Complete', description: '50,000 words. A novel\'s worth of writing. You are a writer.' },
    ],

    obstacles: [
      {
        problem: 'I don\'t know what to write about',
        solution: 'Maintain a running idea list. When stuck, use prompts: "What I learned this week," "A problem I\'m solving," "An opinion I hold that most people disagree with."',
      },
      {
        problem: 'Perfectionism — I can\'t stop editing before I finish',
        solution: 'Write first, edit later. Separate creation from revision. Your first draft\'s only job is to exist. Quality comes in revision.',
      },
      {
        problem: 'I don\'t have 30 minutes of uninterrupted time',
        solution: 'Write in two 15-minute blocks, or write first thing in the morning before the day begins. 500 words at average typing speed is about 10 minutes of pure typing.',
      },
    ],

    tips: [
      'Write first, edit later. Perfectionism kills daily output.',
      'Use a distraction-free writing tool. Even a plain text file works.',
      'Set a timer for 25 minutes and write without stopping. Most people hit 500 words in under 20.',
      'Read widely. Good writers are always voracious readers.',
      'Keep a running list of ideas so you never face a blank page cold.',
      'Write at the same time every day. Morning writing catches the mind before the world intrudes.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You don\'t write regularly and the idea of daily writing feels daunting.',
        recommendation: 'Start with 250 words if 500 feels overwhelming. Build to 500 by week 2. Use prompts and freewriting to overcome the blank page.',
        dailyTarget: '250–500 words, any format',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You write occasionally but lack daily consistency.',
        recommendation: 'Commit to 500 words minimum from day one. Focus on building the streak. Quality will naturally improve with volume.',
        dailyTarget: '500 words, experimenting with formats',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You write regularly and want to push to daily output.',
        recommendation: 'Aim for 500+ words with attention to craft. Use the challenge to work on a specific project: a book, a blog series, or a newsletter.',
        dailyTarget: '500+ words with deliberate craft',
      },
    ],

    faq: [
      {
        question: 'Does journaling count toward the 500 words?',
        answer: 'Yes, if you write it with intention. Freewriting, reflective journaling, and morning pages all count. The goal is daily writing practice, regardless of format.',
      },
      {
        question: 'Should I write fiction or non-fiction?',
        answer: 'Whichever excites you more. Fiction builds storytelling and empathy. Non-fiction builds analytical thinking and authority. Many writers do both.',
      },
      {
        question: 'What if I write more than 500 words some days?',
        answer: 'Great. 500 is the minimum, not the ceiling. Some days you\'ll write 200 words and struggle; other days you\'ll write 2,000 in flow. Both count.',
      },
      {
        question: 'How do I improve my writing quality?',
        answer: 'Read widely, write daily, and revise selected pieces. Quality comes from volume. You can\'t edit a blank page, but you can always improve a rough draft.',
      },
    ],

    relatedHabits: ['write-500-words', 'daily-journaling', 'read-30-minutes'],
    relatedChallenges: ['100-day-reading-challenge', '100-day-journaling-challenge', '100-day-coding-challenge'],
    relatedArticles: [{ pillar: '100-day-challenges', slug: '100-day-writing-challenge-guide' }],
  },

  {
    slug: '100-day-drawing-challenge',
    name: '100 Day Drawing Challenge',
    emoji: '🎨',
    tagline: 'Draw something every day and watch your skills transform',
    metaDescription:
      'Join the 100 Day Drawing Challenge. Draw daily with progressive phases from basic shapes to personal style. Tips, prompts, and milestones for every skill level.',
    difficulty: 'Moderate',
    dailyTime: '20–30 minutes',
    color: '#C026D3',
    category: 'learning',

    introduction:
      'Drawing is not a talent — it\'s a skill. Like writing or cooking, it improves with daily practice. The myth of artistic talent keeps people from picking up a pencil, but research on skill acquisition shows that consistent daily practice produces dramatic improvement regardless of starting ability.\n\nThe 100 Day Drawing Challenge asks you to draw something every day for 20–30 minutes. Anything counts: a sketch, a doodle, a study, a portrait, a comic panel, a pattern. The medium doesn\'t matter. The daily practice does.\n\nBy day 100, your day-1 drawing will look like it was done by a different person. That\'s not an exaggeration — 50+ hours of deliberate practice fundamentally changes how your eyes see and your hands respond.',

    bestFor: [
      'People who say "I can\'t draw" and want to prove themselves wrong',
      'Hobbyist artists who want daily discipline',
      'Designers, illustrators, or creatives who want to sharpen their skills',
      'Anyone looking for a screen-free creative outlet',
    ],

    requirements: [
      'A sketchbook or drawing pad',
      'Pencils (a basic set of HB, 2B, and 4B is enough to start)',
      'An eraser and sharpener',
      'Optional: a tablet for digital drawing',
    ],

    phases: [
      {
        name: 'Lines & Shapes',
        days: '1–14',
        dailyTarget: '20 minutes of basic exercises',
        description:
          'Draw basic shapes: circles, squares, lines, curves. Practice contour drawing (drawing objects without lifting your pencil). Train your hand-eye coordination.',
        tip: 'Draw from life, not from imagination. Place an object in front of you and draw what you see, not what you think it looks like.',
      },
      {
        name: 'Observation Drawing',
        days: '15–35',
        dailyTarget: '20–30 minutes drawing objects and scenes',
        description:
          'Draw everyday objects: a mug, a shoe, a plant, your hand. Focus on seeing proportions, shadows, and negative space. Observation is the core skill.',
        tip: 'Squint at your subject. Squinting simplifies the values (light and dark) and helps you see the big shapes.',
      },
      {
        name: 'Light & Shadow',
        days: '36–60',
        dailyTarget: '30 minutes with shading techniques',
        description:
          'Learn to shade: hatching, cross-hatching, and blending. Understanding light and shadow makes drawings three-dimensional and realistic.',
        tip: 'Set up a simple desk lamp next to an object. The single light source creates clear shadows that are easier to draw.',
      },
      {
        name: 'Complex Subjects',
        days: '61–85',
        dailyTarget: '30 minutes, portraits, landscapes, or compositions',
        description:
          'Take on more ambitious subjects: faces, figures, landscapes, or compositions with multiple objects. Apply everything you\'ve learned about shape, proportion, and value.',
        tip: 'Draw the same subject multiple times on different days. Each attempt will be better than the last.',
      },
      {
        name: 'Personal Style',
        days: '86–100',
        dailyTarget: '20–30 minutes in your preferred style',
        description:
          'You\'ve developed enough skill to have preferences. Draw what you love in the style that feels natural. Your unique artistic voice is emerging.',
        tip: 'Compare your day-1 drawing to your day-100 drawing. The growth will be undeniable.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'Seven drawings completed. Your hand-eye coordination is already improving.' },
      { day: 21, title: 'Seeing Differently', description: 'You\'re starting to see the world in shapes, proportions, and shadows. Drawing is changing how you observe.' },
      { day: 50, title: 'Halfway — Visible Growth', description: 'Your day-50 drawing is dramatically better than day 1. Over 15 hours of practice completed.' },
      { day: 75, title: 'Confident Artist', description: 'You can draw recognizable objects and scenes. Drawing is becoming a joy, not a struggle.' },
      { day: 100, title: 'Challenge Complete', description: '100 drawings. A complete visual journal of growth. Skills that will stay with you for life.' },
    ],

    obstacles: [
      {
        problem: 'I don\'t know what to draw today',
        solution: 'Use drawing prompts: Inktober lists, random object generators, or simply draw the first object you see. Choosing what to draw shouldn\'t take longer than drawing it.',
      },
      {
        problem: 'My drawings look terrible and I feel discouraged',
        solution: 'Every drawing is better than no drawing. Ugly drawings are part of the process. Compare to your own earlier work, not to professionals who have 10,000+ hours of practice.',
      },
      {
        problem: 'I can\'t draw people or faces',
        solution: 'Start with simple proportions: the head is an oval, eyes are at the halfway point, nose is halfway between eyes and chin. Basic guidelines make faces much easier.',
      },
    ],

    tips: [
      'Draw from life, not from imagination or photos. Real objects teach you to see.',
      'Carry a small sketchbook everywhere. Fill idle moments with quick sketches.',
      'Don\'t erase constantly. Imperfect lines add character and teach you to commit.',
      'Study one fundamental per week: proportion, perspective, value, composition.',
      'Share your drawings if it motivates you; keep them private if sharing creates pressure.',
      'On low-energy days, doodle patterns or practice lines. Showing up is the only rule.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You haven\'t drawn since childhood.',
        recommendation: 'Start with basic exercises: draw circles, straight lines, and simple objects. Focus on observation over technique. Any mark on paper counts.',
        dailyTarget: '20 minutes of basic shapes and contour drawing',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You can draw recognizable objects but lack daily practice.',
        recommendation: 'Draw from life daily with attention to proportion and value. Study one technique per week (shading, perspective, composition).',
        dailyTarget: '20–30 minutes of observational drawing',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You draw competently and want to build a daily habit.',
        recommendation: 'Tackle challenging subjects: figures, portraits, complex scenes. Focus on areas of weakness. The 100-day streak builds mastery.',
        dailyTarget: '30 minutes of deliberate practice',
      },
    ],

    faq: [
      {
        question: 'Do digital drawings count?',
        answer: 'Yes. Digital and traditional drawing both develop observation, hand-eye coordination, and artistic skills. Use whichever medium keeps you drawing daily.',
      },
      {
        question: 'What if I truly have no artistic ability?',
        answer: 'Drawing is a skill, not a genetic trait. Research shows that anyone can learn to draw with practice. Your day-30 drawings will prove it to yourself.',
      },
      {
        question: 'Do quick doodles count, or does it need to be a "real" drawing?',
        answer: 'Doodles count. Quick sketches count. A single line on paper counts on a bad day. The habit of daily mark-making is what builds the skill.',
      },
      {
        question: 'What materials should I buy?',
        answer: 'A sketchbook and a set of pencils (HB, 2B, 4B). That\'s it. You don\'t need expensive supplies. Skill development happens with basic tools.',
      },
    ],

    relatedHabits: ['creative-hobby-time', 'daily-journaling', 'deep-work-block'],
    relatedChallenges: ['100-day-writing-challenge', '100-day-reading-challenge', '100-day-coding-challenge'],
    relatedArticles: [{ pillar: '100-day-challenges', slug: 'designing-your-own-challenge' }],
  },

  {
    slug: '100-day-deep-work-challenge',
    name: '100 Day Deep Work Challenge',
    emoji: '🎯',
    tagline: 'Protect 90 minutes of focused work every day and transform your output',
    metaDescription:
      'Join the 100 Day Deep Work Challenge. Protect a daily 90-minute deep work block with progressive strategies, milestones, and tips for eliminating distractions.',
    difficulty: 'Hard',
    dailyTime: '90 minutes',
    color: '#0284C7',
    category: 'learning',

    introduction:
      'Cal Newport\'s research is clear: knowledge workers who protect deep work time produce dramatically more valuable output than those who spend their days in shallow tasks, emails, and meetings. Yet most professionals never experience a single uninterrupted 90-minute block in a typical workday.\n\nThe 100 Day Deep Work Challenge asks you to protect one 90-minute block of completely focused, uninterrupted work every day. No notifications, no email, no Slack, no meetings. Just you and your most important task.\n\n150 hours of deep work over 100 days is a career-changing amount of focused output. Whether you\'re writing, coding, designing, researching, or creating — deep work is where your best work happens.',

    bestFor: [
      'Knowledge workers drowning in shallow tasks and meetings',
      'Entrepreneurs and creators who need to produce high-quality output',
      'Students working on research, thesis, or demanding coursework',
      'Anyone who feels busy but unproductive',
    ],

    requirements: [
      'A workspace where you can close a door or use headphones',
      'Website blockers (Cold Turkey, Freedom, or Focus) for your devices',
      'A clear task list — you need to know what to work on before the block starts',
      'A physical timer or a simple timer app',
    ],

    phases: [
      {
        name: 'Building the Block',
        days: '1–14',
        dailyTarget: '60 minutes of focused work',
        description:
          'Start with 60 minutes if 90 feels too long. Close all notifications, set a timer, and work on your most important task. When the timer rings, the block is done.',
        tip: 'Schedule your deep work block at the same time every day. Treat it like a meeting you cannot cancel.',
      },
      {
        name: 'Extending Duration',
        days: '15–35',
        dailyTarget: '75–90 minutes',
        description:
          'Build to 90 minutes. The first 20 minutes are always the hardest as your brain resists focus. Push through the discomfort — depth comes after minute 30.',
        tip: 'Start with your hardest, most important task. Not email, not easy wins. The thing that matters most.',
      },
      {
        name: 'Deep Focus',
        days: '36–60',
        dailyTarget: '90 minutes with no exceptions',
        description:
          'The block is non-negotiable. Your colleagues know you\'re unreachable. Your phone is in another room. The website blocker is running. This is where mastery lives.',
        tip: 'Track what you accomplish in each block. Seeing the output builds motivation to protect the time.',
      },
      {
        name: 'Flow States',
        days: '61–85',
        dailyTarget: '90 minutes, frequently achieving flow',
        description:
          'You\'re entering flow states regularly — that timeless absorption where work feels effortless and output is exceptional. Protect this sacred time fiercely.',
        tip: 'If you\'re in flow and the timer rings, keep going if your schedule allows. Flow is precious.',
      },
      {
        name: 'Deep Work Identity',
        days: '86–100',
        dailyTarget: '90 minutes, integrated into your workday',
        description:
          'Deep work is your competitive advantage. 150 hours of focused output separates you from everyone who spent those hours in meetings. The habit is permanent.',
        tip: 'Consider adding a second deep work block. Two 90-minute blocks per day is elite-level output.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'Seven deep work blocks completed. You\'re discovering your optimal focus conditions.' },
      { day: 21, title: 'Entering Focus Faster', description: 'The startup cost is decreasing. You can settle into focus within 5–10 minutes.' },
      { day: 50, title: 'Halfway — 75 Hours', description: '75 hours of deep work. Your output this month is dramatically higher than typical months.' },
      { day: 75, title: 'Flow Master', description: '90 minutes of focus is your default mode. You can concentrate without wandering.' },
      { day: 100, title: 'Challenge Complete', description: '150 hours of deep work. Career-changing output. A skill that most professionals never develop.' },
    ],

    obstacles: [
      {
        problem: 'Colleagues interrupt during deep work blocks',
        solution: 'Communicate boundaries: "I\'m unavailable from 9:00–10:30." Use a physical signal: headphones on, door closed, or a desk sign. Most interruptions can wait 90 minutes.',
      },
      {
        problem: 'I check my phone or email reflexively',
        solution: 'Put your phone in another room. Use a website blocker on your computer. The first two weeks of breaking the habit are the hardest.',
      },
      {
        problem: 'I don\'t know what to work on during the block',
        solution: 'Decide the night before. Write down your deep work task as part of your evening planning. Indecision at the start of the block wastes focus.',
      },
      {
        problem: 'My job requires constant availability (Slack, email)',
        solution: 'Most jobs don\'t actually require instant responses. Try a 60-minute block and see if anyone notices your 60-minute silence. They usually don\'t.',
      },
    ],

    tips: [
      'Schedule deep work during your peak energy hours. For most people, this is morning.',
      'Turn off ALL notifications during the block. Not just mute — off.',
      'Start with your hardest task. Easy tasks expand to fill the time; hard tasks need the focus.',
      'Use a physical timer rather than a phone timer to avoid screen temptation.',
      'Track your deep work hours weekly. Seeing the number grow is motivating.',
      'End each block by writing a brief note about what you accomplished and what to start tomorrow.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You rarely get 30 minutes of uninterrupted work.',
        recommendation: 'Start with 45–60 minute blocks. Use website blockers and phone separation from day one. Build to 90 minutes by week 3.',
        dailyTarget: '45–60 minutes, building to 90',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You can focus for an hour but not consistently every day.',
        recommendation: 'Start at 75–90 minutes. Focus on making it daily and non-negotiable. The challenge is consistency, not duration.',
        dailyTarget: '75–90 minutes daily',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You practice deep work but want a 100-day streak.',
        recommendation: 'Lock in 90 minutes daily and consider adding a second block. Use the challenge to reach flow states consistently.',
        dailyTarget: '90 minutes, aiming for flow',
      },
    ],

    faq: [
      {
        question: 'Does deep work have to be 90 minutes?',
        answer: 'No, but research suggests 90 minutes matches the brain\'s natural focus cycle (ultradian rhythm). Start with 60 minutes if needed and build up.',
      },
      {
        question: 'What counts as "deep work"?',
        answer: 'Any cognitively demanding task that requires focused attention: writing, coding, designing, analyzing, researching, creating. Not email, not meetings, not administrative tasks.',
      },
      {
        question: 'Can I do deep work at home or does it require an office?',
        answer: 'Both work. What matters is minimal interruptions and no digital distractions. Some people find home better (no colleagues); others need the structure of an office.',
      },
      {
        question: 'What if my boss expects immediate responses to messages?',
        answer: 'Have a conversation about it. Explain that 90 minutes of uninterrupted focus produces better work output. Most managers support it when framed as productivity, not avoidance.',
      },
    ],

    relatedHabits: ['deep-work-block', 'plan-tomorrow-tonight', 'code-for-1-hour'],
    relatedChallenges: ['100-day-coding-challenge', '100-day-writing-challenge', '100-day-reading-challenge'],
    relatedArticles: [{ pillar: 'productivity', slug: 'deep-work-beginners-guide' }],
  },
];
