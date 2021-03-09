import React from "react";
import Feed from "./feed";
import Header from "./header";
import ReactPlayer from "react-player";

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
      <ReactPlayer
        class="flex justify-center"
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
        controls
      />
    </div>
  );
}
