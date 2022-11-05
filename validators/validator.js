const userValidator = require("./user_validator");
const projectValidator = require("./project_validator");
const schemaValidator = require("./schema_validator");
module.exports = {
  userValidator,
  projectValidator,
  schemaValidator,
};

module.exports.idValidator = (value) => {
  if (
    value === undefined ||
    value === null ||
    !value.match(/^[0-9a-fA-F]{24}$/)
  ) {
    return false;
  }
  return true;
};
