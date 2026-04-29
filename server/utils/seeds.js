const db = require('../config/connection');
const { Activity } = require('../models');

const activities = [
  {
    title: "Found a wallet",
    scenarioText: "You find a wallet full of cash.",
    choices: [
      { text: "Return it", isCorrect: true, feedback: "You chose integrity." },
      { text: "Keep it", isCorrect: false, feedback: "That harms someone else." }
    ],
    difficulty: "easy",
    order: 1,
    xpReward: 10
  },
  {
    title: "Cheating on a test",
    scenarioText: "You see someone cheating during an exam.",
    choices: [
      { text: "Report it", isCorrect: true, feedback: "Fairness matters." },
      { text: "Ignore it", isCorrect: false, feedback: "This allows unfair advantage." }
    ],
    difficulty: "easy",
    order: 2,
    xpReward: 10
  },
  {
    title: "Extra change",
    scenarioText: "A cashier gives you too much change.",
    choices: [
      { text: "Give it back", isCorrect: true, feedback: "Honesty builds trust." },
      { text: "Keep it", isCorrect: false, feedback: "It's not yours to keep." }
    ],
    difficulty: "easy",
    order: 3,
    xpReward: 10
  },
  {
    title: "Group project",
    scenarioText: "Your teammate isn't contributing to a group project.",
    choices: [
      { text: "Talk to them", isCorrect: true, feedback: "Communication is key." },
      { text: "Do all the work yourself", isCorrect: false, feedback: "This avoids the problem." }
    ],
    difficulty: "easy",
    order: 4,
    xpReward: 10
  },
  {
    title: "Lost phone",
    scenarioText: "You find a phone left on a bench.",
    choices: [
      { text: "Try to return it", isCorrect: true, feedback: "Respecting others matters." },
      { text: "Take it", isCorrect: false, feedback: "This is dishonest." }
    ],
    difficulty: "easy",
    order: 5,
    xpReward: 10
  },
  {
    title: "Bullying",
    scenarioText: "You see someone being bullied.",
    choices: [
      { text: "Stand up for them", isCorrect: true, feedback: "Courage helps others." },
      { text: "Ignore it", isCorrect: false, feedback: "Silence enables harm." }
    ],
    difficulty: "medium",
    order: 6,
    xpReward: 15
  },
  {
    title: "Credit for work",
    scenarioText: "Someone takes credit for your work.",
    choices: [
      { text: "Speak up", isCorrect: true, feedback: "Advocating matters." },
      { text: "Stay silent", isCorrect: false, feedback: "Unfair behavior continues." }
    ],
    difficulty: "medium",
    order: 7,
    xpReward: 15
  },
  {
    title: "Friend lies",
    scenarioText: "Your friend asks you to lie for them.",
    choices: [
      { text: "Refuse politely", isCorrect: true, feedback: "Honesty matters." },
      { text: "Lie for them", isCorrect: false, feedback: "Integrity is compromised." }
    ],
    difficulty: "medium",
    order: 8,
    xpReward: 15
  },
  {
    title: "Work mistake",
    scenarioText: "You make a mistake at work no one noticed.",
    choices: [
      { text: "Own up", isCorrect: true, feedback: "Accountability earns trust." },
      { text: "Hide it", isCorrect: false, feedback: "It may cause bigger issues." }
    ],
    difficulty: "hard",
    order: 9,
    xpReward: 20
  },
  {
    title: "Helping a stranger",
    scenarioText: "Someone drops groceries in front of you.",
    choices: [
      { text: "Help them", isCorrect: true, feedback: "Kindness matters." },
      { text: "Walk away", isCorrect: false, feedback: "You missed a chance to help." }
    ],
    difficulty: "easy",
    order: 10,
    xpReward: 10
  }
];

db.once('open', async () => {
  try {
    console.log('MongoDB connected (seed)');

    await Activity.deleteMany({});
    const result = await Activity.insertMany(activities);

    console.log(`Inserted ${result.length} activities`);
    console.log('Database seeded!');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});