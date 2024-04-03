const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const categoryController = require('../controllers/CategoryController');
const { isAuthenticated, isAuthorized } = require('../middlewares/Auth');

router.post('/', upload.array('images'), isAuthenticated, isAuthorized('admin'), categoryController.create); // create category

router.get('/', categoryController.categories) // get all

router.get('/:id', categoryController.category) // get single

router.get('/:id', isAuthenticated, isAuthorized('admin'), categoryController.softDelete) // soft delete

router.delete('/:id', isAuthenticated, isAuthorized('admin'), categoryController.destroy) // destroy / force delete

router.put('/:id', upload.array('images'), isAuthenticated, isAuthorized('admin'), categoryController.update) // update category

module.exports = router;