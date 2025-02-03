import React, { useState } from 'react';

const TreePlanting = () => {
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [participants, setParticipants] = useState(0);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle tree planting initiative submission
        setMessage('Tree planting initiative submitted successfully!');
    };

    return (
        <div>
            <h2>Plan a Tree Planting Initiative</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Location:</label>
                    <input 
                        type="text" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input 
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Number of Participants:</label>
                    <input 
                        type="number" 
                        value={participants} 
                        onChange={(e) => setParticipants(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Submit Initiative</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default TreePlanting;