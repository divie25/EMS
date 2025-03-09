import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResourceForm from './Resourceform';
import {
    Typography, TextField, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, Button, 
    FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

const AdminResourcePage = () => {
    const [resources, setResources] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Fetch Resources
    useEffect(() => {
        axios.get('http://localhost:5000/api/resources')
            .then((res) => setResources(res.data))
            .catch((err) => console.error(err));
    }, []);

    // Delete Resource
    const deleteResource = async (id) => {
        await axios.delete(`http://localhost:5000/api/resources/${id}`);
        setResources(resources.filter(resource => resource._id !== id));
    };

    // Filtered Resources
    const filteredResources = resources.filter(resource =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (typeFilter === '' || resource.type === typeFilter) &&
        (statusFilter === '' || resource.maintenanceStatus === statusFilter)
    );

    return (
        <>
            <Typography variant="h4" gutterBottom>Resource Management (Admin)</Typography>

            <div style={{  }}>
                <ResourceForm />

                <div>
                    <TextField
                        label="Search Resources"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Filter by Type</InputLabel>
                        <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                            <MenuItem value="">All Types</MenuItem>
                            <MenuItem value="Park">Park</MenuItem>
                            <MenuItem value="Forest">Forest</MenuItem>
                            <MenuItem value="Water Body">Water Body</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Filter by Status</InputLabel>
                        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <MenuItem value="">All Statuses</MenuItem>
                            <MenuItem value="Good">Good</MenuItem>
                            <MenuItem value="Average">Average</MenuItem>
                            <MenuItem value="Poor">Poor</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Table for Resource Display */}
                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Resource Name</b></TableCell>
                                    <TableCell><b>Type</b></TableCell>
                                    <TableCell><b>Location</b></TableCell>
                                    <TableCell><b>Status</b></TableCell>
                                    <TableCell><b>Actions</b></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filteredResources.map((resource) => (
                                    <TableRow key={resource._id}>
                                        <TableCell>{resource.name}</TableCell>
                                        <TableCell>{resource.type}</TableCell>
                                        <TableCell>
                                            <a
                                                href={`https://maps.google.com/?q=${resource.location}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {resource.location}
                                            </a>
                                        </TableCell>
                                        <TableCell>{resource.maintenanceStatus}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => deleteResource(resource._id)}
                                                sx={{ ml: 1 }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
};

export default AdminResourcePage;
