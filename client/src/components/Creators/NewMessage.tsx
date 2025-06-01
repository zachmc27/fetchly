//form for creating a new dm/group dm

import { useState } from "react";
import { mockMutualFollowers } from "../../mockdata/post-data";



interface NewMessageProps {
  onSubmit: () => void;
}

export default function NewMessage({ onSubmit }: NewMessageProps) {

  const [selectedParticipantNames, setSelectedParticipantNames] = useState<string[]>([]);

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

  function queryUser(event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log('query a user that matches the search criteria');
  }

  function handleSubmitChat(){
    onSubmit();
}
  return (
     <div className="msg-creation-container">
      {selectedParticipantNames.length > 2 && 
      <div className="gc-creating-container">
        {/* add jsx element for change group photo option */}
        <div>
        <input type="text" placeholder="Group name"/>
        <button>✏️</button>
        {/* this button shouldnt actually do anything, the entered group name should 
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
        {mockMutualFollowers.map((user, index) => (
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
