const messageTypeDefs = `
#-------------Message TyepeDefs-------------

type User{
    refId: ID!
    refModel: String!
}

input MediaInput{
    refId: ID!
    refModel: String!
}
    
input UserInput{
    refId: ID!
    refModel: String!
}

type Message{
    _id: ID
    messageUser: User!
    textContent: String
    media: [Media]
    readUser: [User]
    isRead: Boolean
}

input addMessage{
    _id: ID
    messageUser: UserInput!
    textContent: String
    media: [MediaInput]
    readUser: [UserInput]
}

input MessageInput {
    _id: ID
    messageUser: UserInput!
    textContent: String
    media: [MediaInput]
    readUser: [UserInput]
}

input UpdateMessageInput{
    _id: ID
    messageUser: UserInput
    textContent: String
    media: [MediaInput]
    readUser: [UserInput]
}

input DeleteMessageInput{
    _id: ID
    messageUser: UserInput
    }

#--------------Query TypeDefs----------------

type Query{
    messages: [Message]
    message(messageId: String!): Message
}

#--------------Mutation TypeDefs----------------
type Mutation{
    addMessage(message: MessageInput!): Message
    updateMessage(messageId: String!, message: MessageInput!): Message
    deleteMessage(messageId: String!): Message
}
`;

export default messageTypeDefs;
