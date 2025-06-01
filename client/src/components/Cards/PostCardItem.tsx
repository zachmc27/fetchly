import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LIKE_POST, UNLIKE_POST } from '../../utils/mutations';
import heart from "../../images/favorite_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import heartFilled from "../../images/heart-fill-svgrepo-com.svg";
import chat from "../../images/chat_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import calendar from "../../images/calendar_month_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import UserPlaceHolder from "../../assets/react.svg";
import { format } from 'date-fns';
import { PostCard } from '../../types/CardTypes';

type Props = {
  post: PostCard;
  onOpen: (postId: string) => void;
  itemStyle: string;
  userId: string;
  refModel: string;
};

export default function PostCardItem({ post, onOpen, itemStyle, userId, refModel }: Props) {
  const userHasLikedPost = (post: PostCard, userId:string) => {
    return post.likes.some(like => like.refId._id === userId);
  };

  const [isLiked, setIsLiked] = useState(() => userHasLikedPost(post, userId));
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);

  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);

  const handleLikeToggle = async () => {
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
        }
      } else {
        const { data } = await unlikePost({ variables });
        if (data?.unlikePost?.success) {
          setIsLiked(false);
          setLikesCount(prev => Math.max(prev - 1, 0));
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div key={post._id} className={itemStyle} onClick={() => onOpen(post._id)}>
      <div className="post-user-info">
        <img src={post.poster.refId.avatar?.url || UserPlaceHolder} alt="profile picture" />
        <p>{post.poster.refId.username || post.poster.refId.orgName}</p>
        <div className="post-date-container">
          <img src={calendar} alt="calendar icon" />
          <p>{format(new Date(Number(post.createdAt)), 'MMM d, yyyy')}</p>
        </div>
      </div>
      <p>{post.contentText}</p>
      {post.media && post.media.length > 0 && (
        <div className="img-container">
          {post.media.map((mediaItem, index) => (
            <img key={index} src={mediaItem.url} alt={`post media item ${index + 1}`} className="post-image" />
          ))}
        </div>
      )}
      <div className="post-details-row">
        <div className="post-likes-container" onClick={(e) => { e.stopPropagation(); handleLikeToggle(); }} style={{ cursor: "pointer" }}>
          <img src={isLiked ? heartFilled : heart} alt="heart icon" />
          <p>{likesCount}</p>
        </div>
        <div className="post-comments-container">
          <img src={chat} alt="comment icon" />
          <p>{post.responseCount}</p>
        </div>
      </div>
    </div>
  );
}