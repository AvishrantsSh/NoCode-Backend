const validators = require("../validators/validator"),
  Project = require("../models/project"),
  JsonSchema = require("../models/jsonschema");

module.exports.create = async function (req, res) {
  try {
    const jsonschema = await JsonSchema.create(req.body);
    return res.status(200).json({
      message: "Schema created successfully",
      data: jsonschema,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.listAll = async function (req, res) {
  try {
    // Get JSONSchemas related to req.user from DB
    const projects = await Project.find({ created_by: req.user._id }).select(
      "_id"
    );
    const jsonschemas = await JsonSchema.find({
      project_id: { $in: projects.map((project) => project._id) },
    });

    return res.status(200).json({
      data: jsonschemas,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.details = async function (req, res) {
  try {
    if (validators.idValidator(req.params.schema_id)) {
      const jsonSchema = await JsonSchema.findOne({
        _id: req.params.schema_id,
      })
        .populate({
          path: "project_id",
          model: "Project",
          match: { created_by: req.user._id },
        })
        .select("-__v");

      if (jsonSchema) {
        return res.status(200).json(jsonSchema);
      }

      return res.status(404).json({
        message: "Requested schema not found",
      });
    }
    return res.status(400).json({
      message: "Invalid Schema ID",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
