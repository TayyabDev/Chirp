import React, { useState, useEffect } from "react";
// import { useEffect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { AuthorizedHeader } from "../header";
import VideoPlayer from "./player";
var axios = require("axios");

export default function Watch(props) {
  const [streamKey, setStreamKey] = useState(props.location.state.streamKey);
  const [streamUsername, setStreamUsername] = useState(
    props.location.state.username
  );

  let history = useHistory();

  useEffect(() => {
    console.log("check thuis");
    if (!streamUsername) {
      //   console.log("Invalid username: " + streamUsername);
      console.log("Checking url: " + props.match.params.streamUsername);
      if (props.match.params.streamUsername) {
        setStreamUsername(props.match.params.streamUsername);
      } else {
        history.push("/browse");
      }
    }

    if (streamUsername && !streamKey) {
      axios
        .get(`/api/streams/${streamUsername}`, { withCredentials: true })
        .then(
          (response) => {
            console.log("response here ");
            console.log(response.data);
            setStreamKey(response.data.streamKey);
          },
          (error) => {
            console.log("Invalid username");
            history.push("/browse");
          }
        );
    }
  }, [streamUsername]);

  return (
    <div>
      <AuthorizedHeader />
      <VideoPlayer streamUsername={streamUsername} streamKey={streamKey} />
    </div>
  );
}
