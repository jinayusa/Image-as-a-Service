// src/services/awsService.js

import axios from 'axios';

// Upload file to backend server
export const uploadToS3 = async (file) => {
  try {
    const fileData = await readFileAsBase64(file);
    const response = await axios.post('http://localhost:5000/upload', { file: fileData });
    return response.data;
  } catch (error) {
    console.error("Error uploading file to backend:", error);
  }
};

// Send message to SQS via backend
export const sendMessageToSQS = async (message) => {
  try {
    const response = await axios.post('http://localhost:5000/send-message', { message });
    return response.data;
  } catch (error) {
    console.error("Error sending message to backend:", error);
  }
};

// Helper function to convert file to base64
const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
export const getRealTimeData = async () => {
    // Placeholder for actual logic to fetch real-time data
    return [
      { imageName: 'image1.jpg', faceCount: 1 },
      { imageName: 'image2.jpg', faceCount: 2 },
    ];
  };