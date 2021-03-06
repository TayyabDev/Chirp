import React from "react";
import default_pic from "../assets/images/logo.svg";

export default function Post(props) {
  return (
    <div>
      {post({ name: "Mike", message: "Hey whats up" })}
      {post({ name: "Bobmom", message: "Yo" })}
      {post({ name: "Simranprit", message: "lolz lamo" })}
    </div>
  );
}

let post = (props) => {
  return (
    <div class="p-6 m-2 ml-12 max-w-sm bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div class="flex-shrink-0">
        <img class="h-12 w-12" src={default_pic} alt="ChitChat Logo" />
      </div>
      <div>
        <div class="text-xl font-medium text-black">{props.name}</div>
        <p class="text-gray-500">{props.message}</p>
      </div>
    </div>
  );
};
