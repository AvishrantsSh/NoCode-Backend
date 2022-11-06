const Project = require("../models/project");
const crypto = require("crypto");
const validators = require("../validators/validator");

module.exports.create = async function (req, res) {
  try {
    const access_token = crypto.randomBytes(16).toString("hex");
    const project = await Project.create({
      name: req.body.name,
      created_by: req.user._id,
      access_token: access_token,
    });
    return res.status(200).json({
      message: "Project created successfully",
      project: {
        _id: project._id,
        name: project.name,
        created_at: project.created_at,
      },
      access_token: access_token,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.listAll = async function (req, res) {
  try {
    const projects = await Project.find({ created_by: req.user._id }).select(
      "name created_at"
    );
    return res.status(200).json({
      data: projects,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.details = async function (req, res) {
  try {
    if (validators.idValidator(req.params.projectID)) {
      const project = await Project.findOne({
        _id: req.params.projectID,
        created_by: req.user._id,
      }).select("name created_at");

      if (project) {
        return res.status(200).json({
          data: project,
        });
      }

      return res.status(404).json({
        message: "Project not found",
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

module.exports.delete = async function (req, res) {
  try {
    if (validators.idValidator(req.params.projectID)) {
      const project = await Project.findOne({
        _id: req.params.projectID,
        created_by: req.user._id,
      });

      if (project) {
        await project.remove();
        return res.status(200).json({
          message: "Project deleted successfully",
        });
      }

      return res.status(404).json({
        message: "Project not found",
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

module.exports.generateNewAccessToken = async function (req, res) {
  try {
    if (validators.idValidator(req.params.projectID)) {
      const project = await Project.findOne({
        _id: req.params.projectID,
        created_by: req.user._id,
      });

      if (project) {
        const access_token = crypto.randomBytes(16).toString("hex");
        project.access_token = access_token;
        await project.save();
        return res.status(200).json({
          message: "Access token generated successfully",
          access_token: access_token,
        });
      }

      return res.status(404).json({
        message: "Project not found",
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
