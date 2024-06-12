import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavBar from '../Navbar/Navbar';
import SideBar from '../Sidebar/Sidebar';

const MasterLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <NavBar />

      <SideBar />
      <Box component="main" >
        <div style={{ marginTop: '100px' }}> 
          <Outlet />
        </div>
      </Box>
    </Box>
  );
};

export default MasterLayout;
