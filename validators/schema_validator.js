const check = require("express-validator").check;
const AJV = require("ajv/dist/2019");
const JSONSchema = require("../models/jsonschema");
const Project = require("../models/project");

const name = check("name", "Name is required")
  .not()
  .isEmpty()
  .custom((value, { req }) => {
    return JSONSchema.findOne({
      name: value,
      project_id: req.body.project_id,
    }).then((jsonschema) => {
      if (jsonschema) {
        return Promise.reject("Name already in use");
      }
    });
  });

const project_id = check("project_id", "Project ID is required")
  .not()
  .isEmpty()
  .custom((value, { req }) => {
    return Project.findOne({ _id: value, created_by: req.user._id }).then(
      (project) => {
        if (!project) {
          return Promise.reject("Project does not exist");
        }
      }
    );
  });

const jsonschema = check("jsonschema", "JSON Schema is required")
  .not()
  .isEmpty()
  .custom((value) => {
    const ajv = new AJV();
    const valid = ajv.validateSchema(value);
    if (!valid) {
      throw new Error("Invalid JSON Schema");
    }
    return true;
  });

module.exports.SchemaCreateValidator = [name, project_id, jsonschema];
