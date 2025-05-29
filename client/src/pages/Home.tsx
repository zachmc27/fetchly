import Feed from "../components/Reusables/Feed";
import { mockPostData } from "../mockdata/feed-data";

export default function Home() {


  return (
    <div className="post-page-container">
      <Feed
       initialFeedArray={mockPostData}
       itemStyle="post-card"
       containerStyle="post-feed-container"
      />
    </div>
  );
}
