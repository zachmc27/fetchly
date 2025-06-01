//form for creating a free flow post
import { useState, useEffect } from "react";
import { FaImage } from "react-icons/fa";
// import { FaCamera, FaAt } from "react-icons/fa";
import Actionmodal from "../Reusables/ActionModal";
import { useMutation } from "@apollo/client";
import { ADD_POST, ADD_POST_RESPONSE, UPLOAD_MEDIA } from "../../utils/mutations";

interface NewPostProps {
  parentPostId?: string;
  onSubmit: (data: {
    poster: {
      refId: string;
      refModel: string;
    };
    contentText: string;
    media?: string[];
  }) => void;
  onClose?: () => void
}

// type UploadedMedia = {
//   id: string;
//   filename: string;
//   contentType: string;
//   length: number;
//   uploadDate: string;
//   gridFsId: string;
//   tags: string[];
//   url: string;
// };

const userId = localStorage.getItem("user_Id");
const accountType = localStorage.getItem("accountType");
const userType = accountType === "org" ? "Org" : "User";

const NewFreeFormPost = ({ onSubmit, parentPostId, onClose }: NewPostProps) => {
  const [createPost, { loading: postLoading, error: postError }] = useMutation(ADD_POST);
  const [createPostResponse, { loading: responseLoading, error: responseError }] = useMutation(ADD_POST_RESPONSE);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedURL, setUploadedURL] = useState<string[]>([]);

  const loadingAny = postLoading || responseLoading;
  const errorAny = postError || responseError;

  const [content, setContent] = useState('');
  const [media, setMedia] = useState<string[]>([]);

  // const handleMediaUpload = (media: UploadedMedia) => {
  //   setMedia((prev) => [...prev, media.id]);
  // };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      console.warn("No onClose provided")
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    setSelectedFile(file);
    setShowUploadModal(true);
    }
  };

  const [uploadMedia, { loading: uploadLoading, error: uploadError }] = useMutation(UPLOAD_MEDIA);

  
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

  const handleSubmit = async () => {
    if (!userId) {
      alert("You must be logged in to post.");
      return;
    }

    const postInput = {
      poster: {
        refId: userId,
        refModel: userType,
      },
      contentText: content,
      media,
    };

    try {
      if (parentPostId) {
        // This is a postResponse, run the correct Mutation
        await createPostResponse ({
          variables: {
            addPostResponsePostId: parentPostId,
            addPostResponseInput: postInput,
          },
        });
      } else {
        await createPost({ variables: { input: postInput } });
      }
      onSubmit(postInput);
      setContent('');
      setMedia([]);
      setUploadedURL([]);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div className="post-creator-container">
      <div className="post-input-wrapper">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="post-textarea"
        />
      </div>

      <div className="post-toolbar">
        <div className="media-buttons">
          <label className="image-button" htmlFor="file-upload">
            <FaImage className="icon" />
            {/* <MediaUpload onUpload={handleMediaUpload} /> */}
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
          {/* <label className="camera-button"> */}
            {/* <FaCamera className="icon" /> */}
            {/*Accessing camera doesn't exist yet*/}
          {/* </label> */}
          {/* <button type="button" className="at-button"> */}
            {/* <FaAt className="icon" /> */}
            {/*At button interface doesn't exist yet*/}
          {/* </button> */}
        </div>
        <button onClick={handleSubmit} disabled={loadingAny} className="submit-post-button">
          {loadingAny ? "Posting..." : "Post"}
        </button>
        {errorAny && <div className="error-message">Failed to post. Please try again.</div>}
      </div>
    </div>
  );
};

export default NewFreeFormPost
