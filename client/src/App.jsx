import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Homepage from './page/home';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'

// Admin & Officer Registration
import EnvOfficeRegister from './components/Auth/envOffficer/envofficer';
import AdminRegister from './components/Auth/admin/adminregister';

import UserDashboard from './components/Dashboard/user/userDashboard';
import EnvDashboard from './components/Dashboard/envofficeDas/userDashboard';
import AdminDashboard from './components/Dashboard/admin/userDashboard';
import CustomNavbar from './components/Navbar/Navbar';

import MainWeather from './components/weather/api/Main';

import TreeCoverLossModule from './components/greenInitative/treelast';
import EnvironmentalDashboard from './components/EnvironmentNews/environmentnews';
import AdminAddQuiz from './components/quize/quizeadmin';
import TakeQuiz from './components/quize/usertakequize';
import AllQuizzes from './components/quize/allQizes';
import PollutionComplianceForm from './components/pollutionControll/AddComplaince';
import PollutionComplianceTable from './components/pollutionControll/viewandupdate';
import GreenInitiativeForm from './components/GreenInitiatives/GreenInitiativeForm';
import GreenInitiativeList from './components/GreenInitiatives/greenInitativelist';
import AdminInitiativePage from './components/GreenInitiatives/AdminGreenIniativepage';



function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="/analytics" element={<MainWeather />} />
        <Route path="/allquizzes" element={<AllQuizzes />} />
        <Route path="takequiz/:id" element={<TakeQuiz />} /> 

        {/* Environmental Officer Routes */}
        <Route path="/environmentofficer">
          <Route path="register" element={<EnvOfficeRegister />} />
          <Route path="dashboard" element={<EnvDashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin">
          <Route path="register" element={<AdminRegister />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="addquiz" element={<AdminAddQuiz />} />          
        </Route>

        <Route path="Awareness" element={<EnvironmentalDashboard />} />
        <Route path="Treecoverloss" element={<TreeCoverLossModule/>}/>  
        
        <Route path="/add-polution-complaince" element={<PollutionComplianceForm />} />
        <Route path="/polution-complaince" element={<PollutionComplianceTable />} />

        <Route path="/add-green-initiative" element={<GreenInitiativeForm />} />
        <Route path="/green-initiative-list" element={<GreenInitiativeList />} />

        <Route path="/AdminInitiativePage" element={<AdminInitiativePage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
