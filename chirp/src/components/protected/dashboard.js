import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { SessionContext, getSessionCookie } from "../../libs/sessions";
import { AuthorizedHeader } from "../header";
import Skeleton from "react-loading-skeleton";

var axios = require("axios");

export default function Dashboard(props) {
  const session = useContext(SessionContext);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    let c = getSessionCookie();

    console.log(c);
    if (c.login == null) {
      console.log("Cant access dashboard if not logged in.");
      //   setSessionCookie({});
      history.push("/signout");
    } else {
      setLoading(true);
      const fetchUserData = async () => {
        axios.get("/api/userData", { withCredentials: true }).then(
          (response) => {
            console.log(response);
            //   setData(response.data);
            setTimeout(() => {
              setData(response.data);
            }, 1000); // note this is just here to test out loading animations, api doesnt actually take this long
            //   setLoading(false);
          },
          (error) => {
            console.log("here");
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
      {/* {loading ? <LoadingButton /> : <pre>{JSON.stringify(data, null, 2)}</pre>} */}
      <h1 class="text-light">User information</h1>
      <h2 class="text-light">
        {data ? JSON.stringify(data, null, 2) : <Skeleton count={3} />}
      </h2>
    </div>
  );
}

function LoadingButton() {
  return (
    <div class="border border-teal-700 shadow rounded-md p-4 max-w-sm w-full">
      <div class="animate-pulse flex space-x-4">
        <div class="rounded-full bg-teal-800 h-12 w-12"></div>
        <div class="flex-1 space-y-4 py-1">
          <div class="h-4 bg-teal-800 rounded w-3/4"></div>
          <div class="space-y-2">
            <div class="h-4 bg-teal-800 rounded"></div>
            <div class="h-4 bg-teal-800 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
