// prop that passes back an array of post objects to
// loop through and render
// prop that passes back a CSS class name to put into each list item created, 
// to determine what the posts will look like (varies by post type)
// prop that passes class name for the feed container

// icons and css
import male from "../../images/mars-stroke-solid.svg"
import female from "../../images/venus-solid.svg"
import calendar from "../../images/calendar_month_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import locationimg from "../../images/location_on_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import clock from "../../images/schedule_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import group from "../../images/group_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import { AdoptionCard, PostCard, MeetUpCard } from "../../types/CardTypes";
import { format } from 'date-fns';
import { Comment }from "./Comments"
// testing data, can be deleted after integrations implementation
import { MockMessageCard } from "../../mockdata/mocktypes/Feed"
// import chat from "../../images/chat_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
// import heart from "../../images/favorite_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import { MockConversationObject } from "../../mockdata/mocktypes/Conversation"


//get mutations and queries
import { useQuery, useMutation } from "@apollo/client";
import { GET_CONVERSATION } from "../../utils/queries";
import { ATTEND_MEETUP, UNATTEND_MEETUP } from "../../utils/mutations";
import { useCallback } from "react";

// components
import MessagesPage from "../Inbox/MessagesPage"
import PostDetails from "./PostDetails"
import Comments from "./Comments"

// Cards
import PostCardItem from "../Cards/PostCardItem";

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import SearchBar from "./SearchBar"
import Goinglist from "../Meetup/Goinglist"


import PostButton from "../Navbar/PostButton"
import Header from "../Header"
import { useAdoptionPost } from "../../contexts/AdoptionPostContext"

type FeedItem = MockMessageCard | MeetUpCard | AdoptionCard | PostCard;

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

  // Get user info
  const userId = localStorage.getItem("userId");
  const accountType = localStorage.getItem("accountType");
  const userType = accountType === "org" ? "Org" : "User";

  useEffect(() => {
    setFeedArray(initialFeedArray);
  }, [initialFeedArray]);

// --------------- INBOX PAGE TO MESSAGESPAGE LOGIC ---------------
// ----------------------------------------------------------------
const [activeConversation, setActiveConversation] = useState<MockConversationObject | null>(null); 
const [isChatOpen, setIsChatOpen] = useState(false);
 
const activeConversationId = localStorage.getItem("activeConversationId");

const { data, loading, error } = useQuery(GET_CONVERSATION, {
  variables: { conversationId: activeConversationId },
  fetchPolicy: "network-only",
  skip: !activeConversationId, // Skip query if no activeConversationId
});

useEffect(() => {
  if (!activeConversationId) {
    console.warn("No active conversation ID found in localStorage.");
    return;
  }
  console.log("useEffect triggered for activeConversationId:", activeConversationId);

  if (!activeConversationId) {
    console.warn("No active conversation ID found in localStorage.");
    return;
  }

  if (loading) {
    console.log("Loading conversation...");
    return;
  }

  if (error) {
    console.error("Error fetching conversation:", error);
    return;
  }

  if (data?.conversation) {
    console.log("Fetched conversation data:", data.conversation);
    setActiveConversation(data.conversation);
    setIsChatOpen(true);
  } else {
    console.warn("No conversation found with ID:", activeConversationId);
  }
}, [activeConversationId, loading, error, data]);

const handleMessagePageRender = useCallback((conversationId: string) => {
  console.log("handleMessagePageRender called with conversationId:", conversationId);
  const conversation = feedArray.find(
    (item) => item.itemType === "message" && item.id?.toString() === conversationId
  ) as MockMessageCard | undefined;

  if (conversation) {
    console.log("Opening chat for conversation:", conversation.chatTitle);
    setActiveConversation({
      _id: conversation.id.toString(),
      conversationName: conversation.chatTitle,
      conversationUsers: [], // Add appropriate users if available
      formattedCreatedAt: conversation.formattedCreatedAt // Placeholder for createdAt
    });
    setIsChatOpen(true);
    localStorage.setItem("activeConversationId", conversationId);
  } else {
    console.warn("Conversation not found for ID:", conversationId);
  }
}, [feedArray]);

