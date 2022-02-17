import React from "react";
import FaqCard from "./faqCard";
import Footer from "./footer";
import styles from "./section4.module.css";

export default function Section4() {
  return (
    <div className={styles.container}>
      <div className={styles.faqCon}>
        <div className={styles.faq}>Frequently Asked Questions</div>

        <div className={styles.quesCon}>
          <FaqCard
            heading="FAQ title"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              imperdiet urna eu pulvinar porta. Maecenas porttitor dui tortor,
              at"
          />
          <FaqCard
            style={{ margin: "0px 40px 0px 40px" }}
            heading="FAQ title"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              imperdiet urna eu pulvinar porta. Maecenas porttitor dui tortor,
              at ctetur adipiscing elit. Duis imperdiet urna eu pulvinar port"
          />
          <FaqCard
            heading="FAQ title"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              imperdiet urna eu pulvinar porta. Maecenas porttitor dui tortor,
              at"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
