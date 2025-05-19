const petTypeDefs = `

# -------------------- Pet TypeDefs ------------------------

    type Owner {
        refId: ID!
        refModel: String!
    }

    input OwnerInput {
        refId: ID!
        refModel: String!
    }

    type Pet {
        _id: ID
        name: String
        owner: Owner!
        type: Type
        gender: String
        age: Int
        about: String
        profilePhoto: String
        vaccination: String
    }

    input PetInput {
        _id: ID
        name: String!
        owner: OwnerInput!
        type: ID!
        gender: String
        age: Int
        about: String
        profilePhoto: String
        vaccination: String
    }

    input UpdatePetInput {
        _id: ID
        name: String
        owner: OwnerInput
        type: ID
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
        updateOwner(petId: String!, input: OwnerInput!): Pet
        updatePet(petId: String!, input: UpdatePetInput!): Pet
        deletePet(petId: String!): Pet
    }
`;

export default petTypeDefs;
