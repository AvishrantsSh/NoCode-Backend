const DataModel = require("../models/data");

module.exports.create = async function (req, res) {
  try {
    const data = await DataModel.create(req.body);
    return res.status(200).json({
      message: "Data saved successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.update = async function (req, res) {
  try {
    const data = await DataModel.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    return res.status(200).json({
      message: "Data updated successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.get = async function (req, res) {
  try {
    if (req.params.id) {
      const data = await DataModel.findById(req.params.id);
    } else {
      const data = await DataModel.find();
    }

    return res.status(200).json({
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.delete = async function (req, res) {
  try {
    const data = await DataModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Data deleted successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
