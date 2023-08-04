import { useState } from "react";
import "./styles.scss";
import { Card, TextField, Alert, Button, Typography } from "@mui/material";
import { Auth } from "../../../util/auth";
import { useNavigate } from "react-router-dom";

const ConfirmSignUp = (props) => {
  const [code, setCode] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [resendCodeMsg, setResendCodeMsg] = useState(false);
  const navigate = useNavigate();
  const {username} = props;

  const handleCodeChange = (event) => {
    setCode(event.target.value);
    setLoginError(false);
  };

  const handleResendCode = async () => {
    try {
      // const username = await Auth.currentAuthenticatedUser();
      await Auth.resendSignUp(username);
      // Code resent successfully
      setResendCodeMsg(true);
      // You may display a success message or update the UI accordingly
    } catch (error) {
      console.log("Error resending code:", error);
      // Handle the error appropriately (e.g., show an error message)
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;
    setCode("");
    // Simulate login process
    // You can perform API calls or other authentication logic here
    try {
      // const username = await Auth.currentAuthenticatedUser();
      await Auth.confirmSignUp(username, code);
    } catch (error) {
      console.log("error confirming sign up", error);
      isValid = false;
    }
    if (!isValid) {
      setLoginError(true);
      return;
    }
    console.log("Logged in successfully!");
    navigate("/");
  };

  return (
    <div className="confirmSignUp-container">
      <Card elevation={5} className="confirmSignUp-card">
        <Typography sx={{ mb: 2 }} component="h1" variant="h5">
          Please enter the verification code from your email
        </Typography>
        {loginError && (
          <Alert severity="error">
            Failed to login. Please check your code or resend new one
          </Alert>
        )}
        {resendCodeMsg && (
          <Alert severity="success">
            A new verification code has sent to you, please check you email
          </Alert>
        )}
        <form onSubmit={handleFormSubmit} className="confirmSignUp-form">
          <TextField
            required
            id="code"
            autoComplete="code"
            autoFocus
            fullWidth
            label="Verification code"
            variant="standard"
            onChange={handleCodeChange}
            value={code}
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
            Did not receive your code？
            <Button onClick={handleResendCode}>Resend</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ConfirmSignUp;
