//takes in props for the user/org details (image, name,  user name, bio, followers, following, location (if applicable))
//use feed-posts component to render posts below details
//use bubble button components for buttons like add pet button and edit profile button
import { useEffect, useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ORG } from '../../utils/queries';
import { UPDATE_USER, UPDATE_ORG } from '../../utils/mutations';
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

type Location = {
     address: string;
     zip: string;
     city: string;
     state: string;
     country: string;
}


type User = {
  _id: string;
  username?: string;
  fullName?: string;
  about?: string;
  avatar?: string;
  location?: Location;
};

type Org = {
  _id: string;
  orgName?: string;
  about?: string;
  avatar?: string;
  location?: Location;

};



export default function AccountDetails({ onClose }: { onClose: () => void }) {
  function handleClose() {
    localStorage.setItem("isEditOpen", "false");
    if (onClose) onClose();
  }

  /************ QUERY USER***********/
const accountType = localStorage.getItem("accountType");
const userId = localStorage.getItem("userId");
//const orgId = localStorage.getItem("userId");

const { data: userData } = useQuery(QUERY_USER, {
  variables: { userId },
  skip: accountType === "org",
});
const { data: orgData} = useQuery(QUERY_ORG, {
  variables: { orgId: userId },
  skip: accountType !== "org",
});

  const [user, setUser] = useState<User | Org | null>(null);
    
  useEffect(() => {
    if (accountType === "org" && orgData && orgData.org) {
      setUser(orgData.org);
    } else if (userData && userData.user) {
      setUser(userData.user);
    }
  }, [accountType, userData, orgData]);


  /*********** MUTATE USER ***********/
  const[updatedUsername, setUpdatedUsername] = useState<string>("");
  const[media, setMedia] = useState<UploadedMedia>();
  const[updatedAbout, setUpdatedAbout] = useState<string>("");
  const[updatedName, setUpdatedName] = useState<string>("");
  const [updatedAddress, setUpdatedAddress] = useState<string>("");
  const [updatedZip, setUpdatedZip] = useState<string>("");
  const [updatedCity, setUpdatedCity] = useState<string>("");
  const [updatedState, setUpdatedState] = useState<string>("");
  const [updatedCountry, setUpdatedCountry] = useState<string>("");


  const handleMediaUpload = (media: UploadedMedia) => {
    setMedia(media);
  };

  const [updateUser] = useMutation(UPDATE_USER);
  const [updateOrg] = useMutation(UPDATE_ORG);


  const handleUpdate = async () => {
    if (!user) return;
    console.log(userId);
    try {
      // Make location optional in input type
      const input: { username?: string; avatar?: string; about?: string; fullName?: string; location?: {address?: string, zip?: string, city?: string, state?: string,  country?: string} } = {};
      if (updatedUsername) input.username = updatedUsername;
      if (media?.id) input.avatar = media.id;
      if (updatedAbout) input.about = updatedAbout;
      if (updatedName) input.fullName = updatedName;
      // Only add location if any field is present
      if (updatedAddress || updatedCity || updatedZip || updatedState || updatedCountry) {
        input.location = {};
        if (updatedAddress) input.location.address = updatedAddress;
        if (updatedCity) input.location.city = updatedCity;
        if (updatedZip) input.location.zip = updatedZip;
        if (updatedState) input.location.state = updatedState;
        if (updatedCountry) input.location.country = updatedCountry;
      }

      let data;
      if (accountType === "org") {
        const org = user as Org;
        data = await updateOrg({
          variables: {
            orgId: user._id,
            input: {
              orgName: updatedName || org.orgName,
              avatar: media?.id || org.avatar,
              about: updatedAbout || org.about,
              // Only include location if any field is present
              ...(updatedAddress || updatedCity || updatedZip || updatedState || updatedCountry
                ? { location: {
                    address: updatedAddress || org.location?.address,
                    city: updatedCity || org.location?.city,
                    zip: updatedZip || org.location?.zip,
                    state: updatedState || org.location?.state,
                    country: updatedCountry || org.location?.country,
                  }}
                : {})
            },
          },
        });
      } else {
        const u = user as User;
        data = await updateUser({
          variables: {
            userId: user._id,
            input: {
              username: updatedUsername || u.username,
              avatar: media?.id || u.avatar,
              about: updatedAbout || u.about,
              fullName: updatedName || u.fullName,
              // Only include location if any field is present
              ...(updatedAddress || updatedCity || updatedZip || updatedState || updatedCountry
                ? { location: {
                    address: updatedAddress || u.location?.address,
                    city: updatedCity || u.location?.city,
                    zip: updatedZip || u.location?.zip,
                    state: updatedState || u.location?.state,
                    country: updatedCountry || u.location?.country,
                  }}
                : {})
            },
          },
        });
      }

    console.log("Profile updated:", data);
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
        </div>
      </div>

      {accountType !== "org" && (
        <div className="prof-detail-form-section">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            placeholder={accountType === "org" ? "" : (user as User)?.username || "Username"}
            onChange={e => setUpdatedUsername(e.target.value)} />
        </div>
      )}

      <div className="prof-detail-form-section">
        <label htmlFor="fullName">Name</label>
        <input 
        type="text" 
        id="fullName" 
        placeholder={accountType === "org" ? (user as Org)?.orgName || "Org Name" : (user as User)?.fullName || "Name"}
        onChange={e => setUpdatedName(e.target.value)} />
      </div>

      <div className="prof-detail-form-section">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          placeholder={user?.location?.address || "Address"}
          value={updatedAddress}
          onChange={e => setUpdatedAddress(e.target.value)}
        />
      </div>
      <div className="prof-detail-form-section">
        <label htmlFor="zip">Zip</label>
        <input
          type="text"
          id="zip"
          placeholder={user?.location?.zip || "Zip"}
          value={updatedZip}
          onChange={e => setUpdatedZip(e.target.value)}
        />
      </div>
      <div className="prof-detail-form-section">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          placeholder={user?.location?.city || "City"}
          value={updatedCity}
          onChange={e => setUpdatedCity(e.target.value)}
        />
      </div>
      <div className="prof-detail-form-section">
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          placeholder={user?.location?.state || "State"}
          value={updatedState}
          onChange={e => setUpdatedState(e.target.value)}
        />
      </div>
      <div className="prof-detail-form-section">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          placeholder={user?.location?.country || "Country"}
          value={updatedCountry}
          onChange={e => setUpdatedCountry(e.target.value)}
        />
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


