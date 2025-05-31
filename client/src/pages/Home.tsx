import Feed from "../components/Reusables/Feed";
import { mockPostData } from "../mockdata/feed-data"
// import NewMessage from "../components/Creators/NewMessage";
import { QUERY_POSTS } from "../utils/queries";
import { useQuery } from "@apollo/client";
//import { useState } from "react";

// interface Post {
//   id: string;
//   poster: {
//     refId: string;
//     refModel: string;
//   };
//   contentText: string;
// }

export default function Home() {

  const { loading, error, data } = useQuery(QUERY_POSTS);
  //const [filteredPosts, setFilteredPosts] = useState<Post[] | null>(null);

  const posts = data?.posts;
  console.log('Posts:', posts);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="post-page-container">
      <Feed
       initialFeedArray={ mockPostData}
       itemStyle="post-card"
       containerStyle="post-feed-container"
      />
      {/* <NewMessage /> */}
    </div>
  );
}
