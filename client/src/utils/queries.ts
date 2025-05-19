import { gql } from '@apollo/client';

//-------------- USER QUERIES ------------- //

//Return all users
export const QUERY_USERS = gql`
  query Users {
    users {
      _id
      email
      username
      avatar
      about
      conversations {
        _id
      }
      pets {
        _id
        name
      }
      posts {
        _id
        contentText}
      }
    }
  }
`;

//Pass in a userId to get a specific user
export const QUERY_USER = gql`
  query User($userId: String!) {
    user(userId: $userId) {
      _id
      email
      username
      password
      avatar
      about
      conversations {
        _id
      }
      pets {
        _id
        name
      }
      posts {
        _id
        contentText}
      }
    }
  }
`;

//Returns logged in user
export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
      username
      password
      avatar
      about
      conversations {
        _id
      }
      pets {
        _id
        name
      }
      posts {
        _id
        contentText}
      }
    }
  }
`;

//-------------- ORG QUERIES ------------- //

//Return all organizations
export const QUERY_ORGS = gql`
  query orgs {
    orgs {
      _id
      orgName
      email
      password
      avatar
      about
      location
      employees {
        _id
        username
      }
      pets {
        _id
        name
      }
      posts {
        _id
        contentText
      }
    }
  }
`;

//Pass in a orgId to get a specific organization
export const QUERY_ORG = gql`
  query org($orgId: String!) {
    org(orgId: $orgId) {
      _id
      orgName
      email
      password
      avatar
      about
      location
      employees {
        _id
        username
      }
      pets {
        _id
        name
      }
      posts {
        _id
        contentText
      }
    }
  }
`;

//-------------- PET QUERIES ------------- //

//Returns all pets
export const QUERY_PETS = gql`
  query Pets {
    pets {
      _id
      name
      owner {
        refId
        refModel
      }
      type
      gender
      age
      about
      profilePhoto
      vaccination
    }
  }
`;

//Pass in a petId to get a specific pet
export const QUERY_PET = gql`
  query Pet($petId: String!) {
    pet(petId: $petId) {
      _id
      name
      owner {
        refId
        refModel
      }
      type
      gender
      age
      about
      profilePhoto
      vaccination
    }
  }
`;

//-------------- POST QUERIES ------------- //

//Returns all posts
export const QUERY_POSTS = gql`
  query Posts {
    posts {
      _id
      poster {
        refId
        refModel
      }
      contentText
      media
      responses {
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
      responseCount
      createdAt
      parentPost
      isResponse
    }
  }
`;

// Pass in a postId to get a specific post
export const QUERY_POST = gql`
  query post($postId: ID!) {
    post(postId: $postId) {
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

//-------------- TYPE QUERIES ------------- //

// Returns all types
export const QUERY_TYPES = gql`
  query Types {
    types {
      _id
      type
      breed
    }
  }
`;

// Pass in a typeId to get a specific type
export const QUERY_TYPE = gql`
  query Type($typeId: String!) {
    type(typeId: $typeId) {
      _id
      type
      breed
    }
  }
`;