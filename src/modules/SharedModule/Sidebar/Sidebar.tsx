import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
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

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const SideBar: React.FC = () => {
  const { loginData } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };


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
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent" open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <List>

          <ListItem disablePadding sx={{ display: 'block' }} component={Link} to="/dashboard">
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>




          {loginData?.role === 'admin' && (
            <ListItem disablePadding sx={{ display: 'block' }} component={Link} to="/dashboard/users">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary={'Users'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          )}




          <ListItem disablePadding sx={{ display: 'block' }} component={Link} to="/dashboard/rooms">
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText primary={'Rooms'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>



          {loginData?.role === 'admin' && (
            <ListItem disablePadding sx={{ display: 'block' }} component={Link} to="/dashboard/ads">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <BedroomParentIcon />
                </ListItemIcon>
                <ListItemText primary={'Ads'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          )}


          {loginData?.role === 'admin' && (
            <ListItem disablePadding sx={{ display: 'block' }} component={Link} to="/dashboard/booking-list">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <BedroomParentIcon />
                </ListItemIcon>
                <ListItemText primary={'Bookings'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          )}



          {loginData?.role === 'admin' && (
            <ListItem disablePadding sx={{ display: 'block' }} component={Link} to="/dashboard/facilities">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <BedroomParentIcon />
                </ListItemIcon>
                <ListItemText primary={'Facilities'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          )}

          <ListItem disablePadding sx={{ display: 'block' }} onClick={handleLogout}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
