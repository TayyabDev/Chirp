import React from "react";

import { Router, Route } from "react-router-dom";

import SignUp from "./signup";
import Home from "./home";
const createRoutes = () => (
  <Router>
    <Route exact path="/" component={Home} />
    <Route path="/signup" component={SignUp} />
  </Router>
);
export default createRoutes;
