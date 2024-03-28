const Product = require('../models/ProductModel')
const ImageFile = require('../utils/ImageFile');

const errorHandler = ({ error, response, status = 500 }) => {

    return response.status(status).json({
        success: false,
        message: error?.response?.data?.message || 'System error, please try again later'
    })

}

exports.create = async (req, res, next) => {

    try {

        req.body.images = await ImageFile.uploadMultiple({
            imageFiles: req.files,
            request: req
        })

        req.body.colors = JSON.parse(req.body.colors);

        req.body.sizes = JSON.parse(req.body.sizes);

        const product = await Product.create(req.body);

        return res.status(200).json({
            success: true,
            message: 'Product successfully added',
            product: product,
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.products = async (req, res, next) => {

    try {

        const products = await Product.find();

        return res.status(200).json({
            success: true,
            products: products,
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.product = async (req, res, next) => {

    try {

        const product = await Product.findById(req.params.id);

        return res.status(200).json({
            success: true,
            product: product,
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.update = async (req, res, next) => {

    try {

        if (req.files?.length > 0) {
            req.body.images = await ImageFile.uploadMultiple({
                imageFiles: req.files,
                request: req
            })
        }

        req.body.colors = JSON.parse(req.body.colors);

        req.body.sizes = JSON.parse(req.body.sizes);

        const product = await Product.findByIdAndUpdate(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: 'Product successfully updated',
            product: product,
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.delete = async (req, res, next) => {

    try {
        console.log(req.params.id)
        await Product.delete({ _id: req.params.id }, (err, result) => {

        });

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.destroy = async (req, res, next) => {

    try {

        await Product.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            success: true,
            message: 'Product no longer available',
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}