import { PostCard } from "./CardTypes";

export type UserType = {
  _id: string;
  username?: string;
  fullName?: string;
  orgName?: string;
  location?: {
    address?: string;
    zip?: string;
    city?: string;
    state?: string;  
    country?: string;
  };
  pets: [{
    _id: string;
    name: string;
    profilePhoto: {
      url: string;
    }
  }]
  avatar: {
    url: string;
  }
  about: string;
  followers: {
    refId: {
      _id: string;
      username?: string;
      orgName?: string;
    }
  }
  followedBy: [{
    refID: {
      _id: string;
    }
  }]
  followingCount: number;
  followedByCount: number;
  posts: PostCard[];
};

