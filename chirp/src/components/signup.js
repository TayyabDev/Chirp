import React, { useState } from "react";
import { UnauthorizedHeader } from "./header";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

var axios = require("axios");

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter an email"),
  username: yup
    .string()
    .min(1, "Min username length 1")
    .max(16, "Max username length 16")
    .required("Please enter a username"),
  password: yup
    .string()
    .min(4, "Password must be between 4 and 32 characters long")
    .max(32, "Password must be between 4 and 32 characters long")
    .required("Please enter a password"),
});

export default function Signup() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [errmsg, setErrmsg] = useState("");
  let history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    axios.post("/api/signup", data).then(
      (response) => {
        setErrmsg("");
        setIsSuccessful(true);
        console.log(response);
        // setResp(response.data.message);
        setTimeout(() => {
          history.push("/login");
        }, 2000);
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
      <div className="d-flex justify-content-center align-items-center container ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign up to Chirp</h2>
          <input
            className="form-control"
            type="text"
            name="email"
            placeholder="Email"
            ref={register}
          />
          <p>{errors.email?.message}</p>
          <input
            className="form-control"
            type="text"
            name="username"
            placeholder="Username"
            ref={register}
          />
          <p>{errors.username?.message}</p>
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
              Successfully signed up! Redirecting to login page...
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export function SignUp2() {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [resp, setResp] = React.useState("Start streaming instantly!");
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      email: email,
      username: username,
      password: password,
    };

    axios.post("http://localhost:9080/api/signup", user).then(
      (response) => {
        console.log(response);
        setResp(response.data.message);
        history.push("/login");
      },
      (error) => {
        setResp(error.response.data.error);
      }
    );
  };
  return (
    <div>
      <UnauthorizedHeader />
      <div class="h-screen m-auto flex flex-col items-center text-center ">
        <form onSubmit={handleSubmit}>
          <label class="text-2xl font-bold text-primary-colour">
            Sign up for Chirp!
          </label>
          <div>
            <input
              class="rounded-input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail"
              required
            />
          </div>
          <div>
            <div>
              <input
                class="rounded-input"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                min="1"
                max="16"
                required
              />
            </div>
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
          <button class="btn-primary text-primary flex-grow  ">Sign Up</button>
          <br></br>
          <br></br>
          <label class="text-2xl font-bold text-primary-colour">{resp}</label>
        </form>
      </div>
    </div>
  );
}
