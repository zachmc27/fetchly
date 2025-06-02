import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LIKE_POST, UNLIKE_POST } from '../../utils/mutations';
import heart from "../../images/favorite_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import heartFilled from "../../images/heart-fill-svgrepo-com.svg";
import chat from "../../images/chat_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import calendar from "../../images/calendar_month_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import UserPlaceHolder from "../../assets/react.svg";
import { format } from 'date-fns';
import { PostCard } from '../../types/CardTypes';
import ProfileDetails from '../Reusables/ProfileDetails';
import WindowModal from '../Reusables/WindowModal';

type Props = {
  post: PostCard;
  onOpen: (postId: string) => void;
  itemStyle: string;
  userId: string;
  refModel: string;
};

export default function PostCardItem({ post, onOpen, itemStyle, userId, refModel }: Props) {
  // Helper to check if the user liked this post safely
  const userHasLikedPost = (post: PostCard, userId: string) => {
    if (!post.likes || !Array.isArray(post.likes)) return false;
    return post.likes.some(like => like?.refId?._id === userId);
  };

  // Initialize liked and likesCount with safe defaults
  const [isLiked, setIsLiked] = useState(() => userHasLikedPost(post, userId));
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);

  // Sync local like states if post or userId changes
  useEffect(() => {
    setIsLiked(userHasLikedPost(post, userId));
    setLikesCount(post.likesCount || 0);
  }, [post, userId]);

  const [likePost] = useMutation(LIKE_POST, {
    refetchQueries: ["Posts"],
  });
  const [unlikePost] = useMutation(UNLIKE_POST, {
    refetchQueries: ["Posts"],
  });

  const handleLikeToggle = async () => {
    if (!post._id || !userId) {
      console.warn("Missing post._id or userId, cannot toggle like");
      return;
    }

    const variables = {
      postId: post._id,
      input: {
        refId: userId,
        refModel,
      },
    };

    try {
      if (!isLiked) {
        const { data } = await likePost({ variables });
        if (data?.likePost?.success) {
          setIsLiked(true);
          setLikesCount(prev => prev + 1);
        } else {
          console.warn("Like post mutation returned unsuccessful");
        }
      } else {
        const { data } = await unlikePost({ variables });
        if (data?.unlikePost?.success) {
          setIsLiked(false);
          setLikesCount(prev => Math.max(prev - 1, 0));
        } else {
          console.warn("Unlike post mutation returned unsuccessful");
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Poster profile modal state & handlers
  const [showProfileModal, setShowProfileModal] = useState(false);
  const openProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowProfileModal(true);
  };
  const closeModal = () => setShowProfileModal(false);

  return (
    <div
      className={itemStyle}
      onClick={() => {
        if (post._id) {
          onOpen(post._id);
        } else {
          console.warn("post._id is missing on post click");
        }
      }}
    >
      <div className="post-user-info">
        <div onClick={openProfile} style={{ cursor: 'pointer' }}>
          <img
            src={post.poster?.refId?.avatar?.url || UserPlaceHolder}
            className="post-user-avatar"
            alt="profile picture"
          />
          <p className='feed-user-text'>{post.poster?.refId?.username || post.poster?.refId?.orgName || "Unknown User"}</p>
          {/* Defensive check for taggedPets */}
          {post.taggedPets && typeof post.taggedPets === 'object' && 'name' in post.taggedPets && (
            <p>{post.taggedPets.name}</p>
          )}
        </div>
        <div className="post-date-container">
          <img src={calendar} alt="calendar icon" />
          <p>
            {post.createdAt
              ? format(new Date(Number(post.createdAt)), 'MMM d, yyyy')
              : "Unknown date"}
          </p>
        </div>
      </div>
      <p>{post.contentText || ""}</p>
      {post.media && Array.isArray(post.media) && post.media.length > 0 && (
        <div className="img-container">
          {post.media.map((mediaItem, index) => (
            <img
              key={index}
              src={mediaItem.url || ""}
              alt={`post media item ${index + 1}`}
              className="post-image"
            />
          ))}
        </div>
      )}
      <div className="post-details-row">
        <div
          className="post-likes-container"
          onClick={(e) => {
            e.stopPropagation();
            handleLikeToggle();
          }}
          style={{ cursor: "pointer" }}
          role="button"
          aria-pressed={isLiked}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleLikeToggle();
            }
          }}
        >
          <img src={isLiked ? heartFilled : heart} alt="heart icon" />
          <p>{likesCount}</p>
        </div>
        <div className="post-comments-container">
          <img src={chat} alt="comment icon" />
          <p>{post.responseCount || 0}</p>
        </div>
      </div>

      {/* Poster Profile Modal */}
      {showProfileModal && (
        <WindowModal cancel={closeModal} confirm={() => {}}>
          <div onClick={(e) => e.stopPropagation()} className='foreign-profile-container'>
            <button onClick={closeModal} className="modal-close-btn">
              x
            </button>
            <ProfileDetails
              profileUserId={post.poster?.refId?._id || ""}
              profileAccountType={post.poster?.refModel || ""}
            />
          </div>
        </WindowModal>
      )}
    </div>
  );
}