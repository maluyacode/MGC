const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const { isAuthenticated } = require('../middlewares/Auth')

const orderController = require('../controllers/OrderController')

router.post('/', isAuthenticated, orderController.create); // create order

router.get('/', isAuthenticated, orderController.orders); // create order


module.exports = router;
