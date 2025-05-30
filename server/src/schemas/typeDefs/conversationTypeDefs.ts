const conversationTypeDefs = `

# -------------------- Conversation TypeDefs ------------------------

type Conversation {
    _id: ID!
    conversationName: String!
    conversationUsers: [ConversationUser!]!
    messages: [Message!]
    lastMessage: Message
    formattedCreatedAt: String
    
}

type ConversationUser {
    _id: ID!
    username: String!
    profilePicture: String
}

input ConversationUserInput {
    _id: ID!
}

input CreateConversationInput {
    conversationName: String!
    conversationUsers: [ConversationUserInput!]!
}

#----------Query TypeDefs------------------------

type Query {
    conversations: [Conversation!]
    conversation(conversationId: String!): Conversation
    conversationByUser(userId: String!): [Conversation!]
}

#----------Mutation TypeDefs------------------------

type Mutation {
    createConversation(input: CreateConversationInput!): Conversation
}

`;
export default conversationTypeDefs;