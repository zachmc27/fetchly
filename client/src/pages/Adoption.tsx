import { useState } from "react";
import Feed from "../components/Reusables/Feed";
import AdoptionFocus from "../components/Focus/AdoptionFocus";
import { QUERY_ADOPTIONS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import SearchBar from "../components/Reusables/SearchBar"
import "../ZachTemp.css"

export default function Adoption() {

    // Allow opening of AdoptionFocus
    const [selectedAdoptionId, setSelectedAdoptionId] = useState<string | null>(null);

    const { loading, error, data } = useQuery(QUERY_ADOPTIONS);
    const [filteredAdoptions, setFilteredAdoptions] = useState<any[] | null>(null);

    function handleAdoptionClick(id: string) {
      setSelectedAdoptionId(id);
    }

    const adoptionPosts = data?.adoptions;
    console.log('Adoption posts:', adoptionPosts);

    function filterByAll() {
      setFilteredAdoptions(null);
    }
  
    function filterByDogs() {
      if(!data?.adoptions) return;
      const dogs = data.adoptions.filter(
        (adoption: any) => adoption.pet?.type.type?.toLowerCase() === "dog"
      );
      console.log("Filtered dogs:", dogs);
      setFilteredAdoptions(dogs);
    }
  
    function filterByCats() {
      if(!data?.adoptions) return;
      const cat = data.adoptions.filter(
        (adoption: any) => adoption.pet?.type.type?.toLowerCase() === "cat"
      );
      setFilteredAdoptions(cat);
    }
  
    function filterBySearch(searchTerm: string) {
      if (!data?.adoptions) return;
      const search = searchTerm.toLowerCase();

      const results = data.adoptions.filter((adoption: any) => {
        const petName = adoption.pet?.name?.toLowerCase() || "";
        const breed = adoption.pet?.type?.breed?.toLowerCase() || "";
        const city = adoption.location?.city?.toLowerCase() || "";
        const description = adoption.description?.toLowerCase() || "";

        return (
          petName.includes(search) ||
          breed.includes(search) ||
          city.includes(search) ||
          description.includes(search)
        );
      });
      setFilteredAdoptions(results);
    }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="adoption-page-container">
      <SearchBar send={filterBySearch} />
      <div className="filter-buttons-container">
        <button onClick={filterByAll} className="filter-button">All</button>
        <button onClick={filterByDogs} className="filter-button">Dogs</button>
        <button onClick={filterByCats} className="filter-button">Cats</button>
      </div>

      <Feed 
        initialFeedArray={filteredAdoptions || data?.adoptions} 
        itemStyle="adoption-card" 
        containerStyle="adoption-feed-container"
        onItemClick={handleAdoptionClick}
      />
      {(filteredAdoptions?.length === 0) && (
        <p className="no-results">No adoptions found for that filter.</p>
      )}
      {selectedAdoptionId && (
        <AdoptionFocus 
          adoptionId={selectedAdoptionId} 
          onClose={() => setSelectedAdoptionId(null)} 
        />
      )}
    </div>
  )
}
