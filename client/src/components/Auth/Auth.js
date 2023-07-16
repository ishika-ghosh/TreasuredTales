import React from "react";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Paper,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../Forms/AuthForm";
import { signin, signup } from "../../actions/auth";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [signLoading, setSignLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignLoading(true);
    if (isSignUp) {
      dispatch(signup(formData, navigate, setSignLoading));
    } else {
      dispatch(signin(formData, navigate, setSignLoading));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 12 }}>
      <CssBaseline />
      <Paper elevation={3} sx={styles}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <AuthForm
            isSignUp={isSignUp}
            formData={formData}
            handleChange={handleChange}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={signLoading}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </LoadingButton>

          <Grid container>
            <Grid item>
              <Button onClick={() => setIsSignUp(!isSignUp)}>
                {!isSignUp
                  ? "Don't have an account? Sign Up"
                  : "Aready have an account? Sign In"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
const styles = {
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 3,
};
