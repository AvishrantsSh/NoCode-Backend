const express = require("express");
const ValidatorMiddleware = require("../../middlewares/validator_middleware");
const validators = require("../../validators/validator");
const router = express.Router();

// Controllers
const projectController = require("../../controllers/project_controller");

// Project Routes
router.get("/", ValidatorMiddleware, projectController.listAll);
router.get("/:projectID", ValidatorMiddleware, projectController.details);

router.post(
  "/",
  validators.projectValidator.ProjectCreateValidator,
  ValidatorMiddleware,
  projectController.create
);
router.post(
  "/:projectID/generateToken",
  ValidatorMiddleware,
  projectController.generateNewAccessToken
);

router.delete("/:projectID", ValidatorMiddleware, projectController.delete);

module.exports = router;
