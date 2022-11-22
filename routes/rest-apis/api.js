const express = require("express");
const dataController = require("../../controllers/data_controller");
const ValidatorMiddleware = require("../../middlewares/validator_middleware");
const APIMiddleware = require("../../middlewares/api_middleware");

let middlewares = [ValidatorMiddleware, APIMiddleware];
const router = express.Router();

router.get("/:projectID/:schemaID", middlewares, dataController.get);
router.get("/:projectID/:schemaID/:dataID", middlewares, dataController.get);

router.post("/:projectID/:schemaID", middlewares, dataController.create);

router.put("/:projectID/:schemaID/:dataID", middlewares, dataController.update);

router.delete(
  "/:projectID/:schemaID/:dataID",
  middlewares,
  dataController.delete
);

module.exports = router;
