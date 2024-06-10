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
import { Box, Container } from '@mui/material';
import axios from 'axios';
import { ApiContext } from '../../../../Context/ApiContext';
import { ToastContext } from '../../../../Context/ToastContext';
import Pagination from '@mui/material/Pagination';

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


export default function RoomsList() {
  const {baseUrl , authorization } = useContext(ApiContext)
  const [roomsList,setRoomsList]=useState([])
  const { getToastValue } = useContext(ToastContext)
  const pageSize = 10
  const [pageNumber,setPageNumber]=useState(1)
  const [pagination,setPagination]=useState({
    count:0,
  })
  const getRoomsList = async()=>{
      try{
        const response = await axios.get(`${baseUrl}/admin/rooms?page=${pageNumber}&size=${pageSize}`,
        {
            headers: authorization
        })
        setRoomsList(response.data.data.rooms)
        setPagination({...pagination,count:response.data.data.totalCount})
        console.log(response);
      }catch(error){
        getToastValue('error', error.response.data.message)
      }
  }

  const handelChangePage = (event,page)=>{
    setPageNumber(page)
    getRoomsList()
  }
  useEffect(()=>{
    getRoomsList()
  },[])

  return (
    <Container>
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
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>

    <Box sx={{marginBottom:5,marginTop:5,display:"flex",justifyContent:'center'}}>
      <Pagination count={Math.ceil(pagination.count / pageSize)} shape="rounded" onChange={handelChangePage}/>
    </Box>
    </Container>
  )
}
