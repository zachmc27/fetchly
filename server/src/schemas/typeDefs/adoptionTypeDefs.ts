const adoptionTypeDefs = `

# -------------------- Adoption TypeDefs ------------------------

type Adoption {
    _id: ID
    poster: Org
    pet: Pet
    goodWithPets: String
    description: String
    location: Location
    media: [Media]
    adoptionStatus: Boolean
    adoptedBy: User
    createdAt: String
    itemType: String
}

input AdoptionInput {
    pet: ID!
    poster: ID!
    goodWithPets: String
    description: String
    location: LocationInput
    media: [String]
}

input UpdateAdoptionInput {
    goodWithPets: String
    description: String
    location: LocationInput
    media: [String]
}

type BooleanResponse {
  message: String!
  success: Boolean!
}

input LocationFilterInput {
  city: String
  state: String
  country: String
  zip: String
}

input AdoptionFilterInput {
  Type: String
  Location: LocationFilterInput
}

type Query {
    adoptions(filter: AdoptionFilterInput): [Adoption]
    adoption(adoptionId: ID!): Adoption
}

type Mutation {
    createAdoption(input: AdoptionInput!): Adoption
    updateAdoption(adoptionId: ID!, input: UpdateAdoptionInput!): Adoption
    adoptPet(adoptionId: ID!, userId: ID!): BooleanResponse!
    deleteAdoption(adoptionId: ID!): BooleanResponse!
}
`;

export default adoptionTypeDefs;