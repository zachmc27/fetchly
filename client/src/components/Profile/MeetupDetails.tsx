import Feed from "../Reusables/Feed";
import { FeedItem } from "../Reusables/Feed";

// type Meetup = {
//   id: number;
//   postImage?: string;
//   postUser: string;
//   postTitle: string;
//   postLocation: string;
//   postRSVPCount: number;
//   postDate: string;
//   meetupTime: string;
//   itemType: string;
// };
interface MeetupDetailsProps {
//   userMeetups: FeedItem[];
  userRSVP: FeedItem[];
}
export default function MeetupDetails({ userRSVP }: MeetupDetailsProps) {
    return(
        <div className="prof-meet-ctn">
            <div className="prof-meet-sec-ctn">
                <span className="profile-lg-fnt prof-meet-title ">Hosted Meetups</span>
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
