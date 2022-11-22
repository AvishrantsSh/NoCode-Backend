const mongoose = require("mongoose");

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
});

JSONSchema.pre("remove", async function (next) {
  try {
    await this.model("DataModel").deleteMany({ projectID: this._id });
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
    jsonschema: this.jsonschema,
  };
};

module.exports = mongoose.model("JSONSchema", JSONSchema);
