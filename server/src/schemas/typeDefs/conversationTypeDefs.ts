const conversationTypeDefs = `

# -------------------- Conversation TypeDefs ------------------------

  type Conversation {
    _id: ID
    sender: User
    receiver: User
    message: String
    createdAt: String
  }

  input ConversationInput {
    sender: ID!
    receiver: ID!
    message: String!
  }

# -------------------- Query TypeDefs ------------------------

    type Query {
        conversations: [Conversation]
        conversation(conversationId: String!): Conversation
    }

# -------------------- Mutation TypeDefs ------------------------

    type Mutation {
        addConversation(input: ConversationInput!): Conversation
        updateConversation(conversationId: String!, input: ConversationInput!): Conversation
        deleteConversation(conversationId: String!): Conversation
    }
`;

export default conversationTypeDefs;