import React from "react";
import styles from "./section3.module.css";
import Card from "./card";

export default function Section3() {
  return (
    <div className={styles.container}>
      <div className={styles.bgCon}>
        <div className={styles.bg} />
        <div className={styles.phImg}>
          <img src="/phone mockup 1.png" />
        </div>

        <div className={styles.appCon}>
          <div className={styles.appCon1}>Easily Book Now or in the Future</div>
          <div className={styles.appCon2}>Get the App!</div>
          <div className={styles.appCon3}>
            <a href="#">
              <img src="/google.svg" />
            </a>
            <a href="#">
              <img src="/apple.svg" />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.referCard}>
        <Card
          style={{
            height: "100%",
            width: "100%",
            flexDirection: "row-reverse",
          }}
          infoStyle={{ width: "unset", marginLeft: 40, marginRight: 40 }}
          imageStyle={{ opacity: 1 }}
          heading="Refer a Friend"
          para="Fancy getting £5 off your next van ride? Refer a friend to us and we’ll give you both £5 when they complete their first trip. All you need to do is head to the promo section in the app to find out more."
          image="/refer.svg"
          button={false}
        />
      </div>
    </div>
  );
}
