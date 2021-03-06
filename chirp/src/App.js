import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import SignUp from "./components/signup";
import Home from "./components/home";
import Login from "./components/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div class="bg-teal-500">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
