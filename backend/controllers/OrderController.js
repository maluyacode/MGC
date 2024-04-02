const Order = require('../models/OrderModel');
const ProductModel = require('../models/ProductModel');
const UserModel = require('../models/UserModel');
const ImageFile = require('../utils/ImageFile');
const { notifyAdminEmailMessage, notifyUserEmailMessage, notifyShippedMessage, notifyDeliveredMessage } = require('../utils/emailStringTemplate');
const sendEmail = require('../utils/sendEmail');

const errorHandler = ({ error, response, status = 500 }) => {

    return response.status(status).json({
        success: false,
        message: error?.response?.data?.message || 'System error, please try again later'
    })

}

exports.orders = async (req, res, next) => {

    try {

        console.log(req.query.user)

        const filterOption = {}

        if (req.query.status) {
            console.log(req.query.status)
            filterOption.orderStatus = req.query.status
        }

        if (req.query.user) {
            filterOption.user = req.query.user
        }

        const orders = await Order.find(filterOption);

        console.log(orders)

        return res.status(200).json({
            success: true,
            orders: orders,
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.order = async (req, res, next) => {

    try {

        const order = await Order.findById(req.params.id);

        return res.status(200).json({
            success: true,
            order: order,
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

const confirmed = async ({ order, res }) => {

    const items = order.orderItems;

    for (let i in items) {
        const product = await ProductModel.findById(items[i].product._id)
        product.stock = product.stock - items[i].quantity
        product.save()
    }

    order.orderStatus = 'Confirmed'
    order.save();

    const message = await notifyUserEmailMessage(order);

    await sendEmail({
        message: message,
        email: 'adlawandavemerc98@gmail.com',
        subject: 'Order Confirmed!'
    })

    return res.status(200).json({
        success: true,
        order: order,
        message: 'Order Confirmed!'
    })

}

const cancel = async ({ order, res }) => {

    order.orderStatus = 'Cancelled'
    order.save();

    return res.status(200).json({
        success: true,
        order: order,
        message: 'Order Cancelled!'
    })
}

const ship = async ({ order, res }) => {

    order.orderStatus = 'Shipped'
    order.save();

    const message = await notifyShippedMessage(order);

    await sendEmail({
        message: message,
        email: 'adlawandavemerc98@gmail.com',
        subject: 'Order Shipment Notification'
    })

    return res.status(200).json({
        success: true,
        order: order,
        message: 'Order Shipped!'
    })
}

const delivered = async ({ order, res }) => {

    order.orderStatus = 'Delivered'
    order.save();

    const message = await notifyDeliveredMessage(order);

    await sendEmail({
        message: message,
        email: 'adlawandavemerc98@gmail.com',
        subject: 'Package Arrival Notification!'
    })

    const user = await UserModel.findById(order.user._id);
    user.toReview = order.orderItems;
    user.save();

    return res.status(200).json({
        success: true,
        order: order,
        message: 'Order Delivered!'
    })
}


exports.updateStatus = async (req, res, next) => {

    try {

        const order = await Order.findById(req.params.id);

        if (req.body.status === 'Confirmed') {
            confirmed({ order, res });
        } else if (req.body.status === 'Cancelled') {
            cancel({ order, res })
        } else if (req.body.status === 'Shipped') {
            ship({ order, res })
        } else if (req.body.status === 'Delivered') {
            delivered({ order, res })
        } else {
            await Order.delete({ _id: req.params.id }, (err, result) => {

            });

            return res.status(200).json({
                success: true,
                message: 'Order deleted successfully',
            })
        }

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