import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { formLabelClasses } from "@mui/material";

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
const SignupModal = ({ open, onSignUp, handleOpenLoginModal, handleClose }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [submitForm, setSubmitForm] = React.useState(false);
  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const onSignUpClick = () => {
    if (firstName && lastName && email && phoneNumber && password && password === confirmPassword) {
      onSignUp(email, password, phoneNumber, firstName, lastName);
    }
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
          <Typography id="transition-modal-title" variant="h6" component="h2">
            <CloseIcon
              className="cross-icon"
              onClick={() => {
                handleClose();
                setSubmitForm(false);
              }}
            />
            <div className="card-heading mb-28">
              <h2 className="mb-18">Sign up</h2>
              <p className="mb-28">
                Already have an account?{" "}
                <a
                  className="cursor-pointer"
                  onClick={() => {
                    handleOpenLoginModal();
                    setSubmitForm(false);
                  }}
                >
                  {" "}
                  Login here
                </a>
              </p>
            </div>
          </Typography>
          <Box id="transition-modal-description" sx={{ mt: 2 }}>
            <Box className="main-div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <FormControl sx={{ width: "100%", marginBottom: "32px" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-firstName">FirstName *</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-firstName"
                  value={firstName}
                  fullWidth
                  error={submitForm && firstName === "" ? true : false}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  label="FirstName *"
                />
              </FormControl>
              <FormControl
                sx={{ width: "100%", marginBottom: "32px", marginLeft: { xs: "0px", sm: "20px" } }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-lastName">LastName *</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-lastName"
                  value={lastName}
                  fullWidth
                  error={submitForm && lastName === "" ? true : false}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                  label="LastName *"
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ width: "100%", marginBottom: "32px" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">Email *</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  value={email}
                  fullWidth
                  error={submitForm && email === "" ? true : false}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email *"
                />
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <FormControl fullWidth className="age" sx={{ marginBottom: "32px", marginRight: "20px" }}>
                <InputLabel id="demo-simple-select-label">Ext</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="44" value={"+44"} required>
                  <MenuItem value={"+44"} selected>
                    +44
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ width: "100%", marginBottom: "32px" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">Phone Number *</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  value={phoneNumber}
                  fullWidth
                  error={submitForm && phoneNumber === "" ? true : false}
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  label="Phone Number *"
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ width: "100%", marginBottom: "13px" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword1 ? "text" : "password"}
                  value={password}
                  error={submitForm && password === "" ? true : false}
                  fullWidth
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword1}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword1 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password *"
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl sx={{ width: "100%", marginBottom: "13px" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Confirm Password *</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword2 ? "text" : "password"}
                  value={confirmPassword}
                  fullWidth
                  error={submitForm && confirmPassword === "" ? true : false}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password *"
                />
              </FormControl>
            </Box>
          </Box>
          <Box className="termsPolicy" sx={{ textAlign: "center" }}>
            By clicking “Sign Up” you agree to our{" "}
            <a type="button" className="cursor-pointer">
              {" "}
              Terms of Service{" "}
            </a>{" "}
            as well as our{" "}
            <a type="button" className="cursor-pointer">
              {" "}
              Privacy Policy
            </a>
          </Box>
          <Button
            type="button"
            onClick={() => {
              onSignUpClick();
              setSubmitForm(true);
            }}
            className="signup-btn"
          >
            Sign Up
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

// This is for the asterisk color

// overrides: {
//     MuiFormLabel: {
//         asterisk: {
//             color: '#31b7b7',
//             '&$error': {
//                 color: '#31b7b7'
//             },
//         }
//     }
// }
export default SignupModal;
