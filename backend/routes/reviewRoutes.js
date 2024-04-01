const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const { isAuthenticated, isAuthorized } = require('../middlewares/Auth')

const reviewController = require('../controllers/ReviewController')

router.post('/', isAuthenticated, reviewController.create); // create category

router.get('/', isAuthenticated, reviewController.reviews) // get all

router.get('/:id', reviewController.review) // get single

router.delete('/:id', reviewController.delete) // soft delete

router.delete('/:id/destroy', reviewController.destroy) // destroy / force delete

router.put('/:id', upload.array('images'), reviewController.update) // update category

module.exports = router;
