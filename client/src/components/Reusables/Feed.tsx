// prop that passes back an array of post objects to
// loop through and render
// prop that passes back a CSS class name to put into each list item created, 
// to determine what the posts will look like (varies by post type)
// prop that passes class name for the feed container

import male from "../../images/mars-stroke-solid.svg"
import female from "../../images/venus-solid.svg"
import calendar from "../../images/calendar_month_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import locationimg from "../../images/location_on_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import clock from "../../images/schedule_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import group from "../../images/group_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import { MockPostCard, MockAdoptionCard, MockMeetupCard, MockMessageCard } from "../../mockdata/mocktypes/Feed"
import { mockConversations } from "../../mockdata/conversation-data"
import { MockConversationObject } from "../../mockdata/mocktypes/Conversation"
import "../../ZachTemp.css"
import MessagesPage from "../Inbox/MessagesPage"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"



type FeedItem = MockMessageCard | MockPostCard | MockMeetupCard | MockAdoptionCard;

export default function Feed({
  initialFeedArray,
  itemStyle,
  containerStyle,
}: {
  initialFeedArray: FeedItem[];
  itemStyle: string;
  containerStyle: string;
}) {
  const location = useLocation();
  const [feedArray, setFeedArray] = useState<FeedItem[]>(initialFeedArray);

// --------------- INBOX TO MESSAGESPAGE PAGE LOGIC ---------------
// ----------------------------------------------------------------

  const [activeConversation, setActiveConversation] = useState<MockConversationObject | null>(null); 
  const [isChatOpen, setIsChatOpen] = useState(false)
 
  useEffect(() => {
    const storedConversationId = localStorage.getItem("activeConversationId");
    if (storedConversationId && location.pathname === '/inbox') {
      const conversationId = parseInt(storedConversationId, 10); // Parse as integer
      const storedConversation = mockConversations.find((convo) => convo.id === conversationId);
      if (storedConversation) {
        setActiveConversation(storedConversation);
        setIsChatOpen(true);
      }
    }

    if (location.pathname !== "/inbox") {
      localStorage.removeItem("activeConversationId");
      localStorage.removeItem("isInfoOpen");
    }
  }, [location.pathname]);

  // currently expects a number with how my mock data is setup but will have to be changed to handle strings
  // additionally, if the linking IDs between convo collection and messages collection differ, the .find logic will have to be adjusted to handle that.
  
  function handleMessagePageRender(messageId: number) { 
    const conversationToOpen = mockConversations.find(convo => convo.id === messageId);

    if (conversationToOpen) {
      console.log('Opening chat for conversation:', conversationToOpen.conversationName);
      setActiveConversation(conversationToOpen);
      setIsChatOpen(true)
      localStorage.setItem("activeConversationId", conversationToOpen.id.toString());
    } else  {
      console.warn('No conversation found with ID:', messageId);
    }
  }

   function handleCloseMessagePage() {
    setIsChatOpen(false);
    localStorage.removeItem("activeConversationId");
    localStorage.removeItem("isInfoOpen");
    if (activeConversation) {
      setFeedArray(prev =>
        prev.map(item => 
          item.itemType === "message" && item.id === activeConversation.id
          ? { ...item, isUnread: false }
          : item
        )
      )
    }
    setActiveConversation(null);
  }
// ----------------------------- END ------------------------------
// ----------------------------------------------------------------

  function renderFeedItem(item: FeedItem): JSX.Element | null  {
    
    switch (item.itemType) {
      case "message": {
          const messageItem = item as MockMessageCard;
          return (
            <div key={item.id} className={itemStyle} onClick={() => handleMessagePageRender(messageItem.id)}>   
              <div className="unread-indicator-area">
                {messageItem.isUnread && <div className="unread-dot"></div>}
              </div>
              {
                messageItem.coverImage ? 
                <img
                src={messageItem.coverImage} 
                alt="Chat icon"
                className="message-icon"
                /> :
                <div className="message-icon">
                <img
                src={group}
                alt="Chat icon"
                className="default-icon"
                />
                </div>
              }
              <div className="message-text-content">
                <h1 className="chat-title">{messageItem.chatTitle}</h1>
                <p className="latest-message">{messageItem.latestMessage}</p>
              </div>
              <p className="chat-date">{messageItem.date}</p>
            </div>
          );
        }
      case "post": {
        const postItem = item as MockPostCard;
        return (
          
          <div key={postItem.id} className={itemStyle}>
            {/* post JSX */}
            <div className="user-info">
                <img src={postItem.userAvi} alt="User Avatar" className="user-avatar" />
                <h1 className="username">{postItem.postUser}</h1>
            </div>
            <p className="post-content">{postItem.postContent}</p>
            <p className="post-date">{postItem.postDate}</p>
            <p className="comment-count">{postItem.postCommentCount}</p>

            
          </div>
        );
        }
      case "adoption": {
        const adoptionItem = item as MockAdoptionCard
        return (
          <div key={adoptionItem.id} className={itemStyle}>
            {/* adoption JSX */}
            <div className="adoption-image-container">
              <img src={adoptionItem.petCoverImage} alt="cover image for the post" />
            </div>
            <div className="adoption-feed-info-container">
            <h1>{adoptionItem.petName}</h1>
              <div className="adoption-feed-details-row">
                <div className="age-info"> 
                  <img src={calendar} alt="calendar icon" className="calendar-icon" />
                  <p>{adoptionItem.petAge} yrs</p> {/* Added "yrs" for context */}
                </div>
              {adoptionItem.petGender === "male" &&
              <img src={male} alt="male-icon" className="male-icon"/>
              }
              {adoptionItem.petGender === "female" &&
              <img src={female} alt="female-icon" className="female-icon"/>
              }
              </div>
            </div>
          </div>
        );
        }
      case "meetup": {
        const meetupItem = item as MockMeetupCard
        return (
          <div key={meetupItem.id} className={itemStyle}>
            <p className="post-user">{meetupItem.postUser}</p>
            <div className="meetup-info-row">
              <div className="meetup-image-container">
                <img src={meetupItem.postImage} alt="cover image for the post" />
              </div>
              <div className="meetup-main-text">
                <h1>{meetupItem.postTitle}</h1> 
                <div className="meetup-location-container">
                  <img src={locationimg} alt="location pin" />
                  <p>{meetupItem.postLocation}</p>  
                </div> 
              </div>
              <button className="rsvp-btn">RSVP</button>  
            </div>
            <div className="meetup-details-row">
              <div className="meetup-date">
                <img src={calendar} alt="calendar icon" className="meetup-detail-icon"/>
                <p>{meetupItem.postDate}</p>
              </div>
              <div className="meetup-time">
                <img src={clock} alt="clock icon" className="meetup-detail-icon"/>
                <p>{meetupItem.meetupTime}</p>
              </div>
              <div className="rsvp-count">
                <img src={group} alt="people icon" className="meetup-detail-icon"/>
                <p>{meetupItem.postRSVPCount}</p>
              </div>
            </div>
           
          </div>
        );
        }

      default:
        return null;
  }
}

if (isChatOpen && activeConversation) {
      return (
        <MessagesPage 
        conversation={activeConversation}
        onClose={handleCloseMessagePage}/>
      )
}

return (
    <div className={containerStyle}>
      {feedArray.map(renderFeedItem)}
    </div>

  );
}