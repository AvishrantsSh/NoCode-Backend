const validators = require("../validators/validator"),
  JsonSchema = require("../models/jsonschema");

module.exports.create = async function (req, res) {
  try {
    if (validators.idValidator(req.params.projectID)) {
      const jsonSchema = await JsonSchema.create({
        name: req.body.name,
        jsonschema: req.body.jsonschema,
        projectID: req.params.projectID,
      });

      return res.status(200).json({
        message: "Schema created successfully",
        data: jsonSchema.getJSONSchema(),
      });
    }

    return res.status(400).json({
      message: "Invalid Project ID",
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
    if (validators.idValidator(req.params.projectID)) {
      const jsonschemas = await JsonSchema.find({
        projectID: req.params.projectID,
      }).populate({
        path: "projectID",
        model: "Project",
        match: { created_by: req.user._id },
      });

      return res.status(200).json({
        schemas: jsonschemas.map((jsonschema) => jsonschema.getJSONSchema()),
      });
    } else {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.details = async function (req, res) {
  try {
    if (
      validators.idValidator(req.params.schemaID) &&
      validators.idValidator(req.params.projectID)
    ) {
      const jsonSchema = await JsonSchema.findOne({
        _id: req.params.schemaID,
        projectID: req.params.projectID,
      }).populate({
        path: "projectID",
        model: "Project",
        match: { created_by: req.user._id },
      });

      if (jsonSchema) {
        return res.status(200).json(jsonSchema.getJSONSchema());
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

module.exports.delete = async function (req, res) {
  try {
    if (
      validators.idValidator(req.params.schemaID) &&
      validators.idValidator(req.params.projectID)
    ) {
      const jsonSchema = await JsonSchema.findOne({
        _id: req.params.schemaID,
        projectID: req.params.projectID,
      }).populate({
        path: "projectID",
        model: "Project",
        match: { created_by: req.user._id },
      });

      if (jsonSchema) {
        await jsonSchema.remove();
        return res.status(200).json({
          message: "Schema deleted successfully",
        });
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
