import { gql } from '@apollo/client';

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