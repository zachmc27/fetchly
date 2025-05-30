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
    refId: string;
    refModel: string;
  };
  contentText: string;
  media: string[];
  itemType: string;
}