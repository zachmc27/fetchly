import { Org } from '../models/index.js';
import orgData from './data/organizations.json' with { type: 'json' }; // import the seed data


interface seedOrg{

    orgName: string;
    email: string;
    password: string;
    about: string;
    website: string;
};

interface entities{

    name: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}
const locationSearchList: entities[] = [];



const newOrgs: seedOrg[] = []; // create an empty array to hold the new orgs with proper type

const orgDataLength = orgData.organizations.length; // get the length of the organizations array


// loops through the data objects can creates a new org object for each one
// and pushes it to the newOrgs array
// and creates a new locationSearchList object for each one
// and pushes it to the locationSearchList array
for (let i=0; i < orgDataLength; i++) { // loop through the organizations array
    locationSearchList.push({
        name: orgData.organizations[i].name,
        city: orgData.organizations[i].address?.city || '',
        state: orgData.organizations[i].address?.state || '',
        zip: orgData.organizations[i].address?.postcode || '',
        country: orgData.organizations[i].address?.country || ''
    });
    newOrgs.push({ // push a new org object to the newOrgs array
        orgName: orgData.organizations[i].name,
        email: orgData.organizations.some((org, index) => org.email === orgData.organizations[i].email && index !== i) 
            ? `${orgData.organizations[i].email}${i}` 
            : orgData.organizations[i].email,
        password: `password${i}`,
        about: orgData.organizations[i].mission_statement || '',
        website: orgData.organizations[i].website || ''
    });

}

// loop through the newOrgs array and create a new Org object for each org in the database
const createOrgs = async () => {
    await Org.insertMany(newOrgs); // insert the new orgs into the database
    console.log('Organizations seeded successfully!'); // log success message
    return newOrgs; // return the new orgs
};







// export the createOrgs function and locationSearchList
export { createOrgs, locationSearchList };