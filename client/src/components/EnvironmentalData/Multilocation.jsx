import React, { useEffect, useState } from 'react';
import { Container, Card, Typography, CircularProgress, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'green';
    if (aqi <= 100) return 'yellow';
    if (aqi <= 150) return 'orange';
    if (aqi <= 200) return 'red';
    if (aqi <= 300) return 'purple';
    return 'maroon';
};

const MultiLocationAQI = () => {
    const [city, setCity] = useState('Chennai');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const locations = ['Chennai', 'Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Hyderabad'];

    const fetchAQI = async (cityName) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://api.waqi.info/feed/${cityName}/?token=bd3de4735634557b12042b8446836ad11dc4a1e1`);
            if (response.data.status === 'ok') {
                setData(response.data.data);
            } else {
                setError('Failed to fetch air quality data');
            }
        } catch {
            setError('Error fetching data');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAQI(city);
    }, [city]);

    return (
        <Container sx={{ mt: 3, maxWidth: 900, p: 3, bgcolor: 'lightblue', borderRadius: 2 }}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
                Multi-Location Air Quality Dashboard
            </Typography>

            {/* Search Bar */}
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        label="Enter City Name"
                        variant="outlined"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" fullWidth color="primary" onClick={() => fetchAQI(city)}>
                        Check AQI
                    </Button>
                </Grid>
            </Grid>

            {/* Loading & Error Handling */}
            {loading ? (
                <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 3 }} />
            ) : error ? (
                <Typography variant="h6" color="error" align="center" sx={{ mt: 3 }}>
                    {error}
                </Typography>
            ) : (
                data && (
                    <>
                        {/* Current AQI */}
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={12}>
                                <Card sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
                                    <Typography variant="h6">📍 Location</Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        {data.city.name}
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
                                    <Typography variant="h6">🌎 AQI</Typography>
                                    <Typography variant="h5" fontWeight="bold" sx={{ color: getAQIColor(data.aqi) }}>
                                        {data.aqi}
                                    </Typography>
                                    <Typography variant="body2">
                                        Dominant Pollutant: {data.dominentpol?.toUpperCase()}
                                    </Typography>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Additional Air Quality Info */}
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={6} md={4}>
                                <Card sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
                                    <Typography variant="h6">🌡 Temperature</Typography>
                                    <Typography variant="h5">{data.iaqi?.t?.v ?? 'N/A'} °C</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Card sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
                                    <Typography variant="h6">💧 Humidity</Typography>
                                    <Typography variant="h5">{data.iaqi?.h?.v ?? 'N/A'} %</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Card sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
                                    <Typography variant="h6">🌬 Wind Speed</Typography>
                                    <Typography variant="h5">{data.iaqi?.w?.v ?? 'N/A'} km/h</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Card sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
                                    <Typography variant="h6">🌀 PM2.5</Typography>
                                    <Typography variant="h5">{data.iaqi?.pm25?.v ?? 'N/A'} µg/m³</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Card sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
                                    <Typography variant="h6">🔵 PM10</Typography>
                                    <Typography variant="h5">{data.iaqi?.pm10?.v ?? 'N/A'} µg/m³</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Card sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
                                    <Typography variant="h6">🌍 Ozone</Typography>
                                    <Typography variant="h5">{data.iaqi?.o3?.v ?? 'N/A'} ppm</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Card sx={{ p: 2, textAlign: 'center', boxShadow: 3 }}>
                                    <Typography variant="h6">📏 Pressure</Typography>
                                    <Typography variant="h5">{data.iaqi?.p?.v ?? 'N/A'} hPa</Typography>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Other Cities */}
                        <Typography variant="h5" align="center" fontWeight="bold" mt={3}>
                            Other Cities
                        </Typography>
                        <Grid container spacing={2} justifyContent="center" mt={2}>
                            {locations.map((location, index) => (
                                <Grid item xs={6} md={4} key={index}>
                                    <Card
                                        sx={{ p: 2, textAlign: 'center', boxShadow: 3, cursor: 'pointer' }}
                                        onClick={() => setCity(location)}
                                    >
                                        <Typography variant="h6">{location}</Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )
            )}
        </Container>
    );
};

export default MultiLocationAQI;
