import { createContext, useContext } from "react";
import type { PostType } from "../types/Post";

type PostModalContextType = {
  openModalWithType: (type: PostType) => void;
  changePostType: (type: PostType) => void;
};

export const PostModalContext = createContext<PostModalContextType | undefined>(undefined);

export const usePostModal = () => {
  const context = useContext(PostModalContext);
  if (!context) {
    throw new Error("usePostModal must be used within a PostModalProvider");
  }
  return context;
};
