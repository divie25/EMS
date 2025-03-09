import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import { url } from '../config/config';

const ForestResources = () => {
    const [waterBodies, setWaterBodies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWaterBodies = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${url}/api/resources/specific/Forest`);
                setWaterBodies(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWaterBodies();
    }, []);

    const statusColors = {
        Good: '#d4edda',
        Average: '#fff3cd',
        Poor: '#f8d7da'
    };

    const filteredWaterBodies = waterBodies.filter((body) =>
        body.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
    if (error) return <Alert severity="error">Error: {error}</Alert>;

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <Typography variant="h3" align="center" color="primary" gutterBottom>
                Forests
            </Typography>

            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px' }}
            />

            {filteredWaterBodies.map((body) => (
                <Card 
                    key={body._id} 
                    sx={{ 
                        marginBottom: 2, 
                        backgroundColor: statusColors[body.maintenanceStatus] || '#ffffff',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.02)' }
                    }}
                >
                    <CardContent sx={{display:"flex",flexDirection:"column",gap:"20px"}} >
                        <Typography variant="h5" color="primary">{body.name}</Typography>
                        <Typography variant="body1">{body.location}</Typography>
                        <Typography variant="body2" fontWeight="bold">
                            Status: {body.maintenanceStatus}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            style={{ color: 'blue', cursor: 'pointer' , backgroundColor:"yellowgreen",textAlign:"center",padding:"10px" , borderRadius:"10px" }}
                            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${body.location}`, '_blank')}
                        >
                            📍 View the location
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ForestResources;
