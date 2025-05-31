import React, { useState, useRef, useEffect } from 'react';

// CONFIGURATION - Make these easily changeable
const APP_CONFIG = {
  // Animation settings
  OPENING_DURATION: 8000,        // Total opening sequence time
  AI_ANIMATION_DURATION: 12000,  // AI processing animation time
  STORY_SLIDE_DURATION: 4000,    // Time per story slide
  
  // Flow control
  AUTO_PLAY_STORY_FIRST: true,   // true = Story mode auto-plays after AI animation
                                 // false = Results page shows first
  SKIP_OPENING: false,           // true = Skip opening animation for testing
  
  // Story mode settings
  STORY_AUTO_ADVANCE: true,      // Auto-advance through stories
  ENABLE_TAP_NAVIGATION: true,   // Allow tap to navigate stories
  
  // Feedback & Email
  ENABLE_FEEDBACK: true,         // Show feedback features
  EMAIL_METHOD: 'mailto',        // 'mailto' or 'api' for guestbook
  CONTACT_EMAIL: 'hello@innocencetheory.com'
};

const mockData = {
  quotes: [
    "The Earth does not belong to us; we belong to the Earth. - Chief Seattle (1)",
    "Be the change you wish to see in the world. - Gandhi (2)",
    "The greatest threat to our planet is the belief that someone else will save it. - Robert Swan (3)",
    "Nature always wears the colors of the spirit. - Ralph Waldo Emerson (4)",
    "Adopt the pace of nature: her secret is patience. - Ralph Waldo Emerson (5)",
    "Look deep into nature, and then you will understand everything better. - Albert Einstein (6)",
    "He that plants trees loves others besides himself. - Thomas Fuller (7)",
    "What is the use of a house if you haven't got a tolerable planet to put it on? - Thoreau (8)",
    "To cherish what remains of the Earth and to foster its renewal is our only legitimate hope of survival. - Wendell Berry (9)",
    "One touch of nature makes the whole world kin. - William Shakespeare (10)",
    "The Earth does not belong to us; we belong to the Earth. - Chief Seattle (11)",
    "Be the change you wish to see in the world. - Gandhi (12)",
    "The greatest threat to our planet is the belief that someone else will save it. - Robert Swan (13)",
    "Nature always wears the colors of the spirit. - Ralph Waldo Emerson (14)",
    "Adopt the pace of nature: her secret is patience. - Ralph Waldo Emerson (15)",
    "Look deep into nature, and then you will understand everything better. - Albert Einstein (16)",
    "He that plants trees loves others besides himself. - Thomas Fuller (17)",
    "What is the use of a house if you haven't got a tolerable planet to put it on? - Thoreau (18)",
    "To cherish what remains of the Earth and to foster its renewal is our only legitimate hope of survival. - Wendell Berry (19)",
    "One touch of nature makes the whole world kin. - William Shakespeare (20)",
    "The Earth does not belong to us; we belong to the Earth. - Chief Seattle (21)",
    "Be the change you wish to see in the world. - Gandhi (22)",
    "The greatest threat to our planet is the belief that someone else will save it. - Robert Swan (23)",
    "Nature always wears the colors of the spirit. - Ralph Waldo Emerson (24)",
    "Adopt the pace of nature: her secret is patience. - Ralph Waldo Emerson (25)",
    "Look deep into nature, and then you will understand everything better. - Albert Einstein (26)",
    "He that plants trees loves others besides himself. - Thomas Fuller (27)",
    "What is the use of a house if you haven't got a tolerable planet to put it on? - Thoreau (28)",
    "To cherish what remains of the Earth and to foster its renewal is our only legitimate hope of survival. - Wendell Berry (29)",
    "One touch of nature makes the whole world kin. - William Shakespeare (30)",
    "The Earth does not belong to us; we belong to the Earth. - Chief Seattle (31)",
    "Be the change you wish to see in the world. - Gandhi (32)",
    "The greatest threat to our planet is the belief that someone else will save it. - Robert Swan (33)",
    "Nature always wears the colors of the spirit. - Ralph Waldo Emerson (34)",
    "Adopt the pace of nature: her secret is patience. - Ralph Waldo Emerson (35)",
    "Look deep into nature, and then you will understand everything better. - Albert Einstein (36)",
    "He that plants trees loves others besides himself. - Thomas Fuller (37)",
    "What is the use of a house if you haven't got a tolerable planet to put it on? - Thoreau (38)",
    "To cherish what remains of the Earth and to foster its renewal is our only legitimate hope of survival. - Wendell Berry (39)",
    "One touch of nature makes the whole world kin. - William Shakespeare (40)",
    "The Earth does not belong to us; we belong to the Earth. - Chief Seattle (41)",
    "Be the change you wish to see in the world. - Gandhi (42)",
    "The greatest threat to our planet is the belief that someone else will save it. - Robert Swan (43)",
    "Nature always wears the colors of the spirit. - Ralph Waldo Emerson (44)",
    "Adopt the pace of nature: her secret is patience. - Ralph Waldo Emerson (45)",
    "Look deep into nature, and then you will understand everything better. - Albert Einstein (46)",
    "He that plants trees loves others besides himself. - Thomas Fuller (47)",
    "What is the use of a house if you haven't got a tolerable planet to put it on? - Thoreau (48)",
    "To cherish what remains of the Earth and to foster its renewal is our only legitimate hope of survival. - Wendell Berry (49)",
    "One touch of nature makes the whole world kin. - William Shakespeare (50)",
  ],
  thoughts: [
    "Every action in harmony with nature is a step toward collective healing. (1)",
    "Mindful living is not a sacrifice—it's a return to truth. (2)",
    "We don’t inherit the earth from our ancestors; we borrow it from our children. (3)",
    "The planet thrives when we align with its rhythms. (4)",
    "Your small daily choices are building blocks of global change. (5)",
    "Nature doesn’t need us; we need nature. (6)",
    "Progress doesn’t mean faster—it means deeper and wiser. (7)",
    "You can’t rush the blooming of a flower—neither can you rush change. (8)",
    "Let nature be not your escape, but your teacher. (9)",
    "There’s no finish line in sustainability, only checkpoints of progress. (10)",
    "Every action in harmony with nature is a step toward collective healing. (11)",
    "Mindful living is not a sacrifice—it's a return to truth. (12)",
    "We don’t inherit the earth from our ancestors; we borrow it from our children. (13)",
    "The planet thrives when we align with its rhythms. (14)",
    "Your small daily choices are building blocks of global change. (15)",
    "Nature doesn’t need us; we need nature. (16)",
    "Progress doesn’t mean faster—it means deeper and wiser. (17)",
    "You can’t rush the blooming of a flower—neither can you rush change. (18)",
    "Let nature be not your escape, but your teacher. (19)",
    "There’s no finish line in sustainability, only checkpoints of progress. (20)",
    "Every action in harmony with nature is a step toward collective healing. (21)",
    "Mindful living is not a sacrifice—it's a return to truth. (22)",
    "We don’t inherit the earth from our ancestors; we borrow it from our children. (23)",
    "The planet thrives when we align with its rhythms. (24)",
    "Your small daily choices are building blocks of global change. (25)",
    "Nature doesn’t need us; we need nature. (26)",
    "Progress doesn’t mean faster—it means deeper and wiser. (27)",
    "You can’t rush the blooming of a flower—neither can you rush change. (28)",
    "Let nature be not your escape, but your teacher. (29)",
    "There’s no finish line in sustainability, only checkpoints of progress. (30)",
    "Every action in harmony with nature is a step toward collective healing. (31)",
    "Mindful living is not a sacrifice—it's a return to truth. (32)",
    "We don’t inherit the earth from our ancestors; we borrow it from our children. (33)",
    "The planet thrives when we align with its rhythms. (34)",
    "Your small daily choices are building blocks of global change. (35)",
    "Nature doesn’t need us; we need nature. (36)",
    "Progress doesn’t mean faster—it means deeper and wiser. (37)",
    "You can’t rush the blooming of a flower—neither can you rush change. (38)",
    "Let nature be not your escape, but your teacher. (39)",
    "There’s no finish line in sustainability, only checkpoints of progress. (40)",
    "Every action in harmony with nature is a step toward collective healing. (41)",
    "Mindful living is not a sacrifice—it's a return to truth. (42)",
    "We don’t inherit the earth from our ancestors; we borrow it from our children. (43)",
    "The planet thrives when we align with its rhythms. (44)",
    "Your small daily choices are building blocks of global change. (45)",
    "Nature doesn’t need us; we need nature. (46)",
    "Progress doesn’t mean faster—it means deeper and wiser. (47)",
    "You can’t rush the blooming of a flower—neither can you rush change. (48)",
    "Let nature be not your escape, but your teacher. (49)",
    "There’s no finish line in sustainability, only checkpoints of progress. (50)",
  ],
  actions: [
    "Unplug unused devices today for 12 hours. (1)",
    "Try a meatless meal and share the recipe with a friend. (2)",
    "Pick up 5 pieces of litter during your walk today. (3)",
    "Take a 3-minute cold shower to reconnect with resource limits. (4)",
    "Write a thank-you note to your future self for today's eco-conscious act. (5)",
    "Start a 'needs vs wants' list before buying anything. (6)",
    "Borrow instead of buy this week: a book, tool, or skill. (7)",
    "Plant a native flower or herb in your window or yard. (8)",
    "Say no to plastic today. Every time. (9)",
    "Walk or bike instead of drive for one trip today. (10)",
    "Unplug unused devices today for 12 hours. (11)",
    "Try a meatless meal and share the recipe with a friend. (12)",
    "Pick up 5 pieces of litter during your walk today. (13)",
    "Take a 3-minute cold shower to reconnect with resource limits. (14)",
    "Write a thank-you note to your future self for today's eco-conscious act. (15)",
    "Start a 'needs vs wants' list before buying anything. (16)",
    "Borrow instead of buy this week: a book, tool, or skill. (17)",
    "Plant a native flower or herb in your window or yard. (18)",
    "Say no to plastic today. Every time. (19)",
    "Walk or bike instead of drive for one trip today. (20)",
    "Unplug unused devices today for 12 hours. (21)",
    "Try a meatless meal and share the recipe with a friend. (22)",
    "Pick up 5 pieces of litter during your walk today. (23)",
    "Take a 3-minute cold shower to reconnect with resource limits. (24)",
    "Write a thank-you note to your future self for today's eco-conscious act. (25)",
    "Start a 'needs vs wants' list before buying anything. (26)",
    "Borrow instead of buy this week: a book, tool, or skill. (27)",
    "Plant a native flower or herb in your window or yard. (28)",
    "Say no to plastic today. Every time. (29)",
    "Walk or bike instead of drive for one trip today. (30)",
    "Unplug unused devices today for 12 hours. (31)",
    "Try a meatless meal and share the recipe with a friend. (32)",
    "Pick up 5 pieces of litter during your walk today. (33)",
    "Take a 3-minute cold shower to reconnect with resource limits. (34)",
    "Write a thank-you note to your future self for today's eco-conscious act. (35)",
    "Start a 'needs vs wants' list before buying anything. (36)",
    "Borrow instead of buy this week: a book, tool, or skill. (37)",
    "Plant a native flower or herb in your window or yard. (38)",
    "Say no to plastic today. Every time. (39)",
    "Walk or bike instead of drive for one trip today. (40)",
    "Unplug unused devices today for 12 hours. (41)",
    "Try a meatless meal and share the recipe with a friend. (42)",
    "Pick up 5 pieces of litter during your walk today. (43)",
    "Take a 3-minute cold shower to reconnect with resource limits. (44)",
    "Write a thank-you note to your future self for today's eco-conscious act. (45)",
    "Start a 'needs vs wants' list before buying anything. (46)",
    "Borrow instead of buy this week: a book, tool, or skill. (47)",
    "Plant a native flower or herb in your window or yard. (48)",
    "Say no to plastic today. Every time. (49)",
    "Walk or bike instead of drive for one trip today. (50)",
  ],
  news: [
    "Wind and solar surpassed coal in energy production for the first time this year. (1)",
    "Global plastic treaty negotiations reach historic consensus. (2)",
    "Major retailer commits to fully circular packaging by 2030. (3)",
    "Indigenous land practices recognized in new UN biodiversity goals. (4)",
    "Breakthrough algae-based materials set to replace styrofoam. (5)",
    "Largest coral restoration project in history reports 70% survival rate. (6)",
    "Global rewilding efforts increase animal populations in degraded zones. (7)",
    "Cities incentivize green roofs to combat urban heat. (8)",
    "Farmers adopt AI to optimize water use and reduce waste. (9)",
    "Carbon capture farms see investment from top climate funds. (10)",
    "Wind and solar surpassed coal in energy production for the first time this year. (11)",
    "Global plastic treaty negotiations reach historic consensus. (12)",
    "Major retailer commits to fully circular packaging by 2030. (13)",
    "Indigenous land practices recognized in new UN biodiversity goals. (14)",
    "Breakthrough algae-based materials set to replace styrofoam. (15)",
    "Largest coral restoration project in history reports 70% survival rate. (16)",
    "Global rewilding efforts increase animal populations in degraded zones. (17)",
    "Cities incentivize green roofs to combat urban heat. (18)",
    "Farmers adopt AI to optimize water use and reduce waste. (19)",
    "Carbon capture farms see investment from top climate funds. (20)",
    "Wind and solar surpassed coal in energy production for the first time this year. (21)",
    "Global plastic treaty negotiations reach historic consensus. (22)",
    "Major retailer commits to fully circular packaging by 2030. (23)",
    "Indigenous land practices recognized in new UN biodiversity goals. (24)",
    "Breakthrough algae-based materials set to replace styrofoam. (25)",
    "Largest coral restoration project in history reports 70% survival rate. (26)",
    "Global rewilding efforts increase animal populations in degraded zones. (27)",
    "Cities incentivize green roofs to combat urban heat. (28)",
    "Farmers adopt AI to optimize water use and reduce waste. (29)",
    "Carbon capture farms see investment from top climate funds. (30)",
    "Wind and solar surpassed coal in energy production for the first time this year. (31)",
    "Global plastic treaty negotiations reach historic consensus. (32)",
    "Major retailer commits to fully circular packaging by 2030. (33)",
    "Indigenous land practices recognized in new UN biodiversity goals. (34)",
    "Breakthrough algae-based materials set to replace styrofoam. (35)",
    "Largest coral restoration project in history reports 70% survival rate. (36)",
    "Global rewilding efforts increase animal populations in degraded zones. (37)",
    "Cities incentivize green roofs to combat urban heat. (38)",
    "Farmers adopt AI to optimize water use and reduce waste. (39)",
    "Carbon capture farms see investment from top climate funds. (40)",
    "Wind and solar surpassed coal in energy production for the first time this year. (41)",
    "Global plastic treaty negotiations reach historic consensus. (42)",
    "Major retailer commits to fully circular packaging by 2030. (43)",
    "Indigenous land practices recognized in new UN biodiversity goals. (44)",
    "Breakthrough algae-based materials set to replace styrofoam. (45)",
    "Largest coral restoration project in history reports 70% survival rate. (46)",
    "Global rewilding efforts increase animal populations in degraded zones. (47)",
    "Cities incentivize green roofs to combat urban heat. (48)",
    "Farmers adopt AI to optimize water use and reduce waste. (49)",
    "Carbon capture farms see investment from top climate funds. (50)",
  ],
  questions: [
    "What’s one story of nature you wish everyone could hear? (1)",
    "Where do you feel most connected to the Earth? (2)",
    "How does sustainability show up in your daily decisions? (3)",
    "If nature could speak, what do you think it would say to us? (4)",
    "What would your perfect eco-friendly day look like? (5)",
    "How have your habits changed in the past year for the planet? (6)",
    "What scares you most—and what excites you most—about the future? (7)",
    "What would an ancestor from 200 years ago think of your lifestyle? (8)",
    "What advice would you give to someone starting their sustainability journey? (9)",
    "What makes you feel hopeful about the planet? (10)",
    "What’s one story of nature you wish everyone could hear? (11)",
    "Where do you feel most connected to the Earth? (12)",
    "How does sustainability show up in your daily decisions? (13)",
    "If nature could speak, what do you think it would say to us? (14)",
    "What would your perfect eco-friendly day look like? (15)",
    "How have your habits changed in the past year for the planet? (16)",
    "What scares you most—and what excites you most—about the future? (17)",
    "What would an ancestor from 200 years ago think of your lifestyle? (18)",
    "What advice would you give to someone starting their sustainability journey? (19)",
    "What makes you feel hopeful about the planet? (20)",
    "What’s one story of nature you wish everyone could hear? (21)",
    "Where do you feel most connected to the Earth? (22)",
    "How does sustainability show up in your daily decisions? (23)",
    "If nature could speak, what do you think it would say to us? (24)",
    "What would your perfect eco-friendly day look like? (25)",
    "How have your habits changed in the past year for the planet? (26)",
    "What scares you most—and what excites you most—about the future? (27)",
    "What would an ancestor from 200 years ago think of your lifestyle? (28)",
    "What advice would you give to someone starting their sustainability journey? (29)",
    "What makes you feel hopeful about the planet? (30)",
    "What’s one story of nature you wish everyone could hear? (31)",
    "Where do you feel most connected to the Earth? (32)",
    "How does sustainability show up in your daily decisions? (33)",
    "If nature could speak, what do you think it would say to us? (34)",
    "What would your perfect eco-friendly day look like? (35)",
    "How have your habits changed in the past year for the planet? (36)",
    "What scares you most—and what excites you most—about the future? (37)",
    "What would an ancestor from 200 years ago think of your lifestyle? (38)",
    "What advice would you give to someone starting their sustainability journey? (39)",
    "What makes you feel hopeful about the planet? (40)",
    "What’s one story of nature you wish everyone could hear? (41)",
    "Where do you feel most connected to the Earth? (42)",
    "How does sustainability show up in your daily decisions? (43)",
    "If nature could speak, what do you think it would say to us? (44)",
    "What would your perfect eco-friendly day look like? (45)",
    "How have your habits changed in the past year for the planet? (46)",
    "What scares you most—and what excites you most—about the future? (47)",
    "What would an ancestor from 200 years ago think of your lifestyle? (48)",
    "What advice would you give to someone starting their sustainability journey? (49)",
    "What makes you feel hopeful about the planet? (50)",
  ],
  jokes: [
    "Why did the compost break up with the trash? It felt dumped on! 🌱 (1)",
    "What’s a solar panel’s favorite kind of music? Anything with a good current! ⚡ (2)",
    "Why did the bicycle fall over? It was two-tired from saving the planet! 🚲 (3)",
    "Why don't trees ever get into trouble? They always leaf the scene. 🍃 (4)",
    "Why did the mushroom start a garden club? Because he was a real fun-gi! 🍄 (5)",
    "What’s a wind turbine’s favorite type of humor? Whirly puns! 💨 (6)",
    "Why did the eco-warrior refuse to use paper? Because she didn’t want to draw the line! ✏️ (7)",
    "Why did the frog call for climate action? He was in a sticky swamp situation! 🐸 (8)",
    "Why do recyclers love dad jokes? Because they keep coming back around! ♻️ (9)",
    "Why did the squirrel get a job in tech? To optimize nut-zero emissions! 🐿️ (10)",
    "Why did the compost break up with the trash? It felt dumped on! 🌱 (11)",
    "What’s a solar panel’s favorite kind of music? Anything with a good current! ⚡ (12)",
    "Why did the bicycle fall over? It was two-tired from saving the planet! 🚲 (13)",
    "Why don't trees ever get into trouble? They always leaf the scene. 🍃 (14)",
    "Why did the mushroom start a garden club? Because he was a real fun-gi! 🍄 (15)",
    "What’s a wind turbine’s favorite type of humor? Whirly puns! 💨 (16)",
    "Why did the eco-warrior refuse to use paper? Because she didn’t want to draw the line! ✏️ (17)",
    "Why did the frog call for climate action? He was in a sticky swamp situation! 🐸 (18)",
    "Why do recyclers love dad jokes? Because they keep coming back around! ♻️ (19)",
    "Why did the squirrel get a job in tech? To optimize nut-zero emissions! 🐿️ (20)",
    "Why did the compost break up with the trash? It felt dumped on! 🌱 (21)",
    "What’s a solar panel’s favorite kind of music? Anything with a good current! ⚡ (22)",
    "Why did the bicycle fall over? It was two-tired from saving the planet! 🚲 (23)",
    "Why don't trees ever get into trouble? They always leaf the scene. 🍃 (24)",
    "Why did the mushroom start a garden club? Because he was a real fun-gi! 🍄 (25)",
    "What’s a wind turbine’s favorite type of humor? Whirly puns! 💨 (26)",
    "Why did the eco-warrior refuse to use paper? Because she didn’t want to draw the line! ✏️ (27)",
    "Why did the frog call for climate action? He was in a sticky swamp situation! 🐸 (28)",
    "Why do recyclers love dad jokes? Because they keep coming back around! ♻️ (29)",
    "Why did the squirrel get a job in tech? To optimize nut-zero emissions! 🐿️ (30)",
    "Why did the compost break up with the trash? It felt dumped on! 🌱 (31)",
    "What’s a solar panel’s favorite kind of music? Anything with a good current! ⚡ (32)",
    "Why did the bicycle fall over? It was two-tired from saving the planet! 🚲 (33)",
    "Why don't trees ever get into trouble? They always leaf the scene. 🍃 (34)",
    "Why did the mushroom start a garden club? Because he was a real fun-gi! 🍄 (35)",
    "What’s a wind turbine’s favorite type of humor? Whirly puns! 💨 (36)",
    "Why did the eco-warrior refuse to use paper? Because she didn’t want to draw the line! ✏️ (37)",
    "Why did the frog call for climate action? He was in a sticky swamp situation! 🐸 (38)",
    "Why do recyclers love dad jokes? Because they keep coming back around! ♻️ (39)",
    "Why did the squirrel get a job in tech? To optimize nut-zero emissions! 🐿️ (40)",
    "Why did the compost break up with the trash? It felt dumped on! 🌱 (41)",
    "What’s a solar panel’s favorite kind of music? Anything with a good current! ⚡ (42)",
    "Why did the bicycle fall over? It was two-tired from saving the planet! 🚲 (43)",
    "Why don't trees ever get into trouble? They always leaf the scene. 🍃 (44)",
    "Why did the mushroom start a garden club? Because he was a real fun-gi! 🍄 (45)",
    "What’s a wind turbine’s favorite type of humor? Whirly puns! 💨 (46)",
    "Why did the eco-warrior refuse to use paper? Because she didn’t want to draw the line! ✏️ (47)",
    "Why did the frog call for climate action? He was in a sticky swamp situation! 🐸 (48)",
    "Why do recyclers love dad jokes? Because they keep coming back around! ♻️ (49)",
    "Why did the squirrel get a job in tech? To optimize nut-zero emissions! 🐿️ (50)",
  ],
};

