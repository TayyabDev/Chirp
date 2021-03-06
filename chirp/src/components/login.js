import React from "react";

export default function Login() {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //   api.login(email, password);
  };
  return (
    <div class="h-screen flex items-start justify-center ">
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
      </form>
    </div>
  );
}
