import { Pet } from '../../models/index.js';

// PetArgs

interface PetArgs {
    petId: string;
    input: {
        petId: string;
        name: string;
        type: string;
        gender: string;
        age: number;
        about: string;
        profilePhoto: string;
        vaccination: string;
    }
}

const petResolvers = {
    Query: {
        // Pet Queries
        pets: async () => {
            return await Pet.find();
        },
        pet: async (_parent: any, { petId }: PetArgs) => {
            return Pet.findById(petId);
        }
    },

    Mutation: {
        //Pet Mutations
        addPet: async (_parent: any, { input }: PetArgs) => {
            const pet = await Pet.create({ ...input });
            return pet;
        },
        updatePet: async (_parent: any, { petId, input }: PetArgs) => {
            const pet = await Pet.findByIdAndUpdate(petId, { ...input }, { new: true });
            return pet;
        },
        deletePet: async (_parent: any, { petId }: any) => {
            const pet = await Pet.findByIdAndDelete(petId);
            return pet;
        }
    }
};
export default petResolvers;