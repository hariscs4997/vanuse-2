import React from "react";
import Section1 from "../components/landingPage/section1";
import Section2 from "../components/landingPage/section2";
import Section3 from "../components/landingPage/section3";
import Section4 from "../components/landingPage/section4";

export default function LandingPage() {
  return (
    <div className="landing-page-container">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
}
