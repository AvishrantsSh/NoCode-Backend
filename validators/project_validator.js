const check = require("express-validator").check;
const Project = require("../models/project");

const name = check("name", "Name is required")
  .not()
  .isEmpty()
  .custom((value, { req }) => {
    return Project.findOne({ name: value, created_by: req.user._id }).then(
      (project) => {
        if (project) {
          return Promise.reject("Project already exists");
        }
      }
    );
  });

module.exports.ProjectCreateValidator = [name];
