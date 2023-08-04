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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
    setPasswordError(false);
    setLoginError(false);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setEmailError(false);
    setPasswordError(false);
    setLoginError(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const requestBody = { email: email, password: password };

    // Simple form validation
    let isValid = true;
    if (!validateEmail(email)) {
      setEmailError(true);
      isValid = false;
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError(true);
      isValid = false;
      return;
    }
    if (!isValid) {
      setLoginError(true);
      return;
    }

    console.log(requestBody)
    
    setEmail("")
    setPassword("")

    // Simulate login process
    // You can perform API calls or other authentication logic here
    console.log("Logged in successfully!");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && password.length <= 16;
  };

  return (
    <div className="login-container">
      <Card elevation={5} className="login-card">
        <Typography sx={{ mb: 2 }} component="h1" variant="h5">
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
          <TextField
            required
            id="email"
            autoComplete="email"
            autoFocus
            fullWidth
            label="Email"
            variant="standard"
            onChange={handleEmailChange}
            value={email}
          />
          <TextField
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            onChange={handlePasswordChange}
            value={password}
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
