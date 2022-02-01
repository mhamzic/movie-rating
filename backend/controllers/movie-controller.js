const HttpError = require("../models/http-error");
const User = require("../models/user-model");
const Movie = require("../models/movie-model");

// const toId = mongoose.Types.ObjectId;

// GET ALL RECIPES
const getAllMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find({}).sort({ averageRating: -1 });
  } catch (error) {
    return next(error);
  }

  res.json(movies);
};

//GET MOVIE BY ID
const getMovieById = async (req, res, next) => {
  const movieId = req.params.mid;
  let movie;
  try {
    movie = await Movie.findById(movieId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a movie",
      500
    );
    return next(error);
  }

  if (!movieId) {
    const error = new HttpError("Could not find book for provided id.", 404);
    return next(error);
  }

  res.status(200).json({ movie: movie.toObject({ getters: true }) });
};

// CALCULATE RATING
const changeRating = async (req, res, next) => {
  const movieId = req.params.mid;
  const ratedBy = req.user.user_id; // get username from req.user property created by isLoggedIn middleware

  const { rating } = req.body;

  console.log(rating);

  let movie;

  try {
    movie = await Movie.findById(movieId).sort({ averageRating: -1 });
  } catch (err) {
    const error = new HttpError(
      "Finding movie failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!movie) {
    const error = new HttpError("Could not find movie for provided id.", 404);
    return next(error);
  }

  const existingUser = movie.ratingData.find(
    ({ userId }) => userId.toString() === ratedBy.toString()
  );

  // if (existingUser) {
  //   const error = new HttpError("Only one vote per movie is allowed.", 404);
  //   return next(error);
  // }

  movie.ratingData.push({ rating: rating, userId: ratedBy });

  let _5star = movie.ratingData.filter((r) => r.rating == 5).length;
  let _4star = movie.ratingData.filter((r) => r.rating == 4).length;
  let _3star = movie.ratingData.filter((r) => r.rating == 3).length;
  let _2star = movie.ratingData.filter((r) => r.rating == 2).length;
  let _1star = movie.ratingData.filter((r) => r.rating == 1).length;

  //Sum of individual star.
  let sumOfRating = parseInt(_5star + _4star + _3star + _2star + _1star);

  //Total number of rating
  let overallRating = parseInt(
    5 * _5star + 4 * _4star + 3 * _3star + 2 * _2star + 1 * _1star
  );

  //Average of all rating
  movie.averageRating = parseInt(overallRating / sumOfRating);

  console.log(movie.averageRating);

  try {
    await movie.save();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.status(201).json(movie);
};

exports.getAllMovies = getAllMovies;
exports.getMovieById = getMovieById;
exports.changeRating = changeRating;
