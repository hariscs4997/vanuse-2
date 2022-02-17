import React, { useState, useEffect } from "react";
import Axios from "axios";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";

import PickupTime from "./pickupTime/pickupTime";
import PickupDate from "./pickupTime/pickupDate";
import Services from "./services/services";
import AddItems from "./addItems/addItems";
import MyItemsList from "./addItems/myItemsList";
import CustomItems from "./addItems/customItems";
import SelectVan from "./selectVan/selectVan";
import ApplyCoupon from "./coupons/coupons";
import Payment from "./payment/payment";
import AddCard from "./payment/addCard";
import ConfirmBooking from "../confirmBooking/confirmBooking";
import moment from "moment";

function parseDaytime(time) {
  let [hours, minutes] = time
    .substr(0, time.length - 2)
    .split(":")
    .map(Number);
  if (time.includes("PM") && hours !== 12) hours += 12;
  return 1000 * 60  * (hours * 60 + minutes);
}

const Cards = (props) => {
  const [sliderValue, setSliderValue] = React.useState(1);
  const [gettingDate, setGettingDate] = React.useState(
    new Date(localStorage.getItem("scheduled-date") || Date.now())
  );
  const [shedulePickupValue, setShedulePickupValue] = React.useState(false);
  const [viwServices, setViwServices] = React.useState(false);
  const [viwPickupTime, setViwPickupTime] = React.useState(true);
  const [viwAddItemsScreen, setViwAddItemsScreen] = React.useState(false);
  const [viewAddItemsToList, setViewAddItemsToList] = React.useState(false);
  const [myItemsList, setMyItemsList] = React.useState([]);
  const [allItemsList, setAllItemsList] = React.useState([]);
  const [fixedItemsList, setFixedItemsList] = React.useState([]);
  const [fillVan, setFillVan] = React.useState(false);
  const [viewCustomItemsScreen, setViewCustomItemsScreen] =
    React.useState(false);
  const [viewCustomItemsScreenList, setViewCustomItemsScreenList] =
    React.useState(false);
  const [viewSelectaVan, setViewSelectaVan] = React.useState(false);
  const [viewPayment, setViewPayment] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState([]);
  const [secretKey, setSecretKey] = React.useState("");
  const [completeTripScreen, setCompleteTripScreen] = React.useState(false);
  const [showSlider, setShowSlider] = React.useState(true);
  const itemsListFromServer = () => {
    Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/item/category-wise/`)
      .then(function (response) {
        console.log(response.data);
        let ApiRes = response.data;
        setMyItemsList(ApiRes);
        setAllItemsList(ApiRes);
        setFixedItemsList(ApiRes);
        // localStorage.setItem("ApiRes", JSON.stringify(ApiRes));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getDateFromComponent = (date) => {
    setGettingDate(date);
  };

  const shedulePickupChange = (data) => {
    setShedulePickupValue(data);
    console.log("clickSchedule Main", data);
    if (data) {
      setShedulePickupValue(data);
    } else {
      setShedulePickupValue(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("scheduled-date", gettingDate);
  }, [gettingDate]);

  const goNextServices = () => {
    setViwPickupTime(false);
    setViwServices(true);
    setSliderValue(2);
    console.log(gettingDate);
    localStorage.setItem("pickup_time", gettingDate);

    const dataAll = localStorage.getItem("pickup_time");
    const hours = JSON.parse(localStorage.getItem("set-hours"));
    const minutes = localStorage.getItem("set-minutes");
    const ampm = localStorage.getItem("set-am-pm");
    console.log("finaldatetime check", hours, minutes, ampm);

    let validate = "";
    if (hours && minutes && ampm === "PM") {
      validate =
        moment(dataAll).format("YYYY-MM-DD") +
        "T" +
        (12 + hours) +
        ":" +
        minutes +
        ":" +
        moment(dataAll).format("ss[Z]");
    } else if (hours && minutes) {
      console.log("testing 1");
      validate =
        moment(dataAll).format("YYYY-MM-DD") +
        "T" +
        hours +
        ":" +
        minutes +
        ":" +
        moment(dataAll).format("ss[Z]");
    } else {
      var today = new Date();
      today.setHours(today.getHours() + 1);
      validate = JSON.stringify(new Date(today));
      console.log(validate);
    }

    // final date to post api
    localStorage.setItem("final-date-time", validate);

    if (localStorage.getItem("is-scheduled") === "true") {
      const d = new Date(localStorage.getItem("scheduled-date") || Date.now());
      const finalDate = new Date(
        `${
          d.getMonth() + 1
        }/${d.getDate()}/${d.getFullYear()}, ${localStorage.getItem(
          "scheduled-hours"
        )}:${localStorage.getItem(
          "scheduled-minutes"
        )}:00 ${localStorage.getItem("scheduled-ampm")}`
      );
      localStorage.setItem("final-date-time", finalDate.toISOString());
    }
    console.log("finaldatetime", validate);
  };

  const goNextFourScreen = () => {
    setViwPickupTime(false);
    setViwServices(false);
    setFillVan(false);
    localStorage.setItem("is_van_filled", JSON.stringify(false));
    setViwAddItemsScreen(true);
    setViewCustomItemsScreenList(true);
    setSliderValue(3);
  };

  const gotoSelectaVanScreen = () => {
    setViwAddItemsScreen(false);
    setViewCustomItemsScreenList(false);
    setSliderValue(4);
    setViewSelectaVan(true);
  };

  const goDirectlyVanScreen = () => {
    setViwPickupTime(false);
    setViwServices(false);
    setSliderValue(4);
    setFillVan(true);
    localStorage.setItem("is_van_filled", JSON.stringify(true));
    setViewSelectaVan(true);
  };
  const goBackSecondScreen = () => {
    setViwServices(false);
    setViwPickupTime(true);
    setSliderValue(1);
    setViewAddItemsToList(false);
    localStorage.removeItem("set-hours");
    localStorage.removeItem("set-minutes");
    localStorage.removeItem("set-am-pm");
    localStorage.removeItem("date-value-all");
  };

  const goBackThirdScreen = () => {
    setViwPickupTime(false);
    setViwAddItemsScreen(false);
    setViwServices(true);
    setSliderValue(2);
    setViewAddItemsToList(false);
    setViewCustomItemsScreen(false);
    setViewCustomItemsScreenList(false);
  };
  const goBackDirectlyThirdScreen = () => {
    setViwPickupTime(false);
    setViwAddItemsScreen(false);
    setViwServices(true);
    setSliderValue(2);
    setFillVan(false);
    setViewAddItemsToList(false);
    setViewCustomItemsScreen(false);
    setViewCustomItemsScreenList(false);
    setViewSelectaVan(false);
  };

  const goBackThirdMainScreen = () => {
    console.log(fixedItemsList);
    setViwAddItemsScreen(true);
    setViewAddItemsToList(true);
    setViewCustomItemsScreen(false);
    setViewCustomItemsScreenList(true);
    setSliderValue(3);
    setViewSelectaVan(false);
  };

  const goBackItemsScreen = () => {
    setViwAddItemsScreen(true);
    setViewAddItemsToList(true);
    setViewCustomItemsScreen(false);
    setViewCustomItemsScreenList(true);
    setSliderValue(3);
    setViewSelectaVan(false);
  };

  const goToPaymentScreen = () => {
    setViwAddItemsScreen(false);
    setViewAddItemsToList(false);
    setViewCustomItemsScreen(false);
    setSliderValue(5);
    setViewSelectaVan(false);
    setViewPayment(true);
  };

  const increaseQty = (list, qty, ind, key) => {
    console.log("increaseQty rooms", qty, ind, key);
    let keys = key;

    const rooms = JSON.parse(JSON.stringify(list));
    const listItems = JSON.parse(JSON.stringify(fixedItemsList));
    rooms[JSON.parse(JSON.stringify(keys))].subitems[
      JSON.parse(JSON.stringify(ind))
    ].quantity++;
    listItems[JSON.parse(JSON.stringify(keys))].subitems[
      JSON.parse(JSON.stringify(ind))
    ].quantity++;

    setAllItemsList(rooms);
    setFixedItemsList(listItems);
    setMyItemsList(rooms);
  };

  const decreaseQty = (list, qty, ind, key) => {
    let kiy = key;
    const rooms = JSON.parse(JSON.stringify(list));
    const listItems = JSON.parse(JSON.stringify(fixedItemsList));

    console.log("decreaseQty rooms", rooms);

    if (
      rooms[JSON.parse(JSON.stringify(kiy))].subitems[
        JSON.parse(JSON.stringify(ind))
      ].quantity
    ) {
      rooms[JSON.parse(JSON.stringify(kiy))].subitems[
        JSON.parse(JSON.stringify(ind))
      ].quantity--;
      listItems[JSON.parse(JSON.stringify(kiy))].subitems[
        JSON.parse(JSON.stringify(ind))
      ].quantity--;
    } else {
      rooms[JSON.parse(JSON.stringify(kiy))].subitems[
        JSON.parse(JSON.stringify(ind))
      ].quantity = 0;
      listItems[JSON.parse(JSON.stringify(kiy))].subitems[
        JSON.parse(JSON.stringify(ind))
      ].quantity = 0;
    }
    setAllItemsList(rooms);
    setFixedItemsList(listItems);
    setMyItemsList(rooms);
  };

  const clearQty = (list, qty, ind, kiy) => {
    console.log("clearQty", qty, ind, kiy);
    const List = JSON.parse(JSON.stringify(list));
    const fixedList = JSON.parse(JSON.stringify(fixedItemsList));
    List[JSON.parse(JSON.stringify(kiy))].subitems[
      JSON.parse(JSON.stringify(ind))
    ].quantity = 0;
    fixedList[JSON.parse(JSON.stringify(kiy))].subitems[
      JSON.parse(JSON.stringify(ind))
    ].quantity = 0;
    console.log("clearQty 2", List);
    setFixedItemsList(fixedList);
    setAllItemsList(List);
    setMyItemsList(List);
  };

  const customItem = () => {
    setViwPickupTime(false);
    setViwAddItemsScreen(false);
    setViwServices(false);
    setViewCustomItemsScreen(true);
  };

  const getValueFromCustomForm = (formData) => {
    const getIndex = myItemsList.length - 1;

    setMyItemsList((prevState) => [
      ...prevState,
      {
        id: getIndex + 1,
        name: "Custom Items",
        subitems: [formData],
      },
    ]);

    setAllItemsList((prevState) => [
      ...prevState,
      {
        id: getIndex + 1,
        name: "Custom Items",
        subitems: [formData],
      },
    ]);
    setFixedItemsList((prevState) => [
      ...prevState,
      {
        id: getIndex + 1,
        name: "Custom Items",
        subitems: [formData],
      },
    ]);
    setViwAddItemsScreen(true);
    setViewCustomItemsScreen(false);
    console.log("getValueFromCustomForm myItemsList", myItemsList);
  };

  useEffect(() => {
    // localStorage.setItem("allItems", allItemsList);

    // console.log('ApiRes localStorage', localStorage.getItem("allItems"));
    itemsListFromServer();
  }, []);

  const [addPayment, setAddPayment] = useState(false);

  const addPaymentMethod = () => {
    console.log("addPaymentMethod");
    setAddPayment(true);
  };
  const goToCompleteTripScreen = (secret) => {
    setViwAddItemsScreen(false);
    setViewAddItemsToList(false);
    setViewCustomItemsScreen(false);
    setViewSelectaVan(false);
    setViewPayment(false);
    setShowSlider(false);
    setSecretKey(secret);
    setCompleteTripScreen(true);
  };

  const cardAdded = () => {
    setAddPayment(false);
  };

  return (
    <>
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <div className="banner-card">
            <div className="card-content">
              {showSlider ? (
                <div className="card-slider">
                  <Slider
                    aria-label="Volume"
                    value={sliderValue}
                    max={5}
                    disabled
                  />
                  <span className="card-slider-count">{sliderValue}/5</span>
                </div>
              ) : null}
              {viewSelectaVan ? (
                <SelectVan
                  goBack={goBackItemsScreen}
                  goBackThirdScreen={goBackDirectlyThirdScreen}
                  fillVan={fillVan}
                  goToPaymentScreen={goToPaymentScreen}
                  authorized={props.authorized}
                />
              ) : null}
              {viewCustomItemsScreen ? (
                <CustomItems
                  goBackThirdMainScreen={goBackThirdMainScreen}
                  getValueFromCustomForm={getValueFromCustomForm}
                  allItemsList={allItemsList}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                />
              ) : null}
              {viwAddItemsScreen ? (
                <AddItems
                  goBackThirdScreen={goBackThirdScreen}
                  goNext={gotoSelectaVanScreen}
                  allItemsList={allItemsList}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                  fixedList={fixedItemsList}
                  customItem={customItem}
                />
              ) : null}
              {viwServices ? (
                <Services
                  goBackSecondScreen={goBackSecondScreen}
                  goNextFourScreen={goNextFourScreen}
                  goDirectlyVanScreen={goDirectlyVanScreen}
                />
              ) : null}
              {viwPickupTime ? (
                <PickupTime
                  dateValueFromOtherComp={gettingDate}
                  shedulePickupChange={shedulePickupChange}
                  goBackFirstScreen={props.goBack}
                  goNextServices={goNextServices}
                  clickSchedule={props.clickSchedule}
                />
              ) : null}
              {viewPayment ? (
                <Payment
                  addPaymentMethod={addPaymentMethod}
                  addPayment={addPayment}
                  goToCompleteTripScreen={goToCompleteTripScreen}
                />
              ) : null}
              {completeTripScreen ? (
                <ConfirmBooking secretKey={secretKey} />
              ) : null}
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={5}>
          {viewSelectaVan ? <ApplyCoupon /> : null}
          {viewCustomItemsScreenList ? (
            <MyItemsList
              myItemsList={fixedItemsList}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              clearQty={clearQty}
            />
          ) : null}
          {viwPickupTime ? (
            <>
              {shedulePickupValue ? (
                <PickupDate getDate={getDateFromComponent} />
              ) : null}
            </>
          ) : null}
          {addPayment ? (
            <Grid style={{ zIndex: 999 }} item xs={12} md={4}>
              <AddCard
                cardAdded={cardAdded}
                handleCloseCard={() => {
                  setAddPayment(false);
                }}
              />
            </Grid>
          ) : null}
          {!addPayment ? (
            <div className="right-heading">
              <img src="/blue-car.svg" alt="Banner Car" className="bluecar" />
            </div>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default Cards;