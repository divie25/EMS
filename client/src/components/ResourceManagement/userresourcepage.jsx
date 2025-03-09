import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Chip, TextField, MenuItem, Link } from '@mui/material';
import { styled } from '@mui/system';
// import { Link } from 'react-router-dom';

const StyledCard = styled(Card)(({ type }) => ({
    backgroundColor: type === 'Park' ? '#fff59d' : type === 'Forest' ? '#c8e6c9' : '#e3f2fd',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const UserResourcePage = () => {
    const [resources, setResources] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        axios.get('http://localhost:5000/api/resources')
            .then((res) => setResources(res.data))
            .catch((err) => console.error(err));
    }, []);

    const filteredResources = resources.filter((resource) => 
        resource.name.toLowerCase().includes(search.toLowerCase()) &&
        (filter === 'All' || resource.type === filter)
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h3" textAlign="center" gutterBottom sx={{ color: '#1976d2' }}>
                Available Resources
            </Typography>
            <TextField
                label="Search Resources"
                variant="outlined"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                select
                label="Filter by Type"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
            >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Park">Park</MenuItem>
                <MenuItem value="Forest">Forest</MenuItem>
                <MenuItem value="Water Body">Water Body</MenuItem>
            </TextField>
            <Grid container spacing={3}>
                {filteredResources.map((resource) => (
                    <Grid item xs={12} sm={6} md={4} key={resource._id}>
                        <StyledCard type={resource.type}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>{resource.name}</Typography>
                                <Chip label={`Type: ${resource.type}`} color="primary" sx={{ mb: 1 }} />
                                <Link href={`https://www.google.com/maps/search/?api=1&query=${resource.location}`} target="_blank" rel="noopener">
                                    <Typography color="textSecondary" sx={{ cursor: 'pointer', textDecoration: 'underline',backgroundColor:"greenyellow",padding:"8px" ,borderRadius:"10px" }}>
                                        View location
                                    </Typography>
                                </Link>
                                <Typography variant="body2" sx={{ color: resource.maintenanceStatus === 'Good' ? 'green' : resource.maintenanceStatus === 'Average' ? 'orange' : 'red' }}>
                                    Status: {resource.maintenanceStatus}
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default UserResourcePage;