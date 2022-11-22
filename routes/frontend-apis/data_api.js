const express = require("express");
const dataController = require("../../controllers/data_controller");
const ValidatorMiddleware = require("../../middlewares/validator_middleware");
const router = express.Router();

router.get("/:projectID/:schemaID", ValidatorMiddleware, dataController.get);
router.get(
  "/:projectID/:schemaID/:dataID",
  ValidatorMiddleware,
  dataController.get
);

router.delete(
  "/:projectID/:schemaID/:dataID",
  ValidatorMiddleware,
  dataController.delete
);

module.exports = router;
