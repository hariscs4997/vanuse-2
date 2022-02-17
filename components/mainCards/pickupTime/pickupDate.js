import React, { useState, useEffect } from "react";
import CalendarPicker from "@mui/lab/CalendarPicker";
import moment from "moment";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const PickupDate = (props) => {
  const [date, setDate] = React.useState(
    new Date(localStorage.getItem("scheduled-date") || Date.now())
  );

  const getMonth = moment().add(1, "M").startOf("month").format("YYYY-MM");
  const getDay = moment(new Date()).format("DD");
  const minDate = new Date("2020-01-01T00:00:00.000");
  const maxDate = new Date(`${getMonth}-${getDay}T00:00:00.000`);
  const setDateNow = (newDate) => {
    setDate(newDate);
    props.getDate(newDate);
  };
  // const disableWeekends = (date) => {
  //   return date.getDay() === 30 ;
  // }
  return (
    <div className="date-card">
      <div className="card-content">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarPicker
            date={date}
            startDate={date}
            minDate={minDate}
            maxDate={maxDate}
            // disableFuture={minDate >=30 ? true:false}
            // shouldDisableDate={disableWeekends}
            views={["day"]}
            displayStaticWrapperAs="desktop"
            disablePast
            onChange={(newDate) => setDateNow(newDate)}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};
export default PickupDate;