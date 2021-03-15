import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { SessionContext, getSessionCookie } from "../libs/sessions";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

export function UnauthorizedHeader() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="#home">Chirp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/home">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/signup">
            Sign Up
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Sign In
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export function AuthorizedHeader() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="#home">Chirp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/home">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/following">
            Following
          </Nav.Link>
          <Nav.Link as={Link} to="/browse">
            Browse
          </Nav.Link>
          <Nav.Link as={Link} to="/settings">
            Settings
          </Nav.Link>
          <Nav.Link as={Link} to="/signout">
            Sign out
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export function AuthorizedHeader2({ fixed }) {
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
