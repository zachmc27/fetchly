import dog from "../images/dog.jpg"
import cat from "../images/cat.jpeg"
import baller from "../images/baller.jpeg"
import alien from "../images/alienkitty.jpeg"
import flowerdog from "../images/flowerdog.jpeg"
import billie from "../images/billiewooflish.jpeg"
import batdog from "../images/batdog.jpeg"

  export const mockMessageData = [
    {
        id: 1,
        coverImage: alien,
        chatTitle: "Dream team",
        latestMessage: "Let's be great",
        date: "6/2/25",
        isUnread: true,
        itemType: "message"
    },
    {
        id: 2,
        chatTitle: "Mystery Gang",
        latestMessage: "Let's continue to be great",
        date: "6/2/25",
        isUnread: false,
        itemType: "message"
    },
    {
        id: 3,
        coverImage: batdog,
        chatTitle: "Family",
        latestMessage: "Still being great",
        date: "6/2/25",
        isUnread: false,
        itemType: "message"
    },
    {
        id: 4,
        coverImage: batdog,
        chatTitle: "Ginyu Force",
        latestMessage: "Let's be great",
        date: "6/2/25",
        isUnread: true,
        itemType: "message"
    },
    {
        id: 5,
        coverImage: batdog,
        chatTitle: "Straw hats",
        latestMessage: "Let's be great...",
        date: "6/2/25",
        isUnread: true,
        itemType: "message"
    },
    {
        id: 6,
        coverImage: batdog,
        chatTitle: "Straw hats",
        latestMessage: "Let's be great...",
        date: "6/2/25",
        isUnread: false,
        itemType: "message"
    },
    {
        id: 7,
        chatTitle: "Dudes",
        latestMessage: "Let's be great...",
        date: "6/2/25",
        isUnread: true,
        itemType: "message"
    },
    {
        id: 8,
        coverImage: batdog,
        chatTitle: "Fellas",
        latestMessage: "Let's be great...",
        date: "6/2/25",
        isUnread: false,
        itemType: "message"
    },
    {
        id: 9,
        coverImage: batdog,
        chatTitle: "Girlypops",
        latestMessage: "Let's be great...",
        date: "6/2/25",
        isUnread: false,
        itemType: "message"
    },
    {
        id: 10,
        chatTitle: "Stop scrolling",
        latestMessage: ">:(",
        date: "6/2/25",
        isUnread: true,
        itemType: "message"
    },
  ]

  export const mockPostData = [
    {
        id: 1,
        userAvi: dog,
        postUser: "zachmc",
        postContent: "I love Stella",
        postLikeCount: 5,
        postDate: "6/2/25",
        postCommentCount: 4,
        itemType: "post"
    },
    {
        id: 2,
        userAvi: cat,
        postUser: "dmish",
        postContent: "My cat likes my desk",
         postLikeCount: 5,
        postDate: "6/2/25",
        postCommentCount: 7,
        itemType: "post"
    },
    {
        id: 3,
        userAvi: billie,
        postUser: "sammtee",
        postContent: "woof",
        postLikeCount: 5,
        postDate: "6/2/25",
        postCommentCount: 12,
        itemType: "post"
    },
    {
        id: 4,
        userAvi: alien,
        postUser: "bmcbry",
        postContent: "meow",
        postLikeCount: 5,
        postDate: "6/2/25",
        postCommentCount: 12,
        itemType: "post"
    },
    {
        id: 5,
        userAvi: batdog,
        postUser: "kdot",
        postContent: "As I strolled through the park, what began as a peaceful afternoon quickly unraveled into a slapstick saga. First, a squirrel with the confidence of a seasoned pickpocket tried to rob me of my granola bar—locking eyes with me as it yanked the wrapper like it paid rent. Then I stepped directly into a flock of pigeons who, rather than flying off dramatically like in the movies, just looked mildly annoyed and shuffled sideways. My attempt to sit on a bench ended in an accidental cannonball onto a wet patch, because of course it had rained—right before I got there. Somewhere between dodging rogue frisbees and mistaking a yoga class for a public interpretive dance group, I realized: I wasn’t walking through the park. The park was walking all over me.",
        postLikeCount: 5,
        postDate: "6/2/25",
        postCommentCount: 12,
        itemType: "post"
    },
    {
        id: 6,
        userAvi: baller,
        postUser: "johnbrownhimself",
        postContent: "i am smart",
        postImage: [flowerdog],
        postLikeCount: 5,
        postDate: "6/2/25",
        postCommentCount: 12,
        itemType: "post"
    },
    
  ]
  
  export const mockAdoptionData = [
    {
        id: 1,
        petCoverImage: dog,
        petName: 'Potato',
        petAge: 1,
        petGender: 'male',
        itemType: "adoption"
    },
    {
        id: 2,
        petCoverImage: cat,
        petName: 'Garter',
        petAge: 6,
        petGender: 'male',
        itemType: "adoption"
    },
    {
        id: 3,
        petCoverImage: alien,
        petName: 'Kiki',
        petAge: 2,
        petGender: 'female',
        itemType: "adoption"
    },
    {
        id: 4,
        petCoverImage: flowerdog,
        petName: 'Lexi',
        petAge: 3,
        petGender: 'female',
        itemType: "adoption"
    },
    {
        id: 5,
        petCoverImage: billie,
        petName: 'Doobie',
        petAge: 1,
        petGender: 'male',
        itemType: "adoption"
    },
    {
        id: 6,
        petCoverImage: baller,
        petName: 'Fluffy',
        petAge: 4,
        petGender: 'female',
        itemType: "adoption"
    }
  ]

  export const mockMeetupData = [
    {
        id: 1,
        postImage: flowerdog,
        postUser: 'zachmc',
        postTitle: 'zoomies sesh',
        postLocation: 'Zilker Park',
        postRSVPCount: 5,
        postDate: '6/2/25',
        meetupTime: '3pm',
        itemType: 'meetup'
    },
    {
        id: 2,
        postImage: alien,
        postUser: 'kkent',
        postTitle: 'kitty play date',
        postLocation: 'my apartment',
        postRSVPCount: 2,
        postDate: '6/2/25',
        meetupTime: '8pm',
        itemType: 'meetup'
    },
    {
        id: 3,
        postImage: dog,
        postUser: 'brettmcbryde',
        postTitle: 'walk in the park',
        postLocation: 'big park',
        postRSVPCount: 12,
        postDate: '6/2/25',
        meetupTime: '9am',
        itemType: 'meetup'
    },
    {
        id: 4,
        postImage: billie,
        postUser: 'teeleel',
        postTitle: 'wicked stuff',
        postLocation: 'alleyway',
        postRSVPCount: 1,
        postDate: '6/2/25',
        meetupTime: '11pm',
        itemType: 'meetup'
    },
    {
        id: 5,
        postImage: baller,
        postUser: 'mishaadyer',
        postTitle: 'cat on desk party',
        postLocation: 'ikea',
        postRSVPCount: 20,
        postDate: '6/2/25',
        meetupTime: '2pm',
        itemType: 'meetup'
    }
  ]

