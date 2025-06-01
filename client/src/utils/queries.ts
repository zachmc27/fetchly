import { gql } from '@apollo/client';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

//-------------- USER QUERIES ------------- //

//Return all users
export const QUERY_USERS = gql`
  query Users {
    users {
      _id
      username   
      fullName   
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
      location {
        _id
        address
        zip
        city
        state
        country
      }
      pets {
        _id
        name
        type {
          _id
          type
          breed
        }
        gender
        age
        neuteredOrSpayed
        about
        vaccination
      }
      petCount
      meetUps {
        _id
        title
      }
      meetUpCount
      posts {
        _id
        contentText
      }
      postCount
      conversation {
        conversationName
      }
      conversationCount
      likedPosts {
        contentText
      }
      likedPostsCount
      organizations {
        orgName
      }
      following {
        refId {
          ... on User {
            username
            email
          }
          ... on Pet {
            name
          }
          ... on Org {
            orgName
          }
        }
         refModel         
      }
      followingCount
      followedBy {
        refId {
          ... on User {
            username
            email
          }
          ... on Org {
            orgName
          }
        }
         refModel         
      }
      followedByCount      
    }
  }
`;

//Pass in a userId to get a specific user
export const QUERY_USER = gql`
  query User($userId: String!) {
    user(userId: $userId) {
      _id
      username
      fullName
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
        url
      }
      about
      location {
        _id
        address
        zip
        city
        state
        country
      }
      pets {
        _id
        name
        type {
          _id
          type
          breed
        }
        gender
        age
        size
        neuteredOrSpayed
        about
        profilePhoto {
          id
          filename
          contentType
          length
          uploadDate
          gridFsId
          tags
          url
        }
        vaccination
        followedByCount
      }
      petCount
      meetUps {
        _id
        title
      }
      meetUpCount
      posts {
        _id
        contentText
      }
      postCount
      likedPosts {
        _id
        contentText
      }
      likedPostsCount
      following {
        refId {
          ... on User {
            _id
            username
          }
          ... on Pet {
            _id
            name
          }
          ... on Org {
            _id
            orgName
          }
        }
        refModel
      }
      followingCount
    }
  }
`;

// Example function to call QUERY_USER using Apollo Client

export async function fetchUser(
  client: ApolloClient<NormalizedCacheObject>,
  userId: string
) {
  const { data } = await client.query({
    query: QUERY_USER,
    variables: { userId },
  });
  return data.user;
}

//Returns logged in user
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username   
      fullName   
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
      location {
        _id
        address
        zip
        city
        state
        country
      }
      pets {
        _id
        name
        type {
          _id
          type
          breed
        }
        gender
        age
        neuteredOrSpayed
        about
        vaccination
      }
      petCount
      meetUps {
        _id
        title
      }
      meetUpCount
      posts {
        _id
        contentText
      }
      postCount
      following {
        _id
        username
      }
      conversation {
        _id
        conversationName
      }
      conversationCount
      likedPosts {
        _id
        contentText
      }
      likedPostsCount
      organizations {
        _id
        orgName
      }
      following {
        refId {
          ... on User {
            _id
            username
            email
          }
          ... on Pet {
            _id
            name
          }
          ... on Org {
            _id
            orgName
          }
        }
         refModel         
      }
      followingCount
      followedBy {
        refId {
          ... on User {
            _id
            username
            email
          }
          ... on Org {
            _id
            orgName
          }
        }
         refModel         
      }
      followedByCount      
    }
  }
