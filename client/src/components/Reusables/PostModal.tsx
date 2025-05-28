import React from "react";
import '../../PostModal.css'

interface PostModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const PostModal = ({ isOpen, onClose, children }: PostModalProps) => {
    if (!isOpen) return null;


return (
    <div className="post-modal-overlay">
      <div className="post-modal-content">
        <button className="post-modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default PostModal;