import { useContext } from "react";
import { PostModalContext } from "../../contexts/PostModalContext";

export const usePostModal = () => {
  const context = useContext(PostModalContext);
  if (!context) {
    throw new Error("usePostModal must be used within a PostModalProvider");
  }
  return context;
};
