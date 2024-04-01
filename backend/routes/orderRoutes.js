const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const { isAuthenticated } = require('../middlewares/Auth')

const orderController = require('../controllers/OrderController')

router.post('/', isAuthenticated, orderController.create); // create order

router.get('/', isAuthenticated, orderController.orders); // get all orders

router.get('/:id', isAuthenticated, orderController.order); // create order

router.put('/:id', isAuthenticated, orderController.updateStatus)


module.exports = router;
