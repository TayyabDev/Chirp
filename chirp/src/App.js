import React, { useState, useEffect } from "react";
import logo from "./assets/images/logo.svg";
import "./App.css";
import Header from "./components/header";
import SignUp from "./components/signup";
import Home from "./components/home";
import Login from "./components/login";
import Logout from "./components/logout";
import NotFoundPage from "./components/notFoundPage";
import Dashboard from "./components/dashboard";
import Browse from "./components/browse";
import { useHistory } from "react-router-dom";
import { SessionContext, getSessionCookie } from "./libs/sessions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [session, setSession] = useState(getSessionCookie());
  let history = useHistory();
  useEffect(() => {
    const newSessionCookie = getSessionCookie();
    if (newSessionCookie.uniqueId !== session.uniqueId) {
      setSession(getSessionCookie());
    }
  }, [session]);
  return (
    <SessionContext.Provider value={session}>
      <Router history={history}>
        <div class="h-screen min-w-min bg-blueGray-900">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/signout" component={Logout} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/browse" component={Browse} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </SessionContext.Provider>
  );
}

export default App;
