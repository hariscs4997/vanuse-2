import React, { useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import CustomMap from "../mapBox/customMap";

import Cards from "../mainCards/cards";
import Typography from "@mui/material/Typography";
import debounce from "lodash/debounce";
import config from "../../src/config.json";
import { mapService } from "../../services/map.service";
import isEqual from "lodash/isEqual";

const filter = createFilterOptions();

export const resetLocalStorage = () => {
  for (let key of Object.keys(localStorage)) {
    console.log("key: ", key);
    if (["user_token", "token"].includes(key)) continue;
    localStorage.removeItem(key);
  }
};

const SearchCard = (props) => {
  const [startPoint, setStartPoint] = React.useState(null);
  const [endPoint, setEndPoint] = React.useState(null);
  const [allTitles, setAllTitles] = React.useState([]);
  const [allTitles2, setAllTitles2] = React.useState([]);
  const [open, toggleOpen] = React.useState(false);
  const [border1, setBorder1] = React.useState(false);
  const [border2, setBorder2] = React.useState(false);
  const [drawPoints, setDrawPoints] = React.useState(false);
  const [focusActive, setFocusActive] = React.useState(false);
  const [focusActiveEnd, setFocusActiveEnd] = React.useState(false);
  const [goBackValue, setGoBackValue] = React.useState(false);
  const [clickSchedule, setClickSchedule] = React.useState(false);

  const [sliderCard, setSliderCard] = React.useState(false);

  useEffect(() => {
    resetLocalStorage();
  }, []);
  
  useEffect(() => {
    if (startPoint) {
      selectOnFocusFunc();
    }
    if (endPoint) {
      selectOnFocusFuncEnd();
    }
  }, [startPoint, endPoint, drawPoints, focusActive, sliderCard]);

  const handleClose = () => {
    setDialogStartPoint({
      title: "",
      longitude: "",
      latitude: "",
    });
    setDialogEndPoint({
      title: "",
      longitude: "",
      latitude: "",
    });

    toggleOpen(false);
  };

  const [dialogStartPoint, setDialogStartPoint] = React.useState({
    title: "",
    longitude: "",
    latitude: "",
  });
  const [dialogEndPoint, setDialogEndPoint] = React.useState({
    title: "",
    longitude: "",
    latitude: "",
  });

  // starting trip actions
  const getStartPointInput = (e) => {
    // console.log('look start', e.target.value);
    if (
      e &&
      e.target.value &&
      e.target.value !== 0 &&
      e.target.value.length > 3
    ) {
      mapService
        .getPlace(e.target.value)
        .then((data) => {
          // console.log("coordinates >>>>>", data.features);
          let result = data.features.map((list) => ({
            title: list.place_name,
            longitude: list.geometry.coordinates[0],
            latitude: list.geometry.coordinates[1],
          }));
          // console.log("result", result);

          if (!isEqual(result, allTitles)) {
            setAllTitles(result);
            console.log("result", result);
          }
          // console.log("allTitles", allTitles);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  // end trip actions
  const getEndpointInput = (e) => {
    // console.log('look end', e.target.value);
    if (
      e &&
      e.target.value &&
      e.target.value !== 0 &&
      e.target.value.length > 3
    ) {
      mapService
        .getPlace(e.target.value)
        .then(function (data) {
          // console.log("coordinates >>>>>", response.data.features);
          let result = data.features.map((list) => ({
            title: list.place_name,
            longitude: list.geometry.coordinates[0],
            latitude: list.geometry.coordinates[1],
          }));

          if (!isEqual(result, allTitles2)) {
            setAllTitles2(result);
            // console.log("result", result);
          }
          // console.log("allTitles 2", allTitles2);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const goDrawPoints = () => {
    setDrawPoints(true);
  };

  const selectOnFocusFunc = () => {
    setFocusActive(true);
  };

  const unselectOnFocusFunc = () => {
    setFocusActive(!focusActive);
  };

  const selectOnFocusFuncEnd = () => {
    setFocusActiveEnd(true);
  };

  const unselectOnFocusFuncEnd = () => {
    setFocusActiveEnd(!focusActiveEnd);
  };

  const scheduleNow = () => {
    console.log("scheduleNow");
    setClickSchedule(false);
    setSliderCard(true);
  };

  const scheduleLater = () => {
    console.log("scheduleLater");
    setSliderCard(true);
    setClickSchedule(true);
  };

  const goBack = () => {
    console.log("goBack");
    setGoBackValue(true);
    setSliderCard(false);
  };

  const setBorder1Value = (data) => {
    data.map((item) => {
      if (item) {
        setBorder1(true);
      } else {
        setBorder1(false);
      }
    });
  };
  const setBorder2Value = (data) => {
    data.map((item) => {
      if (item) {
        setBorder2(true);
      } else {
        setBorder2(false);
      }
    });
  };
  return sliderCard ? (
    <Cards
      goBack={goBack}
      clickSchedule={clickSchedule}
      authorized={props.authorized}
    />
  ) : (
    <>
      <Grid container spacing={10} className="banner-section">
        <Grid item sm={12} md={6}>
          <div className={"banner-card"}>
            {/* map */}
            <div className="map">
              <CustomMap startPoint={startPoint} endPoint={endPoint} />
            </div>
            {/* content */}
            <div className="card-content">
              {startPoint && endPoint ? (
                <div>
                  <h2>Does this look correct?</h2>
                  <br />
                </div>
              ) : (
                <div>
                  <h2>Need help with a move?</h2>
                  <p className="mb-52">
                    Book on demand or a pre-scheduled van.
                  </p>
                </div>
              )}

              <div className="card-form">
                <Paper
                  component="form"
                  className={focusActive ? "start-field-active" : "start-field"}
                  onMouseOver={selectOnFocusFunc}
                  onMouseOut={!startPoint ? unselectOnFocusFunc : null}
                  onBlur={!startPoint ? unselectOnFocusFunc : null}
                  sx={{
                    mb: "30px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    background: "#F7F7FC",
                    boxShadow: "none",
                  }}
                >
                  <IconButton sx={{ p: "10px" }} aria-label="icon">
                    <img
                      src="/search-start.svg"
                      alt="search start"
                      className="icons"
                    />
                  </IconButton>
                  <Autocomplete
                    value={startPoint}
                    onInputChange={debounce(
                      getStartPointInput,
                      config.debounceTimeMs
                    )}
                    
                    onChange={(event, newStartPoint) => {
                      localStorage.setItem(
                        "pick_address_line_1",
                        JSON.stringify(newStartPoint)
                      );
                      // console.log(newStartPoint);
                      if (typeof newStartPoint === "string") {
                        setDrawPoints(false);
                        setTimeout(() => {
                          toggleOpen(true);
                          setDialogStartPoint({
                            title: newStartPoint,
                            longitude: "",
                            latitude: "",
                          });
                        });
                      } else if (newStartPoint && newStartPoint.inputValue) {
                        setDrawPoints(false);
                        toggleOpen(true);
                        setDialogStartPoint({
                          title: newStartPoint.inputValue,
                          longitude: "",
                          latitude: "",
                        });
                      } else {
                        setDrawPoints(false);
                        if (!isEqual(newStartPoint, startPoint)) {
                          setStartPoint(newStartPoint);
                        }
                        if (newStartPoint && endPoint) {
                          setDrawPoints(true);
                        }
                      }
                    }}
                    id="free-solo-dialog-demo"
                    className="custom-input"
                    options={allTitles}
                    getOptionLabel={(option) => {
                      // e.g value selected with enter, right from the input
                      if (typeof option === "string") {
                        return option;
                      }
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                      return option.title;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderOption={(props, option) => (
                      <li {...props}>{option.title}</li>
                    )}
                    sx={{ ml: 1, flex: 1 }}
                    freeSolo
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Enter pickup address"
                      />
                    )}
                  />
                </Paper>
                <Paper
                  component="form"
                  className={
                    focusActiveEnd ? "start-field-active" : "start-field"
                  }
                  onMouseOver={selectOnFocusFuncEnd}
                  onMouseOut={!endPoint ? unselectOnFocusFuncEnd : null}
                  onBlur={!endPoint ? unselectOnFocusFuncEnd : null}
                  sx={{
                    mb: "50px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    background: "#F7F7FC",
                    boxShadow: "none",
                  }}
                >
                  <IconButton sx={{ p: "10px" }} aria-label="icon">
                    <img
                      src="/search-end.png"
                      alt="search end"
                      className="icons"
                    />
                  </IconButton>
                  <Autocomplete
                    value={endPoint}
                    onInputChange={debounce(
                      getEndpointInput,
                      config.debounceTimeMs
                    )}
                    
                    onChange={(event, newEndPoint) => {
                      localStorage.setItem(
                        "pick_address_line_2",
                        JSON.stringify(newEndPoint)
                      );
                      // console.log(newEndPoint);
                      if (typeof newEndPoint === "string") {
                        setTimeout(() => {
                          setDrawPoints(false);
                          toggleOpen(true);
                          setDialogEndPoint({
                            title: newEndPoint,
                            longitude: "",
                            latitude: "",
                          });
                        });
                      } else if (newEndPoint && newEndPoint.inputValue) {
                        setDrawPoints(false);
                        toggleOpen(true);
                        setDialogEndPoint({
                          title: newEndPoint.inputValue,
                          longitude: "",
                          latitude: "",
                        });
                      } else {
                        setDrawPoints(false);

                        if (!isEqual(newEndPoint, endPoint)) {
                          setEndPoint(newEndPoint);
                        }
                        if (startPoint && newEndPoint) {
                          setDrawPoints(true);
                        }
                      }
                    }}
                    id="free-solo-dialog-demo2"
                    className="custom-input"
                    options={allTitles2}
                    getOptionLabel={(option) => {
                      if (typeof option === "string") {
                        return option;
                      }
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                      return option.title;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderOption={(props, option) => (
                      <li {...props}>{option.title}</li>
                    )}
                    sx={{ ml: 1, flex: 1 }}
                    freeSolo
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Enter destination address"
                      />
                    )}
                  />
                </Paper>
              </div>
              <div className="card-buttons">
                <Button
                  key={"Request Now"}
                  className="darkbutton"
                  sx={{ mb: "16px" }}
                  disabled={startPoint && endPoint ? false : true}
                  onClick={() => scheduleNow()}
                >
                  Request Now
                </Button>
                <Button
                  key={"Schedule Later"}
                  className="lightbutton blue-color"
                  onClick={() => scheduleLater()}
                  disabled={startPoint && endPoint ? false : true}
                >
                  Schedule Later
                </Button>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item sm={12} md={6}>
          <div className="right-heading">
            <div>
              <Typography variant="h1" gutterBottom component="h1">
                Order a van <br />
                any time, <br />
                any place in the UK.
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="p">
                Lorem ipsum
              </Typography>
            </div>

            <img src="/blue-car.svg" alt="Blue Car" className="bluecar" />
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default SearchCard;
