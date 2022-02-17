import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { addCard } from "../../../pages/api/paymentApi";
import CloseIcon from "@mui/icons-material/Close";
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);
const AddCard = ({ cardAdded, handleCloseCard }) => {
 
  const [form, setForm] = useState({
    name: "",
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
  });

  const addCardApi = async () => {
    if (form.name.length < 1) {
      setErrors({ ...errors, name: true });
      return;
    }
    if (form.expires.length < 5) {
      setErrors({ ...errors, expires: true });
      return;
    }
    if (errors.number || errors.cvc) {
      return;
    }
    setErrors({
      number: "",
      expires: "",
      cvc: "",
    });
    let exp = form.expires.split("/");
    addCard({ ...form, exp_month: exp[0], exp_year: exp[1] }).then((res) => {
      console.log("res");
      cardAdded && cardAdded();
    });
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeExpiry = (e) => {
    let textTemp = e.target.value;
    if (textTemp[0] !== "1" && textTemp[0] !== "0") {
      textTemp = "";
    }
    if (textTemp.length === 2) {
      if (
        parseInt(textTemp.substring(0, 2)) > 12 ||
        parseInt(textTemp.substring(0, 2)) == 0
      ) {
        textTemp = textTemp[0];
      } else if (e.target.value.length === 2) {
        textTemp += "/";
      } else {
        textTemp = textTemp[0];
      }
    }
    if (textTemp.length === 5) {
      setErrors({ ...errors, expires: null });
    }
    setForm({
      ...form,
      [e.target.name]: textTemp,
    });
  };
  const [errors, setErrors] = useState({
    number: "",
    expires: "",
    cvc: "",
  });
  const creditCardValidation = ({ target: { value, name } }) => {
    if (String(value).length <= 19) {
      let v = value;
      if (
        String(value).length === 4 ||
        String(value).length === 9 ||
        String(value).length === 14
      ) {
        v = value + " ";
      }
      setForm({
        ...form,
        [name]: v,
      });
      let regEx =
        /^4[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/;
      if (value.replaceAll(" ", "").match(regEx)) {
        setErrors({ ...errors, number: null });
        return true;
      } else {
        console.log("Please enter a valid credit card number.");
        setErrors({ ...errors, number: true });
        return false;
      }
    }
  };
  const handleChangeCVC = ({ target: { value, name } }) => {
    if (String(value).length <= 3) {
      setForm({
        ...form,
        [name]: value,
      });
      if (String(value).length === 3) {
        setErrors({ ...errors, cvc: null });
      } else setErrors({ ...errors, cvc: true });
    }
  };


  return (
    <div className="add-card" style={{ backgroundColor: "white" }}>
      <div className="card-heading mb-33">
        <div style={{ display: "flex" }}>
          <Typography className="mb-5" variant="h6" gutterBottom component="h2">
            Add Card Details
          </Typography>
          <CloseIcon
            style={{ flex: "auto", justifyContent: "end" }}
            onClick={handleCloseCard}
            fontSize="inherit"
          />
        </div>

        <Typography variant="p" gutterBottom component="p">
          Lorem ipsum dolor sit amet
        </Typography>
      </div>

      <div>
        <Box>
          <TextField
            required
            name="name"
            className="w-100 input"
            label="Name on card"
            variant="outlined"
            type="text"
            value={form.name}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <TextField
            required
            name="number"
            className="w-100 input"
            label="Card number"
            variant="outlined"
            inputProps={{ maxLength: "19" }}
            type="text"
            value={form.number}
            onChange={creditCardValidation}
            error={errors.number}
            helperText={errors.number ? "Invalid Card" : ""}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyCotent: "space-between",
            alignItem: "center",
          }}
        >
          <TextField
            required
            name="expires"
            className="w-100 input mr-20"
            label="Expires"
            variant="outlined"
            inputProps={{ maxLength: "5" }}
            value={form.expires}
            onChange={handleChangeExpiry}
            error={errors.expires}
            helperText={errors.expires ? "Invalid Expiry date" : ""}
          />
          <TextField
            required
            name="cvc"
            type="number"
            className="w-100 input"
            label="CVC"
            variant="outlined"
            inputProps={{ maxLength: "3" }}
            value={form.cvc}
            onChange={handleChangeCVC}
            error={errors.cvc}
            helperText={errors.cvc ? "Wrong CVC" : ""}
          />
        </Box>
        <Button className="w-100 payment" onClick={addCardApi}>
          Add Payment Method
        </Button>
      </div>
    </div>
  );
};

const Wrapper = ({ cardAdded, handleCloseCard }) => {
  return (
    <Elements stripe={stripePromise}>
      <AddCard cardAdded={cardAdded} handleCloseCard={handleCloseCard} />
    </Elements>
  );
};

export default Wrapper;
