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

    try {

        const category = await Category.findById(req.params.id);

        return res.status(200).json({
            success: true,
            category: category,
        })

    } catch (err) {
        errorHandler({ error: err, response: res })
    }

}

exports.categories = async (req, res, next) => {

    try {

        const categories = await Category.find();

        return res.status(200).json({
            success: true,
            categories: categories,
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

        const category = await Category.findByIdAndUpdate(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: 'Category successfully added',
            category: category,
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.softDelete = async (req, res, next) => {

}

exports.destroy = async (req, res, next) => {
    try {

        await Category.delete({ _id: req.params.id }, (err, result) => {

        });

        return res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }
}