const inspirationalQuotes = [
  "Stay uncomfortable to be at the edges of change. — Bhargavi, K2A Academy (1)",
  "Growth happens when we embrace the uncertainty of tomorrow. — Anonymous (2)",
  "The future belongs to those who act today. — Environmental Activist (3)",
  "Be still long enough to hear the Earth whisper back. — Arjun (4)",
  "Hope begins with action, not optimism. — Climate Advocate (5)",
  "Stay uncomfortable to be at the edges of change. — Bhargavi, K2A Academy (6)",
  "Growth happens when we embrace the uncertainty of tomorrow. — Anonymous (7)",
  "The future belongs to those who act today. — Environmental Activist (8)",
  "Be still long enough to hear the Earth whisper back. — Arjun (9)",
  "Hope begins with action, not optimism. — Climate Advocate (10)",
  "Stay uncomfortable to be at the edges of change. — Bhargavi, K2A Academy (11)",
  "Growth happens when we embrace the uncertainty of tomorrow. — Anonymous (12)",
  "The future belongs to those who act today. — Environmental Activist (13)",
  "Be still long enough to hear the Earth whisper back. — Arjun (14)",
  "Hope begins with action, not optimism. — Climate Advocate (15)",
  "Stay uncomfortable to be at the edges of change. — Bhargavi, K2A Academy (16)",
  "Growth happens when we embrace the uncertainty of tomorrow. — Anonymous (17)",
  "The future belongs to those who act today. — Environmental Activist (18)",
  "Be still long enough to hear the Earth whisper back. — Arjun (19)",
  "Hope begins with action, not optimism. — Climate Advocate (20)",
  "Stay uncomfortable to be at the edges of change. — Bhargavi, K2A Academy (21)",
  "Growth happens when we embrace the uncertainty of tomorrow. — Anonymous (22)",
  "The future belongs to those who act today. — Environmental Activist (23)",
  "Be still long enough to hear the Earth whisper back. — Arjun (24)",
  "Hope begins with action, not optimism. — Climate Advocate (25)",
  "Stay uncomfortable to be at the edges of change. — Bhargavi, K2A Academy (26)",
  "Growth happens when we embrace the uncertainty of tomorrow. — Anonymous (27)",
  "The future belongs to those who act today. — Environmental Activist (28)",
  "Be still long enough to hear the Earth whisper back. — Arjun (29)",
  "Hope begins with action, not optimism. — Climate Advocate (30)",
  "Stay uncomfortable to be at the edges of change. — Bhargavi, K2A Academy (31)",
  "Growth happens when we embrace the uncertainty of tomorrow. — Anonymous (32)",
  "The future belongs to those who act today. — Environmental Activist (33)",
  "Be still long enough to hear the Earth whisper back. — Arjun (34)",
  "Hope begins with action, not optimism. — Climate Advocate (35)",
  "Stay uncomfortable to be at the edges of change. — Bhargavi, K2A Academy (36)",
  "Growth happens when we embrace the uncertainty of tomorrow. — Anonymous (37)",
  "The future belongs to those who act today. — Environmental Activist (38)",
  "Be still long enough to hear the Earth whisper back. — Arjun (39)",
  "Hope begins with action, not optimism. — Climate Advocate (40)",
  "Stay uncomfortable to be at the edges of change. — Bhargavi, K2A Academy (41)",
  "Growth happens when we embrace the uncertainty of tomorrow. — Anonymous (42)",
  "The future belongs to those who act today. — Environmental Activist (43)",
  "Be still long enough to hear the Earth whisper back. — Arjun (44)",
  "Hope begins with action, not optimism. — Climate Advocate (45)",
  "Stay uncomfortable to be at the edges of change. — Bhargavi, K2A Academy (46)",
  "Growth happens when we embrace the uncertainty of tomorrow. — Anonymous (47)",
  "The future belongs to those who act today. — Environmental Activist (48)",
  "Be still long enough to hear the Earth whisper back. — Arjun (49)",
  "Hope begins with action, not optimism. — Climate Advocate (50)",
];

