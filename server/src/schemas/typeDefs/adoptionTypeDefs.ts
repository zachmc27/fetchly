const adoptionTypeDefs = `

# -------------------- Adoption TypeDefs ------------------------

type Adopter {
    refId: ID
    refModel: String
}

type Adoption {
    _id: ID
    poster: Poster
    pet: Pet
    goodWithPets: String
    description: String
    location: String
    media: [Media]
    adoptionStatus: Boolean
    adoptedBy: Adopter
    createdAt: String
}

input AdoptionInput {
    pet: ID!
    poster: PosterInput!
    goodWithPets: String
    description: String
    location: String
    media: [String]
}

type Query {
    adoptions: [Adoption]
    adoption(adoptionId: ID!): Adoption
}

type Mutation {
    createAdoption(input: AdoptionInput!): Adoption
    updateAdoption(adoptionId: ID!, input: AdoptionInput!): Adoption
    deleteAdoption(adoptionId: ID!): Boolean
}
`;

export default adoptionTypeDefs;