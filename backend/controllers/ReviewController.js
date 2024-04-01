const Review = require('../models/ReviewModel');
const User = require('../models/UserModel');

const errorHandler = ({ error, response, status = 500 }) => {

    return response.status(status).json({
        success: false,
        message: error?.response?.data?.message || 'System error, please try again later'
    })

}

exports.create = async (req, res, next) => {

    try {

        req.body.user = req.user._id;
        const productId = req.body.product;

        const review = await Review.create(req.body);

        const user = await User.findById(req.user._id)

        const toReviews = user.toReview.filter(item => item.product.toString() !== productId);
        user.toReview = toReviews;
        user.save();

        return res.status(200).json({
            success: true,
            message: 'Review Sent!'
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

async function calculateAverageRating(reviews) {
    const totalRatings = reviews.length;
    const sumRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
    return averageRating;
}

exports.review = async (req, res, next) => {

    try {



    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.reviewsOfProduct = async (req, res, next) => {

    try {

        const reviews = await Review.find({
            product: req.params.id,
        }).populate('user').populate('product');

        const rating = await calculateAverageRating(reviews);

        return res.status(200).json({
            success: true,
            reviews: reviews,
            rating: rating,
            totalReviews: reviews.length
        })


    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.reviews = async (req, res, next) => {

    try {

        const filterOptions = {

        }

        if (req.query.reviews === 'myreviews') {
            filterOptions.user = req.user._id
        }

        const reviews = await Review.find(filterOptions)

        const user = await User.findById(req.user._id).populate({
            path: 'toReview.product',
            model: 'Product'
        })

        return res.status(200).json({
            success: true,
            reviews: reviews,
            toReview: user.toReview,
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.update = async (req, res, next) => {

    try {


        const review = await Review.findByIdAndUpdate(req.params.id, req.body)

        return res.status(200).json({
            success: true,
            message: 'Product rate updated'
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.delete = async (req, res, next) => {

    try {

        await Review.delete({ _id: req.params.id }, (err, result) => {

        });

        return res.status(200).json({
            success: true,
            message: 'Review Deleted',
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.destroy = async (req, res, next) => {

    try {


    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}