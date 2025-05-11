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
    pet: [Pet]
    post: [Post]
    following: [User]
    conversation: [Conversation]
    conversationCount: Int
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
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
    addUser(input: UserInput!): Auth
    loginUser(email: String!, password: String!): Auth
  }
`;

export default userTypeDefs;
