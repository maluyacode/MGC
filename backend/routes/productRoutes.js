const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const productController = require('../controllers/ProductController');
const { isAuthenticated, isAuthorized } = require('../middlewares/Auth');

router.post('/', upload.array('images'), isAuthenticated, isAuthorized('admin'), productController.create); // create category

router.get('/', productController.products) // get all

router.get('/:id', productController.product) // get single

router.delete('/:id', isAuthenticated, isAuthorized('admin'), productController.delete) // soft delete

router.delete('/:id/destroy', isAuthenticated, isAuthorized('admin'), productController.destroy) // destroy / force delete

router.put('/:id', upload.array('images'), isAuthenticated, isAuthorized('admin'), productController.update) // update category

module.exports = router;
