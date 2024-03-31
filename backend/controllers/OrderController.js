const Order = require('../models/OrderModel');
const ProductModel = require('../models/ProductModel');
const ImageFile = require('../utils/ImageFile');
const { notifyAdminEmailMessage } = require('../utils/emailStringTemplate');
const sendEmail = require('../utils/sendEmail');

const errorHandler = ({ error, response, status = 500 }) => {

    return response.status(status).json({
        success: false,
        message: error?.response?.data?.message || 'System error, please try again later'
    })

}

exports.orders = async (req, res, next) => {

    try {

        const orders = await Order.find();

        return res.status(200).json({
            success: true,
            orders: orders,
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.create = async (req, res, next) => {

    try {

        const data = JSON.parse(req.body.data)
        data.user = req.user;
        const order = await Order.create(data);

        const items = order.orderItems;

        for (let i in items) {
            const product = await ProductModel.findById(items[i].product._id)
            product.stock = product.stock - items[i].quantity
            product.save()
        }

        const message = await notifyAdminEmailMessage(order);

        await sendEmail({
            message: message,
            email: 'adlawandavemerc98@gmail.com',
            subject: 'New Order Arrived'
        })

        return res.status(200).json({
            success: true,
            message: 'Your order has been created successfully',
            order: order,
        })

    } catch (err) {
        errorHandler({ error: err, response: res })
    }

}