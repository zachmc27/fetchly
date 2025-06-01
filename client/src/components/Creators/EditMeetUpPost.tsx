import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_MEETUP, DELETE_MEETUP } from "../../utils/mutations";
// import Meetup from "../../pages/Meetup";
// import imageUpload from "../Reusables/ImageUpload";

interface EditMeetUpPostProps {
  meetupId: string;
  existingMeetup: {
    title: string;
    description: string;
    date: string;
    time: string;
    location: {
      address: string;
      zip: string;
      city: string;
      state: string;
      country: string;
    };
    // media: string[];
  };
  onSubmit: (data: {
    title: string;
    description: string;
    date: string;
    time: string;
    poster: {
      refId: string;
      refModel: string;
    };
    location: {
      address: string;
      zip: string;
      city: string;
      state: string;
      country: string;
    };
    // media: [],
  }) => void;
  onDelete?: () => void;
}

const userId = "682d20019c9002a26585deda"; // WILL NEED TO PASS DYNAMIC USER IN.. STRING FOR TESTING ONLY
const accountType = localStorage.getItem("accountType");
const userType = accountType === "org" ? "Org" : "User";

const EditMeetUpPost = ({
  meetupId,
  existingMeetup,
  onSubmit,
  onDelete,
}: EditMeetUpPostProps) => {
  const [updateMeetUp] = useMutation(UPDATE_MEETUP);
  const [deleteMeetUp] = useMutation(DELETE_MEETUP);

  //   const [previewImage, setPreviewImage] = useState("");

  const [title, setTitle] = useState(existingMeetup.title);
  const [description, setDescription] = useState(existingMeetup.description);
  const [date, setDate] = useState(existingMeetup.date);
  const [time, setTime] = useState(existingMeetup.time);
  //   const [media, setMedia] = useState<string[]>(existingMeetup.media);
  const [address, setAddress] = useState(existingMeetup.location.address);
  const [zip, setZip] = useState(existingMeetup.location.zip);
  const [city, setCity] = useState(existingMeetup.location.city);
  const [state, setState] = useState(existingMeetup.location.state);
  const [country, setCountry] = useState(existingMeetup.location.country);
  const [message, setMessage] = useState("");

  // const handleImageSelect = (file: {id: string}) => {
  //     setMedia([file.id])
  // };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const updateInput = {
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
      // media,
    };

    try {
      const { data } = await updateMeetUp({
        variables: {
          updateMeetUpMeetUpId: meetupId,
          input: updateInput,
        },
      });
      console.log("Update Success", data);
      onSubmit(data);
      setMessage("Meetup successfully updated!");
    } catch (error) {
      console.log("Error updating meetup", error);
      setMessage("Error updating meetup. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this meetup?")) return;

    try {
      await deleteMeetUp({ variables: { meetupId } });
      setMessage("Meetup deleted.");
      onDelete?.(); // notify parent if needed
    } catch (error) {
      console.error("Error deleting meetup:", error);
      setMessage("Error deleting meetup. Try again.");
    }
  };

  return (
    <form onSubmit={handleUpdateSubmit} className="edit-meetup-form">
      {/* <ImageUpload
        onImageSelect={handleImageSelect}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
      /> */}

      <div>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
        <input value={time} onChange={(e) => setTime(e.target.value)} />
      </div>

      <div>
        <label>Location</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="Zip"
        />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        />
        <input
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
        />
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
        />
      </div>

      <button type="submit">Update Meetup</button>
      <button type="button" onClick={handleDelete} style={{ color: "red" }}>
        Delete Meetup
      </button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default EditMeetUpPost;
