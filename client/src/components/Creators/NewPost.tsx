//form for creating a free flow post
import React, { useState } from "react";
import { FaImage, FaCamera, FaAt } from "react-icons/fa";

interface NewPostProps {
  onSubmit: (data: {
    content: string;
    media?: File[];
  }) => void
}

const NewFreeFormPost = ({ onSubmit }: NewPostProps) => {
  const [content, setContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMediaFiles([...mediaFiles, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = () => {
    onSubmit({ content, media: mediaFiles });
    setContent('');
    setMediaFiles([]);
  };


return (
  <div className="post-creator-container">
    <div className="post-input-wrapper">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="post-textarea"
      />
    </div>

    <div className="post-toolbar">
      <div className="media-buttons">
        <label className="image-button">
          <FaImage className="icon" />
          <input
            type="file"
            accept=".png, .jpeg, .jpg"
            multiple
            className="file-input"
            onChange={handleMediaChange}
            style={{display: 'none'}}
          />
        </label>
        <label className="camera-button">
          <FaCamera className="icon" />
          <input 
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            onChange={handleMediaChange} 
            style={{display: 'none'}}/>
        </label>
        <button type="button" className="at-button">
          <FaAt className="icon" />
        </button>
      </div>
      <button onClick={handleSubmit} className="submit-post-button">
        Post
      </button>
    </div>
  </div>
);
};




export default NewFreeFormPost
