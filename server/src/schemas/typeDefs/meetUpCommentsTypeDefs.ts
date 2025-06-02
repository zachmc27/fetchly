const meetUpCommentTypeDefs = `

# -------------------- Meet Up Comment TypeDefs ------------------------

  type MeetUpComment {
    _id: ID
    poster: Poster
    contentText: String
    meetUpId: ID
    media: [Media]
    responses: [Post]
    responseCount: Int
    parentComment: String
    isResponse: Boolean      
    createdAt: String
    itemType: String
  }

  input MeetUpCommentInput {
    meetUpId: ID
    poster: PosterInput!
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

  type Mutation {
    createMeetUpComment(input: MeetUpCommentInput!): MeetUpComment
    updateMeetUpComment(meetUpCommentId: ID!, input: UpdateMeetUpCommentInput!): MeetUpComment
    deleteMeetUpComment(meetUpCommentId: ID!): Boolean
    createMeetUpCommentResponse(meetUpCommentId: ID!, input: MeetUpCommentResponseInput!): MeetUpComment
  } 
`;

export default meetUpCommentTypeDefs;
