// import React, { useState } from 'react'
// import { FaImage } from 'react-icons/fa'
// import { useMutation } from '@apollo/client';
// import { UPLOAD_MEDIA } from '../../utils/mutations';

//   type UploadedMedia = {
//     id: string;
//     filename: string;
//     contentType: string;
//     length: number;
//     uploadDate: string;
//     gridFsId: string;
//     tags: string[];
//     url: string; // URL to access the media
//   };



// interface ImageUploadProps {
//     onImageSelect: (file: {id: string}) => void;
//     previewImage: string | null;
//     setPreviewImage?: (string: string) => void;
// }

// const ImageUpload = ({ onImageSelect }: ImageUploadProps) => {
//     const [preview, setPreview] = useState<string | null>(null);
//     const [uploadMedia, { loading, error }] = useMutation(UPLOAD_MEDIA)
    
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files?.[0];
//       if (
//         file &&
//         (file.type === "image/png" ||
//           file.type === "image/jpeg" ||
//           file.type === "image/jpg")
//         ) {
//           const imageURL = URL.createObjectURL(file);
//           setPreview(imageURL);
//           onImageSelect(file);
//         }
//       };
    
// ******* WITH ZACHS STYLING ******
// return (
//     <div>
//       <div className='image-preview'>
//       {preview && (
//         <img
//           src={preview}
//           alt="Preview"
//         />
//       )}
//       </div>
//       <label>
//         <FaImage size={20} />
//         <input
//           type="file"
//           accept="image/png, image/jpeg, image/jpg"
//           onChange={handleChange}
//           style={{ display: 'none' }}
//         />
//       </label>
//     </div>
//   );

// return (
//     <div>
//       {preview && (
//         <img
//           src={preview}
//           alt="Preview"
//         />
//       )}
//       <label>
//         <FaImage size={20} />
//         <input
//           type="file"
//           accept="image/png, image/jpeg, image/jpg"
//           onChange={handleChange}
//           style={{ display: 'none' }}
//         />
//       </label>
//     </div>
//   );
// };

// export default ImageUpload;