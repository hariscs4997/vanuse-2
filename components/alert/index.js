import React, { useState } from "react";
import styles from "./index.module.css";
import ClearIcon from "@mui/icons-material/Clear";

let _setAlert;

export default function AlertComponent() {
  const [alert, setAlert] = useState("");
  _setAlert = setAlert;

  return (
    <div
      style={
        alert
          ? { pointerEvents: "unset", opacity: 1 }
          : { pointerEvents: "none", opacity: 0 }
      }
      className={styles.banner}
    >
      <div>{alert}</div>
      <ClearIcon style={{ cursor: "pointer" }} onClick={() => setAlert("")} />
    </div>
  );
}

export const Alert = {
  show(alert) {
    _setAlert && _setAlert(alert);
  },

  hide() {
    _setAlert && _setAlert("");
  },
};
