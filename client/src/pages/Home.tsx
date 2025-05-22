// Feed component that takes an array of post objects to rendeer on the page
import Comments from "../components/Reusables/Comments";

const commentsData = [{
    id: 1,
    user: "Alice",
    comment: "This is a great post!",
    likeCount: 5,
    postedTime: new Date(),
    replies: [
      {
        id: 5,
        user: "Bob",
        comment: "I agree with Alice!",
        likeCount: 2,
        postedTime: new Date(),
        replies: []
      }
    ]
  },
  {
    id: 2,
    user: "Charlie",
    comment: "Thanks for sharing.",
    likeCount: 1,
    postedTime: new Date(),
    replies: []

}];

export default function Home() {
  return (
    <div>
      <Comments comments={commentsData}/>
    </div>
  )
}
