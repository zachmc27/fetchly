import { useContext } from "react";
import { PostModalContext } from "../../contexts/PostModalContext";


// type PostType = "Post" | "Adoption Post" | "Meetup Post" | null;


// interface PostModalContextType {
//   openModalWithType: (type: PostType) => void;
// }

// export const PostModalContext = createContext<PostModalContextType | undefined>(undefined);


export const usePostModal = () => {
  const context = useContext(PostModalContext);
  if (!context) {
    throw new Error("usePostModal must be used within a PostModalProvider");
  }
  return context;
};
