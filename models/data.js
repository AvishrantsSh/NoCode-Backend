const mongoose = require("mongoose");
const JSONSchema = require("./jsonschema");
const AJV = require("ajv/dist/2019");
const draft7MetaSchema = require("ajv/dist/refs/json-schema-draft-07.json");

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

// Custom functions
DataSchema.statics.validateCreate = async (schemaID, data) => {
  // Data validation
  // Validate data against JSONSchema
  const schema = await JSONSchema.findById(schemaID);
  if (!schema) {
    throw new Error("Schema not found");
  }
  const ajv = new AJV();
  ajv.addMetaSchema(draft7MetaSchema);
  const valid = ajv.validate(schema.jsonschema, data);
  if (!valid) {
    throw new Error(ajv.errorsText());
  }
  // Save validated data
  return new mongoose.model("DataModel")({
    schemaID: schemaID,
    data: data,
  }).save();
};

DataSchema.statics.validateUpdate = async (schemaID, dataID, data) => {
  // Data validation
  // Validate data against JSONSchema
  const schema = await JSONSchema.findById(schemaID);
  if (!schema) {
    throw new Error("Schema not found");
  }
  const ajv = new AJV();
  ajv.addMetaSchema(draft7MetaSchema);
  const valid = ajv.validate(schema.jsonschema, data);
  if (!valid) {
    throw new Error(ajv.errorsText());
  }
  // Save validated data
  return mongoose.model("DataModel").findOneAndUpdate(
    {
      _id: dataID,
      schemaID: schemaID,
    },
    {
      $set: { data: data },
    },
    { new: true }
  );
};

DataSchema.methods.getData = function () {
  return {
    _id: this._id,
    ...this.data,
  };
};

module.exports = mongoose.model("DataModel", DataSchema);
