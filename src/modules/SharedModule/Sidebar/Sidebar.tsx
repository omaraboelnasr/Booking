import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import LockIcon from '@mui/icons-material/Lock';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TableChartIcon from '@mui/icons-material/TableChart';
import WifiIcon from '@mui/icons-material/Wifi';
import { AuthContext } from '../../../Context/AuthContext';


const drawerWidth = 240;

const SideBar: React.FC = () => {
  const { loginData } = useContext(AuthContext);

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

 
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>

      <Drawer
        variant="permanent"
        sx={{
          width: collapsed ? 72 : drawerWidth,
          flexShrink: 0,
          
          '& .MuiDrawer-paper': {
            width: collapsed ? 70 : drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <List>
          <ListItem button onClick={toggleCollapse}>
            {!collapsed && <ListItemText primary="Menu" />}
            <IconButton edge="end" color="inherit" onClick={toggleCollapse}>
              <MenuIcon />
            </IconButton>
          </ListItem>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Home" />}
          </ListItem>
          {loginData?.role === 'admin' && (
            <ListItem button component={Link} to="/dashboard/users">
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Users" />}
            </ListItem>
          )}
          <ListItem button component={Link} to="/dashboard/rooms">
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Rooms" />}
          </ListItem>
          {loginData?.role === 'admin' && (
            <ListItem button component={Link} to="/dashboard/ads">
              <ListItemIcon>
                <BedroomParentIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Ads" />}
            </ListItem>
          )}
          {loginData?.role === 'admin' && (
            <ListItem button component={Link} to="/dashboard/booking-list">
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Bookings" />}
            </ListItem>
          )}
          {loginData?.role === 'admin' && (
            <ListItem button component={Link} to="/dashboard/facilities">
              <ListItemIcon>
                <WifiIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Facilities" />}
            </ListItem>
          )}
           <ListItem button component={Link} to="/change-pass">
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Change Password" />}
            </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Logout" color="primary" />}
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default SideBar;
