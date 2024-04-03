const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const { isAuthenticated, isAuthorized } = require('../middlewares/Auth')

const reviewController = require('../controllers/ReviewController')

router.post('/', isAuthenticated, reviewController.create); // create category

router.get('/', isAuthenticated, reviewController.reviews) // get all

router.get('/:id', reviewController.review) // get single

router.delete('/:id', reviewController.delete) // soft delete

router.delete('/:id/destroy', isAuthorized('admin'), reviewController.destroy) // destroy / force delete

router.put('/:id', upload.array('images'), reviewController.update) // update category

router.get('/:id/product', isAuthenticated, reviewController.reviewsOfProduct);


module.exports = router;
