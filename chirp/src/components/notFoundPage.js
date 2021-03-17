import React from "react";
import { Link } from "react-router-dom";
class NotFoundPage extends React.Component {
  render() {
    return (
      <div class="text-center">
        <h1>404 Error</h1>
        <h2>This page doesn't exist, sorry</h2>
        <Link to="/">
          <p class="text-1xl lg:text-2xl ">Click here to go back home</p>
        </Link>
      </div>
    );
  }
}
export default NotFoundPage;
