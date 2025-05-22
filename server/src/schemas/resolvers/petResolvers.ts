import { Pet, User, Org } from '../../models/index.js';

// PetArgs

interface PetArgs {
    petId: string;
    input: {
        petId: string;
        name: string;
        owner: {
            refId: string;
            refModel: string;
        };
        type: string;
        gender: string;
        age: number;
        about: string;
        profilePhoto: string;
        vaccination: string;
    }
}

interface UpdateOwnerArgs {
  petId: string;
  input: {
    refId: string;
    refModel: string;
  }
}

interface UpdatePetArgs {
    petId: string;
    input: {
        name: string;
        owner: {
            refId: string;
            refModel: string;
        };
        type: string
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
            return await Pet.find()
                .populate('type')
                .populate('media');
        },
        pet: async (_parent: any, { petId }: PetArgs) => {
            return Pet.findById(petId)
                .populate('type')
                .populate('media');
        }
    },

    Mutation: {
        //Pet Mutations
        addPet: async (_parent: any, { input }: PetArgs) => {
            const pet = await Pet.create({ ...input, type: input.type });

            const { refId, refModel } = input.owner;

            if(refModel === 'User') {
                await User.findByIdAndUpdate(refId, {
                $push: {pets: pet._id }
            });
            } else if (refModel === 'Org') {
                await Org.findByIdAndUpdate(refId, {
                $push: {pets: pet._id }
            });
            }

            return pet;
        },
        updateOwner: async (_parent: any, { petId, input }: UpdateOwnerArgs) => {
            const pet = await Pet.findByIdAndUpdate(petId);
            if (!pet || pet._id === null) return;
            
            // Store original owner ids
            const previousOwnerId = pet.owner?.refId;
            const previousOwnerModel = pet.owner?.refModel;

            const updatedPet = await Pet.findByIdAndUpdate(
                petId, 
                { owner: input }, 
                { new:true }
            );

            if (!updatedPet) return;
            
            const { refId, refModel } = input;

            // Add pet to new owner's array
            if(refModel === 'User') {
                    await User.findByIdAndUpdate(refId, {
                    $addToSet: {pets: pet._id }
                });
            } else if (refModel === 'Org') {
                    await Org.findByIdAndUpdate(refId, {
                    $addToSet: {pets: pet._id }
                });
            }

            // Remove pet from original owner's array                
            if (previousOwnerId && previousOwnerId.toString() !== refId.toString()) {
                if (previousOwnerModel === 'User') {
                    await User.findByIdAndUpdate(previousOwnerId, {
                        $pull: { pets: pet._id }
                    });
                } else if (previousOwnerModel === 'Org') {
                    await Org.findByIdAndUpdate(previousOwnerId, {
                        $pull: { pets: pet._id }
                    });
                }
            }
            return updatedPet;
        },
        updatePet: async (_parent: any, { petId, input }: UpdatePetArgs) => {
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