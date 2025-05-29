import { useLocation } from "react-router-dom";
import { usePostModal } from "../Reusables/usePostModal";
import PostTypeDropdown from "../Reusables/Dropdown";
import { PostType } from "../../types/Post";
import "../../TopNavBar.css";
// import { div } from "framer-motion/client";

const TopNavBar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { openModalWithType } = usePostModal();


  const handleChange = (type: PostType) => {
    openModalWithType(type);
  };

  return (
    <nav className="top-nav-container">
      {isHomePage ? (
        <div className="fetchly-header">
          <h1 className="logo-text">Fetchly</h1>
        </div>
      ) : (
        <PostTypeDropdown onSelect={handleChange} />
      )}
    </nav>
  );
};

export default TopNavBar;
