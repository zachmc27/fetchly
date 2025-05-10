const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
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
    thoughts: [Thought]!
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

  type Query {
    users: [User]
    user(username: String!): User
    orgs: [Org]
    org(orgName: String!): Org
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    loginUser(email: String!, password: String!): Auth
    addOrg(input: OrgInput!): Auth
    loginOrg(email: String!, password: String!): Auth
  }
`;

export default typeDefs;
