const validator = require("express-validator");
const idValidator = require("../validators/validator").idValidator;
const Project = require("../models/project");
const JSONSchema = require("../models/jsonschema");

const validationMiddleware = async (req, res, next) => {
  let errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // Validate all IDs
  let param = Object.keys(req.params).filter((param) => param.endsWith("ID"));
  for (let i = 0; i < param.length; i++) {
    if (!idValidator(req.params[param[i]])) {
      return res.status(400).json({
        error: `Invalid ${param[i]}`,
      });
    }
  }

  if (req.params.projectID) {
    let project = await Project.findById(req.params.projectID);
    if (!project) {
      return res.status(404).json({
        error: "Project not found with specified details",
      });
    }
    req.project = project;

    if (req.params.schemaID) {
      let schema = await JSONSchema.findOne({
        project: project._id,
        _id: req.params.schemaID,
      });
      if (!schema) {
        return res.status(404).json({
          error: "Schema not found with specified details",
        });
      }
      req.schema = schema;
    }
  }
  next();
};

module.exports = validationMiddleware;
