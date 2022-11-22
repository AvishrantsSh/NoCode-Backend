const express = require("express");
const router = express.Router();
const PassportMiddleware = require("../../middlewares/passport_middleware");

router.use(PassportMiddleware.userAuth);

router.use("/projects", require("./project_api"));
router.use("/schemas", require("./schema_api"));
router.use("/userdata", require("./data_api"));

module.exports = router;
