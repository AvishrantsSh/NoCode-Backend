const Project = require("../models/project");
const JSONSchema = require("../models/jsonschema");
const idValidator = require("../validators/validator").idValidator;

const apiAuth = async (req, res, next) => {
  if (!req.headers.auth_key) {
    return res.status(401).json({
      message: "Please supply auth_key in headers",
    });
  }
  const authKey = req.headers.auth_key;
  let project = req.params.projectID,
    schema = req.params.schemaID;

  if (!idValidator(project) || !idValidator(schema)) {
    return res.status(400).json({
      message: "Invalid project or schema ID",
    });
  }

  try {
    Project.findById(project).then((project) => {
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      JSONSchema.find({ project: project._id, _id: schema }).then((schema) => {
        if (!schema) {
          return res.status(404).json({ error: "Schema not found" });
        }
        project.validateToken(authKey).then((result) => {
          if (!result) {
            return res.status(401).json({ error: "Invalid access token" });
          }
          next();
        });
      });
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports.apiAuth = apiAuth;
