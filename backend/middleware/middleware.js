const config = require("../config/config"); // load .env variables
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = config;

// MIDDLEWARE FOR AUTHORIZATION
const isLoggedIn = async (req, res, next) => {
  try {
    // check if auth header exists
    if (req.headers.authorization) {
      // parse token from header
      const token = req.headers.authorization.split(" ")[1]; //split the header and get the token
      if (token) {
        const payload = await jwt.verify(token, JWT_SECRET);
        if (payload) {
          // store user data in request object
          req.user = payload;
          next();
        } else {
          res.status(400).json({ error: "Token verification failed" });
        }
      } else {
        res.status(400).json({ error: "Malformed auth header" });
      }
    } else {
      res.status(400).json({ error: "No authorization header" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};


// export custom middleware
module.exports = {
  isLoggedIn,
};
