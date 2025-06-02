// pass a prop that takes an array of comment objects to render a list of comments
// need consult back end team to figure out if replies are their own array or if they are included in the comment objects

// utilize bubble button components to make the replies button and like button

//HOW TO CALL:
// const commentsData = [{}];
// <Comments comments={commentsData}/>

import UserPlaceHolder from "../../assets/react.svg";
import "../../SammiReusables.css";
import "../../main.css"
import heart from "../../images/favorite_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import chat from "../../images/chat_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import Replies from "./Replies";
import ImageCarousel from "./ImageCarousel"
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST_RESPONSE } from "../../utils/mutations";
import NewFreeFormPost from "../Creators/NewPost"
// import ButtonBubble from "./Button";

type Comment = {
  id: number;
  trueId?: string;
  user: string;
  avatar?: string;
  comment: string;
  likeCount: number;
  postedTime: Date;
  replies?: Comment[];
  media?: {url: string}[];
  parentPost?: string;
  responses?: {_id: string}[];
};

type CommentsProps = {
  comments: Comment[];
  postId: string;
};

interface PostResponse {
    poster: {
      refId: string;
      refModel: string;
    };
    contentText: string;
    media?: string[];
}

function CommentItem({ comment }: { comment: Comment }) {
  //pass back the comment id so it can be opened as main post
const [isRepliesOpen, setIsRepliesOpen] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResponseSubmit = (responseData: PostResponse) => {
    console.log("New response submitted:", responseData);
  };

  function handleContainerClick() {
    console.log("container clicked");
    setIsRepliesOpen(!isRepliesOpen)
  }
  console.log("ID: ", comment.responses)
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
              <div>
                {
                  comment.media && comment.media.length > 1 &&
                  <div className="img-container"> 
                  <ImageCarousel slides={comment.media.map(m =>m.url).filter(Boolean)}/>
                  </div>
                }
                {
                  comment.media && comment.media.length === 1 &&
                  <div className="img-container">
                    <img src={comment.media[0].url} alt="first image"/>
                  </div>
                  
                }
              </div>
              <div className="comment-icon-row">
                <div className="comment-likes-container">
                  <img src={heart} alt="heart icon" />
                  <button>{comment.likeCount}</button>
                </div>
                <div 
                  className="comment-replies-container"                
                  onClick={() => setIsModalOpen(true)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={chat} alt="comment icon" />
                  <button>{comment.replies?.length || 0}</button>
                </div>
              </div>
              {isModalOpen && (
                <div className="post-modal-overlay" onClick={() => setIsModalOpen(false)}>
                  <div className="post-modal-content" onClick={e => e.stopPropagation()}>
                    <button className="post-modal-close-button" onClick={() => setIsModalOpen(false)}>×</button>
                    <NewFreeFormPost
                      parentPostId={comment.trueId}
                      onSubmit={(responseData) => {
                        handleResponseSubmit(responseData);
                        setIsModalOpen(false); // close modal on submit
                      }}
                    />
                  </div>
                </div>
              )}
          </div>
          </div>
        </div>
        {isRepliesOpen && comment.responses && comment.responses.length > 0 && (
          <Replies replyIds={comment.responses.map(r => r._id)} />
        )}
        </>
    );
}

export default function Comments({ comments, postId }: CommentsProps) {
  const [createPostResponse, { loading: responseLoading, error: responseError }] = useMutation(ADD_POST_RESPONSE);

  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async () => {
    const userId = localStorage.getItem("userId");
    const accountType = localStorage.getItem("accountType");

    if (!userId || !accountType || !newComment.trim()){
      alert("You must be logged in to post."); 
      return;
    }
    try {
      await createPostResponse({
        variables: {
          addPostResponseInput: {
            poster: {
              refId: userId,
              refModel: accountType === "org" ? "Org" : "User",
            },
            contentText: newComment.trim(),
          },
          addPostResponsePostId: postId.toString(),          
        },
      });

      setNewComment("");
      // Optionally: refresh the comments list or push new comment into local state
    } catch (err) {
      console.error("Failed to submit comment", err);
    }
  };

  comments.sort((a, b) => a.postedTime.getTime() - b.postedTime.getTime());
  console.log(comments);
  return (
    <div className="comments-section-wrapper">
      {comments.map((comment, idx) => (
        <CommentItem key={idx} comment={comment}/>
      ))}
        <div className="comment-bar">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type a message here..."
          />
          {responseLoading ? "Sending..." : ""}
          <button className="send-message-btn" onClick={handleCommentSubmit}>↗️</button>
          {responseError && <div className="form-errors">Error sending comment.</div>}
        </div>
    </div>
  );
}