import React, { useState } from "react";
import { UnauthorizedHeader } from "../header";
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
      <div className="d-flex justify-content-center align-items-center container mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 class="text-light">Sign up to Chirp</h2>
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