useQuery(GET_CONVERSATION, {
  variables: { conversationId: localStorage.getItem("activeConversationId") },
  fetchPolicy: "network-only",
  pollInterval: 1000, // Poll every 0.5 seconds
});

const {
  data: messageData,
  loading: messageLoading,
  error: messageError,
} = useQuery(GET_CONVERSATION, {
  variables: { conversationId: localStorage.getItem("activeConversationId") },
  fetchPolicy: "network-only",
  skip: !localStorage.getItem("activeConversationId"),
});

useEffect(() => {
  console.log("useEffect triggered for messageData");
  if (messageLoading) {
    console.log("Loading conversation...");
  } else if (messageError) {
    console.error("Error fetching conversation:", messageError);
  } else if (messageData?.conversation) {
    console.log("Fetched conversation:", messageData.conversation);
    console.log("Messages:", messageData.conversation.messages); // Log messages

    const validMessages = messageData.conversation.messages?.filter((msg: { _id: string }) => msg && msg._id);

    setActiveConversation({
      _id: messageData.conversation._id,
      conversationName: messageData.conversation.conversationName,
      conversationUsers: messageData.conversation.conversationUsers,
      messages: validMessages?.map((msg: { _id: string; textContent: string; messageUser: { _id: string; username: string; avatar?: { url?: string } }; createdAt: string; formattedCreatedAt: string }) => ({
        _id: msg._id,
        textContent: msg.textContent,
        messageUser: {
          _id: msg.messageUser._id,
          username: msg.messageUser.username,
          avatar: {
            url: msg.messageUser.avatar?.url || `https://ui-avatars.com/api/?name=${msg.messageUser.username}&background=random&color=fff&size=128`,
          },
        },
        createdAt: msg.createdAt,
        formattedCreatedAt: msg.formattedCreatedAt,
      })) || [],
    });

    setIsChatOpen(true);
  } else {
    console.warn("No conversation found with ID:", localStorage.getItem("activeConversationId"));
  }
}, [messageLoading, messageError, messageData]);

function handleCloseMessagePage() {
  console.log("handleCloseMessagePage called");
  setIsChatOpen(false);
  localStorage.removeItem("activeConversationId");
  localStorage.removeItem("isInfoOpen");
  if (activeConversation) {
    console.log("Marking conversation as read for ID:", activeConversation._id);
    setFeedArray(prev =>
      prev.map(item => 
        item.itemType === "message" && item.id?.toString() === activeConversation._id
        ? { ...item, isUnread: false }
        : item
      )
    );
  }
  setActiveConversation(null);
}

