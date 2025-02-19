import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Homepage from './page/home';

import 'bootstrap/dist/css/bootstrap.min.css';





// Admin & Officer Registration
import EnvOfficeRegister from './components/Auth/envOffficer/envofficer';
import AdminRegister from './components/Auth/admin/adminregister';

import UserDashboard from './components/Dashboard/user/userDashboard';
import EnvDashboard from './components/Dashboard/envofficeDas/userDashboard';
import AdminDashboard from './components/Dashboard/admin/userDashboard';
import CustomNavbar from './components/Navbar/Navbar';

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


        {/* Environmental Officer Routes */}
        <Route path="/environmentofficer">
          <Route path="register" element={<EnvOfficeRegister />} />
          <Route path="dashboard" element={<EnvDashboard />} />
         
        
        </Route>

        {/* Admin Routes */}
        <Route path="/admin">
          <Route path="register" element={<AdminRegister />} />
          <Route path="dashboard" element={<AdminDashboard />} />

         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
