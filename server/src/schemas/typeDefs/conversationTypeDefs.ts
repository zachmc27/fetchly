const conversationTypeDefs = `

# -------------------- Conversation TypeDefs ------------------------

type User {
    _id: ID
    username: String
    email: String
    profilePhoto: String
    conversations: [Conversation]
}
type Media {
    refId: ID!
    refModel: String!
}
type Message {
    id: String
    messageUser: User
    textContent: String
    media: [Media]
    readUser: [User]
    isRead: Boolean
}
type Conversation {
    _id: ID
    conversationName: String
    conversationUser: [User]
    messages: [Message]
    lastMessage: Message
    createdAt: String
}

input ConversationInput {
    _id: ID
    conversationName: String
    conversationUser: [ID]
}
input addConversationUser {
    _id: ID!
    conversationUser: [ID]!
}
input removeConversationUser {
    _id: ID!
    conversationUser: [ID]!
}

type Query {
    conversations: [Conversation]
    conversation(conversationId: ID!): Conversation
}
type Mutation {
    addConversation(input: ConversationInput): Conversation
    addConversationUser(conversationId: ID!, input: addConversationUser): Conversation
    removeConversationUser(conversationId: ID!, input: removeConversationUser): Conversation
}
`;

export default conversationTypeDefs;