import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { format } from "date-fns";

import calendar from "../../images/calendar_month_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import locationimg from "../../images/location_on_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import clock from "../../images/schedule_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import chat from "../../images/chat_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import heart from "../../images/favorite_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import heartFilled from "../../images/heart-fill-svgrepo-com.svg";
import vaccine from "../../images/syringe_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import mail from "../../images/mail_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import UserPlaceHolder from "../../assets/react.svg";
import NewFreeFormPost from "../Creators/NewPost";
import call from "../../images/call_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import profile from "../../images/person_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import "../../ZachTemp.css"
// testing data, can be deleted after integrations implementation
import { MockMeetupItem } from "../../mockdata/mocktypes/PostDetails";
import { AdoptionCard, PostCard } from "../../types/CardTypes"
import { useEffect, useState } from "react"
import ImageCarousel from "./ImageCarousel"


import { LIKE_POST, UNLIKE_POST } from "../../utils/mutations";
import { MockMeetupItem } from "../../mockdata/mocktypes/PostDetails";
import { PostCard, AdoptionCard } from "../../types/CardTypes";

type postData = PostCard | MockMeetupItem | AdoptionCard;

interface PostResponse {
  poster: {
    refId: string;
    refModel: string;
  };
  contentText: string;
  media?: string[];
}

