// takes in convo object as a prop to render a list of users in the group
// delete bubble button that will display an ActionModal and gives user option to delete the conversation
// IF GROUP CHAT: render an input bar and bubble button that allows user to change group chat name and save the name
import { useEffect } from "react";
import { MockConversationObject } from "../../mockdata/mocktypes/Conversation";
import { useMutation } from "@apollo/client";
import { DELETE_CONVERSATION, UPDATE_CONVERSATION } from "../../utils/mutations";

export default function MsgInfoPage({ conversation, onClose }: { conversation: MockConversationObject, onClose: () => void }) {
  function handleClose() {
    localStorage.removeItem("isInfoOpen"); // Clear isInfoOpen from localStorage
    onClose(); // Call the onClose prop to close the component
  }

  const [deleteConversation] = useMutation(DELETE_CONVERSATION);
  const [updateConversation] = useMutation(UPDATE_CONVERSATION);

  async function handleUpdate() {
    const newName = document.querySelector<HTMLInputElement>('.gc-editing-container input')?.value || conversation.conversationName;
    console.log(`New group name: ${newName}`);

    const { data } = await updateConversation({
      variables: {
        input: {
          _id: conversation._id,
          conversationName: newName,
        },
      },
    });

    console.log("Mutation response:", data);

    if (data?.updateConversation?.conversation) {
      alert("Chat name updated successfully to " + data.updateConversation.conversation.conversationName);

    } else {
      console.log("Mutation Cathed: ", data);
      location.reload(); // Refresh the page to reset the state
      
    }
  }

  async function handleDelete() {
    try {
      const { data } = await deleteConversation({
        variables: {
          conversationId: conversation._id,
        },
      });

      if (data.deleteConversation) {
        alert("Chat deleted successfully");
        onClose(); // Close the component after deletion
        return true;
      } else {
        alert("Failed to delete chat");
        return false;
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
      alert("An error occurred while deleting the chat.");
      return false;
    }
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
        <button onClick={handleUpdate}>✏️</button> 
        </div>
      </div>
      }
      <p className="user-list-header">Participants</p>
      <div className="user-list-wrapper">
      {conversation.conversationUsers.map((user) => (
        <div key={user._id} className="msg-info-user-card">
        <div className="msg-user-photo-container">
          <img 
          src={user.avatar?.url ?? "/default-avatar.png"} 
          className="default-icon"
          style={{ marginRight: "10px" }}
        />
        </div>
        
          <p style={{ fontSize: "16px", color: "#555", margin: 0 }}>{user.username ?? "Unknown User"}</p>
        </div>
        //will have to query every user if we want to display their profile photos
      ))}
      </div>
  
    </div>
  );
}
