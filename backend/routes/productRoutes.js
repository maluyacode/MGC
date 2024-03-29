const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const productController = require('../controllers/ProductController')

router.post('/', upload.array('images'), productController.create); // create category

router.get('/', productController.products) // get all

router.get('/:id', productController.product) // get single

router.delete('/:id', productController.delete) // soft delete

router.delete('/:id/destroy', productController.destroy) // destroy / force delete

router.put('/:id', upload.array('images'), productController.update) // update category

module.exports = router;
