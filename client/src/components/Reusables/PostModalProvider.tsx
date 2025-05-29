// putting all of the logic for the post modal in one place
//makes it easier to call on the post pages to get button to work
import { useState, ReactNode } from "react";
import PostModal from "./PostModal";
import NewFreeFormPost from "../Creators/NewPost";
import NewAdoptionPost from "../Creators/NewAdoptionPost";
import NewMeetUpPost from "../Creators/NewMeetupPost";
import type { PostType } from "../../types/Post";
import { PostModalContext } from "../../contexts/PostModalContext";
// import PostTypeDropdown from "./Dropdown";

export const PostModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<PostType>('New Post');
  
const openModalWithType = (type: PostType) => {
    setSelectedType(type);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedType("New Post");
  };

  const changePostType = (type: PostType) => {
    setSelectedType(type);
  }
  
  const renderForm = () => {
    if (selectedType === "Meetup Post") {
      return <NewMeetUpPost onSubmit={handleCloseModal} />;
    }
    if (selectedType === "Adoption Post") {
      return <NewAdoptionPost onSubmit={handleCloseModal} />;
    }
    if (selectedType === "New Post") {
      return <NewFreeFormPost onSubmit={handleCloseModal} />;
    }
    return null;
  };
  
  return (
    <PostModalContext.Provider value={{ openModalWithType, changePostType }}>
      {/* <PostTypeDropdown onSelect={handleChange} /> */}
      {children}
      <PostModal isOpen={isModalOpen} onClose={handleCloseModal}>
        {renderForm()}
      </PostModal>
    </PostModalContext.Provider>
  );
};
