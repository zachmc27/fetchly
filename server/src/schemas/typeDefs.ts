const typeDefs = `
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

  type Post {
    _id: ID
    poster: {
      refId: ID
      refModel: String
    }
    postType: String
    contentText: String
    media: [String]
  }

  type Query {
    users: [User]
    user(username: String!): User
    orgs: [Org]
    org(orgName: String!): Org
    me: User
    posts: [Post]
    post(postId: ID!): Post
    postType(postType: String!): [Post]
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    loginUser(email: String!, password: String!): Auth
    addOrg(input: OrgInput!): Auth
    loginOrg(email: String!, password: String!): Auth
    addPost(postType: String!, poster: { refId: ID!, refModel: String! }, contentText: String, media: [String]): Post
  }
`;

export default typeDefs;
