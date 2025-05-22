// prop that passes back an array of post objects to
// loop through and render
// prop that passes back a CSS class name to put into each list item created, 
// to determine what the posts will look like (varies by post type)
// prop that passes class name for the feed container

type MockMessageItem = {
  id: number;
  coverImage: string;
  chatTitle: string;
  latestMessage: string;
  date: string;
  itemType: string;
};

type MockPostItem = {
  id: number;
  userAvi: string;
  postUser: string;
  postContent: string
  postLikeCount: number;
  postCommentCount: number;
  postDate: string;
  itemType: string;

};

type MockMeetupItem = {
  id: number;
  postImage?: string;
  postUser: string;
  postTitle: string;
  postLikeCount: number;
  postDate: number;
  meetupTime: number
  itemType: string;
};

type MockAdoptionItem = {
  id: number;
  postImage: string;
  postUser: string;
  postLikeCount: number;
  postCommentCount: number;
  postDate: number;
  itemType: string;
};

type FeedItem = MockMessageItem | MockPostItem | MockMeetupItem | MockAdoptionItem;

export default function Feed({
  feedArray,
  itemStyle,
  containerStyle,
}: {
  feedArray: FeedItem[];
  itemStyle: string;
  containerStyle: string;
}) {
  function renderFeedItem(item: FeedItem): JSX.Element | null  {
    switch (item.itemType) {
      case "message": {
          const messageItem = item as MockMessageItem;
          return (
            <div key={item.id} className={itemStyle}>
              {/* message JSX */}
              <img src={messageItem.coverImage} alt="cover image for the convo" />
              <h1 className="chat-title">{messageItem.chatTitle}</h1>
              <p className= "message-title">{messageItem.latestMessage}</p>
              <p className="chat-date">{messageItem.date}</p>
            </div>
          );
        }
      case "post": {
        const postItem = item as MockPostItem;
        return (
          
          <div key={postItem.id} className={itemStyle}>
            {/* post JSX */}
            <img src={postItem.userAvi} alt="cover image for the post" />
            <h1>{postItem.postUser}</h1>
            <p>{postItem.postContent}</p>
            <p>{postItem.postDate}</p>
            <p>{postItem.postCommentCount}</p>
          </div>
        );
      }
      case "adoption": {
        const adoptionItem = item as MockAdoptionItem
        return (
          <div key={adoptionItem.id} className={itemStyle}>
            {/* adoption JSX */}
            <img src={adoptionItem.postImage} alt="cover image for the post" />
            <h1>{adoptionItem.postUser}</h1>
          </div>
        );
      }
      case "meetup": {
        const meetupItem = item as MockMeetupItem
        return (
          <div key={meetupItem.id} className={itemStyle}>
            {/* meetup JSX */}
            <img src={meetupItem.postImage} alt="cover image for the post" />
            <h1>{meetupItem.postUser}</h1>
          </div>
        );
      }
        // two more cases for meetup type and adoption type
      default:
        return null;
  }
}

return (
    <div className={containerStyle}>
      {feedArray.map(renderFeedItem)}
    </div>
  );
}