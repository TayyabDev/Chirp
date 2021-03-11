import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import {
  SessionContext,
  getSessionCookie,
  setSessionCookie,
} from "../libs/sessions";
import { AuthorizedHeader } from "./header";
var axios = require("axios");

export default function Dashboard(props) {
  const session = useContext(SessionContext);
  const [data, setData] = useState("");
  let history = useHistory();

  useEffect(() => {
    let c = getSessionCookie();
    if (c.login == null) {
      console.log("Cant access dashboard if not logged in.");
      //   setSessionCookie({});
      history.push("/signout");
    } else {
      const fetchUserData = async () => {
        axios
          .get("http://localhost:9080/api/userData", { withCredentials: true })
          .then(
            (response) => {
              console.log(response);
              setData(response.data);
            },
            (error) => {
              history.push("/login");
            }
          );
      };
      fetchUserData();
    }
  }, [session]);

  return (
    <div>
      <AuthorizedHeader />
      <pre class="text-xl">{JSON.stringify(data)}</pre>
    </div>
  );
}
