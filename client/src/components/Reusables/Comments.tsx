// pass a prop that takes an array of comment objects to render a list of comments
// need consult back end team to figure out if replies are their own array or if they are included in the comment objects

// utilize bubble button components to make the replies button and like button

//HOW TO CALL:
// const commentsData = [{}]; 
// <Comments comments={commentsData}/>

//import React, { useState } from 'react';
import UserPlaceHolder from "../../assets/react.svg";
import "../../SammiReusables.css";
import ButtonBubble from "./Button";


type Comment = {
  id: number,
  user: string,
  avatar?: string,
  comment: string,
  likeCount: number,
  postedTime: Date,
  replies: Comment[]
}

type CommentsProps = {
  comments: Comment[];
};

function CommentItem({ comment }: { comment: Comment }) {
  //pass back the comment id so it can be opened as main post
  const handleContainerClick = () => {
    console.log("Comment clicked:", comment.id);
    return comment.id;
  };

  
  return (
    <div >
      <div className="comment-container" >
        <div className="comment-row">
          <div className="comment-img">
            <img src={comment.avatar || UserPlaceHolder}></img> 
          </div>
          <div className="comment-content" onClick={handleContainerClick}>
            <span>{comment.user}</span> <br></br>
            <span>{comment.comment}</span><br></br>
            <div className="comment-icon-row">
              <ButtonBubble />
              <ButtonBubble />
            </div>
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default function Comments({ comments }: CommentsProps) {
  comments.sort((a, b) => a.postedTime.getTime() - b.postedTime.getTime());
  console.log(comments);
  return (
    <div>
      {comments.map((comment, idx) => (
        <CommentItem key={idx} comment={comment} />
      ))}
    </div>
  );
}
