// src/components/FaceRecognition.js

import React, { useState } from 'react';
import { uploadToS3, sendMessageToSQS } from '../services/awsService';
import { recognizeFaces } from '../services/faceRecognitionService';

const FaceRecognition = () => {
  const [image, setImage] = useState(null);
  const [faces, setFaces] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle the file input change
  const handleImageUpload = async (event) => {
    const file = event.target.files[0]; // Get the first file from the file list
    console.log('File input triggered'); // This should log when you click the file input

    if (file) {
      setLoading(true);
      const uploadedImage = await uploadToS3(file); // Upload the image
      const detections = await recognizeFaces(uploadedImage); // Recognize faces
      setFaces(detections); // Set detected faces
      setLoading(false);

      // Send a message to SQS (optional)
      sendMessageToSQS(`Face detection results for image: ${uploadedImage.Key}`);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleImageUpload} // Trigger handleImageUpload when a file is chosen
        accept="image/*" // Optional: Restrict file types to images only
      />
      {loading && <p>Processing...</p>}
      <div>
        {faces.length > 0 ? (
          faces.map((face, index) => (
            <div key={index}>
              <p>Face detected: {JSON.stringify(face)}</p>
            </div>
          ))
        ) : (
          <p>No faces detected</p>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
