
import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container'
import axios from 'axios';
import { ApiContext } from '../../../../Context/ApiContext';
import TablePagination from '@mui/material/TablePagination';
import './BookingList.css'
import { Box } from '@mui/system';


export default function BookingList() {

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

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


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E2E5EB',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
  
    const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  
  
  const { baseUrl, authorization } = useContext(ApiContext);

  const [bookingList, setBookingList] = useState([]);

  const [count , setCount] = useState(0)

  const getBookingList = async () => {
    try {
       let response = await axios.get(`${baseUrl}/admin/booking?page=${page+1}&size=${rowsPerPage}`, {
        headers: authorization,
       })
      console.log(response);
      setBookingList(response.data.data.booking)
      setCount(response.data.data.totalCount)
    } catch (error) {
      console.log(error);
    }
}

  useEffect(() => {
  getBookingList()
  }, [page , rowsPerPage , count])
  
  return (
      <Container  >
      <TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableHead >
          <TableRow  >
            <StyledTableCell  align='center' >User Name</StyledTableCell>
            <StyledTableCell  align='center' >Room</StyledTableCell>
            <StyledTableCell  align='center' >From</StyledTableCell>
            <StyledTableCell  align='center' >To</StyledTableCell>
            <StyledTableCell  align='center' >Tatal Price</StyledTableCell>
            <StyledTableCell  align='center' >Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {bookingList.map((item) => (
            <StyledTableRow  key={item._id} >
              <StyledTableCell align='center'>
                {item.user?.userName}
              </StyledTableCell>
              <StyledTableCell align='center'> {item.room?.roomNumber} </StyledTableCell>
              <StyledTableCell align='center' >{ formatDate(item.startDate) }</StyledTableCell>
              <StyledTableCell align='center' >{ formatDate(item.endDate) }</StyledTableCell>
              <StyledTableCell align='center' >{item.totalPrice}</StyledTableCell>
              <StyledTableCell align='center' >{item.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
        </TableContainer>
        <Box marginY={2} display={'flex'} justifyContent={'center'} sx={{backgroundColor:'lightgrey'}} >
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
