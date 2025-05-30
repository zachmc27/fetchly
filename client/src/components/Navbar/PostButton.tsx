// button that takes:
// a function prop to execute when clicked,
// a class name
// import React from "react";
import { useLocation } from "react-router-dom";
import { usePostModal } from "../Reusables/usePostModal";
import "../../PostButton.css";


const PostButton = () => {
  const location = useLocation();
  const { openModalWithType } = usePostModal();


  const handleClick = () => {
    const path = location.pathname;

    if (path.includes("/meetup")) {
      openModalWithType("Meetup Post");
    } else if (path.includes("/adoption")) {
      openModalWithType("Adoption Post");
    } else if (path.includes("/inbox")) {
      openModalWithType("New Message")
    } else {
      openModalWithType("New Post");
    }
  };
  return (
    <button className={`post-icon-button`} onClick={handleClick}>
      +
    </button>
  );
};

export default PostButton;

