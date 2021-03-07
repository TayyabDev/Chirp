import React, { Component } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import logo from "../assets/images/logo.svg";

export default function Header(props) {
  let authenticated = props.user;
  return (
    <nav class="flex items-center justify-between flex-wrap bg-teal-500 pt-2 pl-2 pr-2">
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
      {authenticated ? <AuthorizedHeader /> : <UnauthorizedHeader />}
    </nav>
  );
}

function UnauthorizedHeader() {
  return (
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <Link to="/home">
          <a class="navbar-item">Home</a>
        </Link>
        <Link to="/about">
          <a class="navbar-item">About</a>
        </Link>
        <Link to="/dashboard">
          <a class="navbar-item">Preview</a>
        </Link>
      </div>
      <div class="flex-wrap space-x-2">
        <Link to="/login">
          <button class="btn-primary">Log In</button>
        </Link>

        <Link to="/signup">
          <button class="btn-secondary">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

function AuthorizedHeader(props) {
  return (
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <Link to="/home">
          <a class="navbar-item">Home</a>
        </Link>
        <Link to="/dashboard">
          <a class="navbar-item">Feed</a>
        </Link>
        <Link to="/messages">
          <a class="navbar-item">Messages</a>
        </Link>
        <Link to="/settings">
          <a class="navbar-item">Settings</a>
        </Link>
      </div>
      <div class="flex-wrap space-x-2">
        <Link to="/signout">
          <button class="btn-secondary">Sign Out</button>
        </Link>
      </div>
    </div>
  );
}
