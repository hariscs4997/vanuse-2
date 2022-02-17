import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const CustomItems = (props) => {
  const [quantity, setQuantity] = React.useState(1);
  const [customObject, setCustomObject] = React.useState({
    key: 3,
    title: "Custom Items",
    subitems: [],
  });
  const [itemId, setItemId] = React.useState("1");
  const [itemTitle, setItemTitle] = React.useState("");
  const [itemWidth, setItemWidth] = React.useState("");
  const [itemHeight, setItemHeight] = React.useState("");
  const [itemDepth, setItemDepth] = React.useState("");
  const [itemInstructions, setItemInstructions] = React.useState("");

  const increaseQty = () => {
    if (quantity < 1) {
      setQuantity(0);
    } else {
      setQuantity(++quantity);
    }
  };
  const decreaseQty = () => {
    console.log("decreaseQty", quantity);
    if (quantity < 1) {
      setQuantity(0);
    } else {
      setQuantity(--quantity);
    }
  };

  const addToList = () => {
    const newData = {
      id: itemId,
      name: itemTitle,
      quantity: quantity,
      dim_x: itemWidth,
      dim_y: itemHeight,
      dim_z: itemDepth,
      instructions: itemInstructions,
      itemcategory_id: 90,
    };

    console.log("customObject", customObject);

    props.getValueFromCustomForm(newData);

    setTimeout(() => {
      setItemTitle(""), setQuantity(0), setItemWidth(0), setItemHeight(0), setItemDepth(0), setItemInstructions("");
    }, 0);
  };

  return (
    <>
      <div className="card-heading mb-31">
        <h2>Add Custom Item</h2>
        <p className="f-14">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
      </div>

      <div className="mb-31 custom-title">
        <TextField
          id="outlined-basic"
          label="Item Title *"
          className="text-input"
          InputProps={{
            classes: {
              input: 'f-14',
            },
          }}
          variant="outlined"
          value={itemTitle}
          onChange={(e) => setItemTitle(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="mb-31 add-items-qty">
        <p className="f-14">
          Quantity <span className="color-text">*</span>
        </p>
        <div className="mb-31 cart-list">
          <Button key={"-"} className="cart-increase" onClick={() => decreaseQty()}>
            {" "}
            -{" "}
          </Button>
          <TextField id="qty" value={quantity} />
          <Button key={"+"} className="cart-increase" onClick={increaseQty}>
            {" "}
            +{" "}
          </Button>
        </div>
      </div>
      <div className="mb-31 dimension-wrap">
        <p className="dimension-text f-20">Dimensions (cm)</p>
        <div className="dimension-box">
          <TextField
            id="outlined-basic"
            type="number"
            min={0}
            InputProps={{
              classes: {
                input: 'f-14',
              },
            }}
            label="Width *"
            className="text-input"
            variant="outlined"
            value={itemWidth}
            placeholder="-"
            onChange={(e) => setItemWidth(e.target.value < 1 ? 0 : e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="outlined-basic"
            type="number"
            min={0}
            label="Height *"
            className="text-input"
            variant="outlined"
            InputProps={{
              classes: {
                input: 'f-14',
              },
            }}
            value={itemHeight}
            placeholder="-"
            onChange={(e) => setItemHeight(e.target.value < 1 ? 0 : e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="outlined-basic"
            type="number"
            min={0}
            label="Depth *"
            className="text-input"
            variant="outlined"
            InputProps={{
              classes: {
                input: 'f-14',
              },
            }}
            value={itemDepth}
            placeholder="-"
            onChange={(e) => setItemDepth(e.target.value < 1 ? 0 : e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      <div className="mb-31 instructions-wrap">
        <TextField
          id="outlined-basic"
          label="Additional instructions (optional)"
          multiline
          rows={2}
          InputProps={{
            classes: {
              input: 'f-14',
            },
          }}
          className="text-input"
          value={itemInstructions}
          onChange={(e) => setItemInstructions(e.target.value)}
          variant="outlined"
          placeholder="E.g: This box is only glassware - fragile"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="card-buttons-grid">
        <Button key={"Back"} className="lightbutton" onClick={props.goBackThirdMainScreen}>
          Back
        </Button>

        <Button
          key={"Next"}
          className="darkbutton"
          sx={{ mb: "16px" }}
          onClick={addToList}
          disabled={quantity > 0 && itemTitle.length > 0  && itemDepth && itemHeight && itemWidth? false : true}
        >
          Add to List
        </Button>
      </div>
    </>
  );
};
export default CustomItems;
