const orgTypeDefs = `

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


# -------------------- Query TypeDefs ------------------------

  type Query {
    orgs: [Org]
    org(orgName: String!): Org
  }

# -------------------- Mutation TypeDefs ------------------------

  type Mutation {
    addOrg(input: OrgInput!): Auth
    loginOrg(email: String!, password: String!): Auth
  }
`;

export default orgTypeDefs;
