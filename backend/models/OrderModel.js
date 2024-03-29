const mongoose = require('mongoose')

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
        ref: 'User'
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
                ref: 'Product'
            }
        }
    ],
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

module.exports = mongoose.model('Order', orderSchema)