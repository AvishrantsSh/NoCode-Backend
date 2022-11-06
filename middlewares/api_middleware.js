const Project = require("../models/project");
const JSONSchema = require("../models/jsonschema");
const idValidator = require("../validators/validator").idValidator;

const apiAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
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
        console.log(authHeader);
        if (project.validateToken(authHeader)) next();
        return res.status(401).json({ error: "Unauthorized Request" });
      });
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports.apiAuth = apiAuth;
