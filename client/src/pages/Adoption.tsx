import { useState } from "react";
import Feed from "../components/Reusables/Feed";

import { QUERY_ADOPTIONS } from "../utils/queries";
import { useQuery } from "@apollo/client";

import SearchBar from "../components/Reusables/SearchBar"
import "../ZachTemp.css"
import { useAdoptionPost } from "../contexts/AdoptionPostContext";
import sadCatPic from "../images/Sad cat.jpeg"

interface Adoption {
  id: string;
  pet: {
    name: string;
    type: {
      type: string;
      breed?: string;
    };
  };
  location?: {
    city?: string;
  };
  description?: string;
}

export default function Adoption() {


    const { isAdoptionPostOpen, setIsAdoptionPostOpen, activeAdoptionPost, setActiveAdoptionPost } = useAdoptionPost();
    const { loading, error, data } = useQuery(QUERY_ADOPTIONS, { pollInterval: 10000 });

    const [filteredAdoptions, setFilteredAdoptions] = useState<Adoption[] | null>(null);

    const adoptionPosts = data?.adoptions;
    console.log('Adoption posts:', adoptionPosts);

    function filterByAll() {
      setFilteredAdoptions(null);
      localStorage.removeItem("activeAdoptionId");
      setIsAdoptionPostOpen(false);
      setActiveAdoptionPost(null)
    }
  
    function filterByDogs() {
      if(!data?.adoptions) return;
      const dogs = data.adoptions.filter(
        (adoption: Adoption) => adoption.pet?.type.type?.toLowerCase() === "dog"
      );
      console.log("Filtered dogs:", dogs);
      setFilteredAdoptions(dogs);
      localStorage.removeItem("activeAdoptionId");
      setIsAdoptionPostOpen(false);
      setActiveAdoptionPost(null)
    }
  
    function filterByCats() {
      if(!data?.adoptions) return;
      const cat = data.adoptions.filter(
        (adoption: Adoption) => adoption.pet?.type.type?.toLowerCase() === "cat"
      );
      setFilteredAdoptions(cat);
      localStorage.removeItem("activeAdoptionId");
      setIsAdoptionPostOpen(false);
      setActiveAdoptionPost(null)
    }
  
    function filterBySearch(searchTerm: string) {
      if (!data?.adoptions) return;
      const search = searchTerm.toLowerCase();

      const results = data.adoptions.filter((adoption: Adoption) => {
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
      localStorage.removeItem("activeAdoptionId");
      setIsAdoptionPostOpen(false);
      setActiveAdoptionPost(null)
    }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <div className="adoption-page-container">
      <SearchBar send={filterBySearch} />
      <div className="filter-buttons-container">
        <button onClick={filterByAll} className="filter-button">All</button>
        <button onClick={filterByDogs} className="filter-button">Dogs</button>
        <button onClick={filterByCats} className="filter-button">Cats</button>
      </div>

      {(filteredAdoptions?.length === 0) && (
        <div className="no-results-container">
          <p className="no-results">No adoptions found for that filter.</p>
          <div className="no-results-img">
            <img src={sadCatPic} alt=""/>
          </div>
        </div>
      )}
      
      <Feed 
        initialFeedArray={filteredAdoptions || data?.adoptions} 
        itemStyle="adoption-card" 
        containerStyle="adoption-feed-container"
      />
    </div>
    </>
  )
}
