import logo from "./assets/images/logo.svg";
import "./App.css";
import Header from "./components/header";
import SignUp from "./components/signup";
import Home from "./components/home";
import Login from "./components/login";
import Post from "./components/post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div class="h-screen bg-teal-500">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/post" component={Post} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
