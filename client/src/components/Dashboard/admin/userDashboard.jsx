
import Notifications from '../Notifications';
import AirQuality from '../../EnvironmentalData/AirQuality';
import ReportIncident from '../../IncidentReporting/ReportIncident';
import RecyclingCenters from '../../WasteManagement/RecyclingCenters';
import Parks from '../../ResourceManagement/Parks';
import Articles from '../../AwarenessCampaigns/Articles';
import Videos from '../../AwarenessCampaigns/Videos';
import Quizzes from '../../AwarenessCampaigns/Quizzes';
import React, { useState } from 'react';
import { Container,  Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import MultiLocationAQI from '../../EnvironmentalData/Multilocation';
import EnvUpdateIncident from '../../IncidentReporting/envupdateIncidents';


const AdminDashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState(<AirQuality />);

    const menuItems = [
        { text: 'Notifications', component: <Notifications /> },
        { text: 'Air Quality', component: <AirQuality /> },//MultiLocationAQI4
        { text: 'MultiLocationAQI4', component: <MultiLocationAQI /> },
        { text: 'Report Incident', component: <ReportIncident /> },
        { text: 'Incident List', component: <EnvUpdateIncident /> },
        { text: 'Recycling Centers', component: <RecyclingCenters /> },
        { text: 'Parks', component: <Parks /> },
        { text: 'Articles', component: <Articles /> },
        { text: 'Videos', component: <Videos /> },
        { text: 'Quizzes', component: <Quizzes /> }
    ];

    return (
        <Container fluid>
           
            <Row>
                <Col md={2} className="p-0">
                    <Drawer variant="permanent" anchor="left" style={{ width: '240px' }}>
                        <List>
                            {menuItems.map((item) => (
                                <ListItem button key={item.text} onClick={() => setSelectedComponent(item.component)}>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </Col>
                <Col md={10} className="p-4">
                    <Box>{selectedComponent}</Box>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;




