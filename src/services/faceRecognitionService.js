// src/services/faceRecognitionService.js

import * as faceapi from 'face-api.js';

export const recognizeFaces = async (image) => {
  // Load face-api.js model
  await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
  
  const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
  return detections;
};
