const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const { isAuthenticated } = require('../middlewares/Auth')

const chartController = require('../controllers/chartController')

router.get('/monthly-income', chartController.monthlyIncome);

router.get('/trend-products', chartController.trendProducts);

router.get('/star-distribution', chartController.starDistribution);

module.exports = router;
