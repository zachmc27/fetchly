const conversationTypeDefs = `

# -------------------- Conversation TypeDefs ------------------------

type Conversation {
    _id: ID!
    conversationName: String!
    conversationUsers: [User!]!
    messages: [Message!]
    lastMessage: Message
    formattedCreatedAt: String
}


input ConversationUserInput {
    _id: ID!
}

input CreateConversationInput {
    conversationName: String!
    conversationUsers: [ConversationUserInput!]!
}

input UpdateConversationNameInput{
    _id: String!
    conversationName: String!}
#----------Query TypeDefs------------------------

type Query {
    conversations: [Conversation!]
    conversation(conversationId: String!): Conversation
    conversationByUser(userId: String!): [Conversation!]
}

#----------Mutation TypeDefs------------------------

type Mutation {
    createConversation(input: CreateConversationInput!): Conversation
    updateConversationName(input: UpdateConversationNameInput!): Conversation
    deleteConversation(conversationId: String!): Boolean
}

`;

export default conversationTypeDefs;