`;

export const QUERY_USER_BY_USERNAME = gql`
query UserByUsername($username: String!) {
  userByUsername(username: $username) {
    _id
    username
  }
}`;

export const GET_FOLLOWERS = gql`
query GetFollowers($userId: String!) {
  user(userId: $userId) {
    followedBy {
      refId {
        ... on User {
          username
          _id
        }
      }
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
      location {
        _id
        address
        zip
        city
        state
        country
      }
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
      likedPosts {
        _id
        contentText
      }
      likedPostsCount
      following {
        refId {
          ... on User {
            _id
            username
            email
          }
          ... on Pet {
            _id
            name
          }
          ... on Org {
            _id
            orgName
          }
        }
         refModel         
      }
      followingCount
      followedBy {
        refId {
          ... on User {
            _id
            username
            email
          }
          ... on Org {
            _id
            orgName
          }
        }
         refModel         
      }
      followedByCount     
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
      location {
        _id
        address
        zip
        city
        state
        country
      }
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
      likedPosts {
        _id
        contentText
      }
      likedPostsCount
      following {
        refId {
          ... on User {
            _id
            username
            email
          }
          ... on Pet {
            _id
            name
          }
          ... on Org {
            _id
            orgName
          }
        }
         refModel         
      }
      followingCount
      followedBy {
        refId {
          ... on User {
            _id
            username
            email
          }
          ... on Org {
            _id
            orgName
          }
        }
         refModel         
      }
      followedByCount     
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
        refId {
          ... on User {
            _id
            username
          }
          ... on Org {
            _id
            orgName
          }
        }
        refModel
      }
      type {
        _id
        type
        breed
      }
      gender
      age
      size
      neuteredOrSpayed
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
      followedBy {
        refId {
          ... on User {
            _id
            username
            email
          }
          ... on Org {
            _id
            orgName
          }
        }
         refModel         
      }
      followedByCount 
      taggedPosts {
        _id
        contentText
      }
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
        refId {
          ... on User {
            _id
            username
          }
          ... on Org {
            _id
            orgName
          }
        }
        refModel
      }
      type {
        _id
        type
        breed
      }
      gender
      age
      size
      neuteredOrSpayed
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
      followedBy {
        refId {
          ... on User {
            _id
            username
            email
          }
          ... on Org {
            _id
            orgName
          }
        }
         refModel         
      }
      followedByCount 
      taggedPosts {
        _id
        contentText
      }
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
        refId {
          ... on User {
            _id
            username
            avatar {
              url
            }
          }
          ... on Org {
            _id
            orgName
            avatar {
              url
            }
          }
        }
        refModel
      }
      contentText
      media {
        id
        filename
        contentType
        length
        uploadDate
        gridFsId
        tags
        url
      }
      responses {
        _id
        poster {
          refId {
             ... on User {
              _id
              username
              avatar {
                url
              }
             }
             ... on Org {
               _id
              orgName            
              avatar {
                url
              }
             }
          }
           refModel
        }
        contentText
      }
      responseCount
      likes {
        refId {
          ... on User {
            _id
            username
          }
          ... on Org {
            _id
            orgName
          }
        }
        refModel
      }
      likesCount
      parentPost  
      isResponse          
      createdAt
      itemType
      taggedPets {
        _id
        name
        gender
      }
    }
  }
