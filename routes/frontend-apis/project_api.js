const express = require("express");
const router = express.Router();

// Controllers
const projectController = require("../../controllers/project_controller");

// Project Routes
router.get("/", projectController.listAll);
router.post("/", projectController.create);
router.get("/:project_id", projectController.details);

module.exports = router;