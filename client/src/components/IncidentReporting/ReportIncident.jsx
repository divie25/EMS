import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../config/config';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress
} from '@mui/material';

const ReportIncident = () => {
  const user = JSON.parse(localStorage.getItem('user'));

    const [incidentDetails, setIncidentDetails] = useState({
        title: '',
        description: '',
        location: '',
        severity: ''
    });

    const [image, setImage] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncidentDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle Image Selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    // Fetch Live Location
    const fetchLocation = () => {
        if (navigator.geolocation) {
            setLoadingLocation(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setIncidentDetails(prevState => ({
                        ...prevState,
                        location: `${latitude}, ${longitude}`
                    }));
                    setLoadingLocation(false);
                },
                (error) => {
                    alert('Error fetching location: ' + error.message);
                    setLoadingLocation(false);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', incidentDetails.title);
        formData.append('description', incidentDetails.description);
        formData.append('location', incidentDetails.location);
        formData.append('severity', incidentDetails.severity);
        formData.append('reportedBy', user.id);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post(url + '/api/incidents/report', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 201) {
                alert('Incident reported successfully!');
                setIncidentDetails({
                    title: '',
                    description: '',
                    location: '',
                    severity: ''
                });
                setImage(null);
            }
        } catch (error) {
            console.error('Error reporting incident:', error);
            alert('Failed to report incident. Please try again.');
        }
    };

    return (
        <Card sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
                    Report an Environmental Incident
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={incidentDetails.title}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={incidentDetails.description}
                                onChange={handleChange}
                                required
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={incidentDetails.location}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={fetchLocation}
                                disabled={loadingLocation}
                                sx={{ height: '100%' }}
                            >
                                {loadingLocation ? <CircularProgress size={24} /> : "Use Live Location 📍"}
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Severity</InputLabel>
                                <Select
                                    name="severity"
                                    value={incidentDetails.severity}
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="low">Low</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" component="label" fullWidth>
                                Upload Image (Optional)
                                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                            </Button>
                            {image && <Typography variant="body2" sx={{ mt: 1 }}>{image.name}</Typography>}
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Report Incident
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default ReportIncident;
