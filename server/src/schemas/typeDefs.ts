const typeDefs = `

# -------------------- User TypeDefs ------------------------

  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

# -------------------- Org TypeDefs ------------------------

  type Org {
    _id: ID
    orgName: String
    email: String
    password: String
  }

  input OrgInput {
    orgName: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

# -------------------- Post TypeDefs ------------------------

  type Poster {
    refId: ID!
    refModel: String!
  }

  input PosterInput {
    refId: ID!
    refModel: String!
  }

  type Post {
    _id: ID
    poster: Poster!
    postType: String
    contentText: String
    media: [String]
  }

  input AddPostInput {
    postId: String!
    poster: PosterInput!
    postType: String!
    contentText: String
    media: [String]
  }

# -------------------- Query TypeDefs ------------------------

  type Query {
    users: [User]
    user(userId: String!): User
    orgs: [Org]
    org(orgName: String!): Org
    me: User
    posts: [Post]
    post(postId: ID!): Post
    postType(postType: String!): [Post]
  }

# -------------------- Mutation TypeDefs ------------------------

  type Mutation {
    addUser(input: UserInput!): Auth
    loginUser(email: String!, password: String!): Auth
    addOrg(input: OrgInput!): Auth
    loginOrg(email: String!, password: String!): Auth
    addPost(input: AddPostInput!): Post
  }
`;

export default typeDefs;
