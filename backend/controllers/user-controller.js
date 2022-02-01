const { validationResult } = require("express-validator");
const config = require("../config/config"); // load .env variables
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const { OAuth2Client } = require("google-auth-library");

const User = require("../models/user-model");

const client = new OAuth2Client(
  "328895224341-mr3jsd1bquuf9vb3qsop6pm8crssjj1r.apps.googleusercontent.com"
);

//DESTRUCTURE ENV VARIABLES WITH DEFAULTS
const { JWT_SECRET } = config;

const getUser = async (req, res, next) => {
  const userId = req.user.user_id; // get user id from req.user property created by isLoggedIn middleware

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Fetching user failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ user: user.toObject({ getters: true }) });
};

// Signup controller to create a new user
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { username, password, email } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({
      $or: [
        {
          email: req.body.email,
        },
        {
          username: req.body.username,
        },
      ],
    });
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User already exists, please login instead or choose different user name or email.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    const error = new HttpError("Could not create user.", 500);
    return next(error);
  }

  const createdUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject() });
};

// Login controller to verify a user and get a token
const login = async (req, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      //check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = await jwt.sign(
          { username: user.username, user_id: user._id },
          JWT_SECRET
        );
        res.json({ token, user });
      } else {
        res.status(400).json({ error: "Password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const edit = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data.", 422)
    );
  }

  const { username, email, oldpassword, newpassword } = req.body;
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update transaction.",
      500
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(oldpassword, user.password);
  } catch (err) {
    const error = new HttpError("Please check your credentials.", 500);
    return next(error);
  }

  if (!isValidPassword) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 401)
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(newpassword, 10);
  } catch (err) {
    const error = new HttpError("Could not create user.", 500);
    return next(error);
  }

  user.password = hashedPassword;
  user.username = username;
  user.email = email;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update transaction.",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { username: user.username, user_id: user._id },
      JWT_SECRET
    );
  } catch (err) {
    const error = new HttpError("Update user failed, please try again.", 500);
    return next(error);
  }

  res
    .status(200)
    .json({ user: user.toObject({ getters: true }), token: token });
};

const googleLogin = async (req, res, next) => {
  const { tokenId } = req.body;
  const response = await client.verifyIdToken({
    idToken: tokenId,
    audience:
      "328895224341-mr3jsd1bquuf9vb3qsop6pm8crssjj1r.apps.googleusercontent.com",
  });
  const { email_verified, name, email } = response.payload;

  try {
    let user = await User.findOne({ username: name });
    if (!user) {
      let password = email + config.JWT_SECRET;
      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(password, 10);
      } catch (err) {
        const error = new HttpError("Could not create user.", 500);
        return next(error);
      }
      const createdUser = new User({
        username: name,
        email: email,
        password: hashedPassword,
      });
      try {
        let user = await createdUser.save();
        const token = jwt.sign(
          { username: user.username, user_id: user._id },
          JWT_SECRET
        );

        res.status(201).json(token);
      } catch (err) {
        const error = new HttpError(
          "Signing up failed, please try again.",
          500
        );
        return next(error);
      }
    } else {
      const token = jwt.sign(
        { username: user.username, user_id: user._id },
        JWT_SECRET
      );
      res.status(201).json(token);
    }
  } catch (error) {
    return next(error);
  }
};

exports.signup = signup;
exports.login = login;
exports.edit = edit;
exports.getUser = getUser;
exports.googleLogin = googleLogin;
