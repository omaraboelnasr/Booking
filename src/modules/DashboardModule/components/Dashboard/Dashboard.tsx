import React, { useContext, useEffect, useState } from 'react'
import './Dashboard.css'
import { Box, Container } from '@mui/system'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { VideoLabel } from '@mui/icons-material'
import { ApiContext } from '../../../../Context/ApiContext'
import axios from 'axios'
import { PieChart , pieArcLabelClasses } from '@mui/x-charts/PieChart';



export default function Dashboard() {

  const { baseUrl, authorization } = useContext(ApiContext);

  
  const [charts, setCharts] = useState([]);

  const getCharts = async () => {
    try {
       let response = await axios.get(`${baseUrl}/admin/dashboard`, {
        headers: authorization,
       })
      setCharts(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const data = [
  { value: charts?.bookings?.completed, label: 'Completed' , color:'#639cd9' },
  { value: charts?.bookings?.pending, label: 'Pending' , color:'#220e24' },
  ];
  
  const data2 = [
  { value: charts?.users?.admin, label: 'Admins' , color:'#5454c5' },
  { value: charts?.users?.user, label: 'Users' , color:'#342056' },
];

const size = {
  width: 450,
  height: 250,
  };
  


  useEffect(() => {
  getCharts()
  }, [])

  return (
    <>
      <Box component={Container} paddingX={5} >
        <Grid container display={'flex'} justifyContent={'space-between'} >
          <Grid sm={3} display={'flex'} justifyContent={'space-between'} alignItems={'center'} paddingX={3} paddingY={5} sx={{ backgroundColor:'#1A1B1E' , borderRadius:'15px'  }}>
            <Box>
              <Typography variant="h5" color="white">
                {charts.rooms}
              </Typography>
              <Typography variant="h5" color="lightgray">
                Rooms
              </Typography>
            </Box>
            <Box className='dash-icon'>
           <VideoLabel fontSize='large' ></VideoLabel>
            </Box>
          </Grid>
          <Grid sm={3}  display={'flex'} justifyContent={'space-between'} alignItems={'center'} paddingX={3} paddingY={5} sx={{ backgroundColor:'#1A1B1E' , borderRadius:'15px'  }}>
            <Box>
              <Typography variant="h5" color="white">
                {charts.facilities}
              </Typography>
              <Typography variant="h5" color="lightgray">
                Facilities
              </Typography>
            </Box>
              <Box className='dash-icon'>
           <VideoLabel fontSize='large' ></VideoLabel>
            </Box>
          </Grid>
          <Grid sm={3}  display={'flex'} justifyContent={'space-between'} alignItems={'center'} paddingX={3} paddingY={5} sx={{ backgroundColor:'#1A1B1E' , borderRadius:'15px'  }}>
        <Box>
              <Typography variant="h5" color="white">
                {charts.ads}
              </Typography>
              <Typography variant="h5" color="lightgray">
                Ads
              </Typography>
            </Box>
              <Box className='dash-icon'>
           <VideoLabel fontSize='large' ></VideoLabel>
            </Box>
         </Grid>
        </Grid>
        
        <Box display={'flex'} justifyContent={'space-around'} marginY={5}  >
          
          <Box>
       <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 100,
          data,
          innerRadius: 40,
          outerRadius: 125,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'light',
        }
      }}
      {...size}
    />
          </Box>
          
          <Box >
          <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 100,
          data: data2,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'light',
        },
      }}
      {...size }
          />       
         </Box>

        </Box>
      </Box>
    </>
  )
}
