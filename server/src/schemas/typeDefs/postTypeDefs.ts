const postTypeDefs = `

# -------------------- Post TypeDefs ------------------------

  type Post {
    _id: ID
    poster: Poster!
    contentText: String
    media: [Media]
    responses: [Post]
    responseCount: Int
    createdAt: String
    parentPost: String
    isResponse: Boolean
    itemType: String
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
