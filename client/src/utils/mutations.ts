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

export const ADD_POST = gql`
  mutation Mutation($input: PostInput!) {
  addPost(input: $input) {
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