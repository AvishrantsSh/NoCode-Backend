const express = require("express");
const router = express.Router();
const PassportMiddleware = require("../../middlewares/passport_middleware");

router.use("/projects", PassportMiddleware.userAuth, require("./project_api"));
router.use("/schemas", PassportMiddleware.userAuth, require("./schema_api"));

module.exports = router;
