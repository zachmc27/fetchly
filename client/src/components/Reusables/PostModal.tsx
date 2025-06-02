import React from "react";
import '../../PostModal.css'
import PostTypeDropdown from "./Dropdown";
import type { PostType } from "../../types/Post";
import { usePostModal } from "./usePostModal";


interface PostModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const PostModal = ({ isOpen, onClose, children }: PostModalProps) => {
  const { changePostType } = usePostModal();
  
  if (!isOpen) return null;
  
  
  const handleChange = (type: PostType) => {
    changePostType(type)
  }



return (
    <div className="post-modal-overlay">
      <div className="post-modal-content">
        <button className="post-modal-close-button" onClick={onClose}>×</button>
        <div className="post-form-dropdown">
        <PostTypeDropdown onSelect={handleChange}/>
        </div>
        {children}
      </div>
   </div>
  );
};

export default PostModal;