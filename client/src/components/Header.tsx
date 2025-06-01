
import "../ZachTemp.css";
import { Link } from "react-router-dom";
export default function Header() {

  const profileIcon = localStorage.getItem("userAvatar") || "defaultProfileIcon.png";

  return (
        <div className="fetchly-header">
          <Link to="/profile">
          <img src={profileIcon} alt="" />
          </Link>
          <Link to="/">Fetchly</Link>
        </div>
  );
}


