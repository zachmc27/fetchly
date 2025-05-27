// renders a search bar component that will allow user to search for meetup posts in the searched location
// Feed component that takes an array of meetup posts to render and the necessary css class to style the posts
// clicking on one of the posts in that list will render:
// post details for each post, and 2 buttons that that conditionally render the comments for the post or a Feed component that
// takes an array of users that are attending the event (Going list)

import "../ZachTemp.css"
import SearchBar from "../components/Reusables/SearchBar";
import Feed from "../components/Reusables/Feed";
import { mockMeetupData } from "../mockdata/feed-data";

export default function Meetup() {

    function filterBySearch() {
    console.log('This function will filter posts by the search.');
  }

  return (
    <div className="meetup-page-container">
         <SearchBar send={filterBySearch} />
         <Feed 
          initialFeedArray={mockMeetupData} 
          itemStyle="meetup-card" 
          containerStyle="meetup-feed-container"/>
    </div>
  )
}
