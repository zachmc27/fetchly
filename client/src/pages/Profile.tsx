// renders acccount details component with the users information
// renders feed component with users posts
// "https://www.flaticon.com/free-icons/ui" Ui icons created by Fantasyou - Flaticon
import "../SammiReusables.css";

import { useEffect, useState } from "react";
import { QUERY_USER } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_PET } from '../utils/mutations';
import { useNavigate } from "react-router-dom";

import AccountDetails from "../components/Profile/AccountDetails";
import NewPet from "../components/Creators/NewPet";
import WindowModal from "../components/Reusables/WindowModal";
import Feed from "../components/Reusables/Feed";
import ButtonBubble from "../components/Reusables/Button";
import MeetupDetails from "../components/Profile/MeetupDetails";
import { mockMeetupData } from "../mockdata/feed-data";

import UserPlaceHolder from "../images/person_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import AddIcon from "../images/add.png";
import EditIcon from "../images/edit.png";
import CalenderIcon from "../images/calendar_month_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import LogoutIcon from "../images/logout.png";



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

// type OwnerRef = {
//   refId: string;
//   refModel: "User" | "Org";
// };

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

const UserPlaceHolderMedia: UploadedMedia = {
  id: "placeholder",
  filename: "person_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg",
  contentType: "image/svg+xml",
  length: 0,
  uploadDate: "",
  gridFsId: "",
  tags: [],
  url: UserPlaceHolder, // this is the imported image URL
};

const mockUser = {
  _id: 1,
  fullName: "Test User",
  username: "mytestuser",
  email: "testuser@email.com",
  avatar: UserPlaceHolderMedia,
  about: "This is real. This is me. I'm exactly where I'm supposed to be now - Camp Rock",
  location: "Location, ST",
  followers: 123,
  following: 123,
  pets: [
    { _id: 1, name: "Pet 1", avatar: UserPlaceHolder },
    { _id: 2, name: "Pet 2", avatar: UserPlaceHolder },
    { _id: 3, name: "Pet 3", avatar: UserPlaceHolder },
  ],
  posts: []
}


export default function Profile() {

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
  console.log(userId);
  const { data, error } = useQuery(QUERY_USER, {
    variables: {userId},
  });
  const rsvpMeetups = data?.user?.meetUps || [];
  console.log(data);

  const [user, setUser] = useState(mockUser);
  
  useEffect(() => {
    console.log("Query data:", data);
    if (data && data.user) {
      setUser(data.user);
      console.log(data.user);
    } 
  }, [data]);
  
  if (error){
    console.error("GraphQL error:", error);
  }

  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("id_token");
    navigate("/login");
  }


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

    if (isMeetupsOpen) {
      return (
        <MeetupDetails userMeetups={mockMeetupData} userRSVP={rsvpMeetups}/>
      )
    }


  return (
    <div>
    <div className="profile-background">
      <div className="profile-ctn">
        <div className="profile-item-ctn">
          <img src={user.avatar?.url || UserPlaceHolder} className="profile-user-img" />
          <div className="profile-user-title">
            <span className="profile-lg-fnt">{user.fullName || "First Last"}</span>
            <span className="profile-md-fnt">{user.username}</span>
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
          <span>{user.followers || '0'} followers</span>
          <span>{user.following || '0'} following</span>
        </div>
        <div className="profile-item-ctn profile-md-fnt">
          {user.pets.map((pet) => (
            <div className="profile-pet-ctn" key={pet._id}>
              <img src={pet.avatar} />
              <span>{pet.name}</span>
            </div>
          ))}
          <ButtonBubble imageSrc={AddIcon} onClick={handleNewPetRender}/>
        </div>
      </div>
        <div className="profile-feed-bg">
          <Feed 
          initialFeedArray={user.posts} 
          itemStyle="post-card"          
          containerStyle="profile-feed-container"
          />
        </div>
    </div>
    </div>
  )
}
