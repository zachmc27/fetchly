import { Adoption } from '../../models/index.js';

// AdoptionArgs
interface AdoptionArgs {
    adoptionId: string;
    poster: {
        refId: string;
        refModel: string;
    };
    pet: string;
    goodWithPets: string;
    description: string;
    location: string;
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
        location: string;
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
        location: string;
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
                .populate('media');
        },
        adoption: async (_parent: any, { adoptionId }: AdoptionArgs) => {
            return await Adoption.findById(adoptionId)
                .populate({
                    path: 'pet',
                    populate: { path: 'type' }
                })
                .populate('media');
        }
    },

    // Adoption Mutations
    Mutation: {
        createAdoption: async (_parent: any, { input }: AddAdoptionArgs) => {
            const adoption = await Adoption.create({ ...input });
            return adoption;
        },
        updateAdoption: async (_parent: any, { adoptionId, input }: UpdateAdoptionArgs) => {
            const adoption = await Adoption.findByIdAndUpdate(adoptionId, input, { new: true });
            return adoption;
        },
        deleteAdoption: async (_parent: any, { adoptionId }: AdoptionArgs) => {
            const adoption = await Adoption.findByIdAndDelete(adoptionId);
            return adoption;
        }
    }
};

export default adoptionResolvers;