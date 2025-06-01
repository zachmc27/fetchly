// this component is meant to be flexibly used for viewing a post, meetup post, or adoption post
// each post type will require more or less post details



// Pass back a prop that takes an object containing info about a post and its type (postType = "adoption", postType = "freeflow" etc)
// conditionally render certain attributes based on if the prop passed back has a certain type
// example: IF post.postType === "adoption" RENDER <p> Breed: post.breed </p>
// Pass back a prop identifying the class name of the container

import calendar from "../../images/calendar_month_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import { format } from 'date-fns';
import locationimg from "../../images/location_on_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import clock from "../../images/schedule_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import chat from "../../images/chat_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import heart from "../../images/favorite_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import heartFilled from "../../images/heart-fill-svgrepo-com.svg";
import vaccine from "../../images/syringe_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import mail from "../../images/mail_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import UserPlaceHolder from "../../assets/react.svg";
import call from "../../images/call_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import "../../ZachTemp.css"
// testing data, can be deleted after integrations implementation
import { MockMeetupItem, MockAdoptionItem } from "../../mockdata/mocktypes/PostDetails";
import { PostCard } from "../../types/CardTypes"
import { useEffect, useState } from "react"
import ImageCarousel from "./ImageCarousel"

// Mutations
import { useMutation } from '@apollo/client';
import { LIKE_POST, UNLIKE_POST } from '../../utils/mutations';

// Components
import NewFreeFormPost from "../Creators/NewPost"

type postData =  PostCard | MockMeetupItem | MockAdoptionItem;

interface PostResponse {
    poster: {
      refId: string;
      refModel: string;
    };
    contentText: string;
    media?: string[];
}


export default function PostDetails({ postData, containerClass, onClose }: { postData: postData, containerClass: string, onClose: () => void}) {

  // Get user info
  const userId = localStorage.getItem("user_Id");
  const accountType = localStorage.getItem("accountType");
  const userType = accountType === "org" ? "Org" : "User";

  const userHasLikedPost = (post: PostCard, userId:string) => {
    return post.likes.some(like => like.refId._id === userId);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);
  const [isLiked, setIsLiked] = useState(() => {
    if (postData.itemType === 'post') {
          const post = postData as PostCard; 
        return userHasLikedPost(post, userId || "");
      }
    return false;
  });
  const [likesCount, setLikesCount] = useState<number>(() => {
    if (postData.itemType === 'post') {
        return (postData as PostCard)?.likesCount || 0;
      }
    return 0;
  });    
    
  const [isEmailOpen, setIsEmailOpen] = useState(false)  
  const [isCallOpen, setIsCallOpen] = useState(false)      

  if (postData.itemType === 'post') {
    // Liking Post Functionality

  }

  useEffect(() => {
    // Scroll to the top of the window when postData changes
    window.scrollTo(0, 0);
  }, [postData]);

  const handleResponseSubmit = (responseData: PostResponse) => {
    console.log("New response submitted:", responseData);
  };

  const handleLikeToggle = async () => {
    if (postData.itemType !== 'post') return;
    const post = postData as PostCard;

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

  function handleEmailToggle() {
    setIsEmailOpen(!isEmailOpen)
  }

  function handleCallToggle() {
    setIsCallOpen(!isCallOpen)
  }

  function renderPost(postData: postData): JSX.Element | null {
    switch (postData.itemType) {
      case "post": {
        const post = postData as PostCard;

        return (
          <div key={post.id} className={containerClass}>
            <div className="post-user-info-row">
                <button onClick={onClose}>{"<"}</button>
                <div className="post-user-info-container">
                  <img src={post.poster.refId.avatar?.url || UserPlaceHolder} alt="users avatar"/>
                  <p className="post-username">{post.poster.refId.username || post.poster.refId.orgName}</p>
                </div>
                <p className="post-date-display">{format(new Date(Number(post.createdAt)), 'MMM d, yyyy')}</p>
            </div>
            <p className="post-content">{post.contentText}</p>
            {
              post.media && post.media.length > 1 &&
              <div className="img-container"> 
              <ImageCarousel slides={post.media.map(m =>m.url).filter(Boolean)}/>
              </div>
            }
            {
              post.media && post.media.length === 1 &&
              <div className="img-container">
                <img src={post.media[0].url} alt="first image"/>
              </div>
              
            }
            <div className="post-info-container">
              <div className="post-likes-container" onClick={handleLikeToggle} style={{ cursor: "pointer" }}>
                <p>{likesCount}</p>
                  <img src={isLiked ? heartFilled : heart} alt="heart icon" />
              </div>
              <div 
                className="post-comment-container" 
                onClick={() => setIsModalOpen(true)}
                style={{ cursor: "pointer" }}
              >
                <p>{post.responseCount}</p>
                <img src={chat} alt="comment icon" />
              </div>
              {isModalOpen && (
                <div className="post-modal-overlay" onClick={() => setIsModalOpen(false)}>
                  <div className="post-modal-content" onClick={e => e.stopPropagation()}>
                    <button className="post-modal-close-button" onClick={() => setIsModalOpen(false)}>×</button>
                    <NewFreeFormPost
                      parentPostId={post._id}
                      onSubmit={(responseData) => {
                        handleResponseSubmit(responseData);
                        setIsModalOpen(false); // close modal on submit
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
        const adoption = postData as MockAdoptionItem
        return (
          <div key={adoption._id} className={containerClass}>
            <div className="adoption-pet-image-container">
              <ImageCarousel slides={adoption.images}/>
            </div>
            <div className="adoption-pet-main-card">
              <div className="main-pet-card-row">
                <p>{adoption.petName}</p>
              {adoption.gender === "male" &&
              <img src="male-icon" alt="male-icon"/>
              }
              {adoption.gender === "female" &&
              <img src="female-icon" alt="female-icon"/>
              }
              </div>
              <div className="secondary-pet-card-row">
                <div className="adoption-location">
                  <img src={locationimg} alt="map pin icon" />
                  <p>{adoption.location}</p>
                </div>
                <div className="adoption-pet-age">
                  <img src={calendar} alt="calendar icon" />
                  <p>{adoption.age}</p>
                </div>
                <div className="vaccinated-icon">
                <img src={vaccine} alt="" />
                {adoption.vaccinated === true &&
                  <p>Yes</p>
                }
                {adoption.vaccinated === false &&
                  <p>No</p>
                }
                </div>
              </div>
            </div>
            <div className="org-info-row">
              <div className="main-org-info">
                <img src={adoption.orgAvi} alt="organization avatar" />
                <p>{adoption.orgName}</p>
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
              <div className="contact-reveal">{adoption.orgNumber}</div>
            }
            {isEmailOpen &&
              <div className="contact-reveal">{adoption.orgEmail}</div>
            }
            <p>{adoption.description}</p>
            <div className="more-pet-details-container">
              <p>
                <span className="detail-label">Breed:</span>
                <span className="detail-value">{adoption.breed}</span>
              </p>
              <p>
                <span className="detail-label">Fixed:</span>
                <span className="detail-value">{adoption.isFixed ? 'Yes' : 'No'}</span>
              </p>
              <p>
                <span className="detail-label">Good with pets:</span> 
                <span className="detail-value">{adoption.goodWithPets}</span>
              </p>
              <p>
                <span className="detail-label">Vaccinated:</span>
                <span className="detail-value">{adoption.vaccinated}</span>
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
