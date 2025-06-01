import Feed from "../Reusables/Feed";

type Meetup = {
  id: number;
  postImage?: string;
  postUser: string;
  postTitle: string;
  postLocation: string;
  postRSVPCount: number;
  postDate: string;
  meetupTime: string;
  itemType: string;

};

interface MeetupDetailsProps {
  userMeetups: Meetup[];
  userRSVP: Meetup[]; // type this as needed
}

export default function MeetupDetails({ userMeetups, userRSVP }: MeetupDetailsProps) {

    return(
        <div className="prof-meet-ctn">
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