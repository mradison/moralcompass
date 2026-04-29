const { User, Contact, Group, Activity } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('contact');
    },

    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('contact');
    },

    contacts: async () => {
      return Contact.find();
    },

    contact: async (parent, { contactid }) => {
      return Contact.findOne({ _id: contactid });
    },

    groups: async () => {
      return Group.find();
    },

    group: async (parent, { groupid }) => {
      return Group.findOne({ _id: groupid });
    },

    // ✅ IMPORTANT: sort by order (pro-level improvement)
    activities: async () => {
      return Activity.find().sort({ order: 1 });
    },

    activity: async (parent, { activityid }) => {
      return Activity.findOne({ _id: activityid });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    addContact: async (parent, { newContact }, context) => {
      if (!context.user) throw AuthenticationError;

      const contact = await Contact.create(newContact);

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { contact: contact._id } }
      );

      return contact;
    },

    updatecontactGroup: async (parent, { newGroupInfo, contactId }, context) => {
      if (!context.user) throw AuthenticationError;

      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        { $push: { groupInfo: newGroupInfo } },
        { new: true }
      );

      return updatedContact;
    },

    updatecontactActivity: async (parent, { newActivityInfo, contactId }, context) => {
      if (!context.user) throw AuthenticationError;

      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        { $push: { activityInfo: newActivityInfo } },
        { new: true }
      );

      return updatedContact;
    },

    // ✅ UPDATED to match new schema (difficulty, order, xpReward)
    addActivity: async (parent, { newActivity }, context) => {
      if (!context.user) throw AuthenticationError;

      return Activity.create({
        ...newActivity
      });
    },

    addGroup: async (parent, { newGroup }, context) => {
      if (!context.user) throw AuthenticationError;

      return Group.create(newGroup);
    },

    deleteContact: async (parent, { contactid }, context) => {
      if (!context.user) throw AuthenticationError;

      return Contact.findOneAndDelete({ _id: contactid });
    },

    deleteActivity: async (parent, { activityid }, context) => {
      if (!context.user) throw AuthenticationError;

      return Activity.findOneAndDelete({ _id: activityid });
    },

    deleteGroup: async (parent, { groupid }, context) => {
      if (!context.user) throw AuthenticationError;

      return Group.findOneAndDelete({ _id: groupid });
    },

    updateContactInfo: async (parent, { newContactInfo, contactid }, context) => {
      if (!context.user) throw AuthenticationError;

      return Contact.findByIdAndUpdate(contactid, newContactInfo, {
        new: true,
      });
    },

    // ✅ UPDATED to support new fields
    updateActivityInfo: async (parent, { newActivityInfo, activityid }, context) => {
      if (!context.user) throw AuthenticationError;

      return Activity.findByIdAndUpdate(activityid, newActivityInfo, {
        new: true,
      });
    },

    updateGroupInfo: async (parent, { newGroupInfo, groupid }, context) => {
      if (!context.user) throw AuthenticationError;

      return Group.findByIdAndUpdate(groupid, newGroupInfo, {
        new: true,
      });
    },
  },
};

module.exports = resolvers;