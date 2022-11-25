const User = require("../models/user");

module.exports.create = async function (req, res) {
  try {
    // Check if the email is taken or not
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        success: false,
        error:
          "Email is already registered. Did you forget the password. Try resetting it.",
      });
    }

    user = await User.create(req.body);
    return res.status(200).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.errors,
    });
  }
};

module.exports.login = async function (req, res) {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "User does not exist",
      });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({
        error: "Incorrect credentials",
      });
    }
    let token = await user.getToken();
    return res.status(200).json({
      success: true,
      user: user.getUserInfo(),
      token: token,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};
