import React, { useState, useEffect } from 'react';

const EnvironmentalData = () => {
  // Dummy environmental data
  const [environmentalData, setEnvironmentalData] = useState({
    airQuality: 75, // Air quality index value (0-100)
    waterQuality: 85, // Water quality index value (0-100)
    noisePollution: 55, // Noise pollution level (0-100)
  });

  // Simulating data fetching (useEffect) for demonstration
  useEffect(() => {
    // Simulating fetching data from an API
    const fetchData = () => {
      const dummyData = {
        airQuality: 75,
        waterQuality: 85,
        noisePollution: 55,
      };
      setEnvironmentalData(dummyData);
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#f4f4f9',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#333',
          fontSize: '28px',
          fontWeight: 'bold',
        }}
      >
        Environmental Data
      </h2>
      
      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3
          style={{
            marginBottom: '10px',
            color: '#4CAF50',
            fontSize: '22px',
          }}
        >
          Air Quality
        </h3>
        <p
          style={{
            fontSize: '20px',
            color: '#555',
            fontWeight: 'normal',
          }}
        >
          {environmentalData.airQuality} (Good)
        </p>
      </div>

      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3
          style={{
            marginBottom: '10px',
            color: '#2196F3',
            fontSize: '22px',
          }}
        >
          Water Quality
        </h3>
        <p
          style={{
            fontSize: '20px',
            color: '#555',
            fontWeight: 'normal',
          }}
        >
          {environmentalData.waterQuality} (Excellent)
        </p>
      </div>

      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3
          style={{
            marginBottom: '10px',
            color: '#F44336',
            fontSize: '22px',
          }}
        >
          Noise Pollution
        </h3>
        <p
          style={{
            fontSize: '20px',
            color: '#555',
            fontWeight: 'normal',
          }}
        >
          {environmentalData.noisePollution} (Moderate)
        </p>
      </div>
    </div>
  );
};

export default EnvironmentalData;
