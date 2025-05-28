// this component is meant to be flexibly used for viewing a post, meetup post, or adoption post
// each post type will require more or less post details



// Pass back a prop that takes an object containing info about a post and its type (postType = "adoption", postType = "freeflow" etc)
// conditionally render certain attributes based on if the prop passed back has a certain type
// example: IF post.postType === "adoption" RENDER <p> Breed: post.breed </p>
// Pass back a prop identifying the class name of the container

import calendar from "../../images/calendar_month_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import locationimg from "../../images/location_on_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import clock from "../../images/schedule_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import "../../ZachTemp.css"
// testing data, can be deleted after integrations implementation
import { MockPostItem, MockMeetupItem, MockAdoptionItem } from "../../mockdata/mocktypes/PostDetails";


type postData =  MockPostItem | MockMeetupItem | MockAdoptionItem;

export default function PostDetails({ postData, containerClass, onClose }: { postData: postData, containerClass: string, onClose: () => void}) {
  

  function renderPost(postData: postData): JSX.Element | null {
    switch (postData.itemType) {
      case "post": {
        const post = postData as MockPostItem;
        return (
          <div key={post.id} className={containerClass}>
            <img src={post.userAvi} alt="users avatar" />
            <p className="post-username">{post.postUser}</p>
            <p className="post-content">{post.postContent}</p>
            <div className="img-container"> 
            {/* {post.images.length > 0 && 
              post.images.map((image, index) => (
                <img key={index} src={image} alt="post image"></img>
              ))
            } */}
            <img src={post.images[0]} alt="first-image" />
            </div>
            <button>{post.postCommentCount}</button>
            <button>{post.postLikeCount}</button>
            <p>{post.postDate}</p>
          </div>
        );
      }
      case "meetup": {
        const meetup = postData as MockMeetupItem
        return (
          <div key={meetup.id} className={containerClass}>
             <div className="user-info-row">
                <button onClick={onClose}>{"<"}</button>
                <div className="user-info-container">
                  <img src={meetup.userAvi} alt="users avatar"/>
                  <p className="post-username">{meetup.username}</p>
                </div>
                <button className="rsvp-btn">RSVP</button>
            </div>
            
            <div className="img-container"> 
            {/* {meetup.images.length > 0 && 
              meetup.images.map((image, index) => (
                <img key={index} src={image} alt="post image"></img>
              ))
            } */}
            <img src={meetup.images[0]} alt="first image" />
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
          <div key={adoption.id} className={containerClass}>
            {adoption.images.length > 0 && 
              adoption.images.map((image, index) => (
                <div key={index}>
                <img key={index} src={image} alt="post image"></img>
                </div>
              ))
            }
            <p>{adoption.petName}</p>
            {adoption.gender === "male" &&
            <img src="male-icon" alt="male-icon"/>
            }
            {adoption.gender === "female" &&
            <img src="female-icon" alt="female-icon"/>
            }
            <p>{adoption.location}</p>
            <img src={adoption.orgAvi} alt="organization avatar" />
            <p>{adoption.orgName}</p>
            <p>{adoption.orgNumber}</p>
            <p>{adoption.orgEmail}</p>
            <p>{adoption.description}</p>
            <div className="pet-details-container">
              <p>{adoption.breed}</p>
              <p>{adoption.isFixed ? 'Yes' : 'No'}</p>
              <p>{adoption.goodWithPets}</p>
              <p>{adoption.vaccinated}</p>
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
