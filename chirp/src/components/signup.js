import React from "react";
var axios = require("axios");

export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [resp, setResp] = React.useState("Start streaming instantly!");

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
      },
      (error) => {
        setResp(error.response.data.error);
      }
    );
  };
  return (
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
  );
}
