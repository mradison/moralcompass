const typeDefs = `

  # ================= USERS =================
  type User {
    _id: ID
    username: String
    email: String
    password: String
    contact: [Contact]
  }

  # ================= CONTACTS =================
  type Contact {
    _id: ID
    name: String!
    nickname: String
    email: String!
    company: String
    title: String
    department: String
    businessphone: String
    mobilephone: String
    address1: String
    address2: String
    city: String
    state: String
    country: String
    zip: String
    website: String
    groupInfo: [GroupInfo]
    activityInfo: [Activity]
  }

  type GroupInfo {
    _id: ID
    groupId: ID
    name: String
    description: String
  }

  type Group {
    _id: ID
    name: String!
    description: String
  }

  # ================= SCENARIO SYSTEM =================

  # ✅ NEW Choice type (matches your Mongo model)
  type Choice {
    text: String!
    isCorrect: Boolean
    feedback: String
  }

  # ✅ CLEAN Activity type (single source of truth)
  type Activity {
    _id: ID

    # Old CRM fields (optional)
    type: String
    subject: String
    description: String
    activitydate: String

    # Scenario fields
    title: String!
    scenarioText: String!
    choices: [Choice]
    explanation: String
    category: String

    # ✅ Pro-level fields
    difficulty: String
    order: Int
    xpReward: Int

    createdAt: String
  }

  # ================= AUTH =================
  type Auth {
    token: ID!
    user: User
  }

  # ================= INPUTS =================

  input inputcontactInfo {
    name: String!
    nickname: String
    email: String!
    company: String
    title: String
    department: String
    businessphone: String
    mobilephone: String
    address1: String
    address2: String
    city: String
    state: String
    country: String
    zip: String
    website: String
  }

  input inputgroupInfo {
    name: String!
    groupId: ID!
    description: String
  }

  # ✅ NEW Choice input
  input ChoiceInput {
    text: String!
    isCorrect: Boolean
    feedback: String
  }

  # ✅ Updated Activity input
  input inputactivityInfo {
    type: String
    subject: String
    description: String
    activitydate: String

    title: String
    scenarioText: String
    choices: [ChoiceInput]
    explanation: String
    category: String

    difficulty: String
    order: Int
    xpReward: Int
  }

  # ================= QUERIES =================
  type Query {
    users: [User]
    user(username: String!): User
    contacts: [Contact]
    contact(contactid: ID!): Contact
    group(groupid: ID!): Group
    groups: [Group]
    activity(activityid: ID!): Activity
    activities: [Activity]
  }

  # ================= MUTATIONS =================
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addContact(newContact: inputcontactInfo): Contact
    addActivity(newActivity: inputactivityInfo): Activity
    addGroup(newGroup: inputgroupInfo): Group

    updatecontactGroup(newGroupInfo: inputgroupInfo, contactId: ID!): Contact
    updatecontactActivity(newActivityInfo: inputactivityInfo, contactId: ID!): Contact

    deleteContact(contactid: ID!): Contact
    deleteActivity(activityid: ID!): Activity
    deleteGroup(groupid: ID!): Group

    updateContactInfo(newContactInfo: inputcontactInfo, contactid: ID!): Contact
    updateActivityInfo(newActivityInfo: inputactivityInfo, activityid: ID!): Activity
    updateGroupInfo(newGroupInfo: inputgroupInfo, groupid: ID!): Group
  }
`;

module.exports = typeDefs;