import React, { useContext, useEffect, useState } from 'react'
import { Alert, Box, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Close, Error } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ApiContext } from '../../../../Context/ApiContext';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
};

export default function CreateAds() {

    const { register, handleSubmit, formState: { errors } , setValue } = useForm()

    const [openAds, setOpenAds] = React.useState(false);
    const handleOpenAds = () => {
        setOpenAds(true)
        setValue('discount' , '')
    };
    const handleCloseAds = () => setOpenAds(false);


    const { baseUrl, authorization } = useContext(ApiContext);

    const [rooms, setRooms] = useState([])

    const [selectedNames, setSelectedNames] = useState([]);

    const [active, setActive] = useState(false);

    const getRooms = async () => {
        try {
            let response = await axios.get(`${baseUrl}/admin/rooms`, {
                headers: {authorization} ,
            })
            console.log(response.data.data.rooms);
            setRooms(response.data.data.rooms)
        } catch (error) {
            console.log(error);
        }
    }


    const onSubmit = async (data) => {
        data.isActive = !!active;
        try {
            let response = await axios.post(`${baseUrl}/admin/ads`, data, {
                headers: { Authorization: `${authorization}` },
            })
            console.log(response);

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

    useEffect(() => {
        getRooms()
    }, [])

    return (
        <>
            <Button onClick={handleOpenAds}>Open modal</Button>
            <Modal
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
            </Modal>
        </>
    );
}
