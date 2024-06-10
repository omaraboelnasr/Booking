import { Box } from '@mui/material';
import React from 'react';
import deleteImg from '../../../assets/DeleteImg.png'
const DeleteData = ({type}) => {
    return (
        <>
        <Box sx={{textAlign:'center'}}>
            <div>
                <img src={deleteImg} alt="" />
            </div>
            <div>
            <h2>Delete This {type} ?</h2>
            <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
            </div>
            </Box>
        </>
    );
}

export default DeleteData;
