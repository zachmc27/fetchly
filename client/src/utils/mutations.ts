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
//   "email": "test@email.com",
//   "password": "password"
// }

export const ADD_USER = gql`
  mutation Mutation($input: AddUserInput!) {
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
  mutation UpdateUser($userId: String!, $input: UpdateUserInput!) {
    updateUser(userId: $userId, input: $input) {
      user {
        _id
      }
    }
  }
`;  

// UPDATE_USER input should look like this:
// {
//   "userId": "<userId>",
//   "input": {
//     "username": "New username",
//     "email": "newemail@email.com",
//     "avatar": <mediaId>,
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

// LOGIN_ORG input should look like this:
// {
//   "email": "test@email.com",
//   "password": "password"
// }

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
    }
  }
`;

// UPDATE_ORG input should look like this:
// {
//   "orgId": "<orgId>",
//   "input": {
//     "orgName": "Fetchly 2.0",
//     "email": "fetchly2@email.com"
//    "avatar": <mediaId>,
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
    }
  }
`;

// ADD_PET input should look like this:
// {
//   "input": {
//     "about": "A cute dog",
//     "age": 3,
//     "size": "large",
//     "neuteredOrSpayed": true,
//     "gender": "female",
//     "name": "Lulu",
//     "owner": {
//       "refId": "<userId>",
//       "refModel": "User" or "Org"
//     },
//     "type": <typeId>,
//     "vaccination": "Vaccination details",
//   }
// }

export const UPDATE_PET = gql`
  mutation Mutation($petId: String!, $input: UpdatePetInput!) {
    updatePet(petId: $petId, input: $input) {
      _id
      name
    }
  }
`;

// UPDATE_PET input should look like this:
// {
//   "petId": "<petId>",
//   "input": {
//     "name": "Lulu",
//     "type": <typeId>,
//     "gender": "male",
//     "age": 4,
//     "size": "large",
//     "neuteredOrSpayed": true,
//     "about": "A cute dog",
//     "profilePhoto": <mediaId>,
//     "vaccination": "Vaccination details",
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


// ------------- MEETUP MUTATIONS ------------- //

export const ADD_MEETUP = gql`
  mutation AddMeetUp($input: AddMeetUpInput!) {
    addMeetUp(input: $input) {
      _id
      title
    }
  }
`;

// ADD_MEETUP input should look like this:
// {
//   "input": {
//     "title": "Lakeside Dog Walk",
//     "poster": {
//       "refId": <userId>,
//       "refModel": "User" | "Org"
//     },
//     "description": "Let's go for a walk along the river with our dogs.",
//    "location": {
//      "address": "1007 Mountain Drive",
//      "zip": "987432",
//      "city": "Gotham",
//      "state": "New Jersey",
//      "country": "USA"
//    },
//     "date": "2025-10-22",
//     "time": "12:00am",
//     "media": [<mediaId1>, <mediaId2>]
//   },
// }

export const UPDATE_MEETUP = gql`
  mutation UpdateMeetUp($updateMeetUpMeetUpId: String!, $input: UpdateMeetUpInput!) {
    updateMeetUp(meetUpId: $updateMeetUpMeetUpId, input: $input) {
      _id
      title
    }
  }
`;

// UPDATE_MEETUP input should look like this:
// {
//   "updateMeetUpMeetUpId": "<meetUpId>",
//   "input": {
//     "title": "Lakeside Dog Walk",
//     "description": "Let's go for a walk along the river with our dogs.",
//    "location": {
//      "address": "89 Go Drive",
//      "zip": "872349",
//      "city": "Houston",
//      "state": "TX",
//      "country": "USA"
//    },
//     "date": "2025-10-22",
//     "time": "12:00am",
//     "media": ["682f65d28a3c7ce49cde24a1"]
//   },
// }

