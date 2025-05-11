const postTypeDefs = `

# -------------------- Post TypeDefs ------------------------

  type Poster {
    refId: ID!
    refModel: String!
  }

  input PosterInput {
    refId: ID!
    refModel: String!
  }

  type Post {
    _id: ID
    poster: Poster!
    postType: String
    contentText: String
    media: [String]
  }

  input AddPostInput {
    postId: String!
    poster: PosterInput!
    postType: String!
    contentText: String
    media: [String]
  }

# -------------------- Query TypeDefs ------------------------

  type Query {
    posts: [Post]
    post(postId: ID!): Post
    postType(postType: String!): [Post]
  }

# -------------------- Mutation TypeDefs ------------------------

  type Mutation {
    addPost(input: AddPostInput!): Post
  }
`;

export default postTypeDefs;
