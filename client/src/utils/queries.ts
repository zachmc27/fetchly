import { gql } from '@apollo/client';

//Return all users
export const QUERY_USERS = gql`
  query Users {
    users {
      _id
      email
      username
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
    }
  }
`;

//Return all organizations
export const QUERY_ORGS = gql`
  query orgs {
    orgs {
      _id
      orgName
      email
    }
  }
`;

//Pass in a orgId to get a specific organization
export const QUERY_ORG = gql`
  query org($orgName: String!) {
    org(orgName: $orgName) {
      _id
      orgName
      email
    }
  }
`;

//Returns logged in user
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

//Returns all posts
export const QUERY_POSTS = gql`
  query posts {
    posts {
      _id
      poster {
        refId
        refModel
      }
      postType
      contentText
      media
    }
  }
`;

//Pass in a postId to get a specific post
export const QUERY_POST = gql`
  query post($postId: ID!) {
    post(postId: $postId) {
      _id
      poster {
        refId
        refModel
      }
      postType
      contentText
      media
    }
  }
`;

//Pass in a postType to get a specific post
export const QUERY_POST_TYPE = gql`
  query postType($postType: String!) {
    postType(postType: $postType) {
      _id
      poster {
        refId
        refModel
      }
      postType
      contentText
      media
    }
  }
`;

//Returns all pets
export const QUERY_PETS = gql`
  query Pets {
    pets {
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

//Pass in a petId to get a specific pet
export const QUERY_PET = gql`
  query Pet($petId: String!) {
    pet(petId: $petId) {
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