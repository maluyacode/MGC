const User = require('../models/UserModel');
const sendToken = require('../routes/jwtToken');

const errorHandler = ({ error, response, status = 500 }) => {

    return response.status(status).json({
        success: false,
        message: error?.response?.data?.message || 'System error, please try again later'
    })

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