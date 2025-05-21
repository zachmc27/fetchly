// renders a feed component, into which you pass back an ARRAY of message objects 
// (will have to generate this array here with the proper API call), where they will be looped through and styled as shown on the messages wireframe.
// clicking on an option will dynamically route the user to the corresponding messages page
import Actionmodal from "../components/Reusables/ActionModal"

export default function Inbox() {

  function cancel() {
    console.log('this will close the modal');
  }

  function confirm() {
    console.log('this will open the modal');
  }
  return (
    <div>Inbox
      <Actionmodal cancel={cancel} confirm={confirm}>
        <p>Stuff</p>
        </Actionmodal> 

    </div>
    
  )
}
