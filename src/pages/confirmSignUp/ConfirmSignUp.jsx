import { useState } from "react";
import "./styles.scss";
import { Card, TextField, Alert, Button, Typography } from "@mui/material";
import { confirmSignUp, resendConfirmationCode } from "../../util/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserSignIn } from "../../redux/auth/authSlice";

const ConfirmSignUp = (props) => {
  const [code, setCode] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [resendCodeMsg, setResendCodeMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = props;

  const handleCodeChange = (event) => {
    setCode(event.target.value);
    setLoginError(false);
  };

  const handleResendCode = () => {
    resendConfirmationCode(user.username).then((res) => {
      if (typeof res !== "string") {
        setResendCodeMsg(true);
      }
      else{
        setErrorMsg(res);
        setLoginError(true);
      }
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // let isValid = true;
    setCode("");
    // Simulate login process
    // You can perform API calls or other authentication logic here
    confirmSignUp(user.username, code).then((res) => {
      if (typeof res !== "string") {
        dispatch(setUserSignIn(res));
        navigate("/");
      } else {
        setErrorMsg(res);
        setLoginError(true);
      }
    });
    // if (!isValid) {
    //   setLoginError(true);
    //   return;
    // }
  };

  return (
    <div className="confirmSignUp-container">
      <Card elevation={5} className="confirmSignUp-card">
        <Typography sx={{ mb: 2 }} component="h1" variant="h5">
          Please enter the verification code from your email
        </Typography>
        {loginError && <Alert severity="error">{errorMsg}</Alert>}
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
