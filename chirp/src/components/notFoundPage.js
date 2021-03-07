import React from "react";
import { Link } from "react-router-dom";
class NotFoundPage extends React.Component {
  render() {
    return (
      <div class="text-center text-teal-900 font-bold">
        <p class="text-3xl lg:text-5xl  ">404</p>
        <p class="text-2xl lg:text-3xl ">This page doesn't exist, sorry.</p>
        <Link to="/">
          <p class="text-1xl lg:text-2xl ">Click here to go back home</p>
        </Link>
      </div>
    );
  }
}
export default NotFoundPage;
