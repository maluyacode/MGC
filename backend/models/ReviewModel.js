const mongoose = require('mongoose');
const Populate = require("mongoose-autopopulate");
const mongooseDelete = require("mongoose-delete");

const reviewModel = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
        autopopulate: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: true,
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true });

reviewModel.plugin(mongooseDelete, { overrideMethods: 'all' })
reviewModel.plugin(Populate);

module.exports = mongoose.model('Review', reviewModel);