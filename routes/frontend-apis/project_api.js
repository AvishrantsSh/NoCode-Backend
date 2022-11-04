const express = require("express");
const ValidatorMiddleware = require("../../middlewares/validator_middleware");
const validators = require("../../validators/validator");
const router = express.Router();

// Controllers
const projectController = require("../../controllers/project_controller");

// Project Routes
router.get("/", projectController.listAll);
router.get("/:project_id", projectController.details);
router.post(
  "/",
  validators.projectValidator.ProjectCreateValidator,
  ValidatorMiddleware,
  projectController.create
);
router.delete("/:project_id", projectController.delete);

router.post(
  "/:project_id/generateToken",
  projectController.generateNewAccessToken
);

module.exports = router;
