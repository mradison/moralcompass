const { Schema, model } = require('mongoose');

const choiceSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
    feedback: {
      type: String,
      trim: true,
    },
  },
  { _id: false } // cleaner subdocuments
);

const activitySchema = new Schema({
  // --- OLD CRM FIELDS (optional cleanup later) ---
  type: {
    type: String,
    trim: true,
  },
  subject: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  activitydate: {
    type: Date,
    default: Date.now,
  },

  // --- MORAL SCENARIO FIELDS ---
  title: {
    type: String,
    required: true,
    trim: true,
  },

  scenarioText: {
    type: String,
    required: true,
    trim: true,
  },

  choices: {
    type: [choiceSchema],
    validate: {
      validator: (arr) => arr.length >= 2,
      message: "A scenario must have at least 2 choices",
    },
  },

  explanation: {
    type: String,
    trim: true,
  },

  category: {
    type: String,
    trim: true,
  },

  // ✅ NEW PROFESSIONAL FIELDS
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },

  order: {
    type: Number,
    default: 0,
  },

  xpReward: {
    type: Number,
    default: 10,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Optional: ensure order is indexed for fast sorting
activitySchema.index({ order: 1 });

const Activity = model('Activity', activitySchema);

module.exports = Activity;