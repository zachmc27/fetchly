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
    try {
      const { data } = await updateConversation({
        variables: {
          input: {
            _id: conversation._id,
            conversationName: conversation.conversationName,
          },
        },
      });
      if (data.updateConversation.success) {
        alert("Chat name updated successfully to " + conversation.conversationName);
      } else {
        alert(`Failed to update chat name: ${data.updateConversation.message}`);
      }
    } catch (error) {
      console.error("Error updating conversation:", error);
      alert("An error occurred while updating the chat name.");
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
        <p key={user._id} className="msg-info-user-card">{user.username || user._id}</p>
        //will have to query every user if we want to display their profile photos
      ))}
      </div>
  
    </div>
  );
}
