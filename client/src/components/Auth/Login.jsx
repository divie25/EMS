import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { url } from '../../config/config';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { TextField, Typography } from '@mui/material';
import { url } from '../config/config';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(url + '/api/auth/login', { email, password });
            console.log(response.data);

            localStorage.setItem("user",JSON.stringify(response.data.user))
             
            if(response.data.user.role==="environmental_officer"){
                navigate('/environmentofficer/dashboard');
                window.location.reload()

            }else if (response.data.user.role==="admin"){
                navigate('/admin/dashboard');
                window.location.reload()

            }else{
                navigate('/dashboard');
                window.location.reload()
            }


          
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh'}}>
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Card className="text-center" style={{ padding: '30px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)' }}>
                        <Typography variant="h5" className="text-center" style={{ marginBottom: '20px', fontWeight: 'bold', color: '#333' }}>
                            Environment Management System - Login
                        </Typography>
                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3">
                                <TextField fullWidth label="Email" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <TextField fullWidth label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>
                            {error && (
                                <Typography variant="body2" color="error" className="mb-3 text-center">
                                    {error}
                                </Typography>
                            )}
                            <Button type="submit" className="w-100" style={{ backgroundColor: '#6610f2', border: 'none', padding: '10px', fontSize: '16px', fontWeight: 'bold' }} disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
