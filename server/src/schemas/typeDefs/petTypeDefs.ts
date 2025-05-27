const petTypeDefs = `

# -------------------- Pet TypeDefs ------------------------

    union OwnerUnion  = User | Org

    type OwnerProfile {
        refId: OwnerUnion
        refModel: String
    }

    input OwnerInput {
        refId: ID!
        refModel: String!
    }

    type Pet {
        _id: ID
        name: String
        owner: OwnerProfile!
        type: Type
        gender: String
        age: Int
        size: String
        neuteredOrSpayed: Boolean
        about: String
        profilePhoto: Media
        vaccination: String
        followedBy: [FollowedProfile]
        followedByCount: Int
    }

    input PetInput {
        _id: ID
        name: String!
        owner: OwnerInput!
        type: ID!
        gender: String
        age: Int
        size: String
        neuteredOrSpayed: Boolean
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
        neuteredOrSpayed: Boolean
        about: String
        profilePhoto: ID
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
