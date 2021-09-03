const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

//posts object will hold our info for the session, no DB for this small project
//any changes to this file will clear this object
const posts = {};

//GET
app.get("/posts", (req, res) => {
  //Anyone that makes a get request to /posts will get all the posts sent back in the response
  res.send(posts);
});

//POST
app.post("/posts", async (req, res) => {
  //Random bytes for ID
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Hey, this event exists! ", req.body.type);
  res.send({});
});

//Listening on port 4000 for changes
app.listen(4000, () => {
  console.log("listening on port 4000");
});
