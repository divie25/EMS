import React, { useEffect, useState } from 'react';
import { Container, Card, Typography, CircularProgress } from '@mui/material';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'green';
    if (aqi <= 100) return 'yellow';
    if (aqi <= 150) return 'orange';
    if (aqi <= 200) return 'red';
    if (aqi <= 300) return 'purple';
    return 'maroon';
};

const AirQuality = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://api.waqi.info/feed/here/?token=bd3de4735634557b12042b8446836ad11dc4a1e1')
            .then(response => {
                if (response.data.status === 'ok') {
                    setData(response.data.data);
                } else {
                    setError('Failed to fetch air quality data');
                }
                setLoading(false);
            })
            .catch(() => {
                setError('Error fetching data');
                setLoading(false);
            });
    }, []);

    return (
        <Container style={{ marginTop: '20px', maxWidth: '800px', background: 'linear-gradient(to right, #74ebd5, #ACB6E5)', padding: '20px', borderRadius: '10px' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', color: '#333' }}>
                Air Quality Dashboard
            </Typography>
            {loading ? (
                <CircularProgress style={{ display: 'block', margin: 'auto' }} />
            ) : error ? (
                <Typography variant="h6" color="error" align="center">{error}</Typography>
            ) : (
                <Row className="g-3">
                    <Col md={6}>
                        <Card sx={{ padding: '15px', textAlign: 'center', borderRadius: 2, boxShadow: 3 }}>
                            <Typography variant="h6">📍 Location</Typography>
                            <Typography variant="body1" color="textSecondary">{data.city.name}</Typography>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card sx={{ padding: '15px', textAlign: 'center', borderRadius: 2, boxShadow: 3 }}>
                            <Typography variant="h6">🌎 AQI</Typography>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: getAQIColor(data.aqi) }}>
                                {data.aqi}
                            </Typography>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card sx={{ padding: '15px', textAlign: 'center', borderRadius: 2, boxShadow: 3 }}>
                            <Typography variant="h6">🌬️ Dominant Pollutant</Typography>
                            <Typography variant="body1">{data.dominentpol.toUpperCase()}</Typography>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card sx={{ padding: '15px', textAlign: 'center', borderRadius: 2, boxShadow: 3 }}>
                            <Typography variant="h6">🌡️ Temperature</Typography>
                            <Typography variant="body1">{data.iaqi.t?.v} °C</Typography>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card sx={{ padding: '15px', textAlign: 'center', borderRadius: 2, boxShadow: 3 }}>
                            <Typography variant="h6">💧 Humidity</Typography>
                            <Typography variant="body1">{data.iaqi.h?.v} %</Typography>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card sx={{ padding: '15px', textAlign: 'center', borderRadius: 2, boxShadow: 3 }}>
                            <Typography variant="h6">🌬️ Wind Speed</Typography>
                            <Typography variant="body1">{data.iaqi.w?.v} m/s</Typography>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card sx={{ padding: '15px', textAlign: 'center', borderRadius: 2, boxShadow: 3 }}>
                            <Typography variant="h6">📏 Pressure</Typography>
                            <Typography variant="body1">{data.iaqi.p?.v} hPa</Typography>
                        </Card>
                    </Col>
                    <Col md={12}>
                        <Card sx={{ padding: '20px', textAlign: 'center', borderRadius: 2, boxShadow: 3, marginTop: '20px' }}>
                            <Typography variant="h6">📅 Future AQI Forecast</Typography>
                            {data.forecast.daily.pm25.map((day, index) => (
                                <Typography key={index} variant="body1">
                                    {day.day}: {day.avg} (Max: {day.max}, Min: {day.min})
                                </Typography>
                            ))}
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default AirQuality;
 