import React, { useContext, useEffect, useState } from 'react';
import { Alert, Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../../../Context/ApiContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Close } from '@mui/icons-material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 5,
};

const SharedHeader = ({ type, butn }) => {
    const { baseUrl, authorization } = useContext(ApiContext);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [rooms, setRooms] = useState([])
    const [selectedNames, setSelectedNames] = useState([]);
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [openAds, setOpenAds] = useState(false);
    const navigate = useNavigate()
    const handleOpen = () => {
        setOpen(true);
        setValue('name', '')
    }
    const handleClose = () => setOpen(false);
    const handleOpenAds = () => {
        setOpenAds(true)
        setValue('discount', '')
    };
    const handleCloseAds = () => setOpenAds(false);

    const getRooms = async () => {
        try {
            let response = await axios.get(`${baseUrl}/admin/rooms`, {
                headers: authorization,
            })
            setRooms(response.data.data.rooms)
        } catch (error) {
            console.log(error);
        }
    }

    const handelAddFacility = async(data)=>{
        try {
            let response = await axios.post(`${baseUrl}/admin/room-facilities`, data, {
                headers: authorization,
            })
            toast.success(response.data.message, {
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: false
            });
            handleClose()
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: false
            });
        }
    }
    const onSubmit = async (data) => {
            data.isActive = !!active;
            try {
                let response = await axios.post(`${baseUrl}/admin/ads`, data, {
                    headers:authorization,
                })
                toast.success(response.data.message, {
                    autoClose: 3000,
                    hideProgressBar: true,
                    pauseOnHover: false
                });
                handleCloseAds()
            } catch (error) {
                toast.error(error.response.data.message, {
                    autoClose: 3000,
                    hideProgressBar: true,
                    pauseOnHover: false
                });
            }
    }
    
    const handelAdd = () => {
        if (type === 'Rooms') {
            navigate('/dashboard/add-room')
        } else if (type === 'Facilities') {
            handleOpen()
        } else {
            handleOpenAds()
        }
    }

    useEffect(() => {
        getRooms()
    }, [])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <Box>
                <Typography variant='h4'>{type} Table Details</Typography>
                <Typography variant='h6'>You can check all details</Typography>
            </Box>
            <Box>
                <Button variant="contained" size="large" onClick={handelAdd}>Add New {butn}</Button>
            </Box>
            
            {type==="Facilities"&&<Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography id="modal-modal-title" variant="h4" >
                            Add Facility
                        </Typography>
                        <IconButton aria-label="" onClick={handleClose}>
                            <Close color='error' sx={{ border: '1px solid', borderRadius: '50%' }}></Close>
                        </IconButton>
                    </Box>

                    <Box
                        component="form"
                        textAlign={'end'}
                        onSubmit={handleSubmit(handelAddFacility)}
                    >
                        <TextField
                            type="text"
                            sx={{
                                marginY: 5,
                                width: "100%",
                                backgroundColor: "whitesmoke",
                            }}
                            placeholder="Facility Name"
                            {...register("name", { required: 'Facility Name Is Required' })}
                        />
                        {errors.name && <Alert icon={<Error fontSize="inherit" />} severity="error">
                            {errors.name.message}
                        </Alert>}
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ marginTop: 4, paddingX: 3 }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>}
            
            {type==="Ads"&&<Modal
                open={openAds}
                onClose={handleCloseAds}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography id="modal-modal-title" variant="h3"  >
                            Ads
                        </Typography>
                        <IconButton aria-label="" onClick={handleCloseAds}>
                            <Close color='error' sx={{ border: '1px solid', borderRadius: '50%' }}></Close>
                        </IconButton>
                    </Box>

                    <Box
                        component="form"
                        textAlign={'end'}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FormControl
                            sx={{
                                marginY: 2,
                                width: "100%",
                                backgroundColor: "whitesmoke",
                            }}
                        >
                            <InputLabel id="demo-simple-select-label">Room Name</InputLabel>
                            <Select
                                {...register("room", { required: 'Room Is Required' })}
                                value={selectedNames}
                                label="Room Name"
                                onChange={(e) => setSelectedNames(e.target.value)}
                            >
                                {rooms.map((room) => (
                                    <MenuItem key={room._id} value={room._id}>
                                        {room.roomNumber}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {errors.room && <Alert icon={<Error fontSize="inherit" />} severity="error">
                            {errors.room.message}
                        </Alert>}
                        <TextField

                            type="number"
                            sx={{
                                width: "100%",
                                backgroundColor: "whitesmoke",
                                marginY: 1
                            }}
                            placeholder='Discount'
                            {...register("discount", { required: 'Discount Is Required' })}
                        />
                        {errors.discount && <Alert icon={<Error fontSize="inherit" />} severity="error">
                            {errors.discount.message}
                        </Alert>}
                        <FormControl sx={{
                            marginY: 2,
                            width: "100%",
                            backgroundColor: "whitesmoke",
                        }}>
                            <InputLabel id="demo-simple-select-label">Active</InputLabel>
                            <Select
                                {...register("isActive", { required: 'Active Status Is Required' })}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Active"
                                value={active ? 'true' : 'false'}
                                onChange={(e) => setActive(e.target.value === 'true')}
                            >
                                <MenuItem value={'true'}>True</MenuItem>
                                <MenuItem value={'false'}>False</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ marginTop: 4, paddingX: 3 }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>}
            
        </Box>
    );
}

export default SharedHeader;
