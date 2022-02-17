import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.linksDiv}>
        <img className={styles.logo} src="/logoF.svg" />
        <div className={styles.linksCon}>
          <a href="#" style={{ marginLeft: "0px" }} className={styles.link}>
            Support
          </a>
          <a href="#" className={styles.link}>
            FAQ
          </a>
          <a href="#" className={styles.link}>
            Link
          </a>
          <a href="#" className={styles.link}>
            Link
          </a>
          <a href="#" className={styles.link}>
            Link
          </a>
        </div>

        <div className={styles.social}>
          <a style={{ marginLeft: "0px" }} href="#">
            <img src="/fb.svg" />
          </a>
          <a style={{ marginLeft: "3.47vw" }} href="#">
            <img src="/twitter.svg" />
          </a>
          <a style={{ marginLeft: "3.47vw" }} href="#">
            <img src="/insta.svg" />
          </a>
        </div>
      </div>

      <div className={styles.store}>
        <a style={{ marginTop: "4.5vh" }} href="#">
          <img src="/google.svg" />
        </a>
        <a style={{ marginTop: "3.19vh" }} href="#">
          <img style={{ borderRadius: "8px" }} src="/apple.svg" />
        </a>
      </div>

      <p className={styles.copyright}>© 2021 copyright text</p>
    </footer>
  );
}
