const express = require("express");
const router = express.Router();

router.use("/", require("./frontend-apis/api"));
router.use("/auth", require("./authentication/auth"));
router.use("/api", require("./rest-apis/api"));

module.exports = router;