import React, { useState } from 'react'
import { FaImage } from 'react-icons/fa'

interface ImageUploadProps {
    onImageSelect: (file: File) => void;
    previewImage: string | null;
    setPreviewImage?: (string: string) => void;
}

const ImageUpload = ({ onImageSelect }: ImageUploadProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (
        file &&
        (file.type === "image/png" ||
          file.type === "image/jpeg" ||
          file.type === "image/jpg")
        ) {
          const imageURL = URL.createObjectURL(file);
          setPreview(imageURL);
          onImageSelect(file);
        }
      };
    

return (
    <div>
      <div className='image-preview'>
      {preview && (
        <img
          src={preview}
          alt="Preview"
        />
      )}
      </div>
      <label>
        <FaImage size={20} />
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
};

export default ImageUpload;