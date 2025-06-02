//form for creating a meet up post
import React, { useState } from "react";
import { FaImage } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_MEETUP } from "../../utils/mutations";
import { UPLOAD_MEDIA } from "../../utils/mutations";
import Actionmodal from "../Reusables/ActionModal";

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

const userId = localStorage.getItem("userId")
const accountType = localStorage.getItem("accountType");
const userType = accountType === "org" ? "Org" : "User";

const NewMeetUpPost = ({ onSubmit }: NewMeetupPostProps) => {
  const [addMeetUpPost] = useMutation(ADD_MEETUP, {
    refetchQueries: ["MeetUps"],
  });
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

      //Resets the form to empty values
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
  };


  // UploadMedia
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedURL, setUploadedURL] = useState<string[]>([]);
  const [uploadMedia, { loading: uploadLoading, error: uploadError }] = useMutation(UPLOAD_MEDIA);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowUploadModal(true);
      }
    };
  
  const confirmUpload = async () => {
    if (!selectedFile) return;

    try {
      const response = await uploadMedia({
        variables: {
          input: {
            file: selectedFile,
            tags: ['freeform-post'],
          },
        },
      });

      const uploaded = response.data?.uploadMedia;
      setUploadedURL((prev) => [...prev, uploaded.url]);

      if (uploaded) {
        setMedia((prev) => [...prev, uploaded.id]);
      }
    } catch (err) {
      console.error("Media upload failed:", err);
    } finally {
      setShowUploadModal(false);
      setSelectedFile(null);
    }
  };



  return (
        <form onSubmit={handleSubmit} className="new-meetup-form">
      <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Puppy Play-date "
          />
        </div>

        <div className="media-buttons">
          <label className="image-button" htmlFor="file-upload">
            <FaImage className="icon" />
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {showUploadModal && selectedFile && (
            <Actionmodal
              cancel={() => {
                setShowUploadModal(false);
                setSelectedFile(null);
              }}
              confirm={confirmUpload}
            >
              <p>
                Upload <strong>{selectedFile.name}</strong>?
              </p>
            </Actionmodal>
          )}
          {uploadError && (
            <div className="error-message">
              Upload failed: {uploadError.message}
            </div>
          )}
          {uploadLoading && (
            <div className="loading-message">
              Upload loading...
            </div>
          )}
          <div className="uploaded-images-preview">
            {media.map((mediaId, index) => (
              <img
                key={mediaId}
                src={uploadedURL[index]}
                alt={`Uploaded ${index + 1}`}
                className="uploaded-image-thumb"
              />
            ))}
          </div>          
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

        <div>
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

        <button type="submit" className="post-meetup-btn">Post My Meet-Up</button>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </form>
  );
  };
export default NewMeetUpPost;
