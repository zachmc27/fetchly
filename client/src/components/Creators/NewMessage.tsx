//form for creating a new dm/group dm

import { useState } from "react";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";

import { CREATE_CONVERSATION } from "../../utils/mutations";
import { QUERY_USER_BY_USERNAME, GET_FOLLOWERS} from "../../utils/queries";

const loggedInUser = localStorage.getItem("loggedInUser");

interface NewMessageProps {
  onSubmit: () => void;
  onClose: () => void;

}

export default function NewMessage({ onSubmit, onClose }: NewMessageProps) {

  const [selectedParticipantNames, setSelectedParticipantNames] = useState<string[]>([]);
  const [createConversation] = useMutation(CREATE_CONVERSATION);
  const [groupName, setGroupName] = useState<string>("");
  const [fetchUserByUsername] = useLazyQuery(QUERY_USER_BY_USERNAME);
  


  interface Follower {
    userAvi: string;
    userName: string;
  }

  const { data: followersData }: { data?: { user: { followedBy: Follower[] } } } = useQuery(GET_FOLLOWERS, {
    variables: { userId: loggedInUser }, // Replace "someUserId" with the actual user ID
  });

  function handleToggleParticipant(userName: string) {
    setSelectedParticipantNames(prevSelectedNames => {
      if (prevSelectedNames.includes(userName)) {
        // User is already selected, remove them
        return prevSelectedNames.filter(name => name !== userName);
      } else {
        // User is not selected, add them
        return [...prevSelectedNames, userName];
      }
    });
    console.log(selectedParticipantNames.length + 1);
  }

  function handleClose() {
    onClose();
  }

  function queryUser(event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log('query a user that matches the search criteria');
  }

async function handleSubmitChat() {
  if (selectedParticipantNames.length < 1) {
    alert("Please select at least one participant to create a chat.");
    return;
  }

  const conversationUsers: { _id: string }[] = [];
  const conversationName =
    selectedParticipantNames.length > 2
      ? groupName || "Group Chat"
      : selectedParticipantNames.join(", ");

  for (const userName of selectedParticipantNames) {
    try {
      // Assuming QUERY_USER_BY_USERNAME is a function that returns a Promise
      const { data } = await fetchUserByUsername({ variables: { username: userName } });
      const userId = data?.user?._id;
      if (userId) {
        conversationUsers.push({ _id: userId });
      } else {
        alert(`User ${userName} not found.`);
        return;
      }
    } catch (error) {
      console.error(`Error fetching user ${userName}:`, error);
      alert(`Error fetching user ${userName}.`);
      return;
    }
  }

  try {
    await createConversation({
      variables: {
        input: {
          conversationName: conversationName,
          conversationUsers: conversationUsers,
        },
      },
    });
    onSubmit();
  } catch (error) {
    console.error("Error creating conversation:", error);
    alert("Failed to create conversation. Please try again.");
  }
}
  return (
     <div className="msg-creation-container">
      <div className="msg-creation-header">
        <button onClick={handleClose}>{"<"}</button>
        <h1>New Chat</h1>
        {/* change this h1 to your dropdown */}
      </div>
      {selectedParticipantNames.length > 2 && 
      <div className="gc-creating-container">
        {/* add jsx element for change group photo option */}
        <div>
          <input 
            type="text" 
            placeholder="Group name" 
            onChange={(e) => setGroupName(e.target.value)} 
          />
          <button>✏️</button>
          {/* this button shouldn’t actually do anything, the entered group name should 
          be saved when create chat is pressed */}
        </div>
      </div>
      }

      <div className="add-user-list-wrapper">
        <p className="add-user-header">Add Participants</p> 
        <form className="user-search-bar" onSubmit={queryUser}>
          <button>🔍</button>
          <input type="text" placeholder="Search for a user" />
        </form>
        <div className="add-user-list-scroll">
        {followersData?.user?.followedBy?.map((user, index) => (
                <div className="mutual-user-row" key={index}>
                  <img src={user.userAvi} />
                  <p key={index} className="msg-create-user-card">{user.userName}</p>
                  <button onClick={() => handleToggleParticipant(user.userName)}>
                    {selectedParticipantNames.includes(user.userName) ? '☑️' : '✅'}
                  </button>
                </div>
                //will have to query every user if we want to display their profile photos
              ))}
        </div>
      </div>  
      <button onClick={handleSubmitChat} className="chat-create-btn">Create Chat</button>
    </div>
  )
}
