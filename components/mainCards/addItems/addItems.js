import React, { useState, useEffect } from "react";

import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const AddItems = (props) => {
  const [fillVanChecked, setfillVanChecked] = React.useState(true);
  const [scheduleVanChecked, setscheduleVanChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [filteredData, setFilteredData] = React.useState([]);
  // const [selectedTaskList, setSelectedTaskList] = React.useState([]);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setFilteredData(props.allItemsList);

    setLoading(false);
  }, [fillVanChecked, scheduleVanChecked, props.allItemsList]);

  const filterData = (e) => {
    const filterValue = e.target.value;
    if(e.target.value){
      console.log(props.allItemsList)
      const editedTaskList = props.fixedList.filter(
        (data) => JSON.stringify(data).toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
      );
      setFilteredData(editedTaskList);
    }
    else{
      setFilteredData(props.fixedList)
    }
  };

  return (
    <>
      <div className="card-heading mb-31">
        <h2>Add Items</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
      </div>

      <Box sx={{ display: "flex", alignItems: "center" }} className="mb-31 search-box">
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" variant="outlined" placeholder="Search" onChange={filterData} />
      </Box>

      <div className="mb-31">
        {loading ? (
          "Loading Data..."
        ) : (
          <>
            {filteredData.length > 0 ? <p>Or quickly add items from a list of popular rooms:</p> : null}
            {filteredData.length <= 0 ? <p>0 Items Found</p> : null}
            <div className="items-list mb-20">
              {console.log("itemsListFromServer filteredData>>>>>", filteredData)}
              {filteredData &&
                filteredData.map((list, index) => {
                  return (
                    <>
                      {list.name !== "Custom Items" ? (
                        <Accordion expanded={expanded === list.id} onChange={handleChange(list.id)}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="text-green" />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            <Typography sx={{ color: "text.secondary" }}>{list.title}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              {list.subitems.map((item, i) => {
                                return (
                                  <div className="child-items" key={i}>
                                    {item.name}
                                    <div className="cart">
                                      <Button
                                        key={"-"}
                                        className="cart-increase"
                                        onClick={() => props.decreaseQty(filteredData,item, i, list.id)}
                                      >
                                        {" "}
                                        -{" "}
                                      </Button>
                                      <TextField id="qty" value={item.quantity} min={0} />
                                      <Button
                                        key={"+"}
                                        className="cart-increase"
                                        onClick={() => props.increaseQty(filteredData,item, i, list.id)}
                                      >
                                        {" "}
                                        +{" "}
                                      </Button>
                                    </div>
                                  </div>
                                );
                              })}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      ) : null}
                    </>
                  );
                })}
            </div>
            <p>
              Cant find what you need? Add a custom item{" "}
              <span className="link" onClick={props.customItem}>
                here
              </span>
            </p>
          </>
        )}
      </div>

      <div className="card-buttons-grid">
        <Button key={"Back"} className="lightbutton" onClick={props.goBackThirdScreen}>
          Back
        </Button>

        <Button key={"Next"} className="darkbutton" sx={{ mb: "16px" }} onClick={props.goNext}>
          Next
        </Button>
      </div>
    </>
  );
};
export default AddItems;
