import { gql } from '@apollo/client';

// ------------- USER MUTATIONS ------------- //

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
        _id   
        username       
        email
        password
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

export const UPDATE_USER = gql`
  mutation Mutation($userId: String!, $input: UserInput!) {
    updateUser(userId: $userId, input: $input) {
      _id
      email
      username
      about
    }
  }
`;  

// UPDATE_USER input should look like this:
// {
//   "userId": "<userId>",
//   "input": {
//     "email": "newemail@email.com",
//     "password": "password",
//     "username": "New username",
//     "about": "I'm a fantastic person!",
//   }
// }



// ------------- ORG MUTATIONS ------------- //

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
  mutation Mutation($input: OrgInput!) {
    addOrg(input: $input) {
      org {
        orgName
        _id
        email
        password
      }
      token
    }
  }
`;

// ADD_ORG input should look like this:
// {
//   "input": {
//     "orgName": "Fetchly",
//     "email": "fetchly@email.com",
//     "password": "password",
//   }
// }

export const UPDATE_ORG = gql`
  mutation Mutation($orgId: String!, $input: OrgInput!) {
    updateOrg(orgId: $orgId, input: $input) {
      _id
      orgName
      email
      password
      about
    }
  }
`;

// UPDATE_ORG input should look like this:
// {
//   "orgId": "<orgId>",
//   "input": {
//     "orgName": "Fetchly 2.0",
//     "email": "fetchly2@email.com"
//     "password": "password",
//     "about": "We are a pet adoption organization!",
//     "employees": [
//       { 
//         "_id": "<userId>",
//       }
//     ],
//   }
// }

// ------------- PET MUTATIONS ------------- //

export const ADD_PET = gql`
  mutation Mutation($input: PetInput!) {
    addPet(input: $input) {
      _id
      name
      owner {
        refId
        refModel
      }
      type {
        _id
        type
        breed
      }
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
//     "owner": {
//       "refId": "<userId>",
//       "refModel": "User" or "Org"
//     },
//     "profilePhoto": "https://example.com/photo.jpg",
//     "type": <typeId>,
//     "vaccination": [
//       {
//         "name": "Rabies",
//         "date": "2023-01-01"
//       },
//       {
//         "name": "Parvovirus",
//         "date": "2023-02-01"
//       }
//     ]
//   }
// }

export const UPDATE_PET = gql`
  mutation Mutation($petId: String!, $input: UpdatePetInput!) {
    updatePet(petId: $petId, input: $input) {
      _id
      name
      owner {
        refId
        refModel
      }
      type {
        _id
        type
        breed
      }
      gender
      age
      about
      profilePhoto
      vaccination
    }
  }
`;

// UPDATE_PET input should look like this:
// {
//   "petId": "<petId>",
//   "input": {
//     "about": "A cute dog",
//     "age": 4,
//     "gender": "male",
//     "name": "Lulu 2",
//     "profilePhoto": "https://example.com/photo.jpg",
//     "type": <typeId>,
//     "vaccination": [
//       {
//         "name": "Rabies",
//         "date": "2023-01-01"
//       },
//       {
//         "name": "Parvovirus",
//         "date": "2023-02-01"
//       }
//     ]
//   }
// }

export const UPDATE_OWNER = gql`
  mutation Mutation($petId: String!, $input: OwnerInput!) {
    updateOwner(petId: $petId, input: $input) {
      _id
      name
      owner {
        refId
        refModel
      }
      type {
        _id
        type
        breed
      }
      gender
      age
      about
      profilePhoto
      vaccination
    }
  }
`;

// UPDATE_OWNER input should look like this:
// {
// "petId": "<petId>",
// "input": {
//   "owner": {
//     "refId": "<userId>",
//     "refModel": "User" or "Org"
//   }
// }
// }

// ------------- POST MUTATIONS ------------- //

export const ADD_POST = gql`
  mutation Mutation($input: AddPostInput!) {
    addPost(input: $input) {
      _id
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
//     "contentText": "This is a test post!",
//   }
// }

export const DELETE_POST = gql`
  mutation DeletePost($deletePostId: String!) {
    deletePost(postId: $deletePostId) {
      _id
    }
  }
`;

// DELETE_POST input should look like this:
// {
//   "deletePostId": "<postId>"
// }

export const UPDATE_POST = gql`
  mutation UpdatePost($updatePostId: String!, $updatePostInput: UpdatePostInput!) {
    updatePost(postId: $updatePostId, input: $updatePostInput) {
      _id
      poster {
        refId
        refModel
      }
      contentText
      media
      responses {
        _id
      }
      responseCount
      createdAt
      parentPost
      isResponse
    }
  }
`;

// UPDATE_POST input should look like this:
// {
//  "updatePostId": <postId>,
//  "updatePostInput": {
//    "contentText": "I love my cat so much, she is super adorable!"
//  },
// }

export const ADD_POST_RESPONSE = gql`
  mutation AddPostResponse($addPostResponsePostId: String!, $addPostResponseInput: AddPostResponseInput!) {
    addPostResponse(postId: $addPostResponsePostId, input: $addPostResponseInput) {
      _id
      poster {
        refId
        refModel
      }
      contentText
      media
      responses {
        _id
      }
      responseCount
      createdAt
      parentPost
      isResponse
    }
  }
`;

// ADD_POST_RESPONSE input should look like this:
// {
//   "addPostResponsePostId": <parentPostId>,
//   "addPostResponseInput": {
//     "poster": {
//       "refId": <User or Org Id>,
//       "refModel": "User" or "Org"
//     },
//     "contentText": "I agree, she is super adorable!",
//   },
// }

// ------------- TYPE MUTATIONS ------------- //
export const ADD_TYPE = gql`
  mutation Mutation($input: TypeInput!) {
    addType(input: $input) {
      _id
      type
      breed
    }
  }
`;

// ADD_TYPE input should look like this:
// {
//   "input": {
//     "type": "dog",
//     "breed": "golden retriever"
//   }
// }

export const UPDATE_TYPE = gql`
  mutation Mutation($typeId: String!, $input: TypeInput!) {
    updateType(typeId: $typeId, input: $input) {
      _id
      type
      breed
    }
  }
`;

// UPDATE_TYPE input should look like this:
// {
//    "typeId": "<typeId>",
//    "input": {
//      "type": "dog",
//      "breed": "golden retriever"
//    }
// }

export const DELETE_TYPE = gql`
  mutation Mutation($typeId: String!) {
    deleteType(typeId: $typeId) {
      _id
      type
      breed
    }
  }
`;

// DELETE_TYPE input should look like this:
// {
//   "typeId": "<typeId>"
// }