const Review = require('../models/ReviewModel');
const User = require('../models/UserModel');
const Order = require('../models/OrderModel');
const ProductModel = require('../models/ProductModel');
const ReviewModel = require('../models/ReviewModel');
const { default: mongoose } = require('mongoose');

const errorHandler = ({ error, response, status = 500 }) => {

    return response.status(status).json({
        success: false,
        message: error?.response?.data?.message || 'System error, please try again later'
    })

}

exports.monthlyIncome = async (req, res, next) => {

    try {
        console.log(req.query.year)
        const year = req.query.year;
        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year + 1}-01-01`);

        const monthlyIncome = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lt: endDate
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" }
                    },
                    totalIncome: { $sum: "$totalPrice" }
                }
            },
            {
                $sort: { "_id.month": 1 }
            }
        ]);

        console.log(monthlyIncome);
        // Initialize formattedData with all months set to 0
        const formattedData = {
            "Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0,
            "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0
        };

        // Update formattedData with actual total income values
        monthlyIncome.forEach(item => {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const monthIndex = item._id.month - 1;
            const monthName = monthNames[monthIndex];
            formattedData[monthName] = item.totalIncome;
        });

        console.log(formattedData);




        return res.status(200).json({
            success: true,
            monthlyIncome: formattedData
        })


    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.trendProducts = async (req, res, next) => {
    try {

        const reviews = await ReviewModel.find().populate('product');
        const minReviewsThreshold = 1;

        const productRatings = {};
        const productCounts = {};
        reviews.forEach(review => {
            const { name } = review.product;
            const rating = review.rating;
            if (!productRatings[name]) {
                productRatings[name] = 0;
                productCounts[name] = 0;
            }
            productRatings[name] += rating;
            productCounts[name]++;
        });

        const averageRatings = {};
        Object.keys(productRatings).forEach(name => {
            if (productCounts[name] >= minReviewsThreshold) {
                averageRatings[name] = productRatings[name] / productCounts[name];
            }
        });


        return res.status(200).json({
            success: true,
            averageRatings: averageRatings
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.starDistribution = async (req, res, next) => {

    try {

        const productId = req.query.id;

        const result = await ReviewModel.aggregate([
            {
                $match: {
                    product: new mongoose.Types.ObjectId(productId) // Match the specified product ID
                }
            },
            {
                $group: {
                    _id: '$product',
                    ratings: {
                        $push: '$rating'
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'products', // Assuming the name of the products collection is 'products'
                    localField: '_id',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            {
                $unwind: '$productDetails'
            },
            {
                $project: {
                    productName: '$productDetails.name',
                    ratings: 1,
                    count: 1
                }
            },
            {
                $unwind: '$ratings'
            },
            {
                $group: {
                    _id: {
                        product: '$_id',
                        rating: '$ratings'
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: '$_id.product',
                    ratingsDistribution: {
                        $push: {
                            rating: '$_id.rating',
                            count: '$count'
                        }
                    }
                }
            }
        ]);
        console.log(result[0]);

        const ratingsCount = [
            { rating: 1, value: 0, text: 0, color: 'red' },
            { rating: 2, value: 0, text: 0, color: 'green' },
            { rating: 3, value: 0, text: 0, color: 'yellow' },
            { rating: 4, value: 0, text: 0, color: 'blue' },
            { rating: 5, value: 0, text: 0, color: 'orange' }
        ];

        const colors = [
            'red',
            'green',
            'yellow',
            'blue',
            'orange',
        ]

        if (result.length > 0) {
            let totalRatings = 0;

            result[0].ratingsDistribution.forEach(item => {
                totalRatings += item.count;
            });

            result[0].ratingsDistribution.forEach(item => {
                const index = item.rating - 1;
                ratingsCount[index] = {
                    color: colors[index],
                    rating: item.rating,
                    value: item.count,
                    text: `${((item.count / totalRatings) * 100)}%`
                };
            });
        }

        console.log(ratingsCount);

        return res.status(200).json({
            success: true,
            starDistribution: ratingsCount
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }
}