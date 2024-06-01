

import React, { useContext } from "react";
import { Box } from '@mui/material';
import Grid from "@mui/material/Grid";
import "./Login.css";
import img from "../../../../assets/login.png";
import Typography from "@mui/material/Typography";
import {  Link, useNavigate } from "react-router-dom";
import { Alert, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Error } from "@mui/icons-material";
import { validateEmail, validatePassword } from "../../../../Validation";
import { ApiContext } from "../../../../Context/ApiContext";
import "../../../../App.css";

export default function Login() {

  const { register, handleSubmit, formState: { errors , isDirty , isValid } } = useForm()

  const navigate = useNavigate()

  let {baseUrl} = useContext(ApiContext)

  const onSubmit = async (data) => {
    console.log(data);  
    try {
      const response = await axios.post(`${baseUrl}/admin/users/login`, data)
         localStorage.setItem('token', response.data.data.token)
         toast.success( response.data.message || 'Logged in successfully' , {
         autoClose: 3000,
         hideProgressBar: true,
         pauseOnHover: false
         });
      navigate('/dashboard')
    } catch (error) {
         toast.error( error.response.data.message || 'Unable To Login', {
         autoClose: 3000,
         hideProgressBar: true,
         pauseOnHover: false
       });
    }
  }

  return (
    <Box>
      <Grid container className="login-grid" spacing={0}>
        <Grid item xs={5}>
            <Typography variant="h5" color="black" sx={{ marginTop: "15px" }}>
              <Typography
                variant="h5"
                sx={{ display: "inline-block" }}
                color="rgba(50, 82, 223, 1)"
              >
                Stay
              </Typography>
              cation.
            </Typography>
            <Grid xs={9} sx={{ marginX: "auto", marginY: "35px" }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginY: "20px" }}
                color="initial"
              >
                Sign in
              </Typography>
              <Typography variant="body1" color="initial">
                If you don’t have an account register
              </Typography>
              <Typography variant="body1" color="initial">
                You Can <Link to={"/register"}>Register Here !</Link>{" "}
              </Typography>
            </Grid>
            <Grid xs={9} sx={{ marginX: "auto" }}>
              <Box component='form' onSubmit={handleSubmit(onSubmit)}  >
                <TextField
                  type="text"
                  sx={{
                    marginY: 2,
                    width: "100%",
                    backgroundColor: "whitesmoke",
                  }}
                  label="Email Address"
                  placeholder="Please Type Here"
                 {...register('email' , {required:validateEmail.required ,   pattern: {
                          value: validateEmail.pattern.value,
                          message: validateEmail.pattern.message,
                        }})}
              />
              {errors.email && <Alert icon={<Error fontSize="inherit" />} severity="error">
                 {errors.email.message}
                 </Alert>}
                <TextField
                  type="password"
                  sx={{
                    marginY: 2,
                    width: "100%",
                    backgroundColor: "whitesmoke",
                  }}
                  label="Password"
                  placeholder="Please Type Here"
                  {...register('password' , {required: validatePassword.required , pattern: {
                        value: validatePassword.pattern.value,
                        message:validatePassword.pattern.message
                  }})}
              />
               {errors.password && <Alert icon={<Error fontSize="inherit" />} severity="error">
                 {errors.password.message}
                 </Alert>}
                <Link className="forget-link" to={'/forget-pass'}>Forgot Password ?</Link>
                <Button variant="contained" type="submit" sx={{marginY:'25px' , width:'100%'}} disabled={!isDirty || !isValid}>Login</Button>
              </Box>
            </Grid>
        </Grid>
        <Grid item xs={5}>
          <img src={img} style={{ width: "100%", height: "600px" }} alt="" />
        </Grid>
      </Grid>
    </Box>
  );
}
