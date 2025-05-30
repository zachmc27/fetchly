

export type MockPostCard = {
  id: number;
  userAvi: string;
  postUser: string;
  postContent: string;
  postImage?: string[];
  postLikeCount: number;
  postCommentCount: number;
  postDate: string;
  itemType: string;

};

 export type MockMeetupCard = {
  id: number;
  postImage?: string;
  postUser: string;
  postTitle: string;
  postLocation: string;
  postRSVPCount: number;
  postDate: string;
  meetupTime: string;
  itemType: string;
};

export type MockAdoptionCard = {
  id: number;
  petCoverImage: string;
  petName: string;
  petAge: number;
  petGender: string;
  itemType: string;
};

export type MockMessageCard = {
  id: number;
  conversationId: string;
  coverImage?: string;
  chatTitle: string;
  chatUsers: string[];
  latestMessage: string;
  formattedCreatedAt: string;
  isUnread?: boolean;
  itemType: string;
  date: string;
};
