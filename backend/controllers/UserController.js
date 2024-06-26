const User = require('../models/UserModel');
const sendToken = require('../routes/jwtToken');
const { uploadSingle } = require('../utils/ImageFile');
const { decode } = require('jsonwebtoken')

const errorHandler = ({ error, response, status = 500 }) => {
    console.log(error)
    return response.status(status).json({
        success: false,
        message: error?.response?.data?.message || 'System error, please try again later'
    })

}

exports.googleSignIn = async (req, res, next) => {

    try {

        const googleUser = decode(req.body.idToken)

        const user = await User.findOne({ email: googleUser.email })

        if (user) {
            return sendToken(user, 200, res, 'Success');
        }

        googleUser.image = googleUser.picture;

        const newUser = await User.create(googleUser);

        return sendToken(newUser, 200, res, 'Success');

    } catch (err) {
        errorHandler({ error: err, response: res })
    }

}

exports.register = async (req, res, next) => {

    try {

        const file = req.file;
        const fileName = file.filename;

        if (!file) return res.status(400).send('No image in the request');

        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        req.body.image = `${basePath}${fileName}`

        const user = await User.create(req.body)

        if (!user) {
            return res.status(400).send('the user cannot be created!')
        }

        return sendToken(user, 200, res, 'Success');

    } catch (err) {
        return res.status(400).json({
            message: 'Please try again later',
            success: false,
        })
    }
}

exports.create = async (req, res, next) => {

    try {

        console.log(req.body)

        req.body.image = await uploadSingle({
            imageFile: req.file,
            request: req,
        })

        const user = await User.create(req.body)

        if (!user) {
            return res.status(400).send('the user cannot be created!')
        }

        return res.status(200).json({
            success: true,
            user: user,
            message: 'User created successfully'
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }
}

exports.login = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter email & password' })
        }

        let user = await User.findOne({ email }).select('+password');


        if (!user) {
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }

        const passwordMatched = await user.comparePassword(password);

        if (!passwordMatched) {
            return res.status(401).json({ message: 'Invalid Email or Password' })
        }

        user = await User.findOne(user._id);

        sendToken(user, 200, res, 'Successfully Login')

    } catch (err) {
        return res.status(400).json({
            message: 'Please try again later',
            success: false,
        })
    }

}

exports.user = async (req, res, next) => {

    try {

        const user = await User.findById(req.params.id)

        return res.status(200).json({
            success: true,
            user: user,
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.users = async (req, res, next) => {

    try {

        const users = await User.find()

        return res.status(200).json({
            success: true,
            users: users,
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.update = async (req, res, next) => {


    try {

        if (req.file) {
            req.body.image = await uploadSingle({
                imageFile: req.file,
                request: req,
            })
        } else {
            delete req.body?.image
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        console.log(user)
        return res.status(200).json({
            success: true,
            user: user,
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}

exports.delete = async (req, res, next) => {

    try {

        await User.delete({ _id: req.params.id }, (err, result) => {

        });

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        })

    } catch (err) {
        console.log(err)
        errorHandler({ error: err, response: res })
    }

}