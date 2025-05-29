import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ADOPTION } from "../../utils/queries";
import { ADOPT_PET } from "../../utils/mutations";

interface AdoptionFocusProps {
  adoptionId: string;
  onClose: () => void;
}

const userId = localStorage.getItem('user_Id');

const AdoptionFocus: React.FC<AdoptionFocusProps> = ({ adoptionId, onClose }) => {

  const { data, loading, error } = useQuery(QUERY_ADOPTION, {
    variables: { adoptionId },
  });

  const [adoptPetMutation] = useMutation(ADOPT_PET);

  const adoptPet = async (adoptionId: string, userId: string) => {
    try {
      await adoptPetMutation({
        variables: {
          adoptionId,
          userId
        },
      });
    } catch (error) {
    console.error("Error adopting pet:", error);    
    }
  };

  const adoption = data.adoption;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading adoption details</p>;


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <div className="adoption-focus-main-picture">
          <img className="adoption-focus-photo" src={adoption.pet.profilePhoto.url} alt="Pet profile photo"></img>
        </div>        
        <div className="adoption-focus-header">
          <h2>{adoption.pet.name}</h2>
          <ul>
            <li>{adoption.location?.address}, {adoption.location?.zip}, {adoption.location?.city}, {adoption.location?.state}, {adoption.location?.country}</li>
            <li>{adoption.pet.age}</li>
            <li>{adoption.pet.gender}</li>
          </ul>
        </div>
        <div className="adoption-focus-organization">
          <ul>
            <li><img src={adoption.poster.avatar.url} alt="avatar for poster"></img></li>
            <li>{adoption.poster.orgName}</li>
            <li>{adoption.poster.phone}</li>
            <li>{adoption.poster.email}</li>
          </ul>
        </div>
        <div className="adoption-focus-details">
          <p>{adoption.description}</p>
          <ul>
            <li>Breed: {adoption.pet.type.breed}</li>
            <li>Neutered/Spade: {adoption.pet.neuteredOrSpayed}</li>
            <li>Good with Pets: {adoption.goodWithPets}</li>
            <li>Vaccinated: {adoption.pet.vaccination}</li>
          </ul>
        </div>
        <div className="adoption-focus-media">
          <img src={adoption.media.url} alt="Additional media"></img>
        </div>
        <button onClick={() => adoptPet(adoptionId, userId!)} disabled={!userId} >Adopt this Pet</button>
        {/* Render more details here */}
      </div>
    </div>
  );
};

export default AdoptionFocus;