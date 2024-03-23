const Category = require('../models/CategoryModel');
const ImageFile = require('../utils/ImageFile');

const errorHandler = ({ error, response }) => {

    return response.status(500).json({
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

        const category = await Category.create(req.body);

        return res.status(200).json({
            success: true,
            message: 'Category successfully added',
            category: category,
        })

    } catch (err) {
        errorHandler({ error: err, response: res })
    }

}

exports.category = async (req, res, next) => {

}

exports.categories = async (req, res, next) => {

}

exports.update = async (req, res, next) => {

}

exports.softDelete = async (req, res, next) => {

}

exports.destroy = async (req, res, next) => {

}