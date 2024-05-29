import  SaveIcon  from '@mui/icons-material/Save';
import React, {  useContext, useState } from 'react'
import {Stack ,Typography,TextField,IconButton, OutlinedInput ,InputLabel, InputAdornment}  from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import Box from '@mui/material/Box';

import Container from '@mui/material/Container';


import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import axios from "axios";
import singupImage from "../../../../assets/signup1.jpg";


import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthContext } from '../../../../Context/AuthContext';





export default function Register() {

  const {baseUrl}=useContext(AuthContext);
  const navigate = useNavigate();

const [showPassword,setShowPassword]=useState(false);
const [isLoading,setIsLoading]=useState(false);
const [showConfPassword,setShowConfPassword]=useState(false);

const appendToFormData=(data:FormValues)=>{
  const formdata= new FormData();

  formdata.append("email",data.email);
  formdata.append("userName",data.userName);
  formdata.append("password",data.password);
  formdata.append("confirmPassword",data.confirmPassword);
  formdata.append("phoneNumber",data.phoneNumber);
  formdata.append("country",data.country);
  formdata.append("profileImage",data.profileImage[0]);
  formdata.append("role","user");
  return formdata;
}

  type FormValues = {
    email: string,
    userName:string,
    password:string,
    confirmPassword:string,
    phoneNumber:string,
    country:string;
    profileImage:string,
    role:string
  };
  const {
    register,
    handleSubmit,watch,
    formState: { errors }
  } = useForm<FormValues>();

  

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    
    const formdata=appendToFormData(data)  ;
    
    try {
      setIsLoading(true);
      const response = await axios.post (`${baseUrl}/api/v0/admin/users`,formdata
        
      );
      console.log(response);
      navigate("/login");
      toast.success("Sign Up !");
    } catch (error) {
      toast.error(error?.response?.data.message );
    }finally{
      setIsLoading(false)
    }
    
    
  };
  return ( 
     <Container sx={{ maxHeight: "100vh"}}  >

     <Box  height="100vh" sx={{display:{xs:"block",md:"flex"},margin:"auto"}} alignItems="center" >
       <Box display="flex">
       
       <Box width="100%" marginRight="5px">
        
       <Box>
       <Link to="/" style={{color: "#3252df",
       fontSize: "1.5rem",
       textDecoration: "none",
       fontWeight: "500"}} >
       Stay<Typography component="span"  variant="h5" sx={{ color: "#152c5b" }}>cation.</Typography>
       </Link>
       </Box>

        <Box my={2}>
        <Typography  my={2} component="h3" variant="h3">Sign Up</Typography>
        <Typography my={2}  component="p" sx={{fontSize:"20px"}}>If you already have an account register</Typography>
        <Typography my={2}   variant="p">You can <Link to="/login" style={{ textDecoration:"none",color: "#eb5148",fontWeight:"700"}}>Login here !</Link></Typography>
        
        </Box>


       <Box component="form" width="80%" onSubmit={handleSubmit(onSubmit)}> 
         <Stack>
           <label htmlFor="userName" style={{ fontSize: "1.3rem", fontWeight: 300, opacity: 0.8 }}>User Name</label>
            <TextField type="text" sx={{
                   
              marginBottom: 1,
              bgcolor: "#f5f6f88f"
            }}  id="userName" placeholder="Please type here ..." {...register("userName",{required:"User Name is Required",minLenth:3,maxLength:10
         
          })}></TextField>
         </Stack>
         {errors.userName && errors.userName.type  && (
          <Typography color="error">{errors.userName.message}</Typography>
        )}

      
         <Box  sx={{display:"flex",justifyContent:'space-between',flexDirection:{xs:"column",md:"row"}}}>
         <Stack my="5px" mr="5px" >
         <label htmlFor="phoneNumber" style={{ fontSize: "1.2rem", fontWeight: 300, opacity: 0.8 }}>Phone Number</label>
         <Stack>
       
         <TextField  type="tel" sx={{
                  
          marginBottom: 1,
          bgcolor: "#f5f6f88f"
        }} id="phoneNumber" placeholder="Please type here ..." {...register("phoneNumber",{required:"Phone Number is Required"
         
        })}></TextField>
        </Stack>
        
        {errors.phoneNumber && errors.phoneNumber.type  && (
          <Typography color="error">{errors.phoneNumber.message}</Typography>
        )}
        </Stack>
         <Stack my="5px" mr="5px" >
         <label htmlFor="country"  style={{ fontSize: "1.2rem", fontWeight: 300, opacity: 0.8 }}>Country</label>
         <Stack>
        
         <TextField type="text" sx={{
                   
          marginBottom: 1,
          bgcolor: "#f5f6f88f"
        }} id="country" placeholder="Please type here ..." {...register("country",{required:"Country is Required",minLenth:3,maxLength:10
         
        })}></TextField>
        </Stack>
        {errors.country && errors.country.type  && (
          <Typography color="error" sx={{
                     marginBottom: 1,
                    bgcolor: "#f5f6f88f"
                  }}>{errors.country.message}</Typography>
        )}
        </Stack>
        </Box>
        <Stack>
       
        <label  htmlFor="email"   style={{ fontSize: "1.3rem", fontWeight: 300, opacity: 0.8 ,}}>
                    Email Address
                </label>
                <TextField   sx={{
                   
                    marginBottom: 1,
                    bgcolor: "#f5f6f88f"
                  }}
                  type="email"
                  id="email"
                  placeholder="Please type here ..."
                  
                  autoComplete="email"
                  
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
                      message: "Email is invalid"
                    }
                  })}
                />

                </Stack>
                {errors.email && errors.email.type && (
                  <Typography color="error">Email is required</Typography>
                )}

        <Stack>
       
        <label  htmlFor="password"   style={{ fontSize: "1.3rem", fontWeight: 300, opacity: 0.8 ,}}>
        Password
                </label>

                <OutlinedInput
                 
                type={showPassword? 'text' : 'password'}
                id="password"
                placeholder="Please type here ..."
                sx={{
                 
                  marginBottom: 1,
                  bgcolor: "#f5f6f88f"
                }}
                {...register("password", {
                  required: "Password is required",
                 
                })}
                endAdornment={
                  <InputAdornment position="end">
                  <IconButton  aria-label="toggle password visibility"
                  onClick={()=>setShowPassword(!showPassword)}
                      
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                  </InputAdornment>
                }
               
              />
              
                </Stack>
                {errors.password && errors.password.type && (
                  <Typography color="error">{errors.password.message}</Typography>
                )}
        <Stack>
       
        <label  htmlFor="confirmPassword"   style={{ fontSize: "1.3rem", fontWeight: 300, opacity: 0.8 ,}}>
       Confirm Password
                </label>
                <OutlinedInput
                 
                type={showConfPassword? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Please type here ..."
                sx={{
                 
                  marginBottom: 1,
                  bgcolor: "#f5f6f88f"
                }}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate:(value)=>value===watch("password")|| "password do not match"
                 
                })}
                endAdornment={
                  <InputAdornment position="end">
                  <IconButton
                  onClick={()=>setShowConfPassword(!showConfPassword)}
                      aria-label="toggle password visibility"
                      
                      edge="end"
                    >
                      {showConfPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                  </InputAdornment>
                }
                
              />
              
                </Stack>
                {errors.confirmPassword && errors.confirmPassword.type  && (
                  <Typography color="error">{errors.confirmPassword.message}</Typography>
                )}
                
                <label  htmlFor="image"    style={{width:"100%",textAlign:"center", marginBlock:"10px",display:"block",border:"1px dotted  ",backgroundColor:"#6fbf73", fontSize: "1.3rem", fontWeight: 300, opacity: 0.8 }}>
       upload Image
                </label>

                <TextField {...register("profileImage",{
                  required:"Image is Requierd"
                })} id="image" style={{display:"none"}} type="file"></TextField>

                {errors.profileImage && errors.profileImage.type === "required" && (
                  <Typography color="error">{errors.profileImage.message}</Typography>
                )}
                
                <LoadingButton  loading={isLoading}
                loadingPosition="start" type="submit"   fullWidth bgcolor="#3252DF4D"
                startIcon={<SaveIcon/>}
                variant="contained"
              >
              Sign up
              </LoadingButton>
       </Box>
     
       </Box>
       <Box  sx={{ display: { xs:"none",sm: "none", md:"block" } }}> <img src={singupImage} alt="signup" className="singupImage"  /> </Box>
       </Box>
     </Box>
 
   </Container>
  
   )
}
