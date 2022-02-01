const { check } = require("express-validator");
exports.recipe = [
  check("title").not().isEmpty(),
  check("description").not().isEmpty(),
  check("category").not().isEmpty(),
  check("instructions").not().isEmpty(),
  check("ingredients").not().isEmpty(),
];
exports.user = [
  check("username").not().isEmpty(),
  check("password").isLength({ min: 6 }),
  check("email").normalizeEmail().isEmail(),
];

exports.userchange = [
  check("username").not().isEmpty(),
  check("oldpassword").isLength({ min: 6 }),
  check("newpassword").isLength({ min: 6 }),
  check("email").normalizeEmail().isEmail(),
];
