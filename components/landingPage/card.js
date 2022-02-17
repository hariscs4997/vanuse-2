import React from "react";
import styles from "./card.module.css";
import Button from "@mui/material/Button";

export default function Card({
  image,
  heading,
  para,
  style,
  infoStyle,
  button,
  imageStyle,
}) {
  return (
    <div style={style} className={styles.card}>
      <div style={infoStyle} className={styles.info}>
        <div className={styles.heading}>{heading}</div>
        <div className={styles.para}>{para}</div>
        {button ? (
          <Button variant="outlined" className={styles.button}>
            Button
          </Button>
        ) : null}
      </div>

      <div className={styles.imageCon}>
        <img style={imageStyle} src={image} className={styles.image} />
      </div>
    </div>
  );
}