export const DELETE_MEETUP = gql`
  mutation DeleteMeetUp($deleteMeetUpMeetUpId: String!) {
    deleteMeetUp(meetUpId: $deleteMeetUpMeetUpId) {
      _id
    }
  }
`;

// DELETE_MEETUP input should look like this:
// {
//   "deleteMeetUpMeetUpId": "<meetUpId>"
// }

export const ATTEND_MEETUP = gql`
  mutation AttendMeetUp($meetUpId: String!, $userId: String!) {
    attendMeetUp(meetUpId: $meetUpId, userId: $userId) {
      message
      success
    }
  }
`;

// ATTEND_MEETUP input should look like this:
// {
//   "meetUpId": "<meetUpId>",
//   "userId": "<userId>"
// }

export const UNATTEND_MEETUP = gql`
  mutation UnAttendMeetUp($meetUpId: String!, $userId: String!) {
    unAttendMeetUp(meetUpId: $meetUpId, userId: $userId) {
      message
      success
    }
  }
`;

// UNATTEND_MEETUP input should look like this:
// {
//   "meetUpId": "<meetUpId>",
//   "userId": "<userId>"
// }

// ------------- MEETUP COMMENT MUTATIONS ------------- //

export const ADD_MEETUP_COMMENT = gql`
  mutation CreateMeetUpComment($input: MeetUpCommentInput!) {
    createMeetUpComment(input: $input) {
      _id
      poster {
        refId
        refModel
      }
      contentText
      meetUpId
      media
      responses {
        _id
      }
      responseCount
      parentComment
      isResponse
      createdAt
    }
  }
`;

// ADD_MEETUP_COMMENT input should look like this:
// {
// "input": {
//   "meetUpId": "<meetUpId>",
//   "poster": {
//     "refId": "<userId>",
//     "refModel": "User" | "Org"
//   },
//   "contentText": "This is a test comment!",
// }

export const UPDATE_MEETUP_COMMENT = gql`
  mutation UpdateMeetUpComment($meetUpCommentId: String!, $input: UpdateMeetUpCommentInput!) {
    updateMeetUpComment(meetUpCommentId: $meetUpCommentId, input: $input) {
      _id
      poster {
        refId
        refModel
      }
      contentText
      meetUpId
      media
      responses {
        _id
      }
      responseCount
      parentComment
      isResponse
      createdAt
    }
  }
`;

// UPDATE_MEETUP_COMMENT input should look like this:
// {
//   "meetUpCommentId": "<meetUpCommentId>",
//   "input": {
//     "contentText": "This is an updated test comment!",
//   }
// }

export const DELETE_MEETUP_COMMENT = gql`
  mutation DeleteMeetUpComment($meetUpCommentId: String!) {
    deleteMeetUpComment(meetUpCommentId: $meetUpCommentId) {
      _id
    }
  }
`;

// DELETE_MEETUP_COMMENT input should look like this:
// {
//   "meetUpCommentId": "<meetUpCommentId>"
// }

export const RESPOND_MEETUP_COMMENT = gql`
  mutation CreateMeetUpCommentResponse($meetUpCommentId: String!, $input: MeetUpCommentResponseInput!) {
    createMeetUpCommentResponse(meetUpCommentId: $meetUpCommentId, input: $input) {
      _id
      poster {
        refId
        refModel
      }
      contentText
      meetUpId
      media
      responses {
        _id
      }
      responseCount
      parentComment
      isResponse
      createdAt
    }
  }
`;

// RESPOND_MEETUP_COMMENT input should look like this:
// {
//   "meetUpCommentId": "<meetUpCommentId>",
//   "input": {
//     "poster": {
//       "refId": "<userId>",
//       "refModel": "User" | "Org"
//     },
//     "contentText": "This is a test response to another comment!",
//   }
// }

// ------------- ADOPTION MUTATIONS ------------- //

export const CREATE_ADOPTION = gql`
  mutation CreateAdoption($input: AdoptionInput!) {
    createAdoption(input: $input) {
      _id
    }
  }
`;

