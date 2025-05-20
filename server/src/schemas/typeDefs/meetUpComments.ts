const meetUpCommentTypeDefs = `

# -------------------- Meet Up Comment TypeDefs ------------------------

  type MeetUpComment {
    _id: ID
    poster: Poster!
    contentText: String
    media: [String]
    responses: [Post]
    responseCount: Int
    parentPost: String
    isResponse: Boolean      
    createdAt: String
  }

  type MeetUpCommentInput {
    poster: Poster!
    contentText: String
    media: [String]
  }

  input MeetUpCommentResponseInput {
    poster: PosterInput!
    contentText: String
    media: [String]
  }

  input UpdateMeetUpCommentInput {
    contentText: String
    media: [String]  
  }

# -------------------- Query TypeDefs ------------------------

  type Query {
    meetUpComments: [MeetUpComment]
    meetUpComment(meetUpCommentId: ID!): MeetUpComment
  }

# -------------------- Mutation TypeDefs ------------------------

`;

export default meetUpCommentTypeDefs;
