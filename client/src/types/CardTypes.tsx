export type AdoptionCard = {
    _id: string;
    id?: string;
    poster: {
      orgName: string;
      avatar: {url:string};
      phone: string;
      email: string;

    };
    pet: {
        _id: number;
        name: string;
        age: number;
        profilePhoto: {
            url: string;
        };
        gender: string;
        vaccination: string;
        type: {
          breed: string;
          type: string
        };
        neuteredOrSpayed: boolean;
    };
    itemType: string;
    description: string;
    media: [{url: string}];
    location: {
      address: string;
      zip: string;
      city: string;
      state: string;
      country: string;
    };
    goodWithPets: string;
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
      orgName: string;
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