// pass a prop that takes an array of comment objects to render a list of comments
// need consult back end team to figure out if replies are their own array or if they are included in the comment objects

// utilize bubble button components to make the replies button and like button

//HOW TO CALL:
// const commentsData = [{}];
// <Comments comments={commentsData}/>

import UserPlaceHolder from "../../assets/react.svg";
import "../../main.css";
import "../../main.css"
import heart from "../../images/favorite_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import chat from "../../images/chat_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import Replies from "./Replies";
import ImageCarousel from "./ImageCarousel"
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST_RESPONSE, ADD_MEETUP_COMMENT } from "../../utils/mutations";

import NewFreeFormPost from "../Creators/NewPost"

import sendIcon from "../../images/send_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import { MeetUpComment } from "../../types/CardTypes";

import { LIKE_POST, UNLIKE_POST } from "../../utils/mutations";
import heartFilled from "../../images/heart-fill-svgrepo-com.svg";
import { format } from 'date-fns';

// import ButtonBubble from "./Button";

export type Comment = {
  id: number;
  trueId?: string;
  user: string;
  avatar?: string;
  comment: string;
  likeCount?: number;
  postedTime: Date;
  likes?: {refId?: {_id?: string}}[];
  replies?: Comment[];
  media?: {url: string}[];
  parentPost?: string;
  responses?: {_id: string}[];
};

type CommentsProps = {
  comments: Comment[] | MeetUpComment[];
  postId: string;
  type: "MeetUpComment" | "PostComment"
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

  const [isRepliesOpen, setIsRepliesOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResponseSubmit = (responseData: PostResponse) => {
    console.log("New response submitted:", responseData);
  };

  function handleContainerClick() {
    console.log("container clicked");
    setIsRepliesOpen(!isRepliesOpen)
  }

  // Get user info from localStorage safely
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const accountType = typeof window !== "undefined" ? localStorage.getItem("accountType") : null;
  const userType = accountType === "org" ? "Org" : "User";

  // Like functionality
  const [likePost] = useMutation(LIKE_POST, {
    refetchQueries: ["Posts"],
  });
  const [unlikePost] = useMutation(UNLIKE_POST, {
    refetchQueries: ["Posts"],
  });

  // Safely check if user liked the post (only for PostCard)
  const userHasLikedPost = (comment: Comment, userId: string) => {
    if (!comment.likes || !Array.isArray(comment.likes)) return false;
    return comment.likes.some(
      (like) => like?.refId?._id?.toString() === userId.toString()
    );
  };

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (comment && userId) {
      const liked = userHasLikedPost(comment, userId);
      setIsLiked(liked);
    }
  }, [comment, userId]);

  // const [likesCount, setLikesCount] = useState<number>(() => {
  //   if (comment) {
  //     return (comment as Comment)?.likeCount || 0;
  //   }
  //   return 0;
  // });

  const handleLikeToggle = async () => {
    if (!userId) {
      console.warn("postData.itemType failure");
      return;
    }

    if (!comment.id) {
      console.warn("Post _id is missing, cannot like/unlike");
      return;
    }

    const variables = {
      postId: comment.trueId,
      input: {
        refId: userId,
        refModel: userType,
      },
    };
    
    try {
      if (!isLiked) {
        const { data } = await likePost({ variables });
        if (data?.likePost?.success) {
          setIsLiked(true);
          //setLikesCount((prev) => prev + 1);
        } else {
          console.warn("Like mutation unsuccessful", data);
        }
      } else {
        const { data } = await unlikePost({ variables });
        if (data?.unlikePost?.success) {
          setIsLiked(false);
          //setLikesCount((prev) => Math.max(prev - 1, 0));
        } else {
          console.warn("Unlike mutation unsuccessful", data);
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

    return (
      <>
        <div className="comment-container">
          <div className="comment-row">
            <div className="comment-img">
              <img src={comment.avatar || UserPlaceHolder}></img>
            </div>
            <div className="comment-content">
              <div onClick={handleContainerClick}>
              <div className="profile-md-fnt-bld">{comment.user}</div> 
              <div className="profile-sm-fnt">{comment.postedTime ? format(comment.postedTime, 'MMM d, yyyy') : 'Unknown date'}</div>
              <div className="profile-sm-fnt">{comment.comment }</div>
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
              </div>
              <div className="comment-icon-row">
                <div
                  className="comment-likes-container"
                  onClick={handleLikeToggle}
                  style={{ cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isLiked}
                  aria-label={isLiked ? "Unlike post" : "Like post"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleLikeToggle();
                    }
                  }}
                >
                  <button>{comment.likeCount}</button>
                  <img src={isLiked ? heartFilled : heart} alt="heart icon" />
                  
                </div>
                <div 
                  className="comment-replies-container"                
                  onClick={() => setIsModalOpen(true)}
                  style={{ cursor: "pointer" }}
                >
                <button>{comment.replies?.length || 0}</button>
                  <img src={chat} alt="comment icon" />
                  
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

export default function Comments({ comments, postId, type }: CommentsProps) {
  console.log("comments and postid: ", comments, " + ", postId, " + ", type);

  const mutationToUse = type === "MeetUpComment" ? ADD_MEETUP_COMMENT : ADD_POST_RESPONSE;

  const [createPostResponse, { loading: responseLoading, error: responseError }] = useMutation(mutationToUse, {
    refetchQueries: ["Posts", "Meetups", "MeetUpComments"],
  });

  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async () => {
    const userId = localStorage.getItem("userId");
    const accountType = localStorage.getItem("accountType");

    if (!userId || !accountType || !newComment.trim()){
      alert("You must be logged in to post."); 
      return;
    }
    try {
      if (type === "PostComment") {
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
      }
      else if (type === "MeetUpComment") {
        await createPostResponse({
          variables: {
            input: {
              meetUpId: postId.toString(),         
              poster: {
                refId: userId,
                refModel: accountType === "org" ? "Org" : "User",
              },
              contentText: newComment.trim(),
            },
          },  
        });
      }
      setNewComment("");
      // Optionally: refresh the comments list or push new comment into local state
    } catch (err) {
      console.error("Failed to submit comment", err);
    }
  };



  comments.sort((a, b) => (a as Comment).postedTime.getTime() - (b as Comment).postedTime.getTime());
  console.log(comments);
  return (
    <div className="comments-section-wrapper">
      {comments.map((comment, idx) => (
        <CommentItem key={idx} comment={(comment as Comment)}/>
      ))}
        <div className="comment-bar">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type a message here..."
          />
          {responseLoading ? "Sending..." : ""}
          <button className="send-message-btn" onClick={handleCommentSubmit}><img src={sendIcon} alt="send message icon" /></button>
          {responseError && <div className="form-errors">Error sending comment.</div>}
        </div>
    </div>
  );
}