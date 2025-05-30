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
      getFilteredAdoptions({ variables: {} });
    }
    
    function filterByDogs() {
      if(!data?.adoptions) return;
      const dogs = data.adoptions.filter(
        (adoption: any) => adoptionPosts.pet?.type.type?.toLowerCase() === "dog"
      );
    }
    
    function filterByCats() {
      getFilteredAdoptions({ variables: { type: "Cat" } });
    }
    function filterBySearch() {
      getFilteredAdoptions();
    }

  if (filteredLoading) return <p>Filtering...</p>;
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
      {(filteredData?.adoptions?.length === 0) && (
        <p className="no-results">No adoptions found for that filter.</p>
      )}
      <Feed 
        initialFeedArray={filteredData?.adoptions || data?.adoptions} 
        itemStyle="adoption-card" 
        containerStyle="adoption-feed-container"
        onItemClick={handleAdoptionClick}
      />
      {selectedAdoptionId && (
        <AdoptionFocus 
          adoptionId={selectedAdoptionId} 
          onClose={() => setSelectedAdoptionId(null)} 
        />
      )}
    </div>
  )
}
