const Project = require("../models/project");
const crypto = require("crypto");

module.exports.listAll = async function (req, res) {
  const projects = await Project.find({ created_by: req.user._id }).select(
    "name created_at"
  );
  return res.status(200).json({
    data: projects,
  });
};

module.exports.details = async function (req, res) {
  if (req.project.created_by.equals(req.user._id)) {
    return res.status(200).json({
      data: req.project.getProjectInfo(),
    });
  }
  return res.status(403).json({
    error: "You are not authorized to access this project",
  });
};

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
      project: project.getProjectInfo(),
      access_token: access_token,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.delete = async function (req, res) {
  if (req.project.created_by.equals(req.user._id)) {
    req.project.remove();
    return res.status(200).json({
      message: "Project deleted successfully",
    });
  }
  return res.status(403).json({
    error: "You are not authorized to access this project",
  });
};

module.exports.generateNewAccessToken = async function (req, res) {
  if (req.project.created_by.equals(req.user._id)) {
    const access_token = crypto.randomBytes(16).toString("hex");
    req.project.access_token = access_token;
    await req.project.save();
    return res.status(200).json({
      message: "Access token generated successfully",
      access_token: access_token,
    });
  }
  return res.status(403).json({
    error: "You are not authorized to access this project",
  });
};