const slotSymbols = ['●', '▲', '■', '◆', '★', '♦', '▼', '◀', '▶', '♠', '♣', '♥', '⬢', '⬟', '⚡', '☀', '🌙', '⭐', '🔥', '💧'];

// PART 1 COMPONENTS: Opening + Drawing

const OpeningSequence = ({ onComplete }) => {
  const [phase, setPhase] = useState('initial');
  const [shapeScale, setShapeScale] = useState(0.1);
  const [breatheScale, setBreatheScale] = useState(1);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Phase 1: Small shape appears (0.5s)
    setTimeout(() => setPhase('growing'), 500);

    // Phase 2: Shape grows smoothly over 3 seconds
    const growthDuration = 3000;
    const growthSteps = 60;
    const stepDuration = growthDuration / growthSteps;
    
    setTimeout(() => {
      let currentStep = 0;
      const growInterval = setInterval(() => {
        currentStep++;
        const progress = currentStep / growthSteps;
        const newScale = 0.1 + (0.9 * progress);
        setShapeScale(newScale);
        
        if (currentStep >= growthSteps) {
          clearInterval(growInterval);
          setPhase('breathing');
          
          // Start breathing animation
          const breatheInterval = setInterval(() => {
            setBreatheScale(prev => prev === 1 ? 1.1 : 1);
          }, 2000);
          
          // Show text after breathing starts
          setTimeout(() => setShowText(true), 1000);
          
          // Complete sequence
          setTimeout(() => {
            clearInterval(breatheInterval);
            onComplete();
          }, 4000);
        }
      }, stepDuration);
    }, 500);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center overflow-hidden">
      {/* Morphing Shape */}
      <div className="relative flex items-center justify-center">
        <div 
          className="bg-black transition-all duration-100 ease-out"
          style={{
            width: `${20 + shapeScale * 100}px`,
            height: `${20 + shapeScale * 100}px`,
            clipPath: shapeScale < 0.3 ? 'circle(50%)' :
                     shapeScale < 0.7 ? `polygon(50% 0%, ${70 + shapeScale * 15}% 35%, 65% 90%, 35% 90%, ${30 - shapeScale * 15}% 35%)` :
                     'polygon(50% 0%, 85% 35%, 65% 90%, 35% 90%, 15% 35%)',
            transform: `scale(${phase === 'breathing' ? breatheScale : 1})`,
            opacity: Math.min(shapeScale + 0.3, 1)
          }}
        />
        
        <div 
          className="absolute bg-black opacity-5 blur-lg"
          style={{
            width: `${30 + shapeScale * 120}px`,
            height: `${30 + shapeScale * 120}px`,
            transform: `scale(${phase === 'breathing' ? breatheScale * 1.1 : 1.1})`,
          }}
        />
      </div>

      {/* Welcome Text Overlay */}
      {showText && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95">
          <div className="text-center slide-up-animation">
            <h1 className="text-6xl font-thin text-gray-900 mb-8 tracking-tight">Ora</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-4">Welcome to Ora.</p>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                One breath. One shape. One shift.<br/>
                This is your moment at the edge of change.
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up-gentle {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        .slide-up-animation {
          animation: slide-up-gentle 1s ease-out;
        }
        canvas {
  width: 100%;
  height: 400px; 
  display: block;
}
      `}</style>
    </div>
  );
};

const RandomQuote = () => {
  const [currentQuote, setCurrentQuote] = useState('');
  
  useEffect(() => {
    if (Math.random() < 0.3) {
      const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
      setCurrentQuote(randomQuote);
    }
  }, []);

  if (!currentQuote) return null;

  return (
    <div className="text-center mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
      <p className="text-gray-700 italic font-light text-sm leading-relaxed">
        {currentQuote}
      </p>
    </div>
  );
};

const DrawingCanvas = ({ onDrawingChange, onDrawingCapture }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: ((e.clientX || e.touches?.[0]?.clientX) - rect.left) * scaleX / (window.devicePixelRatio || 1),
      y: ((e.clientY || e.touches?.[0]?.clientY) - rect.top) * scaleY / (window.devicePixelRatio || 1)
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    setHasDrawn(true);
    const pos = getMousePos(e);
    
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const pos = getMousePos(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    setIsDrawing(false);
    onDrawingChange(hasDrawn);
    
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    onDrawingCapture(dataURL);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    onDrawingChange(false);
    onDrawingCapture(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-96 border-2 border-gray-200 rounded-lg cursor-crosshair touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        style={{ touchAction: 'none' }}
      />
      <button
        onClick={clearCanvas}
        className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        Clear Canvas
      </button>
    </div>
  );
};

const EvolvingShape = ({ isActive }) => {
  const [breatheScale, setBreatheScale] = useState(1);
  
  useEffect(() => {
    if (!isActive) return;
    
    const breatheInterval = setInterval(() => {
      setBreatheScale(prev => prev === 1 ? 1.15 : 1);
    }, 1200);
    
    return () => clearInterval(breatheInterval);
  }, [isActive]);

  return (
    <div className="flex justify-center my-8">
      <div className="relative">
        <div className={`absolute top-2 left-0 w-16 h-16 bg-black opacity-20 rounded-full blur-sm transition-all duration-300 ${
          isActive ? 'scale-110' : 'scale-100'
        }`} style={{
          transform: `scale(${breatheScale * (isActive ? 1.1 : 1)}) translateY(2px)`,
        }} />
        
        <div 
          className={`w-16 h-16 bg-black transition-all duration-300 ${
            isActive ? 'opacity-90' : 'opacity-100'
          }`} 
          style={{
            clipPath: isActive ? 'polygon(50% 0%, 85% 35%, 65% 90%, 35% 90%, 15% 35%)' : 'circle(50%)',
            transform: `scale(${breatheScale * (isActive ? 1.1 : 1)})`,
          }} 
        />
      </div>
    </div>
  );
};

// PART 2 COMPONENTS: AI Animation + Story Mode

const MatrixRain = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 text-green-400 text-xs font-mono whitespace-nowrap matrix-rain"
          style={{
            left: `${i * 7}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          {Array.from({length: 20}, () => 
            Math.random() > 0.5 ? String.fromCharCode(0x30A0 + Math.random() * 96) : Math.floor(Math.random() * 10)
          ).join('')}
        </div>
      ))}
      <style>{`
        @keyframes matrix-fall {
          0% { transform: translateY(-100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .matrix-rain {
          animation: matrix-fall linear infinite;
          animation-duration: ${4 + Math.random() * 6}s;
        }
      `}</style>
    </div>
  );
};

