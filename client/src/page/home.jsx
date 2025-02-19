import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Typography, Box } from '@mui/material';

const Homepage = () => {
  return (
    <Container className="mt-4">
      <Typography variant="h3" color="primary" gutterBottom align="center">
        Welcome to EcoApp
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Explore environmental data, initiatives, and resources to make a difference.
      </Typography>

      <Row className="mt-4">
        <Col md={6} lg={4}>
          <Card className="mb-3">
            <Card.Body>
              <Typography variant="h5" color="primary">Real-Time Environmental Status</Typography>
              <Typography variant="body2" color="textSecondary">Air Quality: Good</Typography>
              <Typography variant="body2" color="textSecondary">Temperature: 25°C</Typography>
              <Typography variant="body2" color="textSecondary">Humidity: 60%</Typography>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="mb-3">
            <Card.Body>
              <Typography variant="h5" color="primary">Featured Articles</Typography>
              <ul>
                <li>10 Ways to Reduce Carbon Footprint</li>
                <li>The Importance of Recycling</li>
                <li>How to Save Water in Daily Life</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="mb-3">
            <Card.Body>
              <Typography variant="h5" color="primary">Upcoming Events</Typography>
              <ul>
                <li>Tree Planting Drive - 15th March</li>
                <li>Beach Cleanup Campaign - 20th March</li>
                <li>Earth Day Awareness Program - 22nd April</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Box textAlign="center" mt={4}>
        <Typography variant="h5" color="primary">Join the Movement</Typography>
        <Typography variant="body1" gutterBottom>
          Become a volunteer and contribute to our environmental initiatives. Together, we can make a difference!
        </Typography>
        <Button variant="contained" color="success">Sign Up Now</Button>
      </Box>
    </Container>
  );
};

export default Homepage;
