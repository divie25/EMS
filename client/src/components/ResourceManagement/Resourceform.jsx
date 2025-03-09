import React, { useState } from 'react';
import axios from 'axios';
import LocationInput from './locationinput';
import { TextField, Button, MenuItem, Box, Typography, Paper } from '@mui/material';

const ResourceForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        location: '',
        maintenanceStatus: 'Good',
    });

    // Handle Location Selection
    const handleLocationSelect = (location) => {
        setFormData({ ...formData, location });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const { data } = await axios.post('http://localhost:5000/api/resources', formData);
            console.log(data);
            alert('Resource added successfully!');
        } catch (error) {
            alert('Error adding resource: ' + error.message);
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: 'auto', marginTop: 4 }}>
            <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center', color: '#1976D2' }}>
                Add New Resource
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Resource Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    select
                    label="Select Type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    fullWidth
                >
                    <MenuItem value="Park">Park</MenuItem>
                    <MenuItem value="Forest">Forest</MenuItem>
                    <MenuItem value="Water Body">Water Body</MenuItem>
                </TextField>

                <LocationInput onLocationSelect={handleLocationSelect} />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Add Resource
                </Button>
            </Box>
        </Paper>
    );
};

export default ResourceForm;
