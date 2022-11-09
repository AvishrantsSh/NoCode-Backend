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

module.exports = router;
