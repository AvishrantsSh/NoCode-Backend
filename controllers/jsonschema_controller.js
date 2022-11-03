const JsonSchemaModel = require('../models/jsonschema');

module.exports.create = async function(req, res) {
    try {
        const jsonschema = await JsonSchemaModel.create(req.body);
        return res.status(200).json({
            message: "Schema created successfully",
            jsonschema: jsonschema
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports.listAll = async function(req, res) {
    try {
        const jsonschemas = await JsonSchemaModel.find();
        return res.status(200).json({
            data: jsonschemas
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports.details = async function(req, res) {
    try {
        const jsonschema = await JsonSchemaModel.findById(req.params.schema_id);
        return res.status(200).json({
            data: jsonschema
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}
