// renders a search bar component that will allow user to search for adoption post in the searched location
// 3 button components that filter posts by species: All, Dogs, Cats
// 3 Feed components conditionally rendered by filtered posts and takes back array of filtered posts
// 1 Feed component conditionally rendered by what is Searched and sends back an array of the searched posts
import Feed from "../components/Reusables/Feed";
import { mockAdoptionData } from "../mockdata/feed-data";
import SearchBar from "../components/Reusables/SearchBar"
import "../ZachTemp.css"

export default function Adoption() {

  function filterBySearch() {
    console.log('This function will filter posts by the search.');
  }

  function filterByAll() {
    console.log('This function will show all posts');
  }

  function filterByDogs() {
    console.log('This function will filter posts by dogs');
  }

  function filterByCats() {
    console.log('This function will filter posts by cats');
  }

  return (
    <div className="adoption-page-container">
      <SearchBar send={filterBySearch} styling="search-style" />
      <div className="filter-buttons-container">
        <button onClick={filterByAll} className="filter-button">All</button>
        <button onClick={filterByDogs} className="filter-button">Dogs</button>
        <button onClick={filterByCats} className="filter-button">Cats</button>
      </div>
      <Feed feedArray={mockAdoptionData} itemStyle="adoption-item" containerStyle="adoption-feed-container"/>
    </div>
  )
}
