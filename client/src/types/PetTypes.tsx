export type Pet = {
  about?: string;
  age?: number;
  size?: string;
  neuteredOrSpayed?: string;
  gender?: string;
  name?: string;
  owner?: {
    refId?: string;
    refModel?: "User" | "Org";
  };
  type?: string;
  vaccination?: string;
  followedByCount: number;
  profilePhoto: {
        url: string;
  };
  taggedPosts: {
    _id: string;
    contentText: string;
    createdAt?: Date;
    poster: {
        username?: string;
        orgName?: string;
      };

    }[];
};
