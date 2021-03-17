import React, { useContext, useEffect } from "react";
import { UnauthorizedHeader } from "../header";
import {
  SessionContext,
  getSessionCookie,
  setSessionCookie,
} from "../../libs/sessions";
import { useHistory } from "react-router-dom";

export default function Home() {
  const session = useContext(SessionContext);
  let history = useHistory();

  useEffect(() => {
    let c = getSessionCookie();
    if (c.login != null) {
      console.log("Redirecting to dashboard since logged in");
      //   setSessionCookie({});
      history.push("/dashboard");
    }
  }, [session]);

  return (
    <div>
      <UnauthorizedHeader />
      <div class="min-h-full max-w-max flex items-center px-6 lg:px-32 ">
        <section class=" md:w-9/12 xl:w-8/12">
          <span class="font-bold uppercase tracking-widest">Yet Another</span>
          <h1 class="text-3xl lg:text-5xl font-bold text-teal-900">
            Streaming
            <br />
            Media
            <br />
            Website
          </h1>
          <p>Sign up to join the fun!</p>
        </section>
        {/* <img class="w-1/2" src={twitch_dead} /> */}
      </div>
    </div>
  );
}
