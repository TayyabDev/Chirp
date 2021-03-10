import Feed from "./feed";
import Header from "./header";
import ReactPlayer from "react-player";
import React, { useState, useEffect } from "react";

export default function Dashboard(props) {
  const [data, setData] = useState();

  // if (!query) return;
  //   setStatus("fetching");

  // replaced with real props once connected to backend
  let p = {
    user: {
      name: "Erlich Bachman",
    },
  };
  return <div>{data}</div>;
}
