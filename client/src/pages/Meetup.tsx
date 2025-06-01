// renders a search bar component that will allow user to search for meetup posts in the searched location
// Feed component that takes an array of meetup posts to render and the necessary css class to style the posts
// clicking on one of the posts in that list will render:
// post details for each post, and 2 buttons that that conditionally render the comments for the post or a Feed component that
// takes an array of users that are attending the event (Going list)

import "../ZachTemp.css"
import Feed from "../components/Reusables/Feed";
import { useQuery } from "@apollo/client";
import { QUERY_MEETUPS } from "../utils/queries";


export default function Meetup() {

  const { data, loading, error } = useQuery(QUERY_MEETUPS);


  const meetups = data?.meetUps
  ? [...data.meetUps].sort(
    (a,b) => Number(b.createdAt) - Number(a.createdAt)
  )
  : [];

  console.log("Sorted Meetups", meetups)

  if (loading) return <p>Loading meetups...</p>;
  if (error) return <p>Error loading meetups.</p>;


  return (
    <>
    <div className="meetup-page-container">
        
      <Feed 
      initialFeedArray={meetups} 
      itemStyle="meetup-card" 
      containerStyle="meetup-feed-container"/>
    </div>
    </>
  )
}
