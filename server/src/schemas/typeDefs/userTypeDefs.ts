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
    following: [FollowedProfile]
    followingCount: Int
    followedBy: [FollowedProfile]
    followedByCount: Int
    conversation: [Conversation]
    conversationCount: Int
    organizations: [Org]
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

  union FollowsUnion  = User | Pet | Org

  type FollowedProfile {
    refId: FollowsUnion 
    refModel: String
  }

  input FollowedProfileInput {
    refId: ID!
    refModel: String!
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
    followUser(userId: String!, input: FollowedProfileInput!): BooleanResponse
    unFollowUser(userId: String!, input: FollowedProfileInput!): BooleanResponse
  }
`;

export default userTypeDefs;
