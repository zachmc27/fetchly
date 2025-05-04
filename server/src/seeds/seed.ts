import db from '../config/connection.js';

import cleanDB from './cleanDB.js';


const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    // await Thought.insertMany(thoughtData);
    // await User.create(userData);
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