const AIWaveform = () => {
  const [phase, setPhase] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => prev + 0.1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-96 h-20">
      <svg width="100%" height="100%" className="opacity-60">
        <path
          d={`M0,40 ${Array.from({length: 50}, (_, i) => 
            `L${i * 8},${40 + Math.sin(phase + i * 0.3) * 15 + Math.sin(phase * 2 + i * 0.1) * 5}`
          ).join(' ')}`}
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ff88" />
            <stop offset="50%" stopColor="#0088ff" />
            <stop offset="100%" stopColor="#8800ff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const SlotMachine = ({ finalSymbols }) => {
  const [currentSymbols, setCurrentSymbols] = useState(['●', '●', '●', '●', '●', '●']);
  const [isSpinning, setIsSpinning] = useState(true);
  
  useEffect(() => {
    if (!isSpinning) return;
    
    const spinInterval = setInterval(() => {
      setCurrentSymbols(prev => prev.map(() => 
        slotSymbols[Math.floor(Math.random() * slotSymbols.length)]
      ));
    }, 150);
    
    const stopTimer = setTimeout(() => {
      setIsSpinning(false);
      setCurrentSymbols(finalSymbols);
    }, 5000);
    
    return () => {
      clearInterval(spinInterval);
      clearTimeout(stopTimer);
    };
  }, [finalSymbols]);
  
  return (
    <div className="flex justify-center items-center space-x-6 my-12">
      {currentSymbols.map((symbol, index) => (
        <div
          key={index}
          className={`w-20 h-20 bg-black bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-2xl flex items-center justify-center text-3xl font-bold transition-all duration-300 ${
            isSpinning ? 'animate-pulse' : 'animate-bounce'
          }`}
          style={{ 
            animationDelay: `${index * 200}ms`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }}
        >
          <span className="text-white drop-shadow-lg">{symbol}</span>
        </div>
      ))}
    </div>
  );
};

