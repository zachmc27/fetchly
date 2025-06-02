import React, { useState, useEffect } from "react";
import MediaUpload from "../Reusables/MediaUpload";
import { useMutation, useLazyQuery } from "@apollo/client";
import { ADD_PET } from "../../utils/mutations";
import { FILTER_QUERY_TYPE } from "../../utils/queries";
import "../../main.css"

interface NewPetProps {
  onSubmit: (data: {
    name: string;
    petType: "" | "Dog" | "Cat";
    breed: string;
    gender: "" | "Male" | "Female" | "Unsure";
    size: "" | "Small" | "Medium" | "Large";
    allergies?: string;
    vaccines?: string;
    pet?: string
    about: string;
  }) => void;
  onCancel: () => void;
}

type UploadedMedia = {
  id: string;
  filename: string;
  contentType: string;
  length: number;
  uploadDate: string;
  gridFsId: string;
  tags: string[];
  url: string; // URL to access the media
};

const NewPet = ({ onSubmit, onCancel }: NewPetProps) => {

  const userId = localStorage.getItem('userId');
  const accountType = localStorage.getItem('accountType');
  const userType = accountType === "org" ? "Org" : "User";

  const [NewPet] = useMutation(ADD_PET, {
    refetchQueries: ["Pets"],
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Breed Type Filters
  // Define a type for breed objects returned from the query
  type BreedType = { _id: string; breed: string };  
  const [getBreeds, { data: breedData }] = useLazyQuery(FILTER_QUERY_TYPE);
  const [breedOptions, setBreedOptions] = useState<BreedType[]>([]);
  const [petTypeId, setPetTypeId] = useState<string>("");
  const handlePetTypeSelection = (selectedType: "Dog" | "Cat") => {
    setPetType(selectedType);
    getBreeds({ variables: { type: selectedType.toLowerCase() } });
  };

  useEffect(() => {
    if (breedData?.types) {
      setBreedOptions(breedData.types);
    }
  }, [breedData]);


  // Property UseStates
  const [about, setAbout] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [size, setSize] = useState<"" | "Small" | "Medium" | "Large">("");
  const [neutered, setNeutered] = useState<boolean | null>(null);
  const [gender, setGender] = useState<"" | "Male" | "Female" | "Unsure">("");
  const [name, setName] = useState("");
  const [petType, setPetType] = useState<"" | "Dog" | "Cat">("");
  const [profilePhoto, setProfilePhoto] = useState<UploadedMedia>();
  const [breed, setBreed] = useState("");
  const [vaccines, setVaccines] = useState("");

  // Get the media ID from the uploadmedia component
  const handleMediaUpload = (media: UploadedMedia) => {
    setProfilePhoto(media);
    setFormErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Make sure everything is filled in
    const errors: string[] = [];

    if (!name) errors.push("Name is required.");
    if (!petType) errors.push("Pet type is required.");
    if (!breed) errors.push("Breed is required.");
    if (!gender) errors.push("Gender is required.");
    if (!size) errors.push("Size is required.");
    if (!age) errors.push("Age is required.");
    if (!about) errors.push("About is required.");

    setFormErrors(errors);

    if (errors.length > 0) {
      return;
    }

    const ageNumber = parseInt(age, 10);
    if (isNaN(ageNumber)) {
      errors.push("Age must be a number.");
    }    

    // If everything is provided, get ready to call mutation

    const petInput = {
      about,
      age: ageNumber,
      size,
      neuteredOrSpayed: neutered,
      gender,
      name,
      owner: {
        refId: userId || "",
        refModel: userType || "",
      },
      type: petTypeId,
      profilePhoto: profilePhoto?.id,
      vaccination: vaccines,
    };

    try {
      await NewPet({ variables: { input: petInput } });
      onSubmit({
        name,
        petType,
        breed,
        gender,
        size,
        vaccines,
        about,
      });
      setName("");
      setPetType("");
      setBreed("");
      setGender("");
      setSize("");
      setVaccines("");
      setAbout("");
      setProfilePhoto(undefined);
      setNeutered(false);
      setAge("");

    } catch (error) {
      console.error("Error adding pet:", error);
      setFormErrors(["Something went wrong submitting the form."]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-pet-form">
      {formErrors.length > 0 && (
        <div className = "form-errors">
          <ul>
            {formErrors.map((err, i) => (
              <li key={i} style={{ color: "red" }}>
                {err}
              </li>
            ))}
          </ul>
        </div>
      )}
      <MediaUpload onUpload={handleMediaUpload} />
      <div>
        <label>What&apos;s Their Name?</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Write your furry pal's name"
        />
      </div>

      <div>
        <label>What kind of pet is it?</label>
        <div className="new-pet-petType-button">
          {["Dog", "Cat"].map((type) => (
            <button
              type="button"
              key={type}
              className={petType === type ? "active" : ""}
              onClick={() => handlePetTypeSelection(type as "Dog" | "Cat")}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="new-pet-breed-button">
        <label>What&apos;s their breed?</label>
        <select 
          value={petTypeId} 
          onChange={(e) => {
            const selected = breedOptions.find((b) => b._id === e.target.value);
            setPetTypeId(e.target.value);
            setBreed(selected?.breed || "");
          }}
        >
          <option value="">Select Breed</option>
          {breedOptions.map((option) => (
            <option key={option._id} value={option._id}>
              {option.breed}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Boy or Girl?</label>
        <div className="new-pet-gender-button">
          {["Male", "Female", "Unsure"].map((g) => (
            <button
              type="button"
              key={g}
              className={gender === g ? "active" : ""}
              onClick={() => setGender(g as "Male" | "Female" | "Unsure")}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label>What size?</label>
        <div className="new-pet-size-button">
          {["Small", "Medium", "Large"].map((s) => (
            <button
              type="button"
              key={s}
              className={size === s ? "active" : ""}
              onClick={() => setSize(s as "Small" | "Medium" | "Large")}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="new-pet-age-button">
        <label>What age is your furry friend?</label>
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="#"
        />
      </div>

      <div>
        <label>Is your pet neutered or spade?</label>
        <div className="new-pet-neutered-button">
          {["Yes", "No", "Unsure"].map((label) => {
            const value = label === "Yes" ? true : label === "No" ? false : null;
            return (
            <button
              type="button"
              key={label}
              className={neutered  === value ? "active" : ""}
              onClick={() => setNeutered(value)}
            >
              {label}
            </button>
            );
          })}
        </div>
      </div>

      <div>
        <label>What vaccinations do they have?</label>
        <input
          type="text"
          value={vaccines}
          onChange={(e) => setVaccines(e.target.value)}
          placeholder="Search"
        />
      </div>

      <div>
        <label>Tell us more about them</label>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Tell us more about the pet"
        />
      </div>
      <div className="form-buttons">
        <button type="button" onClick={onCancel} className="close-button">Cancel</button>
        <button type="submit" className="yes-button">Add new Pet</button>
      </div>  
    </form>
  );
};
export default NewPet;
