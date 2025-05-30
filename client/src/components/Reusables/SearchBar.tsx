// input text box for a user to enter a location (Austin, TX)
// in the placeholder, include an example of how the prompt should be formatted in order to get results
// pass back a function prop that can be executed when clicking the send button
// use bubble button component for send button
import { useState } from "react";

export default function SearchBar({ send }: { send: (searchTerm: string) => void }) {
  const [input, setInput] = useState("");

  function handleSearch() {
    send(input);
  }
  
  return (
    <div className="search-style">
      <button onClick={handleSearch} className="search-btn">🔍</button>  
      <input 
        placeholder="Search..." 
        className="search-bar"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
    </div>
  );
}
