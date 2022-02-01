const express = require("express");
const userController = require("../controllers/user-controller");
const router = express.Router();
const { isLoggedIn } = require("../middleware/middleware"); // import isLoggedIn custom middleware
const validate = require("./validators/validate");

router.post("/signup", validate.user, userController.signup);

router.post("/login", userController.login);

router.post("/googlelogin", userController.googleLogin);

module.exports = router;
