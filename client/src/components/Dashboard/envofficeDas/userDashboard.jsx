
import Notifications from '../Notifications';
import AirQuality from '../../EnvironmentalData/AirQuality';

import ReportIncident from '../../IncidentReporting/ReportIncident';
import IncidentList from '../../IncidentReporting/IncidentList';







import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import MultiLocationAQI from '../../EnvironmentalData/Multilocation';
import EnvUpdateIncident from '../../IncidentReporting/envupdateIncidents';
import OfficerResourcePage from '../../ResourceManagement/offiecerResourcepage';
import AdminAddQuiz from '../../quize/quizeadmin';


const EnvDashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState(<AirQuality />);

    const menuItems = [
        { text: 'Notifications', component: <Notifications /> },
        { text: 'Air Quality', component: <AirQuality /> },//MultiLocationAQI4
        { text: 'MultiLocationAQI4', component: <MultiLocationAQI /> },
        { text: 'Incident List', component: <EnvUpdateIncident /> },
        { text: 'Resource Management', component: <OfficerResourcePage /> },
        { text: 'Add Quizes ', component: <AdminAddQuiz /> }];

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

export default EnvDashboard;




