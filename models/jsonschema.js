const mongoose = require("mongoose");

const JSONSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  project_id: {
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
    await this.model("DataModel").deleteMany({ project_id: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

// Create Indexes
JSONSchema.index({ project_id: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("JSONSchema", JSONSchema);
