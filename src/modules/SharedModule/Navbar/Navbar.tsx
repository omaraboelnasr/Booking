import NotificationsIcon from '@mui/icons-material/Notifications';
import { AppBar, Avatar, Badge, Box, IconButton, InputBase, Toolbar, Typography } from '@mui/material';
import { alpha, styled } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import ProfileImg from '../../../assets/avatar.png';
import { UserInfoContext } from '../../../Context/UserInfoContext';
import './Navbar.css'



const Navbar: React.FC = () => {

  const { userInfoData} = useContext(UserInfoContext);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#F8F9FB', borderBottom: '1px solid #ccc' }}>
      <Toolbar sx={{ minHeight: '60px' }}>
        <Box sx={{ flexGrow: 1 }} /> {/* This will push the items to the right */}
        {userInfoData&&<Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="Profile Picture" src={userInfoData?.profileImage || ProfileImg} />
          <Typography variant="body1" sx={{ marginLeft: 2, color: '#000000' }}>
            Hello {userInfoData?.userName}
          </Typography>
        </Box>}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
