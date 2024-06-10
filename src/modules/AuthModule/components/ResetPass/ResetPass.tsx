import SaveIcon from '@mui/icons-material/Save';
import React, { useContext, useState } from 'react'
import { Stack, Typography, TextField, IconButton, OutlinedInput, InputLabel, InputAdornment } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import resetImage from "../../../../assets/Group 33.png";
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthContext } from '../../../../Context/AuthContext';
import './ResetPass.css'

export default function ResetPass() {
  const { baseUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const {
    register,
    handleSubmit, watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${baseUrl}/api/v0/portal/users/reset-password`, data
      );
      navigate("/login");
      toast.success("reset password success");
    } catch (error) {
      toast.error(error?.response?.data.message);
    } finally {
      setIsLoading(false)
    }


  };
  return (
    <Container sx={{ maxHeight: "100vh" }}  >

      <Box height="100vh" sx={{ display: { xs: "block", md: "flex" }, margin: "auto" }} alignItems="center" >
        <Box display="flex">
          <Box width="100%" marginRight="5px">
            <Box>
              <Link to="/" style={{
                color: "#3252df",
                fontSize: "1.5rem",
                textDecoration: "none",
                fontWeight: "500"
              }} >
                Stay<Typography component="span" variant="h5" sx={{ color: "#152c5b" }}>cation.</Typography>
              </Link>
            </Box>

            <Box my={2}>
              <Typography my={2} component="h3" variant="h3">Reset Password</Typography>
            </Box>

            <Box component="form" width="80%" onSubmit={handleSubmit(onSubmit)}>
            
              <Stack>
              <InputLabel htmlFor="email" style={{ color:'rgba(21, 44, 91, 1)',fontSize: "1.1rem", fontWeight: 400, marginBottom: 6}}>Email Address</InputLabel>
                <TextField sx={{
                  marginBottom: 1,
                  bgcolor: "rgba(245, 246, 248, 1)"
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
              {errors.email && (
                <Typography sx={{
                  marginBottom: 1,
                }} color="error">{errors.email.message}</Typography>
              )}


              <Stack>
              <InputLabel htmlFor="otp" style={{ color:'rgba(21, 44, 91, 1)',fontSize: "1.1rem", fontWeight: 400, marginBottom: 6}}>OTP</InputLabel>
                <OutlinedInput
                  type='text'
                  id="otp"
                  placeholder="Please type here ..."
                  sx={{
                    marginBottom: 1,
                    bgcolor: "rgba(245, 246, 248, 1)"
                  }}
                  {...register("seed", {
                    required: "OTP is required",
                  })}
                />
              </Stack>
              {errors.seed && (
                <Typography sx={{
                  marginBottom: 1
                }} color="error">{errors.seed.message}</Typography>
              )}
              <Stack>
              <InputLabel htmlFor="password" style={{ color:'rgba(21, 44, 91, 1)',fontSize: "1.1rem", fontWeight: 400, marginBottom: 6}}>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Please type here ..."
                  sx={{
                    marginBottom: 1,
                    bgcolor: "rgba(245, 246, 248, 1)"
                  }}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}

                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

              </Stack>
              {errors.password && (
                <Typography sx={{
                  marginBottom: 1
                }} color="error">{errors.password.message}</Typography>
              )}
              <Stack>
              <InputLabel htmlFor="confirmPassword" style={{ color:'rgba(21, 44, 91, 1)',fontSize: "1.1rem", fontWeight: 400, marginBottom: 6}}>Confirm Password</InputLabel>
                <OutlinedInput

                  type={showConfPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="Please type here ..."
                  sx={{

                    marginBottom: 1,
                    bgcolor: "rgba(245, 246, 248, 1)"
                  }}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) => value === watch("password") || "password do not match"

                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfPassword(!showConfPassword)}
                        aria-label="toggle password visibility"
                        edge="end"
                      >
                        {showConfPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }

                />

              </Stack>
              {errors.confirmPassword && (
                <Typography sx={{
                  marginBottom: 1,
                }} color="error">{errors.confirmPassword.message}</Typography>
              )}

              <LoadingButton sx={{
                marginTop: 6,
              }} loading={isLoading}
                loadingPosition="start" type="submit" fullWidth bgcolor="#3252DF4D"
                variant="contained"
              >
                Reset
              </LoadingButton>
            </Box>

          </Box>
          <Box sx={{ display: { md: "block" } }}> <img src={resetImage} alt="signup" className="resetImg" /> </Box>
        </Box>
      </Box>

    </Container>

  )
}
