const mongoose = require("mongoose");

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
});

// Create Indexes
ProjectSchema.index({ created_by: 1, name: 1 }, { unique: true });

// TODO: Unique Together type of thing
module.exports = mongoose.model("Project", ProjectSchema);