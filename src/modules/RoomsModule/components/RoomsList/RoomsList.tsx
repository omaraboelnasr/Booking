import React, { useContext, useEffect, useState } from 'react'
import './RoomsList.css'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Container, IconButton, Menu, MenuItem, Modal, TablePagination, Typography } from '@mui/material';
import axios from 'axios';
import { ApiContext } from '../../../../Context/ApiContext';
import { ToastContext } from '../../../../Context/ToastContext';
import SharedHeader from '../../../SharedModule/sharedHeader/SharedHeader';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Close } from '@mui/icons-material';
import DeleteData from '../../../SharedModule/DeleteData/DeleteData';
import { ToastContainer } from 'react-toastify';
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


export default function RoomsList() {
  const { baseUrl, authorization } = useContext(ApiContext)
  const [roomsList, setRoomsList] = useState([])
  const { getToastValue } = useContext(ToastContext)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0)
  const [roomId,setRoomId]=useState(null)
  const [openDelete, setOpenDelete] = React.useState(false);

  const getRoomId = (id)=>{
    setRoomId(id);
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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getRoomsList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin/rooms?page=${page + 1}&size=${rowsPerPage}`,
        {
          headers: authorization
        })
        console.log(response);
      setRoomsList(response.data.data.rooms)
      setCount(response.data.data.totalCount)
    } catch (error) {
      getToastValue('error', error.response.data.message)
    }
  }

  const handelDeleteRoom = async ()=>{
    try {
      const response = await axios.delete(`${baseUrl}/admin/rooms/${roomId}`,
        {
          headers: authorization
        })
        getToastValue('success', response.data.message)
        handleCloseDelete()
        getRoomsList()
      
    } catch (error) {
      getToastValue('error', error.response.data.message)
    }
  }
  useEffect(() => {
    getRoomsList()
  }, [page, rowsPerPage, count])

  return (
    <Container>
        <SharedHeader type={'Rooms'} butn={'Room'} />

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

          <DeleteData type={'Room'}/>
          <Button
                            variant="contained"
                            type="submit"
                            color='error'
                            sx={{ marginTop: 4, paddingX: 3}}
                            onClick={handelDeleteRoom}
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
                <StyledTableCell >Room Number</StyledTableCell>
                <StyledTableCell align="center">Image</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Discount</StyledTableCell>
                <StyledTableCell align="center">Capacity</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomsList.map((room) => (
                <StyledTableRow key={room._id} >
                  <StyledTableCell component="th" scope="row">
                    {room.roomNumber}
                  </StyledTableCell>
                  <StyledTableCell align="center"><img src={room.images[0]} alt="" width={100} height={100} /></StyledTableCell>
                  <StyledTableCell align="center">{room.price}</StyledTableCell>
                  <StyledTableCell align="center">{room.discount}</StyledTableCell>
                  <StyledTableCell align="center">{room.capacity}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={(event)=>{
                        handleClick(event);
                        getRoomId(room._id);
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

      <Box marginY={2} display={'flex'} justifyContent={'center'} sx={{ backgroundColor: 'lightgrey' }} >
        <TablePagination
          component="div"
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  )
}
