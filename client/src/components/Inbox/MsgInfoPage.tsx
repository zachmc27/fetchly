// takes in convo object as a prop to render a list of users in the group
// delete bubble button that will display an ActionModal and gives user option to delete the conversation
// IF GROUP CHAT: render an input bar and bubble button that allows user to change group chat name and save the name
import { useEffect } from "react";
import { MockConversationObject } from "../../mockdata/mocktypes/Conversation";

export default function MsgInfoPage({ conversation, onClose }: { conversation: MockConversationObject, onClose: () => void }) {
  function handleClose() {
    localStorage.removeItem("isInfoOpen"); // Clear isInfoOpen from localStorage
    onClose(); // Call the onClose prop to close the component
  }

  function handleDelete() {
    alert('chat deleted')
  }
  useEffect(() => {
    // This function will be called when the component unmounts
    return () => {
      localStorage.removeItem("isInfoOpen"); // Clear isInfoOpen from localStorage
    };
  }, []);

  return (
    <div className="msg-info-container">
      <div className="msg-info-header">
        <button onClick={handleClose}>{"<"}</button>
        <h1>Chat</h1>
        <button onClick={handleDelete}>🗑️</button>
      </div>
      { conversation.conversationUsers.length > 2 &&
      <div className="gc-editing-container">
        {/* add jsx element for change group photo option */}
        <div>
        <input type="text" placeholder={conversation.conversationName}/>
        <button>✏️</button>
        </div>
      </div>
      }
      <p className="user-list-header">Participants</p>
      <div className="user-list-wrapper">
      {conversation.conversationUsers.map((user) => (
        <p key={user} className="msg-info-user-card">{user}</p>
        //will have to query every user if we want to display their profile photos
      ))}
      </div>
  
    </div>
  );
}
