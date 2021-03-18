import React, { useState } from "react";
import * as Cookies from "js-cookie";
import { getSessionCookie, setSessionCookie } from "../../libs/sessions";
import { useHistory } from "react-router-dom";
import { UnauthorizedHeader } from "../header";
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
    axios.post("http://localhost:9080/api/signin", data).then(
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
        console.log(error.response.data);
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
          <h2 class="text-light">Login to Chirp</h2>
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
