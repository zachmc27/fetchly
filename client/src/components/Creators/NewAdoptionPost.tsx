import React, { useState, useEffect } from "react";
import MediaUpload from "../Reusables/MediaUpload";
import NewPet from "./NewPet";
import WindowModal from "../Reusables/WindowModal"; // assuming this exists
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { CREATE_ADOPTION } from "../../utils/mutations";
import { QUERY_ORG } from "../../utils/queries";
import "../../MishaTemp.css"

interface NewAdoptionPostProps {
  onSubmit: (data: {
    pet?: string;
    poster: string | null;
    goodWithPets?: string;
    description?: string;
    location?: {
      address: string;
      zip: string;
      city: string;
      state: string;
      country: string;
    },
    media?: string[];
  }) => void;
}

type UploadedMedia = {
  id: string;
  filename: string;
  contentType: string;
  length: number;
  uploadDate: string;
  gridFsId: string;
  tags: string[];
  url: string;
};



const NewAdoptionPost = ({ onSubmit }: NewAdoptionPostProps) => {

  const userId = localStorage.getItem("userId");
  const accountType = localStorage.getItem("accountType");
  const userType = accountType === "org" ? "Org" : "User";

  const [createAdoptionPost] = useMutation(CREATE_ADOPTION);
  const [showError, setShowError] = useState(userType !== "Org");

  const { data: orgData } = useQuery(QUERY_ORG, {
    variables: { orgId: userId },
    skip: userType !== "Org",
  });

  const [pet, setPet] = useState<string>("");
  const [goodWithPets, setGoodWithPets] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [media, setMedia] = useState<string[]>([""]);
  const [showNewPet, setShowNewPet] = useState(false);

  const [getPets, { data: petData }] = useLazyQuery(QUERY_ORG);
  const [petOptions, setPetOptions] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (userType === "Org") {
      getPets({ variables: { orgId: userId } });
    }
  }, [getPets]);

  useEffect(() => {
    if (petData?.org?.pets) {
      const names = petData.org.pets.map((pet: { _id: string; name: string }) => ({
        id: pet._id,
        name: pet.name,
      }));
      setPetOptions(names);
    }
  }, [petData]);

  // Closes the modal
  const closeModal = () => {
    setShowNewPet(false);
  };

  const handleSubmitPet = () => {
    getPets({ variables: { orgId: userId } });
    setShowNewPet(false);
  };

  const handleMediaUpload = (media: UploadedMedia) => {
    setMedia([media.id]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userType !== "Org") {
      console.error("Only organizations can post.");
      return;
    }

    const location = orgData.org.location;

    const adoptionInput = {
      pet,
      poster: userId,
      goodWithPets,
      description,
      location: {
        address: location?.address || "",
        zip: location?.zip || "",
        city: location?.city || "",
        state: location?.state || "",
        country: location?.country || "",
      },
      media: media ?? [],
    };

    try {
      await createAdoptionPost({ variables: { input: adoptionInput } });
      onSubmit(adoptionInput);

      setPet("");
      setGoodWithPets("");
      setDescription("");
      setMedia([]);
    } catch (error) {
      console.error("Error adding adoption:", error);
    }
  };

  if (showError) {
    return (
      <div className="form-errors">
        <p>Only organizations can post adoptions.</p>
        <button onClick={() => setShowError(false)}>Dismiss</button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="adoption-post-form">

        <div className="adoption-pet-button">
          <label>Which pet is up for adoption?</label>
          <select value={pet} onChange={(e) => setPet(e.target.value)}>
            <option value="">Select Pet</option>
            {petOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowNewPet(true)}
            className="new-pet-toggle"
          >
            Add New Pet
          </button>
        </div>

        <div>
          <label>Are they good with other Pets?</label>
          <input
            type="text"
            value={goodWithPets}
            onChange={(e) => setGoodWithPets(e.target.value)}
            placeholder="e.g., Yes they love other pets"
          />
        </div>

        <div>
          <label>Tell us about them.</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about this pet."
          />
        </div>

        <MediaUpload onUpload={handleMediaUpload} />

        <button type="submit">Post for Adoption</button>
      </form>

      {/* NewPet Modal */}
      {showNewPet && (
        <WindowModal cancel={closeModal} confirm={() => {}}>
          <NewPet onSubmit={handleSubmitPet} onCancel={closeModal} />
        </WindowModal>
      )}
    </>
  );
};

export default NewAdoptionPost;