import { Adoption, Location } from '../../models/index.js';

// AdoptionArgs
interface LocationArgs {
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

interface AdoptionArgs {
    adoptionId: string;
    poster: {
        refId: string;
        refModel: string;
    };
    pet: string;
    goodWithPets: string;
    description: string;
    location: LocationArgs;
    media?: string[];
    adoptionStatus: boolean;
    adoptedBy: {
        refId: string;
        refModel: string;
    };
    createdAt: string;
}

interface AddAdoptionArgs {
    input: {
        poster: {
            refId: string;
            refModel: string;
        };
        pet: string;
        goodWithPets: string;
        description: string;
        location: LocationArgs;
        media?: string[];
    }
}

interface UpdateAdoptionArgs {
    adoptionId: string;
    input: {
        poster: {
            refId: string;
            refModel: string;
        };
        pet: string;
        goodWithPets: string;
        description: string;
        location: LocationArgs;
        media?: string[];
    }
}

const adoptionResolvers = {
    // Adoption Queries
    Query: {
        adoptions: async () => {
            return await Adoption.find()
                .populate({
                    path: 'pet',
                    populate: { path: 'type' }
                })
                .populate('media')
                .populate('location');
        },
        adoption: async (_parent: any, { adoptionId }: AdoptionArgs) => {
            return await Adoption.findById(adoptionId)
                .populate({
                    path: 'pet',
                    populate: { path: 'type' }
                })
                .populate('media')
                .populate('location');
        }
    },

    // Adoption Mutations
    Mutation: {
        createAdoption: async (_parent: any, { input }: AddAdoptionArgs) => {
            let locationId;
            if (input.location) {
                const existingLocation = await Location.findOne({
                    address: input.location.address,
                    city: input.location.city,
                    state: input.location.state,
                    country: input.location.country,
                    zip: input.location.zip,
                });
                if (existingLocation) {
                    locationId = existingLocation._id;
                } else {
                    const newLocation = await Location.create(input.location);
                    locationId = newLocation._id;
                }
            }

            const { location, ...rest } = input;

            const adoption = await Adoption.create({ 
                ...rest,
                location: locationId,
            });
            return adoption;
        },
        updateAdoption: async (_parent: any, { adoptionId, input }: UpdateAdoptionArgs) => {

            // --- Handle location creation or update ---
            let locationId;
            if (input.location) {
                const existingLocation = await Location.findOne({
                    address: input.location.address,
                    city: input.location.city,
                    state: input.location.state,
                    country: input.location.country,
                    zip: input.location.zip,
                });

                if (existingLocation) {
                    locationId = existingLocation._id;
                } else {
                    const newLocation = await Location.create(input.location);
                    locationId = newLocation._id;
                }
            }

            const updateData: any = {
                ...input,
                location: locationId ?? undefined,
            };

            const adoption = await Adoption.findByIdAndUpdate(adoptionId, updateData, { new: true })
                .populate('location')
                .lean();
                
            return adoption;
        },
        deleteAdoption: async (_parent: any, { adoptionId }: AdoptionArgs) => {
            const adoption = await Adoption.findByIdAndDelete(adoptionId);
            return adoption;
        }
    }
};

export default adoptionResolvers;