const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const thumbsupply = require("thumbsupply");
const bcrypt = require("bcrypt");
const cookie = require("cookie");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const { ObjectId } = require("bson");
const app = express();
const NodeMediaServer = require('node-media-server');

app.use(bodyParser.json());
app.use(cors());

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

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
};
 
var nms = new NodeMediaServer(config)
nms.run();

nms.on('preConnect', (id, args) => {
  console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});
 
nms.on('postConnect', (id, args) => {
  console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
});
 
nms.on('doneConnect', (id, args) => {
  console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
});
 
nms.on('prePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});
 
nms.on('postPublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});
 
nms.on('donePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});
 
nms.on('prePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});
 
nms.on('postPlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});
 
nms.on('donePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
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
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

let isAuthenticated = function (req, res, next) {
  if (!req.user) return res.status(401).end("access denied");
  next();
};

app.get("/", async function (req, res, next) {
  res.json({
    hello: "welcome to the api",
  });
});

app.use(function (req, res, next) {
  console.log("HTTP request", req.email, req.method, req.url, req.body);
  next();
});

var multer = require("multer");
var upload = multer({ dest: "uploads/" });

app.post("/test/", async function (req, res, next) {
  const result = await Users.find();
  res.json(result);
});

// curl -H "Content-Type: application/json" -X POST -d '{"email":"bobjones@gmail.com","password":"bobjones"}' -c cookie.txt localhost:3000/signup/
app.post("/api/signup", cors(), function (req, res, next) {
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

// curl -H "Content-Type: application/json" -X POST -d '{"email":"bobjones@gmail.com","password":"bobjones"}' -c cookie.txt localhost:3000/signin/
app.post("/api/signin", cors(), function (req, res, next) {
  // extract data from HTTP request
  if (!("email" in req.body)) return res.status(400).end("email is missing");
  if (!("password" in req.body))
    return res.status(400).end("password is missing");
  let email = req.body.email;
  let password = req.body.password;
  // retrieve user from the database
  Users.findOne({ email: email }, function (err, user) {
    if (err) return res.status(500).end(err);
    if (!user) return res.status(401).end("access denied");

    bcrypt.compare(password, user.password, function (err, valid) {
      if (err) return res.status(500).end(err);
      if (!valid) return res.status(401).end("access denied");
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

app.get("/api/testsession", cors(), function (req, res) {
  res.json(req.session.user);
});

// curl -b cookie.txt -c cookie.txt localhost:3000/signout/
app.get("/api/signout/", cors(), function (req, res, next) {
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

/*
app.get('/video', isAuthenticated, (req, res) => {
    res.sendFile('assets/sample.mp4', { root: __dirname });
});

app.get('/videos', (req, res) => res.json(videos));

app.get('/video/:id/data', (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.json(videos[id]);
});

app.get('/video/:id', (req, res) => {
    const path = `assets/${req.params.id}.mp4`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;
        const chunksize = (end-start) + 1;
        const file = fs.createReadStream(path, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

app.get('/video/:id/poster', (req, res) => {
    thumbsupply.generateThumbnail(`assets/${req.params.id}.mp4`)
    .then(thumb => res.sendFile(thumb));
}); */

const server = app.listen(9080, () => {
  console.log("app is running on 9080");
});
