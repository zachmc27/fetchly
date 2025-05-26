// renders acccount details component with the users information
// renders feed component with users posts
import { useEffect, useState } from "react";
import "../SammiReusables.css";
import Feed from "../components/Reusables/Feed";
import UserPlaceHolder from "../assets/react.svg";

const profileMockPosts = [
  {
    id: 1,
    userAvi: UserPlaceHolder,
    postUser: "mytestuser",
    postContent: "post 1 wowwwww",
    postLikeCount: 5,
    postCommentCount: 2,
    postDate: "11-23-01",
    itemType: "MockPostItem"
  },
  {
    id: 2,
    userAvi: UserPlaceHolder,
    postUser: "mytestuser",
    postContent: "post 2 wowwwww",
    postLikeCount: 4,
    postCommentCount: 6,
    postDate: "11-27-01",
    itemType: "MockPostItem"
  },
  
];

const mockUser = {
  _id: 1,
  fullName: "Test User",
  username: "mytestuser",
  email: "testuser@email.com",
  avatar: UserPlaceHolder,
  about: "This is real. This is me. I'm exactly where I'm supposed to be now - Camp Rock",
  location: "Location, ST",
  followers: 123,
  following: 123,
  pets: [
    { name: "Pet 1", avatar: UserPlaceHolder },
    { name: "Pet 2", avatar: UserPlaceHolder },
    { name: "Pet 3", avatar: UserPlaceHolder },
  ],
  posts: profileMockPosts
}



export default function Profile() {
  const [user, setUser] = useState(mockUser);

  useEffect(() => {
    // to change users with setUser based on who's saved locally
  }, []);

  console.log(user.posts);

  return (
    <div>
    <div className="profile-background">
      <div className="profile-ctn">
        <div className="profile-item-ctn">
          <img src={user.avatar} className="profile-user-img" />
          <div className="profile-user-title">
            <span className="profile-lg-fnt">{user.fullName}</span>
            <span className="profile-md-fnt">{user.username}</span>
          </div>
          
        </div>
        <div className="profile-bio-ctn profile-sm-fnt">
          <span>{user.about}</span>
        </div>
        <div className="profile-item-ctn profile-sm-fnt">
          <span>{user.followers} followers</span>
          <span>{user.following} following</span>
        </div>
        <div className="profile-item-ctn profile-md-fnt">
          {user.pets.map((pet, idx) => (
            <div className="profile-pet-ctn" key={idx}>
              <img src={pet.avatar} />
              <span>{pet.name}</span>
            </div>
          ))}
        </div>
      </div>
        <div className="profile-feed-bg">
          <Feed 
          feedArray={user.posts} 
          itemStyle="adoption-item"          
          containerStyle="meetup-feed-container"
          />
        </div>
    </div>
    
    </div>
  )
}
