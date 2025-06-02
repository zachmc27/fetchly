import profileIcon from "../images/account_circle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import "../main.css";
import { Link } from "react-router-dom";
import { QUERY_USER } from '../utils/queries';
import { useQuery} from '@apollo/client';
import { useEffect, useState } from "react";
import BoneIcon from "../images/BoneIcon";
import { motion } from "framer-motion";
import danceCat from "../images/364.gif"
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
      <Link to="/">
      <motion.div
      animate={{scale: [0, 1.2, 0.8, 1.1, 1]}}
      transition={{duration: 1.2, ease:"easeInOut"}}
      >
        <BoneIcon />
      </motion.div>
      </Link>
    </div>
  );
}