// renders a feed component, into which you pass back an ARRAY of message objects 
// (will have to generate this array here with the proper API call), where they will be looped through and styled as shown on the messages wireframe.
// clicking on an option will dynamically route the user to the corresponding messages page

import Feed from "../components/Reusables/Feed"
import {useQuery} from "@apollo/client";
import { GET_CONVERSATION_BY_USER } from "../utils/queries";
import { MockConversationObject } from "../mockdata/mocktypes/Conversation";
import PostButton from "../components/Navbar/PostButton";
import danceCat from "../images/364.gif"


const currentUser = localStorage.getItem('userId')
// this is the graphQL query "GET_CONVERSATIONS" that will return all conversation objects
// and create an arrary utilizing the data from the query and the Conversation interface above



export default function Inbox() {
  const { data, loading, error } = useQuery(GET_CONVERSATION_BY_USER, {
    variables: { userId: currentUser || "defaultUserId" }, // Replace with a fallback user ID if currentUser is null
    fetchPolicy: "network-only", // Ensures fresh data is fetched from the server
  });

  if (loading) return <div className="loading-gif-container"><img src={danceCat} alt="loading gif of a dancing cat"/></div>;
  

  // Check if data is null or conversationByUser is empty
  if (!data || !data.conversationByUser || data.conversationByUser.length === 0) {
    return (
      <div className="message-text-content" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <strong className="latest-message" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        Start a new conversation!
      </strong>
      <PostButton />
      </div>
    );
  }
  if (error) return <div>Error loading conversations.</div>;
  const initialFeedArray = data.conversationByUser.map((conversation: MockConversationObject) => {
    return {
      id: conversation._id, // Use `_id` from the API data
      coverImage: `https://ui-avatars.com/api/?name=${conversation.conversationName}&background=random&color=fff&size=128`, // Default cover image
      conversationId: conversation._id, // Use `_id` from the API data
      chatTitle: conversation.conversationName !== "null" ? conversation.conversationName : "New Conversation", // Fallback for `conversationName`
      latestMessage: conversation.lastMessage?.textContent || "No messages yet", // Extract `textContent` or fallback
      Date: conversation.formattedCreatedAt ? new Date(conversation.formattedCreatedAt).toLocaleDateString() : new Date().toLocaleDateString(), // Parse `formattedCreatedAt` or fallback
      itemType: "message",
    };
  });

  return (
    <div className="inbox-page-container">
      <Feed 
        initialFeedArray={initialFeedArray}
        itemStyle="inbox-card"
        containerStyle="inbox-feed-container"
      />
    </div>
  );
}
