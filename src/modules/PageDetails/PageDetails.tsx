import BedroomParentTwoToneIcon from '@mui/icons-material/BedroomParentTwoTone';
import WifiTwoToneIcon from '@mui/icons-material/WifiTwoTone';
import KitchenTwoToneIcon from '@mui/icons-material/KitchenTwoTone';
import BathtubTwoToneIcon from '@mui/icons-material/BathtubTwoTone';
import RoomServiceTwoToneIcon from '@mui/icons-material/RoomServiceTwoTone';
import TvTwoToneIcon from '@mui/icons-material/TvTwoTone';

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import bigImg from "../../assets/big.png";
import smallImg from "../../assets/small.png";
import smallImg2 from "../../assets/small2.png";
import axios from 'axios';
import { Room, RoomDetailsResponse } from '../../Interfaces/Interfaces';

const PageDetails: React.FC = () => {
  const [room, setRoom] = useState<Room | null>(null);

  

  const getRoomDetails = async () => {
    try {
      const response = await axios.get<RoomDetailsResponse>(`https://upskilling-egypt.com:3000/api/v0/admin/rooms/6666ec2f257b76c4addde0f9`,
        {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwOGUwM2ExNzk0NGVkZmRhMDkzNDUiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxNzYwMzg2NSwiZXhwIjoxNzE4ODEzNDY1fQ.JETcfKU0DVfpS6jVq7Qriq3Qnf8_B539ap3veC2tckk'
          }
        }
      );
      console.log(response.data.data.room);
      setRoom(response.data.data.room);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    getRoomDetails();
  }, []);

  if (!room) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box className="page-details" sx={{ padding: 3 }}>
      <Container>
        <Box className="title" sx={{ marginBottom: 3 }}>
          <Grid container alignItems="center">
            <Grid item xs={12} md={4}>
              <Box className="path">
                <Typography variant="body1" color="textSecondary">
                  Home / <span>Room Details</span>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} container justifyContent="start">
              <Box className="title2" textAlign="center">
                <Typography variant="h3">Village Angga</Typography>
                <Typography variant="body2" color="textSecondary">Bogor, Indonesia</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="images-collection" sx={{ marginBottom: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <Box className="first-img" sx={{ height: '300px' }}>
                <img src={room.images[0] || bigImg} alt="" style={{ width: '100%', height: '100%' }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box className="two-imgs" sx={{ height: '140px' }}>
                    <img src={room.images[1] || smallImg} alt="" style={{ width: '100%', height: '100%' }} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="two-imgs" sx={{ height: '140px' }}>
                    <img src={room.images[2] || smallImg2} alt="" style={{ width: '100%', height: '100%' }} />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box className="content" sx={{ marginBottom: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box className="desc" sx={{ marginBottom: 3, marginRight: 4 }}>
                <Typography variant="body2" color="textSecondary" paragraph>
                Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell. <br /><br /> Such trends saw the demise of the soul-infused techno that typified the original Detroit sound. Robert Hood has noted that he and Daniel Bell both realized something was missing from techno in the post-rave era.<br /><br /> Design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The national agency for design: enabling Singapore to use design for economic growth and to make lives better.
                </Typography>
                <Box className="icons" sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Grid container spacing={1} justifyContent="center">
                    {/* First Row */}
                    <Grid item xs={12} sx={{ margin: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 1 }}>
                          <BedroomParentTwoToneIcon />
                          <Typography variant="body2">Bedroom</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 1 }}>
                          <WifiTwoToneIcon />
                          <Typography variant="body2">1 Wifi</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 1 }}>
                          <BedroomParentTwoToneIcon />
                          <Typography variant="body2"> Living Room</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 1 }}>
                          <BedroomParentTwoToneIcon />
                          <Typography variant="body2"> Living Room</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    {/* Second Row */}
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 1 }}>
                          <KitchenTwoToneIcon />
                          <Typography variant="body2">1 Kitchen</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 1 }}>
                          <BathtubTwoToneIcon />
                          <Typography variant="body2"> Bathroom</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 1 }}>
                          <RoomServiceTwoToneIcon />
                          <Typography variant="body2"> Dining Room</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <TvTwoToneIcon />
                          <Typography variant="body2"> Television</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className="booking-card" elevation={3}
                sx={{
                  padding: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '10px'
                }}>
                <Box className="upper-part" sx={{ marginBottom: 10 }}>
                  <Typography variant="h6">Start Booking</Typography>
                  <Typography variant="h4" color='#1ABC9C'>${room.price} <span color='textSecondary'> per night</span></Typography>
                  <Typography variant="body2" color='#FF1612'>Discount ${room.discount} Off</Typography>
                </Box>
                <Box className="lower-part">
                  <Typography variant="body2" sx={{ marginBottom: 1, fontWeight: 700 }}>Pick a Date</Typography>
                  <TextField type="date" fullWidth sx={{ marginBottom: 2 }} />
                  <Typography variant="body2">You will pay ${room.price *2} USD per 2 person</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" sx={{ marginTop: 2, paddingX: 4 }}>Continue Book</Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <Box className="form" sx={{ display: 'flex', width: '100%', marginBottom: 3, padding: 3, borderRadius: '10px', border: '1px solid #ccc' }}>
          <Grid container spacing={3}>
            {/* Feedback Section */}
            <Grid item xs={12} md={5}>
              <Box className="feedback" sx={{ marginBottom: 3, paddingLeft: 5 }}>
                <Box className="rate" sx={{ marginBottom: 2 }}>
                  <Typography variant="h6">Rate</Typography>
                  <Rating name="rating" />
                </Box>
                <Box className="message">
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>Message</Typography>
                  <TextField
                    name="message"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                    placeholder='type your message..'
                  />
                  <Button sx={{ paddingX: 5 }} variant="contained" color="primary">Rate</Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ width: '1px', height: '200px', backgroundColor: '#203FC7' }}></Box>
            </Grid>
            {/* Comment Section */}
            <Grid item xs={12} md={5}>
              <Box sx={{ borderRadius: '0 10px 10px 0' }}>
                <Typography variant="h6" sx={{ marginBottom: 10 }}>Add Your Comment</Typography>
                <TextField
                  name="comment"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                  placeholder='type your comment..'
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button sx={{ paddingX: 5 }} variant="contained" color="primary">Send</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default PageDetails;
