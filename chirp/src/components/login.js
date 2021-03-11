import React from "react";
import * as Cookies from "js-cookie";
import { getSessionCookie, setSessionCookie } from "../libs/sessions";
import { useHistory } from "react-router-dom";
import { UnauthorizedHeader } from "./header";

var axios = require("axios");

export default function Login() {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [resp, setResp] = React.useState("Start streaming instantly!");
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      email: login,
      password: password,
    };

    axios
      .post("http://localhost:9080/api/signin", user, { withCredentials: true })
      .then(
        (response) => {
          console.log(response);
          setResp(response.data.message);
          setSessionCookie({ login });
          history.push("/dashboard");
        },
        (error) => {
          console.log(error.response);
          setResp("Invalid credentials.");
        }
      );
  };
  return (
    <div>
      <UnauthorizedHeader />
      <div class="h-screen m-auto flex flex-col items-center text-center  ">
        <form onSubmit={handleSubmit}>
          <label class="text-2xl font-bold text-primary-colour">
            Login to Chirp!
          </label>
          <div>
            <input
              class="rounded-input"
              type="text"
              id="username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Username / E-mail"
              min="1"
              max="16"
              required
            />
          </div>
          <div>
            <input
              class="rounded-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              min="8"
              max="64"
              required
            />
          </div>
          <button class="btn-primary text-primary-colour">Login</button>
          <br></br>
          <br></br>
          <label class="text-2xl font-bold text-primary-colour">{resp}</label>
        </form>
      </div>
    </div>
  );
}
