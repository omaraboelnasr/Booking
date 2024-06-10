import React, { useContext } from 'react'
import { Alert, Box, IconButton, TextField } from '@mui/material';
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

export default function AddFacility() {

   const { register, handleSubmit, formState: { errors } , setValue } = useForm()

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setValue('name' , '')
  } 
  const handleClose = () => setOpen(false);
    
 

    const { baseUrl, authorization } = useContext(ApiContext);
    
    const onSubmit = async (data) => {
            try {
      let response = await axios.post(`${baseUrl}/admin/room-facilities` , data , {
        headers: authorization,
      })
       toast.success( response.data.message , {
         autoClose: 3000,
         hideProgressBar: true,
         pauseOnHover: false
       });
        handleClose()
    } catch (error) {
         toast.error( error.response.data.message , {
         autoClose: 3000,
         hideProgressBar: true,
         pauseOnHover: false
       });
    }
    }

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
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
                            <Close color='error' sx={{border:'1px solid' , borderRadius:'50%'}}></Close>
                      </IconButton>
                  </Box>
       
                  <Box
                      component="form"
                      textAlign={'end'}
                      onSubmit={handleSubmit(onSubmit)}
                  >
            <TextField
              type="text"
              sx={{
                marginY: 5,
                width: "100%",
                backgroundColor: "whitesmoke",
              }}
              placeholder="Facility Name"
              {...register("name" , {required:'Facility Name Is Required'})}
                      />
                {errors.name && <Alert icon={<Error fontSize="inherit" />} severity="error">
                 {errors.name.message}
                 </Alert>}
                           <Button
              variant="contained"
              type="submit"
            sx={{marginTop:4 , paddingX:3}}
            >
              Save
            </Button>
         </Box>
        </Box>
      </Modal>
    </>
  );
}
