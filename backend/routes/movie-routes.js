const express = require("express");
const movieController = require("../controllers/movie-controller");
const router = express.Router();
const { isLoggedIn } = require("../middleware/middleware"); // import isLoggedIn custom middleware


router.get("/", isLoggedIn, movieController.getAllMovies);
router.get("/:mid", isLoggedIn, movieController.getMovieById);
router.post("/rating/:mid", isLoggedIn, movieController.changeRating);

module.exports = router;
