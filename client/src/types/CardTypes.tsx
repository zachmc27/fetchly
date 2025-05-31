export type AdoptionCard = {
    _id: string;
    id?: string;
    pet: {
        _id: number;
        name: string;
        age: number;
        profilePhoto: {
            url: string;
        };
        gender: string;
    };
    itemType: string;
    description: string;
};


export type PostCard = {
  _id: string;
  id: string;
  poster: {
    refId: {
      avatar?: {
        url?: string;
      };
      _id: string;
      username: string;
    }
    refModel: string;
  };
  contentText: string;
  media: [{
    url: string
  }];
  itemType: string;
  createdAt: Date;
  likesCount: number;
  responseCount: number;
  likes: [{
    refId: {
      _id: string
    }
  }]
  responses: [{
    _id: string;
    contentText: string;
    poster: {
      refId: {
        avatar?: {
          url?: string;
        };
        _id: string;
        username: string;
      }
      refModel: string;
    };
  }],
}