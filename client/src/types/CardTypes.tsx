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
  taggedPets: {
    name: string;
  }
  parentPost: string;
}

export type MeetUpComment = {
_id: string;
poster: {
    refId: {
      _id: string;
      username: string;
      avatar: {
        url: string
      }
    };
    refModel: string;
  };
contentText: string;
media: [{url: string}]
responses: [MeetUpComment]
responseCount: number;
parentComment: string;
isResponse: boolean;      
createdAt: string;
itemType: string;
}

export type MeetUpCard = {
  _id: string; 
  id?: string;
  title: string;
  poster: {
    refId: {
      _id: string;
      username: string;
      avatar: {
        url: string
      }
    };
    refModel: string;
  }
  description: string;
  location: {
    address: string;
    zip: string;
    city: string;
    state: string;
    country: string;
  }
  date: string;
  time: string;
  attendees: string[];
  numberOfAttendees: number;
  comments: MeetUpComment[];
  numberOfComments: number;
  media: [{
    url: string;
  }];
  itemType: string;
}