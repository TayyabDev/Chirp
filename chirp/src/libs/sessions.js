import * as Cookies from "js-cookie";
import React from "react";
export const setSessionCookie = (session) => {
  Cookies.remove("session");
  Cookies.set("session", session, { expires: 14 });
};

export const intruderAlert = () => {
  console.log("You are not authorized.");
  Cookies.remove("session");
};

export const getSessionCookie = () => {
  const sessionCookie = Cookies.get("session");
  if (sessionCookie == null) {
    return {};
  } else {
    return JSON.parse(sessionCookie);
  }
};

export const SessionContext = React.createContext(getSessionCookie());