const ModernAIAnimation = ({ onComplete, finalSymbols }) => {
  const [phase, setPhase] = useState('initializing');
  const [countdown, setCountdown] = useState(3);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Phase 1: Initializing (2s)
    const phase1Timer = setTimeout(() => setPhase('processing'), 2000);
    
    // Phase 2: Processing with progress (5s)
    const phase2Timer = setTimeout(() => {
      setPhase('finalizing');
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setPhase('countdown');
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }, 2000);
    
    return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
    };
  }, []);
  
  useEffect(() => {
    if (phase === 'countdown') {
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setTimeout(onComplete, 1000);
            return 0;
          }
          return prev - 1;
        });
      }, 1500);
      
      return () => clearInterval(countdownInterval);
    }
  }, [phase, onComplete]);
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center z-50">
      <MatrixRain />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-70 floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-cyan-400 rotating-shape"
            style={{
              width: `${50 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl px-8">
        {phase === 'initializing' && (
          <div className="fade-in-animation">
            <h2 className="text-5xl font-thin text-white mb-8 tracking-wide">
              Awakening AI Consciousness
            </h2>
            <div className="flex justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 1}s` }}
                />
              ))}
            </div>
          </div>
        )}
        
        {phase === 'processing' && (
          <div className="fade-in-animation">
            <h2 className="text-4xl font-thin text-white mb-12 tracking-wide">
              Quantum Processing Your Drawing
            </h2>
            <SlotMachine finalSymbols={finalSymbols} />
            <AIWaveform />
          </div>
        )}
        
        {phase === 'finalizing' && (
          <div className="fade-in-animation">
            <h2 className="text-4xl font-thin text-white mb-8 tracking-wide">
              Crystallizing Insights
            </h2>
            <div className="w-96 h-2 bg-gray-800 rounded-full mx-auto mb-8 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-cyan-300 text-lg">{progress}% Complete</p>
          </div>
        )}
        
        {phase === 'countdown' && (
          <div className="fade-in-animation">
            <h2 className="text-4xl font-thin text-white mb-12 tracking-wide">
              Your Ora Manifests
            </h2>
            <SlotMachine finalSymbols={finalSymbols} />
            {countdown > 0 ? (
              <div className="text-8xl font-thin text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">
                {countdown}
              </div>
            ) : (
              <div className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 animate-bounce">
                ✦ Consciousness Aligned ✦
              </div>
            )}
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-animation {
          animation: fade-in 1s ease-out;
        }
        .floating-particle {
          animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
        }
        .rotating-shape {
          animation: rotate ${8 + Math.random() * 12}s linear infinite;
        }
      `}</style>
    </div>
  );
};

const StoryMode = ({ isOpen, onClose, cardData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(APP_CONFIG.STORY_AUTO_ADVANCE);
  const [isAutoStarted, setIsAutoStarted] = useState(false);
  const [storyTimer, setStoryTimer] = useState(null);

  // Auto-start the journey after a brief delay
  useEffect(() => {
    if (isOpen && !isAutoStarted) {
      const autoStartTimer = setTimeout(() => {
        setIsAutoStarted(true);
      }, 1000);
      return () => clearTimeout(autoStartTimer);
    }
  }, [isOpen, isAutoStarted]);

  // Main story progression timer
  useEffect(() => {
    if (!isOpen || !isPlaying || !isAutoStarted) return;

    const timer = setTimeout(() => {
      setCurrentIndex(prev => {
        if (prev >= cardData.length - 1) {
          setIsPlaying(false);
          setTimeout(() => onClose(), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, APP_CONFIG.STORY_SLIDE_DURATION);

    setStoryTimer(timer);
    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, cardData.length, isAutoStarted, currentIndex, onClose]);

  // Cleanup timer when component unmounts or modal closes
  useEffect(() => {
    if (!isOpen) {
      if (storyTimer) {
        clearTimeout(storyTimer);
        setStoryTimer(null);
      }
      setCurrentIndex(0);
      setIsPlaying(APP_CONFIG.STORY_AUTO_ADVANCE);
      setIsAutoStarted(false);
    }
  }, [isOpen, storyTimer]);

  const handleNext = () => {
    if (storyTimer) {
      clearTimeout(storyTimer);
      setStoryTimer(null);
    }
    
    if (currentIndex < cardData.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (storyTimer) {
      clearTimeout(storyTimer);
      setStoryTimer(null);
    }
    
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const togglePlay = () => {
    if (storyTimer) {
      clearTimeout(storyTimer);
      setStoryTimer(null);
    }
    setIsPlaying(!isPlaying);
  };

  if (!isOpen) return null;

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const currentCard = cardData[currentIndex];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 z-50 flex flex-col overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-200 to-purple-200 gentle-float"
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-400 rounded-full drift-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Date at top */}
      <div className="text-center py-6 relative z-10">
        <p className="text-sm font-light text-gray-500 tracking-wide uppercase">
          {today}
        </p>
      </div>

      {/* Progress bars */}
      <div className="flex space-x-1 px-6 mb-4 relative z-10">
        {cardData.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r from-gray-700 to-gray-900 transition-all ${
                index < currentIndex ? 'w-full' : 
                index === currentIndex && isPlaying ? 'w-full progress-animation' : 
                index === currentIndex ? 'w-1/2' : 'w-0'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 relative z-10">
        <h2 className="text-xl font-light text-gray-900 tracking-wide">Your Ora Journey</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-2xl transition-colors duration-200"
        >
          ×
        </button>
      </div>

      {/* Story Content with fade animations */}
      <div className="flex-1 flex items-center justify-center px-8 relative z-10">
        <div 
          key={currentIndex}
          className="max-w-3xl text-center story-content"
        >
          <div className="text-7xl mb-8 opacity-20 symbol-float">
            {currentCard.symbol}
          </div>
          <h3 className="text-4xl font-light text-gray-900 mb-8 tracking-tight leading-tight slide-up">
            {currentCard.title}
          </h3>
          <p className="text-xl text-gray-600 leading-relaxed font-light max-w-2xl mx-auto slide-up-delay">
            {currentCard.content}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center space-x-8 p-8 relative z-10">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
        >
          <span className="text-gray-700">←</span>
        </button>
        
        <button
          onClick={togglePlay}
          className="p-4 rounded-full bg-gray-900 hover:bg-gray-800 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        
        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow-lg transition-all duration-200 backdrop-blur-sm"
        >
          <span className="text-gray-700">→</span>
        </button>
      </div>

      {/* Tap zones for mobile navigation - only if enabled */}
      {APP_CONFIG.ENABLE_TAP_NAVIGATION && (
        <div className="absolute inset-0 flex z-20">
          <div className="flex-1" onClick={handlePrev} />
          <div className="flex-1" onClick={handleNext} />
        </div>
      )}

      <style>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-20px) translateX(10px) rotate(120deg); }
          66% { transform: translateY(10px) translateX(-15px) rotate(240deg); }
        }
        
        @keyframes drift {
          0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
        }
        
        @keyframes story-fade {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }
        
        @keyframes symbol-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        
        @keyframes progress-slow {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .gentle-float {
          animation: float-gentle ${6 + Math.random() * 8}s ease-in-out infinite;
        }
        
        .drift-particle {
          animation: drift ${8 + Math.random() * 12}s linear infinite;
        }
        
        .story-content {
          animation: story-fade 0.8s ease-out;
        }
        
        .symbol-float {
          animation: symbol-float 3s ease-in-out infinite;
        }
        
        .slide-up {
          animation: slide-up 0.6s ease-out 0.2s both;
        }
        
        .slide-up-delay {
          animation: slide-up 0.6s ease-out 0.4s both;
        }
        
        .progress-animation {
          animation: progress-slow ${APP_CONFIG.STORY_SLIDE_DURATION}ms linear;
        }
      `}</style>
    </div>
  );
};

