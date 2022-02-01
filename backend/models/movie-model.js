const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    poster: { type: String },
    released: { type: Date },
    actors: { type: String },
    ratingData: [
      { userId: { type: mongoose.Types.ObjectId }, rating: { type: Number } },
    ],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
