export type MockLastMessage = {
  id: number;
  textContent: string
}

export type MockMessageObject = {
  id: number;
  messageUser: string;
  textContent: string
}

export type MockConversationObject = {
  id: number;
  conversationName: string;
  conversationUsers: string[];
  lastMessage: MockLastMessage;
  messages: MockMessageObject[]
}