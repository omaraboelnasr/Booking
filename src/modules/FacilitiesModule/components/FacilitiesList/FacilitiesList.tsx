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
import './FacilitiesList.css'
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

export default function FacilitiesList() {
  const {baseUrl , authorization } = useContext(ApiContext)
  const [facilitiesList,setFacilitiesList]=useState([])
  const { getToastValue } = useContext(ToastContext)

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
