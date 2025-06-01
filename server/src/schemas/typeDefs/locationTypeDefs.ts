const locationTypeDefs = `

# -------------------- Location TypeDefs ------------------------

    type Location {
        _id: ID
        address: String
        zip: String
        city: String
        state: String
        country: String
    }

    input LocationInput {
        address: String
        zip: String
        city: String
        state: String
        country: String
    }

    type Query {
        location(id: ID!): Location
        allLocations: [Location!]!
    }

    type Mutation {
        createLocation(input: LocationInput!): Location
        updateLocation(id: ID!, input: LocationInput!): Location
        deleteLocation(id: ID!): Boolean
    }
`;

export default locationTypeDefs;