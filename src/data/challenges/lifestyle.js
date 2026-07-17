/**
 * Lifestyle challenge data — 5 challenges for the lifestyle category.
 */

export const lifestyleChallenges = [
  {
    slug: '100-day-morning-routine-challenge',
    name: '100 Day Morning Routine Challenge',
    emoji: '🌅',
    tagline: 'Master your morning and the rest of the day follows',
    metaDescription:
      'Join the 100 Day Morning Routine Challenge. Build a structured morning routine with exercise, reflection, and planning phases over 100 days.',
    difficulty: 'Hard',
    dailyTime: '45–60 minutes',
    color: '#E11D48',
    category: 'lifestyle',

    introduction:
      'Your morning sets the tone for your entire day. Start it reactively — checking email, scrolling social media, rushing out the door — and you spend the rest of the day catching up. Start it intentionally — with movement, reflection, and planning — and you operate from a position of control.\n\nThe 100 Day Morning Routine Challenge builds a structured morning that combines three elements: physical movement (15 minutes), reflection (10 minutes of journaling or meditation), and planning (5 minutes of setting the day\'s priorities). That\'s 30 minutes of intentional behavior before the world demands your attention.\n\nBy day 100, your morning routine will be automatic. You\'ll wake up knowing exactly what to do, and the rest of your day will reflect the calm, focused energy you built in the first hour.',

    bestFor: [
      'People whose mornings feel chaotic and reactive',
      'Anyone who wants to exercise, reflect, and plan but can\'t fit it all in',
      'Night owls who want to become morning people',
      'Professionals who want a competitive advantage before the workday starts',
    ],

    requirements: [
      'An alarm clock (not your phone, if possible)',
      'Exercise space or equipment for 15 minutes of movement',
      'A journal or notebook',
      'A bedtime early enough to support the wake-up time',
    ],

    phases: [
      {
        name: 'Wake & Move',
        days: '1–14',
        dailyTarget: 'Wake up consistently + 15 min exercise',
        description:
          'Focus on two things: waking at the same time daily and doing 15 minutes of physical movement. Walking, yoga, push-ups, stretching — any movement counts.',
        tip: 'Move your alarm across the room so you must physically get out of bed. Then don\'t get back in.',
      },
      {
        name: 'Add Reflection',
        days: '15–35',
        dailyTarget: '15 min exercise + 10 min journaling or meditation',
        description:
          'After exercise, sit down for 10 minutes of reflection. Write in a journal, meditate, or do a gratitude practice. The combination of movement and stillness is powerful.',
        tip: 'Have your journal and pen ready the night before, open to a fresh page. Remove all friction.',
      },
      {
        name: 'Add Planning',
        days: '36–60',
        dailyTarget: 'Full routine: exercise + reflect + plan',
        description:
          'Add 5 minutes of daily planning: review your calendar, set your top 3 priorities, and identify the single most important task for the day.',
        tip: 'Write your top 3 on a sticky note and put it where you\'ll see it all day.',
      },
      {
        name: 'Optimize',
        days: '61–85',
        dailyTarget: 'Full routine, refined and personalized',
        description:
          'Your routine works. Now optimize: adjust timing, order, and activities based on what works best for your energy and schedule. Make it yours.',
        tip: 'Try the routine on weekends too. Consistent routines work because they eliminate daily decisions.',
      },
      {
        name: 'Automatic',
        days: '86–100',
        dailyTarget: '30–60 min morning routine, no willpower needed',
        description:
          'Your morning routine runs on autopilot. You don\'t decide to do it — you just do it. The habit is encoded and permanent.',
        tip: 'Protect this routine as non-negotiable. It\'s the foundation that makes everything else in your day work better.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'Waking up consistently is the hardest part. You\'re building the neural pathway.' },
      { day: 21, title: 'Routine Forming', description: 'The morning sequence is becoming familiar. You know what comes next without thinking.' },
      { day: 50, title: 'Halfway There', description: 'Your mornings are noticeably different. You start the day calm, focused, and prepared.' },
      { day: 75, title: 'Automated', description: 'The routine runs without willpower. You wake up and the sequence unfolds naturally.' },
      { day: 100, title: 'Challenge Complete', description: '100 intentional mornings. Your days, weeks, and months are fundamentally different.' },
    ],

    obstacles: [
      {
        problem: 'I\'m not a morning person and can\'t wake up early',
        solution: 'Move your bedtime earlier by 15 minutes per week. Waking up at 6 AM starts with sleeping by 10:30 PM. The morning routine is built on sleep quality.',
      },
      {
        problem: 'My morning is already packed with getting ready and commuting',
        solution: 'Wake up 30 minutes earlier. That\'s the trade-off. Or compress the routine: 10 minutes of exercise + 5 minutes of journaling + 5 minutes of planning still works.',
      },
      {
        problem: 'I start strong but lose consistency after a few weeks',
        solution: 'Prepare the night before: lay out clothes, set up your journal, plan your exercise. Morning motivation is unreliable; evening preparation is controllable.',
      },
    ],

    tips: [
      'Move your bedtime earlier first. Morning routines fail when sleep is insufficient.',
      'Expose yourself to bright light immediately — open curtains or step outside.',
      'Don\'t check your phone for the first 30 minutes. Let your morning be yours.',
      'Start with just one element (exercise) and add the others after two weeks.',
      'Keep the routine under 60 minutes. Longer routines are harder to sustain.',
      'Weekend consistency matters. Sleeping in resets your circadian clock.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You have no morning routine and struggle to wake up consistently.',
        recommendation: 'Start with just waking at the same time and doing 15 minutes of movement. Add other elements one at a time every two weeks.',
        dailyTarget: '15 minutes: wake up + exercise',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You have a loose morning routine but it\'s inconsistent.',
        recommendation: 'Structure your existing routine: exercise first, then reflection, then planning. Focus on doing the same sequence daily.',
        dailyTarget: '30 minutes: exercise + reflect + plan',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You have a morning routine and want to lock it in for 100 days.',
        recommendation: 'Use the 100-day streak to make the routine truly automatic. Experiment with timing and activities to optimize your morning.',
        dailyTarget: '45–60 minutes, optimized routine',
      },
    ],

    faq: [
      {
        question: 'What time should I wake up?',
        answer: 'Early enough to complete your routine before obligations start. For most people, 5:30–6:30 AM works. The exact time matters less than consistency.',
      },
      {
        question: 'Can I exercise in the evening instead?',
        answer: 'You can, but the morning routine challenge specifically puts movement first to wake your body and mind. Even a 15-minute walk counts as morning exercise.',
      },
      {
        question: 'What if I have small children who wake me up unpredictably?',
        answer: 'Adapt: do a shorter routine, or do it before the children typically wake. Even 10 minutes of intentional morning behavior changes the day\'s trajectory.',
      },
      {
        question: 'Do I need to wake up at the same time on weekends?',
        answer: 'Ideally, yes. Consistent wake times regulate your circadian rhythm. If you must sleep in, limit it to 30 minutes past your weekday wake time.',
      },
    ],

    relatedHabits: ['wake-up-at-6-am', 'morning-yoga', 'meditate'],
    relatedChallenges: ['100-day-yoga-challenge', '100-day-meditation-challenge', '100-day-cold-shower-challenge'],
    relatedArticles: [{ pillar: 'productivity', slug: 'morning-routines-that-work' }],
  },

  {
    slug: '100-day-water-drinking-challenge',
    name: '100 Day Water Drinking Challenge',
    emoji: '💧',
    tagline: 'Drink 8 glasses of water every day and feel the difference',
    metaDescription:
      'Join the 100 Day Water Drinking Challenge. Track your daily water intake with a progressive plan, hydration tips, and strategies for consistent daily hydration.',
    difficulty: 'Easy',
    dailyTime: 'Throughout the day',
    color: '#0284C7',
    category: 'lifestyle',

    introduction:
      'You\'re probably dehydrated right now. Most adults are. Chronic mild dehydration affects everything from cognitive function and energy levels to skin health and digestion — but because the effects are gradual, most people never connect their afternoon brain fog, headaches, or fatigue to something as simple as not drinking enough water.\n\nThe 100 Day Water Drinking Challenge asks you to drink 8 glasses (64 oz / 2 liters) of water every day for 100 days. It\'s the simplest habit on this list, yet many people find it surprisingly hard to maintain consistently.\n\nBy day 100, you\'ll have consumed approximately 200 liters of water above what you might normally drink. Your skin, digestion, energy, and cognitive function will all reflect it.',

    bestFor: [
      'People who frequently feel tired, foggy, or headache-prone',
      'Anyone who knows they don\'t drink enough water',
      'People who rely on coffee or soda for energy throughout the day',
      'Anyone looking for the simplest possible health improvement',
    ],

    requirements: [
      'A reusable water bottle (24–32 oz / 700ml–1L)',
      'A way to track your intake (app, tally marks, or rubber band method)',
      'Access to clean drinking water',
    ],

    phases: [
      {
        name: 'Awareness',
        days: '1–14',
        dailyTarget: '6–8 glasses of water',
        description:
          'Track your current intake for 3 days to find your baseline. Then build up to 8 glasses by adding one glass per day. Develop awareness of when and how much you drink.',
        tip: 'Start each morning with a full glass of water before coffee or food. This kickstarts hydration and creates a morning anchor.',
      },
      {
        name: 'Building the Habit',
        days: '15–35',
        dailyTarget: '8 glasses consistently',
        description:
          'Hit 8 glasses every day. Establish water-drinking triggers: a glass with each meal, one mid-morning, one mid-afternoon. Distribute intake throughout the day.',
        tip: 'Keep a water bottle at your desk, in your car, and by your bed. Visibility is the best reminder.',
      },
      {
        name: 'Automatic Hydration',
        days: '36–60',
        dailyTarget: '8 glasses, minimal effort',
        description:
          'Water drinking is becoming automatic. You reach for water without thinking. Notice the changes: clearer skin, better energy, fewer headaches.',
        tip: 'Front-load your water before 6 PM to avoid disrupting sleep with nighttime bathroom visits.',
      },
      {
        name: 'Optimizing',
        days: '61–85',
        dailyTarget: '8+ glasses, adjusted for activity',
        description:
          'Adjust your intake for activity levels, weather, and individual needs. Some days you\'ll need more than 8 glasses. Your body will tell you.',
        tip: 'Check your urine color. Pale yellow means well-hydrated. Dark yellow means drink more.',
      },
      {
        name: 'Hydrated for Life',
        days: '86–100',
        dailyTarget: '8+ glasses, permanent habit',
        description:
          'Hydration is second nature. You feel thirsty when you miss a glass. The challenge ends, but you\'ll never go back to chronic dehydration.',
        tip: 'Replace one daily soda or juice with water permanently. The compound health benefit over years is massive.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'You\'re noticing energy differences, especially in the afternoon. Tracking is working.' },
      { day: 21, title: 'Habit Forming', description: 'Reaching for water is becoming automatic. You might notice skin improvements.' },
      { day: 50, title: 'Halfway There', description: 'Approximately 100 liters of extra hydration. Energy, skin, and digestion improvements are clear.' },
      { day: 75, title: 'Hydration Expert', description: 'You feel the difference when you fall short. Your body expects and craves consistent water.' },
      { day: 100, title: 'Challenge Complete', description: '200 liters of intentional hydration. A simple habit with profound cumulative effects.' },
    ],

    obstacles: [
      {
        problem: 'I forget to drink water throughout the day',
        solution: 'Set hourly phone reminders, use a marked water bottle with time goals, or pair water with existing habits (a glass every time you check email, for example).',
      },
      {
        problem: 'I don\'t like the taste of plain water',
        solution: 'Add a slice of lemon, cucumber, or mint. Try sparkling water. The goal is hydration, not suffering — make it enjoyable.',
      },
      {
        problem: 'I have to go to the bathroom constantly',
        solution: 'This is normal for the first 1–2 weeks as your body adjusts. It settles down. Front-load intake earlier in the day to reduce nighttime disruptions.',
      },
    ],

    tips: [
      'Start every morning with a full glass of water before anything else.',
      'Keep a water bottle visible at all times — on your desk, in your bag, by your bed.',
      'Use a marked water bottle with time goals (e.g., "Drink to here by noon").',
      'Set recurring reminders every 2 hours if you tend to forget.',
      'Drink a glass of water before each meal. It aids digestion and ensures consistent intake.',
      'Replace one daily sugary drink with water for compounding health benefits.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You currently drink 2–4 glasses of water per day.',
        recommendation: 'Start at 5 glasses and add one per week until you reach 8. Use reminders and a visible water bottle.',
        dailyTarget: '5 glasses, building to 8',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You drink 5–7 glasses but not consistently every day.',
        recommendation: 'Push to 8 glasses from day one. Focus on consistency: hitting 8 every single day for 100 days is the challenge.',
        dailyTarget: '8 glasses daily',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You drink plenty of water and want to optimize hydration habits.',
        recommendation: 'Track 8+ glasses daily adjusted for exercise and climate. Focus on timing distribution and eliminating sugary drink substitutes.',
        dailyTarget: '8+ glasses, optimally distributed',
      },
    ],

    faq: [
      {
        question: 'Is 8 glasses really the right amount?',
        answer: 'The "8x8" rule is a simple guideline. Actual needs vary by body size, activity, and climate. 8 glasses (64 oz / 2L) is a solid baseline for most adults. Adjust up for exercise or heat.',
      },
      {
        question: 'Do coffee and tea count toward my water intake?',
        answer: 'Partially. Caffeinated beverages are mild diuretics, but they still contribute to hydration. Count them as half — a cup of coffee counts as half a cup of water.',
      },
      {
        question: 'Can I drink too much water?',
        answer: 'Yes, but it\'s rare for most people. Hyponatremia (water toxicity) occurs at extreme levels. For most adults, 8–12 glasses per day is safe. Spread intake throughout the day.',
      },
      {
        question: 'Will drinking more water help me lose weight?',
        answer: 'It can help. Water increases satiety before meals, replaces caloric beverages, and supports metabolic function. It\'s not a magic bullet, but it supports weight management.',
      },
    ],

    relatedHabits: ['drink-8-glasses-of-water', 'eat-a-healthy-meal', 'wake-up-at-6-am'],
    relatedChallenges: ['100-day-morning-routine-challenge', '100-day-no-sugar-challenge', '100-day-cooking-challenge'],
    relatedArticles: [{ pillar: 'consistency', slug: 'compound-effect-of-daily-habits' }],
  },

  {
    slug: '100-day-no-sugar-challenge',
    name: '100 Day No Sugar Challenge',
    emoji: '🚫',
    tagline: 'Eliminate added sugar for 100 days and reset your palate',
    metaDescription:
      'Join the 100 Day No Sugar Challenge. Cut added sugar from your diet with a phased approach, substitute strategies, and tips for managing cravings.',
    difficulty: 'Hard',
    dailyTime: 'All day (mindful eating)',
    color: '#DC2626',
    category: 'lifestyle',

    introduction:
      'The average adult consumes 17 teaspoons of added sugar per day — nearly triple the recommended maximum. This excess drives inflammation, insulin resistance, energy crashes, poor sleep, and weight gain. Yet sugar is in everything: bread, sauces, yogurt, "healthy" snacks, and virtually all processed foods.\n\nThe 100 Day No Sugar Challenge asks you to eliminate added sugars from your diet for 100 days. Not fruit (natural sugars are fine). Not all carbs. Just the added sugars that food manufacturers put in products to make them addictive.\n\nThe first two weeks are hard — sugar withdrawal is real, with headaches, irritability, and intense cravings. But by day 21, your palate resets. Foods that tasted bland before taste rich. The afternoon energy crash disappears. And the weight starts coming off without counting calories.',

    bestFor: [
      'People with sugar cravings that feel out of control',
      'Anyone experiencing afternoon energy crashes',
      'People who want to lose weight without complex dieting',
      'Anyone curious about how sugar-free living feels',
    ],

    requirements: [
      'The ability to read nutrition labels',
      'Whole, unprocessed foods for meals and snacks',
      'Alternative sweeteners if needed (stevia, monk fruit)',
      'Meal planning and preparation supplies',
    ],

    phases: [
      {
        name: 'Sugar Audit',
        days: '1–14',
        dailyTarget: 'Eliminate obvious added sugars',
        description:
          'Cut the obvious sources: candy, soda, desserts, sweetened coffee, sugary snacks. Start reading labels — sugar hides in bread, sauces, yogurt, and granola bars.',
        tip: 'Sugar has 56+ names on labels: sucrose, high-fructose corn syrup, dextrose, maltose, cane juice. Learn to spot them.',
      },
      {
        name: 'Withdrawal & Adjustment',
        days: '15–35',
        dailyTarget: 'Zero added sugar, manage cravings',
        description:
          'Cut hidden sugars from sauces, condiments, and processed foods. Sugar withdrawal peaks around days 7–14: headaches, irritability, and cravings are normal and temporary.',
        tip: 'When a craving hits, eat a piece of fruit, a handful of nuts, or drink a glass of water. The craving passes in 15–20 minutes.',
      },
      {
        name: 'Palate Reset',
        days: '36–60',
        dailyTarget: 'Sugar-free eating with new favorite meals',
        description:
          'Your palate has reset. Fruits taste sweeter. Vegetables have more flavor. You\'ve found sugar-free meals and snacks that you genuinely enjoy.',
        tip: 'Meal prep on weekends. Having ready-to-eat sugar-free food prevents desperate grabs for processed snacks.',
      },
      {
        name: 'Social Navigation',
        days: '61–85',
        dailyTarget: 'Sugar-free in all situations including social',
        description:
          'Navigate restaurants, parties, and social pressure without added sugar. You have strategies for dining out, traveling, and handling well-meaning offers of dessert.',
        tip: 'You don\'t need to explain yourself. "No thanks" is a complete sentence.',
      },
      {
        name: 'Sugar-Free Identity',
        days: '86–100',
        dailyTarget: 'Sugar-free as default',
        description:
          'You don\'t avoid sugar — you just don\'t eat it. It\'s not willpower anymore; it\'s preference. Your energy is stable, your skin is clearer, and your relationship with food is transformed.',
        tip: 'Decide in advance how you\'ll handle sugar after day 100: full elimination, occasional treats, or somewhere between.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'Withdrawal symptoms are peaking. This is the hardest point. It gets easier from here.' },
      { day: 21, title: 'Palate Resetting', description: 'Cravings are fading. Fruit tastes sweeter. Energy is more stable throughout the day.' },
      { day: 50, title: 'Halfway There', description: 'You\'ve found sugar-free meals you love. Weight loss and energy improvements are noticeable.' },
      { day: 75, title: 'Sugar-Free Normal', description: 'Eating without added sugar is your default. Social situations are manageable.' },
      { day: 100, title: 'Challenge Complete', description: '100 days sugar-free. Your palate, energy, weight, and health have fundamentally shifted.' },
    ],

    obstacles: [
      {
        problem: 'Intense sugar cravings in the first two weeks',
        solution: 'Eat fruit, dark chocolate (85%+), or nuts when cravings hit. Stay well-hydrated. Cravings peak around day 7–14 and then diminish significantly.',
      },
      {
        problem: 'Sugar is in everything at the grocery store',
        solution: 'Shop the perimeter: produce, meat, dairy. Read every label. Cook from whole ingredients. It takes more effort initially but becomes routine.',
      },
      {
        problem: 'Social pressure to eat dessert or sugary foods',
        solution: 'Bring a sugar-free alternative to gatherings. Order fruit for dessert at restaurants. Most people respect your choice once you state it simply.',
      },
      {
        problem: 'Headaches and irritability during withdrawal',
        solution: 'These are temporary — usually lasting 5–10 days. Stay hydrated, eat enough healthy fats and protein, and get adequate sleep. The symptoms mean your body is adjusting.',
      },
    ],

    tips: [
      'Read every nutrition label for the first month. You\'ll be shocked where sugar hides.',
      'Keep fruit readily available for when sugar cravings hit. Nature\'s candy is allowed.',
      'Meal prep is essential. Hunger + no prepared food = sugar relapse.',
      'Eat enough healthy fats (avocado, nuts, olive oil) to stay satisfied between meals.',
      'Tell your household what you\'re doing so they can support (or at least not sabotage) you.',
      'If you slip, don\'t restart. Just resume sugar-free at the next meal. One slip doesn\'t erase progress.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You eat sugar daily in multiple forms (soda, snacks, desserts).',
        recommendation: 'Start by eliminating the biggest sources (soda, candy, desserts) in week 1, then progressively cut hidden sugars. Don\'t try to go cold turkey on everything at once.',
        dailyTarget: 'Eliminate added sugar progressively',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You\'ve reduced sugar before but can\'t sustain it long-term.',
        recommendation: 'Go fully sugar-free from day one. Focus on the 100-day commitment. Have replacement foods and meals planned in advance.',
        dailyTarget: 'Zero added sugar from day 1',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You eat relatively little sugar and want to eliminate it completely.',
        recommendation: 'Audit your diet for hidden sugars in sauces, condiments, and packaged foods. The challenge is complete elimination for 100 days.',
        dailyTarget: 'Zero added sugar, including hidden sources',
      },
    ],

    faq: [
      {
        question: 'Can I eat fruit? It has sugar.',
        answer: 'Yes. Fruit contains natural sugars packaged with fiber, vitamins, and water. The challenge targets added sugars, not naturally occurring sugars in whole foods.',
      },
      {
        question: 'What about artificial sweeteners?',
        answer: 'They\'re technically sugar-free, but some people find they perpetuate sweet cravings. Use them if needed to transition, but try to reduce over time.',
      },
      {
        question: 'Will I lose weight?',
        answer: 'Most people lose weight when cutting added sugar because they\'re eliminating hundreds of empty calories daily. Results vary based on overall diet and activity.',
      },
      {
        question: 'What about honey and maple syrup?',
        answer: 'They\'re added sugars. While they have some nutrients that refined sugar lacks, they still spike blood sugar similarly. Eliminate them for the full challenge.',
      },
    ],

    relatedHabits: ['eat-a-healthy-meal', 'drink-8-glasses-of-water', 'sleep-by-10-30-pm'],
    relatedChallenges: ['100-day-water-drinking-challenge', '100-day-cooking-challenge', '100-day-morning-routine-challenge'],
    relatedArticles: [{ pillar: 'discipline', slug: 'temptation-bundling' }],
  },

  {
    slug: '100-day-cooking-challenge',
    name: '100 Day Cooking Challenge',
    emoji: '🍳',
    tagline: 'Cook one meal from scratch every day for 100 days',
    metaDescription:
      'Join the 100 Day Cooking Challenge. Cook one meal from scratch daily with progressive skill-building, recipes, and tips for every kitchen skill level.',
    difficulty: 'Moderate',
    dailyTime: '30–60 minutes',
    color: '#F59E0B',
    category: 'lifestyle',

    introduction:
      'Cooking is one of the most practical skills a person can have, yet fewer adults cook daily meals from scratch than any previous generation. The result: dependence on processed food, restaurant spending that adds up to thousands per year, and a disconnect from what we actually eat.\n\nThe 100 Day Cooking Challenge asks you to prepare one meal from scratch every day. Not a Michelin-star production — just real ingredients, combined by your hands, eaten by you. An omelet counts. A stir-fry counts. A salad with homemade dressing counts.\n\nBy day 100, you\'ll have a repertoire of 20–30 meals you can make without a recipe, your grocery spending will have dropped, and your relationship with food will be fundamentally healthier.',

    bestFor: [
      'People who rely heavily on takeout, delivery, or processed food',
      'Anyone who wants to eat healthier without following a strict diet',
      'Budget-conscious individuals looking to reduce food spending',
      'People who want to learn a practical life skill',
    ],

    requirements: [
      'Basic kitchen equipment (knife, cutting board, pan, pot)',
      'Access to a grocery store or market',
      'A few simple recipes to start (online or cookbook)',
      'Ingredients for at least 3 days of meals',
    ],

    phases: [
      {
        name: 'Simple Meals',
        days: '1–14',
        dailyTarget: 'One meal from scratch (simple recipes)',
        description:
          'Start with meals that have 5 or fewer ingredients: scrambled eggs, pasta with garlic and olive oil, rice and beans, simple stir-fry. Build confidence with easy wins.',
        tip: 'Master 3–5 simple meals first. Repetition builds skill faster than variety at this stage.',
      },
      {
        name: 'Expanding Skills',
        days: '15–35',
        dailyTarget: 'One meal with new techniques',
        description:
          'Learn fundamental techniques: sauteing, roasting, making sauces, proper knife cuts. Each week, try one new technique applied to a familiar recipe.',
        tip: 'Watch one cooking technique video per week (5 minutes). Then practice it in that day\'s meal.',
      },
      {
        name: 'Recipe Repertoire',
        days: '36–60',
        dailyTarget: 'One meal, building your go-to collection',
        description:
          'Build a personal cookbook of meals you enjoy making and eating. Aim for 15–20 reliable recipes by day 60. Repeat favorites and add new ones gradually.',
        tip: 'When you make something great, write it down immediately — quantities, timing, everything. Future you will thank you.',
      },
      {
        name: 'Cooking Without Recipes',
        days: '61–85',
        dailyTarget: 'One meal, increasingly improvised',
        description:
          'Start cooking without following recipes exactly. You understand enough about flavor, technique, and timing to improvise. Open the fridge and create something.',
        tip: 'Learn the formula: protein + vegetable + starch + sauce. Most meals follow this pattern.',
      },
      {
        name: 'Home Chef',
        days: '86–100',
        dailyTarget: 'One meal, your style',
        description:
          'You cook daily with confidence. You can open the fridge, see what\'s available, and make a meal. Grocery shopping is purposeful. Cooking is enjoyable, not a chore.',
        tip: 'Cook for others. Sharing food you\'ve made is one of life\'s great pleasures.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'Seven home-cooked meals. You\'re establishing the daily rhythm.' },
      { day: 21, title: 'Kitchen Confidence', description: 'Basic techniques feel natural. You have 5–10 meals you can make reliably.' },
      { day: 50, title: 'Halfway There', description: '50 meals cooked. Your grocery bill is lower, your meals are tastier, and you know your way around a kitchen.' },
      { day: 75, title: 'Home Chef', description: 'You can improvise meals without recipes. Cooking is becoming creative and enjoyable.' },
      { day: 100, title: 'Challenge Complete', description: '100 home-cooked meals. A life skill mastered, money saved, and health improved.' },
    ],

    obstacles: [
      {
        problem: 'I don\'t have time to cook every day',
        solution: 'Simple meals take 15–20 minutes. An omelet, a stir-fry, pasta with vegetables — none require more than 30 minutes. Prep ingredients on weekends to speed weeknight cooking.',
      },
      {
        problem: 'My cooking doesn\'t taste good',
        solution: 'Season properly: salt is the most important ingredient. Taste as you cook and adjust. Most home cooks under-season. Also, fat (butter, olive oil) makes everything taste better.',
      },
      {
        problem: 'I waste food because I buy ingredients I don\'t use',
        solution: 'Plan meals before shopping. Buy only what you need for 3–4 days. Cook flexible ingredients (eggs, rice, vegetables) that work in multiple meals.',
      },
    ],

    tips: [
      'Start with 5 simple recipes you enjoy and rotate them for the first two weeks.',
      'Keep a well-stocked pantry: olive oil, salt, pepper, garlic, onions, canned tomatoes, rice, pasta.',
      'Clean as you cook. A messy kitchen makes cooking feel overwhelming.',
      'Taste your food as you cook. Seasoning at the end is too late — build flavor throughout.',
      'Meal prep on Sunday: wash and chop vegetables, cook grains, marinate proteins.',
      'Don\'t aim for Instagram-worthy meals. Aim for nourishing, simple food that you actually eat.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You rarely cook and don\'t feel confident in the kitchen.',
        recommendation: 'Start with 5-ingredient recipes: scrambled eggs, pasta, rice bowls, sandwiches. Focus on showing up in the kitchen daily, not culinary excellence.',
        dailyTarget: 'One simple meal (5 or fewer ingredients)',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You cook occasionally but rely heavily on takeout or pre-made meals.',
        recommendation: 'Cook one meal from scratch daily with increasing complexity. Learn one new technique per week. Build a personal recipe collection.',
        dailyTarget: 'One meal with 5–10 ingredients',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You cook regularly and want to improve or cook daily without exception.',
        recommendation: 'Push your skills: try new cuisines, techniques, and ingredients. Cook without recipes using improvisation. The 100-day streak ensures daily practice.',
        dailyTarget: 'One meal, increasingly improvised',
      },
    ],

    faq: [
      {
        question: 'Does "from scratch" mean everything homemade? Can I use canned or pre-made ingredients?',
        answer: 'Use canned tomatoes, pre-made broth, and pre-cut vegetables freely. "From scratch" means you\'re assembling and cooking the meal yourself, not that every ingredient is made from raw components.',
      },
      {
        question: 'What if I live alone? Cooking for one feels wasteful.',
        answer: 'Cook for two and save leftovers for lunch. Or batch-cook and freeze portions. Cooking for one is actually easier: smaller quantities, simpler prep, and you only need to please yourself.',
      },
      {
        question: 'How much will this save me financially?',
        answer: 'The average American spends $200–300/month on takeout and delivery. Home cooking the same meals costs roughly $100–150. Over 100 days, you could save $300–500+.',
      },
      {
        question: 'I don\'t have a fully equipped kitchen. What do I need?',
        answer: 'A knife, a cutting board, a large pan, and a pot. That\'s enough to cook 90% of simple meals. Add a baking sheet and a spatula, and you\'re fully equipped.',
      },
    ],

    relatedHabits: ['eat-a-healthy-meal', 'drink-8-glasses-of-water', 'plan-tomorrow-tonight'],
    relatedChallenges: ['100-day-no-sugar-challenge', '100-day-water-drinking-challenge', '100-day-morning-routine-challenge'],
    relatedArticles: [{ pillar: 'consistency', slug: 'compound-effect-of-daily-habits' }],
  },

  {
    slug: '100-day-no-phone-morning-challenge',
    name: '100 Day No Phone Morning Challenge',
    emoji: '📵',
    tagline: 'Reclaim your first hour without screens',
    metaDescription:
      'Join the 100 Day No Phone Morning Challenge. Keep your phone away for the first hour after waking to improve focus, mood, and morning productivity.',
    difficulty: 'Moderate',
    dailyTime: '60 minutes (phone-free)',
    color: '#7C3AED',
    category: 'lifestyle',

    introduction:
      'The first thing most people do when they wake up is reach for their phone. Within seconds, they\'re absorbing other people\'s priorities: emails, news, social media, notifications. The day hasn\'t started and they\'re already reactive, anxious, or distracted.\n\nThe 100 Day No Phone Morning Challenge asks you to keep your phone untouched for the first 60 minutes after waking. Not airplane mode — actually not in your hands. The hour belongs to you: exercise, read, journal, eat breakfast, shower, think.\n\nThis single boundary reclaims 100 hours of morning time over the challenge period. Your cortisol response (naturally highest in the morning) won\'t spike from stressful notifications. Your attention won\'t fragment before the day begins. You\'ll start each day on your terms.',

    bestFor: [
      'People who check their phone within 5 minutes of waking',
      'Anyone who feels anxious or overwhelmed first thing in the morning',
      'People who want more productive, intentional mornings',
      'Anyone whose phone is the last thing they see at night and the first thing in the morning',
    ],

    requirements: [
      'A physical alarm clock (so your phone isn\'t your alarm)',
      'A designated phone-free zone or storage spot for mornings',
      'A morning activity to fill the hour (exercise, reading, breakfast, journal)',
    ],

    phases: [
      {
        name: 'The Boundary',
        days: '1–14',
        dailyTarget: '30 minutes phone-free after waking',
        description:
          'Start with 30 minutes. Place your phone in a drawer or another room before bed. Use a physical alarm. The urge to check will be intense — sit with it.',
        tip: 'The first 3 days are the hardest. The reflex to reach for your phone is deeply ingrained. It gets easier fast.',
      },
      {
        name: 'Extending to One Hour',
        days: '15–35',
        dailyTarget: '60 minutes phone-free',
        description:
          'Extend to a full hour. Fill the time with activities you value: exercise, breakfast, reading, journaling, conversation. Notice how your mood and focus differ from phone-first mornings.',
        tip: 'Have a specific morning activity planned. "No phone" works better as "do this instead" rather than "don\'t do that."',
      },
      {
        name: 'Filling the Time',
        days: '36–60',
        dailyTarget: '60 minutes of intentional phone-free activity',
        description:
          'The phone-free hour is now filled with activities you\'d lose if you started scrolling. This is your time: exercise, learn, think, connect with people in person.',
        tip: 'Track what you do with your phone-free hour each day. You\'ll be surprised at how much you accomplish.',
      },
      {
        name: 'Morning Ownership',
        days: '61–85',
        dailyTarget: '60 minutes, automatically phone-free',
        description:
          'You don\'t think about your phone for the first hour anymore. The morning has its own rhythm: wake, move, reflect, plan. The phone is irrelevant until you choose to use it.',
        tip: 'When you do pick up your phone after the hour, choose your first action intentionally. Don\'t default to social media or email.',
      },
      {
        name: 'Phone on Your Terms',
        days: '86–100',
        dailyTarget: '60+ minutes, permanent boundary',
        description:
          'The phone-free morning is permanent. You\'ve experienced 100 mornings of clarity, calm, and intentionality. Going back would feel like a downgrade.',
        tip: 'Consider extending the boundary. Many people find that phone-free until after their first deep work block is even more powerful.',
      },
    ],

    milestones: [
      { day: 7, title: 'First Full Week', description: 'The reflex to grab your phone is weakening. Mornings feel different — calmer, more spacious.' },
      { day: 21, title: 'New Normal', description: 'Phone-free mornings feel natural. You notice the quality difference on days you slip.' },
      { day: 50, title: 'Halfway There', description: '50 hours of morning time reclaimed. Your morning routine is established and enjoyable.' },
      { day: 75, title: 'Morning Master', description: 'You own your mornings completely. The phone is a tool you use intentionally, not a reflex you obey.' },
      { day: 100, title: 'Challenge Complete', description: '100 hours of morning clarity. Your relationship with your phone has permanently changed.' },
    ],

    obstacles: [
      {
        problem: 'I use my phone as my alarm clock',
        solution: 'Buy a $10 alarm clock. This single purchase removes the excuse to have your phone by the bed. It\'s the most important investment for this challenge.',
      },
      {
        problem: 'I\'m worried I\'ll miss something urgent',
        solution: 'Nothing urgent arrives by text or email at 6 AM that can\'t wait until 7 AM. If you have genuine emergency concerns, allow phone calls only (most phones have a "calls only" mode).',
      },
      {
        problem: 'I feel anxious not knowing what\'s in my notifications',
        solution: 'That anxiety IS the problem this challenge solves. The discomfort of not checking is temporary; the clarity of phone-free mornings is permanent. Sit with it.',
      },
    ],

    tips: [
      'Buy a physical alarm clock. It\'s the single most important tool for this challenge.',
      'Charge your phone in a different room overnight, not by your bed.',
      'Fill the hour with something you enjoy: reading, exercise, a good breakfast, conversation.',
      'Tell your household what you\'re doing so they don\'t hand you your phone or ask you to check something.',
      'Notice how you feel during your first phone check of the day. You\'ll realize how much emotional load each notification carries.',
    ],

    levels: [
      {
        id: 'beginner',
        label: 'Beginner',
        description: 'You check your phone within minutes of waking every day.',
        recommendation: 'Start with 30 minutes phone-free and build to 60 by week 3. Get a physical alarm clock immediately. The phone must leave the bedroom.',
        dailyTarget: '30 minutes, building to 60',
      },
      {
        id: 'intermediate',
        label: 'Some Experience',
        description: 'You sometimes delay checking your phone but aren\'t consistent.',
        recommendation: 'Commit to 60 minutes from day one. Have a replacement activity ready (exercise, reading, breakfast). Focus on the 100-day streak.',
        dailyTarget: '60 minutes phone-free',
      },
      {
        id: 'advanced',
        label: 'Experienced',
        description: 'You already have good phone boundaries and want to solidify them.',
        recommendation: 'Extend to 90 minutes or until after your first deep work block. Use the challenge to make it completely automatic.',
        dailyTarget: '60–90 minutes phone-free',
      },
    ],

    faq: [
      {
        question: 'What if I need my phone for my morning workout app or music?',
        answer: 'Pre-load your workout or playlist the night before and use airplane mode. Or use a separate device (old phone, MP3 player, smart speaker) for music and workout guidance.',
      },
      {
        question: 'Does this include work messaging?',
        answer: 'Yes. The point is that no work message at 6 AM is so urgent it can\'t wait until 7 AM. Your morning hour is for you, not your employer.',
      },
      {
        question: 'What if I\'m on call or have genuine emergency responsibilities?',
        answer: 'Use "Do Not Disturb" mode that allows calls from favorites or repeated callers. This handles genuine emergencies while blocking the noise.',
      },
      {
        question: 'Will I miss important morning communications?',
        answer: 'In 100 days of this challenge, most people report never missing anything that actually mattered. The "urgency" of morning notifications is almost always imagined.',
      },
    ],

    relatedHabits: ['wake-up-at-6-am', 'no-phone-before-bed', 'meditate'],
    relatedChallenges: ['100-day-morning-routine-challenge', '100-day-meditation-challenge', '100-day-deep-work-challenge'],
    relatedArticles: [{ pillar: 'discipline', slug: 'discipline-in-digital-age' }],
  },
];
