import React, { useState, useEffect } from "react";
import HeaderBar from "../components/header/headerBar";
import { useSelector, useDispatch } from "react-redux";

export default function Faq({ landing }) {
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
  }, []);
  return (
    <>
      <HeaderBar authorized={authorized} />
      <main style={{ position: "relative" }} className="main-content"></main>
    </>
  );
}
