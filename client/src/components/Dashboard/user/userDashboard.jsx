
import Notifications from '../Notifications';
import AirQuality from '../../EnvironmentalData/AirQuality';

import ReportIncident from '../../IncidentReporting/ReportIncident';
import IncidentList from '../../IncidentReporting/IncidentList';
import WasteSchedule from '../../WasteManagement/WasteSchedule';
import RecyclingCenters from '../../WasteManagement/RecyclingCenters';
import Parks from '../../ResourceManagement/Parks';

import TreePlanting from '../../GreenInitiatives/TreePlanting';

import Articles from '../../AwarenessCampaigns/Articles';
import Videos from '../../AwarenessCampaigns/Videos';
import Quizzes from '../../AwarenessCampaigns/Quizzes';
// import Analytics from '../dashboard/Analytics';
// import Notifications from '../dashboard/Notifications';
// import Overview from '../dashboard/Overview';
// import AirQuality from '../dashboard/AirQuality';
// import WaterQuality from '../dashboard/WaterQuality';
// import NoisePollution from '../dashboard/NoisePollution';
// import ReportIncident from '../dashboard/ReportIncident';
// import IncidentList from '../dashboard/IncidentList';
// import WasteSchedule from '../dashboard/WasteSchedule';
// import RecyclingCenters from '../dashboard/RecyclingCenters';
// import Parks from '../dashboard/Parks';
// import WaterBodies from '../dashboard/WaterBodies';
// import TreePlanting from '../dashboard/TreePlanting';
// import CleanUpCampaigns from '../dashboard/CleanUpCampaigns';
// import Articles from '../dashboard/Articles';
// import Videos from '../dashboard/Videos';
// import Quizzes from '../dashboard/Quizzes';





import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import MultiLocationAQI from '../../EnvironmentalData/Multilocation';
import WaterBodies from '../../ResourceManagement/ForestResources';
import ForestResources from '../../ResourceManagement/ForestResources';
import UserResourcePage from '../../ResourceManagement/userresourcepage';
import PollutionComplianceForm from '../../pollutionControll/AddComplaince';
import GreenInitiativeList from '../../GreenInitiatives/greenInitativelist';


const UserDashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState(<AirQuality />);

    const menuItems = [
        { text: 'Notifications', component: <Notifications /> },
        { text: 'Air Quality', component: <AirQuality /> },//MultiLocationAQI4
        { text: 'MultiLocationAQI4', component: <MultiLocationAQI /> },
        { text: 'Report Incident', component: <ReportIncident /> },
        { text: 'Incident List', component: <IncidentList /> },
        { text: 'Forests', component: <ForestResources /> },//add-polution-complaince green-initiative-list
        { text: 'add-polution-complaince', component: <PollutionComplianceForm /> },
        { text: 'green-initiatives', component: <GreenInitiativeList /> },
        { text: 'Recycling Centers', component: <RecyclingCenters /> },
        { text: 'Parks', component: <Parks /> },
        { text: 'Articles', component: <Articles /> },
        { text: 'Videos', component: <Videos /> },
        { text: 'Resource', component: <UserResourcePage /> }
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

export default UserDashboard;




