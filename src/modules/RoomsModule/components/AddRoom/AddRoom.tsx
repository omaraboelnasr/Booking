import React, { useContext, useEffect, useState } from "react";

import "../AddRoom/AddRoom.css";
import { Box, Container, Stack } from "@mui/system";
import {
  Alert,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ApiContext } from "../../../../Context/ApiContext";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import { Error } from "@mui/icons-material";

export default function AddRoom() {

  const fileTypes = ["JPEG", "PNG", "GIF"];

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const { baseUrl, authorization } = useContext(ApiContext);

  const [facilities, setFacilities] = useState([]);

  const [selectedNames, setSelectedNames] = useState([]);

  const appendToFormData = (data) => {
      
    const roomFormData = new FormData();
      
    roomFormData.append("roomNumber", data.roomNumber)
    roomFormData.append("price", data.price)
    roomFormData.append("capacity", data.capacity)
    roomFormData.append("discount", data.discount)
      
    const facilitiesArray = Array.isArray(data.facilities)
    ? data.facilities
    : [data.facilities];
    facilitiesArray.forEach((facility) => {
    roomFormData.append("facilities[]", facility);
    });
      
    if (data.imgs && data.imgs.length > 0) {
    for (let i = 0; i < data.imgs.length; i++) {
    roomFormData.append("imgs", data.imgs[i]);
    }
  }

    return roomFormData ;
  };

  const getFacilities = async () => {
    try {
      let response = await axios.get(`${baseUrl}/admin/room-facilities`, {
        headers: authorization,
      });
      setFacilities(response.data.data.facilities);
      console.log(response.data.data.facilities);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    let roomData = appendToFormData(data);
    try {
      let response = await axios.post(`${baseUrl}/admin/rooms` , roomData , {
        headers: { Authorization: `${authorization}` },
      })
      console.log(response);
       toast.success( response.data.message , {
         autoClose: 3000,
         hideProgressBar: true,
         pauseOnHover: false
         });
    } catch (error) {
         toast.error( error.response.data.message , {
         autoClose: 3000,
         hideProgressBar: true,
         pauseOnHover: false
       });
      console.log(error);
    }
  };

  useEffect(() => {
    getFacilities();
  }, []);

  return (
    <>
      <Box>
        <Container>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: "75%", marginX: "auto" }}
          >
            <TextField
              type="number"
              sx={{
                marginY: 2,
                width: "100%",
                backgroundColor: "whitesmoke",
              }}
              placeholder="Room Number"
              {...register("roomNumber" , {required:'Room Number Is Required' , maxLength:{value:4 , message:'Room Number Must Not Exceed 4 Numbers'} })}
            />
            {errors.roomNumber && <Alert icon={<Error fontSize="inherit" />} severity="error">
                 {errors.roomNumber.message}
                 </Alert>}
            <Box display={"flex"} justifyContent={"space-between"} >
              <Box sx={{width:'48%'}}>
               <TextField
                type="number"
                sx={{
                  marginY: 2,
                  width: "100%",
                  backgroundColor: "whitesmoke",
                }}
                placeholder="Price"
                {...register("price" , {required:'Price Is Required' , maxLength:{value:5 , message:'Price must not be more than 5 numbers'} , minLength:{value:2 , message:'Price must not be less than 2 numbers'} })}
              />
               {errors.price && <Alert icon={<Error fontSize="inherit" />} severity="error">
                 {errors.price.message}
                 </Alert>}
              </Box>
              <Box sx={{width:'48%'}}>
                     <TextField
                type="number"
                sx={{
                  marginY: 2,
                  width: "100%",
                  backgroundColor: "whitesmoke",
                }}
                placeholder="Capacity"
                {...register("capacity" , {required:'Capacity Is Required' , maxLength:{value:2 , message:'Capacity must not be more than 2 numbers'} })}
              />
              {errors.capacity && <Alert icon={<Error fontSize="inherit" />} severity="error">
                 {errors.capacity.message}
                 </Alert>}
             </Box>
         
            </Box>

            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box sx={{width:'48%'}}>
               <TextField
                type="number"
                sx={{
                  marginY: 2,
                  width: "100%",
                  backgroundColor: "whitesmoke",
                }}
                placeholder="Discount"
                {...register("discount" , {required:'Discount Is Required' , maxLength:{value:2 , message:'Discount must not be more than 2 numbers'} })}
              />
              {errors.discount && <Alert icon={<Error fontSize="inherit" />} severity="error">
                 {errors.discount.message}
                 </Alert>}
              </Box>
         
              <Box sx={{width:'48%'}}>
            <FormControl
                sx={{
                  marginY: 2,
                  width: "100%",
                  backgroundColor: "whitesmoke",
                }}
              >
                <Select
                  {...register("facilities" , {required:'Facilities Are Required' })}
                  size="small"
                  multiple
                  value={selectedNames}
                  onChange={(e) => setSelectedNames(e.target.value)}
                  renderValue={(selected) => (
                    <Stack gap={1} direction="row" flexWrap="wrap">
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          onDelete={() =>
                            setSelectedNames(
                              selectedNames.filter((item) => item !== value)
                            )
                          }
                          deleteIcon={
                            <CancelIcon
                              onMouseDown={(event) => event.stopPropagation()}
                            />
                          }
                        />
                      ))}
                    </Stack>
                  )}
                >
                  {facilities.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Box>

            </Box>

            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{ marginY: 3 }}>
              
              <FileUploader
                 multiple={true}
                 handleChange={handleChange}
                types={fileTypes}
                {...register('imgs')}
              />
              <Typography sx={{ marginY: 1 }}>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</Typography>
              
            </Box>

            <Box sx={{textAlign:'end'}}>
              <Button
              variant="outlined"
              type="reset"
              sx={{ marginX: 3 , paddingX:4}}
            >
              Cancel
            </Button>
             <Button
              variant="contained"
              type="submit"
            >
              Save
            </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
