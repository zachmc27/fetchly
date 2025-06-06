export type MockLastMessage = {
  _id: string;
  textContent: string
  messageUser: MockMessageUser;
  formattedCreatedAt: string;
}

export type conversationUsers = {
  _id: string;
  username?: string;
  avatar?: Avatar;
}
export type Avatar = {
  url: string;
}
export type MockMessageObject = {
  _id: string;
  conversation: MockConversationObject;
  messageUser: MockMessageUser;
  textContent: string
  formattedCreatedAt?: string;

}
 
export type MockMessageUser = {
  _id: string;
  username: string;
  avatar?: Avatar;
}

export type MockConversationObject = { 
  _id: string;
  coverImage?: string;
  conversationName: string;
  conversationUsers: conversationUsers[];
  lastMessage?: MockLastMessage;
  messages?: MockMessageObject[],
  formattedCreatedAt?: string;
}
