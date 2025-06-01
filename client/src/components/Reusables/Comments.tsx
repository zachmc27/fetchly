// pass a prop that takes an array of comment objects to render a list of comments
// need consult back end team to figure out if replies are their own array or if they are included in the comment objects

// utilize bubble button components to make the replies button and like button

//HOW TO CALL:
// const commentsData = [{}];
// <Comments comments={commentsData}/>


import UserPlaceHolder from "../../assets/react.svg";
import "../../SammiReusables.css";
import "../../ZachTemp.css"
import heart from "../../images/favorite_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import chat from "../../images/chat_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import Replies from "./Replies";
import { useState } from "react";
// import ButtonBubble from "./Button";


type Comment = {
  id: number;
  user: string;
  avatar?: string;
  comment: string;
  likeCount: number;
  postedTime: Date;
  replies?: Comment[];
};

type CommentsProps = {
  comments: Comment[];
};


function CommentItem({ comment }: { comment: Comment }) {
  //pass back the comment id so it can be opened as main post
const [isRepliesOpen, setIsRepliesOpen] = useState(false)

  function handleContainerClick() {
    setIsRepliesOpen(!isRepliesOpen)
  }
    return (
      <>
        <div className="comment-container">
          <div className="comment-row">
            <div className="comment-img">
              <img src={comment.avatar || UserPlaceHolder}></img>
            </div>
            <div className="comment-content" onClick={handleContainerClick}>
              <div>{comment.user}</div> 
              <div>{comment.comment}</div>
              <div className="comment-icon-row">
                <div className="comment-likes-container">
                  <img src={heart} alt="heart icon" />
                  <button>{comment.likeCount}</button>
                </div>
                <div className="comment-replies-container">
                  <img src={chat} alt="comment icon" />
                  <button>{comment.replies?.length || 0}</button>
                </div>
              </div>
          </div>
          </div>
        </div>
        {isRepliesOpen && (
          <Replies comment={comment} />
        )}
        </>
    );
}

export default function Comments({ comments }: CommentsProps) {
  comments.sort((a, b) => a.postedTime.getTime() - b.postedTime.getTime());
  console.log(comments);
  return (
    <div className="comments-section-wrapper">
      {comments.map((comment, idx) => (
        <CommentItem key={idx} comment={comment}/>
      ))}
        <div className="comment-bar">
          <input type="text" placeholder="Type a message here..." />
          <button className="send-message-btn">↗️</button>
        </div>
    </div>
  );
}