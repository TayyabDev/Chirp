import React from "react";
import { useParams } from "react-router-dom";
import { AuthorizedHeader } from "../header";
import VideoPlayer from "./player";
export default function Watch() {
  let { streamKey } = useParams();
  console.log(streamKey);
  console.log();
  return <VideoPlayer />;
}
