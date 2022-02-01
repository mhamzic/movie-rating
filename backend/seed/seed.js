const config = require("../config/config"); // load .env variables
const mongoose = require("mongoose");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const User = require("../models/user-model");
const Movie = require("../models/movie-model");

const { MONGO } = config;

// Connect to DB
mongoose.connect(MONGO, {
  useNewUrlParser: true,
});

// Read JSON files
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const movies = JSON.parse(fs.readFileSync(`${__dirname}/movies.json`, "utf-8"));

// Import into DB
const importData = async () => {
  try {
    await User.collection.drop();
    await Movie.collection.drop();

    await Movie.create(movies);

    const moviesFromDB = await Movie.find();

    for (movie of moviesFromDB) {
      let randomRating = Math.floor(Math.random() * 5) + 1;
      movie.ratingData = [];
      movie.averageRating = randomRating;
      movie.save();
    }

    for (user of users) {
      let hashedPassword = await bcrypt.hash(user.password, 10);
      let newUser = new User({
        username: user.username,
        email: user.email,
        password: hashedPassword,
      });
      await newUser.save();
    }

    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

importData();
