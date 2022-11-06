const express = require("express");
const dataController = require("../../controllers/data_controller");
const router = express.Router();

router.get("/:projectID/:schemaID", dataController.get);
router.get("/:projectID/:schemaID/:dataID", dataController.get);

module.exports = router;
