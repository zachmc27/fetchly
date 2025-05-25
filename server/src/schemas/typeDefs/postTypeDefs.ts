const postTypeDefs = `

# -------------------- Post TypeDefs ------------------------

  union PosterUnion = User | Org

  type Poster {
    refId: PosterUnion
    refModel: String
  }

  input PosterInput {
    refId: ID!
    refModel: String!
  }

  union LikeUnion = User | Org

  type Like {
    refId: LikeUnion
    refModel: String
  }

  input LikeInput {
    refId: ID
    refModel: String
  }

  type Post {
    _id: ID
    poster: Poster!
    contentText: String
    media: [Media]
    responses: [Post]
    responseCount: Int
    likes: [Like]
    likesCount: Int
    parentPost: String
    isResponse: Boolean
    createdAt: String    
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
    likePost(postId: String!, input: LikeInput!): BooleanResponse
    unlikePost(postId: String!, input: LikeInput!): BooleanResponse
    deletePost(postId: String!): Post
  }
`;

export default postTypeDefs;
