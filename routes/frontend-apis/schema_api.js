const express = require("express");
const ValidatorMiddleware = require("../../middlewares/validator_middleware");
const validators = require("../../validators/validator");
const router = express.Router();

// Controllers
const jsonschemaController = require("../../controllers/jsonschema_controller");

// JSONSchema Routes
router.get("/", jsonschemaController.listAll);
router.get("/:schema_id", jsonschemaController.details);

router.post(
  "/",
  validators.schemaValidator.SchemaCreateValidator,
  ValidatorMiddleware,
  jsonschemaController.create
);

module.exports = router;
