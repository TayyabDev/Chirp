import React, { Component } from "react";
import twitter_killer from "../assets/images/twitter-killer.png";

class Home extends Component {
  render() {
    return (
      <div class="min-h-full max-w-max flex items-center px-6 lg:px-32 text-white">
        <section class=" md:w-9/12 xl:w-8/12">
          <span class="font-bold uppercase tracking-widest">Yet Another</span>
          <h1 class="text-3xl lg:text-5xl font-bold text-teal-900">
            Social
            <br />
            Media
            <br />
            Website
          </h1>
          <p>Sign up to join the fun!</p>
        </section>
        <img class="w-1/2" src={twitter_killer} />
      </div>
    );
  }
}

export default Home;
