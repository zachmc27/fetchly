// renders a feed component, into which you pass back an ARRAY of message objects 
// (will have to generate this array here with the proper API call), where they will be looped through and styled as shown on the messages wireframe.
// clicking on an option will dynamically route the user to the corresponding messages page



export default function Inbox() {

  // *** for action modal ***
  // function cancel() {
  //   console.log('this will close the modal.');
  // }

  // function confirm() {
  //   console.log('this will open the modal');
  // }
  // -------------------- //

  // *** mock feed data ***
  // const mockMessageData = [
  //   {
  //       id: 1,
  //       coverImage: "image",
  //       chatTitle: "Dream team",
  //       latestMessage: "Let's be great",
  //       date: "JUNE 2ND",
  //       itemType: "message"
  //   },
  //   {
  //       id: 2,
  //       coverImage: "image",
  //       chatTitle: "Dream team",
  //       latestMessage: "Let's continue to be great",
  //       date: "JUNE 2ND",
  //       itemType: "message"
  //   },
  //   {
  //       id: 3,
  //       coverImage: "image",
  //       chatTitle: "Dream team",
  //       latestMessage: "Still being great",
  //       date: "JUNE 2ND",
  //       itemType: "message"
  //   },
  //   {
  //       id: 4,
  //       coverImage: "image",
  //       chatTitle: "Dream team",
  //       latestMessage: "Let's be great",
  //       date: "JUNE 2ND",
  //       itemType: "message"
  //   },
  //   {
  //       id: 5,
  //       coverImage: "image",
  //       chatTitle: "Dream team",
  //       latestMessage: "Let's be great...",
  //       date: "JUNE 2ND",
  //       itemType: "message"
  //   }
  // ]

  // const mockPostData = [
  //   {
  //       id: 1,
  //       userAvi: "avi",
  //       postUser: "zachmc",
  //       postContent: "I love Stella",
  //       postLikeCount: 5,
  //       postDate: "6/2/25",
  //       postCommentCount: 4,
  //       itemType: "post"
  //   },
  //   {
  //       id: 2,
  //       userAvi: "avi",
  //       postUser: "dmish",
  //       postContent: "My cat likes my desk",
  //        postLikeCount: 5,
  //       postDate: "6/2/25",
  //       postCommentCount: 7,
  //       itemType: "post"
  //   },
  //   {
  //       id: 3,
  //       userAvi: "avi",
  //       postUser: "sammtee",
  //       postContent: "woof",
  //       postLikeCount: 5,
  //       postDate: "6/2/25",
  //       postCommentCount: 12,
  //       itemType: "post"
  //   }
  // ]
  // -------------------- //

  // *** search bar send button function ***
  // function doThing() {
  //   alert('Someone did a thing!!!')
  // }
  // -------------------- //

// *** post details mock data ***
// const post = {
//   id: 1,
//   postUser: "zachmc",
//   userAvi: 'img src',
//   postContent: "Stella is the cutest dawg",
//   images: ['img1 src', 'img2 src', 'img3 src'],
//   postLikeCount: 20,
//   postCommentCount: 5,
//   postDate: '6/2/25',
//   itemType: "post"
// }

// const meetupPost = {
//   id: 2,
//   username: 'zachmc',
//   userAvi: 'img src',
//   title: 'Going to the park',
//   postText: 'Come with Stella and I for a walk in the park',
//   images: ['img1 src', 'img2 src', 'img3 src'],
//   location: 'Austin, TX',
//   date: '6/2/25',
//   time: '3pm',
//   itemType: "meetup"
// }

// const adoptionPost = {
//   id: 3,
//   orgName: 'austin pets alive!',
//   orgAvi: 'img',
//   orgEmail: "pets@alive.com",
//   orgNumber: '512-999-9999',
//   images: ['img1', 'img2'],
//   petName: 'Potato',
//   gender: `male`,
//   description: 'chill guy',
//   location: '225 Barton Springs Rd, Austin, TX',
//   vaccinated: true,
//   breed: 'labrador',
//   isFixed: true,
//   goodWithPets: 'Yes with cats, no with dogs',
//   itemType: 'adoption'
// }

  return (
    <div>
      Inbox
    </div>
    
  )
}
