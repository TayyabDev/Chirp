import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import {
  SessionContext,
  getSessionCookie,
  setSessionCookie,
} from "../libs/sessions";

export default function Logout() {
  let history = useHistory();
  let session = useContext(SessionContext);

  useEffect(() => {
    console.log("Logging out");
    setSessionCookie({});
    history.push("/");
  }, []);

  return <div>Logging out!</div>;
}
