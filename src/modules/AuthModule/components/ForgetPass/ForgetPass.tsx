import styles from "./ForgotPassword.module.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Container
} from "@mui/material";
import axios from "axios";
import forgotImage from "../../../../assets/Group 33.png";
import { toast } from "react-toastify";

export default function ForgetPass() {
  // const { baseUrl} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  type FormValues = {
    email: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://upskilling-egypt.com:3000/api/v0/admin/users/forgot-password`,
        data  
      );
      navigate("/reset-pass");
      toast.success("Mail send please check inbox !");
    } catch (error) {
      toast.error(error?.response.data.message || "There's a mistake.");
    } finally {
      setIsLoading(false);
    }
  };

  // const onSubmit = (data: { email: string }) => {
  //   callForgotPassApi(data);
  // };

  return (
    <Container
      maxWidth={"lg"}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "100vh",
        paddingY: 1
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          justifyContent: "space-around"
        }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Link
            to={"/"}
            className="logo"
            style={{
              color: "#3252df",
              fontSize: "1.5rem",
              textDecoration: "none",
              fontWeight: "500"
            }}
          >
            Stay
            <Typography component="span" variant="h5" sx={{ color: "#152c5b" }}>
              cation.
            </Typography>
          </Link>
          <Box
            sx={{
              marginTop: 5,
              paddingY: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly"
            }}
          >
            <Box sx={{ paddingLeft: 8 }}>
              <Typography fontWeight={600} variant="h5" paddingBottom={3}>
                Forgot password
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: "30px", fontWeight: "500" }}
              >
                If you already have an account register <br /> You can
                <Link
                  to={"/login"}
                  style={{
                    color: "#eb5148",
                    textDecoration: "none",
                    fontWeight: 600,
                    paddingLeft: 13
                  }}
                >
                  Login here !
                </Link>
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "80%",
                margin: "auto",
                marginTop: 10,
                paddingLeft: 8
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", height: 100 }}
              >
                <label
                  htmlFor="email"
                  style={{ fontSize: "1.3rem", fontWeight: 300, opacity: 0.8 }}
                >
                  Email
                </label>
                <TextField
                  sx={{
                    marginTop: 1,
                    marginBottom: 1,
                    bgcolor: "#f5f6f88f"
                  }}
                  type="email"
                  id="email"
                  placeholder="Please type here ..."
                  fullWidth
                  autoComplete="email"
                  autoFocus
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
                      message: "Email is invalid"
                    }
                  })}
                />

                {errors.email && errors.email.type === "required" && (
                  <Typography color="error">Email is required</Typography>
                )}

                {errors.email && errors.email.type === "pattern" && (
                  <Typography color="error">Email is invalid</Typography>
                )}
              </Box>

              <Button
              
                disabled={isLoading}
                sx={{
                  paddingY: 2,
                  marginTop: 5,
                  backgroundColor: "#3252DF",
                  textTransform: "capitalize"
                }}
                type="submit"
                variant="contained"
              >
                {isLoading ? (
                  <span className={styles.loader}></span>
                ) : (
                  "Send mail"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={6}>
          <Box>
            <img width={"96%"} src={forgotImage} alt="forgotImage" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
