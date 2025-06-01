import { rsvpList } from "../../mockdata/mocktypes/PostDetails"

export default function Goinglist({ rsvpList }: { rsvpList: rsvpList[]} ) {
  return (
    <ul className="going-list-container">
   {rsvpList.map((user, index) => (
    <li key={index} className="going-user-card">
        <img src={user.userAvi} alt="user profile picture" />
        <p>{user.username}</p>
    </li>
   ))}
   </ul>
  )
}