// ----------------------------------------------------------------
// --------------- MEETUP PAGE TO POST VIEW LOGIC -----------------
// ----------------------------------------------------------------
  const [activeMeetupPost, setActiveMeetupPost] = useState<MeetUpCard | null>(null); 
  const [isMeetupPostOpen, setIsMeetupPostOpen] = useState(false)
  const [isGoingListOpen, setIsGoingListOpen] = useState(false)
  const [isMeetupCommentsOpen, setIsMeetupCommentsOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<'going' | 'comments'>('comments')

  useEffect(() => {
  const storedMeetupId = localStorage.getItem("activeMeetupId");
  if (storedMeetupId && location.pathname === '/meetup') {
    const storedMeetup = initialFeedArray.find(
      (post) => post.itemType === "meetup" && (post as MeetUpCard)._id === storedMeetupId
    ) as MeetUpCard | undefined;
    if (storedMeetup) {
      setActiveMeetupPost(storedMeetup);
      setIsMeetupPostOpen(true);
    }
  }

  if (location.pathname !== "/") {
    localStorage.removeItem("activeMeetupId");
  }
}, [location.pathname, initialFeedArray]);

  function handleMeetupViewRender(meetupId: string) {
    const meetupToOpen = feedArray.find(
    (post) => post.itemType === "meetup" && (post as MeetUpCard)._id === meetupId
  ) as MeetUpCard | undefined;
  console.log(meetupToOpen);

    if (meetupToOpen) {
      console.log('Opening meetup for post:', meetupToOpen.title);
      setActiveMeetupPost(meetupToOpen);
      setIsMeetupPostOpen(true)
      localStorage.setItem("activeMeetupId", meetupToOpen._id.toString());
    } else  {
      console.warn('No conversation found with ID:', meetupId);
    }
    setIsMeetupPostOpen(true)
  }

  function handleCloseMeetupView() {
    setIsMeetupPostOpen(false);
    localStorage.removeItem("activeMeetupId");
    setActiveMeetupPost(null);
  }

  function filterBySearch() {
    console.log('This function will filter posts by the search.');
  }

  function handleGoingListRender() {
    console.log('toggle going list');
    setIsMeetupCommentsOpen(false)
    setIsGoingListOpen(true)
    setActiveTab('going')
  }

  function handleCommentsRender() {
    console.log('toggle comments render');
    setIsGoingListOpen(false)
    setIsMeetupCommentsOpen(true)
    setActiveTab('comments')
  }

// ----------------------------------------------------------------
// --------------- MEETUP PAGE RSVP LOGIC -------------------------
// ----------------------------------------------------------------

  const [attendMeetup] = useMutation(ATTEND_MEETUP, {
    refetchQueries: ["MeetUps"],
  });
  const [unattendMeetup] = useMutation(UNATTEND_MEETUP, {
    refetchQueries: ["MeetUps"],
  });

  const handleAttendMeetupToggle = async (meetupItem: MeetUpCard) => {
    if (meetupItem.itemType !== "meetup" || !userId || userType !== "User") return;

    if (!meetupItem._id) {
      console.warn("MeetUp _id is missing, cannot attend/unattend");
      return;
    }

    const variables = {
      meetUpId: meetupItem._id,
      userId: userId
    };

    try {
      if (meetupItem.attendees.includes(userId) === false) {
        const { data } = await attendMeetup({ variables });
        console.log("RSVP'd successfully: ", data);
      } else {
        const { data } = await unattendMeetup({ variables });
        console.log("Un-RSVP'd successfully: ", data);
      }
    } catch (error) {
      console.error("Error toggling RSVP:", error);
    }
  };  

// ----------------------------------------------------------------
// --------------- HOME PAGE TO POST VIEW LOGIC -------------------
// ----------------------------------------------------------------
const [activePost, setActivePost] = useState<PostCard | null>(null); 
const [isPostOpen, setIsPostOpen] = useState(false)

useEffect(() => {
  const storedPostId = localStorage.getItem("activePostId");
  if (storedPostId && location.pathname === '/') {
    const storedPost = initialFeedArray.find(
      (post) => post.itemType === "post" && (post as PostCard)._id === storedPostId
    ) as PostCard | undefined;
    if (storedPost) {
      setActivePost(storedPost);
      setIsPostOpen(true);
    }
  }

  if (location.pathname !== "/") {
    localStorage.removeItem("activePostId");
  }
}, [location.pathname, initialFeedArray]);

async function handlePostViewRender(postId: string) {
  console.log('post');

  const postToOpen = feedArray.find(
    (post) => post.itemType === "post" && (post as PostCard)._id === postId
  ) as PostCard | undefined;
  console.log(postToOpen);

  if (!postToOpen) {
    console.warn('no post found with ID:', postId);
    return;
  }
  setActivePost(postToOpen);
  setIsPostOpen(true)
  localStorage.setItem("activePostId", postToOpen._id);
}

function handleClosePostView() {
  setIsPostOpen(false)
  localStorage.removeItem("activePostId");
  setActivePost(null)
}

// Convert response to comment

function mapResponseToComment(res: {
    _id: string;
    contentText: string;
    likes?: {refId?: {_id?: string}}[];
    poster: {
      refId: {
        avatar?: { 
          url?: string 
        };
        _id: string;
        username?: string;
        orgName?: string;
      };
      refModel: string;
    };
    media?: { url: string }[];
    likesCount?: number;
    responses?: []
}): Comment {
  return {
    id: parseInt(res._id || "0", 10),
    trueId: res._id,
    user: res.poster.refId.username || res.poster.refId.orgName || "Unknown",
    avatar: res.poster.refId.avatar?.url || undefined,
    comment: res.contentText || "",
    likes: res.likes || [],
    likeCount: res.likesCount || 0,
    postedTime: new Date(),
    replies: [],
    media: [],
    responses: res.responses
    // parentPost: res.
  };
}

// Convert response to comment

function mapMeetUpCommentToComment(res: {
    _id: string;
    contentText: string;
    poster: {
      refId: {
        avatar?: { 
          url?: string 
        };
        _id: string;
        username?: string;
        orgName?: string;
      };
      refModel: string;
    };
}): Comment {
  return {
    id: parseInt(res._id || "0", 10),
    user: res.poster.refId.username || res.poster.refId.orgName || "Unknown",
    avatar: res.poster.refId.avatar?.url || undefined,
    comment: res.contentText || "",
    postedTime: new Date(),
  };
}

// ----------------------------------------------------------------
// --------------- ADOPTION PAGE TO POST VIEW LOGIC -------------------
// ----------------------------------------------------------------
// const [activeAdoptionPost, setActiveAdoptionPost] = useState<AdoptionCard | null>(null); 
// const [isAdoptionPostOpen, setIsAdoptionPostOpen] = useState(false)
const { isAdoptionPostOpen, setIsAdoptionPostOpen, activeAdoptionPost, setActiveAdoptionPost } = useAdoptionPost();

useEffect(() => {
  const storedAdoptionId = localStorage.getItem("activeAdoptionId");
  if (storedAdoptionId && location.pathname === '/adoption') {
    const storedAdoption = initialFeedArray.find(
      (post) => post.itemType === "adoption" && (post as AdoptionCard)._id === storedAdoptionId
    ) as AdoptionCard | undefined;
    if (storedAdoption) {
      setActiveAdoptionPost(storedAdoption);
      setIsAdoptionPostOpen(true);
    }
  }

  if (location.pathname !== "/adoption") {
    localStorage.removeItem("activeAdoptionId");
  }
}, [location.pathname, initialFeedArray, setActiveAdoptionPost, setIsAdoptionPostOpen]);

// Inside a component that needs to listen directly, e.g., Feed.tsx or Adoption.tsx
useEffect(() => {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === "activeAdoptionId" && event.newValue === null) {
      setActiveAdoptionPost(null);
      setIsAdoptionPostOpen(false)
      console.log("activeAdoptionId was removed from localStorage.");
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, [setActiveAdoptionPost, setIsAdoptionPostOpen]);

function handleAdoptionPostViewRender(adoptionId: string) {

  const adoptionToOpen = feedArray.find(
  (post) => post.itemType === "adoption" && (post as AdoptionCard)._id === adoptionId
  ) as AdoptionCard | undefined;
  console.log(adoptionToOpen);

  if (!adoptionToOpen) {
    console.log('no post found');
    return
  }
 
  setActiveAdoptionPost(adoptionToOpen);
  console.log('active post:', activeAdoptionPost);
  setIsAdoptionPostOpen(true)
  localStorage.setItem("activeAdoptionId", adoptionToOpen._id.toString());
  setIsAdoptionPostOpen(true)
}

function handleCloseAdoptionPostView() {
  setIsAdoptionPostOpen(false)
  localStorage.removeItem("activeAdoptionId");
  setActiveAdoptionPost(null)
}

// ----------------------------------------------------------------
  function renderFeedItem(item: FeedItem, index: number): JSX.Element | null  {

    
    switch (item.itemType) {
      case "message": {
          const messageItem = item as MockMessageCard;
          return (

            <div key={index} className={itemStyle} onClick={() => handleMessagePageRender(messageItem.id.toString())}>   

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
              <p className="chat-date">{messageItem.formattedCreatedAt}</p>
            </div>
          );
        }
      case "post": {
  const postItem = item as PostCard;
  return (
    <PostCardItem
      key={index}
      post={postItem}
      onOpen={handlePostViewRender}
      itemStyle={itemStyle}
      userId={userId || ""}
      refModel={userType}
    />
  );
        }
      case "adoption": {
        const adoptionItem = item as AdoptionCard
        return (
          <div key={adoptionItem._id} className={itemStyle} onClick={() => handleAdoptionPostViewRender(adoptionItem._id)}>
            <div className="adoption-image-container">
              <img
              src={adoptionItem.pet.profilePhoto?.url || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
              alt="cover image for the post"
              />
            </div>
            <div className="adoption-feed-info-container">
            <h1 className="clickable-header">{adoptionItem.pet.name}</h1>
              <div className="adoption-feed-details-row">
                <div className="age-info"> 
                  <img src={calendar} alt="calendar icon" className="calendar-icon" />
                  <p>{adoptionItem.pet.age} yrs</p>
                </div>
              {adoptionItem.pet.gender === "male" &&
              <img src={male} alt="male-icon" className="male-icon"/>
              }
              {adoptionItem.pet.gender === "female" &&
              <img src={female} alt="female-icon" className="female-icon"/>
              }
              </div>
              <div className="adoption-feed-description-row">
                <p>{adoptionItem.description}</p>
              </div>
            </div>
          </div>
        );
        }
case "meetup": {
        const meetupItem = item as MeetUpCard;
        return (
          <div
            key={index}
            className={itemStyle}
            onClick={() => handleMeetupViewRender(meetupItem._id.toString())}
          >
            <p className="post-user">{meetupItem.poster.refId.username}</p>
            <div className="meetup-info-row">
              <div className="meetup-image-container">
                <img src={meetupItem.media[0]?.url || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"} alt="cover image for the post" />
              </div>
              <div className="meetup-main-text">
                <h1>{meetupItem.title}</h1>
                <div className="meetup-location-container">
                  <img src={locationimg} alt="location pin" />
                    <p>{meetupItem.location.address}, {meetupItem.location.city} {meetupItem.location.state}, {meetupItem.location.zip}</p> 
                </div>
              </div>
              <button className="rsvp-btn" onClick={() => handleAttendMeetupToggle(meetupItem)}>RSVP</button>
            </div>
            <div className="meetup-details-row">
              <div className="meetup-date">
                <img
                  src={calendar}
                  alt="calendar icon"
                  className="meetup-detail-icon"
                />
                <p>
                  {format(new Date(Number(meetupItem.date)), "MMM d, yyyy")}
                </p>
              </div>
              <div className="meetup-time">
                <img
                  src={clock}
                  alt="clock icon"
                  className="meetup-detail-icon"
                />
                <p>{meetupItem.time}</p>
              </div>
              <div className="rsvp-count">
                <img
                  src={group}
                  alt="people icon"
                  className="meetup-detail-icon"
                />
                <p>{meetupItem.numberOfAttendees}</p>
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

if (isMeetupPostOpen && activeMeetupPost) {
  return (
    <>
    <PostDetails 
     postData={activeMeetupPost} 
     containerClass="meetup-details-container"
     onClose={handleCloseMeetupView}
     />
    <div className="tab-switcher">
    <button onClick={handleGoingListRender} className={activeTab === 'going' ? 'active' : ''}>Going</button>
    <button onClick={handleCommentsRender} className={activeTab === 'comments' ? 'active' : ''}>Comments</button>
    </div>
    {console.log("activemeetupcomments: ",activeMeetupPost)}
    {
      isMeetupCommentsOpen &&
      <Comments
        comments={(activeMeetupPost.comments || []).map(mapMeetUpCommentToComment)}
        postId={activeMeetupPost._id}
        type={"MeetUpComment"}      
      />
        // <Comments comments={activeMeetupPost.comments} postId={activeMeetupPost.id?.toString() || ""}/>
    }
    {
      isGoingListOpen &&
      <Goinglist rsvpList={activeMeetupPost.attendees}/>
    }
    </>
  )
}

if (isPostOpen && activePost) {

  return (
  <div className="viewing-container">
  <PostDetails
   postData={activePost}
   containerClass="post-details-container"
   onClose={handleClosePostView}
  />
  <Comments
    comments={(activePost.responses || []).map(mapResponseToComment)}
    postId={activePost._id}
    type={"PostComment"}
  />
  </div>
  )
}

if (isAdoptionPostOpen && activeAdoptionPost) {
  return (
    <>
    <Header />
    <PostDetails
     postData={activeAdoptionPost}
     containerClass="adoption-details-container"
     onClose={handleCloseAdoptionPostView}
    />
    </>
  )
}

return (
  <>
    <Header />
    {
      !isMeetupPostOpen && location.pathname === "/meetup" &&
      <SearchBar send={filterBySearch} />
    }
    <div className={containerStyle}>
      
      {feedArray.map(renderFeedItem)}
    </div>
    <PostButton />
  </>
  );
}
