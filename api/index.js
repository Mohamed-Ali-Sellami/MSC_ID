// importing express
const express = require("express");
const cors = require("cors");
const path = require("path");

// initialization
const app = express();

// importing database
const connectDB = require("./config/connectDB");

// importing passport
const passport = require("passport");

// importing dotenv
require("dotenv").config();

// connect to database
connectDB();

// convert json:middleware
app.use(express.json());
app.use(cors());

// running passport
app.use(passport.initialize());

// Routes
app.use("/user", require("./routes/user"));

// Serve frontend React (after build)
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
});

// Start server
app.listen(process.env.PORT, (err) => {
  err ? console.log(err) : console.log("Server is running...");
});
