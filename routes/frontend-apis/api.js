const express = require("express");
const router = express.Router();
const passport = require("passport");
const PassportMiddleware = require("../../middlewares/passport_middleware");

router.use("/projects", PassportMiddleware.userAuth, require("./project_api"));
router.use("/schemas", PassportMiddleware.userAuth, require("./schema_api"));
router.use("/lol", PassportMiddleware.userAuth, (req, res) => {
    res.status(200).json({
        message: "Welcome to the API",
    });
})

module.exports = router;
