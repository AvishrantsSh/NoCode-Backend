const JsonSchema = require("../models/jsonschema");

module.exports.listAll = async function (req, res) {
  if (req.project.created_by.equals(req.user._id)) {
    const jsonschemas = await JsonSchema.find({
      projectID: req.project._id,
    }).populate({
      path: "projectID",
      model: "Project",
      match: { created_by: req.user._id },
    });

    return res.status(200).json({
      data: jsonschemas.map((jsonschema) => jsonschema.getJSONSchema()),
    });
  }
  return res.status(403).json({
    error: "You are not authorized to access this project",
  });
};

module.exports.details = async function (req, res) {
  if (req.project.created_by.equals(req.user._id)) {
    return res.status(200).json(await req.schema.getAllDetails());
  }
  return res.status(403).json({
    error: "You are not authorized to access this project",
  });
};

module.exports.create = async function (req, res) {
  try {
    const jsonSchema = await JsonSchema.create({
      name: req.body.name,
      jsonschema: req.body.jsonschema,
      projectID: req.project._id,
    });

    return res.status(200).json({
      message: "Schema created successfully",
      data: jsonSchema.getJSONSchema(),
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.delete = async function (req, res) {
  if (req.project.created_by.equals(req.user._id)) {
    await req.schema.remove();
    return res.status(200).json({
      message: "Schema deleted successfully",
    });
  }
  return res.status(403).json({
    error: "You are not authorized to access this project",
  });
};
