const mongoose = require("mongoose");

const JsonSchema = new mongoose.Schema({
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

// Create Indexes
JsonSchema.index({ project_id: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("JsonModel", JsonSchema);
