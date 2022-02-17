import React, {useState, useEffect} from "react";
import Axios from "axios";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import SignupModal from "../../auth/SignupModal";
import LoginModal from "../../auth/LoginModal";
import {useDispatch} from "react-redux";
import moment from 'moment';

const SelectVan = (props) => {
  const dispatch = useDispatch();
  const [price, setPrice] = React.useState("");
  const [van, setVan] = React.useState("small");
  const [iNeedHelp, setINeedHelp] = React.useState(false);
  const [elevator, setElevator] = React.useState(false);
  const [floor, setFloor] = React.useState("Ground");

  const [open, setOpen] = React.useState(false);
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [signupValue, setSignupValue] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const onSignUp = (email, password, phoneNumber, firstName, lastName) => {
    Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup/`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: email,
      password: password,
      phone_number: "+44 " + phoneNumber,
    })
      .then(function (response) {
        setShowToast(true);
        localStorage.setItem("token", JSON.stringify(response.data));
        setSignupValue(true);
        dispatch({
          type: "SET_USER_DATA",
          payload: response.data.token,
        });
        setOpen(false);
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: "SET_UNAUTHORIZED",
        });
      });
  };

  const onLogin = (userName, password) => {
    Axios.post(
      `${process.env.NEXT_PUBLIC_API_URL }/login/`,
      {
        "username": userName,
        "password": password
      }
    )
      .then(function (response) {
        setShowToast(true)
        if (response.status === 200) {
          setSignupValue(false);
          setOpenLoginModal(false);
          setLoginError(false)
          dispatch({
            type: "SET_USER_DATA",
            payload: response.data,
          });
          localStorage.setItem("token", JSON.stringify(response.data));
          setIsLogin(true);
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoginError(true)
        dispatch({
          type: "SET_UNAUTHORIZED",
        });
      });
  }

  const addPaymentNow = () => {

    const tripNow = JSON.parse(localStorage.getItem("TripObject"))
    // const tokenNow = 'Token '+localStorage.getItem("token") // will be change when user login is dynamic
    const tokenNow = "Token " + JSON.parse(localStorage.getItem("token")).token;
    const pickAddressLine1 = JSON.parse(localStorage.getItem("pick_address_line_1"))
    const pickAddressLine2 = JSON.parse(localStorage.getItem("pick_address_line_2"))
    const floorNumber = JSON.parse(localStorage.getItem("floor_number"))
    const hasElevator = localStorage.getItem("has_elevator")
    const isVanFilled = localStorage.getItem("is_van_filled")
    const isLoadAssistantRequired = localStorage.getItem("is_load_assistant_required")
    const scheduleTime = localStorage.getItem("final-date-time").split("Z")[0]
    const customer_first_name = JSON.parse(localStorage.getItem("token")).result.first_name;
    const customer_last_name = JSON.parse(localStorage.getItem("token")).result.last_name;
    const customer_contact_number = JSON.parse(localStorage.getItem("token")).result.phone_number;
    // final date to post api
    Axios({
      method: 'post',
      headers: {'Authorization': tokenNow},
      url: `${process.env.NEXT_PUBLIC_API_URL}/cart-item/add_items_in_cart/`,
      data: tripNow
    }).then(function (response) {
      Axios({
        method: 'post',
        headers: {'Authorization': tokenNow},
        url: `${process.env.NEXT_PUBLIC_API_URL}/trip/`,
        data: {
          "customer_first_name": customer_first_name,
          "customer_last_name": customer_first_name,
          "customer_contact_number": customer_contact_number,
          "pickup_address_line_1": pickAddressLine1.title,
          "pickup_address_line_2": pickAddressLine2.title,
          "pickup_suburb": "pickup suburb",
          "pickup_county": pickAddressLine1.title,
          "pickup_city": pickAddressLine1.title,
          "pickup_postal_code": "q",
          "pickup_latitude": pickAddressLine1.latitude,
          "pickup_longitude": pickAddressLine1.longitude,
          "destination_address_line_1": pickAddressLine2.title,
          "destination_address_line_2": pickAddressLine2.title,
          "destination_suburb": "pickup_suburb",
          "destination_county": pickAddressLine2.title,
          "destination_city": pickAddressLine2.title,
          "destination_postal_code": "q",
          "destination_latitude": pickAddressLine2.latitude,
          "destination_longitude": pickAddressLine2.longitude,
          "vehicle_size": van,
          "scheduled_datetime_utc":scheduleTime
        }
      }).then(function (response) {
        setPrice(response.data.result.total_price)
        localStorage.setItem("price",response.data.result.total_price)
        localStorage.setItem("van",van)
        Axios({
          method: 'put',
          headers: {'Authorization': tokenNow},
          url: `${process.env.NEXT_PUBLIC_API_URL}/trip/${response.data.result.id}/update_status`,
          data: {"status":"AWAITING PAYMENT"}
        }).then(function(response){

        }).catch(function(error){

        })

      }).catch(function (error) {
        console.log(error);
      });

    }).catch(function (error) {
      console.log(error);
    });

   

  }

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true)
    setOpen(false)
    setLoginError(false)
  }
  const handleCloseModal = () => {
    setOpenLoginModal(false);
    setOpen(false);
    setLoginError(false)
  };
  const handleOpen = () => {
    setOpenLoginModal(false);
    setOpen(true);
    setLoginError(false)
  }

  const handleFloorChange = (event) => {
    const {
      target: {value},
    } = event;
    setFloor(
      typeof value === 'string' ? value.split(',') : value,
    );
    localStorage.setItem("floor_number", JSON.stringify(floor));
  }


  const iNeedHelpFunc = (event) => {
    setINeedHelp(event.target.checked);
    localStorage.setItem(
      "is_load_assistant_required",
      JSON.stringify(event.target.checked)
    );
  };

  const haveElevator = (event) => {
    setElevator(event);
    localStorage.setItem("has_elevator", JSON.stringify(event));
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowToast(false);
  };

  useEffect(() => {
    setIsLogin(props.authorized);
  }, [props.authorized]);

  return (
    <>
      <Snackbar
        open={showToast}
        onClose={handleClose}
        message={signupValue ? "Signup Successfully!" : "Login Successfully"}
        autoHideDuration={1000}
        key="topright"
      />
      <div className="card-heading mb-23">
        <h2>Select a van size</h2>
      </div>

      <div className="mb-50 van-wrap">
        <div
          className={van === 'small' ? "van-box van-box-active" : "van-box"}
          onClick={() => setVan("small")}
        >
          <svg
            width="72"
            height="31"
            viewBox="0 0 72 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M69.3172 0.311035H36.9776C36.7288 0.311035 36.48 0.311035 36.2313 0.335758C36.2313 0.335758 33.3953 0.459377 30.5096 1.745C27.1513 3.20369 24.4148 6.19525 23.1959 7.65394C22.773 8.17313 22.1511 8.49454 21.4545 8.56871C16.1558 8.98901 11.9765 10.0521 9.11571 10.9669C3.99112 12.5987 2.77216 13.8348 2.15024 14.6754C0.0108512 17.5681 0.632768 21.4497 1.27956 23.7737C1.57808 24.8368 2.57315 25.5538 3.66772 25.5538H9.58836C10.3595 28.397 12.9716 30.4985 16.0812 30.4985C19.1908 30.4985 21.8028 28.397 22.574 25.5538H52.2269C52.9484 28.4712 55.5853 30.6221 58.7446 30.6221C61.904 30.6221 64.5409 28.4712 65.2623 25.5538H69.3172C70.6854 25.5538 71.8049 24.4412 71.8049 23.0815V2.80812C71.8049 1.4236 70.7103 0.311035 69.3172 0.311035ZM42.2017 7.97535C42.2017 8.66761 41.6544 9.21152 40.9578 9.21152H29.0668C27.9971 9.21152 27.4249 7.97534 28.1215 7.15947C29.1414 5.97273 30.833 4.56349 33.5197 3.59927C36.48 2.53616 39.316 2.46199 41.0076 2.56088C41.6792 2.5856 42.1768 3.12952 42.1768 3.79706V7.97535H42.2017Z"
              fill="#23274F"
            />
          </svg>
          <p>Small</p>
        </div>
        <div
          className={van === "medium" ? "van-box van-box-active" : "van-box"}
          onClick={() => setVan("medium")}
        >
          <svg
            width="75"
            height="36"
            viewBox="0 0 75 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M72.5207 0.422363H29.3762C29.3027 0.422363 29.2537 0.422363 29.1802 0.422363C28.0777 0.521448 26.4852 0.74439 24.7212 1.41321C20.2867 3.09766 18.9637 5.89682 15.3132 8.99323C14.1617 9.95931 13.2062 10.4547 11.4422 11.5694C9.40867 12.8575 7.98767 13.6502 6.93417 14.1952C4.92517 15.2356 4.63117 15.1861 3.96967 15.7558C2.54867 17.0191 2.08317 18.8522 1.93617 20.2394C1.02967 23.9551 0.73567 26.8533 0.95617 28.1167C1.02967 28.4635 1.15217 29.2066 1.74017 29.7516C2.18117 30.1727 2.76917 30.4204 3.40617 30.4204H9.99667C10.7562 33.2691 13.3287 35.3747 16.3912 35.3747C19.4537 35.3747 22.0262 33.2691 22.7857 30.4204H57.7227C58.3842 33.3929 61.0302 35.6224 64.1662 35.6224C67.3022 35.6224 69.9482 33.3929 70.6097 30.4204H72.4962C73.8437 30.4204 74.9462 29.3057 74.9462 27.9433V2.89949C74.9707 1.53707 73.8682 0.422363 72.5207 0.422363ZM32.0957 11.074C32.0957 11.7676 31.5567 12.3126 30.8707 12.3126H19.9437C19.0372 12.3126 18.4492 11.3465 18.8412 10.529C19.6742 8.8446 21.2912 6.44179 24.2312 4.8812C26.8772 3.494 29.4007 3.39492 30.9442 3.51877C31.5812 3.56832 32.0712 4.11329 32.0712 4.75734V11.074H32.0957Z"
              fill="#23274F"
            />
          </svg>
          <p>Medium</p>
        </div>
        <div
          className={van === "large" ? "van-box van-box-active" : "van-box"}
          onClick={() => setVan("large")}
        >
          <svg
            width="78"
            height="40"
            viewBox="0 0 78 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M74.6305 0.51123H30.2253C29.9522 0.51123 29.6792 0.51123 29.4062 0.535675C24.0199 0.853452 16.1516 7.94234 12.9 13.3935C12.5277 14.029 11.8823 14.469 11.1377 14.5912C6.09899 15.3735 2.05312 18.0135 0.638309 21.7779C0.315632 22.6579 -0.00704408 23.9779 0.141884 25.6646C0.141884 25.7135 0.141884 25.7868 0.141884 25.8357V32.0446C0.141884 33.389 1.25884 34.489 2.62401 34.489H6.57058C7.34004 37.3001 9.94629 39.3779 13.0489 39.3779C16.1516 39.3779 18.7578 37.3001 19.5273 34.489H58.8938C59.564 37.4223 62.2447 39.6223 65.4218 39.6223C68.599 39.6223 71.2796 37.4223 71.9498 34.489H74.6057C75.9709 34.489 77.0878 33.389 77.0878 32.0446V2.95568C77.1127 1.61123 75.9957 0.51123 74.6305 0.51123ZM29.4558 14.9335C29.4558 15.6179 28.9097 16.1557 28.2147 16.1557H17.1445C16.2261 16.1557 15.6304 15.2023 16.0275 14.3957C16.8714 12.7335 18.5096 10.3623 21.4882 8.82234C24.1689 7.45345 26.7255 7.35568 28.2892 7.4779C28.9346 7.52679 29.431 8.06456 29.431 8.70012V14.9335H29.4558Z"
              fill="#23274F"
            />
          </svg>
          <p>Large</p>
        </div>
        <div
          className={van === "extra large" ? "van-box van-box-active" : "van-box"}
          onClick={() => setVan("extra large")}
        >
          <svg
            width="84"
            height="50"
            viewBox="0 0 84 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M82.5826 0.733398H33.6068C33.2588 0.733398 32.9853 1.00095 32.9853 1.34147V12.5786C32.9853 12.7489 32.8362 12.8948 32.6621 12.8948H30.7727C30.5738 12.8948 30.2755 12.8948 29.9274 12.9191C28.0877 12.9921 24.0354 13.4299 19.0881 16.5432C13.047 20.3133 15.011 22.2105 10.1382 24.5698C6.40912 26.3697 4.74344 26.8804 3.42582 27.9993L3.40096 28.0236C3.30152 28.0966 2.72972 28.6317 2.18278 29.337C-0.676215 32.9611 0.591687 39.5526 1.06404 41.6201C1.13862 41.8876 1.38724 42.0822 1.66071 42.0822H7.17979C7.15493 42.3254 7.13009 42.5687 7.13009 42.8119C7.13009 46.436 10.1382 49.3791 13.8425 49.3791C17.5468 49.3791 20.5549 46.436 20.5549 42.8119C20.5549 42.5687 20.53 42.3254 20.5052 42.0822H57.1749C57.1252 42.3984 57.1003 42.7146 57.1003 43.0551C57.1003 46.6792 60.1085 49.6223 63.8127 49.6223C67.517 49.6223 70.5252 46.6792 70.5252 43.0551C70.5252 42.7146 70.5003 42.3984 70.4506 42.0822H74.1548C74.5029 42.0822 74.8509 41.8876 75.025 41.5958C75.6962 40.4283 76.7155 38.9446 78.232 37.4609C79.8231 35.9042 81.4391 34.8583 82.6821 34.2016C83.0053 34.0314 83.2042 33.6908 83.2042 33.3503V1.34147C83.2042 1.00095 82.9307 0.733398 82.5826 0.733398ZM29.7534 25.0562C29.7534 25.7373 29.2065 26.2724 28.5104 26.2724H17.4225C16.5026 26.2724 15.8811 25.3238 16.3037 24.5211C17.149 22.8672 18.7898 20.5079 21.7731 18.9755C24.4581 17.6134 27.0187 17.5162 28.5849 17.6378C29.2313 17.6864 29.7286 18.2215 29.7286 18.8539V25.0562H29.7534Z"
              fill="#23274F"
            />
          </svg>
          <p>X-Large</p>
        </div>
      </div>

      <div className={iNeedHelp ? "selection help-slection card-slection mb-31":"help-slection border-help card-slection mb-31"}>
        <Checkbox
          checked={iNeedHelp}
          onChange={iNeedHelpFunc}
          inputProps={{"aria-label": "controlled"}}
        />
        <p>
          <strong>I need help moving my items</strong>
        </p>
        <p>Need help? Ask your driver to assist </p>
      </div>

      <div className={"delivery-options-wrap mb-31"}>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={6}
          >
            <div className="delivery-options">
              <p>
                <strong>What floor are you on? </strong>
              </p>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={floor}
                  onChange={handleFloorChange}
                >
                  <MenuItem value={"Ground"}>Ground</MenuItem>
                  <MenuItem value={"Basement"}>Basement</MenuItem>
                  <MenuItem value={"First Floor"}>First Floor</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <div className="delivery-options">
              <p>
                <strong>Is there an Elevator? </strong>
              </p>
              <div className="yesno">
                <Button
                  key={"Yes"}
                  className={elevator ? "darkbutton" : "lightbutton"}
                  onClick={() => haveElevator(true)}
                >
                  Yes
                </Button>
                <Button
                  key={"No"}
                  className={elevator ? "lightbutton" : "darkbutton"}
                  onClick={() => haveElevator(false)}
                >
                  No
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className={"price-wrap mb-31"}>
        <div className="delivery-options text-center">
          <p>
            <strong>Your fare estimate is: </strong>
          </p>
          {price !== "" ? <p className="text-large">£ {price}</p> : null}
        </div>
      </div>

      <div className="card-buttons-grid">
        <Button
          key={"Back"}
          className="lightbutton"
          onClick={props.fillVan ? props.goBackThirdScreen : props.goBack}
        >
          Back
        </Button>
        {
          price !== "" ? <Button
            key={"Next"}
            className="darkbutton"
            sx={{mb: "16px"}}
            onClick={!isLogin ? handleOpenLoginModal : props.goToPaymentScreen}
          >
            Add payment option
          </Button> : <Button
            key={"Next"}
            className="darkbutton"
            sx={{mb: "16px"}}
            onClick={!isLogin ? handleOpenLoginModal : addPaymentNow}
          >
            Estimate Price
          </Button>
        }
      </div>
      <SignupModal
        open={open}
        onSignUp={onSignUp}
        handleOpenLoginModal={handleOpenLoginModal}
        handleClose={handleCloseModal}
      />
      <LoginModal
        open={openLoginModal}
        onLogin={onLogin}
        handleModal={setOpenLoginModal}
        handleOpenSignUpModal={handleOpen}
        handleClose={handleCloseModal}
        showError={loginError}
        setLoginError={setLoginError}
      />
    </>
  );
};
export default SelectVan;
