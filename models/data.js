const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    schemaID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JsonModel",
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
});

// Create Indexes
DataSchema.index({ schemaID: 1 });

module.exports = mongoose.model("DataModel", DataSchema);