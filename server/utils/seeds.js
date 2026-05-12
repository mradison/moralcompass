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
  },
  {
  title: "Sharing answers",
  scenarioText: "A classmate asks you to send them the test answers after you finish.",
  choices: [
    { text: "Refuse and encourage them to study", isCorrect: true, feedback: "Helping ethically supports learning." },
    { text: "Send the answers secretly", isCorrect: false, feedback: "This is dishonest and unfair." }
  ],
  difficulty: "medium",
  order: 11,
  xpReward: 15
},

{
  title: "Damaged property",
  scenarioText: "You accidentally damage something in a store and nobody notices.",
  choices: [
    { text: "Tell the staff and offer to help", isCorrect: true, feedback: "Taking responsibility shows integrity." },
    { text: "Leave without saying anything", isCorrect: false, feedback: "Avoiding responsibility hurts others." }
  ],
  difficulty: "medium",
  order: 12,
  xpReward: 15
},

{
  title: "Online rumor",
  scenarioText: "You see a harmful rumor spreading online about someone you know.",
  choices: [
    { text: "Avoid spreading it and report it", isCorrect: true, feedback: "Stopping harm protects others." },
    { text: "Share it because everyone else is", isCorrect: false, feedback: "Sharing rumors can seriously hurt people." }
  ],
  difficulty: "medium",
  order: 13,
  xpReward: 15
},

{
  title: "Cutting in line",
  scenarioText: "Someone cuts in front of everyone in line.",
  choices: [
    { text: "Politely speak up", isCorrect: true, feedback: "Respectful communication promotes fairness." },
    { text: "Push in front of them", isCorrect: false, feedback: "Escalating conflict rarely helps." }
  ],
  difficulty: "easy",
  order: 14,
  xpReward: 10
},

{
  title: "Homework copied",
  scenarioText: "A friend copies your homework without asking.",
  choices: [
    { text: "Talk to them honestly", isCorrect: true, feedback: "Clear boundaries protect trust." },
    { text: "Post about them online", isCorrect: false, feedback: "Public embarrassment worsens conflict." }
  ],
  difficulty: "medium",
  order: 15,
  xpReward: 15
},

{
  title: "Ignoring safety rules",
  scenarioText: "Your coworkers ignore an important safety rule to save time.",
  choices: [
    { text: "Encourage following the rule", isCorrect: true, feedback: "Safety protects everyone." },
    { text: "Ignore it to fit in", isCorrect: false, feedback: "Unsafe shortcuts can cause harm." }
  ],
  difficulty: "hard",
  order: 16,
  xpReward: 20
},

{
  title: "Unfair joke",
  scenarioText: "Someone makes a cruel joke targeting another person.",
  choices: [
    { text: "Speak up respectfully", isCorrect: true, feedback: "Respect helps create a better environment." },
    { text: "Laugh along", isCorrect: false, feedback: "Joining in encourages harmful behavior." }
  ],
  difficulty: "medium",
  order: 17,
  xpReward: 15
},

{
  title: "Returning borrowed items",
  scenarioText: "You borrowed something valuable and accidentally broke it.",
  choices: [
    { text: "Tell the owner and apologize", isCorrect: true, feedback: "Honesty strengthens trust." },
    { text: "Hide the damage", isCorrect: false, feedback: "Avoiding the truth damages relationships." }
  ],
  difficulty: "hard",
  order: 18,
  xpReward: 20
},

{
  title: "Excluded teammate",
  scenarioText: "A new teammate is being left out by the group.",
  choices: [
    { text: "Include them in conversations", isCorrect: true, feedback: "Inclusion helps people feel respected." },
    { text: "Stay quiet to avoid attention", isCorrect: false, feedback: "Ignoring exclusion allows it to continue." }
  ],
  difficulty: "easy",
  order: 19,
  xpReward: 10
},

{
  title: "False expense report",
  scenarioText: "A coworker asks you to approve a false expense report.",
  choices: [
    { text: "Refuse and report concerns", isCorrect: true, feedback: "Integrity matters in professional settings." },
    { text: "Approve it to avoid conflict", isCorrect: false, feedback: "Dishonest actions can have serious consequences." }
  ],
  difficulty: "hard",
  order: 20,
  xpReward: 20
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