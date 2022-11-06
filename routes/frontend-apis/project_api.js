const express = require("express");
const ValidatorMiddleware = require("../../middlewares/validator_middleware");
const validators = require("../../validators/validator");
const router = express.Router();

// Controllers
const projectController = require("../../controllers/project_controller");

// Project Routes
router.get("/", projectController.listAll);
router.get("/:projectID", projectController.details);

router.post(
  "/",
  validators.projectValidator.ProjectCreateValidator,
  ValidatorMiddleware,
  projectController.create
);
router.post(
  "/:projectID/generateToken",
  projectController.generateNewAccessToken
);

router.delete("/:projectID", projectController.delete);

module.exports = router;
