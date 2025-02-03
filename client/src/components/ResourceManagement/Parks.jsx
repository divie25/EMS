import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../config/config';

const Parks = () => {
    // Dummy data for default display
    const dummyParks = [
        {
            _id: 1,
            name: "Greenfield Park",
            location: "123 Green Ave, City Center",
            description: "A beautiful park with open lawns, picnic areas, and walking paths.",
        },
        {
            _id: 2,
            name: "Lakeside Park",
            location: "456 Lake Rd, Riverside",
            description: "A peaceful park next to the lake, perfect for nature walks and birdwatching.",
        },
        {
            _id: 3,
            name: "Mountain View Park",
            location: "789 Hilltop Dr, Uptown",
            description: "A park with scenic mountain views, perfect for hiking and outdoor activities.",
        },
    ];

    const [parks, setParks] = useState(dummyParks);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParks = async () => {
            // try {
            //     const response = await axios.get(url + '/api/resources/parks');
            //     setParks(response.data);
            // } catch (err) {
            //     setError(err.message);
            // } finally {
            //     setLoading(false);
            // }
            setLoading(false);
        };

        fetchParks();
    }, []);

    if (loading) return <div style={styles.loading}>Loading parks...</div>;
    if (error) return <div style={styles.error}>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Parks Management</h1>
            <ul style={styles.list}>
                {parks.map((park) => (
                    <li key={park._id} style={styles.listItem}>
                        <h2 style={styles.parkName}>{park.name}</h2>
                        <p style={styles.location}>{park.location}</p>
                        <p style={styles.description}>{park.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#eaf0f1',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '40px auto',
    },
    heading: {
        textAlign: 'center',
        fontSize: '32px',
        fontWeight: '600',
        color: '#2e8b57',
        marginBottom: '20px',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    },
    listItem: {
        backgroundColor: '#ffffff',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    },
    parkName: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#333',
    },
    location: {
        fontSize: '18px',
        color: '#555',
        margin: '10px 0',
    },
    description: {
        fontSize: '16px',
        color: '#777',
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

// Adding hover effect for list items
const hoverEffectStyle = `
    .listItem:hover {
        transform: scale(1.05);
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
        background-color: #f0f8f7;
    }
`;

export default Parks;
