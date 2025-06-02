

export default function Goinglist({ rsvpList }: { rsvpList: string[]} ) {
  return (
    <ul className="going-list-container">
   {rsvpList.map((_user, index) => (
    <li key={index} className="going-user-card">
        <img src=""/*{user.userAvi}*/ alt="user profile picture" />
        <p>{/*{user.username}*/}name</p>
    </li>
   ))}
   </ul>
  )
}
