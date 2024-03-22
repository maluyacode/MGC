const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [{
        type: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Category', categoryModel);