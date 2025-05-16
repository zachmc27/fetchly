const petTypeDefs = `

# -------------------- Pet TypeDefs ------------------------

    type Pet {
        _id: ID
        name: String
        type: String
        gender: String
        age: Int
        about: String
        profilePhoto: String
        vaccination: String
    }

    input PetInput {
        name: String!
        type: String
        gender: String
        age: Int
        about: String
        profilePhoto: String
        vaccination: String
    }

# -------------------- Query TypeDefs ------------------------

    type Query {
        pets: [Pet]
        pet(petId: String!): Pet
    }

# -------------------- Mutation TypeDefs ------------------------

    type Mutation {
        addPet(input: PetInput!): Pet
        updatePet(petId: String!, input: PetInput!): Pet
        deletePet(petId: String!): Pet
    }
`;

export default petTypeDefs;
