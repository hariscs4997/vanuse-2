import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Alert from "@mui/material/Alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const LoginModal = ({ open, onLogin, handleOpenSignUpModal, handleClose, showError, setLoginError }) => {
  const [password, setPassword] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [resetEmail, setResetEmail] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [stepper, setStepper] = React.useState(1);
  const [submitForm, setSubmitForm] = React.useState(false);
  const [submitResetForm, setResetSubmitForm] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onLoginClick = () => {
    if (userName && password) {
      setSubmitForm(false)
      onLogin(userName, password);
    }
  };
  const resetPasswordForm = () =>{
    if(resetEmail){
      setStepper(3)
      setResetSubmitForm(false)
    }
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box sx={style} className="signup-modal">
          {showError ? (
            <Alert className="alert-error" severity="error">
              Invalid Email/Password
            </Alert>
          ) : null}
          <CloseIcon
            className="cross-icon"
            onClick={() => {
              handleClose();
              setSubmitForm(false);
              setStepper(1);
              setResetSubmitForm(false);
            }}
          />
          {stepper === 1 ? (
            <div className="scroll-y">
              <div className="card-heading mb-81">
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  <h2 className="mb-18">Welcome Back</h2>
                  <p>
                    Don&apos;t have an account?{" "}
                    <a
                      className="cursor-pointer"
                      onClick={() => {
                        handleOpenSignUpModal();
                        setSubmitForm(false);
                      }}
                    >
                      {" "}
                      Sign Up here
                    </a>
                  </p>
                </Typography>
              </div>
              <Box id="transition-modal-description" sx={{ mt: 2 }}>
                <Box>
                  <FormControl sx={{ width: "100%", marginBottom: "32px" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Email *</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email"
                      value={userName}
                      fullWidth
                      error={showError || ( submitForm && userName === "") ? true : false}
                      required
                      onChange={(e) => setUserName(e.target.value)}
                      label="Email *"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      fullWidth
                      error={showError || (submitForm && password === "") ? true : false}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password *"
                    />
                  </FormControl>
                </Box>
              </Box>
              <Box className="termsPolicy" sx={{ textAlign: "center" }}></Box>
              <Button
                className="signup-btn login-btn"
                onClick={() => {
                  onLoginClick();
                  setSubmitForm(true);
                }}
              >
                Login
              </Button>
              <Box
                className="forgot-password"
                onClick={() => {
                  setStepper(2);
                  setLoginError(false);
                  setSubmitForm(false);
                }}
              >
                Forgot Password?
              </Box>
            </div>
          ) : stepper === 2 ? (
            <>
              <div className="card-heading mb-81">
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  <h2 className="mb-18">Reset your password</h2>
                  <p>To reset your password, please input your email address.</p>
                </Typography>
              </div>
              <Box id="transition-modal-description">
                <Box>
                  <FormControl sx={{ width: "100%", marginBottom: "32px" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-reset-email">Email *</InputLabel>
                    <OutlinedInput
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      id="outlined-adornment-reset-email"
                      fullWidth
                      error={submitResetForm && resetEmail === "" ? true : false}
                      required
                      label="Email *"
                    />
                  </FormControl>
                </Box>
              </Box>
              <Button className="signup-btn login-btn" onClick={() => {resetPasswordForm();setResetSubmitForm(true)}}>
                Reset Password
              </Button>
              <Box className="forgot-password" onClick={() => {setStepper(1);setResetSubmitForm(false)}}>
                Back to Login
              </Box>
            </>
          ) : stepper === 3 ? (
            <>
              <div className="text-center mb-31">
                <img src="/Mail.svg" alt="Placeholder" className="Placeholder" />
              </div>
              <div className="card-heading mb-50">
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  <h3 className="mb-18">An email has been sent</h3>
                  <p className="reset-password">
                    Follow the steps outlined in the email we‘ve sent out. It might take a few minutes to reach your
                    inbox.
                  </p>
                </Typography>
              </div>

              <Button className="signup-btn login-btn" onClick={() => setStepper(1)}>
                Proceed to Login{" "}
              </Button>
            </>
          ) : null}
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoginModal;
