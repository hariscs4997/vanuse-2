import React, { useState, useEffect } from "react";
import HeaderBar from "../components/header/headerBar";
import SearchCard from "../components/searchCard/searchCard";
import { useSelector, useDispatch } from "react-redux";
import AlertComponent, { Alert } from "../components/alert";

export default function Home({ landing }) {
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.authorized);
  useEffect(() => {
    let user = localStorage.getItem("token");
    if (user) {
      dispatch({
        type: "SET_AUTHORIZED",
        user: user,
      });
    } else {
      dispatch({
        type: "SET_UNAUTHORIZED",
      });
    }
    landing &&
      setTimeout(
        () =>
          Alert.show(
            <>
              Covid Update: we're open!{" "}
              <a href="#" style={{ marginLeft: "2rem", fontWeight: "bold" }}>
                Read more...
              </a>
            </>
          ),
        1000
      );
  }, []);
  return (
    <>
      <HeaderBar authorized={authorized} />
      <main style={{ position: "relative" }} className="main-content">
        <AlertComponent />
        <div className="banner-container">
          <SearchCard authorized={authorized} />
        </div>
      </main>
    </>
  );
}
