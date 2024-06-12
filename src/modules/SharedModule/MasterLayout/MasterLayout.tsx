import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavBar from '../Navbar/Navbar';
import SideBar from '../Sidebar/Sidebar';

const MasterLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar />
      <SideBar />
      <Container sx={{marginTop:'100px'}}>
      <Outlet />
      </Container>
    </Box>
  );
};

export default MasterLayout;
