import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useStripe, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { paymentSuccess } from "../../pages/api/paymentApi";
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);

const ConfirmBooking = ({ secretKey }) => {
  const price = localStorage.getItem("price");
  const van = localStorage.getItem("van");
  const pickupTime = new Date(localStorage.getItem("final-date-time")).toLocaleString()
  const pickup = JSON.parse(localStorage.getItem("pick_address_line_1")).title;
  const destination = JSON.parse(localStorage.getItem("pick_address_line_2")).title;
  const items = JSON.parse(localStorage.getItem("TripObject"));
  let itemsLength = 0;
  if(items){
    Object.keys(items).map((key)=>{
      items[key].map((elem)=>{
        itemsLength+= parseInt(elem.quantity)
      })
    })
  }

  const getVanImage = (van) => {
    if(van === 'small'){
      return '/s-van.svg'
    }
    else if(van === 'medium'){
      return '/m-green-van.svg'
    }
    else if(van === 'large'){
      return '/l-van.svg'
    }
    else if(van === 'extra large'){
      return '/x-van.svg'
    }
  }
  const stripe = useStripe();
  const doPayment = async () => {
    if (secretKey) {
      stripe
        .confirmCardPayment(secretKey)
        .then((res) => {
          console.log("Status", res.paymentIntent.status);
          paymentSuccess()
        })
        .catch((err) => {
        });
    }
  };

  return (
    <>
      <Box className="card-heading mb-39">
        <h2>Confirm Booking</h2>
        <p className="font-14">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
      </Box>
      <Box className="booking-time">
        <Box>
          <img src={getVanImage(van)} />
          <Typography className="font-12 text-center" variant="p" component="p">
            {van}
          </Typography>
        </Box>
        <Box>
          <Box sx={{ display: "flex", alignItem: "center" }}>
            <Box className="heading font-14" sx={{ textDecoration: "underline" }}>
              {itemsLength} items
            </Box>
            <Box className="detail">&nbsp;</Box>
          </Box>
          <Box sx={{ display: "flex", alignItem: "center" }}>
            <Box className="heading font-14">Pick up:</Box>
            <Box className="detail">{pickupTime}</Box>
          </Box>
          <Box sx={{ display: "flex", alignItem: "center" }}>
            <Box className="heading font-14">Trip Time:</Box>
            <Box className="detail">16 minutes</Box>
          </Box>
        </Box>
      </Box>
      <Box className="total b-bottom mb-20">
        <Typography className="text-center mb-10 fw-bold purple" variant="p" component="p">
          Total
        </Typography>
        <Typography className="text-center mb-10 fw-bold purple font-32" variant="p" component="p">
          £ {price}
        </Typography>
        <Typography className="text-center mb-10 light-purple font-14" variant="p" component="p">
          incl. Tax
        </Typography>
        {secretKey ? <Typography className="text-center light-purple font-14" variant="p" component="p">
          Card Number: xxxx-xxxx-xxxx-2036
        </Typography> : null}
        
      </Box>
      <Box className="pickup-destination">
        <Box className="left-line">
          <img src="/circle.svg" />
          <img src="/Line.svg" />
          <img src="/Rectangle.svg" />
        </Box>
        <Box className="destination">
          <Box className="mb-21">
            <Typography className="heading fw-bold purple font-12" variant="p" component="div">
              Pick-up
            </Typography>
            <Typography className="font-16 light-purple fw-bold" variant="heading" component="h6">
              {pickup}
            </Typography>
          </Box>
          <Box className="mb-21">
            <Typography className="heading fw-bold purple font-12" variant="p" component="div">
              Destination
            </Typography>
            <Typography className="font-16 light-purple fw-bold" variant="heading" component="h6">
              {destination}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box className="add-btns">
          <Button className="w-100 next" onClick={doPayment}>
            Confirm Trip
          </Button>
        </Box>
      </Box>
    </>
  );
};

const Wrapper = ({ secretKey }) => {
  return (
    <Elements stripe={stripePromise}>
      <ConfirmBooking secretKey={secretKey} />
    </Elements>
  );
};

export default Wrapper;
