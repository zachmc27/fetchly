export type AdoptionCard= {
    _id: number;
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
};
