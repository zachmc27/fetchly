const meetUpTypeDefs = `

# -------------------- Meet Up TypeDefs ------------------------

  type MeetUp {
    _id: ID
    title: String!
    poster: Poster!
    description: String
    location: Location
    date: String
    time: String
    attendees: [ID]
    numberOfAttendees: Int
    comments: [MeetUpComment]
    numberOfComments: Int
    media: [Media]
    createdAt: String
    itemType: String
  }

  input AddMeetUpInput {
    title: String!
    poster: PosterInput!
    description: String
    location: LocationInput
    date: String
    time: String
    attendees: [ID]
    media: [String]
  }

  input UpdateMeetUpInput {
    title: String
    poster: PosterInput
    description: String
    location: LocationInput
    date: String
    time: String
    attendees: [ID]
    media: [String]
  }

  input deleteMeetUpInput {
    meetUpId: ID!
  }

# -------------------- Query TypeDefs ------------------------

  type Query {
    meetUps: [MeetUp]
    meetUp(meetUpId: ID!): MeetUp
  }

# -------------------- Mutation TypeDefs ------------------------

  type Mutation {
    addMeetUp(input: AddMeetUpInput!): MeetUp
    updateMeetUp(meetUpId: String!, input: UpdateMeetUpInput!): MeetUp
    attendMeetUp(meetUpId: String!, userId: String!): BooleanResponse
    unAttendMeetUp(meetUpId: String!, userId: String!): BooleanResponse
    deleteMeetUp(meetUpId: String!): MeetUp
  }
`;

export default meetUpTypeDefs;
