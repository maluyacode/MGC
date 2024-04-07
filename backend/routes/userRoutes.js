const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const userController = require('../controllers/UserController');
const { isAuthenticated, isAuthorized } = require('../middlewares/Auth');

router.post('/google-singin', userController.googleSignIn);

router.post('/register', upload.single('image'), userController.register);

router.post('/login', userController.login)

router.get('/', isAuthenticated, userController.users)

router.get('/:id', isAuthenticated, userController.user)

router.post('/create', upload.single('image'), isAuthenticated, userController.create);

router.put('/:id', upload.single('image'), isAuthenticated, userController.update);

router.delete('/:id', isAuthenticated, isAuthorized('admin'), userController.delete);

module.exports = router;