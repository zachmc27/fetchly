//form for creating a meet up post
// import { img, use } from "framer-motion/client";
import React, { useState } from "react";
// import { FaImage } from "react-icons/fa";
// import ImageUpload from "../Reusables/ImageUpload";
import { useMutation } from "@apollo/client";
import { ADD_MEETUP } from "../../utils/mutations";

interface NewMeetupPostProps {
  onSubmit: (data: {
    title: string;
    description: string;
    date: string;
    time: string;
    poster: {
      refId: string | null;
      refModel: "User" | "Org";
    };
    location: {
      address: string;
      zip: string;
      city: string;
      state: string;
      country: string;
    };
    media: string[];
  }) => void;
}

// const userId = localStorage.getItem("user_Id");
const userId = "682d20019c9002a26585deda"
const accountType = localStorage.getItem("accountType");
const userType = accountType === "org" ? "Org" : "User";

const NewMeetUpPost = ({ onSubmit }: NewMeetupPostProps) => {
  const [addMeetUpPost] = useMutation(ADD_MEETUP);

  // const handleImageSelect = (file: { id: string }) => {
  //   setMedia([file.id]);
  // };

  // const [previewImage, setPreviewImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const meetUpInput = {
      title,
      description,
      date,
      time,
      poster: {
        refId: userId,
        refModel: userType,
      },
      location: {
        address,
        zip,
        city,
        state,
        country,
      },
      media,
    };

    try {
      const { data } = await addMeetUpPost({
        variables: { input: meetUpInput },
      });
      console.log("Mutation Success:", data);
      onSubmit(data);
      setSuccessMessage("Your meetup post has been created!");

      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setAddress("");
      setZip("");
      setCity("");
      setState("");
      setCountry("");
      setMedia([]);
      // setPreviewImage("");

    } catch (error) {
      console.log("Error adding meet up", error);
      setErrorMessage("There was an error creating meetup. Please try again.");
    }
  };

  const handleTimeButtons = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Button has been clicked', e.target)
  };

  return (
    <form onSubmit={handleSubmit} className="new-meetup-form">
      {/* <ImageUpload
        onImageSelect={handleImageSelect}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
      />
      <div className="new-meetup-title">
      /> */}
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Puppy Play-date "
        />
      </div>

      <div className="new-meetup-description">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Say something about your meetup!"
        />
      </div>

      <div className="new-meetup-date">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="new-meetup-time">
        <label>Time</label>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="What time is the meetup?"
        />
        <button onClick={handleTimeButtons}>AM</button>{" "}
        <button onClick={handleTimeButtons}>PM</button>
      </div>

      <div className="new-meetup-location">
        <label>Location</label>
        <input
          type="text"
          value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="Zip code"
        />

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        />

        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
        />

        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
        />
      </div>

      <button type="submit">Post My Meet-Up</button>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );

  };
export default NewMeetUpPost;
