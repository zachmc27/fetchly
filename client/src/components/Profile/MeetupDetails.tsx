import Feed from "../Reusables/Feed";

type Meetup = {
  postImage?: string;
  postUser: string;
  postTitle: string;
  postLocation: string;
  postRSVPCount: number;
  postDate: string;
  meetupTime: string;
  _id: string; 
  title: string;
  poster: {
    refId: {
      _id: string;
      username: string;
    };
    refModel: string;
  }
  description: string;
  location: {
    address: string;
    zip: string;
    city: string;
    state: string;
    country: string;
  }
  date: string;
  time: string;
  numberOfAttendees: number;
  comments: string[];
  numberOfComments: number;
  media: [{
    url: string;
  }];
  itemType: string;
  attendees: string[];
};

interface MeetupDetailsProps {
  userMeetups: Meetup[];
  userRSVP: Meetup[]; 
  onClose: () => void;
}

export default function MeetupDetails({ userMeetups, userRSVP, onClose }: MeetupDetailsProps) {

  function handleClose() {
    localStorage.setItem("isMeetupsOpen", "false");
    if (onClose) onClose();
  }

    return(
        <div className="prof-meet-ctn">
          <div>
            <button className="prof-meetup-back-btn" onClick={handleClose}>&lt;</button>
          </div>
          
            <div className="prof-meet-sec-ctn">
              
                <span className="profile-lg-fnt prof-meet-title ">Hosted Meetups</span>
                {userMeetups && userMeetups.length > 0 ? (
                    <Feed 
                        initialFeedArray={userMeetups} 
                        itemStyle="meetup-card" 
                        containerStyle="meetup-feed-container"
                    />
                ) : (
                    <span className="prof-meet-warning">No hosted meetups found.</span>
                )}
            </div>
            
            <div className="prof-meet-sec-ctn">
                <span className="profile-lg-fnt prof-meet-title ">Registered Meetups</span>
                {userRSVP && userRSVP.length > 0 ? (
                    <Feed 
                        initialFeedArray={userRSVP} 
                        itemStyle="meetup-card" 
                        containerStyle="meetup-feed-container"
                    />
                ) : (
                    <span className="prof-meet-warning">No RSVPed meetups found.</span>
                )}
            </div>
            
        </div>
        
    )

}