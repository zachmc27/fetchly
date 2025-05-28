import dog from "../images/dog.jpg"
import cat from "../images/cat.jpeg"
import baller from "../images/baller.jpeg"
import alien from "../images/alienkitty.jpeg"
import flowerdog from "../images/flowerdog.jpeg"
import billie from "../images/billiewooflish.jpeg"
import batdog from "../images/batdog.jpeg"

const comments = [
  {
    id: 100,
    user: 'zach',
    avatar: dog,
    comment: 'Wowee so fun',
    likeCount: 7,
    postedTime: new Date(),
    replies: [
      {
      id: 101,
      user: 'brett',
      avatar: baller,
      comment: 'Yes, epic fun',
      likeCount: 42,
      postedTime: new Date(),
      replies: []
      },
      {
      id: 102,
      user: 'misha',
      avatar: cat,
      comment: 'omg my cat is on my desk rn',
      likeCount: 42,
      postedTime:new Date(),
      replies: []
      }
    ]
  },
  {
    id: 200,
    user: 'Spongebob',
    avatar: dog,
    comment: 'I live in a pineapple',
    likeCount: 7,
    postedTime: new Date(),
    replies: [
      {
      id: 201,
      user: 'Patrick',
      avatar: baller,
      comment: 'Can I eat your house',
      likeCount: 42,
      postedTime: new Date(),
      replies: []
      },
      {
      id: 202,
      user: 'Zoro',
      avatar: cat,
      comment: 'Where am I',
      likeCount: 42,
      postedTime: new Date(),
      replies: []
      }
    ]
  },
  {
    id: 300,
    user: 'Big Stepper',
    avatar: flowerdog,
    comment: 'I will buy your dog',
    likeCount: 7,
    postedTime: new Date(),
    replies: [
      {
      id: 101,
      user: 'Mr. Morale',
      avatar: baller,
      comment: "Money won't get you love",
      likeCount: 42,
      postedTime: new Date(),
      replies: []
      },
      {
      id: 103,
      user: 'Big Stepper',
      avatar: baller,
      comment: 'Oh, the glittering shackles of avarice, how they bind the soul! Each trinket bought, each fleeting pleasure pursued, layers another chain upon the spirit, suffocating the once vibrant spark within. The relentless chase for more, a hollow echo in the cavern of a heart consumed by yearning, steals not just peace, but the very essence of well-being. Sleep becomes a battleground for anxieties over acquisitions, relationships wither in the shadow of possessions, and the mirror reflects not a contented individual, but a weary stranger, forever reaching, forever empty. For what price, indeed, the fleeting joy of a material bauble, when the true treasures of contentment, connection, and inner peace lie bleeding, sacrificed upon the altar of insatiable greed?',
      likeCount: 42,
      postedTime: new Date(),
      replies: []
      }
    ]
  }
]

const rsvpList = [
  {
    username: "Luffy",
    userAvi: baller
  },
   {
    username: "Law",
    userAvi: baller
  },
   {
    username: "Shanks",
    userAvi: baller
  },
   {
    username: "Kaido",
    userAvi: baller
  }

]
export const mockPost = {
  id: 1,
  postUser: "zachmc",
  userAvi: 'img src',
  postContent: "Stella is the cutest dawg",
  images: ['img1 src', 'img2 src', 'img3 src'],
  postLikeCount: 20,
  postCommentCount: 5,
  postDate: '6/2/25',
  itemType: "post"
}

 export const mockMeetupPosts = [
  {
  id: 1,
  username: 'zachmc',
  userAvi: batdog,
  title: 'Going to the park',
  postText: 'Come with Stella and I for a walk in the park',
  images: [alien, batdog, billie],
  location: 'Austin, TX',
  date: '6/2/25',
  time: '3pm',
  comments: comments,
  rsvpList: rsvpList,
  itemType: "meetup"
},
{
  id: 2,
  username: 'kkent',
  userAvi: batdog,
  title: 'kitty play date',
  postText: 'Come with Stella and I for a walk in the park',
  images: [alien, batdog, billie],
  location: 'Austin, TX',
  date: '6/2/25',
  time: '3pm',
  comments: comments,
  rsvpList: rsvpList,
  itemType: "meetup"
},
{
  id: 3,
  username: 'brettmcbryde',
  userAvi: batdog,
  title: 'walk in the park',
  postText: 'Come with Stella and I for a walk in the park',
  images: [alien, batdog, billie],
  location: 'Austin, TX',
  date: '6/2/25',
  time: '3pm',
  comments: comments,
  rsvpList: rsvpList,
  itemType: "meetup"
},
{
  id: 4,
  username: 'teeleel',
  userAvi: batdog,
  title: 'wicked stuff',
  postText: 'Come with Stella and I for a walk in the park',
  images: [alien, batdog, billie],
  location: 'Austin, TX',
  date: '6/2/25',
  time: '3pm',
  comments: comments,
  rsvpList: rsvpList,
  itemType: "meetup"
},
{
  id: 5,
  username: 'mishaadyer',
  userAvi: batdog,
  title: 'cat on desk party',
  postText: 'Come with Stella and I for a walk in the park',
  images: [alien, batdog, billie],
  location: 'Austin, TX',
  date: '6/2/25',
  time: '3pm',
  comments: comments,
  rsvpList: rsvpList,
  itemType: "meetup"
}
]

export const mockAdoptionPost = {
  id: 3,
  orgName: 'austin pets alive!',
  orgAvi: 'img',
  orgEmail: "pets@alive.com",
  orgNumber: '512-999-9999',
  images: ['img1', 'img2'],
  petName: 'Potato',
  gender: `male`,
  description: 'chill guy',
  location: '225 Barton Springs Rd, Austin, TX',
  vaccinated: true,
  breed: 'labrador',
  isFixed: true,
  goodWithPets: 'Yes with cats, no with dogs',
  itemType: 'adoption'
}