// CREATE_ADOPTION input should look like this:
// {
//   "input": {
//    "pet": <petId>,
//    "poster": <orgId>,
//    "goodWithPets": "Prefers to be your only pet.",
//    "description": "A great little cat that loves to snuggle.",
//    "location": {
//     "address": "76 Peter St",
//     "zip": "L6E 0T9",
//     "city": "Markham",
//      "state": "Ontario",
//      "country": "Canada"
//    },
//     "media": [<mediaId1>, <mediaId2>]
//   }
// }

export const UPDATE_ADOPTION = gql`
  mutation UpdateAdoption($adoptionId: ID, $input: UpdateAdoptionInput!) {
    updateAdoption(adoptionId: $adoptionId, input: $input) {
      _id
    }
  }
`;

// UPDATE_ADOPTION input should look like this:
// {
//   "adoptionId": <adoptionId>,
//   "input": {
//     "goodWithPets": "Prefers to be your only pet.",
//     "description": "A great little cat that loves to snuggle.",
//     "location": {
//       "address": "733 River Styx Dr.",
//       "zip": "666 666",
//       "city": "Hades",
//       "state": "Tartarus",
//       "country": "Underworld"
//     },
//     "media": [<mediaId1>, <mediaId2>]
//   }
// }


// ADOPT_PET input should look like this:
export const ADOPT_PET = gql`
  mutation AdoptPet($adoptionId: ID!, $userId: ID!) {
    adoptPet(adoptionId: $adoptionId, userId: $userId) {
      message
      success
    }
  }
`;

// MAKE SURE TO ALSO RUN UPDATE_OWNER MUTATION TO MAKE SURE THE PET IS 
// REMOVED FROM THE OLD OWNER'S ARRAY AND ADDED TO THE NEW OWNER'S ARRAY

// ADOPT_PET input should look like this:
// {
//   "adoptionId": <adoptionId>,
//   "userId": <userId>
// }

export const DELETE_ADOPTION = gql`
  mutation DeleteAdoption($adoptionId: ID!) {
    deleteAdoption(adoptionId: $adoptionId) {
      message
      success
    }
  }
`;

// DELETE_ADOPTION input should look like this:
// {
//   "adoptionId": <adoptionId>
// }

// ------------- MEDIA MUTATIONS ------------- //

export const UPLOAD_MEDIA = gql`
  mutation UploadMedia($input: UploadMediaInput!) {
    uploadMedia(input: $input) {
      id
      filename
      contentType
      length
      uploadDate
      gridFsId
      tags
      url
    }
  }
`;

// UPLOAD_MEDIA input should look like this:
// {
//   "input": {
//     "file": <file>,
//     "tags": ["tag1", "tag2"]
//   }
// }

export const DELETE_MEDIA = gql`
  mutation DeleteMedia($mediaId: ID!) {
    deleteMedia(mediaId: $mediaId) {
      message
      success
    }
  }
`;

// DELETE_MEDIA input should look like this:
// {
//   "mediaId": <mediaId>
// }


// ------------- LIKING POSTS MUTATIONS ------------- //

export const LIKE_POST = gql`
  mutation LikePost($postId: String!, $input: LikeInput!) {
    likePost(postId: $postId, input: $input) {
      message
      success
    }
  }
`;

// LIKE_POST input should look like this:
//  {  
//    "postId": <postId>,
//    "input": {
//      "refId": <userId> or <orgId>,
//      "refModel": "User" or "Org"
//    }
//  }

export const UNLIKE_POST = gql`
  mutation UnlikePost($postId: String!, $input: LikeInput!) {
    unlikePost(postId: $postId, input: $input) {
      message
      success
    }
  }
`;

// UNLIKE_POST input should look like this:
//  {  
//    "postId": <postId>,
//    "input": {
//      "refId": <userId> or <orgId>,
//      "refModel": "User" or "Org"
//    }
//  }

