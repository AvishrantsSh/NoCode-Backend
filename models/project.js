const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  access_token: {
    type: String,
  },
});

ProjectSchema.pre("save", async function (next) {
  if (this.isModified("access_token")) {
    this.access_token = await bcrypt.hash(this.access_token, 8);
  }
  next();
});

ProjectSchema.methods.validateToken = async function (token) {
  return await bcrypt.compare(password, this.password);
};

// Create Indexes
ProjectSchema.index({ created_by: 1, name: 1 }, { unique: true });

// TODO: Unique Together type of thing
module.exports = mongoose.model("Project", ProjectSchema);
