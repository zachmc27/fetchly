// takes in conversation object as prop to render the proper text conversation by conversation.id
// title text at the top that displays the name of the person the user is messaging 
// (rough logic: conversation.user that isnt logged in) OR if its a group chat then conversation.groupChatName
// render the conversation messages in text bubbles displayed on each side of the page
// input bar where a user can enter a message
// send bubble button that executes function to send a message (append it to the proper conversation object and re-render page)
// info bubble button that renders MsgInfoPage for proper conversation when pressed
export default function MessagesPage() {
  return (
    <div>MessagesPage</div>
  )
}
