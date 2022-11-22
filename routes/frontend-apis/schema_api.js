const express = require("express");
const ValidatorMiddleware = require("../../middlewares/validator_middleware");
const validators = require("../../validators/validator");
const router = express.Router();

// Controllers
const jsonschemaController = require("../../controllers/jsonschema_controller");

// JSONSchema Routes
router.get("/:projectID", ValidatorMiddleware, jsonschemaController.listAll);
router.get(
  "/:projectID/:schemaID",
  ValidatorMiddleware,
  jsonschemaController.details
);

router.post(
  "/:projectID",
  validators.schemaValidator.SchemaCreateValidator,
  ValidatorMiddleware,
  jsonschemaController.create
);

router.delete(
  "/:projectID/:schemaID",
  ValidatorMiddleware,
  jsonschemaController.delete
);

module.exports = router;
