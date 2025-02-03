import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Analytics from './components/Dashboard/Analytics';
import Notifications from './components/Dashboard/Notifications';
import Overview from './components/Dashboard/Overview';
import AirQuality from './components/EnvironmentalData/AirQuality';
import WaterQuality from './components/EnvironmentalData/WaterQuality';
import NoisePollution from './components/EnvironmentalData/NoisePollution';
import ReportIncident from './components/IncidentReporting/ReportIncident';
import IncidentList from './components/IncidentReporting/IncidentList';
import WasteSchedule from './components/WasteManagement/WasteSchedule';
import RecyclingCenters from './components/WasteManagement/RecyclingCenters';
import Parks from './components/ResourceManagement/Parks';
import WaterBodies from './components/ResourceManagement/WaterBodies';
import TreePlanting from './components/GreenInitiatives/TreePlanting';
import CleanUpCampaigns from './components/GreenInitiatives/CleanUpCampaigns';
import Articles from './components/AwarenessCampaigns/Articles';
import Videos from './components/AwarenessCampaigns/Videos';
import Quizzes from './components/AwarenessCampaigns/Quizzes';

import Homepage from './page/home';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      {/* <Switch> */}
      <Navbar />
    
<Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="/notifications" element={<Notifications/>} />
        <Route path="/overview" element={<Overview/>} />
        <Route path="/air-quality" element={<AirQuality/>} />
        <Route path="/water-quality" element={<WaterQuality/>} />
        <Route path="/noise-pollution" element={<NoisePollution/>} />
        <Route path="/report-incident" element={<ReportIncident/>} />

{/* admin  */}

        <Route path="/incident-list" element={<IncidentList/>} />
        <Route path="/waste-schedule" element={<WasteSchedule/>} />
        <Route path="/recycling-centers" element={<RecyclingCenters/>} />
        <Route path="/parks" element={<Parks/>} />
        <Route path="/water-bodies" element={<WaterBodies/>} />
        <Route path="/tree-planting" element={<TreePlanting/>} />
        <Route path="/clean-up-campaigns" element={<CleanUpCampaigns/>} />


        <Route path="/articles" element={<Articles/>} />
        <Route path="/videos" element={<Videos/>} />
        <Route path="/quizzes" element={<Quizzes/>} />
      {/* </Switch> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;