export default function PostDetails({
  postData,
  containerClass,
  onClose,
}: {
  postData: postData;
  containerClass: string;
  onClose: () => void;
}) {
  // Get user info from localStorage safely
  const userId = typeof window !== "undefined" ? localStorage.getItem("user_Id") : null;
  const accountType = typeof window !== "undefined" ? localStorage.getItem("accountType") : null;
  const userType = accountType === "org" ? "Org" : "User";

  // Safely check if user liked the post (only for PostCard)
  const userHasLikedPost = (post: PostCard, userId: string) => {
    if (!post.likes || !Array.isArray(post.likes)) return false;
    return post.likes.some(
      (like) => like?.refId?._id === userId
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);

  const [isLiked, setIsLiked] = useState(() => {
    if (postData.itemType === "post" && userId) {
      return userHasLikedPost(postData as PostCard, userId);
    }
    return false;
  });

  const [likesCount, setLikesCount] = useState<number>(() => {
    if (postData.itemType === "post") {
      return (postData as PostCard)?.likesCount || 0;
    }
    return 0;
  });

  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset likes and liked state when postData changes (if post)
    if (postData.itemType === "post" && userId) {
      setIsLiked(userHasLikedPost(postData as PostCard, userId));
      setLikesCount((postData as PostCard).likesCount || 0);
    } else {
      setIsLiked(false);
      setLikesCount(0);
    }
  }, [postData, userId]);

  const handleResponseSubmit = (responseData: PostResponse) => {
    console.log("New response submitted:", responseData);
  };

  const handleLikeToggle = async () => {
    if (postData.itemType !== "post" || !userId) return;
    const post = postData as PostCard;

    if (!post._id) {
      console.warn("Post _id is missing, cannot like/unlike");
      return;
    }

    const variables = {
      postId: post._id,
      input: {
        refId: userId,
        refModel: userType,
      },
    };

    try {
      if (!isLiked) {
        const { data } = await likePost({ variables });
        if (data?.likePost?.success) {
          setIsLiked(true);
          setLikesCount((prev) => prev + 1);
        } else {
          console.warn("Like mutation unsuccessful", data);
        }
      } else {
        const { data } = await unlikePost({ variables });
        if (data?.unlikePost?.success) {
          setIsLiked(false);
          setLikesCount((prev) => Math.max(prev - 1, 0));
        } else {
          console.warn("Unlike mutation unsuccessful", data);
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  function handleEmailToggle() {
    setIsEmailOpen((prev) => !prev);
  }

  function handleCallToggle() {
    setIsCallOpen((prev) => !prev);
  }

  function renderPost(postData: postData): JSX.Element | null {
    switch (postData.itemType) {
      case "post": {
        const post = postData as PostCard;
        if (!post) return null;

        return (
          <div key={post._id || post.id} className={containerClass}>
            <div className="post-user-info-row">
              <button onClick={onClose} aria-label="Go back">
                {"<"}
              </button>
              <div className="post-user-info-container">
                <img
                  src={post.poster?.refId?.avatar?.url || UserPlaceHolder}
                  alt="User avatar"
                  onError={(e) => ((e.target as HTMLImageElement).src = UserPlaceHolder)}
                />
                <p className="post-username">
                  {post.poster?.refId?.username || post.poster?.refId?.orgName || "Unknown User"}
                </p>
              </div>
              <p className="post-date-display">
                {post.createdAt
                  ? format(new Date(Number(post.createdAt)), "MMM d, yyyy")
                  : "Unknown date"}
              </p>
            </div>

            <p className="post-content">{post.contentText || ""}</p>

            {post.media && Array.isArray(post.media) && post.media.length > 1 && (
              <div className="img-container">
                <ImageCarousel
                  slides={post.media
                    .map((m) => (typeof m === "string" ? m : m?.url))
                    .filter(Boolean) as string[]}
                />
              </div>
            )}

            {post.media && Array.isArray(post.media) && post.media.length === 1 && (
              <div className="img-container">
                <img
                  src={typeof post.media[0] === "string" ? post.media[0] : post.media[0]?.url || ""}
                  alt="Post media"
                  onError={(e) => ((e.target as HTMLImageElement).src = UserPlaceHolder)}
                />
              </div>
            )}

            <div className="post-info-container">
              <div
                className="post-likes-container"
                onClick={handleLikeToggle}
                style={{ cursor: "pointer" }}
                role="button"
                tabIndex={0}
                aria-pressed={isLiked}
                aria-label={isLiked ? "Unlike post" : "Like post"}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleLikeToggle();
                  }
                }}
              >
                <p>{likesCount}</p>
                <img src={isLiked ? heartFilled : heart} alt="heart icon" />
              </div>

              <div
                className="post-comment-container"
                onClick={() => setIsModalOpen(true)}
                style={{ cursor: "pointer" }}
                role="button"
                tabIndex={0}
                aria-label="Open comments"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }
                }}
              >
                <p>{post.responseCount || 0}</p>
                <img src={chat} alt="comment icon" />
              </div>

              {isModalOpen && (
                <div
                  className="post-modal-overlay"
                  onClick={() => setIsModalOpen(false)}
                  role="dialog"
                  aria-modal="true"
                >
                  <div
                    className="post-modal-content"
                    onClick={(e) => e.stopPropagation()}
                    tabIndex={-1}
                  >
                    <button
                      className="post-modal-close-button"
                      onClick={() => setIsModalOpen(false)}
                      aria-label="Close comments modal"
                    >
                      ×
                    </button>
                    <NewFreeFormPost
                      parentPostId={post._id}
                      onSubmit={(responseData) => {
                        handleResponseSubmit(responseData);
                        setIsModalOpen(false);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }
      case "meetup": {
        const meetup = postData as MockMeetupItem
        return (
          <div key={meetup.id} className={containerClass}>
             <div className="meetup-user-info-row">
                <button onClick={onClose}>{"<"}</button>
                <div className="meetup-user-info-container">
                  <img src={meetup.userAvi} alt="users avatar"/>
                  <p className="meetup-post-username">{meetup.username}</p>
                </div>
                <button className="rsvp-btn">RSVP</button>
            </div>
            
            <div className="img-container"> 
            <ImageCarousel slides={meetup.images}/>
            </div>
            <p className="meetup-title">{meetup.title}</p>
            <p className="meetup-text">{meetup.postText}</p>
             <p><img src={locationimg} alt="location-icon"/>{meetup.location}</p>
            <p><img src={calendar} alt="calendar-icon"/>{meetup.date}</p>
            <p><img src={clock} alt="time-icon"/>{meetup.time}</p>
          </div>
        );
      }
      case "adoption": {
        const adoption = postData as AdoptionCard
        console.log("media:", adoption.media)
        return (
          <div key={adoption._id} className={containerClass}>
            <button onClick={onClose} className="adoption-close-btn">X</button>
            {adoption.media.length === 1 ? 
              <img 
              src={adoption.media[0].url} 
              alt="image of pet" 
              className="adoption-pet-image-container"/>
              :
              <div className="adoption-pet-image-container">
              <ImageCarousel slides={adoption.media.map((m) => m.url)}/>
              </div>
            }
            
            <div className="adoption-pet-main-card">
              <div className="main-pet-card-row">
                <p>{adoption.pet.name}</p>
              {adoption.pet.gender === "male" &&
              <img src="male-icon" alt="male-icon"/>
              }
              {adoption.pet.gender === "female" &&
              <img src="female-icon" alt="female-icon"/>
              }
              </div>
              <div className="adoption-location">
                  <img src={locationimg} alt="map pin icon" />
                  <p>{adoption.location.address}, {adoption.location.city} {adoption.location.state}, {adoption.location.zip}</p>
                </div>
              <div className="secondary-pet-card-row">
                <div className="adoption-pet-age">
                  <img src={calendar} alt="calendar icon" />
                  <p>{adoption.pet.age}</p>
                </div>
                <div className="vaccinated-icon">
                <img src={vaccine} alt="" />
                <p>{adoption.pet.vaccination}</p>
                </div>
              </div>
            </div>
            <div className="org-info-row">
              <div className="main-org-info">
                <img src={adoption.poster.avatar?.url || profile} alt="organization avatar" />
                <p>{adoption.poster.orgName}</p>
              </div>
              <div className="org-contact-info">
                <button onClick={handleEmailToggle}>
                  <img src={mail} alt="email icon" />
                </button>
                <button onClick={handleCallToggle}>
                  <img src={call} alt="phone icon" />
                </button>
              </div>
            </div>
            {isCallOpen &&
              <div className="reveal-container">
                 <div className="contact-reveal">{adoption.poster.phone || "No number provided."}</div>
              </div>
            }
            {isEmailOpen &&
              <div className="reveal-container">
              <div className="contact-reveal">{adoption.poster.email}</div>
              </div>
            }
            <div className="adoption-description-container">
              <p>{adoption.description}</p>
            </div>
            <div className="more-pet-details-container">
              <p>
                <span className="detail-label">Breed:</span>
                <span className="detail-value">{adoption.pet.type.breed}</span>
              </p>
              <p>
                <span className="detail-label">Fixed:</span>
                <span className="detail-value">{adoption.pet.neuteredOrSpayed ? 'Yes' : 'No'}</span>
              </p>
              <p>
                <span className="detail-label">Good with pets:</span> 
                <span className="detail-value">Yes good with all</span>
              </p>
              <p>
                <span className="detail-label">Vaccinations:</span>
                <span className="detail-value">{adoption.pet.vaccination}</span>
              </p>
            </div>
          </div>
        )
      }
      default:
        return null;
    }
  }
  
  return (
    <>
      {renderPost(postData)}
    </>
  )
}
