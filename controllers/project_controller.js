const Project = require("../models/project");

module.exports.create = async function (req, res) {
    try {
        const project = await Project.create(req.body);
        return res.status(200).json({
            message: "Project created successfully",
            project: project,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

module.exports.listAll = async function (req, res) {
    try {
        const projects = await Project.find();
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
        const project = await Project.findById(req.params.project_id);
        return res.status(200).json({
            data: project,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}
