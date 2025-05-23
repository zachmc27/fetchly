const userTypeDefs = `

# -------------------- User TypeDefs ------------------------

  type User {
    _id: ID
    username: String
    email: String
    password: String
    avatar: Media
    about: String
    location: String
    pets: [Pet]
    petCount: Int
    meetUps: [MeetUp]
    meetUpCount: Int
    posts: [Post]
    postCount: Int
    likedPosts: [Post]
    likedPostsCount: Int
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
    avatar: ID
    about: String
    location: String
  }

  type Auth {
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
    addUser(input: AddUserInput!): Auth
    updateUser(userId: String!, input: UpdateUserInput!): Auth
    loginUser(email: String!, password: String!): Auth
  }
`;

export default userTypeDefs;
