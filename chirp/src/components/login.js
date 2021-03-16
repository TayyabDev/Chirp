import React, { useState } from "react";
import * as Cookies from "js-cookie";
import { getSessionCookie, setSessionCookie } from "../libs/sessions";
import { useHistory } from "react-router-dom";
import { UnauthorizedHeader } from "./header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
var axios = require("axios");

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter an email"),
  password: yup
    .string()
    .min(4, "Password must be between 4 and 32 characters long")
    .max(32, "Password must be between 4 and 32 characters long")
    .required("Please enter a password"),
});

export default function Login() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [errmsg, setErrmsg] = useState("");
  let history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    axios.post("api/signin", data).then(
      (response) => {
        setErrmsg("");
        setIsSuccessful(true);
        console.log(response);
        let login = data;
        setSessionCookie({ login });
        setTimeout(() => {
          history.push("/dashboard");
        }, 1000);
      },
      (error) => {
        setErrmsg(error.response.data.error);
        // setResp(error.response.data.error);
      }
    );
  };

  return (
    <div>
      <UnauthorizedHeader />
      <div className="d-flex justify-content-center align-items-center container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login to Chirp</h2>
          <div class="form-group">
            <input
              className="form-control"
              type="text"
              name="email"
              placeholder="Email"
              ref={register}
            />
            <p>{errors.email?.message}</p>
          </div>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            ref={register}
          />
          <p>{errors.password?.message}</p>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          {errmsg && (
            <div class="alert alert-danger mt-2" role="alert">
              {errmsg}
            </div>
          )}
          {isSuccessful && (
            <div class="alert alert-success mt-2" role="alert">
              Successfully signed in.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export function Login2() {
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
              id="email"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="E-mail"
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
