const Product = require('../models/ProductModel')
const ImageFile = require('../utils/ImageFile');

const errorHandler = ({ error, response, status = 500 }) => {

    return response.status(status).json({
        success: false,
        message: error?.response?.data?.message || 'System error, please try again later'
    })

}

const successHandler = ({ response, status = 200, options = {} }) => {
    console.log(options)
    return response.status(status).json(options)
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

exports.products = (req, res, next) => {

}

exports.product = (req, res, next) => {

}

exports.update = (req, res, next) => {

}

exports.delete = (req, res, next) => {

}

exports.destroy = (req, res, next) => {

}