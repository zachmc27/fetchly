import { gql } from '@apollo/client';

//-------------- USER QUERIES ------------- //

//Return all users
export const QUERY_USERS = gql`
  query Users {
    users {
      _id
      username      
      email
      avatar {
        id
        filename
        contentType
        length
        uploadDate
        gridFsId
        tags
      }
      about
      location
      pets {
        _id
        name
      }
      petCount
      meetUps {
        _id
        title
      }
      meetUpCount
      posts {
        _id
        contentText}
      }
      postCount
      following {
        _id
        username
      }
      conversation {
        _id
      }
      conversationCount
    }
  }
`;

//Pass in a userId to get a specific user
export const QUERY_USER = gql`
  query User($userId: String!) {
    user(userId: $userId) {
      _id
      username      
      email
      avatar {
        id
        filename
        contentType
        length
        uploadDate
        gridFsId
        tags
      }
      about
      location
      pets {
        _id
        name
      }
      petCount
      meetUps {
        _id
        title
      }
      meetUpCount
      posts {
        _id
        contentText}
      }
      postCount
      following {
        _id
        username
      }
      conversation {
        _id
      }
      conversationCount
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
      avatar {
        id
        filename
        contentType
        length
        uploadDate
        gridFsId
        tags
      }
      about
      location
      pets {
        _id
        name
      }
      petCount
      meetUps {
        _id
        title
      }
      meetUpCount
      posts {
        _id
        contentText}
      }
      postCount
      following {
        _id
        username
      }
      conversation {
        _id
      }
      conversationCount
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
      avatar {
        id
        filename
        contentType
        length
        uploadDate
        gridFsId
        tags
      }
      about
      location
      employees {
        _id
        username
      }
      employeeCount
      pets {
        _id
        name
      }
      petCount
      posts {
        _id
        contentText
      }
      postCount
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
      avatar {
        id
        filename
        contentType
        length
        uploadDate
        gridFsId
        tags
      }
      about
      location
      employees {
        _id
        username
      }
      employeeCount
      pets {
        _id
        name
      }
      petCount
      posts {
        _id
        contentText
      }
      postCount
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
      type {
        _id
        type
        breed
      }
      gender
      age
      about
      profilePhoto {
        id
        filename
        contentType
        length
        uploadDate
        gridFsId
        tags
      }
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
      type {
        _id
        type
        breed
      }
      gender
      age
      about
      profilePhoto {
        id
        filename
        contentType
        length
        uploadDate
        gridFsId
        tags
      }
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
      itemType
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
      itemType
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

//-------------- MEETUP QUERIES ------------- //
// Returns all meetups
export const QUERY_MEETUPS = gql`
  query MeetUps {
    meetUps {
      _id
      title
      poster {
        refId
        refModel
      }
      description
      location
      date
      time
      attendees
      numberOfAttendees
      comments {
        _id
      }
      numberOfComments
      media
      createdAt
      itemType
    }
  }
`;

// Returns specific meetup by id
export const QUERY_MEETUP = gql`
  query MeetUp($meetUpId: ID!) {
    meetUp(meetUpId: $meetUpId) {
      _id
      title
      poster {
        refId
        refModel
      }
      description
      location
      date
      time
      attendees
      numberOfAttendees
      comments {
        _id
      }
      numberOfComments
      media
      createdAt
      itemType
    }
  }
`;

//-------------- MEETUP COMMENT QUERIES ------------- //

// Returns all meetup comments
export const QUERY_MEETUP_COMMENTS = gql`
  query MeetUpComments {
    meetUpComments {
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
      parentComment
      isResponse
      createdAt
      meetUpId
      itemType
    }
  }
`;

// Returns specific meetup comment by id
export const QUERY_MEETUP_COMMENT = gql`
  query MeetUpComment($meetUpCommentId: ID!) {
    meetUpComment(meetUpCommentId: $meetUpCommentId) {
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
      parentComment
      isResponse
      createdAt
      meetUpId
      itemType
    }
  }
`;

//-------------- ADOPTION QUERIES ------------- //

// Returns all Adoptions
export const QUERY_ADOPTIONS = gql`
  query Adoptions {
    adoptions {
      _id
      poster {
        refId
        refModel
      }
      pet {
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
        profilePhoto {
          id
          filename
          contentType
          length
          uploadDate
          gridFsId
          tags
        }
        vaccination
      }
      goodWithPets
      description
      location
      media {
        id
        filename
        contentType
        length
        uploadDate
        gridFsId
        tags
      }
      adoptionStatus
      adoptedBy {
        refId
        refModel
      }
      createdAt
      itemType
    }
  }
`;

// Returns a single Adoption based on ID passed in
export const QUERY_ADOPTION = gql`
  query Adoption($adoptionId: ID!) {
    adoption(adoptionId: $adoptionId) {
      _id
      poster {
        refId
        refModel
      }
      pet {
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
        profilePhoto {
          id
          filename
          contentType
          length
          uploadDate
          gridFsId
          tags
        }
        vaccination
      }
      goodWithPets
      description
      location
      media {
        id
        filename
        contentType
        length
        uploadDate
        gridFsId
        tags
      }
      adoptionStatus
      adoptedBy {
        refId
        refModel
      }
      createdAt
      itemType
    }
  }
`;

//-------------- MEDIA QUERIES ------------- //

//Returns a media file by ID
// This is used to get the media file from the database
// Locally, you can then use the gridFsId to get the file from the server
// Local URL should look like this: http://localhost:3001/media/<gridFsId>
export const MEDIA = gql`
  query Media($mediaId: ID!) {
    media(id: $mediaId) {
      id
      filename
      contentType
      length
      uploadDate
      gridFsId
      tags
    }
  }
`;

// Returns all media files
export const ALL_MEDIA = gql`
  query AllMedia {
    allMedia {
      id
      filename
      contentType
      length
      uploadDate
      gridFsId
      tags
    }
  }
`;