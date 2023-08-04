import { useState } from "react";
import "./styles.scss";
import {
  Card,
  TextField,
  Alert,
  Button,
  Link,
  Typography,
} from "@mui/material";

const Login = () => {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleFormSubmit = () => {};

  return (
    <div className="login-container">
      <Card elevation={5} className="login-card">
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        {emailError && (
          <Alert severity="error">Please enter a valid email address.</Alert>
        )}
        {passwordError && (
          <Alert severity="error">
            Please enter a password between 8 to 16 characters.
          </Alert>
        )}
        {loginError && (
          <Alert severity="error">
            Failed to login. Please check your credentials.
          </Alert>
        )}
        <form onSubmit={handleFormSubmit} className="login-form">
          <label htmlFor="email"></label>
          <TextField
            required
            id="email"
            autoComplete="email"
            autoFocus
            fullWidth
            label="Email"
            variant="standard"
          />
          <label htmlFor="password"></label>
          <TextField
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
          />

          <Button
            sx={{ mt: 3, mb: 2 }}
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
          <div>
            Do not have an account？
            <Link href="/signup">Sign Up</Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
