// button that takes:
// a function prop to execute when clicked,
// a class name
import React from 'react';
import '../../TempButton.css';

interface ButtonBubbleProps {
  icon?: React.ReactNode;
  imageSrc?: string;
  alt?: string;
  onClick?: () => void;
  className?: string;
}

const ButtonBubble = ({icon, imageSrc, alt, onClick, className}: ButtonBubbleProps) => {
  return (
<button className={`icon-button ${className || ''}`} onClick={onClick}>
      {imageSrc ? (
        <img src={imageSrc} alt={alt || 'button icon'} className="icon-image" />
      ) : (
        icon
      )}
    </button>
  );
};

export default ButtonBubble;

