import React, { useState, useContext, useEffect } from "react";
// import { useEffect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { SessionContext} from "../../libs/sessions";
import { AuthorizedHeader } from "../header";
import VideoPlayer from "./player";
import Chat from "./chat";
import "../../Watch.css";
var axios = require("axios");


export default function Watch(props) {
  
  const [streamKey, setStreamKey] = useState(props.location.state.streamKey);
  const [streamUsername, setStreamUsername] = useState(
    props.location.state.username
  );
  const session = useContext(SessionContext);
  let history = useHistory();

  useEffect(() => {
    if (!streamUsername) {
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
      <div class="container">
        <VideoPlayer streamUsername={streamUsername} streamKey={streamKey} />
        <Chat class="stream-chat" streamUsername={streamUsername} email={session.login.email} />
      </div>
    </div>
  );
}
