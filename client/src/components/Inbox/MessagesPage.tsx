// takes in conversation object as prop to render the proper text conversation by conversation.id
// title text at the top that displays the name of the person the user is messaging 
// (rough logic: conversation.user that isnt logged in) OR if its a group chat then conversation.groupChatName
// render the conversation messages in text bubbles displayed on each side of the page
// input bar where a user can enter a message
// send bubble button that executes function to send a message (append it to the proper conversation object and re-render page)
// info bubble button that renders MsgInfoPage for proper conversation when pressed


import { useState, useEffect } from "react";
import { MockConversationObject } from "../../mockdata/mocktypes/Conversation"
import MsgInfoPage from "./MsgInfoPage";
import { useMutation } from "@apollo/client";
import { CREATE_MESSAGE } from "../../utils/mutations"; // Correct the module path and import CREATE_MESSAGE mutation
import sendIcon from "../../images/send_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"



export default function MessagesPage({ conversation, onClose }: { conversation: MockConversationObject, onClose: () => void }) {

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [textContent, setTextContent] = useState(""); // Add state for textContent


  useEffect(() => {
    const storedIsInfoOpen = localStorage.getItem("isInfoOpen");
    if (storedIsInfoOpen === "true") {
      setIsInfoOpen(true);
    }

    return () => {
      localStorage.removeItem("activeConversationId"); // Clear activeConversationId from localStorage
      console.log("MessagesPage unmounted, clearing localStorage");
      localStorage.removeItem("isInfoOpen"); // Clear isInfoOpen from localStorage
    };
  }, []);

  //get user id using query and save it to variable
  // NOTE: the way my mock data is set up, id in the messages array basically corresponds to the ID of the user that sent the message, but I think the backend
  // data is set up to where those ID values are unique to each message. In order to filter the right messages using userID, you will likely
  // have to find the username tied to that ID and filter it like that (or userIDs will need to be added to message data to prevent identical usernames giving the rendering issues)
  const activeConversationId = localStorage.getItem("activeConversationId");
  // const userID = localStorage.getItem('user_Id');
  const userID = "6837b59ff2c13eff3aa57c6b"
  const [addMessage, { loading, error }] = useMutation(CREATE_MESSAGE); // Use the correct mutation name


const handleSendMessage = async (
  event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>,
  textContent: string
) => {
  event.preventDefault(); // Prevent default form submission behavior
  try {
    console.log("Sending message:", textContent);

    const input = {
      conversation: activeConversationId, // Ensure this is a valid conversation ID
      messageUser: {
        _id: userID, // Use the actual user ID
      },
      textContent: textContent, // The message content
    };

    const response = await addMessage({ variables: { input } });
    console.log("Message sent successfully:", response.data.addMessage);
    setTextContent(""); // Clear the input field after sending the message
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

  if (loading) return <p>Sending message...</p>;
  if (error) return <p>Error sending message: {error.message}</p>;
  






  //match this id with id in messages array "to filter the logged in users messages
  
  function handleInfoRender() {
    const newIsInfoOpen = !isInfoOpen;
    setIsInfoOpen(newIsInfoOpen)
     localStorage.setItem("isInfoOpen", newIsInfoOpen.toString());
  }

  if (isInfoOpen) {
    return (
      <MsgInfoPage conversation={conversation} onClose={handleInfoRender} />
    )
  }
  return (
    <div className="messages-page-container">
      <div className="chat-header">{/* temporary header, will have to configure the universal header somehow or disable it on this page */}
        <button onClick={onClose}>{"<"}</button>
        <h1>{conversation.conversationName}</h1>
        <button onClick={handleInfoRender}>i</button>
      </div>
      <div className="chat-messages" style={{ overflowY: "auto", maxHeight: "70vh" }}>
        {conversation.messages?.map((message) => {
          const isUserMessage = message.messageUser._id === userID; // Determine if it's the user's message
          return (
            <div className="message-content-wrapper" key={message._id}> {/* Add key prop */}
              <p className={isUserMessage ? "msg-user-txt" : "msg-incoming-user-txt"}>
                {message.messageUser.username}
              </p>
              <div className={isUserMessage ? "user-message" : "incoming-message"}>
                <div className="avatar-placeholder"></div>
                <p className="msg-txt">{message.textContent}</p>
              </div>
            </div>
          );
        })}
        <div className="chat-bar">
          <input 
            type="text" 
            placeholder="Type a message here..." 
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)} 
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(e, textContent);
              }
            }}
          />
          <button 
            className="send-message-btn" 
            type="button" 
            onClick={(event) => handleSendMessage(event, textContent)}
          >
            ↗️
          </button>
          <input type="text" placeholder="Type a message here..." />
          <button className="send-message-btn"><img src={sendIcon} alt="" /></button>
        </div>
      </div>

    </div>
  )
}
