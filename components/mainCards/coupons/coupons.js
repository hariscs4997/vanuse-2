import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Coupons = (props) => {
  const [promoValue, setPromoValue] = React.useState("");
  const [promoError, setPromoError] = React.useState(false);
  const [promoValidFromApi, setPromoValidFromApi] = React.useState(false);

  const applyPromo = () => {
    console.log("applyPromo");
    if (promoValue.length < 1) {
      setPromoError(true);
      setPromoValidFromApi(true);
    } else {
      setPromoError(false);
      setPromoValidFromApi(false);
    }
  };

  return (
    <div className="date-card coupon">
      <div className="p-60 ">
        <div className="card-heading mb-31">
          <h2>Apply Promo Code</h2>
        </div>

        <div className="mb-31 custom-title">
          <TextField
            id="outlined-basic"
            className="text-input"
            variant="outlined"
            label="Promo Code"
            placeholder="Promo Code"
            error={promoError}
            helperText={promoValidFromApi ? "Promo code not valid" : null}
            value={promoValue}
            onChange={(e) => setPromoValue(e.target.value)}
          />
        </div>
        {/* <div className="mb-31 add-items-qty">
                    <p>Quantity <span className="color-text">*</span></p>
                    <div className="mb-31 cart-list">
                        <Button key={"-"} className="cart-increase" onClick={()=>decreaseQty()}> - </Button>
                        <TextField id="qty" value={quantity}/>
                        <Button key={"+"} className="cart-increase" onClick={increaseQty}> + </Button>
                    </div>
                </div>
                <div className="mb-31 dimension-wrap">
                    <p className="dimension-text">Dimensions (cm)</p>
                    <div className="dimension-box">
                        <TextField id="outlined-basic" label="Width" className="text-input" variant="outlined" 
                            value={itemWidth} placeholder="-" 
                            onChange={(e)=>setItemWidth(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                    </div>
                </div>
                <div className="mb-31 instructions-wrap">
                    <TextField id="outlined-basic" label="Additional instructions (optional)" multiline rows={2} className="text-input" 
                        value={itemInstructions} 
                        onChange={(e)=>setItemInstructions(e.target.value)} variant="outlined"  
                        placeholder="E.g: This box is only glassware - fragile"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                </div> */}
        <div className="card-buttons">
          <Button key={"Next"} className="darkbutton" onClick={applyPromo}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Coupons;
