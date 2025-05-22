const mediaTypeDefs = `

# -------------------- Media TypeDefs ------------------------

scalar Upload

type Media {
    id: ID
    filename: String
    contentType: String
    length: Int
    uploadDate: String
    gridFsId: ID
    tags: [String]
    url: String
}

input UploadMediaInput {
    file: Upload!
    tags: [String]
}

type Query {
    media(id: ID!): Media
    allMedia: [Media!]!
}

type Mutation {
    uploadMedia(input: UploadMediaInput!): Media
    deleteMedia(id: ID!): Boolean
}
`;

export default mediaTypeDefs;