const check = require("express-validator").check;
const AJV = require("ajv/dist/2019");
const JSONSchema = require("../models/jsonschema");
const Project = require("../models/project");
const draft7MetaSchema = require("ajv/dist/refs/json-schema-draft-07.json");

const name = check("name", "Name is required")
  .not()
  .isEmpty()
  .custom((value, { req }) => {
    return JSONSchema.findOne({
      name: value,
      projectID: req.body.projectID,
    }).then((jsonschema) => {
      if (jsonschema) {
        return Promise.reject("Name already in use");
      }
    });
  });

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
    const ajv = new AJV();
    ajv.addMetaSchema(draft7MetaSchema);
    ajv.compile(value);
    return true;
  });

module.exports.SchemaCreateValidator = [name, projectID, jsonschema];
