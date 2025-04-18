import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Nav, Navbar } from 'react-bootstrap';


const user=JSON.parse(localStorage.getItem("user"))
const navItems = [
  { path: '/', label: 'Home' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/Treecoverloss', label: 'Treecoverloss' },
  { path: '/Awareness', label: 'Awareness' },
  { path: '/add-polution-complaince', label: 'polution-complaince' },
  
  
  ,
  {path:user?.role === "admin" ? "/admin/dashboard" : user?.role === "envofficer" ? "/environmentofficer/dashboard" :user?.role==="public"? "/dashboard":"/", label:user?"Dashboard":""}  
];



if (user?.role === "admin") {
  
}else{
   navItems.push({ path: '/allquizzes', label: 'Quizzes' })
}

const userName =user?.username 

const CustomNavbar = () => {


  const logout=()=>{
         localStorage.removeItem("user")

         window.location.reload()
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          EcoApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <MenuIcon style={{ color: '#fff' }} />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navItems.map((item) => (
              <Nav.Link as={Link} to={item.path} key={item.path}>
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
          <Box display="flex" alignItems="center">
            {userName ? (
              <>
                <Typography variant="body1" color="white" sx={{ marginRight: 2 }}>
                  Welcome, {userName}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outlined" color="primary" as={Link} to="/login" sx={{ marginRight: 1 }}>
                  Login
                </Button>
                <Button variant="contained" color="success" as={Link} to="/register">
                  Register
                </Button>
              </>
            )}
          </Box>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
