const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const User = require("./src/models/User");
const UserRoutes = require("./src/routes/UserRoutes");

const app = express();

mongoose.connect("mongodb://localhost:27017/crowdfunding");

// const user = new User({
//   username: "Inderajith K",
//   address: "0x0Acbd51D560D1bD1d53Fe2e2506db23d5F209bEc",
// });
// user.save();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(UserRoutes);
app.get("/", (req, res) => {
  res.send("this is crowdfunding home");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
