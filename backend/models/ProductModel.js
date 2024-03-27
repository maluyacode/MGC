const mongoose = require('mongoose');
const Populate = require("mongoose-autopopulate");
const mongooseDelete = require("mongoose-delete");

const productModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    colors: [{
        name: {
            type: String,
        },
        rgb: {
            type: Array,
        }
    }],
    sizes: [{
        type: String,
    }],
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
    }],
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true,
    },
    reviews: [{
        type: mongoose.Schema.ObjectId,
    }]
}, { timestamps: true });

productModel.plugin(Populate);
productModel.plugin(mongooseDelete, { overrideMethods: 'all' })

module.exports = mongoose.model('Product', productModel);