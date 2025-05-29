// this component is meant to be flexibly used for viewing a post, meetup post, or adoption post
// each post type will require more or less post details



// Pass back a prop that takes an object containing info about a post and its type (postType = "adoption", postType = "freeflow" etc)
// conditionally render certain attributes based on if the prop passed back has a certain type
// example: IF post.postType === "adoption" RENDER <p> Breed: post.breed </p>
// Pass back a prop identifying the class name of the container

import calendar from "../../images/calendar_month_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import locationimg from "../../images/location_on_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import clock from "../../images/schedule_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import chat from "../../images/chat_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import heart from "../../images/favorite_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import vaccine from "../../images/syringe_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import mail from "../../images/mail_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import call from "../../images/call_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import "../../ZachTemp.css"
// testing data, can be deleted after integrations implementation
import { MockPostItem, MockMeetupItem, MockAdoptionItem } from "../../mockdata/mocktypes/PostDetails";
import { useEffect, useState } from "react"
import ImageCarousel from "./ImageCarousel"


type postData =  MockPostItem | MockMeetupItem | MockAdoptionItem;

export default function PostDetails({ postData, containerClass, onClose }: { postData: postData, containerClass: string, onClose: () => void}) {
  const [isEmailOpen, setIsEmailOpen] = useState(false)  
  const [isCallOpen, setIsCallOpen] = useState(false)  

  useEffect(() => {
    // Scroll to the top of the window when postData changes
    window.scrollTo(0, 0);
  }, [postData]);
  function handleEmailToggle() {
    setIsEmailOpen(!isEmailOpen)
  }

  function handleCallToggle() {
    setIsCallOpen(!isCallOpen)
  }

  function renderPost(postData: postData): JSX.Element | null {
    switch (postData.itemType) {
      case "post": {
        const post = postData as MockPostItem;
        return (
          <div key={post.id} className={containerClass}>
            <div className="post-user-info-row">
                <button onClick={onClose}>{"<"}</button>
                <div className="post-user-info-container">
                  <img src={post.userAvi} alt="users avatar"/>
                  <p className="post-username">{post.postUser}</p>
                </div>
                <p className="post-date-display">{post.postDate}</p>
            </div>
            <p className="post-content">{post.postContent}</p>
            {
              post.postImages && post.postImages.length > 1 &&
              <div className="img-container"> 
              <ImageCarousel slides={post.postImages || []}/>
              </div>
            }
            {
              post.postImages && post.postImages.length === 1 &&
              <div className="img-container">
                <img src={post.postImages[0]} alt="first image"/>
              </div>
              
            }
            <div className="post-info-container">
              <div className="post-likes-container">
                <p>{post.postLikeCount}</p>
                <img src={heart} alt="heart icon" />
              </div>
              <div className="post-comment-container">
                 <p>{post.postCommentCount}</p>
                 <img src={chat} alt="comment icon"/>
              </div>
              
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
              {/* {adoption.images.length > 0 && 
              adoption.images.map((image, index) => (
                <div key={index}>
                <img key={index} src={image} alt="post image"></img>
                </div>
              ))
            } */}
            <img src={adoption.images[0]} alt="first image" />
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
