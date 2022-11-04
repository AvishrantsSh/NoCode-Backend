const express = require("express");
const router = express.Router();

// Controllers
const jsonschemaController = require("../../controllers/jsonschema_controller");

// JSONSchema Routes
router.get("/", jsonschemaController.listAll);
router.post("/", jsonschemaController.create);
router.get("/:schema_id", jsonschemaController.details);

module.exports = router;