// ------------- EMPLOYEE MUTATIONS ------------- //

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($orgId: String!, $userId: ID!) {
    addEmployee(orgId: $orgId, userId: $userId) {
      success
      message
    }
  }
`;

// ADD_EMPLOYEE input should look like this:
// {
//   "orgId": "<orgId>",
//   "userId": "<userId>"
// }

export const REMOVE_EMPLOYEE = gql`
  mutation RemoveEmployee($orgId: String!, $userId: ID!) {
    removeEmployee(orgId: $orgId, userId: $userId) {
      success
      message
    }
  }
`;

// REMOVE_EMPLOYEE input should look like this:
// {
//   "orgId": "<orgId>",
//   "userId": "<userId>"
// }


// ------------- FOLLOWING MUTATIONS ------------- //

export const FOLLOW_AS_USER = gql`
  mutation FollowUser($userId: String!, $input: FollowedProfileInput!) {
    followUser(userId: $userId, input: $input) {
      success
      message
    }
  }
`;

// FOLLOW_USER input should look like this:
// {
//   "userId": "<userId>",
//   "input": {
//     "refId": "<userId> or <orgId> or <petId>",
//     "refModel": "User" or "Org" or "Pet"
//   }
// }

export const UNFOLLOW_AS_USER = gql`
  mutation UnFollowUser($userId: String!, $input: FollowedProfileInput!) {
    unFollowUser(userId: $userId, input: $input) {  
      success
      message
    }
  }
`;

// UNFOLLOW_USER input should look like this:
// {
//   "userId": "<userId>",
//   "input": {
//     "refId": "<userId> or <orgId> or <petId>",
//     "refModel": "User" or "Org" or "Pet"
//   }
// }

export const FOLLOW_AS_ORG = gql`
  mutation FollowOrg($orgId: String!, $input: FollowedProfileInput!) {
    followOrg(orgId: $orgId, input: $input) {
      success
      message
    }
  }
`;
// FOLLOW_ORG input should look like this:
// {
//  "orgId": "<orgId>",
//  "input": {
//    "refId": "<userId> or <orgId> or <petId>",
//    "refModel": "User" or "Org" or "Pet"
//  }
// }

export const UNFOLLOW_AS_ORG = gql`
  mutation UnFollowOrg($orgId: String!, $input: FollowedProfileInput!) {
    unFollowOrg(orgId: $orgId, input: $input) {
      success
      message
    }
  }
`;

// UNFOLLOW_ORG input should look like this:
// {
//   "orgId": "<orgId>",
//   "input": {
//     "refId": "<userId> or <orgId> or <petId>",
//     "refModel": "User" or "Org" or "Pet"
//   }
// }


// ------------- Conversation Mutations ------------- //


export const CREATE_CONVERSATION = gql`
  mutation CreateConversationInput($input: CreateConversationInput!) {
  CreateConversationInput(input: $input) {
    _id
    conversationName
    conversationUsers {
      _id
    }
  }
}`;

//input:
// {
//   "input": {
//     "conversationName": "Test", - {Name of the conversation in string}
//     "conversationUsers": [
//             { "_id": "682bd6f5c783d2ea6bddf61c" }, --- User Object {_id: "userID"}
//             { "_id": "682bd716c783d2ea6bddf61e" }
//         ]
//   }
// }



// ------------- MESSAGE MUTATIONS ------------- //



// Mutations

export const CREATE_MESSAGE = gql`
  mutation AddMessage($input: AddMessageInput!) {
  addMessage(input: $input) {
    _id
    textContent
    conversation {
      _id
    }
  }
}
`;
// input:
// {
//   "input": {
//     "conversation": "682d1fa200b58b268d6e95b8",
//     "messageUser": {
//       "_id": "682bd6f5c783d2ea6bddf61c"
//     },
//     "textContent": "This is mishas first message"
//   }
  
// }



