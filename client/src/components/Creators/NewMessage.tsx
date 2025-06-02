//form for creating a new dm/group dm

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { CREATE_CONVERSATION } from "../../utils/mutations";
import { GET_FOLLOWERS } from "../../utils/queries";

const loggedInUser = localStorage.getItem("userId");
console.log("Logged in user ID:", loggedInUser);

interface NewMessageProps {
  onSubmit: () => void;
  onClose: () => void
}

interface Follower {
  userAvi: string;
  username: string;
  id: string;
}

interface Follower {
  userAvi: string;
  username: string;
  id: string;
}

export default function NewMessage({ onSubmit, onClose }: NewMessageProps) {
  const [selectedParticipantNames, setSelectedParticipantNames] = useState<string[]>([]);
  const [createConversation] = useMutation(CREATE_CONVERSATION);
  const [groupName, setGroupName] = useState<string>("");

  const { data: followersData, loading, error } = useQuery(GET_FOLLOWERS, {
    variables: { userId: loggedInUser },
  });

  if (loading) {
    return <p>Loading followers...</p>;
  }

  if (error) {
    console.error("Error fetching followers:", error);
    return <p>Failed to load followers. Please try again later.</p>;
  }

  interface FollowedProfile {
    refId?: {
      username?: string;
      _id?: string;
    };
  }

  const followers: Follower[] = followersData?.user?.followedBy?.map((followedProfile: FollowedProfile) => ({
    userAvi: "",
    username: followedProfile.refId?.username || "Unknown",
    id: followedProfile.refId?._id || "Unknown ID",
  })) || [];

  function handleToggleParticipant(id: string) {
    setSelectedParticipantNames((prevSelectedIds) => {
      const updatedIds = prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((participantId) => participantId !== id)
        : [...prevSelectedIds, id];
      console.log("Selected User IDs:", updatedIds);
      return updatedIds;
    });
  }

  async function handleSubmitChat() {
    if (selectedParticipantNames.length < 1) {
      alert("Please select at least one participant to create a chat.");
      return;
    }

    if (selectedParticipantNames.length > 2 && !groupName.trim()) {
      alert("Please provide a group name.");
      return;
    }

    const conversationUsers = selectedParticipantNames.map((id) => ({ _id: id }));
    const conversationName =
      selectedParticipantNames.length > 2
        ? groupName || "Group Chat"
        : followers
            .filter((follower) => selectedParticipantNames.includes(follower.id))
            .map((follower) => follower.username)
            .join(", ");

    if (loggedInUser) {
      conversationUsers.push({ _id: loggedInUser });
    } else {
      console.error("Logged in user ID is null.");
      alert("Failed to retrieve logged-in user information. Please try again.");
      return;
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error creating conversation:", error);
        alert(error.message || "Failed to create conversation. Please try again.");
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="msg-creation-container">
   
      {selectedParticipantNames.length > 2 && (
        <div className="gc-creating-container">
          <input
            type="text"
            placeholder="Group name"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
      )}
      <div className="add-user-list-wrapper">
        <p className="add-user-header">Add Participants</p>
        <div className="add-user-list-scroll">
          {followers.map((user) => (
            <div className="mutual-user-row" key={user.id}>
              <img src={user.userAvi} alt={`${user.username}'s avatar`} />
              <p className="msg-create-user-card">{user.username}</p>
              <button onClick={() => handleToggleParticipant(user.id)}>
                {selectedParticipantNames.includes(user.id) ? "☑️" : "✅"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleSubmitChat} className="chat-create-btn">
        Create Chat
      </button>
    </div>
  );
}
