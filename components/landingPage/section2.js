import React from "react";
import FeatureCard from "./featureCard";
import Card from "./card";
import styles from "./section2.module.css";

export default function Section2() {
  return (
    <div className={styles.container}>
      <div className={styles.upperCon}>
        <Card
          image="/driver.png"
          button={true}
          heading={"Become a Driver"}
          para={"Sign Up to become a Vanuse Driver!"}
        />
        <Card
          button={true}
          style={{ marginLeft: "63.89px" }}
          image="/vanB.png"
          heading={"Vanuse for Business"}
          para={"Looking for a reliable Logistics partner?"}
        />
      </div>
      <div className={styles.about}>
        <FeatureCard
          iconSrc="/alarmIcon.svg"
          heading="Reliable"
          text="Our customers can be sure that a Vanuse van and driver will always
            be just around the corner. Drivers can count on transparent
            partnership, and easy payment."
        />
        <FeatureCard
          iconSrc="/check_box.svg"
          heading="Easy to Use"
          text=" In just one easy tap, you’ll be able to request a van and driver and
            we have plenty of options to make life as easy and as stress-free as
            possible."
        />
        <FeatureCard
          iconSrc="/attractions.svg"
          heading="One of a Kind"
          text="You'll be hard pressed to find a more convenient way to get
            something large delivered or collected. Vanuse is the easiest way..."
        />
      </div>
    </div>
  );
}
