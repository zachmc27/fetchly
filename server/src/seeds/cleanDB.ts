import { Type } from '../models/index.js'; // Include .js if using ES modules
import process from 'process';
import path from 'path';

console.log(path.resolve('../models/index.js'));

const cleanDB = async (): Promise<void> => {
  try {
    // // Delete documents from Org collection
    // await Org.deleteMany({});
    // console.log('Org collection cleaned.');

    // // Delete documents from User collection
    // await User.deleteMany({});
    // console.log('User collection cleaned.');

    // Delete documents from BreedType collection
    await Type.deleteMany({});
    console.log('BreedType collection cleaned.');
  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
