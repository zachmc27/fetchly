import db from '../config/connection.js';
import createTypes from './seed_types.js';
import { createOrgs } from './seed_orgs.js';
// import cleanDB from './cleanDB.js';

const seedDatabase = async (): Promise<void> => {
  try {
    console.log('Connecting to the database...');
    await db();
    console.log('Database connected successfully.');

    console.log('Cleaning the database...');
    // await cleanDB();
    console.log('Database cleaned successfully.');

    console.log('Seeding types...');
    await createTypes();
    console.log('Types seeded successfully!');

    console.log('Seeding organizations...');
    await createOrgs();
    console.log('Organizations seeded successfully!');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error seeding database:', error.message, error.stack);
    } else {
      console.error('Error seeding database:', error);
    }
    process.exit(1);
  }
};

void seedDatabase();
