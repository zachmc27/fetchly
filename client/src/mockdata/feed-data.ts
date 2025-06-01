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
        postImage: [flowerdog, dog, batdog],
        postLikeCount: 5,
        postDate: "6/2/25",
        postCommentCount: 12,
        itemType: "post"
    },
    
  ]
  
  export const mockAdoptionData = [
    {
        _id: '1',
        id: '1',
        pet: {
            _id: '1',
            name: 'Potato',
            age: 4,
            profilePhoto: {
                url: dog,
            },
            gender: "male",
        },
        itemType: 'adoption',
        description: 'cool guy',
    },
    {
        _id: '1',
        id: '1',
        pet: {
            _id: '1',
            name: 'Potato',
            age: 4,
            profilePhoto: {
                url: dog,
            },
            gender: "male",
        },
        itemType: 'adoption',
        description: 'cool guy',
    },
    {
        _id: '1',
        id: '1',
        pet: {
            _id: '1',
            name: 'Potato',
            age: 4,
            profilePhoto: {
                url: dog,
            },
            gender: "male",
        },
        itemType: 'adoption',
        description: 'cool guy',
    },
    {
        _id: '2',
        id: '2',
        pet: {
            _id: '2',
            name: 'Marv',
            age: 2,
            profilePhoto: {
                url: alien,
            },
            gender: "male",
        },
        itemType: 'adoption',
        description: 'has a history of probing',
    },
    {
        _id: '3',
        id: '3',
        pet: {
            _id: '3',
            name: 'Barnaby',
            age: 6,
            profilePhoto: {
                url: flowerdog,
            },
            gender: "female",
        },
        itemType: 'adoption',
        description: "Barnaby wasn't like the other terriers in the park who lived for chasing squirrels or unearthing forgotten treasures. His heart belonged to the blooms. Every walk was a slow, deliberate exploration of neighborhood gardens, his black button nose twitching with delight as he inhaled the sweet perfume of roses or the earthy scent of marigolds. He’d gently nudge his snout against soft petals, sometimes letting out a contented sigh, his tail a happy metronome against the grass. His owner often found him patiently sitting beside a vibrant flower bed, not to dig or destroy, but seemingly just to admire their colors and bask in their fragrant company, a furry little botanist in a world of canine chaos.",
    },
    {
        _id: '4',
        id: '4',
        pet: {
            _id: '4',
            name: 'Chianti',
            age: 4,
            profilePhoto: {
                url: baller,
            },
            gender: "female",
        },
        itemType: 'adoption',
        description: 'Loves head rubs and rolex',
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

