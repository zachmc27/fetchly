import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      pet {
        _id
        name
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      pet {
        _id
        name
      }
    }
  }
`;

export const QUERY_ORGS = gql`
  query orgs {
    orgs {
      _id
      orgName
      email
      pet {
        _id
        name
      }
    }
  }
`;

export const QUERY_ORG = gql`
  query org($orgName: String!) {
    org(orgName: $orgName) {
      _id
      orgName
      email
      pet {
        _id
        name
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      pet {
        _id
        name
      }
    }
  }
`;

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

