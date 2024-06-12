import NotificationsIcon from '@mui/icons-material/Notifications';
import { AppBar, Avatar, Badge, Box, IconButton, InputBase, Toolbar, Typography } from '@mui/material';
import { alpha, styled } from '@mui/system';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import ProfileImg from '../../../assets/avatar.png';



const Navbar: React.FC = () => {
  const { loginData } = useContext(AuthContext);
 
  

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
   
    backgroundColor: alpha(theme.palette.common.white, 1), // Set background to white
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.95),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(0),
      width: '50%', // Adjusted to occupy half the width of the navbar
    },
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', // Optional: add some shadow for better visibility
    height: '40px', // Increase the height of the search input
  }));
 
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft:theme.spacing(2),
      width: '100%',
      backgroundColor: '#fff', // Ensure the input field has a white background
  
      '&::placeholder': {
        color: theme.palette.text.secondary, // Set placeholder color to muted (text secondary)
      },
      height: '40px', // Match the height of the search input
      boxSizing: 'border-box',
    },
  }));

  return (
    <AppBar  position="fixed" sx={{ backgroundColor: '#F8F9FB', borderBottom: '1px solid #ccc' }}>
      <Toolbar sx={{ minHeight: '60px' }}>
      <Search>
       
          <StyledInputBase
            placeholder="Search Here…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} /> {/* This will push the items to the right */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="Profile Picture" src={loginData?.profileImage || ProfileImg} />
          <Typography variant="body1" sx={{ marginLeft: 2, color: '#000000' }}>
            Hello {loginData?.userName}
          </Typography>
        </Box>
        <IconButton sx={{ color: '#000000', marginLeft: 1 }}> {/* Set color to black */}
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
``
