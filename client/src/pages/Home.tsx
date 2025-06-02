import Feed from "../components/Reusables/Feed";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import NewMessage from "../components/Creators/NewMessage";
import { QUERY_POSTS } from "../utils/queries";
import { useQuery } from "@apollo/client";

import danceCat from  "../images/364.gif"

export default function Home() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("id_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const { loading, error, data } = useQuery(QUERY_POSTS, { pollInterval: 20000 });

  // Sort post by newest first
  const posts = data?.posts
    ? [...data.posts]
        .filter(post => !post.isResponse)
        .sort((a, b) => Number(b.createdAt) - Number(a.createdAt)
      )
    : [];

  // console.log("Sorted Posts:", posts);

  if (loading) return <div className="loading-gif-container"><img src={danceCat} alt="loading gif of a cat dancing"/></div>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="post-page-container">
      <Feed
       initialFeedArray={ posts }
       itemStyle="post-card"
       containerStyle="post-feed-container"
      />
      {/* <NewMessage /> */}
    </div>
  );
}
