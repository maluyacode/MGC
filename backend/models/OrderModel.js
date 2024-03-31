const mongoose = require('mongoose')
const Populate = require("mongoose-autopopulate");
const mongooseDelete = require("mongoose-delete");

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        autopopulate: true,
    },
    orderItems: [
        {
            quantity: {
                type: Number,
                required: true
            },
            color: {
                name: {
                    type: String,
                },
                rgb: {
                    type: Array,
                }
            },
            size: {
                type: String
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
                autopopulate: true,
            }
        }
    ],
    paymentMethod: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing' // Processing, Confirmed, Shipped, Delivered
    },
    deliveredAt: {
        type: Date
    },
}, { timestamps: true })

orderSchema.plugin(mongooseDelete, { overrideMethods: 'all' })
orderSchema.plugin(Populate);

module.exports = mongoose.model('Order', orderSchema)