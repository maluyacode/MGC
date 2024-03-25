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
        public_id: {
            type: String,
        },
        url: {
            type: String
        },
        name: {
            type: String,
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Category', categoryModel);