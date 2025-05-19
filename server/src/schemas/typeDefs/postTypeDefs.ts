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
    contentText: String
    media: [String]
    responses: [Post]
    responseCount: Int
    createdAt: String
    updatedAt: String
    parentPost: String
    isResponse: Boolean
  }

  input AddPostInput {
    poster: PosterInput!
    contentText: String
    media: [String]
  }

  input AddPostResponseInput {
    poster: PosterInput!
    contentText: String
    media: [String]
  }

  input UpdatePostInput {
    contentText: String
    media: [String]  
  }

# -------------------- Query TypeDefs ------------------------

  type Query {
    posts: [Post]
    post(postId: ID!): Post
  }

# -------------------- Mutation TypeDefs ------------------------

  type Mutation {
    addPost(input: AddPostInput!): Post
    addPostResponse(postId: String!, input: AddPostResponseInput!): Post
    updatePost(postId: String!, input: UpdatePostInput!): Post
    deletePost(postId: String!): Post
  }
`;

export default postTypeDefs;
