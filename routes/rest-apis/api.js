const express = require("express");
const dataController = require("../../controllers/data_controller");
const APIMiddleware = require("../../middlewares/api_middleware");
const router = express.Router();

router.get("/:projectID/:schemaID", APIMiddleware.apiAuth, dataController.get);
router.get(
  "/:projectID/:schemaID/:dataID",
  APIMiddleware.apiAuth,
  dataController.get
);

router.post(
  "/:projectID/:schemaID",
  APIMiddleware.apiAuth,
  dataController.create
);

router.put(
  "/:projectID/:schemaID/:dataID",
  APIMiddleware.apiAuth,
  dataController.update
);

router.delete(
  "/:projectID/:schemaID/:dataID",
  APIMiddleware.apiAuth,
  dataController.delete
);

module.exports = router;
