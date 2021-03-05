import React from "react";

export default function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //   api.login(email, password);
  };
  return (
    <div class="bg-gradient-to-br from-purple-200 via-blue-100 to-purple-200 flex items-center justify-center pb-8">
      <form onSubmit={handleSubmit}>
        <label class="text-2xl font-bold text-purple-400">
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
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <input
              class="rounded-input"
              type="text"
              id="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </div>
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
        <button class="btn-primary">Sign Up</button>
      </form>
    </div>
  );
}
