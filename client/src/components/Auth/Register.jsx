import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { url } from '../../config/config';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { TextField, Typography } from '@mui/material';
import { url } from '../config/config';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const { username, email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url + '/api/auth/register', formData);
            console.log(response.data);
            if (response.data.message === 'User registered successfully') {
                alert('User registered successfully');
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Card className="text-center" style={{ padding: '30px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)' }}>
                        <Typography variant="h5" className="text-center" style={{ marginBottom: '20px', fontWeight: 'bold', color: '#333' }}>
                            Environment Management System - Register
                        </Typography>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <TextField fullWidth label="Username" variant="outlined" name="username" value={username} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <TextField fullWidth label="Email" variant="outlined" type="email" name="email" value={email} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <TextField fullWidth label="Password" variant="outlined" type="password" name="password" value={password} onChange={handleChange} required />
                            </Form.Group>
                            <Button type="submit" className="w-100" style={{ backgroundColor: '#6610f2', border: 'none', padding: '10px', fontSize: '16px', fontWeight: 'bold' }}>
                                Register
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
