import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_MEDIA } from '../../utils/mutations';
import Actionmodal from './ActionModal'; // adjust the path as needed
import { FaCog } from 'react-icons/fa';
import '../../SammiReusables.css';

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

  interface MediaUploadProps {
    onUpload: (media: {
      id: string;
      filename: string;
      contentType: string;
      length: number;
      uploadDate: string;
      gridFsId: string;
      tags: string[];
      url: string;
    }) => void;
  }

const MediaUpload: React.FC<MediaUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  //const [tagsInput, setTagsInput] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [uploadMedia, { loading, error }] = useMutation(UPLOAD_MEDIA);
  
  const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    setShowModal(true);
  };

  // const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTagsInput(e.target.value);
  // };

  const handleUpload = async () => {
    // Break if there's no file
    if (!file) return;
    console.log('Uploading file:', file.name);

    // Try to upload the media file and pass in the required variables
    try {
      const response = await uploadMedia({ 
        variables: {
          input: {
            file,
            tags: ['placeholder-for-tags'],
          } 
        }});

      // Retrieve the uploaded media details to access it later
      const uploadedFile = response.data?.uploadMedia;
      if (!uploadedFile) {
        throw new Error('Upload failed');
      }
      
      const formattedMedia: UploadedMedia = {
        id: uploadedFile.id,
        filename: uploadedFile.filename,
        contentType: uploadedFile.contentType,
        length: uploadedFile.length,
        uploadDate: uploadedFile.uploadDate,
        gridFsId: uploadedFile.gridFsId,
        tags: uploadedFile.tags || [],
        url: uploadedFile.url,
      };
      
      // Send returned data up to the parent component
      setUploadedMedia(formattedMedia);
      onUpload(formattedMedia);
      
      // Close and reset the uploadMedia modal
      setShowModal(false);
      setFile(null);
      console.log('Upload response:', response.data?.uploadMedia);
      return uploadedFile;
    } catch (err) {
      console.error('Upload error:', err);
      setShowModal(false);
    }
  };

  const resetUpload = () => {
    setUploadedMedia(null);
    setFile(null);
  };

  return (
    <div className="upload-media-container">
      {uploadedMedia ? (
        <>
          {/* Display the uploaded image */}
          <img
            src={uploadedMedia.url}
            alt={uploadedMedia.filename}
            className="upload-media-image"
          />
          {/* Overlay with cog icon */}
          <button
            onClick={resetUpload}
            className="upload-media-cog"
            aria-label="Change image"
            title="Change image"
          >
            <FaCog size={20} />
          </button>
        </>
      ) : (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="upload-media-input"
          />
          <div className="upload-media-loading">
            {loading ? 'Uploading...' : 'Click to upload image'}
          </div>

          {/* Confirmation Modal */}
          {showModal && file && (
            <Actionmodal cancel={() => setShowModal(false)} confirm={handleUpload}>
              <p>
                Upload <strong>{file.name}</strong>?
              </p>
            </Actionmodal>
          )}

          {error && <p className="upload-media-fail">Upload failed: {error.message}</p>}
        </>
      )}
    </div>
  );
};

export default MediaUpload;