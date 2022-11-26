const mongoose = require("mongoose");
const JSONSchema = require("./jsonschema");
const AJV = require("ajv/dist/2019");
const draft7MetaSchema = require("ajv/dist/refs/json-schema-draft-07.json");
const addFormats = require("ajv-formats");

const DataSchema = new mongoose.Schema({
  schemaID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JSONSchema",
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

// Create Indexes
DataSchema.index({ schemaID: 1 });

DataSchema.methods.getData = function () {
  return {
    _id: this._id,
    ...this.data,
  };
};

module.exports = mongoose.model("DataModel", DataSchema);
