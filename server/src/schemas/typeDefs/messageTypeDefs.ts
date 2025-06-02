const messageTypeDefs = `
#-------------Message TypeDefs-------------

type Message {
    _id: ID
    messageUser: User # Make this nullable
    textContent: String
    media: Media
    unreadUser: [User]
    conversation: Conversation
    isRead: Boolean
    itemType: String
    createdAt: String
    formattedCreatedAt: String
}

input AddMessageInput {
    conversation: String!
    messageUser: UserInput!
    textContent: String!
    media: String
    readUser: [UserInput]
}

input UpdateMessageInput {
    _id: ID
    messageUser: UserInput
    textContent: String
    media: String
    readUser: [UserInput]
}

input DeleteMessageInput {
    _id: ID
}

#--------------Query TypeDefs----------------

type Query {
    messages: [Message]
    message(messageId: String!): Message
    messageByConversation(conversationId: String!): [Message!]!
}

#--------------Mutation TypeDefs----------------

type Mutation {
    addMessage(input: AddMessageInput!): Message
    updateMessage(input: UpdateMessageInput): Message
    deleteMessage(input: DeleteMessageInput!): Message
}

#-------------Supporting TypeDefs-------------

input UserInput {
    _id: ID!
    username: String
}
`;

export default messageTypeDefs;