`;

// Pass in a postId to get a specific post
export const QUERY_POST = gql`
  query post($postId: ID!) {
    post(postId: $postId) {
      _id
      poster {
        refId {
          ... on User {
            _id
            username
          }
          ... on Org {
            _id
            orgName
          }
        }
        refModel
      }
      contentText
      media {
        id
        filename
        contentType
        length
        uploadDate
        gridFsId
        tags
      }
      responses {
        _id
        poster {
          refId {
             ... on User {
              _id
              username
             }
             ... on Org {
               _id
              orgName
             }
          }
           refModel
        }
        contentText
      }
      responseCount
      likes {
        refId {
          ... on User {
            _id
            username
          }
          ... on Org {
            _id
            orgName
          }
        }
        refModel
      }
      likesCount
      parentPost  
      isResponse          
      createdAt
      itemType
      taggedPets {
        _id
        name
        gender
      }
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

// Filtered types query
export const FILTER_QUERY_TYPE = gql`
  query TypesByType($type: String!) {
    types(type: $type) {
      _id
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
        refId {
          ... on User {
            _id
            username
          }
          ... on Org {
            _id
            orgName
          }
        }
        refModel
      }
      description
      location {
        _id
        address
        zip
        city
        state
        country
      }
      date
      time
      attendees
      numberOfAttendees
      comments {
        _id
        poster {
          refId {
            ... on User {
              _id
              username
            }
            ... on Org {
              _id
              orgName
            }
          }
          refModel
        }
        contentText
      }
      numberOfComments
      media {
        id
        filename
        contentType
        length
        uploadDate
        gridFsId
        tags
      }
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
        refId {
          ... on User {
            _id
            username
          }
          ... on Org {
            _id
            orgName
          }
        }
        refModel
      }
      description
      location {
        _id
        address
        zip
        city
        state
        country
      }
      date
      time
      attendees
      numberOfAttendees
      comments {
        _id
        poster {
          refId {
            ... on User {
              _id
              username
            }
            ... on Org {
              _id
              orgName
            }
          }
          refModel
        }
        contentText
      }
      numberOfComments
      media {
        id
        filename
        contentType
        length
        uploadDate
        gridFsId
        tags
      }
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
        refId {
          ... on User {
            _id
            username
          }
          ... on Org {
            _id
            orgName
          }
        }
        refModel
      }
      contentText
      meetUpId
      media {
        id
        filename
        contentType
        length
        uploadDate
        gridFsId
        tags
      }
      responses {
        _id
        poster {
          refId {
            ... on User {
              _id
              username
            }
            ... on Org {
             _id
              orgName
            }
          }
          refModel
        }
        contentText
      }
      responseCount
      parentComment
      isResponse
      createdAt
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
        refId {
          ... on User {
            _id
            username
          }
          ... on Org {
            _id
            orgName
          }
        }
        refModel
      }
      contentText
      meetUpId
      media {
        id
        filename
        contentType
        length
        uploadDate
        gridFsId
        tags
      }
      responses {
        _id
        poster {
          refId {
            ... on User {
              _id
              username
            }
            ... on Org {
             _id
              orgName
            }
          }
          refModel
        }
        contentText
      }
      responseCount
      parentComment
      isResponse
      createdAt
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
        _id
        orgName
        email
        phone
        website
        avatar {
          id
          filename
          contentType
          length
          uploadDate
          gridFsId
          tags
          url
        }
        about
      }
      pet {
        _id
        name
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
          url
        }
        vaccination
        neuteredOrSpayed
      }
      goodWithPets
      description
      location {
        _id
        address
        zip
        city
        state
        country
      }
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
        _id
        orgName
        email
        phone
        website
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
      }
      pet {
        _id
        name
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
        neuteredOrSpayed
      }
      goodWithPets
      description
      location {
        _id
        address
        zip
        city
        state
        country
      }
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
        _id
        username
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



// ------------- Conversation QUERIES ------------- //

export const GET_CONVERSATIONS = gql`
  query Conversations {
    conversations {
      _id
      conversationName
      conversationUsers {
        _id
      }
      lastMessage {
        _id
        textContent
      }
      messages {
        _id
        messageUser {
          _id
        }
        textContent
      }
    }
  }
`;


export const GET_CONVERSATION = gql`
query Conversations($conversationId: String!) {
  conversation(conversationId: $conversationId) {
    _id
    conversationName
    conversationUsers {
      _id
      username
    }
    lastMessage {
      _id
      textContent
      messageUser {
        _id
        username
      }
      formattedCreatedAt
    }
    messages {
      _id
      messageUser {
        _id
        username
      }
      textContent
      formattedCreatedAt
    }
  }
}`;
// You can expand upon the following values to include more details other than id:
// USERS - You can grab name/uersname, email, etc.
// MESSAGES - You can grab the message textConent, MessageUser, etc.


export const GET_CONVERSATION_BY_USER = gql`
query ConversationByUser($userId: String!) {
  conversationByUser(userId: $userId) {
    _id
    conversationName
    conversationUsers {
      _id
    }
    lastMessage {
      _id
      textContent
    }
    messages {
      _id
    }
    formattedCreatedAt
  }
}`;

// ----------- MESSAGES QUERIES ------------- //

export const GET_MESSAGES = gql`
query Messages {
  messages {
    _id
    textContent
    conversation {
      _id
    }
  }
}
`;

export const GET_MESSAGES_BY_CONVERSATION = gql`
query MessageByConversation($conversationId: String!) {
  messageByConversation(conversationId: $conversationId) {
    _id
    conversation {
      _id
      conversationName
    }
    formattedCreatedAt
    isRead
    itemType
    media {
      gridFsId
    }
    messageUser {
      _id
      username
    }
    textContent
  }
}`;

export const GET_MESSAGES_BY_ID = gql`
  query Message($messageId: String!) {
    message(messageId: $messageId) {
      _id
      conversation {
        _id
      }
      media {
        id
      }
      messageUser {
        _id
      }
      textContent
    }
  }
`;

//INPUT
// {
//   "messageId": "<messageId>"
// }
