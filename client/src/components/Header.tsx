import profileIcon from "../images/account_circle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import "../ZachTemp.css";
import { Link } from "react-router-dom";
export default function Header() {

  return (
        <div className="fetchly-header">
          <Link to="/profile">
          <img src={profileIcon} alt="" />
          </Link>
          <Link to="/">Fetchly</Link>
        </div>
  );
};


