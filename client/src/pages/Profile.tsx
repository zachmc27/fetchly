// renders acccount details component with the users information
// renders feed component with users posts
// "https://www.flaticon.com/free-icons/ui" Ui icons created by Fantasyou - Flaticon
import "../SammiReusables.css";

import { useEffect, useState } from "react";
import { QUERY_USER, QUERY_ORG } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_PET } from '../utils/mutations';
import { useNavigate } from "react-router-dom";

import AccountDetails from "../components/Profile/AccountDetails";
import NewPet from "../components/Creators/NewPet";
import WindowModal from "../components/Reusables/WindowModal";
import Feed from "../components/Reusables/Feed";
import ButtonBubble from "../components/Reusables/Button";
import MeetupDetails from "../components/Profile/MeetupDetails";
import ProfileDetails from '../../src/components/Reusables/ProfileDetails';
import { UserType } from "../types/UserType";

import UserPlaceHolder from "../images/person_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import AddIcon from "../images/add.png";
import EditIcon from "../images/edit.png";
import CalenderIcon from "../images/calendar_month_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import LogoutIcon from "../images/logout.png";


type Pet = {
  _id: string;
  name: string;
  profilePhoto: { url: string };
};


interface NewPetProps {
    name: string;
    petType: "" | "Dog" | "Cat";
    breed: string;
    gender: "" | "Male" | "Female" | "Unsure";
    size: "" | "Small" | "Medium" | "Large";
    allergies?: string;
    vaccines?: string;
    pet?: string
    about: string;
}



export default function Profile() {

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const openProfile = () => {
    console.log("Selected Pet: " + selectedPet?._id);
    setShowProfileModal(true);
  };

  const closeProfileModal = () => setShowProfileModal(false);

  /************* EDITING PROFILE *****************/
  const [isEditOpen, setIsEditOpen] = useState(false)
  useEffect(() => {
    const storedIsEditOpen = localStorage.getItem("isEditOpen");
    if (storedIsEditOpen === "true") {
      setIsEditOpen(true);
    }
    return () => {
      localStorage.removeItem("activeConversationId"); // Clear activeConversationId from localStorage
      localStorage.removeItem("isInfoOpen"); // Clear isInfoOpen from localStorage
    };
  }, []);


  function handleInfoRender() {
    const newIsEditOpen = !isEditOpen;
      setIsEditOpen(newIsEditOpen)
      localStorage.setItem("isEditOpen", newIsEditOpen.toString());
  }

  /************* OPEN USER MEETUPS *****************/
  const [isMeetupsOpen, setIsMeetupsOpen] = useState(false);
  
  function handleMeetupRender() {
    setIsMeetupsOpen(true);
  }

  /************* ADDING PET *****************/
  const [showNewPet, setShowNewPet] = useState(false);
  const [addPet] = useMutation(ADD_PET);

  function handleNewPetRender() {
    setShowNewPet(true);
  }

  const closeModal = () => {
    setShowNewPet(false);
  };

  const handleSubmitPet = async (newPetData: NewPetProps) => {
  try {
    await addPet({
      variables: {
        userId, 
        petInput: newPetData,
      },
      refetchQueries: [{ query: QUERY_USER, variables: { userId } }],
    });
    setShowNewPet(false);
    console.log(newPetData);
  } catch (err) {
    console.error("Failed to add pet:", err);
  }
};


  /************* SHOWING CORRECT USER *****************/
  const userId = localStorage.getItem("userId");
  const orgId = localStorage.getItem("userId");
  const accountType = localStorage.getItem("accountType");

  console.log(userId + " and " + accountType);

  const {
    data: userData,
  } = useQuery(QUERY_USER, { variables: { userId }, skip: accountType === "org" });

  const {
    data: orgData,
  } = useQuery(QUERY_ORG, { variables: { orgId }, skip: accountType !== "org" });

  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    if (accountType === "org" && orgData && orgData.org) {
      setUser(orgData.org);
    } else if (accountType !== "org" && userData && userData.user) {
      setUser(userData.user);
    }
  }, [accountType, userData, orgData]);

  
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("id_token");
    navigate("/login");
  }

  console.log(user?.posts);

// Loop through all posts and log their itemType
  user?.posts.forEach(post => {
  console.log(post.itemType);
  });


  /************* RENDER PAGE *****************/
   if (isEditOpen) {
      return (
        <AccountDetails onClose={() => {
          setIsEditOpen(false);
          localStorage.setItem("isEditOpen", "false");
          window.location.reload();
        }} />
      )
    }

    if (showNewPet) {
      return (
        <WindowModal cancel={closeModal} confirm={() => {}}>
          <NewPet onSubmit={handleSubmitPet} onCancel={closeModal} />
        </WindowModal>
      )
    }

    if (isMeetupsOpen && accountType !== "org") {
      return (
        <MeetupDetails userRSVP={userData.user.meetUps}/>
      )
    }

    if (!user) {
      return <div>Loading...</div>;
    }


  return (
    <div>
    <div className="profile-background">
      <div className="profile-ctn">
        <div className="profile-item-ctn">
          <img src={user.avatar?.url || UserPlaceHolder} className="profile-user-img" />
          <div className="profile-user-title">
            <span className="profile-lg-fnt">{user.fullName || user.orgName || "Name"}</span>
            <span className="profile-md-fnt">{user.username || ""}</span>
          </div>
          <div className="profile-btn-ctn">
            <ButtonBubble imageSrc={CalenderIcon} onClick={handleMeetupRender} className="button-bubble-small"/>
            <ButtonBubble imageSrc={EditIcon} onClick={handleInfoRender} className="button-bubble-small"/>
            <ButtonBubble imageSrc={LogoutIcon} onClick={handleLogout} className="button-bubble-small"/>
          </div>
           
        </div>
        <div className="profile-bio-ctn profile-sm-fnt">
          <span>{user.about}</span>
        </div>
        <div className="profile-item-ctn profile-sm-fnt">
          <span>{user.followedByCount || '0'} followers</span>
          <span>{user.followingCount || '0'} following</span>
        </div>
        <div className="profile-item-ctn profile-sm-fnt">
          <span>{user.location?.address || 'Add Your Location'}</span>
        </div>
        <div className="profile-item-ctn profile-md-fnt">
          {user.pets?.map((pet) => (
            <div className="profile-pet-ctn" key={pet._id}>
              <button
                className="profile-pet-btn"
                onClick={() => {
                  setSelectedPet(pet);
                  openProfile();
                }}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
              >
                <img className="profile-pet-img" src={pet.profilePhoto?.url} alt={`${pet.name} profile`} />
              </button>
              <span>{pet.name}</span>
            </div>

          ))}
          {showProfileModal && selectedPet && (
            <WindowModal cancel={closeProfileModal} confirm={() => {}}>
              <div onClick={(e) => e.stopPropagation()}>
                <button onClick={closeProfileModal} className="modal-close-btn">×</button>
                <ProfileDetails
                  profileUserId={selectedPet._id.toString()}
                  profileAccountType="Pet"
                />
              </div>
            </WindowModal>
          )}
          <ButtonBubble imageSrc={AddIcon} onClick={handleNewPetRender}/>
        </div>
      </div>
        <div className="profile-feed-bg">
          
        </div>
    </div>
    </div>
  )
}
