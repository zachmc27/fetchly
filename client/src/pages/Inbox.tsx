// renders a feed component, into which you pass back an ARRAY of message objects 
// (will have to generate this array here with the proper API call), where they will be looped through and styled as shown on the messages wireframe.
// clicking on an option will dynamically route the user to the corresponding messages page

import Feed from "../components/Reusables/Feed"
import { mockMessageData } from "../mockdata/feed-data"

export default function Inbox() {


  return (
    <div className="inbox-page-container">
      <Feed 
       initialFeedArray={mockMessageData}
       itemStyle="inbox-card"
       containerStyle="inbox-feed-container"/>
  
    </div>
  )
}
