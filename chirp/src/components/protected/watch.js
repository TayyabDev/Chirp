import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AuthorizedHeader } from "../header";
import VideoPlayer from "./player";
export default function Watch(props) {
  const [streamKey, setStreamKey] = useState(props.match.params.streamKey);

  return (
    <div>
      <AuthorizedHeader />
      <VideoPlayer streamKey={streamKey} />
    </div>
  );
}
