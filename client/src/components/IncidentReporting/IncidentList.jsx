import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../config/config';

const IncidentList = () => {
    // Dummy data for default display
    const dummyIncidents = [
        {
            _id: 1,
            title: "Oil Spill in River",
            description: "An oil spill was reported in the river near the industrial area.",
            status: "Investigating",
        },
        {
            _id: 2,
            title: "Air Pollution in City Center",
            description: "High levels of air pollution reported in the city center due to factory emissions.",
            status: "Resolved",
        },
        {
            _id: 3,
            title: "Illegal Dumping in Forest",
            description: "Illegal waste dumping found in the forest area, affecting wildlife.",
            status: "Pending",
        },
    ];

    const [incidents, setIncidents] = useState(dummyIncidents);

    useEffect(() => {
        const fetchIncidents = async () => {
            // try {
            //     const response = await axios.get(url + '/api/incidents');
            //     setIncidents(response.data);
            // } catch (error) {
            //     console.error('Error fetching incidents:', error);
            // }
        };

        fetchIncidents();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Reported Incidents</h2>
            <ul style={styles.list}>
                {incidents.map((incident) => (
                    <li key={incident._id} style={styles.listItem}>
                        <h3 style={styles.title}>{incident.title}</h3>
                        <p style={styles.description}>{incident.description}</p>
                        <p style={styles.status}>Status: <span style={styles[incident.status.toLowerCase()]}>{incident.status}</span></p>
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
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '40px auto',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '20px',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    },
    listItem: {
        backgroundColor: '#fff',
        padding: '20px',
        marginBottom: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    },
    title: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: '16px',
        color: '#555',
        margin: '10px 0',
    },
    status: {
        fontSize: '16px',
        fontWeight: '500',
    },
    investigating: {
        color: '#f39c12', // Yellow for Investigating status
    },
    resolved: {
        color: '#27ae60', // Green for Resolved status
    },
    pending: {
        color: '#e74c3c', // Red for Pending status
    },
};

// Adding hover effect
const hoverEffectStyle = `
    .listItem:hover {
        transform: scale(1.05);
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.15);
        background-color: #f1f1f1;
    }
`;

export default IncidentList;
