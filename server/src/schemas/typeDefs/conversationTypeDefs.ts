const conversationTypeDefs = `

# -------------------- Conversation TypeDefs ------------------------

type Conversation {
    _id: ID
    conversationName: String
    conversationUsers: [ConversationUser]
    messages: [Message]
    lastMessage: Message
    }

type ConversationUser{
    _id: ID!
}

input ConversationUserInput{
    _id: ID!
}
input CreateConversationInput {
    conversationName: String!
    conversationUsers: [ConversationUserInput!]! 
}

#----------Query TypeDefs------------------------

type Query {
    conversations: [Conversation]
    conversation(conversationId: String!): Conversation
}

#----------Mutation TypeDefs------------------------

type Mutation{
CreateConversationInput(input: CreateConversationInput!): Conversation
}

`;
export default conversationTypeDefs;