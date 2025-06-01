// this file loops through both the cat and dog breed json fils
// and creates a new Type object for each breed
import { Type } from '../models/index.js';
import breedData from './data/breed_data.json' with { type: 'json' }; // import the seed data
// setting the catBreed const to the json file named cat_breeds.json


interface Breed {
    type: string;
    breed: string;
}

const breedType: Breed[] = [];
const breedDataLength = breedData.length;

for (let i=0; i < breedDataLength; i++) {
    breedType.push({
        type: breedData[i].type?.toString() || 'Unknown',
        breed: breedData[i].breed
    })
}

// loop through the breedType array and create a new Type object for each breed in the database

const createTypes = async () => {

    Type.insertMany(breedType)
    await Type.insertMany(breedType);

    console.log('Types seeded successfully!');
    return breedType;}

export default createTypes;