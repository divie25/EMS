import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../config/config';
import { Card, CardContent, Typography, Container, TextField, Grid, Link } from '@mui/material';

const getLocationName = async (lat, lng) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`);
        if (response.data.results.length > 0) {
            return response.data.results[0].formatted_address;
        } else {
            return "Location not found";
        }
    } catch (error) {
        console.error("Error fetching location:", error);
        return "Location fetch error";
    }
};

const Parks = () => {
    const dummyParks = [
        { _id: 1, name: "Greenfield Park", location: "123 Green Ave, City Center", lat: 13.0842624, lng: 80.2062336, description: "A beautiful park with open lawns, picnic areas, and walking paths." },
        { _id: 2, name: "Lakeside Park", location: "456 Lake Rd, Riverside", lat: null, lng: null, description: "A peaceful park next to the lake, perfect for nature walks and birdwatching." },
        { _id: 3, name: "Mountain View Park", location: "789 Hilltop Dr, Uptown", lat: null, lng: null, description: "A park with scenic mountain views, perfect for hiking and outdoor activities." },
    ];

    const [parks, setParks] = useState(dummyParks);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParks = async () => {
            try {
                const response = await axios.get(url + '/api/resources/specific/Park');
                const updatedParks = await Promise.all(response.data.map(async (park) => {
                    if (park.lat && park.lng) {
                        const locationName = await getLocationName(park.lat, park.lng);
                        return { ...park, location: locationName };
                    }
                    return park;
                }));
                setParks(updatedParks);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchParks();
    }, []);

    const statusColors = {
        Good: '#d4edda',
        Average: '#fff3cd',
        Poor: '#f8d7da'
    };

    const filteredParks = parks.filter(park =>
        park.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <Typography textAlign="center" color="primary">Loading parks...</Typography>;
    if (error) return <Typography textAlign="center" color="error">Error: {error}</Typography>;

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h3" textAlign="center" gutterBottom color="primary">Parks Management</Typography>

            <TextField 
                fullWidth 
                label="Search Parks" 
                variant="outlined" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 3 }}
            />

            <Grid container spacing={3}>
                {filteredParks.map((park) => (
                    <Grid item xs={12} sm={6} md={4} key={park._id}>
                        <Card sx={{
                            '&:hover': {    
                                transform: 'scale(1.05)',
                                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                            },
                        }}>
                            <CardContent sx={{ backgroundColor: statusColors[park.maintenanceStatus] || '#ffffff'}}>
                                <Typography variant="h5" color="textPrimary">{park.name}</Typography>
                                <Typography variant="h6" color="textPrimary">{park.location}</Typography>
                                {park.lat && park.lng ? (
                                    <Link href={`https://www.google.com/maps?q=${park.lat},${park.lng}`} target="_blank" rel="noopener">
                                        <Typography color="textSecondary" sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                            Navigate to Location (Lat/Lng)
                                        </Typography>
                                    </Link>
                                ) : null}
                                <Link href={`https://www.google.com/maps/search/?api=1&query=${park.location}`} target="_blank" rel="noopener">
                                    <Typography color="textSecondary" sx={{ cursor: 'pointer', textDecoration: 'underline',backgroundColor:"greenyellow",padding:"8px" ,borderRadius:"10px" }}>
                                        View location
                                    </Typography>
                                </Link>
                                <Typography color="textSecondary">{park.maintenanceStatus}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Parks;
