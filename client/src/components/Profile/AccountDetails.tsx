//takes in props for the user/org details (image, name,  user name, bio, followers, following, location (if applicable))
//use feed-posts component to render posts below details
//use bubble button components for buttons like add pet button and edit profile button
export default function AccountDetails() {

  return (
    <div className="container">
      <div className="header">
        <button className="back-button">&lt;</button>
        <h2>Edit Profile</h2>
      </div>

      <div className="profile-picture-container">
        <div className="profile-picture-placeholder">
          {/* You could use an actual image here, or an icon */}
          <span className="icon">&#128444;</span> {/* Camera/image icon */}
        </div>
      </div>

      <div className="form-section">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="username" />
      </div>

      <div className="form-section">
        <label htmlFor="fullName">Name</label>
        <input type="text" id="fullName" placeholder="Full Name" />
      </div>

      <div className="form-section">
        <label htmlFor="bio">Bio</label>
        <textarea id="bio" placeholder="Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations."></textarea>
      </div>

      <button className="save-button">Save Profile</button>
    </div>
  );
};


