const mongoose = require("mongoose");
const AJV = require("ajv/dist/2019");
const draft7MetaSchema = require("ajv/dist/refs/json-schema-draft-07.json");
const addFormats = require("ajv-formats");

const JSONSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  projectID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  jsonschema: {
    type: Object,
    required: true,
  },
  api_calls: {
    type: Number,
    default: 0,
  },
});

JSONSchema.pre("remove", async function (next) {
  try {
    await this.model("DataModel").deleteMany({ schemaID: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

// Ensure that the name is unique for a given project before saving
JSONSchema.pre("save", async function (next) {
  const schema = await this.constructor.findOne({
    name: this.name,
    projectID: this.projectID,
  });
  if (schema) {
    if (this.isNew) {
      next(new Error(`Schema name ${schema.name} must be unique`));
    } else if (!schema._id.equals(this._id)) {
      next(new Error("Schema name must be unique"));
    }
  }
  next();
});

// Create Indexes
JSONSchema.index({ projectID: 1, name: 1 }, { unique: true });

// Custom Methods
JSONSchema.methods.getJSONSchema = function () {
  return {
    _id: this._id,
    name: this.name,
    projectID: this.projectID._id,
  };
};

JSONSchema.methods.getAllDetails = async function () {
  const records = await this.model("DataModel")
    .find({ schemaID: this._id })
    .count();

  return {
    _id: this._id,
    name: this.name,
    projectID: this.projectID,
    jsonschema: this.jsonschema,
    fields: Object.keys(this.jsonschema.properties),
    recordCount: records,
    requestCount: this.api_calls,
  };
};

JSONSchema.methods.validateCreate = async function (data) {
  const ajv = new AJV();
  ajv.addMetaSchema(draft7MetaSchema);
  addFormats(ajv);

  const valid = ajv.validate(this.jsonschema, data);
  if (!valid) {
    throw new Error(ajv.errorsText());
  }

  // Save validated data
  const dataObj = await this.model("DataModel")({
    schemaID: this._id,
    data: data,
  });
  return dataObj.save();
};

JSONSchema.methods.validateUpdate = async function (dataID, data) {
  const ajv = new AJV();
  ajv.addMetaSchema(draft7MetaSchema);
  addFormats(ajv);

  const valid = ajv.validate(this.jsonschema, data);
  if (!valid) {
    throw new Error(ajv.errorsText());
  }

  // Save validated data
  return this.model("DataModel").findOneAndUpdate(
    {
      _id: dataID,
      schemaID: this._id,
    },
    {
      $set: { data: data },
    },
    { new: true }
  );
};

module.exports = mongoose.model("JSONSchema", JSONSchema);
