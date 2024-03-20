const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const userController = require('../controllers/UserController')

router.post('/register', upload.single('image'), userController.register);



module.exports = router;