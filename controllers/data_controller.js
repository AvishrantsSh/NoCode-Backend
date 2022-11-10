const DataModel = require("../models/data");
const validators = require("../validators/validator");

module.exports.get = async function (req, res) {
  try {
    let data = null;
    if (req.params.dataID) {
      if (!validators.idValidator(req.params.dataID)) {
        return res.status(400).json({
          message: "Invalid data ID",
        });
      }
      data = await DataModel.findOne({
        _id: req.params.dataID,
        schemaID: req.params.schemaID,
      });

      if (data) return res.status(200).json(data.getData());
    } else {
      data = await DataModel.find({ schemaID: req.params.schemaID });
      if (data) return res.status(200).json(data.map((data) => data.getData()));
    }

    return res.status(404).json({
      message: "Requested data not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.create = async function (req, res) {
  try {
    const data = await DataModel.validateCreate(req.params.schemaID, req.body);
    return res.status(201).json({
      message: "Data created successfully",
      data: data.getData(),
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

module.exports.update = async function (req, res) {
  try {
    if (!validators.idValidator(req.params.dataID)) {
      return res.status(400).json({
        message: "Invalid data ID",
      });
    }
    const data = await DataModel.validateUpdate(
      req.params.schemaID,
      req.params.dataID,
      req.body
    );

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

module.exports.delete = async function (req, res) {
  try {
    const data = await DataModel.findOneAndDelete({
      schemaID: req.params.schemaID,
      _id: req.params.dataID,
    });
    if (data)
      return res.status(200).json({
        message: "Data deleted successfully",
        data: data.getData(),
      });
    return res.status(404).json({
      message: "Requested data not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
