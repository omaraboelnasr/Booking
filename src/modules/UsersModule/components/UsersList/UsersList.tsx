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
import './UsersList.css'
import { Box } from '@mui/system';
import { IconButton, Modal, Typography } from '@mui/material';
import { AccountCircle, AdminPanelSettings, Close, DateRange, Grid3x3, Smartphone, VisibilityOutlined } from '@mui/icons-material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5,
};

export default function UsersList() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    getUserDetails(id)
  }

  const handleClose = () => setOpen(false);

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


  const { baseUrl, authorization } = useContext(ApiContext);

  const [users, setUsers] = useState([]);

  const [userDetails, setUserDetails] = useState([]);

  const [count, setCount] = useState(0)

  const getUsers = async () => {
    try {
      let response = await axios.get(`${baseUrl}/admin/users?page=${page + 1}&size=${rowsPerPage}`, {
        headers: authorization,
      })
      setUsers(response.data.data.users)
      setCount(response.data.data.totalCount)
    } catch (error) {
      console.log(error);
    }
  }

  const getUserDetails = async (id) => {
    try {
      let response = await axios.get(`${baseUrl}/admin/users/${id}`, {
        headers: authorization,
      })
      setUserDetails(response.data.data.user)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    getUsers()
  }, [page, rowsPerPage, count])

  return (
    <>
      <Container sx={{ width: "80%" }} >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography id="modal-modal-title" variant="h4" sx={{ color: '#203FC7' }} >
                User Details
              </Typography>
              <IconButton aria-label="" onClick={handleClose}>
                <Close color='error' sx={{ border: '1px solid', borderRadius: '50%' }}></Close>
              </IconButton>
            </Box>

            <Box border={'1px solid #203FC7'} borderRadius={"30px"} marginY={3} padding={2} >
              {userDetails ? <Box sx={{ color: 'InfoText' }} >
                <Typography variant="h4" display={'flex'} alignItems={'center'}   >
                  <AccountCircle sx={{ color: '#203FC7', fontSize: '50px', paddingRight: '8px' }} ></AccountCircle>
                  {userDetails.userName}
                </Typography>
                <Typography variant="h4" display={'flex'} alignItems={'center'}>
                  <Smartphone sx={{ color: '#203FC7', fontSize: '50px', paddingRight: '8px' }}></Smartphone>
                  0{userDetails.phoneNumber}
                </Typography>
                <Typography variant="h4" display={'flex'} alignItems={'center'}>
                  <Grid3x3 sx={{ color: '#203FC7', fontSize: '50px', paddingRight: '8px' }}></Grid3x3>
                  {userDetails._id}
                </Typography>
                <Typography variant="h4" display={'flex'} alignItems={'center'}>
                  <AdminPanelSettings sx={{ color: '#203FC7', fontSize: '50px', paddingRight: '8px' }}></AdminPanelSettings>
                  {userDetails.role}
                </Typography>
                <Typography variant="h4" display={'flex'} alignItems={'center'}>
                  <DateRange sx={{ color: '#203FC7', fontSize: '50px', paddingRight: '8px' }}></DateRange>
                  {formatDate(userDetails.createdAt)}
                </Typography>
              </Box> : ''}
            </Box>
          </Box>
        </Modal>

        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead >
              <TableRow  >
                <StyledTableCell align='center' >Name</StyledTableCell>
                <StyledTableCell align='center' >Image</StyledTableCell>
                <StyledTableCell align='center' >Email</StyledTableCell>
                <StyledTableCell align='center' >Country</StyledTableCell>
                <StyledTableCell align='center' >Role</StyledTableCell>
                <StyledTableCell align='center' >Details</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {users.map((user) => (
                <StyledTableRow key={user._id} >
                  <StyledTableCell align='center'>
                    {user.userName}
                  </StyledTableCell>
                  <StyledTableCell align='center'> <img className='iiiii' src={user.profileImage} alt="" /> </StyledTableCell>
                  <StyledTableCell align='center' >{user.email}</StyledTableCell>
                  <StyledTableCell align='center' >{user.country}</StyledTableCell>
                  <StyledTableCell align='center' >{user.role}</StyledTableCell>
                  <StyledTableCell align='center' onClick={() => handleOpen(user._id)} ><VisibilityOutlined color='primary' sx={{ cursor: 'pointer' }}></VisibilityOutlined> </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
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
    </>
  )
}


