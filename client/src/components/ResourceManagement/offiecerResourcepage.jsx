import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Box, Grid } from '@mui/material';

const OfficerResourcePage = () => {
    const [resources, setResources] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('Good');

    useEffect(() => {
        axios.get('http://localhost:5000/api/resources')
            .then((res) => setResources(res.data))
            .catch((err) => console.error(err));
    }, []);

    const updateStatus = async (id) => {
        await axios.put(`http://localhost:5000/api/resources/${id}`, { maintenanceStatus: selectedStatus });
        alert('Status updated successfully!');
    };

    const navigateToMap = (location) => {
      
        window.open(`https://www.google.com/maps/search/?api=1&query=${location}`, '_blank');


        ///`https://www.google.com/maps?q=${park.lat},${park.lng}


    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                Resource Management (Officer)
            </Typography>
            <Grid container spacing={3}>
                {resources.map(resource => (
                    <Grid item xs={12} sm={6} md={4} key={resource._id}>
                        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {resource.name}
                                </Typography>
                                <Typography>Status: <b>{resource.maintenanceStatus}</b></Typography>
                                <Button 
                                    variant="outlined" 
                                    color="primary"
                                    onClick={() => navigateToMap(resource.location)}
                                    sx={{ marginTop: 1 }}
                                >
                                    View on Map
                                </Button>
                                <FormControl fullWidth sx={{ marginTop: 2 }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                    >
                                        <MenuItem value="Good">Good</MenuItem>
                                        <MenuItem value="Average">Average</MenuItem>
                                        <MenuItem value="Poor">Poor</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => updateStatus(resource._id)}
                                    fullWidth
                                    sx={{ marginTop: 2 }}
                                >
                                    Update Status
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default OfficerResourcePage;
