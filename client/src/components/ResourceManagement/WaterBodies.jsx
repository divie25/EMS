import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../config/config';

const WaterBodies = () => {
    const [waterBodies, setWaterBodies] = useState([
        {
            _id: '1',
            name: 'Pacific Ocean',
            description: 'The largest and deepest ocean on Earth, covering more than 63 million square miles.'
        },
        {
            _id: '2',
            name: 'Amazon River',
            description: 'The second-longest river in the world, known for its biodiversity.'
        },
        {
            _id: '3',
            name: 'Lake Victoria',
            description: 'Africa’s largest lake by area and the world’s largest tropical lake.'
        }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWaterBodies = async () => {
            // try {
            //     const response = await axios.get(`${url}/api/resources/water-bodies`);
            //     setWaterBodies(response.data);
            // } catch (err) {
            //     setError(err.message);
            // } finally {
            //     setLoading(false);
            // }

            setLoading(false);
        };

        fetchWaterBodies();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', color: 'blue', fontSize: '18px' }}>Loading...</div>;
    if (error) return <div style={{ textAlign: 'center', color: 'red', fontSize: '18px' }}>Error: {error}</div>;

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f0f8ff' }}>
            <h1 style={{ textAlign: 'center', color: '#4caf50' }}>Water Bodies Management</h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {waterBodies.map((body) => (
                    <li 
                        key={body._id} 
                        style={{ 
                            marginBottom: '20px', 
                            padding: '15px', 
                            backgroundColor: '#ffffff', 
                            borderRadius: '8px', 
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.2s',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <h2 style={{ color: '#3f51b5', marginBottom: '10px' }}>{body.name}</h2>
                        <p style={{ color: '#555' }}>{body.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WaterBodies;
