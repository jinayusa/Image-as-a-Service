// src/App.js

import React from 'react';
import FaceRecognition from './components/FaceRecognition';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div>
      <h1>Image Recognition as a Service</h1>
      <FaceRecognition />
      <Dashboard />
    </div>
  );
};

export default App;
