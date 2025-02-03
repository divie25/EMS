import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../config/config';

const ReportIncident = () => {

    const user = {
        _id: "63d59f1f2e3b0b0a0c8b5cd3",
        name: "John Doe",
        email: "johndoe@example.com"
      }
      

    const [incidentDetails, setIncidentDetails] = useState({
        title: '',
        description: '',
        location: '',
        severity: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncidentDetails({
            ...incidentDetails,
            [name]: value,
           
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const data ={
                ...incidentDetails, reportedBy:user._id
            }

            const response = await axios.post(url + '/api/incidents/report', data);
            if (response.status === 201) {
                alert('Incident reported successfully!');
                setIncidentDetails({
                    title: '',
                    description: '',
                    location: '',
                    severity: ''
                });
            }
        } catch (error) {
            console.error('Error reporting incident:', error);
            alert('Failed to report incident. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Report an Environmental Incident</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={incidentDetails.title}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Description:</label>
                    <textarea
                        name="description"
                        value={incidentDetails.description}
                        onChange={handleChange}
                        required
                        style={styles.textarea}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={incidentDetails.location}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Severity:</label>
                    <select
                        name="severity"
                        value={incidentDetails.severity}
                        onChange={handleChange}
                        required
                        style={styles.select}
                    >
                        <option value="">Select severity</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button type="submit" style={styles.submitButton}>Report Incident</button>
            </form>
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        padding: '20px',
        background: 'linear-gradient(to right,rgb(84, 103, 105),rgb(123, 139, 123))',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(119, 94, 94, 0.1)',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '40px auto',
    },
    heading: {
        color: '#fff',
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    label: {
        color: '#fff',
        fontSize: '16px',
        fontWeight: '500',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    textarea: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        outline: 'none',
        resize: 'vertical',
        transition: 'border-color 0.3s',
    },
    select: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    submitButton: {
        padding: '12px',
        fontSize: '18px',
        backgroundColor: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease-in-out',
    },
    submitButtonHover: {
        backgroundColor: '#45a049',
    }
};

// CSS for hover effect for inputs and submit button
const hoverEffectStyle = `
    .input:hover, .textarea:hover, .select:hover {
        border-color: #4caf50;
    }
    .submitButton:hover {
        background-color: #45a049;
    }
`;

export default ReportIncident;
