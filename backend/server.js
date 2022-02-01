const config = require("./config/config.js");
const fs = require("fs");
const path = require("path");
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const cors = require("cors"); // import cors
const { createContext } = require("./middleware/middleware");
const connectDB = require("./config/db");

//DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const { PORT } = config;

connectDB();

// Create Application Object
const app = express();

// GLOBAL MIDDLEWARE
app.use(cors()); // add cors headers
app.use(morgan("tiny")); // log the request for debugging
app.use(express.json()); // parse json bodies
app.use("/library/images/", express.static(path.join("library", "images")));

// ROUTES AND ROUTES

//testing routes
app.get("/", (req, res) => {
  res.send("Welcome to Movie App API...");
});

//application routes
app.use("/api/users", require("./routes/user-routes"));
app.use("/api/movies", require("./routes/movie-routes"));

// ERRORS DISPLAY
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ error: error.message || "An unknown error occurred!" });
});

// APP LISTENER
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
