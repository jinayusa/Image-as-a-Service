// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import { getRealTimeData } from '../services/awsService';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRealTimeData();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Real-Time Monitoring Dashboard</h2>
      <div>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index}>
              <p>Processed Image: {item.imageName}</p>
              <p>Faces Detected: {item.faceCount}</p>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
