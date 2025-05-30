
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
import AdminResourcePage from '../../ResourceManagement/AdminResourcepage';
import ForestResources from '../../ResourceManagement/ForestResources';
import AdminInitiativePage from '../../GreenInitiatives/AdminGreenIniativepage';
import GreenInitiativeForm from '../../GreenInitiatives/GreenInitiativeForm';
import PollutionComplianceTable from '../../pollutionControll/viewandupdate';
import AdminAddQuiz from '../../quize/quizeadmin';


const AdminDashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState(<AirQuality />);

    const menuItems = [
        { text: 'Air Quality', component: <AirQuality /> },//AdminResourcePage
        { text: 'MultiLocationAQI4', component: <MultiLocationAQI /> },
        { text: 'Report Incident', component: <ReportIncident /> },
        { text: 'Incident List', component: <EnvUpdateIncident /> },
        { text: 'Resource management', component: <AdminResourcePage /> },
        { text: 'GreenInitiativePage', component: <AdminInitiativePage /> },
        { text: 'polution-complaince', component: <PollutionComplianceTable /> },
        { text: 'AddGreenInitiative', component: <GreenInitiativeForm /> },
        { text: 'Parks', component: <Parks /> },
        { text: 'Forests', component: <ForestResources /> },
        { text: 'Videos', component: <Videos /> },
        { text: 'Add Quizes ', component: <AdminAddQuiz /> }
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




