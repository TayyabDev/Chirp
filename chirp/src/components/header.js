import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { SessionContext, getSessionCookie } from "../libs/sessions";

export function UnauthorizedHeader2(props) {
  //   const session = useRef(useContext(SessionContext));
  //   const [authenticated, setAuthenticated] = useState(false);

  //   useEffect(() => {
  //     console.log("ypo im being called agian");
  //     let c = getSessionCookie();
  //     setAuthenticated(c.login != null);
  //   }, [session]);

  return (
    <nav class="flex items-center justify-between flex-wrap bg-blueGray-500 pt-2 pl-2 pr-2">
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
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <Link to="/home">
            <a class="navbar-item">Home</a>
          </Link>
          <Link to="/about">
            <a class="navbar-item">About</a>
          </Link>
          <Link to="/dashboard">
            <a class="navbar-item">Dashboard</a>
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
    </nav>
  );
}

export function UnauthorizedHeader({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blueGray-700 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to="/home">
              <a className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
                CHIRP
              </a>
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-red rounded bg-red block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <Link to="/home">
                <li className="nav-item">
                  <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <i className="text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Home</span>
                  </a>
                </li>
              </Link>
              <Link to="/about">
                <li className="nav-item">
                  <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <i className="text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">About</span>
                  </a>
                </li>
              </Link>
              <Link to="/signup">
                <li className="nav-item">
                  <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <i className=" text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Sign Up</span>
                  </a>
                </li>
              </Link>
              <Link to="/login">
                <li className="nav-item">
                  <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <i className="text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Sign In</span>
                  </a>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export function AuthorizedHeader2(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
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
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <Link to="/home">
            <a class="navbar-item">Home</a>
          </Link>
          <Link to="/dashboard">
            <a class="navbar-item">Dashboard</a>
          </Link>
          <Link to="/browse">
            <a class="navbar-item">Browse</a>
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
    </nav>
  );
}

export function AuthorizedHeader({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blueGray-700 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to="/home">
              <a className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
                CHIRP
              </a>
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-red rounded bg-red block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <Link to="/dashboard">
                <li className="nav-item">
                  <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <i className="text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Dashboard</span>
                  </a>
                </li>
              </Link>
              <Link to="/following">
                <li className="nav-item">
                  <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <i className="text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Following</span>
                  </a>
                </li>
              </Link>
              <Link to="/browse">
                <li className="nav-item">
                  <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <i className=" text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Browse</span>
                  </a>
                </li>
              </Link>
              <Link to="/settings">
                <li className="nav-item">
                  <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <i className="text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Settings</span>
                  </a>
                </li>
              </Link>
              <Link to="/signout">
                <li className="nav-item">
                  <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <i className="text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Sign Out</span>
                  </a>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
