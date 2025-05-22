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











// type UserPhotoProps = {
//   src: string;
//   alt?: string;
//   username: string;
//   onClick?: () => void;
// }

// const dummyData = {
//   src: '../src/assets/userPhoto',
//   alt: 'user',
//   username: 'FetchlyLover123',
// }

// export default function Button({src, alt, username, onClick}: UserPhotoProps ) {
//   return (
//     <div className="user-photo-container" onClick={onClick} > 
//     <img src={dummyData.src} alt={dummyData.alt || dummyData.username} className="avatar-"/>
//       {children}
//     </div>
//   );
// }


// export default function Button({onClick, className}: {onClick: () => void, className: String }) {
//   return (
//     <button onClick={onClick} className={`circle-button ${className}`}>
//       +
//     </button>
//   );
// }
