export type AdoptionItem = {
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

export type PostItem = {
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
