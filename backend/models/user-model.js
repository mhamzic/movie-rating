const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    recipes: [{ type: mongoose.Types.ObjectId, required: true, ref: "Recipe" }],
  },
  { timestamps: true }
);

// User model
const User = mongoose.model("User", UserSchema);

module.exports = User;