const ResultCard = ({ title, content, symbol, isLight = true }) => {
  return (
    <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
      isLight ? 'bg-white border border-gray-100' : 'bg-gray-900 text-white'
    }`}>
      <div className="flex items-start space-x-4">
        <div className={`text-2xl ${isLight ? 'opacity-40' : 'opacity-60'}`}>{symbol}</div>
        <div>
          <h3 className="font-medium mb-2">{title}</h3>
          <p className="text-sm opacity-80 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
};

// Feedback Component (only shows if enabled)
const FeedbackSection = ({ onFeedback }) => {
  if (!APP_CONFIG.ENABLE_FEEDBACK) return null;
  
  const sendFeedback = (type) => {
    if (APP_CONFIG.EMAIL_METHOD === 'mailto') {
      const subject = `Ora Feedback - ${type}`;
      const body = `Hi there,\n\nI wanted to share some feedback about Ora:\n\n[Your feedback here]\n\nThanks!`;
      window.location.href = `mailto:${APP_CONFIG.CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      // API integration would go here
      onFeedback?.(type);
    }
  };
  
  return (
    <div className="text-center py-8 border-t border-gray-200">
      <p className="text-gray-600 mb-4 font-light">How was your Ora experience?</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => sendFeedback('positive')}
          className="px-6 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-full transition-colors text-sm"
        >
          ✨ Loved it
        </button>
        <button
          onClick={() => sendFeedback('suggestion')}
          className="px-6 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full transition-colors text-sm"
        >
          💡 Suggestion
        </button>
        <button
          onClick={() => sendFeedback('issue')}
          className="px-6 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-full transition-colors text-sm"
        >
          🐛 Issue
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [showOpening, setShowOpening] = useState(!APP_CONFIG.SKIP_OPENING);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showStoryMode, setShowStoryMode] = useState(false);
  const [drawingData, setDrawingData] = useState(null);
  const [results, setResults] = useState({});

  const generateResults = () => {
    const seed = Date.now();
    const getRandomItem = (arr, offset = 0) => {
      const index = Math.floor((Math.sin(seed + offset) * 10000) % arr.length);
      return arr[Math.abs(index)];
    };
    
    const symbols = [];
    for (let i = 0; i < 6; i++) {
      symbols.push(slotSymbols[Math.floor((seed + i) % slotSymbols.length)]);
    }
    
    const content = {
      quote: getRandomItem(mockData.quotes, 1),
      thought: getRandomItem(mockData.thoughts, 2),
      action: getRandomItem(mockData.actions, 3),
      news: getRandomItem(mockData.news, 4),
      question: getRandomItem(mockData.questions, 5),
      joke: getRandomItem(mockData.jokes, 6),
      symbols
    };
    
    setResults(content);
    setShowAnimation(true);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    
    // KEY FIX: Auto-play story mode if configured
    if (APP_CONFIG.AUTO_PLAY_STORY_FIRST) {
      setShowStoryMode(true);
    } else {
      setShowResults(true);
    }
  };

  const handleStoryComplete = () => {
    setShowStoryMode(false);
    setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setShowAnimation(false);
    setShowStoryMode(false);
    setHasDrawn(false);
    setDrawingData(null);
    setResults({});
  };

  // Skip opening if configured for testing
  if (showOpening && !APP_CONFIG.SKIP_OPENING) {
    return <OpeningSequence onComplete={() => setShowOpening(false)} />;
  }

  const cardData = [
    { title: "Ora Light", content: results.quote, symbol: results.symbols?.[0] },
    { title: "Ora Thought", content: results.thought, symbol: results.symbols?.[1] },
    { title: "Ora Act", content: results.action, symbol: results.symbols?.[2] },
    { title: "Ora Signal", content: results.news, symbol: results.symbols?.[3] },
    { title: "Ora Ask", content: results.question, symbol: results.symbols?.[4] },
    { title: "Ora Smile", content: results.joke, symbol: results.symbols?.[5] }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-thin text-gray-900 mb-6 tracking-tight">Ora</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-4">Welcome to Ora.</p>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                One breath. One shape. One shift.<br/>
                This is your moment at the edge of change.
              </p>
            </div>
            <RandomQuote />
          </div>

          {!showResults ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-light text-gray-700 mb-2">Express yourself</h2>
                <p className="text-gray-500 mb-6 font-light">Draw something to get your personalized Ora</p>
                <DrawingCanvas onDrawingChange={setHasDrawn} onDrawingCapture={setDrawingData} />
              </div>

              <EvolvingShape isActive={hasDrawn} />

              <div className="text-center mb-12">
                <button
                  onClick={generateResults}
                  className="px-12 py-4 bg-black text-white rounded-full text-xl font-light hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  Begin Your Ora
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-16">
                <h2 className="text-5xl font-light text-gray-900 mb-4 tracking-tight">Your Ora</h2>
                <p className="text-gray-500 text-lg font-light mb-8">Discover insights crafted just for you</p>
                <EvolvingShape isActive={true} />
              </div>

              {/* Play Button for Story Mode - only show if not auto-playing */}
              {!APP_CONFIG.AUTO_PLAY_STORY_FIRST && (
                <div className="text-center mb-12">
                  <button
                    onClick={() => setShowStoryMode(true)}
                    className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto"
                  >
                    <span>▶</span>
                    <span className="font-light">Play Your Journey</span>
                  </button>
                </div>
              )}

              {drawingData && (
                <div className="mb-16">
                  <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 max-w-md mx-auto">
                    <h3 className="text-xl font-medium text-gray-900 mb-6 text-center">Your Expression</h3>
                    <div className="flex justify-center mb-6">
                      <img src={drawingData} alt="Your drawing" className="max-w-full h-32 object-contain rounded-2xl shadow-sm" />
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.download = 'my-ora-drawing.png';
                          link.href = drawingData;
                          link.click();
                        }}
                        className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 text-sm font-medium"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
                <ResultCard title={cardData[0].title} content={cardData[0].content} symbol={cardData[0].symbol} isLight={true} />
                <ResultCard title={cardData[1].title} content={cardData[1].content} symbol={cardData[1].symbol} isLight={false} />
                <ResultCard title={cardData[2].title} content={cardData[2].content} symbol={cardData[2].symbol} isLight={true} />
                <ResultCard title={cardData[3].title} content={cardData[3].content} symbol={cardData[3].symbol} isLight={false} />
                <ResultCard title={cardData[4].title} content={cardData[4].content} symbol={cardData[4].symbol} isLight={true} />
                <ResultCard title={cardData[5].title} content={cardData[5].content} symbol={cardData[5].symbol} isLight={false} />
              </div>

              {/* Feedback Section */}
              <FeedbackSection />

              <div className="text-center pb-8">
                <button
                  onClick={handleReset}
                  className="px-12 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-all duration-300 transform hover:scale-105 text-lg font-light tracking-wide shadow-lg"
                >
                  Create Again
                </button>
              </div>
            </>
          )}
          
          {/* AI Animation Overlay */}
          {showAnimation && (
            <ModernAIAnimation 
              onComplete={handleAnimationComplete} 
              finalSymbols={results.symbols || []}
            />
          )}

          {/* Story Mode Overlay */}
          <StoryMode 
            isOpen={showStoryMode} 
            onClose={handleStoryComplete}
            cardData={cardData}
          />
        </div>
      </div>

      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>
            Ora is a K2A assignment submitted by{' '}
            <a
              href="http://linkedin.com/in/arjunshrivatsan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Arjun Shrivatsan
            </a>{' '}
            from{' '}
            <a
              href="http://innocencetheory.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Innocence Theory Podcast
            </a>
          </p>
        </div>
      </footer>
    </div>  
  );
}
