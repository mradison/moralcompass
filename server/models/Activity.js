const { Schema, model } = require('mongoose');

const activitySchema = new Schema({
  // --- OLD CRM FIELDS (keep for now) ---
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

  // --- NEW MORAL SCENARIO FIELDS ---
  title: {
    type: String,
    trim: true,
  },
  scenarioText: {
    type: String,
    trim: true,
  },
  choices: [
    {
      type: String,
      trim: true,
    }
  ],
  explanation: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Activity = model('Activity', activitySchema);

module.exports = Activity;