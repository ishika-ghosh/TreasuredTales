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
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../Forms/AuthForm";
import { signin, signup } from "../../actions/auth";

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
  const exception = useSelector((state) => state.userAuth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
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
          {exception && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {exception}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

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
