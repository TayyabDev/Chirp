import React from "react";
import Feed from "./feed";
import Header from "./header";

export default function Dashboard(props) {
  // replaced with real props once connected to backend
  let p = {
    user: {
      name: "Erlich Bachman",
    },
  };
  return (
    <div>
      <Header {...p} />
      <Feed />
    </div>
  );
}
