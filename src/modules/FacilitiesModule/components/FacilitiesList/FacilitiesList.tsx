import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Container, IconButton, Menu, MenuItem, Modal } from '@mui/material';
import axios from 'axios';
import { ApiContext } from '../../../../Context/ApiContext';
import { ToastContext } from '../../../../Context/ToastContext';
import './FacilitiesList.css'
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
export default function FacilitiesList() {
  const {baseUrl , authorization } = useContext(ApiContext)
  const [facilitiesList,setFacilitiesList]=useState([])
  const { getToastValue } = useContext(ToastContext)
  const [facilId,setfacilId]=useState(null)
  const [openDelete, setOpenDelete] = React.useState(false);

  const getfacilId = (id)=>{
    setfacilId(id);
    
  }
  const handleOpenDelete = () => {
    setOpenDelete(true)
    handleClose()
  };
  const handleCloseDelete = () => setOpenDelete(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getAdsList = async()=>{
    try{
      const response = await axios.get(`${baseUrl}/admin/room-facilities`,
      {
          headers: authorization
      })
      setFacilitiesList(response.data.data.facilities)
      console.log(response);
    }catch(error){
      getToastValue('error', error.response.data.message)
    }
}

const handelDeleteFacility = async ()=>{
  try {
    const response = await axios.delete(`${baseUrl}/admin/room-facilities/${facilId}`,
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
      <SharedHeader type={'Facilities'} butn={'Facility'}/>

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

          <DeleteData type={'Facility'}/>
          <Button
                            variant="contained"
                            type="submit"
                            color='error'
                            sx={{ marginTop: 4, paddingX: 3}}
                            onClick={handelDeleteFacility}
                        >
                            Delete
                        </Button>
        </Box>
      </Modal>

    <Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Name</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {facilitiesList.map((fac) => (
            <StyledTableRow key={fac._id} >
              <StyledTableCell component="th" scope="row">
                {fac.name}
              </StyledTableCell>
              <StyledTableCell align="center">
              <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={(event)=>{
                        handleClick(event);
                        getfacilId(fac._id);
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
                      <MenuItem onClick={handleClose}><RemoveRedEyeOutlinedIcon sx={{ marginX: 1, color: 'rgba(32, 63, 199, 1)' }} /> View</MenuItem>
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
