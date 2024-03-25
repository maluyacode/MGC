const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const categoryController = require('../controllers/CategoryController')

router.post('/', upload.array('images'), categoryController.create); // create category

router.get('/', categoryController.categories) // get all

router.get('/:id', categoryController.category) // get single

router.get('/:id', categoryController.softDelete) // soft delete

router.delete('/:id', categoryController.destroy) // destroy / force delete

router.put('/:id', upload.array('images'), categoryController.update) // update category

module.exports = router;