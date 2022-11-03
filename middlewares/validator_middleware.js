const validator = require("express-validator");

const validationMiddleware = (req, res, next) => {
  let errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    });
  }
  next();
};

module.exports = validationMiddleware;