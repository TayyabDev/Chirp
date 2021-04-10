import React, { useState, useEffect } from "react";
import SignUp from "./components/public/signup";
import Home from "./components/public/home";
import Login from "./components/public/login";
import Credits from "./components/public/credits";
import Logout from "./components/protected/logout";
import NotFoundPage from "./components/notFoundPage";
import Dashboard from "./components/protected/dashboard";
import Browse from "./components/protected/browse";
import { useHistory } from "react-router-dom";
import { SessionContext, getSessionCookie } from "./libs/sessions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Watch from "./components/protected/watch";

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
        <div style={{ backgroundColor: "#0E0E10" }} class="min-vh-100">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/credits" component={Credits} />
            <Route path="/signout" component={Logout} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/browse" component={Browse} />
            <Route path="/watch/:streamUsername" component={Watch} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </SessionContext.Provider>
  );
}

export default App;
