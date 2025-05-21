// renders a feed component, into which you pass back an ARRAY of message objects 
// (will have to generate this array here with the proper API call), where they will be looped through and styled as shown on the messages wireframe.
// clicking on an option will dynamically route the user to the corresponding messages page
import Actionmodal from "../components/Reusables/ActionModal"
import Feed from "../components/Reusables/Feed";
import "../ZachsReusables.css";
import SearchBar from "../components/Reusables/SearchBar";
export default function Inbox() {

  // *** for action modal ***
  function cancel() {
    console.log('this will close the modal');
  }

  function confirm() {
    console.log('this will open the modal');
  }
  // -------------------- //

  // *** mock feed data ***
  const mockMessageData = [
    {
        id: 1,
        coverImage: "image",
        chatTitle: "Dream team",
        latestMessage: "Let's be great",
        date: "JUNE 2ND",
        itemType: "message"
    },
    {
        id: 2,
        coverImage: "image",
        chatTitle: "Dream team",
        latestMessage: "Let's continue to be great",
        date: "JUNE 2ND",
        itemType: "message"
    },
    {
        id: 3,
        coverImage: "image",
        chatTitle: "Dream team",
        latestMessage: "Still being great",
        date: "JUNE 2ND",
        itemType: "message"
    },
    {
        id: 4,
        coverImage: "image",
        chatTitle: "Dream team",
        latestMessage: "Let's be great",
        date: "JUNE 2ND",
        itemType: "message"
    },
    {
        id: 5,
        coverImage: "image",
        chatTitle: "Dream team",
        latestMessage: "Let's be great...",
        date: "JUNE 2ND",
        itemType: "message"
    }
  ]

  const mockPostData = [
    {
        id: 1,
        userAvi: "avi",
        postUser: "zachmc",
        postContent: "I love Stella",
        postLikeCount: 5,
        postDate: "6/2/25",
        postCommentCount: 4,
        itemType: "post"
    },
    {
        id: 2,
        userAvi: "avi",
        postUser: "dmish",
        postContent: "My cat likes my desk",
         postLikeCount: 5,
        postDate: "6/2/25",
        postCommentCount: 7,
        itemType: "post"
    },
    {
        id: 3,
        userAvi: "avi",
        postUser: "sammtee",
        postContent: "woof",
        postLikeCount: 5,
        postDate: "6/2/25",
        postCommentCount: 12,
        itemType: "post"
    }
  ]
  // -------------------- //

  // *** search bar send button function
  function doThing() {
    alert('Someone did a thing!!!')
  }
  return (
    <div>
      Inbox
      <SearchBar send={doThing} />
      <Actionmodal cancel={cancel} confirm={confirm}>
        <p>Stuff</p>
      </Actionmodal> 
      <Feed 
        feedArray={mockPostData}
        itemStyle="feedItem"
        containerStyle="messages"
      />
    </div>
    
  )
}
