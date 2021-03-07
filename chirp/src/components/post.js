import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

export default function Post(props) {
  return (
    <div>
      {post({
        name: "Mike",
        message: "Hey whats up",
        avatarUrl:
          "https://www.flaticon.com/svg/vstatic/svg/2922/2922510.svg?token=exp=1615107827~hmac=6678c79a30ed486da0e4c516aefa1b22",
        profileUrl: "/post",
      })}
      {post({
        name: "Bobmom",
        message: "🚀 yo ",
        avatarUrl:
          "https://www.flaticon.com/svg/vstatic/svg/4267/4267434.svg?token=exp=1615107856~hmac=d843d404f3e458e33d6ff531a633d4ad",
        profileUrl: "/post",
      })}
      {post({
        name: "Simranprit",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        avatarUrl:
          "https://www.flaticon.com/premium-icon/icons/svg/3006/3006876.svg",
        profileUrl: "/post",
      })}
    </div>
  );
}

let post = (props) => {
  return (
    <div class="p-6 m-2 ml-12 max-w-md bg-white rounded-xl shadow-2xl flex items-center space-x-4">
      <div class="flex-shrink-0">
        <img class="h-12 w-12" src={props.avatarUrl} alt="User Avatar" />
      </div>
      <div>
        <Link to={props.profileUrl}>
          <div class="text-xl font-medium text-black">{props.name}</div>
        </Link>
        <p class="text-gray-500">{props.message}</p>
        <div class="inline-flex space-x-5 pt-3">
          <p class="flex-1 text-gray-600 font-bold text-sm">reply</p>
          <p class="flex-1 text-gray-600 font-bold text-sm">like</p>
          <p class="flex-1 text-gray-600 font-bold text-sm">share</p>
        </div>
      </div>
    </div>
  );
};
