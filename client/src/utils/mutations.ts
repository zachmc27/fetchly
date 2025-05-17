import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

// LOGIN_USER input should look like this:
// {
//   "userId": "<userId>",
//   "email": "test@email.com",
//   "password": "password"
// }

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      username
      _id
    }
    token
  }
}
`;

// ADD_USER input should look like this:
// {
//   "input": {
//     "email": "test5@email.com",
//     "password": "password",
//     "username": "test5",
//   }
// }

export const LOGIN_ORG = gql`
  mutation login($email: String!, $password: String!) {
    loginOrg(email: $email, password: $password) {
      token
      org {
        _id
        orgName
      }
    }
  }
`;

export const ADD_ORG = gql`
  mutation Mutation($input: UserInput!) {
  addOrg(input: $input) {
    org {
      orgName
      _id
    }
    token
  }
}
`;

export const ADD_PET = gql`
  mutation Mutation($input: PetInput!) {
    addPet(input: $input) {
      _id
      name
      type
      gender
      age
      about
      profilePhoto
      vaccination
    }
  }
`;

// ADD_PET input should look like this:
// {
//   "input": {
//     "about": "A cute dog",
//     "age": 3,
//     "gender": "female",
//     "name": "Lulu",
//   }
// }


export const ADD_POST = gql`
  mutation Mutation($input: AddPostInput!) {
    addPost(input: $input) {
      _id
      postType
      contentText    
      poster {
        refId
        refModel
      }
    }
  }
`;

// ADD_POST input should look like this:
// { 
//   "input": {
//     "poster": {
//       "refId": "<userId>", // or "<orgId>"
//       "refModel": "User"  // or "Org"
//     },
//     "postType": "announcement",
//     "contentText": "This is a test post!",
//   }
// }