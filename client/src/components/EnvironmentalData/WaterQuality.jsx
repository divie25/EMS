import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../config/config';

const WaterQuality = () => {
    const dummyData = [
        {
            location: "River Bank",
            phLevel: 7.2,
            dissolvedOxygen: 6.5,
            turbidity: 3.1
        },
        {
            location: "Lake Shore",
            phLevel: 7.5,
            dissolvedOxygen: 8.0,
            turbidity: 2.3
        }
    ];

    const [waterQualityData, setWaterQualityData] = useState(dummyData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWaterQualityData = async () => {
            try {
                // Uncomment when you have the API endpoint working
                // const response = await axios.get(url + '/api/data/water-quality');
                // setWaterQualityData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchWaterQualityData();
    }, []);

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (error) return <div style={styles.error}>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Water Quality Data</h2>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th style={styles.tableCell}>Location</th>
                        <th style={styles.tableCell}>pH Level</th>
                        <th style={styles.tableCell}>Dissolved Oxygen (mg/L)</th>
                        <th style={styles.tableCell}>Turbidity (NTU)</th>
                    </tr>
                </thead>
                <tbody>
                    {waterQualityData.map((data, index) => (
                        <tr key={index} style={styles.tableRow}>
                            <td style={styles.tableCell}>{data.location}</td>
                            <td style={styles.tableCell}>{data.phLevel}</td>
                            <td style={styles.tableCell}>{data.dissolvedOxygen}</td>
                            <td style={styles.tableCell}>{data.turbidity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Inline styles with enhanced interactivity
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        transition: 'all 0.3s ease',
        maxWidth: '1000px',
        margin: 'auto',
        overflow: 'hidden',
    },
    heading: {
        color: '#2c3e50',
        textAlign: 'center',
        fontSize: '28px',
        marginBottom: '20px',
        fontWeight: 'bold',
        animation: 'fadeIn 2s ease-in-out',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#0073e6',
        color: '#ffffff',
        fontWeight: 'bold',
    },
    tableCell: {
        padding: '12px 20px',
        textAlign: 'center',
        border: '1px solid #ddd',
        fontSize: '16px',
        transition: 'background-color 0.3s, transform 0.3s',
    },
    tableRow: {
        transition: 'transform 0.3s, box-shadow 0.3s',
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
        color: '#e74c3c',
    },
};


export default WaterQuality;
