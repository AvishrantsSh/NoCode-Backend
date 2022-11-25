const apiMiddleware = async (req, res, next) => {
  if (!req.headers.auth_key) {
    return res.status(401).json({
      message: "Please supply auth_key in headers",
    });
  }
  req.schema.updateOne({ $inc: { api_calls: 1 } }, (err, schema) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });

  const authKey = req.headers.auth_key;
  req.project.validateToken(authKey).then((isValid) => {
    if (!isValid) {
      return res.status(401).json({
        message: "Invalid auth_key",
      });
    }
    next();
  });
};

module.exports = apiMiddleware;
