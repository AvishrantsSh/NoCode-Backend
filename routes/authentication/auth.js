const express = require("express");
const ValidatorMiddleware = require("../../middlewares/validator_middleware");
const validators = require("../../validators/validator");
const router = express.Router();

// Controllers
const userController = require("../../controllers/user_controller");

router.post(
  "/signup",
  validators.userValidator.RegisterValidations,
  ValidatorMiddleware,
  userController.create
);
router.post(
  "/login",
  validators.userValidator.AuthenticateValidations,
  ValidatorMiddleware,
  userController.login
);

module.exports = router;
