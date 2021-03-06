import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
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

    if (c.login == null) {
      console.log("Cant access dashboard if not logged in.");
      history.push("/signout");
    } else {
      setLoading(true);
      const fetchUserData = async () => {
        axios.get("/api/userData", { withCredentials: true }).then(
          (response) => {
            setTimeout(() => {
              setData(response.data);
            }, 1000);
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
      <div class="p-5">
        <h1 class="text-light">Welcome to Chirp!</h1>
        <h2 class="text-light">Heres your stream key</h2>
        <h2 class="text-success">
          {data ? `${data.user._id}` : <Skeleton count={1} />}
        </h2>
        <Link to="/browse">
          <h2 class="text-light pt-5">
            Click here to browse the running streams
          </h2>
        </Link>
      </div>
    </div>
  );
}
