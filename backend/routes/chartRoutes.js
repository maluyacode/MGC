const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const { isAuthenticated, isAuthorized } = require('../middlewares/Auth')

const chartController = require('../controllers/chartController')

router.get('/monthly-income', isAuthenticated, isAuthorized('admin'), chartController.monthlyIncome);

router.get('/trend-products', isAuthenticated, isAuthorized('admin'), chartController.trendProducts);

router.get('/star-distribution', isAuthenticated, isAuthorized('admin'), chartController.starDistribution);

module.exports = router;
