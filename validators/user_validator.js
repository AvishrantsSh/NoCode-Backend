const check = require("express-validator").check;

const name = check("name", "Name is required").not().isEmpty();
const email = check("email", "Please provide a valid email address")
  .isEmail()
  .trim()
  .escape()
  .normalizeEmail();
const password = check(
  "password",
  "Password is required of minimum length of 6."
).isLength({
  min: 6,
});

module.exports.RegisterValidations = [name, email, password];
module.exports.AuthenticateValidations = [email, password];
