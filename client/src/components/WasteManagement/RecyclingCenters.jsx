import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../config/config';

const RecyclingCenters = () => {
    // Dummy data for default display
    const dummyCenters = [
        {
            id: 1,
            name: "Green Earth Recycling Center",
            address: "123 Eco Road, City Center",
            contact: "123-456-7890",
        },
        {
            id: 2,
            name: "Recycle Now Facility",
            address: "456 Green Street, Park Area",
            contact: "987-654-3210",
        },
        {
            id: 3,
            name: "Sustainable Solutions Recycling",
            address: "789 Recycle Ave, Industrial Zone",
            contact: "555-123-4567",
        },
    ];

    const [centers, setCenters] = useState(dummyCenters);

    useEffect(() => {
        const fetchRecyclingCenters = async () => {
            try {
                const response = await axios.get(url + '/api/waste/recycling-centers');
                setCenters(response.data);
            } catch (error) {
                console.error('Error fetching recycling centers:', error);
            }
        };

        fetchRecyclingCenters();
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Recycling Centers</h1>
            <ul style={styles.list}>
                {centers.map(center => (
                    <li key={center.id} style={styles.listItem}>
                        <h2 style={styles.centerName}>{center.name}</h2>
                        <p style={styles.centerAddress}>{center.address}</p>
                        <p style={styles.centerContact}>Contact: {center.contact}</p>
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
        backgroundColor: '#e9f7f6',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '40px auto',
    },
    heading: {
        textAlign: 'center',
        fontSize: '32px',
        fontWeight: '700',
        color: '#4caf50',
        marginBottom: '20px',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    },
    listItem: {
        backgroundColor: '#ffffff',
        padding: '15px',
        marginBottom: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    },
    centerName: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '8px',
    },
    centerAddress: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '8px',
    },
    centerContact: {
        fontSize: '16px',
        color: '#777',
    },
};

// Adding hover effect for list items
const hoverEffectStyle = `
    .listItem:hover {
        transform: scale(1.05);
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
        background-color: #f0f8f7;
    }
`;

export default RecyclingCenters;
