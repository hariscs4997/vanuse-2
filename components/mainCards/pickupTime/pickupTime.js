import React, { useState, useEffect } from "react";
import moment from "moment";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Hours = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const Minutes = ["00", "15", "30", "45"];
const AMPM = ["AM", "PM"];

const PickupTime = (props) => {
  const isScheduled = localStorage.getItem("is-scheduled") === "true";
  const [immediateChecked, setImmediateChecked] = React.useState(
    !props.clickSchedule && !isScheduled ? true : false
  );
  const [scheduleChecked, setScheduleChecked] = React.useState(
    props.clickSchedule || isScheduled ? true : false
  );
  const [showHoursMinutesAmpm, setShowHoursMinutesAmpm] = React.useState(
    props.clickSchedule || isScheduled ? true : false
  );
  const [showDateBox, setShowDateBox] = React.useState(
    props.clickSchedule || isScheduled ? true : false
  );

  const [hoursBorder, setHoursBorder] = React.useState(false);
  const [minutesBorder, setMinutesBorder] = React.useState(false);
  const [fillColor, setFillColor] = React.useState(false);

  const [hoursValue, setHoursValue] = React.useState(
    localStorage.getItem("scheduled-hours") || "10"
  );
  const [minutesValue, setMinutesValue] = React.useState(
    localStorage.getItem("scheduled-minutes") || "00"
  );
  const [ampmValue, setAmpm] = React.useState(
    localStorage.getItem("scheduled-ampm") || "AM"
  );
  localStorage.removeItem("set-hours");
  localStorage.removeItem("set-minutes");
  localStorage.removeItem("date-value-all");

  const dropdownMenuProps = {
    menuStyle: {
      border: "1px solid black",
      borderRadius: "5%",
      backgroundColor: "lightgrey",
    },
  };
  const handleHours = (event) => {
    const {
      target: { value },
    } = event;
    setHoursValue(typeof value === "string" ? value.split(",") : value);
    setHoursBorder(true);
    localStorage.setItem("set-hours", value);
  };
  const handleMinutes = (event) => {
    const {
      target: { value },
    } = event;
    setMinutesValue(typeof value === "string" ? value.split(",") : value);
    setMinutesBorder(true);
    localStorage.setItem("set-minutes", value);
  };
  const handleAmpm = (event) => {
    const {
      target: { value },
    } = event;
    setAmpm(typeof value === "string" ? value.split(",") : value);
    setFillColor(true);
    localStorage.setItem("set-am-pm", value);
  };

  useEffect(() => {
    localStorage.setItem("is-scheduled", JSON.stringify(scheduleChecked));
    localStorage.setItem(
      "scheduled-hours",
      typeof hoursValue === "string" ? hoursValue.split(",") : hoursValue
    );
    localStorage.setItem(
      "scheduled-minutes",
      typeof minutesValue === "string" ? minutesValue.split(",") : minutesValue
    );
    localStorage.setItem(
      "scheduled-ampm",
      typeof ampmValue === "string" ? ampmValue.split(",") : ampmValue
    );
  }, [ampmValue, hoursValue, minutesValue, scheduleChecked]);

  useEffect(() => {
    if (showDateBox) {
      props.shedulePickupChange(true);
    } else {
      props.shedulePickupChange(false);
    }
    localStorage.setItem(
      "date-value-all",
      JSON.stringify(props.dateValueFromOtherComp)
    );
  }, [immediateChecked, scheduleChecked, props, localStorage]);

  const handleImmediateChecked = (event) => {
    setScheduleChecked(false);
    setImmediateChecked(true);
    setShowHoursMinutesAmpm(false);
    setShowDateBox(false);
    localStorage.removeItem("set-hours");
    localStorage.removeItem("set-minutes");
    localStorage.removeItem("date-value-all");
  };

  const handleScheduleChecked = (event) => {
    setScheduleChecked(true);
    setShowHoursMinutesAmpm(true);
    setImmediateChecked(false);
    setShowDateBox(true);
    localStorage.setItem("set-hours", hoursValue);
    localStorage.setItem("set-minutes", minutesValue);
    localStorage.setItem(
      "date-value-all",
      JSON.stringify(props.dateValueFromOtherComp)
    );
  };

  return (
    <>
      <div className="card-heading mb-71">
        <h2>Pick-Up Time</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
      </div>

      <div
        className={
          immediateChecked
            ? "card-slection mb-32 selection"
            : "card-slection mb-32"
        }
      >
        <Checkbox
          checked={immediateChecked}
          onChange={handleImmediateChecked}
          inputProps={{ "aria-label": "controlled" }}
        />
        <p>
          <strong>Immediate Pick-up</strong>
        </p>
        <p>Get a van in the next hour</p>
      </div>

      <div
        className={
          scheduleChecked
            ? "card-slection mb-61 selection"
            : "card-slection mb-71"
        }
      >
        <Checkbox
          checked={scheduleChecked}
          onChange={handleScheduleChecked}
          inputProps={{ "aria-label": "controlled" }}
        />
        <p>
          <strong>Schedule A Pickup</strong>
        </p>
        <p>Book a van up to 30 days in advance</p>
      </div>

      {showHoursMinutesAmpm ? (
        <div className="time-wrapper mb-26">
          <div className={hoursBorder ? "select-border select bg-white" : "select"}>
            <FormControl sx={{ m: 1 }}>
              <Select
                labelId="hours"
                id="hours"
                defaultValue={"10"}
                value={hoursValue}
                onChange={handleHours}
                placeholder="Hours"
                input={<OutlinedInput />}
                MenuProps={{ classes: { paper: "bg-grey b-15 h-select" } }}
                // displayEmpty
                // renderValue={(selected) => {
                //     if (selected.length === 0) {
                //     return <span className="placeholder">Hours</span>;
                //     }
                //     return selected.join(', ');
                // }}
              >
                {/* <MenuItem disabled value="">
                                        <em>Hours</em>
                                    </MenuItem> */}
                {Hours.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={minutesBorder ? "select-border select" : "select"}>
            <FormControl sx={{ m: 1 }}>
              <Select
                labelId="minutes"
                id="minutes"
                placeholder="Minutes"
                value={minutesValue}
                onChange={handleMinutes}
                input={<OutlinedInput />}
                MenuProps={{ classes: { paper: "bg-grey b-15 h-select" } }}
                // displayEmpty
                // renderValue={(selected) => {
                //     if (selected.length === 0) {
                //     return <span className="placeholder">Minutes</span>;
                //     }
                //     return selected.join(', ');
                // }}
              >
                {/* <MenuItem disabled value="">
                                        <em>Minutes</em>
                                    </MenuItem> */}
                {Minutes.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={fillColor?"select-fill-color select":"select"}>
            <FormControl sx={{ m: 1 }}>
              <Select
                labelId="ampm"
                id="ampm"
                value={ampmValue}
                onChange={handleAmpm}
                input={<OutlinedInput />}
                MenuProps={{ classes: { paper: "bg-grey b-15" } }}
                // displayEmpty
                // renderValue={(selected) => {
                //     if (selected.length === 0) {
                //     return <span className="placeholder">AM/PM</span>;
                //     }
                //     return selected.join(', ');
                // }}
              >
                {/* <MenuItem disabled value="">
                                        <em>AM/PM</em>
                                    </MenuItem> */}
                {AMPM.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      ) : null}

      {immediateChecked ? (
        <div className="notification-box mb-23">
          <div className="notification-icon">
            <img src="/alarm.svg" alt="alarm" className="icons" />
          </div>
          <div className="notification-text">
            <p>
              Immediate pickups are usually able to be serviced{" "}
              <strong>within an hour.</strong>
              <br />
              We'll notify drivers of your request once payment is complete
            </p>
          </div>
        </div>
      ) : null}

      {scheduleChecked ? (
        <>
          {
            (hoursValue.length > 0,
            minutesValue.length > 0,
            ampmValue.length > 0 ? (
              <div className="notification-box mb-23">
                <div className="notification-icon">
                  <img src="/alarm.svg" alt="alarm" className="icons" />
                </div>
                <div className="notification-text">
                  <p>
                    Driver will arrive on{" "}
                    <strong>
                      {moment(props.dateValueFromOtherComp).format(
                        "dddd DD MMMM"
                      )}
                    </strong>{" "}
                    between{" "}
                    <strong>
                      {hoursValue}:{minutesValue} -{" "}
                      {parseInt(minutesValue) + 15 == "60"
                        ? ++hoursValue
                        : hoursValue}
                      :
                      {parseInt(minutesValue) + 15 == "60"
                        ? "00"
                        : parseInt(minutesValue) + 15}
                      {ampmValue}
                    </strong>
                  </p>
                </div>
              </div>
            ) : null)
          }
        </>
      ) : null}

      <div className="card-buttons-grid">
        <Button
          key={"Back"}
          className="lightbutton"
          onClick={props.goBackFirstScreen}
        >
          Back
        </Button>

        <Button
          key={"Next"}
          className="darkbutton"
          sx={{ mb: "16px" }}
          onClick={props.goNextServices}
        >
          Next
        </Button>
      </div>
    </>
  );
};
export default PickupTime;