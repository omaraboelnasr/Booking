import { aadsList } from './../../../../Interfaces/Interfaces';
import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Container, IconButton, Menu, MenuItem, Modal, Typography } from '@mui/material';
import axios from 'axios';
import { ApiContext } from '../../../../Context/ApiContext';
import { ToastContext } from '../../../../Context/ToastContext';
import './AdsList.css'
import SharedHeader from '../../../SharedModule/sharedHeader/SharedHeader';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Close } from '@mui/icons-material';
import DeleteData from '../../../SharedModule/DeleteData/DeleteData';
import SharedView from '../../../SharedModule/SharedView/SharedView';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgba(226, 229, 235, 1)',
    color: 'black',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};
const styleView = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




export default function AdsList() {
  const {baseUrl , authorization } = useContext(ApiContext)
  const [adsList,setAdsList]=useState([])
  const [adsListDetails,setAdsListDetails]=useState([])

  const { getToastValue } = useContext(ToastContext)
  const [adsId,setAdsId]=useState(null)
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  
  const handleOpenDelete = () => {
    setOpenDelete(true)
    handleClose();
    
  };
  const handleCloseDelete = () => setOpenDelete(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpenView = () => {setOpenView(true);
    getAdsListDetails();
    handleClose();
  }
    const handleCloseView = () => setOpenView(false);
    const getAdsId = (id)=>{
      setAdsId(id);
     
    }
    const handleClose = () => {
      setAnchorEl(null);
    };
  const getAdsList = async()=>{
    try{
      const response = await axios.get(`${baseUrl}/admin/ads`,
      {
          headers: authorization
      })
      setAdsList(response.data.data.ads)
      console.log(response);
    }catch(error){
      getToastValue('error', error.response.data.message)
    }
}
const getAdsListDetails = async()=>{
  try{
    const response = await axios.get(`${baseUrl}/admin/ads/${adsId}`,
    {
        headers: authorization
    })
    
    setAdsListDetails(response.data.data.ads)
    
  }catch(error){
    getToastValue('error', error.response.data.message)
  }
}

const handelDeleteAds = async ()=>{
  try {
    const response = await axios.delete(`${baseUrl}/admin/ads/${adsId}`,
      {
        headers: authorization
      })
      getToastValue('success', response.data.message)
      handleCloseDelete()
      getAdsList()
    
  } catch (error) {
    getToastValue('error', error.response.data.message)
  }
}


useEffect(()=>{
  getAdsList()
},[])
  return (
    <Container>
    
        <SharedHeader type={'Ads'} butn={'Ads'}/>
        <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{display:'flex',justifyContent:'end'}}>
            <IconButton aria-label="" onClick={handleCloseDelete}>
              <Close color='error' sx={{ border: '1px solid', borderRadius: '50%' }}></Close>
            </IconButton>
          </Box>

          <DeleteData type={'Ads'}/>
          <Button
                            variant="contained"
                            type="submit"
                            color='error'
                            sx={{ marginTop: 4, paddingX: 3}}
                            onClick={handelDeleteAds}
                        >
                            Delete
                        </Button>
        </Box>
      </Modal>
      <div>
      
      <Modal
        open={openView}
        onClose={handleCloseView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
          <Box sx={{display:'flex',justifyContent:'end'}}>
            <IconButton aria-label="" onClick={handleCloseView}>
              <Close color='error' sx={{ border: '1px solid', borderRadius: '50%' }}></Close>
            </IconButton>
          </Box>

          <SharedView  adsListDetails={adsListDetails}/>
          </Box>
      </Modal>
    </div>
  
    <Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Room Number</StyledTableCell>
            <StyledTableCell align="center">Image</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Discount</StyledTableCell>
            <StyledTableCell align="center">Capacity</StyledTableCell>
            <StyledTableCell align="center">Active</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adsList.map((ads) => (
            <StyledTableRow key={ads._id} >
              <StyledTableCell component="th" scope="row">
                {ads.room.roomNumber}
              </StyledTableCell>
              <StyledTableCell align="center"><img src={ads.room.images[0]} alt="" width={100} height={100} /></StyledTableCell>
              <StyledTableCell align="center">{ads.room.price}</StyledTableCell>
              <StyledTableCell align="center">{ads.room.discount}</StyledTableCell>
              <StyledTableCell align="center">{ads.room.capacity}</StyledTableCell>
              <StyledTableCell align="center">{ads.isActive?'Yes':'No'}</StyledTableCell>
              <StyledTableCell align="center">
              <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={(event)=>{
                        handleClick(event);
                        getAdsId(ads._id);
                      }}
                      sx={{ fontSize: 25 }}
                    >
                      ...
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={handleOpenView}><RemoveRedEyeOutlinedIcon sx={{ marginX: 1, color: 'rgba(32, 63, 199, 1)' }} /> View</MenuItem>
                      <MenuItem onClick={handleClose}><EditNoteOutlinedIcon sx={{ marginX: 1, color: 'rgba(32, 63, 199, 1)' }} /> Edit</MenuItem>
                      <MenuItem onClick={handleOpenDelete}><DeleteOutlineOutlinedIcon sx={{ marginX: 1, color: 'rgba(32, 63, 199, 1)' }} /> Delete</MenuItem>
                    </Menu>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </Container>
  )
}
