//form for creating an adoption post
import React, { useState } from "react";
import ImageUpload from "../Reusables/ImageUpload";
import { useMutation } from "@apollo/client";
import { ADD_PET, CREATE_ADOPTION } from "../../utils/mutations";

interface NewAdoptionPostProps {
  onSubmit: (data: {
    name: string;
    petType: "" | "Dog" | "Cat";
    breed: string;
    gender: "" | "Male" | "Female" | "Unsure";
    size: "" | "Small" | "Medium" | "Large";
    allergies?: string;
    vaccines?: string;
    pet?: string
    description: string;
  }) => void;
}

    const userId = localStorage.getItem('user_Id');

const NewAdoptionPost = ({ onSubmit }: NewAdoptionPostProps) => {

  const [AdoptedPet] = useMutation(ADD_PET);
  const [createAdoptionPost] = useMutation(CREATE_ADOPTION);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [petType, setPetType] = useState<"" | "Dog" | "Cat">("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState<"" | "Male" | "Female" | "Unsure">("");
  const [size, setSize] = useState<"" | "Small" | "Medium" | "Large">("");
  const [allergies, setAllergies] = useState("");
  const [vaccines, setVaccines] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let petInput = {
      name,
      owner: {
        refId: userId || "",
        refModel: "User",
      },
      type: breed,
      gender,
      size,
      vaccination: vaccines,
      about: description,
    };

   let adoptedPetResponse = null;

    try {
      adoptedPetResponse = await AdoptedPet({ variables: { input: petInput } });


    } catch (error) {
      console.error("Error adding pet:", error);
    }

    const adoptionInput = {
      pet: adoptedPetResponse?.data?.addPet?._id || "",
      poster: userId,
    }

    try {
      await createAdoptionPost({ variables: { input: adoptionInput } })
      onSubmit({
        name,
        petType,
        breed,
        gender,
        size,
        allergies,
        vaccines,
        description,
      });

      setName("");
      setPetType("");
      setBreed("");
      setGender("");
      setSize("");
      setAllergies("");
      setVaccines("");
      setDescription("");

      window.location.reload();
    } catch (error) {
      console.error("Error adding adoption:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="adoption-post-form">
      <ImageUpload
        onImageSelect={(file) => {
          console.log("selected Image", file);
        }}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
      />
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
        <div className="adoption-petType-button">
          {["Dog", "Cat"].map((type) => (
            <button
              type="button"
              key={type}
              className={petType === type ? "active" : ""}
              onClick={() => setPetType(type as "Dog" | "Cat")}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label>What&apos;s their breed?</label>
        <input
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          placeholder="Search"
        />
      </div>

      <div>
        <label>Boy or Girl?</label>
        <div className="adoption-gender-button">
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
        <div className="adoption-size-button">
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

      <div>
        <label>Any allergies?</label>
        <input
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          placeholder="Search"
        />
      </div>

      <div>
        <label>What about vaccines?</label>
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us more about the pet"
        />
      </div>

      <button type="submit">Post for Adoption</button>
    </form>
  );
};
export default NewAdoptionPost;
