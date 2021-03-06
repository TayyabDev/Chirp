import React, { Component } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import SignUp from "./signup";
import Home from "./home";
import logo from "../assets/images/logo.svg";

export default function Header(props) {
  let authenticated = props.user;
  return (
    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-5">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/home">
          <img
            class="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            src={logo}
            alt="logo"
          />
        </Link>
        <Link to="/home">
          <span class="chirp-title">Chirp</span>
        </Link>
      </div>
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      {authenticated
        ? authenticatedNavbar(props.user)
        : unauthenticatedNavbar()}
    </nav>
  );
}

function unauthenticatedNavbar() {
  return (
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <Link to="/home">
          <a class="navbar-item">Home</a>
        </Link>
        <a class="navbar-item">About</a>
        <Link to="/post">
          <a class="navbar-item">Preview</a>
        </Link>
      </div>
      <div>
        <Link to="/login">
          <button class="btn-primary mr-2">Log In</button>
        </Link>
      </div>
      <div>
        <Link to="/signup">
          <button class="btn-secondary ml-2">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

function authenticatedNavbar(props) {
  return (
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <a class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Home
        </a>
        <a class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Messages
        </a>
      </div>
      <div class="text-sm">
        <a class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Profile
        </a>
        <a class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
          Sign Out
        </a>
      </div>
    </div>
  );
}
