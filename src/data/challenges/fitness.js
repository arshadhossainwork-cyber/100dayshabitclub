/**
 * Fitness challenge data — 5 challenges for the fitness category.
 */

export const fitnessChallenges = [
  {
    slug: '100-day-running-challenge',
    name: '100 Day Running Challenge',
    emoji: '🏃',
    tagline: 'Lace up every day for 100 days and become a runner',
    metaDescription:
      'Join the 100 Day Running Challenge. A structured 100-day plan with progressive phases, milestones, and expert tips to build a lasting running habit.',
    difficulty: 'Moderate',
    dailyTime: '20–30 minutes',
    color: '#E11D48',
    category: 'fitness',

    introduction:
      'Running is one of the most accessible forms of exercise on the planet. You need shoes, a door, and the decision to start. But starting is the easy part — showing up on day 14, day 47, and day 83 is where the real transformation happens.\n\nThe 100 Day Running Challenge gives you a progressive plan that meets you where you are. Whether you\'re a complete beginner who can\'t run for five minutes straight or a lapsed runner looking to rebuild the habit, this challenge scales to your level.\n\nBy day 100, running won\'t be something you force yourself to do. It will be part of who you are. Your cardiovascular fitness, mental resilience, and daily energy will be measurably different from day one.',

    bestFor: [
      'Beginners who want to build a running habit from scratch',
      'Lapsed runners looking to get back on track consistently',
      'People seeking a low-cost, equipment-free fitness routine',
      'Anyone who wants to improve cardiovascular health and mental clarity',
    ],

    requirements: [
      'A pair of running shoes with good support',
      'Weather-appropriate clothing',
      'A safe running route (sidewalk, park, track, or treadmill)',
      'A way to track time (phone or watch)',
    ],

    phases: [
      {
        name: 'Foundation',
        days: '1–14',
        dailyTarget: 'Walk-run intervals, 20 minutes',
        description:
          'Alternate between 2 minutes of running and 1 minute of walking. The goal is showing up consistently, not speed or distance. Your body is adapting to the impact and rhythm of running.',
        tip: 'Run slow enough to hold a conversation. If you\'re gasping, you\'re going too fast.',
      },
      {
        name: 'Building Endurance',
        days: '15–35',
        dailyTarget: '15–20 minutes of continuous running',
        description:
          'Gradually reduce walk breaks until you can run continuously for 15–20 minutes. Extend your running intervals each week while keeping the pace comfortable.',
        tip: 'Add only 1–2 minutes of continuous running per week. Patience prevents injury.',
      },
      {
        name: 'Consistency Lock-In',
        days: '36–60',
        dailyTarget: '20–25 minutes at a steady pace',
        description:
          'By now your body has adapted. This phase is about locking in the habit and building aerobic base. Run at an easy, sustainable pace every day.',
        tip: 'Pick the same time each day. Routine eliminates the daily decision of whether to run.',
      },
      {
        name: 'Progressive Challenge',
        days: '61–85',
        dailyTarget: '25–30 minutes with varied intensity',
        description:
          'Introduce variety: one day slightly faster, one day longer and slower, one day with hill repeats. This prevents plateaus and keeps the habit engaging.',
        tip: 'Listen to your body. One easy day after every two moderate days prevents burnout.',
      },
      {
        name: 'Runner Identity',
        days: '86–100',
        dailyTarget: '25–30 minutes, your preferred style',
        description:
          'You\'re a runner now. This phase is about owning the identity. Run your way — trail, treadmill, intervals, long and slow. The habit is yours.',
        tip: 'Sign up for a local 5K to celebrate your 100th day. You\'ve earned it.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'Seven consecutive days of running. Your body is starting to adapt to the daily impact.' },
      { day: 21, title: 'Habit Forming', description: 'The neural pathway is solidifying. Running feels less like a decision and more like a default.' },
      { day: 50, title: 'Halfway There', description: 'You\'ve likely noticed mood improvements, better sleep, and increased energy levels.' },
      { day: 75, title: 'Three Quarters', description: 'Running is part of your identity now. You miss it on rest days.' },
      { day: 100, title: 'Challenge Complete', description: '100 days of running. You\'ve built cardiovascular fitness, mental resilience, and a lifelong habit.' },
    ],

    obstacles: [
      {
        problem: 'Bad weather makes it hard to get outside',
        solution: 'Have a backup plan: treadmill, indoor track, or stair climbing. Don\'t let weather be the reason you break the chain.',
      },
      {
        problem: 'Shin splints or joint pain in the first weeks',
        solution: 'Slow down significantly and increase walk intervals. Run on softer surfaces like grass or trails. Replace shoes if they\'re worn out.',
      },
      {
        problem: 'Boredom during solo runs',
        solution: 'Alternate between podcasts, audiobooks, music playlists, and silent runs. Variety keeps the experience fresh.',
      },
      {
        problem: 'Energy too low after work',
        solution: 'Switch to morning runs. Lay out your clothes the night before and commit to just stepping outside — momentum usually takes over.',
      },
    ],

    tips: [
      'Start slower than you think you need to. The first month is about consistency, not speed.',
      'Hydrate well throughout the day, not just before or after runs.',
      'Track your runs with a free app like Strava or Nike Run Club to see progress over time.',
      'Invest in one pair of proper running shoes — it\'s the only equipment that matters.',
      'Rest days are not failures. If your body needs one, take it and resume tomorrow.',
      'Find a running buddy or online community for accountability on hard days.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You\'ve never run regularly or haven\'t run in over a year.',
        recommendation: 'Start with walk-run intervals: 2 minutes running, 1 minute walking, for 20 minutes total. Build up to continuous running over the first month.',
        dailyTarget: '20 minutes (walk-run intervals)',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You can run 15–20 minutes continuously but lack consistency.',
        recommendation: 'Start at 20 minutes of continuous easy running. Focus on making it daily rather than pushing pace or distance.',
        dailyTarget: '20–25 minutes continuous running',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You can run 30+ minutes but want to build an unbreakable daily habit.',
        recommendation: 'Run 25–30 minutes daily with variety: tempo days, easy days, trail days. The challenge is consistency across 100 days, not single-session performance.',
        dailyTarget: '25–30 minutes with variety',
      },
    ],

    faq: [
      {
        question: 'Do I need to run every single day for 100 days?',
        answer: 'The goal is 100 completed days. If you need a rest day for injury prevention, take it — but get back out there the next day. Aim for no more than one rest day per week.',
      },
      {
        question: 'Can I run on a treadmill instead of outdoors?',
        answer: 'Absolutely. Treadmill running counts. The habit is about daily cardiovascular exercise, not where you do it.',
      },
      {
        question: 'I\'m overweight. Is this challenge safe for me?',
        answer: 'Start with the beginner plan (walk-run intervals) and consult your doctor if you have any health concerns. Walking intervals make this accessible to most fitness levels.',
      },
      {
        question: 'What if I get injured during the challenge?',
        answer: 'Switch to a low-impact alternative (walking, swimming, cycling) until you recover. The habit of daily movement matters more than the specific exercise.',
      },
      {
        question: 'How fast should I run?',
        answer: 'At a conversational pace — slow enough that you could speak short sentences without gasping. Most beginners run too fast. Slow down.',
      },
    ],

    relatedHabits: ['run-for-20-minutes', 'morning-yoga', '30-minute-workout'],
    relatedChallenges: ['100-day-walking-challenge', '100-day-yoga-challenge', '100-day-stretching-challenge'],
    relatedArticles: [{ pillar: '100-day-challenges', slug: '100-day-fitness-challenge-guide' }],
  },

  {
    slug: '100-day-walking-challenge',
    name: '100 Day Walking Challenge',
    emoji: '🚶',
    tagline: 'Walk 10,000 steps every day and transform your health quietly',
    metaDescription:
      'Join the 100 Day Walking Challenge. A progressive plan to walk 10,000 steps daily with milestones, tips, and strategies for every fitness level.',
    difficulty: 'Easy',
    dailyTime: '30–60 minutes',
    color: '#059669',
    category: 'fitness',

    introduction:
      'Walking is the most underrated exercise in existence. It requires no equipment, no gym, no skill, and no recovery time — yet it reduces all-cause mortality, improves cardiovascular health, boosts mood, and supports weight management. The research is overwhelming.\n\nThe 100 Day Walking Challenge asks you to hit 10,000 steps every day for 100 days. That\'s roughly 4–5 miles, depending on your stride. It sounds simple, and it is — but simple doesn\'t mean easy when life gets busy.\n\nOver 100 days, you\'ll walk approximately 1,000,000 steps and 400–500 miles. That\'s the equivalent of walking from New York to Pittsburgh. Your body, mind, and energy levels will reflect every single one of those steps.',

    bestFor: [
      'People who find running or gym workouts intimidating',
      'Anyone recovering from injury who needs low-impact exercise',
      'Desk workers who sit for 8+ hours daily',
      'People who want to lose weight without intense workouts',
    ],

    requirements: [
      'Comfortable walking shoes',
      'A pedometer, fitness tracker, or smartphone with step counting',
      'Weather-appropriate clothing for outdoor walks',
    ],

    phases: [
      {
        name: 'Getting Started',
        days: '1–14',
        dailyTarget: '6,000–8,000 steps',
        description:
          'Establish a baseline and start increasing your daily step count gradually. Find walking opportunities in your existing routine: park farther away, take stairs, walk during phone calls.',
        tip: 'Track your steps for 3 days without changing anything to find your true baseline. Then add 1,000 steps per day.',
      },
      {
        name: 'Building Up',
        days: '15–35',
        dailyTarget: '8,000–10,000 steps',
        description:
          'Push toward the 10,000-step target consistently. Add a dedicated 20–30 minute walk to supplement your incidental steps.',
        tip: 'A 20-minute walk after dinner adds roughly 2,000 steps and aids digestion.',
      },
      {
        name: 'The Daily 10K',
        days: '36–60',
        dailyTarget: '10,000 steps',
        description:
          'You should be hitting 10,000 steps regularly now. Focus on maintaining consistency and finding routes or routines that make the walking enjoyable.',
        tip: 'Explore new neighborhoods, parks, or trails to keep walks interesting.',
      },
      {
        name: 'Optimize & Enjoy',
        days: '61–85',
        dailyTarget: '10,000+ steps',
        description:
          'Walking is second nature. Experiment with pace walking, hiking, walking meetings, or walking with friends. Some days you\'ll exceed 10K naturally.',
        tip: 'Try one walk per week without headphones. Notice your surroundings and let your mind wander.',
      },
      {
        name: 'Walker for Life',
        days: '86–100',
        dailyTarget: '10,000+ steps',
        description:
          'The challenge is almost over, but the habit is permanent. You\'ve rewired your daily movement patterns. Walking is how you think, decompress, and stay healthy.',
        tip: 'Calculate your total steps and miles for the full 100 days. The number will surprise you.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'You\'ve found your daily walking rhythm and identified the best times to walk.' },
      { day: 21, title: 'Habit Forming', description: 'Walking is becoming automatic. You notice when you haven\'t moved enough.' },
      { day: 50, title: 'Half a Million Steps', description: 'Approximately 500,000 steps completed. Energy and sleep quality are noticeably better.' },
      { day: 75, title: 'Three Quarters', description: 'Walking is woven into your identity. You\'ve likely lost weight, improved mood, and sleep better.' },
      { day: 100, title: 'One Million Steps', description: 'Approximately 1,000,000 steps. 400–500 miles walked. A quiet, powerful transformation.' },
    ],

    obstacles: [
      {
        problem: 'Rainy or extreme weather days',
        solution: 'Walk in a mall, use a treadmill, or walk in place while watching a show. Indoor steps count.',
      },
      {
        problem: 'Hard to reach 10,000 steps on busy work days',
        solution: 'Break it up: 3,000 steps in the morning, 3,000 at lunch, 4,000 in the evening. Small walks add up.',
      },
      {
        problem: 'Foot or knee discomfort from increased walking',
        solution: 'Invest in proper walking shoes with good arch support. Stretch your calves and ankles daily. Build up gradually.',
      },
    ],

    tips: [
      'Take phone calls while walking — it\'s the easiest way to add 2,000+ steps to your day.',
      'Park at the far end of parking lots. Take stairs instead of elevators.',
      'Walk after meals to aid digestion and stabilize blood sugar.',
      'Listen to podcasts or audiobooks to make longer walks fly by.',
      'Track your streak visually — each day of 10K steps is a win on the board.',
      'Invite a friend or family member to walk with you for accountability and social connection.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You currently average fewer than 5,000 steps per day.',
        recommendation: 'Start at 6,000 steps and add 500 per week until you reach 10,000. Don\'t rush — gradual increases prevent soreness.',
        dailyTarget: '6,000 steps, building to 10,000',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You average 6,000–8,000 steps but aren\'t consistent.',
        recommendation: 'Jump to 8,000 steps daily for the first two weeks, then push to 10,000. Focus on consistency over count.',
        dailyTarget: '8,000–10,000 steps',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You already walk regularly but want to lock in 10K every single day.',
        recommendation: 'Aim for 10,000+ steps daily from day one. Add variety: pace walks, hikes, walking meetings. The challenge is the 100-day streak.',
        dailyTarget: '10,000+ steps daily',
      },
    ],

    faq: [
      {
        question: 'Do I really need 10,000 steps? Is that number evidence-based?',
        answer: 'The 10,000 number originated from a Japanese pedometer marketing campaign, but research shows significant health benefits start at 7,000–8,000 steps. 10,000 is a good, round, aspirational target that ensures meaningful daily movement.',
      },
      {
        question: 'Can I split my walking throughout the day?',
        answer: 'Yes. Multiple short walks are just as effective as one long walk for step count and health benefits. Three 15-minute walks work as well as one 45-minute walk.',
      },
      {
        question: 'Does walking on a treadmill count?',
        answer: 'Absolutely. Steps are steps regardless of surface. Treadmill walking is a great option for bad weather or busy schedules.',
      },
      {
        question: 'Will walking really help me lose weight?',
        answer: 'Walking 10,000 steps burns roughly 300–500 extra calories per day depending on your weight and pace. Over 100 days, that\'s a meaningful caloric deficit when combined with reasonable eating.',
      },
    ],

    relatedHabits: ['run-for-20-minutes', 'spend-time-in-nature', 'morning-yoga'],
    relatedChallenges: ['100-day-running-challenge', '100-day-stretching-challenge', '100-day-morning-routine-challenge'],
    relatedArticles: [{ pillar: '100-day-challenges', slug: '100-day-fitness-challenge-guide' }],
  },

  {
    slug: '100-day-push-up-challenge',
    name: '100 Day Push-Up Challenge',
    emoji: '💪',
    tagline: 'Build upper body strength with nothing but the floor',
    metaDescription:
      'Join the 100 Day Push-Up Challenge. Progressive daily push-up plan from zero to 50+ with form guides, modifications, and milestone tracking.',
    difficulty: 'Moderate',
    dailyTime: '10–15 minutes',
    color: '#D97706',
    category: 'fitness',

    introduction:
      'The push-up is the most efficient bodyweight exercise ever invented. It works your chest, shoulders, triceps, core, and even your legs — all without a single piece of equipment. Yet most people can\'t do 20 proper push-ups in a row.\n\nThe 100 Day Push-Up Challenge takes you from wherever you are — even if that\'s zero — to consistent daily push-up sets that build real upper body strength. The progressive plan increases volume gradually so your muscles, joints, and tendons adapt safely.\n\nBy day 100, push-ups will feel effortless. You\'ll have visible upper body definition, improved posture, and the quiet confidence that comes from doing something hard every single day.',

    bestFor: [
      'People who want to build strength without a gym membership',
      'Beginners who can\'t yet do a full push-up',
      'Athletes looking to supplement their training with daily bodyweight work',
      'Anyone who wants a fast, equipment-free daily workout',
    ],

    requirements: [
      'A flat surface (floor, exercise mat)',
      'Comfortable clothing that allows full range of motion',
      'Optionally, a wall or elevated surface for modified push-ups',
    ],

    phases: [
      {
        name: 'Foundation',
        days: '1–14',
        dailyTarget: '20–30 push-ups in sets',
        description:
          'Focus entirely on form. Break your daily target into small sets (e.g., 5 sets of 5). Use wall push-ups or knee push-ups if needed. Quality over quantity.',
        tip: 'Film yourself from the side to check form. Your body should be a straight line from head to heels.',
      },
      {
        name: 'Volume Building',
        days: '15–35',
        dailyTarget: '40–60 push-ups in sets',
        description:
          'Increase daily volume by adding reps to each set. If you started on your knees, begin transitioning to full push-ups for at least one set per day.',
        tip: 'Do push-ups at multiple times throughout the day. Morning, lunch, and evening sets make the volume manageable.',
      },
      {
        name: 'Strength Phase',
        days: '36–60',
        dailyTarget: '60–80 push-ups in sets',
        description:
          'You\'re getting strong. Introduce tempo push-ups (3 seconds down, 1 second up) one day per week to build deeper strength.',
        tip: 'Vary your hand width: wide one day, narrow the next. Different grips target different muscles.',
      },
      {
        name: 'Advanced Variations',
        days: '61–85',
        dailyTarget: '80–100 push-ups in sets',
        description:
          'Add diamond push-ups, decline push-ups, or archer push-ups into your routine. Keep total volume high but mix in challenging variations.',
        tip: 'If your wrists hurt, use push-up handles or fists to keep wrists neutral.',
      },
      {
        name: 'Push-Up Mastery',
        days: '86–100',
        dailyTarget: '100+ push-ups in your preferred style',
        description:
          'Test your max set. Many people who started at 5 can now do 30–50 unbroken. You own this movement. The daily habit is permanent.',
        tip: 'Test your max unbroken set on day 100. Compare it to day 1. The improvement will be dramatic.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'Your muscles are sore but adapting. Push-up form is improving with each session.' },
      { day: 21, title: 'Strength Emerging', description: 'Soreness has faded. You can feel your chest and arms getting stronger.' },
      { day: 50, title: 'Halfway Mark', description: 'Approximately 3,000 push-ups completed. Visible changes in upper body tone and posture.' },
      { day: 75, title: 'Advanced Territory', description: 'You\'re doing variations that seemed impossible on day one. Push-ups feel natural.' },
      { day: 100, title: 'Challenge Complete', description: 'Thousands of push-ups done. Upper body strength, posture, and discipline permanently improved.' },
    ],

    obstacles: [
      {
        problem: 'Can\'t do a single full push-up',
        solution: 'Start with wall push-ups, then progress to incline push-ups (hands on a bench), then knee push-ups, then full push-ups. Every modification builds toward the real thing.',
      },
      {
        problem: 'Wrist pain during push-ups',
        solution: 'Use push-up handles or make fists to keep wrists straight. Warm up wrists with circles before each set. If pain persists, see a doctor.',
      },
      {
        problem: 'Getting bored with the same exercise daily',
        solution: 'Rotate through variations: wide grip, close grip, decline, diamond, staggered, pike. There are dozens of push-up styles to keep things interesting.',
      },
    ],

    tips: [
      'Perfect form matters more than high numbers. A bad push-up builds bad patterns.',
      'Breathe: inhale on the way down, exhale on the way up.',
      'Spread your push-ups throughout the day rather than grinding them all at once.',
      'Do push-ups at the same trigger daily: after brushing teeth, before meals, during work breaks.',
      'Track your max unbroken set weekly to see strength gains.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You can do 0–10 push-ups with proper form.',
        recommendation: 'Start with 20 total push-ups in 4–5 sets using modifications as needed. Add 5 total push-ups per week.',
        dailyTarget: '20 push-ups in small sets',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You can do 10–25 push-ups in a row.',
        recommendation: 'Start with 50 total push-ups in 3–4 sets. Focus on increasing your max unbroken set each week.',
        dailyTarget: '50 push-ups in 3–4 sets',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You can do 25+ push-ups in a row.',
        recommendation: 'Start at 80+ total daily push-ups with advanced variations. The challenge is consistency over 100 days.',
        dailyTarget: '80+ push-ups with variations',
      },
    ],

    faq: [
      {
        question: 'Will push-ups alone build a good upper body?',
        answer: 'Push-ups effectively build chest, shoulders, triceps, and core. For a complete upper body, you\'d also want to add pulling exercises (rows, pull-ups). But 100 days of push-ups will produce significant visible results.',
      },
      {
        question: 'Should I do push-ups every day or take rest days?',
        answer: 'Daily push-ups are fine because bodyweight exercises recover faster than heavy weightlifting. If you feel joint pain (not muscle soreness), take a day off and do an easier variation the next day.',
      },
      {
        question: 'What if I can only do knee push-ups?',
        answer: 'Knee push-ups are a legitimate exercise. Do them daily and you\'ll build enough strength to transition to full push-ups within 3–4 weeks.',
      },
      {
        question: 'When will I see visible results?',
        answer: 'Most people notice improved muscle tone in the chest and arms by days 30–40, especially if body fat is moderate. Strength gains are noticeable even sooner.',
      },
    ],

    relatedHabits: ['30-minute-workout', 'morning-yoga', 'run-for-20-minutes'],
    relatedChallenges: ['100-day-yoga-challenge', '100-day-stretching-challenge', '100-day-running-challenge'],
    relatedArticles: [{ pillar: '100-day-challenges', slug: '100-day-fitness-challenge-guide' }],
  },

  {
    slug: '100-day-yoga-challenge',
    name: '100 Day Yoga Challenge',
    emoji: '🧘',
    tagline: 'Find flexibility, strength, and calm — one practice at a time',
    metaDescription:
      'Join the 100 Day Yoga Challenge. A progressive daily yoga plan from beginner to experienced with pose guides, milestones, and mindfulness tips.',
    difficulty: 'Easy',
    dailyTime: '15–30 minutes',
    color: '#0D9488',
    category: 'fitness',

    introduction:
      'Yoga is not about touching your toes. It\'s about what you learn on the way down. A daily yoga practice builds flexibility, strength, balance, and body awareness — qualities that protect you from injury, reduce chronic pain, and create a calm, centered start to every day.\n\nThe 100 Day Yoga Challenge gives you a structured progression from basic poses and sun salutations to a full personal practice. You don\'t need flexibility, experience, or equipment beyond a mat. You just need 15–30 minutes and the willingness to show up.\n\nBy day 100, your body will move differently. Stiffness that you accepted as normal will be gone. You\'ll stand taller, breathe deeper, and carry less tension in your shoulders, neck, and back.',

    bestFor: [
      'People who feel stiff, tight, or inflexible',
      'Anyone looking for a low-impact daily movement practice',
      'Desk workers with neck, shoulder, or back tension',
      'People who want to combine physical exercise with mindfulness',
    ],

    requirements: [
      'A yoga mat (or a non-slip surface)',
      'Comfortable, stretchy clothing',
      'A quiet space where you can move freely',
      'Optional: yoga blocks and a strap for modifications',
    ],

    phases: [
      {
        name: 'Foundation',
        days: '1–14',
        dailyTarget: '15 minutes of basic poses',
        description:
          'Learn the fundamental poses: Mountain, Downward Dog, Warrior I, Warrior II, Child\'s Pose, Cat-Cow. Focus on alignment and breathing, not depth.',
        tip: 'Use YouTube channels like Yoga With Adriene for free guided beginner sessions.',
      },
      {
        name: 'Sun Salutations',
        days: '15–35',
        dailyTarget: '20 minutes including Sun Salutation flow',
        description:
          'Build a flowing Sun Salutation sequence that moves with your breath. This single flow covers the entire body and becomes the backbone of your practice.',
        tip: 'Move at the speed of your breath, not at the speed of the video.',
      },
      {
        name: 'Expanding the Practice',
        days: '36–60',
        dailyTarget: '20–25 minutes with standing and balance poses',
        description:
          'Add standing balance poses (Tree, Eagle) and deeper stretches (Pigeon, Seated Forward Fold). Your flexibility is improving enough to access new poses.',
        tip: 'Don\'t compare yourself to others. Your body is different from every other body on the planet.',
      },
      {
        name: 'Deepening',
        days: '61–85',
        dailyTarget: '25–30 minutes with inversions and twists',
        description:
          'Introduce gentle inversions (Legs Up the Wall, Supported Shoulderstand) and twists. These build strength, improve digestion, and challenge your practice.',
        tip: 'End every practice with at least 3 minutes of Savasana (lying still). The integration matters.',
      },
      {
        name: 'Your Practice',
        days: '86–100',
        dailyTarget: '20–30 minutes, self-guided',
        description:
          'You know enough to guide your own practice. Move intuitively, choosing what your body needs each day. Some days are vigorous; some days are restorative. Both count.',
        tip: 'Try practicing without a video for the final two weeks. Trust what your body has learned.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'Morning stiffness is already noticeably reduced. Basic poses are becoming familiar.' },
      { day: 21, title: 'Flexibility Gains', description: 'Your forward fold is deeper. Balance poses are more stable. Breathing is more controlled.' },
      { day: 50, title: 'Halfway There', description: 'Flexibility and strength gains are visible. You move differently throughout the day.' },
      { day: 75, title: 'Deep Practice', description: 'Poses that were impossible on day one are now accessible. Yoga is part of who you are.' },
      { day: 100, title: 'Challenge Complete', description: '100 days on the mat. Flexibility, strength, balance, and calm — permanently changed.' },
    ],

    obstacles: [
      {
        problem: 'I\'m not flexible enough for yoga',
        solution: 'That\'s exactly why you should do yoga. Every pose has modifications. Tight hamstrings? Bend your knees. Can\'t touch the floor? Use blocks. Yoga meets you where you are.',
      },
      {
        problem: 'I don\'t know what poses to do',
        solution: 'Follow free YouTube sequences for the first month. By day 30 you\'ll know enough poses to create your own flow.',
      },
      {
        problem: 'I feel self-conscious about my practice',
        solution: 'Practice at home, alone. Yoga is not a performance. Close the door, close your eyes, and move.',
      },
      {
        problem: 'Some days I don\'t have 30 minutes',
        solution: 'A 10-minute Sun Salutation flow is a complete practice. Short and done beats long and skipped.',
      },
    ],

    tips: [
      'Practice on an empty stomach for comfort — early morning or before dinner works best.',
      'Keep your mat unrolled and visible. If it\'s out, you\'ll step on it.',
      'Focus on breathing. If you\'re holding your breath, you\'re pushing too hard.',
      'Don\'t skip Savasana. The final resting pose integrates the physical and mental benefits.',
      'One new pose per week keeps the practice growing without overwhelm.',
      'Practice at the same time each day. Morning yoga sets the tone; evening yoga releases the day.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You\'ve never done yoga or have only tried it a few times.',
        recommendation: 'Start with 15-minute guided beginner sessions. Focus on learning 8–10 foundational poses with proper alignment.',
        dailyTarget: '15 minutes guided',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You know basic poses but don\'t practice consistently.',
        recommendation: 'Start with 20-minute sessions mixing familiar poses with one new pose per week. Focus on daily consistency.',
        dailyTarget: '20 minutes with progressive poses',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You have a regular practice but want to deepen it over 100 days.',
        recommendation: 'Practice 25–30 minutes daily with advanced variations, inversions, and self-guided flows. The challenge is the streak.',
        dailyTarget: '25–30 minutes self-guided',
      },
    ],

    faq: [
      {
        question: 'Do I need to be flexible to start?',
        answer: 'No. Saying you\'re too inflexible for yoga is like saying you\'re too dirty to take a shower. Yoga builds flexibility — it doesn\'t require it.',
      },
      {
        question: 'What style of yoga is best for this challenge?',
        answer: 'Hatha or Vinyasa yoga are great for daily practice. Hatha is slower and more accessible; Vinyasa is more dynamic. Choose based on your energy and preference.',
      },
      {
        question: 'Can I do yoga if I have back pain?',
        answer: 'Many yoga poses specifically help back pain (Cat-Cow, Child\'s Pose, Gentle Twist). However, avoid deep backbends and consult a doctor if pain is severe. Modify as needed.',
      },
      {
        question: 'Is yoga a real workout?',
        answer: 'Yes. A Vinyasa flow raises your heart rate, builds functional strength, and improves flexibility simultaneously. Don\'t confuse gentle with ineffective.',
      },
    ],

    relatedHabits: ['morning-yoga', 'meditate', 'run-for-20-minutes'],
    relatedChallenges: ['100-day-stretching-challenge', '100-day-meditation-challenge', '100-day-walking-challenge'],
    relatedArticles: [{ pillar: '100-day-challenges', slug: '100-day-fitness-challenge-guide' }],
  },

  {
    slug: '100-day-stretching-challenge',
    name: '100 Day Stretching Challenge',
    emoji: '🤸',
    tagline: 'Undo years of tightness in 15 minutes a day',
    metaDescription:
      'Join the 100 Day Stretching Challenge. A daily 15-minute stretching routine that progressively improves flexibility, reduces pain, and prevents injury.',
    difficulty: 'Easy',
    dailyTime: '15 minutes',
    color: '#7C3AED',
    category: 'fitness',

    introduction:
      'Most adults spend 10+ hours a day sitting. The result is tight hip flexors, rounded shoulders, stiff hamstrings, and chronic lower back pain. Stretching reverses this damage — but only if you do it consistently.\n\nThe 100 Day Stretching Challenge is 15 minutes of targeted stretching every day. That\'s less time than a coffee break, but over 100 days it undoes years of accumulated tightness. You\'ll move more freely, stand taller, sleep better, and experience significantly less everyday pain.\n\nThis isn\'t intense. It\'s not a workout. It\'s maintenance — the kind your body desperately needs and rarely gets.',

    bestFor: [
      'Desk workers with chronic tightness in hips, shoulders, or back',
      'People over 30 who feel increasingly stiff',
      'Athletes who skip stretching and feel the consequences',
      'Anyone recovering from injury who needs to rebuild mobility',
    ],

    requirements: [
      'A yoga mat or soft surface',
      'Comfortable clothing',
      'Optional: a foam roller and stretch strap',
    ],

    phases: [
      {
        name: 'Foundation',
        days: '1–14',
        dailyTarget: '15 minutes of basic stretches',
        description:
          'Focus on the five major tight areas: hamstrings, hip flexors, chest, shoulders, and lower back. Hold each stretch for 30–60 seconds. Breathe deeply.',
        tip: 'Stretch after a warm shower when muscles are warm and pliable.',
      },
      {
        name: 'Deepening Stretches',
        days: '15–35',
        dailyTarget: '15 minutes with longer holds',
        description:
          'Increase hold times to 60–90 seconds. Your nervous system needs time to relax into each stretch. Longer holds produce deeper flexibility gains.',
        tip: 'Never bounce in a stretch. Slow, steady pressure with deep breathing is more effective and safer.',
      },
      {
        name: 'Full Body Routine',
        days: '36–60',
        dailyTarget: '15 minutes full-body sequence',
        description:
          'Develop a complete stretching sequence that covers every major muscle group. Include neck, shoulders, chest, spine, hips, hamstrings, quads, and calves.',
        tip: 'Create a playlist that\'s exactly 15 minutes long. When the music stops, you\'re done.',
      },
      {
        name: 'Mobility Work',
        days: '61–85',
        dailyTarget: '15 minutes with dynamic mobility',
        description:
          'Add dynamic mobility exercises: hip circles, shoulder rotations, spine waves. These complement static stretching with active range-of-motion work.',
        tip: 'If a stretch feels painful rather than tight, back off. Pain is not the goal.',
      },
      {
        name: 'Flexible for Life',
        days: '86–100',
        dailyTarget: '15 minutes, your personalized routine',
        description:
          'You know your body\'s tight spots and what works. Your daily 15-minute routine is personalized and automatic. Flexibility is maintained, not achieved and lost.',
        tip: 'Stretch while watching TV or listening to podcasts to make it feel effortless.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'You can already feel the difference in your morning stiffness. Tight spots are identified.' },
      { day: 21, title: 'Noticeable Change', description: 'Your flexibility has measurably improved. Reaching, bending, and moving feel easier.' },
      { day: 50, title: 'Halfway There', description: 'Chronic tension spots are releasing. Posture has improved. Everyday movements feel freer.' },
      { day: 75, title: 'Deep Flexibility', description: 'Stretches that were uncomfortable on day one now feel normal. Your range of motion has expanded significantly.' },
      { day: 100, title: 'Challenge Complete', description: '25 hours of stretching. Flexibility, posture, and daily comfort permanently improved.' },
    ],

    obstacles: [
      {
        problem: 'Stretching feels boring compared to a workout',
        solution: 'Pair it with something you enjoy: a podcast, music, or a TV show. The 15 minutes fly by.',
      },
      {
        problem: 'I don\'t see results fast enough',
        solution: 'Flexibility changes are gradual. Take a photo of your deepest forward fold on day 1 and compare at day 30. The visual proof is convincing.',
      },
      {
        problem: 'I forget to stretch because it\'s not a "real" workout',
        solution: 'Attach it to an existing habit: stretch right after your morning coffee, after a workout, or before bed.',
      },
    ],

    tips: [
      'Warm muscles stretch better. Do a 2-minute warm-up (marching in place, arm circles) before stretching.',
      'Hold each stretch for at least 30 seconds. Shorter holds don\'t produce lasting flexibility.',
      'Breathe deeply into each stretch. Exhale to deepen the stretch; inhale to hold.',
      'Focus on tight areas but don\'t skip the rest. Full-body flexibility prevents compensatory injuries.',
      'Stretch before bed for better sleep. A relaxed body falls asleep faster.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You rarely stretch and feel generally stiff.',
        recommendation: 'Start with 5 basic stretches held for 30 seconds each. Add one new stretch per week. Don\'t push into pain.',
        dailyTarget: '15 minutes, 5 basic stretches',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You stretch sometimes but not consistently.',
        recommendation: 'Start with a 10-stretch full-body sequence held for 45–60 seconds each. Focus on daily consistency.',
        dailyTarget: '15 minutes, 10 stretches',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You stretch regularly but want to deepen flexibility.',
        recommendation: 'Use longer holds (90+ seconds), PNF stretching, and dynamic mobility. Target specific areas that resist change.',
        dailyTarget: '15 minutes, deep stretches with mobility',
      },
    ],

    faq: [
      {
        question: 'Should I stretch before or after exercise?',
        answer: 'Dynamic stretching (movement-based) before exercise and static stretching (held positions) after exercise or as a standalone session. This challenge works as a standalone daily practice.',
      },
      {
        question: 'How long does it take to get noticeably more flexible?',
        answer: 'Most people notice meaningful improvement in 2–3 weeks of daily stretching. Significant changes (like touching your toes) typically happen in 4–8 weeks.',
      },
      {
        question: 'Can stretching help with back pain?',
        answer: 'In many cases, yes. Tight hip flexors and hamstrings are common contributors to lower back pain. Daily stretching addresses these root causes. Consult a doctor if pain is severe.',
      },
      {
        question: 'Is 15 minutes really enough?',
        answer: 'Yes. Research shows that consistent daily stretching for 10–15 minutes produces better flexibility gains than longer, less frequent sessions. Consistency beats duration.',
      },
    ],

    relatedHabits: ['morning-yoga', '30-minute-workout', 'run-for-20-minutes'],
    relatedChallenges: ['100-day-yoga-challenge', '100-day-walking-challenge', '100-day-push-up-challenge'],
    relatedArticles: [{ pillar: '100-day-challenges', slug: '100-day-fitness-challenge-guide' }],
  },
];
