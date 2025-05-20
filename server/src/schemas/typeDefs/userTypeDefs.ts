const userTypeDefs = `

# -------------------- User TypeDefs ------------------------

  type User {
    _id: ID
    username: String
    email: String
    password: String
    avatar: String
    about: String
    location: String
    pets: [Pet]
    petCount: Int
    meetUps: [MeetUp]
    meetUpCount: Int
    posts: [Post]
    postCount: Int
    following: [User]
    conversation: [Conversation]
    conversationCount: Int
  }

  input AddUserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    username: String
    email: String
    avatar: String
    about: String
    location: String
  }

  type UserAuth {
    token: ID!
    user: User
  }

# -------------------- Query TypeDefs ------------------------

  type Query {
    users: [User]
    user(userId: String!): User
    me: User
  }

# -------------------- Mutation TypeDefs ------------------------

  type Mutation {
    addUser(input: AddUserInput!): UserAuth
    updateUser(userId: String!, input: UpdateUserInput!): UserAuth
    loginUser(email: String!, password: String!): UserAuth
  }
`;

export default userTypeDefs;
