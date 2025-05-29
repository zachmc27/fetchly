const typeTypeDefs = `

# -------------------- Type TypeDefs ------------------------

  type Type {
    _id: ID
    type: String
    breed: String
  }
  
  input TypeInput {
    type: String!
    breed: String!
  }

# -------------------- Query TypeDefs ------------------------
    type Query {
        types(type: String): [Type]
        type(typeId: String!): Type
    }

# -------------------- Mutation TypeDefs ------------------------

    type Mutation {
        addType(input: TypeInput!): Type
        updateType(typeId: String!, input: TypeInput!): Type
        deleteType(typeId: String!): Type
    }
`;

export default typeTypeDefs;