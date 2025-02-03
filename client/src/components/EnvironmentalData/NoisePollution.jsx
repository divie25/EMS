import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../config/config';

const NoisePollution = () => {
    const dummyData = [
        {
            id: 1,
            location: "City Center",
            noiseLevel: 75,
            timestamp: new Date().toISOString(),
        },
        {
            id: 2,
            location: "Residential Area",
            noiseLevel: 60,
            timestamp: new Date().toISOString(),
        },
        {
            id: 3,
            location: "Industrial Zone",
            noiseLevel: 85,
            timestamp: new Date().toISOString(),
        },
    ];

    const [noiseData, setNoiseData] = useState(dummyData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNoiseData = async () => {
            // try {
            //     const response = await axios.get(url + '/api/data/noise-pollution');
            //     setNoiseData(response.data);
            // } catch (err) {
            //     setError('Error fetching noise pollution data');
            // } finally {
            //     setLoading(false);
            // }
            setLoading(false);
        };
        
        fetchNoiseData();
    }, []);

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (error) return <div style={styles.error}>{error}</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Noise Pollution Data</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Location</th>
                        <th style={styles.tableHeader}>Noise Level (dB)</th>
                        <th style={styles.tableHeader}>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {noiseData.map((data) => (
                        <tr key={data.id} style={styles.tableRow}>
                            <td style={styles.tableCell}>{data.location}</td>
                            <td style={styles.tableCell}>{data.noiseLevel}</td>
                            <td style={styles.tableCell}>{new Date(data.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Enhanced Inline styles
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        transition: 'all 0.3s ease-in-out',
        marginTop: '30px',
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    heading: {
        color: '#333',
        textAlign: 'center',
        fontSize: '26px',
        marginBottom: '20px',
        fontWeight: '600',
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
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        textAlign: 'left',
        fontSize: '18px',
        fontWeight: 'bold',
        borderBottom: '2px solid #ddd',
    },
    tableRow: {
        backgroundColor: '#fff',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    tableCell: {
        padding: '12px',
        borderBottom: '1px solid #ddd',
        fontSize: '16px',
        color: '#555',
    },
};

// CSS for hover effect
const hoverEffectStyle = `
    .tableRow:hover {
        transform: scale(1.03);
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
        background-color: #f1f1f1;
    }
`;

export default NoisePollution;
