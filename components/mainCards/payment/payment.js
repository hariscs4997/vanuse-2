import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import {
  getAllCards,
  postSecret,
  removeCard,
} from "../../../pages/api/paymentApi";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Payment = ({ addPaymentMethod, addPayment, goToCompleteTripScreen }) => {
  const [cardsData, setCardsData] = useState([]);
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState(-1);
  const [secretKey, setSecretKey] = useState(null);

  useEffect(() => {
    if (!addPayment) getCardLocalFn();
  }, [addPayment]);

  const getCardLocalFn = async () => {
    let cardsTemp = await getAllCards();
    console.log("cardsTemp", cardsTemp);
    setCardsData(cardsTemp);
  };

  const deleteCard = (id) => {
    removeCard(id)
      .then((res) => {
        console.log("res", res);
        getCardLocalFn();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const completeTrip = () => {
    goToCompleteTripScreen(secretKey);
  };
  return (
    <>
      <div className="card-heading mb-31">
        <h2>Payment Methods</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
      </div>
      <div>
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="master-card"
        >
          <img src="/master.svg" alt="master" />
          <Box className="heading">
            <Typography variant="h6" gutterBottom component="h6">
              Cash Payment
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="p">
              Default method
            </Typography>
          </Box>

          <Checkbox
            checked={currentPaymentMethod === -1}
            onClick={() => {
              setSecretKey(null);
              setCurrentPaymentMethod(-1);
            }}
            {...label}
            defaultChecked
          />
        </Box> */}
        {cardsData?.map((m, i) => {
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              className="visa-card"
            >
              <img src="/Visa.svg" alt="master" />
              <Box className="heading">
                <Typography variant="h6" gutterBottom component="h6">
                  **** **** **** {m.card.last4}
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="p">
                  Expires {m.card.exp_month}/{m.card.exp_year}
                </Typography>
              </Box>
              <IconButton onClick={() => deleteCard(m.id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
              <Checkbox
                checked={currentPaymentMethod === i}
                onClick={async () => {
                  await setSecretKey(null);
                  console.log("card id", m.id);
                  setCurrentPaymentMethod(i);
                  let secret = await postSecret(m.id);
                  setSecretKey(secret);
                }}
              />
            </Box>
          );
        })}

        <Box className="add-btns">
          <Button onClick={addPaymentMethod} className="w-100 add-payment">
            Add Payment Method
          </Button>
          <Button
            className="w-100 next"
            onClick={completeTrip}
            disabled={!secretKey}
          >
            Next
          </Button>
        </Box>
      </div>
    </>
  );
};

export default Payment;
