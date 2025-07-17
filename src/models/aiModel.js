const mongoose = require('mongoose');

const aiModelSchema = new mongoose.Schema({
    inputData: {
        type: String,
        required: true
    },
    outputData: {
        type: String,
        required: true
    }
}, { timestamps: true });

const AiModel = mongoose.model('AiModel', aiModelSchema);

module.exports = AiModel;