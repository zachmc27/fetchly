//form for creating a meet up post
// import { img, use } from "framer-motion/client";
import React, { useState } from "react";
// import { FaImage } from "react-icons/fa";
import ImageUpload from "../Reusables/ImageUpload";

interface NewMeetupPostProps {
  onSubmit: (data: {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
  }) => void;
}

const NewMeetUpPost = ({ onSubmit }: NewMeetupPostProps) => {
  const [previewImage, setPreviewImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, date, time, location });
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setLocation("");
  };

  const handleTimeButtons = ((e: React.FormEvent) => {
    e.preventDefault();
    console.log('Button has been clicked', e.target)
  })

  return (
    <form onSubmit={handleSubmit} className="new-meetup-form">
      <ImageUpload
      onImageSelect={(file) => {
        console.log('Selected Image', file)
      }}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
      />
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Puppy Play-date "
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Say something about your meetup!"
        />
      </div>

      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label>Time</label>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="What time is the meetup?"
        />
        <button onClick={handleTimeButtons}>AM</button> <button onClick={handleTimeButtons}>PM</button>
      </div>

      <div>
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Where is the meetup"
        />
      </div>

      <button type="submit">Post My Meet-Up</button>
    </form>
  );
};

export default NewMeetUpPost;
