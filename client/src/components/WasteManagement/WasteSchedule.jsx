import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../config/config';

const WasteSchedule = () => {
    // Dummy data for default display
    const dummySchedules = [
        {
            id: 1,
            date: "2025-01-26",
            time: "09:00 AM",
            location: "City Center",
        },
        {
            id: 2,
            date: "2025-01-26",
            time: "02:00 PM",
            location: "Residential Area",
        },
        {
            id: 3,
            date: "2025-01-27",
            time: "10:00 AM",
            location: "Industrial Zone",
        },
    ];

    const [schedules, setSchedules] = useState(dummySchedules);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get(url + '/api/waste/schedules');
                setSchedules(response.data);
            } catch (error) {
                console.error('Error fetching waste schedules:', error);
            }
        };

        fetchSchedules();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Waste Collection Schedules</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Date</th>
                        <th style={styles.tableHeader}>Time</th>
                        <th style={styles.tableHeader}>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule) => (
                        <tr key={schedule.id} style={styles.tableRow}>
                            <td style={styles.tableCell}>{schedule.date}</td>
                            <td style={styles.tableCell}>{schedule.time}</td>
                            <td style={styles.tableCell}>{schedule.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f4f4f9',
        borderRadius: '12px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '900px',
        margin: '40px auto',
    },
    heading: {
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#00bcd4',
        color: 'white',
        padding: '12px',
        textAlign: 'left',
        fontSize: '18px',
        fontWeight: 'bold',
        borderBottom: '2px solid #ddd',
    },
    tableRow: {
        backgroundColor: '#ffffff',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    tableCell: {
        padding: '12px',
        fontSize: '16px',
        color: '#555',
        borderBottom: '1px solid #ddd',
    },
};

// Adding hover effect
const hoverEffectStyle = `
    .tableRow:hover {
        transform: scale(1.05);
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
        background-color: #e6f7ff;
    }
`;

export default WasteSchedule;
