// putting all of the logic for the post modal in one place
//makes it easier to call on the post pages to get button to work
import { useState, ReactNode } from "react";
import PostModal from "./PostModal";
import NewFreeFormPost from "../Creators/NewPost";
import NewAdoptionPost from "../Creators/NewAdoptionPost";
import NewMeetUpPost from "../Creators/NewMeetupPost";
import { PostModalContext } from "./usePostModal";

// Type of posts the user can create
type PostType = "Post" | "Adoption Post" | "Meetup Post" | null;

// interface PostModalContextType {
//   openModalWithType: (type: PostType) => void;
// }

// const PostModalContext = createContext<PostModalContextType | undefined>(undefined);

// export const usePostModal = () => {
//   const context = useContext(PostModalContext);
//   if (!context) {
//     throw new Error("usePostModal must be used within a PostModalProvider");
//   }
//   return context;
// };

export const PostModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<PostType>(null);

  const openModalWithType = (type: PostType) => {
    setSelectedType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedType(null);
  };

  const renderForm = () => {
    if (selectedType === "Meetup Post") {
      return <NewMeetUpPost onSubmit={handleCloseModal} />;
    }
    if (selectedType === "Adoption Post") {
      return <NewAdoptionPost onSubmit={handleCloseModal} />;
    }
    if (selectedType === "Post") {
      return <NewFreeFormPost onSubmit={handleCloseModal} />;
    }
    return null;
  };

  return (
    <PostModalContext.Provider value={{ openModalWithType }}>
      {children}
      <PostModal isOpen={isModalOpen} onClose={handleCloseModal}>
        {renderForm()}
      </PostModal>
    </PostModalContext.Provider>
  );
};

export default PostType

