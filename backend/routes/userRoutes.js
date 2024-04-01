const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const userController = require('../controllers/UserController');
const { isAuthenticated } = require('../middlewares/Auth');

router.post('/register', upload.single('image'), userController.register);

router.post('/login', userController.login)

router.get('/', isAuthenticated, userController.users)

router.get('/:id', isAuthenticated, userController.user)

module.exports = router;