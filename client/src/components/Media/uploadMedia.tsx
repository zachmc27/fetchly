import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_MEDIA } from '../../utils/mutations';
import Actionmodal from '../Reusables/ActionModal'; // adjust the path as needed
import { FaCog } from 'react-icons/fa';

  type UploadedMedia = {
    id: string;
    filename: string;
    contentType: string;
    length: number;
    uploadDate: string;
    gridFsId: string;
    tags: string[];
  };

const MediaUpload = () => {
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
    if (!file) return;
    console.log('Uploading file:', file.name);
    try {
      const response = await uploadMedia({ 
        variables: {
          input: {
            file,
            tags: ['placeholder-for-tags'],
          } 
        }});
      const uploadedFile = response.data?.uploadMedia;
      if (!uploadedFile) {
        throw new Error('Upload failed');
      }
      if (uploadedFile) {
        setUploadedMedia({
          id: uploadedFile.id,
          filename: uploadedFile.filename,
          contentType: uploadedFile.contentType,
          length: uploadedFile.length,
          uploadDate: uploadedFile.uploadDate,
          gridFsId: uploadedFile.gridFsId,
          tags: uploadedFile.tags || [],
        });
      }

      setShowModal(false);
      setFile(null);
      console.log('Upload response:', response.data?.uploadMedia);
      return response.data?.uploadMedia;
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
    <div className="relative w-64 h-64 border rounded-md overflow-hidden">
      {uploadedMedia ? (
        <>
          {/* Display the uploaded image */}
          <img
            src={`http://localhost:3001/media/${uploadedMedia.gridFsId}`}
            alt={uploadedMedia.filename}
            className="w-full h-full object-cover"
          />
          {/* Overlay with cog icon */}
          <button
            onClick={resetUpload}
            className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75"
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
            className="w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
          />
          <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500">
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

          {error && <p className="text-red-500 mt-2">Upload failed: {error.message}</p>}
        </>
      )}
    </div>
  );
};

export default MediaUpload;