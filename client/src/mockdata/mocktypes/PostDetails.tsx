export type Comment = {
  id: number,
  user: string,
  avatar?: string,
  comment: string,
  likeCount: number,
  postedTime: Date,
  replies?: Comment[]
}

export type rsvpList = {
  username: string,
  userAvi: string
}

export type MockPostItem = {
  id: number;
  userAvi: string;
  postUser: string;
  postContent: string;
  postImages?: string[];
  postLikeCount: number;
  postDate: string;
  postCommentCount: number;
  comments: Comment[]
  itemType: string;

};

export type MockMeetupItem = {
  id: number;
  userAvi: string;
  username: string;
  title: string;
  postText: string;
  images: string[];
  location: string;
  date: string;
  time: string;
  comments: Comment[];
  rsvpList: rsvpList[]
  itemType: string;
};

export type MockAdoptionItem = {
  _id: string;
  orgName: string;
  orgAvi: string;
  orgEmail: string;
  orgNumber: string;
  images: string[];
  petName: string;
  description: string;
  gender: string;
  age: number;
  location: string;
  vaccinated: boolean;
  breed: string;
  isFixed: boolean;
  goodWithPets: string;
  itemType: string;
};