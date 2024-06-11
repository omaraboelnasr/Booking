

import { Box, padding } from '@mui/system';
import * as React from 'react';

import Button from '@mui/material/Button';
import {Typography} from '@mui/material';
import Modal from '@mui/material/Modal';



export default function SharedView({adsListDetails}) {
   
   
    
        return (
            <Box height={200}  display="flex" justifyContent="space-between" >
            
                <Box paddingRight="10px" >
                    <img src={adsListDetails?.room?.images[0]} alt="room" width={200} height={200} />
                </Box>
                <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Price: {adsListDetails?.room?.price }EGP
              </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Room Number: {adsListDetails?.room?.roomNumber}
              </Typography>
                </Box>
            </Box>
          );
}






 

