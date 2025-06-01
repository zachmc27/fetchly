const orgTypeDefs = `

# -------------------- Org TypeDefs ------------------------

  type Org {
    _id: ID
    orgName: String
    email: String
    phone: String
    website: String
    password: String
    avatar: Media
    about: String
    location: Location
    employees: [User]
    employeeCount: Int
    pets: [Pet]
    petCount: Int
    posts: [Post]
    postCount: Int
    likedPosts: [Post]
    likedPostsCount: Int
    following: [FollowedProfile]
    followingCount: Int
    followedBy: [FollowedProfile]
    followedByCount: Int
  }

  input OrgInput {
    orgName: String!
    email: String!
    password: String!
  }

  input UpdateOrgInput {
    orgName: String
    email: String
    phone: String
    website: String
    avatar: ID
    about: String
    location: LocationInput
    employees: [ID]
  }

  type OrgAuth {
    token: ID!
    org: Org
  }

# -------------------- Query TypeDefs ------------------------

  type Query {
    orgs: [Org]
    org(orgId: String!): Org
  }

# -------------------- Mutation TypeDefs ------------------------

  type Mutation {
    addOrg(input: OrgInput!): OrgAuth
    updateOrg(orgId: String!, input: UpdateOrgInput!): OrgAuth
    addEmployee(orgId: String!, userId: ID!): BooleanResponse
    removeEmployee(orgId: String!, userId: ID!): BooleanResponse
    followOrg(orgId: String!, input: FollowedProfileInput!): BooleanResponse
    unFollowOrg(orgId: String!, input: FollowedProfileInput!): BooleanResponse
    loginOrg(email: String!, password: String!): OrgAuth
  }
`;

export default orgTypeDefs;
