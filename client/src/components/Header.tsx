import profileIcon from "../images/account_circle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import "../ZachTemp.css";
import { Link } from "react-router-dom";
import { QUERY_USER } from '../utils/queries';
import { useQuery} from '@apollo/client';
import { useEffect, useState } from "react";

//usestate to recall the avatar url when the page is reloaded
//fallback image is profileIcon
export default function Header() {
  const [avatarUrl, setAvatarUrl] = useState<string>(profileIcon);
  const currentUser = localStorage.getItem('user_Id');
  const { data } = useQuery(QUERY_USER, {
    variables: { userId: currentUser },
  });

  useEffect(() => {
    if (data && data.user && data.user.avatar && data.user.avatar.url) {
      setAvatarUrl(data.user.avatar.url);
    }
  }, [data]);

  return (
    <div className="fetchly-header">
      <Link to="/profile">
        <img className="default-icon" src={avatarUrl} alt="Profile" />
      </Link>
      <Link to="/">Fetchly</Link>
    </div>
  );
}