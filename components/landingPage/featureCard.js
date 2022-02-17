import React from "react";
import styles from "./featureCard.module.css";

export default function FeatureCard({ iconSrc, heading, text }) {
  return (
    <div className={styles.content}>
      <div className={styles.heading}>
        <img src={iconSrc} />
        <div className={styles.headingText}>{heading}</div>
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
}
