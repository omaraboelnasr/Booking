import React, { useContext, useEffect, useState } from 'react'
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
import './AdsList.css'

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

export default function AdsList() {
  const {baseUrl , authorization } = useContext(ApiContext)
  const [adsList,setAdsList]=useState([])
  const { getToastValue } = useContext(ToastContext)

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


useEffect(()=>{
  getAdsList()
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
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </Container>
  )
}
