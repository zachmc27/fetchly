// input text box for a user to enter a location (Austin, TX)
// in the placeholder, include an example of how the prompt should be formatted in order to get results
// pass back a function prop that can be executed when clicking the send button
// use bubble button component for send button

export default function SearchBar({ send }: { send: (searchTerm: string) => void }) {
  return (
    <div className="search-style">
      <button onClick={send} className="search-btn">🔍</button>  
      <input placeholder="Search for a city..." className="search-bar"></input>
    </div>
  )
}
