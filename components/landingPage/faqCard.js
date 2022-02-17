import React from "react";
import styles from "./faqCard.module.css";

export default function FaqCard({ heading, text, style }) {
  return (
    <div style={style} className={styles.ques}>
      <div className={styles.quesHeading}>{heading}</div>
      <div className={styles.quesText}>{text}</div>
    </div>
  );
}
