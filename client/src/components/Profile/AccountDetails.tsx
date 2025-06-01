//takes in props for the user/org details (image, name,  user name, bio, followers, following, location (if applicable))
//use feed-posts component to render posts below details
//use bubble button components for buttons like add pet button and edit profile button
import { useEffect, useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { UPDATE_USER } from '../../utils/mutations';
// import UserPlaceHolder from "../../images/person_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import MediaUpload from "../Reusables/MediaUpload";


type UploadedMedia = {
  id: string;
  filename: string;
  contentType: string;
  length: number;
  uploadDate: string;
  gridFsId: string;
  tags: string[];
  url: string;
};

type User = {
  _id: string;
  username: string;
  fullName: string;
  about?: string;
  avatar?: string;
  // Add other fields you use from userData.user
};

export default function AccountDetails({ onClose }: { onClose: () => void }) {
  function handleClose() {
    localStorage.setItem("isEditOpen", "false");
    if (onClose) onClose();
  }

  /************ QUERY USER***********/
  const userId = localStorage.getItem("userId");
  const { data: userData, error: queryError } = useQuery(QUERY_USER,{
   variables: { userId } 
  
  });

  const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
      if (userData && userData.user) {
        setUser(userData.user);
      }
    }, [userData]);

    if (queryError) {
      console.error("GraphQL error:", queryError);
    }

  /*********** MUTATE USER ***********/
  const[updatedUsername, setUpdatedUsername] = useState<string>("");
  const[media, setMedia] = useState<UploadedMedia>();
  const[updatedAbout, setUpdatedAbout] = useState<string>("");
  const[updatedName, setUpdatedName] = useState<string>("");

  const handleMediaUpload = (media: UploadedMedia) => {
    setMedia(media);
  };

  const [updateUser] = useMutation(UPDATE_USER);

  const handleUpdate = async () => {
    if (!user) return;

    console.log(userId);
  try {
    const input: any = {};
    if (updatedUsername) input.username = updatedUsername;
    if (media?.id) input.avatar = media.id;
    if (updatedAbout) input.about = updatedAbout;
    if (updatedName) input.fullName = updatedName;

    const { data } = await updateUser({
      variables: {
      userId: userId,
      input: {
        ...input,
      }
      }
    });
    
    console.log("User updated:", data);
    localStorage.setItem("isEditOpen", "false");
    if (onClose) onClose();
  } catch (err) {
    console.error("Update failed:", err);
  }
};


  return (
    <div className="prof-detail-container">
      <div className="prof-detail-header">
        <button className="prof-detail-back-btn" onClick={handleClose}>&lt;</button>
        <h2>Edit Profile</h2>
      </div>

      <div className="prof-detail-picture-container">
        <div className="profile-picture-placeholder">
          <MediaUpload onUpload={handleMediaUpload}/>
          {/* <span className="icon">&#128444;</span> Camera/image icon */}
        </div>
      </div>

      <div className="prof-detail-form-section">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder={user?.username || "Username"} onChange={e => setUpdatedUsername(e.target.value)} />
      </div>

      <div className="prof-detail-form-section">
        <label htmlFor="fullName">Name</label>
        <input type="text" id="fullName" placeholder={user?.fullName || "Full Name"} onChange={e => setUpdatedName(e.target.value)} />
      </div>

      <div className="prof-detail-form-section">
        <label htmlFor="bio">Bio</label>
        <textarea id="bio" placeholder={user?.about ||"Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations."} 
        onChange={e => setUpdatedAbout(e.target.value)}></textarea>
      </div>

      <button className="prof-detail-save-button" onClick={handleUpdate}>Save Profile</button>
    </div>
  );
}


