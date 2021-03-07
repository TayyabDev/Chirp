import React from "react";
import Posts from "./post";

export default function Feed(props) {
  // get user data from props
  return (
    <div>
      <Posts {...props.posts} />
    </div>
  );
}
