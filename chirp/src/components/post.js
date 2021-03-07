import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

export default function Posts(props) {
  // will replace this with the posts loaded from props or some graphql query
  let posts = [
    {
      name: "Mike",
      message: "Hey whats up",
      avatarUrl:
        "https://www.flaticon.com/svg/vstatic/svg/2922/2922510.svg?token=exp=1615107827~hmac=6678c79a30ed486da0e4c516aefa1b22",
      profileUrl: "/post",
    },
    {
      name: "Bobmom",
      message: "🚀 yo ",
      avatarUrl:
        "https://www.flaticon.com/svg/vstatic/svg/4267/4267434.svg?token=exp=1615107856~hmac=d843d404f3e458e33d6ff531a633d4ad",
      profileUrl: "/post",
    },
    {
      name: "Simranprit",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      avatarUrl:
        "https://www.flaticon.com/premium-icon/icons/svg/3006/3006876.svg",
      profileUrl: "/post",
    },
  ];

  let postComponents = posts.map((post) => <Post {...post} />);
  return <div>{postComponents}</div>;
}

let Post = (props) => {
  return (
    <div class="p-6 m-3 ml-12 max-w-md bg-teal-100 rounded-xl shadow-2xl ring-4 ring-teal-600 flex items-center space-x-4">
      <div class="flex-shrink-0 ring-teal-300 ring-4 rounded-xl p-2">
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
