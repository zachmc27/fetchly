import { Adoption, Location, User } from '../../models/index.js';

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
    poster: string;
    pet: string;
    goodWithPets: string;
    description: string;
    location: LocationArgs;
    media?: string[];
    adoptionStatus: boolean;
    adoptedBy: string;
    createdAt: string;
}

interface AddAdoptionArgs {
    input: {
        poster: string;
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
        poster: string;
        pet: string;
        goodWithPets: string;
        description: string;
        location: LocationArgs;
        media?: string[];
    }
}

interface adoptedArgs {
    adoptionId: string;
    userId: string;
}

const adoptionResolvers = {
    // Adoption Queries
    Query: {
        adoptions: async () => {
            return await Adoption.find()
                .populate({
                    path: 'pet',
                    populate: [
                        { path: 'type' },
                        { path: 'profilePhoto',
                            populate: 'media',
                         }
                    ]
                })
                .populate('media')
                .populate('location')
                .populate({
                    path: 'poster',
                    populate: { path: 'avatar' }
                })
                .populate({
                    path: 'adoptedBy',
                    populate: { path: 'avatar' }
                });
        },
        adoption: async (_parent: any, { adoptionId }: AdoptionArgs) => {
            return await Adoption.findById(adoptionId)
                .populate({
                    path: 'pet',
                    populate: [
                        { path: 'type' },
                        { path: 'profilePhoto',
                            populate: 'media',
                         }
                    ]
                })
                .populate('media')
                .populate('location')
                .populate({
                    path: 'poster',
                    populate: { path: 'avatar' }
                })
                .populate({
                    path: 'adoptedBy',
                    populate: { path: 'avatar' }
                });
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
                .populate('location');
                
            return adoption;
        },
        adoptPet: async (_parent: any, { adoptionId, userId }: adoptedArgs) => {

            const adoptedBy = await User.findById(userId);

            if (!adoptedBy) {
                return {
                    message: 'User not found.',
                    success: false,
                }
            }

            const adoption = await Adoption.findByIdAndUpdate(
                adoptionId,
                { adoptedBy, adoptionStatus: true },
                { new: true }
            )

            if (!adoption) {
                return {
                    message: 'Adoption not found.',
                    success: false,
                }
            }
            
            return {
                message: 'Pet adopted successfully.',
                success: true,
            }
        },
        deleteAdoption: async (_parent: any, { adoptionId }: AdoptionArgs) => {
            const deleted = await Adoption.findByIdAndDelete(adoptionId);

            if (!deleted) {
                return {
                    message: 'Adoption not found.',
                    success: false,
                }
            }

            console.log(`Adoption with ID ${adoptionId} deleted successfully.`);

            return {
                message: 'Adoption deleted successfully.',
                success: true,
            };
        }
    }
};

export default adoptionResolvers;