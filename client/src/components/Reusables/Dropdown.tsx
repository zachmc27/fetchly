// a dropdown menu that includes three options: post, meetup post, adoption post
// clicking on an option will display the form for creating the corresponding post type
// for example: clicking Post will render the NewPost component onto the page

// when an option is selected it becomes the option that is displayed when the dropdown menu is closed. 
// the default option to be displayed will depend on what page the PostBubble was selected on
// example: PostBubble is pressed when a user is on the meetup page --> NewMeetupPost is rendered 
// and the meetup option is the dropdown's default option

import { useState } from "react";
import type { PostType } from "../../types/Post"
import '../../PostDropdown.css'

const postOptions: PostType[] = ['New Post', 'Meetup Post', 'Adoption Post'];

interface PostTypeDropdownProps {
  onSelect: (type: PostType) => void;
}

const PostTypeDropdown = ({ onSelect }: PostTypeDropdownProps ) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<PostType>('New Post');

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (type: PostType) => {
    setSelectedType(type);
    onSelect(type);
    setIsOpen(false);
  };


 return (
    <div className="dropdown-container">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {selectedType} <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {postOptions.map((option) => (
            <li key={option} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostTypeDropdown;