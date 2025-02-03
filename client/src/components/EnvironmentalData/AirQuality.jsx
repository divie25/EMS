import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../config/config';

const AirQuality = () => {
    const dummyData = [
        {
            location: "City Center",
            pm25: 35,
            pm10: 50,
            o3: 85,
            timestamp: new Date().toISOString()
        },
        {
            location: "Park Area",
            pm25: 18,
            pm10: 22,
            o3: 90,
            timestamp: new Date().toISOString()
        }
    ];

    const [airQualityData, setAirQualityData] = useState(dummyData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAirQualityData = async () => {
            // try {
            //     const response = await axios.get(url + '/api/data/air-quality');
            //     setAirQualityData(response.data);
            // } catch (err) {
            //     setError('Error fetching air quality data');
            // } finally {
            //     setLoading(false);
            // }
            setLoading(false);
        };

        fetchAirQualityData();
    }, []);

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (error) return <div style={styles.error}>{error}</div>;

    const dataToDisplay = airQualityData || dummyData;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Air Quality Data</h2>
            <ul style={styles.list}>
                {dataToDisplay.map((data, index) => (
                    
                    <li key={index} style={styles.listItem}>
                        <strong>Location:</strong> {data.location} <br />
                        <strong>PM2.5:</strong> {data.pm25} µg/m³ <br />
                        <strong>PM10:</strong> {data.pm10} µg/m³ <br />
                        <strong>Ozone:</strong> {data.o3} µg/m³ <br />
                        <strong>Timestamp:</strong> {new Date(data.timestamp).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Enhanced Inline styles
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f0f8ff',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        transition: 'all 0.3s ease-in-out',
        marginTop: '20px',
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    heading: {
        color: '#333',
        textAlign: 'center',
        fontSize: '28px',
        marginBottom: '20px',
        fontWeight: '600',
        animation: 'fadeIn 1s ease-out',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    listItem: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '15px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    },
    loading: {
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#0073e6',
    },
    error: {
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#ff4d4d',
    },
};

// CSS for hover and animation effects
const stylesForHoverEffect = `
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }

    .listItem:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        background-color: #e6f7ff;
    }
`;

export default AirQuality;
