const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookie = require("cookie");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const { ObjectId } = require("bson");
const app = express();
var axios = require("axios");

const MEDIA_SERVER_HOST = process.env.MEDIA_SERVER_HOST || "localhost";

app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const url =
  "mongodb+srv://chirpadmin:chirpadmin@cluster0.cjetq.mongodb.net/chirpdb";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

let Users = mongoose.model("users", userSchema);

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(
  session({
    secret: "changed secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  req.user = "user" in req.session ? req.session.user : null;
  let email = req.user ? req.user.email : "";
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("email", email, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
    })
  );
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

let isAuthenticated = function (req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Access Denied" });
  next();
};

app.use(function (req, res, next) {
  console.log("HTTP request", req.email, req.method, req.url, req.body);
  next();
});

var multer = require("multer");

// curl -H "Content-Type: application/json" -X POST -d '{"email":"bobjones@gmail.com","password":"bobjones"}' -c cookie.txt localhost:9080/api/signup/
app.post("/api/signup", function (req, res, next) {
  // extract data from HTTP request
  if (!("email" in req.body))
    return res.status(400).json({ error: "Email is missing" });
  if (!("username" in req.body))
    return res.status(400).json({ error: "Username is missing" });
  if (!("password" in req.body))
    return res.status(400).json({ error: "Pasword is missing" });
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  // check if email or username already exists in the database
  Users.findOne(
    { $or: [{ email: email }, { username: username }] },
    function (err, user) {
      if (err) return res.status(500).json(err);
      if (user) return res.status(409).json({ error: "Email already exists" });
      // generate a new salt and hash
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          // insert new user into the database
          Users.create(
            { email: email, username: username, password: hash },
            function (err, result) {
              if (err) return res.status(500).json(err);
              return res.json({ message: "User has been registered!" });
            }
          );
        });
      });
    }
  );
});

// curl -H "Content-Type: application/json" -X POST -d '{"email":"bobjones@gmail.com","password":"bobjones"}' -c cookie.txt localhost:9080/api/signin/
app.post("/api/signin", function (req, res, next) {
  // extract data from HTTP request
  if (!("email" in req.body)) return res.status(400).end("email is missing");
  if (!("password" in req.body))
    return res.status(400).end("password is missing");
  let email = req.body.email;
  let password = req.body.password;
  // retrieve user from the database
  Users.findOne({ email: email }, function (err, user) {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(401).json({ error: "No account was found." });

    bcrypt.compare(password, user.password, function (err, valid) {
      if (err) return res.status(500).json(err);
      if (!valid) return res.status(401).json({ error: "Invalid password" });
      // start a session
      req.session.user = user;
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("email", email, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );
      return res.json({ message: "User has signed in." });
    });
  });
});

// curl -b cookie.txt -c cookie.txt localhost:9080/api/signout/
app.get("/api/signout/", function (req, res, next) {
  req.session.destroy();

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("email", "", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
    })
  );
  res.redirect("/");
});

app.get("/api/userData", isAuthenticated, function (req, res, next) {
  Users.findOne(
    { $or: [{ email: req.user.email }, { username: req.user.username }] },
    function (err, user) {
      if (err) return res.status(500).json(err);
      if (user) return res.json({ user });
      return res.json({});
    }
  );
});

app.get("/api/streams/:username", isAuthenticated, function (req, res, next) {
  if (!req.params.username) {
    return res.status(400).json({ error: "Username is missing" });
  }
  Users.findOne({ email: req.params.username }, function (err, user) {
    if (user)
      return res.json({
        streamUser: user.username,
        streamKey: user._id,
      });
    return res.json({});
  });
});

// get all running streams
app.get("/api/streams", function (req, res, next) {
  axios
    .get(`http://${MEDIA_SERVER_HOST}:8000/api/streams`, {
      withCredentials: true,
    })
    .then(
      (response) => {
        let returnStreams = [];
        let liveStreams = response.data.live;
        let streamKeys = Object.keys(liveStreams);
        Users.find({ _id: { $in: streamKeys } }, function (err, users) {
          users.forEach(function (user) {
            returnStreams.push({
              streamUser: user.username,
              streamKey: user._id,
              viewers: liveStreams[user._id].subscribers.length,
            });
          });
          return res.json(returnStreams);
        });
      },
      (error) => {
        console.log(error);
      }
    );
});

const server = app.listen(9080, () => {
  console.log("app is running on 9080");
});
