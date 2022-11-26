const check = require("express-validator").check;
const AJV = require("ajv/dist/2019");
const Project = require("../models/project");
const draft7MetaSchema = require("ajv/dist/refs/json-schema-draft-07.json");
const addFormats = require("ajv-formats");

const name = check("name", "Name is required").not().isEmpty();

const projectID = check("projectID", "Project ID is required")
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
    if (value === {}) {
      return Promise.reject("JSON Schema is required.");
    }
    const ajv = new AJV();
    ajv.addMetaSchema(draft7MetaSchema);
    addFormats(ajv);
    ajv.compile(value);
    return true;
  });

module.exports.SchemaCreateValidator = [name, projectID, jsonschema];
